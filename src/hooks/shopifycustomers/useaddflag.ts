import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useAddFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, flag }: { orderId: string; flag: boolean }) =>
      axios.post(`/customer/add-flag?orderId=${orderId}`, { flag }),
    onSuccess: () => {
      console.log("Flag added successfully. Refetching orders...");
      queryClient.invalidateQueries({ queryKey: ["risky-orders"] });
    },
    onError: (error) => {
      console.error("Failed to add flag:", error);
      toast.error("Failed to add flag. Please try again.");
    },
  });
};
