"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ticketSchema = z.object({
  category: z.enum(["Technical", "Billing", "Medical"], {
    message: "Select category",
  }),
  priority: z.enum(["High", "Medium", "Low"], {
    message: "Select priority",
  }),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

const categoryOptions: Array<{
  label: string;
  value: TicketFormValues["category"];
}> = [
    { label: "Technical", value: "Technical" },
    { label: "Billing", value: "Billing" },
    { label: "Medical", value: "Medical" },
  ];

const priorityOptions: Array<{
  label: string;
  value: TicketFormValues["priority"];
}> = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

type CreateSupportTicketDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function CreateSupportTicketDialog({
  open,
  onOpenChange,
  onSuccess
}: CreateSupportTicketDialogProps) {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);

const onSubmit = async (values: TicketFormValues) => {
  if (loading) return

  try {
    setLoading(true)

    const token = window.localStorage.getItem("patientToken")

    const res = await fetch(
      "https://mr-telerxs-backend.vercel.app/api/v1/patient/support",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: values.subject,
          message: values.description,
          category: values.category.toLowerCase(),
          priority: values.priority.toLowerCase(),
        }),
      }
    )

    const data = await res.json()

      if (!res.ok) throw new Error(data?.message)

onSuccess?.()
onOpenChange(false)
form.reset()

    onOpenChange(false)
    form.reset()
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  }


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>
            Describe your issue and we&apos;ll help you resolve it
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel className="w-auto border-0 p-0">Category</FieldLabel>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger size="sm" className="w-full bg-muted">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(function renderCategory(option) {
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.category]} />
            </Field>

            <Field>
              <FieldLabel className="w-auto border-0 p-0">Priority</FieldLabel>
              <Controller
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger size="sm" className="w-full bg-muted">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map(function renderPriority(option) {
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.priority]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="subject" className="w-auto border-0 p-0">
                Subject
              </FieldLabel>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                className="bg-muted"
                {...form.register("subject")}
              />
              <FieldError errors={[form.formState.errors.subject]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="description" className="w-auto border-0 p-0">
                Description
              </FieldLabel>
              <Textarea
                id="description"
                placeholder="Please provide as much detail as possible..."
                className="min-h-28"
                {...form.register("description")}
              />
              <FieldError errors={[form.formState.errors.description]} />
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="bg-gradient-dash text-white"
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
