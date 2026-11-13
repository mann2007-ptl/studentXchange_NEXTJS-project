import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Listing from '@/models/Listing';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filter: any = {};
    if (category && category !== 'All') filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(listings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const listing = await Listing.create(body);
    return NextResponse.json(listing, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
