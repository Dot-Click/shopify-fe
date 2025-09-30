import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  //   ArrowUpDown,
  Ban,
  CalendarDays,
  CircleCheckBig,
  Clock,
  Eye,
  Flag,
  FlagOff,
  Mail,
  Phone,
  ShieldAlert,
  User,
} from "lucide-react";
import { type Customer } from "@/hooks/shopifycustomers/usefetchdashboardcustomer"; // Adjust this import path
import { TableProvider } from "@/providers/table.provider";
import { TableComponent } from "../common/tablecomponent";
import {
  type RiskyOrderResponse,
  useGetRiskyOrders,
} from "@/hooks/shopifycustomers/usefetchcustomerorders";
import { type ColumnDef } from "@tanstack/react-table";
import { SortedHeader } from "../common/tablecomponent";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Box } from "../ui/box";
import { useState } from "react";
import { useAddFlag } from "@/hooks/shopifycustomers/useaddflag";
import { useDeleteFlag } from "@/hooks/shopifycustomers/usedeleteflag";
import { useBlockCustomer } from "@/hooks/shopifycustomers/useblockcustomer";

const mockDetails = {
  registrationDate: "Mar 15, 2024",
  lastActive: "2 hours ago",
};

const getRiskColor = (level: number) => {
  if (level > 75) return "bg-red-400";
  if (level > 40) return "bg-orange-400";
  return "bg-green-400";
};

const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="w-full flex items-center gap-2">
    <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className={cn("absolute top-0 left-0 h-full", getRiskColor(level))}
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

// Helper component for the overview section
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}) => (
  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-gray-800 text-[10px]">
        {value || "N/A"}
      </p>
    </div>
  </div>
);


type Order = RiskyOrderResponse["orders"][number];
type OrderRowData = Order & Omit<RiskyOrderResponse, "orders">;


export const ViewOrderModal = ({ user }: { user: Customer }) => {
  const isHighRisk = user.riskLevel > 50;
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetRiskyOrders(open ? user.id : null);
  const { mutate: addFlag } = useAddFlag();
  const { mutate: deleteFlag } = useDeleteFlag();
  const { mutate: block } = useBlockCustomer();


  const tableData: OrderRowData[] = data
    ? data.orders.map((order) => ({
      ...order,
      forceCourierSignedDelivery: data.forceCourierSignedDelivery,
      photoOnDelivery: data.photoOnDelivery,
      primaryAction: data.primaryAction,
      requireESignature: data.requireESignature,
      sendCancellationEmail: data.sendCancellationEmail,
    }))
    : [];

 const columns: ColumnDef<OrderRowData>[] = [
    {
      accessorKey: "id",
      header: (info) => <SortedHeader header={info.header} label="Order ID" />,
    },
    {
      accessorKey: "totalAmount",
      header: (info) => (
        <SortedHeader header={info.header} label="Total Amount" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return <Box>{new Date(row.original.createdAt).toLocaleDateString()}</Box>;
      },
    },
    {
      accessorKey: "flagged",
      header: "Flagged",
      cell: ({ row }) => (
        <Box>
          {row.original.flagged || row.original.manualFlag ? (
            <ShieldAlert className="h-7 w-7 text-red-500" />
          ) : (
            <CircleCheckBig className="h-5 w-5 text-green-500" />
          )}
        </Box>
      ),
    },
    {
      accessorKey: "sendCancellationEmail",
      header: "Cancel Email",
      cell: ({ row }) => <Box>{String(row.original.sendCancellationEmail)}</Box>,
    },
    {
      accessorKey: "forceCourierSignedDelivery",
      header: "Force Signed Delivery",
      cell: ({ row }) => (
        <Box>{String(row.original.forceCourierSignedDelivery)}</Box>
      ),
    },
    {
      accessorKey: "photoOnDelivery",
      header: "Photo On Delivery",
      cell: ({ row }) => <Box>{String(row.original.photoOnDelivery)}</Box>,
    },
    {
      accessorKey: "primaryAction",
      header: "Primary Action",
      cell: ({ row }) => <Box>{String(row.original.primaryAction)}</Box>,
    },
    {
      accessorKey: "requireESignature",
      header: "Require E Signature",
      cell: ({ row }) => <Box>{String(row.original.requireESignature)}</Box>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Box className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              addFlag({ orderId: row.original.id, flag: true });
            }}
            disabled={row.original.flagged || row.original.manualFlag}
            className="cursor-pointer bg-red-500 border-0 text-white text-center"
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer bg-blue-400 border-0 text-white text-center"
            onClick={() => {
              deleteFlag({ orderId: row.original.id });
            }}
            disabled={!row.original.flagged && !row.original.manualFlag}
          >
            <FlagOff className="h-4 w-4" />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white py-4.5 cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" /> View Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto max-h-[90vh] border-0 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            View Details
          </DialogTitle>
        </DialogHeader>
        <Box className="space-y-8 mt-4">
          {/* Top Profile Section */}
          <Box className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-sm">
            <Box className="flex items-center justify-between">
              <Box className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Box>
                  <Box className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {user.name}
                    </h2>
                    {isHighRisk && (
                      <Badge
                        variant="destructive"
                        className="bg-red-600 text-white"
                      >
                        HIGH RISK
                      </Badge>
                    )}
                  </Box>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <p className="text-sm text-slate-500">
                    Customer ID: {user.id}
                  </p>
                </Box>
              </Box>
              <div className="flex gap-2">
                <Button
                  className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
                  onClick={() => block(user?.id)}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Block Customer
                </Button>
              </div>
            </Box>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Risk Level</span>
                <span className="text-sm text-slate-600 w-10 text-right">
                  {user.riskLevel}%
                </span>
              </div>
              <RiskLevelIndicator level={user.riskLevel} />
            </div>
          </Box>

          {/* Customer Overview Section */}
          <Card className="bg-gray-100 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">
                Customer Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <InfoItem
                  icon={<User size={18} />}
                  label="Customer ID"
                  value={user.id}
                />
                <InfoItem
                  icon={<User size={18} />}
                  label="Full Name"
                  value={user.name}
                />
                <InfoItem
                  icon={<Mail size={18} />}
                  label="Email"
                  value={user.email ?? "N/A"}
                />
                <InfoItem
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={user.phone ?? "N/A"}
                />
                <InfoItem
                  icon={<CalendarDays size={18} />}
                  label="Registration Date"
                  value={mockDetails.registrationDate}
                />
                <InfoItem
                  icon={<Clock size={18} />}
                  label="Last Active"
                  value={mockDetails.lastActive}
                />
              </div>
            </CardContent>
          </Card>

          {/* Transaction History Section */}
          <Box className="bg-white max-w-[52rem] rounded-lg shadow-sm">
            <Box className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Transaction & Refund History
              </h3>
            </Box>
            <TableProvider data={tableData} columns={columns}>
              {() => <TableComponent isLoading={isLoading} />}
            </TableProvider>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};