import React from 'react'
import { FaCode } from "react-icons/fa";
import { Link } from 'react-router-dom';
const WhyUs = () => {
  const benefits = [
    {
      title: 'პროექტების პორტფოლიო',
      text: 'კურსის ბოლოს შექმნი პროექტებს, რომელსაც აჩვენებ კომპანიას ან კლიენტს.',
      tag: 'პორტფოლიო',
      accent: 'from-[#1e40af]/26 via-transparent to-transparent',
      glow: 'bg-[#1e40af]/20'
    },
    {
      title: 'გზა კარიერამდე',
      text: 'სასურველი მიმართულების გზამკვლევი ეტაპობრივად და გასაგებად გექნება დალაგებული.',
      tag: 'გზამკვლევი',
      accent: 'from-[#2563eb]/24 via-transparent to-transparent',
      glow: 'bg-[#2563eb]/20'
    },
    {
      title: 'აქტუალური ცოდნა',
      text: 'ისწავლი იმ ტექნოლოგიებს, რასაც დღეს რეალურად იყენებს ინდუსტრია.',
      tag: 'აქტუალური',
      accent: 'from-[#0ea5e9]/20 via-transparent to-transparent',
      glow: 'bg-[#0ea5e9]/18'
    },
    {
      title: 'სწავლის მოტივაცია',
      text: 'გამოწვევები, გუნდური დავალებები და პროგრესის მკაფიო კონტროლი მუდმივად გაძლევს ტემპს.',
      tag: 'დინამიკა',
      accent: 'from-[#3b82f6]/22 via-transparent to-transparent',
      glow: 'bg-[#3b82f6]/18'
    },
    {
      title: 'სრული მზადყოფნა',
      text: 'კურსის დასრულების შემდეგაც თავისუფლად გამოიყენებ მიღებულ ცოდნას და მზად იქნები პრაქტიკისთვის.',
      tag: 'მზადყოფნა',
      accent: 'from-[#1d4ed8]/22 via-transparent to-transparent',
      glow: 'bg-[#1d4ed8]/18'
    },
    {
      title: 'გრძელვადიანი მხარდაჭერა',
      text: 'შენი და მენტორის ურთიერთობა არ მთავრდება კურსის დასრულებით. ყოველთვის შეგიძლია მოგვმართო რჩევისთვის.',
      tag: 'მხარდაჭერა',
      accent: 'from-[#0f52ba]/20 via-transparent to-transparent',
      glow: 'bg-[#0f52ba]/18'
    }
  ]

  const learningSteps = [
    {
      title: 'საფუძვლების გამართვა',
      text: 'იწყებ სწორად დალაგებული თემებით, გარემოს გამართვით და პირველივე დღიდან პრაქტიკული დავალებებით.'
    },
    {
      title: 'თეორია + პრაქტიკა',
      text: 'ყოველი ახალი თემა მიბმულია რეალურ მაგალითებზე, სავარჯიშოებზე და მენტორის განმარტებებზე.'
    },
    {
      title: 'პროექტებზე გადასვლა',
      text: 'შუალედურ ეტაპზე უკვე აგებ დამოუკიდებელ ფუნქციონალს და სწავლობ როგორ იფიქრო როგორც დეველოპერმა.'
    },
    {
      title: 'სრული მზადყოფნა',
      text: 'ფინალში აწყობ სრულ პროექტს, იღებ უკუკავშირს და ემზადები პორტფოლიოსა და კარიერის შემდეგი ნაბიჯისთვის.'
    }
  ]

  return (
    <section className="min-h-screen font-mersad2 py-12 md:py-16 mt-10 md:mt-20" aria-labelledby="whyus-title">
      <div className="max-w-7xl mx-auto">
        <h2 id="whyus-title" className="mb-6 text-2xl font-mersad1 leading-tight text-white sm:text-3xl md:mt-10 md:text-4xl md:leading-normal">
          რატომ არის <span className="text-[#22d3ee]">INNO M</span> საუკეთესო აკადემია?
        </h2>
        <div className="w-full h-0.5 rounded-full bg-linear-to-r from-[#1e3a8a] via-[#1f2937] to-[#2563eb] mb-12 md:mb-20"></div>
        <section className="grid lg:grid-cols-2 gap-10 items-center" aria-labelledby="whyus-subtitle">
          <div>
            <h3 id="whyus-subtitle" className="text-2xl font-mersad1 leading-tight text-white sm:text-3xl md:text-4xl">
              აქ სწავლა არის გზა დიდი მიზნებისკენ და არა უბრალოდ კურსი.
            </h3>
            <p className="mt-6 text-sm leading-7 text-white/80 sm:text-base md:text-lg">
              ჩვენთან სწავლა არის პრაქტიკული გამოცდილება, პროექტები და მენტორების მხარდაჭერა.
              შედეგი ყოველთვის ხელშესახებია: ცოდნა, ნამუშევრები და თავდაჯერებულობა, რომ დაიწყო.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 list-none p-0 m-0" aria-label="სწავლის უპირატესობები">
              <li className="rounded-full border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.08)] px-4 py-2 text-xs text-white/80 transition-colors hover:border-[rgba(37,99,235,0.7)] sm:px-5 sm:py-3 sm:text-sm">პროექტებზე დაფუძნებული სწავლება</li>
              <li className="rounded-full border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.08)] px-4 py-2 text-xs text-white/80 transition-colors hover:border-[rgba(37,99,235,0.7)] sm:px-5 sm:py-3 sm:text-sm">მენტორების მუდმივი მხარდაჭერა</li>
              <li className="rounded-full border border-[rgba(37,99,235,0.35)] bg-[rgba(37,99,235,0.08)] px-4 py-2 text-xs text-white/80 transition-colors hover:border-[rgba(37,99,235,0.7)] sm:px-5 sm:py-3 sm:text-sm">კარიერული მიმართულება</li>
            </ul>
            <Link to="/registration">
              <button className="mt-10 rounded-[10px] px-8 py-3.5 font-semibold text-white bg-[linear-gradient(135deg,#1e3a8a,#2563eb)] shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-300 ease hover:brightness-110 hover:-translate-y-0.5">
                დაიწყე სწავლა
              </button>
            </Link>
          </div>

          <figure className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_center,rgba(37,99,235,0.14)_0%,transparent_70%)]"></div>
            <div className="relative bg-transparent">
              <img
                src="/whyus/innoboy.jpg"
                alt="Mentor teaching students in modern classroom"
                className="w-full object-cover opacity-70 rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="sr-only">INNO M Academy სტუდენტი პრაქტიკულ სწავლებაში</figcaption>
          </figure>
        </section>

        <section className="mt-12 md:mt-20" aria-label="სასწავლო მეტრიკები">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none p-0 m-0">
          {[
            { value: '100%', label: 'პრაქტიკაზე ორიენტირებული' },
            { value: '24/7', label: 'მენტორის მხარდაჭერა' },
            { value: '98%', label: 'კმაყოფილი სტუდენტი' },
            { value: '∞', label: 'პროექტების იდეები' }
          ].map((stat, idx) => (
            <li
              key={stat.label}
              className="rounded-2xl border border-[rgba(0,212,255,0.2)] bg-[rgba(255,255,255,0.04)] p-4 text-center backdrop-blur-md shadow-[0_10px_28px_rgba(0,212,255,0.12)]"
            >
              <div className="text-2xl font-bold text-[#60a5fa] sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-white/85 sm:text-sm">{stat.label}</div>
            </li>
          ))}
          </ul>
        </section>

        <section className="mt-16 md:mt-40" aria-labelledby="benefits-title">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 id="benefits-title" className="text-2xl font-mersad1 text-white sm:text-3xl">რას მიიღებ ჩვენთან?</h2>
              <p className="mt-2 text-sm text-white/75 sm:text-base">რასაც ვერ გაძლევს სტანდარტული კურსი!</p>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-10">
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-[#22d3ee]/35 to-transparent"></div>
              <div className="absolute top-1/2 left-10 right-10 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-[#22d3ee]/25 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22d3ee]/12 blur-3xl"></div>
            </div>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 list-none p-0 m-0">
              {benefits.map((item, idx) => (
                <li key={item.title} className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#091426]/85 p-5 shadow-[0_20px_50px_rgba(4,10,24,0.45)] backdrop-blur-xl transition-all duration-300 ease hover:-translate-y-1 hover:border-[rgba(37,99,235,0.35)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.14)] sm:p-6 flex flex-col">
                    <div className={`absolute inset-0 bg-linear-to-br ${item.accent}`}></div>
                    <div className={`absolute -right-6 top-6 h-20 w-20 rounded-full blur-3xl ${item.glow}`}></div>
                    <div className="absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/22 to-transparent"></div>
                    <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent"></div>

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#22d3ee]/35 bg-[#0d1c31] text-[#67e8f9] shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                          <div className="absolute h-2.5 w-2.5 rounded-full bg-[#67e8f9] shadow-[0_0_18px_rgba(103,232,249,0.95)]"></div>
                          <FaCode className="relative z-10 text-xs" />
                        </div>
                        <span className="mt-1 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/72 sm:text-[11px]">
                          {item.tag}
                        </span>
                      </div>
                      <span className="text-xs font-semibold tracking-[0.3em] text-[#7dd3fc]/80">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="relative mt-6 flex-1">
                      <h3 className="text-lg font-semibold text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[32ch] text-sm leading-7 text-white/74 sm:text-base">
                        {item.text}
                      </p>
                    </div>

                    <div className="relative mt-6 flex items-center gap-3">
                      <div className="h-px flex-1 bg-linear-to-r from-[#22d3ee]/30 to-transparent"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-[#67e8f9]/90 shadow-[0_0_18px_rgba(103,232,249,0.9)]"></div>
                      <div className="h-px w-10 bg-linear-to-r from-white/20 to-transparent"></div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 md:mt-20 rounded-4xl border border-[#22d3ee]/20 bg-linear-to-r from-[#1f2937]/20 via-[#111827]/40 to-[#1f2937]/70 px-6 py-8 sm:px-8 lg:px-10 lg:py-10 shadow-[0_18px_60px_rgba(7,19,38,0.45)]" aria-labelledby="roadmap-title">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div className="lg:pr-4">
              <p className="text-[#7dd3fc] text-xs sm:text-sm tracking-[0.35em] uppercase">
                INNO M Roadmap
              </p>
              <h2 id="roadmap-title" className="mt-4 text-2xl font-mersad1 leading-tight text-white sm:text-3xl lg:text-4xl">
                სწავლა ნაბიჯ-ნაბიჯ
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base md:text-lg md:leading-8">
                თითოეული ეტაპი ისეა დალაგებული, რომ ზუსტად იცოდე რას სწავლობ, რას აშენებ და როგორ გადადიხარ შემდეგ დონეზე.
              </p>

              <figure className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#22d3ee]/35 bg-[#0a1426] shadow-[0_22px_60px_rgba(7,19,38,0.42)] lg:mt-14">
                <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-[#22d3ee]/20 blur-3xl"></div>
                <div className="absolute -left-8 bottom-12 h-24 w-24 rounded-full bg-[#2563eb]/20 blur-3xl"></div>
                <div className="absolute inset-0 bg-linear-to-tr from-[#22d3ee]/12 via-transparent to-[#60a5fa]/10"></div>
                <img
                  src="/whyus/heropresentation.jpg"
                  alt="Students presenting a tech project on a screen"
                  className="h-72 sm:h-80 md:h-80 lg:h-120 xl:h-134 w-full object-cover object-center opacity-85"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute left-5 top-4 rounded-full border border-white/15 bg-[#081a31]/70 px-4 py-2 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#67e8f9] mt-1">
                    Project Based
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#071326] via-[#071326]/75 to-transparent p-5 sm:p-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#67e8f9] sm:text-sm sm:tracking-[0.3em]">
                    რეალური პროგრესი
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white sm:text-base md:text-lg md:leading-7">
                    ყოველი საფეხური გაძლევს შედეგს, რომელსაც შემდეგ ეტაპზე პირდაპირ იყენებ.
                  </p>
                </div>
                <figcaption className="sr-only">სწავლის პროცესის ვიზუალური წარმოდგენა</figcaption>
              </figure>
            </div>

            <div className="relative pt-2 sm:pt-4">
              <div className="absolute left-[1.18rem] top-7 bottom-7 w-px bg-linear-to-b from-transparent via-[#22d3ee]/70 to-transparent sm:left-6"></div>
              <ol className="space-y-6 sm:space-y-7 list-none p-0 m-0" aria-label="სწავლის ნაბიჯები">
                {learningSteps.map((step, index) => (
                  <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-4 sm:gap-6 items-start">
                    <div className="relative flex items-start justify-center pt-1">
                      <div className="absolute top-3 h-14 w-14 rounded-full bg-[#22d3ee]/30 blur-2xl"></div>
                      <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#22d3ee]/60 bg-[#050d10] text-[#67e8f9] shadow-[0_0_22px_rgba(34,211,238,0.25)]">
                        <FaCode className="text-sm sm:text-base" />
                      </div>
                      <div className="absolute top-4 sm:top-5 h-3.5 w-3.5 rounded-full bg-[#67e8f9] shadow-[0_0_18px_rgba(103,232,249,0.95)]"></div>
                    </div>

                    <div className="rounded-3xl border border-white/8 bg-[#040f1e2f] px-4 py-4 sm:px-6 sm:py-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-semibold tracking-[0.24em] text-[#7dd3fc] sm:text-xs sm:tracking-[0.3em]">
                          0{index + 1}
                        </span>
                        <h3 className="text-base font-semibold text-white sm:text-lg md:text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-xs leading-6 text-white/72 sm:text-sm md:text-base md:leading-7">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mt-12 md:mt-20" aria-labelledby="whyus-cta-title">
          <div className="rounded-3xl border border-[#22d3ee]/30 bg-linear-to-r from-[#1f2937]/20 via-[#111827]/40 to-[#1f2937]/70 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
                <h3 id="whyus-cta-title" className="text-2xl font-mersad1 text-white sm:text-3xl">დაიწყე დღეს და იყავი წარმატებული!</h3>
                <p className="mt-3 text-sm font-semibold tracking-wide text-[#f59e0b] drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-colors hover:text-white sm:text-base">
                არჩევანი მარტივია: ან ქმნი საკუთარ წარმატებას, ან ელოდები, რომ ის თავად გეწვევა.
              </p>
            </div>
            <Link to={"/contact"}>
              <button className="px-6 py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#1f2937] via-[#243144] to-[#1f2937] border border-[#22d3ee]/50 shadow-[0_8px_24px_rgba(34,211,238,0.18)] hover:border-[#22d3ee]/80 hover:shadow-[0_10px_28px_rgba(34,211,238,0.28)] transition-all">
                კონსულტაცია
              </button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}

export default WhyUs
