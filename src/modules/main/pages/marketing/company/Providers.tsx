import ProvidersHero from "@/modules/main/components/company/ProvidersHero";
import CommitmentSection from "@/modules/main/components/company/CommitmentSection";
import MeetProvidersSection from "@/modules/main/components/services/MeetProvidersSection";
import PatientTestimonialsSection from "@/modules/main/components/PatientTestimonialsSection";
import FAQSection from "@/modules/main/components/FAQSection";
import { publicPageApi } from "@/api/publicpage.api";
import { useFetch } from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProvidersPage() {
  const { data, loading, error } = useFetch(publicPageApi.getProviders) as any;

  if (loading) {
    return (
      <div className="py-20 max-w-5xl mx-auto space-y-8 px-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 min-h-100 flex items-center justify-center">
        <p>Something went wrong loading data.</p>
      </div>
    );
  }

  const pageContent = data?.pageContent || {};
  const providers = data?.providers || [];
  const faqs = data?.faqs || [];
  return (
    <>
      <ProvidersHero
        title={pageContent.heroTitle}
        subtitle={pageContent.heroSubtitle}
      />
      <CommitmentSection
        title={pageContent.featureCardsTitle}
        subtitle={pageContent.featureCardsSubtitle}
        features={pageContent.featureCards}
      />
      <MeetProvidersSection
        data={{
          teamTitle: pageContent.teamTitle || "Meet our",
          teamSubtitle: pageContent.teamSubtitle || "providers",
          teamDescription: "",
          teamMembers: providers,
        }}
        rows={1}
      />

      <PatientTestimonialsSection />

      {faqs && faqs.length > 0 && <FAQSection data={faqs} />}
    </>
  );
}
