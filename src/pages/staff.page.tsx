import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Box } from "@/components/ui/box";
import toast from "react-hot-toast";
import { authClient } from "@/providers/user.provider";
import { Spinner } from "@/components/ui/spinner";

export interface StaffFormValues {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: string[];
}

export default function CreateStaff() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const user = authClient.useSession()

  console.log("user:-", user)

  const HandleSubmit = async () => {
    await authClient.admin.createUser(
      {
        name: `${form.name}`,
        email: form.email,
        password: form.password,
        data: {
          role: form.role,
          phone: form.phone,
          shopify_url: user.data?.user.shopify_url,
          average_orders_per_month: user.data?.user.average_orders_per_month,
          shopify_api_key: user.data?.user.shopify_api_key,
          shopify_access_token: user.data?.user.shopify_access_token,
          package: user.data?.user.package,
          plan: user.data?.user.plan,
          company_name: user.data?.user.company_name,
          company_registration_number: user.data?.user.company_registration_number,
        },
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          // console.log(ctx);
          toast.success("Created staff member");
          await authClient.emailOtp.sendVerificationOtp({
            email: form.email,
            type: "email-verification",
          });
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          console.log(ctx);
          setLoading(false);
        },
      }
    );
  };

  return (
    <Box className="">
      <Card className="bg-white border-0 mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-web-dark-grey">
            Create Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Name */}
            <Box>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Enter staff name"
                value={form.name}
                onChange={handleChange}
                className="border-0 bg-white shadow"
              />
            </Box>

            {/* Email */}
            <Box>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter staff email"
                value={form.email}
                onChange={handleChange}
                className="border-0 bg-white shadow"
              />
            </Box>

            <Box>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter staff password"
                value={form.password}
                onChange={handleChange}
                className="border-0 bg-white shadow"
              />
            </Box>

            <Box>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter staff phone"
                value={form.phone}
                onChange={handleChange}
                className="border-0 bg-white shadow"
              />
            </Box>

            {/* Role */}
            <Box>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Select
                onValueChange={(value) => setForm({ ...form, role: value })}
              >
                <SelectTrigger className="border-0 shadow">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 shadow-lg">
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            {/* Submit */}
            <Box className="flex justify-end">
              <Button
                type="button"
                className="bg-blue-600 text-white w-42 hover:bg-blue-700"
                onClick={HandleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create Staff"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
