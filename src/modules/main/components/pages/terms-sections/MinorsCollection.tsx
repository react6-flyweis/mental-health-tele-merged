"use client";

import React from "react";
import { Check } from "lucide-react";

export default function MinorsCollection() {
  return (
    <>
      <p>
        This website is intended for use by adults aged 18 and older. We do not
        knowingly collect personal information from minors under the age of 18
        without parental consent.
      </p>

      <div className="mt-4 p-4 rounded-lg bg-[#5FB5A51A] border border-[#4A7C7E33]">
        <h5 className="font-medium text-primary">Age Requirements</h5>
        <ul className="mt-3 text-sm text-muted-foreground space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>
              Users must be at least 18 years old to create an account
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>
              Services for minors require parental or guardian authorization
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>
              Parents/guardians are responsible for monitoring minor&apos;s use
              of services
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        If we discover that we have inadvertently collected information from a
        minor without proper consent, we will take immediate steps to delete
        such information from our records.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Parents or guardians who believe we may have collected information from
        a minor should contact us immediately at our support email address.
      </p>
    </>
  );
}
