"use client";
import HIPAAHero from "@/modules/main/components/pages/HIPAAHero";
import HIPAANoticeContent from "@/modules/main/components/pages/HIPAANoticeContent";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function HIPAANoticePage() {
  const {
    data: hipaa,
    loading: hipaaLoading,
    error: hipaaError,
  } = useFetch(publicPageApi.getHipaaPolicy) as any;
  console.log({ hipaa });
  return (
    <>
      <HIPAAHero data={hipaa?.page} loading={hipaaLoading} error={hipaaError} />
      <HIPAANoticeContent
        data={hipaa?.page?.sections}
        loading={hipaaLoading}
        error={hipaaError}
      />
    </>
  );
}
