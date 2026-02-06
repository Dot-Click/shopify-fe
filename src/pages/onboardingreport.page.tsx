import React from 'react';
import { useFetchOnboardingReport, type  OnboardingReportResponse, type StorePlanEntry  } from '@/hooks/reports/usefetchonboarding'; // Adjust path


// Helper Component for KPI Tiles
const KpiTile: React.FC<{ title: string; value: number | string; color: string }> = ({ title, value, color }) => (
    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${color} bg-white`}>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-1">{value.toLocaleString()}</p>
    </div>
);

// Helper Component for the Stores by Plan Table
const PlanTable: React.FC<{ data: StorePlanEntry[] }> = ({ data }) => {
    // Calculate total stores for a percentage column
    const totalStores = data.reduce((sum, entry) => sum + entry.count, 0);

    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Store Distribution by Plan</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plan Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Store Count</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Percentage</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((entry) => (
                        <tr key={entry.plan || 'No Plan'} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {entry.plan || 'Unassigned/Legacy'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {entry.count.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {totalStores > 0 ? ((entry.count / totalStores) * 100).toFixed(1) + '%' : '0.0%'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && <p className="text-center text-gray-500 py-4">No plan data available.</p>}
        </div>
    );
};


const OnboardingReport: React.FC = () => {
    const { data, isLoading, isError, error } = useFetchOnboardingReport();

    if (isLoading) {
        return <div className="p-8 text-center text-blue-500 text-lg">Loading Onboarding Report...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-600 text-lg font-medium">Error: Failed to load report. {(error as Error).message}</div>;
    }

    // Safely destructure data
    const reportData: OnboardingReportResponse = data || { newStoresLast30Days: 0, storesByPlan: [] };

    const totalStores = reportData.storesByPlan.reduce((sum, entry) => sum + entry.count, 0);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-8">Store Onboarding Report</h1>

            {/* KPI Tiles Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <KpiTile 
                    title="New Stores (Last 30 Days)" 
                    value={reportData.newStoresLast30Days} 
                    color="border-green-500" 
                />
                <KpiTile 
                    title="Total Active Stores" 
                    value={totalStores} 
                    color="border-indigo-500" 
                />
                <KpiTile 
                    title="Average Stores Per Plan" 
                    value={totalStores > 0 && reportData.storesByPlan.length > 0 ? (totalStores / reportData.storesByPlan.length).toFixed(1) : 'N/A'}
                    color="border-yellow-500"
                />
            </div>

            {/* Table Section */}
            <PlanTable data={reportData.storesByPlan} />
        </div>
    );
};

export default OnboardingReport;