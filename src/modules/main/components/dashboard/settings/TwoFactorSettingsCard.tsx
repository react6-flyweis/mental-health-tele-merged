"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function TwoFactorSettingsCard() {
  const [enabled, setEnabled] = useState(false);

  function handleConfigure() {
    console.log("configure 2fa");
    // TODO: open configuration modal or redirect to setup flow
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="enable-2fa"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="border-green-500 text-green-500 hover:bg-green-50 mt-2"
          onClick={handleConfigure}
        >
          Configure 2FA
        </Button>
      </CardContent>
    </Card>
  );
}
