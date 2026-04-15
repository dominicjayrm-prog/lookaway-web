'use client';

/**
 * Editor thin-wrapper. The real implementation lives in LexicalEditor.tsx.
 *
 * Lexical accesses browser-only APIs at module load time, which crashes the
 * server even though LexicalEditor is marked 'use client'. Loading it via
 * next/dynamic with ssr:false guarantees the module is only evaluated in
 * the browser, where it works.
 */

import dynamic from 'next/dynamic';

const LexicalEditorComponent = dynamic(() => import('./LexicalEditor'), {
  ssr: false,
  loading: () => (
    <div style={{
      border: '1.5px solid #EEEDE8', borderRadius: 14, background: 'white',
      minHeight: 560, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#B2BEC3', fontSize: 14,
    }}>
      Loading editor…
    </div>
  ),
});

export default LexicalEditorComponent;

/** Legacy shim — some older imports expected this helper. No-op now. */
export function markdownToHtml(md: string): string {
  return md;
}
