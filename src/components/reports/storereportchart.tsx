import { type ChartConfig } from "@/components/ui/chart";

export const StoreReportChart = {
  riskIncidents: {
    label: "Risk Incidents (Users)",
    color: "hsl(221, 83%, 53%)",
  },
  affectedStores: {
    label: "Affected Stores",
    color: "hsl(142, 71%, 45%)",
  },
} satisfies ChartConfig;
