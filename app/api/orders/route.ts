import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const orders = await Order.find({}).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    // Validate order structure loosely, status should always be 'nova'
    const newOrder = {
      ...body,
      status: 'nova',
    };
    const order = await Order.create(newOrder);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

