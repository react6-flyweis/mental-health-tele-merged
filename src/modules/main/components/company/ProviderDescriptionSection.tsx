import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";

export default function ProviderDescriptionSection() {
  const tags = [
    "Highly recommended",
    "Empathetic",
    "Professional",
    "Caring",
    "Trustworthy",
    "Helpful",
    "Friendly",
    "Listens carefully",
    "Great service",
    "Understanding",
    "Supportive",
    "Patient",
  ];

  return (
    <section className="py-16 ">
      <Container>
        <SectionHeader
          title="How Patients Describe"
          subtitle=" Our Providers"
          description="We analyzed feedback from thousands of reviews to capture the most common words patients use to describe their experience."
        />

        <div className="mt-8 bg-[#ECFDF5] py-12  rounded-xl ">
          <div className="max-w-2xl mx-auto flex justify-center flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white text-primary rounded-full shadow-md font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
