import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokoShop",
  description: "Exkluzivní výběr prémiových produktů",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
