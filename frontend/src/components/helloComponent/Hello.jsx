import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Hello() {
  const [fullText, setFullText] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    // Check if greeting has already been shown
    const greetingShown = localStorage.getItem('greetingShown')
    if (greetingShown === 'true') {
      setIsVisible(false)
      return
    }

    // Get user name from localStorage
    const userName = localStorage.getItem('userName') || ''

    
    // Full text to display
    const text = `გამარჯობა! კეთილი იყოს შენი მობრძანება INNO\u00A0M-ის ვებსაიტზე. ისწავლე ჩვენთან ყველაფერი ის, რაც ამ ვებსაიტზე მოგეწონება.`
    setFullText(text)
    
    // Calculate timing (6 seconds for typing, 2 seconds display = 8 total)
    const typingDuration = 6000
    const displayDuration = 2000

    // Start animation after small delay
    setTimeout(() => {
      setStartAnimation(true)
    }, 200)

    // Hide after total duration and mark as shown
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem('greetingShown', 'true')
    }, typingDuration + displayDuration + 200)
  }, [])

  // Split text into words, then characters within each word for smooth animation
  const words = fullText.split(/(\s+)/).filter(word => word.length > 0)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
        >
          {/* Layered background with overlays */}
          <motion.div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-linear-to-br from-blue-950 via-slate-950 to-cyan-950"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.3),transparent_55%)]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.22),transparent_60%)]"
            />

            <motion.div
              animate={{ x: [0, 30, -10, 0], y: [0, -18, 12, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -20, 15, 0], y: [0, 16, -10, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
            />

            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(12px)' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-black/35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] opacity-30" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
          </motion.div>
          
          {/* Text content */}
          <div className="relative z-10 max-w-5xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/15 bg-white/5 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_0_70px_rgba(14,165,233,0.25)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/15 via-transparent to-cyan-300/15" />
              <div className="pointer-events-none absolute -inset-6 rounded-4xl bg-cyan-400/15 blur-2xl" />
              <div
                className="relative text-slate-50 font-a text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)]"
                style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
              >
                <motion.span
                  initial="hidden"
                  animate={startAnimation ? "visible" : "hidden"}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.1,
                      }
                    }
                  }}
                  className="inline-block"
                >
                  {words.map((word, wordIndex) => {
                    const chars = word.split('')
                    
                    return (
                      <span 
                        key={wordIndex} 
                        className="inline-block"
                        style={{ wordBreak: 'keep-all' }}
                      >
                        {chars.map((char, charIndex) => (
                          <motion.span
                            key={`${wordIndex}-${charIndex}`}
                            variants={{
                              hidden: { 
                                opacity: 0,
                                y: 0,
                                scale: 1,
                                filter: "blur(4px)"
                              },
                              visible: { 
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                                transition: {
                                  duration: 0.4,
                                  ease: [0.25, 0.46, 0.45, 0.94]
                                }
                              }
                            }}
                            className="inline-block"
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </span>
                    )
                  })}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Hello
