import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'How to Remember Where You Put Things: A Working-Memory Fix',
  description:
    'How to remember where you put things, honestly. The fix is not better memory — it is better encoding. The two-second habit that actually works, plus the science.',
  alternates: { canonical: `${SITE_URL}/how-to-remember-where-you-put-things` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'How to Remember Where You Put Things', description: 'The working-memory fix for losing your keys, phone, and glasses.', url: `${SITE_URL}/how-to-remember-where-you-put-things`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'How to Remember Where You Put Things', description: 'The two-second habit that actually works.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Why do I keep forgetting where I put things?', a: 'Almost always an attention failure rather than a memory failure. The information was briefly present in working memory but never got encoded into longer-term storage because you were distracted at the moment of placement. The fix is not better memory; it is better encoding.' },
  { q: 'Is this a sign of dementia?', a: 'Occasional misplacing is normal at any age and not a warning sign by itself. The pattern to watch for is forgetting that you have items at all (not just where they are), getting lost in familiar places, or major changes in your ability to manage daily life. If you are concerned, talk to a doctor; do not diagnose yourself from a memory blog.' },
  { q: 'Does a memory training app help with this?', a: 'A bit, indirectly. Visual-memory practice sharpens the system that holds short-term spatial information, which is the same system that fails when you set keys down distracted. But the biggest win is the encoding habit at the moment of placement, not the practice. The app is a useful supplement; the two-second habit is the actual fix.' },
  { q: 'Will a tracker fix this?', a: 'Tile / AirTag / Pebblebee work, but they fix the symptom not the cause, and they only help for the few items you tag. The encoding habit applies to everything you put down, including the things you cannot stick a tracker to (glasses, books, the post, the parking spot).' },
  { q: 'How long does it take to build the habit?', a: 'About two weeks of conscious practice. After that the habit goes automatic. The two-second pause becomes part of how you put things down, and the "where did I leave it" failures drop dramatically.' },
];

export const revalidate = 3600;

export default async function HowToRememberWherePage() {
  const pageUrl = `${SITE_URL}/how-to-remember-where-you-put-things`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /forget|memory|attention|distract|adhd/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Remember Where You Put Things: A Working-Memory Fix', description: 'Honest, working-memory-grounded fix for losing keys, phone, and glasses.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'How to remember where you put things' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="thinking" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>The actual fix</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            How to remember where you put things:<br />
            it is <span style={{ color: P.accent }}>not a memory problem</span>
          </h1>
        </div>

        <p style={paraLead}>
          The frustrating thing about losing your keys for the third time this week is the suspicion that something is wrong with your memory. The encouraging thing is that something is almost certainly not. The misplacing-things problem is an attention problem dressed up as a memory problem, and once you see it that way the fix is much more achievable than another brain-training app.
        </p>

        <section style={section}>
          <h2 style={h2}>What is actually happening</h2>
          <p style={paraStyle}>
            Memory has stages. Information has to be perceived, then briefly held in working memory, then encoded into longer-term storage, then retrieved later. Failures can happen at any stage, but the most common one (by a long way) is encoding. The information never made it into memory in the first place. There is nothing to retrieve.
          </p>
          <p style={paraStyle}>
            When you walk into the kitchen on autopilot, put your keys down without looking at where they go, and start thinking about dinner, the placement was perceived (your eyes saw it) and was briefly in working memory (you knew you put them down) but was never encoded for later retrieval. Two minutes later it is gone. This is the visuospatial sketchpad in action, and it dumps anything not actively rehearsed within about thirty seconds. Baddeley and Hitch (1974) described this system in detail.
          </p>
          <p style={paraStyle}>
            For the longer explanation of the underlying systems, see our glossary entries on{' '}
            <Link href="/glossary/working-memory" style={inlineLink}>working memory</Link>
            {' '}and{' '}
            <Link href="/glossary/spatial-memory" style={inlineLink}>spatial memory</Link>.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The two-second habit that fixes it</h2>
          <p style={paraStyle}>
            When you put something down, spend two seconds doing two specific things:
          </p>
          <ol style={ulStyle}>
            <li><strong>Look directly at where it is going.</strong> Not nearby, not in the general direction. Look at the actual spot.</li>
            <li><strong>Say where it is, out loud or in your head.</strong> "Keys, kitchen counter, next to the kettle." "Phone, bedside table." "Glasses, on the book."</li>
          </ol>
          <p style={paraStyle}>
            That is the whole technique. It feels almost insultingly simple. It also works, because what you are doing in those two seconds is forcing the encoding step that you normally skip. The deliberate look-and-name is what moves the placement from "briefly perceived" to "actually stored". When you later go looking, there is something to retrieve.
          </p>
          <p style={paraStyle}>
            Saying it out loud is more effective than saying it silently, especially when you are tired or distracted. The technique is sometimes called the "production effect" in the memory literature, and the verbal production reliably improves recall of the produced item.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Why "improve your memory" advice mostly misses this</h2>
          <p style={paraStyle}>
            Most memory advice is aimed at the retrieval and storage stages: mnemonics, spaced repetition, memory palaces. Those are real techniques and they work for the things they are designed for (recalling lists, remembering studied material, holding onto facts over weeks). They are mostly the wrong tool for the misplacing-things problem because the misplacing-things problem is not happening at retrieval. It is happening at encoding, and no amount of clever retrieval technique can recover information that was never encoded.
          </p>
          <p style={paraStyle}>
            Brain-training apps have a similar gap. They train the cognitive substrate (working memory, visual recall) that supports better encoding in the first place, which is genuinely useful as a general thing. But the specific failure of "I put my keys down without paying attention" is not solved by app practice. It is solved by paying attention at the moment of placement. The app is a useful supplement; the habit is the fix.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>When this stops being a habit fix</h2>
          <p style={paraStyle}>
            Occasional misplacing is normal at every age. The pattern that warrants attention is different: forgetting that items exist at all rather than just where they are, putting things in odd places (keys in the fridge), getting lost in familiar surroundings, or noticeable changes in your ability to manage daily routines. Those patterns can be early signs of cognitive decline and are worth raising with a doctor, not a memory blog.
          </p>
          <p style={paraStyle}>
            For older adults specifically, our guide on{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>memory games for seniors</Link>
            {' '}covers the honest version of what is and is not concerning. For ADHD adults, the misplacing problem is often more frequent because the attention dimension is structurally affected;{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>memory training for ADHD</Link>
            {' '}covers that pattern.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What about trackers</h2>
          <p style={paraStyle}>
            Tile, AirTag, Pebblebee and similar work fine for the few high-value items you can attach them to. They are a useful safety net for keys, wallet, occasional remote control. The limits: you can only tag a small number of items, the things you most often misplace (glasses, books, the post, the parking space, the kid\'s school bag) often cannot take a tracker, and the trackers themselves get lost too.
          </p>
          <p style={paraStyle}>
            Trackers are a fine complement to the encoding habit. They are not a substitute for it.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Train the underlying machinery too</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            The two-second habit is the fix. Daily visual-memory practice keeps the system underneath it sharp. Two minutes a day, free on iOS.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={h2}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 10, padding: '14px 18px' }}>
                <summary style={{ cursor: 'pointer', fontSize: 15, fontWeight: 700, color: P.text }}>{f.q}</summary>
                <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.65, marginTop: 10, marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: 'block', padding: '14px 16px', borderRadius: 12, background: 'white', border: '1px solid rgba(0,0,0,0.04)', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>From the blog</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Related: the companion piece on{' '}
            <Link href="/how-to-remember-names" style={inlineLink}>how to remember names</Link>, the broader{' '}
            <Link href="/visual-memory-exercises" style={inlineLink}>visual memory exercises</Link>
            {' '}page, and the honest{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>does brain training work?</Link>
            {' '}explainer.
          </p>
        </section>

        <p style={{ fontSize: 12, color: P.textD, marginTop: 28, textAlign: 'center' }}>
          <Link href="/" style={{ color: P.accent, textDecoration: 'underline' }}>Back to Blanked home</Link>
        </p>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}><Footer /></div>
    </div>
  );
}

const section: React.CSSProperties = { marginTop: 36 };
const h2: React.CSSProperties = { fontSize: 26, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3 };
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
