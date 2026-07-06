import { useState, useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag, ArrowLeft, Check, Package, Calendar, DollarSign, User, Tag, X } from "lucide-react"
import { useCart, useCoupon } from "@/context"

interface FormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
}

interface OrderDetails {
  orderId: string
  customerName: string
  date: string
  total: number
}

function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "ORD-"
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const { activeCoupon, removeCoupon } = useCoupon()
  const discount = activeCoupon ? subtotal * (activeCoupon.discountPercent / 100) : 0
  const total = subtotal - discount
  const [step, setStep] = useState<"form" | "success">("form")
  const [submitting, setSubmitting] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const submittedRef = useRef(false)

  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  if (items.length === 0 && step !== "success") {
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
            <h1 className="text-3xl font-heading text-forest mb-3">Nothing to checkout</h1>
            <p className="text-sm text-subtle/50 font-light mb-8">Your cart is empty. Add some plants first.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 h-13 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all"
            >
              Browse Collection &rarr;
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\d\s\-+()]{7,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    if (!form.address.trim()) newErrors.address = "Shipping address is required"
    if (!form.city.trim()) newErrors.city = "City is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittedRef.current) return
    if (!validate()) return
    submittedRef.current = true
    setSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const details: OrderDetails = {
      orderId: generateOrderId(),
      customerName: form.fullName,
      date: getTodayDate(),
      total,
    }

    clearCart()
    removeCoupon()
    setOrderDetails(details)
    setStep("success")
    setSubmitting(false)
  }

  const inputBase = "w-full px-5 py-3.5 bg-card border rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none transition-colors"
  const inputNormal = "border-forest/8 focus:border-accent/40"
  const inputError = "border-rose-300 focus:border-rose-400"

  if (step === "success" && orderDetails) {
    return (
      <main className="bg-off-white pt-36 pb-28 min-h-screen">
        <div className="mx-auto max-w-lg px-6 lg:px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-[#3D7A3C] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>

            <motion.h1
              className="text-2xl font-heading text-forest mb-3 leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you! Your order has been placed successfully.
            </motion.h1>

            <motion.div
              className="bg-card rounded-2xl border border-forest/5 shadow-organic p-6 text-left mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium mb-0.5">Customer</p>
                  <p className="text-sm text-forest font-medium">{orderDetails.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium mb-0.5">Order Number</p>
                  <p className="text-sm text-forest font-mono font-medium">{orderDetails.orderId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium mb-0.5">Order Date</p>
                  <p className="text-sm text-forest font-medium">{orderDetails.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle/40 font-medium mb-0.5">Total</p>
                  <p className="text-lg font-heading text-forest font-semibold">${orderDetails.total.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 h-13 px-10 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg shadow-forest/20"
              >
                Continue Shopping &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-off-white pt-36 pb-28 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/cart"
            className="group inline-flex items-center gap-2 text-xs text-subtle/40 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading text-forest tracking-tight">Checkout</h1>
          <p className="text-sm text-subtle/50 font-light mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} &middot; ${subtotal.toFixed(2)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            noValidate
          >
            <div className="bg-card rounded-2xl border border-forest/5 shadow-organic p-6 md:p-8">
              <h2 className="text-sm font-semibold text-forest mb-6">Shipping Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    placeholder="John Doe"
                    className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-400 mt-1.5">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="john@example.com"
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+1 (555) 123-4567"
                    className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                  />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1.5">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                    Shipping Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="123 Main Street, Apt 4B"
                    className={`${inputBase} ${errors.address ? inputError : inputNormal}`}
                  />
                  {errors.address && <p className="text-xs text-rose-400 mt-1.5">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                      City <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={handleChange("city")}
                      placeholder="New York"
                      className={`${inputBase} ${errors.city ? inputError : inputNormal}`}
                    />
                    {errors.city && <p className="text-xs text-rose-400 mt-1.5">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={handleChange("zip")}
                      placeholder="10001 (optional)"
                      className={`${inputBase} ${inputNormal}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full h-13 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg shadow-forest/20 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              whileHover={!submitting ? { scale: 1.01 } : {}}
              whileTap={!submitting ? { scale: 0.99 } : {}}
            >
              {submitting ? (
                <>
                  <motion.span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl border border-forest/5 shadow-organic p-6 md:p-8 sticky top-32">
              <h2 className="text-sm font-semibold text-forest mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover plant-shadow brightness-[1.06]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-forest truncate font-medium">{item.product.name}</p>
                      <p className="text-xs text-subtle/40">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-forest font-medium">
                      ${(item.product.newPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              {activeCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/50"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Tag className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="text-xs font-medium text-emerald-700 truncate">{activeCoupon.code}</span>
                    <span className="text-[10px] text-emerald-500/70">({activeCoupon.discountPercent}% off)</span>
                  </div>
                  <motion.button
                    onClick={removeCoupon}
                    className="p-0.5 rounded text-emerald-400 hover:text-rose-500 transition-colors shrink-0"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </motion.div>
              )}
              <div className="border-t border-forest/10 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtle/50">Subtotal</span>
                  <span className="text-forest font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {activeCoupon && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                <div className="flex items-center justify-between text-sm border-t border-forest/10 pt-2 mt-2">
                  <span className="text-forest font-semibold">Total</span>
                  <span className="text-lg font-heading text-forest font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
