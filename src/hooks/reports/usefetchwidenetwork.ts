// src/hooks/useRiskDashboardData.ts

import { useState, useEffect } from 'react';

// --- Types based on the controller's output ---
interface TopDomain {
    domain: string;
    count: number;
}

interface MonthlyData {
    month: string; // date_trunc returns a string in ISO format
    count: number;
}

interface FlaggedLocation {
    postcode: string;
    count: number;
    // In a real app, you would fetch lat/lng for these postcodes 
    // or store them in the database for the map
}

interface RiskDashboardData {
    totalFlaggedOrders: number;
    top10Domains: TopDomain[];
    monthlyRepeatRisk: MonthlyData[];
    flaggedLocations: FlaggedLocation[];
}

interface DashboardState {
    data: RiskDashboardData | null;
    loading: boolean;
    error: string | null;
}

const API_ENDPOINT = '/api/risk-dashboard-data'; // Assuming a new endpoint

export const useRiskDashboardData = () => {
    const [state, setState] = useState<DashboardState>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: RiskDashboardData = await response.json();
                
                // Format monthly data for chart consumption (optional but good practice)
                const formattedData = {
                    ...result,
                    monthlyRepeatRisk: result.monthlyRepeatRisk.map(item => ({
                        ...item,
                        // Convert the month string to a readable format for chart labels
                        month: new Date(item.month).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                        }),
                    })),
                };

                setState({ data: formattedData, loading: false, error: null });
            } catch (err: any) {
                console.error("Failed to fetch dashboard data:", err);
                setState({ data: null, loading: false, error: err.message || 'An unknown error occurred' });
            }
        };

        fetchData();
    }, []);

    return state;
};