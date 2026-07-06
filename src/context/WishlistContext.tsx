import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react"
import type { Product } from "@/data/products"

const STORAGE_KEY = "greenest_wishlist"

interface WishlistContextType {
  items: Product[]
  toggleItem: (product: Product) => void
  isWishlisted: (productId: number) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

function loadWishlist(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(loadWishlist)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      }
      return [...prev, product]
    })
  }, [])

  const isWishlisted = useCallback(
    (productId: number) => items.some((p) => p.id === productId),
    [items]
  )

  const totalItems = useMemo(() => items.length, [items])

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted, totalItems }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
