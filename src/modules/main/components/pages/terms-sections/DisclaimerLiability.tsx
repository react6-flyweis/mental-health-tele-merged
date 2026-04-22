"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function DisclaimerLiability() {
  return (
    <>
      <div className="mt-2 p-4 bg-gray-100 border-l-4 border-gray-500 ">
        <h5 className="font-medium">AS-IS SERVICE PROVISION</h5>
        <div className="text-sm text-muted-foreground mt-2">
          This website and all services are provided &ldquo;AS IS&rdquo; and
          &ldquo;AS AVAILABLE&rdquo; without warranties of any kind, either
          express or implied.
        </div>
      </div>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">No Warranty Disclaimer</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Limitation of Liability</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <p className="mt-4 text-sm text-muted-foreground">
        Some jurisdictions do not allow the exclusion of certain warranties or
        limitation of liability. In such cases, our liability will be limited to
        the fullest extent permitted by applicable law.
      </p>
    </>
  );
}
