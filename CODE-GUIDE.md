# Code samajhne ka simple guide

Sab se pehle `app/page.tsx` kholein. Yeh file homepage ke sections ko order mein dikhati hai. Har section ka actual code uski apni file mein hai.

## Kis cheez ke liye kaunsi file?

| Kaam                                               | File                                        |
| -------------------------------------------------- | ------------------------------------------- |
| Sections ka order badalna                          | `app/page.tsx`                              |
| Browser tab ka title aur description               | `app/layout.tsx`                            |
| Logo, navigation, mobile menu                      | `components/sections/site-header.tsx`       |
| Main heading, portrait, hero background            | `components/sections/hero-section.tsx`      |
| About ki text aur creative process                 | `components/sections/about-section.tsx`     |
| Apna background aur introduction edit karna        | `data/about.ts`                             |
| Project names, descriptions, images, process steps | `data/portfolio.ts`                         |
| Projects filters aur project popup                 | `components/sections/portfolio-section.tsx` |
| Neeche wala Start a project banner                 | `components/sections/contact-section.tsx`   |
| Contact form, copy aur download functions          | `components/contact-dialog.tsx`             |
| Footer aur original video popup                    | `components/sections/site-footer.tsx`       |
| Colors, spacing, fonts, mobile layout              | `app/globals.css`                           |
| Scroll par fade-in animation                       | `hooks/use-scroll-reveal.ts`                |
| Reusable button aur popup                          | `components/ui/`                            |
| Images aur videos                                  | `public/`                                   |

## React ka flow

- **Component**: page ka ek hissa, jaise `HeroSection`.
- **Props**: component ko di jane wali values. `children` uske andar ka content hota hai.
- **useState**: badalne wali value. Projects ka `filter` decide karta hai kaunsi category dikhani hai.
- **map**: list ke har item ke liye UI banata hai. Projects ki list se cards bante hain.
- **useRef**: input ka reference rakhta hai. Contact form mein textarea ki value copy karne ke kaam aata hai.
- **useEffect**: browser mein setup aur cleanup karta hai. Scroll animation ka observer is se chalta hai.
- **use client**: React state, events aur browser features ke liye client boundary. Homepage ke imported components bhi is boundary ke andar chalte hain.

## Service cards aur Cloudinary galleries

- `data/portfolio.ts`: categories, 19 services, hero IDs aur gallery images.
- `components/sections/portfolio-section.tsx`: category filters, cards aur Load More.
- `app/services/[slug]/page.tsx`: har service ka separate page aur title.
- `components/service-detail.tsx`: service page ka layout aur related-service tabs.
- `components/service-gallery.tsx`: gallery tiles, placeholders, fullscreen popup, zoom aur next/previous controls.
- `app/gallery.css`: gallery aur fullscreen popup ki responsive styling.
- `components/service-artwork.tsx`: image loading aur Documentation ka placeholder.
- `app/services.css`: in pages ki navy theme aur responsive styling.

## Example: portfolio image add karna

1. Cloudinary par image upload karein, misal `LG-01`.
2. `data/portfolio.ts` mein Logo Design ke `images: []` ko `images: [{ publicId: 'LG-01', alt: 'Logo project ki description' }]` se replace karein.
3. Gallery apne aap demo preview tiles se aapki images mein change hogi; image click par fullscreen preview khulega. Arrows se next/previous, zoom button se enlarge aur Escape se close karein.
4. Hero badalne ke liye `heroId` edit karein. Documentation ka `null` placeholder hai; real image aane par `DOCH` ya actual public ID likhein.

Cloudinary images automatically list nahi hotin; sirf `images` array mein listed uploads dikhte hain. Har subcategory ki numbering 01 se shuru karein. Folder use ho to full public ID likhein. Logo Animation hero original file use karta hai taake Cloudinary frame-size limit ki error na aaye.

## CSS kaise parhein?

`globals.css` mein Header, Hero, About, Projects, Contact, Dialogs aur Animations ke comments hain. Aakhir mein media queries hain: desktop, tablet, mobile aur extra-small mobile. Mobile design badalne ke liye relevant media query dekhein.

## Commands

```sh
npm run dev           # Website local browser mein chalayein
npm run format        # Poora editable code format karein
npm run format:check  # Formatting verify karein
npm run lint          # Code rules check karein
npm run typecheck     # TypeScript errors check karein
npm run build         # Production build banayein
```

Prettier dependencies, generated Next.js files aur lockfile ko skip karta hai. Config `.prettierrc.json` mein hai.

Contact form filhaal sirf text brief download karta hai. Email bhejne ka backend connected nahi hai.
