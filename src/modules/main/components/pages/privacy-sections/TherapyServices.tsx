import React from "react";
import { ChevronDown } from "lucide-react";

export default function TherapyServices() {
  return (
    <>
      <p>
        Our platform connects you with licensed healthcare professionals who
        provide therapeutic services through secure digital channels. These
        services are designed to support your mental and physical wellbeing.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Important Service Information
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          Therapy sessions are not a substitute for emergency care. If you are
          in crisis, contact your local emergency services immediately. Our
          providers follow all applicable professional standards and state
          regulations.
        </div>
      </details>
    </>
  );
}
