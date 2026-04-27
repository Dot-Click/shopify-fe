import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => axios.delete(`/user/${userId}`),
    onSuccess: () => {
      toast.success("Store deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-stores"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete store:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete store. Please try again."
      );
    },
  });
};
