export type CustomerEntry = {
  id: string;
  name: string;
  email: string;
  riskLevel: number;
  totalriskReports: number;
  createdAt: string;
};

// Define the structure for your simplified frontend StoreEntry
export interface StoreEntry {
  id: number;
  storeName: string;
  email: string;
  apiKey: string;

  // rank: number; 
  searchesPerformed: number;
  ordersFlagged: number;
  ordersReviewed: number;
  ordersAutoCancelled: number;
  lastLoginDate: string;
}


// Define the structure of a single store's activity data
export interface StoreActivityData {
  storeId: number;
  storeName: string;
  email: string;
  apiKey: string;
  searchesPerformed: number;
  ordersFlagged: number;
  ordersReviewed: number;
  ordersAutoCancelled: number;
  lastLoginDate: string;
}

// Define the full API response structure
export interface StoreActivityReportResponse {
  success: boolean;
  reportName: string;
  generatedOn: string;
  data: StoreActivityData[];
}

