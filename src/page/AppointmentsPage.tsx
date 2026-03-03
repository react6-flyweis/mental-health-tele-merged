import { useState } from "react";
import { usePageTitle } from "@/store/pageTitleStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// extracted components
import AppointmentTable from "@/components/appointments/AppointmentTable";
import type { Appointment } from "@/components/appointments/AppointmentTable";
import AppointmentDialog from "@/components/appointments/AppointmentDialog";

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    patientId: "#PT000001",
    name: "John Doe",
    initials: "J",
    date: "Feb 2, 2026",
    time: "10:00 AM",
    type: "Initial Consultation",
    status: "confirmed",
    reason:
      "Routine mental health check-up and discussion of recent anxiety symptoms.",
    notes: "",
  },
  {
    id: 2,
    name: "Emily Smith",
    initials: "E",
    date: "Feb 2, 2026",
    time: "11:30 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    name: "Michael Brown",
    initials: "M",
    date: "Feb 3, 2026",
    time: "2:00 PM",
    type: "Therapy Session",
    status: "pending",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    initials: "S",
    date: "Feb 4, 2026",
    time: "4:00 PM",
    type: "Medication Review",
    status: "confirmed",
  },
  {
    id: 5,
    name: "Alex Turner",
    initials: "A",
    date: "Feb 1, 2026",
    time: "9:00 AM",
    type: "Follow-up",
    status: "completed",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    initials: "L",
    date: "Jan 31, 2026",
    time: "10:30 AM",
    type: "Initial Consultation",
    status: "completed",
  },
  {
    id: 7,
    name: "David Lee",
    initials: "D",
    date: "Jan 30, 2026",
    time: "3:00 PM",
    type: "Therapy Session",
    status: "completed",
  },
  {
    id: 8,
    name: "Robert Wilson",
    initials: "R",
    date: "Jan 29, 2026",
    time: "11:00 AM",
    type: "Follow-up",
    status: "cancelled",
  },
  {
    id: 9,
    name: "Maria Garcia",
    initials: "M",
    date: "Jan 28, 2026",
    time: "2:30 PM",
    type: "Therapy Session",
    status: "cancelled",
  },
];

export default function AppointmentsPage() {
  usePageTitle("Appointments");
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = SAMPLE_APPOINTMENTS.filter((a) => {
    switch (currentTab) {
      case "upcoming":
        return a.status === "confirmed" || a.status === "pending";
      case "completed":
        return a.status === "completed";
      case "cancelled":
        return a.status === "cancelled";
      default:
        return true;
    }
  });

  function handleDetails(appt: Appointment) {
    setSelected(appt);
    setDialogOpen(true);
  }

  return (
    <>
      <Card>
        <Tabs
          defaultValue="upcoming"
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v)}
          className="h-auto!"
        >
          <TabsList variant="line" className="">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="p-0">
            <AppointmentTable data={filtered} onDetails={handleDetails} />
          </TabsContent>
          <TabsContent value="completed" className="p-0">
            <AppointmentTable data={filtered} onDetails={handleDetails} />
          </TabsContent>
          <TabsContent value="cancelled" className="p-0">
            <AppointmentTable data={filtered} onDetails={handleDetails} />
          </TabsContent>
        </Tabs>
      </Card>

      {selected && (
        <AppointmentDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
            setDialogOpen(open);
          }}
          appointment={selected}
        />
      )}
    </>
  );
}
