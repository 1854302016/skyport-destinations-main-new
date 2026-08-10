import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaShieldHalved,
  FaFileLines,
  FaLock,
  FaUserCheck,
  FaEnvelope,
  FaBuilding,
  FaCircleCheck,
  FaArrowRight,
} from "react-icons/fa6";
import "./PrivacyPolicy.css";

const sections = [
  { id: "sec-1", title: "1. Scope & Applicability" },
  { id: "sec-2", title: "2. Data Categories Collected" },
  { id: "sec-3", title: "3. Legal Grounds for Processing" },
  { id: "sec-4", title: "4. Purpose of Data Processing" },
  { id: "sec-5", title: "5. Automated Decision-Making" },
  { id: "sec-6", title: "6. Third-Party Disclosures" },
  { id: "sec-7", title: "7. International Data Transfers" },
  { id: "sec-8", title: "8. Data Retention & Archiving" },
  { id: "sec-9", title: "9. Your Data Subject Rights" },
  { id: "sec-10", title: "10. Security & Encryption" },
  { id: "sec-11", title: "11. Children’s Privacy" },
  { id: "sec-12", title: "12. Cookies & Tracking" },
  { id: "sec-13", title: "13. Marketing Communications" },
  { id: "sec-14", title: "14. External Links" },
  { id: "sec-15", title: "15. Limitation of Liability" },
  { id: "sec-16", title: "16. Policy Amendments" },
  { id: "sec-17", title: "17. Contact & DPO" },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("sec-1");

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="legal-page-wrapper">
      {/* 1. Hero Header */}
      <section className="legal-hero-section">
        <div className="legal-hero-bg-overlay"></div>
        <Container className="position-relative z-index-2">
          <div className="legal-hero-content text-center">
            <div className="legal-hero-badge">
              <FaShieldHalved className="me-2" /> TRUST &amp; DATA PRIVACY
            </div>
            <h1 className="legal-hero-title">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="legal-hero-subtitle">
              Trade Fare Destinations is committed to protecting your personal information and handling your data with full transparency, security, and integrity.
            </p>
            {/* <div className="legal-meta-strip">
              <span><strong>Effective Date:</strong> January 2026</span>
              <span className="meta-dot">•</span>
              <span><strong>Version:</strong> 2.4 (GDPR &amp; Global Compliant)</span>
            </div> */}
          </div>
        </Container>
      </section>

      {/* 2. Main Policy Content Layout */}
      <section className="legal-content-section py-6">
        <Container>
          <Row className="g-5">
            {/* Sticky Table of Contents Sidebar */}
            <Col lg={4} className="d-none d-lg-block">
              <div className="legal-sticky-sidebar">
                <div className="sidebar-header">
                  <FaFileLines className="me-2 text-primary" /> Table of Contents
                </div>
                <ul className="sidebar-nav-list">
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <button
                        className={`sidebar-nav-btn ${activeSection === sec.id ? "active" : ""}`}
                        onClick={() => scrollToSection(sec.id)}
                      >
                        {sec.title}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="sidebar-contact-card mt-4">
                  <FaEnvelope className="card-icon" />
                  <h5>Data Privacy Office</h5>
                  <p>Have questions regarding your personal information?</p>
                  <a href="mailto:explore@skyportdestinations.com" className="btn-sidebar-contact">
                    Contact DPO <FaArrowRight className="ms-1" />
                  </a>
                </div>
              </div>
            </Col>

            {/* Main Policy Clauses */}
            <Col lg={8}>
              <div className="legal-clauses-wrapper">
                {/* Intro Card */}
                <div className="legal-intro-card">
                  <p>
                    <strong>Trade Fare Destinations</strong> (“Trade Fare,” “we,” “us,” or “our”) is committed to protecting the privacy and confidentiality of all users who interact with our digital platforms and services. This Privacy Policy explains in a legally comprehensive, transparent, and structured manner how Trade Fare collects, processes, discloses, retains, and safeguards personal information in accordance with applicable data protection laws and international best practices, including GDPR standards.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="policy-clause-card" id="sec-1">
                  <div className="clause-number-badge">01</div>
                  <h3>1. Scope and Applicability</h3>
                  <p>
                    This Privacy Policy governs the collection and use of personal data by Trade Fare Destinations through its website, mobile applications, affiliated booking systems, customer service channels, and any digital or offline interaction directly involving Trade Fare. It applies to all users worldwide and covers:
                  </p>
                  <ul className="styled-policy-list">
                    <li><FaCircleCheck className="list-icon" /> Individuals making flight bookings via Trade Fare</li>
                    <li><FaCircleCheck className="list-icon" /> Visitors interacting with our platforms (with or without registration)</li>
                    <li><FaCircleCheck className="list-icon" /> Customers receiving transactional, promotional, or support communications</li>
                    <li><FaCircleCheck className="list-icon" /> Individuals participating in travel surveys, promotions, or contests</li>
                    <li><FaCircleCheck className="list-icon" /> Recipients of our travel newsletters and fare alert campaigns</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="policy-clause-card" id="sec-2">
                  <div className="clause-number-badge">02</div>
                  <h3>2. Data Categories Collected</h3>
                  <p>
                    Trade Fare collects personal information necessary for the provision of flight reservations, ticket issuance, and legal compliance.
                  </p>
                  <div className="data-categories-grid">
                    <div className="category-item">
                      <strong>a. Personal Identification:</strong> Full name, date of birth, gender, passport and national travel document details.
                    </div>
                    <div className="category-item">
                      <strong>b. Contact &amp; Account Info:</strong> Email address, phone number, billing address, encrypted account credentials.
                    </div>
                    <div className="category-item">
                      <strong>c. Payment Information:</strong> Tokenized card details, cardholder name, and transaction receipts (we never store raw CVV codes).
                    </div>
                    <div className="category-item">
                      <strong>d. Travel &amp; Booking Data:</strong> Departure/arrival airports, flight numbers, cabin class, passenger manifest details.
                    </div>
                    <div className="category-item">
                      <strong>e. Technical &amp; Device Data:</strong> IP address, device model, browser version, operating system, and geolocation (if permitted).
                    </div>
                    <div className="category-item">
                      <strong>f. Communication Records:</strong> Support tickets, call logs, email correspondence, and customer reviews.
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="policy-clause-card" id="sec-3">
                  <div className="clause-number-badge">03</div>
                  <h3>3. Legal Grounds for Processing</h3>
                  <p>We process your personal data strictly under authorized lawful bases:</p>
                  <ul className="styled-policy-list">
                    <li><strong>Contractual Necessity:</strong> To fulfill your flight bookings, issue e-tickets, and deliver flight confirmations.</li>
                    <li><strong>Legal Obligation:</strong> Compliance with aviation regulations, customs, tax, immigration, and anti-money laundering laws.</li>
                    <li><strong>Legitimate Interests:</strong> Platform security, fraud prevention, service analytics, and customer support.</li>
                    <li><strong>Consent:</strong> When you voluntarily opt into marketing newsletters and custom notifications.</li>
                    <li><strong>Vital Interests:</strong> In emergency situations requiring immediate itinerary coordination or safety notifications.</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="policy-clause-card" id="sec-4">
                  <div className="clause-number-badge">04</div>
                  <h3>4. Purpose of Data Processing</h3>
                  <ul className="styled-policy-list">
                    <li><FaCircleCheck className="list-icon" /> Facilitate real-time flight bookings, modifications, and ticket delivery.</li>
                    <li><FaCircleCheck className="list-icon" /> Process payments through verified, secure payment gateways.</li>
                    <li><FaCircleCheck className="list-icon" /> Provide live 24/7 customer support and flight schedule alerts.</li>
                    <li><FaCircleCheck className="list-icon" /> Perform continuous fraud screening and cybersecurity monitoring.</li>
                    <li><FaCircleCheck className="list-icon" /> Comply with international civil aviation and border authority requirements.</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div className="policy-clause-card" id="sec-5">
                  <div className="clause-number-badge">05</div>
                  <h3>5. Automated Decision-Making &amp; Profiling</h3>
                  <p>
                    Trade Fare employs limited automated systems for fraud prevention and fare search optimization. We guarantee that automated systems with legal or significant traveler impact are subject to human review upon request.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="policy-clause-card" id="sec-6">
                  <div className="clause-number-badge">06</div>
                  <h3>6. Third-Party Disclosures</h3>
                  <p>
                    Trade Fare does not sell, rent, or trade your personal data. We disclose data solely to authorized third parties essential for flight fulfillment:
                  </p>
                  <div className="modern-table-responsive">
                    <table className="modern-legal-table">
                      <thead>
                        <tr>
                          <th>Recipient Category</th>
                          <th>Purpose</th>
                          <th>Safeguards</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Airlines &amp; Travel Operators</strong></td>
                          <td>Booking fulfillment &amp; passenger manifest submission</td>
                          <td>Binding data contracts &amp; TLS encryption</td>
                        </tr>
                        <tr>
                          <td><strong>Payment Service Providers</strong></td>
                          <td>Payment authorization &amp; billing validation</td>
                          <td>PCI-DSS compliance &amp; tokenization</td>
                        </tr>
                        <tr>
                          <td><strong>Government &amp; Aviation Authorities</strong></td>
                          <td>Border control, immigration &amp; customs</td>
                          <td>Statutory legal mandates &amp; data minimization</td>
                        </tr>
                        <tr>
                          <td><strong>Cloud &amp; Infrastructure Providers</strong></td>
                          <td>Secure database hosting &amp; system uptime</td>
                          <td>SOC2 Type II, encrypted cloud storage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="policy-clause-card" id="sec-7">
                  <div className="clause-number-badge">07</div>
                  <h3>7. International Data Transfers</h3>
                  <p>
                    Because international travel spans cross-border territories, your data may be transferred to global airline distribution systems. We enforce Standard Contractual Clauses (SCCs) and bank-grade encryption across all cross-border transactions.
                  </p>
                </div>

                {/* Section 8 */}
                <div className="policy-clause-card" id="sec-8">
                  <div className="clause-number-badge">08</div>
                  <h3>8. Data Retention &amp; Archiving</h3>
                  <div className="modern-table-responsive">
                    <table className="modern-legal-table">
                      <thead>
                        <tr>
                          <th>Data Type</th>
                          <th>Retention Period</th>
                          <th>Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Flight Booking Records</strong></td>
                          <td>7 Years</td>
                          <td>Aviation, tax, and statutory financial audits</td>
                        </tr>
                        <tr>
                          <td><strong>Payment Receipts</strong></td>
                          <td>7 Years</td>
                          <td>Anti-fraud, dispute &amp; chargeback protection</td>
                        </tr>
                        <tr>
                          <td><strong>Customer Communications</strong></td>
                          <td>3 Years</td>
                          <td>Quality assurance &amp; support continuity</td>
                        </tr>
                        <tr>
                          <td><strong>Technical Logs</strong></td>
                          <td>12–24 Months</td>
                          <td>Cybersecurity &amp; analytics optimization</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 9 */}
                <div className="policy-clause-card" id="sec-9">
                  <div className="clause-number-badge">09</div>
                  <h3>9. Your Data Subject Rights</h3>
                  <p>Under international data protection frameworks, you have full control over your data:</p>
                  <div className="rights-badge-grid">
                    <div className="right-pill">✅ Right of Access</div>
                    <div className="right-pill">✏️ Right to Rectification</div>
                    <div className="right-pill">🗑️ Right to Erasure</div>
                    <div className="right-pill">✋ Right to Restrict Processing</div>
                    <div className="right-pill">📦 Right to Data Portability</div>
                    <div className="right-pill">🚫 Right to Object</div>
                  </div>
                  <p className="mt-3">
                    To exercise any of these rights, contact us at <a href="mailto:explore@skyportdestinations.com">explore@skyportdestinations.com</a>.
                  </p>
                </div>

                {/* Section 10 */}
                <div className="policy-clause-card" id="sec-10">
                  <div className="clause-number-badge">10</div>
                  <h3>10. Data Security &amp; Encryption</h3>
                  <p>
                    We implement modern enterprise-grade security protocols, including 256-bit TLS encryption, strict role-based access control (RBAC), daily automated vulnerability assessments, and DDoS mitigation.
                  </p>
                </div>

                {/* Section 11 - 17 Summary Grid */}
                <div className="policy-clause-card" id="sec-11">
                  <div className="clause-number-badge">11</div>
                  <h3>11. Children’s Privacy</h3>
                  <p>
                    We do not knowingly collect personal information from individuals under 16 years without verified parental or legal guardian consent during flight booking.
                  </p>
                </div>

                <div className="policy-clause-card" id="sec-12">
                  <div className="clause-number-badge">12</div>
                  <h3>12. Cookies &amp; Tracking</h3>
                  <p>
                    We use functional, analytical, and preference cookies to deliver a responsive booking experience. You can modify your cookie settings at any time via your browser.
                  </p>
                </div>

                <div className="policy-clause-card" id="sec-17">
                  <div className="clause-number-badge">17</div>
                  <h3>17. Contact Our Data Protection Officer</h3>
                  <div className="dpo-contact-box">
                    <h4>Trade Fare Destinations</h4>
                    <p><strong>Head Office:</strong> GROUND FLOOR, Shop No 32, Bus Stand, Goniana Mandi Bathinda, Punjab, India - 151201</p>
                    <p><strong>Canada Branch:</strong> Unit 201-7743 128 street West newton, Surrey BC, Canada V3W 1L4</p>
                    <p><strong>Email:</strong> <a href="mailto:explore@skyportdestinations.com">explore@skyportdestinations.com</a></p>
                    <p><strong>Helpline:</strong> <a href="tel:+919646747171">+91-9646747171</a> / <a href="tel:+17782404599">+1-778-240-4599</a></p>
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

export default PrivacyPolicy;
