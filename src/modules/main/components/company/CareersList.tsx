import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Briefcase, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { publicPageApi } from "@/api/publicpage.api";

export default function CareersList({ careers }: any) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyJob = async (jobId: string, payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicPageApi.applyForJob(jobId, payload);
      return res?.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const response = await applyJob(selectedJob?._id, form);

    if (response) {
      setSuccessMessage(
        "Your request has been submitted. Our team will reach out to you shortly.",
      );
      setSubmitted(true);
    }
  };

  return (
    <>
      {(careers ?? []).map((job: any) => (
        <div
          key={job._id}
          onClick={() => {
            setSelectedJob(job);
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "" });
          }}
          className="group block cursor-pointer"
        >
          <Card className="flex flex-row justify-between items-center p-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">
                {job.title}
              </h4>
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> <span>{job.level}</span>
                </div>
              </div>
            </div>
            <div className="size-8 rounded-full flex justify-center items-center bg-gray-100">
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </Card>
        </div>
      ))}

      <Dialog
        open={!!selectedJob}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedJob(null);
            setErrors({});
            setForm({ name: "", email: "", phone: "" });
            setSubmitted(false);
          }
        }}
      >
        <DialogContent className="max-w-150! md:w-150 w-[95%] p-0 overflow-hidden">
          <div>
            <div className="p-6 space-y-4 border-r max-h-[60vh] overflow-auto">
              <h2 className="text-xl font-semibold">{selectedJob?.title}</h2>

              <p className="text-sm text-gray-500">
                {selectedJob?.location} • {selectedJob?.type} •{" "}
                {selectedJob?.level}
              </p>

              <p className="text-sm text-gray-700">
                {selectedJob?.description}
              </p>

              {selectedJob?.salaryRange && (
                <div className="text-sm font-medium text-green-600">
                  Salary: {selectedJob?.salaryRange}
                </div>
              )}

              {selectedJob?.requirements?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    {selectedJob?.requirements.map(
                      (item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {selectedJob?.niceToHave?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Nice to Have</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    {selectedJob?.niceToHave.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center space-y-2 h-full flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold text-green-600">
                    Successfully submitted 🎉
                  </h3>
                  <p className="text-sm text-gray-600">{successMessage}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      placeholder="Name *"
                      className="px-4 py-3 outline-none h-12!"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Email *"
                      className="px-4 py-3 outline-none h-12!"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Phone *"
                      className="px-4 py-3 outline-none h-12!"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-gradient-primary h-10 px-8 col-span-2"
                  >
                    {loading ? "Submitting..." : "Apply Now"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
