import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function ConsentHero({ data }: any) {
  return (
    <section className="py-16 bg-[#F3FEFB] relative">
      <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
        <img src={bgPattern} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
        <img src={bgPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          {data?.heroBadge}
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
          <span className="text-primary">{data?.title}</span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {data?.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
