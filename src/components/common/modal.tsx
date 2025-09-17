// import { AlertTriangle, X } from "lucide-react";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { type Customer } from "@/hooks/shopifycustomers/usefetchdashboardcustomer";
// import { cn } from "../../lib/utils";
// import { Flex } from "../ui/flex";

// const getRiskColor = (level: number) => {
//   if (level > 75) return "bg-red-500";
//   if (level > 40) return "bg-orange-500";
//   return "bg-green-500";
// };

// const RiskLevelIndicator = ({ level }: { level: number }) => (
//   <div className="flex w-full items-center gap-2">
//     <div className="h-2 w-full flex-1 rounded-full bg-slate-200">
//       <div
//         className={cn("h-full rounded-full", getRiskColor(level))}
//         style={{ width: `${level}%` }}
//       />
//     </div>
//     <span className="text-sm font-semibold text-slate-600">{level}%</span>
//   </div>
// );

// const RefundItem = ({ date, reason }: { date: string; reason: string }) => (
//   <div className="flex items-center justify-between">
//     <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
//       {date}
//     </span>
//     <span className="text-sm text-slate-600">{reason}</span>
//   </div>
// );

// type ReportSummaryModalProps = {
//   user: Customer;
// };

// export function ReportSummaryModal({ user }: ReportSummaryModalProps) {
//   return (
//     <DialogContent className="sm:max-w-md  bg-white border-2 border-blue-200">
//       <DialogHeader>
//         <DialogTitle className="text-web-dark-grey font-bold ">
//           eComProtect Report Summary
//         </DialogTitle>
//         <DialogClose asChild>
//           <button className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//             <X className="h-4 w-4 cursor-pointer" />
//             <span className="sr-only">Close</span>
//           </button>
//         </DialogClose>
//       </DialogHeader>

//       <div className="space-y-6 py-4">
//         <section className="space-y-3">
//           <h3 className="font-semibold">Refunded Date:</h3>
//           {user.refundHistory?.map((item) => (
//             <RefundItem key={item.date} date={item.date} reason={item.reason} />
//           ))}
//           <Flex className="gap-x-3">
//             <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
//               19 Aug 2024
//             </span>
//             Item Not Receive
//           </Flex>
//           <Flex className="gap-x-3">
//             <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
//               12 Mar 2025
//             </span>
//             Refund Abuse
//           </Flex>
//           <Flex className="gap-x-3">
//             <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
//               04 Jun 2025
//             </span>
//             Refund Denied
//           </Flex>
//         </section>

//         <Separator />

//         {/* Account Summary Section */}
//         <section className="space-y-4">
//           <h3 className="font-semibold">Account Summary:</h3>
//           <Flex className="justify-between">
//             <div className="flex items-center gap-x-3 justify-between">
//               <span className="text-sm text-slate-600 ">Shared Across:</span>
//               <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
//                 {user?.accountSummary?.merchants} 3 Merchants
//               </span>
//             </div>

//             <div className="flex items-center gap-x-3 justify-between">
//               <span className="text-sm text-slate-600">Total Flags:</span>
//               <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
//                 <AlertTriangle className="h-4 w-4 text-red-500" /> 4
//                 {user?.accountSummary?.totalFlags}
//               </span>
//             </div>
//           </Flex>

//           <div className="flex items-center gap-4">
//             <span className="text-sm text-slate-600 w-32">Risk Level:</span>
//             <RiskLevelIndicator level={user.riskLevel} />
//           </div>
//         </section>
//       </div>
//     </DialogContent>
//   );
// }
