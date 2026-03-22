import { useState, useEffect } from "react";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import Head from "next/head";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

const inputClass =
  "w-full px-4 py-3 bg-white border border-gray-200 text-sm font-medium text-black placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => setMounted(true), []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          customer: form,
          total,
        }),
      });
      if (!res.ok) throw new Error("Chyba při odesílání objednávky");
      const data = await res.json();
      setOrderNumber(data._id.slice(-6).toUpperCase());
      clear();
      setDone(true);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  // Success screen
  if (done) {
    return (
      <>
        <Head>
          <title>Objednávka přijata | Internetový obchod</title>
        </Head>
        <div className="max-w-lg mx-auto py-24 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">Objednávka přijata!</h1>
          <p className="text-gray-500">
            Číslo objednávky:{" "}
            <span className="font-mono font-black text-black">#{orderNumber}</span>
          </p>
          <p className="text-sm text-gray-400">Potvrzení vám zašleme na e-mail.</p>
        </div>
        <Link
          href="/"
          className="inline-block px-10 py-3.5 bg-black text-white text-xs font-black uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors"
        >
          Zpět do obchodu
        </Link>
      </div>
      </>
    );
  }

  // Empty cart guard (after hydration)
  if (mounted && items.length === 0) {
    return (
      <>
      <Head>
        <title>Košík je prázdný | Internetový obchod</title>
      </Head>
      <div className="max-w-lg mx-auto py-24 text-center space-y-6">
        <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto" />
        <p className="text-sm font-black uppercase tracking-widest text-gray-400">Košík je prázdný</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Prohlédnout katalog
        </Link>
      </div>
      </>
    );
  }

  const shipping = 0; // zdarma
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
    <Head>
      <title>Objednávka | Internetový obchod</title>
    </Head>
    <div className="space-y-10 pb-20">
      {/* Page title */}
      <div className="space-y-4 border-b border-gray-100 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={3} />
          Zpět do obchodu
        </Link>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Objednávka</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
        {/* ── Left: form ── */}
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100 pb-3">
              Kontaktní údaje
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="field-label">Jméno a příjmení</label>
                <input required type="text" value={form.name} onChange={set("name")} placeholder="Jan Novák" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className="field-label">E-mail</label>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="jan@novak.cz" className={inputClass} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="field-label">Telefon</label>
              <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+420 600 000 000" className={inputClass} />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100 pb-3">
              Doručovací adresa
            </h2>
            <div className="space-y-1.5">
              <label className="field-label">Ulice a číslo popisné</label>
              <input required type="text" value={form.address} onChange={set("address")} placeholder="Hlavní 1, 110 00 Praha 1" className={inputClass} />
            </div>
          </section>

          {/* Submit – visible on mobile at bottom, on desktop inside form */}
          <div className="lg:hidden">
            <button
              type="submit"
              disabled={sending || !mounted || items.length === 0}
              className="w-full py-4 bg-black text-white text-sm font-black uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : `Potvrdit objednávku — ${fmt(total)}`}
            </button>
          </div>
        </form>

        {/* ── Right: recap ── */}
        <aside className="space-y-6">
          <div className="border border-gray-200 bg-gray-50/50">
            {/* Items */}
            <div className="divide-y divide-gray-100">
              {mounted && items.map((item) => (
                <div key={item.productId} className="flex gap-4 px-5 py-4">
                  <div className="w-14 h-16 shrink-0 bg-white border border-gray-100 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.quantity} ks × {fmt(item.price)}</p>
                  </div>
                  <p className="text-sm font-black text-black shrink-0">{fmt(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 px-5 py-4 space-y-2.5 bg-white">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Mezisoučet ({itemCount} ks)</span>
                <span className="font-medium">{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Doprava</span>
                <span className="font-medium text-green-600">{shipping === 0 ? "Zdarma" : fmt(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-black border-t border-gray-100 pt-2.5">
                <span>Celkem k úhradě</span>
                <span>{fmt(total + shipping)}</span>
              </div>
            </div>
          </div>

          {/* Submit – visible only on desktop */}
          <button
            form="checkout-form"
            type="submit"
            disabled={sending || !mounted || items.length === 0}
            className="hidden lg:flex w-full py-4 bg-black text-white text-sm font-black uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 items-center justify-center gap-2"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : `Potvrdit objednávku`}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Odesláním souhlasíte s{" "}
            <a href="#" className="underline hover:text-black">podmínkami nákupu</a>.
          </p>
        </aside>
      </div>
    </div>
    </>
  );
}
