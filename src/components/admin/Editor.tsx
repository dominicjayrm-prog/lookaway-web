'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
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
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Underline,
      Placeholder.configure({ placeholder: 'Start writing…' }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  // Sync external content changes (e.g., loaded from DB)
  const loaded = useRef(false);
  useEffect(() => {
    if (!editor) return;
    if (!loaded.current && content && Object.keys(content).length > 0) {
      editor.commands.setContent(content, { emitUpdate: false });
      loaded.current = true;
    }
  }, [editor, content]);

  if (!editor) return null;

  async function onImageUpload(file: File) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    if (!res.ok) {
      alert('Image upload failed');
      return;
    }
    const { url } = await res.json();
    const alt = prompt('Alt text for this image (required for SEO):') || '';
    editor?.chain().focus().setImage({ src: url, alt }).run();
  }

  return (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <div className="tiptap-content" style={{ padding: '20px 28px 32px', minHeight: 400 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
