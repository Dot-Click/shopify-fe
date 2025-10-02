import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

export type Customer = {
  id: string;
  name: string;
  createdAt: string;
  customerEmail: string;
  customerPhone: string | null;
  image: {
    url: string;
  };
  riskLevel: number;
  refundsFromStores: number;
  blocked?: boolean;
};

export const useFetchAllCustomers = () => {
  return useQuery<Customer[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/customers");
      console.log("This is the RESPONSE:", response?.data.data);
      return response?.data.data ?? [];
    },
    queryKey: ["all-customers"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
