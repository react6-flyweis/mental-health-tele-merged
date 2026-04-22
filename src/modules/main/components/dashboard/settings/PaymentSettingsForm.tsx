"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { settingApi } from "@/api/setting.api";
import { patientApi } from "@/api/patient.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { dashboardApi } from "@/api/dashboard.service";
import { Badge, Loader2, Trash2 } from "lucide-react";
import AddPaymentMethodDialog from "../AddPaymentMethodDialog";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export const billingSchema = z.object({
  address: z.string().min(1, "Billing address is required"),
  autoPay: z.boolean(),
});

export type BillingFormValues = z.infer<typeof billingSchema>;

interface PaymentSettingsFormProps {
  defaultValues?: Partial<BillingFormValues>;
  paymentMethods?: PaymentMethod[];
  onSubmit?: (values: BillingFormValues) => void;
}

export function PaymentSettingsForm({
  defaultValues,
  paymentMethods = [],
  onSubmit,
}: PaymentSettingsFormProps) {
  const [methods, setMethods] = useState<PaymentMethod[]>(
    []);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleCards = async () => {
    try {
      const res = await dashboardApi.getCardsApi("patient");
      const data = res?.data?.paymentMethods?.map((i: any) => {
        return {
          id: i._id,
          brand: i.brand,
          last4: i.last4,
          expiry: `${i.expMonth}/${i.expYear}`,
          isDefault: i.isDefault,
        }
      })
      console.log({ data });
      setMethods(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await dashboardApi.getPayments("patient");
      setPayments(res?.data?.payments || []);

    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCardApi = async (cardId: string) => {
    if (deletingId === cardId) return;

    try {
      setDeletingId(cardId);

      const res = await dashboardApi.deleteCardApi("patient", cardId);
      console.log({ res });

      handleCards();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  console.log({ methods })
  const handleDefaultCard = async (cardId: string) => {
    try {
      const res = await dashboardApi.defaultCardApi("patient", cardId);
      console.log({ res });
      handleCards();
    } catch (error) {
      console.error(error);
    }
  }
  const addCard = async (payload: any) => {
    try {
      const dataPayload = {
        cardNumber: payload.last4,
        expMonth: payload.expiry.split("/")[0],
        expYear: payload.expiry.split("/")[1],
        cvv: payload.cvv,
        cardholderName: payload.cardholderName,
      }
      const res = await dashboardApi.postAddCardApi("patient", dataPayload);
      setMethods((prev) => [...prev, res?.data?.paymentMethod]);
      handleCards();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleCards();
    fetchPayments();
  }, []);

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      address: "123 Main Street, San Francisco, CA 94102",
      autoPay: false,
      ...defaultValues,
    },
  });

  async function handleSubmit(values: BillingFormValues) {
    console.log("billing info saved", values);
    const role = localStorage.getItem("role") || "";
    try {
      await settingApi.updateSettings({
        billingAddress: values?.address,
        autoPay: values?.autoPay,

      }, role);
      onSubmit?.(values);

      toast.success("Billing information saved successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to save billing information");
    }

  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientApi.getProfile();
        const data = res?.data?.billing;
        form.reset({
          address: data?.billingAddress,
          autoPay: data?.autoPay,
        });
      } catch { }
    };

    fetchProfile();
  }, [form]);

  function handleAddMethod() {
    const newMethod: PaymentMethod = {
      id: `pm_${methods.length + 1}`,
      brand: "Mastercard",
      last4: "1111",
      expMonth: 1,
      expYear: 2028,
      isDefault: false,
    };
    setMethods((prev) => [...prev, newMethod]);
  }

  return (
    <div className="space-y-5">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {methods.map((m: any, idx) => (
            <div
              key={m.id}
              className={`relative flex items-center justify-between border rounded-lg p-4 
                ${m.isDefault ? "border-primary" : "border-gray-200"}`}
            >
              <div
                onClick={() => {
                  if (deletingId !== m.id) handleDeleteCardApi(m.id);
                }}
                className={`absolute top-2 right-2 ${deletingId === m.id
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
              >
                {deletingId === m.id ? (
                  <Loader2 className="animate-spin text-red-500" />
                ) : (
                  <Trash2 className="size-5 text-red-500" />
                )}
              </div>              <div>
                <p className="font-medium">
                  {m.brand} •••• {m.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {m.expiry}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {m.isDefault ? (
                  <Badge className="rounded-full px-3 py-1 text-xs">Default</Badge>
                ) : (
                  <button
                    onClick={() => handleDefaultCard(m.id)}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
          <AddPaymentMethodDialog
            onAdd={(method) => {
              console.log({ method }); addCard(method)
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <Field>
              <FieldLabel className="w-auto border-0 p-0">
                Billing Address
              </FieldLabel>
              <Input
                id="address"
                placeholder="123 Main Street, San Francisco, CA 94102"
                className="bg-muted"
                {...form.register("address")}
              />
              <FieldError errors={[form.formState.errors.address]} />
            </Field>

            <Controller
              name="autoPay"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="font-medium">Auto-pay</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically pay for sessions
                    </p>
                  </div>
                  <Switch
                    id="auto-pay"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Button type="submit" className="bg-gradient-dash text-white">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
