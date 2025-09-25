import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

interface Incident {
  month: string;
  count: number;
}

export const useFetchMonthlyIncidents = () => {
  return useQuery<Incident[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/monthly-risk-incidents");

      return response?.data.data ?? [];
    },
    queryKey: ["monthly-risk-incidents"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
