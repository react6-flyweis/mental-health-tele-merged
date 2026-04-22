import React from "react";

export default function CreatingAnAccount() {
  return (
    <>
      <p>
        To access certain features of our platform, you will need to create a
        personal account. During registration, you must provide accurate and
        complete information.
      </p>
      <div className="mt-4 p-3 bg-linear-to-b from-[#F0FDFA] to-[#ECFEFF] border border-[#CBFBF1] rounded-xl">
        <strong>Your Responsibilities Include:</strong>
        <ul className="pl-6 mt-2">
          <li>Providing truthful and current information</li>
          <li>Updating your details when they change</li>
          <li>Maintaining only one account per person</li>
          <li>Ensuring you meet eligibility requirements</li>
        </ul>
      </div>
      <p className="mt-2">
        Creating multiple accounts or providing false information may result in
        immediate suspension or termination of your access to the platform.
      </p>
    </>
  );
}
