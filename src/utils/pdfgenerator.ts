// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import html2canvas from "html2canvas";

// /**
//  * Simple helpers and expectations:
//  * - Many functions accept a DOM node for charts (chartNode). If not provided, they fallback to a table representation.
//  * - Input shapes are flexible but documented below each function.
//  */

// const A4_WIDTH = 210; // mm
// const MARGIN = 14;
// const PAGE_HEIGHT = 297;

// function mmToPx(mm: number) {
//   // jsPDF addImage uses px dataURI; we won't convert exact DPI here — html2canvas returns base64 so it's ok.
//   return mm;
// }

// async function addChartImageToDoc(
//   doc: jsPDF,
//   chartNode: HTMLElement | null,
//   x = MARGIN,
//   y = 50,
//   w = A4_WIDTH - 2 * MARGIN
// ) {
//   if (!chartNode) {
//     doc.setFontSize(10);
//     doc.text("Chart not available (no DOM node passed).", x, y);
//     return y + 8;
//   }
//   try {
//     const canvas = await html2canvas(chartNode, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     // Fit image height to keep aspect ratio
//     const imgProps = (doc as any).getImageProperties(imgData);
//     const pdfW = w;
//     const pdfH = (imgProps.height * pdfW) / imgProps.width;
//     doc.addImage(imgData, "PNG", x, y, pdfW, pdfH);
//     return y + pdfH + 6;
//   } catch (err) {
//     doc.setFontSize(10);
//     doc.text("Error rendering chart image.", x, y);
//     return y + 8;
//   }
// }

// function drawKpiTile(
//   doc: jsPDF,
//   x: number,
//   y: number,
//   w: number,
//   h: number,
//   title: string,
//   value: string
// ) {
//   doc.setFillColor(245, 246, 250);
//   doc.roundedRect(x, y, w, h, 2, 2, "F");
//   doc.setFontSize(10);
//   doc.setTextColor(80, 80, 80);
//   doc.text(title, x + 4, y + 6);
//   doc.setFontSize(14);
//   doc.setTextColor(20, 20, 20);
//   doc.text(value, x + 4, y + 15);
// }

// /**
//  * Report #1 - Customer Database Growth Report
//  * expected input:
//  * - flaggedCustomers: array of objects { id?, email, name?, riskLevel?, totalRiskReport?, createdAt?, source? }
//  *    createdAt should be ISO string if you want 7/30/90 day counts.
//  * - monthlyChartNode: DOM node for the growth chart (optional)
//  */
// export async function generateCustomerReport(
//   flaggedCustomers: any[] = [],
//   monthlyChartNode?: HTMLElement
// ) {
//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   let y = 18;
//   doc.setFontSize(16);
//   doc.text("Customer Database Growth Report", MARGIN, y);

//   // KPIs
//   const now = new Date();
//   const uniqueEmails = new Set(flaggedCustomers.map((c) => c.email));
//   const totalCustomers = uniqueEmails.size;

//   const countInWindow = (days: number) =>
//     flaggedCustomers.filter((c) => {
//       if (!c.createdAt) return false;
//       const d = new Date(c.createdAt);
//       return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= days;
//     }).length;

//   const new7 = countInWindow(7);
//   const new30 = countInWindow(30);
//   const new90 = countInWindow(90);

//   // Sources: expects c.source === 'import' or 'store' or presence of storeId
//   const importedCount = flaggedCustomers.filter(
//     (c) => c.source === "import" || c.source === "historical"
//   ).length;
//   const storeReportedCount = flaggedCustomers.length - importedCount;

//   // Draw KPI tiles (2 per row)
//   const tileW = (A4_WIDTH - 2 * MARGIN - 6) / 2;
//   y += 6;
//   drawKpiTile(
//     doc,
//     MARGIN,
//     y,
//     tileW,
//     22,
//     "Total flagged customers",
//     String(totalCustomers)
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + tileW + 6,
//     y,
//     tileW,
//     22,
//     "New in last 7 days",
//     String(new7)
//   );
//   y += 26;
//   drawKpiTile(doc, MARGIN, y, tileW, 22, "New in last 30 days", String(new30));
//   drawKpiTile(
//     doc,
//     MARGIN + tileW + 6,
//     y,
//     tileW,
//     22,
//     "New in last 90 days",
//     String(new90)
//   );
//   y += 28;
//   drawKpiTile(
//     doc,
//     MARGIN,
//     y,
//     tileW,
//     22,
//     "Source: store reports",
//     String(storeReportedCount)
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + tileW + 6,
//     y,
//     tileW,
//     22,
//     "Source: imported historical",
//     String(importedCount)
//   );
//   y += 28;

//   // Chart (if dom node available) otherwise small header
//   doc.setFontSize(12);
//   doc.text("Growth trend", MARGIN, y);
//   y += 4;
//   y = await addChartImageToDoc(
//     doc,
//     monthlyChartNode || null,
//     MARGIN,
//     y,
//     A4_WIDTH - 2 * MARGIN
//   );

//   // Table of flagged customers
//   const tableStartY = Math.max(y + 4, 120);
//   //   const doc = new jsPDF();

//   doc.autoTable({
//     head: [["ID", "Name", "Email", "Risk Level", "Total Reports", "Store IDs"]],
//     body: flaggedCustomers.map((c) => [
//       c.id ?? "-",
//       c.name ?? "-",
//       c.email ?? "-",
//       c.riskLevel ?? "-",
//       c.totalRiskReport ?? "-",
//       Array.isArray(c.storeIds) ? c.storeIds.join(", ") : c.storeId ?? "-",
//     ]),
//   });

//   doc.save("customer-database-growth-report.pdf");
// }

// /**
//  * Report #2 - Store Activity & Utilization
//  * expected input:
//  * - stores: array of store objects { id, name, email, lastLogin?, searches?, flaggedOrders?, reviewedOrders?, autoCancelled? }
//  * - option: rankingKey string ("searches" or "flaggedOrders")
//  */
// export function generateStoreReport(
//   stores: any[] = [],
//   options: { rankingKey?: string } = {}
// ) {
//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   let y = 18;
//   doc.setFontSize(16);
//   doc.text("Store Activity & Utilisation Report", MARGIN, y);

//   // KPIs
//   y += 8;
//   const totalStores = stores.length;
//   const newStores30 = stores.filter((s) => {
//     if (!s.createdAt) return false;
//     const d = new Date(s.createdAt);
//     const now = new Date();
//     return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 30;
//   }).length;

//   drawKpiTile(doc, MARGIN, y, 60, 18, "Total stores", String(totalStores));
//   drawKpiTile(
//     doc,
//     MARGIN + 66,
//     y,
//     60,
//     18,
//     "New in last 30d",
//     String(newStores30)
//   );
//   y += 22;

//   // Activity ranking
//   const key = options.rankingKey || "searches";
//   const ranked = [...stores]
//     .sort((a, b) => (b[key] || 0) - (a[key] || 0))
//     .slice(0, 10);

//   doc.setFontSize(12);
//   doc.text("Top active stores (by " + key + ")", MARGIN, y);
//   y += 6;
//   const rankBody = ranked.map((s, i) => [
//     String(i + 1),
//     s.name || s.storeName || "-",
//     String(s[key] ?? 0),
//   ]);
//   (doc as any).autoTable({
//     startY: y,
//     head: [["#", "Store", key]],
//     body: rankBody,
//     styles: { fontSize: 9 },
//   });
//   y = (doc as any).lastAutoTable.finalY + 6;

//   // Main table
//   (doc as any).autoTable({
//     startY: y,
//     head: [
//       [
//         "ID",
//         "Store Name",
//         "Searches",
//         "Flagged / Reviewed / Auto-cancelled",
//         "Last Login",
//       ],
//     ],
//     body: stores.map((s) => [
//       s.id ?? "-",
//       s.name ?? s.storeName ?? "-",
//       s.searches ?? 0,
//       `${s.flaggedOrders ?? 0} / ${s.reviewedOrders ?? 0} / ${
//         s.autoCancelled ?? 0
//       }`,
//       s.lastLogin ? new Date(s.lastLogin).toLocaleString() : "-",
//     ]),
//     styles: { fontSize: 9 },
//     theme: "striped",
//     headStyles: { fillColor: [10, 37, 86] },
//   });

//   doc.save("store-activity-utilisation-report.pdf");
// }

// /**
//  * Reports #3 + #4 + #5 combined
//  * expected input: an object with:
//  * - networkChartNode (DOM) OR monthlyData array
//  * - topDomains: Array<[domain, count]>
//  * - topPostcodes: Array<[postcode, count]>
//  * - plansStats: Array<[planName, totalStores]>
//  * - pendingActivations: number
//  * - avgActivationTimeDays: number
//  * - newStores30: number
//  * - systemEffectiveness: { totalFlaggedOrders, preventedLossEstimate, percentRealIssues, percentCancelled }
//  */
// export async function generateNetworkOnboardingEffectivenessReport(opts: {
//   networkChartNode?: HTMLElement | null;
//   monthlyData?: any[]; // [{ month, riskIncidents, affectedStores }]
//   topDomains?: [string, number][];
//   topPostcodes?: [string, number][];
//   plansStats?: [string, number][];
//   pendingActivations?: number;
//   avgActivationTimeDays?: number;
//   newStores30?: number;
//   systemEffectiveness?: {
//     totalFlaggedOrders?: number;
//     preventedLossEstimate?: number;
//     percentRealIssues?: number;
//     percentCancelled?: number;
//     monthly?: any[];
//   };
// }) {
//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   let y = 18;
//   doc.setFontSize(16);
//   doc.text("Network-Wide Risk Trends", MARGIN, y);
//   y += 6;
//   // chart
//   y = await addChartImageToDoc(
//     doc,
//     opts.networkChartNode || null,
//     MARGIN,
//     y,
//     A4_WIDTH - 2 * MARGIN
//   );

//   // Top domains
//   doc.setFontSize(12);
//   doc.text("Top repeated email domains", MARGIN, y);
//   y += 6;
//   (doc as any).autoTable({
//     startY: y,
//     head: [["Domain", "Count"]],
//     body: (opts.topDomains || []).slice(0, 10).map((d) => [d[0], String(d[1])]),
//     styles: { fontSize: 9 },
//   });
//   y = (doc as any).lastAutoTable.finalY + 6;

//   doc.addPage();
//   y = 18;
//   doc.setFontSize(16);
//   doc.text("Store Onboarding & Status", MARGIN, y);
//   y += 8;

//   const plans = opts.plansStats || [];
//   drawKpiTile(
//     doc,
//     MARGIN,
//     y,
//     60,
//     18,
//     "Pending activations",
//     String(opts.pendingActivations ?? 0)
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + 66,
//     y,
//     60,
//     18,
//     "Avg activation (days)",
//     String(opts.avgActivationTimeDays ?? "-")
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + 132,
//     y,
//     60,
//     18,
//     "New stores (30d)",
//     String(opts.newStores30 ?? 0)
//   );
//   y += 22;

//   (doc as any).autoTable({
//     startY: y,
//     head: [["Plan", "Total Stores"]],
//     body: (plans as [string, number][]).map((p) => [p[0], String(p[1])]),
//     styles: { fontSize: 9 },
//   });

//   doc.addPage();
//   y = 18;
//   doc.setFontSize(16);
//   doc.text("System Effectiveness & Risk Prevention", MARGIN, y);
//   y += 8;

//   const eff = opts.systemEffectiveness || {};
//   drawKpiTile(
//     doc,
//     MARGIN,
//     y,
//     60,
//     18,
//     "Total flagged orders",
//     String(eff.totalFlaggedOrders ?? 0)
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + 66,
//     y,
//     60,
//     18,
//     "£ prevented loss (est.)",
//     String(eff.preventedLossEstimate ?? "0")
//   );
//   drawKpiTile(
//     doc,
//     MARGIN + 132,
//     y,
//     60,
//     18,
//     "% real issues",
//     `${Math.round((eff.percentRealIssues ?? 0) * 100) / 100}%`
//   );
//   y += 28;

//   // monthly table for effectiveness or trend
//   (doc as any).autoTable({
//     startY: y,
//     head: [["Month", "Flagged Orders", "Prevented Loss Estimate"]],
//     body: (eff.monthly || opts.monthlyData || []).map((m) => [
//       m.month || "-",
//       String(m.flaggedOrders ?? m.riskIncidents ?? 0),
//       String(m.preventedLoss ?? "-"),
//     ]),
//     styles: { fontSize: 9 },
//   });

//   doc.save("network-onboarding-effectiveness-report.pdf");
// }
