/**
 * `?static` disables smooth scroll and the intro sequence.
 * Useful for screenshots, visual diffing and debugging layout.
 */
export const isStatic =
  typeof window !== 'undefined' && window.location.search.includes('static')
