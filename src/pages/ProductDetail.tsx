import { Link } from "@/components/common/ScrollLink"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import BackButton from "@/components/common/BackButton"
import ReviewSection from "@/components/ui/ReviewSection"
import { useState, useEffect } from "react"
import { products } from "@/data/products"
import { useCart, useWishlist } from "@/context"
import { useToast } from "@/components/ui/Toast"
import { ProductDetailSkeleton } from "@/components/ui/Skeleton"
import ShareMenu from "@/components/ui/ShareMenu"

const reveal = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const product = products.find((p) => p.id === Number(id))
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { showToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(timer)
  }, [id])

  if (loading) return <ProductDetailSkeleton />

  if (!product) {
    return (
      <main className="bg-off-white pt-36 pb-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading text-forest mb-3">Product Not Found</h1>
          <Link to="/shop" className="text-xs text-subtle/30 hover:text-accent transition-colors uppercase tracking-wider font-medium">Back to Shop</Link>
        </div>
      </main>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <main className="bg-off-white pt-32 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-28">
          <motion.div
            custom={1}
            variants={reveal}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: "4/5" }}
              whileHover={{ scale: 1.005 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
              <img src={product.image} alt={product.name} className="relative w-full h-full object-cover scale-[1.08] plant-shadow brightness-[1.06] contrast-[1.02]" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.span custom={2} variants={reveal} initial="initial" animate="animate" className="text-accent/50 text-xs font-medium tracking-[0.25em] uppercase mb-4">{product.category}</motion.span>
            <motion.h1 custom={3} variants={reveal} initial="initial" animate="animate" className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-[1.0] tracking-tight mb-6">{product.name}</motion.h1>
            <motion.div custom={4} variants={reveal} initial="initial" animate="animate" className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-heading text-accent">${product.newPrice.toFixed(2)}</span>
              <span className="text-lg text-subtle/25 line-through">${product.oldPrice.toFixed(2)}</span>
            </motion.div>

            <motion.p custom={5} variants={reveal} initial="initial" animate="animate" className="text-subtle/50 text-sm md:text-base leading-relaxed mb-8 font-light">
              A stunning specimen, carefully cultivated and ready to transform your space. Each plant is unique — the one you receive will be as beautiful as the one pictured.
            </motion.p>

            <motion.div custom={6} variants={reveal} initial="initial" animate="animate" className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-forest/10 rounded-xl overflow-hidden">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-cream transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-3.5 h-3.5 text-subtle/40" />
                </motion.button>
                <span className="w-12 text-center text-sm font-medium text-forest">{quantity}</span>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-cream transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-3.5 h-3.5 text-subtle/40" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div custom={7} variants={reveal} initial="initial" animate="animate" className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => { addItem(product); setQuantity(1); showToast(`${product.name} added to cart`) }}
                  className="inline-flex items-center gap-3 h-14 px-10 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </motion.div>
              <motion.button
                onClick={() => {
                  const wasWished = isWishlisted(product.id)
                  toggleItem(product)
                  showToast(wasWished ? "Removed from Wishlist" : "Added to Wishlist ❤️")
                }}
                className={`h-14 px-6 rounded-xl text-xs tracking-wider uppercase font-medium transition-all border ${
                  isWishlisted(product.id)
                    ? "bg-forest text-white border-forest"
                    : "border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  key={isWishlisted(product.id) ? "filled" : "empty"}
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? "fill-white" : ""}`} />
                </motion.span>
              </motion.button>
              <ShareMenu
                productName={product.name}
                productUrl={`${window.location.origin}/product/${product.id}`}
              />
            </motion.div>

            <motion.div custom={8} variants={reveal} initial="initial" animate="animate" className="mt-12 pt-10 border-t border-forest/10">
              <div className="grid grid-cols-3 gap-6">
                {[["Free Shipping", "On orders over $50"], ["Sustainably Grown", "Eco-friendly nursery"], ["Lifetime Support", "Expert care advice"]].map(([label, desc]) => (
                  <div key={label}>
                    <p className="text-xs font-medium text-forest mb-1">{label}</p>
                    <p className="text-[10px] text-subtle/25 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <ReviewSection productId={product.id} productName={product.name} />

        {related.length > 0 && (
          <div>
            <motion.h2
              className="text-2xl md:text-3xl font-heading text-forest tracking-tight mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Complete Your Collection
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                >
                  <Link to={`/product/${p.id}`} className="group touch-manipulation">
                    <motion.div
                      className="relative overflow-hidden rounded-2xl mb-4"
                      style={{ aspectRatio: "3/4" }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40" />
                      <img src={p.image} alt={p.name} className="relative w-full h-full object-cover scale-[1.08] plant-shadow brightness-[1.06] transition-all duration-700 group-hover:scale-[1.18]" loading="lazy" />
                    </motion.div>
                    <h3 className="font-heading text-sm text-forest group-hover:text-accent/80 transition-colors">{p.name}</h3>
                    <span className="text-xs text-subtle/35 font-medium">${p.newPrice.toFixed(2)}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div custom={9} variants={reveal} initial="initial" animate="animate">
          <BackButton fallbackPath="/shop" label="Back to Shop" scrollRestoreKey="shop_scroll" />
        </motion.div>
      </div>
    </main>
  )
}
