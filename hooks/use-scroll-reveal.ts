'use client';
import { useEffect } from 'react';

// .reveal wali cheez screen par aaye to fade-in animation shuru karein.
export function useScrollReveal(pageKey?: string) {
  useEffect(() => {
    const page = document.querySelector('main');
    if (!page) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('reveal-pending');
          // Har element ko sirf pehli dafa animate karna hai.
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' },
    );

    function observe(element: HTMLElement) {
      if (observed.has(element)) return;
      observed.add(element);
      // Content JS ke baghair bhi visible hai; sirf offscreen items reveal honge.
      if (
        motionPreference.matches ||
        element.getBoundingClientRect().top < window.innerHeight
      ) {
        element.classList.add('is-visible');
        return;
      }
      element.classList.add('reveal-pending');
      observer.observe(element);
    }

    function scan(node: Element) {
      if (node instanceof HTMLElement && node.matches('.reveal')) observe(node);
      node.querySelectorAll<HTMLElement>('.reveal').forEach(observe);
    }

    scan(page);
    // Filter / Load More se aane wale cards bhi isi observer ko reuse karte hain.
    const additions = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        }),
      );
    });
    additions.observe(page, { childList: true, subtree: true });
    function updatePreference() {
      if (!motionPreference.matches) return;
      observer.disconnect();
      observed.forEach((element) => {
        element.classList.remove('reveal-pending');
        element.classList.add('is-visible');
      });
    }
    motionPreference.addEventListener('change', updatePreference);
    // Page band/unmount ho to observer saaf kar dein.
    return () => {
      observer.disconnect();
      additions.disconnect();
      motionPreference.removeEventListener('change', updatePreference);
      observed.forEach((element) => element.classList.remove('reveal-pending'));
    };
  }, [pageKey]);
}
