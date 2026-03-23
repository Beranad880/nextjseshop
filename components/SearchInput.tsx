"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams?.get("q") || "");

  // Update local state when URL changes (e.g. browser back button)
  useEffect(() => {
    setQuery(searchParams?.get("q") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setQuery(value);

    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative max-w-md w-full group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
        <Search className="w-4 h-4" strokeWidth={3} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Hledat produkty..."
        className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-4 focus:ring-black/5 transition-all"
      />
      {query && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={3} />
        </button>
      )}
      {isPending && (
        <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gray-100 overflow-hidden rounded-full">
            <div className="h-full bg-black animate-[loading_1s_infinite] w-1/3" />
        </div>
      )}
      <style jsx>{`
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
