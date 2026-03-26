import { blogSlugRedirects, getBlogPostBySlug, getCanonicalBlogSlug } from './blogPosts'

describe('blog slug resolution', () => {
  it('returns the post for a canonical slug', () => {
    expect(getBlogPostBySlug('quantum-computing-reality')?.slug).toBe('quantum-computing-reality')
  })

  it('maps legacy slugs to their canonical slug', () => {
    expect(getCanonicalBlogSlug('quantum-computing-reality-2026')).toBe('quantum-computing-reality')
    expect(getCanonicalBlogSlug('how-to-start-programming-in-2026')).toBe('how-to-start-programming')
  })

  it('exposes redirect metadata for every legacy slug', () => {
    expect(blogSlugRedirects).toEqual(expect.arrayContaining([
      { from: 'quantum-computing-reality-2026', to: 'quantum-computing-reality' },
      { from: 'how-to-start-programming-in-2026', to: 'how-to-start-programming' },
    ]))
  })
})
