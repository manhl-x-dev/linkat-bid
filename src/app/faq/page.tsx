'use client';

import { useAppStore } from '@/lib/store';
import { 
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function FAQPage() {
  const { language } = useAppStore();

  const faqs = [
    {
      question: language === 'ar' ? 'كيف أبدأ الربح من الروابط؟' : 'How do I start earning from links?',
      answer: language === 'ar' 
        ? 'قم بإنشاء حساب مجاني، ثم اخترر أي رابط تريد وشاركه. ستحصل على 50% من أرباح الإعلانات على كل نقرة.'
        : 'Create a free account, then shorten any link you want and share it. You\'ll get 50% of ad revenue on every click.'
    },
    {
      question: language === 'ar' ? 'ما هي طرق السحب المتاحة؟' : 'What withdrawal methods are available?',
      answer: language === 'ar'
        ? 'ندعم العملات الرقمية USDT على شبكات TRC20 و BEP20. الحد الأدنى للسحب هو $5.'
        : 'We support USDT cryptocurrency on TRC20 and BEP20 networks. Minimum withdrawal is $5.'
    },
    {
      question: language === 'ar' ? 'ما هو نظام الإحالة؟' : 'What is the referral system?',
      answer: language === 'ar'
        ? 'عندما يسجل شخص جديد برابط الإحالة الخاص بك، ستحصل على 20% من جميع أرباحه مدى الحياة.'
        : 'When someone signs up with your referral link, you\'ll get 20% of all their earnings forever.'
    },
    {
      question: language === 'ar' ? 'ما هي مميزات VIP؟' : 'What are VIP benefits?',
      answer: language === 'ar'
        ? 'مستخدمي VIP يحصلون على 70% من أرباح الإعلانات (بدلاً من 50%)، إحصائيات متقدمة، دعم أولوية، وسحب فوري.'
        : 'VIP users get 70% of ad revenue (instead of 50%), advanced analytics, priority support, and instant withdrawals.'
    },
    {
      question: language === 'ar' ? 'ما هي المعالجة الذكية للروابط؟' : 'What is smart link processing?',
      answer: language === 'ar'
        ? 'عندما تحاول استخدام اسم محجوز أو مستخدم مسبقاً، يضيف النظام رمزاً خاصاً (مثل ! أو @) ليصبح الرابط متاحاً.'
        : 'When you try to use a reserved or already used name, the system adds a special symbol (like ! or @) to make it available.'
    },
    {
      question: language === 'ar' ? 'هل الروابط لها تاريخ انتهاء؟' : 'Do links have an expiration date?',
      answer: language === 'ar'
        ? 'لا، الروابط لا تنتهي صلاحيتها ما لم يتم حذف حسابك أو حظره.'
        : 'No, links don\'t expire unless your account is deleted or banned.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'إجابات على أكثر الأسئلة شيوعاً'
                : 'Answers to the most common questions'}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-right">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'لم تجد إجابة لسؤالك؟'
                : 'Didn\'t find an answer to your question?'}
            </p>
            <a 
              href="/contact" 
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
