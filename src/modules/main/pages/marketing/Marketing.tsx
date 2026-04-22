"use client";
import HeroSection from "@/modules/main/components/HeroSection";
import ExpertsSection from "@/modules/main/components/ExpertsSection";
import SupportSection from "@/modules/main/components/SupportSection";
import GettingStartedSection from "@/modules/main/components/GettingStartedSection";
import SuccessStoriesSection from "@/modules/main/components/SuccessStoriesSection";
import FAQSection from "@/modules/main/components/FAQSection";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function Page() {
  const {
    data: dashboardData,
    loading,
    error,
  } = useFetch(publicPageApi.getDashboardAPI) as any;

  if (loading) {
    return (
      <main className="animate-pulse">
        <div className="h-[400px] bg-gray-200 rounded-lg mx-4 my-6" />
        <div className="h-[200px] bg-gray-200 rounded-lg mx-4 my-6" />
        <div className="h-[200px] bg-gray-200 rounded-lg mx-4 my-6" />
        <div className="h-[200px] bg-gray-200 rounded-lg mx-4 my-6" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 text-sm">Something went wrong</p>
      </main>
    );
  }

  return (
    <main>
      <HeroSection
        data={dashboardData?.hero}
        conditions={dashboardData?.conditions}
      />
      <SupportSection data={dashboardData?.supportCoverage} />
      <ExpertsSection data={dashboardData?.experts} />
      <GettingStartedSection
        howItWorksSection={dashboardData?.howItWorksSection}
        howItWorkes={dashboardData?.howItWorkes}
      />
      <SuccessStoriesSection data={dashboardData?.testimonials} />
      <FAQSection data={dashboardData?.faqs} />
    </main>
  );
}
