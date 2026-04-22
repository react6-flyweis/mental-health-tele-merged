"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import type { Appointment } from "./AppointmentCard";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DateStep from "./steps/DateStep";
import { dashboardApi } from "@/api/dashboard.service";
import { formatTo12Hour } from "@/lib/utils";

interface Slot {
  id: string;
  date: string;
  rawDate: string;
  start: string;
  end: string;
  time24: string;
  startTime: string;
  endTime: string;
}

interface RescheduleAppointmentDialogProps {
  appointment: Appointment;
  trigger?: React.ReactNode;
  handleCloseReschedule: () => void;
  openReschedule: boolean;
  setOpenReschedule: (open: boolean) => void;
  fetchAppointments: any;
}

export default function RescheduleAppointmentDialog({
  appointment,
  trigger,
  handleCloseReschedule,
  openReschedule,
  setOpenReschedule,
  fetchAppointments
}: RescheduleAppointmentDialogProps) {
  const router = useNavigate();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  console.log({ appointment })


  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const fetchSlots = async (id: string) => {
    setSlotsLoading(true);
    try {
      const date = dayjs(selectedDate).format("YYYY-MM-DD");
      const res = await dashboardApi.getProviderAvailability(id, date);
      const apiSlots = res?.data?.slots ?? [];

      // Map API slots → display format
      const mapped = apiSlots.map((slot: { startTime: string; endTime: string }) => ({
        id: `${slot.startTime}-${slot.endTime}`,
        start: formatTo12Hour(slot.startTime),
        end: formatTo12Hour(slot.endTime),
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));

      setSlots(mapped);

      // Validate previously selected slot still exists
      setSelectedSlotId((prev) => {
        if (!prev) return null;
        const stillValid = mapped.some((s: any) => s.id === prev);
        if (!stillValid) {
          sessionStorage.removeItem("selectedSlotId");
          return null;
        }
        return prev;
      });
    } catch (e) {
      console.error("Failed to fetch slots", e);
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };
  useEffect(() => {
    if (appointment?.providerId && appointment?.date&&openReschedule) {
      fetchSlots(appointment.providerId);
    }
  }, [appointment, selectedDate]);
  const handleSchedule = async () => {
    console.log({ selectedSlot })
    if (!selectedSlot || !selectedDate) return toast.error("Please select a date and time");

    const payload: any = {
      date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined,
      time: selectedSlot.startTime,
    };

    try {
      const res: any = await patientApi.getRescheduleById(
        appointment.id,
        payload,
      );
      setOpenReschedule(false);
      fetchAppointments();
      toast.success(res?.message || "Successfully rescheduled appointment");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to reschedule appointment");
    }
  };

  return (
    <Dialog open={openReschedule} onOpenChange={setOpenReschedule}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpenReschedule(true)}
          className="w-full flex-1"
        >
          {trigger || (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-emerald-500 text-emerald-500"
            >
              <SquarePen className="size-4 mr-1" /> Reschedule
            </Button>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Reschedule Appointment
          </DialogTitle>
          <DialogDescription>
            Select a new date and time for your appointment
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="p-4 bg-slate-50 rounded-md">
            <div className="text-xs font-medium text-muted-foreground">
              Current Appointment
            </div>
            <div className="mt-1 text-sm">
              {appointment.date} at {appointment.time}
            </div>
          </div>
          <DateStep minDate={new Date()} date={selectedDate} setDate={setSelectedDate} provider={null} />
          {slotsLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A7C7E]" />
            </div>) : slots.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-3">
                No slots available
              </p>
            ) : (
            <div className="max-h-100 overflow-y-auto flex gap-2 items-center flex-wrap">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex flex-col md:flex-row md:items-center items-center gap-4 cursor-pointer ${selectedSlot?.id === slot.id
                      ? "border border-emerald-500 rounded-md"
                      : ""
                    }`}
                >


                  <div className="flex items-center gap-3 flex-1">
                    <div className="px-4 py-3 bg-slate-50 rounded-md text-sm text-slate-700 w-32 text-center">
                      {slot.start}
                    </div>



                  </div>

                </div>
              ))}


            </div>)}
        </div>
        <p className="text-xs text-muted-foreground">
          You&apos;ll be redirected to select a new date and time from
          available slots.
        </p>
        <DialogFooter className="border-0 bg-transparent">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-gradient-dash" onClick={handleSchedule}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
