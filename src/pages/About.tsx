import { Link } from "@/components/common/ScrollLink"
import { motion } from "framer-motion"
import plant1 from "@/assets/plant1-removebg-preview.png"

export default function About() {
  return (
    <main className="bg-off-white pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-[1.0] tracking-tight mb-8">
              Cultivating
              <br />
              <span className="italic font-light text-accent/50">Connection</span>
            </h1>
            <p className="text-subtle/60 text-sm md:text-base leading-relaxed mb-6 font-light">
              GreenNest was born from a simple belief: that plants are not mere decoration, but living sculptures that transform the spaces we inhabit.
            </p>
            <p className="text-subtle/60 text-sm md:text-base leading-relaxed mb-8 font-light">
              Every specimen we offer is hand-selected from ethical growers who share our commitment to sustainable horticulture. We work directly with small nurseries across the Mediterranean and Southeast Asia, ensuring each plant arrives at your door in peak condition.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/shop" className="inline-flex items-center gap-3 h-13 px-7 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all">
                Explore Collection &rarr;
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="relative overflow-hidden rounded-[28px] shadow-organic-lg" style={{ aspectRatio: "4/5" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-accent/5 to-cream" />
              <img src={plant1} alt="" className="w-full h-full object-cover plant-shadow" />
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-forest hidden lg:flex flex-col items-center justify-center shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <span className="text-3xl font-heading text-white">2024</span>
              <span className="text-white/40 text-[9px] tracking-wider uppercase mt-1">Founded</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
