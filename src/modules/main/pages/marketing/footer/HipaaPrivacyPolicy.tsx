"use client";
import HIPAAPrivacyHero from "@/modules/main/components/pages/HIPAAPrivacyHero";
import HIPAAPrivacyContent from "@/modules/main/components/pages/HIPAAPrivacyContent";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function HIPAAPrivacyPage() {
  const {
    data: hipaa,
    loading: hipaaLoading,
    error: hipaaError,
  } = useFetch(publicPageApi.getHippaPolicy) as any;
  console.log({ hipaa });

  return (
    <>
      <HIPAAPrivacyHero
        data={hipaa?.page}
        loading={hipaaLoading}
        error={hipaaError}
      />
      <HIPAAPrivacyContent
        data={hipaa?.page}
        loading={hipaaLoading}
        error={hipaaError}
      />
    </>
  );
}
