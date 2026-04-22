import React from "react";
import { ChevronDown } from "lucide-react";

export default function SecurityPrivacy() {
  return (
    <>
      <p>
        We employ comprehensive security measures to protect your personal and
        health information. Our systems use encryption, secure servers, and
        regular security audits to maintain data integrity.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Our Security Commitments
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Encryption of data at rest and in transit</li>
            <li>Access controls limiting data to authorized personnel</li>
            <li>
              Regular third-party security assessments and penetration tests
            </li>
            <li>Continuous monitoring for suspicious activity</li>
          </ul>
        </div>
      </details>
    </>
  );
}
