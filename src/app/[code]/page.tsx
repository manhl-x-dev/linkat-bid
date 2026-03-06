'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Link2, 
  Loader2,
  ExternalLink,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Routes that should not be handled by this catch-all page
const RESERVED_ROUTES = [
  'api',
  'login',
  'register',
  'dashboard',
  'admin',
  'faq',
  'contact',
  'privacy',
  'terms',
  '_next',
  'favicon.ico'
];

export default function ResolveLinkPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if this is a reserved route using useMemo
  const isReserved = useMemo(() => RESERVED_ROUTES.includes(code), [code]);

  useEffect(() => {
    // Skip if this is a reserved route
    if (isReserved) {
      return;
    }

    const fetchLink = async () => {
      try {
        const res = await fetch(`/api/links/resolve?code=${code}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Link not found');
          setLoading(false);
          return;
        }

        setTargetUrl(data.targetUrl);
        setLoading(false);
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              window.location.href = data.targetUrl;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setError('An error occurred');
        setLoading(false);
      }
    };

    if (code) {
      fetchLink();
    }
  }, [code, isReserved]);

  // If this is a reserved route, show not found
  if (isReserved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold mb-2">الصفحة غير موجودة</h1>
            <p className="text-muted-foreground mb-4">الرابط الذي تحاول الوصول إليه غير صحيح</p>
            <Button asChild>
              <a href="/">العودة للرئيسية</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-muted-foreground">جاري التحميل...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold mb-2">الرابط غير موجود</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button asChild>
              <a href="/">العودة للرئيسية</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-background p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">linkat.bid</h1>
            <p className="text-muted-foreground">
              سيتم تحويلك خلال {countdown} ثوانٍ...
            </p>
          </div>

          {/* Ad Space */}
          <div className="bg-muted rounded-lg p-4 mb-6 text-center min-h-[100px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">مساحة إعلانية</p>
          </div>

          <Progress value={(5 - countdown) * 20} className="mb-4" />

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              رابط آمن
            </span>
            <span>linkat.bid/{code}</span>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.location.href = targetUrl || '/'}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              الانتقال الآن
            </Button>
            <Button 
              variant="ghost"
              onClick={() => router.push('/')}
            >
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
