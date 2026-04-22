"use client";
import AdhdHero from "@/modules/main/components/services/AdhdHero";
import AdhdWhyChoose from "@/modules/main/components/services/AdhdWhyChoose";
import AdhdHowItWorks from "@/modules/main/components/services/AdhdHowItWorks";
import AdhdTreatmentApproach from "@/modules/main/components/services/AdhdTreatmentApproach";
import PatientPortalSection from "@/modules/main/components/services/PatientPortalSection";
import TreatmentsPricing from "@/modules/main/components/services/TreatmentsPricing";
import TreatmentsComparison from "@/modules/main/components/services/TreatmentsComparison";
import MeetProvidersSection from "@/modules/main/components/services/MeetProvidersSection";
import AdhdSymptomsSection from "@/modules/main/components/services/AdhdSymptomsSection";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";
import { HeroSkeleton } from "@/modules/main/components/hero-skeleton";
import {
  SectionSkeleton,
  PricingSkeleton,
  ProvidersSkeleton,
} from "@/modules/main/components/section-skeleton";
import { ErrorDisplay } from "@/modules/main/components/error-display";
import { useParams } from "react-router";

export default function Page() {
  const param: any = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getConditionsBySlug(param?.slug ?? "");
      setData(res?.data?.page || null);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log({ data });

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <PricingSkeleton />
        <ProvidersSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchData} />;
  }

  if (!data) {
    return <ErrorDisplay error="No data found" onRetry={fetchData} />;
  }

  return (
    <>
      <AdhdHero data={data} />
      <AdhdWhyChoose data={data} />
      <AdhdHowItWorks data={data} />
      <TreatmentsPricing
        data={data}
        title={data?.pricingTitle ?? "Simple, Honest"}
        subtitle={data?.pricingSubtitle ?? "pricing"}
        description={
          data?.pricingDescription ??
          "Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
        }
      />

      <MeetProvidersSection
        data={{
          teamTitle: data?.providersTitle || "Meet our",
          teamSubtitle: data?.providersSubtitle || "providers",
          teamDescription: "",
          teamMembers: data?.providers || [],
        }}
        rows={1}
      />
      <PatientPortalSection data={data} />
      <AdhdTreatmentApproach data={data} />
      <TreatmentsComparison data={data} />
      <AdhdSymptomsSection data={data} />
    </>
  );
}
