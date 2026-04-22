"use client";
import DeaHero from "@/modules/main/components/pages/DeaHero";
import DeaInfoSection from "@/modules/main/components/pages/DeaInfoSection";
import DeaSupportSection from "@/modules/main/components/pages/DeaSupportSection";
import DeaFAQSection from "@/modules/main/components/pages/DeaFAQSection";
import { Container } from "@/components/ui/container";
import { publicPageApi } from "@/api/publicpage.api";
import { useFetch } from "@/hooks/useFetch";

export default function page() {
  const {
    data: dea,
    loading: deaLoading,
    error: deaError,
  } = useFetch(publicPageApi.getDea) as any;

  return (
    <>
      <DeaHero data={dea?.page} loading={deaLoading} error={deaError} />
      <Container maxWidth="5xl" className="py-16">
        <DeaInfoSection
          data={dea?.page}
          loading={deaLoading}
          error={deaError}
        />
        <DeaSupportSection
          data={dea?.page}
          loading={deaLoading}
          error={deaError}
        />
        {/* added FAQ section below support */}
        <DeaFAQSection data={dea?.page} loading={deaLoading} error={deaError} />
      </Container>
    </>
  );
}
