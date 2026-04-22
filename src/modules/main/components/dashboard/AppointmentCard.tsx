import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Phone, X, SquarePen } from "lucide-react";
import CancelAppointmentDialog from "./CancelAppointmentDialog";
import { cn } from "@/lib/utils";
import RescheduleAppointmentDialog from "./RescheduleAppointmentDialog";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";
import { dashboardApi } from "@/api/dashboard.service";

export interface Appointment {
  id: string;
  providerName: string;
  specialty: string;
  initials: string;
  date: string; // iso or human
  time: string; // human
  duration: number; // minutes
  type: "Video Call" | "Phone Call" | "video" | any;
  status: "Confirmed" | "Pending" | "Cancelled" | "Past" | any;
  providerId: string;
}

export function statusVariants(status: Appointment["status"]) {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-100 text-emerald-700 border-emerald-100";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-100";
    case "Cancelled":
      return "bg-destructive/20 text-destructive";
    case "Past":
      return "bg-emerald-100 text-emerald-700 border-emerald-100";
    default:
      return "";
  }
}

interface AppointmentCardProps {
  appointment: Appointment;
  handleCancelApp: any;
  handleStartSession: any;
  fetchAppointments: any;
}

export function AppointmentCard({ appointment: app, handleCancelApp, handleStartSession, fetchAppointments }: AppointmentCardProps) {
  const [openReschedule, setOpenReschedule] = React.useState(false);
  const handleCloseReschedule = () => setOpenReschedule(false);

  const handleCancel = async (id: any) => {
    try {
      const res: any = await patientApi.cancelAppointment(id);
      if (res?.status) {
        handleCancelApp();
        toast.success(res?.message || "Appointment cancelled successfully");
      } else {
        throw new Error(res?.message || "Cancel failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-16 border border-slate-100 bg-white">
          <AvatarFallback>{app.initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="text-sm font-semibold">{app.providerName}</div>
          <div className="text-xs text-muted-foreground">{app.specialty}</div>

          <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex gap-5 justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" /> {app.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" /> {app.time} ({app.duration} min)
              </div>
            </div>
            <div className="flex items-center gap-2">
              {app.type === "Video Call" ? (
                <Video className="size-4" />
              ) : (
                <Phone className="size-4" />
              )}
              <span>{app.type}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Badge
            className={cn(
              "rounded-full px-3 py-1 text-xs",
              statusVariants(app.status),
            )}
          >
            {app.status === "Past" ? "Completed" : app.status}
          </Badge>
        </div>
      </div>

      {(app.status === "Confirmed" ||
        app.status === "Pending" ||
        app.status === "Past") && (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
            {app.status === "Confirmed" && app.type === "Video Call" && (
              <Button className="w-full flex-1 bg-gradient-dash" onClick={() => handleStartSession(app.id)}>
                <Video className="size-4 mr-2" /> Join Session
              </Button>
            )}

            <div className="flex justify-between gap-2 flex-1">
              {(app.status === "Confirmed" || app.status === "Pending") && (
                <>
                  <div className="flex-1 reschedulebtn">
                    <RescheduleAppointmentDialog
                    handleCloseReschedule={handleCloseReschedule}
                    openReschedule={openReschedule}
                    setOpenReschedule={setOpenReschedule}
                    fetchAppointments={fetchAppointments}
                    appointment={app}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1! border-emerald-500 text-emerald-500"
                      >
                        <SquarePen className="size-4 mr-1" /> Reschedule
                      </Button>
                    }
                  />
                  </div>
                  <CancelAppointmentDialog
                    appointment={app}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-destructive text-destructive"
                      >
                        <X className="size-4 mr-1" /> Cancel
                      </Button>
                    }
                    onConfirm={(app: any) => {
                      // TODO: implement cancellation logic (API call)
                      console.log("cancelled", app.id);
                      handleCancel(app.id ?? "")
                    }}
                  />
                </>
              )}
              {app.status === "Past" && (
                <Button className="w-full" variant="outline">
                  View Session Notes
                </Button>
              )}
            </div>
          </div>
        )}
    </Card>
  );
}
