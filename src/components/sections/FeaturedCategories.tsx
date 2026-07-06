import { useEffect, useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GrowingPlant from "@/components/effects/GrowingPlant"
import plant1 from "@/assets/plant1-removebg-preview.png"
import shop2 from "@/assets/shop2.png"
import shop3 from "@/assets/shop3.png"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: "Indoor", image: plant1, count: "12 species", slug: "/shop" },
  { name: "Succulents", image: shop2, count: "8 species", slug: "/shop" },
  { name: "Cacti", image: shop3, count: "6 species", slug: "/shop" },
]

export default function FeaturedCategories() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".cat-reveal") as any,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-cream overflow-hidden" id="featured-categories">
      <GrowingPlant sectionId="featured-categories" position="left" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="cat-reveal">
            <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Collections</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.0] tracking-tight text-forest">
              Featured
              <br />
              <span className="italic font-light text-accent/50">Categories</span>
            </h2>
          </div>
          <Link to="/shop" className="cat-reveal group inline-flex items-center gap-2 text-xs tracking-wider uppercase text-subtle/40 hover:text-forest transition-colors shrink-0 font-medium">
            View All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.slug}
              className="cat-reveal group relative overflow-hidden rounded-[28px] bg-forest"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className={`absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-45 transition-all duration-700 plant-shadow ${cat.name === "Indoor" ? "object-[50%_25%]" : cat.name === "Succulents" ? "object-[50%_55%]" : "object-[50%_45%]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl md:text-3xl text-white mb-1">{cat.name}</h3>
                <p className="text-white/40 text-xs tracking-wide font-light">{cat.count}</p>
              </div>
              <motion.div
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                whileHover={{ scale: 1.08 }}
              >
                <span className="text-white text-sm">&rarr;</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
