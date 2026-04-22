"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export default function PolicyContactCard() {
  return (
    <div className="mt-4 rounded-xl p-10 text-white bg-linear-to-b text-center from-slate-800 to-teal-500">
      <h3 className="text-2xl font-semibold">Questions About These Terms?</h3>
      <p className="mt-3 text-sm text-white/90">
        If you have any questions or concerns about these Terms and Conditions,
        our team is here to help.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="mailto:support@healthcare.com"
          className="w-full sm:w-auto px-6 py-5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white inline-flex items-center gap-3"
        >
          <div className="">
            <div className="text-xs">Email Support</div>
            <div className="font-semibold">support@healthcare.com</div>
          </div>
        </a>
        <a
          href="tel:1-800-HEALTH-1"
          className="w-full sm:w-auto px-6 py-5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white inline-flex items-center gap-3 "
        >
          <div className="">
            <div className="text-xs">Phone Support</div>
            <div className="font-semibold">1-800-HEALTH-1</div>
          </div>
        </a>
      </div>
    </div>
  );
}
