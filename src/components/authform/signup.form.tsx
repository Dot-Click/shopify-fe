import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Box } from "../ui/box";
import { authClient } from "../../lib/auth";

// Form Schema
const formSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    surname: z.string().min(2, "Surname must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    mobileNumber: z.string(),
    companyName: z.string().min(2, "Company name is required."),
    companyRegistrationNumber: z
      .string()
      .min(1, "Registration number is required."),
    averageOrdersPerMonth: z.string().min(1, "Please select an option."),
    storeUrl: z.string().url("Please enter a valid store URL."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    shopifyApiKey: z.string().min(1, "Please enter a valid API key."),
    shopifyApiSecret: z.string().min(1, "Please enter a valid API secret."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      /* your defaults */
    },
  });

  async function onSubmit(values: FormData) {
    try {
      const { data, error } = await authClient.signUp.email({
        name: `${values.firstName} ${values.surname}`,
        email: values.email,
        password: values.password,
        // role: "store_admin",
        mobileNumber: values.mobileNumber,
        companyName: values.companyName,
        companyRegistrationNumber: values.companyRegistrationNumber,
        averageOrdersPerMonth: values.averageOrdersPerMonth,
        storeUrl: values.storeUrl,
        shopifyApiKey: values.shopifyApiKey,
        shopifyApiSecret: values.shopifyApiSecret,
      });

      console.log(data);

      if (error) {
        console.error("Signup error:", error);
        return;
      }

      const nextStep =
        values.averageOrdersPerMonth === "5000+"
          ? "enterpriseReview"
          : "packageSelection";

      navigate("/post-signup", {
        state: {
          flowStep: nextStep,
          formData: values,
        },
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  // The full JSX for the form component
  return (
    <Box className="flex h-full flex-col mx-auto w-full max-w-xl justify-center">
      <Box className="w-full space-y-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">
            Create a Customer Admin Account
          </h1>
          <p className="text-gray-500 text-xs">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Box>

      <Box className="w-full space-y-6 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* --- Personal Details Section --- */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Phone Number (for MFA)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+447123456789"
                        type="text"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            {/* --- Company Information Section --- */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Company Ltd"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyRegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345678"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                // className="w-full"

                name="averageOrdersPerMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Orders Per Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // className="w-full"
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="border-gray-200 bg-gray-50 py-5">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="0-300">0 - 300</SelectItem>
                        <SelectItem value="301-2,000">301 - 2,000</SelectItem>
                        <SelectItem value="2,001-5,000">
                          2,001 - 5,000
                        </SelectItem>
                        <SelectItem value="5000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.yourstore.com"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shopifyApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shopify API Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="api key"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shopifyApiSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="api secret key"
                        {...field}
                        className="border-gray-200 bg-gray-50 py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            {/* --- Password Section --- */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="border-gray-200 bg-gray-50 py-5 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                          className="border-gray-200 bg-gray-50 py-5 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl mt-4"
              type="submit"
            >
              Apply for an Account
            </Button>
          </form>
        </Form>
      </Box>
    </Box>
  );
};
