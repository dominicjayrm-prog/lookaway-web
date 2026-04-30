'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ target, suffix = '%', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  // Initial state is the final value so SSR + first paint render the real
  // number (crawlers and JS-off users see "23%", not "0%"). Once mounted,
  // if the element is below the fold we reset to 0 and animate up when it
  // scrolls in. If it's already visible on mount we keep the final value.
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    setCount(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startTime = Date.now();
        const iv = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress >= 1) clearInterval(iv);
        }, 16);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} suppressHydrationWarning>{count}{suffix}</span>;
}
