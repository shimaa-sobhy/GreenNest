import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { markSkipScroll } from "@/lib/scrollState"

interface BackButtonProps {
  fallbackPath: string
  label: string
  scrollRestoreKey: string
}

export default function BackButton({ fallbackPath, label, scrollRestoreKey }: BackButtonProps) {
  const navigate = useNavigate()

  function goBack() {
    markSkipScroll()
    sessionStorage.setItem("scroll_restore_pending", scrollRestoreKey)
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(fallbackPath, { replace: true })
    }
  }

  return (
    <button
      onClick={goBack}
      className="group inline-flex items-center gap-2 text-xs text-subtle/30 hover:text-accent transition-colors mt-16 font-medium"
    >
      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> {label}
    </button>
  )
}
