import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getSession } from '@/lib/session';

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await dbConnect();
    const { status } = await request.json();
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return NextResponse.json({ error: 'Objednávka nenalezena' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await dbConnect();
  const order = await Order.findByIdAndDelete(id);
  if (!order) return NextResponse.json({ error: 'Objednávka nenalezena' }, { status: 404 });
  return NextResponse.json({ message: 'Objednávka smazána' });
}
