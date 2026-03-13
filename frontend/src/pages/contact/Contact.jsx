import React from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaTiktok, FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import Seo from '../../seo/Seo'
import { toAbsoluteUrl } from '../../seo/siteConfig'

const contactCards = [
  {
    title: 'ტელეფონი',
    value: '+995 598 19 05 06',
    href: 'tel:+995598190506',
    icon: FaPhoneAlt,
    accent: 'from-[#34d399]/35 via-[#22c55e]/25 to-transparent'
  },
  {
    title: 'Facebook',
    value: 'INNO M Academy',
    href: 'https://www.facebook.com/innomacademy',
    icon: FaFacebook,
    accent: 'from-[#60a5fa]/35 via-[#3b82f6]/25 to-transparent'
  },
  {
    title: 'Instagram',
    value: '@inno_m_academy',
    href: 'https://www.instagram.com/inno_m_academy/',
    icon: FaInstagram,
    accent: 'from-[#f59e0b]/40 via-[#f43f5e]/30 to-transparent'
  },
  {
    title: 'TikTok',
    value: '@inno_m_academy',
    href: 'https://www.tiktok.com/@inno_m_academy',
    icon: FaTiktok,
    accent: 'from-[#22d3ee]/35 via-[#0ea5e9]/25 to-transparent'
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 }
  }
}

const Contact = () => {
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'INNO M Academy კონტაქტი',
    description: 'INNO M Academy-ის საკონტაქტო ინფორმაცია და სწრაფი კომუნიკაციის არხები.',
    url: toAbsoluteUrl('/contact'),
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'INNO M Academy',
      url: toAbsoluteUrl('/'),
      telephone: '+995 598 19 05 06',
      sameAs: [
        'https://www.facebook.com/innomacademy',
        'https://www.instagram.com/inno_m_academy/',
        'https://www.tiktok.com/@inno_m_academy',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+995 598 19 05 06',
          contactType: 'customer support',
          areaServed: 'GE',
          availableLanguage: ['ka', 'en'],
        },
      ],
    },
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
        name: 'კონტაქტი',
        item: toAbsoluteUrl('/contact'),
      },
    ],
  }

  return (
    <div className="text-white font-mersad2 mt-8">
      <Seo
        title="კონტაქტი | INNO M Academy"
        description="დაგვიკავშირდი INNO M Academy-ს გუნდს. მიიღე სწრაფი კონსულტაცია კურსების შესახებ."
        path="/contact"
        keywords={['კონტაქტი', 'კურსის კონსულტაცია', 'INNO M Academy']}
        structuredData={[contactStructuredData, breadcrumbStructuredData]}
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm uppercase tracking-[0.35em] text-[#22d3ee] font-semibold">
              კონტაქტი
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mersad1 leading-tight mt-4">
              გინდა სწრაფად <span className="text-[#f59e0b]">დაწყება?</span>
            </h1>
            <p className="text-white/75 text-lg mt-5 leading-relaxed max-w-xl">
              ჩვენთან კონტაქტი ნიშნავს მხარდაჭერას, მიმართულებას და რეალურ გეგმას.
              მოგვწერე ან დაგვირეკე და დაგეხმარებით სწორ არჩევნის გაკეთებაში.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#0f172a]/70 p-5">
                <h3 className="text-lg font-semibold text-white">სამუშაო საათები</h3>
                <p className="text-white/70 mt-2 text-sm">
                  ორშ–შაბ · 13:00 – 20:00
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f172a]/70 p-5">
                <h3 className="text-lg font-semibold text-white">პასუხის დრო</h3>
                <p className="text-white/70 mt-2 text-sm">
                  სწრაფი პასუხი მესიჯზე
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-[#0f172a]/70 p-8">
            <h2 className="text-3xl sm:text-4xl font-mersad1">
              ონლაინ აკადემია: სწრაფი და მარტივი კონტაქტი
            </h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              ჩვენი მთავარი არხები ონლაინია, ამიტომ პასუხს სწრაფად მიიღებ.
              მოგვწერე ან დაგვირეკე, და შენი წარმატების გზა დღესვე გაიხსნება!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] text-sm font-semibold">
                სწრაფი პასუხი
              </div>
              <div className="px-4 py-2 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] text-sm font-semibold">
                ონლაინ კონსულტაცია
              </div>
              <div className="px-4 py-2 rounded-full bg-[#34d399]/15 text-[#34d399] text-sm font-semibold">
                დისტანციური სწავლა
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {contactCards.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-[#0f172a]/75 p-6 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.accent}`} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <a
                    href={item.href}
                    className="text-white/80 mt-2 text-sm inline-block hover:text-[#7dd3fc] transition-colors"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
          className="mt-20"
        >
          <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-[#0f172a]/75 p-8">
            <h2 className="text-3xl sm:text-4xl font-mersad1">
              გსურს სწრაფი კონსულტაცია?
            </h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              მოგვწერე ან დაგვირეკე, ერთად ავაწყობთ მიზნებს, შევარჩევთ სწავლის სტილს
              და დაგეხმარებით პირველი ნაბიჯის გადადგმაში.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] text-sm font-semibold">
                მხარდაჭერა მთელი გზის განმავლობაში
              </div>
              <div className="px-4 py-2 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] text-sm font-semibold">
                ინდივიდუალური რჩევა
              </div>
              <div className="px-4 py-2 rounded-full bg-[#34d399]/15 text-[#34d399] text-sm font-semibold">
                რეალური პროგრესი
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

export default Contact
