import React from 'react';
import { useFetchRiskDashboardData, type TopDomain } from '@/hooks/reports/usefetchwidenetwork';
import { format } from 'date-fns';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Helper component for the Top 10 Domains Table
const DomainTable: React.FC<{ domains: TopDomain[] }> = ({ domains }) => (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Top 10 Risky Email Domains</h3>
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Rank</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Domain</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Count</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {domains.map((d, index) => (
                    <tr key={d.domain} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{d.domain}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{d.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {domains.length === 0 && <p className="text-center text-gray-500 py-4">No top domain data available.</p>}
    </div>
);

// Component for the Line Chart (Placeholder for actual chart library integration)
interface MonthlyData {
    month: Date | string; // The date truncated to month (e.g., '2023-01-01T00:00:00.000Z')
    count: number; // The number of repeat risk orders
}

// Custom Tooltip Component (Optional but improves UX)
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
                <p className="font-semibold">{label}</p>
                <p className="text-blue-500">{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const MonthlyRiskLineChart: React.FC<{ data: MonthlyData[] }> = ({ data }) => {

    // 1. Process data into the format Recharts expects
    const chartDataPoints = data.map(m => ({
        // X-Axis Label: 'Jan 23', 'Feb 23', etc.
        name: format(new Date(m.month), 'MMM yy'),
        // Data Value (must match the accessor in the <Line /> component)
        'Repeat Risk Orders': m.count,
    }));

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Repeat Risk Growth (Month over Month)</h3>

            <div style={{ width: '100%', height: 300 }}>
                {/* 2. Responsive Container for proper sizing */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartDataPoints}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        {/* 3. Grid lines for context */}
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                        {/* 4. X-Axis (Months) */}
                        <XAxis
                            dataKey="name"
                            stroke="#555"
                            tick={{ fontSize: 12 }}
                        />

                        {/* 5. Y-Axis (Order Count) */}
                        <YAxis
                            stroke="#555"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => value.toLocaleString()} // Format numbers
                        />

                        {/* 6. Tooltip (Shows data on hover) */}
                        <Tooltip content={<CustomTooltip />} />

                        {/* 7. Legend */}
                        <Legend wrapperStyle={{ paddingTop: 10 }} />

                        {/* 8. The Line itself */}
                        <Line
                            type="monotone" // Smoother curve
                            dataKey="Repeat Risk Orders" // **MUST MATCH KEY IN chartDataPoints**
                            stroke="#3b82f6" // Tailwind Blue-500
                            strokeWidth={2}
                            dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }} // Highlight points
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {data.length === 0 && <p className="text-sm text-gray-500 mt-4 text-center">No monthly trend data available.</p>}
        </div>
    );
};

const WideNetworkReport: React.FC = () => {
    const { data, error } = useFetchRiskDashboardData();



    if (error) {
        return <div className="p-8 text-center text-red-600 text-lg font-medium">Error: Failed to load dashboard data. {error.message}</div>;
    }

    if (!data) {
        return <div className="p-8 text-center text-gray-500 text-lg">No data available for the Risk Dashboard.</div>;
    }

    return (
        <div className="p-8 bg-white rounded-xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-8">Network Risk Dashboard</h1>

            {/* 1. Total Flagged Orders Card */}
            <div className="mb-8">
                <div className="bg-red-50 p-6 rounded-xl shadow-lg border-l-4 border-red-500 max-w-sm">
                    <p className="text-sm font-medium text-red-600">Total Flagged Orders Network-Wide</p>
                    <p className="text-4xl font-extrabold text-red-800 mt-1">
                        {data.totalFlaggedOrders.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3. Monthly Repeat Risk - Line Chart */}
                <MonthlyRiskLineChart data={data.monthlyRepeatRisk} />

                {/* 2. Top 10 Domains - Table */}
                <DomainTable domains={data.top10Domains} />
            </div>


        </div>
    );
};

export default WideNetworkReport; // Use default export if this is the main component file