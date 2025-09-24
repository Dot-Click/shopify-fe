import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useFetchNotification = () => {
  return useQuery({
    queryKey: ["get-notification"],
    queryFn: async () => {
      const res = await axios.get(`/notifications/get-notifications`);
      console.log("This is RESPONSE:___", res.data);
      return res.data.data;
    },
    // enabled: !!customerId,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
