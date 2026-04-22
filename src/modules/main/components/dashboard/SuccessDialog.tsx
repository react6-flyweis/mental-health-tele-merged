import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import checkCircleImg from "@/assets/check-circle.png";
import { useLocation, useNavigate } from "react-router";

export default function SuccessDialog({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <div className="flex items-center mb-2 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-0 h-10 w-10 rounded-full bg-[#eef7f6]"
            onClick={() => onOpenChange?.(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative size-40">
            <img src={checkCircleImg} alt="Success" />
          </div>

          <h2 className="text-xl font-bold mb-4">
            Your Appointment Has
            <br />
            Been Confirmed
          </h2>

          <p className="text-sm mb-4">
            Your Appointment Has Been
            <br />
            Successfully Scheduled.
          </p>

          <Button
            size="lg"
            className="w-full bg-gradient-dash"
            onClick={() => {
              if (pathname === "/dashboard/prescriptions") {
                window.location.reload();
                onOpenChange?.(false);
              } else {
                navigate("/dashboard/appointments");
                onOpenChange?.(false);
              }
            }}
          >
            View Your Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
