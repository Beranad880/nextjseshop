import Link from "next/link";
import { Package, ClipboardList } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <nav className="flex gap-1 border-b border-gray-100 pb-0">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest border-b-2 border-transparent hover:border-gray-300 hover:text-black text-gray-500 transition-all -mb-px"
        >
          <Package className="w-3.5 h-3.5" />
          Produkty
        </Link>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest border-b-2 border-transparent hover:border-gray-300 hover:text-black text-gray-500 transition-all -mb-px"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Objednávky
        </Link>
      </nav>
      {children}
    </div>
  );
}
