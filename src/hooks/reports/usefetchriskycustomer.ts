import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "@/configs/axios.config";

// Define the shape of the data returned by the controller
export interface HighRiskCustomer {
  customerId: number;
  email: string;
  flaggedAttempts: number;
  lastAttemptDate: string | null;
  latestAddress: {
    city: string | null;
    zip: string | null;
    country: string | null;
  } | null;
}

export const useFetchHighRiskActivityReport = () => {
  return useQuery<HighRiskCustomer[], ErrorWithMessage>({
    queryKey: ["high-risk-customer-report"],
    queryFn: async () => {
      // NOTE: Keeping the typo 'csutomer' to match your route definition
      const response = await axios.get("/reports/high-risk-csutomer-report");
      
      // Assuming your API wrapper returns { success: true, data: [...] }
      return response.data.data; 
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};