'use client';

import { usePathname } from 'next/navigation';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

// Sirf animation setup browser mein; page content server par render hota hai.
export function PageMotion() {
  useScrollReveal(usePathname());
  return null;
}
