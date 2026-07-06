import { useState } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, ArrowLeft, Eye, Minus, Plus, Trash2 } from "lucide-react"
import { useWishlist, useCart } from "@/context"
import { useToast } from "@/components/ui/Toast"
import type { Product } from "@/data/products"

function getStockStatus(id: number): { label: string; variant: "low" | "in" } {
  const lowStock = [2, 5, 7]
  return lowStock.includes(id) ? { label: "Low Stock", variant: "low" } : { label: "In Stock", variant: "in" }
}

export default function Wishlist() {
  const { items, toggleItem } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [addingAll, setAddingAll] = useState(false)

  const getQty = (productId: number) => quantities[productId] ?? 1

  const updateQty = (productId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1
      const next = current + delta
      if (next < 1) return prev
      return { ...prev, [productId]: next }
    })
  }

  const handleAddToCart = (product: Product, qty: number) => {
    for (let i = 0; i < qty; i++) addItem(product)
    showToast(`Added ${qty > 1 ? `${qty} items` : "1 item"} to Cart`)
  }

  const handleRemove = (product: Product) => {
    toggleItem(product)
    showToast("Removed from Wishlist")
  }

  const handleAddAll = () => {
    setAddingAll(true)
    let count = 0
    for (const product of items) {
      const qty = getQty(product.id)
      for (let i = 0; i < qty; i++) { addItem(product); count++ }
    }
    showToast(`Added ${count} item${count !== 1 ? "s" : ""} to Cart`)
    setAddingAll(false)
  }

  const handleClearAll = () => {
    items.forEach((product) => toggleItem(product))
    showToast("Wishlist cleared")
  }

  const estimatedTotal = items.reduce((sum, p) => sum + p.newPrice * getQty(p.id), 0)

  if (items.length === 0) {
    return (
      <main className="bg-off-white pt-36 pb-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            className="text-center max-w-sm mx-auto py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-6">
              <Heart className="w-6 h-6 text-accent/30" />
            </div>
            <h1 className="text-3xl font-heading text-forest mb-3">Your Wishlist is Empty</h1>
            <p className="text-sm text-subtle/50 font-light mb-8">Save your favorite plants to revisit later.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 h-13 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all">
              Explore Plants &rarr;
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-off-white pt-36 pb-28 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading text-forest tracking-tight">Wishlist</h1>
            <p className="text-sm text-subtle/50 font-light mt-1">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-xs text-subtle/40 hover:text-accent transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-card rounded-2xl border border-forest/5 shadow-organic mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium">Saved Items</p>
              <p className="text-lg font-heading text-forest">{items.length}</p>
            </div>
            <div className="w-px h-10 bg-forest/10" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium">Estimated Total</p>
              <p className="text-lg font-heading text-forest">${estimatedTotal.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {items.map((product, i) => {
            const qty = getQty(product.id)
            const stock = getStockStatus(product.id)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 md:p-5 bg-card rounded-2xl border border-forest/5 shadow-organic max-sm:flex-wrap"
              >
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover plant-shadow brightness-[1.06]" />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading text-sm md:text-base text-forest mb-0.5 truncate hover:text-accent/80 transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2.5 mt-1">
                    <span className="text-sm font-medium text-forest">${product.newPrice.toFixed(2)}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      stock.variant === "low" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {stock.label}
                    </span>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center gap-1 text-[10px] text-subtle/30 hover:text-accent transition-colors mt-1.5 uppercase tracking-wider font-medium"
                  >
                    <Eye className="w-3 h-3" /> View Details
                  </Link>
                </div>

                <div className="flex items-center border border-forest/10 rounded-xl overflow-hidden shrink-0">
                  <motion.button
                    onClick={() => updateQty(product.id, -1)}
                    className="p-2 hover:bg-cream transition-colors disabled:opacity-30"
                    whileTap={{ scale: 0.9 }}
                    disabled={qty <= 1}
                  >
                    <Minus className="w-3 h-3 text-subtle/50" />
                  </motion.button>
                  <span className="w-10 text-center text-xs font-medium text-forest select-none">{qty}</span>
                  <motion.button
                    onClick={() => updateQty(product.id, 1)}
                    className="p-2 hover:bg-cream transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-3 h-3 text-subtle/50" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <button
                      onClick={() => handleAddToCart(product, qty)}
                      className="flex items-center gap-2 h-10 px-4 bg-forest text-white text-[10px] font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm"
                    >
                      <ShoppingCart className="w-3 h-3" /> Add
                    </button>
                  </motion.div>
                  <motion.button
                    onClick={() => handleRemove(product)}
                    className="w-10 h-10 rounded-xl border border-forest/10 flex items-center justify-center text-subtle/30 hover:text-rose-400 hover:border-rose-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-forest/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleAddAll}
                disabled={addingAll}
                className="inline-flex items-center gap-3 h-13 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> {addingAll ? "Adding..." : "Add All to Cart"}
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 h-13 px-6 border border-forest/15 text-subtle/40 hover:text-rose-400 hover:border-rose-200 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
              </button>
            </motion.div>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 text-xs text-subtle/40 hover:text-accent transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
