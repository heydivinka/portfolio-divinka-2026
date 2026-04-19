import { motion } from 'framer-motion'

export function WavyUnderline() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.7 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ 
        duration: 2.2, // Slower, more deliberate reveal
        ease: [0.16, 1, 0.3, 1], 
      }}
      className="absolute bottom-0 left-0 h-[8px] w-full origin-left"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4' width='20' height='4'%3E%3Cpath d='M0 2.5c4 0.5 6-2 10-2s6 2.5 10 2' fill='none' stroke='%23EDCB50' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '24px 8px',
      }}
    >
      <motion.div
        animate={{ 
          x: [0, 24],
          y: [0, -1, 1, 0], // Subtle vertical "shiver" for scribble feel
          scaleY: [1, 1.1, 0.9, 1]
        }}
        transition={{ 
          x: { duration: 8, repeat: Infinity, ease: "linear" }, // Much slower flow
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scaleY: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="h-full w-full"
      />
    </motion.div>
  )
}
