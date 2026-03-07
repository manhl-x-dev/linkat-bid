import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "linkat.bid - Ø§Ø®ØªØµØ§Ø± Ø±ÙØ§Ø¨Ø· Ø°ÙÙ ÙØ¹ Ø£Ø±Ø¨Ø§Ø­ Ø­ÙÙÙÙØ©",
  description: "ÙÙØµØ© Ø§Ø®ØªØµØ§Ø± Ø§ÙØ±ÙØ§Ø¨Ø· Ø¨Ø§ÙØ¹ÙÙØ§Øª Ø§ÙØ±ÙÙÙØ©. Ø§ÙØ³Ø¨ 50% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙØ¥Ø¹ÙØ§ÙØ§Øª + 20% ÙÙ ÙØ¸Ø§Ù Ø§ÙØ¥Ø­Ø§ÙØ©. Ø¯ÙØ¹Ø§Øª ÙÙØ±ÙØ© Ø¨Ø§ÙÙ USDT.",
  keywords: ["Ø§Ø®ØªØµØ§Ø± Ø±ÙØ§Ø¨Ø·", "Ø±Ø¨Ø­ Ø§ÙÙØ§Ù", "USDT", "Ø¹ÙÙØ§Øª Ø±ÙÙÙØ©", "linkat.bid", "URL shortener"],
  authors: [{ name: "Manhl_X" }],
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
    <html lang="ar" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
