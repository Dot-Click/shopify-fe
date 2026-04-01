import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Box } from "@/components/ui/box";
import toast from "react-hot-toast";
import { authClient } from "@/providers/user.provider";
import { Eye, EyeOff, RefreshCw, UserPlus, Wand2, ShieldCheck, User } from "lucide-react";

export default function CreateStaff() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "support",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < 12; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setForm({ ...form, password: retVal });
    setShowPassword(true);
    toast.success("Random password generated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await authClient.admin.createUser(
        {
          name: form.name,
          email: form.email,
          password: form.password,
          data: {
            role: form.role,
            phone: form.phone,
            shopify_url: session?.user?.shopify_url,
            average_orders_per_month: session?.user?.average_orders_per_month,
            shopify_api_key: session?.user?.shopify_api_key,
            shopify_access_token: session?.user?.shopify_access_token,
            package: session?.user?.package,
            plan: session?.user?.plan,
            company_name: session?.user?.company_name,
            company_registration_number: session?.user?.company_registration_number,
          },
        },
        {
          onSuccess: async () => {
            toast.success("Staff member created successfully");
            await authClient.emailOtp.sendVerificationOtp({
              email: form.email,
              type: "email-verification",
            });
            setForm({ name: "", email: "", password: "", phone: "", role: "support" });
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setLoading(false);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Box className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
      {/* Consistent Header Style */}
      <header className="flex flex-wrap items-center justify-between gap-4 py-6 px-8 border-b border-slate-100">
        <Box className="flex items-center gap-3">
          <Box className="p-2 bg-blue-50 rounded-lg">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </Box>
          <Box>
            <h1 className="text-2xl font-semibold text-slate-800">
                Create New Staff
            </h1>
            <p className="text-sm text-slate-500">
                Fill in the details below to add a new team member to your store.
            </p>
          </Box>
        </Box>
      </header>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="h-4 w-4" /> Personnel Information
                </h3>
                
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Full Name
                    </label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className="h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg transition-all"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="john.doe@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg transition-all"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Phone Number
                    </label>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="+44 7700 900000"
                        value={form.phone}
                        onChange={handleChange}
                        className="h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg transition-all"
                    />
                </div>
            </div>

            {/* Right Column: Security & Role */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Access & Security
                </h3>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                        Account Password
                        <button
                            type="button"
                            onClick={generatePassword}
                            className="text-[10px] uppercase font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors bg-blue-50 px-2 py-0.5 rounded"
                        >
                            <Wand2 className="h-3 w-3" />
                            Generate Secure
                        </button>
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Min. 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            className="h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg pr-12 transition-all font-mono"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-slate-400 hover:text-blue-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Assigned Role
                    </label>
                    <Select
                        value={form.role}
                        onValueChange={(value) => setForm({ ...form, role: value })}
                    >
                        <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 rounded-lg transition-all shadow-none">
                            <SelectValue placeholder="Select staff role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 shadow-xl rounded-lg">
                            <SelectItem value="manager" className="cursor-pointer">Manager</SelectItem>
                            <SelectItem value="support" className="cursor-pointer">Support</SelectItem>
                            <SelectItem value="subadmin" className="cursor-pointer">Sub-Admin</SelectItem>
                            <SelectItem value="marketing" className="cursor-pointer">Marketing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </div>

          <Box className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between gap-4">
            <Box className="flex items-center gap-2 text-slate-400 text-xs italic">
                <RefreshCw className="h-3 w-3" />
                Staff member must verify their email before logging in.
            </Box>
            <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-8 rounded-lg font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
                disabled={loading}
            >
              {loading ? (
                <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> 
                    Creating Account...
                </>
              ) : (
                <>
                    <UserPlus className="h-4 w-4" /> 
                    Confirm & Create Staff
                </>
              )}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Box>
  );
}
