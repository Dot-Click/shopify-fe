import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

interface FlaggedReason {
  month: string;
  riskIncidents: number;
  affectedStores: number;
}

export const useFetchReportIncidents = () => {
  return useQuery<FlaggedReason[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/risk-chart-data");
      console.log("Risk chart data:", response.data.data);
      return response?.data.data ?? [];
    },
    queryKey: ["fetchReportIncidents"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
