"use client";

import { useState,useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle, DownloadIcon } from "lucide-react";
import { dashboardApi } from "@/api/dashboard.service";
import dayjs from "dayjs";

export default function InvoiceDetailsDialog({
  item,
  trigger,
}: any) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(item);
  const [loading, setLoading] = useState(false);
const invoiceRef = useRef<HTMLDivElement>(null);
  const fetchPayment = async () => {
    try {
      setLoading(true);

      const res = await dashboardApi.getPaymentById("patient", item.id);

      const payment = res?.data?.payment;

      setData({
        ...item,
        description: `Session with Dr. ${payment?.appointmentId?.providerId?.firstName || ""} ${payment?.appointmentId?.providerId?.lastName || ""}`,
        amount: payment?.amount / 100,
        date: dayjs(payment?.createdAt).format("MMMM D, YYYY"),
        status: payment?.status === "succeeded" ? "Paid" : "Scheduled",
        invoice: payment?.invoiceNumber || "N/A",
        method: payment?.cardBrand
          ? `via ${payment?.cardBrand} **** ${payment?.cardLast4}`
          : " Mastercard **** 5555",
        billToName: "Patient",
        billToEmail: "example@email.com",
      });

    } catch (err) {
      console.error("Payment details error:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDownload = async () => {
  if (!invoiceRef.current) return;

  try {
    const original = invoiceRef.current;

    const clone = original.cloneNode(true) as HTMLElement;

    // remove ALL classes (Tailwind hata diya)
    clone.querySelectorAll("*").forEach((el: any) => {
      el.removeAttribute("class");

      el.style.color = "#000";
      el.style.background = "#fff";
      el.style.borderColor = "#ddd";
      el.style.fontSize = "12px";
    });

    clone.style.padding = "20px";
    clone.style.width = "800px";
    clone.style.background = "#fff";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`invoice-${data.invoice || item.id}.pdf`);

  } catch (err) {
    console.error("PDF download error:", err);
  }
};

  const billName = data.billToName || "";
  const billEmail = data.billToEmail || "";
  const invoiceDate = data.invoiceDate || data.date;
  const paidDate = data.paidDate || data.invoiceDate || data.date;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val) fetchPayment();
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            View
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold">Invoice Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="h-[200px] bg-gray-200 animate-pulse rounded-lg" />
        ) : (
          <div className="space-y-4" ref={invoiceRef} style={{ 
    colorScheme: "light",
    backgroundColor: "#ffffff",
    color: "#000000"
  }}
>
            
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="font-medium">MindCare Tele-health</p>
                <p className="text-sm text-muted-foreground">
                  123 Healthcare Ave
                </p>
                <p className="text-sm text-muted-foreground">
                  San Francisco, CA 94102
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Invoice</p>
                <p className="font-medium">{data.invoice}</p>
                <p className="text-sm text-muted-foreground">{invoiceDate}</p>
              </div>
            </div>

            <hr />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bill To</p>
              <p className="font-medium">{billName}</p>
              <p className="text-sm text-muted-foreground">{billEmail}</p>
            </div>

            <div className="border rounded-md overflow-hidden p-3">
              <div className="flex border-b pb-2 font-semibold">
                <div className="flex-1">Description</div>
                <div className="w-24 text-right">Amount</div>
              </div>
              <div className="flex px-4 py-2">
                <div className="flex-1">{data.description}</div>
                <div className="w-24 text-right">${data.amount}</div>
              </div>
              <div className="flex px-4 py-2 font-semibold border-t-2 border-gray-500">
                <div className="flex-1">Total</div>
                <div className="w-24 text-right">${data.amount}</div>
              </div>
            </div>

            {data.status === "Paid" && (
              <div className="flex items-start gap-2 bg-[#F0FDF4] border border-[#B9F8CF] p-4 rounded-lg">
                <CheckCircle className="size-5 text-green-600" />
                <div>
                  <p className="font-medium text-emerald-700">
                    Payment Received
                  </p>
                  <p className="text-sm text-green-600">
                    Paid on {paidDate}
                    {data.method && ` via ${data.method}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="border-t-0 bg-white">
          <Button variant="outline" size="lg" onClick={handleDownload}>
            <DownloadIcon className="size-4 mr-1" /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}