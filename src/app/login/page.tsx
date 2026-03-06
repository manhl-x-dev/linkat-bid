'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Link2, Mail, Lock, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, loading: authLoading, error: authError, clearError } = useAuth();
  const { language, setUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Check if Firebase is configured
  const isFirebaseConfigured = 
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    clearError();

    try {
      if (isFirebaseConfigured) {
        // Use Firebase Auth
        await signInWithEmail(email, password);
        setSuccess(true);
      } else {
        // Fallback to mock auth
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || (language === 'ar' ? 'حدث خطأ' : 'An error occurred'));
          setLoading(false);
          return;
        }

        setUser(data.user);
        setSuccess(true);
      }
    } catch (err) {
      setError(authError || (language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    clearError();

    try {
      if (isFirebaseConfigured) {
        // Use Firebase Google Auth
        await signInWithGoogle();
        setSuccess(true);
      } else {
        // Fallback to mock auth
        const res = await fetch('/api/auth/google', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || (language === 'ar' ? 'حدث خطأ' : 'An error occurred'));
          setGoogleLoading(false);
          return;
        }
        
        setUser(data.user);
        setSuccess(true);
      }
    } catch (err) {
      setError(authError || (language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error'));
    } finally {
      setGoogleLoading(false);
    }
  };

  const displayError = error || authError;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'أدخل بياناتك للوصول إلى حسابك' : 'Enter your credentials to access your account'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'ar' ? 'جاري التحويل...' : 'Redirecting...'}
                </p>
                <Button onClick={() => router.push('/dashboard')} className="w-full">
                  {language === 'ar' ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {isFirebaseConfigured && (
                  <Alert className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
                    <AlertDescription className="text-xs text-emerald-700 dark:text-emerald-300">
                      {language === 'ar' 
                        ? '✅ Firebase مُعد بنجاح' 
                        : '✅ Firebase configured successfully'}
                    </AlertDescription>
                  </Alert>
                )}

                {!isFirebaseConfigured && (
                  <Alert>
                    <AlertDescription className="text-xs">
                      {language === 'ar' 
                        ? '⚠️ Firebase غير مُعد - يعمل في وضع المحاكاة' 
                        : '⚠️ Firebase not configured - Running in demo mode'}
                    </AlertDescription>
                  </Alert>
                )}

                {displayError && (
                  <Alert variant="destructive">
                    <AlertDescription>{displayError}</AlertDescription>
                  </Alert>
                )}

                {/* Google Login Button */}
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || authLoading}
                >
                  {googleLoading ? (
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {language === 'ar' ? 'الدخول بـ Google' : 'Continue with Google'}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {language === 'ar' ? 'أو' : 'Or'}
                    </span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {language === 'ar' ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10 pl-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    disabled={loading || authLoading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : language === 'ar' ? (
                      'دخول'
                    ) : (
                      'Login'
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                    <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      {language === 'ar' ? 'إنشاء حساب' : 'Sign up'}
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
