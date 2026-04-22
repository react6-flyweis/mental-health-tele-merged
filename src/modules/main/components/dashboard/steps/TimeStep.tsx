"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { dashboardApi } from "@/api/dashboard.service";
import { formatTo12Hour } from "@/lib/utils";

export default function TimeStep({
  date,
  selectedTime,
  setSelectedTime,
  provider,
  providerData
}: {
  date: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (s: string | null) => void;
  provider?: any;
  providerData?: any;
}) {
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = async (id: string, date: string) => {
    setSlotsLoading(true);
    setError(null);

    try {
      const res = await dashboardApi.getProviderAvailability(id, date);
      const apiSlots = res?.data?.slots ?? [];

      const mapped = apiSlots.map((slot: any) => ({
        id: `${slot.startTime}-${slot.endTime}`,
        start: formatTo12Hour(slot.startTime),
        end: formatTo12Hour(slot.endTime),
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));

      setSlots(mapped);
    } catch (e: any) {
      setSlots([]);
      setError("Failed to load time slots. Please try again.");
    } finally {
      setSlotsLoading(false);
    }
  };

  useEffect(() => {
    if (provider?._id && date) {
      fetchSlots(provider._id, dayjs(date).format("YYYY-MM-DD"));
    }
  }, [provider, date]);

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-4">
        Select a time slot for {date ? date.toLocaleDateString() : ""}
      </div>

      {/* ✅ Loader */}
      {slotsLoading && (
        <div className="w-full py-6 flex justify-center items-center text-sm text-muted-foreground">
          Loading slots...
        </div>
      )}

      {/* ❌ Error */}
      {!slotsLoading && error && (
        <div className="w-full py-4 text-center text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* 🚫 No Slots */}
      {!slotsLoading && !error && slots.length === 0 && (
        <div className="text-sm text-muted-foreground w-full py-4 text-center">
          No time slots available for this day.
        </div>
      )}

      {/* ✅ Slots */}
      {!slotsLoading && !error && slots.length > 0 && (
        <div className="grid grid-cols-3 gap-4 w-full">
          {slots.map((slot, idx) => {
            const active = selectedTime === slot?.start;

            return (
              <Button
                key={idx}
                variant={active ? undefined : "outline"}
                onClick={() => {
                  sessionStorage.setItem("selectedTime", slot.start);
                  setSelectedTime(slot.start);
                }}
                className={`w-full rounded-md py-4 text-sm ${
                  active ? "bg-gradient-dash text-white" : ""
                }`}
              >
                {slot?.start}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}