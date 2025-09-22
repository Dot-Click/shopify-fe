import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import toast from "react-hot-toast";
import { authClient } from "@/providers/user.provider";
import { Spinner } from "@/components/ui/spinner";
import { Flex } from "@/components/ui/flex";

export default function CreateStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    companyName: "",
    companyRegNo: "",
    avgOrders: "",
    storeUrl: "",
    shopifyAccessToken: "",
    shopifyApiKey: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const HandleSubmit = async () => {
    await authClient.admin.createUser(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        data: {
          role: "sub-admin",
          mobileNumber: form.phone,
          company_name: form.companyName,
          company_registration_number: form.companyRegNo,
          average_orders_per_month: form.avgOrders,
          shopify_url: form.storeUrl,
          shopify_access_token: form.shopifyAccessToken,
          shopify_api_key: form.shopifyApiKey,
        },
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: async () => {
          toast.success("Store created successfully");
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
    <Box>
      <Card className="bg-white border-0 mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-web-dark-grey">
            Create Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Flex className="w-full">
              <Box className="w-2/4 pr-2">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2">
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full">
              <Box className="w-2/4 pr-2">
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2">
                <label className="block text-sm font-medium mb-2">
                  Company Registration Number
                </label>
                <Input
                  type="text"
                  name="companyRegNo"
                  placeholder="Enter registration number"
                  value={form.companyRegNo}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full">
              <Box className="w-2/4 pr-2">
                <label className="block text-sm font-medium mb-2">
                  Average Orders Per Month
                </label>
                <Input
                  type="text"
                  name="avgOrders"
                  placeholder="Enter average orders"
                  value={form.avgOrders}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2">
                <label className="block text-sm font-medium mb-2">
                  Store URL
                </label>
                <Input
                  type="text"
                  name="storeUrl"
                  placeholder="Enter Shopify store URL"
                  value={form.storeUrl}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full">
              <Box className="w-2/4 pr-2">
                <label className="block text-sm font-medium mb-2">
                  Shopify Access Token
                </label>
                <Input
                  type="text"
                  name="shopifyAccessToken"
                  placeholder="Enter Shopify access token"
                  value={form.shopifyAccessToken}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2">
                <label className="block text-sm font-medium mb-2">
                  Shopify API Key
                </label>
                <Input
                  type="text"
                  name="shopifyApiKey"
                  placeholder="Enter Shopify API Key"
                  value={form.shopifyApiKey}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full">
              <Box className="w-2/4 pr-2">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="border-0 bg-white shadow"
                />
              </Box>
            </Flex>

            <Box className="flex justify-end">
              <Button
                type="button"
                className="bg-blue-600 text-white w-42 hover:bg-blue-700"
                onClick={HandleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create Store"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
