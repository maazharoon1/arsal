// DOCX wali categories aur codes. Hero ID = code + H (misal: LGH).
export const categories = [
  'Branding',
  'Marketing Design',
  'Editorial Design',
  'Packaging & Print',
  'Web Design',
  'Illustrations',
] as const;

export type ServiceCategory = (typeof categories)[number];
export type PortfolioImage = { publicId: string; alt: string };
export type Service = {
  code: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  heroId: string | null;
  images: PortfolioImage[];
};

// Portfolio abhi upload nahi hua: images [] ko khali rehne dein.
// Upload ke baad misal: images: [{ publicId: 'LG-01', alt: 'Brand logo design' }].
// Folder use ho to poora public ID likhein, misal: portfolio/LG-01.
export const services: Service[] = [
  {
    code: 'LG',
    slug: 'logo-design',
    name: 'Logo Design',
    category: 'Branding',
    heroId: 'LGH',
    description:
      'Distinctive marks that express your brand’s personality, with the clarity to work at every size.',
    images: [],
  },
  {
    code: 'LGA',
    slug: 'logo-animation',
    name: 'Logo Animation',
    category: 'Branding',
    heroId: 'LGAH',
    description:
      'Bring your identity into motion with thoughtful timing, expressive transitions, and a memorable finish.',
    images: [],
  },
  {
    code: 'BCR',
    slug: 'business-cards',
    name: 'Business Cards',
    category: 'Branding',
    heroId: 'BCRH',
    description:
      'A considered first impression. Business cards that balance useful details with a distinctive brand presence.',
    images: [],
  },
  {
    code: 'BGI',
    slug: 'brand-guide-identity',
    name: 'Brand Guide & Identity',
    category: 'Branding',
    heroId: 'BGIH',
    description:
      'A cohesive visual identity and clear guidelines that keep your brand consistent across every touchpoint.',
    images: [],
  },
  {
    code: 'SM',
    slug: 'social-media',
    name: 'Social Media Design',
    category: 'Marketing Design',
    heroId: 'SMH',
    description:
      'On-brand social visuals designed to communicate clearly and give your content a recognizable presence.',
    images: [],
  },
  {
    code: 'BN',
    slug: 'banners',
    name: 'Banners',
    category: 'Marketing Design',
    heroId: 'BNH',
    description:
      'Focused campaign visuals that make your message clear, from digital placements to large-format banners.',
    images: [],
  },
  {
    code: 'FL',
    slug: 'flyers',
    name: 'Flyers',
    category: 'Marketing Design',
    heroId: 'FLH',
    description:
      'Clear, engaging layouts that put the right information first and give your audience a reason to act.',
    images: [],
  },
  {
    code: 'PS',
    slug: 'posters',
    name: 'Posters',
    category: 'Marketing Design',
    heroId: 'PSH',
    description:
      'Bold visual statements with deliberate typography, strong hierarchy, and a message that stands out.',
    images: [],
  },
  {
    code: 'YT',
    slug: 'youtube-thumbnails',
    name: 'YouTube Thumbnails',
    category: 'Marketing Design',
    heroId: 'YTH',
    description:
      'Expressive, readable thumbnail designs that communicate the story before the first frame plays.',
    images: [],
  },
  {
    code: 'PD',
    slug: 'pitch-decks',
    name: 'Pitch Decks',
    category: 'Marketing Design',
    heroId: 'PDH',
    description:
      'Turn complex ideas into a focused presentation, with a clear narrative and a consistent visual system.',
    images: [],
  },
  {
    code: 'BC',
    slug: 'book-covers',
    name: 'Book Covers',
    category: 'Editorial Design',
    heroId: 'BCH',
    description:
      'Thoughtful covers that capture the character of a story and invite the reader to look closer.',
    images: [],
  },
  {
    code: 'BI',
    slug: 'book-interiors',
    name: 'Book Interiors',
    category: 'Editorial Design',
    heroId: 'BIH',
    description:
      'Beautifully paced pages with considered typography, comfortable reading, and consistent editorial detail.',
    images: [],
  },
  {
    code: 'DOC',
    slug: 'documentation',
    name: 'Documentation',
    category: 'Editorial Design',
    heroId: null,
    description:
      'Well-structured reports, guides, and documents that make detailed information approachable and easy to navigate.',
    images: [],
  },
  {
    code: 'PK',
    slug: 'packaging-label',
    name: 'Packaging & Label',
    category: 'Packaging & Print',
    heroId: 'PKH',
    description:
      'Packaging and labels that connect your product’s personality with practical, considered design.',
    images: [],
  },
  {
    code: 'MN',
    slug: 'menu-design',
    name: 'Menu Design',
    category: 'Packaging & Print',
    heroId: 'MNH',
    description:
      'Inviting menus that reflect your venue and make every choice feel clear, considered, and easy to explore.',
    images: [],
  },
  {
    code: 'MR',
    slug: 'merchandise',
    name: 'Merchandise',
    category: 'Packaging & Print',
    heroId: 'MRH',
    description:
      'Brand-led graphics for apparel and merchandise, designed to feel at home beyond the screen.',
    images: [],
  },
  {
    code: 'VW',
    slug: 'vehicle-wraps',
    name: 'Vehicle Wraps',
    category: 'Packaging & Print',
    heroId: 'VWH',
    description:
      'A strong brand presence on the move, with layouts shaped around visibility, scale, and vehicle contours.',
    images: [],
  },
  {
    code: 'WD',
    slug: 'web-design',
    name: 'Web Design',
    category: 'Web Design',
    heroId: 'WDH',
    description:
      'Clear, responsive website designs that bring your brand to life and help visitors find their next step.',
    images: [],
  },
  {
    code: 'IL',
    slug: 'illustrations',
    name: 'Illustrations',
    category: 'Illustrations',
    heroId: 'ILH',
    description:
      'Custom visual storytelling with personality, crafted to make your message feel distinctive and memorable.',
    images: [],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
