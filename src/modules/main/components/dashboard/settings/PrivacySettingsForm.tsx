"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Globe, ShieldIcon } from "lucide-react";
import { useState } from "react";
import { patientApi } from "@/api/patient.api";
import { useNavigate } from "react-router";
import { settingApi } from "@/api/setting.api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const privacySchema = z.object({
  shareDataForResearch: z.boolean(),
  marketingCommunications: z.boolean(),
});

export type PrivacyFormValues = z.infer<typeof privacySchema>;

interface PrivacySettingsFormProps {
  defaultValues?: Partial<PrivacyFormValues>;
  onSubmit?: (values: PrivacyFormValues) => void;
}

export function PrivacySettingsForm({
  defaultValues,
  onSubmit,
}: PrivacySettingsFormProps) {
  const router = useNavigate();
  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      shareDataForResearch: false,
      marketingCommunications: true,
      ...defaultValues,
    },
  });

  function handleSubmit(values: PrivacyFormValues) {
    console.log("privacy preferences saved", values);
    onSubmit?.(values);
  }

  const [downloading, setDownloading] = useState(false)

const handleDownloadData = async () => {
  try {
    const token = window.localStorage.getItem("patientToken")
    if (!token) return

    const res = await fetch(
      "https://mr-telerxs-backend.vercel.app/api/v1/patient/settings/download-data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()

    if (!res.ok) throw new Error("Failed to download data")

    const jsonString = JSON.stringify(data, null, 2)

    const blob = new Blob([jsonString], {
      type: "application/json",
    })

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `my-data-${new Date().toISOString()}.json`
    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)

  } catch (err) {
    console.error(err)
  }
}

  const [openPrivacy, setOpenPrivacy] = useState(false)
  const [policy, setPolicy] = useState<any>(null)
  const [loadingPolicy, setLoadingPolicy] = useState(false)

  const handleViewPrivacyPolicy = async () => {
    try {
      setOpenPrivacy(true)
      setLoadingPolicy(true)

      const token = window.localStorage.getItem("patientToken")

      const res = await fetch(
        "https://mr-telerxs-backend.vercel.app/api/v1/patient/settings/privacy-policy",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      if (data?.data?.privacyPolicy) {
        setPolicy(data.data.privacyPolicy)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingPolicy(false)
    }
  }

  const [deleting, setDeleting] = useState(false);
  const role = typeof localStorage !== 'undefined' ? localStorage.getItem("role") : null;

  async function handleDeleteAccount() {
    try {
      setDeleting(true);
      await patientApi.deleteAccount();
      localStorage.clear();
      router(`/${role?.toLowerCase()}-login`);
    } catch (e) {
      console.log(e);
    } finally {
      setDeleting(false);
    }
  }
  async function handlePrivacy(values: PrivacyFormValues) {
    try {
      await settingApi.updatePrivacy(values, role || "");
      toast.success("Privacy preferences saved successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to save privacy preferences");
    } finally {
      setDeleting(false);
    }
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientApi.getProfile();
        const data = res?.data?.privacy;
        form.reset({
          shareDataForResearch: data?.shareDataForResearch,
          marketingCommunications: data?.marketingCommunications,
        });
      } catch { }
    };

    fetchProfile();
  }, [form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Privacy &amp; Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-6">
          <form
            onSubmit={form.handleSubmit(handlePrivacy)}
            className="space-y-2"
          >
            <Controller
              name="shareDataForResearch"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="font-medium">Share data for research</p>
                    <p className="text-sm text-muted-foreground">
                      Help improve mental health care (anonymized data only)
                    </p>
                  </div>
                  <Switch
                    id="share-data-for-research"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              name="marketingCommunications"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and services
                    </p>
                  </div>
                  <Switch
                    id="marketing-communications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Button type="submit" size="lg" className="bg-gradient-dash">
              Save Preferences
            </Button>
          </form>
        </div>

        <div className="space-y-2">
          <h3 className="text-base">Account Actions</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              disabled={downloading}
              className="w-full justify-start"
              onClick={handleDownloadData}
            >
              <ShieldIcon />
              Download My Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleViewPrivacyPolicy}
            >
              <Globe />
              View Privacy Policy
            </Button>
          </div>
        </div>

        <Dialog open={openPrivacy} onOpenChange={setOpenPrivacy}>
          <DialogContent className="lg:w-[900px] lg:max-w-[900px] sm:w-[600px] sm:max-w-[600px] w-[96%] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Privacy Policy</DialogTitle>
              <DialogDescription>
                Last updated: {policy?.lastUpdated}
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[80vh] overflow-auto pr-2 space-y-4 scroll-hide">
              {loadingPolicy && (
                <p className="text-sm text-muted-foreground min-h-[300px] flex items-center justify-center">Loading...</p>
              )}

              {!loadingPolicy &&
                policy?.sections?.map((section: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog>

        <div className="pt-4 border-t border-muted"></div>

        <div className="space-y-2">
          <h3 className="text-base text-destructive">Danger Zone</h3>
          <div>
            <p className="text-sm ">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="outline"
              className="border-destructive text-destructive mt-3"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
