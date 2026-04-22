"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

export default function DateStep({
  date,
  setDate,
  provider,
  minDate
}: {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  provider: any;
  minDate?: Date;
}) {

    const isPastDate =
  date && dayjs(date).isBefore(dayjs(), "day");

  return (
    <div className="flex flex-col items-center w-full">
      <div className="border">
        <Calendar
          mode="single"
          selected={date}
          disabled={{ before: minDate ? dayjs(minDate).startOf("day").toDate() : dayjs().add(1, "day").startOf("day").toDate() }}
          onSelect={(d) => {
            console.log('DateStep: Date selected:', d);
            setDate(d as Date | undefined);
          }}
        />
      </div>
    </div>
  );
}
