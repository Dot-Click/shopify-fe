import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useFetchSettings = () => {
  return useQuery({
    queryKey: ["fetch-settings"],
    queryFn: async () => {
      const res = await axios.get("/settings/fetch");
      console.log("Settings-Fetchedd...!!!", res.data.data);
      return res.data.data;
    },
  });
};
