import { useEffect } from 'react'
import { siteConfig, toAbsoluteUrl } from './siteConfig'

const upsertMetaByName = (name, content) => {
  if (!name || typeof content !== 'string') return
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    tag.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const upsertMetaByProperty = (property, content) => {
  if (!property || typeof content !== 'string') return
  let tag = document.head.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    tag.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const removeMetaByProperty = (property) => {
  const tag = document.head.querySelector(`meta[property="${property}"]`)
  if (tag && tag.getAttribute('data-seo-managed') === 'true') {
    tag.remove()
  }
}

const removeMetaByName = (name) => {
  const tag = document.head.querySelector(`meta[name="${name}"]`)
  if (tag && tag.getAttribute('data-seo-managed') === 'true') {
    tag.remove()
  }
}

const upsertCanonical = (href) => {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', href)
}

const removeManagedJsonLd = () => {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-seo-jsonld="true"]')
    .forEach((tag) => tag.remove())
}

const appendJsonLd = (value) => {
  if (!value) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', 'true')
  script.text = JSON.stringify(value).replace(/</g, '\\u003c')
  document.head.appendChild(script)
}

function Seo({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  keywords = [],
  noindex = false,
  structuredData,
}) {
  useEffect(() => {
    const nextTitle = title || siteConfig.defaultTitle
    const nextDescription = description || siteConfig.defaultDescription
    const canonicalUrl = toAbsoluteUrl(path)
    const ogImage = toAbsoluteUrl(image || siteConfig.defaultImage)
    const nextImageAlt = imageAlt || siteConfig.defaultImageAlt
    const keywordsContent = Array.isArray(keywords) && keywords.length
      ? keywords.filter(Boolean).join(', ')
      : siteConfig.defaultKeywords.join(', ')
    const robotsContent = noindex ? 'noindex, nofollow' : siteConfig.defaultRobots

    document.title = nextTitle
    document.documentElement.lang = siteConfig.language

    upsertMetaByName('description', nextDescription)
    upsertMetaByName('author', siteConfig.siteName)
    upsertMetaByName('application-name', siteConfig.siteName)
    upsertMetaByName('format-detection', 'telephone=no')
    upsertMetaByName('robots', robotsContent)
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:site', siteConfig.twitterHandle)
    upsertMetaByName('twitter:url', canonicalUrl)
    upsertMetaByName('twitter:title', nextTitle)
    upsertMetaByName('twitter:description', nextDescription)
    upsertMetaByName('twitter:image', ogImage)
    upsertMetaByName('twitter:image:alt', nextImageAlt)
    upsertMetaByName('keywords', keywordsContent)

    upsertMetaByProperty('og:type', ogType)
    upsertMetaByProperty('og:site_name', siteConfig.siteName)
    upsertMetaByProperty('og:locale', siteConfig.locale)
    upsertMetaByProperty('og:title', nextTitle)
    upsertMetaByProperty('og:description', nextDescription)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', ogImage)
    upsertMetaByProperty('og:image:alt', nextImageAlt)
    if (publishedTime) {
      upsertMetaByProperty('article:published_time', publishedTime)
    } else {
      removeMetaByProperty('article:published_time')
    }
    if (modifiedTime) {
      upsertMetaByProperty('article:modified_time', modifiedTime)
    } else {
      removeMetaByProperty('article:modified_time')
    }

    upsertCanonical(canonicalUrl)

    removeManagedJsonLd()
    if (Array.isArray(structuredData)) {
      structuredData.forEach((item) => appendJsonLd(item))
    } else if (structuredData) {
      appendJsonLd(structuredData)
    }
  }, [title, description, path, image, imageAlt, ogType, publishedTime, modifiedTime, keywords, noindex, structuredData])

  return null
}

export default Seo
