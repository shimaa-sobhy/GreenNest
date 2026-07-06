import { useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useScroll, useTransform } from "framer-motion"
import GrowingVines from "@/components/effects/GrowingVines"
import plant1 from "@/assets/plant1-removebg-preview.png"
import plant7 from "@/assets/plant7-removebg-preview.png"

export default function PromoBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden bg-forest" id="promo-banner">
      <GrowingVines id="promo-banner" className="top-0 h-20" />

      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <img src={plant1} alt="" className="w-full h-full object-cover opacity-20 saturate-[0.3] brightness-[0.5] plant-shadow" />
        <div className="absolute inset-0 bg-gradient-to-l from-forest via-forest/80 to-forest" />
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 w-40 h-40 opacity-[0.06] pointer-events-none"
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={plant7} alt="" className="w-full h-full object-cover organic-blob plant-shadow" />
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-8 w-24 h-24 opacity-[0.04] pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob-2 plant-shadow" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="inline-block text-white/30 text-xs font-medium tracking-[0.25em] uppercase mb-6">
              Limited Collection
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-[1.0] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Spring
            <br />
            <span className="italic font-light text-white/40">Refresh</span>
          </motion.h2>

          <motion.p
            className="text-white/30 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10 font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Complimentary botanical mist with every order. Celebrate the season of growth with our hand-selected spring collection.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 h-13 px-8 bg-white text-forest text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:shadow-white/10"
            >
              Shop Spring Collection &rarr;
            </Link>
            <Link
              to="/plant-care"
              className="inline-flex items-center gap-3 h-13 px-8 border border-white/20 text-white/40 text-xs font-semibold tracking-wider uppercase rounded-xl hover:text-white hover:border-white/40 transition-all"
            >
              Plant Care Guide
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
