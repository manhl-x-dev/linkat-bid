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
  const { user, language } = useAppStore();
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/links/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          targetUrl: url
        })
      });
      const data = await res.json();
      if (res.ok) {
        setShortenedUrl(`linkat.bid/${data.link.shortCode}`);
      } else {
        alert(data.error || 'Error shortening link');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const oldHandleShorten = async () => {
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
      titleAr: 'Ø§Ø®ØªØµØ§Ø± ÙÙØ±Ù',
      titleEn: 'Instant Shortening',
      descAr: 'Ø§Ø®ØªØµØ§Ø± Ø±ÙØ§Ø¨Ø·Ù ÙÙ Ø«ÙØ§ÙÙ ÙØ¹Ø¯ÙØ¯Ø© ÙØ¹ Ø¯Ø¹Ù Ø§ÙØ±ÙØ§Ø¨Ø· Ø§ÙÙØ®ØµØµØ©',
      descEn: 'Shorten your links in seconds with custom URL support'
    },
    {
      icon: DollarSign,
      titleAr: 'Ø£Ø±Ø¨Ø§Ø­ Ø­ÙÙÙÙØ©',
      titleEn: 'Real Earnings',
      descAr: 'Ø§Ø­ØµÙ Ø¹ÙÙ 50% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙØ¥Ø¹ÙØ§ÙØ§Øª Ø¹ÙÙ ÙÙ ÙÙØ±Ø©',
      descEn: 'Get 50% of ad revenue on every click'
    },
    {
      icon: Users,
      titleAr: 'ÙØ¸Ø§Ù Ø¥Ø­Ø§ÙØ©',
      titleEn: 'Referral System',
      descAr: 'Ø§ÙØ³Ø¨ 20% Ø¥Ø¶Ø§ÙÙØ© ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙÙØ³Ø¬ÙÙÙ Ø¨Ø±Ø§Ø¨Ø·Ù',
      descEn: 'Earn extra 20% from users who sign up with your link'
    },
    {
      icon: Wallet,
      titleAr: 'Ø¯ÙØ¹Ø§Øª ÙÙØ±ÙØ©',
      titleEn: 'Instant Payouts',
      descAr: 'Ø³Ø­Ø¨ Ø£Ø±Ø¨Ø§Ø­Ù Ø¨Ø§ÙØ¹ÙÙØ§Øª Ø§ÙØ±ÙÙÙØ© USDT ÙÙØ±Ø§Ù',
      descEn: 'Withdraw your earnings in USDT cryptocurrency instantly'
    },
    {
      icon: Shield,
      titleAr: 'Ø­ÙØ§ÙØ© ÙØªÙØ¯ÙØ©',
      titleEn: 'Advanced Protection',
      descAr: 'ÙØ¸Ø§Ù Ø­ÙØ§ÙØ© Ø¶Ø¯ Ø§ÙØ±ÙØ§Ø¨Ø· Ø§ÙØ¶Ø§Ø±Ø© ÙØ§ÙØ§Ø­ØªÙØ§Ù',
      descEn: 'Protection system against malicious links and fraud'
    },
    {
      icon: TrendingUp,
      titleAr: 'Ø¥Ø­ØµØ§Ø¦ÙØ§Øª ÙÙØµÙØ©',
      titleEn: 'Detailed Analytics',
      descAr: 'ØªØªØ¨Ø¹ ÙÙØ±Ø§ØªÙ ÙØ¯ÙÙ Ø§ÙØ²ÙØ§Ø± ÙØ£Ø¬ÙØ²ØªÙÙ Ø¨Ø´ÙÙ ÙÙØµÙ',
      descEn: 'Track your clicks, visitor countries and devices in detail'
    },
  ];

  const stats = [
    { value: '1M+', labelAr: 'Ø±Ø§Ø¨Ø· ÙØ®ØªØµØ±', labelEn: 'Shortened Links' },
    { value: '500K+', labelAr: 'ÙØ³ØªØ®Ø¯Ù ÙØ´Ø·', labelEn: 'Active Users' },
    { value: '$2M+', labelAr: 'Ø£Ø±Ø¨Ø§Ø­ ÙØ¯ÙÙØ¹Ø©', labelEn: 'Paid Earnings' },
    { value: '150+', labelAr: 'Ø¯ÙÙØ©', labelEn: 'Countries' },
  ];

  const testimonials = [
    {
      name: 'Ø£Ø­ÙØ¯ ÙØ­ÙØ¯',
      country: 'Ø§ÙØ³Ø¹ÙØ¯ÙØ©',
      text: 'Ø£ÙØ¶Ù ÙÙØµØ© ÙØ§Ø®ØªØµØ§Ø± Ø§ÙØ±ÙØ§Ø¨Ø·. Ø£Ø±Ø¨Ø§Ø­Ù ØªØ¶Ø§Ø¹ÙØª Ø®ÙØ§Ù Ø´ÙØ± ÙØ§Ø­Ø¯!',
      avatar: 'A'
    },
    {
      name: 'Sarah Johnson',
      country: 'USA',
      text: 'Great platform! The instant USDT payouts are amazing.',
      avatar: 'S'
    },
    {
      name: 'ÙØ­ÙØ¯ Ø¹ÙÙ',
      country: 'ÙØµØ±',
      text: 'ÙØ¸Ø§Ù Ø§ÙØ¥Ø­Ø§ÙØ© ÙÙØªØ§Ø²Ø Ø£Ø±Ø¨Ø­ ÙÙ ÙÙ Ø´Ø®Øµ ÙØ³Ø¬Ù Ø¨Ø±Ø§Ø¨Ø·Ù.',
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
                {language === 'ar' ? 'ð ÙÙØµØ© #1 ÙØ§Ø®ØªØµØ§Ø± Ø§ÙØ±ÙØ§Ø¨Ø·' : 'ð #1 URL Shortener Platform'}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {language === 'ar' 
                  ? 'Ø§Ø®ØªØµØ§Ø± Ø±ÙØ§Ø¨Ø· Ø°ÙÙ ÙØ¹ Ø£Ø±Ø¨Ø§Ø­ Ø­ÙÙÙÙØ©'
                  : 'Smart URL Shortening with Real Earnings'}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'Ø­ÙÙÙ Ø±ÙØ§Ø¨Ø·Ù Ø¥ÙÙ ÙØµØ¯Ø± Ø¯Ø®Ù. Ø§Ø­ØµÙ Ø¹ÙÙ 50% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙØ¥Ø¹ÙØ§ÙØ§Øª + 20% ÙÙ ÙØ¸Ø§Ù Ø§ÙØ¥Ø­Ø§ÙØ©. Ø¯ÙØ¹Ø§Øª ÙÙØ±ÙØ© Ø¨Ø§ÙØ¹ÙÙØ§Øª Ø§ÙØ±ÙÙÙØ©.'
                  : 'Turn your links into income. Get 50% of ad revenue + 20% from referrals. Instant payouts in cryptocurrency.'}
              </p>

              {/* Quick Shorten Form */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex gap-2 p-2 bg-white dark:bg-card rounded-xl shadow-lg border">
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <Link2 className="w-5 h-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder={language === 'ar' ? 'Ø£Ø¯Ø®Ù Ø§ÙØ±Ø§Ø¨Ø· ÙÙØ§...' : 'Enter your URL here...'}
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
                      'Ø§Ø®ØªØµØ§Ø±'
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
                    {language === 'ar' ? 'Ø§Ø¨Ø¯Ø£ Ø§ÙØ¢Ù ÙØ¬Ø§ÙØ§Ù' : 'Start Free Now'}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">
                    {language === 'ar' ? 'ÙÙØ­Ø© Ø§ÙØªØ­ÙÙ' : 'Dashboard'}
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
                {language === 'ar' ? 'ÙÙØ§Ø°Ø§ linkat.bidØ' : 'Why linkat.bid?'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'ÙÙØµØ© ÙØªÙØ§ÙÙØ© ØªØ¬ÙØ¹ Ø¨ÙÙ Ø³ÙÙÙØ© Ø§ÙØ§Ø³ØªØ®Ø¯Ø§Ù ÙØ§ÙØ£Ø±Ø¨Ø§Ø­ Ø§ÙØ­ÙÙÙÙØ©'
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
                {language === 'ar' ? 'Ø®Ø·Ø· Ø§ÙØ£Ø³Ø¹Ø§Ø±' : 'Pricing Plans'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'Ø§Ø®ØªØ± Ø§ÙØ®Ø·Ø© Ø§ÙÙÙØ§Ø³Ø¨Ø© ÙÙ. Ø§ÙØªØ³Ø¬ÙÙ ÙØ¬Ø§ÙÙ!'
                  : 'Choose the plan that suits you. Registration is free!'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {language === 'ar' ? 'ÙØ¬Ø§ÙÙ' : 'Free'}
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">
                    $0
                    <span className="text-base font-normal text-muted-foreground">
                      /{language === 'ar' ? 'ÙÙØ£Ø¨Ø¯' : 'forever'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? '50% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙØ¥Ø¹ÙØ§ÙØ§Øª' : '50% of ad revenue'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'Ø±ÙØ§Ø¨Ø· ØºÙØ± ÙØ­Ø¯ÙØ¯Ø©' : 'Unlimited links'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'Ø¥Ø­ØµØ§Ø¦ÙØ§Øª Ø£Ø³Ø§Ø³ÙØ©' : 'Basic analytics'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'ÙØ¸Ø§Ù Ø§ÙØ¥Ø­Ø§ÙØ© 20%' : '20% referral system'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>{language === 'ar' ? 'Ø­Ø¯ Ø³Ø­Ø¨ $5' : '$5 withdrawal limit'}</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/register">
                      {language === 'ar' ? 'Ø§Ø¨Ø¯Ø£ ÙØ¬Ø§ÙØ§Ù' : 'Start Free'}
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
                    {language === 'ar' ? 'Ø¨Ø§ÙØ¯Ø¹ÙØ© ÙÙØ·' : 'Invite Only'}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{language === 'ar' ? '70% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙØ¥Ø¹ÙØ§ÙØ§Øª' : '70% of ad revenue'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'Ø±ÙØ§Ø¨Ø· ÙØ®ØµØµØ© VIP' : 'VIP custom links'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'Ø¥Ø­ØµØ§Ø¦ÙØ§Øª ÙØªÙØ¯ÙØ©' : 'Advanced analytics'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'Ø¯Ø¹Ù Ø£ÙÙÙÙØ©' : 'Priority support'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-amber-500" />
                      <span>{language === 'ar' ? 'Ø³Ø­Ø¨ ÙÙØ±Ù' : 'Instant withdrawal'}</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full mt-4 bg-amber-500 hover:bg-amber-600">
                    <Link href="/upgrade">
                      {language === 'ar' ? 'ØªØ±ÙÙØ© Ø§ÙØ¢Ù' : 'Upgrade Now'}
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
                {language === 'ar' ? 'ÙØ§Ø°Ø§ ÙÙÙÙ Ø§ÙÙØ³ØªØ®Ø¯ÙÙÙØ' : 'What Users Say?'}
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
              {language === 'ar' ? 'ÙØ³ØªØ¹Ø¯ ÙØ¨Ø¯Ø¡ Ø§ÙØ±Ø¨Ø­Ø' : 'Ready to Start Earning?'}
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'Ø§ÙØ¶Ù Ø¥ÙÙ Ø¢ÙØ§Ù Ø§ÙÙØ³ØªØ®Ø¯ÙÙÙ Ø§ÙØ°ÙÙ ÙØ±Ø¨Ø­ÙÙ Ø§ÙÙØ§Ù ÙÙ Ø±ÙØ§Ø¨Ø·ÙÙ ÙÙÙÙØ§Ù'
                : 'Join thousands of users earning money from their links daily'}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">
              <Link href="/register">
                {language === 'ar' ? 'Ø¥ÙØ´Ø§Ø¡ Ø­Ø³Ø§Ø¨ ÙØ¬Ø§ÙÙ' : 'Create Free Account'}
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
