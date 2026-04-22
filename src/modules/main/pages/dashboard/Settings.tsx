"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordSettingsForm } from "@/modules/main/components/dashboard/settings/PasswordSettingsForm";
import { ProfileSettingsForm } from "@/modules/main/components/dashboard/settings/ProfileSettingsForm";
import { NotificationsSettingsForm } from "@/modules/main/components/dashboard/settings/NotificationsSettingsForm";
import { PaymentSettingsForm } from "@/modules/main/components/dashboard/settings/PaymentSettingsForm";
import { PrivacySettingsForm } from "@/modules/main/components/dashboard/settings/PrivacySettingsForm";
import { TwoFactorSettingsCard } from "@/modules/main/components/dashboard/settings/TwoFactorSettingsCard";

const settingsTabs = [
  "Profile",
  "Password",
  "Notifications",
  "Payment",
  "Privacy",
] as const;

export default function Page() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-medium text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security
        </p>
      </header>

      <Tabs defaultValue="Profile">
        <TabsList className="h-fit! w-full rounded-full bg-muted p-1 mb-5 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-full h-8 px-4 py-1 text-sm data-[state=active]:bg-linear-to-t data-[state=active]:from-[#346079] data-[state=active]:to-[#219580] data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:hover:bg-muted/80"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Profile">
          <ProfileSettingsForm />
        </TabsContent>

        <TabsContent value="Password">
          <div className="space-y-5">
            <PasswordSettingsForm />
            <TwoFactorSettingsCard />
          </div>
        </TabsContent>

        <TabsContent value="Notifications">
          <NotificationsSettingsForm />
        </TabsContent>

        <TabsContent value="Payment">
          <PaymentSettingsForm />
        </TabsContent>

        <TabsContent value="Privacy">
          <PrivacySettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
