"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash2, Loader2, ChevronLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartContext";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

type Step = "kosik" | "objednavka" | "hotovo";

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CartDrawer() {
  const { items, removeItem, updateQty, clear, total, count, isOpen, closeCart } = useCart();
  const [step, setStep] = useState<Step>("kosik");
  const [sending, setSending] = useState(false);
  const [customer, setCustomer] = useState<CustomerForm>({ name: "", email: "", phone: "", address: "" });

  const field = (key: keyof CustomerForm, label: string, type = "text", rows?: number) => (
    <div className="space-y-1.5">
      <label className="field-label">{label}</label>
      {rows ? (
        <textarea
          required
          rows={rows}
          value={customer[key]}
          onChange={(e) => setCustomer((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full px-3 py-2.5 bg-white border border-gray-200 text-sm font-medium text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 resize-none transition-all"
        />
      ) : (
        <input
          required
          type={type}
          value={customer[key]}
          onChange={(e) => setCustomer((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full px-3 py-2.5 bg-white border border-gray-200 text-sm font-medium text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
        />
      )}
    </div>
  );

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
          customer,
          total,
        }),
      });
      if (!res.ok) throw new Error("Chyba při odesílání objednávky");
      clear();
      setStep("hotovo");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    closeCart();
    setTimeout(() => setStep("kosik"), 350);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {step === "objednavka" && (
              <button onClick={() => setStep("kosik")} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-sm font-black uppercase tracking-widest">
              {step === "kosik" ? `Košík${count > 0 ? ` (${count})` : ""}` : step === "objednavka" ? "Doručovací údaje" : "Hotovo"}
            </h2>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* ── Košík ── */}
          {step === "kosik" && (
            <div className="flex flex-col h-full">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-300 py-20">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="text-xs font-black uppercase tracking-widest">Košík je prázdný</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 px-6 py-4">
                      <div className="w-16 h-20 shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="text-sm font-bold text-black truncate">{item.name}</p>
                        <p className="text-sm font-black">{fmt(item.price)}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.productId, item.quantity - 1)}
                            className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="ml-auto text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* ── Objednávka ── */}
          {step === "objednavka" && (
            <form id="order-form" onSubmit={handleOrder} className="px-6 py-6 space-y-5">
              {field("name", "Jméno a příjmení")}
              {field("email", "E-mail", "email")}
              {field("phone", "Telefon", "tel")}
              {field("address", "Doručovací adresa", "text", 3)}
            </form>
          )}

          {/* ── Hotovo ── */}
          {step === "hotovo" && (
            <div className="flex flex-col items-center justify-center gap-5 py-24 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">Objednávka přijata!</p>
                <p className="text-xs text-gray-500">Potvrzení pošleme na váš e-mail.</p>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Zavřít
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "hotovo" && items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-white">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">Celkem</span>
              <span className="text-xl font-black">{fmt(total)}</span>
            </div>
            {step === "kosik" ? (
              <button
                onClick={() => setStep("objednavka")}
                className="w-full py-3.5 bg-black text-white text-xs font-black uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors"
              >
                Pokračovat k objednávce
              </button>
            ) : (
              <button
                form="order-form"
                type="submit"
                disabled={sending}
                className="w-full py-3.5 bg-black text-white text-xs font-black uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Odeslat objednávku"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
