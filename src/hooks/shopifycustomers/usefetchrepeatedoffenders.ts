import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

export const useFetchRepeatedOffenders = () => {
  return useQuery<number, ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/repeated-offenders");

      return response?.data.total ?? [];
    },
    queryKey: ["repeated-offenders"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
