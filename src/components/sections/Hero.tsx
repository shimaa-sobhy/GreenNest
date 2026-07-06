import { useRef, useEffect, useState } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import plant7 from "@/assets/plant7-removebg-preview.png"
import plant1 from "@/assets/plant1-removebg-preview.png"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -30])

  const mouseX = useSpring(useMotionValue(0.5), { stiffness: 100, damping: 30 })
  const mouseY = useSpring(useMotionValue(0.5), { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  const parallaxX = useTransform(mouseX, [0, 1], [-20, 20])
  const parallaxY = useTransform(mouseY, [0, 1], [-20, 20])
  const foliageX = useTransform(mouseX, [0, 1], [-35, 35])
  const foliageY = useTransform(mouseY, [0, 1], [-30, 30])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-forest" id="hero">
      <motion.div ref={bgRef} className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <div className="absolute inset-0">
          <img
            src={plant7}
            alt=""
            className="w-full h-full object-cover opacity-30 saturate-[0.3] brightness-[0.45]"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
      </motion.div>

      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-32 pointer-events-none opacity-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 80 Q180 40 360 70 Q540 100 720 50 Q900 0 1080 60 Q1260 120 1440 40 L1440 120 L0 120Z"
          fill="#123524"
        />
      </svg>

      <motion.div
        className="absolute top-[12%] right-[4%] w-64 h-64 opacity-[0.07]"
        style={{ x: foliageX, y: foliageY }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob plant-shadow" />
      </motion.div>

      <motion.div
        className="absolute bottom-[8%] right-[20%] w-48 h-48 opacity-[0.06]"
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={plant7} alt="" className="w-full h-full object-cover organic-blob-2 plant-shadow" />
      </motion.div>

      <motion.div
        className="absolute top-[50%] left-[2%] w-28 h-28 opacity-[0.05]"
        animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob-3 plant-shadow" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-7xl px-6 lg:px-10 min-h-screen flex items-center"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full pt-36 pb-24">
          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <motion.span
                className="w-10 h-px bg-white/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              />
              <span className="text-white/40 text-xs font-medium tracking-[0.2em] uppercase">
                Premium Botanical Studio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading text-white leading-[0.85] tracking-tight mb-8"
            >
              Nature
              <br />
              <span className="italic font-light text-white/40">Redefined</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-white/30 text-base md:text-lg leading-relaxed max-w-lg mb-12 font-light tracking-wide"
            >
              Curated living sculptures for the modern interior. Each specimen hand-selected for its character and presence.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 h-14 px-9 rounded-xl bg-white text-forest text-xs font-semibold tracking-wider uppercase hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:shadow-white/10"
              >
                Explore Collection &rarr;
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 h-14 px-9 text-white/40 text-xs font-semibold tracking-wider uppercase border border-white/15 rounded-xl hover:text-white hover:border-white/30 transition-all duration-500"
              >
                Our Story
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-10 gap-y-3 mt-24">
              {["Hand-Selected", "Sustainable", "Free Shipping"].map((label, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-3"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  >
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-white/25 text-xs tracking-wider uppercase font-light">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
