# Casa Xicun — Hostal Boutique · Tepoztlán

Sitio de reserva directa para Casa Xicun, hostal boutique social en Tepoztlán, Morelos, México.

**Stack:** Next.js 16 (App Router) · Tailwind 4 · Framer Motion · react-day-picker · Radix UI · lucide-react.

---

## 🚀 Estado actual (mayo 2026)

- **Producción:** https://casa-xicun.vercel.app
- **Repo:** https://github.com/outsidethebox2k25-lang/casa-xicun-website
- **Vercel project:** `smart-scale-ai1/casa-xicun`
- **GHL webhook:** configurado en env var `NEXT_PUBLIC_GHL_WEBHOOK_URL` (encrypted en Vercel)

---

## 💻 Cómo retomar el desarrollo

```bash
cd ~/Desktop/casa-xicun
npm install          # primera vez (regenera node_modules)
npm run dev          # http://localhost:3000
```

Para deploys, después de hacer cambios:

```bash
git add -A
git commit -m "tu mensaje"
git push                 # sube a GitHub
vercel --prod --yes      # deploya a producción
```

---

## 🗺 Rutas (EN + ES auto-detectado)

- `/` → redirige a `/en` o `/es` según `Accept-Language`
- `/[lang]` — homepage con hero + booking widget + 8 secciones
- `/[lang]/rooms` — listing con sidebar de filtros (desktop)
- `/[lang]/rooms/[slug]` — detalle con galería + reservation card
  - Slugs: `king-suite`, `boho-double`, `social-dorm`, `garden-double`
- `/[lang]/experiences` — 6 experiencias curadas
- `/[lang]/the-house` — historia + form de bodas/grupos
- `/[lang]/journal` — blog editorial (3 posts placeholder)
- `/[lang]/contact` — info + form
- `/[lang]/book` — wizard 4 pasos (estancia → datos → extras → review)
- `/sitemap.xml` + `/robots.txt` (auto-generados por Next.js)

---

## 🎨 Brand tokens (en `src/app/globals.css`)

```
xicun-black     #14110d   (texto principal)
xicun-charcoal  #f3eedf   (footer + cards alternativos)
xicun-cream     #fbf7ec   (fondo principal página)
xicun-gold      #a8821f   (acentos, CTAs)
xicun-gold-hov  #8c6c14   (hover)
xicun-stone     #6e655b   (texto secundario / muted)
xicun-line      #ebe3cf   (bordes / divisores)
```

**Fuentes:** Playfair Display (display/headings) · DM Sans (body)

**⚠️ Tailwind 4 gotcha:** usar utilidades nombradas (`bg-xicun-gold`, `text-xicun-cream`), NUNCA arbitrary `bg-[--xicun-gold]` — Tailwind 4 no lo resuelve a CSS var.

---

## ✏️ Editar textos

Todo el copy vive en:
- `src/app/[lang]/dictionaries/en.json`
- `src/app/[lang]/dictionaries/es.json`

Cambia el texto, guarda, refresca el navegador.

---

## 🖼 Fotos

`public/images/`:

| Archivo | Uso |
| --- | --- |
| `logo.png` | Logo dark (negro fondo, blanco texto) |
| `logo-alt.png` | Logo light (blanco fondo, negro texto) — **el que se usa en nav/footer** |
| `tepozteco-hero.jpg` | Hero principal (iglesia + cliffs) — Unsplash |
| `tepozteco-pyramid.jpg` | Destination section — Unsplash |
| `tepozteco-cave.jpg` | Experience section + audience tile — Unsplash |
| `tepozteco-street.jpg` | Final-CTA backdrop — Unsplash |
| `casa-front.jpg` | The-house feature + gallery (foto real de la propiedad) |
| `room-1..4.png` | Cards de habitaciones |
| `photo-01..05.jpg` | Gallery + room detail thumbnails (fotos reales) |

**Para reemplazar:** sustituye el archivo conservando el nombre, o cambia las refs en `src/lib/data.ts` y los componentes.

---

## 📝 Datos placeholder a sustituir antes de publicar

| Dónde | Qué |
| --- | --- |
| `dictionaries/{en,es}.json` `topBar.phone` + `contact.info.phoneValue` | Teléfono real (también dispara los links WhatsApp) |
| `dictionaries/{en,es}.json` `contact.info.emailValue` | Email real |
| `dictionaries/{en,es}.json` `social.testimonials[]` | Reseñas reales |
| `dictionaries/{en,es}.json` `rooms.items.*.price` | Precios reales |
| `dictionaries/{en,es}.json` `footer.address` | Dirección real |
| `src/lib/data.ts` `rooms[].rating/reviewCount` | Números reales |
| `src/lib/data.ts` `rooms[].gallery` | Fotos reales por habitación |
| `src/components/layout/footer.tsx` Instagram href | Handle real de Instagram |
| Vercel env `NEXT_PUBLIC_GHL_WEBHOOK_URL` | Workflow real de GHL |
| `dictionaries/{en,es}.json` `meta.defaultDescription` | Si haces SEO copy más a fondo |

---

## 🔗 Integración GHL (Lead routing)

`src/lib/ghl.ts` expone `pushToGHL({...})`. Forms que postean:

| Form | Tag GHL |
| --- | --- |
| Newsletter (footer) | `newsletter` |
| Contact form (/contact) | `contact` |
| Wedding/group form (/the-house) | `wedding_group` |
| Booking wizard (/book step 4) | `booking_inquiry` |

UTMs (`utm_source`, `utm_medium`, `utm_campaign`) se capturan automáticamente con `<UTMCapture />` en el root layout, se guardan en `sessionStorage` (`xicun_utm`), y se incluyen en cada push a GHL.

**Para crear el workflow en GHL:**
1. Automation → Workflows → New
2. Trigger: Inbound Webhook → copia la URL
3. Pega la URL en Vercel → Settings → Env Variables → `NEXT_PUBLIC_GHL_WEBHOOK_URL` (production + preview + development)
4. Workflow actions: crear Contact con los campos (`firstName`, `email`, `phone`, etc.), tag con `tags[0]`, enviar email/WhatsApp template

---

## 🏗 Arquitectura

- **i18n routing:** `[lang]` dynamic segment + `src/proxy.ts` auto-redirige `/` según `Accept-Language` del navegador
- **Async params:** Next.js 16 requiere `await params` (manejado en cada page/layout)
- **Booking widget:** `src/components/booking/booking-widget.tsx` es el centerpiece (variantes desktop pill + mobile stacked). Push URL params a `/[lang]/rooms`.
- **Booking wizard:** `src/components/booking/book-wizard.tsx`. State persiste en `sessionStorage` (`xicun_book`).
- **WhatsApp:** Floating button (Casa-wide) + links contextuales en room detail (pre-filled con room y fechas)
- **Reduced motion:** Honrado vía `prefers-reduced-motion` en `globals.css`
- **JSON-LD:** `LodgingBusiness` en home + `HotelRoom`+`BreadcrumbList` en cada room detail (`src/components/seo/json-ld.tsx`)
- **Sitemap + robots:** auto-generados (`src/app/sitemap.ts`, `src/app/robots.ts`)

---

## 📁 Estructura

```
src/
├ app/
│  ├ [lang]/
│  │  ├ layout.tsx              ← TopBar + Nav + Footer + WhatsApp float
│  │  ├ page.tsx                ← Homepage
│  │  ├ loading.tsx · error.tsx · not-found.tsx
│  │  ├ dictionaries.ts         ← Loader del dict
│  │  ├ dictionaries/{en,es}.json  ← TODO EL COPY
│  │  ├ rooms/ · book/ · contact/ · experiences/ · the-house/ · journal/
│  ├ globals.css                ← Brand tokens + utilities
│  ├ sitemap.ts · robots.ts
├ components/
│  ├ booking/                   ← BookingWidget, BookWizard, ReservationCard
│  ├ layout/                    ← Nav, Footer, TopBar, LangSwitcher, WhatsAppFloat, UTMCapture
│  ├ primitives/                ← Button, Reveal, Hairline
│  ├ sections/                  ← Hero, ValueBar, RoomsGrid, Experience, AudienceMirror, Gallery, SocialProof, Destination, FinalCta, ContactForm, WeddingForm
│  └ seo/json-ld.tsx
├ lib/
│  ├ data.ts                    ← Rooms + photo refs
│  ├ ghl.ts                     ← Webhook integration
│  ├ blur.ts                    ← Image placeholder shimmer
│  └ cn.ts                      ← Utility helpers
└ proxy.ts                      ← i18n redirect middleware
```

---

## ⚠️ Pendiente / blocker

**Auto-deploy GitHub ↔ Vercel:** falta autorizar el GitHub App de Vercel en el repo. Mientras tanto cada deploy es manual con `vercel --prod --yes`. Para arreglarlo:

1. https://github.com/apps/vercel/installations/select_target
2. Selecciona `outsidethebox2k25-lang`
3. Marca "Only select repositories" → `casa-xicun-website` → Save
4. Después corre `vercel git connect --yes --scope smart-scale-ai1` en el folder

---

## 🚢 Para conectar dominio custom

1. Vercel dashboard → casa-xicun → Settings → Domains → Add
2. Te da 2 records DNS (A o CNAME) — los pegas donde compraste el dominio
3. SSL automático en ~30 segundos
4. Si quieres redirect del `www`, Vercel también lo maneja
