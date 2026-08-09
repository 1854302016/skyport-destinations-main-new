import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Reuse = ({ img, head }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: null, // always null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // <-- loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.destination.trim())
      newErrors.destination = "Destination is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/HolidayPackages/quick_enquiry",
        formData
      );

      if (response.status === 200) {
        toast.success("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          message: null,
        });
        setErrors({});
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <div
      className="uttarakhand-Bg_Form"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0, 0, 90, 0.4)), url("${img}")`,
      }}
    >
      <div className="uttarakhand-PlaceName">{head}</div>
      <div className="uttarakhand-formContainer">
        <form className="uttarakhand-tripForm" onSubmit={handleSubmit}>
          <h2>Need help planning your trip?</h2>
          <p>Fill in this form, please</p>

          <div className="uttarakhand-formGroup">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="uttarakhand-formGroup">
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          <div className="uttarakhand-formGroup">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="uttarakhand-formGroup">
            <input
              type="text"
              name="destination"
              placeholder="Where to?"
              value={formData.destination}
              onChange={handleChange}
            />
            {errors.destination && (
              <p style={{ color: "red" }}>{errors.destination}</p>
            )}
          </div>

          <p className="uttarakhand-formDisclaimer">
            By submitting this form, you agree to our{" "}
            <a href="/privacy-policy" target="_blank">
              Privacy Policy
            </a>{" "}
            &{" "}
            <a href="/terms-conditions" target="_blank">
              User Agreement
            </a>
            .
          </p>

          <div className="uttarakhand-SubmitBtn">
            <button type="submit" disabled={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reuse;
