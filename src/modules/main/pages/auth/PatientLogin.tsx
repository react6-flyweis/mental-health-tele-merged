"use client";

import LoginCard from "@/modules/main/components/auth/LoginCard";

export default function PatientLoginPage() {
  return <LoginCard role="Patient" onSubmitPath="/dashboard" />;
}
