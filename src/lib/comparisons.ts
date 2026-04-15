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
