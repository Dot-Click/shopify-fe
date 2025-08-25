import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../../configs/axios.config";

export const useUpdateUserVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      isVerified,
    }: {
      userId: string;
      isVerified: boolean;
    }) => axios.put("/user/update", { userId, isVerified }),
    onSuccess: () => {
      console.log("User status updated successfully. Refetching stores...");
      queryClient.invalidateQueries({ queryKey: ["all-stores"] });
    },
    onError: (error) => {
      console.error("Failed to update user status:", error);
      toast.error("Failed to update store status. Please try again.");
    },
  });
};
