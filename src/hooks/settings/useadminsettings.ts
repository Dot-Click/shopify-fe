import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useAdminFetchSettings = (storeId: string | null) => {
  return useQuery({
    queryKey: ["admin-settings", storeId],
    queryFn: async () => {
      if (!storeId) return null;
      const response = await axios.get(`${API_URL}/settings/admin/fetch`, {
        params: { storeId },
        withCredentials: true,
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
      const response = await axios.post(`${API_URL}/settings/admin/update`, payload, {
        withCredentials: true,
      });
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
