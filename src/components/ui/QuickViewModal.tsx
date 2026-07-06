import { useState, useEffect } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingCart, Minus, Plus, Star, Check, ArrowRight, Eye, Sun, Droplets, Sprout } from "lucide-react"
import { useCart, useWishlist } from "@/context"
import { useToast } from "@/components/ui/Toast"
import { productCare } from "@/data/products"
import type { Product } from "@/data/products"

const descriptions: Record<number, string> = {
  1: "A beloved classic, the Monstera Deliciosa features iconic split leaves that bring tropical elegance to any space. Easy to care for and incredibly rewarding for plant enthusiasts of all levels.",
  2: "The Snake Plant Laurentii is virtually indestructible. Its tall, variegated leaves add architectural interest while actively purifying your indoor air.",
  3: "The Fiddle Leaf Fig is the ultimate statement plant. Its large, violin-shaped leaves create instant drama and sophistication in any room.",
  4: "The Peace Lily offers elegant white blooms and glossy deep-green foliage. It thrives in low light and actively cleans your indoor air.",
  5: "Aloe Vera is both beautiful and useful. Its fleshy leaves contain soothing gel, making it a practical and stylish addition to any home.",
  6: "The Boston Fern brings lush, feathery texture to your space. It loves humidity and creates a soft, inviting atmosphere wherever it sits.",
  7: "The Spider Plant is one of the easiest houseplants to grow. Its arching leaves and baby plantlets make it endlessly charming and shareable.",
  8: "The Barrel Cactus is a sculptural desert beauty. It thrives on neglect and adds modern, geometric interest to any room or desk.",
}

const stockStatus: Record<number, { label: string; variant: "low" | "in" }> = {
  1: { label: "In Stock", variant: "in" },
  2: { label: "Low Stock", variant: "low" },
  3: { label: "In Stock", variant: "in" },
  4: { label: "In Stock", variant: "in" },
  5: { label: "Low Stock", variant: "low" },
  6: { label: "In Stock", variant: "in" },
  7: { label: "Low Stock", variant: "low" },
  8: { label: "In Stock", variant: "in" },
}

const careIconMap: Record<string, { icon: typeof Sun; label: string }> = {
  "Low": { icon: Sun, label: "Low" },
  "Medium": { icon: Sun, label: "Medium" },
  "Bright": { icon: Sun, label: "Bright" },
}

interface QuickViewModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const { addItem, items: cartItems } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (open) setQuantity(1)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!product) return null

  const inCart = cartItems.find((item) => item.product.id === product.id)
  const wished = isWishlisted(product.id)
  const desc = descriptions[product.id] || `A beautiful ${product.category.toLowerCase()} specimen perfect for any space.`
  const stock = stockStatus[product.id] || { label: "In Stock", variant: "in" as const }
  const fullStars = Math.floor(product.rating)
  const hasHalf = product.rating % 1 >= 0.5
  const care = productCare[product.id]

  const lightIcon = care ? careIconMap[care.light]?.icon || Sun : Sun
  const waterIcon = Droplets
  const difficultyIcon = Sprout

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    showToast(`Added ${quantity} item${quantity > 1 ? "s" : ""} to Cart`)
    onClose()
  }

  const handleToggleWishlist = () => {
    toggleItem(product)
    showToast(wished ? "Removed from Wishlist" : "Added to Wishlist ❤️")
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Close"
            >
              <X className="w-4 h-4 text-subtle" />
            </motion.button>

            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 bg-gradient-to-br from-accent/10 via-cream/30 to-cream/20 flex items-center justify-center min-h-[300px] md:min-h-full">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain max-h-[400px] plant-shadow"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                <span className="text-accent/50 text-[10px] tracking-[0.2em] uppercase font-medium">
                  {product.category}
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-heading text-forest mt-2 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= fullStars
                            ? "text-amber-400 fill-amber-400"
                            : star === fullStars + 1 && hasHalf
                              ? "text-amber-400 fill-amber-400/50"
                              : "text-subtle/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-forest">{product.rating}</span>
                  <span className="text-xs text-subtle/30">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl md:text-3xl font-heading text-accent">
                    ${product.newPrice.toFixed(2)}
                  </span>
                  {product.oldPrice > product.newPrice && (
                    <span className="text-sm text-subtle/30 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-subtle/50 font-light mt-4 leading-relaxed">{desc}</p>

                {care && (
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl bg-cream/50 border border-forest/4">
                      <Sun className="w-4 h-4 text-amber-500/70" />
                      <span className="text-[10px] text-subtle/40 uppercase tracking-wider font-medium">Light</span>
                      <span className="text-xs font-medium text-forest">{care.light}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl bg-cream/50 border border-forest/4">
                      <Droplets className="w-4 h-4 text-sky-500/70" />
                      <span className="text-[10px] text-subtle/40 uppercase tracking-wider font-medium">Water</span>
                      <span className="text-xs font-medium text-forest">{care.water}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl bg-cream/50 border border-forest/4">
                      <Sprout className="w-4 h-4 text-emerald-500/70" />
                      <span className="text-[10px] text-subtle/40 uppercase tracking-wider font-medium">Care</span>
                      <span className="text-xs font-medium text-forest">{care.difficulty}</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    stock.variant === "low" ? "bg-amber-500" : "bg-emerald-500"
                  }`} />
                  <span className={`text-xs font-medium ${
                    stock.variant === "low" ? "text-amber-600" : "text-emerald-600"
                  }`}>
                    {stock.label}
                  </span>
                </div>

                <div className="border-t border-forest/5 my-5" />

                {inCart ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                      <Check className="w-4 h-4" /> Already in Cart
                    </div>
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 h-11 px-6 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm"
                    >
                      Go to Cart <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-forest/10 rounded-xl overflow-hidden">
                        <motion.button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2.5 hover:bg-cream transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-3.5 h-3.5 text-subtle/50" />
                        </motion.button>
                        <span className="w-12 text-center text-sm font-medium text-forest select-none">
                          {quantity}
                        </span>
                        <motion.button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2.5 hover:bg-cream transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-3.5 h-3.5 text-subtle/50" />
                        </motion.button>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                        <button
                          onClick={handleAddToCart}
                          className="w-full h-11 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </motion.div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4">
                  <motion.button
                    onClick={handleToggleWishlist}
                    className={`h-11 px-4 rounded-xl text-xs tracking-wider uppercase font-medium transition-all border flex items-center gap-2 ${
                      wished
                        ? "bg-forest text-white border-forest"
                        : "border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wished ? "fill-white" : ""}`} />
                    {wished ? "Saved" : "Save"}
                  </motion.button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex-1 h-11 px-4 rounded-xl border border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30 text-xs tracking-wider uppercase font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Full Details
                  </Link>
                </div>

                <button
                  onClick={onClose}
                  className="mt-4 text-xs text-subtle/25 hover:text-subtle/50 transition-colors uppercase tracking-wider font-medium"
                >
                  &larr; Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
