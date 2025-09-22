import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useBlockCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) =>
      axios.post(`/customer/block-customer?customerId=${customerId}`),
    onSuccess: () => {
      toast.success("Customer Blocked successfully");
      console.log("Flag added successfully. Refetching orders...");
      queryClient.invalidateQueries({ queryKey: ["risky-orders"] });
    },
    onError: (error) => {
      console.error("Failed to add flag:", error);
      toast.error("Failed to add flag. Please try again.");
    },
  });
};
