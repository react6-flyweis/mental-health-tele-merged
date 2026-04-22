import React from "react";

export default function ProhibitedCountries() {
  return (
    <>
      <p>
        Our services are subject to regulatory and licensing restrictions based
        on geographic location. We cannot provide services to users located in
        certain jurisdictions where we are not authorized to operate.
      </p>
      <p className="mt-2">
        Access to our platform may be restricted or unavailable in countries
        subject to international sanctions, regulatory prohibitions, or where
        local laws prevent us from offering healthcare services.
      </p>
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
        Using VPNs or other methods to circumvent geographic restrictions is
        strictly prohibited and may result in account termination.
      </div>
    </>
  );
}
