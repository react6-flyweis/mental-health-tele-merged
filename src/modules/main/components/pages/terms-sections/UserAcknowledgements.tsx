"use client";

import React from "react";
import { Check } from "lucide-react";

export default function UserAcknowledgements() {
  return (
    <>
      <p>
        By using this website and its services, you acknowledge and agree to the
        following:
      </p>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
        <h3 className="font-medium">You Understand That:</h3>
        <ol className="space-y-2 mt-2">
          {[
            "Telehealth services have limitations and may not be appropriate for all medical conditions",
            "Technology failures may disrupt service delivery and connectivity",
            "You are responsible for following all medical advice and treatment recommendations",
            "Service availability may vary based on your location and provider availability",
            "Insurance coverage and reimbursement for telehealth services varies by plan",
            "You must provide accurate health information for safe and effective care",
          ].map((item, idx) => (
            <li key={item} className="flex items-center gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                  {idx + 1}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{item}</div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        These acknowledgements are essential to ensuring safe and appropriate
        use of telehealth services. If you do not understand or agree with these
        points, please contact us before using the service.
      </p>
    </>
  );
}
