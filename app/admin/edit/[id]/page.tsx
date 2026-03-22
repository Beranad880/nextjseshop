import ProductForm from "@/components/ProductForm";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  await dbConnect();
  
  const product = await Product.findById(id);

  if (!product) {
    notFound();
  }

  // Convert mongoose object to plain object for the client component
  const productData = {
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
  };

  return <ProductForm initialData={productData} isEdit />;
}
