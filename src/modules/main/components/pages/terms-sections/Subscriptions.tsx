"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function Subscriptions() {
  return (
    <>
      <p>
        Some services are offered on a subscription basis with recurring
        billing. By subscribing, you authorize us to charge your payment method
        at regular intervals until you cancel.
      </p>

      <details className="mt-4 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Subscription Terms</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          Subscription terms, pricing, and billing intervals will be disclosed
          at the point of purchase. You are responsible for maintaining a valid
          payment method and for any taxes or fees associated with the
          subscription.
        </div>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Cancellation and Refunds</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          You may cancel subscriptions through your account settings. Refund
          eligibility depends on the specific subscription and promotional
          terms; see the applicable plan details for refund policies.
        </div>
      </details>

      <details className="mt-2 group">
        <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-xl cursor-pointer select-none">
          <h4 className="font-medium">Free Trials and Promotional Offers</h4>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 text-sm text-muted-foreground">
          Promotional offers, including free trials, are subject to specific
          terms and may automatically convert to a paid subscription unless
          cancelled before the trial period ends.
        </div>
      </details>
    </>
  );
}
