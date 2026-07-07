import { useRef, useState } from "react"
import { motion } from "framer-motion"
import GrowingVines from "@/components/effects/GrowingVines"
import { useToast } from "@/components/ui/Toast"
import plant7 from "@/assets/plant7-removebg-preview.png"
import plant1 from "@/assets/plant1-removebg-preview.png"

const STORAGE_KEY = "plantnest_newsletter_emails"

function getSubscribedEmails(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { showToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const input = (e.currentTarget as HTMLFormElement).elements[0] as HTMLInputElement
    const trimmed = input.value.trim()

    if (!trimmed || !isEmailValid(trimmed)) {
      setError("Please enter a valid email address.")
      return
    }

    const existing = getSubscribedEmails()
    if (existing.includes(trimmed.toLowerCase())) {
      setError("This email is already subscribed.")
      return
    }

    existing.push(trimmed.toLowerCase())
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))

    setSubmitted(true)
    setEmail("")
    showToast("Thank you for subscribing to our newsletter! 🌿")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section ref={sectionRef} className="relative py-36 bg-forest overflow-hidden" id="newsletter">
      <GrowingVines id="newsletter" className="top-0 h-20" />

      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <img src={plant1} alt="" className="w-full h-full object-cover plant-shadow" />
      </div>
      <motion.div
        className="absolute -top-24 -left-16 w-80 h-80 opacity-[0.05] pointer-events-none"
        animate={{ rotate: [0, 6, -6, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={plant7} alt="" className="w-full h-full object-cover organic-blob plant-shadow" />
      </motion.div>
      <motion.div
        className="absolute -bottom-24 -right-16 w-64 h-64 opacity-[0.05] pointer-events-none"
        animate={{ rotate: [0, -6, 6, 0], y: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob-2 plant-shadow" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-white/30 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Stay Connected</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-[1.0] tracking-tight mb-6">
            Join Our
            <br />
            <span className="italic font-light text-white/40">Garden</span>
          </h2>
          <p className="text-white/35 text-sm md:text-base font-light max-w-md mx-auto mb-12 leading-relaxed">
            Receive exclusive access to new arrivals, plant care insights, and members-only drops.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex max-sm:flex-col items-stretch sm:items-center gap-3 bg-white/8 rounded-xl border border-white/10 p-2 sm:pl-6 transition-all duration-300 focus-within:border-accent/40 focus-within:bg-white/10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent text-white/50 text-sm font-light placeholder:text-white/20 outline-none"
            />
            <motion.button
              type="submit"
              className="relative overflow-hidden h-11 w-full sm:w-auto px-7 rounded-lg bg-white/15 border border-white/15 text-white text-xs font-semibold tracking-wider uppercase hover:bg-white/25 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {submitted ? "Sent ✓" : "Subscribe"}
            </motion.button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-300/70 text-xs mt-3 font-light"
            >
              {error}
            </motion.p>
          )}
          <p className="text-white/20 text-[10px] mt-4 font-light">
            No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
