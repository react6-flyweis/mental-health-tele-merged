"use client";

import React from "react";
import { Info, Check, AlertCircle } from "lucide-react";

export default function DoNotSharePHI() {
  return (
    <>
      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-300 rounded-md flex items-start gap-3">
        <div className="pt-1">
          <Info className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <strong>Security Warning</strong>
          <div className="text-sm text-muted-foreground mt-1">
            Do not share your Protected Health Information (PHI) in public areas
            of the website, including forums, comment sections, or social media
            connected to our platform.
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Your health information is protected under federal law. Share sensitive
        medical information only through secure, designated channels within your
        account or during private consultations with providers.
      </p>

      <h4 className="mt-4 font-medium">
        Appropriate Places to Share Health Information
      </h4>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-green-50 border border-green-100 text-green-700">
          <h5 className="font-medium text-sm flex items-center gap-2">
            <Check className="size-4" />
            Secure Channels
          </h5>
          <ul className="mt-2 text-sm list-disc list-inside space-y-1">
            <li>Private messaging with your provider</li>
            <li>Secure patient portal</li>
            <li>Video consultation sessions</li>
            <li>Encrypted forms and questionnaires</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-700">
          <h5 className="font-medium text-sm flex items-center gap-2">
            <AlertCircle className="size-4" />
            Avoid These Areas
          </h5>
          <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
            <li>Public forums or community boards</li>
            <li>Social media posts or comments</li>
            <li>Unsecured email communications</li>
            <li>Public reviews or testimonials</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        We are not responsible for privacy breaches that result from your
        voluntary disclosure of health information in unsecured or public areas.
      </p>
    </>
  );
}
