import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhoneVolume,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaHeadset,
  FaPaperPlane,
  FaCircleCheck,
  FaWhatsapp,
  FaGlobe,
  FaShieldHalved,
} from "react-icons/fa6";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg-overlay"></div>
        <Container className="position-relative z-index-2">
          <div className="contact-hero-content text-center">
            <div className="contact-hero-badge">
              <FaHeadset className="me-2" /> 24/7 CUSTOMER SERVICE
            </div>
            <h1 className="contact-hero-title">
              We're Here to Help <br />
              <span className="gradient-text">Reach Out Anytime</span>
            </h1>
            <p className="contact-hero-subtitle">
              Have questions regarding flights, custom travel itineraries, or booking modifications?
              Our global team in India and Canada is ready to assist you.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Quick Contact Cards Strip */}
      <section className="contact-quick-strip">
        <Container>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="quick-contact-card">
                <div className="quick-icon-box">
                  <FaPhoneVolume />
                </div>
                <div className="quick-card-text">
                  <span className="quick-tag">DIRECT CALL</span>
                  <h4>Call Us 24/7</h4>
                  <p>Immediate phone assistance from our ticketing specialists.</p>
                  <div className="quick-links">
                    <a href="tel:+919646747171" className="phone-link">
                      🇮🇳 +91-9646747171
                    </a>
                    <a href="tel:+17782404599" className="phone-link">
                      🇨🇦 +1-778-240-4599
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="quick-contact-card">
                <div className="quick-icon-box">
                  <FaEnvelope />
                </div>
                <div className="quick-card-text">
                  <span className="quick-tag">EMAIL ENQUIRIES</span>
                  <h4>Email Support</h4>
                  <p>Send us your flight requests or itinerary feedback anytime.</p>
                  <div className="quick-links">
                    <a href="mailto:info@trustedfare.com" className="mail-link">
                      info@trustedfare.com
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <div className="quick-contact-card">
                <div className="quick-icon-box">
                  <FaGlobe />
                </div>
                <div className="quick-card-text">
                  <span className="quick-tag">GLOBAL HUBS</span>
                  <h4>Global Offices</h4>
                  <p>Physical offices in Punjab (India) and Surrey, BC (Canada).</p>
                  <div className="quick-links">
                    <span className="office-status-text">
                      <span className="live-dot"></span> Open for In-Person Consultation
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 3. Main Form & Detailed Location Section */}
      <section className="contact-main-section py-6">
        <Container>
          <Row className="g-5 align-items-start">
            {/* Left Column: Modern Contact Form */}
            <Col lg={6}>
              <div className="modern-form-card">
                <div className="form-header mb-4">
                  <div className="section-pill-tag">
                    <FaPaperPlane className="me-2" /> SEND A MESSAGE
                  </div>
                  <h2 className="form-main-heading">
                    Let's Connect &amp; Plan Your Flight
                  </h2>
                  <p className="form-subheading">
                    Fill out the form below and a Trade Fare flight specialist will get back to you promptly.
                  </p>
                </div>

                {submitted ? (
                  <div className="form-success-banner">
                    <FaCircleCheck className="success-icon" />
                    <div>
                      <h5>Message Sent Successfully!</h5>
                      <p>Thank you for reaching out. Our travel team will review your inquiry and contact you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="modern-contact-form">
                    <Row className="g-3">
                      <Col sm={6}>
                        <div className="form-floating-group">
                          <label>Your Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input-field"
                          />
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className="form-floating-group">
                          <label>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input-field"
                          />
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className="form-floating-group">
                          <label>Phone / WhatsApp</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input-field"
                          />
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className="form-floating-group">
                          <label>Subject</label>
                          <input
                            type="text"
                            name="subject"
                            placeholder="Flight Inquiry / Booking Help"
                            value={formData.subject}
                            onChange={handleChange}
                            className="form-input-field"
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="form-floating-group">
                          <label>Your Message *</label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            placeholder="Please tell us about your travel dates, destination, or specific request..."
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea-field"
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <button type="submit" className="btn-send-message">
                          Send Message <FaPaperPlane className="ms-2" />
                        </button>
                      </Col>
                    </Row>
                  </form>
                )}
              </div>
            </Col>

            {/* Right Column: Physical Office Locations & Hours */}
            <Col lg={6}>
              <div className="office-locations-container">
                <div className="form-header mb-4">
                  <div className="section-pill-tag">
                    <FaLocationDot className="me-2" /> VISIT OUR LOCATIONS
                  </div>
                  <h2 className="form-main-heading">
                    Our Physical Offices
                  </h2>
                  <p className="form-subheading">
                    Feel free to visit our dedicated branch offices for personalized flight reservations and support.
                  </p>
                </div>

                <div className="locations-stack">
                  {/* Location 1: India Head Office */}
                  <div className="location-detail-card">
                    <div className="location-header">
                      <div className="location-flag-badge">
                        <span>🇮🇳</span> INDIA (HEAD OFFICE)
                      </div>
                      <span className="badge-live-open">Open Mon - Sat</span>
                    </div>
                    <h4 className="location-name">Trade Fare Destinations Head Office</h4>
                    
                    <div className="location-info-row">
                      <FaLocationDot className="loc-icon" />
                      <p>
                        GROUND FLOOR, Shop No 32, Bus Stand, Goniana Mandi Bathinda, Punjab, India - 151201
                      </p>
                    </div>

                    <div className="location-info-row">
                      <FaPhoneVolume className="loc-icon" />
                      <a href="tel:+919646747171" className="loc-link">+91-9646747171</a>
                    </div>

                    <div className="location-info-row">
                      <FaClock className="loc-icon" />
                      <span>9:30 AM – 6:30 PM (IST)</span>
                    </div>
                  </div>

                  {/* Location 2: Canada Branch Office */}
                  <div className="location-detail-card">
                    <div className="location-header">
                      <div className="location-flag-badge">
                        <span>🇨🇦</span> CANADA OFFICE
                      </div>
                      <span className="badge-live-open">Open Mon - Sat</span>
                    </div>
                    <h4 className="location-name">Trade Fare Destinations Canada Branch</h4>
                    
                    <div className="location-info-row">
                      <FaLocationDot className="loc-icon" />
                      <p>
                        Unit 201-7743 128 street West newton, Surrey BC, Canada V3W 1L4
                      </p>
                    </div>

                    <div className="location-info-row">
                      <FaPhoneVolume className="loc-icon" />
                      <a href="tel:+17782404599" className="loc-link">+1-778-240-4599</a>
                    </div>

                    <div className="location-info-row">
                      <FaClock className="loc-icon" />
                      <span>9:00 AM – 5:30 PM (PST)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. Trust & Security Banner */}
      <section className="contact-trust-strip py-5">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={4} md={6}>
              <div className="trust-item-box">
                <div className="trust-icon"><FaShieldHalved /></div>
                <div>
                  <h5>Verified &amp; Secure</h5>
                  <p>100% encrypted booking channels &amp; transparent ticketing.</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="trust-item-box">
                <div className="trust-icon"><FaHeadset /></div>
                <div>
                  <h5>Human Assistance</h5>
                  <p>Talk to certified travel consultants, not automated chatbots.</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="trust-item-box">
                <div className="trust-icon"><FaWhatsapp /></div>
                <div>
                  <h5>Instant WhatsApp Help</h5>
                  <p>Quick queries and itinerary updates directly on your phone.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactUs;
