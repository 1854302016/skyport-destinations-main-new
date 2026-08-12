import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaShieldHalved,
  FaPercent,
  FaHeadset,
  FaPlaneCircleCheck,
  FaArrowRight,
  FaCircleCheck,
  FaClock,
  FaLock,
  FaGlobe,
  FaStar,
} from "react-icons/fa6";
import "./HomeHeroRefined.css";

const WhyBook = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 0,
      icon: <FaShieldHalved />,
      tag: "INSTANT SECURITY",
      title: "Assured Cancellation & Fare Protection",
      desc: "Comprehensive flight cancellation coverage, zero hidden fees, and instant refunds directly to your account with 100% data encryption.",
      metric: "99.9% Protection Rate",
      accent: "#0066FF",
      accentBg: "rgba(0, 102, 255, 0.08)",
      bullets: [
        "100% Payment Encrypted via PCI-DSS",
        "Instant Refund Processing within 2 Hours",
        "Full Flight Delay & Cancellation Coverage",
      ],
    },
    {
      id: 1,
      icon: <FaPlaneCircleCheck />,
      tag: "LOWEST FARE ALGORITHM",
      title: "AI-Powered Best Fare Guarantee",
      desc: "Our real-time fare engine scans 500+ global airlines & consolidator inventories to deliver unbeatable negotiated airfares.",
      metric: "500+ Airlines Scanned",
      accent: "#059669",
      accentBg: "rgba(5, 150, 105, 0.08)",
      bullets: [
        "Direct Negotiated Airline Tariffs",
        "Real-Time Fare Lock for 24 Hours",
        "Zero Hidden Booking Surcharges",
      ],
    },
    {
      id: 2,
      icon: <FaPercent />,
      tag: "MEMBER BENEFITS",
      title: "Exclusive Bank & VIP Coupon Perks",
      desc: "Unlock member-only airfare discounts, instant bank cashbacks, credit card EMI savings, and complimentary cabin upgrades.",
      metric: "Up to ₹3,000 Instant Savings",
      accent: "#7C3AED",
      accentBg: "rgba(124, 58, 237, 0.08)",
      bullets: [
        "Instant Bank & Credit Card Cashbacks",
        "Complimentary VIP Airport Lounge Access",
        "Extra Baggage Allowance Discounts",
      ],
    },
    {
      id: 3,
      icon: <FaHeadset />,
      tag: "24/7 CONCIERGE",
      title: "Dedicated International Travel Experts",
      desc: "Speak directly with certified travel concierge specialists available 24/7 for instant seat selection, flight changes, and emergency aid.",
      metric: "< 30s Avg Response Time",
      accent: "#EA580C",
      accentBg: "rgba(234, 88, 12, 0.08)",
      bullets: [
        "Live Human Assistance in < 30 Seconds",
        "24/7 Whatsapp & Phone Emergency Support",
        "Hassle-Free Rescheduling & Rebooking",
      ],
    },
  ];

  return (
    <section className="why-book-stage">
      {/* Background Ambient Glow */}
      <div className="why-glow-left" aria-hidden="true" />
      <div className="why-glow-right" aria-hidden="true" />

      <Container>
        {/* Header Section */}
        <div className="text-center why-header-box mb-5">
          <div className="why-top-pill">
            <FaStar className="me-1 text-gold" />
            <span>TRUSTED BY 2.4M+ PASSENGERS WORLDWIDE</span>
          </div>
          <h2 className="why-main-heading">
            Why Book With <span className="gradient-text">Trusted Fare</span>
          </h2>
          <p className="why-sub-heading">
            Your elite flight booking partner for transparent tariffs, guaranteed protection, and concierge support
          </p>
        </div>

        {/* Bento Interactive Feature Vault Stage */}
        <div className="why-bento-grid">
          {/* Left Hero Spotlight Feature Card */}
          <div className="why-spotlight-card">
            <div className="spotlight-top-bar">
              <div className="spotlight-live-status">
                <span className="live-dot" />
                <span>LIVE SYSTEM ONLINE</span>
              </div>
              <span className="spotlight-tag">{pillars[activeTab].tag}</span>
            </div>

            <div className="spotlight-body">
              <div
                className="spotlight-icon-wrap"
                style={{
                  background: pillars[activeTab].accentBg,
                  color: pillars[activeTab].accent,
                  borderColor: pillars[activeTab].accent,
                }}
              >
                {pillars[activeTab].icon}
              </div>

              <h3 className="spotlight-title">{pillars[activeTab].title}</h3>
              <p className="spotlight-desc">{pillars[activeTab].desc}</p>

              {/* Bullet Points List */}
              <div className="spotlight-bullets">
                {pillars[activeTab].bullets.map((bullet, idx) => (
                  <div key={idx} className="bullet-item">
                    <FaCircleCheck
                      className="bullet-icon me-2"
                      style={{ color: pillars[activeTab].accent }}
                    />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="spotlight-footer">
              <div className="metric-box">
                <span className="metric-val" style={{ color: pillars[activeTab].accent }}>
                  {pillars[activeTab].metric}
                </span>
                <span className="metric-label">VERIFIED METRIC</span>
              </div>
            </div>
          </div>

          {/* Right Selector List Cards */}
          <div className="why-selector-list">
            {pillars.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={item.id}
                  className={`why-selector-card ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveTab(index)}
                  style={{
                    borderLeftColor: isActive ? item.accent : "transparent",
                  }}
                >
                  <div className="selector-icon-box" style={{ color: item.accent }}>
                    {item.icon}
                  </div>

                  <div className="selector-content">
                    <div className="selector-header">
                      <span className="selector-tag">{item.tag}</span>
                      {isActive && <span className="active-badge">ACTIVE VIEW</span>}
                    </div>
                    <h4 className="selector-title">{item.title}</h4>
                    <p className="selector-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyBook;
