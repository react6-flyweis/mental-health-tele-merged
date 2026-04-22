import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function RefundsHero({ data, loading, error }: any) {
  if (loading) {
    return (
      <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
        <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
          <img src={bgPattern} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
          <img src={bgPattern} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="text-center max-w-3xl mx-auto px-4 flex flex-col items-center">
          <Skeleton className="h-6 w-32 rounded-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6 mb-6" />
          <Skeleton className="h-4 w-48" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto px-4 flex flex-col items-center">
          <AlertCircle className="size-12 text-destructive mb-4" />
          <h1 className="text-2xl font-semibold text-slate-900">
            Failed to load Refund Policy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please try refreshing the page later.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
      {/* background decorations */}
      <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
        <img
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
        <img
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          {data?.heroBadge}
        </div>

        <h1 className="text-4xl md:text-5xl max-w-lg font-semibold tracking-tight mt-2 mx-auto">
          <span className="text-primary">{data?.title}</span>
        </h1>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {data?.heroSubtitle}
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Last Updated:{" "}
          {data?.lastUpdated
            ? dayjs(data?.lastUpdated).format("MMMM DD, YYYY")
            : ""}
        </p>
      </div>
    </section>
  );
}
