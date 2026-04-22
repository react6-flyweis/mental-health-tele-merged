import React from "react";

export default function LinksToThirdPartyWebsites() {
  return (
    <>
      <p>
        Our platform may contain links to external websites or services that are
        not owned or controlled by us. These links are provided for your
        convenience and do not constitute an endorsement.
      </p>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 text-amber-800 rounded-lg text-sm">
        <strong>Third-Party Content Disclaimer:</strong>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>We do not control external websites or their content</li>
          <li>We are not responsible for third-party privacy practices</li>
          <li>External sites may have different terms and policies</li>
          <li>We do not endorse third-party products or services</li>
          <li>Access external sites at your own risk</li>
        </ul>
      </div>
      <p className="mt-2 text-sm">
        We strongly advise you to review the terms and privacy policies of any
        third-party websites you visit. We have no control over and assume no
        responsibility for third-party content or practices.
      </p>
    </>
  );
}
