import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Box } from "@/components/ui/box";
import { useDeleteStore } from "@/hooks/users/usedeletestore";

interface DeleteStoreDialogProps {
  storeId: string | null;
  storeName: string | null;
  storeEmail?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteStoreDialog({
  storeId,
  storeName,
  storeEmail,
  open,
  onOpenChange,
}: DeleteStoreDialogProps) {
  const { mutate: deleteStore, isPending: isDeleting } = useDeleteStore();

  const handleDelete = () => {
    if (!storeId) return;

    deleteStore(storeId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white border-0 shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b border-red-100 bg-red-50/70">
          <DialogTitle className="text-xl font-bold text-red-700 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Store
          </DialogTitle>
          <DialogDescription className="text-sm text-red-700/80">
            This action permanently removes the store and its related records.
          </DialogDescription>
        </DialogHeader>

        <Box className="p-6 space-y-4">
          <Box className="rounded-xl border border-red-100 bg-red-50 p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <Box className="space-y-1 text-sm text-slate-700">
              <p>
                You are about to delete{" "}
                <span className="font-semibold text-slate-900">
                  {storeName || "this store"}
                </span>
                {storeEmail ? (
                  <>
                    {" "}
                    with email{" "}
                    <span className="font-medium text-slate-900">
                      {storeEmail}
                    </span>
                  </>
                ) : null}
                .
              </p>
              <p>
                This will also remove related sessions, settings, customers,
                notifications, subscriptions, and other store-linked data.
              </p>
            </Box>
          </Box>
        </Box>

        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-900"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white min-w-[120px]"
            onClick={handleDelete}
            disabled={isDeleting || !storeId}
          >
            {isDeleting ? "Deleting..." : "Delete Store"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
