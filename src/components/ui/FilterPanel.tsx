import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { MIN_PRICE, MAX_PRICE } from "@/data/products"

export interface FilterState {
  priceMin: number
  priceMax: number
  indoor: boolean
  outdoor: boolean
  petFriendly: boolean
  airPurifying: boolean
  lowLight: boolean
  beginnerFriendly: boolean
  bestSeller: boolean
  newArrival: boolean
  inStock: boolean
}

export const defaultFilters: FilterState = {
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  indoor: false,
  outdoor: false,
  petFriendly: false,
  airPurifying: false,
  lowLight: false,
  beginnerFriendly: false,
  bestSeller: false,
  newArrival: false,
  inStock: false,
}

interface FilterPanelProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onClearAll: () => void
  open: boolean
  onToggle: () => void
  resultCount: number
}

const FILTERS = [
  { key: "indoor" as const, label: "Indoor" },
  { key: "outdoor" as const, label: "Outdoor" },
  { key: "petFriendly" as const, label: "Pet Friendly" },
  { key: "airPurifying" as const, label: "Air Purifying" },
  { key: "lowLight" as const, label: "Low Light" },
  { key: "beginnerFriendly" as const, label: "Beginner Friendly" },
  { key: "bestSeller" as const, label: "Best Seller" },
  { key: "newArrival" as const, label: "New Arrival" },
  { key: "inStock" as const, label: "In Stock" },
]

export default function FilterPanel({ filters, onChange, onClearAll, open, onToggle, resultCount }: FilterPanelProps) {
  const minPct = ((filters.priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  const maxPct = ((filters.priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  const handleSlider = (which: "min" | "max", value: number) => {
    if (which === "min") {
      onChange({ ...filters, priceMin: Math.min(value, filters.priceMax - 5) })
    } else {
      onChange({ ...filters, priceMax: Math.max(value, filters.priceMin + 5) })
    }
  }

  const toggleFilter = (key: keyof FilterState) => {
    if (key === "priceMin" || key === "priceMax") return
    onChange({ ...filters, [key]: !filters[key] })
  }

  const anyActive = Object.entries(filters).some(
    ([k, v]) => k !== "priceMin" && k !== "priceMax" && v === true
  ) || filters.priceMin > MIN_PRICE || filters.priceMax < MAX_PRICE

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onToggle}
            className={`inline-flex items-center gap-2 h-11 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border ${
              open
                ? "bg-forest text-white border-forest"
                : "bg-card text-subtle/40 border-forest/8 hover:text-forest hover:border-forest/20"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </motion.button>
          <p className="text-xs text-subtle/40 font-medium">
            {resultCount} product{resultCount !== 1 ? "s" : ""}
          </p>
        </div>
        {anyActive && (
          <motion.button
            onClick={onClearAll}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-subtle/30 hover:text-rose-400 transition-colors uppercase tracking-wider font-medium"
          >
            Clear All Filters
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-card border border-forest/5 rounded-2xl p-6 shadow-organic">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-3">
                    Price Range
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => handleSlider("min", Number(e.target.value))}
                      min={MIN_PRICE}
                      max={filters.priceMax - 5}
                      className="w-full h-10 px-3 bg-cream/60 border border-forest/8 rounded-xl text-xs text-forest outline-none focus:border-accent/30 transition-colors"
                    />
                    <span className="text-subtle/20 text-xs">&mdash;</span>
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => handleSlider("max", Number(e.target.value))}
                      min={filters.priceMin + 5}
                      max={MAX_PRICE}
                      className="w-full h-10 px-3 bg-cream/60 border border-forest/8 rounded-xl text-xs text-forest outline-none focus:border-accent/30 transition-colors"
                    />
                  </div>
                  <div className="relative mt-3 h-2 bg-forest/5 rounded-full">
                    <div
                      className="absolute h-full bg-accent/30 rounded-full"
                      style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
                    />
                    <input
                      type="range"
                      value={filters.priceMin}
                      onChange={(e) => handleSlider("min", Number(e.target.value))}
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                    />
                    <input
                      type="range"
                      value={filters.priceMax}
                      onChange={(e) => handleSlider("max", Number(e.target.value))}
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-subtle/20">${MIN_PRICE}</span>
                    <span className="text-[10px] text-subtle/20">${MAX_PRICE}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-3">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FILTERS.map(({ key, label }) => (
                      <motion.button
                        key={key}
                        onClick={() => toggleFilter(key)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all border ${
                          filters[key]
                            ? "bg-forest text-white border-forest shadow-sm"
                            : "bg-cream/60 text-subtle/40 border-transparent hover:text-forest hover:bg-cream"
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
