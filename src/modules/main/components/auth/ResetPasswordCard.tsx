import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { authApi } from "@/api/auth.api";
import { useSearchParams } from "react-router";

type Props = {
  role: "Patient" | "Provider";
  loginPath?: string;
};

export default function ResetPasswordCard({
  role,
  loginPath = "/login",
}: Props) {
  const router = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!otp) return "OTP is required";
    if (!newPassword) return "Password is required";
    if (newPassword.length < 8) return "Minimum 8 characters required";
    if (!/[A-Z]/.test(newPassword)) return "Add at least one uppercase letter";
    if (!/[0-9]/.test(newPassword)) return "Add at least one number";
    if (!confirmPassword) return "Confirm your password";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
const email = searchParams.get("email") || "";
      await authApi.resetPassword({
        otp,
        email,
        newPassword
      });

      setSuccess("Password reset successfully");
      setTimeout(() => router(loginPath), 1500);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[448px] mx-auto">
      <button
        onClick={() => router(loginPath)}
        className="flex items-center gap-2 text-[#4A5565] mb-5"
      >
        <ArrowLeft size={18} />
        Back to login
      </button>

      <div className="bg-white rounded-[16px] p-6 pb-3 shadow-[0px_3.9px_5.86px_-3.9px_#0000001A,0px_9.76px_14.64px_-2.93px_#0000001A]">
        <h2 className="text-[30px] font-bold text-center text-[#1E2939] mb-2">
          Reset Password
        </h2>

        <p className="text-center text-[16px] text-[#4A5565] mb-8">
          Enter your details to reset password
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-5">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-5">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full h-12 px-4 rounded-[14px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-[14px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-[14px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 h-[48px] rounded-[14px] text-white font-semibold text-lg bg-[linear-gradient(256.76deg,#219580_18.35%,#346079_55.12%)] shadow-lg disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>

      <p className="text-center mt-4 text-sm text-[#6A7282]">
        🔒 Your information is secure and encrypted
      </p>
    </div>
  );
}