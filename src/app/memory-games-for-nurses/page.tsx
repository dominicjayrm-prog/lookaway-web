import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Games for Nurses: High-Stakes Recall',
  description:
    'Memory games for nurses and nursing students. Practical visual-memory training for drug names, procedures, and patient details.',
  alternates: { canonical: `${SITE_URL}/memory-games-for-nurses` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'Memory Games for Nurses', description: 'Practical visual-memory training for nursing.', url: `${SITE_URL}/memory-games-for-nurses`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Memory Games for Nurses', description: 'Practical visual-memory training for nursing.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Will brain training games help with NCLEX or NMC revision?', a: 'Indirectly. They sharpen the underlying working-memory system that supports retention while studying. The actual exam practice still needs to come from active recall on the specific content (flashcards, self-quizzing, NCLEX/NMC practice questions). The honest research on study techniques (Karpicke and Roediger, 2008 is the canonical reference) points to retrieval practice as the highest-impact thing, not generic brain training.' },
  { q: 'Are there nurse-specific memory apps?', a: 'A few exam-prep apps (Picmonic, Sherpath, UWorld) include image-based mnemonics for drug names and procedures. Those are study tools rather than memory-training tools. They are useful for content; they do not sharpen the underlying recall machinery. Blanked is the inverse: it does not teach nursing content, it trains the visual-memory substrate that helps you encode and retrieve it more efficiently.' },
  { q: 'How long should I train per shift / day?', a: 'On a long shift, even five minutes is genuinely too much. Two minutes is fine and matches the research on consistency-over-duration. The realistic answer for nursing schedules: one round on the bus to work, one in a break if there is one, one before bed. Skipping a day is fine.' },
  { q: 'Will this help me remember drug names?', a: 'Indirectly. Visual-memory practice strengthens the encoding step that drug-name memorisation depends on. The actual drug-name retention comes from spaced repetition on those specific names (Anki, Quizlet, dedicated nursing apps). The strongest combination is brain training as a daily warm-up plus spaced repetition on the actual content.' },
  { q: 'Is Blanked free for healthcare workers?', a: 'Blanked is free for everyone. The full game, all six modes, all 400+ levels, no paywall on gameplay. The optional Blanked+ subscription removes ads and adds cosmetics. We are not running a healthcare-worker discount because there is nothing to discount.' },
];

export const revalidate = 3600;

export default async function MemoryGamesForNursesPage() {
  const pageUrl = `${SITE_URL}/memory-games-for-nurses`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /nurs|exam|student|study|memory|recall|focus/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Memory Games for Nurses', description: 'Practical visual-memory training for nursing.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'Memory games for nurses' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="thinking" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For nurses</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Memory games for nurses:<br />
            practical training for <span style={{ color: P.accent }}>high-stakes recall</span>
          </h1>
        </div>

        <p style={paraLead}>
          Nursing puts unusual demands on working memory. Drug names, dosages, patient histories, procedure steps, ward layouts. The cognitive load on a normal shift is high; the cognitive load on a night shift after a poor sleep is brutal. This page is for nurses and nursing students who want a daily practice that sharpens the recall substrate without pretending it is a substitute for actual study or rest.
        </p>

        <section style={section}>
          <h2 style={h2}>What memory games can and cannot do for nursing</h2>
          <p style={paraStyle}>
            What they can do: train the visual and working-memory systems that support encoding and short-term retention. Daily practice produces measurable narrow gains: more items held in mind at once, faster scene-recall, sharper recognition of patterns. These are useful underlying skills for the kind of rapid multi-item recall nursing involves.
          </p>
          <p style={paraStyle}>
            What they cannot do: teach you the content. No memory game will help you remember that paracetamol\'s max daily dose is 4g rather than 3g. That kind of factual recall comes from spaced-repetition practice on the actual content (Anki decks, Quizlet, Picmonic, dedicated nursing apps). Karpicke and Roediger (2008) is the canonical reference on retrieval practice being the highest-impact study technique. Brain-training apps strengthen the engine; the fuel is still your textbooks.
          </p>
          <p style={paraStyle}>
            We have a longer write-up of this honesty point at{' '}
            <Link href="/does-brain-training-work" style={inlineLink}>/does-brain-training-work</Link>.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What to actually do</h2>
          <ul style={ulStyle}>
            <li><strong>Spaced repetition for content.</strong> The actual drug names, normal ranges, procedure steps, and exam content go into a flashcard system (Anki is free, Quizlet has a nursing-specific deck library). Daily review for fifteen to twenty minutes is the high-impact piece.</li>
            <li><strong>Brain training for the substrate.</strong> Two minutes a day of focused visual-memory practice. Blanked is the iOS option specifically built for this; the daily habit fits into a coffee break or the bus ride home.</li>
            <li><strong>The two-second encoding habit for patient details.</strong> When you note a patient detail, look directly at the chart or wristband and say it aloud (or quietly to yourself). The deliberate look-and-say is what moves information from briefly-perceived to actually-stored. Same technique covered for everyday recall at{' '}
              <Link href="/how-to-remember-where-you-put-things" style={inlineLink}>/how-to-remember-where-you-put-things</Link>.</li>
            <li><strong>Names and faces.</strong> If patient turnover means you meet many new people quickly, the technique at{' '}
              <Link href="/how-to-remember-names" style={inlineLink}>/how-to-remember-names</Link>
              {' '}is worth practising. Repeating the name back during the first interaction is the single most reliable habit change.</li>
            <li><strong>Sleep.</strong> The boring answer that is also the most important one. Working memory and attention degrade rapidly with sleep loss; no amount of training or spaced repetition can compensate for chronic shift-pattern sleep deprivation. If you can protect any single thing on your roster, protect sleep.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>How Blanked fits a nursing schedule</h2>
          <p style={paraStyle}>
            The reason most brain-training apps fail nursing students and nurses is that they assume a fifteen-minute daily session. After a 12-hour shift, fifteen minutes is gone. Blanked is two minutes by design, anchored to habit-stacking research that consistently shows shorter daily commitments stick where longer ones collapse.
          </p>
          <p style={paraStyle}>
            Practical anchors that work for nursing schedules:
          </p>
          <ul style={ulStyle}>
            <li>One round on the commute (each way is more than enough time).</li>
            <li>One round during the kettle or coffee-machine wait in the break room.</li>
            <li>One round before bed instead of doomscrolling.</li>
          </ul>
          <p style={paraStyle}>
            Skip days are fine. Habit research tolerates inconsistency; what matters is the multi-week trajectory, not any individual day.
          </p>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two minutes a day, free, no subscription.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            iOS only at the moment. The full game is free with no paywall on gameplay.
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
            Related: the broader{' '}
            <Link href="/memory-training-for-students" style={inlineLink}>memory training for students</Link>
            {' '}page, the{' '}
            <Link href="/brain-games-for-office-workers" style={inlineLink}>brain games for office workers</Link>
            {' '}guide (for non-clinical contexts), and the honest{' '}
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
