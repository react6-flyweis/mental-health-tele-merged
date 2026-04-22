"use client";
import PrivacyPolicyContent from "@/modules/main/components/pages/PrivacyPolicyContent";
import PrivacyPolicyHero from "@/modules/main/components/pages/PrivacyPolicyHero";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";

export default function PrivacyPolicyPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicy = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getPrivacy(); // 👈 API bana lena
      setData(res?.data?.page || null);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);
  return (
    <>
      <PrivacyPolicyHero data={data} loading={loading} error={error} />
      <PrivacyPolicyContent data={data} loading={loading} error={error} />
    </>
  );
}
