"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

export default function HealthDisclaimer() {
  return (
    <>
      <div className="mt-2 p-4 rounded-lg bg-red-50 border border-red-200">
        <div className="flex items-start gap-3">
          <div>
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-medium text-red-700">
              Emergency Medical Situations
            </h4>
            <p className="mt-2 text-sm text-red-700">
              If you are experiencing a medical emergency, call 911 immediately
              or go to your nearest emergency room. DO NOT use this website for
              emergency medical conditions.
            </p>
            <p className="mt-2 text-sm text-red-700">
              This platform is not intended for urgent care, crisis
              intervention, or life-threatening situations.
            </p>
          </div>
        </div>
      </div>

      <h4 className="mt-6 font-medium">Important Health Information</h4>

      <div className="mt-3 space-y-3">
        <div className="border-l-4 border-yellow-400 pl-4 py-3">
          <h5 className="font-medium">Telehealth Limitations</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Virtual consultations cannot replace comprehensive in-person
            examinations. Some conditions require physical assessment,
            diagnostic testing, or procedures that cannot be performed remotely.
          </p>
        </div>

        <div className="border-l-4 border-yellow-400 pl-4 py-3">
          <h5 className="font-medium">Professional Judgment</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Healthcare providers may determine that an in-person evaluation is
            necessary. You are responsible for following all recommendations,
            including seeking additional care when advised.
          </p>
        </div>

        <div className="border-l-4 border-yellow-400 pl-4 py-3">
          <h5 className="font-medium">Not a Substitute</h5>
          <p className="text-sm text-muted-foreground mt-1">
            This service does not replace your relationship with your primary
            care physician or other healthcare providers. Continue all ongoing
            treatments unless directed otherwise by a professional.
          </p>
        </div>

        <div className="border-l-4 border-yellow-400 pl-4 py-3">
          <h5 className="font-medium">Information Accuracy</h5>
          <p className="text-sm text-muted-foreground mt-1">
            While we strive for accuracy, health information on this website is
            for educational purposes and may not reflect the latest medical
            research or apply to your specific situation.
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Always consult with qualified healthcare professionals regarding any
        medical concerns. Never disregard professional medical advice or delay
        seeking treatment based on information from this website.
      </p>
    </>
  );
}
