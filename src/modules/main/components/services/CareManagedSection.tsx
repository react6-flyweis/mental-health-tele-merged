import managedCareImg from "@/assets/services/managed-care.png";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function CareManagedSection() {
  const features = [
    {
      title: "Book Visits Effortlessly",
      text: "Schedule appointments anytime, from anywhere — no queues or phone calls.",
    },
    {
      title: "Manage Appointments With Ease",
      text: "Update or reschedule visits in just a few taps.",
    },
    {
      title: "Plan Ahead With Confidence",
      text: "Set up future visits so your care stays consistent.",
    },
    {
      title: "Monitor Prescriptions Online",
      text: "Check medication status and know when it's ready for pickup.",
    },
    {
      title: "Change Pharmacies Quickly",
      text: "Switch to a different pharmacy without delays or extra steps.",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="Your Care, Managed"
          subtitle="In One Place"
          className="mb-8"
        />
        <div className="grid items-center md:grid-cols-2 gap-4">
          <div className="relative md:max-w-md mx-auto">
            {/* decorative accent borders (matches other service cards) */}
            <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0 border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
            <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-primary rounded-bl-lg pointer-events-none hidden md:block" />

            <div className="p-1 border rounded-lg shadow-sm bg-white">
              <img
                src={managedCareImg}
                alt="Your care managed in one place"
                className="w-full aspect-[4/3] object-cover rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f.title} className="text-sm leading-relaxed">
                <div className="text-sm">
                  <span className="font-medium text-slate-800">{f.title}</span>
                  <span className="text-muted-foreground">: {f.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
