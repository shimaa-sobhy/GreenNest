import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, Leaf, HeartHandshake } from "lucide-react"
import GrowingVines from "@/components/effects/GrowingVines"
import GrowingPlant from "@/components/effects/GrowingPlant"
import plant1 from "@/assets/plant1-removebg-preview.png"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const reasons = [
  { icon: Shield, title: "Hand-Selected Quality", description: "Every specimen is personally chosen by our horticulturists for its form, health, and unique character. We never settle for less." },
  { icon: Leaf, title: "Sustainable Practice", description: "We partner exclusively with ethical growers who share our commitment to the planet — from biodegradable pots to carbon-neutral shipping." },
  { icon: HeartHandshake, title: "Lifetime Support", description: "Every plant comes with ongoing expert guidance. From watering schedules to troubleshooting, we're with you for the life of your plant." },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 30%"],
  })

  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={sectionRef} className="relative py-36 bg-cream overflow-hidden" id="why-choose-us">
      <GrowingVines id="why-choose-us" className="top-0 h-20" />
      <GrowingPlant sectionId="why-choose-us" position="left" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.0] tracking-tight text-forest">
            Crafted with
            <br />
            <span className="italic font-light text-accent/50">Purpose</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <motion.div
              className="relative overflow-hidden rounded-[28px] shadow-organic-lg"
              style={{ aspectRatio: "4/5" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-cream to-cream/50" />
              <motion.img
                src={plant1}
                alt="Featured plant"
                className="relative w-full h-full object-cover scale-[1.06] plant-shadow brightness-[1.06] contrast-[1.02]"
                style={{ y: imageParallax }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/30 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl bg-forest flex flex-col items-center justify-center shadow-xl"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <span className="text-3xl font-heading text-white">10+</span>
              <span className="text-white/45 text-[9px] tracking-wider uppercase mt-1">Years</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {reasons.map((r) => (
              <motion.div key={r.title} variants={itemVariants} className="group">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <r.icon className="w-5 h-5 text-accent/60" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-heading mb-3 leading-snug text-forest">{r.title}</h3>
                <p className="text-sm text-subtle/60 leading-relaxed font-light max-w-md">{r.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
