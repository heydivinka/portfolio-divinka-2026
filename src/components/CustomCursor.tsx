import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring configuration for the trailing big ball
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', moveCursor)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Trigger the cursor scale effect on all text and interactive elements
      const isTextOrInteractive = target.closest(
        'a, button, h1, h2, h3, h4, h5, h6, p, span, li, label, strong, em, .hover-target, .hover-underline'
      )
      
      if (isTextOrInteractive) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <div className="pointer-events-none fixed inset-0 z-[10001] hidden sm:block mix-blend-difference overflow-hidden">
      {/* Big Ball */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute left-0 top-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: isHovering ? 4 : 1 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
        >
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" fill="#f7f8fa" strokeWidth="0" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Small Ball */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute left-0 top-0 flex items-center justify-center"
      >
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" fill="#f7f8fa" strokeWidth="0" />
        </svg>
      </motion.div>
    </div>
  )
}
