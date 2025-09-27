import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format, subDays, isAfter, parseISO } from "date-fns";

// --- Type Definition ---
type CustomerEntry = {
  id: string;
  name: string;
  email: string;
  riskLevel: number;
  totalriskReports: number;
  createdAt: string;
};

// --- PDF Styles ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    // fontFamily: 'Oswald',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "grey",
  },
  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  kpiBox: {
    width: "32%",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
  },
  kpiLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: 5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    padding: 5,
  },
  tableColHeader: {
    fontWeight: "bold",
  },
  colId: { width: "15%" },
  colName: { width: "25%" },
  colEmail: { width: "35%" },
  colRisk: { width: "15%", textAlign: "right" },
  colReports: { width: "10%", textAlign: "right" },
});

// --- The PDF Document Component ---
export const CustomerReportPDF = ({
  customers,
}: {
  customers: CustomerEntry[];
}) => {
  // Perform calculations inside the component
  const today = new Date();
  const totalCustomers = customers.length;
  const addedLast30Days = customers.filter((c) =>
    isAfter(parseISO(c.createdAt), subDays(today, 30))
  ).length;
  const addedLast90Days = customers.filter((c) =>
    isAfter(parseISO(c.createdAt), subDays(today, 90))
  ).length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Report Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Customer Database Growth Report</Text>
          <Text style={styles.subtitle}>
            Report generated on: {format(today, "yyyy-MM-dd")}
          </Text>
        </View>

        {/* KPI Tiles */}
        <View style={styles.kpiContainer}>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>Total Customers</Text>
            <Text style={styles.kpiValue}>{totalCustomers}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>New in 30 Days</Text>
            <Text style={styles.kpiValue}>{addedLast30Days}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>New in 90 Days</Text>
            <Text style={styles.kpiValue}>{addedLast90Days}</Text>
          </View>
        </View>

        {/* Full Customer Details Table */}
        <Text style={styles.sectionTitle}>Flagged Customer Details</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableColHeader, styles.colId]}>User ID</Text>
            <Text style={[styles.tableColHeader, styles.colName]}>Name</Text>
            <Text style={[styles.tableColHeader, styles.colEmail]}>Email</Text>
            <Text style={[styles.tableColHeader, styles.colRisk]}>Risk %</Text>
            <Text style={[styles.tableColHeader, styles.colReports]}>
              Reports
            </Text>
          </View>
          {/* Table Body */}
          {customers.map((customer) => (
            <View key={customer.id} style={styles.tableRow}>
              <Text style={styles.colId}>{customer.id}</Text>
              <Text style={styles.colName}>{customer.name}</Text>
              <Text style={styles.colEmail}>{customer.email}</Text>
              <Text style={styles.colRisk}>{customer.riskLevel}</Text>
              <Text style={styles.colReports}>{customer.totalriskReports}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
