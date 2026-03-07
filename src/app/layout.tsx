import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "linkat.bid - اختصار روابط ذكي مع أرباح حقيقية",
   description: "منصة اختصار الروابط بالعملات الرقمية. اكسب 50% من أرباح الإعلانات + 20% من نظام الإحالة. دفعات فورية بالـ USDT.",
   keywords: ["اختصار روابط", "ربح المال", "USDT", "عملات رقمية", "linkat.bid", "URL shortener"],  authors: [{ name: "Manhl_X" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "linkat.bid - Smart URL Shortener",
    description: "Smart URL shortening with real earnings. Get 50% ad revenue + 20% referral commission.",
    url: "https://linkat.bid",
    siteName: "linkat.bid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "linkat.bid - Smart URL Shortener",
    description: "Smart URL shortening with real earnings. Get 50% ad revenue + 20% referral commission.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
          className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} font-[family-name:var(--font-cairo)] antialiased bg-background text-foreground`}
       >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
