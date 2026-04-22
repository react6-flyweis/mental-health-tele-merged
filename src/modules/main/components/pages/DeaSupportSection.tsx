import { Phone } from "lucide-react";

export default function DeaSupportSection({ data }: any) {
  const sorted =
    data?.sections
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

  const support = sorted.slice(6, 10);

  return (
    <section className="py-12 bg-gradient-to-r from-[#317873] to-[#63C5B4] rounded-xl text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {support?.[0]?.heading}
        </h2>

        <p className="mt-2 text-sm md:text-base">
          {support?.[1]?.body}
        </p>

        <div className="mt-6 inline-flex items-center bg-white text-[#317873] rounded-lg p-4 shadow-lg">
          <div className="size-12 rounded-xl bg-gradient-primary flex items-center justify-center mr-4">
            <Phone className="size-6 text-white" />
          </div>

          <div className="text-left">
            <div className="font-semibold text-lg">
              {support?.[3]?.heading}
            </div>
            <div className="text-xs">
              {support?.[3]?.body}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}