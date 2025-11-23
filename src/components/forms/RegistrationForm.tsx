"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  state: string;
  university: string;
  password: string;
  confirmPassword: string;
  selectedPlan?: string; // ✅ Add this
}

interface RegistrationFormProps {
  onOtpSent: (data: FormData) => void;
}

export default function RegistrationForm({ onOtpSent }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "",
    phone: "",
    country: "",
    state: "",
    university: "",
    password: "",
    confirmPassword: "",
    selectedPlan: undefined,
  });

  // ✅ Get selected plan from localStorage on mount
  useEffect(() => {
    const plan = typeof window !== "undefined" ? localStorage.getItem("selectedPlan") : null;
    if (plan) {
      setFormData((prev) => ({ ...prev, selectedPlan: plan }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Country code validation
    if (!/^\+\d{1,4}$/.test(formData.countryCode)) {
      toast.error("Please enter a valid country code (e.g., +91)");
      return;
    }

    // Phone validation (only digits, 6-14 characters)
    if (!/^\d{6,14}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number (6-14 digits)");
      return;
    }

    // ✅ Get selected plan from localStorage
    const selectedPlan = typeof window !== "undefined" ? localStorage.getItem("selectedPlan") : null;

    // Pass plan to parent component
    onOtpSent({
      ...formData,
      selectedPlan: selectedPlan || "basic", // default to basic if no plan selected
    });
  };

  return (
    <form onSubmit={handleSubmit} className="account__form">
      <div className="form-grp">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grp">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="form-grp">
            <label htmlFor="countryCode">Country Code *</label>
            <input
              type="text"
              id="countryCode"
              name="countryCode"
              placeholder="+91"
              value={formData.countryCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="form-grp">
            <label htmlFor="phone">Mobile Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-grp">
        <label htmlFor="country">Country *</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Enter your country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grp">
        <label htmlFor="state">State *</label>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="Enter your state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grp">
        <label htmlFor="university">University *</label>
        <input
          type="text"
          id="university"
          name="university"
          placeholder="Enter your university name"
          value={formData.university}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grp">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grp">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-two arrow-btn">
        Sign Up
      </button>
    </form>
  );
}
