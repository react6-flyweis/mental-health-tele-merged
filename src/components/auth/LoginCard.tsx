import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

type Props = {
  role: "Patient" | "Provider"
  onSubmitPath?: string
}

export default function LoginCard({
  role,
  onSubmitPath = "/dashboard",
}: Props) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(onSubmitPath)
  }

  return (
    <div className="w-full max-w-[448px] mx-auto">
      <button
        onClick={() => navigate(-1)}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-[14px] placeholder:text-[#0A0A0A80] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-12 px-4 pr-12 rounded-[14px] placeholder:text-[#0A0A0A80] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="w-4 h-4 accent-teal-600"
            />
            <span className="text-sm text-gray-600">
              Remember me
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-[48px] rounded-[14px] text-white font-semibold text-lg bg-[linear-gradient(256.76deg,#219580_18.35%,#346079_55.12%)] shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-8 text-[#4A5565] text-sm">
          Don't have an account?{" "}
          <span className="text-[#219580] cursor-pointer font-medium">
            Sign up
          </span>
        </p>
      </div>

      <p className="text-center mt-4 text-sm text-[#6A7282]">
        🔒 Your information is secure and encrypted
      </p>
    </div>
  )
}