"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateSupportTicketDialog from "@/modules/main/components/dashboard/CreateSupportTicketDialog";
import {
  CircleHelp,
  MessageSquare,
  ChevronDown,
  Plus,
  Square,
} from "lucide-react";
import { useEffect } from "react";
import { settingApi } from "@/api/setting.api";
import EmergencyButton from "@/modules/main/components/dashboard/EmergencyButton";
import { dashboardApi } from "@/api/dashboard.service";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/modules/main/context/auth.context";
import { useDebounce } from "@/hooks/useDebounce";

type Ticket = {
  id: string;
  title: string;
  category: "Technical" | "Billing" | "Medical";
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  createdDate: string;
  updatedAgo: string;
  messagesCount: number;
};

const statusColorMap: Record<Ticket["status"], string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-100",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const priorityColorMap: Record<Ticket["priority"], string> = {
  High: "bg-rose-50 text-rose-700 border-rose-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

function SupportContent() {
  const router = useNavigate();
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);
  type Message = {
    sender: "me" | "other";
    text: string;
  };

  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const fetchTickets = async () => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("patientToken");
    if (!token) return;
    setLoading(true);

    try {
      const res = await settingApi.getSupport("patient", search || "");

      if (res?.data?.tickets) {
        setTickets(res.data.tickets.map(transformTicket));
        setMessages(() => {
          const msgMap: Record<string, Message[]> = {};

          res.data.tickets.forEach((t: any) => {
            msgMap[t._id] = [
              ...(t.replies || []).map((r: any) => ({
                sender: r.authorType === "patient" ? "me" : "other",
                text: r.message,
              })),
            ];
          });

          return msgMap;
        });
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search]);

  const handleSendReply = async (ticketId: string) => {
    try {
      const res = await dashboardApi.sendSupportReply("patient", ticketId, {
        message: replyText[ticketId],
      });
      if (res?.data) {
        setMessages((prev) => ({
          ...prev,
          [ticketId]: [
            ...(prev[ticketId] || []),
            { sender: "me", text: replyText[ticketId] },
          ],
        }));
        setReplyText((prev) => ({ ...prev, [ticketId]: "" }));
      }
    } catch (err) {
      console.error("Error sending reply", err);
    }
  };
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const mapStatus = (status: string): Ticket["status"] => {
    if (status === "open") return "Open";
    if (status === "in-progress") return "In Progress";
    return "Resolved";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  const transformTicket = (t: any): Ticket => ({
    id: t._id,
    title: t.subject,
    category: capitalize(t.category) as Ticket["category"],
    status: mapStatus(t.status),
    priority: capitalize(t.priority) as Ticket["priority"],
    createdDate: formatDate(t.createdAt),
    updatedAgo: timeAgo(t.updatedAt),
    messagesCount: t.replies?.length || 0,
  });

  function openTicketDialog() {
    setIsTicketDialogOpen(true);
  }

  function handleDialogChange(open: boolean) {
    setIsTicketDialogOpen(open);
  }

  const handleChat = async () => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";
      const res = await dashboardApi.postAdminMessage(role || "");
      const adminId = res?.data?.chat?.adminId;
      router(`/dashboard/messages?chatId=${res?.data?.chat?._id}`);
    } catch (error: any) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-medium leading-tight">Support Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get help and answers to your questions
          </p>
        </div>

        <Card className="overflow-hidden border-0 bg-gradient-dash text-white">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <h2 className="text-base font-medium">Need Immediate Help?</h2>
              <p className="mt-1 text-sm text-white/90">
                Our support team is available 24/7 to assist you
              </p>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={openTicketDialog}
                  className="bg-white text-primary hover:bg-white/95"
                >
                  <Plus className="mr-1 size-4" /> Create Support Ticket
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleChat()}
                  className="bg-white text-primary hover:bg-white/95"
                >
                  <Square className="mr-1 size-3" /> Live Chat
                </Button>
              </div>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-full border-4 border-white/30 sm:flex">
              <CircleHelp className="size-7 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium">
                My Support Tickets
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={openTicketDialog}
                className="border-primary/50 text-primary hover:bg-primary/5"
              >
                <Plus className="mr-1 size-3" /> New Ticket
              </Button>
            </CardHeader>

            <CardContent className="space-y-3 max-h-200 overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                </div>
              ) : tickets.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-10">
                  No tickets found
                </p>
              ) : (
                <div>
                  {tickets.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-2">
                      Thanks, we will check this.
                    </div>
                  )}

                  {tickets.map((ticket) => {
                    const isOpen = openReplyId === ticket.id;
                    const ticketMessages = messages[ticket.id] || [];
                    return (
                      <div
                        key={ticket.id}
                        className="rounded-lg lg:rounded-xl p-3 lg:p-6 border bg-white mb-4 last:mb-0"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium">
                            {ticket.title}
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${statusColorMap[ticket.status]}`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                            {ticket.category}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-md ${priorityColorMap[ticket.priority]}`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                        <div className="mt-4 flex items-end justify-between text-xs text-muted-foreground">
                          <span>Created {ticket.createdDate}</span>
                          <div className="flex items-center gap-4">
                            <span>Updated {ticket.updatedAgo}</span>
                            <button
                              onClick={() =>
                                setOpenReplyId(isOpen ? null : ticket.id)
                              }
                              className="flex items-center gap-1"
                            >
                              <MessageSquare className="size-3" />
                              {ticket.messagesCount}
                              <span className="">Message</span>
                              <ChevronDown
                                className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                          </div>
                        </div>
                        {isOpen && (
                          <div className="mt-4 border-t pt-4 space-y-3">
                            <div className="space-y-2 max-h-50 overflow-auto">
                              {ticketMessages.map((msg, i) => (
                                <div
                                  key={i}
                                  className={`flex items-start gap-2 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                  {msg.sender !== "me" && (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[8px] font-semibold">
                                      Admin
                                    </div>
                                  )}
                                  <div
                                    className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === "me" ? "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800"}`}
                                  >
                                    {msg.text}
                                  </div>
                                  {msg.sender === "me" && (
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-semibold">
                                      {user?.firstName?.charAt(0) || ""}
                                      {user?.lastName?.charAt(0) || ""}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-1 items-center mt-5">
                              <input
                                value={replyText[ticket.id] || ""}
                                onChange={(e) =>
                                  setReplyText((prev) => ({
                                    ...prev,
                                    [ticket.id]: e.target.value,
                                  }))
                                }
                                placeholder="Write your reply..."
                                className="w-full flex-1 border rounded-lg p-2 text-sm outline-none"
                              />
                              <button
                                onClick={() => {
                                  handleSendReply(ticket.id);
                                }}
                                className="py-2 px-5 bg-gradient-dash text-white rounded-lg text-sm"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email Support</p>
                  <p className="font-medium">support@mindcare.com</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Phone Support</p>
                  <p className="font-medium">1-800-MINDCARE</p>
                  <p className="text-xs text-muted-foreground">
                    Available 24/7
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Response Time</p>
                  <p className="font-medium">Within 2 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/25 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-destructive">
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-destructive">
                  If you&apos;re in crisis, please call 988 (Suicide &amp;
                  Crisis Lifeline) or 911 immediately.
                </p>
                <EmergencyButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateSupportTicketDialog
        open={isTicketDialogOpen}
        onOpenChange={handleDialogChange}
        onSuccess={fetchTickets}
      />
    </>
  );
}

export default function SupportPage() {
  return (
    <Suspense fallback={<div>Loading support...</div>}>
      <SupportContent />
    </Suspense>
  );
}
