import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

import { fetchCourseById } from '../../../services/coursesApi'
import { renderCourseIcon } from '../../../services/courseIcons'
import Seo from '../../../seo/Seo'
import { toAbsoluteUrl } from '../../../seo/siteConfig'

const difficultyTextByValue = {
  1: 'ძალიან მარტივი',
  2: 'მარტივი',
  3: 'საშუალო',
  4: 'რთული',
  5: 'ძალიან რთული',
}

const normalizePrice = (value = '') => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (trimmed.startsWith('₾')) {
    return `${trimmed.slice(1).trim()} ₾`
  }
  return trimmed
}

export default function AboutCourse() {
  const { id } = useParams()
  const [coursePayload, setCoursePayload] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadCourse = async () => {
      try {
        const payload = await fetchCourseById(id)
        if (!isMounted) return
        setCoursePayload(payload)
        setIsNotFound(false)
      } catch (_error) {
        if (!isMounted) return
        setIsNotFound(true)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadCourse()
    return () => { isMounted = false }
  }, [id])

  const course = coursePayload?.course || null
  const details = course?.details || {}
  const meta = coursePayload?.meta || {}
  const isComingSoon = course?.isAvailable === false
  const normalizedPrice = normalizePrice(details.price)
  const priceWithPeriod = [normalizedPrice, details.month].filter(Boolean).join(' ')
  const difficultyText = difficultyTextByValue[course?.difficulty] || 'საშუალო'
  const courseIcon = renderCourseIcon(course?.iconKey, 'text-white')
  const technicalRequirements = Array.isArray(meta.technicalRequirements) ? meta.technicalRequirements : []
  const requirements = Array.isArray(details.requirements) ? details.requirements : []

  const pagePath = `/courses/${id}`
  const seoTitle = isNotFound || !course
    ? 'კურსი ვერ მოიძებნა | INNO M Academy'
    : `${course.title} | INNO M Academy`
  const seoDescription = isNotFound || !course
    ? 'მითითებული კურსი არ არსებობს ან დროებით მიუწვდომელია.'
    : (course.card?.shortDescription || 'კურსის სრული აღწერა, დეტალები და რეგისტრაციის ინფორმაცია INNO M Academy-ში.')

  const courseStructuredData = (!isNotFound && course)
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: seoDescription,
        provider: {
          '@type': 'Organization',
          name: meta.academy || 'INNO M Academy',
          url: toAbsoluteUrl('/'),
        },
        url: toAbsoluteUrl(pagePath),
      }
    : null

  const coursePageStructuredData = (!isNotFound && course)
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${course.title} | INNO M Academy`,
        description: seoDescription,
        url: toAbsoluteUrl(pagePath),
        breadcrumb: toAbsoluteUrl(pagePath),
      }
    : null

  const breadcrumbStructuredData = (!isNotFound && course)
    ? {
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
          {
            '@type': 'ListItem',
            position: 3,
            name: course.title,
            item: toAbsoluteUrl(pagePath),
          },
        ],
      }
    : null

  if (isLoading) {
    return (
      <>
        <Seo title="კურსი | INNO M Academy" description="იტვირთება კურსის დეტალები." path={pagePath} />
        <div className="min-h-screen flex items-center justify-center text-white font-mersad2">
          იტვირთება კურსის ინფორმაცია...
        </div>
      </>
    )
  }

  if (isNotFound || !course) {
    return (
      <>
        <Seo title={seoTitle} description={seoDescription} path={pagePath} noindex />
        <div className="min-h-screen bg-[#0b1020] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">კურსი ვერ მოიძებნა</h1>
            <p className="text-white/70">მითითებული კურსი არ არსებობს ან დროებით მიუწვდომელია.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen text-white font-mersad2 pb-16 relative overflow-hidden">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        keywords={['კურსი', 'პროგრამირება', 'ონლაინ სწავლა', course.title, 'INNO M Academy']}
        structuredData={[coursePageStructuredData, courseStructuredData, breadcrumbStructuredData]}
      />
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden z-10 mt-5 md:mt-12"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="rounded-2xl border border-white/20 bg-linear-to-br from-white/15 via-white/5 to-transparent p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="text-5xl">{courseIcon}</div>
              <div className="mt-4 text-sm text-white/70">კურსის დეტალები</div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <span className={`h-2 w-2 rounded-full bg-linear-to-r ${course.color}`} />
                <p className="mt-1">INNO M ACADEMY</p>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mersad1">{course.title}</h1>

              {isComingSoon && (
                <div className="mt-4 inline-flex items-center rounded-lg border border-[#38bdf8]/55 bg-[#38bdf8]/15 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
                  კურსი მალე დაემატება
                </div>
              )}

              <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                {course.card?.shortDescription || ''}
              </p>

              {isComingSoon && (
                <p className="mt-3 text-[#93c5fd] font-semibold">
                  შეგიძლია შეავსო ფორმა და კურსის გახსნისთანავე დაგიკავშირდებით.
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/registration"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-linear-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] shadow-[0_18px_40px_rgba(37,99,235,0.35)] hover:shadow-[0_22px_50px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  {isComingSoon ? 'რეგისტრაცია (მოლოდინი)' : 'კურსზე რეგისტრაცია'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'ფასი', value: priceWithPeriod },
            { label: 'ხანგრძლივობა', value: details.duration },
            { label: 'სირთულე', value: `${difficultyText} (${course.difficulty}/5)` },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/15 bg-linear-to-br from-[#38bdf8]/15 via-[#0f172a]/70 to-[#1e3a8a]/15 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.3)] backdrop-blur"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-semibold">{item.value}</div>
              <div className="text-sm text-white/60 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border border-white/15 bg-linear-to-br from-[#1e3a8a]/15 via-[#0f172a]/75 to-[#38bdf8]/15 p-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">კურსის შესახებ</h2>
          <p className="mt-4 text-white/75 leading-relaxed text-lg whitespace-pre-wrap">
            {details.description}
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-linear-to-br from-[#1e3a8a]/15 via-[#0f172a]/75 to-[#38bdf8]/15 p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">სასწავლო მოთხოვნები</h3>
          <div className="mt-4 space-y-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3 text-white/80">
                <FaCheckCircle className="text-[#38bdf8] mt-1 shrink-0" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="rounded-2xl border border-white/15 bg-linear-to-br from-[#1d4ed8]/15 via-[#0f172a]/75 to-[#38bdf8]/15 p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">ტექნიკა და გარემო</h3>
          <div className="mt-4 grid sm:grid-cols-1 gap-3">
            {technicalRequirements.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/80">
                <FaCheckCircle className="text-[#38bdf8] mt-1 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-linear-to-r from-[#1f2937]/80 via-[#0f172a]/80 to-[#1f2937]/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-linear-to-r from-[#38bdf8]/10 via-transparent to-[#1e3a8a]/15" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">მზად ხარ დაწყებისთვის?</h3>
              <p className="text-white/70 mt-2">
                {isComingSoon
                  ? 'შეავსე ფორმა და როცა ეს კურსი გაეშვება, პირველები დაგიკავშირდებით.'
                  : 'შეავსე სარეგისტრაციო ფორმა და დაგიკავშირდებით.'}
              </p>
            </div>
            <Link
              to="/registration"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-linear-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] shadow-[0_18px_40px_rgba(37,99,235,0.35)]  hover:shadow-[0_22px_50px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 transition-all"
            >
              {isComingSoon ? 'რეგისტრაცია (მოლოდინი)' : 'რეგისტრაცია'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
