import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaPlane,
  FaChevronRight,
  FaLocationDot,
  FaPhoneVolume,
  FaEnvelope,
  FaShieldHalved,
  FaHeadset,
  FaPlaneDeparture,
  FaArrowRight,
  FaClock,
} from "react-icons/fa6";
import "./NewFooter.css";

// Get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

// Static footer links
const footerLinks = [
  { title: "About Us", link: "/about-us" },
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms & Conditions", link: "/terms-conditions" },
  { title: "Contact Us", link: "/contact" },
  { title: "Offers", link: "/offers" },
];

// International routes – Trip of a Lifetime (Delhi to US & Europe)
const international = [
  { ori: "Delhi", desti: "London", code: "LHR" },
  { ori: "Delhi", desti: "Paris", code: "CDG" },
  { ori: "Delhi", desti: "Frankfurt", code: "FRA" },
  { ori: "Delhi", desti: "Amsterdam", code: "AMS" },
  { ori: "Delhi", desti: "Rome", code: "FCO" },
].map((item) => ({
  ...item,
  link: `/flightList/dest_${item.code}*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
}));

const socialIcons = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    link: "#",
  },
  {
    icon: <FaTiktok />,
    label: "TikTok",
    link: "#",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    link: "#",
  },
];

const FooterColumn = ({ title, children }) => (
  <div className="ftr-col">
    <h4 className="ftr-col__title">
      {title}
      <span className="ftr-title-underline"></span>
    </h4>
    {children}
  </div>
);

const NewFooter = () => {
  return (
    <footer className="ftr">
      {/* 1. FIRST SECTION WITH FULL COVERAGE SKYLINE BACKGROUND */}
      <section className="ftr-top">
        {/* Full-coverage background skyline image */}
        <div className="ftr-skyline-bg" aria-hidden="true" />
        <div className="ftr-top-gradient-overlay" aria-hidden="true" />

        <div className="ftr-container position-relative z-index-2">
          <div className="ftr-grid">
            {/* Brand Column */}
            <div className="ftr-col ftr-brand">
              <div className="ftr-brand__header">
                <div className="ftr-brand-logo-box">
                  <FaPlane className="ftr-brand-icon" />
                </div>
                <div className="ftr-brand__name">
                  Trusted<span className="gradient-text">Fare</span>
                </div>
              </div>
              <p className="ftr-brand__tag">Trusted journeys, better fares.</p>
              
              <div className="ftr-support-pill">
                <FaHeadset className="me-2" /> 24/7 Dedicated Support
              </div>

              <div className="ftr-social">
                {socialIcons.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={item.label}
                    className="ftr-social-btn"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* About Column */}
            <FooterColumn title="About">
              <ul className="ftr-list">
                {footerLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.link} className="ftr-link-item">
                      <FaChevronRight className="ftr-link-arrow" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            {/* International Flights Column */}
            <FooterColumn title="International Flights">
              <ul className="ftr-list">
                {international.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.link} className="ftr-link-item">
                      <FaPlaneDeparture className="ftr-route-icon" />
                      <span>
                        {item.ori} to {item.desti}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE PHYSICAL OFFICES & CONTACT SECTION - UNIFIED DOCK BAR */}
      <section className="ftr-offices-section">
        <div className="ftr-container">
          <div className="ftr-hubs-dock">
            
            {/* Hub 1: India Headquarters */}
            <div className="ftr-hub-item">
              <div className="ftr-hub-header">
                <div className="ftr-hub-tag">
                  <span className="ftr-flag">🇮🇳</span>
                  <span className="ftr-hub-title">INDIA HEADQUARTERS</span>
                </div>
                <span className="ftr-status-badge">
                  <span className="live-dot-green"></span> OPEN MON - SAT
                </span>
              </div>

              <div className="ftr-hub-body">
                <p className="ftr-hub-address">
                  <FaLocationDot className="ftr-hub-icon" />
                  <span>
                    YOUR FRIEND / TRUSTED FARE, GROUND FLOOR, Shop No 32, Bus
                    Stand, Goniana Mandi Bathinda, Punjab, India - 151201
                  </span>
                </p>
                <div className="ftr-hub-action-line">
                  <span className="ftr-hub-hours"><FaClock className="me-1" /> 9:30 AM – 6:30 PM (IST)</span>
                  <a href="tel:+919646747171" className="ftr-hub-phone">
                    <FaPhoneVolume className="me-2" /> +91-9646747171
                  </a>
                </div>
              </div>
            </div>

            <div className="ftr-dock-divider" />

            {/* Hub 2: Canada Branch */}
            <div className="ftr-hub-item">
              <div className="ftr-hub-header">
                <div className="ftr-hub-tag">
                  <span className="ftr-flag">🇨🇦</span>
                  <span className="ftr-hub-title">CANADA BRANCH</span>
                </div>
                <span className="ftr-status-badge">
                  <span className="live-dot-green"></span> OPEN MON - SAT
                </span>
              </div>

              <div className="ftr-hub-body">
                <p className="ftr-hub-address">
                  <FaLocationDot className="ftr-hub-icon" />
                  <span>
                    Unit 201-7743 128 street West newton, Surrey, BC V3W1L4
                  </span>
                </p>
                <div className="ftr-hub-action-line">
                  <span className="ftr-hub-hours"><FaClock className="me-1" /> 9:00 AM – 5:30 PM (PST)</span>
                  <a href="tel:+17782404599" className="ftr-hub-phone">
                    <FaPhoneVolume className="me-2" /> +1-778-240-4599
                  </a>
                </div>
              </div>
            </div>

            <div className="ftr-dock-divider" />

            {/* Hub 3: 24/7 Support & Email Concierge */}
            <div className="ftr-hub-item ftr-hub-item--support">
              <div className="ftr-hub-header">
                <div className="ftr-hub-tag ftr-hub-tag--support">
                  <FaEnvelope className="ftr-support-header-icon me-2" />
                  <span>24/7 EMAIL CONCIERGE</span>
                </div>
                <span className="ftr-status-badge ftr-status-badge--blue">
                  <span className="live-dot-blue"></span> INSTANT REPLY
                </span>
              </div>

              <div className="ftr-hub-body ftr-hub-body--support">
                <p className="ftr-hub-support-desc">
                  Have flight inquiries, custom booking requests, or itinerary modifications?
                </p>
                <a href="mailto:info@trustedfare.com" className="ftr-hub-email-btn">
                  <FaEnvelope className="me-2" /> info@trustedfare.com
                  <FaArrowRight className="ms-2 ftr-btn-arrow" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CLEAN, UNIQUE BOTTOM SECTION */}
      <section className="ftr-bottom">
        <div className="ftr-container">
          <div className="ftr-bottom-content">
            {/* Payment Partners Badge */}
            <div className="ftr-payments-container">
              <span className="ftr-payments-label">
                <FaShieldHalved className="me-2" /> VERIFIED &amp; SECURE PAYMENT PARTNERS
              </span>
              <div className="ftr-payments-card">
                <img
                  src="https://c.fareportal.com/vd/coa/travel/r6/images/footer-logo-desktop.webp"
                  width="1135"
                  height="51"
                  alt="Payment partners logos"
                  className="ftr-payments"
                />
              </div>
            </div>

            {/* Legal Links & Copyright Row */}
            <div className="ftr-legal-bar">
              <div className="ftr-copyright">
                &copy; {new Date().getFullYear()} <strong>Trusted Fare</strong>. All rights reserved.
              </div>

              <div className="ftr-legal-links">
                <Link to="/terms-conditions">Terms &amp; Conditions</Link>
                <span className="dot">•</span>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span className="dot">•</span>
                <span className="ftr-dev-text">
                  Developed by{" "}
                  <a
                    href="https://www.eweblink.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Eweblink Technology
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default NewFooter;
