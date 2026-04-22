"use client";

import React from "react";

export default function ServicesDisclaimer() {
  return (
    <>
      <div className="mt-2 p-3 bg-linear-to-b from-[#4A7C7E1A] to-[#5FB5A51A] border border-[#4A7C7E4D] rounded-xl flex items-start gap-3">
        <div>
          <strong>Important Disclaimer</strong>
          <div className="text-sm text-muted-foreground mt-1">
            MEDvidi operates as a technology platform that facilitates
            connections between patients and independent healthcare
            professionals. We do not employ physicians or mental health
            practitioners.
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        All medical and mental health professionals accessible through our
        platform are independent contractors who maintain their own professional
        licenses and practice autonomy. They exercise independent clinical
        judgment in all patient care decisions.
      </p>

      <h4 className="mt-4 font-medium">
        Key Points About Professional Independence
      </h4>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        {[
          "Healthcare providers are not employees or agents of MEDvidi",
          "Providers maintain independent professional liability for their services",
          "MEDvidi does not direct, supervise, or control clinical decisions",
          "Professional-patient relationships exist solely between users and providers",
        ].map((point) => (
          <li key={point}>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        MEDvidi's role is limited to providing the technical infrastructure and
        administrative support that enables these independent professionals to
        deliver care remotely.
      </p>
    </>
  );
}
