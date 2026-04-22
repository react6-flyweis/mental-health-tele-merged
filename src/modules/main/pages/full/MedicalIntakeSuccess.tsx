"use client";

import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import checkCircleImg from "@/assets/check-circle.png";
import { Link } from "react-router";

export default function MedicalIntakeSuccessPage() {
  const router = useNavigate();

  return (
    <Card className="max-w-md mx-auto text-center">
      <CardHeader className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute h-10 w-10  top-0 left-4 rounded-full bg-[#eef7f6] text-primary hover:bg-[#e0f0ef]"
          onClick={() => router(-1)}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <img src={checkCircleImg} alt="Success" className="mx-auto size-40" />
        <h2 className="text-2xl font-semibold">Form Successfully Submitted!</h2>
        <p className="max-w-xs mx-auto text-slate-600">
          We Have Sent You An Invoice Through Mail And SMS
        </p>
        <Link to="/patient-register">
          <Button
            size="lg"
            className="bg-gradient-dash mt-4 flex items-center justify-center w-full"
          >
            Login To Your Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
