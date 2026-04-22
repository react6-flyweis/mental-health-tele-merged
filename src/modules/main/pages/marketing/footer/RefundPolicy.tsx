"use client";
import RefundsHero from "@/modules/main/components/pages/RefundsHero";
import RefundsDetails from "@/modules/main/components/pages/RefundsDetails";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function RefundPolicyPage() {
  const {
    data: refund,
    loading: refundLoading,
    error: refundError,
  } = useFetch(publicPageApi.getRefundPolicy) as any;
  return (
    <>
      <RefundsHero
        data={refund?.page}
        loading={refundLoading}
        error={refundError}
      />
      <RefundsDetails
        data={refund?.page?.sections}
        loading={refundLoading}
        error={refundError}
      />
    </>
  );
}
