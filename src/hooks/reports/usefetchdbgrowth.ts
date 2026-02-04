import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "@/configs/axios.config";

interface StoreGrowthData {
  totalStores: number;
  newStoresLast30Days: number;
  storesByPlan: { plan: string; count: number }[];
  growthTrend: { month: string; count: number }[];
}

export const useFetchStoreGrowth = () => {
  return useQuery<StoreGrowthData, ErrorWithMessage>({
    queryKey: ["store-growth-metrics"],
    queryFn: async () => {
      const response = await axios.get("/reports/customer-db-growth");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};