import React from "react";

export default function LicenseGrant() {
  return (
    <>
      <p>
        Subject to your compliance with these Terms, we grant you a limited,
        non-exclusive, non-transferable, revocable license to access and use our
        platform solely for your personal, non-commercial healthcare needs.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
        <strong>This License Permits You To:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Access the platform for personal healthcare services</li>
          <li>Communicate with your assigned healthcare providers</li>
          <li>View and download your personal health records</li>
          <li>Use educational resources provided on the platform</li>
        </ul>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This license does not include any right to resell, distribute,
        reproduce, or create derivative works from our platform content or
        technology.
      </p>
    </>
  );
}
