import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../seo/Seo'
import { BLOG_CATEGORIES, blogPosts, getCategoryLabel } from './blogPosts'
import { toAbsoluteUrl } from '../../seo/siteConfig'
import { motion } from 'framer-motion'

const formatDate = (dateValue) => (
  new Date(dateValue).toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)

const CARD_THEMES = [
  {
    color: 'from-[#0b1f38] via-[#123456] to-[#09172b]',
    title: 'from-[#e0f2fe] to-[#7dd3fc]',
  },
]

function Blogs() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts
    return blogPosts.filter((post) => post.categories.includes(activeCategory))
  }, [activeCategory])

  const blogListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'INNO M Academy Blog',
    description: 'პროგრამირების, AI-ს და ტექნოლოგიური მომავლის პრაქტიკული სტატიები ქართულ ენაზე.',
    blogPost: filteredPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      articleSection: post.categories.map(getCategoryLabel).join(', '),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      image: toAbsoluteUrl(post.cardImage || post.coverImage || '/icon-images/innomlogov2.png'),
      url: toAbsoluteUrl(`/blog/${post.slug}`),
    })),
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
        item: toAbsoluteUrl('/blog'),
      },
    ],
  }

  return (
    <section className="min-h-screen text-white font-mersad2 mt-8 relative overflow-hidden" aria-labelledby="blog-title">
      <div className="absolute inset-0 -z-10" />
      <Seo
        title="ბლოგი | INNO M Academy"
        description="პროგრამირებაზე, AI-ზე და მშობლებისა და ახალგაზრდების თემებზე პრაქტიკული სტატიები."
        path="/blog"
        keywords={['ბლოგი', 'პროგრამირება', 'AI', 'მშობლებისთვის', 'ახალგაზრდებისთვის']}
        structuredData={[blogListStructuredData, breadcrumbStructuredData]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <header>
          <div className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#12245976] via-[#0d2861] to-[#152e4e] px-6 py-8 shadow-[0_24px_70px_rgba(37,99,235,0.28)] sm:px-8 sm:py-4 lg:px-6 lg:py-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_32%)]" />
            <div className="absolute -left-8 top-10 h-28 w-20 rounded-[45%] bg-white/70 blur-[2px] rotate-[-24deg] opacity-80" />
            <div className="absolute left-[45%] top-8 h-20 w-14 rounded-[40%] bg-white/60 blur-[3px] rotate-18 opacity-70" />
            <div className="absolute right-10 top-8 h-20 w-14 rounded-[40%] bg-white/60 blur-[3px] rotate-28 opacity-70" />
            <div className="absolute right-[14%] bottom-16 h-24 w-16 rounded-[42%] bg-white/65 blur-[3px] rotate-22 opacity-70" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="max-w-2xl">
                <h1 id="blog-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mersad1 text-white drop-shadow-[0_6px_16px_rgba(15,23,42,0.2)]">
                  INNO M - ბლოგი
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-white sm:text-lg">
                  სტატიები სწავლის, პროგრამირების და AI-ის შესახებ, ახალგაზრდებისთვის, მშობლებისთვის და ყველასთვის.
                </p>
                <p className="text-[#ffb143] text-lg sm:text-xl md:text-2xl mt-4">გაიგე მეტი და გაასწარი დროს ჩვენთან ერთად!</p>
              </div>

              <figure className="relative mx-auto w-full max-w-lg lg:max-w-xl">
                <motion.img
                  initial={{y: 90, x:100, opacity: 0}}
                  animate={{y: 0, x: 0, opacity: 1}}
                  transition={{ duration: 0.65, delay: 0.22 }}
                  src="/icon-images/boyblog.png"
                  alt="3D illustration of a boy reading and working on a laptop"
                  className="relative z-10 mx-auto w-full scale-130 max-w-md object-contain drop-shadow-[0_20px_45px_rgba(15,23,42,0.35)] sm:max-w-lg"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="sr-only">INNO M ბლოგის ილუსტრაცია</figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-mersad1 text-white">კატეგორიები</h2>
            <nav className="mt-4" aria-label="ბლოგის კატეგორიები">
              <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-[#000f1a]/80 border-white/25 text-white'
                        : 'border-white/20 bg-white/5 text-white/85 hover:border-white/30 hover:text-white'
                    }`}
                    aria-pressed={activeCategory === 'all'}
                  >
                    ყველა
                  </button>
                </li>

                {BLOG_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                        activeCategory === category.id
                          ? 'bg-[#000f1a]/80 border-white/25 text-white'
                          : 'border-white/20 bg-white/5 text-white/85 hover:border-white/30 hover:text-white'
                      }`}
                      aria-pressed={activeCategory === category.id}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" aria-label="ბლოგის პოსტები">
          {filteredPosts.map((post, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length]

            return (
              <article key={post.slug} className="group h-full">
                <div className="relative h-full rounded-3xl overflow-hidden border border-[#93c5fd]/10 bg-[#08111f]/82 shadow-[0_20px_60px_rgba(2,6,23,0.62)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#93c5fd]/22 flex flex-col">
                  <div className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-linear-to-br ${theme.color} opacity-34 blur-3xl`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_55%)]" />


                  <div className="p-6 relative z-10 flex flex-col flex-1">

                    <h2 className="text-xl sm:text-2xl font-mersad1 mt-4 leading-snug text-white">
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`bg-linear-to-r ${theme.title} text-transparent bg-clip-text transition-opacity hover:opacity-90`}
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-white/70 mt-4 mb-4 text-sm">{post.excerpt}</p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-auto inline-flex justify-center text-center w-full py-3 px-4 rounded-xl font-semibold text-white bg-linear-to-r from-[#0d1a2d] via-[#13233b] to-[#0f1d31] border border-[#93c5fd]/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                    >
                      სტატიის წაკითხვა
                    </Link>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${theme.color}`} />
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-12 rounded-3xl border border-[#1e3a8a]/30 bg-[#0b1224]/80 p-6 sm:p-8 shadow-[0_16px_36px_rgba(2,6,23,0.55)] backdrop-blur-xl" aria-label="რეგისტრაციისკენ მოწოდება">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-mersad1 text-white">გინდა რეალური შედეგი?</h2>
              <p className="mt-2 text-white/75">
                ახალგაზრდებისთვის: პრაქტიკული კურსები და პროექტები. მშობლებისთვის: მკაფიო გეგმა, პროგრესის კონტროლი და მუდმივი უკუკავშირი.
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

        {!filteredPosts.length && (
          <p className="mt-10 text-white/70" role="status">ამ კატეგორიაში ჯერ სტატია არ არის.</p>
        )}
      </div>
    </section>
  )
}

export default Blogs
