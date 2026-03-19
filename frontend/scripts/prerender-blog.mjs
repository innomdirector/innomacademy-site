import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')

const siteUrl = (process.env.VITE_SITE_URL || 'https://innomacademy.ge')
  .trim()
  .replace(/\/+$/, '')

const escapeHtml = (value = '') => (
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
)

const escapeJsonLd = (value = '') => (
  String(value).replace(/</g, '\\u003c')
)

const toAbsoluteUrl = (route = '/') => (
  `${siteUrl}${route.startsWith('/') ? route : `/${route}`}`
)

const replaceTagContent = (html, regex, replacement) => (
  regex.test(html) ? html.replace(regex, replacement) : html
)

const upsertMetaByName = (html, name, content) => {
  const escaped = escapeHtml(content)
  const regex = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i')
  const nextTag = `<meta name="${name}" content="${escaped}" data-prerender-seo="true" />`

  if (regex.test(html)) {
    return html.replace(regex, nextTag)
  }
  return html.replace('</head>', `  ${nextTag}\n</head>`)
}

const upsertMetaByProperty = (html, property, content) => {
  const escaped = escapeHtml(content)
  const regex = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i')
  const nextTag = `<meta property="${property}" content="${escaped}" data-prerender-seo="true" />`

  if (regex.test(html)) {
    return html.replace(regex, nextTag)
  }
  return html.replace('</head>', `  ${nextTag}\n</head>`)
}

const upsertCanonical = (html, canonicalUrl) => {
  const escaped = escapeHtml(canonicalUrl)
  const regex = /<link\s+rel=["']canonical["'][^>]*>/i
  const nextTag = `<link rel="canonical" href="${escaped}" data-prerender-seo="true" />`

  if (regex.test(html)) {
    return html.replace(regex, nextTag)
  }
  return html.replace('</head>', `  ${nextTag}\n</head>`)
}

const cleanupJsonLd = (html) => (
  html.replace(/\s*<script type="application\/ld\+json" data-prerender-jsonld="true">[\s\S]*?<\/script>/g, '')
)

const injectJsonLd = (html, values = []) => {
  if (!values.length) return html
  const scripts = values
    .map((value) => `  <script type="application/ld+json" data-prerender-jsonld="true">${escapeJsonLd(JSON.stringify(value))}</script>`)
    .join('\n')
  return html.replace('</head>', `${scripts}\n</head>`)
}

const renderInlineHighlights = (paragraph = '') => {
  const parts = String(paragraph).split(/(\*\*[^*]+\*\*)/g)
  return parts
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`
      }
      return escapeHtml(part)
    })
    .join('')
}

const blogIndexBody = (posts) => {
  const cards = posts.map((post) => (
    `<article style="border:1px solid #253146;border-radius:16px;padding:16px;margin:0 0 14px 0;background:#0f172a;">
      <h2 style="margin:0 0 8px 0;font-size:1.1rem;color:#dbeafe;">
        <a href="/blog/${escapeHtml(post.slug)}/" style="color:#dbeafe;text-decoration:none;">${escapeHtml(post.title)}</a>
      </h2>
      <p style="margin:0 0 8px 0;color:#cbd5e1;line-height:1.6;">${escapeHtml(post.excerpt)}</p>
      <p style="margin:0;color:#94a3b8;font-size:0.9rem;">${escapeHtml(post.publishedAt)} • ${escapeHtml(String(post.readingMinutes))} წთ</p>
    </article>`
  )).join('\n')

  return `<main style="max-width:900px;margin:0 auto;padding:32px 20px;color:#e2e8f0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <h1 style="font-size:2rem;margin:0 0 12px 0;color:#ffffff;">INNO M Academy Blog</h1>
  <p style="margin:0 0 24px 0;color:#cbd5e1;line-height:1.7;">პროგრამირების, AI-ს, მშობლების და ახალგაზრდების თემებზე პრაქტიკული სტატიები.</p>
  ${cards}
</main>`
}

const blogPostBody = (post) => {
  const sectionsHtml = post.sections.map((section) => (
    `<section style="margin:24px 0;padding:18px;border-radius:16px;background:#111827;border:1px solid #243043;">
      <h2 style="margin:0 0 10px 0;font-size:1.2rem;color:#bfdbfe;">${escapeHtml(section.heading)}</h2>
      ${section.paragraphs.map((paragraph) => (
        `<p style="margin:0 0 12px 0;line-height:1.8;color:#d1d5db;">${renderInlineHighlights(paragraph)}</p>`
      )).join('\n')}
    </section>`
  )).join('\n')

  return `<main style="max-width:940px;margin:0 auto;padding:32px 20px;color:#e2e8f0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <p style="margin:0 0 12px 0;"><a href="/blog/" style="color:#93c5fd;text-decoration:none;">← ბლოგზე დაბრუნება</a></p>
  <h1 style="font-size:2rem;line-height:1.25;margin:0 0 10px 0;color:#ffffff;">${escapeHtml(post.title)}</h1>
  <p style="margin:0 0 10px 0;color:#93c5fd;font-size:0.92rem;">${escapeHtml(post.publishedAt)} • ${escapeHtml(String(post.readingMinutes))} წთ</p>
  <p style="margin:0 0 18px 0;line-height:1.75;color:#cbd5e1;">${escapeHtml(post.excerpt)}</p>
  ${sectionsHtml}
</main>`
}

const applySeo = (templateHtml, page) => {
  let html = templateHtml

  html = replaceTagContent(html, /<html[^>]*lang=["'][^"']*["'][^>]*>/i, '<html lang="ka">')
  html = replaceTagContent(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)

  html = upsertMetaByName(html, 'description', page.description)
  html = upsertMetaByName(html, 'robots', 'index, follow')
  html = upsertMetaByName(html, 'twitter:card', 'summary_large_image')
  html = upsertMetaByName(html, 'twitter:title', page.title)
  html = upsertMetaByName(html, 'twitter:description', page.description)
  html = upsertMetaByName(html, 'twitter:image', page.image)
  if (page.keywords) {
    html = upsertMetaByName(html, 'keywords', page.keywords)
  }

  html = upsertMetaByProperty(html, 'og:type', page.ogType || 'website')
  html = upsertMetaByProperty(html, 'og:site_name', 'INNO M Academy')
  html = upsertMetaByProperty(html, 'og:locale', 'ka_GE')
  html = upsertMetaByProperty(html, 'og:title', page.title)
  html = upsertMetaByProperty(html, 'og:description', page.description)
  html = upsertMetaByProperty(html, 'og:url', page.canonical)
  html = upsertMetaByProperty(html, 'og:image', page.image)

  if (page.publishedTime) {
    html = upsertMetaByProperty(html, 'article:published_time', page.publishedTime)
  }
  if (page.modifiedTime) {
    html = upsertMetaByProperty(html, 'article:modified_time', page.modifiedTime)
  }

  html = upsertCanonical(html, page.canonical)
  html = cleanupJsonLd(html)
  html = injectJsonLd(html, page.structuredData || [])
  html = html.replace('<div id="root"></div>', `<div id="root">${page.bodyHtml}</div>`)

  return html
}

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true })
}

const writePage = async (route, html) => {
  const normalized = route.replace(/^\/+/, '')
  const outputDir = path.join(distDir, normalized)
  await ensureDir(outputDir)
  await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8')
}

const buildBlogStructuredData = (posts) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'INNO M Academy Blog',
  description: 'პროგრამირების, AI-ს და ტექნოლოგიური მომავლის პრაქტიკული სტატიები ქართულ ენაზე.',
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: toAbsoluteUrl(post.cardImage || post.coverImage || '/icon-images/innomlogov2.png'),
    url: toAbsoluteUrl(`/blog/${post.slug}/`),
  })),
})

const buildArticleStructuredData = (post) => ({
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
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/icon-images/innomlogov2.png'),
    },
  },
  mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}/`),
  description: post.excerpt,
  image: toAbsoluteUrl(post.coverImage || '/icon-images/innomlogov2.png'),
})

const buildBreadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
})

const run = async () => {
  const templateHtml = await fs.readFile(templatePath, 'utf8')
  const blogModule = await import(pathToFileURL(path.join(projectRoot, 'src/pages/blog/blogPosts.js')).href)
  const posts = Array.isArray(blogModule.blogPosts) ? blogModule.blogPosts : []

  const blogPageSeo = {
    title: 'ბლოგი | INNO M Academy',
    description: 'პროგრამირების, AI-ს, მშობლების და ახალგაზრდების თემებზე პრაქტიკული სტატიები.',
    canonical: toAbsoluteUrl('/blog/'),
    image: toAbsoluteUrl('/icon-images/innomlogov2.png'),
    keywords: 'ბლოგი, პროგრამირება, AI, მშობლებისთვის, ახალგაზრდებისთვის',
    ogType: 'website',
    structuredData: [
      buildBlogStructuredData(posts),
      buildBreadcrumb([
        { name: 'მთავარი', url: toAbsoluteUrl('/') },
        { name: 'ბლოგი', url: toAbsoluteUrl('/blog/') },
      ]),
    ],
    bodyHtml: blogIndexBody(posts),
  }

  await writePage('/blog', applySeo(templateHtml, blogPageSeo))

  for (const post of posts) {
    const route = `/blog/${post.slug}`
    const pageSeo = {
      title: `${post.title} | INNO M Academy`,
      description: post.excerpt,
      canonical: toAbsoluteUrl(`${route}/`),
      image: toAbsoluteUrl(post.coverImage || '/icon-images/innomlogov2.png'),
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : '',
      ogType: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      structuredData: [
        buildArticleStructuredData(post),
        buildBreadcrumb([
          { name: 'მთავარი', url: toAbsoluteUrl('/') },
          { name: 'ბლოგი', url: toAbsoluteUrl('/blog/') },
          { name: post.title, url: toAbsoluteUrl(`${route}/`) },
        ]),
      ],
      bodyHtml: blogPostBody(post),
    }

    await writePage(route, applySeo(templateHtml, pageSeo))
  }

  console.log(`Prerender completed for ${posts.length + 1} routes.`)
}

run().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
