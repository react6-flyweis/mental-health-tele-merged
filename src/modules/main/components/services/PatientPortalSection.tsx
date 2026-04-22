import {
  Calendar,
  CalendarCheck,
  Pill,
  MapPin,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "react-router";
import portalImg from "@/assets/services/patient-portal.jpg";

export default function PatientPortalSection({ data }: { data: any }) {
  const features = [
    { id: 1, icon: Calendar, title: "Book visits anytime" },
    { id: 2, icon: CalendarCheck, title: "Manage appointments easily" },
    { id: 3, icon: Pill, title: "Track prescriptions in real time" },
    { id: 4, icon: MapPin, title: "Switch pharmacies quickly" },
    { id: 5, icon: Lock, title: "Save medical details securely" },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* left: image */}
          <div className=" flex justify-center md:justify-start">
            <div className="relative w-full max-w-2xl rounded-2xl shadow-2xl">
              <img
                src={portalImg}
                alt="Patient portal preview"
                width={940}
                height={620}
                className="object-cover rounded-2xl w-full h-full aspect-square"
              />

              <div className="absolute -right-4 -bottom-4 bg-gradient-primary text-white rounded-lg shadow-lg px-3 py-3 flex flex-col items-center text-xs">
                <div className="font-semibold text-2xl leading-none">
                  {data?.patientPortalStatValue}
                </div>
                <div className="mt-0.5">{data?.patientPortalStatLabel}</div>
              </div>
            </div>
          </div>

          {/* right: copy + list + CTA */}
          <div className="">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              <span className="text-primary">{data.patientPortalTitle}</span>
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {data.patientPortalSubtitle}
            </p>

            <div className="mt-6 space-y-3">
              {(data?.patientPortalFeatures ?? []).map(
                (f: any, idx: number) => {
                  const Icon =
                    f.icon && typeof f.icon === "function"
                      ? f.icon
                      : (features[idx]?.icon ?? Calendar);
                  return (
                    <div
                      key={f.id}
                      className="rounded-2xl bg-[#F8FAFB] p-3 flex items-center gap-4"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
                        <Icon className="size-5" />
                      </div>

                      <div className="text-sm font-medium text-slate-900">
                        {f.title}
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            <div className="mt-6">
              <Link to="/onboarding?type=adhd">
                <Button className="bg-gradient-primary h-10 w-60" size="lg">
                  Schedule A Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
