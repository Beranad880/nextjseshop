import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  const { id } = await params;
  
  let product;
  try {
    product = await Product.findById(id);
  } catch (e) {
    return notFound();
  }

  if (!product) return notFound();

  const p = {
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Breadcrumbs / Back button */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-3 h-3" strokeWidth={3} />
          Zpět do katalogu
        </Link>
        <span className="text-gray-200">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image */}
        <div className="relative aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {product.category && (
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100">
              {product.category}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-10 py-4">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-black tracking-tighter">
              {fmt(product.price)}
            </p>
          </div>

          <div className="space-y-6">
            <div className="prose prose-sm text-gray-500 font-medium leading-relaxed max-w-none">
              {product.description || "Tento produkt zatím nemá podrobný popis, ale zaručujeme vám jeho prvotřídní kvalitu a stylový design, který oživí váš domov."}
            </div>
            
            <div className="pt-4">
              <AddToCartButton product={p} />
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="space-y-2">
              <Truck className="w-5 h-5 text-gray-400" />
              <p className="text-[10px] font-black uppercase tracking-widest">Doprava</p>
              <p className="text-xs text-gray-500 font-medium">Zdarma nad 2 000 Kč</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <p className="text-[10px] font-black uppercase tracking-widest">Záruka</p>
              <p className="text-xs text-gray-500 font-medium">24 měsíců jistoty</p>
            </div>
            <div className="space-y-2">
              <RefreshCcw className="w-5 h-5 text-gray-400" />
              <p className="text-[10px] font-black uppercase tracking-widest">Vrácení</p>
              <p className="text-xs text-gray-500 font-medium">Do 30 dnů zdarma</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section (Optional Placeholder) */}
      <section className="pt-24 border-t border-gray-100">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-12">Mohlo by se vám líbit</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale">
            {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[4/5] bg-gray-50 rounded-2xl border border-gray-100" />
            ))}
        </div>
      </section>
    </div>
  );
}
