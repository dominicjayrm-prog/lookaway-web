/**
 * Lexical DecoratorNode for inline images in the blog editor.
 *
 * Renders an actual <img> at the image's position in the doc (so the editor
 * shows the real picture instead of a markdown URL string) while still
 * round-tripping to/from markdown via the custom IMAGE transformer defined
 * below.
 */

import {
  DecoratorNode,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';
import type { ElementTransformer } from '@lexical/markdown';

export type SerializedImageNode = Spread<
  {
    src: string;
    alt: string;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.JSX.Element> {
  __src: string;
  __alt: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  constructor(src: string, alt: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
  }

  /** Block-level. Critical: when @lexical/markdown exports the doc, it only
   *  iterates top-level children of root and tries ElementTransformer.export
   *  on each. If we report `true` here, $insertNodes nests this inside the
   *  current paragraph, the export never visits us, and the image silently
   *  drops out of the saved markdown — which is exactly the bug we're fixing.
   */
  isInline(): false {
    return false;
  }

  /** Mark as a "keyboard-selectable" block so arrow keys and backspace
   *  treat the image as a single unit. */
  isKeyboardSelectable(): true {
    return true;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement('div');
    div.style.margin = '16px 0';
    div.style.display = 'block';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.JSX.Element {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={this.__src}
        alt={this.__alt}
        style={{ maxWidth: '100%', borderRadius: 10, display: 'block' }}
      />
    );
  }

  getSrc(): string {
    return this.__src;
  }

  getAlt(): string {
    return this.__alt;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
    };
  }

  static importJSON(serialized: SerializedImageNode): ImageNode {
    return $createImageNode(serialized.src, serialized.alt);
  }
}

export function $createImageNode(src: string, alt: string): ImageNode {
  return new ImageNode(src, alt);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}

/**
 * Markdown transformer: `![alt](src)` ⇄ ImageNode.
 *
 * Registered into the TRANSFORMERS list so that
 * - $convertFromMarkdownString turns `![...](...)` into an ImageNode on load,
 * - $convertToMarkdownString turns each ImageNode back into `![...](...)` on save.
 */
export const IMAGE_TRANSFORMER: ElementTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!$isImageNode(node)) return null;
    return `![${node.getAlt()}](${node.getSrc()})`;
  },
  regExp: /!\[([^\]]*)\]\(([^)]+)\)\s*$/,
  replace: (parent, _children, match) => {
    const [, alt, src] = match;
    const imageNode = $createImageNode(src.trim(), alt.trim());
    parent.replace(imageNode);
  },
  type: 'element',
};
