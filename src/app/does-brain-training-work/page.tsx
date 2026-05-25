import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Does Brain Training Actually Work? An Honest Answer',
  description:
    'Does brain training actually work? An honest, sourced answer. What the research really shows, what the FTC fined Lumosity for, and what to expect from a daily habit.',
  alternates: { canonical: `${SITE_URL}/does-brain-training-work` },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Blanked',
    title: 'Does Brain Training Actually Work? An Honest Answer',
    description: 'An honest, sourced answer to the brain-training question. Real evidence, plain English.',
    url: `${SITE_URL}/does-brain-training-work`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does Brain Training Actually Work?',
    description: 'An honest, sourced answer. Real evidence, plain English.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  {
    q: 'So does brain training actually work or not?',
    a: 'Yes, in a narrow and specific way. Focused practice on a cognitive task reliably improves performance on that task and on closely related tasks. The much bigger claim, that brain training makes you smarter at everything or rescues general cognition, has weak evidence. The Simons et al. (2016) review for Psychological Science in the Public Interest is the careful consensus on this.',
  },
  {
    q: 'Why was Lumosity fined $2 million?',
    a: 'In 2016 the US Federal Trade Commission found that Lumos Labs had been making deceptive claims that Lumosity could prevent memory loss, dementia, and Alzheimer\'s, and could boost academic and test performance. The settlement required them to stop those claims and refund affected subscribers. The app continued to operate. The lesson for the wider industry was that broad-transfer claims do not survive regulatory scrutiny because the evidence does not support them.',
  },
  {
    q: 'Is there any brain training with proper research behind it?',
    a: 'The most-studied is BrainHQ from Posit Science, which has been used in over 100 peer-reviewed studies. The ACTIVE trial (Edwards et al., 2017) followed older adults for 10 years and found that speed-of-processing training, the approach BrainHQ commercialised, was associated with lower dementia risk at long-term follow-up. That is the strongest "transfer" result in the entire brain-training literature. For other apps, the evidence base is much thinner.',
  },
  {
    q: 'If transfer is weak, why bother with brain training at all?',
    a: 'Two reasons. First, the narrow gains are real. If your goal is to get better at one specific cognitive task (visual memory, working memory, processing speed), focused daily practice will get you there. Second, consistent cognitive engagement across many activities is associated with healthier ageing. A short daily memory game is one piece of that broader engagement; just do not expect it to be the whole solution.',
  },
  {
    q: 'How is Blanked different from Lumosity or Peak?',
    a: 'Three ways. It targets one cognitive function (visual memory) rather than promising broad gains. The full game is free with no paywall on gameplay. And the marketing is careful: every claim on the site is sourced, the narrow-transfer caveat is explicit, and we do not pretend brain training will cure forgetfulness or boost IQ. The honesty is the differentiator and it is what the research actually supports.',
  },
  {
    q: 'Will brain training prevent dementia?',
    a: 'Honest answer: probably not by itself, but it may be a small piece of a broader picture. The ACTIVE trial showed reduced dementia risk in one specific training approach (speed-of-processing) over 10 years. That is genuine and important but it is one finding, not a guarantee. The more consistently evidence-backed components of healthy cognitive ageing are physical activity, social engagement, sleep, blood-pressure management, and a Mediterranean-style diet. Brain training is a useful adjunct to those, not a replacement.',
  },
  {
    q: 'How long do I need to play for benefits?',
    a: 'For the narrow-task gains, you typically see improvement within two to four weeks of daily practice. The trial that found dementia-risk reduction (ACTIVE) involved 10 to 14 hour-long sessions over five to six weeks, with booster sessions. For a casual daily habit, two to five minutes a day, every day, will produce the narrow gains. Consistency matters far more than session length.',
  },
];

export const revalidate = 3600;

export default async function DoesBrainTrainingWorkPage() {
  const pageUrl = `${SITE_URL}/does-brain-training-work`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /brain.?training|memory|science|research|study|focus|attention/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Does Brain Training Actually Work? An Honest Answer',
    description:
      'An honest, sourced look at whether brain training works. What the research shows, what the FTC fined Lumosity for, and what to realistically expect from a daily habit.',
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/authors/dominic-roworth`,
      name: 'Dominic Roworth',
      url: `${SITE_URL}/authors/dominic-roworth`,
    },
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
        { name: 'Does brain training work?' },
      ]} />

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
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>The honest answer</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Does brain training <span style={{ color: P.accent }}>actually work</span>?
          </h1>
          <p style={{ fontSize: 15, color: P.textD, marginTop: 12 }}>
            Last reviewed 25 May 2026 · sources cited inline
          </p>
        </div>

        <p style={paraLead}>
          Short version: yes, in a narrow and specific way. The long version is more interesting and more useful, so let us actually go through it. This page is published by a company that makes a brain-training app, which is exactly the kind of company that has a self-interested reason to lie to you. We are going to try not to.
        </p>
        <p style={paraStyle}>
          Here is the honest answer, structured so you can stop reading whenever you have enough.
        </p>

        <section style={section}>
          <h2 style={h2}>The one-paragraph answer</h2>
          <p style={paraStyle}>
            Brain training does produce real, measurable improvements on the specific tasks it trains, plus a smaller amount of transfer to closely related tasks. It does not reliably improve general intelligence, prevent memory loss in any guaranteed way, or rescue everyday forgetfulness across the board. The narrow benefit is genuine and worth the time. The broader claim is mostly marketing. If you keep that distinction in mind, brain training is a perfectly sensible daily habit. If you expect a personality upgrade, you will be disappointed.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The careful answer (with sources)</h2>
          <p style={paraStyle}>
            The clearest summary of the field is Simons and colleagues (2016), a major review for Psychological Science in the Public Interest. The authors evaluated hundreds of studies and reached a consensus that has held up since: short cognitive games reliably improve performance on those games and on closely related laboratory tasks. The evidence for "broad transfer", the leap from improving on a memory game to improving general life cognition, is weak.
          </p>
          <p style={paraStyle}>
            That is the headline finding and most other reviews agree with it. Owen and colleagues (2010), in Nature, ran the same experiment a million times over (literally, with over 11,000 participants) and found exactly this pattern: training improved the trained tasks, with no broader transfer to general cognitive performance. Klingberg (2010) summarised the working-memory-training literature with a more optimistic but still bounded conclusion: focused training produces real gains in working memory, the gains transfer to closely related tasks, and broader transfer remains uncertain.
          </p>
          <p style={paraStyle}>
            The single biggest exception to this pattern, and it is genuinely an exception worth noting, is the ACTIVE trial. ACTIVE (Advanced Cognitive Training for Independent and Vital Elderly) ran from 1998 to 2014 in older adults across multiple US sites. Edwards and colleagues (2017) reported the 10-year follow-up: participants who did speed-of-processing training had a meaningfully lower risk of dementia at long-term follow-up than the control group. That is the strongest piece of transfer evidence in the entire brain-training literature, and it sits inside one specific training approach in one specific population. BrainHQ is the consumer product that commercialised this approach. It is not the cheapest brain-training app, but for older adults specifically the research underneath it is real.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The Lumosity story (because it matters)</h2>
          <p style={paraStyle}>
            In January 2016 the US Federal Trade Commission announced that Lumos Labs, the company behind Lumosity, would pay $2 million to settle charges of deceptive advertising. The FTC found that Lumosity had been marketing the product with claims that it could "prevent memory loss, dementia, and Alzheimer\'s disease" and that it could "perform better at work and in school". The claims, the FTC said, were not supported by the evidence.
          </p>
          <p style={paraStyle}>
            Lumosity did not disappear. The product still exists, still has millions of users, and the underlying games are still reasonable as cognitive practice. What changed was the marketing: read Lumosity\'s site now and you will find much more careful language. The lesson the wider industry took from the settlement was that broad-transfer claims are legally risky as well as scientifically wrong, and most apps have softened their pitch accordingly.
          </p>
          <p style={paraStyle}>
            We mention this on this page partly because it is genuinely informative for anyone trying to assess brain-training apps, and partly because we are a brain-training company and we want to be very explicit about which claims we are making and which we are not. We are claiming visual-memory practice improves visual memory. We are not claiming it prevents dementia, raises IQ, or fixes everyday forgetfulness. Anyone who tells you it does, including us, is overstating.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What this means in practice</h2>
          <p style={paraStyle}>
            If you are thinking about starting a brain-training habit, here is the honest version of what to expect.
          </p>
          <ul style={ulStyle}>
            <li><strong>You will get better at the specific games.</strong> Within two to four weeks of daily play, your scores on the trained tasks will improve measurably. This is real and not placebo.</li>
            <li><strong>You will get a small amount of transfer to closely related tasks.</strong> If you train visual short-term memory, similar visual-memory tasks should get a bit easier. If you train mental arithmetic, similar arithmetic tasks should get a bit easier.</li>
            <li><strong>You probably will not see dramatic everyday changes.</strong> "I am noticeably smarter, my work improved, I never forget names anymore" is not the typical outcome. The narrow gains are real but they are narrow.</li>
            <li><strong>For older adults specifically, the case is stronger.</strong> The ACTIVE evidence for speed-of-processing training is real. If you are over 60 and the dementia question matters to you, the BrainHQ programme is the one with the actual research underneath it.</li>
            <li><strong>Consistency dwarfs duration.</strong> Two minutes a day for a year beats thirty minutes once a fortnight. Habit research backs this up unambiguously.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>How Blanked relates to all of this</h2>
          <p style={paraStyle}>
            Blanked is a visual memory game. The narrow training it offers (study a scene, the screen goes blank, answer questions from memory) reliably improves visual short-term memory and the closely related visuospatial working-memory system. We are confident in that claim because it is supported by Engle and Kane (2004), Klingberg (2010), and the wider working-memory-training literature.
          </p>
          <p style={paraStyle}>
            We are not claiming Blanked will lift your IQ, prevent cognitive decline, or fix your forgetfulness in general. If you want to read more about the specific cognitive systems involved, our glossary entries on{' '}
            <Link href="/glossary/working-memory" style={inlineLink}>working memory</Link>,{' '}
            <Link href="/glossary/visual-memory" style={inlineLink}>visual memory</Link>, and{' '}
            <Link href="/glossary/short-term-memory" style={inlineLink}>short-term memory</Link>
            {' '}are written in the same honest register as this page.
          </p>
          <p style={paraStyle}>
            For the rest of the field, the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>
            {' '}has individual write-ups on Lumosity, Peak, Elevate, BrainHQ, NeuroNation, Impulse, and CogniFit. The same honest framing applies on each one.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Try the narrow version that does work.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            Two minutes a day of focused visual-memory practice. Free. No paywall on the core game.
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
            Related: the{' '}
            <Link href="/lumosity-alternative" style={inlineLink}>Lumosity alternative</Link>
            {' '}page and the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>
            {' '}cover the practical question of which app fits which need. The audience-specific guides for{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>older adults</Link>,{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>students</Link>, and{' '}
            <Link href="/memory-training-for-adhd" style={inlineLink}>ADHD adults</Link>
            {' '}walk through the practical realities for those groups.
          </p>
        </section>

        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li><a href="https://journals.sagepub.com/doi/10.1177/1529100616661983" target="_blank" rel="noopener noreferrer" style={inlineLink}>Simons et al. (2016), &ldquo;Do Brain-Training Programs Work?&rdquo;, Psychological Science in the Public Interest</a></li>
            <li><a href="https://www.nature.com/articles/nature09042" target="_blank" rel="noopener noreferrer" style={inlineLink}>Owen et al. (2010), &ldquo;Putting brain training to the test&rdquo;, Nature</a></li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={inlineLink}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
            <li>Engle & Kane (2004), &ldquo;Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control&rdquo;</li>
            <li><a href="https://doi.org/10.1016/j.trci.2017.09.002" target="_blank" rel="noopener noreferrer" style={inlineLink}>Edwards et al. (2017), &ldquo;Speed of processing training results in lower risk of dementia&rdquo;, ACTIVE Trial</a></li>
            <li><a href="https://www.ftc.gov/news-events/news/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges-its-brain-training-program" target="_blank" rel="noopener noreferrer" style={inlineLink}>FTC press release: Lumos Labs to pay $2M for deceptive advertising (2016)</a></li>
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
const h2: React.CSSProperties = { fontSize: 26, fontWeight: 800, color: COLORS.text, marginBottom: 14, letterSpacing: -0.3 };
const paraLead: React.CSSProperties = { fontSize: 18, color: '#636E72', lineHeight: 1.65, marginBottom: 14, fontWeight: 500 };
const paraStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.7, marginBottom: 14 };
const ulStyle: React.CSSProperties = { fontSize: 16, color: '#636E72', lineHeight: 1.75, paddingLeft: 22, marginBottom: 14 };
const ctaPrimary: React.CSSProperties = { display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: COLORS.text, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' };
const inlineLink: React.CSSProperties = { color: COLORS.accent, textDecoration: 'underline' };
