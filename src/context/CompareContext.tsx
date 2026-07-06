import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import type { Product } from "@/data/products"

const MAX_COMPARE = 3
const STORAGE_KEY = "plantnest_compare"

function loadCompared(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCompared(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

interface CompareContextType {
  compared: Product[]
  totalCompared: number
  addToCompare: (product: Product) => { success: boolean; message: string }
  removeFromCompare: (productId: number) => void
  clearCompare: () => void
  isCompared: (productId: number) => boolean
}

const CompareContext = createContext<CompareContextType | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compared, setCompared] = useState<Product[]>(loadCompared)

  const totalCompared = useMemo(() => compared.length, [compared])

  const addToCompare = useCallback((product: Product): { success: boolean; message: string } => {
    if (compared.some((p) => p.id === product.id)) {
      return { success: false, message: `${product.name} is already in comparison` }
    }
    if (compared.length >= MAX_COMPARE) {
      return { success: false, message: "You can compare up to 3 products." }
    }
    const next = [...compared, product]
    setCompared(next)
    saveCompared(next)
    return { success: true, message: `${product.name} added to comparison` }
  }, [compared])

  const removeFromCompare = useCallback((productId: number) => {
    setCompared((prev) => {
      const next = prev.filter((p) => p.id !== productId)
      saveCompared(next)
      return next
    })
  }, [])

  const clearCompare = useCallback(() => {
    setCompared([])
    saveCompared([])
  }, [])

  const isCompared = useCallback((productId: number) => {
    return compared.some((p) => p.id === productId)
  }, [compared])

  return (
    <CompareContext.Provider value={{ compared, totalCompared, addToCompare, removeFromCompare, clearCompare, isCompared }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error("useCompare must be used within CompareProvider")
  return ctx
}
