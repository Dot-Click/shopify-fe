import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useFetchNotification = () => {
  const isUserPage = window.location.href.includes("/user");

  return useQuery({
    queryKey: ["get-notification"],
    queryFn: async () => {
      const res = await axios.get(`/notifications/get-notifications`);

      return res.data.data;
    },

    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: isUserPage,
  });
};
