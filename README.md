# Casa Xicun — Hostal Boutique · Tepoztlán

Direct-booking website for Casa Xicun, a boutique social hostel in Tepoztlán, Morelos, México.

**Stack:** Next.js 16 (App Router) · Tailwind 4 · Framer Motion · react-day-picker · Radix UI · lucide-react.

## Run locally

```bash
cd ~/Desktop/casa-xicun
npm install
npm run dev          # http://localhost:3000
```

Routes (each available in EN and ES):
- `/` → redirects to `/en` or `/es` based on browser language
- `/[lang]` — homepage with booking widget
- `/[lang]/rooms` — listing with filters
- `/[lang]/rooms/[slug]` — room detail with reservation card (slugs: `king-suite`, `boho-double`, `social-dorm`, `garden-double`)
- `/[lang]/experiences` — curated experiences
- `/[lang]/the-house` — about + wedding/group inquiry form
- `/[lang]/journal` — editorial blog index
- `/[lang]/contact` — contact form + info
- `/[lang]/book` — 4-step booking wizard (stay → details → extras → review)

## Brand system

Tokens defined in `src/app/globals.css` via Tailwind 4 `@theme`:
- `xicun-black` `#080705` · `xicun-charcoal` `#131210`
- `xicun-gold` `#c9a84c` · `xicun-gold-hov` `#b89740`
- `xicun-cream` `#f5f1e8` · `xicun-stone` `#a8a29e` · `xicun-line` `#2a2724`
- Display: Playfair Display · Body: DM Sans

Use the named utilities (`bg-xicun-gold`, `text-xicun-cream`, `border-xicun-line`) — never `bg-[--xicun-gold]` (Tailwind 4 doesn't resolve that to a CSS var).

## Content / copy

All site copy lives in:
- `src/app/[lang]/dictionaries/en.json`
- `src/app/[lang]/dictionaries/es.json`

Edit either file, save, refresh — hot reload picks it up.

## Placeholders to replace before launch

| Where | What |
| --- | --- |
| `dictionaries/{en,es}.json` `topBar.phone`, `contact.info.phoneValue` | Real phone number (also drives WhatsApp links) |
| `dictionaries/{en,es}.json` `contact.info.emailValue` | Real email |
| `dictionaries/{en,es}.json` `social.testimonials[]` | Real reviews |
| `dictionaries/{en,es}.json` `rooms.items.*.price` | Real prices |
| `dictionaries/{en,es}.json` `footer.address` | Real street address |
| `src/lib/data.ts` `rooms[].rating/reviewCount` | Real numbers |
| `src/lib/data.ts` `rooms[].gallery` | Add real photos per room |
| `.env.local` `NEXT_PUBLIC_GHL_WEBHOOK_URL` | Real GoHighLevel webhook URL |
| `public/images/*` | Replace AI/preview photos with final shoot |
| `src/components/layout/footer.tsx` Instagram href | Real Instagram handle |

## GHL integration

`src/lib/ghl.ts` exposes `pushToGHL({...})`. Forms that post:
- Footer newsletter → `type: 'newsletter'`
- Contact form → `type: 'contact'`
- Wedding/group form (`/the-house`) → `type: 'wedding_group'`
- Booking wizard final step → `type: 'booking_inquiry'`

UTM parameters are captured by `<UTMCapture />` in the root layout and persisted to `sessionStorage` under `xicun_utm`. Every GHL push includes them.

## Deployment (Vercel)

1. `git init && git add . && git commit -m "init"`
2. Push to a GitHub repo
3. Import the repo at https://vercel.com/new
4. Set env var `NEXT_PUBLIC_GHL_WEBHOOK_URL` in the Vercel dashboard
5. Add custom domain → done

## Architecture notes

- **i18n routing**: `[lang]` dynamic segment + `src/proxy.ts` auto-redirects `/` based on `Accept-Language`.
- **Async params**: Next.js 16 requires `await params` — handled in every page/layout.
- **Booking widget**: `src/components/booking/booking-widget.tsx` is the centerpiece (hero variant + mobile stacked). Pushes URL params to `/[lang]/rooms`.
- **Booking wizard**: `src/components/booking/book-wizard.tsx`. State persists to `sessionStorage` under `xicun_book`.
- **WhatsApp**: Floating button in root layout + contextual links in room detail (pre-filled with room and dates).
- **Reduced motion**: Honored via `prefers-reduced-motion` CSS rule in `globals.css`.
