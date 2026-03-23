import Link from "next/link";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { CartProvider } from "@/lib/cartContext";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { getSession } from "@/lib/session";

export default async function MainLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="bg-white text-black min-h-screen flex flex-col antialiased selection:bg-black selection:text-white">
      <CartProvider>
        {/* Top Info Bar */}
        <div className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center overflow-hidden">
          <div className="animate-pulse">Doprava zdarma při nákupu nad 2000 Kč • Nová kolekce skladem</div>
        </div>

        <header className="w-full glass sticky top-0 z-50 border-b border-gray-100">
          <nav className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl font-black tracking-tighter uppercase group"
            >
              <div className="bg-black text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="hidden sm:block">Obchod</span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="hidden md:flex items-center gap-8 text-[11px] font-black tracking-widest uppercase">
                <Link href="/" className="hover:text-blue-600 transition-colors relative group">
                  Katalog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/o-nas" className="hover:text-blue-600 transition-colors relative group">
                  O nás
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </nav>

              <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2" />
              
              <CartButton />

              {session && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Panel</span>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto w-full px-6 py-16 flex-grow">
          {children}
        </main>

        <footer className="w-full border-t border-gray-100 py-20 bg-gray-50/50 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-4 col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-xl font-black tracking-tighter uppercase">
                  <ShoppingBag className="w-6 h-6" />
                  <span>Obchod</span>
                </div>
                <p className="text-gray-500 font-medium max-w-sm">
                  Váš partner pro moderní nakupování. Přinášíme vám to nejlepší z designu a kvality již od roku 2026.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-6">Podpora</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                  <li><a href="#" className="hover:text-black transition-colors">Doprava a platba</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Reklamace</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Kontakt</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-6">Právní informace</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                  <li><a href="#" className="hover:text-black transition-colors">Obchodní podmínky</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Ochrana soukromí</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
              <p>© 2026 Internetový obchod. Vytvořeno s láskou k designu.</p>
              <div className="flex gap-6">
                <span>Instagram</span>
                <span>Facebook</span>
                <span>Twitter</span>
              </div>
            </div>
          </div>
        </footer>

        <CartDrawer />
      </CartProvider>
    </div>
  );
}
