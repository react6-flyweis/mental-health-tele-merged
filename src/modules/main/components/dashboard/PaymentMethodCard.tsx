import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
  cardholderName?: string;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault?: () => void;
  onDelete?: () => void;
}

export function PaymentMethodCard({
  method,
  onSetDefault,
  onDelete,
}: PaymentMethodCardProps) {
  return (
    <Card
      className={cn(
        "p-4 flex items-center justify-between relative",
        // Card already has a ring-1 border. change ring color when default
        method.isDefault ? "ring-1 ring-emerald-500" : "ring-1 ring-border",
      )}
    >
      <div className="flex items-center gap-3 ">
        <Trash2 onClick={onDelete} className="size-5 text-red-500 absolute top-2 right-2" />
        <CreditCard className="size-6 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {method.brand} •••• {method.last4}
          </span>
          <span className="text-xs text-muted-foreground">
            Expires {method.expiry}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {method.isDefault ? (
          <Badge className="rounded-full px-3 py-1 text-xs">Default</Badge>
        ) : (
          <button
            onClick={onSetDefault}
            className="text-sm text-emerald-600 hover:underline"
          >
            Set as Default
          </button>
        )}
      </div>
    </Card>
  );
}
