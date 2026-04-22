import React from "react";

export default function InformationYouProvide() {
  return (
    <>
      <p>
        When using our services, you will provide various types of information.
        You are responsible for ensuring that all information you submit is
        accurate, current, and complete.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
        <strong>Categories of Information:</strong>
        <ul className="mt-2 pl-1 space-y-1">
          <li>
            <strong>Personal Information:</strong> Name, date of birth, contact
            details, identification documents
          </li>
          <li>
            <strong>Health Information:</strong> Medical history, symptoms,
            medications, allergies, treatment preferences
          </li>
          <li>
            <strong>Payment Information:</strong> Billing address, payment
            methods, insurance details
          </li>
          <li>
            <strong>Usage Information:</strong> Platform interactions,
            appointment history, communication logs
          </li>
        </ul>
      </div>
      <p className="mt-2">
        Providing inaccurate or incomplete information may affect the quality of
        care you receive and could pose risks to your health. Update your
        information promptly when changes occur.
      </p>
    </>
  );
}
