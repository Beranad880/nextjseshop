"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 transition-colors rounded"
      aria-label="Otevřít košík"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-black text-white text-[10px] font-black flex items-center justify-center rounded-full px-0.5">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
