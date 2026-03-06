'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';

export default function AdminReservedWordsPage() {
  const { language } = useAppStore();
  const [newWord, setNewWord] = useState('');
  const [words, setWords] = useState([
    'admin', 'api', 'login', 'register', 'dashboard', 'settings', 
    'wallet', 'withdraw', 'user', 'users', 'links', 'blog',
    'privacy', 'terms', 'faq', 'contact', 'help', 'referral'
  ]);

  const handleAdd = () => {
    if (newWord && !words.includes(newWord.toLowerCase())) {
      setWords([...words, newWord.toLowerCase()]);
      setNewWord('');
    }
  };

  const handleRemove = (word: string) => {
    setWords(words.filter(w => w !== word));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'الإعدادات' : 'Settings'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إدارة إعدادات الموقع والتخصيص' : 'Manage site settings and customization'}
        </p>
      </div>

      {/* Sub Navigation */}
      <SettingsNav />

      {/* Content */}
      <div className="space-y-6">
        {/* Add Word Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === 'ar' ? 'إضافة كلمة جديدة' : 'Add New Word'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? 'أضف كلمات جديدة لا يمكن للمستخدمين استخدامها في الروابط المختصرة' 
                : 'Add new words that users cannot use in short links'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder={language === 'ar' ? 'أدخل الكلمة...' : 'Enter word...'} 
                value={newWord} 
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="flex-1"
              />
              <Button onClick={handleAdd} className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-300">
                  {language === 'ar' ? 'تنبيه' : 'Warning'}
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  {language === 'ar' 
                    ? 'إذا حاول مستخدم إنشاء رابط بكلمة محجوزة، سيتم إضافة رمز عشوائي لتمييزه' 
                    : 'If a user tries to create a link with a reserved word, a random code will be added to distinguish it'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Words List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="w-5 h-5" />
              {language === 'ar' ? `الكلمات المحجوزة (${words.length})` : `Reserved Words (${words.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {words.sort().map((w) => (
                <div 
                  key={w} 
                  className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="font-mono text-sm">{w}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleRemove(w)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
