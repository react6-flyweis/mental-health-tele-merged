"use client";

import React from "react";
import { Info } from "lucide-react";

export default function TermsOverview() {
  return (
    <>
      <p>
        Welcome to MEDvidi. By accessing or using our website and services, you
        agree to be bound by these Terms and Conditions of Use. Please read them
        carefully before proceeding.
      </p>
      <p className="mt-2">
        These Terms constitute a legally binding agreement between you and
        MEDvidi. If you do not agree with any part of these Terms, you must
        discontinue use of our website immediately.
      </p>

      <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded-md flex items-start gap-3">
        <div className="pt-1">
          <Info className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <strong>Important Notice</strong>
          <div className="text-sm text-muted-foreground mt-1">
            This website provides healthcare services through independent
            licensed professionals. In case of a medical emergency, please call
            911 or visit your nearest emergency room immediately.
          </div>
        </div>
      </div>
    </>
  );
}
