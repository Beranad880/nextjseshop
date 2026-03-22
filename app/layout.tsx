import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { CartProvider } from "@/lib/cartContext";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Internetový obchod",
  description: "Jednoduchý a přehledný internetový obchod",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="bg-white text-black min-h-screen flex flex-col antialiased">
        <CartProvider>
          <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
            <nav className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight uppercase">
                <ShoppingBag className="w-6 h-6" />
                <span>Obchod</span>
              </Link>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-6 text-sm font-semibold tracking-wide uppercase">
                  <Link href="/" className="hover:text-gray-600 transition-colors">Katalog</Link>
                </div>
                <CartButton />
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </div>
            </nav>
          </header>

          <main className="max-w-6xl mx-auto w-full px-4 py-12 flex-grow">
            {children}
          </main>

          <footer className="w-full border-t border-gray-200 py-12 bg-gray-50 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
              <p>© 2026 Internetový obchod. Všechna práva vyhrazena.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Podmínky</a>
                <a href="#" className="hover:underline">Ochrana dat</a>
                <a href="#" className="hover:underline">Kontakt</a>
              </div>
            </div>
          </footer>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
