'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Users, 
  Copy,
  Check,
  Share2,
  Gift,
  TrendingUp,
  Twitter,
  Facebook,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';

export default function ReferralPage() {
  const { user, isAuthenticated, language } = useAppStore();
  const [copied, setCopied] = useState(false);

  const referralLink = `linkat.bid/ref/${user?.referralCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(language === 'ar' ? 'انضموا معي في linkat.bid واكسبوا المال من روابطكم!' : 'Join me on linkat.bid and earn money from your links!')}&url=${encodeURIComponent(`https://${referralLink}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://${referralLink}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(`https://${referralLink}`)}&text=${encodeURIComponent(language === 'ar' ? 'انضموا معي في linkat.bid!' : 'Join me on linkat.bid!')}`,
  };

  if (!isAuthenticated) return null;

  const userType = user?.isVip ? 'vip' : user?.role === 'admin' ? 'admin' : 'user';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar type={userType as any} />
        
        <main className="flex-1 mr-0 md:mr-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">
                {language === 'ar' ? 'برنامج الإحالة' : 'Referral Program'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'ادعُ أصدقاءك واكسب 20% من أرباحهم مدى الحياة'
                  : 'Invite friends and earn 20% of their earnings forever'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{language === 'ar' ? 'رصيد الإحالة' : 'Referral Balance'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    ${user?.referralBalance.toFixed(2) || '0.00'}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{language === 'ar' ? 'المسجلين' : 'Referrals'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    0
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{language === 'ar' ? 'أرباحك' : 'Your Earnings'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">
                    20%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Link */}
            <Card className="mb-6 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  {language === 'ar' ? 'رابط الإحالة الخاص بك' : 'Your Referral Link'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'شارك هذا الرابط مع أصدقائك'
                    : 'Share this link with your friends'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-muted"
                  />
                  <Button onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer">
                      <Send className="w-4 h-4 mr-2" />
                      Telegram
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'كيف يعمل؟' : 'How it works?'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {language === 'ar' ? 'شارك رابط الإحالة' : 'Share your referral link'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'أرسل رابطك لأصدقائك على وسائل التواصل'
                          : 'Send your link to friends on social media'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {language === 'ar' ? 'تسجيل الأصدقاء' : 'Friends sign up'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'عند تسجيلهم برابطك، يصبحون تحت إحالتك'
                          : 'When they sign up with your link, they become your referrals'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {language === 'ar' ? 'اكسب 20% مدى الحياة' : 'Earn 20% forever'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'احصل على 20% من جميع أرباحهم تلقائياً'
                          : 'Get 20% of all their earnings automatically'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
