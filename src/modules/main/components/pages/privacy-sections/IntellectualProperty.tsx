import React from "react";
import { ChevronDown } from "lucide-react";

export default function IntellectualProperty() {
  return (
    <>
      <p>
        All content, features, and functionality available on our platform,
        including but not limited to text, graphics, logos, software, and design
        elements, are owned by us or our licensors and protected by intellectual
        property laws.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Protected Materials and Usage Rights
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>All rights reserved unless expressly granted</li>
            <li>You may not reproduce or distribute proprietary content</li>
            <li>Limited license for personal, non-commercial use only</li>
          </ul>
        </div>
      </details>
    </>
  );
}
