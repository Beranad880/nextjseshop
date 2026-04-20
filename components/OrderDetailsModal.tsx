"use client";

import { X, Package, User, MapPin, Phone, Mail, Calendar, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (order) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [order]);

  if (!order) return null;

  const date = new Date(order.createdAt).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden transition-all duration-500 transform ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              Objednávka <span className="text-gray-400 font-mono">#{order._id.slice(-6).toUpperCase()}</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 text-gray-400 hover:text-black transition-colors rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-8">
          {/* Customer Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest border-b border-gray-100 pb-2">
                <User className="w-3.5 h-3.5" />
                Zákazník
              </h3>
              <div className="space-y-2">
                <p className="font-bold text-gray-900">{order.customer.name}</p>
                <p className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Mail className="w-3.5 h-3.5" /> {order.customer.email}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Phone className="w-3.5 h-3.5" /> {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest border-b border-gray-100 pb-2">
                <MapPin className="w-3.5 h-3.5" />
                Doručovací adresa
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                {order.customer.address}
              </p>
            </div>
          </section>

          {/* Items */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest border-b border-gray-100 pb-2">
              <Package className="w-3.5 h-3.5" />
              Položky ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-16 h-16 bg-white border border-gray-200 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-black text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.quantity} ks × {fmt(item.price)}</p>
                  </div>
                  <div className="text-right font-black text-black text-sm whitespace-nowrap">
                    {fmt(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">
              Stav: {order.status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Celkem k úhradě</p>
            <p className="text-2xl font-black text-black tracking-tighter">{fmt(order.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
