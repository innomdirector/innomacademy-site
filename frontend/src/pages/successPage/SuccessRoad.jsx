import React from 'react'
import { motion } from 'framer-motion'
import { FaLongArrowAltRight, FaChevronRight } from "react-icons/fa";
import Seo from '../../seo/Seo';
import { toAbsoluteUrl } from '../../seo/siteConfig';
import ProgrammerImage from "/icon-images/Programmer-rafiki.svg"

const roadmapStages = [
  {
    title: 'Junior',
    subtitle: 'საფუძვლები + სწორი ჩვევა',
    color: 'from-[#22d3ee]/25 via-[#0ea5e9]/15 to-[#0f172a]/60',
    skills: [
      'საფუძვლების გამყარება და სწორი მიმართულება',
      'სწავლა როგორც ყოველდღიური ჩვევა',
      'კითხვების დასმა და რჩევის მიღება',
      'პატარა შედეგების დაგროვება'
    ],
    daily: 'დღეში 2–3 საათი სწავლა + 30–60 წთ პრაქტიკა'
  },
  {
    title: 'Mid',
    subtitle: 'დამოუკიდებლობა + პასუხისმგებლობა',
    color: 'from-[#2563eb]/25 via-[#1d4ed8]/15 to-[#0f172a]/60',
    skills: [
      'დამოუკიდებლად შედეგების მიღწევა',
      'ვადების დაცვა და პასუხისმგებლობის აღება',
      'პრობლემის ანალიზი და გადაწყვეტილების არგუმენტირება',
      'გუნდთან პროაქტიური კომუნიკაცია'
    ],
    daily: 'დღეში 3–4 საათი ფოკუსი და კვირაში 1 დიდი დავალება'
  },
  {
    title: 'Senior',
    subtitle: 'ლიდერობა + დიდი ხედვა',
    color: 'from-[#1e3a8a]/25 via-[#1d4ed8]/15 to-[#0f172a]/60',
    skills: [
      'რთული პრობლემების გადაჭრა',
      'გუნდის გაძლიერება და მენტორობა',
      'ხარისხისა და სტანდარტების უზრუნველყოფა',
      'რთულ სიტუაციებში სწორი გადაწყვეტილებები'
    ],
    daily: 'დღეში 4+ საათი deep work + გუნდის მხარდაჭერა'
  }
]

const simplePlan = [
  {
    step: 'დაწყება',
    title: 'მიმართულება და მიზანი',
    text: 'აირჩიე გზა, დაისახე მიზანი და შექმენი სწორი საფუძველი. პროგრესი იწყება.'
  },
  {
    step: 'შექმნა',
    title: 'რიტმი და პრაქტიკა',
    text: 'ყოველდღიური სწავლა, მცირე ამოცანები, რეალური პრაქტიკა და ფიდბექი.'
  },
  {
    step: 'დამტკიცება',
    title: 'შედეგის ჩვენება',
    text: 'შედეგი აჩვენე: პროექტებით, ქეისებით და რეალური ღირებულებით.'
  }
]

const academyPillars = [
  {
    title: 'მხარდაჭერის გარემო',
    text: 'აქ მარტო არ ხარ. გუნდი, მენტორები და თანამოაზრეები გვერდით გიდგანან.'
  },
  {
    title: 'რჩევა და მიმართულება',
    text: 'მიღებული რჩევები გაძლევს სისწრაფეს. სწორა გზას დაგანახებენ და გაგაძლიერებენ.'
  },
  {
    title: 'პრაქტიკა + ამოცანები',
    text: 'კარიერა საქმით იწყება. აქ სწავლობ მოქმედებით, არა მხოლოდ მოსმენით.'
  },
  {
    title: 'დისციპლინა და მოტივაცია',
    text: 'მოტივაცია იქმნება გარემოთი. სწორ სივრცეში შენს მიზნებს რეალობად აქცევ.'
  }
]

const dailyHabits = [
  {
    title: 'ფოკუსირებული სწავლა',
    text: '90 წუთიანი სესიები, ტელეფონის გარეშე. ფოკუსი ქმნის შედეგს.'
  },
  {
    title: 'მიკრო-პრაქტიკა',
    text: 'დღეში 30–60 წუთი პრაქტიკა. პატარა ნაბიჯები, დიდი შედეგები.'
  },
  {
    title: 'გააზრება',
    text: 'დღის ბოლოს 3 ჩანაწერი: რა ვისწავლე, რა ვერ გავიგე, რა გავაუმჯობესო.'
  },
  {
    title: 'ენერგია და ფსიქოლოგია',
    text: 'ძილი, მოძრაობა და სწორი კვება ზრდის კონცენტრაციას და მოტივაციას.'
  }
]

const academyPillarStyles = [
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#11243a]/80 border-[#38bdf8]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#10223a]/70 border-[#60a5fa]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#111f3a]/70 border-[#2563eb]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#162044]/70 border-[#1e3a8a]/30'
]

const dailyHabitStyles = [
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#0b1b33]/75 border-[#38bdf8]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#0f2430]/75 border-[#60a5fa]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#14202a]/75 border-[#2563eb]/30',
  'from-[#0b1020]/90 via-[#0f172a]/90 to-[#162044]/70 border-[#1e3a8a]/30'
]

const mindsetPillars = [
  {
    title: 'შედარება არ გჭირდება',
    text: 'შენი გზა არის მხოლოდ შენი. ერთადერთი კონკურენტი შენი გუშინდელი ვერსიაა.'
  },
  {
    title: 'შეცდომა = ზრდა',
    text: 'შეცდომები პროგრესის ნაწილია. ისინი გზას არ გიკეტავს, ისინი გაძლიერებს.'
  },
  {
    title: 'დისციპლინა > მოტივაცია',
    text: 'მოტივაცია მოდის და ქრება. დისციპლინა ქმნის შედეგს.'
  },
  {
    title: 'თვითრწმენა + მოთმინება',
    text: 'შედეგი არ მოდის ერთ დღეში. მოთმინება არის შენი სუპერ ძალა.'
  }
]

const skillTracks = [
  {
    title: 'ძირითადი უნარები',
    items: [
      'საფუძვლების სრულყოფა',
      'პრობლემის გადაჭრის უნარი',
      'კრიტიკული აზროვნება',
      'სისტემური ხედვა'
    ]
  },
  {
    title: 'ღირებულება და შედეგი',
    items: [
      'მომხმარებლის საჭიროების გაგება',
      'შედეგზე ორიენტაცია',
      'პრიორიტეტების მართვა',
      'საპასუხისმგებლო მიდგომა'
    ]
  },
  {
    title: 'კომუნიკაცია და ლიდერობა',
    items: [
      'გუნდთან ეფექტური ურთიერთობა',
      'ფიდბექის სწორად მიღება',
      'პრობლემის სწორად ახსნა',
      'ლიდერობა და მენტორობა'
    ]
  }
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14
    }
  }
}

const ambientOverlays = [
  { id: 'ov-1', className: 'absolute top-28 right-[12%] h-96 w-96 rounded-full bg-[#22d3ee]/14 blur-3xl' },
  { id: 'ov-2', className: 'absolute top-52 left-[10%] h-[25rem] w-[25rem] rounded-full bg-[#38bdf8]/12 blur-3xl' },
  { id: 'ov-3', className: 'absolute top-[26rem] right-[28%] h-72 w-72 rounded-full bg-[#2563eb]/12 blur-3xl' },
  { id: 'ov-4', className: 'absolute top-[54rem] left-[8%] h-80 w-80 rounded-full bg-[#60a5fa]/14 blur-3xl' },
  { id: 'ov-5', className: 'absolute top-[76rem] right-[12%] h-96 w-96 rounded-full bg-[#22d3ee]/12 blur-3xl' },
  { id: 'ov-6', className: 'absolute top-[98rem] left-[16%] h-72 w-72 rounded-full bg-[#1e3a8a]/12 blur-3xl' },
  { id: 'ov-7', className: 'absolute top-[118rem] right-[14%] h-80 w-80 rounded-full bg-[#38bdf8]/12 blur-3xl' },
  { id: 'ov-8', className: 'absolute top-[142rem] left-[8%] h-[22rem] w-[22rem] rounded-full bg-[#60a5fa]/10 blur-3xl' },
  { id: 'ov-9', className: 'absolute bottom-40 right-[12%] h-80 w-80 rounded-full bg-[#60a5fa]/10 blur-3xl' },
  { id: 'ov-10', className: 'absolute bottom-24 left-[26%] h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl' },
  { id: 'ov-11', className: 'absolute bottom-90 right-[28%] h-64 w-64 rounded-full bg-[#2563eb]/10 blur-3xl' },
  { id: 'ov-12', className: 'absolute bottom-200 left-[14%] h-80 w-80 rounded-full bg-[#38bdf8]/12 blur-3xl' },
]

const SuccessRoad = () => {
  const successStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'წარმატების გზა | INNO M Academy',
    description: 'პრაქტიკული რჩევები, განვითარების ეტაპები და კარიერული roadmap INNO M Academy-სგან.',
    url: toAbsoluteUrl('/success'),
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
        name: 'წარმატების გზა',
        item: toAbsoluteUrl('/success'),
      },
    ],
  }

  return (
    <section className="min-h-screen text-white font-mersad2 mt-8 relative overflow-hidden" aria-labelledby="success-title">
      <Seo
        title="წარმატების გზა | INNO M Academy"
        description="ნახე განვითარების რეალური გზა Junior-დან Senior-მდე: ჩვევები, roadmap და პრაქტიკული ნაბიჯები."
        path="/success"
        keywords={['კარიერული გზა', 'Junior Mid Senior', 'ტექნოლოგიური კარიერა', 'INNO M Academy']}
        structuredData={[successStructuredData, breadcrumbStructuredData]}
      />
      <div aria-hidden="true">
        {ambientOverlays.map((overlay) => (
          <div key={overlay.id} className={`pointer-events-none ${overlay.className}`} />
        ))}
      </div>


      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.section
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          aria-labelledby="success-title"
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm uppercase tracking-[0.35em] text-[#22d3ee] font-semibold">
              კარიერული გზა
            </p>
            <h1 id="success-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mersad1 leading-tight mt-4">
              წარმატება იწყება <span className="text-[#0bcef5]">სწორი გზით</span>
            </h1>
            <p className="text-white/75 text-lg mt-5 leading-relaxed max-w-xl">
              ეს არის გვერდი მათთვის, ვისაც სწორი გეგმა, მხარდაჭერა და მოტივაცია სჭირდება.
              ჩვენი აკადემიის გარემო ქმნის დისციპლინას, თავდაჯერებას და იმ პროგრესს,
              რომელიც Junior‑იდან Senior‑ამდე მიჰყავს ნებისმიერ მიმართულებაში.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] text-sm font-semibold">
                მკაფიო გეგმა
              </div>
              <div className="px-4 py-2 rounded-full bg-[#2563eb]/15 text-[#2563eb] text-sm font-semibold">
                ძლიერი გარემო
              </div>
              <div className="px-4 py-2 rounded-full bg-[#60a5fa]/15 text-[#60a5fa] text-sm font-semibold">
                სწორი MINDSET
              </div>
            </div>
          </motion.div>

          <motion.figure variants={fadeUp} className="relative">
            <div className="h-80 md:h-96 rounded-3xl border border-cyan-500/10 bg-linear-to-br from-[#0f172a]/80 via-[#0b1020]/70 to-[#111827]/90 overflow-hidden shadow-[0_16px_36px_rgba(37,99,235,0.22)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee33,transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#2563eb22,transparent_55%)]" />
              <div className="relative h-full w-full flex items-center justify-center text-center">
                <div className="h-full w-full">
                  <img className="w-full h-full object-cover opacity-75" src="/images/successkid.jpg" alt="სტუდენტის პროგრესის ვიზუალი" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#22d3ee]/20 blur-2xl rounded-full h-20 w-20" />
            <figcaption className="sr-only">სტუდენტის პროგრესის ვიზუალური ილუსტრაცია</figcaption>
          </motion.figure>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
          aria-labelledby="simple-plan-title"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <h2 id="simple-plan-title" className="text-3xl sm:text-4xl font-mersad1">
              მარტივი გეგმა 3 ნაბიჯში
            </h2>
            <p className="text-white/70 mt-4">
              თუ გინდა ნათელი მიმართულება, ეს სამი ნაბიჯი გახდება შენი საწყისი ჩარჩო.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {simplePlan.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-[#0f172a]/75 p-6"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-[#22d3ee] font-semibold">
                  {item.step}
                </p>
                <h3 className="text-xl font-bold text-white mt-3">{item.title}</h3>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
          aria-labelledby="roadmap-stages-title"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <h2 id="roadmap-stages-title" className="text-3xl sm:text-4xl font-mersad1">
              Junior → Mid → Senior: რა გაძლევს პროგრესს?
            </h2>
            <p className="text-white/70 mt-4">
              ეს დონეები ყველა პროფესიისთვის მუშაობს. მთავარი არის დისციპლინა,
              პასუხისმგებლობა და რეალური შედეგი.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roadmapStages.map((stage) => (
              <motion.div
                key={stage.title}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-linear-to-br from-[#0f172a]/80 to-[#0b1020]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className={`rounded-2xl p-4 bg-linear-to-br ${stage.color}`}>
                  <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
                  <p className="text-white/70 mt-1">{stage.subtitle}</p>
                </div>
                <ul className="mt-5 space-y-3 text-white/80 text-sm leading-relaxed">
                  {stage.skills.map((skill) => (
                    <li key={skill} className="flex gap-2">
                      <FaChevronRight className="text-[#22d3ee] mt-1 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-[#93c5fd] font-semibold">
                  {stage.daily}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center"
          aria-labelledby="environment-title"
        >
          <motion.div variants={fadeUp}>
            <h2 id="environment-title" className="text-3xl sm:text-4xl font-mersad1">
              რატომ მუშაობს ჩვენი გარემო?
            </h2>
            <p className="text-white/70 mt-4">
              ჩვენთან სწავლა არის ენერგია და შედეგი. სწორედ ეს იძლევა
              მოტივაციას, რომელიც გიბიძგებს განვითარებისკენ ყოველდღე.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {academyPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className={`rounded-2xl border bg-linear-to-br p-4 ${academyPillarStyles[idx % academyPillarStyles.length]}`}
                >
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="text-white/70 mt-2 text-sm">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.figure variants={fadeUp} className="relative">
            <div className="overflow-hidden max-h-90 rounded-3xl border border-white/10 bg-linear-to-br from-[#0b1020]/80 via-[#0f172a]/80 to-[#111827]/90 shadow-[0_16px_36px_rgba(37,99,235,0.2)]">
              <div className="h-full w-full flex items-center justify-center">
                <div>
                  <img className='rounded-3xl object-cover opacity-70' src="/images/groupsuccess.jpg" alt="გუნდური წარმატების ფოტო" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <figcaption className="sr-only">გუნდური წარმატების ილუსტრაცია</figcaption>
          </motion.figure>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center"
          aria-labelledby="daily-routine-title"
        >
          <motion.div variants={fadeUp}>
            <h2 id="daily-routine-title" className="text-3xl sm:text-4xl font-mersad1 leading-snug">
              ყოველდღიური რუტინა, რომელიც ქმნის შედეგს
            </h2>
            <p className="text-white/70 mt-4">
              შენი კარიერა ყოველდღიურ ჩვევებზე დგას. თუ დღეს გააკეთებ ცოტას, ხვალ გაგიადვილდება ბევრი.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dailyHabits.map((habit, idx) => (
                <motion.div
                  key={habit.title}
                  variants={fadeUp}
                  className={`rounded-2xl border bg-linear-to-br p-4 ${dailyHabitStyles[idx % dailyHabitStyles.length]}`}
                >
                  <h3 className="text-lg font-semibold text-white">{habit.title}</h3>
                  <p className="text-white/70 mt-2 text-sm">{habit.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.figure variants={fadeUp} className="relative">
            <div className="overflow-hidden max-h-90 rounded-3xl border border-white/10 bg-linear-to-br from-[#0b1020]/80 via-[#0f172a]/80 to-[#111827]/90 shadow-[0_16px_36px_rgba(37,99,235,0.2)]">
              <div className="h-full w-full flex items-center justify-center text-center">
                <div className='w-full h-full'>
                  <img className='w-full h-full rounded-3xl object-cover scale-110 opacity-90' src="/images/work.jpg" alt="სასწავლო პრაქტიკის პროცესი" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <figcaption className="sr-only">სასწავლო პრაქტიკის პროცესის ილუსტრაცია</figcaption>
          </motion.figure>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
          aria-labelledby="mindset-title"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <h2 id="mindset-title" className="text-3xl sm:text-4xl font-mersad1">
              მენტალური ჩარჩო, რომელიც გიბიძგებს წინ
            </h2>
            <p className="text-white/70 mt-4">
              წარმატება იწყება არა მხოლოდ ცოდნით, არამედ სწორი ფსიქოლოგიით.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mindsetPillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-[#0f172a]/70 p-5"
              >
                <h3 className="text-lg font-semibold text-[#22d3ee]">{pillar.title}</h3>
                <p className="text-white/70 mt-2 text-sm">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
          aria-labelledby="skill-ladder-title"
        >
          <motion.div variants={fadeUp}>
            <h2 id="skill-ladder-title" className="text-3xl sm:text-4xl font-mersad1">
              Skill Ladder: რა უნდა გააძლიერო
            </h2>
            <p className="text-white/70 mt-4 max-w-3xl">
              მუდმივი ზრდა გაძლევს სიღრმეს, სანდოობას და პროფესიულობას.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {skillTracks.map((track) => (
              <motion.div
                key={track.title}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-linear-to-br from-[#0f172a]/80 to-[#0b1020]/90 p-6"
              >
                <h3 className="text-xl font-bold text-white">{track.title}</h3>
                <ul className="mt-4 space-y-3 text-white/75 text-sm">
                  {track.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#60a5fa]">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-center"
          aria-labelledby="weekly-steps-title"
        >
          <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-[#0f172a]/75 p-8">
            <h3 id="weekly-steps-title" className="text-2xl font-mersad1 text-white">ყოველი კვირა = ახალი ნაბიჯი</h3>
            <p className="text-white/70 mt-4 leading-relaxed">
              წარმატება არ არის ერთი დიდი ნახტომი. ეს არის ყოველდღიური პატარა ნაბიჯები,
              რომლებსაც შენ არ ხედავ, მაგრამ ისინი გიბიძგებენ წინ. თუ დღეს ცოტას გააკეთებ,
              ხვალ უკვე მეტი შესაძლებლობა გექნება.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] text-sm font-semibold">
                კვირაში 1 დიდი ამოცანა
              </div>
              <div className="px-4 py-2 rounded-full bg-[#2563eb]/15 text-[#2563eb] text-sm font-semibold">
                ყოველდღე პროგრესი
              </div>
              <div className="px-4 py-2 rounded-full bg-[#60a5fa]/15 text-[#60a5fa] text-sm font-semibold">
                შედეგი გაზომე
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative hidden lg:block">
            <div className="h-80">
              <div className="h-full w-full flex items-center justify-center">
                <div className='w-full h-0.5 bg-linear-to-r from-[#22d3ee] via-[#60a5fa] to-[#2563eb]'>
                  
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
          aria-labelledby="motivation-title"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-[2.5rem] border border-white/10 bg-linear-to-r from-[#22d3ee]/15 via-[#0f172a]/80 to-[#2563eb]/15 p-10 text-center"
          >
            <h2 id="motivation-title" className="text-3xl sm:text-4xl font-mersad1">
              შენ შეგიძლია მეტი, ვიდრე გგონია
            </h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto">
              შენი გზა იწყება აქ. უბრალოდ დაიწყე. ყოველდღე ერთი ნაბიჯი.
              წარმატება არის არჩევანი, რომელსაც დღეს აკეთებ. ჩვენ დაგეხმარებით.
            </p>
            <div className="mt-6 inline-flex items-center gap-3">
              <span className="text-[#22d3ee] font-semibold">Junior</span>
              <span className="text-white/50"><FaLongArrowAltRight /></span>
              <span className="text-[#60a5fa] font-semibold">Mid</span>
              <span className="text-white/50"><FaLongArrowAltRight /></span>
              <span className="text-[#2563eb] font-semibold">Senior</span>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  )
}

export default SuccessRoad
