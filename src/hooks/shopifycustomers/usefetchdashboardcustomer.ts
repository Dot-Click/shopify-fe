import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";
import { type Customer } from "./usefetchcustomers";

export type { Customer };

export const useFetchDashboardCustomers = () => {
  return useQuery<Customer[], ErrorWithMessage>({
    queryFn: async () => {
      const response = await axios.get("/customer/admin-customers");
      console.log("FETCH DASHBOARD:", response?.data);
      return response?.data ?? [];
    },
    queryKey: ["dashboard-customers"],
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
