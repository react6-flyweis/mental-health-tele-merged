"use client";

import React from "react";
import { FileText } from "lucide-react";

export default function DoNotSubmitIdeas() {
  return (
    <>
      <p>
        We do not accept or consider unsolicited ideas, suggestions, proposals,
        or creative materials from users outside of formal business
        relationships.
      </p>

      <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-600 ">
        <h4 className="font-medium text-red-700">Important Policy</h4>
        <div className="text-sm text-red-700 mt-2">
          Any unsolicited ideas, feedback, suggestions, or materials you submit
          will be deemed non-confidential and non-proprietary. We may use them
          without compensation or acknowledgment.
        </div>
      </div>

      <h4 className="mt-4 font-medium">This Policy Applies To</h4>
      <ul className="mt-2 text-sm text-muted-foreground space-y-2 list-disc list-inside">
        <li>Product or service ideas</li>
        <li>Marketing or business proposals</li>
        <li>Creative concepts, designs, or content</li>
        <li>Technology innovations or improvements</li>
      </ul>

      <p className="mt-3 text-sm text-muted-foreground">
        This policy protects both you and us from potential disputes about
        ownership and compensation. If you wish to propose ideas in a
        professional context, please contact us to establish a formal agreement
        first.
      </p>
    </>
  );
}
