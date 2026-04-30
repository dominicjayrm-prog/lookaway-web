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
    websiteUrl: 'https://www.peak.net',
    lastUpdated: '2026-04-30',
    verdict:
      'Peak offers a wide variety of brain games across many cognitive domains. Blanked focuses deeply on visual memory specifically. Pick Blanked if you want to train one skill really well; pick Peak if you want breadth.',
    aboutCompetitor:
      'Peak is a well-established brain-training app with 40+ games across memory, attention, language, and problem solving. It has been on the App Store since 2014 and is owned by Popcap / EA. Peak partners with researchers from Cambridge and Yale, who help design some of the games and contribute the cognitive framing for Peak Pro.',
    intro: [
      'Peak and Blanked are both brain-training apps, but they answer two very different questions. Peak asks: how can we train your brain across as many cognitive areas as possible? Blanked asks: how can we make your visual memory genuinely sharper in two minutes a day?',
      'If you have used Peak before you know the rhythm: a daily workout of three or four mini-games drawn from a rotating pool of forty plus, covering memory, attention, language, problem solving, and emotional control. It is engaging, gamified, and well-designed. It is also a buffet, and you cannot get really good at any one thing on a buffet diet.',
      'Blanked is the opposite. One core mechanic, six modes, 380 plus levels of focused visual-memory training. The whole session is two minutes. There is nothing else to distract you. This page lays out how the two apps actually compare, where each one wins, and which one fits which kind of player.',
    ],
    science: [
      'Peak collaborates with academic researchers, most notably the team behind Cambridge Brain Sciences (Adrian Owen and colleagues). Owen led the well-known 2010 Nature paper "Putting brain training to the test", which found that while participants improved on the games they trained, those gains did not transfer to broader untrained cognitive abilities. Peak has published less in-house research than Lumosity, but it benefits from this academic association.',
      'The wider research consensus, summarised in Simons and colleagues (2016) for Psychological Science in the Public Interest, is consistent: short cognitive games reliably improve performance on the games themselves and on very closely related tasks, but the evidence for "broad transfer" to general intelligence or everyday function is weak. This applies to Peak, to Blanked, and to every app in this category.',
      'Where Blanked is honest: we do not promise general cognitive improvement. We promise that focused visual-memory practice will sharpen visual memory, which is what the focused-training literature supports (Engle and Kane, 2004; Klingberg, 2010). If you train visual recall every day, your visual recall gets sharper. That is the narrow but real benefit.',
      'Peak is genuinely well-designed and the academic partnership is a real plus for credibility. Just calibrate expectations: it will sharpen the specific skills its games train, not your overall brainpower.',
    ],
    scienceSources: [
      { text: 'Owen et al. (2010), "Putting brain training to the test", Nature', url: 'https://www.nature.com/articles/nature09042' },
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences' },
    ],
    bottomLine: [
      'Peak is the right choice if you want a daily cognitive workout that touches lots of different skills, you enjoy a slightly longer session, and you are happy with a subscription model. The Cambridge / Yale academic association is a real point in its favor.',
      'Blanked is the right choice if you actually want to get noticeably sharper at one specific skill, you want a two-minute daily habit instead of a fifteen-minute one, and you want the full game free. The narrow focus is the feature, not a limitation.',
      'You can absolutely use both. Peak in the morning for a varied workout, Blanked on the bus when you have two minutes spare. They do not really compete with each other if you treat them as different tools.',
    ],
    faqs: [
      {
        q: 'Is Peak free to use?',
        a: 'Peak has a free tier with a limited daily workout, but most of the catalog and Peak Pro features sit behind a subscription (around £4.99 a month or roughly £40 a year, depending on your region and current pricing). Blanked is fully free to play, with an optional Blanked+ subscription that removes ads and adds cosmetics, not gameplay.',
      },
      {
        q: 'Will Peak make me smarter?',
        a: 'Probably not in any general sense. The Owen et al. (2010) study and the Simons et al. (2016) consensus both found that brain-training apps reliably improve performance on the games themselves but do not transfer to broader real-world abilities. Peak will sharpen the specific skills its games train. So will Blanked, in its narrower domain.',
      },
      {
        q: 'Which is better for memory specifically?',
        a: 'Blanked, by design. Peak has memory-themed games but they are one of many categories. Blanked is six modes and 380 plus levels all focused on visual memory. Depth beats breadth when you are trying to actually improve a specific skill.',
      },
      {
        q: 'How long do sessions take?',
        a: 'Peak workouts run roughly ten to fifteen minutes if you do the full daily routine. Blanked sessions are two minutes. The shorter session is easier to keep doing day after day, which is what actually matters for skill building.',
      },
      {
        q: 'Does Peak have head-to-head friend challenges?',
        a: 'Peak has leaderboards and lets you see friends\' scores, but there is no mode where you and a friend tackle the exact same scene or puzzle. Blanked sends a friend the same scene and same questions you saw, so the comparison is fair.',
      },
      {
        q: 'Is Blanked available on Android?',
        a: 'Not yet. Blanked is iOS-only at the moment with Android on the roadmap. Peak is on both iOS and Android.',
      },
    ],
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
    websiteUrl: 'https://www.lumosity.com',
    lastUpdated: '2026-04-30',
    verdict:
      'Lumosity is the granddaddy of brain-training apps with a huge catalog. Blanked is the modern, focused alternative if visual memory is the thing you actually care about, at a fraction of the price.',
    aboutCompetitor:
      'Lumosity launched in 2007 and was one of the first brain-training platforms. It has 50+ games and an extensive in-house research program (Lumos Labs). In 2016 the company was fined $2 million by the US Federal Trade Commission for overselling cognitive benefits in its advertising; they have since tempered the marketing claims considerably.',
    intro: [
      'Lumosity is the app that basically invented modern brain training. It launched in 2007, peaked at over 100 million accounts, and made "training your brain" feel like brushing your teeth. If you have ever heard the phrase "brain games" outside of a sceptical academic context, Lumosity probably planted that seed.',
      'Blanked is much smaller and much newer. It does one thing: visual memory training, six modes, 380 plus levels, two minutes a day. No daily fit index, no five-skill scorecard, no fifty-game catalog. Just one focused mechanic, executed properly.',
      'This page lays out the honest comparison. Where Lumosity is genuinely better. Where Blanked is genuinely better. And what the actual research says about brain-training apps in general, including the FTC settlement that Lumosity does not love to talk about.',
    ],
    science: [
      'Lumosity has the most extensive in-house research program of any brain-training app. Lumos Labs has published a number of peer-reviewed studies on the platform, including Hardy and colleagues (2015) in PLoS ONE which reported improved performance on cognitive assessments after Lumosity training. Compared with most competitors, that is a genuinely strong evidence base.',
      'Now the difficult part. In 2016 the US Federal Trade Commission fined Lumos Labs $2 million for "deceptive advertising claims that Lumosity could prevent memory loss, dementia, and Alzheimer\'s disease, and that it could improve performance at school and work and on the SAT and ACT." Lumosity took down those claims and now markets the app more carefully. The product is the same product. The science was never as strong as the original advertising suggested.',
      'The wider consensus paper is Simons and colleagues (2016) for Psychological Science in the Public Interest. After reviewing hundreds of studies, the authors concluded that brain-training games reliably improve performance on the trained tasks but the evidence for transfer to broader cognitive abilities is weak. This applies to Lumosity, to Blanked, and to every app in the category.',
      'Where Blanked is upfront: focused visual-memory training improves visual memory (Engle and Kane, 2004; Klingberg, 2010). That is the narrow claim we make and the one the research actually supports. We do not claim Blanked will help you score higher on the SAT or stave off dementia. Anyone who tells you their app does that is selling you a story.',
    ],
    scienceSources: [
      { text: 'FTC press release: Lumos Labs to pay $2M for deceptive advertising (2016)', url: 'https://www.ftc.gov/news-events/news/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges-its-brain-training-program' },
      { text: 'Hardy et al. (2015), "Enhancing Cognitive Abilities with Comprehensive Training", PLoS ONE', url: 'https://doi.org/10.1371/journal.pone.0134467' },
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
    ],
    bottomLine: [
      'Lumosity is the right choice if you want the broadest catalog of brain games, you value the research program (with the FTC caveat in mind), and you do not mind paying around twelve pounds a month or sixty pounds a year. The polish and game variety are real strengths.',
      'Blanked is the right choice if you actually want to train one specific cognitive skill seriously, you want a two-minute daily habit instead of a fifteen-minute one, and you do not want to pay a premium subscription for content you may never touch. The full game is free.',
      'You can use both. Just be honest with yourself about why you are using each one. If you want a fun daily routine, Lumosity is well-suited. If you want to actually improve at something specific, focused practice always wins, and Blanked is built around that idea.',
    ],
    faqs: [
      {
        q: 'Why was Lumosity fined $2 million by the FTC?',
        a: 'In 2016 the FTC found that Lumos Labs had been making deceptive claims that Lumosity could prevent memory loss, dementia, and Alzheimer\'s, and could boost academic and test performance. The settlement required Lumos Labs to stop those claims and refund affected subscribers. The app itself was not banned and Lumosity continues to operate, but the marketing was forced to become more accurate.',
      },
      {
        q: 'Does Lumosity actually work?',
        a: 'It depends what you mean by "work". Lumosity will reliably improve your performance on Lumosity\'s games. The research consensus (Simons et al., 2016) is that this kind of training does not transfer broadly to general intelligence or everyday cognition. Same caveat applies to Blanked. Pick the app whose narrow training matches the skill you actually want to improve.',
      },
      {
        q: 'Is Lumosity free?',
        a: 'Lumosity has a very limited free tier (a handful of games per day). Most of the catalog is locked behind a Premium subscription, currently around £11.99 a month or £59.99 a year depending on region. Blanked is fully free to play.',
      },
      {
        q: 'Which is better for memory?',
        a: 'Blanked, if visual memory is what you mean. Lumosity has memory-themed games, but they sit alongside attention, problem-solving, language, and math. Blanked focuses entirely on visual memory across six modes and 380 plus levels. Depth wins when you are trying to actually improve a specific skill.',
      },
      {
        q: 'How long do daily sessions take?',
        a: 'Lumosity\'s daily workout suggests three games and runs roughly ten to fifteen minutes. Blanked is two minutes. Habit formation research consistently shows that shorter daily commitments are easier to keep, and consistency is what builds skill.',
      },
      {
        q: 'Does Lumosity have head-to-head friend challenges?',
        a: 'No. Lumosity has leaderboards and a "Brain Profile" view of your strengths, but there is no mode where you and a friend tackle the exact same task. Blanked has direct head-to-head: send your friend the same scene and same questions, then compare.',
      },
      {
        q: 'Is Blanked available on Android?',
        a: 'Not yet. Blanked is iOS-only with Android on the roadmap. Lumosity is on both.',
      },
    ],
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
    tagline: 'language, math, and focus training',
    websiteUrl: 'https://elevateapp.com',
    lastUpdated: '2026-04-30',
    verdict:
      'Elevate is fantastic for language and math skills. Blanked is built for a different skill entirely: visual memory. They complement each other rather than compete.',
    aboutCompetitor:
      'Elevate is an Apple Design Award winner (2014) focused on communication and analytical skills. It has 40+ games across reading, writing, speaking, listening, and math, packaged into a personalized daily workout. It is one of the most polished brain-training apps on the App Store and remains a category staple.',
    intro: [
      'Elevate and Blanked do not really compete. They train different muscles. Elevate is the right answer if you want to sharpen vocabulary, reading speed, mental math, and verbal expression. Blanked is the right answer if you want to train visual memory specifically and seriously.',
      'In practice that difference matters more than it sounds. Most people picking a brain-training app have a vague goal like "I want to think more clearly". The honest move is to translate that goal into a specific skill, then pick the app built for that skill. If your goal is "communicate better, do mental math faster, read more carefully", Elevate is the answer. If your goal is "remember faces, places, scenes, and details from short exposure", Blanked is the answer.',
      'This page lays out the practical comparison: features, focus, session length, free tier, friend features, the science behind each, and which one fits which kind of player.',
    ],
    science: [
      'Elevate has not published the kind of large in-house research program that Lumosity has. The company has cited research collaborations and points to general cognitive-training literature, but there is no peer-reviewed study of Elevate-the-app specifically that I am aware of in the major journals. Elevate did win the Apple Design Award in 2014 for its UX and design, which is a real but separate kind of validation.',
      'The wider research is the same here as everywhere else in the brain-training category. Simons and colleagues (2016) reviewed the field for Psychological Science in the Public Interest and concluded that practising a cognitive game reliably improves performance on that game and on closely related tasks, but the evidence for "broad transfer" to general intelligence or unrelated skills is weak. That applies to Elevate, to Blanked, and to every app in this space.',
      'The narrow training that works best is the kind that targets a specific cognitive function. For verbal and language skills, Elevate is built around exactly that kind of focused practice and the underlying mechanism (deliberate repetition of a specific cognitive task) is well supported by learning research more broadly. For visual memory, focused repetition is what Blanked does, supported by Engle and Kane (2004) and Klingberg (2010) on working memory training.',
      'Honest take: both apps will sharpen what they explicitly train. Neither will turn you into a different person. Pick the one whose narrow domain matches the skill you actually care about.',
    ],
    scienceSources: [
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences' },
      { text: 'Apple Design Awards (2014), Elevate winner' },
    ],
    bottomLine: [
      'Elevate is the right choice if your goal is verbal and analytical skills: vocabulary, reading comprehension, mental math, written expression. The app is genuinely well-designed and the focused practice format is the right shape for those skills.',
      'Blanked is the right choice if your goal is visual memory: remembering scenes, faces, layouts, and details from short exposure. Different skill, different app, different mechanic.',
      'These two are unusually compatible. Elevate in the morning for language and math, Blanked on the bus or in a coffee queue for visual memory. They genuinely do not overlap, so using both does not mean you are wasting time on the same training twice.',
    ],
    faqs: [
      {
        q: 'Is Elevate free to use?',
        a: 'Elevate has a free tier that gives you a small number of games per day; the full daily workout and most of the catalog sit behind a Pro subscription, currently around £4.99 a month or £39.99 a year depending on region. Blanked is fully free to play, with an optional Blanked+ subscription that removes ads and adds cosmetics, not gameplay.',
      },
      {
        q: 'Will Elevate make me smarter?',
        a: 'Probably not in the broad sense. The Simons et al. (2016) consensus is that brain-training apps reliably improve performance on the games they contain but do not transfer to general intelligence or unrelated skills. Elevate will sharpen the specific verbal and analytical skills its games train. So will Blanked, in its narrower visual-memory domain.',
      },
      {
        q: 'Which is better for memory specifically?',
        a: 'Blanked, by design. Elevate has memory-themed games but its core focus is language, math, and communication. Blanked is six modes and 380 plus levels of focused visual-memory practice. If memory is the goal, depth in one area beats breadth across many.',
      },
      {
        q: 'How long do sessions take?',
        a: 'Elevate workouts are usually three games and run around five minutes. Blanked is two minutes. Both are short enough to fit into most days, which matters more than you would think for actually building a habit.',
      },
      {
        q: 'Can I use both Elevate and Blanked?',
        a: 'Yes. They train different things and do not overlap. Many people use Elevate for verbal / analytical practice and Blanked for visual memory. If you have ten minutes a day, splitting it between them gives you wider coverage than spending it all in one app.',
      },
      {
        q: 'Does Elevate have head-to-head friend challenges?',
        a: 'No. Elevate has leaderboards and friend tracking but no mode where you and a friend tackle the exact same task. Blanked has direct head-to-head: same scene, same questions, fair comparison.',
      },
      {
        q: 'Is Blanked available on Android?',
        a: 'Not yet. Blanked is iOS-only with Android on the roadmap. Elevate is on both.',
      },
    ],
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
      'You want to sharpen mental math',
      'You are preparing for verbal or quantitative tests',
    ],
  },

  neuronation: {
    slug: 'neuronation',
    name: 'NeuroNation',
    tagline: 'serious cognitive training with a clinical leaning',
    websiteUrl: 'https://www.neuronation.com',
    lastUpdated: '2026-04-30',
    verdict:
      'NeuroNation positions itself as cognitive training rather than a brain-game app, with a more clinical tone and partnerships with medical research. Blanked is the lighter, more focused option for visual memory specifically. If you want serious-feeling training across many cognitive areas, NeuroNation. If you want one skill done deeply in two minutes, Blanked.',
    aboutCompetitor:
      'NeuroNation is a Berlin-based cognitive training platform that has been around since 2011. It has 60+ exercises across memory, attention, mental speed, intelligence, and language, and tends to position itself as cognitive training rather than as a game. NeuroNation has collaborated with academic researchers, most notably on a study with Charite Berlin around training in older adults, which is more than most apps in this category.',
    intro: [
      'NeuroNation and Blanked share almost no DNA besides "open the app, do a short cognitive task". NeuroNation is built around a serious, almost clinical tone: assessments, training plans, "your IQ score over time" graphs. Blanked is built around a tight game loop: study a scene, the screen goes blank, answer from memory, two minutes, done.',
      'If you tend to take cognitive training seriously and want a platform that frames itself that way, NeuroNation will feel right. If you would rather skip the medical framing and just practice one specific skill in the time it takes to drink half a coffee, Blanked is the better fit.',
      'This page covers the practical comparison: focus, session length, free tier, the science each leans on, and which kind of person each one suits.',
    ],
    rows: [
      { feature: 'Core focus', blanked: 'Visual memory, done deeply', competitor: 'Broad cognitive training across 5 areas' },
      { feature: 'Number of exercises', blanked: '6 modes, 380+ levels', competitor: '60+ exercises' },
      { feature: 'Session length', blanked: '2 minutes', competitor: '~15 minutes per training plan session' },
      { feature: 'Free tier', blanked: 'Full game free to play', competitor: 'Limited number of exercises free, rest paywalled' },
      { feature: 'Mascot / personality', blanked: 'Blink, a character that reacts in real time', competitor: 'No mascot, clinical tone', advantage: 'blanked' },
      { feature: 'Head-to-head with friends', blanked: 'Yes, identical scenes', competitor: 'No', advantage: 'blanked' },
      { feature: 'Ads in free version', blanked: 'Occasional, removable', competitor: 'No ads, but very limited free content' },
      { feature: 'Published peer-reviewed studies', blanked: 'Built on existing memory research, no in-house claims', competitor: 'Has collaborated on cognitive-training studies, including Charite Berlin', advantage: 'competitor' },
      { feature: 'Privacy: sells data?', blanked: 'No', competitor: 'See their policy', advantage: 'blanked' },
    ],
    pickBlankedIf: [
      'You want focused practice on visual memory specifically',
      'Two minutes a day fits your life better than fifteen',
      'You want the full game free, not a paywalled training plan',
      'You like a friendly tone, not a clinical one',
    ],
    pickCompetitorIf: [
      'You want a serious, clinical-feeling cognitive training platform',
      'You like assessments, IQ-style tracking, and training plans',
      'You want exercises across many cognitive areas, not just one',
    ],
    science: [
      'NeuroNation is one of the few brain-training apps that has actually collaborated with academic researchers on outcome studies. The most-cited collaboration is a project with Charite Universitatsmedizin Berlin around cognitive training in older adults, which gives NeuroNation slightly more credibility than the median app in this space. They lean into this in their marketing, sometimes more than the underlying evidence justifies.',
      'The wider research consensus is the same one that applies to every app in this category. Simons and colleagues (2016) reviewed the brain-training literature for Psychological Science in the Public Interest and concluded that practising a cognitive game reliably improves performance on the trained task and on closely related tasks, but that broader transfer to general intelligence or unrelated everyday function is weak. NeuroNation training will improve your performance at NeuroNation exercises. Whether that improvement carries into real-world memory or attention is, in the honest version, contested.',
      'Where Blanked is upfront: focused visual-memory practice strengthens visual memory. That narrow benefit is supported by Engle and Kane (2004) and Klingberg (2010) on working-memory training. We do not promise to lift your IQ.',
      'NeuroNation is fine if you want a training app with a clinical feel and you take that framing with a grain of salt. Blanked is fine if you want focused practice without the framing.',
    ],
    scienceSources: [
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences' },
      { text: 'NeuroNation cooperation with Charite Universitatsmedizin Berlin (publicly listed on the NeuroNation site)' },
    ],
    bottomLine: [
      'NeuroNation is the right pick if you want a serious-feeling cognitive training platform with assessment-style tracking and a clinical tone. The Charite collaboration is genuinely a point in its favor, even if the research caveats apply.',
      'Blanked is the right pick if you want to actually get sharper at visual memory specifically, you want a two-minute daily habit, and you do not want training plans, assessments, or paywalls between you and the game.',
      'Both are valid. Pick the one whose framing matches how you want to relate to your own training.',
    ],
    faqs: [
      {
        q: 'Is NeuroNation free to use?',
        a: 'NeuroNation has a free tier with a small number of exercises available daily. The full training plan and the bulk of the catalog sit behind a Premium subscription, which historically prices around 5 to 7 EUR a month or 50 to 60 EUR a year. Blanked is fully free to play, with an optional Blanked+ subscription that removes ads and adds cosmetics, not gameplay.',
      },
      {
        q: 'Will NeuroNation make me smarter?',
        a: 'Probably not in any broad sense. The Simons et al. (2016) consensus is that brain-training apps reliably improve performance on the games they contain but the evidence for broader cognitive transfer is weak. NeuroNation will sharpen the specific exercises it includes. So will Blanked, in its narrower visual-memory domain.',
      },
      {
        q: 'Does NeuroNation actually have research backing?',
        a: 'It has more than most. The collaboration with Charite Berlin on training in older adults is real and unusual for this category. Just remember that "research association" is not the same as "evidence the app does what its marketing implies", and the wider literature is cautious about brain-training claims.',
      },
      {
        q: 'Which is better for memory specifically?',
        a: 'Blanked, by design. NeuroNation has memory exercises but they are one of five categories. Blanked is six modes and 380 plus levels of focused visual-memory practice. If memory is the goal, depth beats breadth.',
      },
      {
        q: 'How long do sessions take?',
        a: 'NeuroNation training plans typically run around fifteen minutes per session. Blanked is two minutes. The shorter habit is much easier to keep, and consistency is what actually builds skill.',
      },
      {
        q: 'Does NeuroNation have head-to-head friend challenges?',
        a: 'No. NeuroNation has friend lists and leaderboards but no mode where you and a friend tackle the exact same task. Blanked has direct head-to-head: same scene, same questions.',
      },
      {
        q: 'Is Blanked available on Android?',
        a: 'Not yet. Blanked is iOS-only with Android on the roadmap. NeuroNation is on both.',
      },
    ],
  },
};
