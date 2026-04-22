"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import shareTreatment from "@/assets/icons/share-treatment.svg";
import contactIcon from "@/assets/icons/contact.svg";
import newPatientIcon from "@/assets/icons/new-patient.svg";
import export1Img from "@/assets/landing/expert-1.png";

type SummaryStepProps = {
  selectedPlan: "new" | "continue" | null;
  selectedTreatments: string[];
  bookingFlow?: any;
  providerData?: any;
};

export default function SummaryStep({
  selectedPlan,
  selectedTreatments,
  bookingFlow,
  providerData,
}: SummaryStepProps) {
  return (
    <div className="px-2">
      <div className="flex flex-col items-center text-center space-y-2">
        <Avatar className="size-28 border border-slate-100 bg-white">
          <AvatarFallback className="text-slate-700">
            {providerData?.suggestedProvider?.firstName?.charAt(0) ?? ""}
            {providerData?.suggestedProvider?.lastName?.charAt(0) ?? ""}
          </AvatarFallback>
          <AvatarImage src={providerData?.suggestedProvider?.profileImageUrl} />
        </Avatar>

        <div className="text-xl font-semibold">
          {providerData?.suggestedProvider?.firstName}{" "}
          {providerData?.suggestedProvider?.lastName}
        </div>
        <div className="text-sm text-muted-foreground">
          {providerData?.suggestedProvider?.designation}
        </div>

        <div className="mt-2 text-sm text-slate-600">
          {selectedTreatments.length > 0 && (
            <div>Selected: {selectedTreatments.join(", ")}</div>
          )}
          {selectedPlan && (
            <div>
              Plan: {selectedPlan === "new" ? "New Patient" : "Continue Care"}
            </div>
          )}
        </div>

        <p className="mt-3 text-lg max-w-sm">
          {providerData?.suggestedProvider?.bio}
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          We Prioritize Continuity & Uninterrupted Care
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-start gap-4 p-4 border rounded-lg bg-white">
          <img src={shareTreatment} alt="share treatment" className="w-6 h-6" />
          <div>
            <div className="font-semibold">
              Share What Treatment Works For You
            </div>
            <div className="text-sm text-slate-600 mt-1 max-w-xl">
              A Licensed Provider Will Carefully Review Your History And Current
              Plan To Ensure It&apos;s Safe And Best For You.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border rounded-lg bg-white">
          <img src={contactIcon} alt="meet provider" className="w-6 h-6" />
          <div>
            <div className="font-semibold">
              Meet Your Provider As Soon As Today
            </div>
            <div className="text-sm text-slate-600 mt-1 max-w-xl">
              Hassle-Free, Online Appointments Available Often The Same Day Or
              Within 48 Hours.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border rounded-lg bg-white">
          <img
            src={newPatientIcon}
            alt="resume treatment"
            className="w-6 h-6"
          />
          <div>
            <div className="font-semibold">Resume Treatment The Same Day</div>
            <div className="text-sm text-slate-600 mt-1 max-w-xl">
              Our Providers Send E-Prescriptions To Pharmacies Right After The
              Appointment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
