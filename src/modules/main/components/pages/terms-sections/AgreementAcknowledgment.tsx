"use client";

import React from "react";
import { Check } from "lucide-react";

export default function AgreementAcknowledgment() {
  return (
    <>
      <div className="p-6 rounded-lg bg-linear-to-b from-[#4A7C7E] via-[#5A9B9D] to-[#5FB5A5] text-white">
        <h4 className="font-semibold">By Using This Website, You Confirm:</h4>
        <ul className="mt-4 space-y-3">
          {[
            "You have read and understood these Terms and Conditions in their entirety",
            "You agree to be legally bound by all terms, conditions, and policies",
            "You are legally capable of entering into binding contracts",
            "You will comply with all applicable laws and regulations",
            "You understand the limitations and disclaimers outlined in these Terms",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="bg-white rounded-full flex size-7 items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm">{item}</div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Your continued use of this website constitutes ongoing acceptance of
        these Terms. We recommend reviewing these Terms periodically as they may
        be updated to reflect changes in services or legal requirements.
      </p>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
        <h5 className="font-medium">If You Disagree</h5>
        <p className="mt-2 text-sm text-muted-foreground">
          If you do not agree with any part of these Terms, you must immediately
          discontinue use of the website and all services. Contact us if you
          have questions or concerns about specific provisions.
        </p>
      </div>
    </>
  );
}
