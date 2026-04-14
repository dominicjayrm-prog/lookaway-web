'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import type { JSONContent } from '@tiptap/core';
import { useEffect, useRef } from 'react';
import EditorToolbar from './EditorToolbar';

interface Props {
  content: JSONContent;
  onChange: (doc: JSONContent) => void;
}

export default function EditorInner({ content, onChange }: Props) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    // Still needed even with client-only to prevent the initial render warning.
    immediatelyRender: false,
    editable: true,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Placeholder.configure({ placeholder: 'Start writing… use the toolbar above to format your post.' }),
    ],
    content,
    onUpdate: ({ editor }) => onChangeRef.current(editor.getJSON()),
    editorProps: {
      attributes: {
        class: 'ProseMirror-blanked',
      },
    },
  });

  // Load DB content into editor once it's ready.
  const loaded = useRef(false);
  useEffect(() => {
    if (!editor || loaded.current) return;
    if (content && typeof content === 'object' && 'type' in content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    editor?.chain().focus().setImage({ src: url, alt }).run();
  }

  return (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
}
