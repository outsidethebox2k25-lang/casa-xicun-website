type GHLType = 'booking_inquiry' | 'newsletter' | 'contact' | 'wedding_group';

export type GHLPayload = {
  type: GHLType;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
  roomType?: string;
  totalMXN?: number;
  experiences?: string[];
  notes?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
};

export async function pushToGHL(payload: GHLPayload) {
  const url = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
  if (!url || url.includes('REPLACE_ME')) {
    console.warn('GHL webhook not configured');
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source: 'casa-xicun-website',
        tags: [payload.type, payload.utm?.source ?? 'direct'],
        landing_url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (e) {
    console.error('GHL push failed:', e);
    return false;
  }
}

export function readUTM(): GHLPayload['utm'] {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = sessionStorage.getItem('xicun_utm');
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
