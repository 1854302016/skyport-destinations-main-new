import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import "./css/FullDetail.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaDownload,
  FaShareAlt,
  FaHotel,
  FaGlobe,
  FaCloudSun,
  FaCheckCircle,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ItinearySection from "./ItinearySection";

const FullDetail = ({ data }) => {
  const [isFullContent, setIsFullContent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleContent = () => {
    setIsFullContent(!isFullContent);
  };
  const [formData, setFormData] = useState({
    // city: "",
    adult: 0,
    child: 0,
    infant: 0,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { name, email, phone, adult, child, infant, city } = formData;
    const { name, email, phone, adult, child, infant } = formData;

    // Per-field validation using SweetAlert2
    // if (!city) {
    //   Swal.fire("Missing Field", "Please enter your city.", "warning");
    //   return;
    // }
    if (!name) {
      Swal.fire("Missing Field", "Please enter your name.", "warning");
      return;
    }
    if (!email) {
      Swal.fire("Missing Field", "Please enter your email.", "warning");
      return;
    }
    if (!phone.trim()) {
      Swal.fire("Missing Field", "Please enter your phone number.", "warning");
      return;
    }
    const phonePattern = /^\+?[0-9\s\-]{10,20}$/;
    if (!phonePattern.test(phone.trim())) {
      Swal.fire(
        "Invalid Phone",
        "Please enter a valid phone number (e.g., +91 9310147852).",
        "warning",
      );
      return;
    }
    // At least one passenger should be selected
    if (adult === 0) {
      Swal.fire(
        "No Passengers",
        "Please select at least one passenger.",
        "warning",
      );
      return;
    }
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
          package_id: data && data.packagedetail.id,
          message: formData.message,
          // city,
        },
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
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire("Error", "Failed to submit query. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // adult child infant inc dec
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

  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    setIsSticky(window.scrollY > 220);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="full-detail-main">
      <div className={`detail-nav-strip ${isSticky ? "sticky" : ""}`}>
        <Container>
          <div className="nav-strip-inner">
            <ul className="nav-links">
              <li>
                <a href="#overview">Overview</a>
              </li>
              <li>
                <a href="#itinerary">Itinerary</a>
              </li>
              <li>
                <a href="#inclusions">Inclusions</a>
              </li>
              <li>
                <a href="#hotels">Hotels</a>
              </li>
              <li>
                <a href="#policies">Policies</a>
              </li>
            </ul>
            <div className="nav-actions">
              <button className="action-btn share-btn">
                <FaShareAlt /> Share
              </button>
              <button className="action-btn download-btn">
                <FaDownload /> Brochure
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="main-content-container py-5">
        <Row className="gx-lg-5">
          <Col lg={8}>
            <div className="left-content-area">
              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
                id="overview" 
                className="modern-detail-card mb-5"
              >
                <div className="card-accent-line"></div>
                <h2 className="section-header-stylish">Highlights & Insights</h2>
                <div className="highlights-grid-premium">
                  {[
                    { 
                      icon: <FaGlobe />, 
                      label: "Region", 
                      val: data.destination_name || "Multiple" 
                    },
                    { 
                      icon: <FaHotel />, 
                      label: "Stay", 
                      val: (data.packagedetail.hotel && data.packagedetail.hotel.length > 0) 
                           ? data.packagedetail.hotel[0].name 
                           : "Luxury Stay" 
                    },
                    { 
                      icon: <FaCloudSun />, 
                      label: "Type", 
                      val: data.packagedetail.type?.toUpperCase() || "VACATION" 
                    },
                    { 
                      icon: <IoMdTime />, 
                      label: "Duration", 
                      val: `${data.packagedetail.days}D / ${data.packagedetail.nights}N` 
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="highlight-pill-modern"
                    >
                      <div className="h-icon-circle">{item.icon}</div>
                      <div className="h-text-stack">
                        <label>{item.label}</label>
                        <span>{item.val}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="overview-content-rich mt-5">
                  <h3 className="sub-header-modern">Tour Overview</h3>
                  <div className="overview-text-wrapper">
                    <p>
                      {isFullContent
                        ? data.packagedetail.package_overview
                        : `${data.packagedetail.package_overview.substring(0, 450)}...`}
                    </p>
                    <button onClick={toggleContent} className="read-more-modern">
                      {isFullContent ? "Collapse Details" : "Read Full Story"}
                    </button>
                  </div>
                </div>
              </motion.section>

              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
                id="itinerary" 
                className="mb-5"
              >
                <ItinearySection data={data} />
              </motion.div>

              <motion.section 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
                id="policies" 
                className="modern-detail-card mb-5"
              >
                <h2 className="section-header-stylish">The Fine Print</h2>
                <div className="policies-container-modern">
                  <Row>
                    <Col md={6}>
                      <div className="policy-box-classy">
                        <h4>Cancellation Policy</h4>
                        <ul>
                          {data.cancelation_policy.map((p, i) => p && (
                            <li key={i}><FaCheckCircle /> {p}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="policy-box-classy yellow">
                        <h4>Payment Terms</h4>
                        <ul>
                          {data.payment_policy.map((p, i) => p && (
                            <li key={i}><FaCheckCircle /> {p}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </motion.section>
            </div>
          </Col>

          <Col lg={4}>
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="detail-sidebar-area sticky-top"
              style={{ top: "100px" }}
            >
              <div className="premium-booking-glass">
                <div className="premium-header-booking">
                  <span className="premium-label">EXCLUSIVE OFFER</span>
                  <div className="premium-price-row">
                    <span className="p-curr">$</span>
                    <span className="p-amount">{data.packagedetail.offer_price.toLocaleString()}</span>
                    <span className="p-base">/ person</span>
                  </div>
                  <div className="premium-savings">
                    You save ${ (data.packagedetail.publish_price - data.packagedetail.offer_price).toLocaleString() } today
                  </div>
                </div>

                <div className="booking-form-classy">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group-modern">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        onChange={handleInputChange}
                        value={formData.name}
                      />
                    </div>
                    
                    <Row>
                      <Col xs={12}>
                        <div className="form-group-modern">
                          <label>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            onChange={handleInputChange}
                            value={formData.email}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="form-group-modern">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            placeholder="+1 234 567 890"
                            onChange={handleInputChange}
                            value={formData.phone}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="guest-selector-classy">
                      <div className="guest-item-modern">
                        <div className="g-info">
                          <h6>Adults</h6>
                          <p>12+ years</p>
                        </div>
                        <div className="g-counter">
                          <button type="button" onClick={() => handleCountChange("adult", "dec")}>-</button>
                          <span>{formData.adult}</span>
                          <button type="button" onClick={() => handleCountChange("adult", "inc")}>+</button>
                        </div>
                      </div>
                      <div className="guest-item-modern">
                        <div className="g-info">
                          <h6>Children</h6>
                          <p>2-12 years</p>
                        </div>
                        <div className="g-counter">
                          <button type="button" onClick={() => handleCountChange("child", "dec")}>-</button>
                          <span>{formData.child}</span>
                          <button type="button" onClick={() => handleCountChange("child", "inc")}>+</button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label>Special Requests</label>
                      <textarea
                        name="message"
                        placeholder="Dietary requirements, room preferences, etc."
                        rows="3"
                        onChange={handleInputChange}
                        value={formData.message}
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: "#053355" }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="btn-book-premium-gold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Secure My Package"}
                    </motion.button>
                  </form>
                </div>
                
                <div className="booking-trust-footer">
                  <div className="trust-item"><FaCheckCircle /> Instant Confirmation</div>
                  <div className="trust-item"><FaCheckCircle /> 100% Secure Payment</div>
                </div>
              </div>
               <div className="tourPackageDetailIcons">
                    <div>
                      <img
                        src="https://tripoholidays.in/public/images/customer-care.png"
                        alt=""
                        // className="w-[40px]"
                        width={50}
                      />
                    </div>
                    <div>
                      <p className="tourPackageDetailIconsPara">Need Help?</p>
                      <div className="tourPackageDetailIconsPara2">
                        <p>
                          <span>Call Us:</span>+592 615 8808
                        </p>
                        <p>
                          <span>Mail Us:</span> info@trustedfare.com
                        </p>
                      </div>
                    </div>
                  </div>
            </motion.aside>
          </Col>
        </Row>
      </Container>

      <div className="mobile-sticky-bottom d-lg-none">
        <div className="m-sticky-inner">
          <div className="m-price">
            <span className="m-label">From</span>
            <span className="m-val">
              ${data.packagedetail.offer_price.toLocaleString()}
            </span>
          </div>
          <a href="#enquirenew" className="m-btn">
            Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default FullDetail;
