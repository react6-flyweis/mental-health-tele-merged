import React from "react";

export default function AcceptableUse() {
  return (
    <>
      <p>
        Your use of our platform must align with its intended purpose as a
        healthcare service delivery system. We expect all users to engage with
        the platform in good faith and for legitimate healthcare needs.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          <strong>Acceptable Uses:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Seeking medical consultation</li>
            <li>Managing your healthcare</li>
            <li>Communicating with providers</li>
            <li>Accessing health resources</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <strong>Unacceptable Uses:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Commercial exploitation</li>
            <li>Data scraping or mining</li>
            <li>Reselling services</li>
            <li>Fraudulent activities</li>
          </ul>
        </div>
      </div>
    </>
  );
}
