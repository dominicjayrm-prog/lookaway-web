import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL, OG_IMAGE } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'How to Remember Names: The Working-Memory Way',
  description:
    'How to remember names and faces, honestly. Why everyone forgets names, the encoding habit that fixes it, and the science of face-name binding.',
  alternates: { canonical: `${SITE_URL}/how-to-remember-names` },
  openGraph: { type: 'article', locale: 'en_GB', siteName: 'Blanked', title: 'How to Remember Names: The Working-Memory Way', description: 'Why everyone forgets names and the encoding habit that actually fixes it.', url: `${SITE_URL}/how-to-remember-names`, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'How to Remember Names', description: 'The working-memory way to stop forgetting names.', images: [OG_IMAGE] },
};

const faqs = [
  { q: 'Why is it harder to remember names than faces?', a: 'Faces are processed by partly specialised neural machinery (the fusiform face area) and stick well. Names are arbitrary verbal labels with no meaningful connection to the face they belong to, which makes them much harder to encode. The asymmetry is universal; almost everyone remembers more faces than names.' },
  { q: 'What is the trick experts use?', a: 'There is no single trick, but the technique that works most reliably is deliberate encoding at the moment of introduction: repeat the name back, look directly at the face while saying it, and link the name to something concrete (the place you met, a feature, a similar-sounding word). Two or three seconds of conscious attention beats any clever memorisation technique.' },
  { q: 'Do mnemonics work for names?', a: 'They can, but they require effort and only pay off for names you genuinely need to remember (clients, colleagues, frequent contacts). For casual introductions, the deliberate-encoding habit is more practical and gets you 80% of the benefit at 10% of the cost.' },
  { q: 'Will a brain-training app help with names specifically?', a: 'Indirectly. Visual-memory and working-memory practice sharpens the underlying system that binds face-and-name pairs. The biggest single change is the encoding habit at the moment of meeting. The app is a useful supplement, not a substitute.' },
  { q: 'I am terrible with names even when I try. Is something wrong?', a: 'Probably not. Some people are genuinely worse at face-name binding due to natural variation (the fusiform face area varies between people; prosopagnosia at the extreme end). It is not the same as a general memory problem. If face recognition itself is hard, talk to a doctor; if it is specifically names, it is almost always just normal variation.' },
];

export const revalidate = 3600;

export default async function HowToRememberNamesPage() {
  const pageUrl = `${SITE_URL}/how-to-remember-names`;
  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => /name|face|forget|memory|recall|social/.test(`${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase())).slice(0, 3);

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Remember Names: The Working-Memory Way', description: 'How to remember names: encoding habit, science, what actually works.', author: { '@type': 'Person', '@id': `${SITE_URL}/authors/dominic-roworth`, name: 'Dominic Roworth', url: `${SITE_URL}/authors/dominic-roworth` }, publisher: { '@type': 'Organization', name: 'Blanked', url: SITE_URL }, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <div style={{ background: P.bg, minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }, { name: 'How to remember names' }]} />

      <header style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 40px' }}>
        <Link href="/" aria-label="Blanked home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Blink size={30} expression="normal" />
          <span style={{ fontSize: 17, fontWeight: 700, color: P.accent }}>Blanked</span>
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Blink size={72} expression="thinking" /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Faces and names</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            How to remember names:<br />
            why <span style={{ color: P.accent }}>everyone forgets</span>, and what to do about it
          </h1>
        </div>

        <p style={paraLead}>
          Almost everyone forgets names. It is universal enough that someone telling you they are "terrible with names" is not really telling you anything; the people who are good with names are the unusual ones, and they are good not because their memory is better but because they encode differently. The trick is at the moment of meeting, not in some clever recall technique later.
        </p>

        <section style={section}>
          <h2 style={h2}>Why names are so hard</h2>
          <p style={paraStyle}>
            Faces are easy to remember because the brain has partly specialised hardware for them (the fusiform face area in the ventral stream of the visual cortex). You can recognise thousands of faces with very little effort, including faces you have not seen in decades. The face system is one of the most reliable parts of human memory.
          </p>
          <p style={paraStyle}>
            Names are hard because they are arbitrary verbal labels with no meaningful link to the face. "Sarah" does not in any way resemble Sarah\'s face. Your brain has no specialised hardware for face-name pairing; it has to bind two unrelated representations together and that binding step is fragile. Add the typical introduction context (busy room, you are also being introduced, you are also thinking about what to say next) and the encoding step fails.
          </p>
          <p style={paraStyle}>
            For a longer technical version, see our glossary entry on{' '}
            <Link href="/glossary/visual-memory" style={inlineLink}>visual memory</Link>
            {' '}and the supporting article on{' '}
            <Link href="/glossary/working-memory" style={inlineLink}>working memory</Link>.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>The three-second technique</h2>
          <p style={paraStyle}>
            When someone introduces themselves, spend three seconds doing the following three things, in this order:
          </p>
          <ol style={ulStyle}>
            <li><strong>Look at the face.</strong> Not vaguely, not while looking around the room. Pick one feature (eye colour, shape of nose, smile) and consciously notice it.</li>
            <li><strong>Repeat the name back.</strong> "Nice to meet you, Sarah." Out loud. The verbal production is what makes the name stick; saying it silently does not work as well.</li>
            <li><strong>Connect the name to something.</strong> The place you met ("Sarah, met at the cafe"), a similar-sounding word, a famous person with the same name. Any link. The brain remembers connected things better than isolated ones.</li>
          </ol>
          <p style={paraStyle}>
            Three seconds, three actions. That is the technique. It feels mechanical at first; after a few weeks of practice it becomes automatic. The single most underrated step is the repeat-back; doing it consistently is the difference between remembering names and not.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What to do when you have already forgotten</h2>
          <p style={paraStyle}>
            Halfway through a conversation, you realise you cannot remember the name. Some honest options:
          </p>
          <ul style={ulStyle}>
            <li><strong>Just ask.</strong> "Sorry, I am terrible with names, what was it again?" Almost nobody minds. The other person usually does the same thing routinely.</li>
            <li><strong>Use the social workaround.</strong> Introduce them to someone else (which usually prompts them to say their name); ask for their email or LinkedIn; check a name badge if there is one.</li>
            <li><strong>Set up a recall opportunity.</strong> "What do you do, Sarah?" forces you to say the name when you still remember it, which strengthens the encoding. If you do not remember it, the question still works without the name.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>What does not work</h2>
          <ul style={ulStyle}>
            <li><strong>"Trying harder" to remember.</strong> Effort at retrieval cannot recover what was never encoded. The work has to happen at the moment of introduction, not later.</li>
            <li><strong>Memory palaces for casual introductions.</strong> Effective but high-effort; reserve them for names you genuinely need to remember (clients, professional contacts), not every introduction at a party.</li>
            <li><strong>Apps that promise to make you "a name-remembering machine".</strong> The cognitive system is what it is. The fix is behavioural, not technological. Brain-training apps (including Blanked) sharpen the underlying machinery a little; they do not change the basic architecture.</li>
          </ul>
        </section>

        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Sharpen the underlying system</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            The technique above does the heavy lifting. Daily visual-memory practice keeps the underlying machinery sharp. Two minutes, free, iOS.
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
            Related: companion piece{' '}
            <Link href="/how-to-remember-where-you-put-things" style={inlineLink}>how to remember where you put things</Link>, the{' '}
            <Link href="/visual-memory-exercises" style={inlineLink}>visual memory exercises</Link>
            {' '}page, and the office-worker context at{' '}
            <Link href="/brain-games-for-office-workers" style={inlineLink}>brain games for office workers</Link>.
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
