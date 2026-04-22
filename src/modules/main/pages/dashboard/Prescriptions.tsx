"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { AlertCircle, Pill, RefreshCcw } from "lucide-react";
import type { PrescriptionItem } from "@/modules/main/components/dashboard/types";
import { PrescriptionCard } from "@/modules/main/components/dashboard/PrescriptionCard";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dashboardApi } from "@/api/dashboard.service";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";

type PrescriptionTab = "active" | "history";

// interface PrescriptionSummaryCard {
//   id: string;
//   label: string;
//   value: number;
//   icon: React.ComponentType<{ className?: string }>;
//   iconClassName: string;
// }

function PrescriptionsContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);
  const [tab, setTab] = useState<PrescriptionTab>("active");
  const [prescriptionsData, setPrescriptionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await dashboardApi.getActivePrescriptions(
        "patient",
        search || "",
      ); // apni API call
      setPrescriptionsData(res?.data?.prescriptions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [search]);
  const mappedPrescriptions: PrescriptionItem[] = useMemo(() => {
    return prescriptionsData.map((item: any) => {
      const med = item.medications?.[0];

      return {
        id: item._id,
        medication: med?.name || "",
        dosage: med?.dosage || "",
        schedule: med?.frequency || "",
        instructions: item?.instructions || "",
        provider: `${item?.providerId?.firstName} ${item?.providerId?.lastName}`,
        prescribedDate: dayjs(item?.date).format("MMM DD, YYYY"),
        nextRefillDate: item?.nextRefillDate
          ? dayjs(item?.nextRefillDate).format("MMM DD, YYYY")
          : "",
        endDate: item?.endDate
          ? dayjs(item?.endDate).format("MMM DD, YYYY")
          : "",
        refillsLeft: item?.refillsRemaining || 0,
        status: item?.status === "active" ? "active" : "history",
      };
    });
  }, [prescriptionsData]);
  const [count, setCount] = useState<any>({});
  const handlePrescriptionCount = async () => {
    try {
      const res = await dashboardApi.getPrefillCount("patient");
      setCount(res?.data ?? {});
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handlePrescriptionCount();
  }, []);
  const summaryCards = useMemo(() => {
    const active = mappedPrescriptions.filter((p) => p.status === "active");
    const refills = active.reduce((sum, p) => sum + p.refillsLeft, 0);

    return [
      {
        id: "active",
        label: "Active Medications",
        value: count?.active ?? 0,
        icon: Pill,
        iconClassName: "bg-blue-100 text-blue-600",
      },
      {
        id: "refills",
        label: "Refills Available",
        value: count?.refillRequested ?? 0,
        icon: RefreshCcw,
        iconClassName: "bg-emerald-100 text-emerald-600",
      },
      {
        id: "expiring",
        label: "Expiring Soon",
        value: count?.expired ?? 0,
        icon: AlertCircle,
        iconClassName: "bg-amber-100 text-amber-600",
      },
    ];
  }, [mappedPrescriptions]);
  const filteredPrescriptions = useMemo(() => {
    return mappedPrescriptions.filter((item) => item.status === tab);
  }, [tab, mappedPrescriptions]);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-medium">My Prescriptions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your medications and refills
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4  lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    card.iconClassName,
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-medium leading-none">
                    {card.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="inline-flex rounded-full bg-muted p-1">
        {(["active", "history"] as const).map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setTab(tabItem)}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm capitalize transition-all",
              tabItem === tab
                ? "bg-gradient-dash text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tabItem === "active" ? "Active Prescriptions" : "History"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <Card className="px-4 py-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading prescriptions...
          </Card>
        ) : error ? (
          <Card className="px-4 py-8 text-center text-sm text-red-500">
            {error}
          </Card>
        ) : filteredPrescriptions.length === 0 ? (
          <Card className="px-4 py-8 text-center text-sm text-muted-foreground">
            No prescriptions available in this tab.
          </Card>
        ) : (
          filteredPrescriptions.map((item) => (
            <PrescriptionCard
              key={item.id}
              item={item}
              fetchPrescriptions={fetchPrescriptions}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function PrescriptionsPage() {
  return (
    <Suspense fallback={<div>Loading prescriptions...</div>}>
      <PrescriptionsContent />
    </Suspense>
  );
}
