import { useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useScroll, useTransform } from "framer-motion"
import GrowingVines from "@/components/effects/GrowingVines"
import plant7 from "@/assets/plant7-removebg-preview.png"

export default function Banner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: "80vh", minHeight: "600px" }} id="banner">
      <GrowingVines id="banner" className="top-0 h-20" />

      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={plant7}
          alt=""
          className="w-full h-full object-cover plant-shadow"
          style={{ objectPosition: "50% 40%", filter: "saturate(0.35) brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/20" />
      </motion.div>

      <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 w-full">
          <div className="max-w-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-6"
            >
              Seasonal Edition
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-white leading-[0.95] tracking-tight mb-6"
            >
              Spring
              <br />
              <span className="italic font-light text-white/40">Collection</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/30 text-sm md:text-base leading-relaxed mb-10 font-light max-w-sm"
            >
              A curated selection of our most vibrant specimens, ready for the season of renewal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 h-12 px-8 border border-white/20 text-white/40 text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-white hover:text-forest transition-all duration-500"
              >
                Discover{" "}
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
