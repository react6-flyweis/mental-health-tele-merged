import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { usePageTitle } from "@/store/pageTitleStore";
import {
  Clock3,
  FilePlus2,
  MessageSquare,
  Mic,
  PhoneOff,
  Video,
} from "lucide-react";

const PATIENT_DETAILS = [
  { label: "Age", value: "32" },
  { label: "Last Session", value: "Jan 15" },
  { label: "Total Sessions", value: "8" },
];

export default function SingleVideoSessionPage() {
  usePageTitle("Video Sessions");

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="space-y-3">
        <div className="relative min-h-80 overflow-hidden rounded-xl bg-slate-950 sm:min-h-94">
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
            <Clock3 className="size-3" />
            <span>00:01</span>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center gap-3 sm:min-h-94">
            <Avatar className="size-16 bg-slate-700 text-2xl text-slate-100">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-lg text-slate-100">John Doe</p>
          </div>

          <div className="absolute bottom-3 right-3 flex h-24 w-32 items-center justify-center rounded-lg bg-slate-800/55 ring-1 ring-white/10">
            <Avatar className="size-11 bg-slate-600 text-slate-200">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl border bg-card px-3 py-2.5">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Mic className="size-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Video className="size-4" />
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-red-600 text-white hover:bg-red-600/90"
          >
            <PhoneOff className="size-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <MessageSquare className="size-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <FilePlus2 className="size-4" />
          </Button>
        </div>
      </div>

      <Card className="py-0">
        <CardHeader className="border-b py-3">
          <CardTitle className="text-sm font-semibold">Session Notes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 py-3">
          <Textarea
            placeholder="Take notes during the session..."
            className="min-h-60 resize-none"
          />

          <Button className="h-9 w-full bg-gradient-dash text-white hover:opacity-95">
            Save Notes
          </Button>

          <div className="space-y-2 border-t pt-3 text-sm">
            <p className="font-medium text-slate-700">Patient Info</p>

            {PATIENT_DETAILS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
