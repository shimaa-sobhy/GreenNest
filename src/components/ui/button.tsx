import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium relative overflow-hidden tracking-wider"

    const variants: Record<string, string> = {
      primary:
        "bg-forest text-white hover:bg-olive shadow-lg shadow-forest/15 hover:shadow-xl hover:shadow-forest/25",
      secondary:
        "bg-white text-forest border-2 border-accent/30 hover:border-accent hover:bg-accent/5",
      outline:
        "border border-forest/15 text-forest hover:bg-forest hover:text-white",
      ghost: "text-subtle/60 hover:text-forest hover:bg-forest/5",
    }

    const sizes: Record<string, string> = {
      sm: "h-10 px-5 text-[10px] uppercase gap-2 rounded-xl",
      md: "h-12 px-7 text-xs uppercase gap-2.5 rounded-xl",
      lg: "h-14 px-9 text-xs uppercase gap-3 rounded-xl",
    }

    const classes = cn(base, variants[variant], sizes[size], className)

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...(props as any)}
      >
        <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button, type ButtonProps }
export default Button
