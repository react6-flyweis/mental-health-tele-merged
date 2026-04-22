import RoleCard from "../components/auth/RoleCard";

export default function SignupRolePage() {
  return (
    <div className="">
      <div className="text-center my-10">
        <h2 className="text-4xl font-bold text-[#1E2939]">Login as</h2>
        <p className="text-[#4A5565] text-lg">Select your role to continue</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center w-full">
        <RoleCard role="patient" path="/patient-login" />
        <RoleCard role="provider" path="/provider/login" />
      </div>
    </div>
  );
}
