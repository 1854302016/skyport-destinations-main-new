import React from "react";
import "./DummyDetail.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPlane,
  FaHotel,
  FaBed,
  FaUtensils,
  FaBus,
  FaStar,
  FaCheck,
  FaChevronDown,
  FaRegHeart,
  FaShieldAlt,
  FaHeadset,
  FaSuitcase,
  FaArrowLeft,
  FaCertificate,
  FaRegClock,
  FaPhoneAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";

const DummyDetail = () => {
  return (
    <div className="dummydetail-wrapper">
      {/* Hero Header */}
      <section className="detail-hero-section">
        <div className="hero-overlay-dark"></div>
        <a href="/dummylist" className="back-link">
          <FaArrowLeft /> Back to Packages
        </a>
        <Container>
          <div className="hero-content-inner">
            <span className="hero-tag-gold">Best Seller</span>
            <h1 className="hero-title-main">Santorini Escape</h1>
            <div className="hero-meta-info">
              <span className="meta-item">7 Nights / 8 Days</span>
              <span className="meta-item">
                <span>•</span> 2 Travelers
              </span>
            </div>

            <div className="hero-features-row">
              <div className="feature-item-hero">
                <FaPlane className="feature-icon-hero" />
                <div className="feature-text-hero">
                  <span className="feature-label-hero">Flights</span>
                  <span className="feature-value-hero">Round Trip</span>
                </div>
              </div>
              <div className="feature-item-hero">
                <FaHotel className="feature-icon-hero" />
                <div className="feature-text-hero">
                  <span className="feature-label-hero">Hotel</span>
                  <span className="feature-value-hero">7 Nights Stay</span>
                </div>
              </div>
              <div className="feature-item-hero">
                <FaBed className="feature-icon-hero" />
                <div className="feature-text-hero">
                  <span className="feature-label-hero">Room</span>
                  <span className="feature-value-hero">1 Room</span>
                </div>
              </div>
              <div className="feature-item-hero">
                <FaUtensils className="feature-icon-hero" />
                <div className="feature-text-hero">
                  <span className="feature-label-hero">Meals</span>
                  <span className="feature-value-hero">Breakfast</span>
                </div>
              </div>
              <div className="feature-item-hero">
                <FaBus className="feature-icon-hero" />
                <div className="feature-text-hero">
                  <span className="feature-label-hero">Transfers</span>
                  <span className="feature-value-hero">Not Included</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tab Navigation */}
      <nav className="detail-tabs-nav">
        <Container>
          <div className="tabs-container">
            <div className="nav-tab-item active">
              <FaPlane className="tab-icon-small" /> Flights
            </div>
            <div className="nav-tab-item">
              <FaHotel className="tab-icon-small" /> Hotel
            </div>
            <div className="nav-tab-item">
              <FaBed className="tab-icon-small" /> Room & Board
            </div>
            <div className="nav-tab-item">
              <HiOutlineUserGroup className="tab-icon-small" /> Experiences
            </div>
            <div className="nav-tab-item">
              <FaSuitcase className="tab-icon-small" /> Summary
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <section className="main-detail-content">
        <Container>
          <Row>
            {/* Left Column: Selection Details */}
            <Col md={8}>
              
              <div className="section-step">
                <div className="step-header">
                  <div className="step-number">1</div>
                  <div className="step-title-box">
                    <h2>Your Flight</h2>
                    <p>Select your preferred flight option.</p>
                  </div>
                </div>

                {/* Selected Flight */}
                <div className="selection-card selected">
                  <div className="card-status-badge">
                    <FaCheck /> Currently Selected
                  </div>
                  <div className="card-body-flex">
                    <div className="airline-info">
                      <div className="airline-logo-box">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/American_Airlines_logo_2013.svg/1200px-American_Airlines_logo_2013.svg.png"
                          alt="AA"
                        />
                      </div>
                      <div className="airline-name-box">
                        <h4>American Airlines</h4>
                        <span className="best-value-tag">Best Value</span>
                      </div>
                    </div>
                    <div className="flight-times-row">
                      <div className="time-block">
                        <span className="airport-code">JFK</span>
                        <div className="time-val">10:20 AM</div>
                        <div className="date-val">May 20, 2025</div>
                      </div>
                      <div className="flight-duration-line">
                        <span className="duration-text">9h 45m</span>
                        <div className="line-art"></div>
                        <span className="duration-text">Non-stop</span>
                      </div>
                      <div className="time-block">
                        <span className="airport-code">JTR</span>
                        <div className="time-val">
                          04:05 AM <sup>+1</sup>
                        </div>
                        <div className="date-val">May 21, 2025</div>
                      </div>
                    </div>
                    <div className="price-select-box">
                      <div className="price-status">Included</div>
                      <div className="price-diff">$0</div>
                    </div>
                  </div>
                </div>

                {/* Other Flight Options */}
                <p className="other-options-label">Other Flight Options</p>
                <div className="selection-card">
                  <div className="card-body-flex">
                    <div className="airline-info">
                      <div className="airline-logo-box">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Delta_logo_2013.svg/1200px-Delta_logo_2013.svg.png"
                          alt="Delta"
                        />
                      </div>
                      <div className="airline-name-box">
                        <h4>Delta Air Lines</h4>
                      </div>
                    </div>
                    <div className="flight-times-row">
                      <div className="time-block">
                        <span className="airport-code">JFK</span>
                        <div className="time-val">07:15 AM</div>
                      </div>
                      <div className="flight-duration-line">
                        <span className="duration-text">9h 55m</span>
                        <div className="line-art"></div>
                        <span className="duration-text">Non-stop</span>
                      </div>
                      <div className="time-block">
                        <span className="airport-code">JTR</span>
                        <div className="time-val">
                          01:10 AM <sup>+1</sup>
                        </div>
                      </div>
                    </div>
                    <div className="price-select-box">
                      <div className="price-diff">+ $120</div>
                      <button className="select-item-btn">Select</button>
                    </div>
                  </div>
                </div>

                <div className="selection-card">
                  <div className="card-body-flex">
                    <div className="airline-info">
                      <div className="airline-logo-box">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/JetBlue_Airways_logo_2022.svg/1200px-JetBlue_Airways_logo_2022.svg.png"
                          alt="JetBlue"
                        />
                      </div>
                      <div className="airline-name-box">
                        <h4>JetBlue Airways</h4>
                      </div>
                    </div>
                    <div className="flight-times-row">
                      <div className="time-block">
                        <span className="airport-code">JFK</span>
                        <div className="time-val">11:30 AM</div>
                      </div>
                      <div className="flight-duration-line">
                        <span className="duration-text">14h 20m</span>
                        <div className="line-art"></div>
                        <span className="duration-text">1 Stop</span>
                      </div>
                      <div className="time-block">
                        <span className="airport-code">JTR</span>
                        <div className="time-val">
                          07:50 AM <sup>+1</sup>
                        </div>
                      </div>
                    </div>
                    <div className="price-select-box">
                      <div className="price-diff">- $80</div>
                      <button className="select-item-btn">Select</button>
                    </div>
                  </div>
                </div>

                <div className="view-more-center">
                  <button className="view-more-btn">
                    View More Flights <FaChevronDown />
                  </button>
                </div>
              </div>

              
              <div className="section-step">
                <div className="step-header">
                  <div className="step-number">2</div>
                  <div className="step-title-box">
                    <h2>Your Hotel</h2>
                    <p>Select your preferred hotel option.</p>
                  </div>
                </div>

                <div className="selection-card selected">
                  <div className="card-status-badge">
                    <FaCheck /> Currently Selected
                  </div>
                  <div className="hotel-card-flex">
                    <img
                      src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80"
                      alt="Aegean Blue"
                      className="hotel-img-small"
                    />
                    <div className="hotel-details-mid">
                      <div className="hotel-name-row">
                        <h3>Aegean Blue Suites</h3>
                        <div className="stars-gold">
                          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                      </div>
                      <p className="hotel-loc">Imerovigli, Santorini</p>
                      <div className="hotel-features-small">
                        <div className="h-feat">
                          <FaRegClock /> 7 Nights
                        </div>
                        <div className="h-feat">
                          <FaUtensils /> Breakfast Included
                        </div>
                      </div>
                    </div>
                    <div className="price-select-box">
                      <div className="price-status">Included</div>
                      <div className="price-diff">$0</div>
                    </div>
                  </div>
                </div>

                <p className="other-options-label">Other Hotel Options</p>
                <div className="selection-card">
                  <div className="hotel-card-flex">
                    <img
                      src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80"
                      alt="Canaves Oia"
                      className="hotel-img-small"
                    />
                    <div className="hotel-details-mid">
                      <div className="hotel-name-row">
                        <h3>Canaves Oia Suites</h3>
                        <div className="stars-gold">
                          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                      </div>
                      <p className="hotel-loc">Oia, Santorini</p>
                    </div>
                    <div className="price-select-box">
                      <div className="price-diff">+ $450</div>
                      <button className="select-item-btn">Select</button>
                    </div>
                  </div>
                </div>

                <div className="view-more-center">
                  <button className="view-more-btn">
                    View More Hotels <FaChevronDown />
                  </button>
                </div>
              </div>
            </Col>

            {/* Right Column: Sidebar */}
            <Col md={4}>
              <div className="sidebar-sticky-box">
                <div className="package-summary-card">
                  <h2 className="summary-title-main">Your Package Summary</h2>
                  <div className="summary-img-box">
                    <img
                      src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80"
                      alt="Santorini"
                    />
                    <div className="card-status-badge">Best Seller</div>
                  </div>
                  <div className="summary-pkg-info">
                    <h3>Santorini Escape</h3>
                    <p>7 Nights / 8 Days</p>
                    <p>2 Travelers, 1 Room</p>
                  </div>

                  <button className="save-pkg-btn">
                    <FaRegHeart /> Save Package
                  </button>

                  <div className="price-breakdown-box">
                    <div className="breakdown-row">
                      <span>Flight (Included)</span>
                      <span>$0</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Hotel (7 Nights)</span>
                      <span>$0</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Taxes & Fees</span>
                      <span>$299</span>
                    </div>
                  </div>

                  <div className="total-price-box">
                    <div className="total-label-row">
                      <span className="total-txt">Total Package Price</span>
                      <span className="total-amt">$1,299</span>
                    </div>
                    <div className="per-person-txt">$649.50 per person</div>
                  </div>

                  <button className="continue-booking-btn">
                    Continue to Traveler Details →
                  </button>

                  <div className="secure-tag">
                    <BiLockAlt /> Secure Booking Guaranteed
                  </div>

                  {/* Why Book With Us */}
                  <div className="why-book-sidebar">
                    <h4 className="why-title">Why Book With Us?</h4>
                    <div className="why-item">
                      <FaCertificate className="why-icon-box" />
                      <div className="why-text">
                        <h5>Best Price Guarantee</h5>
                        <p>We match any lower price you find elsewhere.</p>
                      </div>
                    </div>
                    <div className="why-item">
                      <FaRegClock className="why-icon-box" />
                      <div className="why-text">
                        <h5>Flexible Booking</h5>
                        <p>Change or cancel your trip with ease.</p>
                      </div>
                    </div>
                    <div className="why-item">
                      <FaHeadset className="why-icon-box" />
                      <div className="why-text">
                        <h5>24/7 Support</h5>
                        <p>Our travel experts are always here for you.</p>
                      </div>
                    </div>
                  </div>

                  {/* Need Help */}
                  <div className="need-help-sidebar">
                    <h4 className="help-title">Need Help?</h4>
                    <p className="help-p">
                      Our travel experts are here for you.
                    </p>
                    <div className="help-contact-info">
                      <div className="contact-row-small">
                        <FaPhoneAlt /> +592 123 4567
                      </div>
                      <div className="contact-row-small">
                        <FaRegCommentDots /> Live Chat
                      </div>
                    </div>
                    <img
                      src="https://img.freepik.com/free-photo/beautiful-smiling-business-woman-wearing-headset-working-as-customer-service-operator_231208-11115.jpg"
                      alt="Agent"
                      className="support-agent-img"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Bar */}
      <section className="bottom-features-dark">
        <Container>
          <div className="feat-item-row">
            <div className="feat-col-small">
              <FaSuitcase className="feat-icon-gold" />
              <div className="feat-txt-small">
                <strong>Handpicked Packages</strong>
                <span>Curated for you</span>
              </div>
            </div>
            <div className="feat-col-small">
              <FaShieldAlt className="feat-icon-gold" />
              <div className="feat-txt-small">
                <strong>Flexible Options</strong>
                <span>Customize your perfect trip</span>
              </div>
            </div>
            <div className="feat-col-small">
              <FaCheck className="feat-icon-gold" />
              <div className="feat-txt-small">
                <strong>Instant Confirmation</strong>
                <span>Book now, travel worry-free</span>
              </div>
            </div>
            <div className="feat-col-small">
              <HiOutlineUserGroup className="feat-icon-gold" />
              <div className="feat-txt-small">
                <strong>Thousands of Happy Travelers</strong>
                <span>Join our global community</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DummyDetail;
