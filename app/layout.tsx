import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/shop/CartProvider";
import NativeShell from "@/components/native/NativeShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lens & Light | Photography Portfolio",
    template: "%s | Lens & Light",
  },
  description:
    "Professional photography portfolio featuring weddings, portraits, events, and landscapes. Capturing authentic moments through natural light.",
  keywords: ["photography", "wedding photographer", "portrait", "portfolio"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lens & Light",
  },
  openGraph: {
    title: "Lens & Light | Photography Portfolio",
    description:
      "Professional photography portfolio featuring weddings, portraits, events, and landscapes.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <NativeShell />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
