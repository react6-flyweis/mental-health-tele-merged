"use client";

import { useEffect, useState, Suspense } from "react";
import { DollarSign, Clock, CheckCircle } from "lucide-react";
import AddPaymentMethodDialog from "@/modules/main/components/dashboard/AddPaymentMethodDialog";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  PaymentMethodCard,
  PaymentMethod,
} from "@/modules/main/components/dashboard/PaymentMethodCard";
import {
  PaymentItemCard,
  PaymentItem,
} from "@/modules/main/components/dashboard/PaymentItemCard";
import { dashboardApi } from "@/api/dashboard.service";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";

interface SummaryCard {
  id: string;
  label: string;
  value: number | string;
  isCurrency?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}

type Tab = "upcoming" | "history";

function PaymentsContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const search = useDebounce(query, 500);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleCards = async () => {
    try {
      const res = await dashboardApi.getCardsApi("patient");
      const data = res?.data?.paymentMethods?.map((i: any) => {
        return {
          id: i._id,
          brand: i.brand,
          last4: i.last4,
          expiry: `${i.expMonth}/${i.expYear}`,
          isDefault: i.isDefault,
        };
      });
      setMethods(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await dashboardApi.getPayments("patient", search || "");
      setPayments(res?.data?.payments || []);
    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleDefaultCard = async (cardId: string) => {
    try {
      const res = await dashboardApi.defaultCardApi("patient", cardId);
      console.log({ res });
      handleCards();
    } catch (error) {
      console.error(error);
    }
  };

  const addCard = async (payload: any) => {
    try {
      const dataPayload = {
        cardNumber: payload.last4,
        expMonth: payload.expiry.split("/")[0],
        expYear: payload.expiry.split("/")[1],
        cvv: payload.cvv,
        cardholderName: payload.cardholderName,
      };
      const res = await dashboardApi.postAddCardApi("patient", dataPayload);
      setMethods((prev) => [...prev, res?.data?.paymentMethod]);
      handleCards();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPaymentSummary = async () => {
    try {
      setLoading(true);
      setError("");
      const resSummary = await dashboardApi.getPaymentSummary(
        "patient",
        search || "",
      );
      setSummary(resSummary);
    } catch (err) {
      console.error("Payment summary error:", err);
      setError("Failed to load payment summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCards();
    fetchPayments();
    fetchPaymentSummary();
  }, [search]);

  const summaryCards: SummaryCard[] = [
    {
      id: "total",
      label: `Total Spent (${summary?.data?.summary?.year})`,
      value: summary?.data?.summary?.totalSpent ?? 0,
      isCurrency: true,
      icon: DollarSign,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      id: "upcoming",
      label: "Upcoming Payments",
      value: summary?.data?.summary?.upcomingPayments ?? 0,
      isCurrency: true,
      icon: Clock,
      iconClassName: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "sessions",
      label: "Sessions This Month",
      value: summary?.data?.summary?.sessionsThisMonth ?? 0,
      isCurrency: false,
      icon: CheckCircle,
      iconClassName: "bg-emerald-100 text-emerald-600",
    },
  ];

  const mappedPayments = payments.map((item) => {
    const provider = item?.appointmentId?.providerId;

    return {
      id: item?._id,
      description:
        item?.description ||
        `Session with Dr. ${provider?.firstName || ""} ${provider?.lastName || ""}`,
      date: new Date(item?.createdAt).toDateString(),
      amount: item?.amount,
      status: item?.status === "pending" ? "Scheduled" : "Paid",
      method: item?.cardBrand
        ? `${item?.cardBrand} **** ${item?.cardLast4}`
        : "",
      invoice: item?.invoiceNumber,
    };
  });

  const filteredPayments = mappedPayments.filter((p) => {
    if (tab === "upcoming") return p.status === "Scheduled";
    return p.status === "Paid";
  });

  const handleDeleteCardApi = async (cardId: string) => {
    try {
      const res = await dashboardApi.deleteCardApi("patient", cardId);
      console.log({ res });
      handleCards();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-medium">Payments & Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your payments and invoices
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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
                  <p className="text-md text-muted-foreground">{card.label}</p>
                  {card.value !== undefined && card.value !== null && (
                    <p className="text-2xl font-medium leading-none">
                      {typeof card.value === "number" && card.isCurrency
                        ? `$${card.value}`
                        : card.value}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Payment Methods</h2>
          <AddPaymentMethodDialog
            onAdd={(method) => {
              console.log({ method });
              addCard(method);
            }}
          />
        </div>
        <div className="mt-2 gap-5 grid grid-cols-1 md:grid-cols-2">
          {methods.map((m) => (
            <PaymentMethodCard
              key={m.id}
              method={m}
              onDelete={() => handleDeleteCardApi(m.id)}
              onSetDefault={() => handleDefaultCard(m.id)}
            />
          ))}
        </div>
      </Card>

      {/* tabs for payments list */}
      <div className="flex space-x-2 bg-muted p-1 w-fit rounded-full">
        {(["upcoming", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1 rounded-full text-sm",
              tab === t ? "bg-gradient-dash text-white" : "hover:bg-muted/80",
            )}
          >
            {t === "history" ? "Payment History" : "Upcoming"}
          </button>
        ))}
      </div>

      {/* list of payments */}
      <div className="space-y-4">
        {loading &&
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-25 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && filteredPayments.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground">
            No payments to show.
          </Card>
        )}

        {!loading &&
          !error &&
          filteredPayments.map((item) => (
            <PaymentItemCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div>Loading payments...</div>}>
      <PaymentsContent />
    </Suspense>
  );
}
