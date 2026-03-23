import MainLayout from "@/components/MainLayout";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
