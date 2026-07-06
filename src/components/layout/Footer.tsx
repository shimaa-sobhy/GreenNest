import { Link } from "@/components/common/ScrollLink"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Leaf, Mail, Clock } from "lucide-react"
import plant1 from "@/assets/plant1-removebg-preview.png"
import plant7 from "@/assets/plant7-removebg-preview.png"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.908 12.2385 16.0396 11.4078 15.906C10.5771 15.7724 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22765 13.4229 8.09404 12.5922C7.96043 11.7615 8.09207 10.9099 8.47037 10.1584C8.84867 9.40685 9.45422 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87665 12.63 8.00001C13.4789 8.12588 14.2649 8.52149 14.8717 9.12831C15.4785 9.73513 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.238 4.636 19.855 8.356 21.312C8.248 20.81 8.164 20.073 8.384 19.352C8.58 18.716 9.256 15.96 9.256 15.96C9.256 15.96 9.036 15.512 9.036 14.832C9.036 13.712 9.692 12.912 10.52 12.912C11.22 12.912 11.556 13.456 11.556 14.1C11.556 14.816 11.1 15.876 10.86 16.856C10.66 17.68 11.284 18.352 12.096 18.352C13.56 18.352 14.688 16.784 14.688 14.484C14.688 12.5 13.292 11.092 11.324 11.092C9.036 11.092 7.624 12.852 7.624 15.056C7.624 15.788 7.76 16.108 8.12 16.624C7.956 16.492 7.824 16.34 7.784 16.152C7.572 15.356 7.384 14.404 7.504 13.736C7.668 12.828 8.648 12.132 9.568 11.996C10.648 11.836 11.652 12.108 11.652 13.372C11.652 14.24 11.06 15.384 10.736 16.416C10.472 17.264 11.088 18.088 11.952 18.088C13.868 18.088 15.4 16.036 15.4 13.384C15.4 11.072 13.642 9.22 11.042 9.22C8.002 9.22 6.144 11.396 6.144 13.744C6.144 15.388 6.776 16.34 7.4 17.004C7.468 17.08 7.472 17.14 7.448 17.224C7.36 17.528 7.208 18.132 7.18 18.244C7.14 18.408 7.064 18.444 6.896 18.364C5.492 17.688 4.08 15.852 4.08 13.672C4.08 10.384 6.76 7.28 11.492 7.28C15.272 7.28 18.164 9.96 18.164 13.316C18.164 17.048 15.736 20.032 12.176 20.032C11.328 20.032 10.528 19.62 10.228 19.124L9.66 21.416C9.448 22.096 8.964 22.94 8.644 23.476C9.72 23.828 10.84 24 12 24C17.523 24 22 19.523 22 14C22 8.477 17.523 4 12 4V2Z" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Journal", to: "/plant-care" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

export default function Footer() {
  const location = useLocation()
  return (
    <footer className="relative bg-forest overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none">
        <img src={plant1} alt="" className="w-full h-full object-cover plant-shadow" />
      </div>
      <motion.div
        className="absolute -top-32 -right-32 w-80 h-80 opacity-[0.04] pointer-events-none select-none"
        animate={{ rotate: [0, 8, -8, 0], y: [0, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={plant7} alt="" className="w-full h-full object-cover organic-blob plant-shadow" />
      </motion.div>
      <motion.div
        className="absolute -bottom-24 -left-24 w-64 h-64 opacity-[0.03] pointer-events-none select-none"
        animate={{ rotate: [0, -6, 6, 0], y: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <img src={plant1} alt="" className="w-full h-full object-cover organic-blob-2 plant-shadow" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <motion.div
                className="w-11 h-11 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Leaf className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors" />
              </motion.div>
              <span className="text-lg font-semibold tracking-tight text-white/40 group-hover:text-white/70 transition-colors">GreenNest</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-white/30 font-light">
              Bringing nature closer to your home with carefully selected indoor plants and timeless botanical design.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-6">Navigation</h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => {
                const active = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to)
                return (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className={`text-sm font-light transition-all duration-300 ${
                        active
                          ? "text-accent [filter:drop-shadow(0_0_6px_rgba(34,197,94,0.35))]"
                          : "text-white/30 hover:text-accent hover:[filter:drop-shadow(0_0_6px_rgba(34,197,94,0.25))]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@greenest.com"
                className="flex items-center gap-3 text-sm text-white/30 hover:text-accent transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="group-hover:[filter:drop-shadow(0_0_4px_rgba(34,197,94,0.25))] transition-all duration-300">hello@greenest.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/30">
                <Clock className="w-4 h-4 text-accent/60 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 text-xs mb-1">Business Hours</p>
                  <p className="font-light">Mon – Sat | 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-6">Follow Us</h4>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center text-accent/60 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-[19px] h-[19px]" />
              </motion.a>
              <motion.a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center text-accent/60 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-[19px] h-[19px]" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center text-accent/60 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <FacebookIcon className="w-[19px] h-[19px]" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-white/25 font-light">&copy; 2026 GreenNest. All rights reserved.</p>
          <p className="text-xs text-white/25 font-light">
            Developed with <span className="text-accent/60">&hearts;</span> by{" "}
            <a
              href="mailto:sobhyshimaa2007@gmail.com"
              aria-label="Email Shimaa Zahra"
              className="text-white/40 hover:text-accent transition-all duration-300 hover:[filter:drop-shadow(0_0_6px_rgba(34,197,94,0.3))]"
            >
              Shimaa Zahra
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
