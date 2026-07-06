import { Link } from "@/components/common/ScrollLink"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="bg-off-white pt-36 pb-28 min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center max-w-sm mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-8xl md:text-9xl font-heading text-accent/15 leading-none mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-heading text-forest mb-3">Page Not Found</h2>
        <p className="text-sm text-subtle/50 font-light mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/" className="inline-flex items-center gap-3 h-13 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-lg hover:shadow-xl">
            Back Home &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
