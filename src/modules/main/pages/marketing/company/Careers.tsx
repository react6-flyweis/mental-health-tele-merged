"use client";
import CareersHero from "@/modules/main/components/company/CareersHero";
import CareersMissionSection from "@/modules/main/components/company/CareersMissionSection";
import StandForSection from "@/modules/main/components/company/StandForSection";
import BenefitsSection from "@/modules/main/components/company/BenefitsSection";
import EarningsCalculatorSection from "@/modules/main/components/company/EarningsCalculatorSection";
import CurrentOpeningsSection from "@/modules/main/components/company/CurrentOpeningsSection";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";
import { HeroSkeleton } from "@/modules/main/components/hero-skeleton";
import {
  SectionSkeleton,
  PricingSkeleton,
  ProvidersSkeleton,
} from "@/modules/main/components/section-skeleton";
import { ErrorDisplay } from "@/modules/main/components/error-display";

export default function CareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [data, setData] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCareers = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getCareer();
      console.log("Career API Response:", res);

      const data = res?.data?.jobs || [];
      setData(res?.data);
      setCareers(data);

      console.log("Careers:", careers, data);
    } catch (err) {
      console.error("Error fetching careers:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);
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
    return <ErrorDisplay error={error} onRetry={fetchCareers} />;
  }

  if (!careers.length) {
    return <ErrorDisplay error="No data found" onRetry={fetchCareers} />;
  }
  console.log("Careers:", data);
  return (
    <>
      <CareersHero loading={loading} error={error} careers={careers} />
      <CareersMissionSection careers={data?.page} />
      <StandForSection careers={data?.page} />
      <BenefitsSection careers={data?.page} />
      <EarningsCalculatorSection />
      <CurrentOpeningsSection
        loading={loading}
        error={error}
        careers={careers}
      />
    </>
  );
}
