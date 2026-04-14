export default function PostBody({ html }: { html: string }) {
  return (
    <>
      <div
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .prose-blog { font-size: 17px; line-height: 1.75; color: #1A1A18; }
        .prose-blog h2 { font-size: 28px; font-weight: 800; margin: 40px 0 14px; letter-spacing: -0.4px; }
        .prose-blog h3 { font-size: 22px; font-weight: 700; margin: 32px 0 10px; }
        .prose-blog h4 { font-size: 18px; font-weight: 700; margin: 24px 0 8px; }
        .prose-blog p { margin: 0 0 18px; }
        .prose-blog ul, .prose-blog ol { padding-left: 26px; margin: 0 0 18px; }
        .prose-blog li { margin-bottom: 6px; }
        .prose-blog blockquote { border-left: 3px solid #6C5CE7; padding: 6px 20px; margin: 20px 0; color: #636E72; font-style: italic; background: #FAFAF7; border-radius: 0 8px 8px 0; }
        .prose-blog a { color: #6C5CE7; text-decoration: underline; text-underline-offset: 3px; }
        .prose-blog a:hover { color: #A29BFE; }
        .prose-blog code { background: #F5F4F0; padding: 2px 6px; border-radius: 4px; font-size: 15px; font-family: ui-monospace, SFMono-Regular, monospace; }
        .prose-blog pre { background: #1A1A18; color: #FAFAF7; padding: 16px 20px; border-radius: 12px; margin: 20px 0; overflow-x: auto; font-size: 14px; }
        .prose-blog pre code { background: transparent; color: inherit; padding: 0; }
        .prose-blog img { max-width: 100%; border-radius: 12px; margin: 20px 0; display: block; }
        .prose-blog hr { border: none; border-top: 1px solid #EEEDE8; margin: 36px 0; }
        .prose-blog strong { font-weight: 700; }
      `}</style>
    </>
  );
}
