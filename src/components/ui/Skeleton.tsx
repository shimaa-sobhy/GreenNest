import { type ReactNode, type CSSProperties } from "react"
import { motion } from "framer-motion"

function Shimmer({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative overflow-hidden bg-forest/5 ${className || ""}`} style={style}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        animate={{ x: ["-100%", "150%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="group relative">
      <Shimmer className="rounded-[28px] mb-4 shadow-organic" style={{ aspectRatio: "3/4" }} />
      <div className="px-1 space-y-2">
        <Shimmer className="h-4 w-3/5 rounded-md" />
        <Shimmer className="h-3.5 w-2/5 rounded-md" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <main className="bg-off-white pt-32 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Shimmer className="h-3.5 w-32 rounded-md mb-12" />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-28">
          <Shimmer className="rounded-3xl" style={{ aspectRatio: "4/5" }} />
          <div className="flex flex-col justify-center space-y-5">
            <Shimmer className="h-3 w-24 rounded-md" />
            <Shimmer className="h-10 w-4/5 rounded-lg" />
            <Shimmer className="h-8 w-2/5 rounded-lg" />
            <div className="space-y-2.5 pt-2">
              <Shimmer className="h-4 w-full rounded-md" />
              <Shimmer className="h-4 w-full rounded-md" />
              <Shimmer className="h-4 w-3/5 rounded-md" />
            </div>
            <Shimmer className="h-12 w-32 rounded-xl" />
            <div className="flex gap-4 pt-2">
              <Shimmer className="h-14 w-44 rounded-xl" />
              <Shimmer className="h-14 w-14 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export function BlogSkeleton() {
  return (
    <section className="py-36 bg-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <Shimmer className="h-3 w-32 rounded-md" />
            <Shimmer className="h-14 w-56 rounded-lg" />
          </div>
          <Shimmer className="h-4 w-20 rounded-md" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <div className="md:row-span-2">
            <Shimmer className="rounded-2xl shadow-lg shadow-forest/5" style={{ aspectRatio: "4/3" }} />
            <div className="mt-5 md:mt-6 px-1 space-y-2.5">
              <Shimmer className="h-3 w-20 rounded-md" />
              <Shimmer className="h-6 w-4/5 rounded-lg" />
            </div>
          </div>
          {[0, 1].map((i) => (
            <div key={i}>
              <Shimmer className="rounded-2xl shadow-lg shadow-forest/5" style={{ aspectRatio: "4/3" }} />
              <div className="mt-4 md:mt-5 px-1 space-y-2">
                <Shimmer className="h-3 w-20 rounded-md" />
                <Shimmer className="h-5 w-3/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PlantCareSkeleton() {
  return (
    <main className="bg-off-white pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <Shimmer className="h-3 w-16 rounded-md mx-auto" />
          <Shimmer className="h-14 w-64 rounded-lg mx-auto" />
          <Shimmer className="h-4 w-72 rounded-md mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Shimmer className="rounded-[28px] mb-5 shadow-organic" style={{ aspectRatio: "4/3" }} />
              <div className="flex gap-2 mb-3">
                <Shimmer className="h-5 w-16 rounded-full" />
                <Shimmer className="h-5 w-16 rounded-full" />
              </div>
              <Shimmer className="h-5 w-4/5 rounded-lg mb-2" />
              <Shimmer className="h-4 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

interface SkeletonWrapperProps {
  loading: boolean
  skeleton: ReactNode
  children: ReactNode
}

export default function SkeletonWrapper({ loading, skeleton, children }: SkeletonWrapperProps) {
  if (loading) return <>{skeleton}</>
  return <>{children}</>
}
