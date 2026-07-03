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
  /** Optional override for the meta description on /glossary/[slug].
   *  Use when the auto-generated one (`name: tagline.`) lands outside the
   *  120-160 char SEO sweet spot for a specific entry. */
  metaDescription?: string;
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
    metaDescription: 'Working memory holds and manipulates information for a few seconds at a time. Plain-English definition, why it matters, and how to train it.',
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
    metaDescription: 'Visual memory is the ability to remember what you have seen, from glimpsed scenes to long-term mental images. Definition + how to train it.',
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

  'photographic-memory': {
    slug: 'photographic-memory',
    name: 'Photographic memory',
    tagline: 'the popular myth of perfect visual recall, and what people actually have instead',
    metaDescription: 'Photographic memory: the myth of perfect visual recall. Why research says it does not exist, and what real visual memory looks like.',
    lastUpdated: '2026-05-25',
    definition: [
      'Photographic memory, in the everyday sense of the phrase, is the supposed ability to recall any image, page, or scene in perfect detail at will, as if a photograph of it had been taken and stored in the brain. It is one of the most familiar ideas in popular psychology, and it is also one of the most misleading. The honest answer from the research is that photographic memory, defined that way, basically does not exist.',
      'What does exist is much narrower. Eidetic imagery is a real but rare phenomenon, found mostly in children between roughly 5 and 12, where a person can briefly hold a vivid afterimage of a recently viewed picture for tens of seconds and answer detailed questions about it. Even then the image fades, is partially constructed, and contains errors. By adulthood, eidetic imagery is vanishingly rare. The famous case study often cited (Stromeyer\'s 1970 report on a participant who could fuse random-dot stereograms across time) has never been independently replicated.',
      'What most people who think they have photographic memory actually have is unusually strong visual memory in specific domains they care about. A graphic designer might recall layouts in striking detail. A chess player might reconstruct a board from a glance. The skill is real, but it is built on practice, attention, and meaningful encoding, not on a literal mental photograph.',
    ],
    whyItMatters: [
      'The photographic-memory myth is everywhere in school advice, productivity content, and brain-training app marketing. Believing it sets up the wrong expectations for what training your memory will and will not do. Nobody trains their way into perfect recall, because perfect recall is not a thing the human brain does. What they can train is the much more useful and achievable skill of remembering what they paid attention to.',
      'Understanding the myth also helps you spot bad memory advice. Anyone promising photographic recall, total recall, or memory like a camera is selling a story rather than a skill. The real, sourced research on how to actually improve memory looks much less glamorous: practice, sleep, encoding strategies, and time.',
    ],
    howItWorks: [
      'Visual memory in adults is reconstructive, not photographic. When you remember a scene, you are not retrieving a stored image; you are rebuilding the scene from a small number of remembered features, filled in with assumptions and prior knowledge. This is why eyewitness testimony is notoriously unreliable, why two people can describe the same room differently, and why your memory of an event can shift over time without you noticing.',
      'The brain regions involved (visual cortex for the perceptual side, the hippocampus and medial temporal lobe for binding it into a memory, prefrontal cortex for working-memory control) all operate on this reconstructive principle. There is no "image store" anywhere in the architecture. There never was.',
    ],
    howToImprove: [
      'If you cannot have photographic memory, what can you have? Substantially sharper visual memory than your baseline, with focused practice. Memorise actively rather than passively. Pay deliberate attention to the things you want to remember; the encoding step is where most "forgetting" actually happens. Use mnemonics, place items into spatial scenes, group meaningful units rather than try to hold raw detail.',
      'For the trainable visual short-term and working memory components specifically, focused practice on visual-recall tasks (the kind in our{\' \'}/memory-test) produces measurable gains within weeks. The gains are narrow but real. They will not give you photographic recall. They will give you sharper recognition of faces, layouts, and scenes than you had before.',
    ],
    faqs: [
      {
        q: 'Does photographic memory actually exist?',
        a: 'In the everyday "perfect mental snapshot" sense, no. The closest real phenomenon is eidetic imagery, which is rare, mostly observed in children, and far more limited than the popular conception. By adulthood it is vanishingly rare and the famous reported cases have never been independently replicated.',
      },
      {
        q: 'What is the difference between eidetic and photographic memory?',
        a: 'Eidetic memory is the technical term for a brief, vivid afterimage held for tens of seconds after viewing a picture, observed mostly in young children. Photographic memory is the popular, broader, unscientific claim of permanent perfect recall of anything seen. Eidetic memory is real but narrow and rare; photographic memory in the popular sense is essentially a myth.',
      },
      {
        q: 'How can someone remember a chess board after a glance?',
        a: 'Through chunking. Expert chess players do not memorise 32 separate piece positions; they recognise familiar patterns (a particular opening structure, a known tactical motif) and store the position as a small number of meaningful chunks. Show them a random arrangement of pieces that does not correspond to a real game and their recall drops to ordinary levels. The skill is pattern recognition built through years of practice, not photographic capture.',
      },
      {
        q: 'Can I train myself to have photographic memory?',
        a: 'No, because the underlying claim does not match how memory works. You can absolutely train measurable gains in visual recall, working memory, and pattern recognition. People sometimes describe those gains in photographic-memory language because it is the cultural shorthand, but the skill behind the words is more interesting and more achievable than the myth.',
      },
      {
        q: 'Why does this myth persist?',
        a: 'A combination of confirmation bias (we remember the few times we recalled something vividly and forget the many times we did not), Hollywood (Will Hunting, Sherlock, every memory-savant trope), and self-help marketing (selling "unlock your photographic memory" courses). The myth is sticky because it offers something that sounds wonderful, but the actual cognitive science is much more grounded.',
      },
    ],
    sources: [
      { text: 'Brandimonte, Hitch, & Bishop (1992), "Influence of short-term memory codes on visual image processing"' },
      { text: 'Hyman & Faries (1992), on the unreliability of eidetic memory claims' },
      { text: 'Crowder (1992), "Sensory memory", in The Handbook of Cognition and Aging' },
      { text: 'Stromeyer & Psotka (1970), "The detailed texture of eidetic images", Nature (the much-cited but never-replicated case)' },
      { text: 'Loftus (1979), "Eyewitness Testimony" on the reconstructive nature of memory' },
    ],
  },

  'spatial-memory': {
    slug: 'spatial-memory',
    name: 'Spatial memory',
    tagline: 'the system that lets you remember where things are and how to find your way around',
    metaDescription: 'Spatial memory: the system that lets you remember where things are, navigate familiar routes, and find your way home. Plain-English definition.',
    lastUpdated: '2026-05-25',
    definition: [
      'Spatial memory is the cognitive system that holds and retrieves information about locations: where things are, how they relate to each other in space, and how to move between them. It is what lets you find your car in a multi-storey car park, recall which kitchen cupboard the coffee is in, navigate your way home in the dark, and remember which seat was yours in a meeting room.',
      'Like most cognitive systems, spatial memory operates across timescales. There is a short-term version (the visuospatial sketchpad in Baddeley and Hitch\'s working-memory model, holding spatial information for seconds while you act on it) and a long-term version (the durable mental map of a city you grew up in, learned over years).',
      'Spatial memory is closely tied to navigation but is not the same as it. Navigation also requires path integration (keeping track of where you are while moving), landmark recognition, and route planning. Spatial memory is the storage layer underneath all of that.',
    ],
    whyItMatters: [
      'Spatial memory underwrites a surprisingly large slice of everyday cognition. Most "I cannot find my keys" experiences are spatial-memory failures rather than general forgetfulness. So is forgetting where you parked, missing a turn on a familiar route, or putting a remote control down without registering where. The system fails quietly because we rarely notice ourselves using it well.',
      'Spatial memory also declines measurably with age, faster than some other memory subsystems. This is one of the reasons older adults often struggle more with navigation in unfamiliar places than with verbal recall. The good news is that spatial memory is moderately trainable; the games and tasks in our{\' \'}/memory-games-for-seniors guide draw on this.',
    ],
    howItWorks: [
      'The brain region most directly responsible for spatial memory is the hippocampus, with substantial help from neighbouring medial temporal lobe structures. The 2014 Nobel Prize in Physiology or Medicine went to John O\'Keefe and the Mosers for the discovery of "place cells" (neurons that fire when an animal is in a specific location) and "grid cells" (neurons that create a coordinate-like map of the surrounding space). This system is essentially a built-in GPS, and it is the same hardware in humans.',
      'The hippocampus is also one of the brain regions hit earliest in Alzheimer\'s disease, which explains why spatial disorientation (getting lost in familiar surroundings) is often one of the first noticeable symptoms.',
      'On the shorter timescale, the visuospatial sketchpad in working memory holds spatial information for seconds. This is the system you use when you are carrying three things to different rooms and have to keep track of where each one goes. Capacity is small (the Corsi block-tapping task, the standard measure, tops out around 5-6 for most adults). See our entry on{\' \'}working memory for the broader picture.',
    ],
    howToImprove: [
      'Spatial memory responds well to deliberate practice on spatial tasks. Variants of the Corsi block-tapping test, mental rotation exercises, and games that ask you to remember layouts (Blanked\'s Colour Chain and Speed Recall modes are this format) all produce measurable gains within weeks.',
      'Everyday habits help too. Active navigation (planning a route from memory rather than following turn-by-turn directions) keeps the system engaged; constant satnav use is associated with reduced hippocampal engagement, though the long-term effects are still being studied. Walking new routes, exploring unfamiliar areas, and consciously noting landmarks all maintain the system.',
      'For older adults specifically, the ACTIVE trial speed-of-processing training (which has the most peer-reviewed transfer evidence in the brain-training literature) shows benefits that include spatial-cognition components.',
    ],
    faqs: [
      {
        q: 'How is spatial memory different from visual memory?',
        a: 'Visual memory is the broader category covering anything you have seen (faces, shapes, scenes, layouts). Spatial memory is the subset that specifically encodes locations and spatial relationships. The two overlap but are dissociable; some brain injuries impair one and not the other. See our entry on visual memory for the parent concept.',
      },
      {
        q: 'Does using GPS make spatial memory worse?',
        a: 'There is some evidence that heavy reliance on turn-by-turn navigation reduces engagement of the hippocampus and may weaken active navigation skills over time. The effect sizes are not huge and the long-term implications are still being studied. The honest advice is to use GPS when you need it but practise navigating from memory when you can, the same way you would take the stairs sometimes rather than always the lift.',
      },
      {
        q: 'Why do older adults sometimes get lost in familiar places?',
        a: 'Spatial memory and the hippocampus are among the systems most affected by normal ageing and by Alzheimer\'s disease specifically. Mild difficulty in unfamiliar places is normal with age. Getting lost in long-familiar places is worth talking to a doctor about, because it can be an early sign of cognitive decline.',
      },
      {
        q: 'Can spatial memory be trained?',
        a: 'Yes, on the specific tasks you train. Corsi-style block-tapping, mental rotation, and layout-memory games all produce measurable gains. As with all brain training, transfer to broader real-world spatial skills is more modest than the marketing usually implies, but the focused-task gains are real.',
      },
    ],
    sources: [
      { text: 'O\'Keefe & Nadel (1978), "The Hippocampus as a Cognitive Map"' },
      { text: '2014 Nobel Prize: O\'Keefe, May-Britt Moser, Edvard Moser, for place cells and grid cells' },
      { text: 'Baddeley & Hitch (1974), "Working Memory"' },
      { text: 'Corsi (1972), "Human memory and the medial temporal region of the brain"' },
      { text: 'Edwards et al. (2017), "Speed of processing training results in lower risk of dementia", ACTIVE Trial', url: 'https://doi.org/10.1016/j.trci.2017.09.002' },
    ],
  },

  'iconic-memory': {
    slug: 'iconic-memory',
    name: 'Iconic memory',
    tagline: 'the visual sensory store that holds a brief, vivid trace of what you have just seen for less than a second',
    metaDescription: 'Iconic memory: the sub-second visual store holding a brief trace of what you just saw. The Sperling experiment and how it differs from short-term memory.',
    lastUpdated: '2026-05-25',
    definition: [
      'Iconic memory is the very brief visual sensory store that holds a vivid trace of what your eyes have just seen for roughly 200 to 500 milliseconds. It is the reason a quickly flashed scene leaves a fading mental afterimage you can interrogate for a fraction of a second before it disappears. It is the first stage of visual memory, sitting between raw perception and short-term memory.',
      'Iconic memory is much larger than short-term memory (you briefly register far more than you can later report) but decays much faster. Whatever you do not transfer into short-term memory within about half a second is lost. This is why some people experience watching a fast scene and feeling they saw "everything" but cannot list the details a moment later: they did see everything, but only iconic memory held it, and iconic memory does not last.',
      'The term and the concept come from George Sperling\'s 1960 doctoral dissertation, which produced one of the most elegant experimental results in cognitive psychology.',
    ],
    whyItMatters: [
      'Iconic memory matters because it is the upstream stage that everything else in visual memory depends on. If the iconic store does not capture an image clearly, no amount of downstream processing can recover the details. Encoding from iconic memory into short-term memory is also where deliberate attention does most of its work; what you pay attention to in those few hundred milliseconds is what makes it further into the system.',
      'For practical memory: many "I did not notice" experiences are iconic-memory transfer failures. The information was briefly present in iconic memory but was not attended to before it decayed. This is why mindfulness and slow looking are useful for memory: they extend the window in which iconic memory can hand off to short-term memory.',
    ],
    howItWorks: [
      'Sperling\'s 1960 partial-report experiment is the canonical demonstration. Participants were shown a grid of letters for 50 milliseconds and asked to recall as many as they could. They typically reported only about four. But when Sperling cued them after the grid disappeared (with a tone telling them which row to report), they could accurately report any row. This proved they had briefly seen the entire grid; they simply could not retrieve all of it before the iconic trace faded.',
      'The neural substrate is primary visual cortex and the closely connected early visual areas. The fade is thought to reflect the natural decay of the visual neural response over a few hundred milliseconds. A masking stimulus (showing a bright pattern immediately after the target) can wipe iconic memory clean before it would otherwise fade, an effect heavily used in cognitive psychology experiments.',
    ],
    howToImprove: [
      'Iconic memory itself is largely fixed; it is built into the early visual system and does not respond much to training. What does respond is the downstream transfer to short-term memory: paying deliberate attention, slowing down, and using encoding strategies. The same focused-attention training that helps short-term and working memory effectively widens the window during which iconic memory can be exploited.',
      'In practical terms, if you want to remember more of what you see, the answer is not "improve iconic memory"; it is "look longer and more deliberately so attention can capture what iconic memory briefly held". For training that downstream encoding step specifically, our{\' \'}/visual-memory-exercises page covers the techniques.',
    ],
    faqs: [
      {
        q: 'How long does iconic memory last?',
        a: 'Roughly 200 to 500 milliseconds in most studies. The trace fades exponentially and is essentially gone by one second. A bright mask shown immediately after the target can wipe it even faster.',
      },
      {
        q: 'What is the Sperling experiment?',
        a: 'George Sperling\'s 1960 partial-report study showed participants a grid of letters for 50 ms, then cued them which row to recall. They could recall any row accurately if cued quickly enough, proving they had briefly seen the entire grid in iconic memory. Whole-report (just say everything you saw) caps out at about four items because the iconic trace fades before they can be reported.',
      },
      {
        q: 'How is iconic memory different from short-term memory?',
        a: 'Iconic memory is much larger but much shorter. It can hold a richly detailed visual scene for under a second; short-term memory can hold a much smaller amount (roughly 4 to 7 items) for tens of seconds. Iconic memory feeds into short-term memory through selective attention.',
      },
      {
        q: 'Is iconic memory the same as photographic memory?',
        a: 'No. Iconic memory is universal, sub-second, and decays quickly. Photographic memory, in the popular sense of permanent perfect recall, is essentially a myth (see our entry on photographic memory). The two are sometimes confused because both involve vivid visual traces, but iconic memory is genuinely real and short, while photographic memory in the everyday sense is genuinely not real.',
      },
      {
        q: 'Can iconic memory be trained?',
        a: 'Not directly in any meaningful way; it is built into early visual processing and is largely fixed. What can be trained is the attentional transfer from iconic memory into short-term memory, which is what most "improve visual memory" practices target.',
      },
    ],
    sources: [
      { text: 'Sperling (1960), "The Information Available in Brief Visual Presentations", Psychological Monographs' },
      { text: 'Neisser (1967), "Cognitive Psychology" — introduced the term "iconic memory"' },
      { text: 'Coltheart (1980), "Iconic memory and visible persistence", Perception & Psychophysics' },
      { text: 'Baddeley (2003), "Working memory: looking back and looking forward", Nature Reviews Neuroscience' },
    ],
  },
};
