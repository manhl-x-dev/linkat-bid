import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch branding settings
export async function GET() {
  try {
    const settings = await db.siteSetting.findMany({
      where: {
        key: {
          in: ['branding_siteName', 'branding_primaryColor', 'branding_secondaryColor', 'branding_logo', 'branding_favicon']
        }
      }
    });
    
    const branding: Record<string, string | null> = {
      siteName: 'lalinky.com',
      primaryColor: '#10b981',
      secondaryColor: '#14b8a6',
      logo: null,
      favicon: null
    };
    
    for (const setting of settings) {
      const key = setting.key.replace('branding_', '');
      branding[key] = setting.value;
    }
    
    return NextResponse.json({ success: true, branding });
  } catch (error) {
    console.error('Error fetching branding:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch branding' }, { status: 500 });
  }
}

// POST - Save branding settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteName, primaryColor, secondaryColor, logo, favicon } = body;
    
    // Helper function to upsert setting
    const upsertSetting = async (key: string, value: string | null | undefined) => {
      if (value === undefined) return; // Skip if not provided
      
      const fullKey = `branding_${key}`;
      const stringValue = value === null ? '' : String(value);
      
      await db.siteSetting.upsert({
        where: { key: fullKey },
        update: { value: stringValue },
        create: { key: fullKey, value: stringValue }
      });
    };
    
    // Save all settings
    await upsertSetting('siteName', siteName || 'lalinky.com');
    await upsertSetting('primaryColor', primaryColor || '#10b981');
    await upsertSetting('secondaryColor', secondaryColor || '#14b8a6');
    await upsertSetting('logo', logo);
    await upsertSetting('favicon', favicon);
    
    return NextResponse.json({ success: true, message: 'Branding saved successfully' });
  } catch (error) {
    console.error('Error saving branding:', error);
    return NextResponse.json({ success: false, error: 'Failed to save branding' }, { status: 500 });
  }
}
