import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Checkbox } from "../../components/ui/checkbox"; // Import the Checkbox component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import fbIcon from "/images/fb_icon.png";

// 1. Define your updated form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // 2. Define your form using the updated schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  // 3. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Form Submitted! Check the console for the data.");
  }

  return (
    <div className="flex h-full flex-col justify-center">
      {/* Removed padding from here to be controlled by the parent page */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup" // Link to the signup page
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter you email address"
                        {...field}
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwords</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="py-6 pr-10"
                          {...field}
                          rightIcon={
                            <Button
                              type="button"
                              tabIndex={-1}
                              variant="ghost"
                              className="mr-1.5 text-gray-400 hover:bg-transparent"
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </Button>
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password Section */}
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormLabel>Remember me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Forget password?
                </Link>
              </div>

              <Button
                className="w-full bg-blue-600 py-6 text-base hover:bg-blue-700"
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500">Or sign in with</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-[#2C2C2D] text-[#fff] py-5 rounded-lg"
            >
              <FcGoogle className="mr-2 h-6 w-6" />
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#2C2C2D] text-[#fff] py-5 rounded-lg"
            >
              <img src={fbIcon} className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
