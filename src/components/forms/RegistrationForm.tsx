'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import BtnArrow from '@/svg/BtnArrow';
import CountryList from '@/utils/countryList';
import CountryCodes from '@/utils/countryCodes';

export interface FormData {
  fname: string;
  lname: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  state: string;
  university: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationFormProps {
  onOtpSent: (data: FormData) => void | Promise<void>;
}

const schema = yup.object({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  countryCode: yup.string().required("Country code is required"),
  phone: yup.string().required("Phone number is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  university: yup.string().required("University is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegistrationForm({ onOtpSent }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await onOtpSent(data); // Pass entire form data to parent
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="account__form space-y-6">
      {/* First Name */}
      <div className="form-grp">
        <label>First Name</label>
        <input {...register("fname")} placeholder="Enter First Name" />
        <p className="form_error">{errors.fname?.message}</p>
      </div>

      {/* Last Name */}
      <div className="form-grp">
        <label>Last Name</label>
        <input {...register("lname")} placeholder="Enter Last Name" />
        <p className="form_error">{errors.lname?.message}</p>
      </div>

      {/* Email */}
      <div className="form-grp">
        <label>Email</label>
        <input type="email" {...register("email")} placeholder="Enter your email" />
        <p className="form_error">{errors.email?.message}</p>
      </div>

      {/* Phone */}
      <div className="form-grp">
        <label>Mobile</label>
        <div className="flex border rounded overflow-hidden">
          <select {...register("countryCode")} className="px-3 bg-gray-100 text-sm border-r outline-none">
            {[...new Set(CountryCodes.map((c) => c.code))].map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <input type="tel" {...register("phone")} placeholder="Enter phone number" className="flex-1 px-3 py-2 outline-none" />
        </div>
        <p className="form_error">{errors.phone?.message}</p>
      </div>

      {/* Country */}
      <div className="form-grp">
        <label>Country</label>
        <select {...register("country")} className="w-full border px-3 py-2 rounded bg-white">
          <option value="">Select your country</option>
          {CountryList.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <p className="form_error">{errors.country?.message}</p>
      </div>

      {/* State */}
      <div className="form-grp">
        <label>State</label>
        <input {...register("state")} placeholder="Enter State" />
        <p className="form_error">{errors.state?.message}</p>
      </div>

      {/* University */}
      <div className="form-grp">
        <label>University</label>
        <input {...register("university")} placeholder="Enter University" />
        <p className="form_error">{errors.university?.message}</p>
      </div>

      {/* Password */}
      <div className="form-grp">
        <label>Password</label>
        <input type="password" {...register("password")} placeholder="Enter password" />
        <p className="form_error">{errors.password?.message}</p>
      </div>

      {/* Confirm Password */}
      <div className="form-grp">
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
        <p className="form_error">{errors.confirmPassword?.message}</p>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-two arrow-btn w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending OTP..." : <>
          <span>Register</span> <BtnArrow />
        </>}
      </button>
    </form>
  );
}
