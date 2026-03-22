import Link from "next/link";
import { Package, ClipboardList, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)] gap-12">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 space-y-8 shrink-0">
        <div className="space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
            Administrace
          </p>
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all group"
            >
              <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Produkty
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all group"
            >
              <ClipboardList className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Objednávky
            </Link>
          </nav>
        </div>

        <div className="pt-8 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Zpět na web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="bg-white rounded-3xl overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
