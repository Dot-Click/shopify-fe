import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export interface RiskyOrderResponse {
  orders: {
    id: string;
    name: string;
    totalAmount: string;
    currency: string;
    flagged: boolean;
    reasons: string[];
    createdAt: string;
  }[];
}

export const useGetRiskyOrders = (customerId: string | null) => {
  return useQuery<RiskyOrderResponse>({
    queryKey: ["risky-orders", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID required");

      const res = await axios.get(
        `/shopify/risky-orders?customerId=${customerId}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
      return res.data;
    },
    enabled: !!customerId,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
