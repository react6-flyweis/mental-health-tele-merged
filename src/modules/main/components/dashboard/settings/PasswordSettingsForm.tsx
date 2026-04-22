"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { settingApi } from "@/api/setting.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// password validation rules, used for zod
const passwordRequirements = [
  { text: "At least 8 characters long", regex: /.{8,}/ },
  { text: "Contains at least one uppercase letter", regex: /[A-Z]/ },
  { text: "Contains at least one number", regex: /[0-9]/ },
  { text: "Contains at least one special character", regex: /[^A-Za-z0-9]/ },
];

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine(
    (data) =>
      passwordRequirements.every((req) => req.regex.test(data.newPassword)),
    {
      path: ["newPassword"],
      message: "Password does not meet requirements",
    },
  );

export type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordSettingsFormProps {
  onSubmit?: (values: PasswordFormValues) => void;
}

export function PasswordSettingsForm({ onSubmit }: PasswordSettingsFormProps) {
  const router = useNavigate();
  const role = localStorage.getItem("role") || "";
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: PasswordFormValues) {
    console.log("password change", values);
    try {
      const res = await settingApi.changePassword(
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        role,
      );
      if (res.status) {
        localStorage.clear();
        if (role === "Patient") {
          router("/patient-login");
        } else {
          router("/provider/login");
        }
      }
    } catch (error: any) {
      console.log("password change error", error);
      toast.error(error?.message || "Failed to change password");
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-base">Change Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="currentPassword"
                className="w-auto border-0 p-0"
              >
                Current Password
              </FieldLabel>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="bg-muted"
                {...form.register("currentPassword")}
              />
              <FieldError errors={[form.formState.errors.currentPassword]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword" className="w-auto border-0 p-0">
                New Password
              </FieldLabel>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="bg-muted"
                {...form.register("newPassword")}
              />
              <FieldError errors={[form.formState.errors.newPassword]} />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className="w-auto border-0 p-0"
              >
                Confirm New Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="bg-muted"
                {...form.register("confirmPassword")}
              />
              <FieldError errors={[form.formState.errors.confirmPassword]} />
            </Field>
          </FieldGroup>

          <div className="rounded-md bg-blue-50/50 p-4 text-sm text-blue-800">
            <p className="font-medium">Password Requirements:</p>
            <ul className="mt-1 ml-4 list-disc">
              {passwordRequirements.map((req) => (
                <li key={req.text}>{req.text}</li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="bg-gradient-dash text-white">
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
