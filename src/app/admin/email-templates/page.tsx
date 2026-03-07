'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Edit, Eye, Send, UserPlus, Wallet, AlertCircle, Gift, Loader2, Save, X } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface EmailTemplate {
  id: string;
  name: string;
  nameAr: string;
  subject: string;
  subjectAr: string;
  body: string;
  bodyAr: string;
  icon: typeof UserPlus;
  color: string;
  bgColor: string;
  lastUpdated: string;
}

export default function AdminEmailTemplatesPage() {
  const { language } = useAppStore();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    { 
      id: 'welcome',
      name: 'Welcome New User',
      nameAr: 'ترحيب بالمستخدم الجديد',
      subject: 'Welcome to lalinky.com!',
      subjectAr: 'مرحباً بك في lalinky.com!',
      body: 'Hello {username},\n\nWelcome to lalinky.com! We\'re excited to have you on board.\n\nStart shortening your links and earning money today.\n\nBest regards,\nThe lalinky Team',
      bodyAr: 'مرحباً {username},\n\nمرحباً بك في lalinky.com! نحن سعداء بانضمامك إلينا.\n\nابدأ في اختصار روابطك وكسب المال اليوم.\n\nتحياتنا،\nفريق lalinky',
      icon: UserPlus,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 'withdrawal',
      name: 'Withdrawal Confirmation',
      nameAr: 'تأكيد طلب السحب',
      subject: 'Withdrawal Request Received',
      subjectAr: 'تم استلام طلب السحب',
      body: 'Hello {username},\n\nYour withdrawal request for ${amount} has been received and is being processed.\n\nYou will receive another email once the payment is sent.\n\nThank you for using lalinky.com!',
      bodyAr: 'مرحباً {username},\n\nتم استلام طلب السحب بقيمة ${amount} وسيتم معالجته قريباً.\n\nستتلقى بريداً إلكترونياً آخر عند إرسال الدفعة.\n\nشكراً لاستخدامك lalinky.com!',
      icon: Wallet,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      lastUpdated: '2024-01-10'
    },
    { 
      id: 'withdrawal-complete',
      name: 'Withdrawal Complete',
      nameAr: 'تم السحب بنجاح',
      subject: 'Amount sent to your wallet',
      subjectAr: 'تم إرسال المبلغ إلى محفظتك',
      body: 'Hello {username},\n\nGreat news! Your withdrawal of ${amount} has been processed and sent to your wallet.\n\nTransaction: {transaction_id}\n\nThank you for using lalinky.com!',
      bodyAr: 'مرحباً {username},\n\nأخبار رائعة! تم معالجة سحبك بقيمة ${amount} وإرسالها إلى محفظتك.\n\nالمعاملة: {transaction_id}\n\nشكراً لاستخدامك lalinky.com!',
      icon: Send,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      lastUpdated: '2024-01-10'
    },
    { 
      id: 'referral',
      name: 'New Referral Notification',
      nameAr: 'إشعار إحالة جديدة',
      subject: 'Someone joined through your link!',
      subjectAr: 'انضم شخص جديد من خلال رابطك!',
      body: 'Hello {username},\n\nGreat news! Someone just signed up using your referral link.\n\nYou\'ll earn {commission}% of their earnings!\n\nKeep sharing your link to earn more.\n\nBest regards,\nThe lalinky Team',
      bodyAr: 'مرحباً {username},\n\nأخبار رائعة! قام شخص ما بالتسجيل باستخدام رابط الإحالة الخاص بك.\n\nستكسب {commission}% من أرباحه!\n\nاستمر في مشاركة رابطك لكسب المزيد.\n\nتحياتنا،\nفريق lalinky',
      icon: Gift,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      lastUpdated: '2024-01-08'
    },
    { 
      id: 'report',
      name: 'Report Alert',
      nameAr: 'تنبيه بلاغ',
      subject: 'Link reported',
      subjectAr: 'تم الإبلاغ عن رابط',
      body: 'Hello Admin,\n\nA link has been reported:\n\nLink: {link}\nReason: {reason}\nReported by: {reporter}\n\nPlease review and take appropriate action.\n\nlalinky.com System',
      bodyAr: 'مرحباً أيها المدير،\n\nتم الإبلاغ عن رابط:\n\nالرابط: {link}\nالسبب: {reason}\nالمُبلغ: {reporter}\n\nيرجى المراجعة واتخاذ الإجراء المناسب.\n\nنظام lalinky.com',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900',
      lastUpdated: '2024-01-05'
    },
  ]);

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditSubject(language === 'ar' ? template.subjectAr : template.subject);
    setEditBody(language === 'ar' ? template.bodyAr : template.body);
    setShowEdit(true);
  };

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTemplate) return;
    
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    
    setTemplates(prev => prev.map(t => {
      if (t.id === selectedTemplate.id) {
        return language === 'ar' 
          ? { ...t, subjectAr: editSubject, bodyAr: editBody, lastUpdated: new Date().toISOString().split('T')[0] }
          : { ...t, subject: editSubject, body: editBody, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return t;
    }));
    
    toast.success(language === 'ar' ? 'تم حفظ القالب بنجاح' : 'Template saved successfully');
    setShowEdit(false);
    setSaving(false);
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
      <div className="space-y-4">
        {templates.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.bgColor} flex items-center justify-center`}>
                    <t.icon className={`w-6 h-6 ${t.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{language === 'ar' ? t.nameAr : t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? t.subjectAr : t.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {t.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePreview(t)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'معاينة' : 'Preview'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(t)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'تعديل' : 'Edit'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="w-4 h-4" />
            {language === 'ar' ? 'ملاحظة' : 'Note'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'يمكنك استخدام المتغيرات التالية في القوالب: {username}, {email}, {amount}, {link}, {date}, {transaction_id}, {commission}, {reason}, {reporter}'
              : 'You can use these variables in templates: {username}, {email}, {amount}, {link}, {date}, {transaction_id}, {commission}, {reason}, {reporter}'}
          </p>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'معاينة القالب' : 'Template Preview'}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {language === 'ar' ? 'الموضوع:' : 'Subject:'}
                </p>
                <p className="font-medium">
                  {language === 'ar' ? selectedTemplate.subjectAr : selectedTemplate.subject}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {language === 'ar' ? 'المحتوى:' : 'Content:'}
                </p>
                <pre className="whitespace-pre-wrap text-sm font-sans">
                  {language === 'ar' ? selectedTemplate.bodyAr : selectedTemplate.body}
                </pre>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'تعديل القالب' : 'Edit Template'}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <Label>{language === 'ar' ? 'الموضوع' : 'Subject'}</Label>
                <Input 
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'المحتوى' : 'Content'}</Label>
                <Textarea 
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="mt-1.5 min-h-[200px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEdit(false)}>
                  <X className="w-4 h-4 ml-1" />
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 ml-1" />
                      {language === 'ar' ? 'حفظ' : 'Save'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
