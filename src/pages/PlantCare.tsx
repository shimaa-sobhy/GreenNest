import { Link } from "@/components/common/ScrollLink"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useScrollRestore } from "@/hooks/useScrollRestore"
import { PlantCareSkeleton } from "@/components/ui/Skeleton"
import { plantCareGuides } from "@/data/plantCare"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function PlantCare() {
  useScrollRestore("plantcare_scroll")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-off-white pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Journal</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-[1.0] tracking-tight mb-6">
            Plant Care
            <br />
            <span className="italic font-light text-accent/50">Guides</span>
          </h1>
          <p className="text-subtle/50 text-sm md:text-base font-light">
            Expert advice to help your botanical collection thrive.
          </p>
        </motion.div>

        {loading ? (
          <PlantCareSkeleton />
        ) : (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {plantCareGuides.map((guide, i) => (
            <motion.div
              key={guide.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Link to={`/plant-care/${guide.id}`} className="group block">
                <motion.div
                  className="relative overflow-hidden rounded-[28px] mb-5 bg-forest shadow-organic"
                  style={{ aspectRatio: "4/3" }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={guide.image} alt={guide.title} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-40 transition-all duration-700 scale-100 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-white/30 text-[10px] tracking-wider uppercase font-medium">{guide.difficulty}</span>
                  </div>
                </motion.div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[10px] tracking-wider uppercase text-accent/50 px-2.5 py-1 bg-accent/8 rounded-full font-medium">{guide.light}</span>
                  <span className="text-[10px] tracking-wider uppercase text-accent/50 px-2.5 py-1 bg-accent/8 rounded-full font-medium">{guide.water}</span>
                </div>
                <h2 className="font-heading text-lg md:text-xl text-forest leading-snug group-hover:text-accent/80 transition-colors">{guide.title}</h2>
                <p className="text-sm text-subtle/50 font-light mt-2 leading-relaxed">{guide.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </main>
  )
}
