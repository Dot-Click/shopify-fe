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

// Form Schema
const formSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    surname: z.string().min(2, "Surname must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    mobilePhoneNumber: z.string(),
    companyName: z.string().min(2, "Company name is required."),
    companyRegistrationNumber: z
      .string()
      .min(1, "Registration number is required."),
    averageOrdersPerMonth: z.string().min(1, "Please select an option."),
    storeUrl: z.string().url("Please enter a valid store URL."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
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

  function onSubmit(values: FormData) {
    console.log("Account application submitted:", values);

    // Determine the next step based on order volume
    const nextStep =
      values.averageOrdersPerMonth === "5000+"
        ? "enterpriseReview"
        : "packageSelection";

    // Navigate to the post-signup page, passing data via router state
    navigate("/post-signup", {
      state: {
        flowStep: nextStep,
        formData: values,
      },
    });
  }

  // The full JSX for the form component
  return (
    <Box className="flex h-full flex-col mx-auto w-full max-w-xl justify-center py-12">
      <Box className="w-full space-y-4">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">
            Create a Customer Admin Account
          </h1>
          <p className="text-gray-500">
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

      <Box className="w-full space-y-6 mt-10">
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
              name="mobilePhoneNumber"
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
                name="averageOrdersPerMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Orders Per Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
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
