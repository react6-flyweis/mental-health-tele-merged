import { Card } from "@/components/ui/card";
import { Check, Lightbulb, TriangleAlert } from "lucide-react";

interface KeyTakeawaysProps {
  items: string[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <Card className="my-8 p-0 ring-0 rounded-none overflow-hidden">
      <div className="border-l-4 border-teal-500 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            Key Takeaways
          </h3>
        </div>
        <div className="space-y-4">
          {items.map((text, idx) => {
            const isWarning = text.toLowerCase().startsWith("never");

            // Split by dash to bold the first part if it exists
            const parts = text.split(" – ");
            const hasDash = parts.length > 1;
            const firstPart = hasDash ? parts[0] : text;
            const secondPart = hasDash ? ` – ${parts[1]}` : "";

            return (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${isWarning ? "bg-orange-100" : "bg-teal-100"}`}
                >
                  {isWarning ? (
                    <TriangleAlert className="h-3 w-3 text-orange-600" />
                  ) : (
                    <Check className="h-3 w-3 text-teal-600" />
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {hasDash ? (
                    <>
                      <strong className="text-slate-900 font-semibold">
                        {firstPart}
                      </strong>
                      {secondPart}
                    </>
                  ) : (
                    text
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
