"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { PaymentMethod } from "./PaymentMethodCard";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19)
    .regex(/^[0-9 ]+$/, "Only digits and spaces allowed"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^[0-9]{3}$/, "CVV must be 3 digits"),
  cardholderName: z.string().min(1, "Name is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface AddPaymentMethodDialogProps {
  onAdd: (method: PaymentMethod) => void;
  trigger?: React.ReactNode;
}

export default function AddPaymentMethodDialog({
  onAdd,
  trigger,
}: AddPaymentMethodDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const detectBrand = (number: string) => {
    const digits = number.replace(/\s+/g, "");
    if (/^4/.test(digits)) return "Visa";
    if (/^5[1-5]/.test(digits)) return "Mastercard";
    return "Card";
  };

  const onSubmit = (values: PaymentFormValues) => {
    const digits = values.cardNumber.replace(/\s+/g, "");
    const newMethod: PaymentMethod = {
      id: crypto.randomUUID(),
      brand: detectBrand(digits),
      last4: digits,
      expiry: values.expiry,
      isDefault: false,
      cardholderName: values.cardholderName,
    };

    onAdd(newMethod);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-dash ">
            <PlusIcon className="size-4 mr-1" /> Add Card
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Add Payment Method
          </DialogTitle>
          <DialogDescription>
            Add a new credit or debit card for payments
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex flex-col">
              <Label className="mb-2">Card Number</Label>
              <Input
                {...form.register("cardNumber")}
                placeholder="1234 5678 9012 3456"
                className="bg-gray-50"
              />
              {form.formState.errors.cardNumber && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.cardNumber.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-col">
                <Label className="mb-2">Expiry Date</Label>
                <Input
                  {...form.register("expiry")}
                  placeholder="MM/YY"
                  className="bg-gray-50"
                />
                {form.formState.errors.expiry && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.expiry.message}
                  </p>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <Label className="mb-2">CVV</Label>
                <Input
                  {...form.register("cvv")}
                  placeholder="123"
                  className="bg-gray-50"
                />
                {form.formState.errors.cvv && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.cvv.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2">Cardholder Name</Label>
              <Input
                {...form.register("cardholderName")}
                placeholder="John Doe"
                className="bg-gray-50"
              />
              {form.formState.errors.cardholderName && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.cardholderName.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="border-t-0 bg-white mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-dash">
              Add Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
