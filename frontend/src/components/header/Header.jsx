import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const desktopMenuItems = [
  { label: 'მთავარი', to: '/' },
  { label: 'კურსები', to: '/courses' },
  { label: 'ბლოგი', to: '/blog/' },
  { label: 'წარმატება', to: '/success', highlighted: true },
  { label: 'კონტაქტი', to: '/contact' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full pt-3 relative">
      <nav className="max-w-7xl m-auto flex justify-between items-center p-6" aria-label="ძირითადი ნავიგაცია">
        <Link to="/" aria-label="INNO M Academy მთავარი გვერდი">
          <img
            src="/icon-images/INNOM41.png"
            alt="INNO M Academy ლოგო"
            className="w-35 md:w-40"
            width="64"
            height="64"
          />
        </Link>

        <ul className="hidden min-[875px]:flex text-white list-none font-sanet gap-5 text-lg items-center z-20" aria-label="საიტის მთავარი მენიუ">
          {desktopMenuItems.map((item, i) => {
            const linkClass = item.highlighted
              ? 'text-[#f59e0b] font-semibold tracking-wide drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] hover:text-white transition-colors'
              : ''

            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={item.to} className={linkClass}>{item.label}</Link>
              </motion.li>
            )
          })}

          <li>
            <Link
              to="/registration"
              className="text-xl text-[#1892fc] font-sanet backdrop-blur-md rounded-lg hover:text-[#0ea5e9] transition-colors"
            >
              რეგისტრაცია
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="block min-[875px]:hidden text-white text-4xl"
          aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="true"
        >
          <FiMenu />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            aria-label="მობილური ნავიგაცია"
            className="fixed top-0 right-0 h-screen w-64 bg-[#040915f2] border-l border-[#0b2136] z-50 p-6"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white text-4xl mb-6"
              aria-label="მობილური მენიუს დახურვა"
            >
              <FiX />
            </button>

            <ul className="flex flex-col gap-5 text-white text-xl font-sanet" aria-label="მობილური მენიუ">
              {desktopMenuItems.map((item) => (
                <li key={`mobile-${item.label}`}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={item.highlighted ? 'text-[#f59e0b] font-semibold tracking-wide' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/registration"
                  onClick={() => setOpen(false)}
                  className="mt-2 text-[#1892fc] text-xl"
                >
                  რეგისტრაცია
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
