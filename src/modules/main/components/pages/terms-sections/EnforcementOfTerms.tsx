"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function EnforcementOfTerms() {
  return (
    <>
      <p>
        We reserve the right to enforce these Terms through appropriate legal
        and technical measures. Violations may result in account suspension,
        termination, and legal action.
      </p>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Governing Law and Jurisdiction</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          These Terms are governed by the laws of the jurisdiction where MEDvidi
          is incorporated, without regard to conflict of law provisions. You
          agree to submit to the personal jurisdiction of the courts located in
          that jurisdiction for any disputes.
        </div>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Dispute Resolution</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          We encourage informal resolution of disputes. If a dispute cannot be
          resolved informally, the parties may pursue any available legal
          remedies in the courts referenced above.
        </div>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Severability and Waiver</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          If any provision of these Terms is held to be invalid or
          unenforceable, that provision will be enforced to the maximum extent
          permitted and the remaining provisions will remain in full force and
          effect. Our failure to enforce any right is not a waiver of that
          right.
        </div>
      </details>

      <p className="mt-2">
        These Terms constitute the entire agreement between you and MEDvidi
        regarding use of the website and supersede all prior agreements.
      </p>
    </>
  );
}
