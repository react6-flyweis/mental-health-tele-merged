"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import TherapistStep from "@/components/dashboard/steps/TherapistStep";
import DateStep from "@/components/dashboard/steps/DateStep";
import TimeStep from "@/components/dashboard/steps/TimeStep";
import DetailsStep from "@/components/dashboard/steps/DetailsStep";
import ConfirmStep from "@/components/dashboard/steps/ConfirmStep";
import PaymentDialog from "@/components/dashboard/PaymentDialog";
import { Provider } from "@/components/dashboard/types";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function BookAppointmentDialog({ provider }: { provider: any }) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<string>("video");
  const [reason, setReason] = useState<string>("");
  const stepLabels = ["Therapist", "Date", "Time", "Details", "Confirm"];
  const [providerData, setProviderData] = useState<any>(null);
  const handleMyProviders = async (providerId: string) => {
    try {
      const awaitData = await patientApi.getProviderById(providerId);
      setOpen(true)
      setProviderData(awaitData);
    } catch (error) {
    }
  }
  useEffect(() => {
    setSelectedTime(null);
  }, [date]);
  const handleBooking = async () => {
    try {
      const selectedTimeFromStorage = sessionStorage.getItem("selectedTime") || "";
      const parsed = dayjs(selectedTimeFromStorage, "hh:mm A");

      let time = selectedTimeFromStorage;

      if (parsed.isValid()) {
        let minutes = parsed.minute();

        const remainder = minutes % 20;

        if (remainder !== 0) {
          minutes = minutes - remainder;
        }

        time = parsed.minute(minutes).format("HH:mm");
      }
      {

      }
      const formattedDate = dayjs(date).format("YYYY-MM-DD")
      const res = await patientApi.bookAppointment({
        providerId: provider._id,
        date: formattedDate,
        time,
        type: sessionType,
      });
      sessionStorage.setItem("providerAmount", provider?.sessionFee);
      sessionStorage.setItem("appointmentId", res?.data?.appointment?._id);
      setIsSuccess(true);

      toast.success(res?.data?.message || "Appointment booked successfully");
    } catch (error: any) {
      setIsSuccess(false);
      toast.error(error?.message || "Failed to book appointment");
    }
  };
  useEffect(() => {
    if (!open) {
      setStep(1);
      setDate(undefined);
      setSelectedTime(null);
      setSessionType("video");
      setReason("");
      setIsSuccess(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>      <DialogTrigger asChild>
      <Button className="bg-gradient-dash w-full" onClick={() => {

        handleMyProviders(provider?._id);
      }}>
        <Video className="size-4 mr-2" /> Book Now
      </Button>
    </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold">Book Appointment</DialogTitle>
          <DialogDescription />

          {/* Stepper */}
          <div className="mt-4 relative h-14">
            <div className="absolute max-w-[92%] left-0 right-0 top-4 -translate-y-1/2 h-1 bg-muted rounded-full" />

            <div
              className="absolute left-0 top-4 max-w-[92%] -translate-y-1/2 h-1 rounded-full bg-gradient-dash"
              style={{
                width: `${((step - 1) / (stepLabels.length - 1)) * 100 + 12}%`,
              }}
            />

            <div className="relative z-10 flex justify-between items-center px-1">
              {stepLabels.map((label, i) => {
                const active = step === i + 1;
                const completed = step > i + 1;
                return (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center text-xs font-medium ${active
                        ? "bg-gradient-dash text-white"
                        : completed
                          ? "bg-gradient-dash text-white"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {i + 1}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && <TherapistStep provider={provider} />}
          {step === 2 && (
            <DateStep minDate={new Date()} date={date} setDate={setDate} provider={provider} />
          )}
          {step === 3 && (
            <TimeStep
              date={date}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              provider={provider}
              providerData={providerData?.data?.provider}
            />
          )}
          {step === 4 && (
            <DetailsStep
              sessionType={sessionType}
              setSessionType={setSessionType}
              reason={reason}
              setReason={setReason}
            />
          )}
          {step === 5 && (
            <ConfirmStep
              provider={provider}
              date={date}
              selectedTime={selectedTime}
            />
          )}
        </div>

        <DialogFooter className="border-t-0 bg-white">
          <div className="w-full flex gap-3">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="flex-1"
              >
                previous
              </Button>
            ) : (
              ""
            )}

            {step === 5 ? (
              <PaymentDialog
                open={isSuccess}
                onClose={() => setIsSuccess(false)}
              >
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-dash"
                  onClick={() => handleBooking()}
                >
                  confirm
                </Button>
              </PaymentDialog>
            ) : (
              <Button
                className="flex-1 bg-gradient-dash"
                onClick={() => {
                  if (step === 2 && !date) return;
                  if (step === 3 && !selectedTime) return;
                  setStep((s) => Math.min(5, s + 1));
                }}
                disabled={
                  (step === 2 && !date) || (step === 3 && !selectedTime)
                }
              >
                Next
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
