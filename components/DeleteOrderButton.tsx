"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteOrderButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Opravdu chcete smazat tuto objednávku?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Smazání se nezdařilo");
    } catch {
      alert("Chyba při mazání objednávky");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-300 hover:text-red-500 border border-transparent hover:border-gray-200 transition-all disabled:opacity-40"
      title="Smazat objednávku"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
