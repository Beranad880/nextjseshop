"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { OrderStatus } from "@/models/Order";

const LABELS: Record<OrderStatus, string> = {
  nova: "Nová",
  potvrzena: "Potvrzená",
  odeslana: "Odeslaná",
  dorucena: "Doručená",
  zrusena: "Zrušená",
};

const COLORS: Record<OrderStatus, string> = {
  nova: "bg-amber-50 text-amber-700 border-amber-200",
  potvrzena: "bg-blue-50 text-blue-700 border-blue-200",
  odeslana: "bg-purple-50 text-purple-700 border-purple-200",
  dorucena: "bg-green-50 text-green-700 border-green-200",
  zrusena: "bg-red-50 text-red-600 border-red-200",
};

export default function OrderStatusSelect({ id, status }: { id: string; status: OrderStatus }) {
  const [current, setCurrent] = useState<OrderStatus>(status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) setCurrent(next);
      else alert("Nepodařilo se aktualizovat stav");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {loading && <Loader2 className="absolute right-7 w-3 h-3 animate-spin text-gray-400" />}
      <select
        value={current}
        onChange={handleChange}
        disabled={loading}
        className={`text-xs font-bold border rounded px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none transition-colors ${COLORS[current]}`}
      >
        {(Object.keys(LABELS) as OrderStatus[]).map((s) => (
          <option key={s} value={s}>{LABELS[s]}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-2 w-3 h-3 text-current opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
