import Hero from "@/components/sections/Hero"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import OurPlants from "@/components/sections/OurPlants"
import PromoBanner from "@/components/sections/PromoBanner"
import Testimonials from "@/components/sections/Testimonials"
import Newsletter from "@/components/sections/Newsletter"
import Blog from "@/components/sections/Blog"

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <OurPlants />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
      <Blog />
    </main>
  )
}
