import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Brain Games for Office Workers: A 2-Minute Desk Reset',
  description:
    'Brain games for office workers: a two-minute desk reset that fits between meetings, sharpens visual recall, and is free. No subscriptions, no fluff.',
  alternates: { canonical: `${SITE_URL}/brain-games-for-office-workers` },
  openGraph: {
    type: 'article',
    title: 'Brain Games for Office Workers: A 2-Minute Desk Reset',
    description:
      'A two-minute brain game for knowledge workers. Free, no subscriptions, slots between meetings.',
    url: `${SITE_URL}/brain-games-for-office-workers`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brain Games for Office Workers: A 2-Minute Desk Reset',
    description: 'A two-minute brain game for knowledge workers. Free on iOS.',
    images: ['/opengraph-image'],
  },
};

const faqs = [
  {
    q: 'Will brain games at my desk make me better at my actual job?',
    a: 'Honestly, indirectly at best. Visual memory practice will improve your performance on visual memory tasks (Engle and Kane, 2004; Klingberg, 2010). The evidence that it transfers to broader workplace skills like email triage, meeting recall, or strategic thinking is weak. Use brain games as a useful micro-break and a light cognitive workout, not a substitute for the real skills you build by doing the job.',
  },
  {
    q: 'Are short breaks actually good for productivity?',
    a: 'Yes, this one has solid backing. Research on attention restoration and microbreaks (e.g. Kim et al., 2017) shows that brief, deliberate breaks during cognitively demanding work reduce fatigue and sustain performance through the afternoon. The exact ideal length is debated; two to five minutes per hour is a reasonable starting point.',
  },
  {
    q: 'How is this different from just scrolling Twitter for a minute?',
    a: 'Doomscrolling activates the same fatigue circuits you are trying to rest. A short focused task (whether memory, breathwork, or a walk) gives your attention system something genuinely different to do for a moment. Two minutes of Blanked is closer to the "different cognitive activity" pattern than to the "more screens, more stimulation" pattern.',
  },
  {
    q: 'Will my colleagues judge me for playing a game at my desk?',
    a: 'Probably less than they judge you for the seventeen browser tabs you currently have open. But pragmatically: a two-minute round on a phone between meetings reads as a normal break. If you are remote, even less of an issue.',
  },
  {
    q: 'Is Blanked actually free?',
    a: 'Yes. The full game, all six modes and 400+ levels, is free. Blanked+ is an optional subscription that removes ads and adds cosmetics. It does not gate gameplay.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Not yet. Blanked is iOS-only at the moment. Android is on the roadmap.',
  },
];

export const revalidate = 3600;

export default async function OfficeWorkersPage() {
  const pageUrl = `${SITE_URL}/brain-games-for-office-workers`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /work|focus|attention|productivity|meeting|forget|distraction|screen.?time/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Brain Games for Office Workers: A 2-Minute Desk Reset',
    description:
      'A two-minute brain game for knowledge workers, designed to slot between meetings without becoming another time sink.',
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
        { name: 'Brain games for office workers' },
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
            <Blink size={72} expression="thinking" />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For Office Workers</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Brain games for office workers:<br />
            a <span style={{ color: P.accent }}>2-minute desk reset</span> that slots between meetings
          </h1>
        </div>

        <p style={paraLead}>
          You already know the pattern. Three meetings before lunch, an inbox you have not really seen the bottom of in months, the slow drift of attention by 3pm. The cliched advice is "take a real break". The honest version: nobody actually takes a real break. They take micro-breaks between things, and those micro-breaks usually become a doomscroll.
        </p>
        <p style={paraStyle}>
          Two minutes of focused visual-memory practice is a different shape of break. Same length as the doomscroll. Different cognitive load. Below: what the research says about microbreaks at work, why a short focused task beats more scrolling, and how to fit Blanked into a knowledge-worker day without making it another performance metric.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        {/* Why this matters */}
        <section style={section}>
          <h2 style={h2}>What microbreak research actually says</h2>
          <p style={paraStyle}>
            The literature on microbreaks at work is reasonably clear at this point: brief deliberate pauses during cognitively demanding work reduce fatigue and sustain performance, especially through the afternoon slump. Kim and colleagues (2017) reviewed a decade of microbreak studies and found that the effect is real, modest, and reasonably consistent across white-collar settings.
          </p>
          <p style={paraStyle}>
            What is more interesting is that not all microbreaks are equal. Passive scrolling on a phone (i.e. more of the same screen-attention you are trying to rest) tends not to deliver the restoration benefit. A different shape of cognitive load, or a brief attention-shift to nature or movement, does. A focused two-minute memory game is closer to "different cognitive load" than to "more of the same".
          </p>
          <p style={paraStyle}>
            On the visual memory side specifically, there is no claim that two minutes a day will turn you into a different employee. The narrow benefit of focused practice is that you get sharper at the specific task you practice (Engle and Kane, 2004). That is real. The broad benefit (better focus during meetings, better recall of email content, faster context switching) is closer to plausible than proven. Calibrate accordingly.
          </p>
        </section>

        {/* Where it fits */}
        <section style={section}>
          <h2 style={h2}>Where two minutes actually fits in an office-worker day</h2>
          <ul style={ulStyle}>
            <li><strong>Between back-to-back meetings.</strong> The five-minute gap most calendars leave is exactly the right size. Two minutes for a round, three minutes to walk to the kitchen.</li>
            <li><strong>While the kettle boils.</strong> Tea-and-coffee timer baked into the kitchen. Most kettles run 60-90 seconds.</li>
            <li><strong>The 3pm slump.</strong> You know the one. Instead of opening yet another browser tab, two minutes on your phone, then back to the actual work.</li>
            <li><strong>Right before a hard task.</strong> If you have a piece of focused work coming, a brief shift in cognitive load (not more screens) can help reset attention.</li>
            <li><strong>End of day.</strong> Last two minutes of the workday, before the commute or the laptop close. Anchored to "I am done" makes it stick.</li>
          </ul>
        </section>

        {/* What about working memory at work */}
        <section style={section}>
          <h2 style={h2}>Working memory at work</h2>
          <p style={paraStyle}>
            One genuinely useful thing to know: the cognitive function that most predicts knowledge-work performance is working memory, the system that holds and manipulates information for a few seconds at a time. It is what fails when you walk into a meeting and forget the last three things you were going to ask. It is what fails when you read a paragraph and have to read it again. It is what shrinks under stress, fatigue, and screen overload.
          </p>
          <p style={paraStyle}>
            Working memory is moderately trainable on the specific tasks you train (Klingberg, 2010). The Simons et al. (2016) review is the right balanced reference for the broader transfer question; the consensus is that the gains are narrow. So: a two-minute daily working-memory practice will reliably make you better at the practice task and at very closely related tasks. It will not turn you into a different employee. Both things can be true.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two minutes. Between meetings. Free.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Set a baseline by trying the free <Link href="/memory-test" style={inlineLink}>visual memory test</Link>{' '}in your browser, then start the daily two-minute habit on iOS.
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

        {/* Related landing pages */}
        <section style={{ marginTop: 36 }}>
          <p style={paraStyle}>
            See also the parallel guides for{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>,{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>ADHD adults</Link>,{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>older adults</Link>, and{' '}
            <Link href="/memory-games-for-nurses" style={inlineLink}>nurses</Link>. For the specific recall problems most office workers actually have, see{' '}
            <Link href="/how-to-remember-names" style={inlineLink}>how to remember names</Link>
            {' '}(colleagues, clients, conference contacts) and{' '}
            <Link href="/working-memory-exercises-for-adults" style={inlineLink}>working memory exercises for adults</Link>
            {' '}(holding multi-step meeting actions in mind). Free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}for a baseline. Or how Blanked compares to{' '}
            <Link href="/compare/elevate" style={inlineLink}>Elevate</Link>
            {' '}(verbal/math focus, often used in office contexts) on the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li>Kim et al. (2017), &ldquo;Microbreaks and the Recovery Process: A Diary Study&rdquo;, Journal of Applied Psychology</li>
            <li>Engle & Kane (2004), &ldquo;Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control&rdquo;</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
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
