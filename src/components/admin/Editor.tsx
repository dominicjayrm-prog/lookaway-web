'use client';

import dynamic from 'next/dynamic';
import type { JSONContent } from '@tiptap/core';

interface Props {
  content: JSONContent;
  onChange: (doc: JSONContent) => void;
}

// Dynamically import the inner editor with SSR disabled to avoid hydration issues
// with TipTap contenteditable in React 19 + Next.js 16.
const EditorInner = dynamic(() => import('./EditorInner'), {
  ssr: false,
  loading: () => (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, background: 'white', padding: '80px 20px', textAlign: 'center', color: '#B2BEC3', fontSize: 14 }}>
      Loading editor…
    </div>
  ),
});

export default function Editor(props: Props) {
  return <EditorInner {...props} />;
}
