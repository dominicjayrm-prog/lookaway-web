import { isValidSlug } from './slug';
import {
  mdCountH1s, mdCheckHeadingHierarchy, mdExtractImages, mdExtractLinks, mdWordCount,
} from './markdown';

export type Severity = 'error' | 'warning' | 'info';

export interface SeoCheck {
  id: string;
  severity: Severity;
  message: string;
  fix?: string;
  field?: 'title' | 'slug' | 'meta' | 'banner' | 'content';
}

export interface PostInput {
  title: string;
  slug: string;
  subtitle?: string | null;
  meta_description?: string | null;
  keywords?: string[];
  banner_url?: string | null;
  banner_alt?: string | null;
  /** Markdown source. */
  content: string;
  /** Slugs of other posts, used to detect duplicates (excludes the current post). */
  existingSlugs?: string[];
}

/** Runs all synchronous SEO checks on a post. Link-checking is async and handled separately. */
export function runSeoChecks(input: PostInput): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const title = input.title?.trim() ?? '';
  const slug = input.slug?.trim() ?? '';
  const metaDesc = input.meta_description?.trim() ?? '';
  const md = input.content ?? '';
  const wordCount = mdWordCount(md);

  // Title
  if (title.length === 0) {
    checks.push({ id: 'title-empty', severity: 'error', message: 'Title is required', field: 'title' });
  } else if (title.length < 30) {
    checks.push({ id: 'title-short', severity: 'warning', message: `Title is ${title.length} chars — aim for 30-60`, fix: 'Add more descriptive keywords', field: 'title' });
  } else if (title.length > 60) {
    checks.push({ id: 'title-long', severity: 'warning', message: `Title is ${title.length} chars — Google truncates at 60`, fix: 'Shorten the title', field: 'title' });
  }

  // Slug
  if (slug.length === 0) {
    checks.push({ id: 'slug-empty', severity: 'error', message: 'Slug is required', field: 'slug' });
  } else if (!isValidSlug(slug)) {
    checks.push({ id: 'slug-invalid', severity: 'error', message: 'Slug must be lowercase kebab-case, ≤ 60 chars', fix: 'Use only letters, numbers, and dashes', field: 'slug' });
  } else if (input.existingSlugs?.includes(slug)) {
    checks.push({ id: 'slug-duplicate', severity: 'error', message: 'Another post already uses this slug', fix: 'Pick a unique slug', field: 'slug' });
  }

  // Meta description
  if (metaDesc.length === 0) {
    checks.push({ id: 'meta-empty', severity: 'warning', message: 'Meta description is missing', fix: 'Add a 120-160 char summary for search engines', field: 'meta' });
  } else if (metaDesc.length < 120) {
    checks.push({ id: 'meta-short', severity: 'warning', message: `Meta description is ${metaDesc.length} chars — aim for 120-160`, field: 'meta' });
  } else if (metaDesc.length > 160) {
    checks.push({ id: 'meta-long', severity: 'warning', message: `Meta description is ${metaDesc.length} chars — Google truncates at 160`, field: 'meta' });
  }

  // Banner
  if (!input.banner_url) {
    checks.push({ id: 'banner-missing', severity: 'warning', message: 'No banner image — posts with banners get more shares', fix: 'Upload a banner (1200×630 recommended)', field: 'banner' });
  } else if (!input.banner_alt || input.banner_alt.trim().length === 0) {
    checks.push({ id: 'banner-alt-missing', severity: 'error', message: 'Banner is missing alt text (required for accessibility and SEO)', fix: 'Add alt text describing the image', field: 'banner' });
  }

  // H1 count in content (title is the H1, so content shouldn't have any)
  const h1Count = mdCountH1s(md);
  if (h1Count > 0) {
    checks.push({ id: 'content-h1', severity: 'error', message: `Content has ${h1Count} H1 heading(s) — the title is already the H1`, fix: 'Change # headings to ## or ### in the content', field: 'content' });
  }

  // Heading hierarchy
  const hierarchy = mdCheckHeadingHierarchy(md);
  if (!hierarchy.valid && hierarchy.issue) {
    checks.push({ id: 'heading-hierarchy', severity: 'warning', message: hierarchy.issue, fix: 'Reorder headings so levels flow sequentially', field: 'content' });
  }

  // Image alt text
  const images = mdExtractImages(md);
  const missingAlt = images.filter((img) => !img.alt).length;
  if (missingAlt > 0) {
    checks.push({ id: 'img-alt-missing', severity: 'error', message: `${missingAlt} image(s) missing alt text`, fix: 'Add alt text inside the brackets: ![Your description](url)', field: 'content' });
  }

  // Word count
  if (wordCount > 0 && wordCount < 600) {
    checks.push({ id: 'word-count', severity: 'warning', message: `${wordCount} words — Google prefers 600+ for long-form content`, field: 'content' });
  } else if (wordCount === 0) {
    checks.push({ id: 'content-empty', severity: 'error', message: 'Post has no content', field: 'content' });
  }

  // Keywords
  if (!input.keywords || input.keywords.length === 0) {
    checks.push({ id: 'keywords-empty', severity: 'info', message: 'No keywords set — helps related-posts matching', field: 'meta' });
  }

  return checks;
}

export function summarizeChecks(checks: SeoCheck[]): { errors: number; warnings: number; infos: number; canPublish: boolean } {
  const errors = checks.filter((c) => c.severity === 'error').length;
  const warnings = checks.filter((c) => c.severity === 'warning').length;
  const infos = checks.filter((c) => c.severity === 'info').length;
  return { errors, warnings, infos, canPublish: errors === 0 };
}

export function countContentLinks(md: string) {
  return mdExtractLinks(md).length;
}
