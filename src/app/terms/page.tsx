'use client';

import { useAppStore } from '@/lib/store';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  const { language } = useAppStore();

  const content = language === 'ar' ? {
    title: 'شروط الخدمة',
    lastUpdate: 'آخر تحديث: يناير 2024',
    sections: [
      {
        title: 'قبول الشروط',
        content: 'باستخدام موقع linkat.bid، فإنك توافق على هذه الشروط. إذا لم توافق، يرجى عدم استخدام الموقع.'
      },
      {
        title: 'استخدام الخدمة',
        content: 'يجب استخدام الخدمة بشكل قانوني فقط. يُحظر استخدامها لأي نشاط غير قانوني أو ضار.'
      },
      {
        title: 'إنشاء الحساب',
        content: 'يجب تقديم معلومات صحيحة عند التسجيل. أنت مسؤول عن الحفاظ على سرية حسابك.'
      },
      {
        title: 'المحتوى والروابط',
        content: 'لا تسمح بروابط تؤدي إلى محتوى غير قانوني أو مسيء أو احتيالي. نحتفظ بالحق في حذف أي رابط مخالف.'
      },
      {
        title: 'الأرباح والمدفوعات',
        content: 'الأرباح تعتمد على عدد النقرات الفعلية. الحد الأدنى للسحب $5. نحتفظ بالحق في تعديل النسب.'
      },
      {
        title: 'حظر الحساب',
        content: 'قد يتم حظر حسابك في حالة مخالفة الشروط أو الاحتيال أو الأنشطة المشبوهة.'
      },
      {
        title: 'التعديلات',
        content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنعلمك بالتغييرات الجوهرية.'
      },
      {
        title: 'المسؤولية',
        content: 'الموقع يقدم "كما هو". لسنا مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الخدمة.'
      }
    ]
  } : {
    title: 'Terms of Service',
    lastUpdate: 'Last updated: January 2024',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By using linkat.bid, you agree to these terms. If you don\'t agree, please don\'t use the site.'
      },
      {
        title: 'Use of Service',
        content: 'The service must be used lawfully only. Using it for any illegal or harmful activity is prohibited.'
      },
      {
        title: 'Account Creation',
        content: 'You must provide accurate information when registering. You are responsible for keeping your account confidential.'
      },
      {
        title: 'Content and Links',
        content: 'Links leading to illegal, offensive, or fraudulent content are not allowed. We reserve the right to delete any violating link.'
      },
      {
        title: 'Earnings and Payments',
        content: 'Earnings depend on actual clicks. Minimum withdrawal is $5. We reserve the right to modify rates.'
      },
      {
        title: 'Account Ban',
        content: 'Your account may be banned in case of terms violation, fraud, or suspicious activities.'
      },
      {
        title: 'Modifications',
        content: 'We reserve the right to modify these terms at any time. We will notify you of material changes.'
      },
      {
        title: 'Liability',
        content: 'The site is provided "as is". We are not liable for any direct or indirect damages resulting from using the service.'
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
              <FileText className="w-8 h-8 text-white" />
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
