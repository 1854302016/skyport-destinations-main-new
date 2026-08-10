import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPlaneDeparture,
  FaGlobe,
  FaShieldHalved,
  FaHeadset,
  FaAward,
  FaCheck,
  FaArrowRight,
  FaCompass,
  FaLocationDot,
  FaPhoneVolume,
} from "react-icons/fa6";
import Testimonial from "./Testimonial";
import "./About.css";

const About = () => {
  return (
    <div className="about-page-wrapper">
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-bg-overlay"></div>
        <Container className="position-relative z-index-2">
          <div className="about-hero-content text-center">
            <div className="about-hero-badge">
              <FaCompass className="me-2" /> DISCOVER OUR STORY
            </div>
            <h1 className="about-hero-title">
              Connecting Your World, <br />
              <span className="gradient-text">One Flight at a Time</span>
            </h1>
            <p className="about-hero-subtitle">
              Trade Fare Destinations is your premium travel partner, bridging travelers
              to extraordinary destinations worldwide with speed, security, and dedicated care.
            </p>

            {/* Quick Stats Strip */}
            <div className="about-hero-stats-grid">
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Airlines Worldwide</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Destinations Covered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Dedicated Support</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Verified & Secure</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Story Section: About Trade Fare Destinations */}
      <section className="about-story-section py-6">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="about-visual-container">
                <div className="about-main-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                    alt="Travel Flight with Trade Fare"
                    className="about-primary-img"
                  />
                  <div className="about-image-gradient-overlay"></div>
                </div>

                {/* Floating Experience Badge */}
                <div className="floating-experience-badge">
                  <div className="badge-icon-box">
                    <FaAward />
                  </div>
                  <div className="badge-text-box">
                    <strong>Premium Flight Partner</strong>
                    <span>Exclusive Global Routes & Fares</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="about-text-content">
                <div className="section-pill-tag">
                  <FaPlaneDeparture className="me-2" /> WHO WE ARE
                </div>
                <h2 className="section-main-heading">
                  Global Flight Bookings Made Effortless with <span className="text-highlight">Trade Fare Destinations</span>
                </h2>
                <p className="lead-text">
                  Every journey begins with more than a boarding pass. It starts with a spark —
                  a desire to explore, to reconnect, to feel alive somewhere new.
                </p>
                <p className="body-text">
                  Whether you're chasing opportunities, escaping to turquoise coastlines, reuniting
                  with loved ones, or simply answering the quiet call of adventure — <strong>Trade Fare Destinations</strong> is
                  your passport to the world.
                </p>
                <p className="body-text">
                  Trade Fare Destinations is a premium online travel agency specializing exclusively in global
                  flight bookings. Designed for the modern traveler, our platform offers a seamless, secure, and
                  efficient way to search, compare, and book flights across international routes — all from a
                  single, trusted destination.
                </p>

                {/* Value Checkpoints */}
                <div className="about-check-points">
                  <div className="check-item">
                    <div className="check-icon"><FaCheck /></div>
                    <div>
                      <strong>Intelligent Route Engine:</strong> Real-time pricing and optimal flight itineraries.
                    </div>
                  </div>
                  <div className="check-item">
                    <div className="check-icon"><FaCheck /></div>
                    <div>
                      <strong>Transparent Pricing:</strong> Clear fare breakdown with zero hidden booking surprises.
                    </div>
                  </div>
                  <div className="check-item">
                    <div className="check-icon"><FaCheck /></div>
                    <div>
                      <strong>Human Support at Scale:</strong> Experienced travel experts ready to assist around the clock.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 3. Global Vision Section: From the Caribbean to the World */}
      <section className="about-vision-section py-6">
        <Container>
          <div className="vision-glass-card">
            <Row className="align-items-center g-5">
              <Col lg={7}>
                <div className="vision-content-left">
                  <div className="vision-badge">
                    <FaGlobe className="me-2" /> OUR PURPOSE &amp; ORIGIN
                  </div>
                  <h3 className="vision-heading">
                    From the Caribbean to the World: Reimagining Air Travel with Purpose
                  </h3>
                  <p className="vision-desc">
                    Launched by Guyanese with a vision of connecting the world from our vibrant corner of
                    the Caribbean, <strong>Trade Fare Destinations</strong> is driven by a mission to become the leading name in
                    digital air travel across the Caribbean, North America, and beyond.
                  </p>
                  <p className="vision-desc">
                    By prioritizing transparency, innovation, and operational excellence, the company aims
                    to reshape how travelers book flights — making it smarter, simpler, and more secure.
                    Trade Fare Destinations represents a new standard in flight booking — built for scale,
                    powered by trust, and committed to delivering travel solutions that match the speed and
                    ambition of the modern world.
                  </p>
                  <div className="vision-quote">
                    <em>“At Trade Fare Destinations, we don’t just book flights — we open the skies to your next story.”</em>
                  </div>
                </div>
              </Col>

              <Col lg={5}>
                <div className="vision-pillars-grid">
                  <div className="pillar-card">
                    <div className="pillar-icon"><FaCompass /></div>
                    <h4>Innovation</h4>
                    <p>Smart search technology delivering instant availability &amp; competitive global airfares.</p>
                  </div>
                  <div className="pillar-card">
                    <div className="pillar-icon"><FaGlobe /></div>
                    <h4>Global Reach</h4>
                    <p>Connecting regional Caribbean hubs with major destinations across North America &amp; worldwide.</p>
                  </div>
                  <div className="pillar-card">
                    <div className="pillar-icon"><FaShieldHalved /></div>
                    <h4>Trust &amp; Scale</h4>
                    <p>Transparent policies, bank-grade secure payments, and travelers-first integrity.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* 4. Core Strengths / Why Choose Us Grid */}
      <section className="about-features-section py-6">
        <Container>
          <div className="text-center max-w-700 mx-auto mb-5">
            <div className="section-pill-tag">
              <FaAward className="me-2" /> WHY TRAVELERS CHOOSE US
            </div>
            <h2 className="section-main-heading">
              A Smoother, Smarter Way to Fly
            </h2>
            <p className="section-subheading">
              Experience the difference with a platform designed around reliability, transparency, and care.
            </p>
          </div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="feature-modern-card">
                <div className="feature-icon-wrapper">
                  <FaPlaneDeparture />
                </div>
                <h4>Curated Flight Deals</h4>
                <p>Access competitive negotiated rates and special flight discounts across top carriers.</p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="feature-modern-card">
                <div className="feature-icon-wrapper">
                  <FaShieldHalved />
                </div>
                <h4>Secure &amp; Instant</h4>
                <p>Encrypted 256-bit transactions with instant e-ticket issuance directly to your email.</p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="feature-modern-card">
                <div className="feature-icon-wrapper">
                  <FaHeadset />
                </div>
                <h4>24/7 Expert Help</h4>
                <p>Direct assistance via Phone, WhatsApp, and Email from our dedicated travel consultants.</p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="feature-modern-card">
                <div className="feature-icon-wrapper">
                  <FaGlobe />
                </div>
                <h4>Global Presence</h4>
                <p>Physical offices in Punjab, India and Surrey BC, Canada to serve our international community.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 5. Physical Offices & Contact Information */}
      <section className="about-offices-section py-6">
        <Container>
          <div className="text-center max-w-700 mx-auto mb-5">
            <div className="section-pill-tag">
              <FaLocationDot className="me-2" /> GLOBAL PRESENCE
            </div>
            <h2 className="section-main-heading">
              Our Physical Offices
            </h2>
            <p className="section-subheading">
              We are available in person and online across continents to support your travel journey with dedicated assistance.
            </p>
          </div>

          {/* 2 Equal Sized Office Cards */}
          <Row className="g-4 mb-5">
            <Col lg={6}>
              <div className="premium-office-card">
                <div className="office-card-header">
                  <div className="office-badge-tag">
                    <span className="flag-emoji">🇮🇳</span> INDIA (HEAD OFFICE)
                  </div>
                  <span className="office-status-pill">
                    <span className="status-dot"></span> Open
                  </span>
                </div>

                <div className="office-card-body">
                  <div className="office-info-item">
                    <div className="office-icon-circle">
                      <FaLocationDot />
                    </div>
                    <div>
                      <span className="info-title">Headquarters Address</span>
                      <p className="info-text">
                        GROUND FLOOR, Shop No 32, Bus Stand, Goniana Mandi Bathinda, Punjab, India - 151201
                      </p>
                    </div>
                  </div>

                  <div className="office-info-item">
                    <div className="office-icon-circle">
                      <FaPhoneVolume />
                    </div>
                    <div>
                      <span className="info-title">Direct Helpline</span>
                      <a href="tel:+919646747171" className="info-link">
                        +91-9646747171
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="premium-office-card">
                <div className="office-card-header">
                  <div className="office-badge-tag">
                    <span className="flag-emoji">🇨🇦</span> CANADA OFFICE
                  </div>
                  <span className="office-status-pill">
                    <span className="status-dot"></span> Open
                  </span>
                </div>

                <div className="office-card-body">
                  <div className="office-info-item">
                    <div className="office-icon-circle">
                      <FaLocationDot />
                    </div>
                    <div>
                      <span className="info-title">Branch Address</span>
                      <p className="info-text">
                        Unit 201-7743 128 street West newton, Surrey BC, Canada V3W 1L4
                      </p>
                    </div>
                  </div>

                  <div className="office-info-item">
                    <div className="office-icon-circle">
                      <FaPhoneVolume />
                    </div>
                    <div>
                      <span className="info-title">Direct Helpline</span>
                      <a href="tel:+17782404599" className="info-link">
                        +1-778-240-4599
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Full-Width Sleek CTA Banner */}
          <div className="about-full-cta-banner">
            <div className="cta-banner-content">
              <div className="cta-text-left">
                <h3>Ready for Your Next Trip?</h3>
                <p>Book flights to hundreds of global destinations with instant confirmation &amp; 24/7 dedicated assistance.</p>
              </div>
              <div className="cta-btn-right">
                <Link to="/" className="btn-cta-white">
                  Search Flights Now <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Testimonials Section */}
      <Testimonial />
    </div>
  );
};

export default About;
