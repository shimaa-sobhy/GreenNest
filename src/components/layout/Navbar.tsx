import { useState, useEffect, useRef } from "react"
import { Link } from "@/components/common/ScrollLink"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { ShoppingCart, Heart, Menu, X, Leaf, Search, Scale } from "lucide-react"
import { useCart, useWishlist, useCompare } from "@/context"
import LiveSearch from "@/components/ui/LiveSearch"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Journal", href: "/plant-care" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const { totalItems } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const { totalCompared } = useCompare()

  const isHome = location.pathname === "/"
  const transparent = isHome && !scrolled

  const ctaX = useMotionValue(0)
  const ctaY = useMotionValue(0)
  const ctaSpringX = useSpring(ctaX, { stiffness: 150, damping: 15 })
  const ctaSpringY = useSpring(ctaY, { stiffness: 150, damping: 15 })

  const wishlistX = useMotionValue(0)
  const wishlistY = useMotionValue(0)
  const wishlistSpringX = useSpring(wishlistX, { stiffness: 200, damping: 20 })
  const wishlistSpringY = useSpring(wishlistY, { stiffness: 200, damping: 20 })

  const cartX = useMotionValue(0)
  const cartY = useMotionValue(0)
  const cartSpringX = useSpring(cartX, { stiffness: 200, damping: 20 })
  const cartSpringY = useSpring(cartY, { stiffness: 200, damping: 20 })

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY > 80) {
        setScrolled(true)
        if (currentY > lastScrollY.current && currentY > 200) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        setScrolled(false)
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setSearchOpen(false) }, [location.pathname])

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    return location.pathname.startsWith(href)
  }

  const handleCtaMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    ctaX.set((e.clientX - cx) * 0.15)
    ctaY.set((e.clientY - cy) * 0.15)
  }

  const handleCtaLeave = () => {
    ctaX.set(0)
    ctaY.set(0)
  }

  return (
    <>
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "mt-2 mb-1.5 px-4 sm:px-5 py-2"
                : "mt-4 mb-0 px-5 sm:px-7 py-3"
            } ${
              transparent
                ? "bg-transparent border-transparent shadow-none"
                : "bg-off-white/80 backdrop-blur-xl border border-forest/8 shadow-lg shadow-forest/5 rounded-full"
            }`}
          >
            <Link to="/" className="flex items-center max-sm:gap-1.5 sm:gap-2.5 group shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -3 }}
                className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-500 ${
                  transparent ? "bg-white/10" : "bg-accent/10"
                }`}
              >
                <Leaf className={`w-[18px] h-[18px] transition-colors duration-500 ${
                  transparent ? "text-white" : "text-accent"
                }`} />
              </motion.div>
              <span className={`font-semibold max-sm:text-xs sm:text-sm tracking-tight transition-colors duration-500 ${
                transparent ? "text-white" : "text-forest"
              }`}>
                GreenNest
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`relative text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-500 ${
                      isActive(link.href)
                        ? transparent ? "text-white" : "text-forest"
                        : transparent
                          ? "text-white/50 group-hover:text-white"
                          : "text-subtle/50 group-hover:text-forest"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.href) ? (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-0 left-3 right-3 h-[2px] rounded-full transition-colors duration-500 ${
                        transparent ? "bg-white" : "bg-forest"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className={`absolute -bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      transparent ? "bg-white/30" : "bg-forest/30"
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-0.5">
              <motion.button
                onClick={() => setSearchOpen(true)}
                className={`relative flex items-center justify-center w-9 sm:w-[42px] h-9 sm:h-[42px] rounded-full transition-all duration-300 ${
                  transparent
                    ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg shadow-white/5"
                    : "bg-white/[0.06] backdrop-blur-sm border border-forest/8 text-forest shadow-lg shadow-forest/5"
                } hover:shadow-lg hover:shadow-accent/15 hover:border-accent/25`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px] relative z-10" />
              </motion.button>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="max-sm:hidden">
                <Link
                  to="/compare"
                  aria-label="Compare"
                  className={`relative flex items-center justify-center w-[42px] h-[42px] rounded-full transition-all duration-300 ${
                    transparent
                      ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg shadow-white/5"
                      : "bg-white/[0.06] backdrop-blur-sm border border-forest/8 text-forest shadow-lg shadow-forest/5"
                  } hover:shadow-lg hover:shadow-accent/15 hover:border-accent/25`}
                >
                  <Scale className="w-[18px] h-[18px] relative z-10" />
                  {totalCompared > 0 && (
                    <motion.span
                      key={totalCompared}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-gradient-to-br from-accent to-[#3D7A3C] text-white text-[8px] font-bold flex items-center justify-center rounded-full shadow-[0_0_6px_rgba(34,197,94,0.4)] z-20"
                    >
                      {totalCompared > 9 ? "9+" : totalCompared}
                    </motion.span>
                  )}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-accent/12 pointer-events-none"
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileHover={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>

              <motion.div
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  style={{ x: wishlistSpringX, y: wishlistSpringY }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    wishlistX.set((e.clientX - (rect.left + rect.width / 2)) * 0.3)
                    wishlistY.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
                  }}
                  onMouseLeave={() => { wishlistX.set(0); wishlistY.set(0) }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      to="/wishlist"
                      aria-label="Wishlist"
                      className={`relative flex items-center justify-center w-9 sm:w-[42px] h-9 sm:h-[42px] rounded-full transition-all duration-300 ${
                        transparent
                          ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg shadow-white/5"
                          : "bg-white/[0.06] backdrop-blur-sm border border-forest/8 text-forest shadow-lg shadow-forest/5"
                      } hover:shadow-lg hover:shadow-accent/15 hover:border-accent/25`}
                    >
                      <Heart className="w-[18px] h-[18px] relative z-10" />
                      {wishlistCount > 0 && (
                        <motion.span
                          key={wishlistCount}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-gradient-to-br from-accent to-[#3D7A3C] text-white text-[8px] font-bold flex items-center justify-center rounded-full shadow-[0_0_6px_rgba(34,197,94,0.4)] z-20"
                        >
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </motion.span>
                      )}
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/12 pointer-events-none"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileHover={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <motion.div
                  style={{ x: cartSpringX, y: cartSpringY }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    cartX.set((e.clientX - (rect.left + rect.width / 2)) * 0.3)
                    cartY.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
                  }}
                  onMouseLeave={() => { cartX.set(0); cartY.set(0) }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      to="/cart"
                      aria-label="Cart"
                      className={`relative flex items-center justify-center w-9 sm:w-[42px] h-9 sm:h-[42px] rounded-full transition-all duration-300 ${
                        transparent
                          ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg shadow-white/5"
                          : "bg-white/[0.06] backdrop-blur-sm border border-forest/8 text-forest shadow-lg shadow-forest/5"
                      } hover:shadow-lg hover:shadow-accent/15 hover:border-accent/25`}
                    >
                      <ShoppingCart className="w-[18px] h-[18px] relative z-10" />
                      {totalItems > 0 && (
                        <motion.span
                          key={totalItems}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-gradient-to-br from-accent to-[#3D7A3C] text-white text-[8px] font-bold flex items-center justify-center rounded-full shadow-[0_0_6px_rgba(34,197,94,0.4)] z-20"
                        >
                          {totalItems > 9 ? "9+" : totalItems}
                        </motion.span>
                      )}
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/12 pointer-events-none"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileHover={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="hidden sm:block ml-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  style={{ x: ctaSpringX, y: ctaSpringY }}
                  onMouseMove={handleCtaMouse}
                  onMouseLeave={handleCtaLeave}
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-[11px] font-semibold tracking-wider uppercase rounded-full hover:bg-olive transition-all duration-300 shadow-lg shadow-forest/20 hover:shadow-xl hover:shadow-forest/25"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
                className={`lg:hidden p-2 sm:p-2.5 ml-0.5 sm:ml-1 rounded-xl transition-colors duration-500 ${
                  transparent
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-subtle/50 hover:text-forest hover:bg-accent/5"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="w-[18px] h-[18px]" />
                ) : (
                  <Menu className="w-[18px] h-[18px]" />
                )}
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-off-white shadow-2xl"
            >
              <div className="flex items-center justify-between px-8 h-20 border-b border-forest/5">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-forest">GreenNest</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-forest/70 hover:text-forest"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-8 py-12">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={`py-4 border-b border-forest/5 transition-all text-sm tracking-wide flex items-center justify-between group ${
                          isActive(link.href)
                            ? "text-forest font-medium"
                            : "text-forest/60 hover:text-forest"
                        }`}
                      >
                        {link.label}
                        <span className="text-xs text-forest/50 group-hover:text-accent transition-colors">
                          &rarr;
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-forest/10">
                  <div className="flex max-sm:flex-col gap-4">
                    <Link
                      to="/compare"
                      className="flex-1 max-sm:w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-forest/10 text-forest/75 hover:border-accent/30 hover:text-accent transition-all text-xs tracking-wide uppercase font-medium"
                    >
                      <Scale className="w-3.5 h-3.5" /> Compare
                      {totalCompared > 0 && ` (${totalCompared})`}
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex-1 max-sm:w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-forest/10 text-forest/75 hover:border-accent/30 hover:text-accent transition-all text-xs tracking-wide uppercase font-medium"
                    >
                      <Heart className="w-3.5 h-3.5" /> Wishlist
                      {wishlistCount > 0 && ` (${wishlistCount})`}
                    </Link>
                    <Link
                      to="/cart"
                      className="flex-1 max-sm:w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-forest/10 text-forest/75 hover:border-accent/30 hover:text-accent transition-all text-xs tracking-wide uppercase font-medium"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Cart
                      {totalItems > 0 && ` (${totalItems})`}
                    </Link>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/shop"
                      className="flex items-center justify-center w-full px-6 py-3.5 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all duration-300 shadow-lg shadow-forest/20"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
