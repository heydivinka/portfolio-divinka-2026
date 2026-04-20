import { useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

const BLOB_COUNT = 6

export function BackgroundBlobs() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize physics data with Edge Origins and Formation Offsets
  const blobs = useRef(
    [...Array(BLOB_COUNT)].map((_, i) => {
      // Spawn at different edges
      const edgeX = i % 2 === 0 ? -200 : window.innerWidth + 200
      const edgeY = (i * 500) % 3000
      
      return {
        x: edgeX,
        y: edgeY,
        vx: 0,
        vy: 0,
        size: 250 + (i % 2) * 50,
        // Formation offset so they don't fight for the same spot
        offsetX: (i % 3 - 1) * 120,
        offsetY: (Math.floor(i / 3) - 0.5) * 240,
        color: [
          'bg-indigo-500/15', 'bg-purple-500/15', 'bg-pink-500/15',
          'bg-blue-500/15', 'bg-violet-500/15', 'bg-fuchsia-500/15'
        ][i],
        darkColor: [
          'bg-indigo-400/10', 'bg-purple-400/10', 'bg-pink-400/10',
          'bg-blue-400/10', 'bg-violet-400/10', 'bg-fuchsia-400/10'
        ][i]
      }
    })
  )

  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.pageX)
      mouseY.set(e.pageY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useAnimationFrame((time) => {
    const tx = mouseX.get()
    const ty = mouseY.get()

    // 1. Update Physics with Formation Attraction
    blobs.current.forEach((blob) => {
      // Each blob targets a unique spot around the mouse
      const targetX = tx + blob.offsetX
      const targetY = ty + blob.offsetY
      
      const dx = targetX - blob.x
      const dy = targetY - blob.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist > 1) {
        const force = Math.min(dist * 0.0003, 0.15)
        blob.vx += dx * force * 0.0008
        blob.vy += dy * force * 0.0008
      }
      
      blob.vx *= 0.94
      blob.vy *= 0.94
      
      blob.x += blob.vx
      blob.y += blob.vy
    })

    // 2. Resolve Mutual Collisions (Rigid Body Logic)
    for (let i = 0; i < BLOB_COUNT; i++) {
      for (let j = i + 1; j < BLOB_COUNT; j++) {
        const b1 = blobs.current[i]
        const b2 = blobs.current[j]
        
        const dx = b2.x - b1.x
        const dy = b2.y - b1.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        // No overlap: Sum of radii (0.5) + extra buffer (0.1) = 0.6
        const minDistance = (b1.size + b2.size) * 0.6 

        if (distance < minDistance) {
          // Very strong repulsion for solid rigid-body feel
          const angle = Math.atan2(dy, dx)
          const push = (minDistance - distance) * 0.25 
          
          const px = Math.cos(angle) * push
          const py = Math.sin(angle) * push
          
          b1.vx -= px
          b1.vy -= py
          b2.vx += px
          b2.vy += py
        }
      }
    }

    // 3. Update DOM
    blobs.current.forEach((blob, i) => {
      const el = refs.current[i]
      if (!el) return
      
      const padding = blob.size / 2
      const r1 = 40 + Math.sin(time * 0.001 + i) * 10
      const r2 = 60 + Math.cos(time * 0.001 + i) * 10
      
      el.style.transform = `translate3d(${blob.x - padding}px, ${blob.y - padding}px, 0)`
      el.style.borderRadius = `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${100-r2}% ${r1}% ${100-r1}% ${r2}%`
    })
  })

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden min-h-full w-full">
      {blobs.current.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`absolute left-0 top-0 ${blob.color} dark:${blob.darkColor}`}
          style={{ 
            width: blob.size, 
            height: blob.size, 
            willChange: 'transform',
            // Removed expensive drop-shadow and reduced blur slightly for massive mobile performance gains
            filter: 'blur(50px)' 
          }}
        >
          {/* Hidden on mobile to save GPU rendering, visible on larger screens */}
          <div className="absolute inset-[25%] rounded-full bg-white/20 blur-[40px] dark:bg-white/10 hidden sm:block" />
          <div className="absolute inset-[40%] rounded-full bg-white/30 blur-[20px] dark:bg-white/20 hidden sm:block" />
        </div>
      ))}
    </div>
  )
}
