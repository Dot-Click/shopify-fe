import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config"; 


export interface StorePlanEntry {
    plan: string | null; 
    count: number;       
}


export interface OnboardingReportResponse {
    newStoresLast30Days: number; 
    storesByPlan: StorePlanEntry[]; 
}

// Define the API route constant
const ONBOARDING_REPORT_ENDPOINT = "/reports/onboarding-report"; // From your router setup

export const useFetchOnboardingReport = () => {
  return useQuery<OnboardingReportResponse, ErrorWithMessage>({
    queryKey: ["onboarding-report"],
    queryFn: async () => {
      const response = await axios.get<OnboardingReportResponse>(ONBOARDING_REPORT_ENDPOINT);
      
      console.log("Onboarding Report Data Fetched:", response.data);
      
      return response.data;
    },
    // Onboarding data can be fresh for a while
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};