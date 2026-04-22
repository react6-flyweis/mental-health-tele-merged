"use client";

import React from "react";
import { Check } from "lucide-react";

export default function InformationYouProvide() {
  return (
    <>
      <p>
        You are responsible for ensuring that all information you provide to us
        is accurate, complete, and current. This includes personal details,
        health information, and payment data.
      </p>

      <h4 className="mt-4 font-medium">Your Responsibilities</h4>

      <div className="mt-3 space-y-3">
        {[
          {
            title: "Accuracy",
            desc: "Provide truthful and accurate information in all forms and communications",
          },
          {
            title: "Updates",
            desc: "Promptly update your information when changes occur",
          },
          {
            title: "Completeness",
            desc: "Disclose all relevant health information necessary for safe treatment",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-4 rounded-xl bg-gray-50 flex items-start gap-4"
          >
            <div className="pt-1">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h5 className="font-medium">{item.title}</h5>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Inaccurate or incomplete information may compromise the quality and
        safety of care you receive. We rely on your honesty to provide
        appropriate services.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        We are not responsible for any adverse outcomes resulting from false,
        misleading, or incomplete information you provide.
      </p>
    </>
  );
}
