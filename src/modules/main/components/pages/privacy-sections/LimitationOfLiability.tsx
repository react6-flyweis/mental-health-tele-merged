import React from "react";
import { ChevronDown } from "lucide-react";

export default function LimitationOfLiability() {
  return (
    <>
      <p>
        To the maximum extent permitted by law, our company, its officers,
        directors, employees, and affiliates shall not be liable for any
        indirect, incidental, consequential, or punitive damages arising from
        your use of the platform.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Detailed Liability Limitations
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          <p>
            Our total liability for any claim arising out of or relating to
            these terms or the service will not exceed the amount you paid to us
            in the 12 months preceding the claim, or a minimal statutory amount
            where such limitations are not permitted by law.
          </p>
        </div>
      </details>
    </>
  );
}
