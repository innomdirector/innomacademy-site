import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const Faq = () => {
  const [openIds, setOpenIds] = useState([0])

  const items = [
    {
      q: 'შესაძლებელია თუ არა ონლაინ სწავლა?',
      a: 'დიახ. ყველა კურსს აქვს ონლაინ ფორმატი, დასწრება შეგიძლია ნებისმიერი ქალაქიდან.'
    },
    {
      q: 'რატომ არის ონლაინ სწავლა ეფექტური?',
      a: 'ონლაინ სწავლა გაძლევს ლაივ ლექციებზე დასწრების შესაძლებლობას, პირდაპირ კომუნიკაციას ლექტორთან და აქტიურ ჩართულობას პროცესში. ამავე დროს გაქვს ჩანაწერებზე წვდომა და შენზე მორგებული გრაფიკი, რაც საშუალებას გაძლევს იმუშაო შენთვის კომფორტულ ტემპში. შედეგი არის მეტი ეფექტურობა და ნაკლები დროის დაკარგვა.'
    },
    {
      q: 'რა უნარები უნდა მქონდეს დასაწყებად?',
      a: 'კომპიუტერთან ურთიერთობის მცირე გამოცდილება და მოტივაცია. დანარჩენს ეტაპობრივად გასწავლით.'
    },
    {
      q: 'რა აღჭურვილობაა საჭირო?',
      a: 'ლეპტოპი ან კომპიუტერი, სტაბილური ინტერნეტი, მიკროფონი და ყურსასმენები.'
    },
    {
      q: 'რამდენი ლექციაა კვირაში და რა ხანგრძლივობისაა?',
      a: 'სტანდარტულად 2 ლექცია, 2 საათიანი. კონკრეტული კურსის მიხედვით დეტალებს მოგაწვდით.'
    },

    {
      q: 'იქნება თუ არა პრაქტიკული დავალებები?',
      a: 'დიახ. სწავლება პრაქტიკაზეა დაფუძნებული.'
    },
    {
      q: 'შეიძლება თუ არა სასწავლო პროცესის ჩანაწერებზე წვდომა?',
      a: 'დიახ, ჩანაწერებზე წვდომა გაქვს, რომ შეძლო გამეორება.'
    },
  ]

  const toggle = (idx) => {
    setOpenIds((prev) =>
      prev.includes(idx) ? prev.filter((id) => id !== idx) : [...prev, idx]
    )
  }

  return (
    <section className="py-12 md:py-20 font-mersad2 mt-10 md:mt-20" aria-labelledby="faq-title">
      <div className="max-w-7xl mx-auto mt-0">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 id="faq-title" className="text-3xl sm:text-4xl font-mersad1 text-white">
            ხშირად დასმული კითხვები
          </h2>
          <p className="text-white/70 mt-3 max-w-2xl">
            ქვემოთ ნახავთ პასუხებს ყველაზე ხშირად დასმულ კითხვებზე ჩვენს კურსებთან დაკავშირებით.
          </p>
          <div className="mt-6 w-full h-0.5 rounded-full bg-linear-to-r from-[#1e3a8a] via-[#1f2937] to-[#2563eb] mb-12 md:mb-20"></div>
        </motion.div>

        <div className="space-y-4" role="list">
          {items.map((item, idx) => {
            const isOpen = openIds.includes(idx)
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-[#60a5fa]/30 bg-[#0f172a]/60 shadow-[0_10px_24px_rgba(96,165,250,0.10)]"
                role="listitem"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="text-white text-lg font-semibold">
                    {item.q}
                  </span>
                  <span
                    className={`text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    aria-hidden="true"
                  >
                    <FaChevronDown />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`${item.q}-panel`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                      id={`faq-panel-${idx}`}
                    >
                      <div className="px-5 pb-5 text-white/80 leading-relaxed">
                        <div className="rounded-xl border border-[#60a5fa]/15 bg-[#111827]/70 p-4">
                          {item.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
