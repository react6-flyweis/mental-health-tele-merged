import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export interface NewPrescriptionData {
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  specialInstructions?: string;
}

interface NewPrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: NewPrescriptionData) => void;
}

export default function NewPrescriptionDialog({
  open,
  onOpenChange,
  onCreate,
}: NewPrescriptionDialogProps) {
  const [formData, setFormData] = React.useState<NewPrescriptionData>({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    specialInstructions: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    onCreate(formData);
    onOpenChange(false);
    // reset form for next time
    setFormData({
      patient: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      specialInstructions: "",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Create New Prescription</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium">Patient</label>
            <Input
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="mt-1"
              placeholder=""
            />
          </div>
          <div>
            <label className="text-sm font-medium">Medication Name</label>
            <Input
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              className="mt-1"
              placeholder="e.g., Sertraline"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Dosage</label>
              <Input
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., 50mg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Frequency</label>
              <Input
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="mt-1"
                placeholder=""
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Duration</label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1"
              placeholder="e.g., 30 days"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Special Instructions</label>
            <Textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              className="mt-1 h-24"
              placeholder="Any special instructions for the patient..."
            />
          </div>
        </div>

        <DialogFooter className="bg-transparent flex gap-5">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-gradient-dash text-white hover:opacity-95"
            onClick={handleSubmit}
          >
            Create &amp; Send to Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
