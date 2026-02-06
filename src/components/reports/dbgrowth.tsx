import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchStoreGrowth } from "@/hooks/reports/usefetchdbgrowth";
import { Spinner } from "@/components/ui/spinner";
import { TrendingUp, Users } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function StoreGrowthDashboard() {
  const { data, isLoading, error } = useFetchStoreGrowth();

  if (isLoading) return <div className="p-10 flex justify-center"><Spinner /></div>;
  if (error) return <div className="p-10 text-red-500">Error loading growth data.</div>;

  return (
    <div className="space-y-6">

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <Card className="border-1 border-gray-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalStores}</div>
            <p className="text-xs text-muted-foreground">Active platform users</p>
          </CardContent>
        </Card>

        <Card className="border-1 border-gray-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Stores (30 Days)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.newStoresLast30Days}</div>
            <p className="text-xs text-muted-foreground">Recent onboardings</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 ">

        {/* Monthly Growth Line Chart */}
        <Card className="border-1 border-gray-200 shadow-xs">
          <CardHeader>
            <CardTitle>Monthly Growth Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.growthTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution Pie Chart */}
        <Card className="border-1 border-gray-200 shadow-xs">
          <CardHeader>
            <CardTitle>Stores by Plan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.storesByPlan}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="plan"
                >
                  {data?.storesByPlan.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex justify-center gap-4 pb-4 flex-wrap">
            {data?.storesByPlan.map((entry, index) => (
              <div key={entry.plan} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-slate-600">{entry.plan || "Free"} ({entry.count})</span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}