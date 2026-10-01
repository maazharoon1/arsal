'use client';

import { useEffect, useRef } from 'react';

// Mobile scroll icon ring ko fill karta hai. Card stacking CSS sticky se hoti hai.
export function useMobileProcess() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const query = window.matchMedia(
      '(max-width: 700px) and (min-height: 501px) and (prefers-reduced-motion: no-preference)',
    );
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.design-process-step'));
    let frame = 0;

    function update() {
      frame = 0;
      const start = window.innerHeight * 0.85;
      // Pehle positions read karein, phir styles write karein.
      const progress = cards.map((card) => {
        const top = card.getBoundingClientRect().top;
        const stop = Number.parseFloat(getComputedStyle(card).top) || 0;
        return Math.max(0, Math.min(1, (start - top) / Math.max(1, start - stop)));
      });
      cards.forEach((card, index) => {
        card.style.setProperty('--icon-progress', progress[index].toFixed(3));
      });
    }

    function schedule() {
      if (query.matches && !frame) frame = requestAnimationFrame(update);
    }

    function configure() {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      frame = 0;
      cards.forEach((card) => card.style.removeProperty('--icon-progress'));
      if (!query.matches) return;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      schedule();
    }

    configure();
    query.addEventListener('change', configure);
    return () => {
      query.removeEventListener('change', configure);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return listRef;
}
