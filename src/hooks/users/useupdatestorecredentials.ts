import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useUpdateStoreCredentials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      shopify_api_key,
      shopify_access_token,
    }: {
      userId: string;
      shopify_api_key?: string;
      shopify_access_token?: string;
    }) => axios.put("/user/update-credentials", { userId, shopify_api_key, shopify_access_token }),
    onSuccess: () => {
      toast.success("Store credentials updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-stores"] });
    },
    onError: (error: any) => {
      console.error("Failed to update store credentials:", error);
      toast.error(error.response?.data?.message || "Failed to update store credentials. Please try again.");
    },
  });
};
