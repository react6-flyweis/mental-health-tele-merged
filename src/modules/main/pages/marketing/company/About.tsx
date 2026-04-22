"use client";
import { useState, useEffect } from "react";
import AboutHero from "@/modules/main/components/company/AboutHero";
import VisionSection from "@/modules/main/components/company/VisionSection";
import ValuesSection from "@/modules/main/components/company/ValuesSection";
import MeetProvidersSection from "@/modules/main/components/services/MeetProvidersSection";
import SuccessStoriesSection from "@/modules/main/components/SuccessStoriesSection";
import ContactSection from "@/modules/main/components/ContactSection";
import { publicPageApi } from "@/api/publicpage.api";
import { HeroSkeleton } from "@/modules/main/components/hero-skeleton";
import {
  SectionSkeleton,
  PricingSkeleton,
  ProvidersSkeleton,
} from "@/modules/main/components/section-skeleton";
import { ErrorDisplay } from "@/modules/main/components/error-display";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getAbout();
      setData(res?.data?.page || null);
      setReviews(res?.data?.reviews || []);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
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
    return <ErrorDisplay error={error} onRetry={fetchAbout} />;
  }

  if (!data) {
    return <ErrorDisplay error="No data found" onRetry={fetchAbout} />;
  }
  return (
    <>
      <AboutHero data={data} loading={loading} error={error} />
      <ValuesSection data={data} loading={loading} error={error} />
      <VisionSection data={data} loading={loading} error={error} />
      <MeetProvidersSection
        data={data}
        loading={loading}
        error={error}
        title="Leadership"
        subtitle="Team"
        description="Meet the passionate individuals driving our mission forward"
      />
      <SuccessStoriesSection data={reviews} loading={loading} error={error} />
      <ContactSection data={data} loading={loading} error={error} />
    </>
  );
}
