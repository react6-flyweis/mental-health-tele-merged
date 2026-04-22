import React from "react";

export default function OperationOfTheSite() {
  return (
    <>
      <p>
        We strive to maintain uninterrupted access to our platform, but we do
        not guarantee that the service will be available at all times. The
        platform may be subject to scheduled maintenance, updates, or unexpected
        technical issues.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#ECFEFF] border border-[#CBFBF1] rounded-xl text-sm">
          <strong>We Reserve The Right To:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
            <li>Modify or discontinue services</li>
            <li>Perform scheduled maintenance</li>
            <li>Update platform features</li>
            <li>Change service offerings</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl text-sm">
          <strong>Your Understanding:</strong>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
            <li>Service availability not guaranteed</li>
            <li>Temporary interruptions may occur</li>
            <li>Features may change over time</li>
            <li>No compensation for downtime</li>
          </ul>
        </div>
      </div>
      <p className="mt-2 text-sm">
        We will make reasonable efforts to notify users of planned maintenance
        or significant changes, but we are not obligated to provide advance
        notice for all modifications or interruptions.
      </p>
    </>
  );
}
