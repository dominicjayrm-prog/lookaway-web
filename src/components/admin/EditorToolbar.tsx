'use client';

import type { Editor } from '@tiptap/react';
import { useRef } from 'react';

interface Props {
  editor: Editor;
  onImageUpload: (file: File) => Promise<void>;
}

function Btn({ active, onClick, title, children, disabled }: { active?: boolean; onClick: () => void; title: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
      title={title}
      disabled={disabled}
      style={{
        padding: '6px 10px', borderRadius: 6, background: active ? '#6C5CE715' : 'transparent',
        color: active ? '#6C5CE7' : '#1A1A18', fontSize: 13, fontWeight: 600,
        border: '1px solid transparent', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

export default function EditorToolbar({ editor, onImageUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addLink() {
    const previous = editor.getAttributes('link').href;
    const url = prompt('Paste URL (leave blank to remove link):', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  function onImageClick() {
    fileInputRef.current?.click();
  }

  async function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await onImageUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 2, padding: '8px 12px',
      borderBottom: '1px solid #EEEDE8', background: '#FAFAF7', position: 'sticky', top: 60, zIndex: 5,
    }}>
      <select
        onChange={(e) => {
          const val = e.target.value;
          if (val === 'p') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: Number(val) as 2 | 3 | 4 }).run();
        }}
        value={
          editor.isActive('heading', { level: 2 }) ? '2'
          : editor.isActive('heading', { level: 3 }) ? '3'
          : editor.isActive('heading', { level: 4 }) ? '4'
          : 'p'
        }
        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #EEEDE8', background: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
      >
        <option value="p">Paragraph</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
      </select>

      <Sep />
      <Btn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></Btn>
      <Btn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></Btn>
      <Btn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></Btn>
      <Btn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><s>S</s></Btn>
      <Btn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">{'<>'}</Btn>

      <Sep />
      <Btn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">• List</Btn>
      <Btn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1. List</Btn>
      <Btn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">&ldquo; Quote</Btn>
      <Btn active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code block">{'{ }'}</Btn>

      <Sep />
      <Btn active={editor.isActive('link')} onClick={addLink} title="Link">🔗 Link</Btn>
      <Btn onClick={onImageClick} title="Insert image">🖼 Image</Btn>
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">— HR</Btn>

      <div style={{ flex: 1 }} />
      <Btn disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} title="Undo">↶</Btn>
      <Btn disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} title="Redo">↷</Btn>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFileSelected}
      />
    </div>
  );
}

function Sep() {
  return <div style={{ width: 1, background: '#EEEDE8', margin: '4px 4px' }} />;
}
