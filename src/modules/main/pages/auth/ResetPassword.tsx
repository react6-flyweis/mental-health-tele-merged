"use client";

import { Suspense } from "react";
import ResetPasswordCard from "@/modules/main/components/auth/ResetPasswordCard";
import { useSearchParams } from "react-router";

function ResetPasswordInner() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "Patient";

  const loginPath = role === "Patient" ? "/patient-login" : "/provider/login";

  return (
    <ResetPasswordCard
      role={role as "Patient" | "Provider"}
      loginPath={loginPath}
    />
  );
}

export default function PatientResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}
