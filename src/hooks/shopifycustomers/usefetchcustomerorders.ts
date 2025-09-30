import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export interface RiskyOrderResponse {
  orders: {
    id: string;
    name: string;
    totalAmount: string;
    currency: string;
    flagged: boolean;
    manualFlag: boolean;
    reasons: string[];
    createdAt: string;
  }[];

  forceCourierSignedDelivery: boolean;
  photoOnDelivery: boolean;
  primaryAction: string;
  requireESignature: boolean;
  sendCancellationEmail: boolean;
}

export const useGetRiskyOrders = (customerId: string | null) => {
  return useQuery<RiskyOrderResponse>({
    queryKey: ["risky-orders", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID required");

      const res = await axios.get(
        `/order/risky-orders?customerId=${customerId}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
      console.log("LOL:-", res);
      return res.data;
    },
    enabled: !!customerId,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
