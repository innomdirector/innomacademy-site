import React from 'react'
import Hero from '../../components/header/Hero'
import ParallaxHero from '../../components/ParallaxHero/ParallaxHero'
import AdultCourses from '../../components/coursesForAdults/AdultCourses'
import KidsCourses from '../../components/coursesForKids/KidsCourses'
import WhyUs from '../../components/whyUs/WhyUs'
import Faq from '../../components/FAQ/Faq'
import Seo from '../../seo/Seo'
import { siteConfig, toAbsoluteUrl } from '../../seo/siteConfig'
const MainLayout = () => {

  const ambientOverlays = [
    { id: 'ov-1',  className: 'absolute top-[10rem]  left-[6%]  h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' },
    { id: 'ov-2',  className: 'absolute top-[32rem]  right-[12%] h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl' },
    { id: 'ov-3',  className: 'absolute top-[60rem]  left-[22%] h-72 w-72 rounded-full bg-sky-400/10 blur-3xl' },
    { id: 'ov-4',  className: 'absolute top-[92rem]  right-[18%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/10 blur-3xl' },
    { id: 'ov-5',  className: 'absolute top-[124rem] left-[8%]  h-96 w-96 rounded-full bg-blue-400/10 blur-3xl' },
    { id: 'ov-6',  className: 'absolute top-[156rem] right-[14%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl' },
    { id: 'ov-7',  className: 'absolute top-[188rem] left-[28%] h-80 w-80 rounded-full bg-indigo-400/9 blur-3xl' },
    { id: 'ov-8',  className: 'absolute top-[224rem] right-[22%] h-96 w-96 rounded-full bg-sky-400/9 blur-3xl' },
    { id: 'ov-9',  className: 'absolute top-[260rem] left-[10%] h-72 w-72 rounded-full bg-blue-500/9 blur-3xl' },
    { id: 'ov-10', className: 'absolute top-[320rem] right-[12%] h-80 w-80 rounded-full bg-cyan-400/9 blur-3xl' },
    { id: 'ov-11', className: 'absolute top-[390rem] left-[20%] h-96 w-96 rounded-full bg-indigo-500/9 blur-3xl' },
    { id: 'ov-12', className: 'absolute top-[480rem] right-[22%] h-80 w-80 rounded-full bg-sky-300/9 blur-3xl' },
  ]

  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      description: siteConfig.defaultDescription,
      logo: toAbsoluteUrl('/icon-images/innomlogov2.png'),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.contactPhone,
          contactType: 'customer support',
          areaServed: 'GE',
          availableLanguage: ['ka', 'en'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/innomacademy',
        'https://www.instagram.com/inno_m_academy/',
        'https://www.tiktok.com/@inno_m_academy',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      url: siteConfig.siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      inLanguage: 'ka-GE',
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="INNO M Academy | პროგრამირების და ტექნოლოგიების ონლაინ კურსები"
        description="ისწავლე პროგრამირება, AI და თანამედროვე ტექნოლოგიები პრაქტიკულად INNO M Academy-ში. კურსები ბავშვებისთვის და ზრდასრულებისთვის."
        path="/"
        keywords={[
          'პროგრამირების კურსები',
          'ონლაინ აკადემია',
          'AI კურსი',
          'ვებ დეველოპმენტი',
          'INNO M Academy',
        ]}
        structuredData={homeStructuredData}
      />
      <div aria-hidden="true">
        {ambientOverlays.map((overlay) => (
          <div key={overlay.id} className={`pointer-events-none z-0 ${overlay.className}`} />
        ))}
      </div>
      <section className="relative z-10 max-w-7xl m-auto px-6" aria-label="INNO M Academy მთავარი შინაარსი">
        <section id="hero" aria-label="მთავარი ჰერო სექცია">
          <Hero />
        </section>
        <section id="why-us" aria-label="რატომ INNO M">
          <WhyUs />
        </section>
        <section id="parallax" aria-label="პარალაქს სექცია">
          <ParallaxHero />
        </section>
        <section id="adult-courses-section" aria-label="კურსები ზრდასრულებისთვის">
          <AdultCourses />
        </section>
        <section id="kids-courses-section" aria-label="კურსები ბავშვებისთვის">
          <KidsCourses />
        </section>
        <section id="faq" aria-label="ხშირად დასმული კითხვები">
          <Faq />
        </section>
      </section>
    </div>
  )
}

export default MainLayout
