"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function MemberAccountRegistration() {
  return (
    <>
      <p>
        To access certain features and services, you must create a member
        account. Registration requires you to provide accurate and complete
        information.
      </p>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <h4 className="font-medium">Registration Requirements</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <h4 className="font-medium">Account Security and Responsibilities</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>
    </>
  );
}
