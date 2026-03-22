import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default async function Home() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 border-b border-gray-100">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter animate-fade-in-up">
            Katalog <span className="text-gray-300">2026</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-xl font-medium leading-relaxed animate-fade-in-up stagger-1">
            Objevte naši novou kolekci produktů navržených pro moderní životní styl. 
            Minimalistický design, maximální kvalita.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl -z-10 animate-pulse" />
      </div>

      {products.length === 0 ? (
        <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-3xl animate-scale-in">
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em]">Aktuálně nemáme žádné produkty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => {
            const p = {
              _id: product._id.toString(),
              name: product.name,
              price: product.price,
              image: product.image,
            };
            const staggerClass = index < 6 ? `stagger-${(index % 6) + 1}` : "";
            
            return (
              <div 
                key={p._id} 
                className={`group flex flex-col h-full animate-fade-in-up ${staggerClass}`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-black/5 group-hover:-translate-y-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  
                  {/* Quick Add Overlay (Optional improvement) */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <AddToCartButton product={p} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6 space-y-2 flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                        {product.category || "Kolekce"}
                      </p>
                      <h3 className="text-base font-bold text-black tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-base font-black text-black whitespace-nowrap">
                      {fmt(p.price)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
