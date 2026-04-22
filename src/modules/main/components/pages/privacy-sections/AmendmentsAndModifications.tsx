import React from "react";

export default function AmendmentsAndModifications() {
  return (
    <>
      <p>
        We reserve the right to modify, update, or change these Terms and
        Conditions at any time. When we make changes, we will update the
        &ldquo;Last Updated&rdquo; date at the top of this document.
      </p>
      <div className="mt-4 p-4 bg-[#ECFEFF] border border-[#CBFBF1] rounded-xl text-sm">
        <strong>How You&apos;ll Be Notified:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Prominent notice on the platform for material changes</li>
          <li>Email notification to your registered address</li>
          <li>In-app notification upon your next login</li>
          <li>Updated 'Last Modified' date on this page</li>
        </ul>
      </div>
      <p className="mt-4">
        Your continued use of the platform after changes are posted constitutes
        your acceptance of the updated terms. If you do not agree with
        modifications, you must discontinue use of our services.
      </p>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-amber-700 rounded-xl text-sm">
        We recommend reviewing these Terms periodically to stay informed of any
        updates. It is your responsibility to check for changes.
      </div>
    </>
  );
}
