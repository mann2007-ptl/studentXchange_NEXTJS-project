import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Offer from '@/models/Offer';
import '@/models/Listing';

export async function GET() {
  try {
    await connectToDatabase();
    const offers = await Offer.find().populate('listingId').sort({ createdAt: -1 });
    return NextResponse.json(offers);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const offer = await Offer.create(body);
    return NextResponse.json(offer, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
