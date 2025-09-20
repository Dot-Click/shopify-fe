import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { authClient } from "@/providers/user.provider";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";

interface FormValues {
  newPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      navigate("/admin-signin");
    }
  }, [token, navigate]);

  const onSubmit: SubmitHandler<FormValues> = async ({ newPassword }) => {
    if (!token) return;

    try {
      await authClient.resetPassword({ token, newPassword });
      toast.success("Password has been reset successfully!");
      navigate("/admin-signin");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to reset password. The link may have expired."
      );
      console.error(error);
    }
  };

  if (!token) {
    return (
      <Flex className="min-h-screen items-center justify-center bg-gray-50">
        <Box className="text-center">
          <p className="text-lg text-gray-700">Invalid or expired link.</p>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex className="min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Box className="w-full max-w-md">
        {/* Logo */}
        <Flex className="mb-8 justify-center">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="eComProtect Logo"
              className="h-12 w-auto"
            />
          </Link>
        </Flex>

        {/* Form Card */}
        <Box className="rounded-xl bg-white p-8 shadow-lg">
          <Box className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Set a New Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Choose a strong, new password for your account.
            </p>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Input Field */}
            <Box className="relative">
              <Input
                id="newPassword"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                className="py-6 pl-4 pr-12 text-base"
                {...register("newPassword", {
                  required: "A new password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </Box>

            {/* Error Message */}
            {errors.newPassword && (
              <p className="-mt-3 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 py-6 text-base text-white hover:bg-blue-700"
            >
              {isSubmitting ? <Spinner /> : "Reset Password"}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPasswordPage;
