import { useRef } from "react"
import { motion } from "framer-motion"
import GrowingPlant from "@/components/effects/GrowingPlant"
import plant7 from "@/assets/plant7-removebg-preview.png"
import plant1 from "@/assets/plant1-removebg-preview.png"

const testimonials = [
  {
    quote: "The Monstera I received is absolutely stunning. You can feel the care that went into packaging and selection. This isn't just a plant shop — it's a living gallery.",
    author: "Elena R.",
    role: "Interior Designer, NYC",
    image: plant7,
  },
  {
    quote: "I've never seen plants this healthy from an online shop. Every leaf is perfect. The care guide that came with my order was incredibly detailed and helpful.",
    author: "Marcus T.",
    role: "Plant Enthusiast, Portland",
    image: plant1,
  },
  {
    quote: "Their customer service is extraordinary. When I had questions about repotting, an actual horticulturist walked me through it over the phone. Unbelievable.",
    author: "Priya K.",
    role: "Botanical Artist, LA",
    image: plant7,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative py-36 bg-cream overflow-hidden" id="testimonials">
      <GrowingPlant sectionId="testimonials" position="left" />

      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 opacity-[0.03] pointer-events-none"
        animate={{ rotate: [12, 15, 10, 12], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={plant7} alt="" className="w-full h-full object-cover organic-blob plant-shadow" />
      </motion.div>
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 opacity-[0.03] pointer-events-none"
        animate={{ rotate: [-12, -15, -9, -12], y: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob-2 plant-shadow" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.0] tracking-tight text-forest">
            From Our
            <br />
            <span className="italic font-light text-accent/50">Community</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="group relative bg-card rounded-[28px] p-8 md:p-10 shadow-organic-lg border border-forest/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(18,53,36,0.06)" }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mb-8">
                <img src={t.image} alt={t.author} className="w-full h-full object-cover plant-shadow" />
              </div>
              <p className="text-sm leading-relaxed text-subtle/60 font-light mb-10">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="text-sm font-heading text-forest">{t.author}</p>
                <p className="text-[10px] text-subtle/40 tracking-wider uppercase mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
