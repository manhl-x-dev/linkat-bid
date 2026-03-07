import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all email templates
export async function GET() {
  try {
    const templates = await db.emailTemplate.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch email templates' }, { status: 500 });
  }
}

// POST - Create or update an email template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, subject, subjectEn, body: templateBody, bodyEn, variables } = body;
    
    if (!name || !subject || !templateBody) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    if (id) {
      // Update existing
      const updated = await db.emailTemplate.update({
        where: { id },
        data: {
          subject,
          subjectEn,
          body: templateBody,
          bodyEn,
          variables
        }
      });
      return NextResponse.json({ success: true, template: updated });
    } else {
      // Create new
      const created = await db.emailTemplate.create({
        data: {
          name,
          subject,
          subjectEn,
          body: templateBody,
          bodyEn,
          variables
        }
      });
      return NextResponse.json({ success: true, template: created });
    }
  } catch (error) {
    console.error('Error saving email template:', error);
    return NextResponse.json({ success: false, error: 'Failed to save email template' }, { status: 500 });
  }
}
