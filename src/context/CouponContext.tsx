import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Coupon {
  code: string
  discountPercent: number
}

const VALID_COUPONS: Coupon[] = [
  { code: "GREEN10", discountPercent: 10 },
  { code: "WELCOME15", discountPercent: 15 },
  { code: "PLANT20", discountPercent: 20 },
]

const COUPON_KEY = "plantnest_coupon"

function loadCoupon(): Coupon | null {
  try {
    const raw = localStorage.getItem(COUPON_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return VALID_COUPONS.find((c) => c.code === parsed.code) ?? null
  } catch {
    return null
  }
}

function saveCoupon(coupon: Coupon | null) {
  if (coupon) {
    localStorage.setItem(COUPON_KEY, JSON.stringify({ code: coupon.code }))
  } else {
    localStorage.removeItem(COUPON_KEY)
  }
}

interface CouponContextType {
  activeCoupon: Coupon | null
  applyCoupon: (code: string) => { success: boolean; message: string }
  removeCoupon: () => void
}

const CouponContext = createContext<CouponContextType | null>(null)

export function CouponProvider({ children }: { children: ReactNode }) {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(loadCoupon)

  const applyCoupon = useCallback((code: string): { success: boolean; message: string } => {
    const cleaned = code.trim().toUpperCase()
    if (!cleaned) return { success: false, message: "Please enter a coupon code" }
    const coupon = VALID_COUPONS.find((c) => c.code === cleaned)
    if (!coupon) return { success: false, message: "Invalid coupon code" }
    if (activeCoupon) return { success: false, message: "A coupon is already applied" }
    setActiveCoupon(coupon)
    saveCoupon(coupon)
    return { success: true, message: `Coupon "${coupon.code}" applied — ${coupon.discountPercent}% off!` }
  }, [activeCoupon])

  const removeCoupon = useCallback(() => {
    setActiveCoupon(null)
    saveCoupon(null)
  }, [])

  return (
    <CouponContext.Provider value={{ activeCoupon, applyCoupon, removeCoupon }}>
      {children}
    </CouponContext.Provider>
  )
}

export function useCoupon() {
  const ctx = useContext(CouponContext)
  if (!ctx) throw new Error("useCoupon must be used within CouponProvider")
  return ctx
}
