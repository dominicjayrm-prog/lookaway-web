'use client';

import { useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { COLORS } from '@/lib/constants';

interface Props {
  /** The raw markdown source. Parent controls this. */
  value: string;
  /** Called whenever the user edits. */
  onChange: (markdown: string) => void;
}

// Configure marked for our output.
marked.setOptions({
  gfm: true,
  breaks: false,
});

function toHtml(md: string): string {
  try {
    return marked.parse(md, { async: false }) as string;
  } catch {
    return '';
  }
}

const P = COLORS;

export default function Editor({ value, onChange }: Props) {
  const [preview, setPreview] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const html = useMemo(() => toHtml(value), [value]);

  function insertAtCursor(before: string, after = '') {
    const el = taRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + before.length + selected.length;
      el.setSelectionRange(pos, pos);
    });
  }

  async function uploadImageFile(file: File) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(body?.error || 'Image upload failed');
      return;
    }
    const { url } = await res.json();
    const alt = prompt('Alt text for this image (required for SEO):') || '';
    insertAtCursor(`\n\n![${alt}](${url})\n\n`);
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadImageFile(file);
    e.target.value = '';
  }

  return (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, background: 'white', overflow: 'hidden' }}>
      {/* Toolbar (not sticky — kept simple to avoid stacking-context issues) */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 12px',
        borderBottom: '1px solid #EEEDE8', background: '#FAFAF7',
      }}>
        <ToolbarBtn onClick={() => insertAtCursor('## ')} title="Heading 2">H2</ToolbarBtn>
        <ToolbarBtn onClick={() => insertAtCursor('### ')} title="Heading 3">H3</ToolbarBtn>
        <Sep />
        <ToolbarBtn onClick={() => insertAtCursor('**', '**')} title="Bold"><b>B</b></ToolbarBtn>
        <ToolbarBtn onClick={() => insertAtCursor('_', '_')} title="Italic"><i>I</i></ToolbarBtn>
        <ToolbarBtn onClick={() => insertAtCursor('`', '`')} title="Inline code">{'<>'}</ToolbarBtn>
        <Sep />
        <ToolbarBtn onClick={() => insertAtCursor('- ')} title="Bullet list">• List</ToolbarBtn>
        <ToolbarBtn onClick={() => insertAtCursor('1. ')} title="Numbered list">1. List</ToolbarBtn>
        <ToolbarBtn onClick={() => insertAtCursor('> ')} title="Quote">&ldquo; Quote</ToolbarBtn>
        <Sep />
        <ToolbarBtn onClick={() => {
          const url = prompt('Link URL:', 'https://');
          if (url) insertAtCursor('[', `](${url})`);
        }} title="Link">🔗 Link</ToolbarBtn>
        <label title="Insert image" style={btnStyle(false) as React.CSSProperties}>
          🖼 Image
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileInput} />
        </label>
        <ToolbarBtn onClick={() => insertAtCursor('\n\n---\n\n')} title="Divider">— HR</ToolbarBtn>

        <div style={{ flex: 1 }} />
        <ToolbarBtn active={!preview} onClick={() => setPreview(false)} title="Show editor">Edit</ToolbarBtn>
        <ToolbarBtn active={preview} onClick={() => setPreview(true)} title="Show preview">Preview</ToolbarBtn>
      </div>

      {/* Body */}
      {preview ? (
        <div
          className="markdown-preview"
          style={{ padding: '24px 28px 40px', minHeight: 600 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          placeholder="Start writing here. Use ## for H2 headings, ### for H3. **Bold**, _italic_, `code`. Paste markdown straight from ChatGPT or Claude."
          style={{
            display: 'block',
            width: '100%', height: 600, padding: '24px 28px 40px',
            border: 'none', outline: 'none', resize: 'vertical',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 14, lineHeight: 1.7, color: P.text, background: 'white',
            boxSizing: 'border-box',
          }}
        />
      )}

      <style>{`
        .markdown-preview h1, .markdown-preview h2 { font-size: 26px; font-weight: 800; margin: 24px 0 10px; color: #1A1A18; letter-spacing: -0.3px; }
        .markdown-preview h3 { font-size: 20px; font-weight: 700; margin: 20px 0 8px; color: #1A1A18; }
        .markdown-preview h4 { font-size: 16px; font-weight: 700; margin: 16px 0 6px; color: #1A1A18; }
        .markdown-preview p { font-size: 16px; line-height: 1.7; margin: 0 0 12px; color: #1A1A18; }
        .markdown-preview ul, .markdown-preview ol { padding-left: 24px; margin: 0 0 12px; font-size: 16px; line-height: 1.7; }
        .markdown-preview li { margin-bottom: 4px; }
        .markdown-preview blockquote { border-left: 3px solid #6C5CE7; padding: 4px 16px; margin: 12px 0; color: #636E72; font-style: italic; }
        .markdown-preview a { color: #6C5CE7; text-decoration: underline; }
        .markdown-preview code { background: #F5F4F0; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: ui-monospace, monospace; }
        .markdown-preview pre { background: #1A1A18; color: #FAFAF7; padding: 14px 18px; border-radius: 10px; margin: 12px 0; overflow-x: auto; }
        .markdown-preview pre code { background: transparent; color: inherit; padding: 0; }
        .markdown-preview img { max-width: 100%; border-radius: 10px; margin: 12px 0; }
        .markdown-preview hr { border: none; border-top: 1px solid #EEEDE8; margin: 24px 0; }
        .markdown-preview strong { font-weight: 700; }
      `}</style>
    </div>
  );
}

function btnStyle(active: boolean): React.CSSProperties {
  return {
    padding: '6px 10px', borderRadius: 6,
    background: active ? '#6C5CE715' : 'transparent',
    color: active ? '#6C5CE7' : '#1A1A18',
    fontSize: 13, fontWeight: 600, border: '1px solid transparent',
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
    fontFamily: 'inherit',
  };
}

function ToolbarBtn({ active, onClick, title, children }: {
  active?: boolean; onClick: () => void; title: string; children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} title={title} style={btnStyle(!!active)}>
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, background: '#EEEDE8', margin: '4px 4px' }} />;
}

/** Export helper for parent: convert markdown string to HTML (for storage + preview). */
export function markdownToHtml(md: string): string {
  return toHtml(md);
}
