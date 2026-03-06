'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HelpCircle, Mail, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HelpPage() {
  const { language } = useAppStore();

  const faqs = [
    { q: language === 'ar' ? 'كيف أختصر رابط؟' : 'How to shorten a link?', a: language === 'ar' ? 'بعد تسجيل الدخول، اذهب لإنشاء رابط' : 'After login, go to Create Link' },
    { q: language === 'ar' ? 'كيف أسحب أرباحي؟' : 'How to withdraw?', a: language === 'ar' ? 'الحد الأدنى $10 عبر USDT' : 'Minimum $10 via USDT' },
    { q: language === 'ar' ? 'ما هو نظام الإحالة؟' : 'What is referral system?', a: language === 'ar' ? 'اكسب 20% من أرباح المسجلين عبر رابطك' : 'Earn 20% of referred users earnings' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">{language === 'ar' ? 'مركز المساعدة' : 'Help Center'}</h1>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <Link href="/faq"><Card className="hover:shadow-md transition-shadow cursor-pointer h-full"><CardContent className="pt-6 text-center"><FileText className="w-8 h-8 mx-auto text-emerald-500 mb-3" /><h3 className="font-medium">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</h3></CardContent></Card></Link>
            <Link href="/contact"><Card className="hover:shadow-md transition-shadow cursor-pointer h-full"><CardContent className="pt-6 text-center"><Mail className="w-8 h-8 mx-auto text-blue-500 mb-3" /><h3 className="font-medium">{language === 'ar' ? 'تواصل معنا' : 'Contact'}</h3></CardContent></Card></Link>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full"><CardContent className="pt-6 text-center"><MessageCircle className="w-8 h-8 mx-auto text-purple-500 mb-3" /><h3 className="font-medium">{language === 'ar' ? 'الدعم' : 'Support'}</h3></CardContent></Card>
          </div>
          <Card><CardHeader><CardTitle>{language === 'ar' ? 'أسئلة سريعة' : 'Quick Questions'}</CardTitle></CardHeader>
            <CardContent><div className="space-y-4">{faqs.map((f, i) => <div key={i} className="p-4 border rounded-lg"><h4 className="font-medium mb-2">{f.q}</h4><p className="text-muted-foreground text-sm">{f.a}</p></div>)}</div></CardContent>
          </Card>
          <Card className="mt-6"><CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">{language === 'ar' ? 'لم تجد إجابة؟' : 'Need more help?'}</p>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600"><a href="mailto:support@lalinky.com">{language === 'ar' ? 'راسلنا' : 'Email Us'}</a></Button>
          </CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
