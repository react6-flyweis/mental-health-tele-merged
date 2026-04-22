"use client";

import React from "react";
import { Check } from "lucide-react";

export default function AccessToWebsite() {
  return (
    <>
      <p>
        Your right to access and use this website is conditional upon your
        compliance with these Terms. We reserve the right to modify, suspend, or
        terminate access at any time without prior notice.
      </p>

      <h4 className="mt-4 font-medium">Conditions of Access</h4>
      <ul className="mt-2 space-y-2">
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>You must be at least 18 years of age to use this website</span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>Access is granted for lawful purposes only</span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            You agree to comply with all applicable laws and regulations
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            You acknowledge that access may be restricted or denied at our
            discretion
          </span>
        </li>
      </ul>

      <p className="mt-4">
        We may update these Terms periodically. Continued use of the website
        after changes are posted constitutes your acceptance of the revised
        Terms.
      </p>
    </>
  );
}
