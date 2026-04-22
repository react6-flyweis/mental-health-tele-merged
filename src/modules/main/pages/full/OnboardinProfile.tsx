"use client";

import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
import { authApi } from "@/api/auth.api";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { patientApi } from "@/api/patient.api";

function PatientProfileContent() {
  const {
    data: bookingFlow,
    loading,
    error,
  } = useFetch(publicPageApi.getBookingFlow) as any;
  const [providerData, setProviderData] = useState<any>(null);
  const [providerLoading, setProviderLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [providerError, setProviderError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get("providerId");
  const router = useNavigate();
  const storedProviderData = sessionStorage.getItem("providerData");
  const parsedProviderData = storedProviderData
    ? JSON.parse(storedProviderData)
    : null;
  const fields = bookingFlow?.profileStep?.fields || [];

  const getMaxDOB = () => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      .toISOString()
      .split("T")[0];
  };

  const validateDOB = (value: string) => {
    const dob = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 18 || "You must be at least 18 years old";
  };

  const createSchema = (fields: any[]) => {
    const shape: any = {};

    fields.forEach((field) => {
      let schema;

      if (field.type === "boolean") {
        if (field.required) {
          schema = z.boolean().refine((val) => val === true, {
            message: "Please accept to continue",
          });
        } else {
          schema = z.boolean().optional();
        }
      } else {
        schema = z.string().trim();

        if (field.required) {
          schema = schema.min(1, `${field.label} is required`);
        }

        if (field.key === "email") {
          schema = schema
            .min(1, "Email is required")
            .email("Please enter a valid email address");
        }

        if (field.key === "password") {
          schema = schema
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters long");
        }

        if (field.key === "zipCode") {
          schema = schema
            .min(1, "Zip code is required")
            .regex(/^\d{5}(-\d{4})?$/, "Enter a valid 5-digit zip code");
        }

        if (field.key === "mobileNumber") {
          schema = schema
            .min(1, "Mobile number is required")
            .regex(
              /^(\+1[-.\s]?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
              "Enter a valid US mobile number",
            );
        }

        if (field.key === "dateOfBirth") {
          schema = schema.min(1, "Date of birth is required").refine(
            (val) => {
              const dob = new Date(val);
              if (isNaN(dob.getTime())) return false;

              const today = new Date();
              let age = today.getFullYear() - dob.getFullYear();
              const m = today.getMonth() - dob.getMonth();

              if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
              }

              return age >= 18;
            },
            {
              message: "You must be at least 18 years old",
            },
          );
        }
      }

      shape[field.key] = schema;
    });

    return z.object(shape);
  };

  const schema = createSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (providerId) {
      setProviderLoading(true);
      publicPageApi
        .getProviderBySlug(providerId)
        .then((res) => setProviderData(res.data))
        .catch(() => setProviderError(true))
        .finally(() => setProviderLoading(false));
    }
  }, [providerId]);

  const onSubmit = async (data: any) => {
    try {
      setFormLoading(true);
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        zip: data.zipCode,
        dob: data.dateOfBirth,
        mobile: data.mobileNumber,
        email: data.email,
        marketingOptIn: data.marketingOptIn,
      };

      const res: any = await authApi.patientRegister({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (res?.status === "success") {
        toast.success("Patient profile created successfully");
        sessionStorage.setItem("patiendDetail", JSON.stringify(payload));
        sessionStorage.setItem(
          "providerData",
          JSON.stringify(providerData?.suggestedProvider),
        );
        sessionStorage.setItem(
          "patientToken",
          JSON.stringify(res?.data?.token),
        );
        router("/appointment");
      }
    } catch (err) {
      toast.error((err as any)?.message || "Failed to create patient profile");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto py-8 px-4">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </Card>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Something went wrong</div>;
  }

  const providers = (providerData?.providers || [])
    .filter((p: any) => p.isFeatured)
    .sort((a: any, b: any) => a.featuredOrder - b.featuredOrder);

  const visibleProviders = providers.slice(0, 3);
  const remainingCount = providers.length - visibleProviders.length;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <Card className="shadow-lg gap-0">
        <CardHeader className="border-b-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="-ml-2"
            onClick={() =>
              typeof window !== "undefined" && window.history.back()
            }
          >
            <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center -space-x-3">
              {visibleProviders.map((p: any) => {
                const initials = `${p.firstName?.[0] || ""}${p.lastName?.[0] || ""}`;
                return (
                  <Avatar
                    key={p._id}
                    className="size-14 border border-slate-100 bg-white"
                  >
                    <AvatarFallback>{initials}</AvatarFallback>
                    <AvatarImage src={p.profileImageUrl} />
                  </Avatar>
                );
              })}

              {remainingCount > 0 && (
                <div className="size-12 rounded-full bg-[#eef8f6] z-10 border border-[#E6F3F1] flex items-center justify-center text-sm font-semibold text-[#274A48]">
                  {remainingCount}+
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 max-w-xl">
              {providerData?.pageContent?.heroTitle ??
                "Over 50 Experienced Providers Specializing In ADHD Are Ready To Help"}
            </p>

            <h1 className="text-xl font-semibold text-center">
              Set Up Your Patient Profile
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {fields.map((field: any) => {
              if (field.type === "boolean") {
                return (
                  <div
                    key={field.key}
                    className="flex items-start gap-2 sm:col-span-2"
                  >
                    <Controller
                      name={field.key}
                      control={control}
                      defaultValue={false}
                      render={({ field: ctrl }) => (
                        <div className="flex items-start gap-2 sm:col-span-2">
                          <Checkbox
                            checked={Boolean(ctrl.value)}
                            onCheckedChange={(v) => ctrl.onChange(!!v)}
                          />
                          <Label>{field.label}</Label>

                          {errors[field.key] && (
                            <p className="text-red-500 text-xs">
                              {errors[field.key]?.message as string}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                );
              }

              const isPassword = field.key === "password";
              const isDOB = field.key === "dateOfBirth";

              return (
                <div
                  key={field.key}
                  className={`space-y-2 ${isPassword ? "sm:col-span-2" : ""}`}
                >
                  <Label>{field.label}</Label>

                  <div className="relative">
                    <Input
                      type={
                        isPassword
                          ? showPassword
                            ? "text"
                            : "password"
                          : isDOB
                            ? "date"
                            : field.type || "text"
                      }
                      max={isDOB ? getMaxDOB() : undefined}
                      {...register(field.key, {
                        validate: isDOB
                          ? (value) => validateDOB(String(value ?? ""))
                          : undefined,
                      })}
                    />

                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {errors[field.key] && (
                    <p className="text-red-500 text-xs">
                      {errors[field.key]?.message as string}
                    </p>
                  )}
                </div>
              );
            })}

            <Button
              disabled={formLoading}
              type="submit"
              className="w-full mt-2 h-12 bg-gradient-primary sm:col-span-2"
            >
              Create My Patient Profile
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center text-sm sm:col-span-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientProfileContent />
    </Suspense>
  );
}
