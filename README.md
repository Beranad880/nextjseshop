# Moderní E-shop — Next.js 16 + MongoDB

Plnohodnotný e-shop postavený na Next.js 16 (App Router) s MongoDB databází, administrátorským panelem chráněným přihlášením, nahrávání obrázků do MongoDB GridFS a nákupním košíkem.

---

## Obsah

- [Funkce](#funkce)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalace](#instalace)
- [Nastavení proměnných prostředí](#nastavení-proměnných-prostředí)
- [Nastavení admin účtu](#nastavení-admin-účtu)
- [Spuštění](#spuštění)
- [Docker](#docker)
- [Nasazení na Railway](#nasazení-na-railway)
- [API endpointy](#api-endpointy)

---

## Funkce

### Zákaznická část

- Katalog produktů s vyhledáváním v reálném čase
- Detail produktu
- Nákupní košík (drawer, localStorage persistence)
- Objednávkový formulář s odesláním do databáze
- Stránka O nás
- Plně responzivní design

### Administrace (`/admin`)

- Přihlášení chráněné heslem (JWT session v HttpOnly cookie)
- Správa produktů — přidání, úprava, smazání
- Nahrávání obrázků přímo do MongoDB (GridFS) — žádný lokální filesystem
- Přehled objednávek se změnou stavu
- Sidebar s navigací a tlačítkem odhlásit

---

## Technologie

| Vrstva | Technologie |
|--------|-------------|
| Framework | Next.js 16.2.1 (App Router) |
| Frontend | React 19, Tailwind CSS 4 |
| Databáze | MongoDB + Mongoose 9 |
| Autentizace | jose (JWT), bcryptjs |
| Ikony | Lucide React |
| Jazyk | TypeScript (strict mode) |
| Nasazení | Docker (standalone output) |

---

## Struktura projektu

```
├── app/
│   ├── page.tsx                    # Katalog produktů
│   ├── layout.tsx                  # Root layout
│   ├── product/[id]/page.tsx       # Detail produktu
│   ├── admin/
│   │   ├── layout.tsx              # Admin sidebar layout
│   │   ├── page.tsx                # Správa produktů
│   │   ├── new/page.tsx            # Nový produkt
│   │   ├── edit/[id]/page.tsx      # Úprava produktu
│   │   ├── orders/page.tsx         # Správa objednávek
│   │   └── login/page.tsx          # Přihlášení
│   └── api/
│       ├── products/route.ts       # GET, POST produkty
│       ├── products/[id]/route.ts  # GET, PUT, DELETE produkt
│       ├── orders/route.ts         # GET, POST objednávky
│       ├── orders/[id]/route.ts    # PATCH, DELETE objednávka
│       ├── upload/route.ts         # POST — nahrání obrázku do GridFS
│       ├── images/[id]/route.ts    # GET — servírování obrázku z GridFS
│       └── auth/
│           ├── login/route.ts      # POST — přihlášení
│           └── logout/route.ts     # POST — odhlášení
├── components/
│   ├── MainLayout.tsx              # Hlavní layout s navigací a košíkem
│   ├── CartProvider / CartButton / CartDrawer
│   ├── AddToCartButton.tsx
│   ├── SearchInput.tsx
│   ├── ProductForm.tsx
│   ├── DeleteProductButton.tsx
│   ├── DeleteOrderButton.tsx
│   ├── OrderStatusSelect.tsx
│   └── LogoutButton.tsx
├── lib/
│   ├── mongodb.ts                  # Připojení k MongoDB (singleton)
│   ├── cartContext.tsx             # React Context pro košík
│   └── session.ts                  # JWT šifrování a správa session cookie
├── middleware.ts                   # Ochrana /admin tras (bez login)
├── models/
│   ├── Product.ts
│   └── Order.ts
├── scripts/
│   └── setup-admin.mjs             # Script pro vytvoření admin hesla
└── pages/
    ├── _app.tsx / _document.tsx
    ├── objednavka.tsx              # Stránka objednávky (Pages Router)
    └── o-nas.tsx                   # Stránka O nás (Pages Router)
```

---

## Instalace

```bash
git clone <url-repozitare>
cd nextjseshop
npm install
```

---

## Nastavení proměnných prostředí

Vytvořte soubor `.env.local` v kořenovém adresáři:

```env
# MongoDB připojovací řetězec
MONGODB_URI=mongodb+srv://uzivatel:heslo@cluster.mongodb.net/eshop

# Admin přihlašovací údaje (viz níže jak vygenerovat)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$...
SESSION_SECRET=...
```

> Na Railway přidejte stejné proměnné přes **Variables** v dashboardu projektu.

---

## Nastavení admin účtu

Spusťte setup script — interaktivně se vás zeptá na jméno a heslo a vygeneruje všechny potřebné hodnoty:

```bash
npm run setup-admin
```

Výstup bude vypadat takto:

```
=== Přidej tyto proměnné do .env.local nebo Railway Variables ===

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SESSION_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Zkopírujte tyto hodnoty do `.env.local` (nebo Railway Variables) a restartujte server.

---

## Spuštění

### Vývojový server

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).
Admin panel je na [http://localhost:3000/admin](http://localhost:3000/admin).

### Produkční build

```bash
npm run build
npm run start
```

---

## Docker

### Sestavení image

```bash
docker build --no-cache -t eshop .
```

> Vždy použijte `--no-cache` po změnách v kódu, aby Docker nevzal starý cache.

### Spuštění kontejneru

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://..." \
  -e ADMIN_USERNAME="admin" \
  -e ADMIN_PASSWORD_HASH="$2b$12$..." \
  -e SESSION_SECRET="..." \
  eshop
```

---

## Nasazení na Railway

1. Připojte GitHub repozitář v Railway dashboardu
2. Railway automaticky detekuje Dockerfile a sestaví image
3. Přidejte proměnné prostředí v sekci **Variables**:
   - `MONGODB_URI`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
   - `PORT` (Railway nastaví automaticky, ale můžete explicitně `3000`)
4. Railway automaticky nasadí aplikaci při každém push do main větve

---

## API endpointy

### Produkty

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/products` | Seznam všech produktů |
| POST | `/api/products` | Vytvoření produktu |
| GET | `/api/products/:id` | Detail produktu |
| PUT | `/api/products/:id` | Úprava produktu |
| DELETE | `/api/products/:id` | Smazání produktu |

### Objednávky

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/orders` | Seznam všech objednávek |
| POST | `/api/orders` | Vytvoření objednávky |
| PATCH | `/api/orders/:id` | Změna stavu objednávky |
| DELETE | `/api/orders/:id` | Smazání objednávky |

### Obrázky (GridFS)

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| POST | `/api/upload` | Nahrání obrázku do MongoDB GridFS |
| GET | `/api/images/:id` | Stažení obrázku z MongoDB GridFS |

Obrázky jsou ukládány přímo do MongoDB — nevyžadují lokální filesystem ani externí storage (S3, Cloudinary). To znamená, že přežijí restart Docker kontejneru.

### Autentizace

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| POST | `/api/auth/login` | Přihlášení, nastaví session cookie |
| POST | `/api/auth/logout` | Odhlášení, smaže session cookie |

Session je JWT token uložený v HttpOnly cookie s platností 7 dní. Middleware automaticky chrání všechny `/admin/*` trasy a přesměruje na `/admin/login` při chybějící nebo neplatné session.
