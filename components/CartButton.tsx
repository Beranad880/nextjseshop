"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="relative p-3 hover:bg-black hover:text-white transition-all duration-300 rounded-xl group border border-transparent hover:border-black/10 active:scale-90"
      aria-label="Otevřít košík"
    >
      <ShoppingCart className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-12" />
      {count > 0 && (
        <span className="absolute top-1 right-1 min-w-[20px] h-[20px] bg-blue-600 text-white text-[9px] font-black flex items-center justify-center rounded-full px-1 border-2 border-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
