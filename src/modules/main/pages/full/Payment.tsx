"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStripe, useElements, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { stripeApi } from "@/api/stripe.api";
import { stripePromise } from "@/lib/stripe";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function PaymentDialogWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentTab, setPaymentTab] = useState<"debit" | "credit">("debit");

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardCvcError, setCardCvcError] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardNumberElement);

    if (!card) {
      console.error("Card not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error.message);
      return;
    }
    try {
      const res = await stripeApi.stripeWebhook({
        type: "payment_intent.succeeded",
        data: {
          object: {
            id: paymentMethod.id,
            amount: 19900,
            currency: "usd",
            status: "succeeded",
          },
        },
      });
      router("/appointment/payment/confirmation");

    } catch (err) {
      console.error(err);
      setIsSuccess(false)

    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card className="p-6">
        {/* header */}
        <CardHeader className="flex items-center relative mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router(-1)}
            className="absolute left-0 h-10 w-10 rounded-full bg-[#eef7f6] text-[#2a9d8f] hover:bg-[#e0f0ef] hover:text-[#21867a]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold text-center w-full text-slate-800">
            Payment Method
          </h2>
        </CardHeader>

        {/* Payment Form Container */}
        <CardContent className=" border border-[#2a9d8f] rounded-2xl p-6 bg-[#f8fbfb]">

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => setPaymentTab("debit")}
              variant="outline"
              className={cn(
                "rounded-lg px-6 font-medium",
                paymentTab === "debit"
                  ? "border-[#2a9d8f] text-[#2a9d8f] bg-white"
                  : "text-slate-500 bg-white hover:bg-[#eef7f6]"
              )}
            >
              Debit Card
            </Button>

            <Button
              onClick={() => setPaymentTab("credit")}
              variant="ghost"
              className={cn(
                "rounded-lg px-6 font-medium",
                paymentTab === "credit"
                  ? "border-[#2a9d8f] text-[#2a9d8f] bg-white"
                  : "text-slate-500 bg-white hover:bg-slate-50"
              )}
            >
              Credit Card
            </Button>
          </div>

          {/* Radio and Logos */}
          <div className="flex items-center justify-between mb-6">
            <RadioGroup defaultValue={paymentTab} className="flex items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={paymentTab}
                  id={paymentTab}
                  checked
                  className="text-[#2a9d8f] border-[#2a9d8f] fill-[#2a9d8f]"
                />
                <Label
                  htmlFor={paymentTab}
                  className="font-semibold text-base text-slate-900"
                >
                  Pay with {paymentTab === "credit" ? "Credit" : "Debit"} Card
                </Label>
              </div>
            </RadioGroup>

            <div className="flex gap-1.5">
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[9px] font-bold text-blue-900">
                VISA
              </div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[7px] font-bold text-orange-500">
                DISCOVER
              </div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                <div className="flex -space-x-1.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                  <div className="h-3.5 w-3.5 rounded-full bg-blue-500 mix-blend-multiply"></div>
                </div>
              </div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                <div className="flex -space-x-1.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                  <div className="h-3.5 w-3.5 rounded-full bg-yellow-500 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 sm:col-span-1 space-y-2">
                <Label className="text-slate-600 font-medium">
                  Card Number
                </Label>
                <div className="relative">
                  <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center", cardNumberError ? "border-red-500" : "border-slate-200")}>
                    <CardNumberElement
                      onChange={(e) => setCardNumberError(e.error?.message || "")}
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#1f2937",
                          },
                          invalid: {
                            color: "#ef4444",
                          }
                        },
                      }}
                      className="w-full"
                    />
                  </div>
                  {!cardNumberError && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2a9d8f]" />}
                </div>
                {cardNumberError && <p className="text-red-500 text-xs mt-1">{cardNumberError}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-2">
                <Label className="text-slate-600 font-medium">
                  Expiration Date
                </Label>
                <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center", cardExpiryError ? "border-red-500" : "border-slate-200")}>
                  <CardExpiryElement
                    onChange={(e) => setCardExpiryError(e.error?.message || "")}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1f2937",
                        },
                        invalid: {
                          color: "#ef4444",
                        }
                      },
                    }}
                    className="w-full"
                  />
                </div>
                {cardExpiryError && <p className="text-red-500 text-xs mt-1">{cardExpiryError}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">
                Card Security Code
              </Label>
              <div className="flex items-start gap-4">
                <div className="w-full">
                  <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center w-full", cardCvcError ? "border-red-500" : "border-slate-200")}>
                    <CardCvcElement
                      onChange={(e) => setCardCvcError(e.error?.message || "")}
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#1f2937",
                          },
                          invalid: {
                            color: "#ef4444",
                          }
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  {cardCvcError && <p className="text-red-500 text-xs mt-1">{cardCvcError}</p>}
                </div>
                <button className="text-sm text-[#2a9d8f] hover:underline font-medium mt-3 shrink-0">
                  What is this?
                </button>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Security Notice */}
        <div className="flex items-center gap-4 px-2">
          <div className="p-2.5 bg-[#eef7f6] rounded-full text-[#2a9d8f] shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-slate-600 text-sm">
            We Protect Your Payment Information Using Encryption To Provide
            Bank-Level Security.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-2">
          <Button size="lg" className="bg-gradient-dash" onClick={handlePayment}>
            Submit <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

      </Card>
    </div>
  );
}
const PaymentDialog = ({ children }: { children: any }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDialogWrapper>
        {children}
      </PaymentDialogWrapper>
    </Elements>
  );
};
export default PaymentDialog;
