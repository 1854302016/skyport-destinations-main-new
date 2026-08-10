import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaScaleBalanced,
  FaFileLines,
  FaPlaneArrival,
  FaCreditCard,
  FaPassport,
  FaShieldHalved,
  FaCircleCheck,
  FaTriangleExclamation,
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa6";
import "./TermCondition.css";

const termsSections = [
  { id: "term-1", title: "1. Scope of Services" },
  { id: "term-2", title: "2. Eligibility & Use of Platform" },
  { id: "term-3", title: "3. Ordering & Booking of Tickets" },
  { id: "term-4", title: "4. Pricing & Dynamic Fares" },
  { id: "term-5", title: "5. Ticket Issuance & E-Tickets" },
  { id: "term-6", title: "6. Payment & Card Security" },
  { id: "term-7", title: "7. Taxes & Surcharges" },
  { id: "term-8", title: "8. Refunds & Void Policies" },
  { id: "term-9", title: "9. Modifications & Cancellations" },
  { id: "term-10", title: "10. Passports, Visas & Entry" },
  { id: "term-11", title: "11. Content & Accuracy" },
  { id: "term-12", title: "12. Intellectual Property" },
  { id: "term-13", title: "13. Agreement to Arbitrate" },
  { id: "term-14", title: "14. Limitation of Liability" },
  { id: "term-15", title: "15. Indemnification & Entire Agreement" },
];

const TermCondition = () => {
  const [activeTerm, setActiveTerm] = useState("term-1");

  const scrollToTerm = (id) => {
    setActiveTerm(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="terms-page-wrapper">
      {/* 1. Hero Header */}
      <section className="terms-hero-section">
        <div className="terms-hero-bg-overlay"></div>
        <Container className="position-relative z-index-2">
          <div className="terms-hero-content text-center">
            <div className="terms-hero-badge">
              <FaScaleBalanced className="me-2" /> LEGAL AGREEMENT
            </div>
            <h1 className="terms-hero-title">
              Terms &amp; <span className="gradient-text">Conditions</span>
            </h1>
            <p className="terms-hero-subtitle">
              Please review these terms carefully before booking flights or using Trade Fare Destinations services.
            </p>
            <div className="terms-meta-strip">
              <span><strong>Effective Date:</strong> January 2026</span>
              <span className="meta-dot">•</span>
              <span><strong>Governing Law:</strong> International Air Transport &amp; Applicable Laws</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Content & Sticky Navigation */}
      <section className="terms-content-section py-6">
        <Container>
          <Row className="g-5">
            {/* Sidebar Table of Contents */}
            <Col lg={4} className="d-none d-lg-block">
              <div className="terms-sticky-sidebar">
                <div className="sidebar-header">
                  <FaFileLines className="me-2 text-primary" /> Table of Clauses
                </div>
                <ul className="sidebar-nav-list">
                  {termsSections.map((sec) => (
                    <li key={sec.id}>
                      <button
                        className={`sidebar-nav-btn ${activeTerm === sec.id ? "active" : ""}`}
                        onClick={() => scrollToTerm(sec.id)}
                      >
                        {sec.title}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="sidebar-contact-card mt-4">
                  <FaEnvelope className="card-icon" />
                  <h5>Legal Inquiries</h5>
                  <p>Need clarification on fare rules, refunds, or terms?</p>
                  <a href="mailto:explore@skyportdestinations.com" className="btn-sidebar-contact">
                    Contact Support <FaArrowRight className="ms-1" />
                  </a>
                </div>
              </div>
            </Col>

            {/* Main Terms Clauses */}
            <Col lg={8}>
              <div className="terms-clauses-wrapper">
                {/* Intro Card */}
                <div className="terms-intro-card">
                  <p>
                    These Terms and Conditions of Service (“Terms”) form a legally binding agreement between the User (“you”) and <strong>Trade Fare Destinations</strong> (“Trade Fare,” “we,” “us,” or “our”). They govern your use of our online flight search, booking, and ticketing platform. Using the Trade Fare platform indicates full acceptance of these Terms.
                  </p>
                </div>

                {/* Clause 1 */}
                <div className="terms-clause-card" id="term-1">
                  <div className="clause-number-badge">01</div>
                  <h3>1. Scope of Services &amp; Intermediary Role</h3>
                  <p>
                    Trade Fare Destinations is a premium online travel agency that exclusively facilitates real-time global flight bookings. We act as an authorized intermediary connecting travelers with global distribution systems (GDS) and airline inventories.
                  </p>
                  <div className="terms-alert-box">
                    <FaTriangleExclamation className="alert-icon" />
                    <div>
                      <strong>Important Notice:</strong> Your completed flight booking creates a direct contract of carriage between you and the respective operating airline. You are subject to the airline’s specific conditions of carriage and fare rules.
                    </div>
                  </div>
                </div>

                {/* Clause 2 */}
                <div className="terms-clause-card" id="term-2">
                  <div className="clause-number-badge">02</div>
                  <h3>2. Eligibility &amp; Use of Platform</h3>
                  <p>
                    Only individuals aged 18 years or older with full legal capacity may use this platform. You agree to provide accurate, current, and complete traveler information. Speculative, fraudulent, or duplicate bookings are strictly prohibited and subject to immediate cancellation.
                  </p>
                </div>

                {/* Clause 3 */}
                <div className="terms-clause-card" id="term-3">
                  <div className="clause-number-badge">03</div>
                  <h3>3. Ordering &amp; Booking of Tickets</h3>
                  <p>
                    All bookings are subject to real-time seat availability and airline fare rules. When you place a booking request, you instruct Trade Fare to reserve the ticket under the airline’s defined terms.
                  </p>
                  <ul className="styled-terms-list">
                    <li><FaCircleCheck className="list-icon" /> Passenger names must match the government passport or travel ID exactly.</li>
                    <li><FaCircleCheck className="list-icon" /> You must verify all dates, routes, layover durations, and airport terminal details before completing checkout.</li>
                    <li><FaCircleCheck className="list-icon" /> Bookings are confirmed only upon issuance of an official electronic ticket (e-ticket) with an active airline PNR.</li>
                  </ul>
                </div>

                {/* Clause 4 */}
                <div className="terms-clause-card" id="term-4">
                  <div className="clause-number-badge">04</div>
                  <h3>4. Pricing &amp; Dynamic Fares</h3>
                  <p>
                    All displayed prices include base airfare, mandatory taxes, and carrier surcharges. Airfares are dynamic and determined in real time by the operating airlines. Prices are finalized and guaranteed only after payment authorization and e-ticket issuance are complete.
                  </p>
                </div>

                {/* Clause 5 */}
                <div className="terms-clause-card" id="term-5">
                  <div className="clause-number-badge">05</div>
                  <h3>5. Ticket Issuance &amp; Delivery</h3>
                  <p>
                    Trade Fare issues e-tickets promptly upon:
                  </p>
                  <ul className="styled-terms-list">
                    <li><FaCircleCheck className="list-icon" /> Successful payment settlement and fraud risk verification.</li>
                    <li><FaCircleCheck className="list-icon" /> Confirmation of seat inventory and fare class by the operating carrier.</li>
                  </ul>
                  <p className="mt-2">
                    Your e-ticket number and airline reservation code (PNR) will be dispatched directly to your registered email address.
                  </p>
                </div>

                {/* Clause 6 */}
                <div className="terms-clause-card" id="term-6">
                  <div className="clause-number-badge">06</div>
                  <h3>6. Payment &amp; Card Security</h3>
                  <p>
                    We support secure, encrypted credit and debit card transactions. All payments undergo PCI-DSS compliant processing and bank authorization. Chargebacks or disputed transactions without merit may lead to booking cancellation and permanent platform restriction.
                  </p>
                </div>

                {/* Clause 7 */}
                <div className="terms-clause-card" id="term-7">
                  <div className="clause-number-badge">07</div>
                  <h3>7. Taxes, Fees &amp; Surcharges</h3>
                  <p>
                    Fares include airport departure taxes, passenger safety surcharges, and airline fuel charges as mandated by civil aviation authorities.
                  </p>
                </div>

                {/* Clause 8 */}
                <div className="terms-clause-card" id="term-8">
                  <div className="clause-number-badge">08</div>
                  <h3>8. Refunds &amp; Void Policies</h3>
                  <p>
                    Refund eligibility, penalties, and cancellations are governed entirely by the tariff rules of the selected airline.
                  </p>
                  <div className="terms-highlight-grid">
                    <div className="highlight-item">
                      <strong>Void Requests:</strong> Must be requested within the same day of ticket issuance (usually within 24 hours), subject to carrier rules.
                    </div>
                    <div className="highlight-item">
                      <strong>Refund Timelines:</strong> Standard airline refunds typically require 30–60 business days depending on carrier settlement cycles.
                    </div>
                  </div>
                </div>

                {/* Clause 9 */}
                <div className="terms-clause-card" id="term-9">
                  <div className="clause-number-badge">09</div>
                  <h3>9. Modifications &amp; Itinerary Changes</h3>
                  <p>
                    Date changes, route modifications, and upgrades are subject to airline fare differences and carrier change fees. Trade Fare will assist with modification requests permitted under your fare class.
                  </p>
                </div>

                {/* Clause 10 */}
                <div className="terms-clause-card" id="term-10">
                  <div className="clause-number-badge">10</div>
                  <h3>10. Passports, Visas &amp; Entry Requirements</h3>
                  <p>
                    Travelers are solely responsible for ensuring valid passports (minimum 6 months validity from travel date), tourist/transit visas, and compliance with destination health or entry regulations. Trade Fare is not liable for denied boarding resulting from missing travel documents.
                  </p>
                </div>

                {/* Clause 11 - 15 */}
                <div className="terms-clause-card" id="term-11">
                  <div className="clause-number-badge">11</div>
                  <h3>11. Content Accuracy &amp; System Uptime</h3>
                  <p>
                    While we maintain high system availability and real-time feeds, Trade Fare is not liable for airline schedule adjustments, gate changes, or third-party distribution delays beyond our control.
                  </p>
                </div>

                <div className="terms-clause-card" id="term-12">
                  <div className="clause-number-badge">12</div>
                  <h3>12. Intellectual Property</h3>
                  <p>
                    All brand logos, platform interfaces, search technology, and content are the exclusive property of Trade Fare Destinations and protected under global intellectual property laws.
                  </p>
                </div>

                <div className="terms-clause-card" id="term-13">
                  <div className="clause-number-badge">13</div>
                  <h3>13. Agreement to Arbitrate &amp; Governing Law</h3>
                  <p>
                    Any dispute arising from our services or these Terms shall be resolved through binding arbitration in accordance with applicable commercial arbitration standards.
                  </p>
                </div>

                <div className="terms-clause-card" id="term-14">
                  <div className="clause-number-badge">14</div>
                  <h3>14. Limitation of Liability</h3>
                  <p>
                    Trade Fare acts as an intermediary and is not liable for flight delays, carrier cancellations, lost baggage in transit, or force majeure events. Trade Fare’s maximum aggregate liability shall not exceed the service fee paid for the booking.
                  </p>
                </div>

                <div className="terms-clause-card" id="term-15">
                  <div className="clause-number-badge">15</div>
                  <h3>15. Contact &amp; Support Inquiries</h3>
                  <div className="terms-contact-footer">
                    <p>For any questions regarding these Terms &amp; Conditions or booking assistance, please contact:</p>
                    <p><strong>Trade Fare Destinations</strong></p>
                    <p>📧 Email: <a href="mailto:explore@skyportdestinations.com">explore@skyportdestinations.com</a></p>
                    <p>📞 Phone: <a href="tel:+919646747171">+91-9646747171</a> (India) | <a href="tel:+17782404599">+1-778-240-4599</a> (Canada)</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default TermCondition;
