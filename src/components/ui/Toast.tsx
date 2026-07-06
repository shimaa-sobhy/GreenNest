import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

interface Toast {
  id: number
  message: string
  type?: "success" | "error"
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void
}

const ToastContext = createContext<ToastContextType | null>(null)

let toastId = 0

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-md border ${
                toast.type === "error"
                  ? "bg-rose-50/90 border-rose-200/50 text-rose-700"
                  : "bg-white/85 border-emerald-200/40 text-forest"
              }`}
            >
              {toast.type === "error" ? (
                <X className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="ml-2 p-0.5 rounded-full hover:bg-black/5 transition-colors">
                <X className="w-3.5 h-3.5 opacity-40" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
