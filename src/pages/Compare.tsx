import { Link } from "@/components/common/ScrollLink"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Eye, X, Scale, Star, Trash2, Check, XIcon } from "lucide-react"
import { useCart, useWishlist, useCompare } from "@/context"
import { useToast } from "@/components/ui/Toast"
import { productCare } from "@/data/products"

function CheckCross({ value }: { value: boolean | undefined }) {
  return value ? (
    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
      <Check className="w-3.5 h-3.5" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-subtle/30 text-xs font-medium">
      <XIcon className="w-3.5 h-3.5" /> No
    </span>
  )
}

export default function Compare() {
  const { compared, removeFromCompare, clearCompare } = useCompare()
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { showToast } = useToast()

  const rows: { label: string; render: (product: (typeof compared)[0]) => React.ReactNode }[] = [
    {
      label: "Image",
      render: (p) => (
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40 mx-auto">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover plant-shadow brightness-[1.06]" />
        </div>
      ),
    },
    {
      label: "Price",
      render: (p) => (
        <div>
          <span className="text-lg font-heading text-accent">${p.newPrice.toFixed(2)}</span>
          {p.oldPrice > p.newPrice && (
            <span className="text-xs text-subtle/30 line-through ml-2">${p.oldPrice.toFixed(2)}</span>
          )}
        </div>
      ),
    },
    {
      label: "Rating",
      render: (p) => (
        <div className="flex items-center justify-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-forest">{p.rating}</span>
          <span className="text-xs text-subtle/30">({p.reviewCount})</span>
        </div>
      ),
    },
    {
      label: "Category",
      render: (p) => <span className="text-sm text-forest">{p.category}</span>,
    },
    {
      label: "Size",
      render: (p) => <span className="text-sm text-forest">{p.size}</span>,
    },
    {
      label: "Light",
      render: (p) => {
        const care = productCare[p.id]
        return <span className="text-sm text-forest">{care?.light || "—"}</span>
      },
    },
    {
      label: "Water",
      render: (p) => {
        const care = productCare[p.id]
        return <span className="text-sm text-forest">{care?.water || "—"}</span>
      },
    },
    {
      label: "Difficulty",
      render: (p) => {
        const care = productCare[p.id]
        return <span className="text-sm text-forest">{care?.difficulty || "—"}</span>
      },
    },
    {
      label: "Pet Friendly",
      render: (p) => <CheckCross value={p.petFriendly} />,
    },
    {
      label: "Air Purifying",
      render: (p) => <CheckCross value={p.airPurifying} />,
    },
    {
      label: "Stock",
      render: (p) => {
        const lowStock = [2, 5, 7]
        const isLow = lowStock.includes(p.id)
        return (
          <span className={`text-xs font-medium ${isLow ? "text-amber-600" : "text-emerald-600"}`}>
            {isLow ? "Low Stock" : "In Stock"}
          </span>
        )
      },
    },
  ]

  if (compared.length === 0) {
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
              <Scale className="w-6 h-6 text-accent/30" />
            </div>
            <h1 className="text-3xl font-heading text-forest mb-3">Nothing to compare</h1>
            <p className="text-sm text-subtle/50 font-light mb-8">Add products to compare their features side by side.</p>
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
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading text-forest tracking-tight">Compare Products</h1>
            <p className="text-sm text-subtle/50 font-light mt-1">{compared.length} product{compared.length !== 1 ? "s" : ""}</p>
          </div>
          <motion.button
            onClick={() => { clearCompare(); showToast("Comparison cleared") }}
            className="text-xs text-subtle/40 hover:text-rose-400 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Trash2 className="w-3 h-3" /> Clear All
          </motion.button>
        </motion.div>

        <div className="overflow-x-auto -mx-6 lg:mx-0">
          <div className="inline-block min-w-full px-6 lg:px-0" style={{ minWidth: compared.length === 1 ? "400px" : undefined }}>
            <div className="grid grid-cols-[minmax(100px,140px)_repeat(auto-fill,minmax(180px,1fr))] border border-forest/5 rounded-2xl bg-card shadow-organic overflow-hidden">
              {rows.map((row, ri) => (
                <AnimatePresence key={row.label} mode="popLayout">
                  <>
                    <div
                      className={`flex items-center px-4 py-3.5 text-xs text-subtle/40 uppercase tracking-wider font-medium border-r border-forest/5 ${
                        ri !== rows.length - 1 ? "border-b border-forest/5" : ""
                      } ${ri % 2 === 0 ? "bg-cream/20" : ""}`}
                    >
                      {row.label}
                    </div>
                    {compared.map((product, ci) => (
                      <div
                        key={product.id}
                        className={`flex items-center justify-center px-4 py-3.5 text-center ${
                          ri !== rows.length - 1 ? "border-b border-forest/5" : ""
                        } ${ri % 2 === 0 ? "bg-cream/20" : ""} ${ci > 0 ? "border-l border-forest/5" : ""}`}
                      >
                        {row.render(product)}
                      </div>
                    ))}
                  </>
                </AnimatePresence>
              ))}

              <div className="flex items-center px-4 py-4 text-xs text-subtle/40 uppercase tracking-wider font-medium border-t border-forest/5 bg-cream/20">
                Actions
              </div>
              {compared.map((product, ci) => (
                <div
                  key={`actions-${product.id}`}
                  className={`flex flex-col items-center gap-2 px-4 py-4 border-t border-forest/5 bg-cream/20 ${ci > 0 ? "border-l border-forest/5" : ""}`}
                >
                  <motion.button
                    onClick={() => { addItem(product); showToast(`${product.name} added to cart`) }}
                    className="w-full h-10 bg-forest text-white text-[10px] font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm flex items-center justify-center gap-1.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart className="w-3 h-3" /> Add to Cart
                  </motion.button>
                  <motion.button
                    onClick={() => { toggleItem(product); showToast(isWishlisted(product.id) ? "Removed from Wishlist" : "Added to Wishlist") }}
                    className={`w-full h-10 rounded-xl text-[10px] tracking-wider uppercase font-medium transition-all border flex items-center justify-center gap-1.5 ${
                      isWishlisted(product.id)
                        ? "bg-forest text-white border-forest"
                        : "border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Heart className={`w-3 h-3 ${isWishlisted(product.id) ? "fill-white" : ""}`} />
                    {isWishlisted(product.id) ? "Saved" : "Save"}
                  </motion.button>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full h-10 rounded-xl border border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30 text-[10px] tracking-wider uppercase font-medium transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" /> View Details
                  </Link>
                  <motion.button
                    onClick={() => { removeFromCompare(product.id); showToast(`${product.name} removed from comparison`) }}
                    className="text-[10px] text-subtle/25 hover:text-rose-400 transition-colors uppercase tracking-wider font-medium flex items-center gap-1"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <X className="w-3 h-3" /> Remove
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
