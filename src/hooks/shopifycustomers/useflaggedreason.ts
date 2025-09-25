import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

interface FlaggedReason {
  riskReason: string;
  count: number;
}

export const useFetchFlaggedReason = () => {
  return useQuery<FlaggedReason[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/top-flagged-reason");

      return response?.data.data ?? [];
    },
    queryKey: ["top-flagged-reason"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
