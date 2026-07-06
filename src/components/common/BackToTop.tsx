import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "lenis/react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-forest text-white flex items-center justify-center shadow-lg shadow-forest/20 hover:bg-olive hover:shadow-xl hover:shadow-forest/25 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2"
          aria-label="Back to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
