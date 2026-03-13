import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'

import { fetchCoursesCatalog } from '../../services/coursesApi'
import { renderCourseIcon } from '../../services/courseIcons'
import WarningToast from '../common/WarningToast'

const UNAVAILABLE_COURSE_ALERT =
  'ბოდიშს გიხდით, ეს კურსი ჯერ დამატებული არ არის. კურსი მალე დაემატება.'

const sectionSubtitles = {
  web: 'საიტებისა და აპების აწყობის სწავლა',
  creative: 'დიზაინისა და ვიზუალის სწავლა',
}

const mapKidsSections = (courses) => {
  const grouped = {}

  courses.forEach((course) => {
    const catalog = course.catalog?.kids
    if (!catalog) return

    const sectionId = catalog.sectionId || 'web'
    if (!grouped[sectionId]) {
      grouped[sectionId] = {
        id: sectionId,
        title: catalog.sectionTitle || 'კურსები',
        subtitle: sectionSubtitles[sectionId] || '',
        courses: [],
      }
    }

    grouped[sectionId].courses.push({
      id: course.id,
      title: catalog.title || course.title,
      description: catalog.description || course.card?.shortDescription || '',
      icon: renderCourseIcon(course.iconKey, 'text-white'),
      isAvailable: course.isAvailable !== false,
    })
  })

  return Object.values(grouped)
}

const KidsCourses = () => {
  const [openIds, setOpenIds] = useState(['web'])
  const [coursesCatalog, setCoursesCatalog] = useState({ meta: {}, courses: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [showUnavailableWarning, setShowUnavailableWarning] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      try {
        const payload = await fetchCoursesCatalog()
        if (!isMounted) return
        setCoursesCatalog(payload)
      } catch (_error) {
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadData()
    return () => { isMounted = false }
  }, [])

  const sections = useMemo(
    () => mapKidsSections(coursesCatalog.courses || []),
    [coursesCatalog.courses]
  )

  useEffect(() => {
    if (!sections.length) return
    setOpenIds((prev) => {
      const allowed = prev.filter((id) => sections.some((section) => section.id === id))
      return allowed.length ? allowed : [sections[0].id]
    })
  }, [sections])

  const handleUnavailableCourseClick = () => {
    setShowUnavailableWarning(true)
  }

  const toggleSection = (sectionId) => {
    setOpenIds((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  return (
    <div id="kids-courses" className="py-12 md:py-16 font-mersad2 mt-10 md:mt-20">
      <WarningToast
        open={showUnavailableWarning}
        message={UNAVAILABLE_COURSE_ALERT}
        onClose={() => setShowUnavailableWarning(false)}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 mt-0"
        >
          <h2 className="text-3xl sm:text-4xl font-mersad1 text-white mb-10">
            კურსები ბავშვებისთვის
          </h2>
          <div className="w-full h-0.5 rounded-full bg-linear-to-r from-[#1e3a8a] via-[#1f2937] to-[#2563eb] mb-12 md:mb-20"></div>
        </motion.div>

        {isLoading && <p className="text-white/70">იტვირთება კურსები...</p>}

        {!isLoading && (
          <div className="space-y-6">
            {sections.map((section) => {
              const isOpen = openIds.includes(section.id)
              return (
                <div
                  key={section.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1b2f]/85 backdrop-blur-xl shadow-[0_22px_70px_-40px_rgba(15,23,42,0.95)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full text-left px-6 py-6 flex items-center justify-between gap-6 bg-[linear-gradient(180deg,rgba(18,34,58,0.9)_0%,rgba(12,24,42,0.92)_100%)] hover:bg-[#152a45] transition-colors"
                  >
                    <div>
                      <div className="text-2xl font-bold text-white">{section.title}</div>
                      <div className="text-sm text-white/72 mt-1">{section.subtitle}</div>
                      <div className="mt-3 h-0.5 w-14 rounded-full bg-[#7dd3fc]/80" />
                    </div>
                    <span
                      className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      aria-hidden="true"
                    >
                      <FaChevronDown />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`${section.id}-panel`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-6 bg-[#0a1528]/90 border-t border-white/10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.courses.map((course) => {
                              const cardClass =
                                'rounded-2xl border border-white/10 bg-[#0f1d34]/90 p-5 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.95)] transition hover:-translate-y-1 hover:border-[#7dd3fc]/80 h-full min-h-33'

                              if (course.isAvailable) {
                                return (
                                  <motion.article key={course.id} whileHover={{ y: -4 }} className={cardClass}>
                                    <Link
                                      to={`/courses/${course.id}`}
                                      className="block h-full"
                                      aria-label={`${course.title} კურსის დეტალების ნახვა`}
                                    >
                                      <div className="flex items-start flex-col md:flex-row md:items-center gap-3 h-full">
                                        <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#7dd3fc_0%,#38bdf8_100%)] flex items-center justify-center text-2xl ring-1 ring-white/15">
                                          {course.icon}
                                        </div>
                                        <div className="flex-1 min-h-14">
                                          <div className="text-lg font-semibold text-white">{course.title}</div>
                                          <div className="text-sm text-white/65 line-clamp-2">{course.description}</div>
                                        </div>
                                      </div>
                                    </Link>
                                  </motion.article>
                                )
                              }

                              return (
                                <motion.button
                                  key={course.id}
                                  whileHover={{ y: -4 }}
                                  type="button"
                                  onClick={handleUnavailableCourseClick}
                                  className={`${cardClass} cursor-pointer text-left w-full`}
                                >
                                  <div className="flex items-start flex-col md:flex-row md:items-center gap-3 h-full">
                                    <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#7dd3fc_0%,#38bdf8_100%)] flex items-center justify-center text-2xl ring-1 ring-white/15">
                                      {course.icon}
                                    </div>
                                    <div className="flex-1 min-h-14">
                                      <div className="text-lg font-semibold text-white">{course.title}</div>
                                      <div className="text-sm text-white/65 line-clamp-2">{course.description}</div>
                                      <div className="mt-2 inline-flex items-center rounded-md border border-[#f59e0b]/55 bg-[#f59e0b]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#fbbf24]">
                                        კურსი მალე დაემატება
                                      </div>
                                    </div>
                                  </div>
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default KidsCourses
