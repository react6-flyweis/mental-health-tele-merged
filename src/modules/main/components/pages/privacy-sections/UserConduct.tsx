import React from "react";
import { ChevronDown } from "lucide-react";

export default function UserConduct() {
  return (
    <>
      <p>
        To maintain a safe and effective environment for all users, you agree to
        use our platform responsibly and in accordance with these conduct
        guidelines.
      </p>
      <details className="mt-4 rounded-xl border overflow-hidden">
        <summary className="p-4 bg-[#F8FAFC] text-sm font-medium flex justify-between">
          Prohibited Activities
          <ChevronDown className="size-4 text-muted-foreground" />
        </summary>
        <div className="p-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Harassment or abuse of other users</li>
            <li>Attempting to access unauthorized areas of the platform</li>
            <li>Using the service for any illegal purpose</li>
            <li>Submitting false or misleading information</li>
          </ul>
        </div>
      </details>
    </>
  );
}
