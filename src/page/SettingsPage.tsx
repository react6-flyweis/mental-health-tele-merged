import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UpdatePaymentMethodDialog, {
  type PaymentMethodForm,
} from "@/components/settings/UpdatePaymentMethodDialog";
import LogoutDialog from "@/components/settings/LogoutDialog";
import NotificationPreferencesSection from "@/components/settings/NotificationPreferencesSection";
import { useUpdatePasswordMutation } from "@/hooks/useNotificationPreferencesMutations";
import { usePageTitle } from "@/store/pageTitleStore";
import { useAuthStore } from "@/store/authStore";
import { Lock, CreditCard, ShieldAlert, LogOut } from "lucide-react";

// password form schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  usePageTitle("Settings");
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<
    string | null
  >(null);

  const updatePasswordMutation = useUpdatePasswordMutation();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodForm>({
    method: "bank",
    accountHolderName: "Dr. Sarah Mitchell",
    bankName: "Bank of America",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    accountType: "Checking",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onPasswordSubmit(data: PasswordForm) {
    setPasswordSuccessMessage(null);

    updatePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: (response) => {
          setPasswordSuccessMessage(response.message);
          reset();
        },
      },
    );
  }

  function maskLast4(value?: string) {
    if (!value) {
      return "----";
    }

    const normalized = value.replace(/\s+/g, "");
    return normalized.slice(-4) || "----";
  }

  function onPaymentMethodSave(data: PaymentMethodForm) {
    setPaymentMethod(data);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <NotificationPreferencesSection />

      {/* password/security card */}
      <Card>
        <CardHeader className="border-b flex gap-2">
          <div className="bg-gradient-dash rounded-md size-10 text-white flex items-center justify-center">
            <Lock className="size-5" />
          </div>
          <div className="">
            <CardTitle>Password & Security</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {updatePasswordMutation.isError ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {updatePasswordMutation.error instanceof Error
                ? updatePasswordMutation.error.message
                : "Unable to update password."}
            </div>
          ) : null}

          {passwordSuccessMessage ? (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {passwordSuccessMessage}
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit(onPasswordSubmit)}>
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  className="h-10"
                  disabled={updatePasswordMutation.isPending}
                  {...register("currentPassword")}
                />
              </FieldContent>
              <FieldError
                errors={errors.currentPassword ? [errors.currentPassword] : []}
              />
            </Field>

            <Field>
              <FieldLabel>New Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  className="h-10"
                  disabled={updatePasswordMutation.isPending}
                  {...register("newPassword")}
                />
              </FieldContent>
              <FieldError
                errors={errors.newPassword ? [errors.newPassword] : []}
              />
            </Field>

            <Field>
              <FieldLabel>Confirm New Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  className="h-10"
                  disabled={updatePasswordMutation.isPending}
                  {...register("confirmPassword")}
                />
              </FieldContent>
              <FieldError
                errors={errors.confirmPassword ? [errors.confirmPassword] : []}
              />
            </Field>

            <Button
              type="submit"
              className="mt-2 bg-gradient-dash"
              disabled={updatePasswordMutation.isPending}
            >
              {updatePasswordMutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* payment account card */}
      <Card>
        <CardHeader className="border-b flex gap-2">
          <div className="bg-gradient-dash rounded-md size-10 text-white flex items-center justify-center">
            <CreditCard className="size-5" />
          </div>
          <div>
            <CardTitle>Payment Account</CardTitle>
            <CardDescription>Manage your payout method</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg bg-muted/50 p-4">
            Connected Account
            <div className="font-medium">
              {paymentMethod.method === "bank"
                ? `${paymentMethod.bankName || "Bank Account"} ****${maskLast4(paymentMethod.accountNumber)}`
                : `Debit Card ****${maskLast4(paymentMethod.cardNumber)}`}
            </div>
          </div>
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => setIsPaymentDialogOpen(true)}
          >
            Update Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* privacy & data card */}
      <Card>
        <CardHeader className="border-b flex gap-2">
          <div className="bg-gradient-dash rounded-md size-10 text-white flex items-center justify-center">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <CardTitle>Privacy & Data</CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start h-10">
            Download My Data
          </Button>
          <Button variant="outline" className="w-full justify-start h-10">
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start h-10">
            Terms of Service
          </Button>
        </CardContent>
      </Card>

      {/* account actions card */}
      <Card>
        <CardHeader className="border-b flex gap-2">
          <div className="bg-red-100 rounded-md size-10 text-red-500 flex items-center justify-center">
            <LogOut className="size-5" />
          </div>
          <div>
            <CardTitle>Account</CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            Log Out
          </Button>
        </CardContent>
      </Card>

      <UpdatePaymentMethodDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        onSave={onPaymentMethodSave}
        initialValues={paymentMethod}
      />

      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={() => {
          clearAuth();
          setIsLogoutDialogOpen(false);
          navigate("/provider-login", { replace: true });
        }}
      />
    </div>
  );
}
