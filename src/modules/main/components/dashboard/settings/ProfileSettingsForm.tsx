"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useAuth } from "@/components/context/auth.context";

const timeZoneOptions = [
  "Pacific Time (PT)",
  "Mountain Time (MT)",
  "Central Time (CT)",
  "Eastern Time (ET)",
] as const;

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  dateOfBirth: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  timeZone: z.enum(timeZoneOptions, {
    message: "Please select a time zone",
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const fullWidthFields: Array<{
  key: keyof Omit<ProfileFormValues, "firstName" | "lastName" | "timeZone">;
  label: string;
  placeholder: string;
}> = [
    { key: "email", label: "Email", placeholder: "sarah.j@email.com" },
    {
      key: "phoneNumber",
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
    },
    { key: "dateOfBirth", label: "Date of Birth", placeholder: "" },
    {
      key: "address",
      label: "Address",
      placeholder: "123 Main Street, San Francisco, CA 94102",
    },
  ];

interface ProfileSettingsFormProps {
  defaultValues?: Partial<ProfileFormValues>;
  onSubmit?: (values: ProfileFormValues) => void;
}

export function ProfileSettingsForm({
  defaultValues,
  onSubmit,
}: ProfileSettingsFormProps) {
  const { getProfile } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      timeZone: "Pacific Time (PT)",
      ...defaultValues,
    },
  });

  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, PNG or GIF allowed")
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError("File size should be less than 5MB")
      return
    }

    setError("")

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientApi.getProfile();
        const data = res?.data;
        const dob = data?.dateOfBirth
          ? dayjs(data.dateOfBirth).format("YYYY-MM-DD")
          : "";
        form.reset({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          phoneNumber: data?.phone || "",
          dateOfBirth: dob || "",
          address: data?.address || "",
          timeZone: data?.timezone || "Pacific Time (PT)",
        });
      } catch { }
    };

    fetchProfile();
  }, [form]);

  const [loading, setLoading] = useState(false);
  async function handleSubmit(values: ProfileFormValues) {
    try {
      setLoading(true);

      await patientApi.updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        // email: values.email,
        address: values.address,
        timezone: values.timeZone,
      });
      await getProfile();
      toast.success("Profile updated successfully");
      onSubmit?.(values);
    } catch (e) {
      console.log(e);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-base">Profile Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="size-16">
              {image ? (
                <img src={image} className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback>
                  {form.watch("firstName")?.[0]}
                  {form.watch("lastName")?.[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleFileChange}
              />

              <Button
                type="button"
                onClick={handleButtonClick}
                className="bg-gradient-dash text-white"
              >
                Upload New Photo
              </Button>

              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max size 5MB
              </p>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}
            </div>
          </div>

          <FieldGroup className="gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel className="w-auto border-0 p-0">
                  First Name
                </FieldLabel>
                <Input
                  className="bg-muted"
                  {...form.register("firstName")}
                />
                <FieldError errors={[form.formState.errors.firstName]} />
              </Field>

              <Field>
                <FieldLabel className="w-auto border-0 p-0">
                  Last Name
                </FieldLabel>
                <Input
                  className="bg-muted"
                  {...form.register("lastName")}
                />
                <FieldError errors={[form.formState.errors.lastName]} />
              </Field>
            </div>

            {fullWidthFields.map((fieldConfig) => (
              <Field key={fieldConfig.key}>
                <FieldLabel className="w-auto border-0 p-0">
                  {fieldConfig.label}
                </FieldLabel>
                <Input
                  placeholder={fieldConfig.placeholder}
                  disabled={fieldConfig.key === "email"}
                  className="bg-muted"
                  type={fieldConfig.key === "dateOfBirth" ? "date" : "text"}
                  {...form.register(fieldConfig.key)}
                />
                <FieldError
                  errors={[form.formState.errors[fieldConfig.key]]}
                />
              </Field>
            ))}

            <Field>
              <FieldLabel className="w-auto border-0 p-0">
                Time Zone
              </FieldLabel>
              <Controller
                name="timeZone"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-muted">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZoneOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.timeZone]} />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-dash text-white disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}