"use client";

import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import checkCircleImg from "@/assets/check-circle.png";

export default function PaymentConfirmationPage() {
  const router = useNavigate();
  const sessionData =
    typeof window !== "undefined"
      ? sessionStorage.getItem("providerData")
        ? JSON.parse(sessionStorage.getItem("providerData") ?? "")
        : ""
      : null;
  const selectedPlan =
    typeof window !== "undefined"
      ? sessionStorage.getItem("selectedSlot")
        ? JSON.parse(sessionStorage.getItem("selectedSlot") ?? "")
        : ""
      : null;
  const fees =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("planFees") || "{}")
      : "";

  return (
    <div className="max-w-lg mx-auto space-y-5">
      {/* invoice summary */}
      <Card className="">
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Therapist:</span>
            <span>{sessionData?.firstName}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Date:</span>
            <span>{selectedPlan?.date}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Time:</span>
            <span>
              {selectedPlan?.time
                ? selectedPlan.time
                : `${selectedPlan?.start} - ${selectedPlan?.end}`}
            </span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Consultation Fee:</span>
            <span>$ {fees ?? 0}</span>
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
        <CardContent className="text-center space-y-4 max-w-md mx-auto">
          <img
            src={checkCircleImg}
            alt="Payment Successful"
            className="mx-auto size-40"
          />
          <h2 className="text-2xl font-semibold text-slate-800">
            Payment Successfully Completed!
          </h2>
          <p className="text-sm text-slate-600">
            Please add your details for doctor&apos;s verification &
            prescription.
          </p>
          <Button
            size="lg"
            className="bg-gradient-primary"
            onClick={() => router("/appointment/medical-intake")}
          >
            Complete Your Medical Intake Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
