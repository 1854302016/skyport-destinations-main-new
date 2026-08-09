import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./css/QuotePopup.css";

function QuotePopup({ show, handleClose, packageId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // city: "",
    adult: 0,
    child: 0,
    infant: 0,
    name: "",
    email: "",
    phone: "",
  });

  const [travelDate, setTravelDate] = useState(null);
  const [focused, setFocused] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountChange = (field, operation) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        operation === "inc"
          ? prev[field] + 1
          : prev[field] > 0
          ? prev[field] - 1
          : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { name, email, phone, adult, child, infant,city } = formData;
    const { name, email, phone, adult, child, infant } = formData;
    const traveldate = travelDate ? travelDate.format("YYYY-MM-DD") : "";

    // Validation
    if (!name)
      return Swal.fire("Missing Field", "Please enter your name.", "warning");
    if (!email)
      return Swal.fire("Missing Field", "Please enter your email.", "warning");
    if (!phone.trim())
      return Swal.fire(
        "Missing Field",
        "Please enter your phone number.",
        "warning"
      );

    const phonePattern = /^\+?[0-9\s\-]{10,20}$/;
    if (!phonePattern.test(phone.trim())) {
      return Swal.fire(
        "Invalid Phone",
        "Please enter a valid phone number (e.g., +91 9310147852).",
        "warning"
      );
    }

    // if (!city) return Swal.fire("Missing Field", "Please enter your city.", "warning");
    if (!traveldate)
      return Swal.fire(
        "Missing Field",
        "Please select your travel date.",
        "warning"
      );
    if (adult === 0)
      return Swal.fire(
        "No Passengers",
        "Please select at least one passenger.",
        "warning"
      );
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/HolidayPackages/package_enquiry",
        {
          name,
          email,
          phone,
          adult,
          children: child,
          infant,
          package_id: packageId,
          // city,
          traveldate,
        }
      );

      if (response.data.success === true) {
        Swal.fire("Success", response.data.message, "success");
        setFormData({
          // city: "",
          adult: 0,
          child: 0,
          infant: 0,
          name: "",
          email: "",
          phone: "",
        });
        setTravelDate(null);
        handleClose(); // Close modal on success
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire(
        "Error",
        "Failed to submit enquiry. Please try again later.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      style={{ paddingLeft: "0px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Quick Inquiry</Modal.Title>
      </Modal.Header>
      <div className="pkgform-wrapper">
        <div className="pkgform-box">
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Form.Group> */}
              <Form.Group>
                <SingleDatePicker
                  date={travelDate}
                  onDateChange={(date) => setTravelDate(date)}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  id="travel_date_picker"
                  numberOfMonths={1}
                  displayFormat="YYYY-MM-DD"
                  isOutsideRange={() => false}
                  placeholder="Travel Date"
                  block
                  small
                />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="formAdults">
                    <Form.Control
                      as="select"
                      name="adult"
                      value={formData.adult}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          adult: parseInt(e.target.value) || 0,
                        }))
                      }
                    >
                      <option value={0}>Adults*</option>
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formChildren">
                    <Form.Control
                      as="select"
                      name="child"
                      value={formData.child}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          child: parseInt(e.target.value) || 0,
                        }))
                      }
                    >
                      <option value={0}>Children (5-12 yr)</option>
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                className="mt-3"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="spinner"></span> : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}

export default QuotePopup;
