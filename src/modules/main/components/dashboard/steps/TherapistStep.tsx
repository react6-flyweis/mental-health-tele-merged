"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Provider } from "@/modules/main/components/dashboard/types";

export default function TherapistStep({ provider }: { provider: any }) {
  return (
    <div className="">
      <div className="flex items-center gap-4 bg-accent rounded-lg p-2">
        <Avatar className="size-16 border border-slate-100 bg-white shadow-sm">
          <AvatarFallback>
            {provider.firstName ? provider.firstName?.[0] : ""}
            {provider.lastName ? provider.lastName?.[0] : ""}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="text-sm font-semibold">
            {provider.firstName} {provider.lastName}
          </div>
          <div className="text-xs text-muted-foreground">
            {provider.specialty}
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="size-4 text-amber-400 fill-current" />
              <span className="font-semibold text-sm">{provider.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full flex items-center gap-8 text-sm ">
        <div className="space-y-1">
          <div className="font-semibold">Experience</div>
          <div className="font-semibold">Specialties</div>
          <div className="font-semibold">Session Fee</div>
        </div>
        <div className="space-y-1">
          <div className="">{provider?.experience ?? "0 year"} </div>
          <div className="">{provider?.specialty ?? "Specialist"}</div>
          <div className="">${provider?.sessionFee ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
