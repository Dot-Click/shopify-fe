import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import logoIcon from "/icons/logo_icon.png";
import { Stack } from "@/components/ui/stack";
import { authClient } from "@/providers/user.provider"; // Assuming your authClient exports a User type

// A small component for displaying feedback messages
const FormMessage = ({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) => {
  if (!message) return null;
  const colors =
    type === "error" ? "text-red-600 bg-red-50" : "text-green-700 bg-green-50";
  return (
    <div className={`p-3 rounded-md text-sm font-medium ${colors}`}>
      {message}
    </div>
  );
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;

  image?: string | null;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: string | null;
  company_name?: string | null;
  mobile_number?: string | null;
  company_registration_number?: string | null;
  average_orders_per_month?: string | null;
  plan?: string | null;
  package?: string | null;
  shopify_api_key?: string | null;
  shopify_access_token?: string | null;
  shopify_url?: string | null;

  phoneNumber?: string | null;
  phoneNumberVerified?: boolean | null;
};

export const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  // State for password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for UI feedback (loading, errors, etc.)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    if (user) {
      const [firstName, ...lastNameParts] = user.name.split(" ");
      setFormData({
        firstName: firstName || "",
        lastName: lastNameParts.join(" ") || "",
      });
    }
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (passwordData.newPassword && passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const updatePayload: {
        name: string;
        currentPassword?: string;
        password?: string;
      } = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      // Only include password fields if the user has entered a new password
      if (passwordData.newPassword) {
        updatePayload.currentPassword = passwordData.currentPassword;
        updatePayload.password = passwordData.newPassword;
      }

      await authClient.updateUser(updatePayload);

      setSuccess("Your settings have been saved successfully!");
      // Reset password fields for security after a successful update
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="bg-white rounded-2xl">
      {/* The form now wraps the entire settings area */}
      <form onSubmit={handleSubmit}>
        <Box className="mx-auto">
          <header className="flex justify-between items-center mb-8 px-5 pt-10">
            <h1 className="text-2xl font-bold text-web-dark-grey">Setting</h1>
            <Button
              type="submit"
              className="bg-blue-600 text-white py-5 px-6 rounded-lg hover:bg-blue-700 min-w-[150px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </header>

          {/* Display Success/Error messages at the top */}
          <Box className="px-5 mb-4">
            <FormMessage type="success" message={success!} />
            <FormMessage type="error" message={error!} />
          </Box>

          <Card className="border-none shadow-none w-full md:w-[80%]">
            <CardContent className="p-0">
              <div className="space-y-6 px-5">
                {/* --- AVATAR SECTION --- */}
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

                {/* --- USER INFO SECTION --- */}
                <Box className="space-y-6 pt-2">
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Box className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleNameChange}
                        className="py-5 rounded-lg border-gray-200 bg-gray-50"
                      />
                    </Box>
                    <Box className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleNameChange}
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
                        value={user?.email || "Loading..."}
                        disabled
                        className="py-5 rounded-lg border-gray-200 bg-gray-100 pr-10"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </Box>
                  </Box>
                </Box>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* --- PASSWORD & SECURITY SECTION --- */}
          <Card className="border-none shadow-none px-5 w-full md:w-[80%]">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                Password & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <Box className="bg-gray-50 p-4 w-full lg:w-3/5 rounded-lg border border-gray-200">
                <p className="text-sm">
                  Your password must be at least 6 characters and should include
                  a combination of numbers, letters and special characters
                  (!$@%).
                </p>
              </Box>
              <Box className="space-y-4">
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
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
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
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
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
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
        </Box>
      </form>
    </Box>
  );
};
