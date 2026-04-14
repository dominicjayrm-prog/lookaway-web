'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import type { JSONContent } from '@tiptap/core';
import { useEffect, useRef } from 'react';
import EditorToolbar from './EditorToolbar';

interface Props {
  content: JSONContent;
  onChange: (doc: JSONContent) => void;
}

export default function Editor({ content, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: true,
    extensions: [
      // StarterKit (v3) already includes Link and Underline — don't add them again
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
        },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Placeholder.configure({ placeholder: 'Start writing… (try / for block shortcuts)' }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  // Sync content from DB (once) — prevents resetting the editor while the user types
  const loaded = useRef(false);
  useEffect(() => {
    if (!editor || loaded.current) return;
    if (content && typeof content === 'object' && 'type' in content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return (
      <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, background: 'white', padding: '80px 20px', textAlign: 'center', color: '#B2BEC3', fontSize: 14 }}>
        Loading editor…
      </div>
    );
  }

  async function onImageUpload(file: File) {
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
    if (!alt.trim()) {
      if (!confirm('Insert image without alt text? SEO panel will flag this.')) return;
    }
    editor?.chain().focus().setImage({ src: url, alt }).run();
  }

  return (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <div className="tiptap-content" style={{ padding: '20px 28px 32px', minHeight: 400 }} onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
