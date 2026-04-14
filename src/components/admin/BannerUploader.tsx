'use client';

import { useState, useRef } from 'react';

interface Props {
  bannerUrl: string | null;
  bannerAlt: string | null;
  onChange: (url: string | null, alt: string | null) => void;
}

export default function BannerUploader({ bannerUrl, bannerAlt, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) {
        alert('Upload failed');
        return;
      }
      const { url } = await res.json();
      onChange(url, bannerAlt ?? '');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div>
      {bannerUrl ? (
        <div style={{ position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bannerUrl} alt={bannerAlt ?? ''} style={{ width: '100%', aspectRatio: '1200/630', objectFit: 'cover', borderRadius: 10 }} />
          <button
            type="button"
            onClick={() => onChange(null, null)}
            style={{
              position: 'absolute', top: 8, right: 8, padding: '4px 10px', borderRadius: 6,
              background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            width: '100%', padding: '32px 16px', borderRadius: 10,
            border: '2px dashed #EEEDE8', background: '#FAFAF7',
            color: '#636E72', fontSize: 13, cursor: uploading ? 'wait' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {uploading ? 'Uploading…' : '+ Upload banner (1200×630 recommended)'}
        </button>
      )}
      {bannerUrl && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10, fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 0.5 }}>
          BANNER ALT TEXT *
          <input
            type="text"
            value={bannerAlt ?? ''}
            onChange={(e) => onChange(bannerUrl, e.target.value)}
            placeholder="Describe the image for accessibility + SEO"
            style={input}
          />
        </label>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFile}
      />
    </div>
  );
}

const input: React.CSSProperties = {
  padding: '8px 10px', borderRadius: 8, border: '1.5px solid #EEEDE8',
  fontSize: 13, outline: 'none', fontFamily: 'inherit', width: '100%',
};
