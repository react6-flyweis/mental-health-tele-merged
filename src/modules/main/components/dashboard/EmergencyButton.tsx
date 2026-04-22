"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EmergencyButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:911";
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleClick}
        className="mt-3 w-full bg-red-600 text-white hover:bg-red-600/90"
      >
        Emergency Resources
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Emergency Help
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-slate-600">
            Please call{" "}
            <span className="font-semibold">988 (Suicide & Crisis Lifeline)</span>{" "}
            or{" "}
            <span className="font-semibold">911</span>{" "}
            immediately using your phone.
          </p>

          <DialogFooter className="">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}