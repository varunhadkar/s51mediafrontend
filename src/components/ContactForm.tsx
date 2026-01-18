"use client";

import { useState } from "react";
import { api, publicFetch } from "../../lib/api";
// import { api, publicFetch } from '@/lib/api';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  enquiryFor?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryFor: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validation rules mapped to new fields
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Name can only contain letters";
        break;

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^[0-9+\-\s()]+$/.test(value)) {
          return "Please enter a valid phone number";
        }
        if (value.replace(/\D/g, "").length < 10) {
          return "Phone number must be at least 10 digits";
        }
        break;

      case "enquiryFor":
        if (!value.trim()) return "Please specify what the enquiry is for";
        break;

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        if (value.trim().length > 1000)
          return "Message must not exceed 1000 characters";
        break;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await publicFetch(api.contact, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setStatus({
          type: "error",
          message: err.message || "Failed to submit form. Please try again.",
        });
      } else {
        setStatus({
          type: "success",
          message: "Message sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          enquiryFor: "",
          message: "",
        });
        setTouched({});
        setErrors({});
      }
    } catch (error: unknown) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side - Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get in touch for your next project.
          </h2>

          <p className="text-lg text-gray-700">
            Our teams around the world are ready to take
            <br />
            your vision to the next level.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-black to-black" />
        </div>

        {/* Right Side - Form */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h3>

          {/* Status banner */}
          {status.type && (
            <div
              className={`mb-4 px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-emerald-50 border border-emerald-400 text-emerald-700"
                  : "bg-red-50 border border-red-400 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                className={`w-full px-4 py-3 border ${
                  errors.name && touched.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                } focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900`}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  className={`w-full px-4 py-3 border ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  } focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900`}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Phone"
                  className={`w-full px-4 py-3 border ${
                    errors.phone && touched.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  } focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900`}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Enquiry For */}
            <div>
              <label
                htmlFor="enquiryFor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enquiry For *
              </label>
              <input
                type="text"
                id="enquiryFor"
                name="enquiryFor"
                value={formData.enquiryFor}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="VFX Services"
                className={`w-full px-4 py-3 border ${
                  errors.enquiryFor && touched.enquiryFor
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                } focus:ring-2 focus:border-transparent outline-none transition-all text-gray-900`}
              />
              {errors.enquiryFor && touched.enquiryFor && (
                <p className="mt-1 text-sm text-red-600">{errors.enquiryFor}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Message"
                rows={6}
                className={`w-full px-4 py-3 border ${
                  errors.message && touched.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                } focus:ring-2 focus:border-transparent outline-none transition-all resize-none text-gray-900`}
              />
              {errors.message && touched.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.message.length}/1000 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black hover:bg-gray-800 text-white font-semibold px-12 py-3 transition-colors duration-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
