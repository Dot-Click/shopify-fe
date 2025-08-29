import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"; // Import Card components
import { Library, Lock, Eye, EyeOff } from "lucide-react"; // Import new icons
import logoIcon from "/icons/logo_icon.png";
import { Stack } from "../components/ui/stack";

export const Settings = () => {
  // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box className="bg-white rounded-2xl">
      <Box className=" mx-auto">
        <header className="flex justify-between items-center mb-8 px-5 pt-10">
          <h1 className="text-2xl font-bold text-web-dark-grey">Setting</h1>
          <Button className="bg-blue-600 text-white py-5 px-6 rounded-lg hover:bg-blue-700">
            Save Changes
          </Button>
        </header>

        <Card className="border-none shadow-none w-[80%]">
          <CardContent className="p-0">
            <form className="space-y-6 px-5">
              <Box className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6">
                <Avatar className="h-22 w-22 bg-blue-600">
                  <AvatarImage
                    src={logoIcon}
                    className="p-4"
                    alt="Company Logo"
                  />
                  <AvatarFallback>
                    <Library className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <Stack>
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-md text-sm font-medium flex items-center"
                  >
                    Choose File
                  </Label>
                  <input id="file-upload" type="file" className="hidden" />
                  <Button
                    variant="outline"
                    type="button"
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
              <Separator />
              <Box className="space-y-6 pt-2">
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Box className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="Enter first name"
                      className="py-5 rounded-lg border-gray-200 bg-gray-50"
                    />
                  </Box>
                  <Box className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Enter last name"
                      className="py-5 rounded-lg border-gray-200 bg-gray-50"
                    />
                  </Box>
                </Box>
                <Box className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Box className="relative">
                    <Input
                      id="email"
                      type="email"
                      value="admin@gmail.com"
                      disabled
                      className="py-5 rounded-lg border-gray-200 bg-gray-100 pr-10"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </Box>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Separator className="my-2 text-web-dark-grey" />

        {/* --- PASSWORD & SECURITY SECTION --- */}
        <Card className="border-none shadow-none px-5 w-[80%]">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-gray-800">
              Password & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <Box className="bg-gray-50 p-4 w-3/5 rounded-lg border border-gray-200">
              <p className="text-sm">
                Your password must be at least 6 characters and should include a
                combination of numbers, letters and special characters (!$@%).
              </p>
            </Box>
            <Box className="space-y-4">
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current password"
                  className="py-5 rounded-lg border-gray-200 bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="py-5 rounded-lg border-gray-200 bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="py-5 rounded-lg border-gray-200 bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </Box>
          </CardContent>
        </Card>

        <Separator className="my-2" />

        {/* --- NOTIFICATIONS SECTION --- */}
        <Card className="border-none shadow-none px-5 w-[80%]">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-web-dark-grey">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-web-dark-grey opacity-70">
                  New Refund Claim Detected
                </h3>
                <p className="text-sm text-web-dark-grey">
                  Receive notifications when a customer files a new
                  refund-related claim.
                </p>
              </div>
              <Switch id="refund-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-web-dark-grey opacity-70">
                  High-Risk Customer Flagged
                </h3>
                <p className="text-sm text-web-dark-grey">
                  Get alerted when a new or repeat offender is marked high-risk.
                </p>
              </div>
              <Switch id="risk-notifications" defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-web-dark-grey opacity-70">
                  Unusual Risk Activity Spike
                </h3>
                <p className="text-sm text-web-dark-grey">
                  Get notified if there's a spike in risk cases across multiple
                  retailers.
                </p>
              </div>
              <Switch id="risk-notifications" />
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
