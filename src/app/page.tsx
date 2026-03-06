'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Link2, 
  Zap, 
  Wallet, 
  Users, 
  Shield, 
  TrendingUp,
  ChevronRight,
  Copy,
  Check,
  Globe,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  const { language } = useAppStore();
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    // Simulate shortening
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8);
      setShortenedUrl(`linkat.bid/${code}`);
      setLoading(false);
    }, 1000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: Zap,
      titleAr: 'اختصار فوري',
      titleEn: 'Instant Shortening',
      descAr: 'اختصار روابطك في ثوانٍ معدودة مع دعم الروابط المخصصة',
      descEn: 'Shorten your links in seconds with custom URL support'
    },
    {
      icon: DollarSign,
      titleAr: 'أرباح حقيقية',
      titleEn: 'Real Earnings',
      descAr: 'احصل على 50% من أرباح الإعلانات على كل نقرة',
      descEn: 'Get 50% of ad revenue on every click'
    },
    {
      icon: Users,
      titleAr: 'نظام إحالة',
      titleEn: 'Referral System',
      descAr: 'اكسب 20% إضافية من أرباح المسجلين برابطك',
      descEn: 'Earn extra 20% from users who sign up with your link'
    },
    {
      icon: Wallet,
      titleAr: 'دفعات فورية',
      titleEn: 'Instant Payouts',
      descAr: 'سحب أرباحك بالعملات الرقمية USDT فوراً',
      descEn: 'Withdraw your earnings in USDT cryptocurrency instantly'
    },
    {
      icon: Shield,
      titleAr: 'حماية متقدمة',
      titleEn: 'Advanced Protection',
      descAr: 'نظام حماية ضد الروابط الضارة والاحتيال',
      descEn: 'Protection system against malicious links and fraud'
    },
    {
      icon: TrendingUp,
      titleAr: 'إحصائيات مفصلة',
      titleEn: 'Detailed Analytics',
      descAr: 'تتبع نقراتك ودول الزوار وأجهزتهم بشكل مفصل',
      descEn: 'Track your clicks, visitor countries and devices in detail'
    },
  ];

  const stats = [
    { value: '1M+', labelAr: 'رابط مختصر', labelEn: 'Shortened Links' },
    { value: '500K+', labelAr: 'مستخدم نشط', labelEn: 'Active Users' },
    { value: '$2M+', labelAr: 'أرباح مدفوعة', labelEn: 'Paid Earnings' },
    { value: '150+', labelAr: 'دولة', labelEn: 'Countries' },
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      country: 'السعودية',
      text: 'أفضل منصة لاختصار الروابط. أرباحي تضاعفت خلال شهر واحد!',
      avatar: 'A'
    },
    {
      name: 'Sarah Johnson',
      country: 'USA',
      text: 'Great platform! The instant USDT payouts are amazing.',
      avatar: 'S'
    },
    {
      name: 'محمد علي',
      country: 'مصر',
      text: 'نظام الإحالة ممتاز، أربح من كل شخص يسجل برابطي.',
      avatar: 'M'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-900/25" />
          
          <div className="container relative px-4 py-20 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                {language === 'ar' ? '🚀 منصة #1 لاختصار الروابط' : '🚀 #1 URL Shortener Platform'}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {language === 'ar' 
                  ? 'اختصار روابط ذكي مع أرباح حقيقية'
                  : 'Smart URL Shortening with Real Earnings'}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'حوّل روابطك إلى مصدر دخل. احصل على 50% من أرباح الإعلانات + 20% من نظام الإحالة. دفعات فورية بالعملات الرقمية.'
                  : 'Turn your links into income. Get 50% of ad revenue + 20% from referrals. Instant payouts in cryptocurrency.'}
              </p>

              {/* Quick Shorten Form */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex gap-2 p-2 bg-white dark:bg-card rounded-xl shadow-lg border">
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <Link2 className="w-5 h-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder={language === 'ar' ? 'أدخل الرابط هنا...' : 'Enter your URL here...'}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="border-0 focus-visible:ring-0 text-base"
                    />
                  </div>
                  <Button 
                    onClick={handleShorten}
                    disabled={loading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-6"
                  >
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : language === 'ar' ? (
                      'اختصار'
                    ) : (
                      'Shorten'
                    )}
                  </Button>
                </div>
                
                {shortenedUrl && (
                  <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">{shortenedUrl}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <Link href="/register">
                    {language === 'ar' ? 'ابدأ الآن مجاناً' : 'Start Free Now'}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">
                    {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-emerald-600 dark:bg-emerald-900">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-emerald-100">{language === 'ar' ? stat.labelAr : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'لماذا linkat.bid؟' : 'Why linkat.bid?'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'منصة متكاملة تجمع بين سهولة الاستخدام والأرباح الحقيقية'
                  : 'A complete platform combining ease of use with real earnings'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-emerald-100 dark:border-emerald-900">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                      <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="text-lg">
                      {language === 'ar' ? feature.titleAr : feature.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {language === 'ar' ? feature.descAr : feature.descEn}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'خطط الأسعار' : 'Pricing Plans'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'اختر الخطة المناسبة لك. التسجيل مجاني!'
                  : 'Choose the plan that suits you. Registration is free!'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {language === 'ar' ? 'مجاني' : 'Free'}
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">
                    $0
                    <span className="text-base font-normal text-muted-foreground">
                      /{language === 'ar' ? 'للأبد' : 'forever'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? '50% من أرباح الإعلانات' : '50% of ad revenue'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'روابط غير محدودة' : 'Unlimited links'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'إحصائيات أساسية' : 'Basic analytics'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'نظام الإحالة 20%' : '20% referral system'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'حد سحب $5' : '$5 withdrawal limit'}</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/register">
                      {language === 'ar' ? 'ابدأ مجاناً' : 'Start Free'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* VIP Plan */}
              <Card className="relative border-amber-500 dark:border-amber-600">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-amber-500 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    {language === 'ar' ? 'VIP' : 'VIP'}
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">
                    {language === 'ar' ? 'بالدعوة فقط' : 'Invite Only'}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{language === 'ar' ? '70% من أرباح الإعلانات' : '70% of ad revenue'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'روابط مخصصة VIP' : 'VIP custom links'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'إحصائيات متقدمة' : 'Advanced analytics'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'دعم أولوية' : 'Priority support'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'سحب فوري' : 'Instant withdrawal'}</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full mt-4 bg-amber-500 hover:bg-amber-600">
                    <Link href="/upgrade">
                      {language === 'ar' ? 'ترقية الآن' : 'Upgrade Now'}
                      <ChevronRight className="w-4 h-4 mr-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'ماذا يقول المستخدمون؟' : 'What Users Say?'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.country}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'ar' ? 'مستعد لبدء الربح؟' : 'Ready to Start Earning?'}
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'انضم إلى آلاف المستخدمين الذين يربحون المال من روابطهم يومياً'
                : 'Join thousands of users earning money from their links daily'}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
              <Link href="/register">
                {language === 'ar' ? 'إنشاء حساب مجاني' : 'Create Free Account'}
                <ArrowRight className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
