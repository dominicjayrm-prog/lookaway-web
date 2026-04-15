export const COLORS = {
  bg: "#FAFAF7",
  card: "#FFFFFF",
  accent: "#6C5CE7",
  accentL: "#A29BFE",
  green: "#00B894",
  coral: "#FF6B6B",
  gold: "#D4A012",
  blue: "#0984E3",
  text: "#1A1A18",
  textM: "#555555",
  textD: "#999999",
} as const;

// TODO: Update APP_STORE_URL and APPLE_TEAM_ID when App Store listing is live
export const APP_STORE_URL = "https://apps.apple.com/app/blanked/id6745136042";
export const SITE_URL = "https://playblanked.com";
export const APP_SCHEME = "blanked://";
export const CONTACT_EMAIL = "hello@playblanked.com";
export const APPLE_TEAM_ID = "TEAMID";
export const BUNDLE_ID = "com.blanked.app";

/** Founder / default blog author. Shown on /about, on every blog post, and
 *  surfaced to Google via Article JSON-LD with sameAs links. */
export const FOUNDER = {
  name: "Dominic",
  fullName: "Dominic Roworth",
  role: "Founder",
  location: "Gibraltar",
  avatar: "/founder.jpg",
  linkedin: "https://www.linkedin.com/in/dominicroworth/",
  instagram: "https://www.instagram.com/dj.rar",
  email: CONTACT_EMAIL,
  bio: "Founder of Blanked. Lives and builds from Gibraltar. Writes about memory, game design, and the weird satisfaction of forgetting where you parked.",
} as const;
