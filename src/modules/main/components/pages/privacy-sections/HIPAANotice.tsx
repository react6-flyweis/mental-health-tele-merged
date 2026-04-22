import React from "react";
import { ChevronDown } from "lucide-react";

export default function HIPAANotice() {
  return (
    <>
      <p>
        We are committed to protecting your personal health information in
        accordance with the Health Insurance Portability and Accountability Act
        (HIPAA) and other applicable privacy laws.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          How We Protect Your Health Information
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          We use industry-standard encryption, access controls, and audit trails
          to safeguard your data. Only authorized personnel have access to
          personal health information, and our systems are regularly reviewed
          for compliance.
        </div>
      </details>
    </>
  );
}
