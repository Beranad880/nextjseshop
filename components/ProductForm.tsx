"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload, X, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  initialData?: {
    _id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(!!(initialData?.image && initialData.image.startsWith("http")));

  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    image: initialData?.image ?? "",
    category: initialData?.category ?? "",
  });

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setFormData((prev) => ({ ...prev, image: json.url }));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/products/${initialData?._id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error ?? "Something went wrong");
      }
    } catch {
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-gray-200 font-medium text-black placeholder:text-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all";

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={3} />
          Zpět na produkty
        </Link>
        <h1 className="text-4xl font-extrabold text-black uppercase tracking-tight">
          {isEdit ? "Upravit produkt" : "Nový produkt"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column – text fields */}
        <div className="space-y-7">
          <div className="space-y-1.5">
            <label className="field-label">Název produktu</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="např. Klasické bílé tričko"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="field-label">Kategorie</label>
              <input
                required
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="např. Oblečení"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="field-label">Cena (Kč)</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="field-label">Popis</label>
            <textarea
              required
              rows={8}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Popis produktu..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Right column – image */}
        <div className="space-y-7">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="field-label">Obrázek produktu</label>
              <button
                type="button"
                onClick={() => setUrlMode((v) => !v)}
                className="text-[11px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                <LinkIcon className="w-3 h-3" />
                {urlMode ? "Nahrát soubor" : "Zadat URL"}
              </button>
            </div>

            {urlMode ? (
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className={inputClass}
              />
            ) : (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleFileChange}
                className="hidden"
              />
            )}

            {/* Image preview / drop zone */}
            <div
              className={`mt-2 aspect-[4/5] border-2 flex flex-col items-center justify-center overflow-hidden transition-all cursor-pointer relative
                ${dragOver ? "border-black bg-gray-50" : "border-gray-200 bg-gray-50 hover:border-gray-400"}
                ${!urlMode ? "border-dashed" : ""}
              `}
              onClick={() => !urlMode && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); if (!urlMode) setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={!urlMode ? handleDrop : undefined}
            >
              {formData.image ? (
                <>
                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  {!urlMode && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFormData((p) => ({ ...p, image: "" })); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              ) : uploading ? (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest">Uploading…</span>
                </div>
              ) : !urlMode ? (
                <div className="flex flex-col items-center gap-3 text-gray-300 select-none">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-bold uppercase tracking-widest text-center px-4">
                    Klikněte nebo přetáhněte
                    <br />
                    <span className="font-medium normal-case tracking-normal text-gray-300">
                      JPG, PNG, WEBP — max 5 MB
                    </span>
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Náhled</span>
              )}
            </div>
          </div>

          <button
            disabled={loading || uploading}
            type="submit"
            className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>{isEdit ? "Uložit změny" : "Vytvořit produkt"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
