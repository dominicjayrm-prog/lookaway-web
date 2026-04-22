'use client';

import dynamic from 'next/dynamic';

/**
 * Client-component wrapper that dynamically imports the ReadingProgress bar.
 * Next.js 16 doesn't allow `ssr: false` in Server Components, so the dynamic
 * call lives here. The progress bar has no SEO value (it's a fixed 3px UI
 * element at the top of the viewport), so deferring it off the initial HTML
 * is a pure win.
 */
const ReadingProgress = dynamic(() => import('./ReadingProgress'), {
  ssr: false,
});

export default function ReadingProgressLoader() {
  return <ReadingProgress />;
}
