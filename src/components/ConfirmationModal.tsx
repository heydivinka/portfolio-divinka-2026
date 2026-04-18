import { motion, AnimatePresence } from 'framer-motion'
import { FaShieldAlt, FaPaperPlane, FaTimes } from 'react-icons/fa'
import { useEffect } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, isLoading }: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Modal Content - Forced Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
          >
            {/* Background Accent */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-zinc-50 dark:bg-zinc-800/50" />
            
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <FaShieldAlt className="animate-pulse" />
              </div>

              <h3 className="mt-6 text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                A Moment of Wisdom
              </h3>
              
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                Words carry weight. Once sent, your message travels across the digital void to my inbox. 
                <span className="block mt-2 font-medium italic text-zinc-900 dark:text-zinc-200">
                  "Speak with truth and intent; let your curiosity be genuine, not suspicious."
                </span>
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white py-4 text-xs font-bold text-zinc-500 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:text-sm"
                >
                  <FaTimes className="text-[10px]" />
                  Wait, let me check
                </button>
                
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="group relative flex-[1.5] flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 py-4 text-xs font-bold text-white transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 sm:text-sm"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="text-[10px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
