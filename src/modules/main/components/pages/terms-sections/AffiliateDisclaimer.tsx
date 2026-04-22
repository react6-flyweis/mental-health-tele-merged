"use client";

import React from "react";
import { AlertCircle, Check } from "lucide-react";

export default function AffiliateDisclaimer() {
  return (
    <>
      <p>
        This website may contain affiliate links or promotional partnerships
        with third-party services, products, or healthcare providers. We may
        receive compensation for purchases made through certain links.
      </p>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-md flex gap-2">
        <AlertCircle className="w-5 h-5 shrink-0 pt-1" />
        <div className="">
          <span className="block font-semibold mb-2">Transparency Notice</span>
          <div className="text-sm ">
            We may receive compensation when you click on certain links or
            purchase products/services through our website. This does not affect
            the price you pay and does not influence our recommendations.
          </div>
        </div>
      </div>

      <h4 className="mt-4 font-medium">Important Clarifications</h4>
      <ul className="mt-2 space-y-2">
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            Affiliate relationships do not compromise our commitment to quality
            care
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            We only promote products and services we believe have value
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            You are under no obligation to use affiliate links or services
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            Third-party providers are responsible for their own products and
            services
          </span>
        </li>
      </ul>

      <p className="mt-3 text-sm text-muted-foreground">
        We are not responsible for the quality, accuracy, or performance of
        third-party products or services. Always conduct your own research
        before making purchases or healthcare decisions.
      </p>
    </>
  );
}
