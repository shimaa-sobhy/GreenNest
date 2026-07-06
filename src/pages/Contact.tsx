import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill in all fields.", "error")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      showToast("Please enter a valid email address.", "error")
      return
    }
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    showToast("Thank you for reaching out! We'll get back to you soon. 🌿")
    setForm({ name: "", email: "", message: "" })
    setSending(false)
  }

  return (
    <main className="bg-off-white pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="text-center max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-forest leading-[1.0] tracking-tight mb-6">
            Let&apos;s
            <br />
            <span className="italic font-light text-accent/50">Connect</span>
          </h1>
          <p className="text-subtle/50 text-sm md:text-base leading-relaxed font-light">
            Have a question about a specimen? Need horticultural advice? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="contact-name" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Name</label>
              <input id="contact-name" type="text" value={form.name} onChange={handleChange("name")} className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Email</label>
              <input id="contact-email" type="email" value={form.email} onChange={handleChange("email")} className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs tracking-wider uppercase text-subtle/50 mb-2 block font-medium">Message</label>
              <textarea id="contact-message" rows={5} value={form.message} onChange={handleChange("message")} className="w-full px-5 py-3.5 bg-card border border-forest/8 rounded-xl text-sm text-soft-black placeholder:text-subtle/30 outline-none focus:border-accent/40 transition-colors resize-none" placeholder="How can we help?" />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center w-full gap-3 h-13 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!sending ? { scale: 1.01 } : {}}
              whileTap={!sending ? { scale: 0.99 } : {}}
            >
              {sending ? (
                <>
                  <motion.span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  )
}
