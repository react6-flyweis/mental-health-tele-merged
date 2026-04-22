import React from "react";

export default function LicensedPractitioners() {
  return (
    <>
      <p>
        All medical advice, diagnoses, prescriptions, and treatment
        recommendations provided through our platform come exclusively from
        licensed healthcare professionals who are qualified in their respective
        jurisdictions.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg  text-green-600 text-sm">
          <strong>Licensed Services Include:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Medical consultations and diagnosis</li>
            <li>Prescription medications</li>
            <li>Treatment plans and recommendations</li>
            <li>Clinical assessments</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
          <strong>Platform Staff Cannot:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Provide medical advice</li>
            <li>Diagnose conditions</li>
            <li>Recommend treatments</li>
            <li>Prescribe medications</li>
          </ul>
        </div>
      </div>
      <p className="mt-2">
        Our customer support and administrative staff can assist with technical
        and account-related questions, but they are not qualified to provide any
        form of medical guidance.
      </p>
    </>
  );
}
