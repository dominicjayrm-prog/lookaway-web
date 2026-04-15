'use client';

import { useState } from 'react';

interface Props {
  url: string;
  title: string;
}

/**
 * Share buttons for the bottom of a blog post. Twitter/X, LinkedIn, Facebook,
 * and a copy-link button. All links open in a new tab. No external scripts or
 * third-party bundles — just plain intent URLs.
 */
export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Older browsers: give up gracefully
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      marginTop: 32, padding: '16px 18px',
      background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12,
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#636E72', marginRight: 4 }}>
        Share this post
      </span>
      <ShareLink href={twitter} label="Share on X (Twitter)">X / Twitter</ShareLink>
      <ShareLink href={linkedin} label="Share on LinkedIn">LinkedIn</ShareLink>
      <ShareLink href={facebook} label="Share on Facebook">Facebook</ShareLink>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy link to clipboard"
        style={{
          padding: '6px 12px', borderRadius: 8,
          border: '1px solid #EEEDE8', background: copied ? '#00B89410' : 'white',
          color: copied ? '#00B894' : '#1A1A18',
          fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        {copied ? '✓ Link copied' : 'Copy link'}
      </button>
    </div>
  );
}

function ShareLink({ href, label, children }: {
  href: string; label: string; children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        padding: '6px 12px', borderRadius: 8,
        border: '1px solid #EEEDE8', background: 'white',
        color: '#1A1A18', textDecoration: 'none',
        fontSize: 13, fontWeight: 600,
      }}
    >
      {children}
    </a>
  );
}
