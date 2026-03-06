'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Link2, 
  Facebook, 
  Twitter, 
  Send,
  MessageCircle,
  Heart
} from 'lucide-react';

export function Footer() {
  const { language } = useAppStore();

  const footerLinks = {
    services: [
      { href: '/#features', label: language === 'ar' ? 'المميزات' : 'Features' },
      { href: '/#pricing', label: language === 'ar' ? 'الأسعار' : 'Pricing' },
      { href: '/calculator', label: language === 'ar' ? 'حاسبة الأرباح' : 'Profit Calculator' },
      { href: '/status', label: language === 'ar' ? 'حالة النظام' : 'System Status' },
    ],
    company: [
      { href: '/about', label: language === 'ar' ? 'حول الموقع' : 'About Us' },
      { href: '/blog', label: language === 'ar' ? 'المدونة' : 'Blog' },
      { href: '/success-stories', label: language === 'ar' ? 'قصص النجاح' : 'Success Stories' },
      { href: '/upgrade', label: language === 'ar' ? 'الترقية لـ VIP' : 'Upgrade to VIP' },
    ],
    support: [
      { href: '/faq', label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
      { href: '/contact', label: language === 'ar' ? 'تواصل معنا' : 'Contact Us' },
      { href: '/report', label: language === 'ar' ? 'الإبلاغ عن مخالفة' : 'Report Abuse' },
      { href: '/community-rules', label: language === 'ar' ? 'قواعد المجتمع' : 'Community Rules' },
    ],
    legal: [
      { href: '/privacy', label: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy' },
      { href: '/terms', label: language === 'ar' ? 'شروط الخدمة' : 'Terms of Service' },
    ],
  };

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                linkat.bid
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'منصة اختصار الروابط بالعملات الرقمية. اكسب المال من مشاركة روابطك.'
                : 'Cryptocurrency-powered URL shortener. Earn money by sharing your links.'}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الدعم' : 'Support'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'قانوني' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {language === 'ar' ? 'طرق الدفع:' : 'Payment Methods:'}
              </span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs font-medium">USDT TRC20</span>
                <span className="px-2 py-1 bg-muted rounded text-xs font-medium">USDT BEP20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} linkat.bid. 
            {language === 'ar' ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
            <span className="flex items-center gap-1 mx-1">
              {language === 'ar' ? 'طور بواسطة' : 'Developed by'}
              <Heart className="w-3 h-3 text-red-500" />
              <span className="font-medium text-foreground">Manhl_X</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
