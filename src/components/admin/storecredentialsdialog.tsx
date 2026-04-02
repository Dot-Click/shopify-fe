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
import { useUpdateStoreCredentials } from "@/hooks/users/useupdatestorecredentials";
import { Key, ShieldCheck } from "lucide-react";
import { Box } from "@/components/ui/box";

interface StoreCredentialsDialogProps {
  storeId: string | null;
  storeName: string | null;
  initialApiKey?: string | null;
  initialAccessToken?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StoreCredentialsDialog({ 
  storeId, 
  storeName, 
  initialApiKey,
  initialAccessToken,
  open, 
  onOpenChange 
}: StoreCredentialsDialogProps) {
  const { mutate: updateCredentials, isPending: isUpdating } = useUpdateStoreCredentials();

  const [creds, setCreds] = useState({
    shopify_api_key: "",
    shopify_access_token: "",
  });

  useEffect(() => {
    if (open) {
      setCreds({
        shopify_api_key: initialApiKey || "",
        shopify_access_token: initialAccessToken || "",
      });
    }
  }, [open, initialApiKey, initialAccessToken]);

  const handleSave = () => {
    if (!storeId) return;
    updateCredentials({
      userId: storeId,
      shopify_api_key: creds.shopify_api_key,
      shopify_access_token: creds.shopify_access_token,
    }, {
        onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            Edit Store Credentials
          </DialogTitle>
          <p className="text-xs text-slate-500 mt-1">
            Updating credentials for <span className="font-semibold text-slate-700">{storeName}</span>
          </p>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <Box className="space-y-2">
            <Label className="text-slate-700 font-semibold flex items-center gap-2">
              Shopify API Key
            </Label>
            <Input
              value={creds.shopify_api_key}
              placeholder="e.g. 7bd86..."
              className="bg-white border-slate-200 focus:ring-blue-500 h-10"
              onChange={(e) => setCreds(prev => ({ ...prev, shopify_api_key: e.target.value }))}
            />
            <p className="text-[10px] text-slate-400 italic">This is the public API key for the Shopify app.</p>
          </Box>

          <Box className="space-y-2">
            <Label className="text-red-600 font-semibold flex items-center gap-2">
              Shopify Access Token (Private)
            </Label>
            <Input
              type="password"
              value={creds.shopify_access_token}
              placeholder="shpat_..."
              className="bg-white border-slate-200 focus:ring-red-500 h-10"
              onChange={(e) => setCreds(prev => ({ ...prev, shopify_access_token: e.target.value }))}
            />
            <p className="text-[10px] text-slate-400 italic">WARNING: This is a sensitive token. Handle with care.</p>
          </Box>

          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex gap-3">
             <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
             <p className="text-xs text-blue-800">
                These credentials will be encrypted before being stored in the database.
             </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-800" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]" 
            onClick={handleSave} 
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
