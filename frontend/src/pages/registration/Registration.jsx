import React, { useState, useRef, useEffect } from 'react'
import { IoMdCheckmark, IoMdClose } from "react-icons/io"
import { buildApiUrl, fetchCoursesCatalog } from '../../services/coursesApi'
import Seo from '../../seo/Seo'
import { toAbsoluteUrl } from '../../seo/siteConfig'

const COMING_SOON_TEXT = "კურსი მალე დაემატება"

// ── Top Alert Banner ──────────────────────────────────────────────────────────
function AlertBanner({ status, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!status.message) { setVisible(false); return }
    const t1 = setTimeout(() => setVisible(true), 10)
    let t2
    if (status.type === 'success') {
      t2 = setTimeout(() => { setVisible(false); setTimeout(onClose, 400) }, 6000)
    }
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [status.message, status.type])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 400)
  }

  if (!status.message) return null

  const isSuccess = status.type === 'success'

  return (
    <div
      className={`
        fixed top-5 left-1/2 z-100 w-full max-w-2xl px-6
        transition-all duration-400 ease-out
        ${visible ? '-translate-x-1/2 translate-y-0 opacity-100' : '-translate-x-1/2 -translate-y-6 opacity-0'}
      `}
      style={{ transitionProperty: 'transform, opacity' }}
    >
      <div className={`
        flex items-center gap-4 rounded-2xl border px-6 py-5
        shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]
        backdrop-blur-md
        ${isSuccess
          ? 'bg-[#052e16]/90 border-[#34d399]/30 text-[#34d399]'
          : 'bg-[#1c0a0a]/90 border-[#f87171]/30 text-[#f87171]'
        }
      `}>
        <span className="mt-0.5 shrink-0 text-3xl leading-none">
          {isSuccess ? <IoMdCheckmark /> : <IoMdClose />}
        </span>
        <p className="text-base font-semibold leading-relaxed flex-1">
          {status.message}
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity mt-0.5"
        >
          <IoMdClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ── Custom Course Select ──────────────────────────────────────────────────────
function CourseSelect({ value, onChange, hasError, courses, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = courses.find(c => c.value === value) || null

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative mt-2">
      <input type="hidden" name="course" value={value} />

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`
          w-full flex items-center justify-between
          rounded-2xl bg-[#0b1324] border px-4 py-4 text-left
          outline-none transition-all duration-200
          shadow-[0_12px_30px_-22px_rgba(15,23,42,0.9)]
          hover:border-white/20
          ${hasError
            ? 'border-[#f87171]'
            : open
              ? 'border-[#38bdf8]/70 ring-4 ring-[#38bdf8]/10'
              : 'border-white/10'
          }
        `}
        disabled={disabled}
      >
        {selected ? (
          <span className="flex items-center gap-3 text-white/90">
            <span className="text-sm">{selected.label}</span>
            {!selected.isAvailable && (
              <span className="rounded-md border border-[#f59e0b]/55 bg-[#f59e0b]/15 px-2 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-[#fbbf24]">
                {COMING_SOON_TEXT}
              </span>
            )}
          </span>
        ) : (
          <span className="text-white/40 text-sm">აირჩიე კურსი</span>
        )}

        <svg
          className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={`
        absolute z-50 left-0 right-0 mt-2
        bg-[#0d1520] border border-white/10 rounded-2xl
        shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)]
        overflow-hidden transition-all duration-200 origin-top
        ${open
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }
      `}>
        <div className="p-2 flex flex-col gap-0.5">
          {courses.map((course) => (
            <button
              key={course.value}
              type="button"
              onClick={() => { onChange(course.value); setOpen(false) }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                transition-all duration-150 group
                ${selected?.value === course.value
                  ? 'bg-[#38bdf8]/15 text-[#38bdf8]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white/95'
                }
              `}
            >
              <span className="text-sm font-medium">{course.label}</span>
              {!course.isAvailable && (
                <span className="ml-auto rounded-md border border-[#f59e0b]/55 bg-[#f59e0b]/15 px-2 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-[#fbbf24]">
                  {COMING_SOON_TEXT}
                </span>
              )}
              {selected?.value === course.value && (
                <svg className="w-4 h-4 text-[#38bdf8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
        <div className="h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  )
}

// ── Main Registration ─────────────────────────────────────────────────────────
export default function Registration() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [errors, setErrors] = useState({})
  const [selectedCourse, setSelectedCourse] = useState('')
  const [courses, setCourses] = useState([])
  const [activeCourseNote, setActiveCourseNote] = useState('')
  const selectedCourseMeta = courses.find((course) => course.value === selectedCourse) || null
  const selectedCourseComingSoon = !!selectedCourseMeta && !selectedCourseMeta.isAvailable

  const registrationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'რეგისტრაცია | INNO M Academy',
    description: 'გაიარე რეგისტრაცია INNO M Academy-ის კურსებზე ონლაინ ფორმის საშუალებით.',
    url: toAbsoluteUrl('/registration'),
    potentialAction: {
      '@type': 'RegisterAction',
      target: toAbsoluteUrl('/registration'),
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
        name: 'რეგისტრაცია',
        item: toAbsoluteUrl('/registration'),
      },
    ],
  }

  const phoneRegex = /^(?:\+995)?5\d{8}$/

  useEffect(() => {
    let isMounted = true
    const loadCourses = async () => {
      try {
        const payload = await fetchCoursesCatalog()
        if (!isMounted) return
        setCourses(payload.meta?.registrationOptions || [])
        setActiveCourseNote(payload.meta?.activeCourseNote || '')
      } catch (_error) {
        if (isMounted) setCourses([])
      }
    }
    loadCourses()
    return () => { isMounted = false }
  }, [])

  const validateForm = (payload) => {
    const nextErrors = {}
    if (!payload.firstName?.trim()) nextErrors.firstName = 'სახელი სავალდებულოა.'
    if (!payload.lastName?.trim()) nextErrors.lastName = 'გვარი სავალდებულოა.'
    if (!payload.age) {
      nextErrors.age = 'ასაკი სავალდებულოა.'
    } else {
      const ageValue = Number(payload.age)
      if (Number.isNaN(ageValue) || ageValue < 10 || ageValue > 28)
        nextErrors.age = 'ასაკი უნდა იყოს 10-დან 28 წლამდე.'
    }
    if (!payload.email?.trim()) {
      nextErrors.email = 'ელ. ფოსტა სავალდებულოა.'
    } else if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      nextErrors.email = 'ელ. ფოსტა არასწორია.'
    }
    if (!payload.course) nextErrors.course = 'კურსის არჩევა სავალდებულოა.'
    if (!payload.phone?.trim()) {
      nextErrors.phone = 'ტელეფონის ნომერი სავალდებულოა.'
    } else if (!phoneRegex.test(payload.phone.trim())) {
      nextErrors.phone = 'შეიყვანე ქართული ნომერი (მაგ: 555-123-456).'
    }
    if (!payload.parentPhone?.trim()) {
      nextErrors.parentPhone = 'მშობლის ნომერი სავალდებულოა.'
    } else if (!phoneRegex.test(payload.parentPhone.trim())) {
      nextErrors.parentPhone = 'შეიყვანე ქართული ნომერი (მაგ: 555-123-456).'
    }
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setErrors({})

    const formEl = event.currentTarget
    const formData = new FormData(formEl)
    const payload = Object.fromEntries(formData.entries())
    payload.course = selectedCourse
    if (payload.phone) payload.phone = payload.phone.replace(/\s+/g, '')
    if (payload.parentPhone) payload.parentPhone = payload.parentPhone.replace(/\s+/g, '')
    if (payload.age) payload.age = Number(payload.age)

    const validationErrors = validateForm(payload)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus({ type: 'error', message: 'გთხოვთ შეასწოროთ მონიშნული ველები.' })
      return
    }

    try {
      const selectedCourseInfo = courses.find((course) => course.value === selectedCourse)
      const successMessage = selectedCourseInfo?.isAvailable === false
        ? 'რეგისტრაცია მიღებულია. ეს კურსი მალე დაემატება და გახსნისთანავე დაგიკავშირდებით.'
        : 'გილოცავთ! თქვენ წარმატებით გაიარეთ რეგისტრაცია! მალე დაგიკავშირდებით.'

      const response = await fetch(buildApiUrl('/api/registrations'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || 'რეგისტრაცია ვერ შესრულდა. სცადე ისევ.')
      }
      formEl.reset()
      setSelectedCourse('')
      setStatus({ type: 'success', message: successMessage })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'შეცდომა!' })
    }
  }

  return (
    <section className="min-h-screen text-white font-mersad2" aria-labelledby="registration-title">
      <Seo
        title="რეგისტრაცია | INNO M Academy"
        description="შეავსე რეგისტრაციის ფორმა და აირჩიე სასურველი კურსი INNO M Academy-ში."
        path="/registration"
        keywords={['რეგისტრაცია', 'კურსზე ჩაწერა', 'INNO M Academy']}
        structuredData={[registrationStructuredData, breadcrumbStructuredData]}
      />
      {/* ✅ Top sliding alert banner */}
      <AlertBanner
        status={status}
        onClose={() => setStatus({ type: '', message: '' })}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 mt-8">
        <header className="max-w-2xl mb-12">
          <h1 id="registration-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mersad1 font-bold">
            რეგისტრაცია
          </h1>
          <p id="registration-subtitle" className="text-white/70 mt-3 text-base sm:text-lg">
            შეავსე ფორმა და დეტალებს მარტივად ერთად გავივლით.
          </p>
        </header>

        <section className="rounded-3xl border border-[#1e3a8a]/25 bg-[#0b1224]/70 p-8 sm:p-10 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-xl" aria-labelledby="registration-title">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-describedby="registration-subtitle">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="text-sm text-white/90">
                მოსწავლის სახელი
                <input
                  type="text"
                  name="firstName"
                  placeholder="მაგ: ინო"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.firstName ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                {errors.firstName && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.firstName}</span>
                )}
              </label>

              <label className="text-sm text-white/90">
                მოსწავლის გვარი
                <input
                  type="text"
                  name="lastName"
                  placeholder="მაგ: ემიშვილი"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.lastName ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                {errors.lastName && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.lastName}</span>
                )}
              </label>

              <label className="text-sm text-white/90">
                ასაკი
                <input
                  type="number"
                  name="age"
                  placeholder="მაგ: 20"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.age ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                {errors.age && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.age}</span>
                )}
              </label>

              <label className="text-sm text-white/90">
                ელ. ფოსტა
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.email ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                <span className="text-xs text-white/50 block mt-2">
                  გთხოვთ მიუთითე Gmail მისამართი
                </span>
                {errors.email && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.email}</span>
                )}
              </label>

              <div className="text-sm text-white/90 md:col-span-2">
                რომელი კურსი გინდა?
                <p className="mt-2 text-[#93c5fd] text-xs sm:text-sm font-semibold">
                  {activeCourseNote || `კურსების მიმდინარე სტატუსი მოცემულია ქვემოთ. მიუწვდომელ კურსებზე სტატუსია: ${COMING_SOON_TEXT}.`}
                </p>
                <CourseSelect
                  value={selectedCourse}
                  onChange={setSelectedCourse}
                  hasError={!!errors.course}
                  courses={courses}
                  disabled={!courses.length}
                />
                {selectedCourseComingSoon && (
                  <p className="mt-2 inline-flex items-center rounded-md border border-[#38bdf8]/55 bg-[#38bdf8]/15 px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-[#7dd3fc]">
                    არჩეული კურსი მალე დაემატება
                  </p>
                )}
                {errors.course && (
                  <span className="flex items-center gap-1.5 text-xs text-[#f87171] mt-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errors.course}
                  </span>
                )}
              </div>

              <label className="text-sm text-white/90">
                ტელეფონის ნომერი
                <input
                  type="tel"
                  name="phone"
                  placeholder="მაგ: 5XX XXX XXX"
                  inputMode="numeric"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.phone ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                {errors.phone && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.phone}</span>
                )}
              </label>

              <label className="text-sm text-white/90">
                მშობლის ტელეფონის ნომერი
                <input
                  type="tel"
                  name="parentPhone"
                  inputMode="numeric"
                  placeholder="ბავშვებისათვის აუცილებელია"
                  className={`mt-2 w-full rounded-xl bg-[#0b1324] border px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 ${
                    errors.parentPhone ? 'border-[#f87171]' : 'border-white/10'
                  }`}
                />
                {errors.parentPhone && (
                  <span className="text-xs text-[#f87171] mt-2 block">{errors.parentPhone}</span>
                )}
              </label>

              <label className="text-sm text-white/90 md:col-span-2">
                დამატებითი კომენტარი (სურვილისამებრ)
                <textarea
                  name="note"
                  rows="4"
                  placeholder="მაგ: რომელ დღეებში გირჩევნიათ სწავლა, რა მიზანი გაქვს და ა.შ."
                  className="mt-2 w-full rounded-xl bg-[#0b1324] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#38bdf8]/60 resize-none"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] shadow-[0_12px_28px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(59,130,246,0.45)] transition-all"
            >
              რეგისტრაცია
            </button>

          </form>
        </section>

        <section className="mt-12" aria-labelledby="registration-contact">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 id="registration-contact" className="text-2xl font-mersad1 font-bold">საკონტაქტოები</h2>
            <p className="font-semibold tracking-wide transition-colors">
              ტელეფონი: <span className="text-[#0bcaf5]">+995 598 19 05 06</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1e3a8a]/40 bg-linear-to-br from-[#081733] via-[#0b1d3d] to-[#0b1726]/55 p-6">
              <div className="text-sm uppercase tracking-widest text-[#93c5fd]">Facebook</div>
              <div className="mt-3 text-lg font-semibold text-white">INNO M Academy</div>
              <div className="mt-3 h-1 w-20 rounded-full bg-linear-to-r from-[#93c5fd] to-transparent" />
            </div>
            <div className="rounded-2xl border border-[#991b1b]/40 bg-linear-to-br from-[#2a0b0f] via-[#3b0a14] to-[#0b1726]/55 p-6">
              <div className="text-sm uppercase tracking-widest text-[#fca5a5]">Instagram</div>
              <div className="mt-3 text-lg font-semibold text-white">@inno_m_academy</div>
              <div className="mt-3 h-1 w-20 rounded-full bg-linear-to-r from-[#fca5a5] to-transparent" />
            </div>
            <div className="rounded-2xl border border-[#0ea5e9]/25 bg-linear-to-br from-[#0b1118] via-[#0b1726] to-[#0b1726]/55 p-6">
              <div className="text-sm uppercase tracking-widest text-[#67e8f9]">TikTok</div>
              <div className="mt-3 text-lg font-semibold text-white">@inno_m_academy</div>
              <div className="mt-3 h-1 w-20 rounded-full bg-linear-to-r from-[#67e8f9] to-transparent" />
            </div>
          </div>

          <p className="text-white/60 text-sm mt-6">
            სამუშაო საათები: ორშ–შაბ · 13:00 – 20:00.
          </p>
        </section>
      </div>
    </section>
  )
}
