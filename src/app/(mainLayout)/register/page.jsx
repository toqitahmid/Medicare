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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/(?=.*[0-9])/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    }

    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setName(val);
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleEmailChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setEmail(val);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setPassword(val);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleRoleChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setRole(val);
  };

  const handlePhoneChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handleGenderChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setGender(val);
    if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
  };

  const handlePhotoChange = (e) => {
    const val = typeof e === "string" ? e : (e?.target?.value ?? e);
    setPhoto(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);

    try {
      const payload = {
        email: email,
        password: password,
        name: name,
        role: role,
        phone: phone,
        gender: gender,
        photo: photo,
        status: "pending",
        callbackURL: "/",
      };

      const { error } = await authClient.signUp.email(payload);
      
      if (error) throw new Error(error.message || "Registration failed");

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

      router.push("/");

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
              value={role}
              onChange={handleRoleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-default-200 bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Name Input */}
          <TextField
            name="name"
            value={name}
            onChange={handleNameChange}
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

          {/* Email Input */}
          <TextField
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
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
            value={password}
            onChange={handlePasswordChange}
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

          {/* Phone Input */}
          <TextField
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
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

          {/* Gender Selection */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-default-600">
              Gender
            </Label>
            <select
              value={gender}
              onChange={handleGenderChange}
              className={`w-full px-4 py-2.5 rounded-xl border bg-default-100 text-foreground text-sm outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all ${
                errors.gender ? "border-danger" : "border-default-200"
              }`}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-danger font-medium mt-0.5">{errors.gender}</p>
            )}
          </div>

          {/* Photo URL Input */}
          <TextField
            name="photo"
            value={photo}
            onChange={handlePhotoChange}
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
