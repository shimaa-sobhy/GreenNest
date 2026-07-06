import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StatItem {
  value: number
  suffix: string
  label: string
  prefix?: string
  decimals?: number
}

const stats: StatItem[] = [
  { value: 15, suffix: "K+", label: "Happy Collectors", prefix: "" },
  { value: 200, suffix: "+", label: "Species Curated", prefix: "" },
  { value: 50, suffix: "+", label: "Cities Reached", prefix: "" },
  { value: 4.9, suffix: "", label: "Average Rating", prefix: "", decimals: 1 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] } },
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-28 bg-off-white overflow-hidden" id="stats">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] }}
          className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left mb-16"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={statVariants} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-none mb-3 tracking-tight">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <p className="text-xs text-subtle/40 tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
