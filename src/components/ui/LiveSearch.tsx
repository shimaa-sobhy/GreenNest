import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, Trash2 } from "lucide-react"
import { products } from "@/data/products"
import { productDescriptions, productTags } from "@/data/productSearch"
import type { Product } from "@/data/products"

const RECENT_KEY = "greenest_recent_searches"
const MAX_RECENT = 5

function loadRecent(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecent(terms: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(terms))
  } catch {}
}

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim()
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-accent/15 text-forest font-medium rounded-sm px-0.5">{part}</mark>
      : part
  )
}

interface LiveSearchProps {
  open: boolean
  onClose: () => void
}

export default function LiveSearch({ open, onClose }: LiveSearchProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecent)
  const [showRecent, setShowRecent] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const resultsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setShowRecent(true)
    } else {
      setQuery("")
      setDebouncedQuery("")
      setSelectedIndex(-1)
      setShowRecent(false)
    }
  }, [open])

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    setSelectedIndex(-1)
  }, [debouncedQuery])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose() }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, onClose])

  const results = useMemo(() => {
    const q = normalize(debouncedQuery)
    if (!q) return []
    return products.filter((product) => {
      const name = normalize(product.name)
      const category = normalize(product.category)
      const desc = normalize(productDescriptions[product.id] || "")
      const tags = (productTags[product.id] || []).map(normalize)
      return (
        name.includes(q) ||
        category.includes(q) ||
        desc.includes(q) ||
        tags.some((t) => t.includes(q))
      )
    })
  }, [debouncedQuery])

  const showDropdown = open && (debouncedQuery.length > 0 || showRecent)
  const hasQuery = debouncedQuery.trim().length > 0

  const navigateTo = useCallback((productId: number) => {
    const term = query.trim()
    if (term) {
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, MAX_RECENT)
      setRecentSearches(updated)
      saveRecent(updated)
    }
    onClose()
    navigate(`/product/${productId}`)
  }, [query, recentSearches, onClose, navigate])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasQuery && showRecent) {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(0); return }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(recentSearches.length - 1); return }
      if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < recentSearches.length) {
        e.preventDefault()
        setQuery(recentSearches[selectedIndex])
        setShowRecent(false)
        return
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < results.length) {
      e.preventDefault()
      navigateTo(results[selectedIndex].id)
    }
  }

  useEffect(() => {
    if (selectedIndex < 0 || !resultsContainerRef.current) return
    const container = resultsContainerRef.current
    const items = container.querySelectorAll<HTMLElement>("[data-index]")
    const target = items[selectedIndex]
    if (target) target.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  const handleRemoveRecent = (e: React.MouseEvent, term: string) => {
    e.stopPropagation()
    const updated = recentSearches.filter((s) => s !== term)
    setRecentSearches(updated)
    saveRecent(updated)
  }

  const handleClearRecent = () => {
    setRecentSearches([])
    saveRecent([])
  }

  const handleSelectRecent = (term: string) => {
    setQuery(term)
    setShowRecent(false)
    inputRef.current?.focus()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-forest/40 backdrop-blur-sm"
        >
          <div className="absolute top-0 left-0 right-0 bg-off-white shadow-xl" ref={dropdownRef}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="pt-20 pb-4">
                <div className="relative flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle/25 pointer-events-none" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setShowRecent(false) }}
                      onKeyDown={handleKeyDown}
                      onFocus={() => !query && setShowRecent(true)}
                      placeholder="Search plants..."
                      aria-label="Search plants"
                      className="w-full h-13 pl-11 pr-11 bg-cream/60 border border-forest/8 rounded-xl text-sm text-forest placeholder:text-subtle/20 outline-none focus:border-accent/30 transition-colors"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-forest/5 text-subtle/20 hover:text-subtle/50 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="shrink-0 h-13 px-5 border border-forest/8 rounded-xl text-xs text-subtle/40 hover:text-forest hover:border-forest/20 font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Cancel search"
                  >
                    Cancel
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-3 max-h-[60vh] overflow-y-auto rounded-2xl bg-card border border-forest/5 shadow-organic-lg"
                      ref={resultsContainerRef}
                    >
                      {hasQuery && results.length > 0 && (
                        <div>
                          <p className="px-4 pt-4 pb-2 text-[10px] text-subtle/25 uppercase tracking-wider font-medium">
                            {results.length} result{results.length !== 1 ? "s" : ""}
                          </p>
                          {results.map((product, i) => (
                            <button
                              key={product.id}
                              data-index={i}
                              onClick={() => navigateTo(product.id)}
                              onMouseEnter={() => setSelectedIndex(i)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                i === selectedIndex ? "bg-accent/5" : "hover:bg-cream/50"
                              }`}
                            >
                              <div className="w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br from-accent/10 via-cream/40 to-cream/20 flex items-center justify-center overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover plant-shadow brightness-[1.06]"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-forest truncate">
                                  {highlightText(product.name, debouncedQuery)}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-subtle/40 uppercase tracking-wider">
                                    {highlightText(product.category, debouncedQuery)}
                                  </span>
                                  <span className="text-[10px] text-subtle/20">&middot;</span>
                                  <span className="text-xs font-medium text-accent">
                                    ${product.newPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {hasQuery && results.length === 0 && (
                        <div className="px-4 py-10 text-center">
                          <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-4">
                            <Search className="w-5 h-5 text-accent/30" />
                          </div>
                          <p className="text-base font-heading text-forest mb-1">No plants found.</p>
                          <p className="text-xs text-subtle/50 font-light mb-5">Try searching for another plant.</p>
                          <motion.button
                            onClick={() => { setQuery(""); setDebouncedQuery(""); onClose(); navigate("/shop"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                            className="inline-flex items-center gap-2 h-11 px-6 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Browse All Plants
                          </motion.button>
                        </div>
                      )}

                      {showRecent && recentSearches.length > 0 && !hasQuery && (
                        <div>
                          <div className="flex items-center justify-between px-4 pt-4 pb-2">
                            <span className="text-[10px] text-subtle/25 uppercase tracking-wider font-medium">Recent Searches</span>
                            <button
                              onClick={handleClearRecent}
                              className="flex items-center gap-1 text-[10px] text-subtle/20 hover:text-rose-400 transition-colors uppercase tracking-wider font-medium"
                            >
                              <Trash2 className="w-3 h-3" /> Clear All
                            </button>
                          </div>
                          {recentSearches.map((term, i) => (
                            <button
                              key={term}
                              data-index={i}
                              onClick={() => handleSelectRecent(term)}
                              onMouseEnter={() => setSelectedIndex(i)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                i === selectedIndex ? "bg-accent/5" : "hover:bg-cream/50"
                              }`}
                            >
                              <Clock className="w-4 h-4 text-subtle/20 shrink-0" />
                              <span className="flex-1 text-sm text-forest truncate">{term}</span>
                              <button
                                onClick={(e) => handleRemoveRecent(e, term)}
                                className="p-1 rounded-md text-subtle/15 hover:text-rose-400 hover:bg-rose-50 transition-all shrink-0"
                                aria-label={`Remove ${term}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </button>
                          ))}
                        </div>
                      )}

                      {showRecent && recentSearches.length === 0 && !hasQuery && (
                        <div className="px-4 py-8 text-center">
                          <Clock className="w-5 h-5 text-subtle/15 mx-auto mb-2" />
                          <p className="text-xs text-subtle/30 font-light">No recent searches</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
