"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function AgreementIndemnify() {
  return (
    <>
      <p>
        You agree to defend, indemnify, and hold harmless MEDvidi, its
        affiliates, officers, directors, employees, and agents from any claims,
        damages, losses, or expenses arising from your use of the website.
      </p>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-gray-100 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium text-gray-700">
            Scope of Indemnification
          </h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <p className="mt-3 text-sm text-muted-foreground">
        This indemnification obligation includes all legal fees, costs, and
        expenses incurred in defending against such claims.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        We reserve the right to assume exclusive defense and control of any
        matter subject to indemnification, and you agree to cooperate fully with
        our defense efforts.
      </p>
    </>
  );
}
