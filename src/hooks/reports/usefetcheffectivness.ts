import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";


export interface CumulativeStats {
    totalFlagged: number;
    cancelledAndFlagged: number;
    preventedLoss: number; // This will be a number, potentially with decimals
}


export interface MonthlyLossEntry {
    month: Date | string;
    amount: number;
}


export interface EffectivenessReportResponse {
    cumulativeStats: CumulativeStats;
    monthlyPreventedLoss: MonthlyLossEntry[];
}

// Define the API route constant
const EFFECTIVENESS_REPORT_ENDPOINT = "/reports/effectiveness-report"; // From your router setup

export const useFetchEffectivenessReport = () => {
    return useQuery<EffectivenessReportResponse, ErrorWithMessage>({
        queryKey: ["effectiveness-report"],
        queryFn: async () => {
            const response = await axios.get<EffectivenessReportResponse>(EFFECTIVENESS_REPORT_ENDPOINT);

            console.log("Effectiveness Report Data Fetched Successfully.");

            return response.data;
        },

        staleTime: 1000 * 60 * 15, // 15 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};