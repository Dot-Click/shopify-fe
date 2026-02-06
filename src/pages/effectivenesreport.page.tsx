import React from 'react';
import { useFetchEffectivenessReport, type MonthlyLossEntry } from '@/hooks/reports/usefetcheffectivness';
import { format } from 'date-fns';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Helper Component for KPI Tiles
const KpiTile: React.FC<{ title: string; value: number | string; icon?: React.ReactNode; color: string }> = ({ title, value, color }) => (
    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${color} bg-white flex flex-col justify-between h-full`}>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-1">{value.toLocaleString()}</p>
    </div>
);

// Helper Component for Monthly Trend Line Chart (using Recharts)
const MonthlyTrendChart: React.FC<{ data: MonthlyLossEntry[] }> = ({ data }) => {
    
    const chartDataPoints = data.map(m => ({
        name: format(new Date(m.month), 'MMM yy'),
        'Prevented Loss': m.amount, // Ensure number formatting
    }));
    
    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Monthly Prevented Loss Trend</h3>

            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartDataPoints}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        
                        <XAxis 
                            dataKey="name" 
                            stroke="#555"
                            tick={{ fontSize: 12 }}
                        />
                        
                        <YAxis 
                            stroke="#555"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`} // Format as currency
                        />
                        
                        <Tooltip 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Prevented Loss']}
                            labelFormatter={(label: string) => `Month: ${label}`}
                        />
                        
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        
                        <Line 
                            type="monotone" 
                            dataKey="Prevented Loss" 
                            stroke="#10b981" // Tailwind Emerald-500
                            strokeWidth={2}
                            dot={{ stroke: '#10b981', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {data.length === 0 && <p className="text-sm text-gray-500 mt-4 text-center">No monthly trend data available.</p>}
        </div>
    );
};


const SystemEffectivenessReport: React.FC = () => {
    const { data, isLoading, isError, error } = useFetchEffectivenessReport();

    if (isLoading) {
        return <div className="p-8 text-center text-blue-500 text-lg">Loading Effectiveness Report...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600 text-lg font-medium">Error: Failed to load report. {(error as Error).message}</div>;
    }

    // Safely destructure data
    const stats = data?.cumulativeStats || { totalFlagged: 0, cancelledAndFlagged: 0, preventedLoss: 0 };
    const monthlyData = data?.monthlyPreventedLoss || [];

    // Calculate effectiveness percentages
    const cancellationRate = stats.totalFlagged > 0 
        ? ((stats.cancelledAndFlagged / stats.totalFlagged) * 100).toFixed(1) + '%' 
        : 'N/A';
    
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-8">System Effectiveness Report</h1>

            {/* KPI Dashboard Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <KpiTile 
                    title="Total Orders Flagged" 
                    value={stats.totalFlagged} 
                    color="border-red-500" 
                />
                <KpiTile 
                    title="Flagged Orders Cancelled" 
                    value={stats.cancelledAndFlagged} 
                    color="border-yellow-500" 
                />
                <KpiTile 
                    title="Total Prevented Loss" 
                    value={`$${stats.preventedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
                    color="border-green-500" 
                />
                <KpiTile 
                    title="Cancellation Effectiveness" 
                    value={cancellationRate} 
                    color="border-blue-500" 
                />
            </div>

            {/* Monthly Trend Section */}
            <MonthlyTrendChart data={monthlyData} />
        </div>
    );
};

export default SystemEffectivenessReport;