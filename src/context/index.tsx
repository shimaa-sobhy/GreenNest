import { type ReactNode } from "react"
import { CartProvider } from "./CartContext"
import { WishlistProvider } from "./WishlistContext"
import { AuthProvider } from "./AuthContext"
import { ReviewsProvider } from "./ReviewsContext"
import { CouponProvider } from "./CouponContext"
import { CompareProvider } from "./CompareContext"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CouponProvider>
          <WishlistProvider>
            <ReviewsProvider>
              <CompareProvider>
                {children}
              </CompareProvider>
            </ReviewsProvider>
          </WishlistProvider>
        </CouponProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export { useCart } from "./CartContext"
export { useWishlist } from "./WishlistContext"
export { useAuth } from "./AuthContext"
export { useCoupon } from "./CouponContext"
export { useCompare } from "./CompareContext"
export type { CartItem } from "./types"
