"use client";

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
import { AlertTriangle } from "lucide-react";
import type { Appointment } from "./AppointmentCard";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";

interface CancelAppointmentDialogProps {
  appointment: Appointment;
  trigger?: React.ReactNode;
  onConfirm?: (id:any) => void;
}

export default function CancelAppointmentDialog({
  appointment,
  trigger,
  onConfirm,
}: CancelAppointmentDialogProps) {
  const router = useNavigate();


  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-destructive text-destructive"
          >
            <AlertTriangle className="size-4 mr-1" /> Cancel
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this appointment?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-1 text-sm">
            <div>
              <span className="font-medium">Therapist:</span>{" "}
              {appointment.providerName}
            </div>
            <div>
              <span className="font-medium">Date:</span> {appointment.date} at{" "}
              {appointment.time}
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200 text-yellow-700 text-sm">
            Cancellations within 24 hours may incur a fee. Please review our
            cancellation policy.
          </div>
        </div>

        <DialogFooter className="border-0 bg-transparent">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              Keep Appointment
            </Button>
          </DialogClose>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (onConfirm) {
                onConfirm(appointment);
              }
              // default action: navigate back to dashboard or refresh
              router.refresh();
            }}
          >
            Cancel Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
