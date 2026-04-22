"use client";

import React from "react";
import { Check, AlertCircle } from "lucide-react";

export default function PermittedUses() {
  return (
    <>
      <p>
        The content on this website is provided for your personal,
        non-commercial use. You may access and use the website for legitimate
        healthcare purposes only.
      </p>

      <h4 className="mt-4 font-medium">You May:</h4>
      <ul className="mt-2 space-y-2">
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            View and use website content for personal health information
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>Print materials for your personal reference</span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-1" />
          <span>
            Share general health information with your healthcare providers
          </span>
        </li>
      </ul>

      <h4 className="mt-4 font-medium">You May Not:</h4>
      <ul className="mt-2 space-y-2">
        <li className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
          <span>
            Reproduce, distribute, or republish content for commercial purposes
          </span>
        </li>
        <li className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
          <span>
            Modify, reverse engineer, or create derivative works from our
            content
          </span>
        </li>
        <li className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
          <span>Remove copyright, trademark, or proprietary notices</span>
        </li>
        <li className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
          <span>
            Use automated tools to scrape or extract data from the website
          </span>
        </li>
      </ul>
    </>
  );
}
