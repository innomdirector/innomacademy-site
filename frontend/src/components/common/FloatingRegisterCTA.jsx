import React from 'react'
import { Link } from 'react-router-dom'

const FloatingRegisterCTA = () => (
  <>
    <div className="fixed bottom-6 right-6 z-[60] hidden min-[875px]:flex">
      <Link
        to="/registration"
        className="group inline-flex items-center gap-3 rounded-full border border-[#1e3a8a]/45 bg-[#0b1224]/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(2,6,23,0.55)] backdrop-blur-lg transition-all hover:-translate-y-0.5 hover:border-[#38bdf8]/55 hover:shadow-[0_18px_36px_rgba(59,130,246,0.4)]"
        aria-label="დარეგისტრირდი კურსზე"
      >
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
        დაიწყე სწავლა, დარეგისტრირდი
      </Link>
    </div>

    <div className="fixed inset-x-4 bottom-4 z-[60] min-[875px]:hidden">
      <Link
        to="/registration"
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#1e3a8a]/40 bg-[#0b1224]/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(2,6,23,0.55)] backdrop-blur-lg"
        aria-label="მობილური რეგისტრაცია"
      >
        <span className="text-white/85">დაიწყე განვითარება</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] px-4 py-2 text-xs font-semibold text-white">
          რეგისტრაცია
        </span>
      </Link>
    </div>
  </>
)

export default FloatingRegisterCTA
