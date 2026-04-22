"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import DateStep from "@/modules/main/components/dashboard/steps/DateStep";
import dateRangeIcon from "@/assets/icons/date-range.svg";
import dateTodayIcon from "@/assets/icons/date-today.svg";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
import dayjs from "dayjs";
import { dashboardApi } from "@/api/dashboard.service";
import { toast } from "react-toastify";

export default function AppointmentPage() {
  const {
    data: bookingFlow,
    loading: bookingFlowLoading,
    error: bookingFlowError,
  } = useFetch(publicPageApi.getBookingFlow) as any;

  const data = bookingFlow?.appointmentStep ?? {};
  const modes = data?.modes || [];
  const router = useNavigate();

  const [providerId, setProviderId] = useState<any>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [mode, setMode] = useState<string>("any_time_today");
  const [slots, setSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // ─── 1. On mount: restore everything from sessionStorage ───────────────────
  useEffect(() => {
    const stored = sessionStorage.getItem("providerData");
    if (stored) setProviderId(JSON.parse(stored));

    const storedMode = sessionStorage.getItem("appointmentMode");
    if (storedMode) setMode(storedMode);

    const storedDate = sessionStorage.getItem("selectedDate");
    if (storedDate) {
      const [y, m, d] = storedDate.split("-").map(Number);
      setSelectedDate(new Date(y, m - 1, d));
    }

    const storedSlotId = sessionStorage.getItem("selectedSlotId");
    if (storedSlotId) setSelectedSlotId(storedSlotId);
  }, []);

  // ─── 2. Fetch slots from API ───────────────────────────────────────────────
  const fetchSlots = async (id: string, date: string) => {
    setSlotsLoading(true);
    try {
      const res = await dashboardApi.getProviderAvailability(id, date);
      const apiSlots = res?.data?.slots ?? [];

      // Map API slots → display format
      const mapped = apiSlots.map(
        (slot: { startTime: string; endTime: string }) => ({
          id: `${slot.startTime}-${slot.endTime}`,
          start: formatTo12Hour(slot.startTime),
          end: formatTo12Hour(slot.endTime),
          startTime: slot.startTime,
          endTime: slot.endTime,
        }),
      );

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

  // ─── 3. Trigger slot fetch when mode / date / provider changes ─────────────
  useEffect(() => {
    if (!providerId?._id) return;

    if (mode === "any_time_today") {
      // Always use today for "any time today"
      const today = dayjs().format("YYYY-MM-DD");
      fetchSlots(providerId._id, today);
    } else if (mode === "pick_time_range" && selectedDate) {
      const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
      fetchSlots(providerId._id, dateStr);
    } else {
      // pick_time_range but no date selected yet
      setSlots([]);
    }
  }, [mode, selectedDate, providerId]);

  // ─── 4. Persist mode & date to sessionStorage ──────────────────────────────
  useEffect(() => {
    sessionStorage.setItem("appointmentMode", mode);
  }, [mode]);

  useEffect(() => {
    if (!selectedDate) return;
    sessionStorage.setItem(
      "selectedDate",
      dayjs(selectedDate).format("YYYY-MM-DD"),
    );
  }, [selectedDate]);

  const handleModeChange = (key: string) => {
    setMode(key);
    if (key === "any_time_today") {
      setSelectedDate(new Date());
    }
  };

  const handleSlotClick = (slot: any) => {
    setSelectedSlotId(slot.id);
    sessionStorage.setItem("selectedSlotId", slot.id);
    sessionStorage.setItem("selectedSlot", JSON.stringify(slot));
  };

  const handleNext = () => {
    const selectedSlot = slots.find((s) => s.id === selectedSlotId);
    if (!selectedSlot) {
      toast.error("Please select a slot");
      return;
    }
    sessionStorage.setItem("selectedSlot", JSON.stringify(selectedSlot));
    router("/appointment/confirm");
  };

  if (bookingFlowLoading) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-6">
        <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-36 mt-8 ml-auto" />
      </Card>
    );
  }

  if (bookingFlowError) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-8 text-center text-red-500">
        <p>Something went wrong loading data. Please try again.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg gap-0 max-w-lg mx-auto">
      <CardHeader className="border-b-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-2"
          onClick={() => window.history(-1)}
        >
          <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            {data?.title ?? "When Would You Like To Have An Appointment"}
          </h1>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((m: any) => (
            <div
              key={m.key}
              role="button"
              onClick={() => handleModeChange(m.key)}
              className={`p-6 rounded-xl border transition-colors cursor-pointer text-center flex flex-col items-center ${
                mode === m.key
                  ? "border-[#4A7C7E] bg-white shadow-sm"
                  : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
              }`}
            >
              <img
                src={m.key === "any_time_today" ? dateTodayIcon : dateRangeIcon}
                alt={m.label}
                className="mb-3"
              />
              <div className="font-semibold text-base text-primary">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Date picker — only for pick_time_range */}
        {mode === "pick_time_range" && (
          <DateStep
            date={selectedDate}
            setDate={setSelectedDate}
            provider={null}
          />
        )}

        {/* Slots */}
        <div className="space-y-3">
          {mode === "pick_time_range" && !selectedDate ? (
            <p className="text-center text-sm text-gray-500 py-3">
              Please select a date to see available slots
            </p>
          ) : slotsLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A7C7E]" />
            </div>
          ) : slots.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-3">
              No slots available
              {mode === "any_time_today" ? " for today" : " on this date"}
            </p>
          ) : (
            <div className="flex gap-3 flex-wrap justify-center mt-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  className={`cursor-pointer px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 text-center transition-all ${
                    selectedSlotId === slot.id
                      ? "ring-2 ring-[#4A7C7E] bg-white font-medium"
                      : "hover:bg-[#e8f4f2]"
                  }`}
                >
                  {slot.start}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            size="lg"
            className="h-12 w-36 bg-gradient-primary text-white hover:opacity-95"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Helper: "10:00" → "10:00 AM" ─────────────────────────────────────────
function formatTo12Hour(time: string): string {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}
