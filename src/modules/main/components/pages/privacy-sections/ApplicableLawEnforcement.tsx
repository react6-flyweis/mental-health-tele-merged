import React from "react";

export default function ApplicableLawEnforcement() {
  return (
    <>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of the applicable jurisdiction, without regard
        to its conflict of law provisions.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
        <strong>Legal Framework:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Governed by federal and state healthcare regulations</li>
          <li>Subject to HIPAA and privacy law compliance</li>
          <li>Applicable consumer protection laws apply</li>
          <li>Professional licensing requirements observed</li>
        </ul>
      </div>
      <p className="mt-2 text-sm">
        Our failure to enforce any provision of these terms shall not be deemed
        a waiver of that provision or our right to enforce it in the future. If
        any provision is found invalid, the remaining provisions shall remain in
        full effect.
      </p>
    </>
  );
}
