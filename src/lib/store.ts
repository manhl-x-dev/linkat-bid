import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  balance: number;
  referralBalance: number;
  referralCode: string;
  isVip: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'ar' | 'en' | 'fr' | 'es' | 'it' | 'zh';
  theme: 'light' | 'dark' | 'system';
  
  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  setLanguage: (lang: 'ar' | 'en' | 'fr' | 'es' | 'it' | 'zh') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  updateBalance: (balance: number, referralBalance?: number) => void;
}

// Custom storage that gracefully handles SSR and restricted environments
const safeStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(name, value);
    } catch {
      // Storage not available, fail silently
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(name);
    } catch {
      // Storage not available, fail silently
    }
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      language: 'ar',
      theme: 'system',
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      setLanguage: (language) => set({ language }),
      
      setTheme: (theme) => set({ theme }),
      
      updateBalance: (balance, referralBalance) => set((state) => ({
        user: state.user ? {
          ...state.user,
          balance,
          referralBalance: referralBalance ?? state.user.referralBalance
        } : null
      }))
    }),
    {
      name: 'linkat-storage',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Settings store for site configuration
interface SiteConfig {
  siteName: string;
  siteUrl: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  copyrightText: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    telegram?: string;
    whatsapp?: string;
  };
  defaultProfitShare: number;
  vipProfitShare: number;
  referralCommission: number;
  minWithdrawal: number;
  supportedNetworks: string[];
}

interface SettingsState {
  config: SiteConfig;
  setConfig: (config: Partial<SiteConfig>) => void;
}

const defaultConfig: SiteConfig = {
  siteName: 'linkat.bid',
  siteUrl: 'https://linkat.bid',
  logo: '/logo.svg',
  primaryColor: '#10b981',
  secondaryColor: '#059669',
  copyrightText: '© 2024 linkat.bid. جميع الحقوق محفوظة. Developed by Manhl_X',
  socialLinks: {
    facebook: '',
    twitter: '',
    telegram: '',
    whatsapp: ''
  },
  defaultProfitShare: 50,
  vipProfitShare: 70,
  referralCommission: 20,
  minWithdrawal: 5,
  supportedNetworks: ['TRC20', 'BEP20']
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig }
      }))
    }),
    {
      name: 'linkat-settings',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
