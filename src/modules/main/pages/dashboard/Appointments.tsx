"use client";

import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { AppointmentCard } from "@/modules/main/components/dashboard/AppointmentCard";
import { Calendar } from "lucide-react";
import { dashboardApi } from "@/api/dashboard.service";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";

const VideoCall = dynamic(() => import("./video"), {
  ssr: false,
  loading: () => <div>Loading video session...</div>,
});

function AppointmentsContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);

  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVideoSession, setIsVideoSession] = useState(false);
  const [connection, setConnection] = useState<any>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getAppointments("patient", search || "");
      setAppointments(res?.data?.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [search]);
  const handleCancelApp = () => {
    setAppointments([]);

    fetchAppointments();
  };
  const mappedAppointments = appointments.map((item) => {
    const provider = item?.providerId;

    return {
      id: item?._id,
      providerId: provider?._id,
      providerName: `${provider?.firstName || ""} ${provider?.lastName || ""}`,
      specialty: provider?.specialty || "",
      initials: `${provider?.firstName?.[0] || ""}${provider?.lastName?.[0] || ""}`,
      date: new Date(item?.date).toDateString(),
      time: item?.time,
      duration: item?.sessionDurationMinutes,
      type: item?.type === "video" ? "Video Call" : "Audio Call",
      status:
        item?.status === "confirmed"
          ? "Confirmed"
          : item?.status === "cancelled"
            ? "Cancelled"
            : item?.status === "completed"
              ? "Past"
              : "Pending",
    };
  });

  const filtered = mappedAppointments.filter((a) => {
    if (tab === "upcoming")
      return a.status === "Confirmed" || a.status === "Pending";
    if (tab === "past") return a.status === "Past";
    if (tab === "cancelled") return a.status === "Cancelled";
    return false;
  });

  const next = mappedAppointments.find((a) => a.status === "Confirmed");

  function formatBannerDate(app: any) {
    if (!app) return "";
    const today = new Date();
    const parsed = new Date(app.date);
    const diff = parsed.setHours(0, 0, 0) - today.setHours(0, 0, 0);
    if (diff === 0) return "today";
    if (diff === 24 * 60 * 60 * 1000) return "tomorrow";
    return `on ${app.date}`;
  }
  const handleStartSession = async (id: string) => {
    try {
      const res = await dashboardApi.postSessionData("patient", {
        sessionId: id,
      });

      setIsVideoSession(true);
      setConnection(res?.data?.connection || null);
      toast.success("Session started successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to start session");
    }
  };
  if (isVideoSession) {
    return <VideoCall connection={connection} />;
  }
  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-medium">My Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your therapy sessions
        </p>
      </div>

      {next && (
        <div className="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-800 flex items-center">
          <Calendar className="size-4 mr-2" />
          You have an upcoming session with {next?.providerName}{" "}
          {formatBannerDate(next)} at {next?.time}
        </div>
      )}

      <div className="flex space-x-2 bg-muted p-1 w-fit rounded-full">
        {(["upcoming", "past", "cancelled"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1 rounded-full text-sm",
              tab === t ? "bg-gradient-dash text-white" : "hover:bg-muted/80",
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading &&
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-30 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground">
            No appointments to show.
          </p>
        )}

        {!loading &&
          filtered.map((app) => (
            <AppointmentCard
              fetchAppointments={fetchAppointments}
              handleStartSession={handleStartSession}
              key={app.id}
              appointment={app}
              handleCancelApp={handleCancelApp}
            />
          ))}
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div>Loading appointments...</div>}>
      <AppointmentsContent />
    </Suspense>
  );
}
