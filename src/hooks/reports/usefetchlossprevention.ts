import { axios } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";

interface Dates {
  startDate: string;
  endDate: string;
}

export const useFetchLossPrevention = (params?: Dates) => {
  return useQuery({
    queryKey: ["loss-prevention-report", params],
    queryFn: async () => {
      console.log(params);
      const res = await axios.get("/reports/loss-prevention-report", {
        params,
      });
      console.log("REsponse 2.0", res);
      return res.data;
    },
  });
};
