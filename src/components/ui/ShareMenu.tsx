import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Link, MessageCircle } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-3.51 19.35 8.74 8.74 0 0 1 .17-2.23l1.22-5.2a3.5 3.5 0 0 1-.3-1.45c0-1.36.79-2.38 1.77-2.38.84 0 1.24.63 1.24 1.38 0 .84-.54 2.1-.81 3.27-.23.98.49 1.78 1.45 1.78 1.74 0 3.08-1.83 3.08-4.48 0-2.34-1.68-3.98-4.08-3.98-2.78 0-4.41 2.09-4.41 4.24 0 .84.32 1.74.72 2.23a.3.3 0 0 1 .07.28c-.07.31-.24.98-.27 1.12-.04.17-.14.2-.32.12-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.34-5.81 3.33 0 5.92 2.37 5.92 5.54 0 3.31-2.09 5.97-4.98 5.97-.97 0-1.89-.5-2.2-1.1l-.6 2.29a8.15 8.15 0 0 1-.9 2.29A10 10 0 1 0 12 2Z" />
    </svg>
  )
}

interface ShareMenuProps {
  productName: string
  productUrl: string
}

const shareOptions = [
  {
    id: "copy",
    label: "Copy Link",
    icon: Link,
    color: "text-forest",
    bg: "hover:bg-forest/5",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "text-emerald-600",
    bg: "hover:bg-emerald-50",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: FacebookIcon,
    color: "text-blue-600",
    bg: "hover:bg-blue-50",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: PinterestIcon,
    color: "text-red-600",
    bg: "hover:bg-red-50",
  },
]

function getShareUrl(platform: string, url: string, text: string) {
  switch (platform) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    case "pinterest":
      return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`
    default:
      return url
  }
}

const MENU_WIDTH = 208
const GAP = 12
const MARGIN = 8

export default function ShareMenu({ productName, productUrl }: ShareMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({})
  const [origin, setOrigin] = useState("bottom center")
  const { showToast } = useToast()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onScroll() { setOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [open])

  useEffect(() => {
    if (!open) {
      setPopupStyle({})
      return
    }

    const raf = requestAnimationFrame(() => {
      if (!btnRef.current || !menuRef.current) return

      const btnRect = btnRef.current.getBoundingClientRect()
      const menuHeight = menuRef.current.offsetHeight || 208
      const menuWidth = MENU_WIDTH

      let top = btnRect.top - menuHeight - GAP
      let left = btnRect.left + btnRect.width / 2 - menuWidth / 2
      let originY = "bottom"
      let originX = "center"

      if (top < MARGIN) {
        top = btnRect.bottom + GAP
        originY = "top"
      }

      if (left + menuWidth > window.innerWidth - MARGIN) {
        left = window.innerWidth - menuWidth - MARGIN
        originX = "right"
      }

      if (left < MARGIN) {
        left = MARGIN
        originX = "left"
      }

      setPopupStyle({ position: "fixed", top, left })
      setOrigin(`${originY} ${originX}`)
    })

    return () => cancelAnimationFrame(raf)
  }, [open])

  function handleShare(platform: string) {
    if (platform === "copy") {
      navigator.clipboard.writeText(productUrl).then(() => {
        showToast("Product link copied successfully.")
        setOpen(false)
      })
      return
    }
    const shareUrl = getShareUrl(platform, productUrl, productName)
    window.open(shareUrl, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  function handleMainClick() {
    if (navigator.share) {
      navigator.share({ title: productName, url: productUrl }).catch(() => {})
    } else {
      setOpen((prev) => !prev)
    }
  }

  return (
    <div className="relative inline-flex">
      <motion.button
        ref={btnRef}
        onClick={handleMainClick}
        className="h-14 px-6 rounded-xl text-xs tracking-wider uppercase font-medium transition-all border border-forest/12 text-subtle/30 hover:text-accent hover:border-accent/30 flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Share product"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            style={{ ...popupStyle, transformOrigin: origin }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-52 bg-white rounded-2xl shadow-xl shadow-forest/10 border border-forest/5 overflow-hidden z-50"
          >
            <div className="p-2">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  role="menuitem"
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${option.bg} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30`}
                >
                  <option.icon className={`w-4 h-4 ${option.color}`} />
                  <span className="text-subtle/60">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ShareIconButton({ productName, productUrl }: ShareMenuProps) {
  const { showToast } = useToast()

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({ title: productName, url: productUrl }).catch(() => {})
    } else {
      navigator.clipboard.writeText(productUrl).then(() => {
        showToast("Product link copied successfully.")
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 sm:w-9 sm:h-9 max-sm:rounded-full rounded-xl bg-white/80 max-sm:bg-white/80 flex items-center justify-center hover:bg-white transition-all shadow-sm touch-manipulation hover:scale-105 active:scale-95"
      aria-label="Share product"
    >
      <Share2 className="w-3.5 h-3.5 text-subtle" />
    </button>
  )
}