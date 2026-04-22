import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { authApi } from "@/api/auth.api";

type Props = {
  role: "Patient" | "Provider";
  loginPath?: string;
};

export default function ForgotPasswordCard({
  role,
  loginPath = "/patient-login",
}: Props) {
  const router = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email";
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

      await authApi.forgotPassword({ email });

      setSuccess("OTP sent to your email");
      router(`/reset-password?email=${encodeURIComponent(email)}`);
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
          Forgot Password
        </h2>

        <p className="text-center text-[16px] text-[#4A5565] mb-8">
          Enter your email to receive reset link
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
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-[14px] placeholder:text-[#0A0A0A80] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 h-[48px] rounded-[14px] text-white font-semibold text-lg bg-[linear-gradient(256.76deg,#219580_18.35%,#346079_55.12%)] shadow-lg disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
       <p className="text-center mt-4 text-sm text-[#6A7282]">
        🔒 Your information is secure and encrypted
      </p>
    </div>
  );
}