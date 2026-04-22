export interface Faq {
  q: string;
  /** Plain-text answer used in the FAQPage JSON-LD schema. */
  a: string;
  /** HTML answer rendered on the page. Contains <a> links for internal linking.
   *  Falls back to `a` if not provided. */
  aHtml?: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: 'What is Blanked?',
    a: 'Blanked is a visual memory game for iOS. You study a scene, it disappears, and you answer questions from memory. There are six different game modes and more than 380 levels, each focused on a different type of memory skill.',
    aHtml: 'Blanked is a <strong>visual memory game</strong> for iOS. You study a scene, it disappears, and you answer questions from memory. There are six different game modes and more than 380 levels, each focused on a different type of memory skill. <a href="/about">Learn more about how we built it</a>.',
  },
  {
    q: 'Is Blanked really free to play?',
    a: 'Yes. The core game is free to play. You can play all 380+ levels without paying anything. We support the free version with occasional ads. If you prefer no ads and some extras, Blanked+ is an optional subscription.',
    aHtml: 'Yes. The core game is <strong>free to play</strong>. You can play all 380+ levels without paying anything. We support the free version with occasional ads. If you prefer no ads and some extras, Blanked+ is an optional subscription. See how Blanked compares to paid alternatives like <a href="/compare/peak">Peak</a> and <a href="/compare/lumosity">Lumosity</a>.',
  },
  {
    q: 'How much time do I need each day?',
    a: 'Two minutes is enough to keep your streak going. Each level takes 30 to 60 seconds, and a full round takes under two minutes. It is designed to fit into a coffee break or a commute, not to take over your day.',
  },
  {
    q: 'Does memory training actually work?',
    a: 'Peer-reviewed studies show consistent brain training improves recall speed, focus, and working memory. Results compound with practice. Blanked is built around visual memory specifically because it is the type of memory most linked to everyday tasks like remembering faces, directions, and where you put things.',
    aHtml: 'Peer-reviewed studies show consistent <strong>brain training</strong> improves recall speed, focus, and working memory. Results compound with practice. Blanked is built around visual memory specifically because it is the type of memory most linked to everyday tasks like remembering faces, directions, and where you put things. Read more: <a href="/blog/what-happens-to-your-brain-when-you-play-memory-games">What happens to your brain when you play memory games</a>.',
  },
  {
    q: 'Is there an Android version?',
    a: 'Not yet. We are launching on iOS first so we can focus on getting the experience right. Android is on the roadmap.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We only collect what the game needs to work (account, progress, gems, friends). We never sell your data to advertisers or anyone else. See our privacy policy for the full breakdown.',
    aHtml: 'Yes. We only collect what the game needs to work (account, progress, gems, friends). We never sell your data to advertisers or anyone else. See our <a href="/privacy">privacy policy</a> for the full breakdown.',
  },
  {
    q: 'What is Blanked+?',
    a: 'Blanked+ is an optional auto-renewing subscription. It removes ads, unlocks unlimited lives, and gives you access to exclusive cosmetics. You can cancel any time from your Apple ID settings.',
  },
  {
    q: 'Do I need an account to play?',
    a: 'Yes. You sign in with Apple or email when you open the app. It takes a few seconds and keeps your progress, streaks, gems, and friends safe across devices. We only use your email for account recovery, not for marketing.',
  },
];
