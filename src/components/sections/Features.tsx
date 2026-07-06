import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import GrowingVines from "@/components/effects/GrowingVines"
import plant7 from "@/assets/plant7-removebg-preview.png"

const features = [
  {
    number: "01",
    title: "Curated Selection",
    description: "Every specimen is hand-chosen by our horticulturists for its form, health, and character. No two plants are exactly alike.",
    link: "/shop",
  },
  {
    number: "02",
    title: "Sustainable Practice",
    description: "We partner with growers who share our commitment to ethical cultivation and biodegradable packaging.",
    link: "/about",
  },
  {
    number: "03",
    title: "Lifetime Support",
    description: "From watering schedules to troubleshooting, our plant experts are with you for the life of your plant.",
    link: "/contact",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] } },
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const navigate = useNavigate()

  return (
    <section ref={sectionRef} className="py-32 bg-cream overflow-hidden" id="features">
      <GrowingVines id="features" className="top-0 h-20" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] }}
              className="relative overflow-hidden rounded-[28px] shadow-organic-lg"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={plant7}
                alt="Indoor garden"
                className="w-full h-full object-cover plant-shadow"
                style={{ filter: "grayscale(0.1) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent opacity-40" />
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-accent/60 text-xs font-medium tracking-[0.3em] uppercase mb-6 block"
            >
              Our Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.05] tracking-tight text-forest mb-16"
            >
              More Than
              <br />
              <span className="italic font-light text-accent/50">Just Plants</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-12"
            >
              {features.map((f) => (
                <motion.div
                  key={f.number}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => navigate(f.link)}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-4xl font-heading font-light text-forest/15 leading-none group-hover:text-accent/40 transition-colors duration-500">
                      {f.number}
                    </span>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-heading font-medium mb-3 text-forest group-hover:text-accent/80 transition-colors duration-300">
                        {f.title}
                      </h3>
                      <p className="text-sm text-subtle/60 leading-relaxed max-w-sm font-light">
                        {f.description}
                      </p>
                    </div>
                    <span className="text-subtle/30 group-hover:text-accent/50 group-hover:translate-x-1 transition-all duration-300 mt-1">
                      &rarr;
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
