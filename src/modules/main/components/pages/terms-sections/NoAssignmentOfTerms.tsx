"use client";

import React from "react";
import { Check } from "lucide-react";

export default function NoAssignmentOfTerms() {
  return (
    <>
      <p>
        You may not transfer, assign, or delegate your rights or obligations
        under these Terms without our prior written consent. Any attempted
        assignment without authorization is void.
      </p>

      <div className="mt-4 p-4 bg-[#f0f7f6] border border-[#cfe7e5] rounded-md">
        <strong className="block mb-2">What This Means</strong>
        <ul className="mt-2 space-y-1 text-sm">
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-1" />
            <span className="">
              Your account and rights are personal to you
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-1" />
            <span className="">
              You cannot transfer your account to another person
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-1" />
            <span className="">
              You cannot sell or license your rights to use the service
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-1" />
            <span className="">
              We may assign these Terms in connection with business transactions
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        MEDvidi reserves the right to assign these Terms and any rights or
        obligations hereunder to any third party in connection with a merger,
        acquisition, sale of assets, or other business transfer.
      </p>
    </>
  );
}
