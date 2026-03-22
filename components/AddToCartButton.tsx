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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ 
      productId: product._id, 
      name: product.name, 
      price: product.price, 
      image: product.image 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full py-3 px-6 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 transform active:scale-95 shadow-lg overflow-hidden flex items-center justify-center gap-2 group ${
        added 
          ? "bg-green-500 text-white shadow-green-200" 
          : "bg-white text-black hover:bg-black hover:text-white shadow-black/5"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {added ? (
          <>
            <Check className={`w-4 h-4 transition-transform duration-500 scale-110`} />
            <span>V košíku</span>
          </>
        ) : (
          <>
            <ShoppingCart className={`w-4 h-4 transition-transform duration-500 ${isHovered ? 'scale-110 -rotate-12' : ''}`} />
            <span>Do košíku</span>
          </>
        )}
      </span>
      
      {/* Animated Shine Effect */}
      <div className={`absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[100%] pointer-events-none`} />
    </button>
  );
}
