import React from "react";
import "./DummyForm.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaStar,
  FaPlane,
  FaUsers,
  FaHotel,
  FaHeadset,
  FaCertificate,
  FaShieldAlt,
  FaSuitcase,
  FaTree,
  FaHeart,
  FaExchangeAlt,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DummyForm = () => {
    const navigate=useNavigate()
  return (
    <div className="dummy-page-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <span className="hero-subtitle">
              CURATED JOURNEYS. UNMATCHED VALUE.
            </span>
            <h1 className="hero-title">
              Extraordinary <br />
              Packages.
            </h1>
            <p className="hero-tagline">More of what matters</p>
            <p className="hero-description">
              Handpicked flights and stays. <br />
              Unbeatable prices. One seamless experience.
            </p>

            <div className="hero-trust-badges">
              <div className="trust-badge">
                <div className="badge-icon-circle">
                  <FaCertificate className="badge-icon" />
                </div>
                <span>
                  Best Price <br />
                  Guarantee
                </span>
              </div>
              <div className="trust-badge">
                <div className="badge-icon-circle">
                  <FaHeadset className="badge-icon" />
                </div>
                <span>
                  24/7 Expert <br />
                  Support
                </span>
              </div>
              <div className="trust-badge">
                <div className="badge-icon-circle">
                  <FaShieldAlt className="badge-icon" />
                </div>
                <span>
                  Secure & Easy <br />
                  Booking
                </span>
              </div>
            </div>
          </div>
        </Container>

        {/* Exclusive Member Benefits Card */}
        <div className="member-benefits-card">
          <div className="member-card-header">
            <span className="crown-icon">👑</span>
            <div className="exclusive-text">EXCLUSIVE MEMBER BENEFITS</div>
          </div>
          <p>Unlock special deals and member-only savings</p>
          <button className="join-btn">Join for Free</button>
        </div>

        {/* Search Form */}
        <div className="search-form-container">
          <div className="search-tabs">
            <div className="search-tab active">
              <FaSuitcase className="tab-icon" />
              <span>PACKAGES</span>
            </div>
            <div className="search-tab-tagline">
              Your Journey, Perfectly Paired
            </div>
          </div>

          <div className="search-form-body">
            <div className="search-fields-row">
              <div className="search-field-group location-group">
                <div className="search-field">
                  <div className="field-icon-label">
                    <HiOutlineLocationMarker className="field-icon" />
                    <div className="label-content">
                      <span className="field-label">From</span>
                      <input type="text" placeholder="Any City" />
                    </div>
                  </div>
                </div>
                <div className="swap-icon">
                  <FaExchangeAlt />
                </div>
                <div className="search-field">
                  <div className="field-icon-label">
                    <HiOutlineLocationMarker className="field-icon" />
                    <div className="label-content">
                      <span className="field-label">To</span>
                      <input type="text" placeholder="Any Destination" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="search-field-group date-group">
                <div className="search-field">
                  <div className="field-icon-label">
                    <HiOutlineCalendar className="field-icon" />
                    <div className="label-content">
                      <span className="field-label">Check-in</span>
                      <input type="text" placeholder="Select date" />
                    </div>
                  </div>
                </div>
                <div className="search-field">
                  <div className="field-icon-label">
                    <HiOutlineCalendar className="field-icon" />
                    <div className="label-content">
                      <span className="field-label">Check-out</span>
                      <input type="text" placeholder="Select date" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="search-field travelers-field">
                <div className="field-icon-label">
                  <HiOutlineUserGroup className="field-icon" />
                  <div className="label-content">
                    <span className="field-label">Travelers & Rooms</span>
                    <div className="travelers-select">
                      <span>2 Travelers, 1 Room</span>
                      <BiChevronDown className="chevron-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-footer">
              <div className="trip-types">
                <span className="trip-type-label">Trip Type (Optional)</span>
                <div className="type-options">
                  <button className="type-opt active">
                    <FaTree className="opt-icon" /> Leisure
                  </button>
                  <button className="type-opt">
                    <FaHeart className="opt-icon" /> Romantic
                  </button>
                  <button className="type-opt">
                    <FaUsers className="opt-icon" /> Family
                  </button>
                </div>
              </div>
              <button className="main-search-btn" onClick={()=>navigate('/dummylist')}>
                Search Packages <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="features-bar">
        <Container>
          <Row>
            <Col md={3} className="feature-item">
              <div className="feature-icon-box">
                <FaMapMarkerAlt />
              </div>
              <div className="feature-text">
                <strong>Handpicked Packages</strong>
                <span>Curated for you</span>
              </div>
            </Col>
            <Col md={3} className="feature-item">
              <div className="feature-icon-box">
                <FaCalendarAlt />
              </div>
              <div className="feature-text">
                <strong>Flexible Options</strong>
                <span>Build your perfect trip</span>
              </div>
            </Col>
            <Col md={3} className="feature-item">
              <div className="feature-icon-box">
                <FaCertificate />
              </div>
              <div className="feature-text">
                <strong>Instant Confirmation</strong>
                <span>Book with confidence</span>
              </div>
            </Col>
            <Col md={3} className="feature-item">
              <div className="feature-icon-box">
                <FaHeadset />
              </div>
              <div className="feature-text">
                <strong>24/7 Assistance</strong>
                <span>We're here for you</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <Container>
          <div className="section-header">
            <div className="header-left">
              <span className="section-subtitle">POPULAR DESTINATIONS</span>
              <h2 className="section-title">
                Dream Packages. Unforgettable Places.
              </h2>
            </div>
            <button className="view-all-btn">
              View All Destinations <FaChevronRight />
            </button>
          </div>

          <Row className="destination-grid">
            {[
              {
                name: "Santorini, Greece",
                price: "799",
                img: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
              },
              {
                name: "Maldives",
                price: "999",
                img: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
              },
              {
                name: "Dubai, UAE",
                price: "899",
                img: "https://images.pexels.com/photos/325191/pexels-photo-325191.jpeg",
              },
              {
                name: "Bali, Indonesia",
                price: "699",
                img: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
              },
              {
                name: "Paris, France",
                price: "749",
                img: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
              },
            ].map((item, index) => (
              <Col key={index} className="destination-card-col">
                <div className="dest-card">
                  <div className="dest-img-box">
                    <img src={item.img} alt={item.name} />
                    <div className="price-tag">From ${item.price}</div>
                    <button className="heart-btn">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <div className="dest-info">
                    <h3>{item.name}</h3>
                    <p>Flights + Hotel</p>
                    <div className="dest-rating">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar key={s} />
                        ))}
                      </div>
                      <span className="rating-num">4.8</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
            <div className="grid-nav-btn next">
              <FaChevronRight />
            </div>
          </Row>
        </Container>
      </section>

      {/* Stats Footer Bar */}
      <div className="stats-bar">
        <Container>
          <div className="stats-flex">
            <div className="trusted-badge">
              <div className="badge-inner">
                <div className="stars-row">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <strong>TRUSTED BY</strong>
                <span className="highlight">THOUSANDS</span>
                <span className="small">OF HAPPY TRAVELERS</span>
              </div>
            </div>
            <div className="stat-item">
              <FaPlane className="stat-icon" />
              <div className="stat-text">
                <strong>500+</strong>
                <span>Airlines Worldwide</span>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div className="stat-text">
                <strong>1M+</strong>
                <span>Happy Travelers</span>
              </div>
            </div>
            <div className="stat-item">
              <FaHotel className="stat-icon" />
              <div className="stat-text">
                <strong>200K+</strong>
                <span>Hotels Worldwide</span>
              </div>
            </div>
            <div className="stat-item">
              <FaHeadset className="stat-icon" />
              <div className="stat-text">
                <strong>24/7</strong>
                <span>Customer Support</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DummyForm;
