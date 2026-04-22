"use client";
import PaymentTermsHero from "@/modules/main/components/pages/PaymentTermsHero";
import PaymentTermsSection from "@/modules/main/components/pages/PaymentTermsSection";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function PaymentTermsPage() {
  const {
    data: payments,
    loading: paymentsLoading,
    error: paymentsError,
  } = useFetch(publicPageApi.getPaymentTerms) as any;
  return (
    <>
      <PaymentTermsHero
        data={payments?.page}
        loading={paymentsLoading}
        error={paymentsError}
      />
      <PaymentTermsSection
        data={payments?.page?.sections}
        loading={paymentsLoading}
        error={paymentsError}
      />
    </>
  );
}
