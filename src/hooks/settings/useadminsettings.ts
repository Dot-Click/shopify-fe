import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axios } from "@/configs/axios.config";

export const useAdminFetchSettings = (storeId: string | null) => {
  return useQuery({
    queryKey: ["admin-settings", storeId],
    queryFn: async () => {
      if (!storeId) return null;
      const response = await axios.get("/settings/admin/fetch", {
        params: { storeId },
      });
      return response.data.data;
    },
    enabled: !!storeId,
  });
};

export const useAdminUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await axios.post("/settings/admin/update", payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings", variables.storeId] });
      toast.success("Store settings updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update store settings");
    },
  });
};
