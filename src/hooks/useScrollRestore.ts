import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useScrollRestore(storageKey: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    return () => {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }
  }, [storageKey])

  useEffect(() => {
    const pendingKey = sessionStorage.getItem("scroll_restore_pending")
    if (pendingKey !== storageKey) return
    sessionStorage.removeItem("scroll_restore_pending")

    const saved = sessionStorage.getItem(storageKey)
    if (saved !== null) {
      const y = parseInt(saved, 10)
      if (!isNaN(y)) {
        const raf = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: y, behavior: "instant" })
            sessionStorage.removeItem(storageKey)
          })
        })
        return () => cancelAnimationFrame(raf)
      }
    }
  }, [pathname, storageKey])
}
