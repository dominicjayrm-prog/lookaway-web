export interface ComparisonFAQ {
  q: string;
  a: string;
}

export interface ComparisonScienceSource {
  text: string;
  url?: string;
}

export interface Comparison {
  slug: string;
  name: string;
  tagline: string;
  /** Short one-line verdict shown at the top of the page. */
  verdict: string;
  /** Feature-by-feature row data. Left column is the feature, then us vs them. */
  rows: Array<{ feature: string; blanked: string; competitor: string; advantage?: 'blanked' | 'competitor' | 'tie' }>;
  /** Who should pick Blanked */
  pickBlankedIf: string[];
  /** Who should pick the competitor */
  pickCompetitorIf: string[];
  /** Brief, fair summary of the competitor. */
  aboutCompetitor: string;

  /** ISO date of last content review. */
  lastUpdated?: string;
  /** Link to the competitor's official site, used in the bottom-line outbound link. */
  websiteUrl?: string;
  /** Multi-paragraph intro section under the verdict card. */
  intro?: string[];
  /** Multi-paragraph "the science" section. */
  science?: string[];
  /** Real sources cited in the science section. */
  scienceSources?: ComparisonScienceSource[];
  /** Final verdict / closing argument paragraphs. */
  bottomLine?: string[];
  /** FAQ items for the page-specific FAQ section. */
  faqs?: ComparisonFAQ[];
}

export const COMPARISONS: Record<string, Comparison> = {
  peak: {
    slug: 'peak',
    name: 'Peak',
    tagline: 'brain games from Popcap alumni',
    verdict:
      'Peak offers a wide variety of brain games across many cognitive domains. Blanked focuses deeply on visual memory specifically. Pick Blanked if you want to train one skill really well; pick Peak if you want breadth.',
    aboutCompetitor:
      'Peak is a well-established brain-training app with 40+ games across memory, attention, language, and problem solving. It has been on the App Store since 2014 and is owned by Popcap / EA.',
    rows: [
      { feature: 'Core focus', blanked: 'Visual memory, done deeply', competitor: 'Broad cognitive training', advantage: 'tie' },
      { feature: 'Number of game modes', blanked: '6 modes, 380+ levels', competitor: '40+ games, shorter per-game depth' },
      { feature: 'Session length', blanked: '2 minutes', competitor: '10-15 minutes' },
      { feature: 'Price', blanked: 'Free to play, optional Blanked+ subscription', competitor: 'Subscription only (Peak Pro ~£4.99/mo)', advantage: 'blanked' },
      { feature: 'Mascot / personality', blanked: 'Blink, a character who reacts in real time', competitor: 'No mascot', advantage: 'blanked' },
      { feature: 'Head-to-head with friends', blanked: 'Yes, same scenes and questions', competitor: 'Leaderboards only', advantage: 'blanked' },
      { feature: 'Ads in free version', blanked: 'Occasional, removable', competitor: 'Limited free content, paywall for most features' },
      { feature: 'Privacy: sells data?', blanked: 'No', competitor: 'See their policy', advantage: 'blanked' },
    ],
    pickBlankedIf: [
      'You want to train visual memory specifically',
      'You have 2 minutes a day, not 15',
      'You want a free game that does not paywall most of the content',
      'You want to challenge friends on identical scenes',
    ],
    pickCompetitorIf: [
      'You want variety across many different cognitive skills',
      'You are happy with a monthly subscription',
      'You want longer, more intense sessions',
    ],
  },

  lumosity: {
    slug: 'lumosity',
    name: 'Lumosity',
    tagline: 'the original brain-training platform',
    verdict:
      'Lumosity is the granddaddy of brain-training apps with a huge catalogue. Blanked is the modern, focused alternative if visual memory is the thing you actually care about, at a fraction of the price.',
    aboutCompetitor:
      'Lumosity launched in 2007 and was one of the first brain-training platforms. It has 50+ games and an extensive research programme. In 2016 the company was fined $2M by the FTC for overselling cognitive benefits; they have since tempered their claims.',
    rows: [
      { feature: 'Core focus', blanked: 'Visual memory, done deeply', competitor: 'General cognition across 5 areas' },
      { feature: 'Number of games', blanked: '6 modes, 380+ levels', competitor: '50+ games' },
      { feature: 'Session length', blanked: '2 minutes', competitor: '10-15 minutes (3 games a day)' },
      { feature: 'Price', blanked: 'Free to play, optional Blanked+', competitor: '£11.99/mo or £59.99/yr', advantage: 'blanked' },
      { feature: 'Mascot / personality', blanked: 'Blink', competitor: 'No mascot', advantage: 'blanked' },
      { feature: 'Head-to-head with friends', blanked: 'Yes', competitor: 'No', advantage: 'blanked' },
      { feature: 'Ads in free version', blanked: 'Occasional, removable', competitor: 'Very limited free version' },
      { feature: 'Research backing', blanked: 'Built on public memory research', competitor: 'Extensive in-house research programme', advantage: 'competitor' },
      { feature: 'Privacy: sells data?', blanked: 'No', competitor: 'See their policy', advantage: 'blanked' },
    ],
    pickBlankedIf: [
      'You want to focus on visual memory, not 50 different games',
      'You do not want to pay £12 a month',
      'You want something that respects your time (2-minute sessions)',
      'You want to compete head-to-head with friends',
    ],
    pickCompetitorIf: [
      'You want a wide training programme across many cognitive skills',
      'You want the most research-heavy platform available',
      'You are happy paying a premium subscription',
    ],
  },

  impulse: {
    slug: 'impulse',
    name: 'Impulse',
    tagline: 'a wide brain-training app from Mind App Studio',
    websiteUrl: 'https://impulse-app.com',
    lastUpdated: '2026-04-30',
    verdict:
      'Impulse gives you a big buffet of mini-games across memory, attention, math, and language. Blanked picks one of those skills, visual memory, and goes deep. If you want variety, Impulse. If you want to actually get sharper at one thing in two minutes a day, Blanked.',
    aboutCompetitor:
      'Impulse is a brain-training app published by Mind App Studio. It bundles dozens of short mini-games covering memory, attention, mental math, and language, and it pushes a daily training routine that takes about ten minutes. It launched on the App Store in 2020 and has grown quickly through paid acquisition.',
    intro: [
      'On paper Blanked and Impulse look like the same thing: a brightly colored brain-training app on your phone. In practice they are built around opposite ideas. Impulse is a buffet. Blanked is a single dish, cooked carefully.',
      'Impulse spreads its training across roughly forty mini-games covering memory, attention, mental math, language, and logic. The pitch is breadth: dip into a different skill each day, complete a daily routine, watch your overall "brain index" climb. Blanked does not have a brain index. Blanked has six game modes, all built around the same core mechanic: study a scene, the screen goes blank, answer from memory.',
      'This page walks through how the two apps actually compare on focus, session length, free tier, friend features, and the science each one leans on. The short version is at the top of the page; the honest detail is below.',
    ],
    rows: [
      { feature: 'Core focus', blanked: 'Visual memory, done deeply', competitor: 'Broad cognitive training across many skills' },
      { feature: 'Number of games', blanked: '6 modes, 380+ levels', competitor: '~40 mini-games, daily rotating set' },
      { feature: 'Session length', blanked: '2 minutes', competitor: '~10 minutes per daily routine' },
      { feature: 'Free tier', blanked: 'Full game free to play', competitor: 'Limited daily games, rest paywalled' },
      { feature: 'Mascot / personality', blanked: 'Blink, a character that reacts in real time', competitor: 'No mascot', advantage: 'blanked' },
      { feature: 'Head-to-head with friends', blanked: 'Yes, identical scenes for both players', competitor: 'No', advantage: 'blanked' },
      { feature: 'Ads in free version', blanked: 'Occasional, removable', competitor: 'Frequent in free tier' },
      { feature: 'Published peer-reviewed studies', blanked: 'Built on existing memory research, no in-house claims', competitor: 'No major peer-reviewed studies of the app itself', advantage: 'tie' },
      { feature: 'Privacy: sells data?', blanked: 'No', competitor: 'See their policy', advantage: 'blanked' },
    ],
    pickBlankedIf: [
      'You want to actually get sharper at one specific skill, not skim ten of them',
      'You have two minutes a day, not ten',
      'You want the full game without a daily-game paywall',
      'You want to challenge a friend on the exact same scene',
    ],
    pickCompetitorIf: [
      'You like variety and want to dip into different cognitive skills each day',
      'You enjoy the gamified streak / daily-routine format',
      'You are happy with a longer session and a subscription',
    ],
    science: [
      'Impulse, like most general brain-training apps, leans on the broad claim that doing short mental exercises sharpens cognitive function. Mind App Studio has not published peer-reviewed studies of Impulse specifically, so the science behind the app is the science behind the wider brain-training category, which is genuinely contested.',
      'The most-cited consensus paper here is Simons and colleagues (2016), a comprehensive review for Psychological Science in the Public Interest. Their conclusion was deflating for the category: short cognitive games do reliably make you better at the games themselves, and at very closely related tasks, but the evidence that these gains transfer to broader real-world abilities like everyday memory, attention, or "general intelligence" is weak. This is true for Impulse, for Lumosity, for Blanked, and for every app in this space. Anyone telling you otherwise is selling you something.',
      'What the research does support is more specific: training on visual short-term memory tasks improves performance on visual short-term memory tasks (Engle and Kane, 2004; Klingberg, 2010). That is what Blanked is built around. We do not promise it will help you do your tax return faster. We do promise that if you train your visual recall every day for two minutes, your visual recall will get sharper, because that is the one thing the research consistently shows.',
      'Impulse, by trying to train ten different skills, ends up doing each in shorter bursts. That is not necessarily bad, but it is closer to entertainment than to focused cognitive training. Choose accordingly.',
    ],
    scienceSources: [
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences' },
    ],
    bottomLine: [
      'Impulse is a perfectly fine app if you want a playful daily routine that touches a bit of everything. The mini-games are well-made, the UI is friendly, and ten minutes a day is not a lot to ask.',
      'Blanked is the better choice if you actually want to get sharper at one thing, you want to do it in the time it takes to drink half a coffee, and you want the full game without a paywall blocking three quarters of it.',
      'Both apps make some version of the "brain training works" claim. The honest answer, backed by the research, is that training transfers narrowly. Pick the app whose narrow training matches what you actually want to improve.',
    ],
    faqs: [
      {
        q: 'Is Impulse free to use?',
        a: 'Impulse has a free tier with a limited number of daily games, but most of the catalog and the deeper progression are behind a subscription. Blanked is fully free to play, with an optional Blanked+ subscription that removes ads and adds cosmetics, not gameplay.',
      },
      {
        q: 'Will Impulse make me smarter?',
        a: 'Honest answer: no app will. The research consensus (Simons et al., 2016) is that brain-training apps reliably improve performance on the specific games they contain, but those gains do not transfer to general intelligence. Pick an app for the specific skill you want to sharpen, not for vague promises of overall cognitive improvement.',
      },
      {
        q: 'Which is better for memory specifically?',
        a: 'Blanked, by design. Impulse has a memory category, but it is one of many. Blanked focuses entirely on visual memory across six game modes and 380+ levels. If memory is your goal, the deeper, more focused practice wins.',
      },
      {
        q: 'How long does each app take per day?',
        a: 'Impulse pushes a roughly ten-minute daily routine. Blanked is two minutes. The compounding effect of a habit you actually keep matters more than the length of any single session.',
      },
      {
        q: 'Does Impulse have friend challenges like Blanked?',
        a: 'No. Impulse has leaderboards but no head-to-head challenges. Blanked lets you send a friend the exact same scene and questions you saw, so you can compare scores fairly.',
      },
      {
        q: 'Is Blanked available on Android?',
        a: 'Not yet. Blanked is iOS-only at the moment. Android is on the roadmap. Impulse is on both.',
      },
    ],
  },

  elevate: {
    slug: 'elevate',
    name: 'Elevate',
    tagline: 'language, maths, and focus training',
    verdict:
      'Elevate is fantastic for language and maths skills. Blanked is built for a different skill entirely: visual memory. They complement each other rather than compete.',
    aboutCompetitor:
      'Elevate is an Apple Design Award-winning brain-training app focused on communication and analytical skills. It has 40+ games across reading, writing, speaking, listening, and maths.',
    rows: [
      { feature: 'Core focus', blanked: 'Visual memory', competitor: 'Language, maths, focus', advantage: 'tie' },
      { feature: 'Number of games', blanked: '6 modes, 380+ levels', competitor: '40+ games' },
      { feature: 'Session length', blanked: '2 minutes', competitor: '~5 minutes, 3 games a day' },
      { feature: 'Price', blanked: 'Free to play, optional Blanked+', competitor: '£4.99/mo or £39.99/yr' },
      { feature: 'Free tier', blanked: 'Full game free to play', competitor: '3 games a day free, rest paywalled' },
      { feature: 'Mascot / personality', blanked: 'Blink', competitor: 'No mascot', advantage: 'blanked' },
      { feature: 'Head-to-head with friends', blanked: 'Yes', competitor: 'No', advantage: 'blanked' },
      { feature: 'Ads in free version', blanked: 'Occasional, removable', competitor: 'No ads (but limited content)' },
      { feature: 'Privacy: sells data?', blanked: 'No', competitor: 'See their policy', advantage: 'blanked' },
    ],
    pickBlankedIf: [
      'Your goal is visual memory, not vocabulary or arithmetic',
      'You want the full game without a paywall',
      'You want head-to-head friend challenges',
      'You prefer shorter (2-minute) sessions',
    ],
    pickCompetitorIf: [
      'You want to train language and reading comprehension',
      'You want to sharpen mental maths',
      'You are preparing for verbal or quantitative tests',
    ],
  },
};
