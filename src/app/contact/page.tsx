'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  const { language } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'نحن هنا لمساعدتك. راسلنا وسنرد عليك في أقرب وقت.'
                : 'We\'re here to help. Send us a message and we\'ll respond as soon as possible.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</div>
                      <div className="text-sm text-muted-foreground">support@linkat.bid</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-sm text-muted-foreground">@linkatbid</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">{language === 'ar' ? 'الموقع' : 'Location'}</div>
                      <div className="text-sm text-muted-foreground">{language === 'ar' ? 'عبر الإنترنت' : 'Online'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'أرسل رسالة' : 'Send a Message'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'املأ النموذج أدناه وسنتواصل معك قريباً'
                      : 'Fill out the form below and we\'ll get back to you soon'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === 'ar' ? 'تم إرسال رسالتك!' : 'Message Sent!'}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'ar' 
                          ? 'شكراً لتواصلك معنا. سنرد عليك قريباً.'
                          : 'Thank you for contacting us. We\'ll reply soon.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{language === 'ar' ? 'الاسم' : 'Name'}</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">{language === 'ar' ? 'الموضوع' : 'Subject'}</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{language === 'ar' ? 'الرسالة' : 'Message'}</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'إرسال' : 'Send'}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
