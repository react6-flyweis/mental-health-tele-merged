"use client";

import React from "react";

export default function NoProviderRelationship() {
  return (
    <>
      <div className="mt-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
        <div>
          <strong>Critical Disclaimer</strong>
          <div className="text-sm mt-1">
            No provider-patient relationship is established between you and
            MEDvidi by using this website. MEDvidi does not provide medical
            advice or healthcare services directly.
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        The content on this website is for informational and educational
        purposes only. It is not intended to substitute professional medical
        advice, diagnosis, or treatment from a qualified healthcare provider.
      </p>

      <h4 className="mt-4 font-medium">Important Clarifications</h4>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        {[
          "MEDvidi is a technology platform, not a healthcare provider",
          "Provider-patient relationships exist only between you and independent professionals",
          "General website content should not be relied upon as medical advice",
          "Always consult directly with a licensed professional for medical concerns",
        ].map((point) => (
          <li key={point}>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        If you experience a medical emergency, call 911 immediately. Do not rely
        on this website or telehealth services for urgent or life- threatening
        conditions.
      </p>
    </>
  );
}
