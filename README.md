# Arsal — creative portfolio

Next.js App Router portfolio with TypeScript, Tailwind CSS, Lucide and an accessible Radix gallery. Cream/navy theme (`#232740`), self-hosted Manrope/Cormorant Garamond fonts, and lightweight CSS/IntersectionObserver animations.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Pages

- `/`: hero, compact mobile About, service filters, process and footer.
- `/about`: full background, profile snapshot and specialties.
- `/services/[slug]`: 19 service pages with category tabs, masonry gallery and fullscreen viewer. Double-click/double-tap zooms; drag pans without scrollbars. Arrows navigate; Escape closes.

## Cloudinary portfolio updates

**Add image objects to the matching service's `images` array in `data/portfolio.ts`:**

```ts
images: [
  { publicId: 'LG-01', alt: 'Describe the first logo project' },
  { publicId: 'LG-02', alt: 'Describe the second logo project' },
],
```

These are example IDs, not uploaded portfolio items. Copy the exact Public ID, including any actual path prefix. `heroId: 'LGH'` is the cover; `images` is the gallery. Populated arrays replace the labeled preview placeholders. Uploads are not automatically discovered. Documentation uses a CSS concept placeholder until its hero is supplied. Animated `LGAH` uses its original URL to avoid Cloudinary's all-frame resize limit.

Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`; the existing `NEXT_PUBLIC_CLOUDINARY_USERNAME` is also supported. Public images do not need an API secret. Get in Touch uses the approved demo Upwork homepage in `data/contact.ts`.

See [CODE-GUIDE.md](CODE-GUIDE.md) for a complete service object, Roman Urdu upload instructions and file map.

## Implementation

Homepage, About and service layout render on the server; client components handle interactive behavior. `PageMotion` manages one-time reveals, dynamic cards and reduced-motion preferences. Content remains visible without JavaScript. Local fonts and licenses live in `app/fonts/`. Next Image optimizes responsive portraits; Cloudinary delivers service artwork. Service cards avoid prefetching every gallery route.

Content lives in `data/about.ts`, `profile.ts`, `portfolio.ts`, `design-process.ts` and `contact.ts`. Styling lives in `app/globals.css`, `services.css`, `gallery.css`, `about.css` and `polish.css`. Mobile process stacking remains limited to small screens. Unused contact-form/project-video components and obsolete styles have been removed; supplied source media is retained.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
```

## Assets

Hero portrait extracted with imagegen from the supplied reference. About portrait and retained local example images extracted from the supplied desktop animation. Original reference media remains available. Service covers use the supplied Cloudinary assets; full portfolio uploads are still pending.
