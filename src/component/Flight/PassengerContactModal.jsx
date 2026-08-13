import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PHONE_PATTERN = /^\+?[0-9\s-]{10,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PassengerContactModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name) return setError("Please enter your name.");
    if (!EMAIL_PATTERN.test(email)) return setError("Please enter a valid email address.");
    if (!PHONE_PATTERN.test(phone)) return setError("Please enter a valid phone number.");

    setError("");
    onSubmit({ name, email, phone });
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted small mb-3">
          Please share your details so we can process your booking request.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </Form.Group>
          {error && <div className="text-danger small mb-2">{error}</div>}
          <Button type="submit" variant="primary" className="w-100">
            Continue Booking
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PassengerContactModal;
