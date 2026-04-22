"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TreatmentsStepProps = {
  selectedTreatments: string[];
  onToggleTreatment: (treatment: string) => void;
  bookingFlow: any;
};

export default function TreatmentsStep({
  selectedTreatments,
  onToggleTreatment,
  bookingFlow,
}: TreatmentsStepProps) {
  const treatmentOptions = bookingFlow?.options || [];

  return (
    <div>
      <h1 className="text-xl font-semibold text-[#4A7C7E] text-center mb-5">
        {bookingFlow?.title ?? ""}
      </h1>

      <div className="max-h-64 rounded-md border border-gray-100 overflow-y-auto">
        <div className="space-y-3 p-2">
          {treatmentOptions.map((treatment: any) => (
            <div
              key={treatment.slug}
              className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                selectedTreatments.includes(treatment.slug)
                  ? "border-[#4A7C7E] bg-[#f6fbfa]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => onToggleTreatment(treatment.slug)} 
            >
              <Checkbox
                id={treatment.slug}
                checked={selectedTreatments.includes(treatment.slug)}
                // ❌ removed onCheckedChange — was causing double toggle
                className="border-gray-300"
              />

              <Label
                htmlFor={treatment.slug}
                className="flex-1 cursor-pointer font-normal"
                onClick={(e) => e.stopPropagation()} // ✅ prevent label from also triggering div's onClick
              >
                {treatment.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}