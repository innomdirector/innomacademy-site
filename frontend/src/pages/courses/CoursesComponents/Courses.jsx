import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaStar, FaRegStar, FaChevronDown } from 'react-icons/fa'

import { fetchCoursesCatalog } from '../../../services/coursesApi'
import { renderCourseIcon } from '../../../services/courseIcons'
import WarningToast from '../../../components/common/WarningToast'
import Seo from '../../../seo/Seo'
import { toAbsoluteUrl } from '../../../seo/siteConfig'

const UNAVAILABLE_COURSE_ALERT =
  'ბოდიშს გიხდით, ეს კურსი ჯერ დამატებული არ არის. კურსი მალე დაემატება.'

const wizardQuestions = [
  {
    id: 'math',
    title: 'მათემატიკა რამდენად კარგად იცი?',
    options: [
      { label: 'კარგად', value: 'math_strong', scores: { 1: 1, 8: 3, 10: 3, 11: 0 } },
      { label: 'საშუალოდ დონეზე', value: 'math_ok', scores: { 1: 2, 8: 2, 10: 2, 11: 0 } },
      { label: 'ცუდად ვიცი', value: 'math_weak', scores: { 1: 3, 8: 0, 10: 1, 11: 2 } },
      { label: 'საერთოდ არ ვიცი', value: 'math_none', scores: { 1: 3, 8: 0, 10: 0, 11: 2 } },
    ],
  },
  {
    id: 'coding',
    title: 'კოდის წერა რამდენად იცი?',
    options: [
      { label: 'არ ვიცი', value: 'code_none', scores: { 1: 3, 8: 0, 10: 1, 11: 2 } },
      { label: 'ადრე დამიწერია', value: 'code_basic', scores: { 1: 3, 8: 1, 10: 1, 11: 1 } },
      { label: 'უკვე ვიცი საბაზისო პროგრამირება', value: 'code_ok', scores: { 1: 2, 8: 3, 10: 2, 11: 0 } },
      { label: 'ვაკეთებ პატარა პროექტებს', value: 'code_projects', scores: { 1: 1, 8: 3, 10: 2, 11: 0 } },
    ],
  },
  {
    id: 'time',
    title: 'კვირაში რამდენ დროს გამოყოფ სწავლისთვის?',
    options: [
      { label: '2–4 საათი', value: 'time_low', scores: { 1: 2, 8: 0, 10: 1, 11: 2 } },
      { label: '5–8 საათი', value: 'time_mid', scores: { 1: 3, 8: 1, 10: 2, 11: 2 } },
      { label: '9–12 საათი', value: 'time_high', scores: { 1: 2, 8: 2, 10: 3, 11: 1 } },
      { label: '12+ საათი', value: 'time_very_high', scores: { 1: 2, 8: 3, 10: 3, 11: 1 } },
    ],
  },
  {
    id: 'preference',
    title: 'რომელი ტიპის საქმე უფრო მოგწონს?',
    options: [
      { label: 'პროდუქტის შექმნა და აპის აწყობა', value: 'pref_product', scores: { 1: 3, 8: 1, 10: 1, 11: 0 } },
      { label: 'მონაცემებით გადაწყვეტილებების მიღება', value: 'pref_data', scores: { 1: 0, 8: 1, 10: 3, 11: 0 } },
      { label: 'AI-ით იდეების ავტომატიზაცია', value: 'pref_ai', scores: { 1: 1, 8: 3, 10: 1, 11: 0 } },
      { label: 'კრეატივი, ვიზუალი და დიზაინი', value: 'pref_creative', scores: { 1: 0, 8: 0, 10: 0, 11: 3 } },
    ],
  },
]

const mapCourseToCard = (course) => ({
  id: course.id,
  title: course.title,
  description: course.card?.shortDescription || course.description || '',
  color: course.color || 'from-[#1f3b5b] via-[#2b4a70] to-[#1a2f4d]',
  icon: renderCourseIcon(course.iconKey, 'text-white'),
  isAvailable: course.isAvailable !== false,
  difficulty: course.difficulty || 3,
  reason: course.card?.reason || '',
  highlights: Array.isArray(course.card?.highlights) ? course.card.highlights : [],
})

export default function Courses() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openTipId, setOpenTipId] = useState(0)
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)
  const [wizardAnswers, setWizardAnswers] = useState({})

  const [courseData, setCourseData] = useState([])
  const [activeCourseNote, setActiveCourseNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showUnavailableWarning, setShowUnavailableWarning] = useState(false)

  const handleCourseClick = (course) => {
    if (!course?.isAvailable) {
      setShowUnavailableWarning(true)
      return
    }
    navigate(`/courses/${course.id}`)
  }

  useEffect(() => {
    let isMounted = true
    const loadCourses = async () => {
      try {
        const payload = await fetchCoursesCatalog()
        if (!isMounted) return
        const mapped = (payload.courses || []).map(mapCourseToCard).sort((a, b) => a.id - b.id)
        setCourseData(mapped)
        setActiveCourseNote(payload.meta?.activeCourseNote || '')
      } catch (_error) {
        if (isMounted) setLoadError('კურსების ჩატვირთვა დროებით ვერ ხერხდება.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadCourses()
    return () => { isMounted = false }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  }

  const handleWizardAnswer = (questionId, optionValue) => {
    setWizardAnswers((prev) => ({ ...prev, [questionId]: optionValue }))
    setWizardStep((prev) => Math.min(prev + 1, wizardQuestions.length))
  }

  const resetWizard = () => {
    setWizardAnswers({})
    setWizardStep(0)
  }

  const recommendation = useMemo(() => {
    if (wizardStep < wizardQuestions.length) return null
    const scores = { 1: 0, 8: 0, 10: 0, 11: 0 }
    wizardQuestions.forEach((question) => {
      const selectedValue = wizardAnswers[question.id]
      const selectedOption = question.options.find((opt) => opt.value === selectedValue)
      if (selectedOption?.scores) {
        Object.entries(selectedOption.scores).forEach(([courseId, score]) => {
          scores[courseId] += score
        })
      }
    })
    const bestId = Object.keys(scores).reduce((best, current) => (
      scores[current] > scores[best] ? current : best
    ), '1')
    return courseData.find((course) => course.id === parseInt(bestId, 10)) || null
  }, [courseData, wizardAnswers, wizardStep])

  const tipBlocks = useMemo(() => (
    courseData.slice(0, 3).map((course) => ({
      title: course.title,
      text: course.reason || course.description || 'დეტალებს იხილავ კურსის გვერდზე.',
    }))
  ), [courseData])

  const coursesStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'INNO M Academy კურსები',
    itemListElement: courseData
      .filter((course) => course.isAvailable)
      .map((course, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: course.title,
        url: toAbsoluteUrl(`/courses/${course.id}`),
      })),
  }), [courseData])

  const coursesPageStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'პროგრამირების კურსები | INNO M Academy',
    description: 'აირჩიე შენთვის სასურველი კურსი: პროგრამირება, AI, მონაცემთა ანალიზი და სხვა თანამედროვე მიმართულებები.',
    url: toAbsoluteUrl('/courses'),
  }), [])

  const breadcrumbStructuredData = useMemo(() => ({
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
        name: 'კურსები',
        item: toAbsoluteUrl('/courses'),
      },
    ],
  }), [])

  useEffect(() => {
    if (location.hash === '#courses') {
      const el = document.getElementById('courses')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  useEffect(() => {
    if (!tipBlocks.length) return
    if (openTipId === null || openTipId >= tipBlocks.length) {
      setOpenTipId(0)
    }
  }, [openTipId, tipBlocks])

  if (isLoading) {
    return (
      <>
        <Seo
          title="კურსები | INNO M Academy"
          description="INNO M Academy-ის ტექნოლოგიური კურსების კატალოგი ბავშვებისთვის და ზრდასრულებისთვის."
          path="/courses"
        />
        <div className="min-h-screen py-20 font-mersad2">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-white/80 text-base sm:text-lg">იტვირთება კურსები...</p>
          </div>
        </div>
      </>
    )
  }

  if (loadError) {
    return (
      <>
        <Seo
          title="პროგრამირების კურსები | INNO M Academy"
          description="INNO M Academy-ის ტექნოლოგიური კურსების კატალოგი ბავშვებისთვის და ზრდასრულებისთვის."
          path="/courses"
        />
        <div className="min-h-screen py-20 font-mersad2">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[#fca5a5] text-base sm:text-lg">{loadError}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <section className="min-h-screen py-16 font-mersad2 courses-page relative overflow-hidden" aria-labelledby="courses-title">
      <Seo
        title="პროგრამირების კურსები | INNO M Academy"
        description="აირჩიე შენთვის სასურველი კურსი: პროგრამირება, AI, მონაცემთა ანალიზი და სხვა თანამედროვე მიმართულებები."
        path="/courses"
        keywords={['კურსები', 'პროგრამირება', 'AI', 'ონლაინ სწავლა', 'INNO M Academy']}
        structuredData={[coursesPageStructuredData, coursesStructuredData, breadcrumbStructuredData]}
      />
      <WarningToast
        open={showUnavailableWarning}
        message={UNAVAILABLE_COURSE_ALERT}
        onClose={() => setShowUnavailableWarning(false)}
      />
      <div aria-hidden="true">
        <div className="pointer-events-none absolute top-80 right-[10%] h-80 w-80 rounded-full bg-[#22d3ee]/30 blur-[160px]" />
        <div className="pointer-events-none absolute top-60 left-50 h-96 w-96 rounded-full bg-[#6366f1]/25 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-50 left-1/2 h-96 w-96 rounded-full bg-[#2563eb]/20 blur-[170px]" />
        <div className="pointer-events-none absolute top-140 h-200 w-150 left-[60%] rounded-full bg-[#1e3a8a]/20 blur-[160px]" />
        <div className="pointer-events-none absolute top-140 h-200 w-150 right-[60%] rounded-full bg-[#0ea5e9]/20 blur-[160px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <header>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 mt-2 md:mt-10"
            id="courses"
          >
            <h1 id="courses-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mersad1 text-white mb-6 leading-tight">პროგრამირების კურსები</h1>
            <div className="w-full h-0.5 rounded-full mb-6 bg-linear-to-r from-[#387bf8] via-[#2563eb] to-[#1e3a8a]" />
          
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mt-10 mb-6 overflow-hidden rounded-3xl border border-[#1e3a8a]/35 bg-linear-to-br from-[#01030a]/95 via-[#040816]/95 to-[#0a1433]/95 p-6 md:p-8 shadow-[0_20px_45px_rgba(2,6,23,0.9)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_84%_82%,rgba(37,99,235,0.16),transparent_40%)]" />

              <div className="relative z-10 pr-16 sm:pr-24 md:pr-48">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] font-mersad1 text-[#dbeafe] drop-shadow-[0_0_12px_rgba(96,165,250,0.28)]">
                    გადადგი ყველაზე მნიშვნელოვანი ნაბიჯი
                  </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-[#bfdbfe] sm:text-[0.98rem] md:text-[1.06rem] mt-4">
                  INNO M აკადემიაში სწავლა არის არჩევანი მათთვის, ვინც მომავალზე ფიქრობს. სტუდენტებისთვის: პრაქტიკული პროექტები და შედეგი, მშობლებისთვის: მკაფიო გეგმა და პროგრესის კონტროლი.
                </p>
                <p className="mt-3 text-[0.86rem] text-[#93c5fd] sm:text-[0.93rem] md:text-[1.02rem]">
                  დარეგისტრირდი და გაიარე კონსულტაცია სწორი მიმართულების არჩევისთვის.
                </p>
                <Link
                  to="/registration"
                  className="inline-flex mt-15 items-center whitespace-nowrap rounded-xl border border-[#93c5fd]/40 bg-linear-to-r from-[#1d4ed8] via-[#2563eb] to-[#0284c7] px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(59,130,246,0.48)]"
                >
                  დარეგისტრირდი
                </Link>
                </div>
              </div>
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 80 }}
                  animate={{ opacity: 1, x: 0, y: 35 }}
                  transition={{ duration: 0.65, delay: 0.22 }}
                  className="pointer-events-none absolute -bottom-28 -right-24 sm:-bottom-30 sm:-right-24 md:-bottom-28 md:-right-20"
                >
                  <div className="absolute -inset-4 rounded-full bg-[#2563eb]/25 blur-3xl" />
                <motion.img
                  src="/icon-images/innomai.png"
                  alt="airobotinnomai"
                  className="relative z-10 h-80 w-80 rotate-[-15deg] object-contain drop-shadow-[0_14px_28px_rgba(37,99,235,0.55)] sm:h-96 sm:w-96 md:h-112 md:w-md"
                  animate={{ y: [0, -2, 0], rotate: [-5, -6, -5] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </header>


        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-3xl border border-white/10 bg-[#0b1224]/70 p-6 shadow-[0_16px_36px_rgba(2,6,23,0.55)] backdrop-blur-xl"
          role="region"
          aria-labelledby="course-wizard-title"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 id="course-wizard-title" className="text-xl sm:text-2xl md:text-3xl font-mersad1 text-[#7dd3fc] drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">დაგეხმაროთ კურსის არჩევაში?</h2>
              <p className="text-white/70 mt-2">უპასუხე რამდენიმე მარტივ კითხვას და რეკომენდაციას მიიღებ.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowWizard((prev) => !prev)}
              className="cursor-pointer px-5 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#1f2937] via-[#243b55] to-[#111827] border border-white/10 shadow-[0_12px_28px_rgba(15,23,42,0.45)]"
            >
              კურსის არჩევაში დახმარება
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showWizard && (
              <motion.div
                key="course-wizard"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a]/70 p-5">
                  {wizardStep < wizardQuestions.length && (
                    <div>
                      <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                        <span>კითხვა {wizardStep + 1} / {wizardQuestions.length}</span>
                        <button type="button" onClick={resetWizard} className="text-white/60 hover:text-white transition-colors">
                          თავიდან დაწყება
                        </button>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">{wizardQuestions[wizardStep].title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {wizardQuestions[wizardStep].options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleWizardAnswer(wizardQuestions[wizardStep].id, option.value)}
                            className="text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/85 hover:border-white/20 hover:bg-white/10 transition-all"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep >= wizardQuestions.length && recommendation && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>შედეგი</span>
                        <button type="button" onClick={resetWizard} className="text-white/60 hover:text-white transition-colors">
                          თავიდან დაწყება
                        </button>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#0b1224]/70 p-5">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{recommendation.icon}</div>
                          <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{recommendation.title}</h3>
                            <p className="text-white/70 mt-1">{recommendation.description}</p>
                            {!recommendation.isAvailable && (
                            <div className="mt-3 inline-flex items-center rounded-lg border border-[#38bdf8]/55 bg-[#38bdf8]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#7dd3fc]">
                              კურსი მალე დაემატება
                            </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 text-white/70 text-sm leading-relaxed">
                          <span className="text-white/90 font-semibold">რატომ გირჩევთ:</span>{' '}
                          {recommendation.reason}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {recommendation.highlights.map((item, idx) => (
                            <span key={`rec-${idx}`} className="text-xs text-white/80 px-2.5 py-1 rounded-full border border-white/15 bg-white/5">
                              {item}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCourseClick(recommendation)}
                          className="mt-5 w-full py-3 px-4 rounded-xl font-semibold text-white bg-linear-to-r from-[#1a2336] via-[#1f2937] to-[#1b233a] border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                        >
                          კურსის გვერდი
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>



        <section aria-labelledby="courses-list-title">
          <h2 id="courses-list-title" className="sr-only">კურსების ჩამონათვალი</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courseData.map((course) => (
            <motion.article
              key={course.id}
              variants={cardVariants}
              whileHover="hover"
              className="group h-full"
            >
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0b1224]/70 shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 flex flex-col">
                <div className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-linear-to-br ${course.color} opacity-30 blur-3xl`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />

                <div className={`h-28 sm:h-32 bg-linear-to-r ${course.color} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-5xl"
                  >
                    {course.icon}
                  </motion.div>
                  <div className="absolute inset-0 opacity-30 blur-xl bg-linear-to-r from-white/25 to-transparent" />
                </div>

                {course.isAvailable ? (
                  <Link to={`/courses/${course.id}`} className="p-6 relative z-10 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white transition-all duration-300 leading-snug">{course.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{course.description}</p>

                    <div className="text-sm text-white/70 leading-relaxed">
                      <span className="text-white/90 font-semibold">რატომ შეიძლება მოგეწონოს:</span>{' '}
                      {course.reason}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {course.highlights.map((item, idx) => (
                        <span key={`${course.id}-${idx}`} className="text-xs text-white/80 px-2.5 py-1 rounded-full border border-white/15 bg-white/5">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mt-4" aria-hidden="true">
                        <span className="text-white/80 text-sm font-medium tracking-wide">სირთულე:</span>
                        {Array.from({ length: 5 }).map((_, i) => (
                          i < (course.difficulty || 0)
                            ? <FaStar key={i} className="text-[#60a5fa] text-sm" />
                            : <FaRegStar key={i} className="text-white/40 text-sm" />
                        ))}
                      </div>

                      <p className="mt-4 text-xs text-white/50">მეტი დეტალისთვის გადადი კურსის გვერდზე</p>

                      <span className="block text-center w-full py-3 px-4 mt-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#1a2336] via-[#1f2937] to-[#1b233a] border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                        კურსის გვერდი
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 relative z-10 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white transition-all duration-300 leading-snug">{course.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{course.description}</p>
                    <div className="mb-3 inline-flex items-center rounded-lg border border-[#38bdf8]/55 bg-[#38bdf8]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#7dd3fc]">
                      კურსი მალე დაემატება
                    </div>

                    <div className="text-sm text-white/70 leading-relaxed">
                      <span className="text-white/90 font-semibold">რატომ შეიძლება მოგეწონოს:</span>{' '}
                      {course.reason}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {course.highlights.map((item, idx) => (
                        <span key={`${course.id}-${idx}`} className="text-xs text-white/80 px-2.5 py-1 rounded-full border border-white/15 bg-white/5">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mt-4" aria-hidden="true">
                        <span className="text-white/80 text-sm font-medium tracking-wide">სირთულე:</span>
                        {Array.from({ length: 5 }).map((_, i) => (
                          i < (course.difficulty || 0)
                            ? <FaStar key={i} className="text-[#60a5fa] text-sm" />
                            : <FaRegStar key={i} className="text-white/40 text-sm" />
                        ))}
                      </div>

                      <p className="mt-4 text-xs text-white/50">მეტი დეტალისთვის გადადი კურსის ფეიჯზე</p>

                      <button
                        type="button"
                        onClick={() => handleCourseClick(course)}
                        className="cursor-pointer w-full py-3 px-4 mt-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#1a2336] via-[#1f2937] to-[#1b233a] border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                      >
                        კურსი მალე დაემატება
                      </button>
                    </div>
                  </div>
                )}

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${course.color}`} />
              </div>
            </motion.article>
          ))}
          </motion.div>
        </section>
      </div>
    </section>
  )
}
