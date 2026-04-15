'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/toc';
import { COLORS } from '@/lib/constants';

interface Props {
  items: TocItem[];
}

export default function Toc({ items }: Props) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading and make it active.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Fire when heading crosses the top 30% of the viewport.
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="blog-toc">
      <div
        style={{
          fontSize: 11, fontWeight: 700, color: COLORS.textM,
          letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
        }}
      >
        On this page
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? 14 : 0 }}>
              <a
                href={`#${item.id}`}
                style={{
                  display: 'block', fontSize: 13,
                  color: isActive ? COLORS.accent : '#636E72',
                  fontWeight: isActive ? 600 : 500,
                  padding: '4px 0',
                  borderLeft: `2px solid ${isActive ? COLORS.accent : 'transparent'}`,
                  paddingLeft: 10, marginLeft: -12,
                  textDecoration: 'none',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
