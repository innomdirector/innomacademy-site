const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://innomacademy.ge')
  .trim()
  .replace(/\/+$/, '')

export const siteConfig = {
  siteName: 'INNO M Academy',
  alternateNames: ['ინო ემ აკადემია', 'Inno M Academy'],
  siteUrl: configuredSiteUrl,
  locale: 'ka_GE',
  language: 'ka',
  defaultTitle: 'INNO M Academy | ონლაინ პროგრამირების კურსები ბავშვებისთვის და ზრდასრულებისთვის',
  defaultDescription:
    'INNO M Academy-ში ისწავლი პროგრამირებას, AI-ს და თანამედროვე ტექნოლოგიებს პრაქტიკულად. ონლაინ პროგრამირების კურსები ბავშვებისთვის, მოზარდებისთვის და ზრდასრულებისთვის.',
  defaultImage: '/icon-images/innomlogov2.png',
  defaultImageAlt: 'INNO M Academy',
  defaultRobots: 'index, follow',
  defaultKeywords: [
    'პროგრამირების კურსები',
    'ონლაინ პროგრამირების კურსები',
    'პროგრამირების სწავლა',
    'პროგრამირების კურსები ბავშვებისთვის',
    'პროგრამირების კურსები ზრდასრულებისთვის',
    'ონლაინ სწავლა ბავშვებისთვის',
    'ტექნოლოგიების აკადემია',
    'AI კურსები',
    'ვებ დეველოპმენტის კურსი',
    'ინო ემ აკადემია',
    'INNO M Academy',
  ],
  twitterHandle: '@inno_m_academy',
  contactPhone: '+995 598 19 05 06',
  socialProfiles: [
    'https://www.facebook.com/innomacademy',
    'https://www.instagram.com/inno_m_academy/',
    'https://www.tiktok.com/@inno_m_academy',
  ],
}

export const toAbsoluteUrl = (path = '/') => {
  if (!path) return siteConfig.siteUrl
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
