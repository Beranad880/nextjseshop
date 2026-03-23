import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = "force-dynamic";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default async function AdminDashboard() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h1 className="text-4xl font-extrabold text-black uppercase tracking-tight">Produkty</h1>
        <Link
          href="/admin/new"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={3} />
          Přidat produkt
        </Link>
      </div>

      <div className="border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-200">
                <th className="px-6 py-4">Název produktu</th>
                <th className="px-6 py-4">Kategorie</th>
                <th className="px-6 py-4">Cena</th>
                <th className="px-6 py-4 text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Sklad je prázdný</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id.toString()} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="font-bold text-black text-[15px]">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black text-black text-base">{fmt(product.price)}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/edit/${product._id}`}
                          className="p-2 text-gray-400 hover:text-black border border-transparent hover:border-gray-200 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton id={product._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
