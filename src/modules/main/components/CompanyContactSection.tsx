"use client";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { publicPageApi } from "@/api/publicpage.api";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message cannot be empty"),
  agree: z.boolean().refine((v) => v, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function CompanyContactSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",

    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      agree: false,
    },
  });
  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: values.fullName,
        email: values.email,
        subject: values.subject || "",
        message: values.message,
      };

      const res: any = await publicPageApi.sendContact(payload);
      setSuccess(res?.message || "Submitted successfully");
      form.reset({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        agree: false,
      });

      form.clearErrors();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="Connect With Our"
          subtitle="Support Team"
          className="max-w-md mx-auto"
        />

        <div className="mt-10 max-w-lg mx-auto bg-white rounded-xl p-8 shadow">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {success && (
              <p className="text-green-600 text-sm font-medium">✅ {success}</p>
            )}

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name *
              </label>
              <Input
                placeholder="Enter your full name"
                className="bg-gray-50"
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email Address *
              </label>
              <Input
                placeholder="your.email@example.com"
                className="bg-gray-50"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Subject
              </label>
              <Input
                placeholder="Brief topic of inquiry"
                className="bg-gray-50"
                {...form.register("subject")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                How can we assist you? *
              </label>
              <Textarea
                rows={4}
                placeholder="Share your thoughts..."
                className="bg-gray-50"
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Controller
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm text-slate-700">
                I agree to the{" "}
                <Link to="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {form.formState.errors.agree && (
              <p className="text-xs text-destructive">
                {form.formState.errors.agree.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary h-10"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
