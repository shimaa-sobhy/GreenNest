import { useState } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Tag, X, Check } from "lucide-react"
import { useCart, useCoupon } from "@/context"
import { useToast } from "@/components/ui/Toast"

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { activeCoupon, applyCoupon, removeCoupon } = useCoupon()
  const { showToast } = useToast()
  const [couponInput, setCouponInput] = useState("")

  const discount = activeCoupon ? subtotal * (activeCoupon.discountPercent / 100) : 0
  const total = subtotal - discount

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput)
    if (result.success) {
      showToast(result.message)
      setCouponInput("")
    } else {
      showToast(result.message)
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    showToast("Coupon removed")
  }

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
              <ShoppingBag className="w-6 h-6 text-accent/30" />
            </div>
            <h1 className="text-3xl font-heading text-forest mb-3">Your cart is empty</h1>
            <p className="text-sm text-subtle/50 font-light mb-8">Looks like you haven&apos;t added any plants yet.</p>
            <Link to="/shop" className="inline-flex items-center gap-3 h-13 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all">
              Browse Collection &rarr;
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-off-white pt-36 pb-28 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading text-forest tracking-tight">Shopping Cart</h1>
            <p className="text-sm text-subtle/50 font-light mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <motion.button
            onClick={clearCart}
            className="text-xs text-subtle/40 hover:text-rose-400 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Trash2 className="w-3 h-3" /> Clear
          </motion.button>
        </motion.div>

        <div className="space-y-4 mb-12">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                className="flex items-center gap-3 sm:gap-5 p-3 sm:p-5 bg-card backdrop-blur-sm rounded-2xl border border-forest/5 shadow-organic max-sm:flex-wrap"
              >
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover plant-shadow brightness-[1.06]" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-heading text-sm md:text-base text-forest mb-0.5 truncate">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-subtle/40 mb-2">{item.product.category}</p>
                  <div className="flex items-center gap-4 max-sm:flex-wrap">
                    <div className="flex items-center border border-forest/10 rounded-xl overflow-hidden">
                      <motion.button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-cream transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus className="w-3 h-3 text-subtle/50" />
                      </motion.button>
                      <span className="w-10 text-center text-xs font-medium text-forest">{item.quantity}</span>
                      <motion.button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-cream transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="w-3 h-3 text-subtle/50" />
                      </motion.button>
                    </div>
                    <span className="text-sm font-medium text-forest">${(item.product.newPrice * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => removeItem(item.product.id)}
                  className="p-2 text-subtle/30 hover:text-rose-400 transition-colors shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="pt-8 border-t border-forest/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <Link to="/shop" className="group inline-flex items-center gap-2 text-xs text-subtle/40 hover:text-accent transition-colors shrink-0">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </Link>

            <div className="w-full lg:w-80 space-y-5">
              {activeCoupon ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-emerald-50/60 border border-emerald-200/50"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-emerald-700 truncate">{activeCoupon.code}</p>
                      <p className="text-[10px] text-emerald-500/70">{activeCoupon.discountPercent}% off</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleRemoveCoupon}
                    className="p-1 rounded-md hover:bg-emerald-100/60 text-emerald-400 hover:text-rose-500 transition-all shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle/20 pointer-events-none" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="Coupon code"
                      className="w-full h-11 pl-10 pr-3 bg-cream/60 border border-forest/8 rounded-xl text-xs text-forest placeholder:text-subtle/20 outline-none focus:border-accent/30 transition-colors"
                    />
                  </div>
                  <motion.button
                    onClick={handleApplyCoupon}
                    className="h-11 px-5 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm shrink-0"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Apply
                  </motion.button>
                </div>
              )}

              <div className="bg-card rounded-2xl border border-forest/5 shadow-organic p-5 space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtle/50">Subtotal</span>
                  <span className="text-forest font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {activeCoupon && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-subtle/50">Discount ({activeCoupon.discountPercent}%)</span>
                    <span className="text-emerald-600 font-medium">&minus;${discount.toFixed(2)}</span>
                  </motion.div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtle/50">Shipping</span>
                  <span className="text-accent text-xs font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-forest/10 pt-2.5 mt-2.5">
                  <span className="text-forest font-semibold">Total</span>
                  <span className="text-lg font-heading text-forest font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/checkout"
                  className="w-full h-13 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  Checkout &rarr;
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
