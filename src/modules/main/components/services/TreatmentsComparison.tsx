import { Link } from "react-router";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const rows = [
  {
    feature: "First Consultation Cost",
    online: { text: "$195", isText: true },
    inPerson: { text: "$400–$500", isText: true },
  },
  {
    feature: "Quick Appointment Availability",
    online: { text: "Often Within 24 Hours", positive: true },
    inPerson: { text: "Extended Wait Times", positive: false },
  },
  {
    feature: "Easy Booking Or Changes",
    online: { text: "Takes Just Minutes", positive: true },
    inPerson: { text: "Usually Time-Consuming", positive: false },
  },
  {
    feature: "No Travel Required",
    online: { text: "Care From Home", positive: true },
    inPerson: { text: "Commute Needed", positive: false },
  },
  {
    feature: "Video Visits From Anywhere",
    online: { text: "Location-Flexible", positive: true },
    inPerson: { text: "On-Site Only", positive: false },
  },
  {
    feature: "Digital Treatments Delivery",
    online: { text: "Sent Directly To Pharmacy", positive: true },
    inPerson: { text: "Manual Or Delayed", positive: false },
  },
  {
    feature: "Responsive Care Team Support",
    online: { text: "Fast, Patient-Focused", positive: true },
    inPerson: { text: "Limited Availability", positive: false },
  },
];

export default function TreatmentsComparison({ data }: { data?: any }) {
  const currentRows = data?.comparisonRows?.length ? data.comparisonRows.map((r: any) => ({
    feature: r.feature,
    online: { text: r.online, positive: r.onlinePositive, isText: typeof r.onlinePositive !== 'boolean' },
    inPerson: { text: r.inPerson, positive: r.inPersonPositive, isText: typeof r.inPersonPositive !== 'boolean' }
  })) : rows;

  const titleWords = (data?.comparisonTitle || data?.whyOnlineCareTitle||"Why Online Medication Care Works Better For Many People").split(" ");
  const midIndex = Math.ceil(titleWords.length / 2);
  const title1 = titleWords.slice(0, midIndex).join(" ");
  const title2 = titleWords.slice(midIndex).join(" ");
const formattedRows = (data?.whyOnlineCareComparison??data?.comparisonRows??[])
  .sort((a:any, b:any) => a.displayOrder - b.displayOrder)
  .map((item:any) => ({
    feature: item.feature,

    online: {
      text: item.online,
      positive: item.onlinePositive,
      isText: true,
    },

    inPerson: {
      text: item.inPerson,
      positive: item.inPersonPositive,
      isText: true,
    },
  }))
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-5xl mx-auto bg-gray-50 border border-gray-100 rounded-xl shadow-sm p-2">
          <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                <span className="block text-primary">
                  {title1}
                </span>
                <span className="block text-slate-700 font-semibold mt-1">
                  {title2}
                </span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
                {data?.comparisonSubtitle||data?.whyOnlineCareSubtitle || "Access To Mental Health Care Shouldn't Depend On Location, Mobility, Or Long Waiting Lists. If Visiting A Clinic Is Difficult Or Time-Consuming, Online Care Offers A Practical Alternative."}
              </p>
            </div>

            <div className="overflow-x-auto overflow-hidden rounded-md border border-gray-200">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-[#F4F9F8] border-gray-200 border-b">
                  <tr className="divide-x">
                    <th className="px-4 py-3 text-left w-1/3">Feature</th>
                    <th className="px-4 py-3 text-left">Online Care</th>
                    <th className="px-4 py-3 text-left">In-Person Clinics</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {(formattedRows??currentRows).map((r: any) => (
                    <tr key={r.feature} className="bg-white">
                      <td className="px-4 py-4 align-top text-sm text-slate-700 border-r border-gray-200">
                        {r.feature}
                      </td>

                      <td className="px-4 py-4 align-top border-r border-gray-100">
                        {r.online.isText ? (
                          <div className="font-medium text-slate-900 text-center">
                            {r.online.text}
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div>
                              {r.online.positive ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-red-500" />
                              )}
                            </div>
                            <div
                              className={`${r.online.positive ? "text-slate-900 font-medium" : "text-muted-foreground"}`}
                            >
                              {r.online.text}
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4 align-top text-center">
                        {r.inPerson.isText ? (
                          <div className="font-medium">{r.inPerson.text}</div>
                        ) : (
                          <div className="flex items-center gap-3 items-center justify-center">
                            <div>
                              {r.inPerson.positive ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-red-500" />
                              )}
                            </div>
                            <div
                              className={`${r.inPerson.positive ? "text-slate-900 font-medium" : "text-muted-foreground"}`}
                            >
                              {r.inPerson.text}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <Link to={data?.comparisonCtaUrl || data?.whyOnlineCareCtaUrl || "/appointment"}>
                <Button
                  className="bg-gradient-primary inline-flex items-center gap-3"
                  size="lg"
                >
                  {data?.comparisonCtaLabel||data?.whyOnlineCareCtaLabel || "Begin Online Care"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
