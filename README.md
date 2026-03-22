# Moderní E-shop s Next.js & MongoDB

Tento projekt je komplexní webová aplikace pro e-shop postavená na nejnovějším frameworku **Next.js**. Obsahuje jak veřejnou část pro zákazníky, tak i plnohodnotné administrátorské rozhraní pro správu produktů a objednávek.

## 🚀 Hlavní Funkce

### Pro Zákazníky
- **Katalog produktů:** Prohlížení nabízeného zboží.
- **Nákupní košík:** Intuitivní správa položek v košíku s využitím React Context.
- **Objednávkový systém:** Snadné vytvoření objednávky.
- **Responsivní design:** Plně optimalizováno pro mobily, tablety i desktop.

### Pro Administrátory (`/admin`)
- **Správa produktů:** Kompletní CRUD operace (přidávání, úprava, mazání).
- **Nahrávání obrázků:** Integrovaný systém pro upload produktových fotografií.
- **Správa objednávek:** Přehled všech přijatých objednávek a možnost změny jejich stavu.
- **Dashboard:** Rychlý přístup k nejdůležitějším sekcím webu.

## 🛠️ Použité Technologie

- **Framework:** [Next.js 15+ (App Router)](https://nextjs.org/)
- **Frontend:** [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Databáze:** [MongoDB](https://www.mongodb.com/) s využitím [Mongoose](https://mongoosejs.com/)
- **Ikony:** [Lucide React](https://lucide.dev/)
- **Jazyk:** [TypeScript](https://www.typescriptlang.org/)

## 📦 Instalace a Spuštění

1. **Klonování repozitáře:**
   ```bash
   git clone <url-vasho-repozitare>
   cd my-app
   ```

2. **Instalace závislostí:**
   ```bash
   npm install
   ```

3. **Konfigurace prostředí:**
   Vytvořte soubor `.env.local` v kořenovém adresáři a přidejte připojovací řetězec k vaší MongoDB:
   ```env
   MONGODB_URI=vase_mongodb_connection_string
   ```

4. **Spuštění vývojového serveru:**
   ```bash
   npm run dev
   ```
   Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000).

## 📂 Struktura Projektu

- `app/` - Obsahuje stránky (routes), API endpointy a layouty.
- `components/` - Znovupoužitelné UI komponenty (košík, formuláře, tlačítka).
- `lib/` - Sdílená logika, konfigurace MongoDB a kontexty.
- `models/` - Mongoose modely pro produkty a objednávky.
- `public/` - Statické soubory a nahrané obrázky produktů.

---
Vytvořeno jako moderní ukázka e-commerce řešení.
