import Hero from "@/components/home/Hero";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import ColorGradeSlider from "@/components/home/ColorGradeSlider";
import CategoryPreview from "@/components/home/CategoryPreview";
import ShopPreview from "@/components/home/ShopPreview";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/ui/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGallery />
      <ColorGradeSlider />
      <CategoryPreview />
      <ShopPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
