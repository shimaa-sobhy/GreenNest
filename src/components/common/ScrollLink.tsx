import { Link as RouterLink, useLocation } from "react-router-dom"
import type { LinkProps } from "react-router-dom"
import { useLenis } from "lenis/react"

export function Link({ to, onClick, children, ...props }: LinkProps) {
  const { pathname } = useLocation()
  const lenis = useLenis()

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const targetPath = typeof to === "string" ? to : to.pathname
    if (targetPath && targetPath === pathname) {
      if (lenis) {
        e.preventDefault()
        lenis.scrollTo(0, { duration: 1.2 })
        return
      }
    }
    onClick?.(e)
  }

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  )
}
