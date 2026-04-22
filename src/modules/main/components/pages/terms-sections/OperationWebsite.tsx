"use client";

import React from "react";

export default function OperationWebsite() {
  return (
    <>
      <p>
        We reserve the right to operate, modify, maintain, and manage this
        website according to our business needs and technical requirements.
      </p>

      <h4 className="mt-4 font-medium">Our Rights Include</h4>

      <div className="mt-3 space-y-3">
        <div className="p-4 rounded-lg bg-background border">
          <h5 className="font-medium">Modifications and Updates</h5>
          <p className="text-sm text-muted-foreground mt-1">
            We may update, modify, or discontinue any aspect of the website
            without prior notice, including features, functionality, and
            content.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-background border">
          <h5 className="font-medium">Maintenance and Downtime</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Scheduled and emergency maintenance may temporarily interrupt
            access. We will make reasonable efforts to minimize disruptions.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-background border">
          <h5 className="font-medium">Content Removal</h5>
          <p className="text-sm text-muted-foreground mt-1">
            We may remove, edit, or refuse to publish any content that violates
            these Terms or is deemed inappropriate.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-background border">
          <h5 className="font-medium">Access Control</h5>
          <p className="text-sm text-muted-foreground mt-1">
            We may restrict, suspend, or terminate user access for violations,
            suspicious activity, or at our discretion.
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        We are not liable for any inconvenience or loss resulting from website
        modifications, maintenance, or operational decisions.
      </p>
    </>
  );
}
