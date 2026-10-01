# Code samajhne ka simple guide

Homepage ka order `app/page.tsx` mein hai. Har section apni component file mein hai. Text aur portfolio data `data/` folder se edit hota hai.

## Cloudinary upload ke baad object kahan banana hai?

**`data/portfolio.ts` kholein.** `services` array mein har service ka object pehle se hai. Us service ke **`images: []` ke andar** har uploaded image ka object add karein. Alag file ya naya top-level object banana zaroori nahi.

Misal: Logo Design ke existing object ko is tarah update karein. Yeh example IDs hain; pehle images upload karein:

```ts
{
  code: 'LG',
  slug: 'logo-design',
  name: 'Logo Design',
  category: 'Branding',
  heroId: 'LGH',
  description: 'Distinctive marks that express your brand’s personality, with the clarity to work at every size.',
  images: [
    { publicId: 'LG-01', alt: 'Crystal Salon brand logo' },
    { publicId: 'LG-02', alt: 'Second brand logo presentation' },
  ],
},
```

1. Cloudinary par upload karein aur image ka **exact Public ID** copy karein.
2. `data/portfolio.ts` mein relevant service dhoondein, misal `code: 'LG'`.
3. Uske `images` array mein `{ publicId: 'LG-01', alt: 'Image ki description' }` add karein. Objects ke darmiyan comma lagayein.
4. Save karein. Local website refresh hogi; live website ke liye dobara build/deploy karein.

`heroId` service card ki cover image hai; `images` andar wali gallery hai. Gallery ka order isi array ka order hai. Pehli real image add karne par demo placeholders hat jate hain. `images: []` ho to preview layout dikhta hai. Uploads automatically discover nahi hote.

Public ID full URL nahi hai. Aam tor par extension ke baghair hoti hai, misal `LG-01`. Cloudinary mein jo exact Public ID dikhe wahi use karein. Agar ID mein folder prefix hai, poora ID dein, misal `portfolio/LG-01`; sirf display folder ka naam andazay se add na karein. `alt` mein image ki meaningful description likhein.

| Service       | Hero        | Gallery examples   |
| ------------- | ----------- | ------------------ |
| Logo Design   | `LGH`       | `LG-01`, `LG-02`   |
| Social Media  | `SMH`       | `SM-01`, `SM-02`   |
| Packaging     | `PKH`       | `PK-01`, `PK-02`   |
| Documentation | Abhi `null` | `DOC-01`, `DOC-02` |

Har service ki numbering 01 se shuru hoti hai. Documentation ka `heroId: null` abhi concept placeholder hai; upload ke baad actual Public ID likhein.

## File map

| Kaam                                       | File                                                   |
| ------------------------------------------ | ------------------------------------------------------ |
| Homepage sections ka order                 | `app/page.tsx`                                         |
| Mobile ka short About                      | `components/sections/about-section.tsx`                |
| Full About page                            | `app/about/page.tsx`                                   |
| Introduction, background, specialties      | `data/about.ts`                                        |
| Upwork status, rate, location, languages   | `data/profile.ts`                                      |
| Upwork link                                | `data/contact.ts`                                      |
| Services aur image objects                 | `data/portfolio.ts`                                    |
| Discover / Explore / Refine / Deliver text | `data/design-process.ts`                               |
| Header aur mobile menu                     | `components/sections/site-header.tsx`                  |
| Service filters aur Load More              | `components/sections/portfolio-section.tsx`            |
| Service route                              | `app/services/[slug]/page.tsx`                         |
| Service layout aur tabs                    | `components/service-detail.tsx`                        |
| Gallery aur fullscreen viewer              | `components/service-gallery.tsx`                       |
| Cloudinary loading aur fallback            | `components/service-artwork.tsx`                       |
| Zoom, double-click/tap aur drag            | `hooks/use-gallery-zoom.ts`                            |
| Mobile process icon progress               | `hooks/use-mobile-process.ts`                          |
| Footer                                     | `components/sections/site-footer.tsx`                  |
| Base theme                                 | `app/globals.css`                                      |
| Service / gallery / About styles           | `app/services.css`, `app/gallery.css`, `app/about.css` |
| Typography aur motion polish               | `app/polish.css`                                       |
| Fonts aur shared metadata                  | `app/layout.tsx`, `app/fonts/`                         |

## Animation aur performance

Homepage aur service layout server components hain. Menu, filters aur gallery jaisi interactive cheezein browser JavaScript use karti hain. `components/page-motion.tsx` har route par `hooks/use-scroll-reveal.ts` chalata hai. `.reveal` element scroll par ek dafa animate hota hai; Load More cards bhi observe hote hain. JavaScript na chale tab bhi content visible rehta hai.

Reduced-motion preference par animations band hoti hain. Process cards sirf mobile par stack hote hain. Fonts local WOFF2 files hain; browser Google Fonts se files fetch nahi karta. Next Image local portraits ke responsive sizes banata hai. Unused contact form aur purana project/video popup JSX remove hai.

## Commands

```sh
npm run dev           # Local website
npm run lint          # Code rules
npm run typecheck     # TypeScript errors
npm run build         # Production build
npm run format        # Formatting
```

Dev server ke saath `node reference/check-services.mjs` services/images check karta hai; `node reference/check-gallery.mjs` viewer/zoom/drag check karta hai. Installed Chrome aur public images ke liye network access chahiye.

Cloudinary ke liye `.env.example` dekhein. Sirf public cloud name chahiye; API secret frontend mein mat likhein. Get in Touch filhaal demo Upwork homepage use karta hai; real profile link `data/contact.ts` mein replace karein.
