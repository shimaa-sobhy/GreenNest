import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ReactLenis } from "lenis/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/common/ScrollToTop"
import BackToTop from "@/components/common/BackToTop"
import ToastProvider from "@/components/ui/Toast"
import ScrollProgress from "@/components/effects/ScrollProgress"
import MouseGlow from "@/components/effects/MouseGlow"
import FloatingLeaves from "@/components/effects/FloatingLeaves"
import { AppProviders } from "@/context"

const Home = lazy(() => import("@/pages/Home"))
const Shop = lazy(() => import("@/pages/Shop"))
const Cart = lazy(() => import("@/pages/Cart"))
const Wishlist = lazy(() => import("@/pages/Wishlist"))
const Auth = lazy(() => import("@/pages/Auth"))
const Checkout = lazy(() => import("@/pages/Checkout"))
const ProductDetail = lazy(() => import("@/pages/ProductDetail"))
const BlogDetail = lazy(() => import("@/pages/BlogDetail"))
const PlantCare = lazy(() => import("@/pages/PlantCare"))
const PlantCareDetail = lazy(() => import("@/pages/PlantCareDetail"))
const About = lazy(() => import("@/pages/About"))
const Contact = lazy(() => import("@/pages/Contact"))
const Compare = lazy(() => import("@/pages/Compare"))
const NotFound = lazy(() => import("@/pages/NotFound"))

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const pageLinks = [
  { path: "/shop", Component: Shop },
  { path: "/cart", Component: Cart },
  { path: "/checkout", Component: Checkout },
  { path: "/wishlist", Component: Wishlist },
  { path: "/auth", Component: Auth },
  { path: "/about", Component: About },
  { path: "/contact", Component: Contact },
  { path: "/compare", Component: Compare },
  { path: "/plant-care", Component: PlantCare },
  { path: "/plant-care/:id", Component: PlantCareDetail },
  { path: "/product/:id", Component: ProductDetail },
  { path: "/blog/:id", Component: BlogDetail },
  { path: "/", Component: Home },
]

function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function LenisWrapper({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSmooth(false)
    }
  }, [])

  return (
    <ReactLenis root options={{
      duration: smooth ? 1.2 : 0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: smooth,
    }}>
      {children}
    </ReactLenis>
  )
}

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-off-white z-50">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-8 bg-accent/20"
            style={{ borderRadius: "4px" }}
            animate={{ scaleY: [1, 2.5, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  )
}

function Layout() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <MouseGlow />
      <FloatingLeaves />
      <BackToTop />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <AnimatedPage>
          <Routes location={location}>
            {pageLinks.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatedPage>
      </Suspense>
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  return (
    <BrowserRouter>
      <AppProviders>
        <ToastProvider>
          <LenisWrapper>
            <div className="min-h-screen bg-off-white">
              <Layout />
            </div>
          </LenisWrapper>
        </ToastProvider>
      </AppProviders>
    </BrowserRouter>
  )
}
