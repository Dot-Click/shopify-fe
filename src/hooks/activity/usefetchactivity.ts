import { useQuery } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "@/configs/axios.config";

export interface Activity {
  id: string;
  userId: string;
  action: string;
  for: string;
  storeId?: string | null;
  customerId?: string | null;
  orderId?: string | null;
  meta?: Record<string, any>;
  createdAt: string;
}

export function useRecentActivities(limit = 10) {
  return useQuery<Activity[], ErrorWithMessage>({
    queryKey: ["recentActivities", limit],
    queryFn: async () => {
      const resp = await axios.get(`/activity/activities?limit=${limit}`);
      return resp.data ?? [];
    },
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });
}
