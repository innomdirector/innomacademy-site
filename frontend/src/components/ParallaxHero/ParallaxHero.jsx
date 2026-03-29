import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiCode, FiCpu, FiZap } from 'react-icons/fi'

const binaryColumns = [
  '1010011101011001010110010110100',
  '0101110010101110010101110010111',
  '1110001010101011100010101010111',
  '0010111001010010111001010010111',
  '1101010010110101001011010100101',
  '1011100101001110010100111001010',
  '0110101001101010011010100110101',
]

const signalCards = [
  { icon: <FiCode className="text-[#00c2fd]" />, label: 'პრაქტიკა' },
  { icon: <FiCpu className="text-[#00c2fd]" />, label: 'AI' },
  { icon: <FiZap className="text-[#00c2fd]" />, label: 'სწრაფი პროგრესი' },
]

export default function ParallaxHero() {
  return (
    <section className="relative mt-10 md:mt-20 overflow-hidden rounded-3xl border border-[#94a3b8]/16 bg-[#05070d] px-6 py-10 sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#000c1b]/20 via-[#111827]/40 to-[#1f2937]/70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.012) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center rounded-full border border-[#38bdf8]/55 bg-[#0ea5e9]/12 px-3 py-1 text-xs font-bold tracking-[0.4em] text-[#dbeafe]"
          >
            CODE X AI
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 text-3xl font-mersad1 leading-tight text-white sm:text-4xl"
          >
            კოდი, იდეა და პროგრესი.
            <br />
            გაასწარი დროს ჩვენთან ერთად!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg"
          >
            თუ გინდა თანამედროვე ტექნოლოგიების სწავლა მარტივად და გასაგებად, ეს
            აკადემია შენთვისაა. დაათვალიერე კურსები, ნახე რომელი მიმართულება მოგეწონება
            და ისწავლე ჩვენთან.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            {['Code გარემო', 'AI ხედვა', 'პრაქტიკული სწავლა', 'შემდეგი ნაბიჯი'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#38bdf8]/35 bg-[#0f172a]/85 px-3 py-1 text-xs font-semibold tracking-wide text-white/90"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/courses"
              className="duration-300 rounded-xl border border-[#38bdf8]/55 bg-linear-to-r from-[#2563eb] to-[#0ea5e9] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(14,165,233,0.55)] transition-transform hover:-translate-y-0.5"
            >
              კურსების ნახვა
            </Link>
            <Link
              to="/registration"
              className="rounded-xl border border-white/20 bg-[#111827]/80 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-[#22d3ee]/55 hover:text-white"
            >
              რეგისტრაცია
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#7dd3fc]"
          >
            <span>გააგრძელე სქროლი ქვემოთ</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowDown />
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#334155]/65 bg-[#00090c]/90 p-5 shadow-[0_20px_44px_-18px_rgba(2,6,23,0.95)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.3)_0%,rgba(2,6,23,0.85)_100%)]" />

            <div className="absolute inset-0 opacity-45">
              {binaryColumns.map((bits, idx) => (
                <motion.p
                  key={`bits-${idx}`}
                  initial={{ y: -130 }}
                  animate={{ y: [0, 360] }}
                  transition={{
                    duration: 6 + idx * 0.65,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: idx * 0.2,
                  }}
                  className="absolute top-0 text-[11px] leading-4 tracking-[0.18em] text-[#22d3ee]/70"
                  style={{ left: `${8 + idx * 13}%` }}
                >
                  {bits}
                </motion.p>
              ))}
            </div>

            <div className="relative z-10 rounded-xl border border-[#22d3ee]/30 bg-[#0b1220]/85 p-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                <span className="ml-2 text-xs text-white/55">terminal://innom-start</span>
              </div>
              <div className="space-y-1 font-mono text-[12px] leading-5 sm:text-[13px]">
                <p className="text-[#93c5fd]">$ start --path tech</p>
                <p className="text-[#38bdf8]">learning mode...ready</p>
                <p className="text-[#22d3ee]">next step...active</p>
                <p className="text-[#ff9305]">result: ცოდნა + პრაქტიკა + თავდაჯერება</p>
              </div>
            </div>

            <motion.img
              src="/parallaxsectionimages/gemini1.webp"
              alt="AI ვიზუალური ფონი"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="absolute -right-3 top-6 h-26 w-26 rounded-xl border border-[#60a5fa]/60 object-cover shadow-[0_14px_28px_-16px_rgba(59,130,246,0.55)]"
            />
            <motion.img
              src="/parallaxsectionimages/gemini2.webp"
              alt="კოდის წვიმის ფონი"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="absolute -bottom-4 left-4 h-24 w-36 rounded-xl border border-[#22d3ee]/55 object-cover shadow-[0_14px_28px_-16px_rgba(34,211,238,0.6)]"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {signalCards.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.12 + idx * 0.08 }}
                className="rounded-xl border border-white/15 bg-[#0f172a]/80 p-3 text-center"
              >
                <div className="mb-1.5 flex justify-center text-lg">{item.icon}</div>
                <p className="text-xs font-semibold text-white/85">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
