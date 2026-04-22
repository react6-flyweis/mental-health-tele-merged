import React from "react";

export default function NoThirdPartyBeneficiaries() {
  return (
    <>
      <p>
        These Terms and Conditions create a binding agreement solely between you
        and our company. No third party is intended to be a beneficiary of these
        terms.
      </p>
      <p className="mt-2">
        Healthcare providers, partners, affiliates, or other third parties
        mentioned in these terms do not have independent rights to enforce any
        provision of this agreement.
      </p>
      <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
        Only you and our company may enforce the terms of this agreement. No
        third party may rely on or enforce any provision contained herein.
      </div>
    </>
  );
}
