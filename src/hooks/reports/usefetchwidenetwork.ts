import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";


// --- Types based on the controller's output ---
export interface TopDomain {
    domain: string;
    count: number;
}

export interface MonthlyData {
    month: string; // date_trunc returns a string in ISO format
    count: number;
}

interface FlaggedLocation {
    postcode: string;
    count: number;
}

interface RiskDashboardData {
    totalFlaggedOrders: number;
    top10Domains: TopDomain[];
    monthlyRepeatRisk: MonthlyData[];
    flaggedLocations: FlaggedLocation[];
}

// The API endpoint from your Express router: reportsRouter.get("/widenetwork-report", ...)
const RISK_DASHBOARD_ENDPOINT = "/reports/widenetwork-report";

/**
 * Hook to fetch all data required for the Risk Dashboard.
 * Data includes total flags, top domains, monthly risk trend, and flagged locations.
 */
export const useFetchRiskDashboardData = () => {
    return useQuery<RiskDashboardData, ErrorWithMessage>({
        queryKey: ["risk-dashboard-data"],
        queryFn: async () => {
            // Makes the GET request to the backend endpoint
            const response = await axios.get<RiskDashboardData>(RISK_DASHBOARD_ENDPOINT);

            console.log("Risk Dashboard Data Fetched Successfully.");

            // The API returns the main object directly, so we return the whole data object
            return response.data;
        },

        // Configuration for caching/stale data:
        staleTime: 1000 * 60 * 10, // Data is considered fresh for 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};