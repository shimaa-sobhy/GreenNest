import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GrowingVinesProps {
  id: string
  className?: string
}

const vinePaths: Record<string, { path: string; leaf?: string }[]> = {
  "why-choose-us": [
    { path: "M0 50 Q60 10 120 35 Q180 60 240 20 Q280 0 320 25" },
    { path: "M0 70 Q40 40 80 60 Q130 80 180 50 Q220 30 260 55" },
    { path: "M0 30 Q80 0 160 25 Q220 50 280 15" },
  ],
  "our-plants": [
    { path: "M0 40 Q50 0 100 25 Q160 55 220 20 Q260 0 300 30" },
    { path: "M0 60 Q70 35 140 50 Q200 70 260 40 Q300 20 340 45" },
  ],
  testimonials: [
    { path: "M0 40 Q80 5 160 30 Q220 55 280 20 Q320 0 360 35" },
    { path: "M0 60 Q60 30 120 50 Q180 70 240 40 Q300 15 360 45" },
  ],
  newsletter: [
    { path: "M0 30 Q40 0 80 20 Q130 45 180 15 Q220 0 260 25" },
    { path: "M0 50 Q60 20 120 40 Q170 60 220 30 Q260 10 300 35" },
  ],
  features: [
    { path: "M0 35 Q50 5 100 25 Q150 45 200 15 Q250 0 300 28" },
  ],
  "promo-banner": [
    { path: "M0 30 Q70 0 140 20 Q200 40 260 15 Q300 0 340 25" },
  ],
  banner: [
    { path: "M0 25 Q40 0 80 15 Q130 35 180 10" },
  ],
  "featured-categories": [
    { path: "M0 45 Q60 10 120 35 Q180 60 240 25 Q280 5 320 30" },
  ],
}

export default function GrowingVines({ id, className = "" }: GrowingVinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const paths = vinePaths[id] || vinePaths["why-choose-us"]

  useEffect(() => {
    const svg = svgRef.current
    const section = sectionRef.current
    if (!svg || !section) return

    const pathEls = svg.querySelectorAll<SVGPathElement>(".vine-path")
    pathEls.forEach((el) => {
      const len = el.getTotalLength()
      el.style.strokeDasharray = String(len)
      el.style.strokeDashoffset = String(len)
    })

    const ctx = gsap.context(() => {
      pathEls.forEach((el, i) => {
        const len = el.getTotalLength()
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 2.5 + i * 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [id])

  return (
    <div ref={sectionRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 360 80"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            className="vine-path"
            d={p.path}
            stroke="rgba(91, 143, 90, 0.10)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  )
}
