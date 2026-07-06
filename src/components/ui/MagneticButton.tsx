import { useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: "button" | "a"
  href?: string
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  as = "button",
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handleLeave = () => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = "translate(0, 0)"
  }

  const Tag = as === "a" ? motion.a : motion.button

  return (
    <div
      ref={btnRef}
      className="magnetic-btn inline-block"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <Tag
        className={`btn-glow relative overflow-hidden rounded-xl bg-forest text-white text-xs font-semibold tracking-wider uppercase px-8 h-13 inline-flex items-center gap-3 cursor-pointer transition-shadow hover:shadow-lg hover:shadow-forest/20 ${className}`}
        onClick={onClick}
        href={href}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onMouseMove={(e: React.MouseEvent) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          ;(e.target as HTMLElement).style.setProperty("--mx", `${x}%`)
          ;(e.target as HTMLElement).style.setProperty("--my", `${y}%`)
        }}
      >
        {children}
      </Tag>
    </div>
  )
}
