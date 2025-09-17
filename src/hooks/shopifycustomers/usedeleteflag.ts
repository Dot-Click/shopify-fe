import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useDeleteFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId }: { orderId: string }) =>
      axios.post(`/shopify/delete-flag?orderId=${orderId}`),
    onSuccess: () => {
      console.log("Flag deleted successfully. Refetching orders...");
      queryClient.invalidateQueries({ queryKey: ["risky-orders"] });
    },
    onError: (error) => {
      console.error("Failed to delete flag:", error);
      toast.error("Failed to delete flag. Please try again.");
    },
  });
};
