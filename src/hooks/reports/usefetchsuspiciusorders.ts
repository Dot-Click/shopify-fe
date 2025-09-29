import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

interface Dates {
  startDate: string;
  endDate: string;
}

export const useFetchSuspiciousOrders = (params?: Dates) => {
  return useQuery({
    queryKey: ["suspicious-orders", params],
    queryFn: async () => {
      const res = await axios.get("/reports/suspicious-order-report", {
        params,
      });
      console.log("RESPONSE:-", res);
      return res.data;
    },
  });
};
