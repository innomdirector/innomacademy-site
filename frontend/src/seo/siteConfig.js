const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://innomacademy.ge')
  .trim()
  .replace(/\/+$/, '')

export const siteConfig = {
  siteName: 'INNO M Academy',
  siteUrl: configuredSiteUrl,
  locale: 'ka_GE',
  language: 'ka',
  defaultTitle: 'INNO M Academy | პროგრამირების და თანამედროვე ტექნოლოგიების ონლაინ კურსები',
  defaultDescription:
    'INNO M Academy-ში შეისწავლი პროგრამირებას, AI-ს და თანამედროვე ტექნოლოგიებს პრაქტიკულად. ონლაინ კურსები ბავშვებისთვის და ზრდასრულებისთვის.',
  defaultImage: '/icon-images/innomlogov2.png',
  defaultImageAlt: 'INNO M Academy',
  defaultRobots: 'index, follow',
  defaultKeywords: [
    'პროგრამირების კურსები',
    'ტექნოლოგიების აკადემია',
    'AI კურსები',
    'ონლაინ სწავლა',
    'INNO M Academy',
  ],
  twitterHandle: '@inno_m_academy',
  contactPhone: '+995 598 19 05 06',
}

export const toAbsoluteUrl = (path = '/') => {
  if (!path) return siteConfig.siteUrl
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
