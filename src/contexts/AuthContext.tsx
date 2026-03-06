'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Sync with our backend
      await syncUserWithBackend(result.user);
      
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Sync with our backend
      await syncUserWithBackend(result.user);
      
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      // Sync with our backend
      await syncUserWithBackend(result.user, displayName);
      
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (err: unknown) {
      setError('Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    }
  };

  const clearError = () => setError(null);

  // Sync Firebase user with our backend
  const syncUserWithBackend = async (firebaseUser: User, displayName?: string) => {
    try {
      const token = await firebaseUser.getIdToken();
      
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          displayName: displayName || firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }),
      });
    } catch (err) {
      console.error('Failed to sync user with backend:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorCode = (error as { code?: string }).code;
    
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'هذا البريد الإلكتروني مستخدم بالفعل';
      case 'auth/invalid-email':
        return 'بريد إلكتروني غير صالح';
      case 'auth/operation-not-allowed':
        return 'العملية غير مسموح بها';
      case 'auth/weak-password':
        return 'كلمة المرور ضعيفة جداً';
      case 'auth/user-disabled':
        return 'تم تعطيل هذا الحساب';
      case 'auth/user-not-found':
        return 'لم يتم العثور على حساب بهذا البريد';
      case 'auth/wrong-password':
        return 'كلمة المرور غير صحيحة';
      case 'auth/invalid-credential':
        return 'بيانات الدخول غير صحيحة';
      case 'auth/too-many-requests':
        return 'تم تجاوز عدد المحاولات، حاول لاحقاً';
      case 'auth/popup-closed-by-user':
        return 'تم إغلاق نافذة تسجيل الدخول';
      case 'auth/popup-blocked':
        return 'تم حظر النافذة المنبثقة، يرجى السماح بها';
      default:
        return error.message || 'حدث خطأ غير متوقع';
    }
  }
  return 'حدث خطأ غير متوقع';
}
