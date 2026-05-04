import type { Metadata } from 'next';
import Link from 'next/link';
import Blink from '@/components/Blink';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { listPublishedPosts } from '@/lib/blog';
import { COLORS, SITE_URL, APP_STORE_URL } from '@/lib/constants';

const P = COLORS;

export const metadata: Metadata = {
  title: 'Memory Training for Students: A 2-Minute Daily Habit',
  description:
    'Memory training for students that fits a real schedule. Backed by retrieval-practice and working-memory research. Two minutes a day, free on iOS.',
  alternates: { canonical: `${SITE_URL}/memory-training-for-students` },
  openGraph: {
    type: 'article',
    title: 'Memory Training for Students: A 2-Minute Daily Habit',
    description:
      'Memory training for students that actually fits into a real schedule. The science of why it helps and how to make it stick.',
    url: `${SITE_URL}/memory-training-for-students`,
    images: ['/opengraph-image'],
    siteName: 'Blanked',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Training for Students: A 2-Minute Daily Habit',
    description: 'A short, science-backed memory training routine for students. Free on iOS.',
    images: ['/opengraph-image'],
  },
};

const faqs = [
  {
    q: 'Does memory training actually help with grades?',
    a: 'Indirectly, yes. Working-memory capacity is a strong predictor of academic performance (Alloway and Alloway, 2010), and there is solid evidence that retrieval practice and spaced repetition improve long-term retention of study material (Karpicke and Roediger, 2008; Pashler et al., 2007). What memory-training apps will not do is magically raise your IQ or replace actually studying for your subjects. Train the muscle, study the material.',
  },
  {
    q: 'How much time do I need each day?',
    a: 'Two minutes is enough to build the habit. The Blanked sessions are deliberately short so you can do a round between lectures, on the bus, or while a kettle boils. Consistency over weeks matters more than the length of any single session.',
  },
  {
    q: 'Will this help me remember names and faces in seminars?',
    a: 'Visual memory practice strengthens the same systems you use for faces and places. It is not a magic spell, but if you train your visual recall daily, you will notice you remember names, faces, and seating arrangements more reliably.',
  },
  {
    q: 'Can I use it the night before an exam?',
    a: 'Honestly, no. Cognitive practice is like running: you do not get fitter the day before a marathon. The benefits of memory training compound over weeks. Use the day before an exam for spaced retrieval of your actual material instead.',
  },
  {
    q: 'Is Blanked really free?',
    a: 'Yes. The full game is free, all six modes, all 400 plus levels. There is an optional Blanked+ subscription that removes ads and adds cosmetic items. It does not gate any actual gameplay.',
  },
  {
    q: 'Does it work on Android?',
    a: 'Not yet. Blanked is iOS-only at the moment. Android is on the roadmap.',
  },
];

export default async function StudentsPage() {
  const pageUrl = `${SITE_URL}/memory-training-for-students`;

  const allPosts = await listPublishedPosts().catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = `${p.slug} ${p.title} ${(p.keywords ?? []).join(' ')}`.toLowerCase();
      return /student|stud(y|ying|ied)|exam|academic|school|college|univ|forget|sleep/.test(haystack);
    })
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Memory Training for Students: A 2-Minute Daily Habit',
    description:
      'Memory training for students that actually fits into a real schedule. The science behind why it helps and how to make it stick.',
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
        { name: 'Memory training for students' },
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
          <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>For Students</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: P.text, margin: 0, letterSpacing: -0.5, lineHeight: 1.15 }}>
            Memory training for students:<br />
            the <span style={{ color: P.accent }}>2-minute daily habit</span> that actually helps you remember what you study
          </h1>
        </div>

        <p style={paraLead}>
          You already know cramming does not work. The lecture you watched on Tuesday is half gone by Friday. The seminar names blur together. The reading list keeps growing and the retention is not. The fix is not more hours, it is better daily practice.
        </p>
        <p style={paraStyle}>
          Blanked is a free visual memory game built around exactly that: a tiny daily habit, two minutes long, that strengthens the underlying memory systems your studying actually depends on. Below is what the research says about why this works for students, how to fit it into a real schedule, and which of the six game modes maps to the kinds of recall you need most at university.
        </p>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>Download Blanked free</a>
        </div>

        {/* Why students */}
        <section style={section}>
          <h2 style={h2}>Why students specifically need memory training</h2>
          <p style={paraStyle}>
            Three things make student life unusually hard on memory. First, the volume: a typical week involves dozens of new concepts, names, dates, formulas, and references. Second, the spacing: most students study in irregular bursts before deadlines, which is roughly the worst possible pattern for long-term retention. Third, the testing format: exams, presentations, and seminars demand fast retrieval under pressure, not slow recognition.
          </p>
          <p style={paraStyle}>
            What the research has been saying for decades is that retrieval practice (the act of pulling something out of memory) is what makes it stick. Karpicke and Roediger (2008) showed in Science that students who practiced retrieving material remembered substantially more a week later than students who just re-read it. The implication is brutal: highlighting and re-reading are mostly performance theater. Active recall is where the real learning happens.
          </p>
          <p style={paraStyle}>
            On top of that, working-memory capacity, the underlying machinery for holding information in your head and manipulating it, is one of the strongest individual predictors of academic performance. Alloway and Alloway (2010) followed students for years and found working memory at age 5 predicted academic achievement at 11 better than IQ. Working memory is also trainable. Klingberg (2010) summarised the evidence: focused practice on working-memory tasks reliably improves working-memory performance.
          </p>
          <p style={paraStyle}>
            Two minutes a day of focused visual recall is not going to replace your study sessions. It will sharpen the cognitive substrate they sit on. Read your notes. Test yourself on them. And keep the underlying recall machinery in shape with a tiny daily habit. (For more on why recall fades so fast in the first place, our deeper dive on{' '}
            <Link href="/blog" style={inlineLink}>why we forget things minutes after seeing them</Link>
            {' '}is a useful companion read.)
          </p>
        </section>

        {/* How Blanked helps */}
        <section style={section}>
          <h2 style={h2}>How Blanked helps students specifically</h2>
          <p style={paraStyle}>
            Blanked has six game modes. Three of them are particularly useful for the kinds of recall students do most.
          </p>
          <ul style={ulStyle}>
            <li><strong>Speed Recall</strong>. You see a scene full of objects, the screen blanks, and you answer questions fast. This is roughly the cognitive shape of an exam: rapid retrieval under time pressure. Daily practice trains the speed dimension specifically.</li>
            <li><strong>Sequence</strong>. You watch a sequence of items appear in order, then reproduce the order from memory. This is the same skill you use to remember the steps in a derivation, the order of events in a historical period, or the rows of a stats table. Sequence memory is shockingly trainable with focused daily practice.</li>
            <li><strong>Snap Match</strong>. Rapid visual matching after short exposure. This is closely related to face and name recall. If you struggle to put names to seminar classmates, this mode will move the needle.</li>
          </ul>
          <p style={paraStyle}>
            The other three modes (Classic, Counting Blitz, Color Chain) train slightly different visual-memory dimensions and are still worth doing, especially for variety. Pick whichever mode you are weakest at on any given day. Treat the daily habit like brushing your teeth, not like an optional extra.
          </p>
        </section>

        {/* Schedule */}
        <section style={section}>
          <h2 style={h2}>How to actually fit it into a student schedule</h2>
          <p style={paraStyle}>
            The single biggest reason students stop using brain-training apps is that the sessions are too long. Lumosity wants 15 minutes a day. Peak suggests 10. After the third week of term you will not have those minutes, and the habit collapses.
          </p>
          <p style={paraStyle}>
            Blanked is built around two minutes specifically because two minutes is the length of habit you can actually keep through deadline weeks. Three suggestions for fitting it in:
          </p>
          <ul style={ulStyle}>
            <li>One round between lectures while you are still walking to the next building.</li>
            <li>One round while the kettle boils for your morning coffee or tea.</li>
            <li>One round on the way home when you do not want to read another paper.</li>
          </ul>
          <p style={paraStyle}>
            Pick one. Anchor it to a thing you already do. Habit research is unambiguous on this: linking a new behavior to an existing routine ("habit stacking") dramatically improves the odds of it sticking. After two weeks you will not need to think about it.
          </p>
        </section>

        {/* Realistic expectations */}
        <section style={section}>
          <h2 style={h2}>What realistic improvement looks like</h2>
          <p style={paraStyle}>
            Be honest with yourself. Memory training apps cannot raise your IQ, will not transfer broadly to "general intelligence", and are not a substitute for actually studying your course material. The Simons et al. (2016) consensus paper is clear: the gains are narrow. Practising visual memory makes you better at visual memory. That is the real but bounded benefit.
          </p>
          <p style={paraStyle}>
            What you can expect, after a few weeks of consistent two-minute sessions, is that the specific skills the games train get noticeably sharper: holding more items in mind at once, retrieving sequences faster, recognising familiar layouts more reliably. Those skills do leak into everyday cognitive tasks like remembering names, recalling diagrams, and finding things on the page in front of you.
          </p>
          <p style={paraStyle}>
            What you cannot expect is to skip the studying. Memory training is the gym work. The studying is the actual sport. You need both.
          </p>
        </section>

        {/* CTA */}
        <section style={{ ...section, textAlign: 'center', padding: '36px 24px', background: `${P.accent}06`, borderRadius: 16, border: `1px solid ${P.accent}20` }}>
          <h2 style={{ ...h2, marginBottom: 10 }}>Two minutes. Every day. Free.</h2>
          <p style={{ ...paraStyle, marginBottom: 20 }}>
            No subscription, no paywall on the actual game, and no fifteen-minute training plan you will quit by week three.
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
            Want to know your starting point? Run our free{' '}
            <Link href="/memory-test" style={inlineLink}>visual memory test</Link>
            {' '}in your browser to set a baseline, then check it again in a few weeks. Comparing options? See how Blanked stacks up against{' '}
            <Link href="/compare/elevate" style={inlineLink}>Elevate</Link>
            {' '}(language and math focus, complementary to visual memory),{' '}
            <Link href="/compare/lumosity" style={inlineLink}>Lumosity</Link>, and the rest of the field on the{' '}
            <Link href="/compare" style={inlineLink}>compare hub</Link>. Or read the parallel{' '}
            <Link href="/memory-games-for-seniors" style={inlineLink}>memory games for seniors</Link>
            {' '}guide for an audience-specific angle.
          </p>
        </section>

        {/* Sources */}
        <section style={{ marginTop: 40, padding: '14px 18px', borderRadius: 10, background: '#FAFAF7', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#636E72', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>
            <li><a href="https://www.science.org/doi/10.1126/science.1152408" target="_blank" rel="noopener noreferrer" style={{ color: P.accent }}>Karpicke & Roediger (2008), &ldquo;The Critical Importance of Retrieval for Learning&rdquo;, Science</a></li>
            <li>Pashler et al. (2007), &ldquo;Organizing Instruction and Study to Improve Student Learning&rdquo;, US Department of Education IES Practice Guide</li>
            <li>Alloway & Alloway (2010), &ldquo;Investigating the predictive roles of working memory and IQ in academic attainment&rdquo;, Journal of Experimental Child Psychology</li>
            <li><a href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1" target="_blank" rel="noopener noreferrer" style={{ color: P.accent }}>Klingberg (2010), &ldquo;Training and plasticity of working memory&rdquo;, Trends in Cognitive Sciences</a></li>
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
