import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, Check } from "lucide-react"

export type SortOption = "featured" | "newest" | "best-selling" | "highest-rated" | "price-low" | "price-high" | "name-az" | "name-za"

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A \u2192 Z" },
  { value: "name-za", label: "Name: Z \u2192 A" },
]

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border bg-card text-subtle/40 border-forest/8 hover:text-forest hover:border-forest/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <ArrowUpDown className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{selected.label}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-56 bg-card border border-forest/5 rounded-2xl shadow-organic-lg overflow-hidden z-20"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false) }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                  option.value === value
                    ? "text-forest font-medium"
                    : "text-subtle/40 hover:text-forest hover:bg-cream/30"
                }`}
              >
                {option.label}
                {option.value === value && (
                  <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
