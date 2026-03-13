import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../seo/Seo'

function NotFound() {
  return (
    <div className="min-h-screen text-white font-mersad2">
      <Seo
        title="გვერდი ვერ მოიძებნა | INNO M Academy"
        description="მოთხოვნილი გვერდი ვერ მოიძებნა."
        path="/404"
        noindex
      />
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-mersad1">404</h1>
        <p className="text-white/75 mt-4 text-lg">გვერდი ვერ მოიძებნა ან ბმული არასწორია.</p>
        <Link
          to="/"
          className="inline-flex mt-8 rounded-xl border border-[#38bdf8]/45 px-4 py-2 text-sm font-semibold text-[#7dd3fc] hover:bg-[#38bdf8]/10 transition-colors"
        >
          მთავარ გვერდზე დაბრუნება
        </Link>
      </div>
    </div>
  )
}

export default NotFound

