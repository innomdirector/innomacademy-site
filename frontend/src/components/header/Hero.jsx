import React from 'react'
import { motion } from 'framer-motion'
function Hero() {
  return (
    <section className="max-w-7xl m-auto" aria-labelledby="hero-title">
      <div>
        <article className=" mt-18 md:mt-24 relative bg-[#06111e5d] rounded-2xl p-10 overflow-hidden min-h-137.5 flex items-center justify-start flex-col lg:justify-start">
          
          {/* text */}
          <div className="relative z-10 w-full">
            <motion.h1
              id="hero-title"
              className="text-blue-400 font-sanet font-light tracking-wider text-4xl sm:text-5xl md:text-6xl lg:text-7xl "
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
            >
              INNO M აკადემია
            </motion.h1>

            <motion.h2
              className="text-lg sm:text-2xl md:text-3xl text-white font-mersad1 mt-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3, ease: 'easeOut' }}
            >
              გაასწარი დროს ჩვენთან ერთად!
            </motion.h2>

          </div>

          {/* image */}
          <figure className="z-10 sm:z-0 absolute -right-20 sm:-right-35 sm:-bottom-15 md:-bottom-27.5 -bottom-12.5 w-107.5 sm:w-185 md:w-205 lg:w-250 pointer-events-none">
            <motion.img
              src="/images/DSC002525.webp"
              alt="INNO M Academy-ის სტუდენტი"
              className="w-full origin-bottom"
              width="1200"
              height="900"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              initial={{ 
                y: 60, 
                scale: 0.92, 
                opacity: 0 
              }}
              animate={{ 
                y: 0, 
                scale: 1.1, 
                opacity: 1 
              }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
            />
          </figure>

          <div 
            className="
              absolute left-10 sm:left-2 
              bottom-[32%] md:bottom-5 
              grid grid-cols-2 grid-rows-2 gap-6 sm:gap-8 md:gap-6 
              sm:flex sm:flex-row sm:flex-wrap sm:items-end
              w-[min(90vw,240px)] sm:w-auto
            "
          >
            <motion.img
              className='w-16 sm:w-18 md:w-24 -rotate-3'
              src='/icon-images/react.png'
              alt='React'
              animate={{ y: [-8, 0, -8], rotate: [-3, 0, -3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              className='w-16 sm:w-18 md:w-26 rotate-3'
              src='/icon-images/python.png'
              alt='Python'
              animate={{ y: [6, 0, 6], rotate: [2, 0, 2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              className='w-16 sm:w-18 md:w-24 rotate-3'
              src='/icon-images/js.png'
              alt='JavaScript'
              animate={{ y: [4, 0, 4], rotate: [3, 0, 3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              className='w-16 sm:w-18 md:w-24 -rotate-2'
              src='/icon-images/go-old.png'
              alt='Go'
              animate={{ y: [10, 0, 10], rotate: [-2, 0, -2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>




        </article>
        <section className="max-w-7xl w-full mx-auto mt-10 md:mt-16 overflow-x-hidden marquee-mask font-mersad1" aria-label="სასწავლო მიმართულებების სლაიდერი">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap py-4 text-[#7dd3fc] cursor-crosshair">
            {(() => {
              const labels = [
                "3D მოდელინგი",
                "Full-Stack პროგრამირება",
                "ალგორითმები და კოდი",
                "ხელოვნური ინტელექტი",
                "მონაცემთა მეცნიერება",
                "დისკრეტული მათემატიკა",
              ];
              return [...labels, ...labels].map((label, i) => (
                <span key={i} className="text-xl font-light tracking-wide md:text-2xl" aria-label={`სასწავლო მიმართულება: ${label}`}>
                  {label}
                </span>
              ));
            })()}
          </div>
        </section>
        {/* <InnoM3D /> */}
      </div>
    </section>
  )
}

export default Hero
