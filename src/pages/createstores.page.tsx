import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import toast from "react-hot-toast";
import { authClient } from "@/providers/user.provider";
import { Spinner } from "@/components/ui/spinner";
import { Flex } from "@/components/ui/flex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    if (!form.storeUrl.includes(".myshopify.com")) {
      toast.error(
        "Invalid Shopify store URL. It must contain '.myshopify.com'"
      );
      return;
    }

    if (form.companyRegNo.length < 8) {
      toast.error(
        "Company registration number must be at least 6 characters long"
      );
      return;
    }

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
          <CardTitle className="text-2xl font-bold text-web-dark-grey">
            Create Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Flex className="w-full max-sm:flex-col max-sm:space-y-2">
              <Box className="w-2/4 pr-2 max-sm:w-full">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2 max-sm:w-full max-sm:pl-0">
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full max-sm:flex-col max-sm:space-y-2">
              <Box className="w-2/4 pr-2 max-sm:w-full">
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2 max-sm:w-full max-sm:pl-0">
                <label className="block text-sm font-medium mb-2">
                  Company Registration Number
                </label>
                <Input
                  type="text"
                  name="companyRegNo"
                  placeholder="Enter registration number"
                  value={form.companyRegNo}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full max-sm:flex-col max-sm:space-y-2">
              <Box className="w-2/4 pr-2 max-sm:w-full">
                <label className="block text-sm font-medium mb-2">
                  Average Orders Per Month
                </label>
                <Select
                  onValueChange={(value) =>
                    setForm({ ...form, avgOrders: value })
                  }
                  value={form.avgOrders}
                >
                  <SelectTrigger className="border-gray-200 w-full bg-[#f1f1f1] py-5">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f1f1f1] border-0 shadow-lg">
                    <SelectItem value="0-300">0 - 300</SelectItem>
                    <SelectItem value="301-2000">301 - 2,000</SelectItem>
                    <SelectItem value="2001-5000">2,001 - 5,000</SelectItem>
                    <SelectItem value="5000+">5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </Box>
              <Box className="w-2/4 pl-2 max-sm:w-full max-sm:pl-0">
                <label className="block text-sm font-medium mb-2">
                  Store URL
                </label>
                <Input
                  type="text"
                  name="storeUrl"
                  placeholder="Enter Shopify store URL"
                  value={form.storeUrl}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full max-sm:flex-col max-sm:space-y-2">
              <Box className="w-2/4 pr-2 max-sm:w-full">
                <label className="block text-sm font-medium mb-2">
                  Shopify Access Token
                </label>
                <Input
                  type="text"
                  name="shopifyAccessToken"
                  placeholder="Enter Shopify access token"
                  value={form.shopifyAccessToken}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2 max-sm:w-full max-sm:pl-0">
                <label className="block text-sm font-medium mb-2">
                  Shopify API Key
                </label>
                <Input
                  type="text"
                  name="shopifyApiKey"
                  placeholder="Enter Shopify API Key"
                  value={form.shopifyApiKey}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
            </Flex>

            <Flex className="w-full max-sm:flex-col max-sm:space-y-2">
              <Box className="w-2/4 pr-2 max-sm:w-full">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
                />
              </Box>
              <Box className="w-2/4 pl-2 max-sm:w-full max-sm:pl-0">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="border-0 bg-[#f1f1f1] shadow"
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
