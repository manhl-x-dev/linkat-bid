'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Copy,
  Check,
  Gift,
  Twitter,
  Facebook,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReferralPage() {
  const { user, language } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [referralsCount, setReferralsCount] = useState(0);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch('/api/user/referrals', {
          headers: { 'x-user-id': user.id }
        });
        const data = await res.json();
        if (data.success) {
          setReferralsCount(data.referralsCount);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchReferrals();
  }, [user?.id]);

  const referralLink = `lalinky.com/ref/${user?.referralCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(language === 'ar' ? 'Ø§ÙØ¶ÙÙØ§ ÙØ¹Ù ÙÙ lalinky.com ÙØ§ÙØ³Ø¨ÙØ§ Ø§ÙÙØ§Ù ÙÙ Ø±ÙØ§Ø¨Ø·ÙÙ!' : 'Join me on lalinky.com and earn money from your links!')}&url=${encodeURIComponent(`https://${referralLink}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://${referralLink}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(`https://${referralLink}`)}&text=${encodeURIComponent(language === 'ar' ? 'Ø§ÙØ¶ÙÙØ§ ÙØ¹Ù ÙÙ lalinky.com!' : 'Join me on lalinky.com!')}`,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'Ø¨Ø±ÙØ§ÙØ¬ Ø§ÙØ¥Ø­Ø§ÙØ©' : 'Referral Program'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' 
            ? 'Ø§Ø¯Ø¹Ù Ø£ØµØ¯ÙØ§Ø¡Ù ÙØ§ÙØ³Ø¨ 20% ÙÙ Ø£Ø±Ø¨Ø§Ø­ÙÙ ÙØ¯Ù Ø§ÙØ­ÙØ§Ø©'
            : 'Invite friends and earn 20% of their earnings forever'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{language === 'ar' ? 'Ø±ØµÙØ¯ Ø§ÙØ¥Ø­Ø§ÙØ©' : 'Referral Balance'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ${user?.referralBalance.toFixed(2) || '0.00'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{language === 'ar' ? 'Ø§ÙÙØ³Ø¬ÙÙÙ' : 'Referrals'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {referralsCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{language === 'ar' ? 'Ø£Ø±Ø¨Ø§Ø­Ù' : 'Your Earnings'}</CardDescription>
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
            {language === 'ar' ? 'Ø±Ø§Ø¨Ø· Ø§ÙØ¥Ø­Ø§ÙØ© Ø§ÙØ®Ø§Øµ Ø¨Ù' : 'Your Referral Link'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'Ø´Ø§Ø±Ù ÙØ°Ø§ Ø§ÙØ±Ø§Ø¨Ø· ÙØ¹ Ø£ØµØ¯ÙØ§Ø¦Ù'
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
            <Button onClick={handleCopy} className="bg-emerald-500 hover:bg-emerald-600">
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
          <CardTitle>{language === 'ar' ? 'ÙÙÙ ÙØ¹ÙÙØ' : 'How it works?'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium">
                  {language === 'ar' ? 'Ø´Ø§Ø±Ù Ø±Ø§Ø¨Ø· Ø§ÙØ¥Ø­Ø§ÙØ©' : 'Share your referral link'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'Ø£Ø±Ø³Ù Ø±Ø§Ø¨Ø·Ù ÙØ£ØµØ¯ÙØ§Ø¦Ù Ø¹ÙÙ ÙØ³Ø§Ø¦Ù Ø§ÙØªÙØ§ØµÙ'
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
                  {language === 'ar' ? 'ØªØ³Ø¬ÙÙ Ø§ÙØ£ØµØ¯ÙØ§Ø¡' : 'Friends sign up'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'Ø¹ÙØ¯ ØªØ³Ø¬ÙÙÙÙ Ø¨Ø±Ø§Ø¨Ø·ÙØ ÙØµØ¨Ø­ÙÙ ØªØ­Øª Ø¥Ø­Ø§ÙØªÙ'
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
                  {language === 'ar' ? 'Ø§ÙØ³Ø¨ 20% ÙØ¯Ù Ø§ÙØ­ÙØ§Ø©' : 'Earn 20% forever'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'Ø§Ø­ØµÙ Ø¹ÙÙ 20% ÙÙ Ø¬ÙÙØ¹ Ø£Ø±Ø¨Ø§Ø­ÙÙ ØªÙÙØ§Ø¦ÙØ§Ù'
                    : 'Get 20% of all their earnings automatically'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
