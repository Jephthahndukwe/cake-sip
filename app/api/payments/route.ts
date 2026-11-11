import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { priceFor, PACKAGES, type Experience, type Package } from '@/lib/tickets';

const uri = process.env.MONGODB_URI || 'mongodb+srv://cruiseking:CruiseKing%40123@cluster0.uwukyb8.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri);

/**
 * Checks the booking against the price config, and (when PAYSTACK_SECRET_KEY is set)
 * confirms with Paystack that the transaction succeeded for exactly that amount.
 * Payment has already been taken at this point, so problems are flagged for review
 * rather than rejected.
 */
async function verify(data: { reference?: string; attendeeType?: Experience; ticketType?: Package; amount?: number }) {
  const issues: string[] = [];
  const expected = data.attendeeType && data.ticketType ? priceFor(data.attendeeType, data.ticketType) : null;
  if (expected === null) issues.push('unknown ticket option');
  else if (data.amount !== expected) issues.push(`client amount ${data.amount} != expected ${expected}`);

  let paystack: { status?: string; amount?: number } | null = null;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (secret && data.reference) {
    try {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(data.reference)}`, {
        headers: { Authorization: `Bearer ${secret}` },
        cache: 'no-store',
      });
      const json = await res.json();
      paystack = { status: json?.data?.status, amount: json?.data?.amount };
      if (paystack.status !== 'success') issues.push(`paystack status ${paystack.status ?? 'unknown'}`);
      if (expected !== null && paystack.amount !== expected * 100) issues.push(`paystack amount ${paystack.amount} != expected ${expected * 100}`);
    } catch (e) {
      issues.push(`paystack verify failed: ${e instanceof Error ? e.message : 'error'}`);
    }
  }

  return { expectedAmount: expected, verifiedWithPaystack: !!paystack && issues.length === 0, issues };
}

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    const check = await verify(paymentData);
    if (check.issues.length) console.warn('Payment needs review:', paymentData.reference, check.issues);

    await client.connect();
    const collection = client.db('cake_sip').collection('payments');

    const people = PACKAGES[paymentData.ticketType as Package]?.people ?? paymentData.people;
    const result = await collection.insertOne({
      ...paymentData,
      people,
      amount: check.expectedAmount ?? paymentData.amount,
      clientAmount: paymentData.amount,
      status: check.issues.length ? 'needs_review' : 'completed',
      reviewIssues: check.issues,
      verifiedWithPaystack: check.verifiedWithPaystack,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, paymentId: result.insertedId });
  } catch (error) {
    console.error('Error saving payment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save payment' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Returns a single booking summary by reference. Never lists all bookings.
export async function GET(request: NextRequest) {
  const reference = new URL(request.url).searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ success: false, error: 'reference is required' }, { status: 400 });
  }
  try {
    await client.connect();
    const payment = await client
      .db('cake_sip')
      .collection('payments')
      .findOne(
        { reference },
        { projection: { _id: 0, name: 1, attendeeType: 1, ticketType: 1, people: 1, amount: 1, reference: 1, cakeFlavors: 1, cakeTopper: 1, decorationColor: 1 } },
      );
    if (!payment) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch payment' }, { status: 500 });
  } finally {
    await client.close();
  }
}
