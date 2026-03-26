import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../../seo/Seo'
import { getBlogPostBySlug, getCanonicalBlogSlug, getCategoryLabel } from './blogPosts'
import { toAbsoluteUrl } from '../../seo/siteConfig'

const formatDate = (dateValue) => (
  new Date(dateValue).toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)

const HIGHLIGHT_STYLES = [
  'text-[#93c5fd] font-semibold',
  'text-[#fca5a5] font-semibold',
  'text-[#a7f3d0] font-semibold',
  'text-[#fde68a] font-semibold',
]

const renderParagraphWithHighlights = (paragraph) => {
  const parts = String(paragraph).split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const text = part.slice(2, -2)
      const colorClass = HIGHLIGHT_STYLES[index % HIGHLIGHT_STYLES.length]
      return (
        <span key={`hl-${index}`} className={colorClass}>
          {text}
        </span>
      )
    }
    return <React.Fragment key={`txt-${index}`}>{part}</React.Fragment>
  })
}

function ReadBlog() {
  const { slug } = useParams()
  const canonicalSlug = getCanonicalBlogSlug(slug)

  if (canonicalSlug && canonicalSlug !== slug) {
    return <Navigate to={`/blog/${canonicalSlug}/`} replace />
  }

  const post = getBlogPostBySlug(canonicalSlug || slug)

  if (!post) {
    return (
      <section className="min-h-screen text-white font-mersad2 mt-8" aria-labelledby="not-found-title">
        <Seo
          title="სტატია ვერ მოიძებნა | INNO M Academy"
          description="მოთხოვნილი სტატია ვერ მოიძებნა."
          path={`/blog/${slug || ''}/`}
          noindex
        />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 id="not-found-title" className="text-3xl sm:text-4xl md:text-5xl font-mersad1">სტატია ვერ მოიძებნა</h1>
          <p className="text-white/75 mt-4">შესაძლოა ბმული შეცვლილია ან სტატია წაშლილია.</p>
          <Link to="/blog/" className="inline-flex mt-6 rounded-xl border border-[#38bdf8]/45 px-4 py-2 text-sm font-semibold text-[#7dd3fc]">
            ბლოგზე დაბრუნება
          </Link>
        </div>
      </section>
    )
  }

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'ka-GE',
    author: {
      '@type': 'Organization',
      name: 'INNO M Academy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'INNO M Academy',
      url: toAbsoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/icon-images/innomlogov2.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/blog/${post.slug}/`),
    },
    description: post.excerpt,
    articleSection: post.categories.map(getCategoryLabel).join(', '),
    keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : undefined,
    image: toAbsoluteUrl(post.coverImage || '/icon-images/innomlogov2.png'),
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'მთავარი',
        item: toAbsoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ბლოგი',
        item: toAbsoluteUrl('/blog/'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: toAbsoluteUrl(`/blog/${post.slug}/`),
      },
    ],
  }

  return (
    <article className="min-h-screen text-white font-mersad2 mt-8 relative overflow-hidden" aria-labelledby="blog-post-title">
      <div className="absolute inset-0 -z-10" />
      <Seo
        title={`${post.title} | INNO M Academy`}
        description={post.excerpt}
        path={`/blog/${post.slug}/`}
        image={post.coverImage || '/icon-images/innomlogov2.png'}
        ogType="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        keywords={post.keywords}
        structuredData={[articleStructuredData, breadcrumbStructuredData]}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link to="/blog/" className="text-[#93c5fd] text-sm font-semibold hover:text-[#60a5fa] transition-colors">
          ← ბლოგზე დაბრუნება
        </Link>

        <header className="mt-6 rounded-3xl border border-white/15 bg-[#0f172a]/70 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((categoryId) => (
              <span
                key={`post-${categoryId}`}
                className="text-[11px] uppercase tracking-[0.15em] text-white bg-white/10 border border-white/30 px-2.5 py-1 rounded-full"
              >
                {getCategoryLabel(categoryId)}
              </span>
            ))}
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#93c5fd] mt-4">
            {formatDate(post.publishedAt)}
          </p>
          <h1 id="blog-post-title" className="text-2xl sm:text-4xl md:text-5xl font-mersad1 leading-tight mt-4 bg-linear-to-r from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] text-transparent bg-clip-text">
            {post.title}
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-5">{post.excerpt}</p>
        </header>

        {!!post.coverImage && (
          <figure className="mt-8 overflow-hidden rounded-2xl border border-white/15">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="sr-only">{post.title}: საფარის ფოტო</figcaption>
          </figure>
        )}

        <section className="mt-10 space-y-7" aria-label="სტატიის სექციები">
          {post.sections.map((section, sectionIndex) => (
            <React.Fragment key={`${section.heading}-${sectionIndex}`}>
              <section
                className="rounded-3xl border border-white/15 bg-linear-to-br from-[#0b1220]/90 to-[#172033]/85 p-6 sm:p-7"
                aria-labelledby={`section-title-${sectionIndex}`}
              >
                <h2 id={`section-title-${sectionIndex}`} className="text-lg sm:text-2xl md:text-3xl font-mersad1 text-white">
                  <span className="text-[#93c5fd]">#{sectionIndex + 1}</span> {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-white/85 leading-relaxed">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={`${section.heading}-${idx}`}>
                      {renderParagraphWithHighlights(paragraph)}
                    </p>
                  ))}
                </div>
              </section>

              {sectionIndex === 1 && (
                <section
                  className="rounded-3xl border border-[#1e3a8a]/30 bg-[#0b1224]/85 p-6 sm:p-7 shadow-[0_16px_36px_rgba(2,6,23,0.55)] backdrop-blur-xl"
                  aria-label="სტატიის შუაში რეგისტრაცია"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-mersad1 text-white">დაიწყე სწავლა</h3>
                      <p className="mt-2 text-white/75">
                        თუ სტუდენტი ხარ, დაიწყე პრაქტიკით. თუ მშობელი ხარ, დაგეხმარებით სწორი მიმართულების არჩევაში და პროგრესის კონტროლში.
                      </p>
                    </div>
                    <Link
                      to="/registration"
                      className="shrink-0 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-linear-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] shadow-[0_12px_28px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(59,130,246,0.45)] transition-all"
                    >
                      დარეგისტრირდი კურსზე
                    </Link>
                  </div>
                </section>
              )}
            </React.Fragment>
          ))}
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10" aria-label="შემდგომი ნაბიჯები">
          <Link
            to="/registration"
            className="inline-flex rounded-xl border border-[#38bdf8]/45 px-4 py-2 text-sm font-semibold text-[#7dd3fc] hover:bg-[#38bdf8]/10 transition-colors"
          >
            დაიწყე სწავლა: რეგისტრაცია
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default ReadBlog
