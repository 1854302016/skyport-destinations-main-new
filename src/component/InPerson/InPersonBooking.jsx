import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./InPerson.css";
import {
  FaPlane,
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaChevronLeft,
  FaChevronRight,
  FaGem,
  FaCheckCircle,
  FaGlobe,
  FaSuitcase,
  FaBolt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config";

const InPersonBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("flight");
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("11:30 AM");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
  };

  const isSelected = (day) => {
    return (
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear()
    );
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const services = [
    { id: "flight", title: "Flight Booking", icon: <FaPlane /> },
    { id: "planning", title: "Full Trip Planning", icon: <FaGlobe /> },
    { id: "business", title: "Business Travel", icon: <FaSuitcase /> },
    { id: "urgent", title: "Urgent Travel", icon: <FaBolt /> },
  ];

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}in-person-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService,
          booking_date: formatDate(selectedDate),
          booking_time: selectedTime,
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.status) {
        alert("Booking successful!");
        setCurrentStep(4);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="in-person-booking-page">
      <Helmet>
        <title>
          In-Person Travel Booking Assistance | SkyPort Destinations
        </title>
        <meta
          name="description"
          content="Book your flights, hotels, holiday packages, and travel services with personalized in-person assistance from SkyPort Destinations. Get expert support for secure and hassle-free travel planning."
        />
        <meta
          name="keywords"
          content="in-person booking, travel consultation, travel booking assistance, offline travel booking, flight booking support, hotel booking assistance, holiday package consultation, travel agency support, SkyPort Destinations"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SkyPort Destinations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="In-Person Travel Booking Assistance | SkyPort Destinations"
        />
        <meta
          property="og:description"
          content="Get personalized travel booking assistance for flights, hotels and holiday packages with SkyPort Destinations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://skyportdestinations.com/in-person-booking"
        />
        <meta
          property="og:image"
          content="https://skyportdestinations.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="In-Person Travel Booking Assistance | SkyPort Destinations"
        />
        <meta
          name="twitter:description"
          content="Speak with travel experts and book flights, hotels and tours with personalized in-person assistance."
        />
        <link
          rel="canonical"
          href="https://skyportdestinations.com/in-person-booking"
        />
      </Helmet>
      <div className="content-wrapper">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="logo-container">
            <span className="logo-text">
              <FaPlane style={{ color: "#d4af37" }} /> SKYPORT — MAKE EVERY
              JOURNEY COUNT
            </span>
          </div>

          <h1 className="main-title">
            IN-PERSON <br />
            <span className="gold">BOOKING</span>
          </h1>

          <p className="tagline">
            Personal service. Expert guidance. <br />
            Your journey, perfectly planned.
          </p>

          <div className="appointment-badge">
            <FaLock /> BY APPOINTMENT ONLY
          </div>

          <button className="book-btn">
            <FaCalendarAlt /> BOOK IN PERSON
          </button>

          <div className="trust-badges">
            <div className="trust-card">
              <div className="icon-circle">
                <FaUser />
              </div>
              <span>
                Dedicated <br />
                Travel Experts
              </span>
            </div>
            <div className="trust-card">
              <div className="icon-circle">
                <FaGem />
              </div>
              <span>
                Premium <br />
                Travel Experience
              </span>
            </div>
            <div className="trust-card">
              <div className="icon-circle">
                <FaCheckCircle />
              </div>
              <span>
                Trusted by <br />
                Thousands
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="booking-form-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="form-card">
            <h3 className="form-title">Reserve Your In-Person Session</h3>

            <div className="step-indicator">
              {[
                { n: 1, l: "Service" },
                { n: 2, l: "Date & Time" },
                { n: 3, l: "Your Details" },
                { n: 4, l: "Confirmation" },
              ].map((step) => (
                <div
                  key={step.n}
                  className={`step ${currentStep >= step.n ? "active" : ""}`}
                >
                  <div className="step-num">{step.n}</div>
                  <span className="step-label">{step.l}</span>
                </div>
              ))}
            </div>

            <div className="form-content">
              <div className="form-section">
                <span className="section-label">
                  1. Choose what you need help with
                </span>
                <div className="service-grid">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`service-option ${selectedService === service.id ? "selected" : ""}`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      {service.icon}
                      <span>{service.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <span className="section-label">2. Select Date & Time</span>
                <div className="selection-row">
                  <div className="mini-calendar">
                    <div className="calendar-header">
                      <FaChevronLeft
                        onClick={handlePrevMonth}
                        style={{ cursor: "pointer", fontSize: "12px" }}
                      />
                      <div
                        className="month-year-selector"
                        style={{ display: "flex", gap: "5px" }}
                      >
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {monthNames[month]} {year}
                        </span>
                      </div>
                      <FaChevronRight
                        onClick={handleNextMonth}
                        style={{ cursor: "pointer", fontSize: "12px" }}
                      />
                    </div>
                    <div className="calendar-grid">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (d) => (
                          <div key={d} className="calendar-day-label">
                            {d}
                          </div>
                        ),
                      )}

                      {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}

                      {[...Array(daysInMonth)].map((_, i) => (
                        <div
                          key={i + 1}
                          className={`day ${isSelected(i + 1) ? "selected" : ""} ${isToday(i + 1) ? "today" : ""}`}
                          onClick={() => handleDateClick(i + 1)}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="time-slots">
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#d1d1d1",
                        marginBottom: "10px",
                        display: "block",
                      }}
                    >
                      Available Times
                    </span>
                    <div className="slots-grid">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="availability-info">
                      <div
                        className="dot"
                        style={{
                          width: 6,
                          height: 6,
                          background: "#d4af37",
                          borderRadius: "50%",
                        }}
                      ></div>
                      Only 3 slots left
                    </div>
                  </div>
                </div>
              </div>

              <div className="selection-row">
                <div className="form-section">
                  <span className="section-label">3. Your Details</span>
                  <div className="details-inputs">
                    <div className="input-group">
                      <FaUser />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <FaPhoneAlt />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone / WhatsApp"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <FaEnvelope />
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <span className="section-label">
                    4. Additional Information
                  </span>
                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder="Tell us more about your trip..."
                      value={formData.message}
                      onChange={handleInputChange}
                      maxLength={300}
                    ></textarea>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "15px",
                        fontSize: "0.7rem",
                        color: "#888",
                      }}
                    >
                      {formData.message.length}/300
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button className="submit-btn" onClick={handleSubmit}>
                <FaLock /> SECURE MY SESSION{" "}
                <FaPlane style={{ transform: "rotate(90deg)" }} />
              </button>
              <div className="security-note">
                <FaCheckCircle style={{ color: "#d4af37", fontSize: "10px" }} />{" "}
                Your information is safe with us.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bottom-experience">
        <div className="experience-grid">
          <div className="bottom-logo-section">
            <div className="line"></div>
            <span>THE SKYPORT EXPERIENCE</span>
            <div className="line"></div>
          </div>

          <div className="exp-items">
            <div className="exp-item">
              <div className="exp-icon">
                <FaUser />
              </div>
              <div className="exp-content">
                <h4>One-on-One Consultation</h4>
                <p>
                  Sit with a travel expert and get personalized recommendations.
                </p>
              </div>
            </div>
            <div className="exp-item">
              <div className="exp-icon">
                <FaSuitcase />
              </div>
              <div className="exp-content">
                <h4>Premium Travel Access</h4>
                <p>Exclusive fares, better options and premium comfort.</p>
              </div>
            </div>
            <div className="exp-item">
              <div className="exp-icon">
                <FaGlobe />
              </div>
              <div className="exp-content">
                <h4>Seamless Support</h4>
                <p>From planning to booking, we handle it all for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-disclaimer">
        Limited slots available each day to ensure premium service.
      </div>
    </div>
  );
};

export default InPersonBooking;
