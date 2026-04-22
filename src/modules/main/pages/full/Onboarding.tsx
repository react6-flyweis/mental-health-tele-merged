"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import StateSelectionStep from "@/modules/main/components/onboarding/StateSelectionStep";
import TreatmentsStep from "@/modules/main/components/onboarding/TreatmentsStep";
import PatientTypeStep from "@/modules/main/components/onboarding/PatientTypeStep";
import SummaryStep from "@/modules/main/components/onboarding/SummaryStep";
import { publicPageApi } from "@/api/publicpage.api";
import { useFetch } from "@/hooks/useFetch";
import { Link } from "react-router";

export default function OnboardingPage() {
  const {
    data: bookingFlow,
    loading: bookingFlowLoading,
    error: bookingFlowError,
  } = useFetch(publicPageApi.getBookingFlow) as any;
  const [selectedState, setSelectedState] = useState("");
  const [providerData, setProviderData] = useState<any>(null);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<"new" | "continue" | null>(
    null,
  );
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const router = useNavigate();

  // step 1: select state
  // step 2: choose treatments (no auto-hide)
  // step 3: choose patient type (revealed after pressing Continue)
  // step 4: provider summary + booking (final step)

  const handleCheckboxChange = (treatment: string) => {
    setSelectedTreatments((prev) => {
      const next = prev.includes(treatment)
        ? prev.filter((t) => t !== treatment)
        : [...prev, treatment];
      // if user cleared the last treatment, reset selected plan
      if (next.length === 0) {
        setSelectedPlan(null);
      }
      return next;
    });
  };
  const handleContinue = () => {
    // Replace with real navigation / API call later
  };

  const isStep1Ready = !!selectedState;
  const isStep2Ready = selectedTreatments.length > 0;
  const isStep3Ready = !!selectedPlan;
  const isPrimaryEnabled =
    (step === 1 && isStep1Ready) ||
    (step === 2 && isStep2Ready) ||
    (step === 3 && isStep3Ready) ||
    step === 4; // step 4 is the final summary/booking step and is always actionable

  const primaryClass = isPrimaryEnabled
    ? "bg-gradient-primary"
    : "bg-gray-200 text-gray-500 cursor-not-allowed";

  const handleMainContinue = () => {
    if (step === 1) {
      if (!isStep1Ready) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!isStep2Ready) return;
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!isStep3Ready) return;
      setStep(4);
      return;
    }

    // step 4 -> final submit (booking)
    handleContinue();
    // route to the appointment booking page inside onboarding
    router(`/onboarding/profile?providerId=${selectedTreatments[0]}`);
  };

  useEffect(() => {
    if (step === 3) {
      publicPageApi.getProviderBySlug(selectedTreatments[0]).then((res) => {
        setProviderData(res.data);
      });
    }
  }, [step, selectedTreatments]);

  if (bookingFlowLoading) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-6">
        <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="h-12 w-full mt-8" />
      </Card>
    );
  }

  if (bookingFlowError) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-8 text-center text-red-500">
        <p>Something went wrong loading data. Please try again.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg gap-0 max-w-lg mx-auto">
      <CardHeader className="border-b-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="mb-4 -ml-2"
          onClick={() => {
            // navigate between steps when inside the flow; otherwise go back in history
            if (step > 1) {
              setStep((step - 1) as 1 | 2 | 3 | 4);
              return;
            }
            typeof window !== "undefined" && window.history.back();
          }}
        >
          <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {step === 1 && (
          <StateSelectionStep
            selectedState={selectedState}
            onSelectState={setSelectedState}
          />
        )}

        {step === 2 && (
          <TreatmentsStep
            selectedTreatments={selectedTreatments}
            onToggleTreatment={handleCheckboxChange}
            bookingFlow={bookingFlow?.treatmentStep}
          />
        )}

        {/* Step 3: patient-type selection (matches design in screenshot) */}
        {step === 3 && (
          <PatientTypeStep
            selectedPlan={selectedPlan}
            onSelectPlan={(plan) => {
              sessionStorage.setItem("plan", plan);
              setSelectedPlan(plan);
            }}
            bookingFlow={bookingFlow}
            providerData={providerData}
          />
        )}

        {step === 4 && (
          <SummaryStep
            selectedPlan={selectedPlan}
            selectedTreatments={selectedTreatments}
            bookingFlow={bookingFlow}
            providerData={providerData}
          />
        )}

        <Button
          className={`w-full mt-6 h-12 ${primaryClass}`}
          size="lg"
          onClick={handleMainContinue}
          disabled={!isPrimaryEnabled}
        >
          {step === 4 ? "Book My Appointment" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-center pt-4 text-sm text-gray-500">
          Already Have An Account?{" "}
          <Link to="/login" className="text-[#4A7C7E] hover:underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
