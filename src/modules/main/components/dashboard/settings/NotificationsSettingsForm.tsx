"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { patientApi } from "@/api/patient.api";
import { settingApi } from "@/api/setting.api";
import { toast } from "react-toastify";

export const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  appointmentReminders: z.boolean(),
  newMessages: z.boolean(),
  treatmentsReminders: z.boolean(),
});

export type NotificationsFormValues = z.infer<typeof notificationsSchema>;

interface NotificationsSettingsFormProps {
  defaultValues?: Partial<NotificationsFormValues>;
  onSubmit?: (values: NotificationsFormValues) => void;
}

export function NotificationsSettingsForm({
  defaultValues,
  onSubmit,
}: NotificationsSettingsFormProps) {
    const role = localStorage.getItem("role")||"";

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      appointmentReminders: true,
      newMessages: true,
      treatmentsReminders: false,
      ...defaultValues,
    },
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientApi.getProfile();
        const data = res?.data?.notificationPrefs;
        form.reset({
          emailNotifications: data?.email ,
          smsNotifications: data?.sms ,
          appointmentReminders: data?.appointmentReminders ,
          newMessages: data?.newMessages ,
          treatmentsReminders: data?.treatmentReminders ,
        });
      } catch { }
    };

    fetchProfile();
  }, [form]);

  async function handleSubmit(values: NotificationsFormValues) {
    try{
       await settingApi.updateNotifications({
          email: values?.emailNotifications ,
          sms: values?.smsNotifications ,
          appointmentReminders: values?.appointmentReminders ,
          newMessages: values?.newMessages ,
          treatmentsReminders: values?.treatmentsReminders ,

      },role);
            onSubmit?.(values);

      toast.success("Notifications saved successfully");
    }
    catch(e){
      console.log(e);
      toast.error("Failed to save notifications");
    }
    finally{
      onSubmit?.(values);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div>
            <h3 className="font-medium">Notification Channels</h3>
            <div className="mt-2 space-y-2">
              <Controller
                name="emailNotifications"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Controller
                name="smsNotifications"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">Notification Types</h3>
            <div className="mt-2 space-y-2">
              <Controller
                name="appointmentReminders"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Get reminded about upcoming appointments
                      </p>
                    </div>
                    <Switch
                      id="appointment-reminders"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Controller
                name="newMessages"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="font-medium">New Messages</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive a new message
                      </p>
                    </div>
                    <Switch
                      id="new-messages"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Controller
                name="treatmentsReminders"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="font-medium">Treatments Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Reminders for medication refills and schedules
                      </p>
                    </div>
                    <Switch
                      id="treatments-reminders"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="bg-gradient-dash">
            Save Preferences
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
