"use client";

import React from "react";

export default function ServicesFeatures() {
  return (
    <>
      <p>
        MEDvidi provides an online platform that connects users with licensed
        healthcare professionals for telehealth services. Our website offers
        various features designed to facilitate remote healthcare delivery.
      </p>

      <h4 className="mt-4 font-medium">Available Services Include</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div className="p-4 border rounded-lg bg-background">
          <h5 className="font-medium">Virtual Consultations</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Connect with licensed professionals through secure video or phone
            sessions.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <h5 className="font-medium">Treatment Plans</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Receive personalized care plans based on your consultation.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <h5 className="font-medium">Prescription Services</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Obtain prescriptions when medically appropriate.
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-background">
          <h5 className="font-medium">Follow-up Care</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Schedule ongoing appointments for continued support.
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Services are subject to availability and may vary based on your
        location, insurance coverage, and medical needs. We reserve the right to
        add, modify, or discontinue any service at our discretion.
      </p>
    </>
  );
}
