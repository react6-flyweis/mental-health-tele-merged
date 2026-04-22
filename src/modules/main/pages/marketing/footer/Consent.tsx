"use client";
import ConsentHero from "@/modules/main/components/pages/ConsentHero";
import TelehealthBenefits from "@/modules/main/components/pages/TelehealthBenefits";
import HowTelehealthWorks from "@/modules/main/components/pages/HowTelehealthWorks";
import ConsentRisksSection from "@/modules/main/components//pages/ConsentRisksSection";
import ConsentPrivacySection from "@/modules/main/components//pages/ConsentPrivacySection";
import ConsentRightsSection from "@/modules/main/components//pages/ConsentRightsSection";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
export const buildGroups = (sections: any[]) => {
  const sorted = sections
    ?.slice()
    ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const groups: any[] = [];
  let current: any = null;

  (sorted ?? []).forEach((item) => {
    if (item.heading) {
      if (current) groups.push(current);

      current = {
        title: item.heading,
        description: item.body || "",
        items: [],
      };
    } else if (current && item.body) {
      current.items.push(item.body);
    }
  });

  if (current) groups.push(current);

  return groups;
};
export default function ConsentPage() {
  const { data, loading, error } = useFetch(publicPageApi.getConsent) as any;
  return (
    <>
      <ConsentHero data={data?.page} loading={loading} error={error} />
      <HowTelehealthWorks data={data?.page} loading={loading} error={error} />
      <TelehealthBenefits data={data?.page} loading={loading} error={error} />
      <ConsentRisksSection data={data?.page} loading={loading} error={error} />
      <ConsentPrivacySection
        data={data?.page}
        loading={loading}
        error={error}
      />
      <ConsentRightsSection data={data?.page} loading={loading} error={error} />
    </>
  );
}
