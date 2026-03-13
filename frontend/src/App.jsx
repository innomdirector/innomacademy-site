import './App.css'

import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import LayoutHeader from './components/header/LayoutHeader';
import Courses from './pages/courses/CoursesComponents/Courses';
import AboutCourse from './pages/courses/CoursesComponents/AboutCourse';
import Registration from './pages/registration/Registration';
import Hello from './components/helloComponent/Hello';
import MainLayout from './pages/Main/MainLayout';
import SuccessRoad from './pages/successPage/SuccessRoad';
import Contact from './pages/contact/Contact';
import Footer from './components/footer/Footer';
import FloatingRegisterCTA from './components/common/FloatingRegisterCTA';
import Blogs from './pages/blog/Blogs';
import ReadBlog from './pages/blog/ReadBlog';
import NotFound from './pages/NotFound/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <Hello />
      {/* Global page background + header */}
      {/* bg-[radial-gradient(ellipse_at_center,#0a1428_20%,#000000_65%)] */}
      <div className="relative min-h-screen text-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-40 bottom-0 -z-50 w-full bg-[#010408]
          shadow-[inset_0_160px_260px_rgba(5,5,5,0.85)]
          mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_0,rgba(0,0,0,0.25)_180px,rgba(0,0,0,1)_720px)]
          [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0,rgba(0,0,0,0.25)_180px,rgba(0,0,0,1)_720px)]"
        />
        <div className="relative z-10">
          <LayoutHeader />
          <ScrollToTop />
          <main>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<AboutCourse />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/success" element={<SuccessRoad />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:slug" element={<ReadBlog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <FloatingRegisterCTA />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
