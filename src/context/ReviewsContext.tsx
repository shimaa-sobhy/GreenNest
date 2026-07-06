import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { defaultReviews } from "@/data/defaultReviews"

const STORAGE_KEY = "greenest_reviews"

export interface Review {
  id: string
  productId: number
  customerName: string
  rating: number
  title: string
  text: string
  date: string
}

interface ReviewsData {
  [productId: number]: Review[]
}

interface ReviewsContextType {
  getReviews: (productId: number) => Review[]
  addReview: (review: Omit<Review, "id" | "date">) => void
  updateReview: (reviewId: string, updates: Partial<Omit<Review, "id" | "productId" | "date">>) => void
  deleteReview: (reviewId: string) => void
  hasReviewed: (productId: number, customerName: string) => boolean
}

const ReviewsContext = createContext<ReviewsContextType | null>(null)

function loadUserReviews(): ReviewsData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function getDefaultReviews(productId: number): Review[] {
  return defaultReviews.filter((r) => r.productId === productId)
}

function checkDefaultReviewed(productId: number, customerName: string): boolean {
  const query = customerName.toLowerCase().trim()
  return defaultReviews.some(
    (r) => r.productId === productId && r.customerName.toLowerCase().trim() === query
  )
}

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [userReviews, setUserReviews] = useState<ReviewsData>(loadUserReviews)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews))
  }, [userReviews])

  const getReviews = useCallback(
    (productId: number) => {
      const defaults = getDefaultReviews(productId)
      const users = userReviews[productId] || []
      return [...defaults, ...users]
    },
    [userReviews]
  )

  const addReview = useCallback(
    (review: Omit<Review, "id" | "date">) => {
      const newReview: Review = {
        ...review,
        id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        date: new Date().toISOString(),
      }
      setUserReviews((prev) => ({
        ...prev,
        [review.productId]: [...(prev[review.productId] || []), newReview],
      }))
    },
    []
  )

  const updateReview = useCallback(
    (reviewId: string, updates: Partial<Omit<Review, "id" | "productId" | "date">>) => {
      setUserReviews((prev) => {
        const next = { ...prev }
        for (const pid of Object.keys(next)) {
          const pidNum = Number(pid)
          next[pidNum] = next[pidNum].map((r) =>
            r.id === reviewId ? { ...r, ...updates } : r
          )
        }
        return next
      })
    },
    []
  )

  const deleteReview = useCallback((reviewId: string) => {
    setUserReviews((prev) => {
      const next = { ...prev }
      for (const pid of Object.keys(next)) {
        const pidNum = Number(pid)
        next[pidNum] = next[pidNum].filter((r) => r.id !== reviewId)
      }
      return next
    })
  }, [])

  const hasReviewed = useCallback(
    (productId: number, customerName: string) => {
      if (checkDefaultReviewed(productId, customerName)) return true
      const users = userReviews[productId] || []
      const query = customerName.toLowerCase().trim()
      return users.some((r) => r.customerName.toLowerCase().trim() === query)
    },
    [userReviews]
  )

  return (
    <ReviewsContext.Provider value={{ getReviews, addReview, updateReview, deleteReview, hasReviewed }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider")
  return ctx
}
