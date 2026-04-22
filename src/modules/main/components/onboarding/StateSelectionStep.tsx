"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StateSelectionStepProps = {
  selectedState: string;
  onSelectState: (state: string) => void;
};

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function StateSelectionStep({
  selectedState,
  onSelectState,
}: StateSelectionStepProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-[#4A7C7E] text-center mb-5">
        Select Your State
      </h1>

      <Select value={selectedState} onValueChange={onSelectState}>
        <SelectTrigger className="w-full h-12!">
          <SelectValue placeholder="Choose your state" />
        </SelectTrigger>
        <SelectContent>
          {usStates.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
