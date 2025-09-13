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

function RiskSettings() {
  const [settings, setSettings] = useState({
    lost_parcel_threshold: 3,
    lost_parcel_period: "6",
    loss_rate_threshold: 40,
    match_sensitivity: "medium",
    action: "hold",
    require_esignature: false,
    force_signed_delivery: false,
    require_photo: false,
    send_cancellation_email: false,
    include_waiver_link: false,
  });

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Call backend API
    console.log("Saving settings:", settings);
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
              value={settings.lost_parcel_threshold}
              min={1}
              max={10}
              className="mt-2"
              onChange={(e) =>
                handleChange("lost_parcel_threshold", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Lost Parcel Period</Label>
            <Select
              value={settings.lost_parcel_period}
              onValueChange={(val) => handleChange("lost_parcel_period", val)}
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
              value={settings.loss_rate_threshold}
              min={1}
              max={100}
              className="mt-2"
              onChange={(e) =>
                handleChange("loss_rate_threshold", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Match Sensitivity</Label>
            <Select
              value={settings.match_sensitivity}
              onValueChange={(val) => handleChange("match_sensitivity", val)}
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
              checked={settings.require_esignature}
              onCheckedChange={(val) => handleChange("require_esignature", val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Force courier to signed delivery</Label>
            <Switch
              checked={settings.force_signed_delivery}
              onCheckedChange={(val) =>
                handleChange("force_signed_delivery", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Photo on delivery required</Label>
            <Switch
              checked={settings.require_photo}
              onCheckedChange={(val) => handleChange("require_photo", val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Send cancellation email</Label>
            <Switch
              checked={settings.send_cancellation_email}
              onCheckedChange={(val) =>
                handleChange("send_cancellation_email", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Include waiver link</Label>
            <Switch
              checked={settings.include_waiver_link}
              onCheckedChange={(val) =>
                handleChange("include_waiver_link", val)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
        Save Settings
      </Button>
    </Box>
  );
}

export default RiskSettings;
