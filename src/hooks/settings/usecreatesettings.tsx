import { axios } from "@/configs/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface ISettings {
  lostParcelThreshold?: number;
  lostParcelPeriod?: string;
  lossRateThreshold?: number;
  matchSensitivity?: string;
}

const createSettings = async (data: ISettings) => {
  const response = await axios.post("/settings/create", data);
  return response.data;
};

export const useCreateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: any) => {
      toast.error(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    },
  });
};
