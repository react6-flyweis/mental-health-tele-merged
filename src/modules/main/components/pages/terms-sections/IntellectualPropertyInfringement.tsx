"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

export default function IntellectualPropertyInfringement() {
  return (
    <>
      <h4 className="font-medium">Intellectual Property Infringement</h4>
      <p className="mt-2">
        We respect the intellectual property rights of others and expect our
        users to do the same. We will respond to valid notices of copyright or
        trademark infringement in accordance with applicable law.
      </p>

      <h5 className="mt-4 font-medium">Reporting Infringement</h5>
      <p className="mt-2">
        If you believe that content on our website infringes your intellectual
        property rights, please provide us with the following information:
      </p>

      <div className="mt-3 p-4 bg-[#5FB5A51A] border border-[#4A7C7E33] rounded-md">
        <strong className="block mb-2 text-primary">
          Required Information for DMCA Notice
        </strong>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            Identification of the copyrighted work claimed to be infringed
          </li>
          <li>Location of the allegedly infringing material on our website</li>
          <li>Your contact information (name, address, phone, email)</li>
          <li>A statement of good faith belief that use is not authorized</li>
          <li>
            A statement that the information is accurate and you are authorized
            to act
          </li>
          <li>Your physical or electronic signature</li>
        </ol>
      </div>

      <div className="mt-4 p-4 border rounded-md bg-white">
        <p className="text-sm font-semibold">Send Notices To:</p>
        <div className="mt-2 text-sm text-muted-foreground">
          MEDvidi Legal Department
          <br />
          Email: legal@medvidi.com
          <br />
          Subject Line: ”Copyright Infringement Notice“
        </div>
      </div>
    </>
  );
}
