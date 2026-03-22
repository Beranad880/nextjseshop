import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "Moderní Obchod | 2026",
  description: "Exkluzivní výběr prémiových produktů",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
