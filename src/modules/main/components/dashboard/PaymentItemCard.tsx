import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle, DownloadIcon, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InvoiceDetailsDialog from "./InvoiceDetailsDialog";

export interface PaymentItem {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: "Scheduled" | "Paid" | "Failed" | string;
  /** invoice number for completed payments */
  invoice?: string;
  /** payment method description like "Visa **** 4242" */
  method?: string;
  /** date the invoice was generated */
  invoiceDate?: string;
  /** date payment was received */
  paidDate?: string;
  /** billing recipient name */
  billToName?: string;
  /** billing recipient email */
  billToEmail?: string;
}

function statusAccent(status: PaymentItem["status"]) {
  switch (status) {
    case "Scheduled":
      return "bg-yellow-100 text-yellow-700";
    case "Paid":
      return "bg-emerald-100 text-emerald-700";
    case "Failed":
      return "bg-destructive/20 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function iconColor(status: PaymentItem["status"]) {
  switch (status) {
    case "Scheduled":
      return "text-yellow-600";
    case "Paid":
      return "text-emerald-600";
    case "Failed":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}

function iconFor(status: PaymentItem["status"]) {
  // choose icon based on status
  switch (status) {
    case "Scheduled":
      return Calendar;
    case "Failed":
      return XCircle;
    default:
      return CheckCircle;
  }
}

interface PaymentItemCardProps {
  item: PaymentItem;
}

export function PaymentItemCard({ item }: PaymentItemCardProps) {
  const Icon = iconFor(item.status);

  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex items-center justify-center p-2 rounded-md",
              item.status === "Scheduled"
                ? "bg-yellow-100"
                : item.status === "Failed"
                  ? "bg-destructive/20"
                  : "bg-emerald-100",
            )}
          >
            <Icon className={cn("size-5", iconColor(item.status))} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{item.description}</span>
            <span className="text-xs text-muted-foreground">{item.date}</span>
            {/* show invoice and method for non-scheduled items */}
            {item.status !== "Scheduled" && (
              <span className="text-xs text-muted-foreground mt-1">
                {item.invoice && (
                  <>
                    Invoice: {item.invoice}
                    {item.method && ` · ${item.method}`}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-end gap-5">
          <div className="flex flex-col items-end">
            <span className="font-semibold text-lg">${item.amount}</span>
            <Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                statusAccent(item.status),
              )}
            >
              {item.status}
            </Badge>
          </div>
          {/* action buttons for completed payments */}
          {item.status === "Paid" && (
            <div className="flex gap-2 mt-2">
              {/* view opens invoice details dialog */}
              <InvoiceDetailsDialog
              
                item={item}
                trigger={
                  <Button
                    size="sm"
                    className="border-primary text-primary"
                    variant="outline"
                  >
                    View
                  </Button>
                }
              />
              <Button size="sm" variant="outline">
                <DownloadIcon />
                Receipt
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
