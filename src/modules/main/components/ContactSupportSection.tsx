import { Clock, ShieldIcon, Users } from "lucide-react";
import { Container } from "@/components/ui/container";

const features = [
  {
    id: 1,
    title: "Secure Communication",
    desc: "Your information is protected with industry-leading encryption",
    icon: ShieldIcon,
  },
  {
    id: 2,
    title: "Quick Response",
    desc: "We typically respond within 24 hours on business days",
    icon: Clock,
  },
  {
    id: 3,
    title: "Professional Support",
    desc: "Caring experts trained in mental health assistance",
    icon: Users,
  },
];

export default function ContactSupportSection() {
  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-slate-700">
            Your privacy and comfort matter to us. Every message is handled with
            care and confidentiality by our dedicated support team.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.id} className="flex flex-col items-center text-center">
              <div className="size-13 bg-gradient-to-r from-[#3A6B7C33] to-[#4DB39C33] text-primary rounded-full flex items-center justify-center mb-4">
                <f.icon className="size-6" />
              </div>
              <h4 className="text-lg font-semibold">{f.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
