import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import dayjs from "dayjs";

export default function TermsHero({ data, loading, error }: any) {
  if (loading) {
    return (
      <section className="py-16 bg-[#F3FEFB] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#F3FEFB] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
      <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
        <img src={bgPattern} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
        <img src={bgPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          {data?.heroBadge || "Terms Of Use"}
        </div>

        <h1 className="text-4xl md:text-5xl max-w-lg font-semibold tracking-tight mt-2 mx-auto">
          <span className="text-primary">{data?.title}</span>
        </h1>

        <p className="mt-2 text-base text-slate-700">{data?.heroSubtitle}</p>

        <p className="mt-4 text-sm text-muted-foreground">
          Last updated:{" "}
          {data?.lastUpdated
            ? dayjs(data?.lastUpdated).format("MMMM DD, YYYY")
            : ""}
        </p>
      </div>
    </section>
  );
}
