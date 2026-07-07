import { Link } from "@/components/common/ScrollLink"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import BackButton from "@/components/common/BackButton"
import { plantCareGuides } from "@/data/plantCare"

const reveal = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function PlantCareDetail() {
  const { id } = useParams<{ id: string }>()
  const guide = plantCareGuides.find((g) => g.id === Number(id))

  if (!guide) {
    return (
      <main className="bg-off-white pt-36 pb-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading text-forest mb-3">Guide Not Found</h1>
          <Link to="/plant-care" className="text-xs text-subtle/30 hover:text-accent transition-colors uppercase tracking-wider font-medium">Back to Guides</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-off-white pt-32 pb-28 overflow-x-hidden">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div custom={1} variants={reveal} initial="initial" animate="animate" className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[10px] tracking-wider uppercase text-accent/50 px-3 py-1.5 bg-accent/8 rounded-full font-medium">{guide.difficulty}</span>
            <span className="text-[10px] tracking-wider uppercase text-accent/50 px-3 py-1.5 bg-accent/8 rounded-full font-medium">{guide.light}</span>
            <span className="text-[10px] tracking-wider uppercase text-accent/50 px-3 py-1.5 bg-accent/8 rounded-full font-medium">{guide.water}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-forest leading-[1.05] tracking-tight mb-4">{guide.title}</h1>
          <p className="text-subtle/50 text-sm md:text-base font-light">{guide.excerpt}</p>
        </motion.div>

        <motion.div
          custom={2}
          variants={reveal}
          initial="initial"
          animate="animate"
          className="relative mb-14 -mx-4 md:-mx-8 lg:-mx-12 flex items-center justify-center"
        >
          <img src={guide.image} alt={guide.title} className="w-full max-h-[65vh] object-contain plant-shadow" />
        </motion.div>

        <motion.div
          custom={3}
          variants={reveal}
          initial="initial"
          animate="animate"
          className="prose prose-sm max-w-none text-subtle/50 leading-relaxed font-light space-y-6"
        >
          {guide.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-heading text-forest mt-10 mb-4">{line.replace("## ", "")}</h2>
            if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-heading text-forest mt-8 mb-3">{line.replace("### ", "")}</h3>
            if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-sm">{line.replace("- ", "")}</li>
            if (line.trim() === "") return null
            return <p key={i} className="text-sm">{line}</p>
          })}
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div custom={4} variants={reveal} initial="initial" animate="animate">
          <BackButton fallbackPath="/plant-care" label="Back to Plant Care" scrollRestoreKey="plantcare_scroll" />
        </motion.div>
      </div>
    </main>
  )
}
