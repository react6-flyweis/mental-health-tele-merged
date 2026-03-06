import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePageTitle } from "@/store/pageTitleStore";
import { Save, Upload } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(1, "Phone is required"),
  specialty: z.string().trim().min(1, "Specialty is required"),
  licenseNumber: z.string().trim().min(1, "License number is required"),
  yearsOfExperience: z
    .string()
    .trim()
    .min(1, "Years of experience is required")
    .regex(/^\d+$/, "Years of experience must be a number"),
  professionalBio: z.string(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const INITIAL_FORM: ProfileForm = {
  firstName: "Sarah",
  lastName: "Mitchell",
  email: "sarah.mitchell@mindhealth.com",
  phone: "(555) 987-6543",
  specialty: "Clinical Psychology",
  licenseNumber: "PSY-12345-CA",
  yearsOfExperience: "12",
  professionalBio: "",
};

export default function ProfilePage() {
  usePageTitle("Profile");

  const [licenseFiles, setLicenseFiles] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: INITIAL_FORM,
  });

  function onSubmit(data: ProfileForm) {
    void data;
    // Submit integration can be added once backend endpoint is available.
  }

  function handleLicenseUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setLicenseFiles(files.map((file) => file.name));
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="py-0">
        <CardHeader className="border-b py-5">
          <CardTitle className="text-base font-semibold text-slate-800">
            Professional Profile
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Manage your professional information
          </CardDescription>
        </CardHeader>

        <CardContent className="py-5">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-700">
                Profile Photo
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Avatar className="size-14 border border-slate-200 bg-slate-100">
                  <AvatarFallback className="font-medium text-slate-600">
                    SM
                  </AvatarFallback>
                </Avatar>

                <Button
                  type="button"
                  variant="outline"
                  className="h-9 gap-2 border-slate-200 text-slate-700"
                >
                  <Upload className="size-4" />
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  First Name
                </FieldLabel>
                <FieldContent>
                  <Input
                    className="h-10"
                    aria-invalid={!!errors.firstName}
                    {...register("firstName")}
                  />
                </FieldContent>
                <FieldError
                  errors={errors.firstName ? [errors.firstName] : []}
                />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  Last Name
                </FieldLabel>
                <FieldContent>
                  <Input
                    className="h-10"
                    aria-invalid={!!errors.lastName}
                    {...register("lastName")}
                  />
                </FieldContent>
                <FieldError errors={errors.lastName ? [errors.lastName] : []} />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  Email
                </FieldLabel>
                <FieldContent>
                  <Input
                    type="email"
                    className="h-10"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                </FieldContent>
                <FieldError errors={errors.email ? [errors.email] : []} />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  Phone
                </FieldLabel>
                <FieldContent>
                  <Input
                    className="h-10"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                </FieldContent>
                <FieldError errors={errors.phone ? [errors.phone] : []} />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  Professional Information
                </FieldLabel>
                <FieldContent>
                  <Input
                    className="h-10"
                    aria-invalid={!!errors.specialty}
                    {...register("specialty")}
                  />
                </FieldContent>
                <FieldError
                  errors={errors.specialty ? [errors.specialty] : []}
                />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-medium text-slate-700">
                  License Number
                </FieldLabel>
                <FieldContent>
                  <Input
                    className="h-10"
                    aria-invalid={!!errors.licenseNumber}
                    {...register("licenseNumber")}
                  />
                </FieldContent>
                <FieldError
                  errors={errors.licenseNumber ? [errors.licenseNumber] : []}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel className="text-xs font-medium text-slate-700">
                Years of Experience
              </FieldLabel>
              <FieldContent>
                <Input
                  className="h-10"
                  aria-invalid={!!errors.yearsOfExperience}
                  {...register("yearsOfExperience")}
                />
              </FieldContent>
              <FieldError
                errors={
                  errors.yearsOfExperience ? [errors.yearsOfExperience] : []
                }
              />
            </Field>

            <Field>
              <FieldLabel className="text-xs font-medium text-slate-700">
                Professional Bio
              </FieldLabel>
              <FieldContent>
                <Textarea
                  className="min-h-28 resize-none"
                  aria-invalid={!!errors.professionalBio}
                  {...register("professionalBio")}
                />
              </FieldContent>
              <FieldError
                errors={errors.professionalBio ? [errors.professionalBio] : []}
              />
            </Field>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-700">
                License Documents
              </p>

              <label
                htmlFor="license-documents"
                className="block cursor-pointer"
              >
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 px-4 py-8 text-center transition-colors hover:border-emerald-400/70">
                  <Upload className="mx-auto size-5 text-slate-500" />
                  <p className="mt-2 text-xs text-slate-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    PDF, JPG or PNG (max. 5MB)
                  </p>
                </div>
              </label>

              <input
                id="license-documents"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                multiple
                className="sr-only"
                onChange={handleLicenseUpload}
              />

              {licenseFiles.length > 0 && (
                <p className="text-xs text-slate-600">
                  Selected: {licenseFiles.join(", ")}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button type="submit" className="h-9 gap-2 bg-gradient-dash px-4">
                <Save className="size-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
