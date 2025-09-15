import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCreateSettings } from "@/hooks/settings/usecreatesettings"; // Assuming this path

// Define a type for your settings state for type safety
type SettingsState = {
  lostParcelThreshold: number;
  lostParcelPeriod: string;
  lossRateThreshold: number;
  matchSensitivity: string;
  action: string;
  requireEsignature: boolean;
  forceSignedDelivery: boolean;
  requirePhoto: boolean;
  sendCancellationEmail: boolean;
  includeWaiverLink: boolean;
};

function RiskSettings() {
  // State to manage form inputs
  const [settings, setSettings] = useState<SettingsState>({
    lostParcelThreshold: 3,
    lostParcelPeriod: "6",
    lossRateThreshold: 40,
    matchSensitivity: "medium",
    action: "hold",
    requireEsignature: false,
    forceSignedDelivery: false,
    requirePhoto: false,
    sendCancellationEmail: false,
    includeWaiverLink: false,
  });

  // Hooks for fetching and updating settings
  // const { data: fetchedSettings, isLoading: isLoadingSettings } = useGetSettings();
  const { mutate: saveSettings, isPending: isSaving } = useCreateSettings();

  const handleChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // The API only needs a subset of fields, so we send just those.
    const payload = {
      lostParcelThreshold: Number(settings.lostParcelThreshold),
      lostParcelPeriod: settings.lostParcelPeriod,
      lossRateThreshold: Number(settings.lossRateThreshold),
      matchSensitivity: settings.matchSensitivity,
    };
    saveSettings(payload);
  };

  return (
    <Box className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Risk Detection Settings
      </h1>

      <Card className="mb-6 shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Detection Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label>Lost Parcel Threshold</Label>
            <Input
              type="number"
              value={settings.lostParcelThreshold}
              min={1}
              max={10}
              className="mt-2"
              onChange={(e) =>
                handleChange("lostParcelThreshold", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Lost Parcel Period</Label>
            <Select
              value={settings.lostParcelPeriod}
              onValueChange={(val) => handleChange("lostParcelPeriod", val)}
            >
              <SelectTrigger className="w-40 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Loss Rate Threshold (%)</Label>
            <Input
              type="number"
              value={settings.lossRateThreshold}
              min={1}
              max={100}
              className="mt-2"
              onChange={(e) =>
                handleChange("lossRateThreshold", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Match Sensitivity</Label>
            <Select
              value={settings.matchSensitivity}
              onValueChange={(val) => handleChange("matchSensitivity", val)}
            >
              <SelectTrigger className="w-40 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Action on Risky Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Primary Action</Label>
            <Select
              value={settings.action}
              onValueChange={(val) => handleChange("action", val)}
            >
              <SelectTrigger className="w-56 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hold">
                  Fulfilment Hold (Manual Review)
                </SelectItem>
                <SelectItem value="auto_cancel">
                  Automatic Cancellation & Refund
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Require customer e-signature</Label>
            <Switch
              checked={settings.requireEsignature}
              onCheckedChange={(val) => handleChange("requireEsignature", val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Force courier to signed delivery</Label>
            <Switch
              checked={settings.forceSignedDelivery}
              onCheckedChange={(val) =>
                handleChange("forceSignedDelivery", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Photo on delivery required</Label>
            <Switch
              checked={settings.requirePhoto}
              onCheckedChange={(val) => handleChange("requirePhoto", val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Send cancellation email</Label>
            <Switch
              checked={settings.sendCancellationEmail}
              onCheckedChange={(val) =>
                handleChange("sendCancellationEmail", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Include waiver link</Label>
            <Switch
              checked={settings.includeWaiverLink}
              onCheckedChange={(val) => handleChange("includeWaiverLink", val)}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isSaving ? "Saving..." : "Save Settings"}
      </Button>
    </Box>
  );
}

export default RiskSettings;
