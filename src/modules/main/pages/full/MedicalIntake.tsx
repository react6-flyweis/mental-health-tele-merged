"use client";

import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
import { toast } from "react-toastify";

// Dynamic PHQ-9 schema will be created based on API data

const intakeFormSchema = z.object({
  // basic info
  firstName: z.string().min(1, { message: "First name is required" }),
  middleInitial: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  sex: z.string().min(1, { message: "Please select your sex" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  primaryPhone: z.string().optional(),
  mobilePhone: z.string().optional(),
  workPhone: z.string().optional(),
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  maritalStatus: z.string().optional(),
  drivingLicense: z.string().optional(),

  // emergency contact
  emergency: z.object({
    relationship: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    primaryPhone: z.string().optional(),
    mobilePhone: z.string().optional(),
    workPhone: z.string().optional(),
    email: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }),

  // medical questions
  medicalHistory: z.array(z.string()).optional(),
  currentMedications: z.array(z.string()).optional(),
  medicationAllergies: z.array(z.string()).optional(),
  preferredPharmacies: z.array(z.string()).optional(),
  pharmacyName: z.string().optional(),
  pharmacyAddress: z.string().optional(),
  heardFrom: z.string().optional(),

  // phq - will be dynamically created
  phq: z.record(z.number().int().min(0).max(3)).optional(),
  difficulty: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export default function MedicalIntakePage() {
  const router = useNavigate();
  const { data: bookingFlow, loading: bookingFlowLoading, error: bookingFlowError } = useFetch(publicPageApi.getBookingFlow) as any;

  const intakeSections = bookingFlow?.intakeStep?.sections;
  const hasDynamicSections = Array.isArray(intakeSections) && intakeSections.length > 0;
console.log({bookingFlow});
const intakeForm=bookingFlow?.intakeStep?.phq9

  const showSection = (key: string) => {
    if (!hasDynamicSections) return true;
    return intakeSections.some((s: any) => s.key === key);
  };
  // Create dynamic PHQ-9 default values based on API data
  const createPhqDefaults = () => {
    if (!intakeForm?.questions) return {};
    
    const defaults: Record<string, number> = {};
    intakeForm.questions.forEach((question: any) => {
      defaults[question.key] = 0; // Default to "Not At All" (value 0)
    });
    return defaults;
  };

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      sex: "",
      phq: createPhqDefaults(),
      difficulty: "",
    },
    // validate on submit, re-validate on change and focus the first error
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // dynamic lists
  const [newMedicalHistory, setNewMedicalHistory] = useState("");
  const [newMed, setNewMed] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newPharmacy, setNewPharmacy] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addToArray(
    field:
      | "medicalHistory"
      | "currentMedications"
      | "medicationAllergies"
      | "preferredPharmacies",
    value: string,
  ) {
    if (!value) return;
    const current = form.getValues(field) || [];
    form.setValue(field, [...current, value], {
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  async function onSubmit(data: IntakeFormValues) {
    console.log("intake form data", data);
    setIsSubmitting(true);
    try {
      const providerData = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("providerData") || "{}") : {};
      const selectedSlot = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("selectedSlot") || "{}") : {};
      const carePlan = typeof window !== "undefined" ? sessionStorage.getItem("plan") : "new_patient";
      const careType = carePlan === "new" ? "new_patient" : (carePlan || "new_patient");

      let formattedDate = "2026-04-20";
      let formattedTime = "10:00";
      try {
        if (selectedSlot?.date && selectedSlot?.start) {
          let dateObj = new Date();
          if (selectedSlot.date !== "Today") {
            dateObj = new Date(`${selectedSlot.date}, ${dateObj.getFullYear()}`);
          }
          const timeParts = selectedSlot.start.match(/(\d+):(\d+)\s*(AM|PM)?/i);
          if (timeParts) {
            let hours = parseInt(timeParts[1], 10);
            let minutes = parseInt(timeParts[2], 10);
            const ampm = timeParts[3]?.toUpperCase();

            if (ampm === "PM" && hours < 12) hours += 12;
            if (ampm === "AM" && hours === 12) hours = 0;

            minutes = Math.floor(minutes / 20) * 20;

            dateObj.setHours(hours, minutes, 0, 0);
          }
          const yyyy = dateObj.getFullYear();
          const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
          const dd = String(dateObj.getDate()).padStart(2, "0");
          formattedDate = `${yyyy}-${mm}-${dd}`;
          formattedTime = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
        }
      } catch (e) {
        console.error("Failed to parse date/time", e);
      }

      const payload = {
        fullName: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        email: data.email || "",
        mobileNumber: data.mobilePhone || "",
        providerId: providerData?._id || "",
        conditionLabel: providerData?.specialty || "ADHD / ADD Treatment",
        conditionSlug: "adhd-add-treatment",
        careType: careType,
        consultationFee: selectedSlot?.date === "Today" ? (providerData?.sessionTypes?.[0]?.fee || 195) : (providerData?.suggestedProvider?.sessionTypes?.[1]?.fee || providerData?.sessionTypes?.[1]?.fee || 195),
        date: formattedDate,
        time: formattedTime,
        type: "video",
        reasonForVisit: data.medicalHistory?.[0] || "Difficulty focusing and inattentiveness",
        marketingMessages: true,
        agreeToTerms: true,
      };

      const res: any = await publicPageApi.postBookingFlow(payload);
      if (res.status === 200 || res.status === 201 || res.status === "success") {
        router("/appointment/medical-intake/success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit intake forms. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (bookingFlowLoading) {
    return (
      <div className="relative max-w-6xl mx-auto p-5 pt-16 py-8 space-y-4 bg-[#E6E8EE] flex flex-col items-center min-h-[60vh]">
        <Card className="w-full p-6 shadow-lg space-y-4">
          <Skeleton className="h-8 w-1/4 mb-6" />
          
          {/* Basic Information Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Medical Questions Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* PHQ-9 Questionnaire Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="overflow-x-auto">
              <div className="space-y-2">
                {/* Table header skeleton */}
                <div className="flex gap-2 p-2 bg-gray-100">
                  <Skeleton className="h-4 flex-1" />
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                  ))}
                </div>
                {/* Question rows skeleton */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex gap-2 p-2 border-t">
                    <Skeleton className="h-4 flex-1" />
                    {[0, 1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-4 w-8 rounded-full" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Difficulty options skeleton */}
            <div className="border-t p-3">
              <Skeleton className="h-4 w-64 mb-3" />
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      </div>
    );
  }

  if (bookingFlowError) {
    return (
      <div className="relative max-w-6xl mx-auto p-5 pt-16 py-8 space-y-4 bg-[#E6E8EE] min-h-[60vh] flex items-center justify-center">
        <Card className="shadow-lg p-8 text-center text-red-500 w-full max-w-md mx-auto">
          <p>Something went wrong loading data. Please try again.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto p-5 pt-16 py-8 space-y-4 bg-[#E6E8EE]">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute h-10 w-10 top-3 rounded-full bg-[#eef7f6] text-primary hover:bg-[#e0f0ef]"
        onClick={() => router(-1)}
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("validation errors", errors);
        })}
        className="space-y-4"
      >
        {/* summary */}
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="mb-4 text-destructive">
            Please correct the errors below before submitting.
          </div>
        )}
        {/* basic information */}
        {showSection("basicInformation") && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-primary">
                Basic Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...form.register("firstName")} />
                  <FieldError errors={[form.formState.errors.firstName]} />
                </Field>
                <Field>
                  <FieldLabel>Middle Initial</FieldLabel>
                  <Input {...form.register("middleInitial")} />
                  <FieldError errors={[form.formState.errors.middleInitial]} />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input {...form.register("lastName")} />
                  <FieldError errors={[form.formState.errors.lastName]} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="sex">Sex</FieldLabel>
                  <Controller
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="sex">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[form.formState.errors.sex]} />
                </Field>
                <Field>
                  <FieldLabel>DOB</FieldLabel>
                  <Input type="date" {...form.register("dob")} />
                  <FieldError errors={[form.formState.errors.dob]} />
                </Field>
                <Field>
                  <FieldLabel>Marital Status</FieldLabel>
                  <Input {...form.register("maritalStatus")} />
                  <FieldError errors={[form.formState.errors.maritalStatus]} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Primary Phone Number</FieldLabel>
                  <Input {...form.register("primaryPhone")} />
                  <FieldError errors={[form.formState.errors.primaryPhone]} />
                </Field>
                <Field>
                  <FieldLabel>Mobile Number</FieldLabel>
                  <Input {...form.register("mobilePhone")} />
                  <FieldError errors={[form.formState.errors.mobilePhone]} />
                </Field>
                <Field>
                  <FieldLabel>Work Phone Number</FieldLabel>
                  <Input {...form.register("workPhone")} />
                  <FieldError errors={[form.formState.errors.workPhone]} />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...form.register("email")} />
                  <FieldError errors={[form.formState.errors.email]} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input {...form.register("address1")} />
                  <FieldError errors={[form.formState.errors.address1]} />
                </Field>
                <Field>
                  <FieldLabel>Address 2</FieldLabel>
                  <Input {...form.register("address2")} />
                  <FieldError errors={[form.formState.errors.address2]} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input {...form.register("city")} />
                  <FieldError errors={[form.formState.errors.city]} />
                </Field>
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input {...form.register("state")} />
                  <FieldError errors={[form.formState.errors.state]} />
                </Field>
                <Field>
                  <FieldLabel>Zip</FieldLabel>
                  <Input {...form.register("zip")} />
                  <FieldError errors={[form.formState.errors.zip]} />
                </Field>
              </div>

              <Field>
                <FieldLabel>State Driving License / State Id</FieldLabel>
                <div className="flex gap-4 items-center">
                  <Input
                    className="flex-1"
                    {...form.register("drivingLicense")}
                  />
                  <Button variant="outline" size="sm">
                    Upload Here
                  </Button>
                </div>
                <FieldError errors={[form.formState.errors.drivingLicense]} />
              </Field>
            </CardContent>
          </Card>
        )}

        {/* emergency contact */}
        {showSection("emergencyContactDetails") && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-primary">
                Emergency Contact
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Relationship To Contact</FieldLabel>
                  <Input {...form.register("emergency.relationship")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency
                        ?.relationship as unknown as { message?: string },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...form.register("emergency.firstName")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.firstName as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Middle Name</FieldLabel>
                  <Input {...form.register("emergency.middleName")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.middleName as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input {...form.register("emergency.lastName")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.lastName as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Primary Phone Number</FieldLabel>
                  <Input {...form.register("emergency.primaryPhone")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency
                        ?.primaryPhone as unknown as { message?: string },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Mobile Number</FieldLabel>
                  <Input {...form.register("emergency.mobilePhone")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.mobilePhone as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Work Phone Number</FieldLabel>
                  <Input {...form.register("emergency.workPhone")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.workPhone as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...form.register("emergency.email")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.email as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Address Line 1</FieldLabel>
                  <Input {...form.register("emergency.address1")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.address1 as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Address Line 2</FieldLabel>
                  <Input {...form.register("emergency.address2")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.address2 as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input {...form.register("emergency.city")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.city as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input {...form.register("emergency.state")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.state as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>Zip</FieldLabel>
                  <Input {...form.register("emergency.zip")} />
                  <FieldError
                    errors={[
                      form.formState.errors.emergency?.zip as unknown as {
                        message?: string;
                      },
                    ]}
                  />
                </Field>
              </div>
            </CardContent>
          </Card>
        )}

        {/* medical questions */}
        {showSection("medicalQuestions") && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-primary">
                Medical Question
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">

                <Field>
                  <FieldLabel>Concern in brief</FieldLabel>

                  <div className="mt-1">
                    <textarea
                      // value={newMedicalHistory}
                      // onChange={(e) => setNewMedicalHistory(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {(form.getValues("medicalHistory") || []).map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </Field>

                <Field>
                  <FieldLabel>List Your Past Medical History</FieldLabel>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newMedicalHistory}
                      onChange={(e) => setNewMedicalHistory(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("medicalHistory", newMedicalHistory);
                        setNewMedicalHistory("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {(form.getValues("medicalHistory") || []).map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Current Medications</FieldLabel>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newMed}
                      onChange={(e) => setNewMed(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("currentMedications", newMed);
                        setNewMed("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {(form.getValues("currentMedications") || []).map(
                      (item, i) => (
                        <div key={i}>{item}</div>
                      ),
                    )}
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Medications Allergy</FieldLabel>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("medicationAllergies", newAllergy);
                        setNewAllergy("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {(form.getValues("medicationAllergies") || []).map(
                      (item, i) => (
                        <div key={i}>{item}</div>
                      ),
                    )}
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Your Preferred Pharmacies</FieldLabel>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newPharmacy}
                      onChange={(e) => setNewPharmacy(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("preferredPharmacies", newPharmacy);
                        setNewPharmacy("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    {(form.getValues("preferredPharmacies") || []).map(
                      (item, i) => (
                        <div key={i}>{item}</div>
                      ),
                    )}
                  </div>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Pharmacy Name</FieldLabel>
                    <Input {...form.register("pharmacyName")} />
                    <FieldError errors={[form.formState.errors.pharmacyName]} />
                  </Field>
                  <Field>
                    <FieldLabel>Pharmacy Address</FieldLabel>
                    <Input {...form.register("pharmacyAddress")} />
                    <FieldError
                      errors={[form.formState.errors.pharmacyAddress]}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>How Did You Hear About Us?</FieldLabel>
                    <Input {...form.register("heardFrom")} />
                    <FieldError errors={[form.formState.errors.heardFrom]} />
                  </Field>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PHQ-9 */}
        {showSection("phq9") && intakeForm && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-primary">
                {intakeForm.title}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-2" colSpan={3}>
                        {intakeForm.prompt}
                      </th>
                      {intakeForm.responseOptions
                        .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                        .map((option: any) => (
                          <th key={option.value} className="p-2 text-center">
                            {option.label}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {intakeForm.questions
                      .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                      .map((question: any, index: number) => {
                        const key = `phq.${question.key}` as const;
                        const phqError = (
                          form.formState.errors.phq as
                          | Record<string, { message?: string } | undefined>
                          | undefined
                        )?.[question.key];
                        return (
                          <Fragment key={question.key}>
                            <tr className="border-t border-slate-200 py-2">
                              <td className="p-2 py-3 text-sm" colSpan={3}>
                                {question.text}
                              </td>
                              {intakeForm.responseOptions
                                .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                                .map((option: any) => (
                                  <td key={option.value} className="p-2 py-3 text-center">
                                    <Controller
                                      control={form.control}
                                      name={key}
                                      render={({ field }) => (
                                        <input
                                          type="radio"
                                          value={option.value}
                                          checked={Number(field.value) === option.value}
                                          onChange={() => field.onChange(option.value)}
                                        />
                                      )}
                                    />
                                  </td>
                                ))}
                            </tr>
                            {phqError?.message && (
                              <tr
                                className="border-t border-slate-100"
                                key={`err-${question.key}`}
                              >
                                <td
                                  className="px-2 pb-2 text-destructive text-xs"
                                  colSpan={intakeForm.responseOptions.length + 3}
                                >
                                  {question.text}: {phqError.message}
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200">
                <div className="p-2">
                  {intakeForm.difficultyPrompt}
                  <div className="mt-2 flex flex-wrap gap-4">
                    {intakeForm.difficultyOptions
                      .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                      .map((option: any) => (
                        <div key={option.value} className="flex items-center gap-2">
                          <Controller
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                              <div className="flex flex-col items-center bg-[#F4F9F8B2] rounded p-4 gap-1">
                                <span className="text-sm">{option.label}</span>
                                <input
                                  type="radio"
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={() => field.onChange(option.value)}
                                />
                              </div>
                            )}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end pt-4">
          <Button
            size="lg"
            className="bg-gradient-dash h-10 px-8"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </Button>
        </div>
      </form>
    </div>
  );
}
