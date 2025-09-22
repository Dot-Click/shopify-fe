import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

// interface TotalFlaggedType {
//   flagged: boolean | null;
//   ip: string | null;
// }

export const useFetchTotalFlaggedCustomers = () => {
  return useQuery<number, ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/total-flagged-customer");

      return response?.data.numberOfFlagged ?? [];
    },
    queryKey: ["total-flagged-customers"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
