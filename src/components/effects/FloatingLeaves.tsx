import { useEffect, useRef } from "react"
import gsap from "gsap"

const leaves = [
  { x: 5, size: 16, delay: 0, duration: 6, rotate: 0 },
  { x: 15, size: 11, delay: 1.5, duration: 7, rotate: 45 },
  { x: 25, size: 13, delay: 3, duration: 5, rotate: 90 },
  { x: 35, size: 9, delay: 0.5, duration: 8, rotate: 135 },
  { x: 45, size: 14, delay: 2, duration: 6.5, rotate: 180 },
  { x: 55, size: 10, delay: 4, duration: 7.5, rotate: 225 },
  { x: 65, size: 12, delay: 1, duration: 5.5, rotate: 270 },
  { x: 75, size: 8, delay: 3.5, duration: 9, rotate: 315 },
  { x: 85, size: 15, delay: 0.8, duration: 6, rotate: 20 },
  { x: 92, size: 10, delay: 2.5, duration: 7, rotate: 60 },
  { x: 20, size: 7, delay: 4.5, duration: 4, rotate: 110 },
  { x: 60, size: 6, delay: 2.2, duration: 5, rotate: 200 },
  { x: 40, size: 8, delay: 5, duration: 6, rotate: 330 },
  { x: 50, size: 5, delay: 1.8, duration: 4.5, rotate: 150 },
  { x: 70, size: 9, delay: 3.2, duration: 7, rotate: 280 },
]

export default function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const leafEls = container.querySelectorAll<HTMLDivElement>(".leaf-particle")
    leafEls.forEach((el) => {
      const delay = Number(el.dataset.delay) || 0
      const dur = Number(el.dataset.duration) || 8
      gsap.to(el, {
        y: -window.innerHeight - 100,
        x: `random(-120, 120)`,
        rotate: `random(-45, 45)`,
        duration: dur + 2,
        delay,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: (y) => {
            if (parseFloat(y) < -200) return window.innerHeight + 80 + "px"
            return y
          },
        },
      })
    })

    return () => {
      leafEls.forEach((el) => gsap.killTweensOf(el))
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="leaf-particle absolute"
          style={{
            left: `${leaf.x}%`,
            top: "105%",
            width: leaf.size,
            height: leaf.size * 1.4,
          }}
          data-delay={leaf.delay}
          data-duration={leaf.duration}
        >
          <svg viewBox="0 0 24 32" className="w-full h-full" style={{ transform: `rotate(${leaf.rotate}deg)` }}>
            <path
              d="M12 31C12 31 2 20 2 10C2 4 6 1 12 1C18 1 22 4 22 10C22 20 12 31 12 31Z"
              fill="rgba(91, 143, 90, 0.10)"
              stroke="rgba(91, 143, 90, 0.06)"
              strokeWidth="0.5"
            />
            <path d="M12 31L12 4" stroke="rgba(91, 143, 90, 0.04)" strokeWidth="0.5" />
            <path d="M12 14L7 9" stroke="rgba(91, 143, 90, 0.04)" strokeWidth="0.5" />
            <path d="M12 14L17 9" stroke="rgba(91, 143, 90, 0.04)" strokeWidth="0.5" />
          </svg>
        </div>
      ))}
    </div>
  )
}
