"use client";
import TreatmentsHero from "@/modules/main/components/services/TreatmentsHero";
import TreatmentsFeatures from "@/modules/main/components/services/TreatmentsFeatures";
import TreatmentsSteps from "@/modules/main/components/services/TreatmentsSteps";
import TreatmentsPricing from "@/modules/main/components/services/TreatmentsPricing";
import TreatmentsPrescriptions from "@/modules/main/components/services/TreatmentsPrescriptions";
import TreatmentsComparison from "@/modules/main/components/services/TreatmentsComparison";
import MedicationsSupported from "@/modules/main/components/services/MedicationsSupported";
import TrustedProvidersSection from "@/modules/main/components/services/TrustedProvidersSection";
import SuccessStoriesSection from "@/modules/main/components/SuccessStoriesSection";
import FAQSection from "@/modules/main/components/FAQSection";
import PrescribingLimits from "@/modules/main/components/services/PrescribingLimits";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
import { useLocation } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSection() {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2] || "";
  const {
    data: service,
    loading: serviceLoading,
    error: serviceError,
  } = useFetch(
    (value?: string) => publicPageApi.getServiceBySlug(value || ""),
    slug,
  ) as any;
  console.log({ service });
  const pageData = service?.page;
  const providers = service?.providers;
  const testimonials = service?.testimonials;
  const faqs = service?.faqs;
  if (serviceLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/5" />
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
              <div className="relative">
                <Skeleton className="w-full h-96 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section Skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-56 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-8 space-y-4">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-8 w-24 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Providers Section Skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-6 w-72 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center space-x-1">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Skeleton key={star} className="h-4 w-4" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex items-center space-x-4 pt-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section Skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-32 mx-auto mb-4" />
              <Skeleton className="h-6 w-64 mx-auto" />
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <TreatmentsHero data={pageData} />
      <TreatmentsFeatures data={pageData} />
      <TreatmentsSteps data={pageData} />
      <TreatmentsPrescriptions data={pageData?.contentBlocks?.[0]} />
      <MedicationsSupported data={pageData} />
      {pageData?.pricingTiers?.length > 0 && (
        <TreatmentsPricing data={pageData} title={pageData?.pricingTitle} />
      )}
      <TreatmentsComparison data={pageData} />
      <TrustedProvidersSection data={providers} />
      <PrescribingLimits data={pageData?.contentBlocks?.[1]} />
      <SuccessStoriesSection data={testimonials} />
      <FAQSection data={faqs} />
    </>
  );
}
