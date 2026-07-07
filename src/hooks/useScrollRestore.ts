import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useLenis } from "lenis/react"
import { clearSkipScroll } from "@/lib/scrollState"

export function useScrollRestore(storageKey: string) {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

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
    sessionStorage.removeItem(storageKey)

    if (saved === null) {
      clearSkipScroll()
      return
    }

    const y = parseInt(saved, 10)
    if (isNaN(y)) {
      clearSkipScroll()
      return
    }

    let cancelled = false
    let rafId: number
    const startTime = performance.now()
    const MAX_WAIT = 5000

    function attempt() {
      if (cancelled) return

      const elapsed = performance.now() - startTime
      const docHeight = document.documentElement.scrollHeight
      const vpHeight = window.innerHeight
      const timedOut = elapsed >= MAX_WAIT

      if (docHeight >= y + vpHeight || timedOut) {
        const l = lenisRef.current
        if (l) {
          l.scrollTo(y, { immediate: true })
        } else {
          window.scrollTo({ top: y, behavior: "instant" })
        }
        clearSkipScroll()
        return
      }

      rafId = requestAnimationFrame(attempt)
    }

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(attempt)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      clearSkipScroll()
    }
  }, [pathname, storageKey])
}
