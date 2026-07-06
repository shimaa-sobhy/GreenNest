import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Pencil, Trash2, X } from "lucide-react"
import { useReviews, type Review } from "@/context/ReviewsContext"
import { useToast } from "@/components/ui/Toast"

const placeholderColors = [
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-rose-400 to-pink-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-teal-500",
  "from-lime-400 to-green-500",
  "from-fuchsia-400 to-pink-500",
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return placeholderColors[Math.abs(hash) % placeholderColors.length]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function starLabel(rating: number) {
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
  return labels[rating] || ""
}

interface ReviewSectionProps {
  productId: number
  productName: string
}

export default function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const { getReviews, addReview, updateReview, deleteReview, hasReviewed } = useReviews()
  const { showToast } = useToast()
  const reviews = getReviews(productId)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formName, setFormName] = useState("")
  const [formRating, setFormRating] = useState(0)
  const [formTitle, setFormTitle] = useState("")
  const [formText, setFormText] = useState("")
  const [hoverRating, setHoverRating] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [reviews])

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]
    reviews.forEach((r) => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++ })
    const total = reviews.length || 1
    return counts
      .map((count, i) => ({ stars: i + 1, count, percent: (count / total) * 100 }))
      .reverse()
  }, [reviews])

  const handleOpenForm = (review?: Review) => {
    if (review) {
      setEditingId(review.id)
      setFormName(review.customerName)
      setFormRating(review.rating)
      setFormTitle(review.title)
      setFormText(review.text)
    } else {
      setEditingId(null)
      setFormName("")
      setFormRating(0)
      setFormTitle("")
      setFormText("")
    }
    setErrors({})
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setErrors({})
  }

  const handleSubmit = () => {
    const errs: Record<string, string> = {}
    if (!formName.trim()) errs.name = "Name is required"
    if (formRating < 1) errs.rating = "Please select a rating"
    if (!formTitle.trim()) errs.title = "Title is required"
    if (!formText.trim()) errs.text = "Review text is required"
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (editingId) {
      updateReview(editingId, {
        customerName: formName.trim(),
        rating: formRating,
        title: formTitle.trim(),
        text: formText.trim(),
      })
      showToast("Your review has been updated.")
    } else {
      if (hasReviewed(productId, formName.trim())) {
        setErrors({ name: "You've already reviewed this product. Edit your existing review instead." })
        return
      }
      addReview({
        productId,
        customerName: formName.trim(),
        rating: formRating,
        title: formTitle.trim(),
        text: formText.trim(),
      })
      showToast("Thank you! Your review has been submitted.")
    }

    handleCancel()
  }

  const handleDelete = (review: Review) => {
    deleteReview(review.id)
    showToast("Review deleted.")
    if (editingId === review.id) handleCancel()
  }

  const renderStars = (rating: number, interactive = false) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && setFormRating(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          whileHover={interactive ? { scale: 1.2 } : undefined}
          whileTap={interactive ? { scale: 0.9 } : undefined}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
        >
          <Star
            className={`w-4 h-4 ${
              star <= (interactive && hoverRating ? hoverRating : rating)
                ? "text-amber-400 fill-amber-400"
                : "text-subtle/15 fill-subtle/10"
            }`}
          />
        </motion.button>
      ))}
    </div>
  )

  return (
    <div className="border-t border-forest/10 pt-16 mt-20">
      <motion.h2
        className="text-2xl md:text-3xl font-heading text-forest tracking-tight mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Customer Reviews
      </motion.h2>

      {reviews.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          <div className="shrink-0">
            <div className="text-5xl md:text-6xl font-heading text-forest leading-none">{avgRating}</div>
            <div className="mt-2">{renderStars(Math.round(Number(avgRating)))}</div>
            <p className="text-sm text-subtle/50 mt-2">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex-1 max-w-sm space-y-2.5">
            {distribution.map(({ stars, count, percent }) => (
              <div key={stars} className="flex items-center gap-2.5">
                <span className="text-xs text-subtle/40 w-6 shrink-0">{stars}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                <div className="flex-1 h-2 bg-forest/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-400/80 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="text-xs text-subtle/30 w-10 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-subtle/50 font-light mb-10">No reviews yet. Be the first to review this product.</p>
      )}

      <div className="flex justify-end mb-8">
        <motion.button
          onClick={() => showForm ? handleCancel() : handleOpenForm()}
          className="h-11 px-6 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {showForm ? "Cancel" : "Write a Review"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-card border border-forest/5 rounded-2xl p-6 md:p-8 shadow-organic">
              <h3 className="text-lg font-heading text-forest mb-6">
                {editingId ? "Edit Your Review" : "Write a Review"}
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-11 px-4 bg-cream/60 border border-forest/8 rounded-xl text-sm text-forest placeholder:text-subtle/20 outline-none focus:border-accent/30 transition-colors"
                  />
                  {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-2">
                    Rating {formRating > 0 && <span className="text-accent lowercase normal-case">— {starLabel(formRating)}</span>}
                  </label>
                  <div className="flex gap-1">{renderStars(formRating, true)}</div>
                  {errors.rating && <p className="text-xs text-rose-400 mt-1.5">{errors.rating}</p>}
                </div>

                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-2">Review Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    className="w-full h-11 px-4 bg-cream/60 border border-forest/8 rounded-xl text-sm text-forest placeholder:text-subtle/20 outline-none focus:border-accent/30 transition-colors"
                  />
                  {errors.title && <p className="text-xs text-rose-400 mt-1.5">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs text-subtle/40 uppercase tracking-wider font-medium mb-2">Your Review</label>
                  <textarea
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    className="w-full px-4 py-3 bg-cream/60 border border-forest/8 rounded-xl text-sm text-forest placeholder:text-subtle/20 outline-none focus:border-accent/30 transition-colors resize-none"
                  />
                  {errors.text && <p className="text-xs text-rose-400 mt-1.5">{errors.text}</p>}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <motion.button
                    onClick={handleSubmit}
                    className="h-11 px-8 bg-forest text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-olive transition-all shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {editingId ? "Save Changes" : "Submit Review"}
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="h-11 px-6 border border-forest/12 text-subtle/30 hover:text-forest text-xs tracking-wider uppercase font-medium rounded-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <AnimatePresence mode="popLayout">
          {sortedReviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card border border-forest/5 rounded-2xl p-5 md:p-6 shadow-organic"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(review.customerName)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
                  >
                    {review.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-medium text-forest">{review.customerName}</span>
                      <span className="text-[10px] text-subtle/25">{formatDate(review.date)}</span>
                    </div>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                  </div>
                </div>
                {!review.id.startsWith("builtin_") && (
                  <div className="flex items-center gap-1 shrink-0">
                    <motion.button
                      onClick={() => handleOpenForm(review)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-subtle/20 hover:text-accent hover:bg-accent/5 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Edit review"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(review)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-subtle/20 hover:text-rose-400 hover:bg-rose-50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Delete review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="mt-3 pl-[52px]">
                <h4 className="text-sm font-medium text-forest">{review.title}</h4>
                <p className="text-sm text-subtle/50 font-light mt-1.5 leading-relaxed">{review.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
