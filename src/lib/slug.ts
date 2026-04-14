/** Convert any string to a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '') // strip non-alphanumeric
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-|-$/g, '') // trim dashes
    .slice(0, 60);
}

/** Returns true if the slug is valid kebab-case. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && slug.length > 0 && slug.length <= 60;
}
