import React from "react";
import { ChevronDown } from "lucide-react";

export default function ArbitrationSection() {
  return (
    <>
      <p>
        Any dispute, controversy, or claim arising out of or relating to these
        Terms and Conditions shall be resolved through binding arbitration
        rather than in court, except where prohibited by law.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Arbitration Process Details
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
      </details>
    </>
  );
}
