import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertTriangle, FiX } from 'react-icons/fi'

export default function WarningToast({ open, message, onClose, duration = 3200 }) {
  useEffect(() => {
    if (!open) return undefined
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed top-5 left-1/2 z-120 w-[92%] max-w-2xl -translate-x-1/2"
          role="alert"
          aria-live="polite"
        >
          <div className="rounded-2xl border border-[#fdba74]/65 bg-linear-to-r from-[#f97316] to-[#fb923c] px-5 py-4 text-white shadow-[0_24px_48px_-14px_rgba(249,115,22,0.65)]">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#fff7ed]" />
              <p className="flex-1 text-sm sm:text-base font-semibold leading-relaxed">{message}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-white/90 transition-colors hover:bg-white/20"
                aria-label="დახურვა"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
