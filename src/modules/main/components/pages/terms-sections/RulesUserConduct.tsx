"use client";

import React from "react";

export default function RulesUserConduct() {
  return (
    <>
      <p>
        To maintain a safe and respectful environment, all users must adhere to
        acceptable conduct standards when using our website.
      </p>

      <div className="mt-4 p-4 bg-red-50  border-l-4 border-red-600">
        <h4 className="font-medium text-red-700 mb-3">Prohibited Activities</h4>
        <ul className="text-sm text-red-700 space-y-2">
          {[
            "Harassing, threatening, or abusing other users or providers",
            "Uploading viruses, malware, or harmful code",
            "Attempting to gain unauthorized access to systems or data",
            "Impersonating others or providing false information",
            "Using the website for any illegal or fraudulent purpose",
            "Interfering with the proper functioning of the website",
            "Posting offensive, defamatory, or inappropriate content",
            "Violating intellectual property rights of others",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-red-600 mt-0.5">✖</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Violation of these conduct rules may result in immediate account
        suspension or termination, and we may report illegal activities to law
        enforcement authorities.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        We reserve the right to investigate suspected violations and take
        appropriate action, including cooperation with law enforcement agencies.
      </p>
    </>
  );
}
