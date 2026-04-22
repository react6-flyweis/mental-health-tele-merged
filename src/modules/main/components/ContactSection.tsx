"use client";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/modules/main/components/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message cannot be empty"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection({ data, loading, error }: any) {
  const socialMap: any = {
    LinkedIn: { Icon: Linkedin, variant: "text" },
    Twitter: { Icon: Twitter, variant: "text" },
    Facebook: { Icon: Facebook, variant: "boxed" },
    Instagram: { Icon: Instagram, variant: "boxed" },
  };
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const contactItems = [
    {
      Icon: MapPin,
      title: "Address",
      lines: [data?.contactAddress],
    },
    {
      Icon: Mail,
      title: "Email",
      lines: [data?.contactEmail, data?.contactSupportEmail],
    },
    {
      Icon: Phone,
      title: "Phone",
      lines: [data?.contactPhone, data?.contactHours],
    },
  ];

  const socials = [
    { name: "LinkedIn", href: "#", Icon: Linkedin, variant: "text" },
    { name: "Twitter", href: "#", Icon: Twitter, variant: "text" },
    { name: "Facebook", href: "#", Icon: Facebook, variant: "boxed" },
    { name: "Instagram", href: "#", Icon: Instagram, variant: "boxed" },
  ];

  // Set to true to force all socials to use the first element's style
  const useFirstStyle = true;

  const onSubmit = (values: ContactFormValues) => {
    // TODO: integrate with real backend or mail service
    console.log("contact form submitted", values);
    form.reset();
  };

  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <SectionHeader
          title={data?.contactTitle ?? ""}
          subtitle={""}
          description={data?.contactSubtitle ?? ""}
        />

        <div className="mt-10 bg-white rounded-2xl p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* left: icon cards list */}
            <div className="space-y-6">
              {contactItems.map((item) => {
                const Icon = item.Icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex-none w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      {item.lines.map((line, idx) => (
                        <p key={idx} className="text-sm text-slate-600 mt-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* right: socials + form (card) */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Connect With Us
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(data?.contactSocialLinks ?? []).map((s: any) => {
                    const config = socialMap[s.platform] || {};
                    const Icon = config.Icon;
                    const variant = config.variant;

                    return (
                      <Link
                        key={s.platform}
                        to={s.url}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md"
                      >
                        {Icon &&
                          (variant === "boxed" ? (
                            <div className="w-8 h-8 rounded-md bg-gradient-primary flex items-center justify-center text-white">
                              <Icon className="w-4 h-4" />
                            </div>
                          ) : (
                            <Icon className="w-4 h-4 text-primary" />
                          ))}

                        <span className="text-sm text-slate-700">
                          {s.platform}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 p-6 rounded-lg bg-linear-to-br from-[#F0FDFA] to-[#ECFDF5] shadow-inner">
                <p className="text-sm font-medium text-slate-800 mb-4">
                  Send us a message
                </p>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Your email
                    </label>
                    <Input
                      id="email"
                      placeholder="Your email"
                      className="bg-white placeholder:text-slate-400"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Your message
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Your message"
                      className="bg-white placeholder:text-slate-400"
                      {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary h-10"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
