import { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchSettings } from "@/hooks/settings/usefetchsettings";
import { useCreateSettings } from "@/hooks/settings/usecreatesettings";
import { toast } from "react-hot-toast";
import { X, Plus, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ExclusionItem {
  id: string;
  type: "customer" | "address";
  value: string;
}

export const AdditionalConfiguration = () => {
  const { data: settingsData, isLoading } = useFetchSettings();
  const { mutate: saveSettings, isPending: isSaving } = useCreateSettings();

  const [exclusionList, setExclusionList] = useState<ExclusionItem[]>([]);
  const [actionDelayHours, setActionDelayHours] = useState<number>(0);
  const [newExclusionType, setNewExclusionType] = useState<"customer" | "address">("customer");
  const [newExclusionValue, setNewExclusionValue] = useState<string>("");

  // Load settings when data is fetched
  useEffect(() => {
    if (settingsData) {
      // Parse exclusion list from settings (stored as JSON string or array)
      if (settingsData.exclusionList) {
        try {
          const parsed = Array.isArray(settingsData.exclusionList)
            ? settingsData.exclusionList
            : JSON.parse(settingsData.exclusionList || "[]");
          setExclusionList(parsed);
        } catch {
          setExclusionList([]);
        }
      } else {
        setExclusionList([]);
      }

      // Load action delay hours
      setActionDelayHours(settingsData.actionDelayHours || 0);
    }
  }, [settingsData]);

  const handleAddExclusion = () => {
    if (!newExclusionValue.trim()) {
      toast.error("Please enter a value");
      return;
    }

    const newItem: ExclusionItem = {
      id: Date.now().toString(),
      type: newExclusionType,
      value: newExclusionValue.trim(),
    };

    setExclusionList([...exclusionList, newItem]);
    setNewExclusionValue("");
  };

  const handleRemoveExclusion = (id: string) => {
    setExclusionList(exclusionList.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    // Merge existing settings with new configuration fields
    const payload = {
      ...(settingsData || {}),
      exclusionList: exclusionList.length > 0 ? JSON.stringify(exclusionList) : null,
      actionDelayHours: actionDelayHours || 0,
    };

    saveSettings(payload as any);
  };

  if (isLoading) {
    return (
      <Box className="p-6 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">Loading configuration...</p>
      </Box>
    );
  }

  return (
    <Box className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Additional Configuration</h2>
        <p className="text-sm text-gray-600">
          Configure exclusion lists and action delays for risk management
        </p>
      </div>

      <Separator className="mb-6" />

      {/* Exclusion List Section */}
      <div className="mb-8">
        <div className="mb-4">
          <Label htmlFor="exclusion-type" className="text-base font-semibold text-gray-700 mb-2 block">
            Exclusion List
          </Label>
          <p className="text-sm text-gray-500 mb-4">
            Add trusted customers or addresses that should never be flagged
          </p>
        </div>

        <div className="flex gap-3 mb-4">
          <select
            id="exclusion-type"
            value={newExclusionType}
            onChange={(e) => setNewExclusionType(e.target.value as "customer" | "address")}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="customer">Customer Email</option>
            <option value="address">Address</option>
          </select>
          <Input
            type="text"
            placeholder={
              newExclusionType === "customer"
                ? "Enter customer email"
                : "Enter address"
            }
            value={newExclusionValue}
            onChange={(e) => setNewExclusionValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddExclusion();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddExclusion}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Exclusion List Display */}
        {exclusionList.length > 0 ? (
          <div className="space-y-2">
            {exclusionList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    {item.type === "customer" ? "Customer" : "Address"}
                  </span>
                  <span className="text-sm text-gray-700">{item.value}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExclusion(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic py-4 text-center border border-dashed border-gray-300 rounded-md">
            No exclusions added yet
          </p>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Action Delay Section */}
      <div className="mb-6">
        <div className="mb-4">
          <Label htmlFor="action-delay" className="text-base font-semibold text-gray-700 mb-2 block">
            Action Delay (Optional)
          </Label>
          <p className="text-sm text-gray-500 mb-4">
            Delay automatic cancellations by X hours to allow for human review
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            id="action-delay"
            type="number"
            min="0"
            max="168"
            step="1"
            value={actionDelayHours}
            onChange={(e) => setActionDelayHours(Number(e.target.value) || 0)}
            className="w-32"
            placeholder="0"
          />
          <span className="text-sm text-gray-600">hours</span>
          {actionDelayHours > 0 && (
            <span className="text-xs text-gray-500">
              (Max: 168 hours / 7 days)
            </span>
          )}
        </div>
        {actionDelayHours > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Automatic cancellations will be delayed by {actionDelayHours} hour{actionDelayHours !== 1 ? "s" : ""} for manual review
          </p>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </Box>
  );
};
