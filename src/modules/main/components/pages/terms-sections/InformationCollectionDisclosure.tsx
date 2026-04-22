"use client";

import React from "react";

export default function InformationCollectionDisclosure() {
  return (
    <>
      <p>
        We collect, use, and disclose your personal information in accordance
        with our Privacy Policy and applicable privacy laws, including HIPAA
        where applicable.
      </p>

      <h4 className="mt-4 font-medium">Types of Information We Collect</h4>

      <div className="mt-3 space-y-3">
        <div className="border-l-4 border-[#4A7C7E] pl-4">
          <h5 className="font-medium text-sm">Personal Information</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Name, email, phone number, date of birth, address, and payment
            information
          </p>
        </div>

        <div className="border-l-4 border-[#4A7C7E] pl-4">
          <h5 className="font-medium text-sm">Health Information</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Medical history, symptoms, diagnoses, treatment plans, and
            prescriptions
          </p>
        </div>

        <div className="border-l-4 border-[#4A7C7E] pl-4">
          <h5 className="font-medium text-sm">Technical Data</h5>
          <p className="text-sm text-muted-foreground mt-1">
            IP address, browser type, device information, and usage patterns
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Your information is used solely to provide services, improve our
        platform, comply with legal obligations, and communicate with you about
        your care. We do not sell your personal or health information to third
        parties. For complete details, please review our Privacy Policy.
      </p>
    </>
  );
}
