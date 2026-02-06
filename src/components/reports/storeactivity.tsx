import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "../../configs/axios.config";
import type { StoreActivityData, StoreActivityReportResponse } from "@/types/storereport.t";


const STORE_ACTIVITY_REPORT_ENDPOINT = "/reports/store-activity-report";

export const useFetchStoreActivityReport = () => {

    return useQuery<StoreActivityData[], ErrorWithMessage>({
        queryKey: ["store-activity-report"],
        queryFn: async () => {

            const response = await axios.get<StoreActivityReportResponse>(STORE_ACTIVITY_REPORT_ENDPOINT);

            console.log(
                "Successfully fetched Store Activity Report data:",
                response.data.data
            );


            return response.data.data;
        },

        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};