'use client';

import { useAppStore } from '@/lib/store';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  const { language } = useAppStore();

  const content = language === 'ar' ? {
    title: 'سياسة الخصوصية',
    lastUpdate: 'آخر تحديث: يناير 2024',
    sections: [
      {
        title: 'معلومات ن جمعها',
        content: 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وبريدك الإلكتروني عند التسجيل. نجمع أيضاً معلومات تقنية مثل عنوان IP ونوع المتصفح.'
      },
      {
        title: 'كيف نستخدم معلوماتك',
        content: 'نستخدم معلوماتك لتقديم خدماتنا، وتحسين تجربة المستخدم، وإرسال إشعارات مهمة، ومنع الاحتيال.'
      },
      {
        title: 'مشاركة المعلومات',
        content: 'لا نبيع معلوماتك الشخصية. قد نشاركها مع مقدمي الخدمات الذين يساعدوننا في تشغيل الموقع.'
      },
      {
        title: 'الأمان',
        content: 'نتخذ إجراءات أمنية لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح.'
      },
      {
        title: 'ملفات تعريف الارتباط',
        content: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع. يمكنك تعطيلها من إعدادات المتصفح.'
      },
      {
        title: 'حقوقك',
        content: 'لديك الحق في الوصول إلى بياناتك، وتصحيحها، وحذفها. تواصل معنا لممارسة هذه الحقوق.'
      }
    ]
  } : {
    title: 'Privacy Policy',
    lastUpdate: 'Last updated: January 2024',
    sections: [
      {
        title: 'Information We Collect',
        content: 'We collect information you provide directly, such as your name and email when you register. We also collect technical information like IP address and browser type.'
      },
      {
        title: 'How We Use Your Information',
        content: 'We use your information to provide our services, improve user experience, send important notifications, and prevent fraud.'
      },
      {
        title: 'Sharing Information',
        content: 'We do not sell your personal information. We may share it with service providers who help us operate the site.'
      },
      {
        title: 'Security',
        content: 'We take security measures to protect your information from unauthorized access, modification, or disclosure.'
      },
      {
        title: 'Cookies',
        content: 'We use cookies to improve your experience and analyze site usage. You can disable them from your browser settings.'
      },
      {
        title: 'Your Rights',
        content: 'You have the right to access, correct, and delete your data. Contact us to exercise these rights.'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
            <p className="text-muted-foreground">{content.lastUpdate}</p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
