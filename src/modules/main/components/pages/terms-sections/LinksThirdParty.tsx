"use client";

import React from "react";
import { Info } from "lucide-react";

export default function LinksThirdParty() {
  return (
    <>
      <p>
        Our website may contain links to third-party websites for your
        convenience and information. These external sites are not under our
        control, and we are not responsible for their content or practices.
      </p>

      <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-300  flex items-start gap-3">
        <div className="pt-1">
          <Info className="w-5 h-5 text-yellow-700" />
        </div>
        <div className="text-amber-700">
          <span className="font-semibold">Third-Party Disclaimer</span>
          <div className="text-sm text-muted-foreground mt-1">
            We do not endorse, verify, or guarantee the accuracy of information
            on linked websites. Access to third-party sites is at your own risk.
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Third-party websites have their own privacy policies and terms of
            use. We encourage you to review them before providing any personal
            information.
          </div>
        </div>
      </div>

      <h4 className="mt-4 font-medium">What We Are Not Responsible For</h4>
      <ul className="mt-2 text-sm text-muted-foreground space-y-2 list-disc list-inside">
        <li>Content accuracy or reliability on external websites</li>
        <li>Privacy practices of third-party sites</li>
        <li>Products or services offered by external vendors</li>
        <li>Damages arising from your use of linked websites</li>
      </ul>
    </>
  );
}
