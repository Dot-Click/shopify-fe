import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

export type Customer = {
  id: string;
  displayName: string;
  lastKnownIp: string | null;
  email: string;
  totalOrders: number;
  phone: string | null;
  riskLevel: number;
  refundsFromStores: number;
};

export const useFetchDashboardCustomers = () => {
  return useQuery<Customer[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/shopify/admin-customers");
      console.log("This is the RESPONSE:", response?.data);
      return response?.data ?? [];
    },
    queryKey: ["dashboard-customers"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
