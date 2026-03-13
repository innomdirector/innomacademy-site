import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaTiktok } from 'react-icons/fa'

const quickLinks = [
  { label: 'მთავარი', to: '/' },
  { label: 'კურსები', to: '/courses' },
  { label: 'ბლოგი', to: '/blog' },
  { label: 'წარმატება', to: '/success' },
  { label: 'კონტაქტი', to: '/contact' },
]

const contacts = [
  {
    label: 'ტელეფონი',
    value: '+995 598 19 05 06',
    href: 'tel:+995598190506',
    icon: FaPhoneAlt,
  },
  {
    label: 'Facebook',
    value: 'INNO M • Academy',
    href: 'https://www.facebook.com/innomacademy',
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    value: '@inno_m_academy',
    href: 'https://www.instagram.com/inno_m_academy/',
    icon: FaInstagram,
  },
  {
    label: 'TikTok',
    value: '@inno_m_academy',
    href: 'https://www.tiktok.com/@inno_m_academy',
    icon: FaTiktok,
  },
]

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#00000076]">
      <div className="max-w-7xl mx-auto px-6 pb-12 pt-16">
        <div className="rounded-3xl border border-white/10 bg-[#0c101d]/90 p-8 shadow-[0_30px_80px_rgba(5,11,30,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#60a5fa] font-semibold font-mersad2">
                <span className="whitespace-nowrap">INNO&nbsp;M</span>
              </p>
              <h3 className="text-3xl font-mersad1 mt-3 text-white">Academy</h3>
              <p className="text-white/70 mt-4 leading-relaxed">
                ისწავლე თანამედროვე ტექნოლოგიები მარტივად და პრაქტიკულად. მიიღე რეალური გამოცდილება და გადააქციე შენი ცოდნა ნამდვილ კარიერულ შესაძლებლობად.
              </p>
            </div>

            <div>
              <h4 className="text-xl text-white font-mersad1">სწრაფი ლინკები</h4>
              <ul className="mt-4 space-y-3 text-white/80 font-mersad2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-[#60a5fa] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl text-white font-mersad1">კონტაქტი</h4>
              <ul className="mt-4 space-y-3">
                {contacts.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-start gap-3 text-white/80 font-mersad2">
                      <span className="mt-1 h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <Icon />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/50">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="hover:text-[#60a5fa] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h4 className="text-xl text-white font-mersad1">საკონტაქტო დრო</h4>
              <div className="mt-4 space-y-4 text-white/80 font-mersad2">
                <p>ორშ-შაბ: 13:00 - 20:00</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[#3b82f6] text-white px-4 py-2 font-semibold hover:bg-[#60a5fa] transition-colors"
                >
                  დაგვიკავშირდი
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-white/60 text-sm font-mersad2 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()}{' '}
              <span className="whitespace-nowrap">INNO&nbsp;M</span> Academy. ყველა უფლება დაცულია.
            </p>
            <p>შექმნილია მომავალი თაობის განვითარებისთვის.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
