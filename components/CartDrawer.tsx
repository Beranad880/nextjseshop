"use client";

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, closeCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[101] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-base font-black uppercase tracking-[0.2em]">
              Váš košík <span className="text-gray-300 ml-1">{count}</span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 text-gray-300 h-full py-20">
              <div className="bg-gray-50 p-8 rounded-full">
                <ShoppingBag className="w-16 h-16 opacity-20" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Košík zeje prázdnotou</p>
              <button 
                onClick={closeCart}
                className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
              >
                Začít nakupovat
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.productId} className="group py-8 flex gap-6">
                  <div className="w-24 h-32 shrink-0 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative group-hover:shadow-md transition-shadow duration-500">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-sm font-bold text-black group-hover:text-blue-600 transition-colors truncate">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-black text-black">{fmt(item.price)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md transition-all active:scale-90"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md transition-all active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-black text-gray-400">{fmt(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-8 py-8 space-y-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Mezisoučet</span>
                <span className="text-sm font-bold text-gray-500 line-through opacity-50">{fmt(total * 1.1)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Celková cena</span>
                <span className="text-3xl font-black tracking-tighter">{fmt(total)}</span>
              </div>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-right">Včetně DPH a doplatků</p>
            </div>
            
            <Link
              href="/objednavka"
              onClick={closeCart}
              className="group relative flex items-center justify-center w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl hover:bg-blue-600 transition-all duration-500 overflow-hidden shadow-xl shadow-black/10 hover:shadow-blue-200"
            >
              <span className="relative z-10 flex items-center gap-3">
                Dokončit nákup
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
            </Link>
            
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Doprava zdarma aktivována
            </p>
          </div>
        )}
      </div>
    </>
  );
}
