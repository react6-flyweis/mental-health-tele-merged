import React from "react";

export default function SitesNotForChildren() {
  return (
    <>
      <p>
        Our services are designed exclusively for individuals who are 18 years
        of age or older. We do not knowingly collect, process, or maintain
        information from users under the age of 18.
      </p>
      <p className="mt-2">
        If you are a parent or guardian and believe that your child has provided
        us with personal information, please contact us immediately so we can
        take appropriate action to remove such data from our systems.
      </p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Minimum age requirement: 18 years</li>
        <li>No services are offered to minors</li>
        <li>Parental consent does not override this restriction</li>
      </ul>
    </>
  );
}
