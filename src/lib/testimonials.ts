/**
 * Real App Store / user testimonials shown on the homepage.
 *
 * IMPORTANT: only add genuine, verbatim quotes from real reviews
 * (App Store, email, social). Never fabricate. Google penalises
 * fake aggregateRatings and competitors will report fake testimonials.
 *
 * If the array is empty, the homepage Testimonials section renders
 * nothing — the rest of the page is unaffected.
 */
export interface Testimonial {
  /** Verbatim quote text. */
  quote: string;
  /** Display name (first name + last initial, or App Store handle). */
  author: string;
  /** Source of the quote, e.g. "App Store", "Reddit". */
  source: string;
  /** 1-5. Optional. Only set when the quote is from a star-rated review. */
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const TESTIMONIALS: Testimonial[] = [
  // Add real quotes here once you have App Store reviews. Example:
  // {
  //   quote: "Finally a brain game that doesn't feel like a chore. The 2-minute sessions actually fit my morning coffee.",
  //   author: 'Sarah M.',
  //   source: 'App Store',
  //   rating: 5,
  // },
];
