import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { ORDERS_ENABLED } from "@/lib/site";

// Stores partner/vendor enquiries and custom cake orders in the `enquiries` collection.
const MAX_IMAGE_CHARS = 4_200_000; // ~3MB image as a base64 data URL

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const type = body.type === "order" ? "order" : body.type === "partner" ? "partner" : null;
  if (!type) return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  if (type === "order" && !ORDERS_ENABLED) return NextResponse.json({ ok: false, error: "Not available" }, { status: 404 });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
  if (phone.replace(/\D/g, "").length < 10) errors.push("phone");

  const doc: Record<string, unknown> = { type, name, email, phone, createdAt: new Date(), status: "new" };

  if (type === "partner") {
    doc.company = str(body.company, 160);
    doc.interest = str(body.interest, 60);
    doc.message = str(body.message, 3000);
    if (!doc.company) errors.push("company");
  } else {
    doc.occasion = str(body.occasion, 80);
    doc.eventDate = str(body.eventDate, 20);
    doc.flavour = str(body.flavour, 80);
    doc.size = str(body.size, 80);
    doc.notes = str(body.notes, 3000);
    const img = typeof body.image === "string" ? body.image : "";
    if (img) {
      if (!/^data:image\/(png|jpe?g|webp|heic);base64,/.test(img) || img.length > MAX_IMAGE_CHARS) errors.push("image");
      else doc.image = img;
    }
    if (!doc.occasion) errors.push("occasion");
    if (!doc.eventDate) errors.push("eventDate");
  }

  if (errors.length) return NextResponse.json({ ok: false, error: "Please check the highlighted fields", fields: errors }, { status: 422 });

  try {
    const db = await getDb();
    await db.collection("enquiries").insertOne(doc);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Saving enquiry failed:", e);
    return NextResponse.json({ ok: false, error: "We couldn't save that just now. Please message us on WhatsApp." }, { status: 500 });
  }
}
