'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function DirectionProvider() {
  const { language } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = language === 'ar' 
      ? 'var(--font-cairo)' 
      : 'var(--font-geist-sans)';
  }, [language]);

  return null;
}
