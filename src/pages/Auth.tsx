import { useState } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

const formVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const { showToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const email = (form.elements.namedItem("auth-email") as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem("auth-password") as HTMLInputElement).value.trim()
    if (!email || !password) {
      showToast("Please fill in all fields.", "error")
      return
    }
    showToast(isLogin ? "Welcome back! 🪴" : "Account created successfully! 🪴")
  }

  return (
    <main className="bg-off-white pt-36 pb-28 min-h-screen flex items-center">
      <div className="mx-auto max-w-sm px-6 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-semibold text-forest">GreenNest</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading text-forest leading-[1.0] tracking-tight mb-3">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-subtle/50 text-sm font-light">
            {isLogin ? "Sign in to access your collection." : "Create an account to start your botanical journey."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "register"}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            {!isLogin && (
              <div>
                <label htmlFor="auth-name" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Full Name</label>
                <input id="auth-name" name="auth-name" type="text" className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors" placeholder="Jane Doe" />
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Email</label>
              <input id="auth-email" name="auth-email" type="email" className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="auth-password" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Password</label>
              <input id="auth-password" name="auth-password" type="password" className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors" placeholder="••••••••" />
            </div>
            <motion.button
              type="submit"
              className="w-full h-13 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button onClick={() => setIsLogin(!isLogin)} className="text-xs text-subtle/50 hover:text-accent transition-colors">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </motion.div>
      </div>
    </main>
  )
}
