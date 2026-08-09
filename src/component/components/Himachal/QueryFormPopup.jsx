import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./QueryFormPopup.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const QueryFormPopup = ({ reflink, setShowFormPopup, showFormPopup }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const destinationRef = useRef(null);
  // const [error, setError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const name = nameRef.current.value.trim();
  //   const phone = phoneRef.current.value.trim();
  //   const email = emailRef.current.value.trim();
  //   const destination = destinationRef.current.value.trim();

  //   if (
  //     !name ||
  //     !/^\d{10}$/.test(phone) ||
  //     !/^\S+@\S+\.\S+$/.test(email) ||
  //     !destination
  //   ) {
  //     setError("Please fill all fields correctly");
  //     return;
  //   }
  //   setError("");
  //   console.log({ name, phone, email, destination });
  // };

  const handleClosePopup = () => {
    setShowFormPopup(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    message: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/HolidayPackages/quick_enquiry",
        formData
      );

      if (response.status === 200) {
        toast.success("Form submitted successfully!");
        setShowFormPopup(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          destination: "",
          message: null,
        });
        setErrors({});
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showFormPopup && (
        <div className="uttarakhand-formContainerBelowBgBlur">
          <div className="uttarakhand-formContainerBelowPopup">
            {" "}
            <span className="uttarakhand-closeIcon">
              <RxCross2 onClick={handleClosePopup} />
            </span>
            <form className="uttarakhand-tripFormPopup" onSubmit={handleSubmit}>
              <h2>Planning a trip? We're here to help!</h2>
              <p>Fill in this form, please</p>

              <div className="uttarakhand-formGroup">
                <input
                  type="text"
                  id="name"
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
                  id="phone"
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
                  id="email"
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
                  id="destination"
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
      )}
    </>
  );
};

export default QueryFormPopup;
