import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? (window.scrollY / h) * 100 : 0
      bar.style.transform = `scaleX(${p / 100})`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: "linear-gradient(90deg, #4F8A4D, #123524)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  )
}
