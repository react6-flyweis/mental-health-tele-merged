"use client";

import React from "react";
import { Check } from "lucide-react";

export default function ProprietaryRights() {
  return (
    <>
      <p>
        All content, features, and functionality on this website are owned by
        MEDvidi or our licensors and are protected by copyright, trademark,
        patent, and other intellectual property laws.
      </p>

      <h4 className="mt-4 font-medium">Protected Materials Include</h4>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[#5FB5A50D] border border-[#4A7C7E33]">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Text, graphics, logos, and images</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Software and source code</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Trademarks and service marks</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Design elements and layout</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-[#5FB5A50D] border border-[#4A7C7E33]">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Videos, audio, and multimedia</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Database structures and content</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Documentation and guides</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span>Proprietary methodologies</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-400">
        <h5 className="font-medium">Usage Restrictions</h5>
        <div className="text-sm text-muted-foreground mt-2">
          You may not copy, reproduce, distribute, modify, create derivative
          works, publicly display, or otherwise use any proprietary materials
          without our express written permission.
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Unauthorized use of our intellectual property may result in legal action
        and liability for damages. All rights not expressly granted are reserved
        by MEDvidi.
      </p>
    </>
  );
}
