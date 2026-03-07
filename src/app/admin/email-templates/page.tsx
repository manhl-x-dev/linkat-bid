'use client';

import { useState, useEffect, useCallback } from 'react';
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
  subject: string;
  subjectEn: string | null;
  body: string;
  bodyEn: string | null;
  variables: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateDisplay extends EmailTemplate {
  nameAr: string;
  icon: typeof UserPlus;
  color: string;
  bgColor: string;
}

const templateDefaults: { name: string; nameAr: string; icon: typeof UserPlus; color: string; bgColor: string; subject: string; subjectEn: string; body: string; bodyEn: string; }[] = [
  { 
    name: 'welcome',
    nameAr: 'ترحيب بالمستخدم الجديد',
    icon: UserPlus,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900',
    subject: 'مرحباً بك في lalinky.com!',
    subjectEn: 'Welcome to lalinky.com!',
    body: 'مرحباً {username},\n\nمرحباً بك في lalinky.com! نحن سعداء بانضمامك إلينا.\n\nابدأ في اختصار روابطك وكسب المال اليوم.\n\nتحياتنا،\nفريق lalinky',
    bodyEn: 'Hello {username},\n\nWelcome to lalinky.com! We\'re excited to have you on board.\n\nStart shortening your links and earning money today.\n\nBest regards,\nThe lalinky Team'
  },
  { 
    name: 'withdrawal',
    nameAr: 'تأكيد طلب السحب',
    icon: Wallet,
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900',
    subject: 'تم استلام طلب السحب',
    subjectEn: 'Withdrawal Request Received',
    body: 'مرحباً {username},\n\nتم استلام طلب السحب بقيمة ${amount} وسيتم معالجته قريباً.\n\nستتلقى بريداً إلكترونياً آخر عند إرسال الدفعة.\n\nشكراً لاستخدامك lalinky.com!',
    bodyEn: 'Hello {username},\n\nYour withdrawal request for ${amount} has been received and is being processed.\n\nYou will receive another email once the payment is sent.\n\nThank you for using lalinky.com!'
  },
  { 
    name: 'withdrawal-complete',
    nameAr: 'تم السحب بنجاح',
    icon: Send,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    subject: 'تم إرسال المبلغ إلى محفظتك',
    subjectEn: 'Amount sent to your wallet',
    body: 'مرحباً {username},\n\nأخبار رائعة! تم معالجة سحبك بقيمة ${amount} وإرسالها إلى محفظتك.\n\nالمعاملة: {transaction_id}\n\nشكراً لاستخدامك lalinky.com!',
    bodyEn: 'Hello {username},\n\nGreat news! Your withdrawal of ${amount} has been processed and sent to your wallet.\n\nTransaction: {transaction_id}\n\nThank you for using lalinky.com!'
  },
  { 
    name: 'referral',
    nameAr: 'إشعار إحالة جديدة',
    icon: Gift,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    subject: 'انضم شخص جديد من خلال رابطك!',
    subjectEn: 'Someone joined through your link!',
    body: 'مرحباً {username},\n\nأخبار رائعة! قام شخص ما بالتسجيل باستخدام رابط الإحالة الخاص بك.\n\nستكسب {commission}% من أرباحه!\n\nاستمر في مشاركة رابطك لكسب المزيد.\n\nتحياتنا،\nفريق lalinky',
    bodyEn: 'Hello {username},\n\nGreat news! Someone just signed up using your referral link.\n\nYou\'ll earn {commission}% of their earnings!\n\nKeep sharing your link to earn more.\n\nBest regards,\nThe lalinky Team'
  },
  { 
    name: 'report',
    nameAr: 'تنبيه بلاغ',
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900',
    subject: 'تم الإبلاغ عن رابط',
    subjectEn: 'Link reported',
    body: 'مرحباً أيها المدير،\n\nتم الإبلاغ عن رابط:\n\nالرابط: {link}\nالسبب: {reason}\nالمُبلغ: {reporter}\n\nيرجى المراجعة واتخاذ الإجراء المناسب.\n\nنظام lalinky.com',
    bodyEn: 'Hello Admin,\n\nA link has been reported:\n\nLink: {link}\nReason: {reason}\nReported by: {reporter}\n\nPlease review and take appropriate action.\n\nlalinky.com System'
  }
];

export default function AdminEmailTemplatesPage() {
  const { language } = useAppStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDisplay | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [templates, setTemplates] = useState<TemplateDisplay[]>([]);

  // Load templates from database
  const loadTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/email-templates');
      const data = await res.json();
      
      if (data.success && data.templates) {
        // Map database templates to display templates
        const displayTemplates: TemplateDisplay[] = templateDefaults.map(defaultTpl => {
          const dbTemplate = data.templates.find((t: EmailTemplate) => t.name === defaultTpl.name);
          
          if (dbTemplate) {
            return {
              ...dbTemplate,
              nameAr: defaultTpl.nameAr,
              icon: defaultTpl.icon,
              color: defaultTpl.color,
              bgColor: defaultTpl.bgColor
            };
          }
          
          // Create default template in database if not exists
          return {
            id: '',
            name: defaultTpl.name,
            nameAr: defaultTpl.nameAr,
            icon: defaultTpl.icon,
            color: defaultTpl.color,
            bgColor: defaultTpl.bgColor,
            subject: defaultTpl.subject,
            subjectEn: defaultTpl.subjectEn,
            body: defaultTpl.body,
            bodyEn: defaultTpl.bodyEn,
            variables: null,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });
        
        setTemplates(displayTemplates);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      // Use defaults on error
      const defaultTemplates: TemplateDisplay[] = templateDefaults.map(t => ({
        id: '',
        name: t.name,
        nameAr: t.nameAr,
        icon: t.icon,
        color: t.color,
        bgColor: t.bgColor,
        subject: t.subject,
        subjectEn: t.subjectEn,
        body: t.body,
        bodyEn: t.bodyEn,
        variables: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      setTemplates(defaultTemplates);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleEdit = (template: TemplateDisplay) => {
    setSelectedTemplate(template);
    setEditSubject(language === 'ar' ? template.subject : (template.subjectEn || template.subject));
    setEditBody(language === 'ar' ? template.body : (template.bodyEn || template.body));
    setShowEdit(true);
  };

  const handlePreview = (template: TemplateDisplay) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTemplate) return;
    
    setSaving(true);
    
    try {
      const updateData = language === 'ar' 
        ? { subject: editSubject, body: editBody }
        : { subjectEn: editSubject, bodyEn: editBody };
      
      const res = await fetch('/api/admin/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedTemplate.id || undefined,
          name: selectedTemplate.name,
          ...updateData
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update local state
        setTemplates(prev => prev.map(t => {
          if (t.name === selectedTemplate.name) {
            return language === 'ar' 
              ? { ...t, subject: editSubject, body: editBody, updatedAt: new Date() }
              : { ...t, subjectEn: editSubject, bodyEn: editBody, updatedAt: new Date() };
          }
          return t;
        }));
        
        toast.success(language === 'ar' ? 'تم حفظ القالب بنجاح' : 'Template saved successfully');
        setShowEdit(false);
      } else {
        toast.error(language === 'ar' ? 'فشل حفظ القالب' : 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Error saving template');
    } finally {
      setSaving(false);
    }
  };

  const getDisplaySubject = (template: TemplateDisplay) => {
    return language === 'ar' ? template.subject : (template.subjectEn || template.subject);
  };

  const getDisplayBody = (template: TemplateDisplay) => {
    return language === 'ar' ? template.body : (template.bodyEn || template.body);
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

      {initialLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        /* Content */
        <div className="space-y-4">
          {templates.map((t) => (
            <Card key={t.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${t.bgColor} flex items-center justify-center`}>
                      <t.icon className={`w-6 h-6 ${t.color}`} />
                    </div>
                    <div>
                      <p className="font-medium">{language === 'ar' ? t.nameAr : t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getDisplaySubject(t)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {new Date(t.updatedAt).toLocaleDateString()}
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
      )}

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
                  {getDisplaySubject(selectedTemplate)}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {language === 'ar' ? 'المحتوى:' : 'Content:'}
                </p>
                <pre className="whitespace-pre-wrap text-sm font-sans">
                  {getDisplayBody(selectedTemplate)}
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
