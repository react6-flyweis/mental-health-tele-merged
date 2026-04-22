"use client";

import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import export1Img from "@/assets/landing/expert-1.png";
import dayjs from "dayjs";
import { patientApi } from "@/api/patient.api";
import { useState } from "react";
import PaymentDialog from "@/modules/main/components/dashboard/PaymentDialog";
import { toast } from "react-toastify";

export default function ConfirmAppointmentPage() {
  const router = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const patiendDetail =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("patiendDetail") || "{}")
      : "";
  const providerData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("providerData") || "{}")
      : "";
  const selectedPlan =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("selectedSlot") || "{}")
      : "";
  const selectedDate =
    typeof window !== "undefined" ? sessionStorage.getItem("selectedDate") : "";
  const fees =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("planFees") || "{}")
      : "";
  const handleAppointment = async () => {
    try {
      const res = await patientApi.bookAppointment({
        providerId: providerData._id,
        date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "",
        time: selectedPlan?.startTime,
        type: "video",
      });
      sessionStorage.setItem("appointmentId", res?.data?.appointment?._id);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <Card className="shadow-lg gap-0 max-w-lg mx-auto">
      <CardHeader className="border-b-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-2"
          onClick={() =>
            typeof window !== "undefined" && router("/appointment")
          }
        >
          <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-1">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            Complete Your Payment
          </h1>
          <p className="text-sm text-slate-500">
            Secure Your Appointment By Completing The Payment
          </p>
        </div>

        {/* Appointment summary */}
        <div className="rounded-md border overflow-hidden">
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700">
            Appointment Summary
          </div>

          <div className="p-4">
            <div className="flex gap-4">
              <Avatar className="size-12 rounded-none">
                <AvatarFallback className="text-slate-700">
                  {providerData?.firstName?.charAt(0) ?? ""}
                  {providerData?.lastName?.charAt(0) ?? ""}
                </AvatarFallback>
                <AvatarImage src={providerData?.profileImageUrl} />
              </Avatar>

              <div className="flex-1">
                <div className="font-semibold text-lg text-slate-800">
                  {providerData?.firstName}{" "}
                  {providerData?.specializations?.join(", ")}
                </div>
                <div className="text-sm text-slate-500">
                  {providerData?.specialty}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  {selectedDate
                    ? dayjs(selectedDate).format("DD MMM YYYY")
                    : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <div>{selectedPlan?.start} </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient */}
        <div>
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700 rounded-t-md">
            Patient
          </div>
          <div className="border border-t-0 rounded-b-md p-4 text-slate-700">
            {patiendDetail?.firstName} {patiendDetail?.lastName}
          </div>
        </div>

        {/* Payment details */}
        <div>
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700 rounded-t-md">
            Payment Details
          </div>

          <div className="border border-t-0 rounded-b-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className=" p-0.5 rounded-md bg-gradient-primary">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm text-slate-700">Consultation Fee</div>
              </div>

              <div className="font-semibold">$ {fees ?? 0}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="h-12 w-44 bg-gradient-primary flex-1"
            onClick={() => router("/appointment")}
          >
            Edit Appointment
          </Button>

          <PaymentDialog
            open={isSuccess}
            onClose={() => setIsSuccess(false)}
            onReturnUrl={() => router("/appointment/payment")}
          >
            <Button
              size="lg"
              className="flex-1 h-12 w-44 bg-gradient-primary text-white hover:opacity-95 ml-auto"
              onClick={() => handleAppointment()}
            >
              confirm
            </Button>
          </PaymentDialog>
        </div>
      </CardContent>
    </Card>
  );
}
