import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

export interface RefundItem {
  product: string;
  quantity: number;
  price: string;
  currency: string;
}

export interface Refund {
  orderId: string;
  orderName: string;
  orderDate: string;
  refundId: string;
  refundDate: number;
  note?: string;
  items: RefundItem[];
}

export interface RefundHistoryResponse {
  customer: {
    id: string;
    name: string;
    email: string;
  };
  totalRefunds: number;
  refunds: Refund[];
}

export const useFetchRefunds = (
  customerId: string,
  storeId: string,
  enabled: boolean
) => {
  return useQuery<RefundHistoryResponse, ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get(
        `/order/customer-refunds/${storeId}/?customerId=${customerId}`
      );
      console.log("REFUNDS:-", response);
      return response?.data ?? [];
    },
    queryKey: ["customer-refunds"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled,
  });
};
