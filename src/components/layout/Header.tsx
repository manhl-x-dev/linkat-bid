'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Link2, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Wallet, 
  Settings,
  ChevronDown,
  Globe,
  Crown,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'zh', name: '中文' },
];

export function Header() {
  const { user, isAuthenticated, language, setLanguage, theme, setTheme, setUser } = useAppStore();
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const OWNER_EMAIL = 'manhl.aboufakher@gmail.com';
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is admin from backend
  const checkAdminRole = useCallback(async () => {
    if (!user?.email) return;
    
    try {
      const res = await fetch(`/api/user/refresh?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          // Update the store with fresh user data
          setUser({
            ...user,
            role: data.user.role,
            balance: data.user.balance,
            referralBalance: data.user.referralBalance,
          });
          setIsAdmin(data.user.role === 'admin' || user.email.toLowerCase() === OWNER_EMAIL.toLowerCase());
        }
      }
    } catch (error) {
      console.error('Failed to check admin role:', error);
    }
  }, [user, setUser]);

  // Check admin role on mount and when user changes
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      checkAdminRole();
    }
  }, [isAuthenticated, user?.email, checkAdminRole]);

  // Also check based on current user role
  useEffect(() => {
    if (user?.role) {
      setIsAdmin(user.role.toLowerCase() === 'admin' || user.email.toLowerCase() === OWNER_EMAIL.toLowerCase());
    }
  }, [user?.role]);

  // Apply language and direction to document
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDark = theme === 'dark';
  const isArabic = language === 'ar';
  const isHomePage = pathname === '/';

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { href: '/', label: language === 'ar' ? 'الرئيسية' : 'Home' },
    { href: '/#features', label: language === 'ar' ? 'المميزات' : 'Features' },
    { href: '/#pricing', label: language === 'ar' ? 'الأسعار' : 'Pricing' },
    { href: '/faq', label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
    { href: '/contact', label: language === 'ar' ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <>
      {/* Back Button - Fixed at top corner */}
      {!isHomePage && (
        <button
          onClick={handleBack}
          className={cn(
            "fixed top-20 z-50 p-2 rounded-full bg-background/95 backdrop-blur shadow-md border",
            "hover:bg-accent hover:text-accent-foreground transition-colors",
            isArabic ? "right-20" : "left-4"
          )}
          title={isArabic ? 'الرجوع للصفحة السابقة' : 'Go back to previous page'}
        >
          {isArabic ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <ArrowLeft className="w-5 h-5" />
          )}
        </button>
      )}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            linkat.bid
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={toggleTheme}
            title={isDark 
              ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode')
              : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')
            }
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={cn(language === lang.code && 'bg-accent')}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated && user ? (
            <>
              {/* Balance Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                <Wallet className="w-4 h-4" />
                <span>${user.balance.toFixed(2)}</span>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline font-medium">{user.name}</span>
                    {user.isVip && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                        <Crown className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/links" className="flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      {language === 'ar' ? 'روابطي' : 'My Links'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/wallet" className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      {language === 'ar' ? 'المحفظة' : 'Wallet'}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          {language === 'ar' ? 'إدارة الموقع' : 'Admin Panel'}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-600 dark:text-red-400 cursor-pointer"
                    disabled={loggingOut}
                  >
                    {loggingOut ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <LogOut className="w-4 h-4 mr-2" />
                    )}
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/login">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <Link href="/register">
                  {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t mt-2 pt-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full py-2 text-sm"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>{language === 'ar' ? 'الوضع النهاري' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}</span>
                  </>
                )}
              </button>
              {/* Mobile Language Options */}
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={cn(
                    "block w-full text-left py-2 text-sm",
                    language === lang.code && "text-emerald-600 font-medium"
                  )}
                >
                  {lang.name}
                </button>
              ))}
              {/* Mobile Admin Link */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 py-2 text-sm text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  {language === 'ar' ? 'إدارة الموقع' : 'Admin Panel'}
                </Link>
              )}
              {/* Mobile Logout */}
              {isAuthenticated && user && (
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 w-full py-2 text-sm text-red-600"
                >
                  {loggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
