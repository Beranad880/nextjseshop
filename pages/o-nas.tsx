import { ShoppingBag, Package, Truck, HeartHandshake } from "lucide-react";
import Head from "next/head";

const values = [
  {
    icon: Package,
    title: "Kvalita na prvním místě",
    text: "Každý produkt pečlivě vybíráme a testujeme, než se dostane do naší nabídky. Kompromisy nejsou součástí našeho slovníku.",
  },
  {
    icon: Truck,
    title: "Rychlé doručení",
    text: "Objednávky odesíláme do 24 hodin. Doprava je zdarma při nákupu nad 2 000 Kč — bez výjimky.",
  },
  {
    icon: HeartHandshake,
    title: "Zákaznická podpora",
    text: "Za každou objednávkou stojí skuteční lidé. Jsme tu pro vás na telefonu i e-mailu každý pracovní den.",
  },
];

const team = [
  { name: "Anna Novotná", role: "Zakladatelka & CEO", initials: "AN" },
  { name: "Tomáš Krejčí", role: "Produktový manažer", initials: "TK" },
  { name: "Markéta Horáková", role: "Zákaznická péče", initials: "MH" },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>O nás | Internetový obchod</title>
        <meta name="description" content="Kdo jsme a co nás pohání" />
      </Head>
      <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="border-b border-gray-100 pb-16 space-y-6">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">O nás</p>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Obchodujeme<br />
          <span className="text-gray-300">s vášní</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
          Vznikli jsme v roce 2026 s jedním cílem — přinést lidem produkty, které opravdu chtějí, bez zbytečného hluku a přeplněných stránek. Jednoduchý obchod, poctivé zboží.
        </p>
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">Náš příběh</h2>
          <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
            <p>
              Všechno začalo v malém bytě, kde jsme si uvědomili, že nakupování online nemusí být chaos. Přeplněné e-shopy, nekonečné filtry a nejasné ceny — rozhodli jsme se, že to půjde jinak.
            </p>
            <p>
              Dnes provozujeme obchod, kde každý produkt má své místo a každý zákazník dostane odpověď do hodiny. Nejsme největší, ale snažíme se být nejlepší v tom, co děláme.
            </p>
          </div>
        </div>
        <div className="aspect-video bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center space-y-3 text-gray-200">
            <ShoppingBag className="w-16 h-16 mx-auto" />
            <p className="text-xs font-black uppercase tracking-widest">Od roku 2026</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-10">
        <h2 className="text-3xl font-black uppercase tracking-tight">Naše hodnoty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-4 p-8 border border-gray-100 rounded-2xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight">{title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-10">
        <h2 className="text-3xl font-black uppercase tracking-tight">Tým</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map(({ name, role, initials }) => (
            <div key={name} className="flex items-center gap-5 p-6 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-base font-black shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-black text-black">{name}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        {[
          { value: "2 400+", label: "Spokojených zákazníků" },
          { value: "180+", label: "Produktů v nabídce" },
          { value: "24 h", label: "Čas odeslání" },
          { value: "4.9★", label: "Průměrné hodnocení" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-white px-8 py-10 text-center space-y-2">
            <p className="text-3xl font-black tracking-tighter">{value}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
          </div>
        ))}
      </section>
    </div>
    </>
  );
}
