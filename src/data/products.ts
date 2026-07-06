import shop1 from "@/assets/shop1.png"
import shop2 from "@/assets/shop2.png"
import shop3 from "@/assets/shop3.png"
import shop4 from "@/assets/shop4.png"
import shop5 from "@/assets/shop5.png"
import shop6 from "@/assets/shop6.png"
import shop7 from "@/assets/shop7.png"
import shop8 from "@/assets/shop8.png"
import shop9 from "@/assets/shop9.png"
import shop12 from "@/assets/shop12.png"
import shop13 from "@/assets/shop13.png"
import shop14 from "@/assets/shop14.png"
import shop15 from "@/assets/shop15.png"
import shop16 from "@/assets/shop16.png"
import shop17 from "@/assets/shop17.png"
import gallary2 from "@/assets/gallary2.png"

export interface Product {
  id: number
  name: string
  category: string
  oldPrice: number
  newPrice: number
  image: string
  rating: number
  reviewCount: number
  salesCount: number
  createdAt: string
  featured: boolean
  size: string
  indoor?: boolean
  outdoor?: boolean
  petFriendly?: boolean
  airPurifying?: boolean
  lowLight?: boolean
  beginnerFriendly?: boolean
  bestSeller?: boolean
  newArrival?: boolean
  inStock?: boolean
}

export interface PlantCareInfo {
  light: string
  water: string
  difficulty: string
}

export const productCare: Record<number, PlantCareInfo> = {
  1: { light: "Medium", water: "Moderate", difficulty: "Easy" },
  2: { light: "Low", water: "Low", difficulty: "Easy" },
  3: { light: "Bright", water: "Moderate", difficulty: "Moderate" },
  4: { light: "Low", water: "Moderate", difficulty: "Easy" },
  5: { light: "Bright", water: "Low", difficulty: "Easy" },
  6: { light: "Medium", water: "High", difficulty: "Moderate" },
  7: { light: "Medium", water: "Moderate", difficulty: "Easy" },
  8: { light: "Bright", water: "Low", difficulty: "Easy" },
  9: { light: "Medium", water: "Moderate", difficulty: "Easy" },
  12: { light: "Bright", water: "Moderate", difficulty: "Moderate" },
  13: { light: "Bright", water: "Low", difficulty: "Moderate" },
  14: { light: "Medium", water: "Moderate", difficulty: "Easy" },
  15: { light: "Bright", water: "High", difficulty: "Moderate" },
  16: { light: "Medium", water: "Moderate", difficulty: "Easy" },
  17: { light: "Bright", water: "Low", difficulty: "Easy" },
  18: { light: "Low", water: "Moderate", difficulty: "Easy" },
}

export const categories = ["All", "Indoor", "Succulents", "Flowering", "Foliage", "Cacti"]

export const products: Product[] = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor", oldPrice: 79.99, newPrice: 49.99, image: shop1, rating: 4.9, reviewCount: 128, salesCount: 342, createdAt: "2025-03-10", featured: true, size: "Large", indoor: true, petFriendly: false, airPurifying: true, lowLight: false, beginnerFriendly: true, bestSeller: true, newArrival: false, inStock: true },
  { id: 2, name: "Snake Plant Laurentii", category: "Succulents", oldPrice: 49.99, newPrice: 34.99, image: shop2, rating: 4.7, reviewCount: 89, salesCount: 589, createdAt: "2024-11-05", featured: true, size: "Medium", indoor: true, outdoor: true, petFriendly: true, airPurifying: true, lowLight: true, beginnerFriendly: true, bestSeller: true, newArrival: false, inStock: true },
  { id: 3, name: "Fiddle Leaf Fig", category: "Indoor", oldPrice: 89.99, newPrice: 59.99, image: shop3, rating: 4.5, reviewCount: 56, salesCount: 187, createdAt: "2025-06-01", featured: false, size: "Large", indoor: true, petFriendly: false, airPurifying: false, lowLight: false, beginnerFriendly: false, bestSeller: true, newArrival: true, inStock: true },
  { id: 4, name: "Peace Lily", category: "Flowering", oldPrice: 44.99, newPrice: 29.99, image: shop4, rating: 4.8, reviewCount: 203, salesCount: 412, createdAt: "2024-08-20", featured: true, size: "Medium", indoor: true, petFriendly: false, airPurifying: true, lowLight: true, beginnerFriendly: true, bestSeller: true, newArrival: false, inStock: true },
  { id: 5, name: "Aloe Vera", category: "Succulents", oldPrice: 39.99, newPrice: 24.99, image: shop5, rating: 4.3, reviewCount: 67, salesCount: 275, createdAt: "2025-04-15", featured: false, size: "Small", indoor: true, outdoor: true, petFriendly: false, airPurifying: true, lowLight: false, beginnerFriendly: true, bestSeller: false, newArrival: true, inStock: true },
  { id: 6, name: "Boston Fern", category: "Foliage", oldPrice: 54.99, newPrice: 38.99, image: shop6, rating: 4.1, reviewCount: 45, salesCount: 156, createdAt: "2024-12-01", featured: false, size: "Medium", indoor: true, outdoor: true, petFriendly: true, airPurifying: true, lowLight: false, beginnerFriendly: false, bestSeller: false, newArrival: false, inStock: true },
  { id: 7, name: "Spider Plant", category: "Indoor", oldPrice: 34.99, newPrice: 22.99, image: shop7, rating: 4.6, reviewCount: 112, salesCount: 623, createdAt: "2024-09-14", featured: true, size: "Medium", indoor: true, petFriendly: true, airPurifying: true, lowLight: true, beginnerFriendly: true, bestSeller: true, newArrival: false, inStock: true },
  { id: 8, name: "Barrel Cactus", category: "Cacti", oldPrice: 29.99, newPrice: 18.99, image: shop8, rating: 4.0, reviewCount: 78, salesCount: 98, createdAt: "2025-05-20", featured: false, size: "Small", outdoor: true, petFriendly: true, airPurifying: false, lowLight: false, beginnerFriendly: true, bestSeller: false, newArrival: true, inStock: true },
  { id: 9, name: "Calathea Orbifolia", category: "Foliage", oldPrice: 64.99, newPrice: 44.99, image: shop9, rating: 4.4, reviewCount: 93, salesCount: 211, createdAt: "2025-02-18", featured: false, size: "Medium", indoor: true, petFriendly: true, airPurifying: true, lowLight: false, beginnerFriendly: false, bestSeller: false, newArrival: true, inStock: true },

  { id: 12, name: "Areca Palm", category: "Indoor", oldPrice: 74.99, newPrice: 54.99, image: shop12, rating: 3.9, reviewCount: 61, salesCount: 174, createdAt: "2025-03-22", featured: false, size: "Large", indoor: true, petFriendly: true, airPurifying: true, lowLight: false, beginnerFriendly: true, bestSeller: false, newArrival: true, inStock: true },
  { id: 13, name: "String of Pearls", category: "Succulents", oldPrice: 38.99, newPrice: 26.99, image: shop13, rating: 3.7, reviewCount: 48, salesCount: 132, createdAt: "2025-05-11", featured: false, size: "Small", indoor: true, petFriendly: false, airPurifying: false, lowLight: false, beginnerFriendly: false, bestSeller: false, newArrival: false, inStock: true },
  { id: 14, name: "Chinese Money Plant", category: "Indoor", oldPrice: 42.99, newPrice: 28.99, image: shop14, rating: 3.6, reviewCount: 87, salesCount: 356, createdAt: "2024-10-30", featured: true, size: "Small", indoor: true, petFriendly: false, airPurifying: false, lowLight: false, beginnerFriendly: true, bestSeller: true, newArrival: false, inStock: true },
  { id: 15, name: "Bird of Paradise", category: "Flowering", oldPrice: 99.99, newPrice: 69.99, image: shop15, rating: 3.5, reviewCount: 38, salesCount: 94, createdAt: "2025-06-08", featured: false, size: "Large", indoor: true, outdoor: true, petFriendly: false, airPurifying: true, lowLight: false, beginnerFriendly: false, bestSeller: false, newArrival: true, inStock: true },
  { id: 16, name: "Rubber Plant", category: "Foliage", oldPrice: 48.99, newPrice: 32.99, image: shop16, rating: 3.4, reviewCount: 55, salesCount: 203, createdAt: "2025-02-05", featured: false, size: "Medium", indoor: true, petFriendly: false, airPurifying: true, lowLight: false, beginnerFriendly: true, bestSeller: false, newArrival: false, inStock: true },
  { id: 17, name: "Lithops Living Stones", category: "Cacti", oldPrice: 24.99, newPrice: 14.99, image: shop17, rating: 3.3, reviewCount: 32, salesCount: 87, createdAt: "2025-05-28", featured: false, size: "Small", outdoor: true, petFriendly: true, airPurifying: false, lowLight: false, beginnerFriendly: true, bestSeller: false, newArrival: false, inStock: true },
  { id: 18, name: "Parlor Palm", category: "Indoor", oldPrice: 54.99, newPrice: 36.99, image: gallary2, rating: 4.2, reviewCount: 73, salesCount: 268, createdAt: "2025-04-02", featured: false, size: "Medium", indoor: true, petFriendly: true, airPurifying: true, lowLight: true, beginnerFriendly: true, bestSeller: false, newArrival: true, inStock: true },
]

export const MIN_PRICE = 0
export const MAX_PRICE = 200
