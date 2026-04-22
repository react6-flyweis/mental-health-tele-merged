"use client";
import EditorialHero from "@/modules/main/components/pages/EditorialHero";
import EditorialPolicyContent from "@/modules/main/components/pages/EditorialPolicyContent";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function page() {
  const {
    data: editorial,
    loading: editorialLoading,
    error: editorialError,
  } = useFetch(publicPageApi.getEditorialPolicy) as any;

  return (
    <>
      <EditorialHero
        data={editorial?.page}
        loading={editorialLoading}
        error={editorialError}
      />
      <EditorialPolicyContent
        data={editorial?.page}
        loading={editorialLoading}
        error={editorialError}
      />
    </>
  );
}
