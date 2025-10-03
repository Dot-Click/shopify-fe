import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useUnBlockCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) =>
      axios.post(`/customer/unblock-customer?customerId=${customerId}`),
    onSuccess: () => {
      toast.success("Customer Unblocked successfully");
      console.log("Unblocked successfully. Refetching orders...");
      queryClient.invalidateQueries({ queryKey: ["risky-orders"] });
      queryClient.invalidateQueries({ queryKey: ["all-customers"] });
    },
    onError: (error) => {
      console.error("Failed to unblock:", error);
      toast.error("Failed to unblock. Please try again.");
    },
  });
};
