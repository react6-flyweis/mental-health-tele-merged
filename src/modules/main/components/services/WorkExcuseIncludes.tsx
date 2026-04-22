import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

import properWorkExcuseImg from "@/assets/services/proper-work-excuse.png";

export default function WorkExcuseIncludes() {
  const items = [
    {
      id: 1,
      title: "Medical Provider's Official Letterhead",
      desc: "Displays the healthcare professional's name, credentials, license number, and verified contact information.",
    },
    {
      id: 2,
      title: "Employee Identification Details",
      desc: "Full name of the patient along with confirmation of medical evaluation.",
    },
    {
      id: 3,
      title: "Date Of Issue",
      desc: "Indicates when the document was officially generated for record‑keeping purposes.",
    },
    {
      id: 4,
      title: "Authorized Medical Signature",
      desc: "A verified physical or secure digital signature from the licensed healthcare provider.",
    },
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeader
              title="What a Proper Work"
              subtitle="Excuse Letter Includes"
            />

            <div className="mt-8 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex gap-2 items-start">
                  <div>
                    <div className="text-sm font-medium text-slate-800">
                      {it.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {it.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="max-w-md mx-auto relative">
              <span className="absolute -top-1 -right-1 size-40 border-3 border-b-0 border-l-0 border-[#06bfae] rounded-tr-lg pointer-events-none hidden md:block" />
              <span className="absolute -bottom-1 -left-1 size-40 border-3 border-r-0 border-t-0 border-[#06bfae] rounded-bl-lg pointer-events-none hidden md:block" />

              <div className="p-1 rounded-lg">
                <img
                  src={properWorkExcuseImg}
                  alt="Proper work excuse letter includes"
                  className="w-full  aspect-square object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
