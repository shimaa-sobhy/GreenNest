import { useEffect, useRef } from "react"

const isBrowser = typeof window !== "undefined"

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isBrowser && window.innerWidth < 1024) return
    const glow = glowRef.current
    if (!glow) return

    let rafId: number
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05
      glow.style.setProperty("--x", `${currentX}px`)
      glow.style.setProperty("--y", `${currentY}px`)
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouse, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[2] inset-0 hidden lg:block"
      style={
        {
          background:
            "radial-gradient(700px circle at var(--x, 50%) var(--y, 50%), rgba(91, 143, 90, 0.04), rgba(91, 143, 90, 0.01) 30%, transparent 50%)",
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  )
}
