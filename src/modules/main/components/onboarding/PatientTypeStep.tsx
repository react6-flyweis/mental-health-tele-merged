"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import newPatientIcon from "@/assets/icons/new-patient.svg";
import continueCareIcon from "@/assets/icons/care-patient.svg";
import export1Img from "@/assets/landing/expert-1.png";

type PatientTypeStepProps = {
  selectedPlan: "new" | "continue" | null;
  onSelectPlan: (plan: "new" | "continue") => void;
  bookingFlow?: any;
  providerData?: any;
};

export default function PatientTypeStep({
  selectedPlan,
  onSelectPlan,
  bookingFlow,
  providerData,
}: PatientTypeStepProps) {
  const options = bookingFlow?.careTypeStep?.options || [];
  return (
    <>
      <div className="flex flex-col items-center text-center space-y-1 px-2">
        <Avatar className="size-28 border border-slate-100 bg-white">
          <AvatarFallback className="text-slate-700">
            {providerData?.suggestedProvider?.firstName?.charAt(0) ?? ""}
            {providerData?.suggestedProvider?.lastName?.charAt(0) ?? ""}
          </AvatarFallback>
          <AvatarImage src={providerData?.suggestedProvider?.profileImageUrl} />
        </Avatar>

        <div className="space-y-1">
          <div className="text-xl font-semibold">
            {providerData?.suggestedProvider?.firstName}{" "}
            {providerData?.suggestedProvider?.lastName}
          </div>
          <div className="text-sm text-muted-foreground">
            {providerData?.suggestedProvider?.designation}
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          {providerData?.suggestedProvider?.bio}
        </p>

        <h3 className="mt-4 text-lg font-medium text-slate-900">
          Which Type Of ADHD Care Are You Looking For?
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((opt: any) => (
          <div
            key={opt.value}
            role="button"
            onClick={() => {
              onSelectPlan(opt.value);
              sessionStorage.setItem("planFees", opt.feeUsd);
            }}
            aria-pressed={selectedPlan === opt.value}
            className={`p-2 rounded-xl border transition-shadow cursor-pointer text-center flex flex-col items-center ${
              selectedPlan === opt.value
                ? "border-[#4A7C7E] bg-white shadow-sm"
                : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
            }`}
          >
            <img
              src={
                opt.value === "new_patient" ? newPatientIcon : continueCareIcon
              }
              alt={opt.label}
              className="max-w-28 max-h-28 mb-2"
            />

            <div className="font-semibold text-base">{opt.label}</div>

            <div className="text-teal-700 mt-1 font-medium">${opt.feeUsd}</div>
          </div>
        ))}
      </div>
    </>
  );
}
