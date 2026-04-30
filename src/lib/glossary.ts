/**
 * Memory-science glossary entries. Each entry powers a /glossary/[slug] page.
 * Designed to build topical authority for memory-related queries; entries are
 * intentionally short, plain-language, and cite real research where claims
 * go beyond textbook definitions.
 */

export interface GlossaryFAQ {
  q: string;
  a: string;
}

export interface GlossarySource {
  text: string;
  url?: string;
}

export interface GlossaryTerm {
  slug: string;
  /** Display name, e.g. "Working memory". */
  name: string;
  /** Short tagline shown on the index card. */
  tagline: string;
  /** ~2-3 paragraph plain-language definition (each item is one paragraph). */
  definition: string[];
  /** "Why it matters" section paragraphs. */
  whyItMatters: string[];
  /** "How it works in the brain" section paragraphs. */
  howItWorks: string[];
  /** "How to improve [term]" section paragraphs. */
  howToImprove: string[];
  /** FAQ items specific to this term. */
  faqs: GlossaryFAQ[];
  /** Sources. */
  sources?: GlossarySource[];
  /** Last content review date. ISO string. */
  lastUpdated?: string;
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
  'working-memory': {
    slug: 'working-memory',
    name: 'Working memory',
    tagline: 'the system that holds and manipulates information for a few seconds at a time',
    lastUpdated: '2026-04-30',
    definition: [
      'Working memory is the cognitive system that holds a small amount of information in mind for a few seconds at a time and lets you do something with it. Holding a phone number in your head while you walk to a different room to write it down is working memory. Holding the start of a sentence in mind while you read the end is working memory. Mental arithmetic is working memory.',
      'It is sometimes confused with short-term memory, but the two are not the same thing. Short-term memory is closer to passive storage; working memory adds the manipulation. Most modern cognitive scientists treat working memory as the active, executive subset of short-term memory rather than as a separate store.',
      'Capacity is small. Most adults can hold roughly four to seven items at once, with the exact number depending on the type of information, your level of fatigue, and what else is competing for attention. The famous "magical number seven, plus or minus two" (Miller, 1956) is the classical reference, though later research has refined the picture.',
    ],
    whyItMatters: [
      'Working memory is one of the strongest individual predictors of academic achievement (Alloway and Alloway, 2010), correlates substantially with measures of fluid intelligence, and is closely connected to attention. When people describe walking into a room and forgetting why, or losing their place mid-paragraph, working-memory load is a big part of what is happening underneath.',
      'It is also the cognitive function most directly affected by sleep deprivation, stress, and certain conditions including ADHD. Most people notice working memory failures more than any other kind of cognitive lapse because they happen so visibly in the middle of doing something.',
    ],
    howItWorks: [
      'The standard model of working memory (Baddeley and Hitch, 1974, with later updates) identifies a few subsystems. The phonological loop holds verbal information for a couple of seconds while you rehearse it. The visuospatial sketchpad holds visual and spatial information. The central executive coordinates them and decides what gets attention. A later addition, the episodic buffer, integrates information across these subsystems and links them to long-term memory.',
      'The hardware sits primarily in the prefrontal cortex (especially dorsolateral prefrontal cortex), with parietal and temporal regions doing the storage work for the different content types. Imaging studies consistently show prefrontal activity scales with working-memory load.',
    ],
    howToImprove: [
      'Working memory is moderately trainable on the specific tasks you train (Klingberg, 2010). Focused practice on tasks like n-back, complex span, or visuospatial recall reliably improves performance on those tasks and on closely related ones. The catch, summarized in the Simons and colleagues (2016) review, is that the gains do not transfer broadly to general intelligence or unrelated skills. Train it for what it specifically does.',
      'The other half of the picture is the boring but powerful one: sleep, exercise, hydration, and stress management all measurably affect working memory in the short term. The fastest way to lose three points of working-memory capacity is to lose two hours of sleep.',
    ],
    faqs: [
      {
        q: 'What is the difference between working memory and short-term memory?',
        a: 'Short-term memory is passive storage of information for seconds. Working memory adds the active manipulation: holding the information AND doing something with it. Most cognitive scientists treat working memory as the active subset of short-term memory.',
      },
      {
        q: 'Can you train working memory?',
        a: 'Yes, on the specific tasks you train. Focused practice reliably improves performance on the trained task and on closely related tasks (Klingberg, 2010). Broader transfer to general cognition is much less reliable (Simons et al., 2016).',
      },
      {
        q: 'How much working memory do most people have?',
        a: 'Roughly four to seven items at once, depending on information type, attention, and fatigue. Miller\'s "magical number seven, plus or minus two" is the classical reference; later work suggests the typical capacity for distinct chunks is closer to four.',
      },
      {
        q: 'Is working memory the same as IQ?',
        a: 'Not the same, but strongly correlated, especially with measures of fluid intelligence. Working-memory capacity is one of the strongest individual predictors of academic achievement, but it captures something more specific than overall IQ.',
      },
    ],
    sources: [
      { text: 'Miller (1956), "The Magical Number Seven, Plus or Minus Two"' },
      { text: 'Baddeley & Hitch (1974), "Working Memory"' },
      { text: 'Alloway & Alloway (2010), "Investigating the predictive roles of working memory and IQ in academic attainment"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences', url: 'https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1' },
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
    ],
  },

  'visual-memory': {
    slug: 'visual-memory',
    name: 'Visual memory',
    tagline: 'the ability to remember what you have seen, from briefly glimpsed scenes to long-term mental images',
    lastUpdated: '2026-04-30',
    definition: [
      'Visual memory is the ability to encode, store, and retrieve information that came in through the eyes. It covers a wide span of timescales and tasks: the half-second buffer that holds a glimpsed image just long enough to recognise it, the seconds-long visuospatial sketchpad that lets you remember where the cup was on the counter, and the long-term visual store that lets you recognise a face you have not seen in a decade.',
      'Practically, visual memory is what is doing the work when you remember the layout of a room, recall a person\'s face, navigate a familiar route, or notice that something has been moved on your desk. It is one of the most-used cognitive systems in everyday life, even though most people only think about memory in terms of names and dates.',
    ],
    whyItMatters: [
      'Visual memory underwrites a surprisingly large fraction of normal cognitive function. It is what lets you find your car in a car park, recognise a face in a crowd, hold a diagram in mind during a conversation, and remember whether you have already seen a particular slide in a deck.',
      'It is also one of the more trainable cognitive skills. Focused visual-recall practice produces narrow but real improvements in the specific tasks practised (Engle and Kane, 2004; Klingberg, 2010). The gains do not transfer broadly to general intelligence, but they do show up in the kinds of everyday recall tasks that look like the practice.',
    ],
    howItWorks: [
      'Visual memory operates across multiple stages. Iconic memory holds a high-fidelity snapshot for less than a second; visuospatial working memory holds a smaller amount of detail for several seconds; long-term visual memory stores recognisable patterns for years.',
      'The hardware spans multiple brain regions. Visual cortex (especially V1 and ventral stream regions like the fusiform face area) does the perceptual work. The hippocampus and surrounding medial temporal lobe structures are critical for binding visual elements together into coherent memories. The prefrontal cortex coordinates the working-memory layer.',
    ],
    howToImprove: [
      'The single most reliable approach is focused, repeated practice on visual-recall tasks. The Corsi block-tapping task, visual span tasks, and similar paradigms all show that capacity grows on the trained task with daily practice. Blanked is built around exactly this kind of focused practice, applied to scene recall, sequence memory, and spatial pattern recognition.',
      'The boring fundamentals also apply. Sleep is critical for memory consolidation, including visual memory. Stress, caffeine timing, and screen overload all measurably affect short-term visual memory in the moment. The everyday hygiene matters more than people give it credit for.',
    ],
    faqs: [
      {
        q: 'How is visual memory different from photographic memory?',
        a: 'Photographic memory in the everyday sense (perfect, infinite recall of any image) is essentially a myth. The closest real phenomenon is eidetic memory, which is rare, mostly observed in children, and far more limited than the popular conception. Normal visual memory is good but selective; you remember the gist and a few details, not a lossless image.',
      },
      {
        q: 'Can you actually improve your visual memory?',
        a: 'On the specific tasks you train, yes, reliably. Focused practice on visual-recall tasks produces measurable gains on those tasks and on closely related ones. The improvement does not magically transfer to remembering names or general intelligence; it is a narrow but real benefit.',
      },
      {
        q: 'Why am I bad at remembering faces?',
        a: 'Face recognition uses a partly specialised system (the fusiform face area) that varies considerably between people. Some variation is genuinely innate. Most people can improve on face-name binding with deliberate practice, especially using strategies that link a face to other memorable cues (e.g. context, name etymology).',
      },
      {
        q: 'What test measures visual memory?',
        a: 'The most widely used research task is the Corsi block-tapping test, which measures visuospatial span. Variants of it are used in clinical neuropsychology. There are also free in-browser versions, including the visual memory test on this site.',
      },
    ],
    sources: [
      { text: 'Engle & Kane (2004), "Executive Attention, Working Memory Capacity, and a Two-Factor Theory of Cognitive Control"' },
      { text: 'Klingberg (2010), "Training and plasticity of working memory", Trends in Cognitive Sciences', url: 'https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(10)00114-1' },
      { text: 'Corsi (1972), "Human memory and the medial temporal region of the brain"' },
    ],
  },

  'short-term-memory': {
    slug: 'short-term-memory',
    name: 'Short-term memory',
    tagline: 'the brief storage system that holds information for seconds before it is either forgotten or moved to long-term memory',
    lastUpdated: '2026-04-30',
    definition: [
      'Short-term memory is the cognitive system that holds a small amount of information for a few seconds, typically in the range of 15 to 30 seconds without rehearsal. It sits between sensory memory (which holds raw perceptual input for under a second) and long-term memory (which can hold information for years).',
      'Short-term memory is often used loosely to mean working memory, but the strict distinction is useful. Short-term memory is the passive storage layer; working memory is the active manipulation layer that includes short-term storage. When researchers say "short-term memory" they usually mean the storage component specifically.',
      'Capacity is small. The classical Miller (1956) figure is seven items, plus or minus two; later research has refined this down closer to four chunks for arbitrary unrelated items. Capacity grows substantially when items can be grouped into meaningful chunks (a familiar phrase counts as one chunk; a string of random letters of the same length counts as many).',
    ],
    whyItMatters: [
      'Short-term memory is the gateway to long-term memory. Information that is not held in short-term memory long enough to be encoded does not make it to long-term storage. Most "I am so forgetful" complaints in everyday life are actually short-term memory failures rather than long-term memory failures: the information was never properly captured in the first place.',
      'Short-term memory is also extremely sensitive to interference, fatigue, and attention. The reason you cannot remember the four things you walked into the kitchen for is rarely that the storage was overloaded; it is usually that something interrupted attention during the few seconds between intent and arrival.',
    ],
    howItWorks: [
      'Information enters short-term memory after passing through sensory memory and being attended to. Once there, it decays over a window of roughly 15 to 30 seconds unless rehearsed (e.g. saying a phone number to yourself repeatedly) or transferred to long-term memory through encoding.',
      'The neural substrate involves prefrontal cortex (for the active maintenance) and content-specific posterior regions (auditory cortex for verbal information, visual cortex for visual). Working memory training generalises the most reliably within the type of content trained, suggesting the storage subsystems are at least partly distinct.',
    ],
    howToImprove: [
      'The most powerful "improvement" is technique rather than capacity. Chunking (grouping individual items into meaningful units) effectively expands what you can hold without changing the underlying storage. So does deliberate rehearsal, paying conscious attention, and reducing interruptions during the short window between perception and storage.',
      'Training on specific span tasks (Corsi blocks, complex span) produces measurable gains on those tasks. Whether that transfers broadly to everyday short-term memory is contested, with the Simons et al. (2016) review concluding the transfer is narrow.',
    ],
    faqs: [
      {
        q: 'Is short-term memory the same as working memory?',
        a: 'Not exactly. Short-term memory is the passive storage component; working memory is the active manipulation component, which includes the storage. Most cognitive scientists treat working memory as the broader system, with short-term memory as one of its parts.',
      },
      {
        q: 'How long does information stay in short-term memory?',
        a: 'Roughly 15 to 30 seconds without rehearsal. Continuous rehearsal can keep information available much longer; encoding into long-term memory makes it durable.',
      },
      {
        q: 'How many things can short-term memory hold?',
        a: 'The classical answer is seven plus or minus two items (Miller, 1956). More recent work suggests the figure for arbitrary unrelated items is closer to four chunks. Capacity expands substantially when items can be grouped into meaningful chunks.',
      },
      {
        q: 'Why do I keep forgetting why I walked into a room?',
        a: 'Almost always a short-term memory failure caused by interruption or distraction during the few seconds between forming the intent and acting on it. The information never made it to long-term storage and was overwritten by whatever you noticed on the way. Common, normal, and not a sign of anything serious.',
      },
    ],
    sources: [
      { text: 'Miller (1956), "The Magical Number Seven, Plus or Minus Two"' },
      { text: 'Cowan (2001), "The magical number 4 in short-term memory: a reconsideration of mental storage capacity"' },
      { text: 'Baddeley & Hitch (1974), "Working Memory"' },
      { text: 'Simons et al. (2016), "Do Brain-Training Programs Work?", Psychological Science in the Public Interest', url: 'https://journals.sagepub.com/doi/10.1177/1529100616661983' },
    ],
  },
};
