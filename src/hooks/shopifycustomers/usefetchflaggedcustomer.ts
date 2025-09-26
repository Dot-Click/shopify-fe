import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

interface FlaggedCustomer {
  id: string;
  name: string;
  email: string;
  riskLevel: number;
  totalRiskReport: number;
  storeId: string;
}

interface StoreAffected {
  id: string;
  name: string;
  email: string;
  shopifyApiKey: string | null;
}

interface FlaggedCustomerAndStoreResponse {
  flaggedCustomers: FlaggedCustomer[];
  storesAffected: StoreAffected[];
}

export const useFetchFlaggedCustomerAndStore = () => {
  return useQuery<FlaggedCustomerAndStoreResponse, ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/flagged-customer-store");

      return response?.data ?? [];
    },
    queryKey: ["flagged-customer-store"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
