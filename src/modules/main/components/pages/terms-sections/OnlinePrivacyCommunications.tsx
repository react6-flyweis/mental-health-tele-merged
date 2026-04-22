"use client";

import React from "react";
import { Check } from "lucide-react";

export default function OnlinePrivacyCommunications() {
  return (
    <>
      <p>
        Your privacy is important to us. Our collection, use, and protection of
        your personal information is governed by our Privacy Policy, which is
        incorporated into these Terms by reference.
      </p>

      <div className="mt-4 p-4 rounded-lg bg-[#5FB5A51A] border border-[#4A7C7E33]">
        <h5 className="font-medium">Privacy Commitments</h5>
        <ul className="mt-3 text-sm text-muted-foreground space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>We comply with HIPAA and applicable privacy regulations</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>Health information is encrypted and stored securely</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>We do not sell your personal or health information</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <span>
              You have rights to access, correct, and delete your data
            </span>
          </li>
        </ul>
      </div>

      <h4 className="mt-4 font-medium">Communications</h4>
      <p className="text-sm text-muted-foreground mt-2">
        By using our services, you consent to receive electronic communications
        from us, including emails, text messages, and in-app notifications.
        These may include:
      </p>
      <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>Appointment reminders and confirmations</li>
        <li>Service updates and important announcements</li>
        <li>Billing and payment notifications</li>
        <li>Security alerts and account updates</li>
      </ul>

      <p className="mt-3 text-sm text-muted-foreground">
        You may opt out of non-essential communications through your account
        settings, but certain service-related messages cannot be disabled.
      </p>
    </>
  );
}
