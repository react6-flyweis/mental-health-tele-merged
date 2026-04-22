import ReviewsHero from "@/modules/main/components/company/ReviewsHero";
import ProviderDescriptionSection from "@/modules/main/components/company/ProviderDescriptionSection";
import SuccessStoriesSection from "@/modules/main/components/SuccessStoriesSection";
import ExpertsSection from "@/modules/main/components/ExpertsSection";

export default function page() {
  return (
    <>
      <ReviewsHero />
      <SuccessStoriesSection />
      <ProviderDescriptionSection />
      <ExpertsSection />
    </>
  );
}
