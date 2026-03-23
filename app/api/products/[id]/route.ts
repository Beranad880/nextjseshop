import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getSession } from '@/lib/session';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    
    // Whitelist fields for safety
    const { name, description, price, image, category } = body;
    const updateData = { name, description, price, image, category };

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await dbConnect();
  const product = await Product.findByIdAndDelete(id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json({ message: 'Product deleted' });
}
