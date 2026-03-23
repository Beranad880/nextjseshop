import Link from "next/link";
import { MoveLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center space-y-12">
      <div className="relative">
        <Ghost className="w-32 h-32 text-gray-100" />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black">404</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-black uppercase tracking-tight">Stránka nenalezena</h1>
        <p className="text-gray-500 font-medium max-w-xs mx-auto">
          Vypadá to, že tento produkt nebo stránka už neexistuje. Možná byla přesunuta do jiné kolekce.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all hover:scale-105"
      >
        <MoveLeft className="w-4 h-4" />
        Zpět na úvodní stránku
      </Link>
    </div>
  );
}
