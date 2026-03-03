import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CircleAlert,
  Clock3,
  DollarSign,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router";

const STATS = [
  {
    label: "Today's Appointments",
    value: "8",
    icon: Calendar,
  },
  {
    label: "Today's Earnings",
    value: "$2,450",
    icon: DollarSign,
  },
  {
    label: "Pending Follow-ups",
    value: "2",
    icon: Clock3,
  },
  {
    label: "Total Sessions (Month)",
    value: "156",
    icon: Video,
  },
];

const APPOINTMENTS = [
  { name: "John Doe", time: "10:00 AM", initials: "J" },
  { name: "Emily Smith", time: "11:30 AM", initials: "E" },
  { name: "Michael Brown", time: "2:00 PM", initials: "M" },
  { name: "Sarah Johnson", time: "4:00 PM", initials: "S" },
];

const ALERTS = [
  { message: "New appointment request from James Carter", time: "10m ago" },
  { message: "Patient message from Emily Smith", time: "25m ago" },
  { message: "Prescription refill request - John Doe", time: "1h ago" },
];

// additional data shown in the new sections
const UPCOMING = [
  { name: "Alex Turner", time: "Feb 3, 2026 at 9:00 AM" },
  { name: "Lisa Anderson", time: "Feb 4, 2026 at 10:30 AM" },
  { name: "David Lee", time: "Feb 5, 2026 at 3:00 PM" },
];

const PENDING = [
  { name: "Robert Wilson", reason: "Anxiety follow-up", due: "2 days overdue" },
  { name: "Maria Garcia", reason: "Medication review", due: "Due today" },
];

const EARNINGS = {
  today: "$2,450",
  week: "$12,800",
  month: "$48,500",
};

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-slate-800">
            Welcome back, Dr.Sarah 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your mental health overview for today
          </p>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-dash text-white hover:opacity-95"
        >
          <ArrowLeft className="size-4" />
          Back To website
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="py-5">
            <CardContent className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-dash text-white">
                <Icon className="size-5" />
              </div>
              <p className="text-3xl font-semibold leading-none text-slate-800">
                {value}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="py-0">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-xl font-semibold">
              Today&apos;s Appointments
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 py-4">
            {APPOINTMENTS.map((appointment) => (
              <div
                key={appointment.name}
                className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 bg-slate-200 text-slate-600">
                    <AvatarFallback>{appointment.initials}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-base font-medium text-slate-700">
                      {appointment.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time}
                    </p>
                  </div>
                </div>

                <Button className="bg-gradient-dash px-4 text-white hover:opacity-95">
                  Join Call
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-xl font-semibold">Alerts</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 py-4">
            {ALERTS.map((alert) => (
              <div
                key={alert.message}
                className="rounded-lg border border-amber-300/80 bg-amber-50/60 px-4 py-3"
              >
                <div className="flex items-start gap-2">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm text-slate-700">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* new sections: upcoming consultations, follow-ups, earnings */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="py-0">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-xl font-semibold">
                Upcoming Consultations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 py-4">
              {UPCOMING.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="text-base font-medium text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="py-0">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-xl font-semibold">
                Pending Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 py-4">
              {PENDING.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between  bg-muted/40 border-l-4 border-primary px-4 py-3"
                >
                  <div>
                    <p className="text-base font-medium text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.reason}
                    </p>
                    <p className="text-xs text-red-600">{item.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="py-0">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-xl font-semibold">
              Earnings Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-semibold text-slate-800">
                  {EARNINGS.today}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-semibold text-slate-800">
                  {EARNINGS.week}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-semibold text-slate-800">
                  {EARNINGS.month}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
