import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";
import type { Store } from "../../pages/storemanagement.page";

export const useFetchAllStores = () => {
  return useQuery<Store[], ErrorWithMessage>({
    queryKey: ["all-stores"],
    queryFn: async () => {
      const response = await axios.get("/user/fetch");
      console.log(response)
      return response.data.data;
    },
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
