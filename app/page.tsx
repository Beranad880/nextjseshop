import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default async function Home() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-100 pb-10">
        <h1 className="text-4xl font-extrabold text-black uppercase tracking-tight">Katalog</h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl font-medium">
          Kvalitní produkty za rozumné ceny. Vyberte si z naší nabídky.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-lg">
          <p className="text-gray-400 font-semibold uppercase tracking-widest">Nabídka je prázdná</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => {
            const p = {
              _id: product._id.toString(),
              name: product.name,
              price: product.price,
              image: product.image,
            };
            return (
              <div key={p._id} className="group space-y-3 card-hover">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-300 group-hover:border-gray-400 group-hover:shadow-md">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1 px-0.5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em]">
                    {product.category}
                  </p>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-sm font-bold text-black truncate leading-snug">{p.name}</h3>
                    <p className="text-sm font-black text-black shrink-0">{fmt(p.price)}</p>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <AddToCartButton product={p} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
