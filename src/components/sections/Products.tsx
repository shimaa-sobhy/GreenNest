import { useRef, useState, useMemo } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useInView } from "framer-motion"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { products } from "@/data/products"
import { useCart, useWishlist } from "@/context"
import { useToast } from "@/components/ui/Toast"
import QuickViewModal from "@/components/ui/QuickViewModal"
import type { Product } from "@/data/products"

const categories = ["All", "Indoor", "Low Light", "Pet Friendly", "Air Purifying"]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] } },
}

const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const { addItem } = useCart()
  const { isWishlisted, toggleItem } = useWishlist()
  const { showToast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section ref={sectionRef} className="py-32 bg-off-white overflow-hidden" id="products">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-subtle/40 text-xs font-medium tracking-[0.3em] uppercase mb-4 block">The Collection</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.05] tracking-tight text-forest">
              Selected
              <br />
              <span className="italic font-light text-accent/50">Specimens</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs tracking-wider uppercase transition-all duration-500 rounded-full ${
                  activeCategory === cat
                    ? "bg-forest text-white shadow-lg shadow-forest/15"
                    : "text-subtle/40 hover:text-forest border border-transparent hover:border-accent/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {filtered.map((product) => {
            const wished = isWishlisted(product.id)
            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div className="relative overflow-visible">
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div
                      className="relative overflow-hidden rounded-[28px] shadow-organic"
                      style={{
                        aspectRatio: "3/4",
                        background: "linear-gradient(145deg, rgba(18,53,36,0.03), rgba(91,143,90,0.05), rgba(91,143,90,0.08))",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <motion.div
                          variants={floatVariant}
                          animate="animate"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain scale-110 plant-shadow"
                            loading="lazy"
                            style={{ filter: "brightness(1.05) contrast(1.05)" }}
                          />
                        </motion.div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.preventDefault(); setQuickViewProduct(product) }}
                          className="p-2.5 transition-all duration-300 shadow-lg rounded-xl"
                          style={{
                            backgroundColor: "rgba(252,252,250,0.85)",
                            backdropFilter: "blur(8px)",
                            color: "#5E5E5E",
                          }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault()
                            const wasWished = isWishlisted(product.id)
                            toggleItem(product)
                            showToast(wasWished ? "Removed from Wishlist" : "Added to Wishlist ❤️")
                          }}
                          className="p-2.5 transition-all duration-300 shadow-lg rounded-xl"
                          style={{
                            backgroundColor: wished ? "#123524" : "rgba(252,252,250,0.85)",
                            backdropFilter: "blur(8px)",
                            color: wished ? "#FFF" : "#5E5E5E",
                          }}
                        >
                          <motion.span
                            key={wished ? "filled" : "empty"}
                            animate={{ scale: [1, 1.35, 1] }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="flex"
                          >
                            <Heart className={`w-3.5 h-3.5 ${wished ? "fill-current" : ""}`} />
                          </motion.span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.preventDefault(); addItem(product) }}
                          className="p-2.5 transition-all duration-300 shadow-lg rounded-xl"
                          style={{
                            backgroundColor: "rgba(252,252,250,0.85)",
                            backdropFilter: "blur(8px)",
                            color: "#5E5E5E",
                          }}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>

                      {product.oldPrice && (
                        <div className="absolute top-4 left-4 px-3 py-1 flex items-center rounded-lg"
                          style={{
                            backgroundColor: "rgba(18,53,36,0.85)",
                            backdropFilter: "blur(8px)",
                          }}>
                          <span className="text-white text-[9px] font-medium uppercase tracking-widest">Sale</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="mt-5 px-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-subtle/40 uppercase tracking-widest">{product.category}</p>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="block font-heading font-medium text-sm text-forest hover:text-accent/80 transition-colors duration-300 mb-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-medium text-forest">${product.newPrice.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-subtle/30 line-through">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 h-12 px-8 border border-forest/15 text-forest text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-forest hover:text-white transition-all duration-500"
          >
            View All{" "}
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </motion.div>
      </div>
      <QuickViewModal
        product={quickViewProduct}
        open={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}
