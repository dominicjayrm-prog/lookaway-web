import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Free Lumosity Alternative: Honest, No Subscription, iOS',
  description:
    'Looking for a free Lumosity alternative? Blanked is a visual memory game with no paywall, no inflated claims, and a two-minute daily habit. iOS, free.',
  alternates: { canonical: `${SITE_URL}/lumosity-alternative` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Free Lumosity Alternative: Honest, No Subscription, iOS',
    description: 'A genuinely free Lumosity alternative for visual memory training. iOS, no paywall on the core game.',
    url: `${SITE_URL}/lumosity-alternative`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lumosity Alternative',
    description: 'A genuinely free Lumosity alternative. iOS, no paywall on gameplay.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'Is there a free version of Lumosity?',
    a: 'There is a limited free tier (a small number of games per day) but most of the catalogue and the daily training programme sit behind a Premium subscription, currently around £11.99 a month or £59.99 a year depending on region. If you want the full Lumosity experience, you pay for it. If you want a genuinely free alternative, the rest of this page is for you.',
  },
  {
    q: 'What is the best free Lumosity alternative?',
    a: 'On iOS, Blanked is the strongest free option for the visual-memory part of what Lumosity covers. The full game (six modes, 400+ levels) is free, with no paywall on gameplay; the optional Blanked+ subscription only removes ads and adds cosmetics. For older adults who want maximum research backing, BrainHQ is the most-studied alternative but it is also subscription-based, so it does not solve the "free" problem.',
  },
  {
    q: 'Why is Lumosity not free?',
    a: 'Lumosity is a subscription business. The free tier exists as a sample; the actual product is the Premium subscription. That is a perfectly normal business model, just not the one Blanked uses. Blanked is built around making the core game free indefinitely, with the optional Blanked+ subscription priced as a tip jar rather than a paywall.',
  },
  {
    q: 'Did Lumosity get sued?',
    a: 'In 2016 the US Federal Trade Commission fined Lumos Labs $2 million for deceptive advertising. The claims at issue were that Lumosity could prevent dementia, memory loss, and Alzheimer\'s, and could boost academic and test performance. None of those claims were supported by evidence. The product still operates with much more careful language. We cover the full story on our /does-brain-training-work page.',
  },
  {
    q: 'Does Lumosity actually work?',
    a: 'It will improve your performance on Lumosity\'s games and on closely related cognitive tasks. The broader claim ("makes you smarter in everyday life") has weak evidence (Simons et al., 2016 is the standard reference). The same caveat applies to Blanked and every other brain-training app: narrow gains are real, broad transfer is mostly marketing.',
  },
  {
    q: 'Is Blanked on Android?',
    a: 'Not yet. Blanked is iOS-only with Android on the roadmap. Lumosity is on both.',
  },
];

export const revalidate = 3600;

export default async function LumosityAlternativePage() {
  const pageUrl = `${SITE_URL}/lumosity-alternative`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /lumosity|alternative|brain.?training|memory|free/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free Lumosity Alternative: Honest, No Subscription, iOS',
    description: 'A free, honest Lumosity alternative for visual memory training. iOS, no paywall on the core game.',
    author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` },
    publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Lumosity alternative' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Free alternative</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            A free Lumosity alternative:<br />
            <span style={{ color: P.accent }}>genuinely free</span>, honest about results, two minutes a day
          </h1>
        </div>

        <p style={paraLead}>
          Most people searching for a free Lumosity alternative are not in the market for another subscription with a free trial. They want a brain-training app where the actual game is free, full stop, and the company is not going to pretend it cures memory loss. This page is for those people.
        </p>
        <p style={paraStyle}>
          Blanked is a visual memory game for iOS. The full game (six modes, 400+ levels, daily streaks, friend challenges) is free, with no paywall on any gameplay. The optional Blanked+ subscription removes ads and adds cosmetic items; it does not gate content. The rest of this page walks through how Blanked compares to Lumosity, where it is genuinely the better choice, and where Lumosity might still suit you better.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        <section style={section}>
          <h2 style={h2}>The "free" problem with Lumosity</h2>
          <p style={paraStyle}>
            Lumosity is a subscription business. The free tier gives you three games a day from a small rotating set; the rest of the 50+ game catalogue and the personalised daily training programme sit behind Premium, which currently runs around £11.99 a month or £59.99 a year depending on your region. The free tier is a sample; the real product is paid.
          </p>
          <p style={paraStyle}>
            There is nothing wrong with that as a business model. It just is not what people mean when they search "free Lumosity alternative". They mean: a brain-training app where the actual game I want to play is free. Blanked is built around that model. The Blanked+ subscription exists, but it is closer to a tip jar than a gate: it removes ads and unlocks cosmetics. The core six game modes and all 400+ levels are free with or without it.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The honesty problem with Lumosity (and the wider category)</h2>
          <p style={paraStyle}>
            In 2016 the US Federal Trade Commission fined Lumos Labs $2 million for deceptive advertising. The claims at issue were that Lumosity could prevent memory loss, dementia, and Alzheimer\'s, and that it could improve performance at school and work. The FTC found those claims were not supported by evidence. Lumos Labs paid the fine, the marketing was rewritten, and the product carried on with more careful language.
          </p>
          <p style={paraStyle}>
            We mention this not to pile on, but because the underlying scientific question matters and most brain-training apps still tiptoe around it. The honest research consensus, summarised in Simons et al. (2016) for Psychological Science in the Public Interest, is that brain-training games reliably improve performance on the trained tasks and on closely related tasks, with weak evidence for broader transfer to general cognition or daily life. We have a full write-up of this on{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>.
          </p>
          <p style={paraStyle}>
            Blanked is upfront about this. We claim visual-memory practice improves visual memory, which the research supports. We do not claim it prevents dementia or boosts IQ, which the research does not support. The honesty is part of why Blanked exists.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What you actually get with Blanked</h2>
          <ul style={ulStyle}>
            <li><strong>Six game modes.</strong> Classic scene recall (study a scene, the screen blanks, answer questions). Speed Recall (time-pressured visual recall). Snap Match (spot the difference between two scenes, from memory). Sequence (reproduce the order things appeared). Counting Blitz (rapid counting under load). Colour Chain (memorise and recall a colour grid).</li>
            <li><strong>400+ levels across multiple worlds.</strong> Difficulty ramps gradually. Most players reach the Mastermind world after a few weeks of daily play.</li>
            <li><strong>Two-minute sessions.</strong> Designed for adults who do not have fifteen minutes a day for brain training. Habit research is unambiguous that shorter daily commitments stick better.</li>
            <li><strong>Head-to-head friend challenges.</strong> Send a friend the same scene with the same questions and compare scores. Lumosity has leaderboards but no direct-comparison mode.</li>
            <li><strong>Blink, a mascot.</strong> Lumosity does not have one. Most adults find this either charming or beside the point; we lean charming.</li>
            <li><strong>Genuinely free.</strong> No paywall on the actual game. No daily-game limit.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>Where Lumosity might still suit you better</h2>
          <p style={paraStyle}>
            This page is not a hatchet job. There are real cases where Lumosity is still the right call.
          </p>
          <ul style={ulStyle}>
            <li>You want training across many cognitive domains (attention, problem solving, language, math) rather than visual memory specifically.</li>
            <li>You value the larger published in-house research programme (with the FTC caveat in mind).</li>
            <li>You are happy with a fifteen-minute daily session and a polished personalised programme.</li>
            <li>You need Android. Lumosity is on both iOS and Android; Blanked is iOS-only at the moment.</li>
          </ul>
          <p style={paraStyle}>
            For a deeper side-by-side, see{' '}
            <Link href="/compare/lumosity" style={inlineLink}>/compare/lumosity</Link>. For the broader landscape (Peak, Elevate, BrainHQ, NeuroNation, Impulse, CogniFit), the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>
            {' '}covers each one individually.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>How to switch (if you are currently on Lumosity)</h2>
          <ul style={ulStyle}>
            <li><strong>Cancel the Lumosity subscription</strong> in your Apple ID settings (Settings &rarr; your name &rarr; Subscriptions) at least 24 hours before the next renewal date.</li>
            <li><strong>Download Blanked.</strong> The first session takes about a minute, walks you through the basic mechanic, and asks if you want notifications. The full game is unlocked from level one.</li>
            <li><strong>Set a tiny daily anchor.</strong> Two minutes after your morning coffee, on the bus, before bed. The shorter the better; consistency is the whole game.</li>
            <li><strong>Run the free{' '}
              <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
              {' '}now</strong> to set a baseline, then again in three weeks. Trust the change in your own score over time more than absolute level comparisons.</li>
          </ul>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>The free, honest version.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            No paywall on the core game. No deceptive claims. Two minutes a day.
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
                  {p.subtitle && <div style={{ fontSize: 12, color: P.textD, lineHeight: 1.4 }}>{p.subtitle}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            Related: the in-depth{' '}
            <Link href="/compare/lumosity" style={inlineLink}>Blanked vs Lumosity comparison</Link>, the parallel{' '}
            <Link href="/peak-alternative" style={inlineLink}>Peak alternative</Link>
            {' '}page, the broader{' '}
            <Link href="/free-memory-game-iphone" style={inlineLink}>free memory game for iPhone</Link>
            {' '}page, and the honest{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>does brain training actually work?</Link>
            {' '}write-up.
          </p>
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
const h2: React.CSSProperties = { fontSize: 26, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3 };
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
