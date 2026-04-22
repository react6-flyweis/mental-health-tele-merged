"use client";
import TermsHero from "@/modules/main/components/pages/TermsHero";
import TermsOfUseContent from "@/modules/main/components/pages/TermsOfUseContent";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";

export default function page() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicy = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getTermsofUse();
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
    <div>
      <TermsHero data={data} loading={loading} error={error} />
      <TermsOfUseContent data={data} loading={loading} error={error} />
    </div>
  );
}
