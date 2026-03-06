'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { 
  Link2, 
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';

export default function CreateLinkPage() {
  const router = useRouter();
  const { user, isAuthenticated, language } = useAppStore();
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAds, setShowAds] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    shortCode: string;
    displayCode: string;
    wasProcessed: boolean;
    symbol?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/links/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          targetUrl,
          customCode: customCode || undefined,
          title,
          description
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (language === 'ar' ? 'حدث خطأ' : 'An error occurred'));
        return;
      }

      setResult(data.link);
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(`linkat.bid/${result.shortCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const userType = user?.isVip ? 'vip' : user?.role === 'admin' ? 'admin' : 'user';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar type={userType as any} />
        
        <main className="flex-1 mr-0 md:mr-64 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {language === 'ar' ? 'إنشاء رابط مختصر' : 'Create Short Link'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'أدخل الرابط الذي تريد اختصاره'
                  : 'Enter the URL you want to shorten'}
              </p>
            </div>

            {result ? (
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle>
                    {language === 'ar' ? 'تم إنشاء الرابط بنجاح!' : 'Link created successfully!'}
                  </CardTitle>
                  {result.wasProcessed && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {language === 'ar' 
                          ? `تمت معالجة الرابط (${result.symbol})` 
                          : `Link processed (${result.symbol})`}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <code className="flex-1 text-center text-lg font-medium">
                      linkat.bid/{result.shortCode}
                    </code>
                    <Button size="icon" variant="ghost" onClick={handleCopy}>
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setResult(null);
                        setTargetUrl('');
                        setCustomCode('');
                        setTitle('');
                        setDescription('');
                      }}
                    >
                      {language === 'ar' ? 'إنشاء رابط جديد' : 'Create Another'}
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href="/dashboard/links">
                        {language === 'ar' ? 'روابطي' : 'My Links'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="targetUrl">
                        {language === 'ar' ? 'الرابط المستهدف' : 'Target URL'} *
                      </Label>
                      <div className="relative">
                        <ExternalLink className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="targetUrl"
                          type="url"
                          placeholder="https://example.com/very-long-url"
                          value={targetUrl}
                          onChange={(e) => setTargetUrl(e.target.value)}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customCode">
                        {language === 'ar' ? 'كود مخصص (اختياري)' : 'Custom Code (optional)'}
                      </Label>
                      <div className="relative">
                        <Link2 className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="customCode"
                          type="text"
                          placeholder={language === 'ar' ? 'مثال: mylink' : 'Example: mylink'}
                          value={customCode}
                          onChange={(e) => setCustomCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                          className="pr-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar' 
                          ? 'سيتم تطبيق المعالجة الذكية للكلمات المحجوزة'
                          : 'Smart processing will be applied for reserved words'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">
                        {language === 'ar' ? 'العنوان (اختياري)' : 'Title (optional)'}
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder={language === 'ar' ? 'عنوان الرابط' : 'Link title'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        {language === 'ar' ? 'الوصف (اختياري)' : 'Description (optional)'}
                      </Label>
                      <Textarea
                        id="description"
                        placeholder={language === 'ar' ? 'وصف مختصر للرابط' : 'Brief description of the link'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <Label className="cursor-pointer">
                          {language === 'ar' ? 'عرض الإعلانات' : 'Show Ads'}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ar' 
                            ? 'الأرباح من الإعلانات تضاف لرصيدك'
                            : 'Revenue from ads is added to your balance'}
                        </p>
                      </div>
                      <Switch
                        checked={showAds}
                        onCheckedChange={setShowAds}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      disabled={loading || !targetUrl}
                    >
                      {loading ? (
                        <span className="animate-pulse">...</span>
                      ) : language === 'ar' ? (
                        'إنشاء الرابط'
                      ) : (
                        'Create Link'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">
                  {language === 'ar' ? 'نصائح لزيادة الأرباح' : 'Tips to Increase Earnings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' 
                        ? 'شارك روابطك على وسائل التواصل الاجتماعي'
                        : 'Share your links on social media'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' 
                        ? 'استخدم أكواد مخصصة سهلة التذكر'
                        : 'Use custom codes that are easy to remember'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' 
                        ? 'ادعُ أصدقاءك للحصول على 20% من أرباحهم'
                        : 'Invite friends to earn 20% of their earnings'}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
