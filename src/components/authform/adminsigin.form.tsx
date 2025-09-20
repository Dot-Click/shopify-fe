import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Flex } from "../ui/flex";
import { Box } from "../ui/box";
import { authClient } from "@/providers/user.provider";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export const AdminSigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const navigate = useNavigate();
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      },
      {
        onRequest: () => {
          setAuthChecked(true);
        },
        onSuccess: () => {
          toast.success("Signed in successfully!");
          navigate("/admin/dashboard");
          setAuthChecked(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setAuthChecked(false);
        },
      }
    );
  };

  return (
    <Flex className=" h-full flex-col justify-center">
      {/* Removed padding from here to be controlled by the parent page */}
      <Flex className="flex-col items-center justify-center space-y-6">
        <Box className="w-full space-y-4">
          <Box className="space-y-1">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p>Enter your credential to access your account!</p>
          </Box>
        </Box>

        <Box className="w-full space-y-6">
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
                        className="border-0 py-6 rounded-xl"
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
                      <Box className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          // className="py-6 pr-10"
                          className="border-0 py-6 rounded-xl"
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
                      </Box>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password Section */}
              <Flex className="items-center justify-between">
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
                      <Box className="leading-none">
                        <FormLabel>Remember me</FormLabel>
                      </Box>
                    </FormItem>
                  )}
                />
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Forget password?
                </Link>
              </Flex>
              <Flex className="items-center justify-between"></Flex>
              <Button
                className="w-full bg-blue-600 py-6 text-base hover:bg-blue-700 text-white"
                type="submit"
                // disabled={!authChecked}
              >
                {authChecked ? <Spinner /> : "Sign In"}
              </Button>
            </form>
          </Form>
        </Box>
      </Flex>
    </Flex>
  );
};
