'use client';

import { useEffect } from 'react';

export function UTMCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = {
        source: params.get('utm_source') ?? undefined,
        medium: params.get('utm_medium') ?? undefined,
        campaign: params.get('utm_campaign') ?? undefined,
      };
      if (utm.source || utm.medium || utm.campaign) {
        sessionStorage.setItem('xicun_utm', JSON.stringify(utm));
      }
    } catch {
      /* sessionStorage may be unavailable */
    }
  }, []);
  return null;
}
