import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Offer from '@/models/Offer';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { status } = await req.json();
    const updated = await Offer.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    await Offer.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
