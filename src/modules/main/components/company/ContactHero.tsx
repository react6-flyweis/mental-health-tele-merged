import { Container } from "@/components/ui/container";
import contactBgImg from "@/assets/company/contact-bg.jpg";

import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function ContactHero() {
  return (
    <section className="relative text-white py-16 pb-30">
      <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
        <img
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
        <img
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={contactBgImg}
          alt="Contact background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#3A6B7CD9] via-[#4A8591BF] to-[#4DB39CD9]" />
      </div>

      <Container className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          We&apos;re Here
          <br />
          To Support You
        </h1>
      </Container>
    </section>
  );
}
