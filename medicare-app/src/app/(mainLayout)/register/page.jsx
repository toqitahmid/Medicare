"use client";
import React, { useState } from "react";
import {
  Card,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Link,
  Separator,
  Form,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { toast, Zoom } from "react-toastify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
    photo: "",
    gender: "",
    // Doctor Fields
    doctorName: "",
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    profileImage: "",
    availableDays: "",
    availableSlots: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.role === "patient") {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
      if (!formData.gender) newErrors.gender = "Gender is required.";
    } else if (formData.role === "doctor") {
      if (!formData.doctorName)
        newErrors.doctorName = "Doctor name is required.";
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required.";
      if (!formData.qualifications)
        newErrors.qualifications = "Qualifications are required.";
      if (!formData.experience)
        newErrors.experience = "Experience is required.";
      if (!formData.consultationFee)
        newErrors.consultationFee = "Consultation fee is required.";
      if (!formData.hospitalName)
        newErrors.hospitalName = "Hospital name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = typeof e === "string" ? e : (e?.target?.value ?? e);
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.role === "doctor" ? formData.doctorName : formData.name,
        role: formData.role,
        ...(formData.role === "patient"
          ? {
              role: 'patient',
              phone: formData.phone,
              gender: formData.gender,
              photo: formData.photo,
            }
          : {
              role: 'doctor',
              specialization: formData.specialization,
              qualifications: formData.qualifications,
              experience: formData.experience,
              consultationFee: formData.consultationFee,
              hospitalName: formData.hospitalName,
              profileImage: formData.profileImage,
              availableDays: formData.availableDays,
              availableSlots: formData.availableSlots,
            }),
        callbackURL: "/",
      };
      if(payload){
        toast.success("You registered successfully!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
          transition: Zoom,
        });
      }
      console.log("SENDING PAYLOAD:", payload);
      const { error } = await authClient.signUp.email(payload);
      router.push("/");

      if (error) throw new Error(error.message || "Registration failed");

      addToast({
        title: "Registration Complete",
        color: "success",
      });
    } catch (err) {
      const message = err.message || "Registration failed. Please try again.";
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      <Card className="w-full max-w-xl p-6 sm:p-8 shadow-xl rounded-2xl bg-content1 border border-default-200">
        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-sm text-default-500">
            Join us by filling out your details below
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Role Selection */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
              Select Role
            </Label>
            <select
              value={formData.role}
              onChange={handleChange("role")}
              className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email Input */}
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            isInvalid={Boolean(errors.email)}
            isRequired
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
              Email Address
            </Label>
            <Input
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                errors.email
                  ? "border-danger focus:ring-2 focus:ring-danger/20"
                  : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
              }`}
            />
            <FieldError className="text-xs text-danger font-medium mt-0.5">
              {errors.email}
            </FieldError>
          </TextField>

          {/* Password Input */}
          <TextField
            name="password"
            type={isVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            isInvalid={Boolean(errors.password)}
            isRequired
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
              Password
            </Label>
            <div className="relative flex items-center w-full">
              <Input
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                  errors.password
                    ? "border-danger focus:ring-2 focus:ring-danger/20"
                    : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                }`}
              />
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                className="absolute right-3 p-1.5 text-default-400 hover:text-default-600 focus:outline-none focus:text-foreground transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="w-5 h-5 pointer-events-none" />
                ) : (
                  <Eye className="w-5 h-5 pointer-events-none" />
                )}
              </button>
            </div>
            <FieldError className="text-xs text-danger font-medium mt-0.5">
              {errors.password}
            </FieldError>
          </TextField>

          {/* USER SPECIFIC FIELDS */}
          {formData.role === "patient" && (
            <>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange("name")}
                isInvalid={Boolean(errors.name)}
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Full Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                    errors.name
                      ? "border-danger focus:ring-2 focus:ring-danger/20"
                      : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                  }`}
                />
                <FieldError className="text-xs text-danger font-medium mt-0.5">
                  {errors.name}
                </FieldError>
              </TextField>

              <TextField
                name="phone"
                value={formData.phone}
                onChange={handleChange("phone")}
                isInvalid={Boolean(errors.phone)}
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Phone Number
                </Label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                    errors.phone
                      ? "border-danger focus:ring-2 focus:ring-danger/20"
                      : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                  }`}
                />
                <FieldError className="text-xs text-danger font-medium mt-0.5">
                  {errors.phone}
                </FieldError>
              </TextField>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Gender
                </Label>
                <select
                  value={formData.gender}
                  onChange={handleChange("gender")}
                  className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-danger font-medium mt-0.5">
                    {errors.gender}
                  </p>
                )}
              </div>

              <TextField
                name="photo"
                value={formData.photo}
                onChange={handleChange("photo")}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Photo URL
                </Label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground placeholder:text-default-400 text-sm focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                />
              </TextField>
            </>
          )}

          {/* DOCTOR SPECIFIC FIELDS */}
          {formData.role === "doctor" && (
            <>
              <TextField
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange("doctorName")}
                isInvalid={Boolean(errors.doctorName)}
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Doctor Name
                </Label>
                <Input
                  placeholder="Dr. Jane Doe"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                    errors.doctorName
                      ? "border-danger focus:ring-2 focus:ring-danger/20"
                      : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                  }`}
                />
                <FieldError className="text-xs text-danger font-medium mt-0.5">
                  {errors.doctorName}
                </FieldError>
              </TextField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange("specialization")}
                  isInvalid={Boolean(errors.specialization)}
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Specialization
                  </Label>
                  <Input
                    placeholder="e.g. Cardiology"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                      errors.specialization
                        ? "border-danger focus:ring-2 focus:ring-danger/20"
                        : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                    }`}
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5">
                    {errors.specialization}
                  </FieldError>
                </TextField>

                <TextField
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange("qualifications")}
                  isInvalid={Boolean(errors.qualifications)}
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Qualifications
                  </Label>
                  <Input
                    placeholder="MBBS, MD"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                      errors.qualifications
                        ? "border-danger focus:ring-2 focus:ring-danger/20"
                        : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                    }`}
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5">
                    {errors.qualifications}
                  </FieldError>
                </TextField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange("experience")}
                  isInvalid={Boolean(errors.experience)}
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Experience (Years)
                  </Label>
                  <Input
                    placeholder="5"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                      errors.experience
                        ? "border-danger focus:ring-2 focus:ring-danger/20"
                        : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                    }`}
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5">
                    {errors.experience}
                  </FieldError>
                </TextField>

                <TextField
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange("consultationFee")}
                  isInvalid={Boolean(errors.consultationFee)}
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Consultation Fee ($)
                  </Label>
                  <Input
                    placeholder="100"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                      errors.consultationFee
                        ? "border-danger focus:ring-2 focus:ring-danger/20"
                        : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                    }`}
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5">
                    {errors.consultationFee}
                  </FieldError>
                </TextField>
              </div>

              <TextField
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange("hospitalName")}
                isInvalid={Boolean(errors.hospitalName)}
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Hospital Name
                </Label>
                <Input
                  placeholder="City General Hospital"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground placeholder:text-default-400 text-sm transition-all outline-none ${
                    errors.hospitalName
                      ? "border-danger focus:ring-2 focus:ring-danger/20"
                      : "border-default-200 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20"
                  }`}
                />
                <FieldError className="text-xs text-danger font-medium mt-0.5">
                  {errors.hospitalName}
                </FieldError>
              </TextField>

              <TextField
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange("profileImage")}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                  Profile Image URL
                </Label>
                <Input
                  placeholder="https://example.com/doctor.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground placeholder:text-default-400 text-sm focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                />
              </TextField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  name="availableDays"
                  value={formData.availableDays}
                  onChange={handleChange("availableDays")}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Available Days
                  </Label>
                  <Input
                    placeholder="Mon, Wed, Fri"
                    className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground placeholder:text-default-400 text-sm focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                  />
                </TextField>

                <TextField
                  name="availableSlots"
                  value={formData.availableSlots}
                  onChange={handleChange("availableSlots")}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
                    Available Slots
                  </Label>
                  <Input
                    placeholder="09:00 AM - 05:00 PM"
                    className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground placeholder:text-default-400 text-sm focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                  />
                </TextField>
              </div>
            </>
          )}

          {errors.form && (
            <p className="text-sm text-danger text-center font-medium">
              {errors.form}
            </p>
          )}

          <Button
            type="submit"
            isPending={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl shadow-lg transition-all mt-2"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </Form>

        <Separator className="my-6 border-default-100" />

        <p className="text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline text-sm"
          >
            Log In
          </Link>
        </p>
      </Card>
    </div>
  );
}
