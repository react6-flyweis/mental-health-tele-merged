"use client";
import { dashboardApi } from "@/api/dashboard.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock3, Video } from "lucide-react";
import { useEffect, useState, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";

const VideoCall = lazy(() => import("./video"));

function VideoSessionsContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVideoSession, setIsVideoSession] = useState(false);
  const [connection, setConnection] = useState<any>(null);
  const [sessionTab, setSessionTab] = useState<"upcoming" | "completed">(
    "upcoming",
  );

  const fetchSession = async () => {
    try {
      setLoading(true);
      const res = await dashboardApi.getSessionData("patient", search || "");
      setSessions(res?.data?.sessions || []);
    } catch (error) {
      console.error("Error fetching video sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [search]);

  const filteredSessions = useMemo(() => {
    if (!sessions) return [];

    if (sessionTab === "completed") {
      return sessions.filter((item: any) => item?.status === "completed");
    }

    return sessions.filter((item: any) => item?.status !== "completed");
  }, [sessions, sessionTab]);

  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<{
    camera: string;
    mic: string;
  } | null>(null);

  const handleTestAV = async () => {
    try {
      setChecking(true);
      setStatus(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      setStatus({
        camera: videoTracks.length > 0 ? "Working ✅" : "Not detected ❌",
        mic: audioTracks.length > 0 ? "Working ✅" : "Not detected ❌",
      });

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error(error);
      setStatus({
        camera: "Permission denied ❌",
        mic: "Permission denied ❌",
      });
    } finally {
      setChecking(false);
    }
  };
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
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-medium">Audio/Video Sessions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join your secure therapy sessions
        </p>
      </div>

      <Card className="bg-gradient-dash border-0 p-0 text-white">
        <div className="px-4 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-medium">Next Session Starting Soon</p>
            <p className="mt-1 text-sm text-white/90">
              Your session will start soon
            </p>
            <Button
              variant="secondary"
              disabled={!filteredSessions[0]?._id}
              className="mt-4 bg-white text-primary hover:bg-white/90"
              onClick={() => handleStartSession(filteredSessions[0]?._id ?? "")}
            >
              <Video className="size-4 mr-2" /> Join Session Now
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="size-20 md:size-24 rounded-full bg-white/20 flex items-center justify-center">
              <Clock3 className="size-10" />
            </div>
            <span className="text-xs text-white/90">--:--:--</span>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Sessions</h2>

        <div className="inline-flex rounded-full bg-muted p-1">
          {(["upcoming", "completed"] as const).map((tabItem) => (
            <button
              key={tabItem}
              onClick={() => setSessionTab(tabItem)}
              className={cn(
                "rounded-full px-5 py-1.5 text-sm capitalize transition-all",
                tabItem === sessionTab
                  ? "bg-gradient-dash text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tabItem}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="p-4 sm:p-5 animate-pulse">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-full bg-gray-200" />

                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                        <div className="h-3 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-52 bg-gray-200 rounded" />
                        <div className="h-8 w-32 bg-gray-200 rounded" />
                      </div>
                    </div>

                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                </Card>
              ))
          ) : filteredSessions?.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              <p className="text-base font-medium">
                No {sessionTab === "upcoming" ? "upcoming" : "completed"}{" "}
                sessions found.
              </p>
              <p className="mt-2 text-sm">
                Check back later or schedule a new session with your provider.
              </p>
            </Card>
          ) : (
            filteredSessions.map((item: any) => {
              const provider = item?.appointmentId?.providerId;

              return (
                <Card key={item?._id} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-12 border border-slate-100 bg-white">
                        <AvatarFallback>
                          {provider?.firstName?.[0]}
                          {provider?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <div>
                          <p className="text-base font-medium leading-none">
                            {provider?.firstName} {provider?.lastName}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {provider?.specialty}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            {new Date(item?.appointmentId?.date).toDateString()}
                          </span>
                          <span>•</span>
                          <span>{item?.appointmentId?.time}</span>
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handleStartSession(item?._id)}
                          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          <Video className="size-4 mr-2" /> Join Session
                        </Button>
                      </div>
                    </div>

                    <Badge className="bg-blue-100 text-blue-700">
                      {item?.status}
                    </Badge>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>

      <Card className="rounded-lg border border-sky-200 bg-sky-50 p-6">
        <div className="flex flex-col items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-sky-800">Need Help?</h3>
            <p className="mt-1 text-sm text-sky-700">
              Make sure your camera and microphone are working properly before
              joining the session.
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-100 mt-3 sm:mt-0"
              onClick={handleTestAV}
              disabled={checking}
            >
              {checking ? "Checking..." : "Test Audio & Video"}
            </Button>
          </div>

          {status && (
            <div className="text-sm text-sky-700 mt-2">
              <p>Camera: {status.camera}</p>
              <p>Microphone: {status.mic}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading video sessions...</div>}>
      <VideoSessionsContent />
    </Suspense>
  );
}
