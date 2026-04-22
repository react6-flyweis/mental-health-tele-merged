"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function ExpressConsentBilling() {
  return (
    <>
      <p>
        By using paid services on this website, you expressly consent to our
        billing practices and authorize charges according to the payment method
        you provide.
      </p>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Payment Authorization</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Billing Policies</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
      </details>

      <p className="mt-4 text-sm text-muted-foreground">
        You are responsible for maintaining current and valid payment
        information. Failure to pay may result in service interruption or
        account termination.
      </p>
    </>
  );
}
