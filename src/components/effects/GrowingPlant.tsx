import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GrowingPlantProps {
  sectionId: string
  position?: "left" | "right"
  className?: string
}

const plantConfigs = {
  left: {
    svg: `<svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 140V55" stroke="rgba(91,143,90,0.06)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 65 Q30 40 15 55" stroke="rgba(91,143,90,0.10)" strokeWidth="1.5" strokeLinecap="round" class="stem-1"/>
      <path d="M50 50 Q65 25 78 38" stroke="rgba(91,143,90,0.10)" strokeWidth="1.5" strokeLinecap="round" class="stem-2"/>
      <path d="M50 35 Q35 15 20 25" stroke="rgba(91,143,90,0.08)" strokeWidth="1.5" strokeLinecap="round" class="stem-3"/>
      <path d="M50 22 Q60 8 72 15" stroke="rgba(91,143,90,0.08)" strokeWidth="1.2" strokeLinecap="round" class="stem-4"/>
      <ellipse cx="15" cy="52" rx="7" ry="3.5" fill="rgba(91,143,90,0.05)" class="leaf-1"/>
      <ellipse cx="78" cy="35" rx="6" ry="3" fill="rgba(91,143,90,0.05)" class="leaf-2"/>
      <ellipse cx="20" cy="22" rx="6" ry="3" fill="rgba(91,143,90,0.04)" class="leaf-3"/>
      <ellipse cx="72" cy="12" rx="5" ry="2.5" fill="rgba(91,143,90,0.04)" class="leaf-4"/>
      <circle cx="50" cy="8" r="3" fill="rgba(91,143,90,0.06)" class="flower-1"/>
      <circle cx="50" cy="8" r="5" fill="none" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" class="flower-2"/>
    </svg>`,
  },
  right: {
    svg: `<svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 140V55" stroke="rgba(91,143,90,0.06)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 65 Q70 40 85 55" stroke="rgba(91,143,90,0.10)" strokeWidth="1.5" strokeLinecap="round" class="stem-1"/>
      <path d="M50 50 Q35 25 22 38" stroke="rgba(91,143,90,0.10)" strokeWidth="1.5" strokeLinecap="round" class="stem-2"/>
      <path d="M50 35 Q65 15 80 25" stroke="rgba(91,143,90,0.08)" strokeWidth="1.5" strokeLinecap="round" class="stem-3"/>
      <ellipse cx="85" cy="52" rx="7" ry="3.5" fill="rgba(91,143,90,0.05)" class="leaf-1"/>
      <ellipse cx="22" cy="35" rx="6" ry="3" fill="rgba(91,143,90,0.05)" class="leaf-2"/>
      <ellipse cx="80" cy="22" rx="6" ry="3" fill="rgba(91,143,90,0.04)" class="leaf-3"/>
      <circle cx="50" cy="8" r="3" fill="rgba(91,143,90,0.06)" class="flower-1"/>
      <circle cx="50" cy="8" r="5" fill="none" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" class="flower-2"/>
    </svg>`,
  },
}

export default function GrowingPlant({ sectionId, position = "left", className = "" }: GrowingPlantProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const section = document.getElementById(sectionId)
    if (!container || !section) return

    const stems = container.querySelectorAll<SVGPathElement>(".stem-1, .stem-2, .stem-3, .stem-4")
    const leaves = container.querySelectorAll<SVGEllipseElement>(".leaf-1, .leaf-2, .leaf-3, .leaf-4")
    const flowers = container.querySelectorAll<SVGCircleElement>(".flower-1, .flower-2")

    stems.forEach((el) => {
      const len = el.getTotalLength()
      el.style.strokeDasharray = String(len)
      el.style.strokeDashoffset = String(len)
    })
    leaves.forEach((el) => gsap.set(el, { scale: 0, opacity: 0 }))
    flowers.forEach((el) => gsap.set(el, { scale: 0, opacity: 0 }))

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      })

      stems.forEach((el, i) => {
        tl.to(el, { strokeDashoffset: 0, duration: 1.5 + i * 0.3, ease: "power2.out" }, i * 0.15)
      })

      leaves.forEach((el, i) => {
        tl.to(el, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.8 + i * 0.15)
      })

      if (flowers.length > 0) {
        tl.to(flowers, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2.5)" }, "-=0.3")
      }
    }, container)

    return () => ctx.revert()
  }, [sectionId])

  const config = plantConfigs[position]

  return (
    <div
      ref={containerRef}
      className={`absolute bottom-0 ${position === "left" ? "left-0" : "right-0"} w-24 h-35 pointer-events-none opacity-60 ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: config.svg }}
    />
  )
}
