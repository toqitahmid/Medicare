"use client";

import React, { useState } from "react";
import {
  Card,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Checkbox,
  Link,
  Separator,
  Form,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
// import { authClient } from "@/lib/auth-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
      });

      if (error) throw new Error(error.message || "Authentication failed");
    } catch (err) {
      const message = err.message || "Invalid credentials. Please try again.";
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl rounded-2xl bg-content1 border border-default-200">
        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="text-sm text-default-500">
            Log in to your account to continue
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          {/* Password Input with Visibility Toggle */}
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

          <div className="flex items-center justify-between text-sm pt-1">
            <Checkbox defaultSelected className="text-sm font-medium">
              Remember me
            </Checkbox>
            {/* <Link
              href="#"
              className="font-medium text-primary hover:underline text-sm"
            >
              Forgot password?
            </Link> */}
          </div>

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
            {isLoading ? "Signing in..." : "Log In"}
          </Button>
        </Form>

        <Separator className="my-6 border-default-100" />

        <p className="text-center text-sm text-default-500">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline text-sm"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
