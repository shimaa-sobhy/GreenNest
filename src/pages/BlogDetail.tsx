import { Link } from "@/components/common/ScrollLink"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import BackButton from "@/components/common/BackButton"
import { blogPosts } from "@/data/blogs"

const reveal = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const post = blogPosts.find((p) => p.id === Number(id))

  if (!post) {
    return (
      <main className="bg-off-white pt-36 pb-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading text-forest mb-3">Post Not Found</h1>
          <Link to="/plant-care" className="text-xs text-subtle/30 hover:text-accent transition-colors uppercase tracking-wider font-medium">Back to Journal</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-off-white pt-32 pb-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div custom={1} variants={reveal} initial="initial" animate="animate" className="mb-10">
          <span className="text-accent/50 text-xs font-medium tracking-[0.25em] uppercase mb-4 block">{post.category}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-forest leading-[1.05] tracking-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-subtle/25">
            <span>{post.date}</span>
            <span className="w-px h-3 bg-subtle/10" />
            <span>{post.readTime} read</span>
            <span className="w-px h-3 bg-subtle/10" />
            <span>{post.author}</span>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          variants={reveal}
          initial="initial"
          animate="animate"
          className="relative mb-14 md:-mx-8 lg:-mx-12 flex items-center justify-center"
        >
          <img src={post.image} alt={post.title} className="w-full max-h-[65vh] object-contain plant-shadow" />
        </motion.div>

        <motion.div
          custom={3}
          variants={reveal}
          initial="initial"
          animate="animate"
          className="prose prose-sm max-w-none text-subtle/50 leading-relaxed font-light space-y-6"
        >
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-heading text-forest mt-10 mb-4">{line.replace("## ", "")}</h2>
            if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-heading text-forest mt-8 mb-3">{line.replace("### ", "")}</h3>
            if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-sm">{line.replace("- ", "")}</li>
            if (line.match(/^\d+\./)) return <li key={i} className="ml-5 list-decimal text-sm">{line.replace(/^\d+\. /, "")}</li>
            if (line.trim() === "") return null
            if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-medium text-forest/50">{line.replace(/\*\*/g, "")}</p>
            return <p key={i} className="text-sm">{line}</p>
          })}
        </motion.div>

        <motion.div
          custom={4}
          variants={reveal}
          initial="initial"
          animate="animate"
          className="mt-16 pt-8 border-t border-forest/10 flex flex-wrap gap-2"
        >
          {post.tags.map((tag) => (
            <span key={tag} className="px-4 py-1.5 text-[10px] tracking-wider uppercase bg-cream text-subtle/25 rounded-full font-medium">#{tag}</span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div custom={5} variants={reveal} initial="initial" animate="animate">
          <BackButton fallbackPath="/plant-care" label="Back to Journal" scrollRestoreKey="plantcare_scroll" />
        </motion.div>
      </div>
    </main>
  )
}
