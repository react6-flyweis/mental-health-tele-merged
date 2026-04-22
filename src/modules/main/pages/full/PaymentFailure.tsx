"use client";

import { useNavigate } from "react-router";
import { ArrowLeft, RotateCcw, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PaymentFailurePage() {
  const router = useNavigate();

  return (
    <div className="max-w-lg mx-auto space-y-5">
      {/* invoice summary - same as confirmation for context */}
      <Card className="">
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Therapist:</span>
            <span>Dr. Emily Chen</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Date:</span>
            <span>1/16/2026</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Time:</span>
            <span>10:00 AM</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Consultation Fee:</span>
            <span>$120</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center relative mb-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className=" h-10 w-10 rounded-full bg-[#eef7f6] text-primary hover:bg-[#e0f0ef]"
            onClick={() => router(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="text-center space-y-5">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Payment Transaction Failed
          </h2>
          <p className="text-sm text-slate-600 max-w-xs mx-auto">
            We couldn&apos;t process your payment. This might be due to
            incorrect card details or the transaction being blocked by your
            bank.
          </p>
          <Button
            size="lg"
            className="bg-gradient-dash w-full"
            style={{
              boxShadow:
                "0px 4px 6px -4px #2D7D7433, 0px 10px 15px -3px #2D7D7433",
            }}
            onClick={() => router("/appointment/payment")}
          >
            <RotateCcw />
            Retry Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
