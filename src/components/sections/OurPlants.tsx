import { useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useScroll, useTransform } from "framer-motion"
import GrowingPlant from "@/components/effects/GrowingPlant"
import shop1 from "@/assets/shop1.png"
import shop2 from "@/assets/shop2.png"
import shop3 from "@/assets/shop3.png"
import shop4 from "@/assets/shop4.png"

const products = [
  { id: 1, name: "Monstera Deliciosa", price: "68", image: shop1, tag: "Bestseller" },
  { id: 2, name: "Fiddle Leaf Fig", price: "82", image: shop2, tag: "Premium" },
  { id: 3, name: "Calathea Orbifolia", price: "54", image: shop3, tag: "Pet Friendly" },
  { id: 4, name: "Alocasia Zebrina", price: "72", image: shop4, tag: "Rare" },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 },
  }),
}

export default function OurPlants() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 40%"],
  })

  const titleX = useTransform(scrollYProgress, [0, 1], [-40, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1])

  return (
    <section ref={sectionRef} className="relative max-md:pt-48 py-36 bg-bg-light overflow-hidden" id="our-plants">
      <GrowingPlant sectionId="our-plants" position="right" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-16"
          style={{ x: titleX, opacity: titleOpacity }}
        >
          <div>
            <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Our Collection</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.0] tracking-tight text-forest">
              Living
              <br />
              <span className="italic font-light text-accent/50">Sculptures</span>
            </h2>
          </div>
          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-subtle/40 hover:text-forest text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              View All
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group relative flex flex-col"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative overflow-hidden rounded-[28px] bg-card mb-5 shadow-organic-lg">
                <motion.div
                  className="aspect-[3/4]"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover plant-shadow brightness-[1.06] contrast-[1.02] ${product.id === 1 ? "object-[50%_25%]" : product.id === 2 ? "object-[50%_50%]" : product.id === 3 ? "object-[50%_35%]" : "object-[50%_40%]"}`}
                  />
                </motion.div>
                {product.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest/80 backdrop-blur-sm text-white text-[9px] font-semibold tracking-wider uppercase">
                    {product.tag}
                  </span>
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm md:text-base font-heading leading-tight text-forest">{product.name}</h3>
                <span className="text-xs text-subtle/40 font-mono">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
