import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  title: string
  message: string
}

const sounds = {
  success: 'https://assets.mixkit.co/sfx/preview/mixkit-success-notification-alert-2445.mp3',
  error: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
}

export function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
  const successAudioRef = useRef<HTMLAudioElement | null>(null)
  const errorAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const playSound = () => {
        const audio = type === 'success' ? successAudioRef.current : errorAudioRef.current
        if (audio) {
          audio.currentTime = 0
          audio.play().catch(err => {
            console.warn('Audio playback was blocked or failed:', err)
          })
        }
      }

      timer = setTimeout(playSound, 100)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, type])

  return (
    <>
      <audio ref={successAudioRef} src={sounds.success} preload="auto" />
      <audio ref={errorAudioRef} src={sounds.error} preload="auto" />
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop - Copied from ConfirmationModal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
            />

            {/* Modal Content - Copied and adapted from ConfirmationModal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-10"
            >
              {/* Background Accent */}
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-10 ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              
              <div className="relative text-center">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-lg ${
                    type === 'success' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                </motion.div>

                <h3 className="mt-8 text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {title}
                </h3>
                
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {message}
                </p>

                <div className="mt-10">
                  <button
                    onClick={onClose}
                    className={`group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-bold text-white transition-all sm:text-base ${
                      type === 'success'
                        ? 'bg-zinc-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-100'
                        : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                    }`}
                  >
                    <span>{type === 'success' ? 'Great, thanks!' : 'Let me fix it'}</span>
                    <FaTimes className={`text-[10px] transition-transform ${
                      type === 'success' ? 'group-hover:rotate-90' : 'group-hover:scale-110'
                    }`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
