import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { Label } from "../../components/ui/label"; // Keep Label for consistency if needed outside form
import { Separator } from "../ui/separator";
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
import { Link } from "react-router-dom";
import { useState } from "react";

// 1. Define your form schema with Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // 2. Define your form using useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 3. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Form Submitted! Check the console for the data.");
  }

  return (
    <div className="flex h-full flex-col justify-center p-10">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Create an account</h1>
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
        </div>

        <div className="w-full max-w-md space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter user name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter you email address" {...field} />
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
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm">Or Sign Up</span>
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
              className="w-full bg-[#2C2C2D] text-[#fff] py-5 rounded-lg "
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
