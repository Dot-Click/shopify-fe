import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useAdminFetchSettings, useAdminUpdateSettings } from "@/hooks/settings/useadminsettings";
import { Box } from "@/components/ui/box";

interface StoreSettingsDialogProps {
  storeId: string | null;
  storeName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StoreSettingsDialog({ storeId, storeName, open, onOpenChange }: StoreSettingsDialogProps) {
  const { data: fetchedData, isLoading } = useAdminFetchSettings(storeId);
  const { mutate: updateSettings, isPending: isUpdating } = useAdminUpdateSettings();

  const [settings, setSettings] = useState({
    lostParcelThreshold: 3,
    lostParcelPeriod: "6",
    lossRateThreshold: 40,
    matchSensitivity: "medium",
    primaryAction: "hold",
    requireESignature: false,
    forceCourierSignedDelivery: false,
    photoOnDelivery: false,
    sendCancellationEmail: false,
    includeWavierLink: false,
    emailNotificationsEnabled: true,
    notificationEmail: "info@example.com",
    includeOrderDetails: true,
    includeReasonForFlag: true,
    includeRecommendedAction: true,
    autoHoldRiskyOrders: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setSettings({
        lostParcelThreshold: fetchedData.lostParcelThreshold ?? 3,
        lostParcelPeriod: fetchedData.lostParcelPeriod?.toString() ?? "6",
        lossRateThreshold: fetchedData.lossRateThreshold ?? 40,
        matchSensitivity: fetchedData.matchSensitivity ?? "medium",
        primaryAction: fetchedData.primaryAction ?? "hold",
        requireESignature: fetchedData.requireESignature ?? false,
        forceCourierSignedDelivery: fetchedData.forceCourierSignedDelivery ?? false,
        photoOnDelivery: fetchedData.photoOnDelivery ?? false,
        sendCancellationEmail: fetchedData.sendCancellationEmail ?? false,
        includeWavierLink: fetchedData.includeWavierLink ?? false,
        autoHoldRiskyOrders: fetchedData.autoHoldRiskyOrders ?? false,
        emailNotificationsEnabled: fetchedData.emailNotificationsEnabled ?? true,
        notificationEmail: fetchedData.notificationEmail ?? "info@example.com",
        includeOrderDetails: fetchedData.includeOrderDetails ?? true,
        includeReasonForFlag: fetchedData.includeReasonForFlag ?? true,
        includeRecommendedAction: fetchedData.includeRecommendedAction ?? true,
      });
    }
  }, [fetchedData]);

  const handleSave = () => {
    if (!storeId) return;
    updateSettings({
      ...settings,
      storeId,
    });
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] w-[45vw] h-[85vh] overflow-hidden flex flex-col bg-white border-0 shadow-2xl p-0">
        <DialogHeader className="px-8 py-6 border-b border-slate-100 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Store Risk Settings {storeName ? ` - ${storeName}` : ""}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-8 text-slate-500 font-medium italic">
             <div className="animate-pulse">Loading store parameters...</div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-colors">
            {/* Detection Rules (Full Width) */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
               <div className="w-1 h-full bg-blue-600 absolute left-0 top-0" />
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                <CardTitle className="text-lg font-bold text-slate-700">Detection Rules</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <Box className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Lost Parcel Threshold</Label>
                    <Input
                      type="number"
                      value={settings.lostParcelThreshold}
                      className="bg-white border-slate-200 focus:ring-blue-500 h-10"
                      onChange={(e) => handleChange("lostParcelThreshold", Number(e.target.value))}
                    />
                    <p className="text-[10px] text-slate-400">Total parcels lost before flagging.</p>
                  </Box>
                  <Box className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Lost Parcel Period</Label>
                    <Select
                      value={settings.lostParcelPeriod}
                      onValueChange={(val) => handleChange("lostParcelPeriod", val)}
                    >
                      <SelectTrigger className="bg-white border-slate-200 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="1">1 Month</SelectItem>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                     <p className="text-[10px] text-slate-400">Time window for the loss threshold.</p>
                  </Box>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <Box className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Loss Rate Threshold (%)</Label>
                    <Input
                      type="number"
                      value={settings.lossRateThreshold}
                      className="bg-white border-slate-200 focus:ring-blue-500 h-10"
                      onChange={(e) => handleChange("lossRateThreshold", Number(e.target.value))}
                    />
                    <p className="text-[10px] text-slate-400">Flag if (lost / total) exceeds this %.</p>
                  </Box>
                  <Box className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Match Sensitivity</Label>
                    <Select
                      value={settings.matchSensitivity}
                      onValueChange={(val) => handleChange("matchSensitivity", val)}
                    >
                      <SelectTrigger className="bg-white border-slate-200 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="low">Low (Exact Matches Only)</SelectItem>
                        <SelectItem value="medium">Medium (Standard)</SelectItem>
                        <SelectItem value="high">High (Fuzzy Matches)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-slate-400">Heuristic matching configuration.</p>
                  </Box>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Actions */}
                <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-700">Action on Risky Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5 flex-1">
                    <Box className="space-y-2 mb-4">
                      <Label className="text-slate-600 font-semibold">Primary Action</Label>
                      <Select
                        value={settings.primaryAction}
                        onValueChange={(val) => handleChange("primaryAction", val)}
                      >
                        <SelectTrigger className="mt-1 bg-white border-slate-200 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                          <SelectItem value="hold">Fulfilment Hold (Manual Review)</SelectItem>
                          <SelectItem value="auto_cancel">Automatic Cancellation</SelectItem>
                        </SelectContent>
                      </Select>
                    </Box>
                    <div className="space-y-4">
                        {[
                        { key: "autoHoldRiskyOrders", label: "Automatic Fulfilment Hold" },
                        { key: "requireESignature", label: "Require customer e-signature" },
                        { key: "forceCourierSignedDelivery", label: "Force signed delivery" },
                        { key: "photoOnDelivery", label: "Photo on delivery required" },
                        { key: "sendCancellationEmail", label: "Send cancellation email" },
                        { key: "includeWavierLink", label: "Include waiver link" },
                        ].map((item) => (
                        <Box key={item.key} className="flex items-center justify-between group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                            <Label className="text-slate-600 font-medium cursor-pointer" htmlFor={item.key}>{item.label}</Label>
                            <Switch
                                id={item.key}
                                checked={(settings as any)[item.key]}
                                onCheckedChange={(val) => handleChange(item.key, val)}
                            />
                        </Box>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-700">Notifications & Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6 flex-1">
                    <Box className="flex items-center justify-between mb-2">
                      <Label className="text-slate-600 font-semibold cursor-pointer" htmlFor="emailNotificationsEnabled">Enable Alerts</Label>
                      <Switch
                        id="emailNotificationsEnabled"
                        checked={settings.emailNotificationsEnabled}
                        onCheckedChange={(val) => handleChange("emailNotificationsEnabled", val)}
                      />
                    </Box>
                    <Box className="space-y-2">
                        <Label className="text-slate-600 font-semibold">Notification Recipient</Label>
                        <Input
                            type="email"
                            value={settings.notificationEmail}
                            className="bg-white border-slate-200 h-10"
                            placeholder="admin@store.com"
                            onChange={(e) => handleChange("notificationEmail", e.target.value)}
                            disabled={!settings.emailNotificationsEnabled}
                        />
                    </Box>
                    <div className="space-y-3 pt-2">
                      <Label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Include in email:</Label>
                      {[
                        { key: "includeOrderDetails", label: "Order details (name, items, etc.)" },
                        { key: "includeReasonForFlag", label: "Specific reasons for flag" },
                        { key: "includeRecommendedAction", label: "Recommended action details" },
                      ].map((item) => (
                        <Box key={item.key} className="flex items-center justify-between pl-2 group hover:bg-slate-50 p-1 rounded-md transition-colors">
                          <Label className="text-sm font-normal text-slate-600 cursor-pointer" htmlFor={item.key}>{item.label}</Label>
                          <Switch
                            id={item.key}
                            className="scale-90"
                            checked={(settings as any)[item.key]}
                            onCheckedChange={(val) => handleChange(item.key, val)}
                            disabled={!settings.emailNotificationsEnabled}
                          />
                        </Box>
                      ))}
                    </div>
                  </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 flex-shrink-0">
              <Button variant="ghost" className="text-slate-500 hover:text-slate-800" onClick={() => onOpenChange(false)}>
                Cancel Changes
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px] shadow-lg shadow-blue-200" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Apply Settings"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
