"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Star,
  ArrowLeft,
  Download,
  RefreshCw,
  RefreshCcw,
  Clipboard,
} from "lucide-react";
import { useSearchParams } from "react-router";

import { useAuth } from "@/modules/main/context/auth.context";
import { useEffect, useState, Suspense, lazy } from "react";
import { dashboardApi } from "@/api/dashboard.service";
import dayjs from "dayjs";
import { RatingStars } from "@/modules/main/components/rating";
import { toast } from "react-toastify";
import RequestRefillDialog from "@/modules/main/components/dashboard/RequestRefillDialog";
import { useNavigate } from "react-router";
import BreathingExercise from "@/modules/main/components/company/BreathingExercise";
import { useDebounce } from "@/hooks/useDebounce";
import { Link } from "react-router";

const VideoCall = lazy(() => import("./video"));

function DashboardContent() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);
  const [isVideoSession, setIsVideoSession] = useState(false);
  const [connection, setConnection] = useState<any>(null);

  const { user, getProfile } = useAuth();
  const [moodOptions, setMoodOptions] = useState<any>([]);
  const [moodHistory, setMoodHistory] = useState<any>(0);
  const [dashboardData, setDashboardData] = useState<any>({
    nextAppointmentLoading: false,
    nextAppointment: null,
  });
  const handleRefill = async (id: any, values: any) => {
    try {
      const role = localStorage.getItem("role") || "";

      await dashboardApi.postRequestRefill(role?.toLocaleLowerCase(), id, {
        message: values.notes || "Need refill",
      });

      toast.success("Refill requested successfully");
      // onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to request refill");
    }
  };
  const handleDownload = async (id: any) => {
    try {
      if (typeof window === "undefined") return;
      const role = localStorage.getItem("role") || "";

      const res: any = await dashboardApi.downloadPrescription(
        role.toLowerCase(),
        id,
      );
      const blob = new Blob([res], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `prescription-${id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Prescription downloaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download prescription");
    }
  };
  const handleDashboard = async () => {
    const role =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("role")?.toLocaleLowerCase()
        : "";

    setDashboardData((prev: any) => ({
      ...prev,
      nextAppointmentLoading: true,
    }));

    try {
      const [
        dashboardRes,
        sessionRes,
        appointmentsRes,
        activeRes,
        mentalPlansRes,
      ] = await Promise.allSettled([
        dashboardApi.getDashboardData(role ?? ""),
        dashboardApi.getSessionData(role ?? ""),
        dashboardApi.getAppointments(role ?? "", search || ""),
        dashboardApi.getActivePrescriptions(role ?? "", search || ""),
        dashboardApi.getMentalPlans(role ?? ""),
      ]);

      let updatedData: any = {};

      if (dashboardRes.status === "fulfilled") {
        updatedData = {
          ...updatedData,
          ...dashboardRes.value.data,
          nextAppointment: dashboardRes.value?.data?.nextAppointment,
        };
      }

      if (sessionRes.status === "fulfilled") {
        updatedData = {
          ...updatedData,
          sessionData: sessionRes.value?.data,
        };
      }

      if (appointmentsRes.status === "fulfilled") {
        const recentAppointment = (
          appointmentsRes.value?.data?.appointments ?? []
        )
          .filter((item: any) => item.status === "completed")
          .sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
        updatedData = {
          ...updatedData,
          recentAppointment: recentAppointment,
        };
      }
      if (activeRes.status === "fulfilled") {
        updatedData = {
          ...updatedData,
          prescriptions: activeRes.value?.data?.prescriptions ?? [],
        };
      }
      if (mentalPlansRes.status === "fulfilled") {
        updatedData = {
          ...updatedData,
          mentalPlans: mentalPlansRes.value?.data?.plans ?? [],
        };
      }

      setDashboardData((prev: any) => ({
        ...prev,
        ...updatedData,
      }));
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setDashboardData((prev: any) => ({
        ...prev,
        nextAppointmentLoading: false,
      }));
    }
  };
  const handleMoodChange = async (value: string) => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";

      const payload = {
        moodScore: value,
      };

      const res = await dashboardApi.postMoodApi(role || "", payload);

      handleMoodHistory();
    } catch (error: any) {
      console.error("Mood API Error:", error);
    }
  };
  const handleMoodOption = async () => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";

      const res = await dashboardApi.getMoodOptions(role || "");
      setMoodOptions(res?.data?.options ?? []);
    } catch (error: any) {
      console.error("Mood Options API Error:", error);
    }
  };
  const handleMoodHistory = async () => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";

      const res = await dashboardApi.getMoodHistory(role || "");
      const selected = res?.data?.moodLogs?.[0]?.moodScore;
      setMoodHistory(selected ?? 0);
    } catch (error: any) {
      console.error("Mood History API Error:", error);
    }
  };
  const handleChat = async () => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";

      const res = await dashboardApi.getMessageProvider(role || "", {
        providerId: dashboardData.nextAppointment?.providerId?._id,
      });
      router(`/dashboard/messages?chatId=${res?.data?.chat?._id}`);
    } catch (error: any) {
      console.error("Something went wrong:", error);
    }
  };
  useEffect(() => {
    getProfile();
    handleMoodOption();
    handleMoodHistory();
    handleDashboard();
  }, []);
  useEffect(() => {
    handleDashboard();
  }, [search]);

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
    return (
      <Suspense fallback={<div>Loading video session...</div>}>
        <VideoCall connection={connection} />
      </Suspense>
    );
  }
  return (
    <div className="space-y-4 ">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">
            Welcome back, {user?.firstName ?? ""} {user?.lastName ?? ""}{" "}
            <span className="ml-1">👋</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your mental health overview for today
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <Button className="bg-gradient-dash ">
              <ArrowLeft className="size-4" /> Back To website
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-8">
          <CardHeader>
            <div>
              <CardTitle>Upcoming Session</CardTitle>
            </div>
          </CardHeader>
          {dashboardData?.nextAppointmentLoading ? (
            <CardContent className="flex justify-between gap-6 animate-pulse">
              <div className="flex gap-4 w-full">
                <div className="size-20 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 w-40 rounded" />
                  <div className="h-3 bg-gray-200 w-32 rounded" />
                  <div className="h-3 bg-gray-200 w-52 rounded" />
                  <div className="h-3 bg-gray-200 w-40 rounded" />
                </div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded" />
            </CardContent>
          ) : dashboardData?.sessionData?.sessions?.length > 0 ? (
            dashboardData?.sessionData?.sessions
              ?.slice(0, 1)
              ?.map((item: any) => (
                <CardContent
                  key={item._id}
                  className="flex justify-between gap-6"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <Avatar className="size-20 border border-slate-100 bg-white">
                      <AvatarFallback>
                        {`${item?.appointmentId?.providerId?.firstName?.[0] || ""}${
                          item?.appointmentId?.providerId?.lastName?.[0] || ""
                        }`}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">
                            Dr. {item?.appointmentId?.providerId?.firstName}{" "}
                            {item?.appointmentId?.providerId?.lastName}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {item?.appointmentId?.providerId?.specialty}
                          </div>

                          <div className="mt-2 flex flex-col text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4" />
                              <span>
                                {dayjs(item?.appointmentId?.date).format(
                                  "MMMM DD, YYYY",
                                )}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="size-4" />
                              <span>
                                {dayjs(item?.startTime).format("hh:mm A")} -{" "}
                                {dayjs(item?.endTime).format("hh:mm A")}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Video className="size-4" />
                              <span className="capitalize">
                                {item?.appointmentId?.type} Consultation
                              </span>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                              <Calendar className="size-4" />
                              <span>Telehealth</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={item?.status === "completed"}
                    className="bg-gradient-dash"
                    onClick={() => handleStartSession(item?._id)}
                  >
                    <Video className="size-4 mr-2" /> Join Call
                  </Button>
                </CardContent>
              ))
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Video className="mb-2 size-8 opacity-20" />
              <p>No upcoming sessions today.</p>
            </CardContent>
          )}
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <div>
              <CardTitle>Next Appointment</CardTitle>
            </div>
          </CardHeader>
          {dashboardData?.nextAppointmentLoading ? (
            <CardContent className="flex flex-col gap-4 animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
              </div>
              <div className="space-y-2 flex flex-col">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded mt-1" />
              </div>
            </CardContent>
          ) : dashboardData?.nextAppointment ? (
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Provider</div>
                  <div className="font-medium">
                    {dashboardData.nextAppointment?.providerId?.firstName ?? ""}{" "}
                    {dashboardData.nextAppointment?.providerId?.lastName ?? ""}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                    {dashboardData.nextAppointment?.status ?? ""}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div className="font-medium mt-1">
                  {dashboardData.nextAppointment?.date
                    ? dayjs(dashboardData.nextAppointment?.date).format(
                        "MMMM D, YYYY",
                      )
                    : ""}
                  <br />
                  {dashboardData.nextAppointment?.time
                    ? dashboardData.nextAppointment?.time
                    : ""}
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Calendar className="mb-2 size-8 opacity-20" />
              <p>No upcoming appointments.</p>
            </CardContent>
          )}
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader>
            <CardTitle>My Providers</CardTitle>
          </CardHeader>
          {dashboardData?.nextAppointmentLoading ? (
            <CardContent className="flex flex-col items-center gap-4 animate-pulse">
              <div className="size-20 rounded-full bg-gray-200" />
              <div className="space-y-2 flex flex-col items-center">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
              <div className="w-full h-8 bg-gray-200 rounded mt-2" />
            </CardContent>
          ) : dashboardData?.nextAppointment?.providerId ? (
            <CardContent className="flex flex-col items-center gap-4 ">
              <Avatar className="size-20 ">
                <AvatarFallback>
                  {dashboardData.nextAppointment?.providerId?.firstName?.charAt(
                    0,
                  )}
                  {dashboardData.nextAppointment?.providerId?.lastName?.charAt(
                    0,
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <div className="font-medium">
                  {dashboardData.nextAppointment?.providerId?.firstName ?? ""}{" "}
                  {dashboardData.nextAppointment?.providerId?.lastName ?? ""}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dashboardData.nextAppointment?.providerId?.specialty ?? ""}
                </div>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    <RatingStars
                      rating={
                        dashboardData?.nextAppointment?.providerId?.rating ?? 0
                      }
                    />
                    <span className="text-sm font-semibold">
                      {dashboardData?.nextAppointment?.providerId?.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Button
                  variant="outline"
                  onClick={() => handleChat()}
                  size="sm"
                  className="w-full border-primary text-primary"
                >
                  <MessageSquare className="size-4 mr-2" /> Message
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <MessageSquare className="mb-2 size-8 opacity-20" />
              <p>No assigned providers.</p>
            </CardContent>
          )}
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader>
            <CardTitle>Mental Health Plan</CardTitle>
          </CardHeader>
          {dashboardData?.nextAppointmentLoading ? (
            <CardContent className="animate-pulse space-y-4">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-200 rounded" />

              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-2 w-full bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            </CardContent>
          ) : dashboardData?.mentalPlans?.length > 0 ? (
            <CardContent>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  current plan
                </div>
                <div className="text-sm ">
                  {dashboardData?.mentalPlans?.[0]?.title}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>Progress</div>
                  <div className="font-medium">
                    {dashboardData?.mentalPlans?.[0]?.progress}%
                  </div>
                </div>

                <div className="mt-2 h-2 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-dash"
                    style={{
                      width: `${dashboardData?.mentalPlans?.[0]?.progress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 text-sm text-muted-foreground">
                  Sessions
                  <br />
                  <span className="font-medium">
                    {dashboardData?.mentalPlans?.[0]?.completedSessions} of{" "}
                    {dashboardData?.mentalPlans?.[0]?.totalSessions} completed
                  </span>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground h-full">
              <Star className="mb-2 size-8 opacity-20" />
              <p>No active mental health plans.</p>
            </CardContent>
          )}
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <CardTitle>Today&apos;s Focus</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select onValueChange={handleMoodChange} value={moodHistory}>
              <SelectTrigger className="w-full bg-accent mt-5">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>

              <SelectContent>
                {(moodOptions ?? []).map((option: any) => (
                  <SelectItem key={option.score} value={option.score}>
                    {option.emoji} - {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="rounded-lg bg-primary/10 p-3">
              <div className="text-sm ">Daily Reminder</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Take a moment to practice deep breathing
              </div>
            </div>

            <div>
              <BreathingExercise />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments + Active Prescriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>

          <CardContent className="overflow-x-auto max-h-112.5 overflow-y-auto p-0">
            <table className="w-full">
              <thead className="text-sm text-muted-foreground">
                <tr className="border-b">
                  <th className="text-left py-4 px-2 pl-4">Therapist</th>
                  <th className="text-left py-4 px-2">Date</th>
                  <th className="text-left py-4 px-2">Time</th>
                  <th className="text-left py-4 px-2">Status</th>
                  {/* <th className="text-left py-4 px-2 pr-4"> </th> */}
                </tr>
              </thead>
              {dashboardData?.nextAppointmentLoading ? (
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b animate-pulse">
                      <td className="py-4 px-2 pl-4">
                        <div className="h-3 w-32 bg-gray-200 rounded" />
                      </td>
                      <td className="py-4 px-2">
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                      </td>
                      <td className="py-4 px-2">
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                      </td>
                      <td className="py-4 px-2">
                        <div className="h-5 w-20 bg-gray-200 rounded" />
                      </td>
                      {/* <td className="py-4 px-2 pr-4">
                        <div className="h-3 w-10 bg-gray-200 rounded" />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              ) : dashboardData?.recentAppointment?.length > 0 ? (
                <tbody className="text-sm">
                  {dashboardData?.recentAppointment
                    ?.slice(0, 3)
                    .map((item: any, index: number) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-4 px-2 pl-4">
                          Dr. {item?.providerId?.firstName}{" "}
                          {item?.providerId?.lastName}
                        </td>

                        <td className="py-4 px-2">
                          {dayjs(item?.date).format("MMM DD, YYYY")}
                        </td>

                        <td className="py-4 px-2">{item?.time}</td>

                        <td className="py-4 px-2">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                            {item?.status}
                          </Badge>
                        </td>

                        {/* <td className="py-4 px-2 pr-4">
                        <Link to="#" className="text-primary">
                          View
                        </Link>
                      </td> */}
                      </tr>
                    ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No recent appointments found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Active Prescriptions</CardTitle>
          </CardHeader>
          {dashboardData?.nextAppointmentLoading ? (
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-lg bg-muted p-4 animate-pulse">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                      <div className="h-3 w-32 bg-gray-200 rounded" />
                    </div>
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                  </div>

                  <div className="mt-4 flex gap-3">
                    <div className="h-10 w-full bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </CardContent>
          ) : dashboardData?.prescriptions?.length > 0 ? (
            <CardContent className="space-y-4 max-h-112.5 overflow-y-auto">
              {dashboardData?.prescriptions?.map((prescription: any) =>
                prescription?.medications?.map((med: any) => (
                  <div key={med._id} className="rounded-lg bg-muted p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{med?.name}</div>

                        <div className="text-sm text-muted-foreground">
                          {med?.frequency}
                        </div>
                      </div>

                      <div>
                        <div className="rounded-full border px-2 py-1 text-xs">
                          {prescription?.refillsRemaining} refills
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <RequestRefillDialog
                        prescription={med}
                        handleRefill={handleRefill}
                        trigger={
                          <Button className="bg-gradient-dash text-white flex-1 hover:opacity-90">
                            <RefreshCcw className="mr-1.5 size-3.5" />
                            Refill
                          </Button>
                        }
                      />
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleDownload(prescription._id)}
                        disabled={dashboardData?.nextAppointmentLoading}
                      >
                        <Download className="mr-2 size-4" /> Download
                      </Button>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Clipboard className="mb-2 size-8 opacity-20" />
              <p>No active prescriptions.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
