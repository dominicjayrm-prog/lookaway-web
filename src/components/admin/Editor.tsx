'use client';

/**
 * Editor thin-wrapper. The real implementation lives in LexicalEditor.tsx.
 * This file just re-exports so existing imports of './Editor' keep working.
 */

import LexicalEditorComponent from './LexicalEditor';

export default LexicalEditorComponent;

/** Legacy shim — some older imports expected this helper. No-op now. */
export function markdownToHtml(md: string): string {
  return md;
}
