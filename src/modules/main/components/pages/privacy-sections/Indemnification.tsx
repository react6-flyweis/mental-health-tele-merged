import React from "react";

export default function Indemnification() {
  return (
    <>
      <p>
        You agree to defend, indemnify, and hold harmless our company, its
        affiliates, officers, directors, employees, contractors, and agents from
        any claims, damages, losses, or expenses arising from your use of the
        platform.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
        <strong>You Will Indemnify Us For Claims Arising From:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>Your violation of these Terms and Conditions</li>
          <li>Your violation of any laws or regulations</li>
          <li>Your violation of third-party rights</li>
          <li>Any false or misleading information you provide</li>
          <li>Your unauthorized use of the platform</li>
          <li>Your negligent or wrongful conduct</li>
        </ul>
      </div>
      <p className="mt-2 text-sm">
        This indemnification obligation includes reasonable attorneys' fees and
        costs. We reserve the right to assume exclusive defense and control of
        any matter subject to indemnification.
      </p>
    </>
  );
}
