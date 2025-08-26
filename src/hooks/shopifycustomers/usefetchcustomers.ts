import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";

export type Customer = {
  id: string;
  displayName: string;
  createdAt: string;
  customerEmail: string;
  customerPhone: string | null;
  image: {
    url: string;
  };
  riskLevel: number;
}[];

export const useFetchAllCustomers = () => {
  return useQuery<Customer[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/shopify/customers");
      console.log("This is the RESPONSE:", response?.data);
      return response?.data ?? [];
    },
    queryKey: ["all-customers"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
