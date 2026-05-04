import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Games for Seniors: A Calm 2-Minute Daily Routine',
  description:
    'Memory games for seniors that respect your time and your eyes. A calm two-minute daily routine, free, no subscriptions, backed by real research.',
  alternates: { canonical: `${SITE_URL}/memory-games-for-seniors` },
  openGraph: {
    type: 'article',
    title: 'Memory Games for Seniors: A Calm 2-Minute Daily Routine',
    description:
      'Memory games for seniors that respect your time and your eyes. A calm two-minute daily routine, free on iOS.',
    url: `${SITE_URL}/memory-games-for-seniors`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Games for Seniors: A Calm 2-Minute Daily Routine',
    description: 'A calm, science-backed memory game for older adults. Free on iOS.',
    images: ['/opengraph-image'],
  },
};

const faqs = [
  {
    q: 'Will memory games slow down or prevent dementia?',
    a: 'Honest answer: maybe, partially, in some cases. The ACTIVE trial (Edwards et al., 2017) followed older adults for ten years and found that participants who did speed-of-processing training had a meaningfully lower risk of dementia at follow-up than the control group. That is one of the strongest results in the entire cognitive-training literature. It does not mean any app guarantees dementia prevention. It means there is real evidence that consistent cognitive engagement helps. Pair it with the rest of what the research says actually moves the needle: regular physical activity, social contact, sleep, blood-pressure management, and a Mediterranean-style diet.',
  },
  {
    q: 'How long should I play each day?',
    a: 'Two minutes is enough to build the habit, and the habit is what matters. Five to ten minutes is fine if you enjoy it. The research supports consistent daily engagement more than long single sessions.',
  },
  {
    q: 'Is the text large enough to read comfortably?',
    a: 'Yes. The visuals are deliberately bold and uncluttered, with high contrast and minimal small text. If your iOS Display Zoom is set to "Larger Text", Blanked respects that.',
  },
  {
    q: 'Will I have to figure out a complicated app?',
    a: 'No. There is one main thing to do (study a scene, then answer questions from memory) and the tutorial walks you through it the first time. Most users are playing properly within two minutes of opening the app.',
  },
  {
    q: 'Are there ads?',
    a: 'Occasionally, yes, in the free version. They are short and skippable. If they bother you, the optional Blanked+ subscription removes them. The full game is fully playable with or without it.',
  },
  {
    q: 'Is Blanked free?',
    a: 'Yes. The full game, all six modes, and all 400 plus levels are free. Blanked+ is an optional subscription that only removes ads and adds cosmetic items.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Not yet. Blanked is iOS-only at the moment. Android is on the roadmap.',
  },
];

export default async function SeniorsPage() {
  const pageUrl = `${SITE_URL}/memory-games-for-seniors`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /age|aging|ageing|senior|older|dementia|decline|sleep|brain.?game/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Memory Games for Seniors: A Calm 2-Minute Daily Routine',
    description:
      'Memory games for seniors that respect your time and your eyes. The science behind cognitive training in older adults and how Blanked fits in.',
    author: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Memory games for seniors' },
      ]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="normal" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For Older Adults</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Memory games for seniors:<br />
            a <span style={{ color: P.accent }}>calm 2-minute daily routine</span>, backed by real research
          </h1>
        </div>

        <p style={paraLead}>
          Most brain training apps shout at you. Bright animations, urgent timers, daily streak penalties. That is fine when you are 22 and want a video game in your pocket. It is exhausting when you are 65 and would rather have a calm few minutes with your morning coffee.
        </p>
        <p style={paraStyle}>
          Blanked is built differently. One thing to do, two minutes a day, no penalty if you skip a day. Below is what the research actually says about cognitive training in older adults (it is more useful than the usual hand-waving), how Blanked is set up to make practice easy and pleasant, and which game modes most older players find most rewarding.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        {/* Why seniors */}
        <section style={section}>
          <h2 style={h2}>What the research actually says</h2>
          <p style={paraStyle}>
            Cognitive change with age is real and ordinary. From around the mid-50s, a few specific things tend to slow: the speed of processing visual information, the ability to hold several things in mind at once, and the speed of retrieving names. The good news is that all three are responsive to focused practice. None of them are fixed.
          </p>
          <p style={paraStyle}>
            The most-cited evidence here is the ACTIVE trial (Advanced Cognitive Training for Independent and Vital Elderly). It was a large multi-site US study that tracked older adults for ten years and tested several types of cognitive training. The most striking result, published by Edwards and colleagues in 2017, was that participants who did speed-of-processing training had a meaningfully lower risk of dementia at long-term follow-up. That is the strongest piece of "transfer" evidence in the entire brain-training literature.
          </p>
          <p style={paraStyle}>
            Earlier work in the same line includes the IMPACT study (Smith et al., 2009), which found that plasticity-based cognitive training improved auditory memory and attention in older adults. And the broader Park et al. (2014) study on "sustained engagement" showed that older adults who engaged in mentally demanding new activities for several months showed measurable cognitive gains compared to controls.
          </p>
          <p style={paraStyle}>
            None of this means an app cures cognitive decline. The honest read is that consistent, varied cognitive engagement, alongside physical activity, social contact, and sleep, is genuinely associated with healthier ageing. A calm two-minute daily memory game is one small piece of that. The Simons et al. (2016) review in Psychological Science in the Public Interest is the right balanced reference: real but bounded benefits, narrow rather than broad transfer. If you want a broader picture of how memory itself changes with age, our post on{' '}
            <Link href="/blog" style={inlineLink}>memory and ageing</Link>
            {' '}walks through what actually declines and what does not.
          </p>
        </section>

        {/* How Blanked is built for older players */}
        <section style={section}>
          <h2 style={h2}>How Blanked is built for older players</h2>
          <ul style={ulStyle}>
            <li><strong>Calm visuals.</strong> Bold, high-contrast shapes. No flashing animations. No timers shouting at you to hurry.</li>
            <li><strong>Two-minute sessions.</strong> Short by design. You can do one round and put the phone down. The streak system gives you a small nudge to come back, but there is no penalty if you miss a day.</li>
            <li><strong>One main thing to learn.</strong> Study a scene, the screen blanks, answer questions from memory. That is the whole game. There is no menu maze, no list of fifty mini-games to learn, no overwhelming dashboard.</li>
            <li><strong>Genuinely free.</strong> The full game is free. There is no subscription paywall in the way of the actual content.</li>
            <li><strong>Respects iOS accessibility.</strong> If you have set Larger Text or Display Zoom, Blanked respects those settings.</li>
          </ul>
        </section>

        {/* Modes useful for older players */}
        <section style={section}>
          <h2 style={h2}>Which game modes older players tend to enjoy most</h2>
          <p style={paraStyle}>
            Blanked has six modes. Most older players gravitate toward three in particular.
          </p>
          <ul style={ulStyle}>
            <li><strong>Classic.</strong> The slowest of the modes. You see a scene, study it for a generous few seconds, the screen blanks, and you answer at your own pace. This is the mode to start with.</li>
            <li><strong>Snap Match.</strong> Match items based on visual recall. Closely related to recognising faces, layouts, and rooms, which is a useful real-world skill.</li>
            <li><strong>Color Chain.</strong> A relaxed grid-recall mode. Gentler than the speed modes, with the same underlying training benefit.</li>
          </ul>
          <p style={paraStyle}>
            The faster modes (Speed Recall, Counting Blitz, Sequence) are still worth dipping into occasionally, especially because the ACTIVE-style speed-of-processing benefit specifically benefits from time pressure. Try them when you feel sharp. Skip them when you do not.
          </p>
        </section>

        {/* How to fit it in */}
        <section style={section}>
          <h2 style={h2}>How to make it part of your day</h2>
          <p style={paraStyle}>
            The single biggest thing that determines whether a daily habit sticks is anchoring it to a routine you already have. Three suggestions:
          </p>
          <ul style={ulStyle}>
            <li>One round with your morning coffee or tea, before the news.</li>
            <li>One round after lunch, while the kettle boils.</li>
            <li>One round before bed, instead of doomscrolling.</li>
          </ul>
          <p style={paraStyle}>
            Pick one. The act of pairing the game with a thing you already do every day is what turns it into a habit. Within two weeks you will not need to remember; it will just be part of the routine.
          </p>
        </section>

        {/* Realistic expectations */}
        <section style={section}>
          <h2 style={h2}>What realistic improvement looks like</h2>
          <p style={paraStyle}>
            Be honest about what cognitive training can and cannot do. The ACTIVE-trial result is real and important, but it is also specific: speed-of-processing training was associated with reduced dementia risk over a decade of follow-up. That is the headline. It does not mean any single app, played for a few weeks, will produce dramatic everyday improvements.
          </p>
          <p style={paraStyle}>
            What you can reasonably expect from consistent practice over weeks and months: the specific tasks the games train get noticeably easier (you remember more items, retrieve faces and names a touch faster, hold layouts in mind more reliably), and you build the habit of regular cognitive engagement, which the ageing-research literature consistently associates with better cognitive outcomes.
          </p>
          <p style={paraStyle}>
            What you should not expect: a magic intervention that prevents normal age-related cognitive change, or a substitute for the genuinely high-impact things (movement, sleep, social contact, blood-pressure management). Cognitive training is one piece of the puzzle, not the whole picture.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two minutes. Calm. Free.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            No subscription, no shouting timers, no fifty-game catalog to learn. Just a tiny daily habit you can actually keep.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </section>

        {/* FAQ */}
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

        {/* Keep reading */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={h2}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  style={{
                    display: 'block', padding: '14px 16px', borderRadius: 12,
                    background: 'white', border: '1px solid rgba(0,0,0,0.04)',
                    textDecoration: 'none', color: 'inherit',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>From the blog</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: P.text, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</div>
                  {p.subtitle && <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{p.subtitle}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related comparisons */}
        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Want a quick check on your current visual memory? Try the free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}in your browser, no signup, two minutes. Wondering how Blanked stacks up against the bigger names? See our honest comparisons of{' '}
            <Link href="/compare/lumosity" style={inlineLink}>Blanked vs Lumosity</Link>,{' '}
            <Link href="/compare/brainhq" style={inlineLink}>Blanked vs BrainHQ</Link>
            {' '}(BrainHQ has the strongest research backing in older adults specifically), and the full{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>. Or see the parallel guides for{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>,{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>ADHD adults</Link>, and{' '}
            <Link href="/brain-games-for-office-workers" style={inlineLink}>office workers</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li><a href="https://doi.org/10.1016/j.trci.2017.09.002" target="_blank" rel="noopener noreferrer" style={{ color: P.accent }}>Edwards et al. (2017), &ldquo;Speed of processing training results in lower risk of dementia&rdquo;, Alzheimer&apos;s & Dementia: TRCI</a></li>
            <li><a href="https://doi.org/10.1111/j.1532-5415.2008.02167.x" target="_blank" rel="noopener noreferrer" style={{ color: P.accent }}>Smith et al. (2009), &ldquo;A cognitive training program based on principles of brain plasticity (IMPACT)&rdquo;, JAGS</a></li>
            <li>Park et al. (2014), &ldquo;The Impact of Sustained Engagement on Cognitive Function in Older Adults&rdquo;, Psychological Science</li>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={{ color: P.accent }}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
          </ul>
        </section>

        <p style={{ fontSize: 12, color: P.textD, marginTop: 28, textAlign: 'center' }}>
          <Link href="/" style={{ color: P.accent, textDecoration: 'underline' }}>Back to Blanked home</Link>
        </p>
      </main>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Footer />
      </div>
    </div>
  );
}

const section: React.CSSProperties = { marginTop: 36 };
const h2: React.CSSProperties = {
  fontSize: 24, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3,
};
const paraLead: React.CSSProperties = {
  fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500,
};
const paraStyle: React.CSSProperties = {
  fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14,
};
const ulStyle: React.CSSProperties = {
  fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14,
};
const ctaPrimary: React.CSSProperties = {
  display: 'inline-block', padding: '14px 28px', borderRadius: 12,
  background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700,
  textDecoration: 'none',
};
const inlineLink: React.CSSProperties = {
  color: COLORS.accent, textDecoration: 'underline',
};
