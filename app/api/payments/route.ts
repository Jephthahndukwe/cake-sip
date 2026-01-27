import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cake_sip';
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    await client.connect();
    const database = client.db('cake_sip');
    const collection = database.collection('payments');
    
    // Add timestamp and status
    const paymentRecord = {
      ...paymentData,
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(paymentRecord);
    
    await client.close();
    
    return NextResponse.json({ 
      success: true, 
      paymentId: result.insertedId,
      message: 'Payment saved successfully' 
    });
  } catch (error) {
    console.error('Error saving payment:', error);
    await client.close();
    return NextResponse.json(
      { success: false, error: 'Failed to save payment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    
    await client.connect();
    const database = client.db('cake_sip');
    const collection = database.collection('payments');
    
    const payment = reference 
      ? await collection.findOne({ reference })
      : await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    await client.close();
    
    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error fetching payments:', error);
    await client.close();
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
