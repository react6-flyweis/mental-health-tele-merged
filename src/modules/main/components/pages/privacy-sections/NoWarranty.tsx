import React from "react";

export default function NoWarranty() {
  return (
    <>
      <p>
        Our platform and all services are provided on an &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo; basis. We make no warranties or guarantees,
        express or implied, regarding the platform's operation, functionality,
        or the outcomes of healthcare services.
      </p>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
        <strong>⚠️ Important Disclaimers:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>We do not guarantee specific medical outcomes or results</li>
          <li>Platform functionality may vary and is not error-free</li>
          <li>Information provided may not be complete or up-to-date</li>
          <li>Services may not meet all individual healthcare needs</li>
          <li>Treatment effectiveness varies by individual circumstances</li>
        </ul>
      </div>
      <p className="mt-2 text-sm">
        We specifically disclaim all implied warranties of merchantability,
        fitness for a particular purpose, and non-infringement. Any reliance on
        materials or services is at your own risk.
      </p>
    </>
  );
}
