import { useState, useMemo, useEffect, useCallback } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Eye, SearchX, X, Scale, Share2 } from "lucide-react"
import { useScrollRestore } from "@/hooks/useScrollRestore"
import { products, categories } from "@/data/products"
import { useCart, useWishlist, useCompare } from "@/context"
import { useToast } from "@/components/ui/Toast"
import QuickViewModal from "@/components/ui/QuickViewModal"
import FilterPanel, { type FilterState, defaultFilters } from "@/components/ui/FilterPanel"
import SortSelect, { type SortOption, SORT_OPTIONS } from "@/components/ui/SortSelect"
import { ProductCardSkeleton } from "@/components/ui/Skeleton"
import { ShareIconButton } from "@/components/ui/ShareMenu"
import type { Product } from "@/data/products"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as const },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const FILTER_STORAGE_KEY = "plantnest_filters"
const SORT_STORAGE_KEY = "plantnest_sort"

function loadFilters(): FilterState {
  try {
    const raw = localStorage.getItem(FILTER_STORAGE_KEY)
    if (raw) return { ...defaultFilters, ...JSON.parse(raw) }
  } catch {}
  return defaultFilters
}

function loadSort(): SortOption {
  try {
    const raw = localStorage.getItem(SORT_STORAGE_KEY)
    if (raw && SORT_OPTIONS.some((o) => o.value === raw)) return raw as SortOption
  } catch {}
  return "featured"
}

function isFilterMatch(product: Product, filters: FilterState): boolean {
  if (product.newPrice < filters.priceMin || product.newPrice > filters.priceMax) return false
  const boolKeys = ["indoor", "outdoor", "petFriendly", "airPurifying", "lowLight", "beginnerFriendly", "bestSeller", "newArrival", "inStock"] as const
  for (const key of boolKeys) {
    if (filters[key] && !product[key]) return false
  }
  return true
}

export default function Shop() {
  useScrollRestore("shop_scroll")
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [filters, setFilters] = useState<FilterState>(loadFilters)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>(loadSort)
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { addToCompare, isCompared } = useCompare()
  const { showToast } = useToast()

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters))
  }, [filters])

  useEffect(() => {
    localStorage.setItem(SORT_STORAGE_KEY, sort)
  }, [sort])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const categoryFiltered = useMemo(
    () => activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  const filtered = useMemo(
    () => categoryFiltered.filter((p) => isFilterMatch(p, filters)),
    [categoryFiltered, filters],
  )

  const sorted = useMemo(() => {
    const arr = [...filtered]
    switch (sort) {
      case "newest":
        arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "best-selling":
        arr.sort((a, b) => b.salesCount - a.salesCount)
        break
      case "highest-rated":
        arr.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        arr.sort((a, b) => a.newPrice - b.newPrice)
        break
      case "price-high":
        arr.sort((a, b) => b.newPrice - a.newPrice)
        break
      case "name-az":
        arr.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-za":
        arr.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        arr.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    }
    return arr
  }, [filtered, sort])

  const handleSort = useCallback((value: SortOption) => {
    setSort(value)
  }, [])

  const clearAll = () => setFilters(defaultFilters)

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string }[] = []
    if (filters.priceMin > defaultFilters.priceMin) {
      chips.push({ key: "priceMin", label: `Min $${filters.priceMin}` })
    }
    if (filters.priceMax < defaultFilters.priceMax) {
      chips.push({ key: "priceMax", label: `Max $${filters.priceMax}` })
    }
    const boolMap: Record<string, string> = {
      indoor: "Indoor", outdoor: "Outdoor", petFriendly: "Pet Friendly",
      airPurifying: "Air Purifying", lowLight: "Low Light", beginnerFriendly: "Beginner Friendly",
      bestSeller: "Best Seller", newArrival: "New Arrival", inStock: "In Stock",
    }
    for (const [key, label] of Object.entries(boolMap)) {
      if (filters[key as keyof FilterState]) chips.push({ key, label })
    }
    return chips
  }, [filters])

  const removeChip = (key: string) => {
    if (key === "priceMin") setFilters({ ...filters, priceMin: defaultFilters.priceMin })
    else if (key === "priceMax") setFilters({ ...filters, priceMax: defaultFilters.priceMax })
    else setFilters({ ...filters, [key]: false })
  }

  return (
    <main className="bg-off-white pt-32 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Shop</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-[1.0] tracking-tight mb-6">
            Our
            <br />
            <span className="italic font-light text-accent/50">Collection</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-wider uppercase rounded-full transition-all font-medium ${
                activeCategory === cat
                  ? "bg-forest text-white shadow-lg"
                  : "bg-transparent text-subtle/40 hover:text-forest border border-forest/8 hover:border-accent/20"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-1">
          <div className="flex-1 min-w-0">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onClearAll={clearAll}
              open={filterPanelOpen}
              onToggle={() => setFilterPanelOpen((o) => !o)}
              resultCount={filtered.length}
            />
          </div>
          <div className="shrink-0 sm:pt-0.5">
            <SortSelect value={sort} onChange={handleSort} />
          </div>
        </div>

        {activeFilterChips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {activeFilterChips.map((chip) => (
              <motion.button
                key={chip.key}
                onClick={() => removeChip(chip.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-medium"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {chip.label}
                <X className="w-3 h-3" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-cream/60 flex items-center justify-center mb-5">
              <SearchX className="w-7 h-7 text-subtle/20" />
            </div>
            <h3 className="text-lg font-heading text-forest mb-2">No plants match your filters</h3>
            <p className="text-sm text-subtle/40 max-w-xs mb-6">
              Try adjusting your price range or turning off some filter toggles.
            </p>
            <motion.button
              onClick={clearAll}
              className="px-6 h-11 rounded-xl bg-forest text-white text-xs font-semibold tracking-wider uppercase"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {sorted.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative"
                >
                  <Link to={`/product/${product.id}`} className="block touch-manipulation">
                    <motion.div
                      className="relative overflow-hidden rounded-[28px] mb-4 shadow-organic"
                      style={{ aspectRatio: "3/4" }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-cream/60 to-cream/40" />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative w-full h-full object-cover scale-[1.08] plant-shadow brightness-[1.06] contrast-[1.02] transition-all duration-700 group-hover:scale-[1.18]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cream/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  </Link>
                  <div className="absolute max-sm:right-2 max-sm:top-2 top-3 right-3 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-x-2 lg:group-hover:translate-x-0">
                    <div className="flex flex-col max-sm:gap-[5px] gap-1.5 max-sm:p-[5px] max-sm:rounded-2xl max-sm:bg-white/55 max-sm:backdrop-blur-md max-sm:border max-sm:border-white/10 max-sm:shadow-lg max-sm:opacity-95 max-sm:h-[190px]">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewProduct(product) }}
                        className="w-8 h-8 sm:w-9 sm:h-9 max-sm:rounded-full rounded-xl bg-white/80 max-sm:bg-white/80 flex items-center justify-center hover:bg-white transition-all shadow-sm touch-manipulation hover:scale-105 active:scale-95"
                        aria-label="Quick view"
                      >
                        <Eye className="w-3.5 h-3.5 text-subtle" />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); showToast(`${product.name} added to cart`) }}
                        className="w-8 h-8 sm:w-9 sm:h-9 max-sm:rounded-full rounded-xl bg-white/80 max-sm:bg-white/80 flex items-center justify-center hover:bg-white transition-all shadow-sm touch-manipulation hover:scale-105 active:scale-95"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-subtle" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const wasWished = isWishlisted(product.id)
                          toggleItem(product)
                          showToast(wasWished ? "Removed from Wishlist" : "Added to Wishlist ❤️")
                        }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 max-sm:rounded-full rounded-xl flex items-center justify-center transition-all shadow-sm touch-manipulation hover:scale-105 active:scale-95 ${
                          isWishlisted(product.id) ? "bg-forest text-white" : "bg-white/80 max-sm:bg-white/80 hover:bg-white text-subtle"
                        }`}
                        aria-label="Toggle wishlist"
                      >
                        <span className="flex">
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? "fill-white" : ""}`} />
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const result = addToCompare(product)
                          showToast(result.message)
                        }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 max-sm:rounded-full rounded-xl flex items-center justify-center transition-all shadow-sm touch-manipulation hover:scale-105 active:scale-95 ${
                          isCompared(product.id) ? "bg-forest text-white" : "bg-white/80 max-sm:bg-white/80 hover:bg-white text-subtle"
                        }`}
                        aria-label="Compare"
                      >
                        <Scale className={`w-3.5 h-3.5 ${isCompared(product.id) ? "text-white" : ""}`} />
                      </button>
                      <ShareIconButton
                        productName={product.name}
                        productUrl={`${window.location.origin}/product/${product.id}`}
                      />
                    </div>
                  </div>
                  <div className="px-1">
                    <Link to={`/product/${product.id}`} className="touch-manipulation">
                      <h3 className="font-heading text-sm md:text-base text-forest mb-1.5 leading-tight group-hover:text-accent/80 transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-medium text-forest">${product.newPrice.toFixed(2)}</span>
                      <span className="text-xs text-subtle/30 line-through">${product.oldPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <QuickViewModal
        product={quickViewProduct}
        open={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  )
}
