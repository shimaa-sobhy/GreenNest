import { useRef, useState, useEffect } from "react"
import { Link } from "@/components/common/ScrollLink"
import { motion, useScroll, useTransform } from "framer-motion"
import GrowingPlant from "@/components/effects/GrowingPlant"
import { blogPosts } from "@/data/blogs"
import { ArrowRight } from "lucide-react"
import { BlogSkeleton } from "@/components/ui/Skeleton"

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches)
    handler(mq)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])
  return matches
}

export default function Blog() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])
  const sectionRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.3], isDesktop ? [30, 0] : [0, 0])

  const img1Parallax = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, -20] : [0, 0])
  const img2Parallax = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, -30] : [0, 0])
  const img3Parallax = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, -15] : [0, 0])

  const posts = blogPosts.slice(0, 3)

  return (
    <section ref={sectionRef} className="py-36 bg-cream overflow-hidden" id="blog">
      <GrowingPlant sectionId="blog" position="right" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {loading ? (
          <BlogSkeleton />
        ) : (
        <>
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div>
            <span className="text-subtle/40 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">From the Journal</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.0] tracking-tight text-forest">
              Latest
              <br />
              <span className="italic font-light text-accent/50">Stories</span>
            </h2>
          </div>
          <motion.div whileHover={{ x: 3 }}>
            <Link to="/plant-care" className="group inline-flex items-center gap-2 text-xs tracking-wider uppercase text-subtle/40 hover:text-forest transition-colors shrink-0 font-medium">
              View All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <motion.div
            key={posts[0].id}
            className="md:row-span-2 group"
            initial={{ opacity: 0, y: isDesktop ? 40 : 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/blog/${posts[0].id}`} className="block h-full">
              <motion.div
                className="relative md:h-full flex items-center justify-center p-6 md:p-8"
                style={{ y: img1Parallax }}
              >
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full md:h-full object-contain scale-100 group-hover:scale-105 transition-all duration-700 plant-shadow"
                  loading="lazy"
                />
              </motion.div>
              <div className="mt-5 md:mt-6 px-1">
                <span className="text-accent/50 text-[10px] tracking-wider uppercase font-medium">{posts[0].category}</span>
                <h3 className="font-heading text-xl md:text-2xl text-forest mt-1.5 leading-snug group-hover:text-accent/80 transition-colors">{posts[0].title}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-subtle/30 group-hover:text-accent transition-colors mt-3 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Read Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            key={posts[1].id}
            className="group"
            initial={{ opacity: 0, y: isDesktop ? 40 : 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/blog/${posts[1].id}`} className="block">
              <motion.div
                className="relative flex items-center justify-center p-4 md:p-6"
                style={{ aspectRatio: "4/3", y: img2Parallax }}
              >
                <img
                  src={posts[1].image}
                  alt={posts[1].title}
                  className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-all duration-700 plant-shadow"
                  loading="lazy"
                />
              </motion.div>
              <div className="mt-4 md:mt-5 px-1">
                <span className="text-accent/50 text-[10px] tracking-wider uppercase font-medium">{posts[1].category}</span>
                <h3 className="font-heading text-lg md:text-xl text-forest mt-1.5 leading-snug group-hover:text-accent/80 transition-colors">{posts[1].title}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-subtle/30 group-hover:text-accent transition-colors mt-2.5 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Read Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            key={posts[2].id}
            className="group"
            initial={{ opacity: 0, y: isDesktop ? 40 : 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/blog/${posts[2].id}`} className="block">
              <motion.div
                className="relative flex items-center justify-center p-4 md:p-6"
                style={{ aspectRatio: "4/3", y: img3Parallax }}
              >
                <img
                  src={posts[2].image}
                  alt={posts[2].title}
                  className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-all duration-700 plant-shadow"
                  loading="lazy"
                />
              </motion.div>
              <div className="mt-4 md:mt-5 px-1">
                <span className="text-accent/50 text-[10px] tracking-wider uppercase font-medium">{posts[2].category}</span>
                <h3 className="font-heading text-lg md:text-xl text-forest mt-1.5 leading-snug group-hover:text-accent/80 transition-colors">{posts[2].title}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-subtle/30 group-hover:text-accent transition-colors mt-2.5 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Read Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
        </>
        )}
      </div>
    </section>
  )
}
