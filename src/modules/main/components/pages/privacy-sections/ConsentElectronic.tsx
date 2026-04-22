import React from "react";

export default function ConsentElectronic() {
  return (
    <>
      <p>
        By using our platform, you consent to receive communications from us
        electronically. We may communicate with you via email, SMS, in-app
        notifications, or by posting notices on the platform.
      </p>
      <div className="mt-4 p-4 bg-[#ECFEFF] border border-[#CBFBF1] rounded-xl text-sm">
        <strong>Types of Communications You May Receive:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Appointment reminders and confirmations</li>
          <li>Messages from your healthcare providers</li>
          <li>Account updates and security alerts</li>
          <li>Service announcements and policy changes</li>
          <li>Billing statements and payment receipts</li>
          <li>Educational content and health tips</li>
        </ul>
      </div>
      <p className="mt-2 text-sm">
        You agree that all electronic communications satisfy any legal
        requirement that communications be in writing. You may opt out of
        certain non-essential communications through your account settings.
      </p>
    </>
  );
}
