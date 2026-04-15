'use client';

/**
 * Lexical-based WYSIWYG editor for the admin post editor.
 *
 * Props: { value, onChange } where value/onChange are markdown strings.
 * Internally, Lexical works on its own rich-text state. We convert
 * markdown → Lexical state on initial load, and Lexical state → markdown
 * on every change. That way the storage layer (Supabase blog_posts.content /
 * content_html), SEO checks, and public blog rendering all keep working
 * unchanged — they still see markdown.
 *
 * The editor shows real headings, bold, italic, links, lists, quotes,
 * images as they render (no visible `##` or `**` markers). Users can still
 * type markdown shortcuts thanks to MarkdownShortcutPlugin.
 */

import { useEffect, useRef, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { TRANSFORMERS, $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  type LexicalEditor,
} from 'lexical';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';

interface Props {
  value: string;
  onChange: (markdown: string) => void;
}

const theme = {
  paragraph: 'lx-paragraph',
  heading: {
    h1: 'lx-h1',
    h2: 'lx-h2',
    h3: 'lx-h3',
    h4: 'lx-h4',
  },
  quote: 'lx-quote',
  list: {
    ul: 'lx-ul',
    ol: 'lx-ol',
    listitem: 'lx-li',
  },
  link: 'lx-link',
  text: {
    bold: 'lx-bold',
    italic: 'lx-italic',
    underline: 'lx-underline',
    strikethrough: 'lx-strike',
    code: 'lx-code',
  },
  code: 'lx-codeblock',
};

/** Load the incoming markdown into the Lexical state exactly once on mount. */
function InitialContentPlugin({ value }: { value: string }) {
  const [editor] = useLexicalComposerContext();
  const loadedRef = useRef(false);
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    editor.update(() => {
      if (value && value.trim().length > 0) {
        $convertFromMarkdownString(value, TRANSFORMERS);
      } else {
        const root = $getRoot();
        if (root.getChildrenSize() === 0) {
          root.append($createParagraphNode());
        }
      }
    });
  }, [editor, value]);
  return null;
}

/** Emit markdown on every content change. */
function MarkdownOnChangePlugin({ onChange }: { onChange: (md: string) => void }) {
  return (
    <OnChangePlugin
      ignoreSelectionChange
      onChange={(editorState) => {
        editorState.read(() => {
          const md = $convertToMarkdownString(TRANSFORMERS);
          onChange(md);
        });
      }}
    />
  );
}

type BlockType = 'paragraph' | 'h2' | 'h3' | 'h4' | 'quote' | 'ul' | 'ol';

function ToolbarButton({ active, disabled, onClick, title, children }: {
  active?: boolean; disabled?: boolean; onClick: () => void; title: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // keep the editor selection while clicking
        if (!disabled) onClick();
      }}
      disabled={disabled}
      title={title}
      style={{
        padding: '6px 10px', borderRadius: 6,
        background: active ? '#6C5CE715' : 'transparent',
        color: active ? '#6C5CE7' : '#1A1A18',
        fontSize: 13, fontWeight: 600, border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, background: '#EEEDE8', margin: '4px 4px' }} />;
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update toolbar active states on selection change.
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsCode(selection.hasFormat('code'));

          // Detect containing block type
          const anchorNode = selection.anchor.getNode();
          const element = anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
          const type = element.getType();
          if (type === 'heading') {
            const tag = (element as unknown as { getTag: () => string }).getTag();
            if (tag === 'h2') setBlockType('h2');
            else if (tag === 'h3') setBlockType('h3');
            else if (tag === 'h4') setBlockType('h4');
            else setBlockType('paragraph');
          } else if (type === 'quote') setBlockType('quote');
          else if (type === 'list') {
            const listType = (element as unknown as { getListType: () => string }).getListType();
            setBlockType(listType === 'number' ? 'ol' : 'ul');
          } else setBlockType('paragraph');

          // Link detection — walk up from anchor node
          let node = anchorNode;
          let linkFound = false;
          while (node) {
            if (node.getType() === 'link') { linkFound = true; break; }
            const parent = node.getParent();
            if (!parent) break;
            node = parent;
          }
          setIsLink(linkFound);
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => { setCanUndo(payload); return false; },
        1,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => { setCanRedo(payload); return false; },
        1,
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => false,
        1,
      ),
    );
  }, [editor]);

  function setHeading(tag: 'h2' | 'h3' | 'h4') {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  }

  function setParagraph() {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }

  function setQuote() {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }

  function toggleLink() {
    if (isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      return;
    }
    const url = prompt('Link URL:', 'https://');
    if (url) editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
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
    // Insert as markdown; MarkdownShortcutPlugin will render it as an image.
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertRawText(`\n\n![${alt}](${url})\n\n`);
      }
    });
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadImageFile(file);
    e.target.value = '';
  }

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 12px',
      borderBottom: '1px solid #EEEDE8', background: '#FAFAF7',
    }}>
      <ToolbarButton
        active={blockType === 'paragraph'}
        onClick={setParagraph}
        title="Paragraph"
      >
        P
      </ToolbarButton>
      <ToolbarButton
        active={blockType === 'h2'}
        onClick={() => setHeading('h2')}
        title="Heading 2"
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        active={blockType === 'h3'}
        onClick={() => setHeading('h3')}
        title="Heading 3"
      >
        H3
      </ToolbarButton>
      <ToolbarButton
        active={blockType === 'h4'}
        onClick={() => setHeading('h4')}
        title="Heading 4"
      >
        H4
      </ToolbarButton>
      <Sep />
      <ToolbarButton
        active={isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        title="Bold (Cmd+B)"
      >
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton
        active={isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        title="Italic (Cmd+I)"
      >
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton
        active={isCode}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        title="Inline code"
      >
        {'<>'}
      </ToolbarButton>
      <Sep />
      <ToolbarButton
        active={blockType === 'ul'}
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        title="Bullet list"
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        active={blockType === 'ol'}
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        title="Numbered list"
      >
        1. List
      </ToolbarButton>
      <ToolbarButton
        active={blockType === 'quote'}
        onClick={setQuote}
        title="Quote"
      >
        &ldquo; Quote
      </ToolbarButton>
      <Sep />
      <ToolbarButton active={isLink} onClick={toggleLink} title="Link">
        🔗 Link
      </ToolbarButton>
      <label
        title="Insert image"
        onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
        style={{
          padding: '6px 10px', borderRadius: 6, background: 'transparent',
          color: '#1A1A18', fontSize: 13, fontWeight: 600,
          border: '1px solid transparent', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontFamily: 'inherit',
        }}
      >
        🖼 Image
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileInput}
        />
      </label>
      <div style={{ flex: 1 }} />
      <ToolbarButton
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Undo (Cmd+Z)"
      >
        ↶
      </ToolbarButton>
      <ToolbarButton
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Redo (Cmd+Shift+Z)"
      >
        ↷
      </ToolbarButton>
    </div>
  );
}

/** Paste-image support: if the user pastes image bytes from the clipboard,
 *  upload and insert instead of letting it paste as raw image data. */
function PasteImagePlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      if (!e.clipboardData) return;
      for (const item of e.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (!file) continue;
          e.preventDefault();
          const form = new FormData();
          form.append('file', file);
          fetch('/api/admin/upload', { method: 'POST', body: form })
            .then(async (res) => {
              if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                alert(body?.error || 'Image upload failed');
                return;
              }
              const { url } = await res.json();
              const alt = prompt('Alt text for this image (required for SEO):') || '';
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  selection.insertRawText(`\n\n![${alt}](${url})\n\n`);
                }
              });
            })
            .catch(() => alert('Image upload failed'));
          return;
        }
      }
    }
    const root = editor.getRootElement();
    if (!root) return;
    root.addEventListener('paste', onPaste);
    return () => root.removeEventListener('paste', onPaste);
  }, [editor]);
  return null;
}

export default function LexicalEditorComponent({ value, onChange }: Props) {
  const initialConfig = {
    namespace: 'BlanchedBlogEditor',
    theme,
    onError: (error: Error) => {
      // Log errors but don't crash the editor.
      console.error('Lexical error', error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      LinkNode,
      AutoLinkNode,
      // Needed so @lexical/markdown's TRANSFORMERS can round-trip code
      // blocks and horizontal rules without throwing "node not registered".
      CodeNode,
      CodeHighlightNode,
      HorizontalRuleNode,
    ],
  };

  return (
    <div style={{ border: '1.5px solid #EEEDE8', borderRadius: 14, background: 'white', overflow: 'hidden' }}>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <div style={{ position: 'relative' }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="lx-content"
                spellCheck
                style={{
                  minHeight: 500, padding: '24px 28px 40px',
                  outline: 'none', fontSize: 17, lineHeight: 1.75,
                  color: '#1A1A18',
                }}
              />
            }
            placeholder={
              <div style={{
                position: 'absolute', top: 24, left: 28,
                color: '#B2BEC3', pointerEvents: 'none', fontSize: 17,
              }}>
                Start writing your post. Use the H2/H3 buttons or type ## for headings. You can paste markdown straight from ChatGPT or Claude.
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <InitialContentPlugin value={value} />
          <MarkdownOnChangePlugin onChange={onChange} />
          <PasteImagePlugin />
        </div>
      </LexicalComposer>
      <style>{`
        .lx-content p { margin: 0 0 14px; }
        .lx-content h1, .lx-content .lx-h1 { font-size: 30px; font-weight: 800; margin: 28px 0 12px; color: #1A1A18; letter-spacing: -0.4px; line-height: 1.2; }
        .lx-content h2, .lx-content .lx-h2 { font-size: 26px; font-weight: 800; margin: 28px 0 12px; color: #1A1A18; letter-spacing: -0.3px; line-height: 1.25; }
        .lx-content h3, .lx-content .lx-h3 { font-size: 21px; font-weight: 700; margin: 24px 0 10px; color: #1A1A18; line-height: 1.3; }
        .lx-content h4, .lx-content .lx-h4 { font-size: 17px; font-weight: 700; margin: 20px 0 8px; color: #1A1A18; }
        .lx-content ul, .lx-content .lx-ul { padding-left: 28px; margin: 0 0 14px; }
        .lx-content ol, .lx-content .lx-ol { padding-left: 28px; margin: 0 0 14px; }
        .lx-content li, .lx-content .lx-li { margin-bottom: 6px; }
        .lx-content blockquote, .lx-content .lx-quote { border-left: 3px solid #6C5CE7; padding: 4px 16px; margin: 16px 0; color: #636E72; font-style: italic; background: #FAFAF7; border-radius: 0 6px 6px 0; }
        .lx-content a, .lx-content .lx-link { color: #6C5CE7; text-decoration: underline; text-underline-offset: 3px; }
        .lx-content .lx-bold { font-weight: 700; }
        .lx-content .lx-italic { font-style: italic; }
        .lx-content .lx-underline { text-decoration: underline; }
        .lx-content .lx-strike { text-decoration: line-through; }
        .lx-content .lx-code { background: #F5F4F0; padding: 2px 6px; border-radius: 4px; font-size: 15px; font-family: ui-monospace, SFMono-Regular, monospace; }
        .lx-content img { max-width: 100%; border-radius: 10px; margin: 12px 0; }
      `}</style>
    </div>
  );
}

/** Not used with Lexical — exported for backward compat with older imports. */
export function markdownToHtml(md: string): string {
  return md; // legacy shim; PostEditor doesn't rely on this anymore
}
