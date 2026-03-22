"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cartContext";

interface Props {
  product: { _id: string; name: string; price: number; image: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({ productId: product._id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
        added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Přidáno
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          Do košíku
        </>
      )}
    </button>
  );
}
