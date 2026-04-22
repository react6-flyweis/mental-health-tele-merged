import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { authApi } from "@/api/auth.api";
import { providerApi } from "@/api/provider.api";
import { useAuth } from "@/modules/main/context/auth.context";

type Props = {
  role: "Patient" | "Provider";
  onSubmitPath?: string;
  signUpPath?: string | null;
};

export default function LoginCard({
  role,
  onSubmitPath = "/dashboard",
  signUpPath,
}: Props) {
  const router = useNavigate();
  const { getProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; api?: string }>({});
  const [loading, setLoading] = useState(false);

  const resolvedSignUpPath =
    signUpPath !== undefined
      ? signUpPath
      : role === "Patient"
        ? "/patient-register"
        : "/provider-register";

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      if (role === "Patient") {
        const response = await authApi.patientLogin({ email, password,rememberMe:remember });
        localStorage.setItem("role", "patient");
      } else {
        await providerApi.login({ email, password });
        localStorage.setItem("role", "provider");
      }

      await getProfile();
      router(onSubmitPath);
    } catch (err: any) {
      setErrors({ api: err?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[448px] mx-auto">
      <button
        onClick={() => router("/login")}
        className="flex items-center gap-2 text-[#4A5565] mb-5"
      >
        <ArrowLeft size={18} />
        Back to role selection
      </button>

      <div className="bg-white rounded-[16px] p-6 pb-3 shadow-[0px_3.9px_5.86px_-3.9px_#0000001A,0px_9.76px_14.64px_-2.93px_#0000001A]">
        <h2 className="text-[30px] font-bold text-center text-[#1E2939] mb-2">
          Login as {role}
        </h2>

        <p className="text-center text-[16px] text-[#4A5565] mb-8">
          Welcome back! Please enter your details
        </p>

        {errors.api && (
          <p className="text-red-500 text-sm text-start mb-5">{errors.api}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-[14px] placeholder:text-[#0A0A0A80] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 px-4 pr-12 rounded-[14px] placeholder:text-[#0A0A0A80] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 accent-teal-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <span
              className="text-sm text-gray-600 cursor-pointer"
              onClick={() =>
                router(`/forgot-password?role=${role}`)
              }
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] rounded-[14px] text-white font-semibold text-lg bg-[linear-gradient(256.76deg,#219580_18.35%,#346079_55.12%)] shadow-lg disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {resolvedSignUpPath ? (
          <p className="text-center mt-8 text-[#4A5565] text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={resolvedSignUpPath}
              className="text-[#219580] cursor-pointer font-medium"
            >
              Sign up
            </Link>
          </p>
        ) : null}
      </div>

      <p className="text-center mt-4 text-sm text-[#6A7282]">
        🔒 Your information is secure and encrypted
      </p>
    </div>
  );
}