import React from "react";
import "./DummyList.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaStar,
  FaPlane,
  FaHotel,
  FaRegHeart,
  FaCrown,
  FaChevronRight,
  FaChevronDown,
  FaSuitcase,
  FaCertificate,
  FaHeadset,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DummyList = () => {
    const navigate=useNavigate()
  const packages = [
    {
      id: 1,
      title: "Santorini Escape",
      subtitle: "Relax, Unwind, Experience Paradise.",
      tag: "Best Seller",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      duration: "8 Days / 7 Nights",
      flights: "Round Trip Flights",
      route: "JFK → JTR (Non-stop)",
      hotel: "Aegean Blue Suites",
      hotelStars: 5,
      mealPlan: "Breakfast Included",
      priceBadge: "Great Value",
      totalPrice: "1,299",
      perPerson: "650",
    },
    {
      id: 2,
      title: "Luxury Santorini Retreat",
      subtitle: "Indulge in luxury. Live the dream.",
      tag: "Luxury Choice",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
      duration: "8 Days / 7 Nights",
      flights: "Round Trip Flights",
      route: "JFK → JTR (Non-stop)",
      hotel: "Canaves Oia Suites",
      hotelStars: 5,
      mealPlan: "Breakfast Included",
      priceBadge: "Luxury Choice",
      totalPrice: "1,899",
      perPerson: "950",
    },
    {
      id: 3,
      title: "Santorini Romantic Getaway",
      subtitle: "Perfect moments. Made together.",
      tag: "Popular Pick",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      duration: "8 Days / 7 Nights",
      flights: "Round Trip Flights",
      route: "JFK → JTR (1 Stop)",
      hotel: "Katikies Garden Hotel",
      hotelStars: 5,
      mealPlan: "Breakfast Included",
      priceBadge: "Popular Pick",
      totalPrice: "1,499",
      perPerson: "750",
    },
    {
      id: 4,
      title: "Santorini Budget Escape",
      subtitle: "Smart choice. Unforgettable views.",
      tag: "Budget Friendly",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      duration: "8 Days / 7 Nights",
      flights: "Round Trip Flights",
      route: "JFK → JTR (1 Stop)",
      hotel: "Anatoli Hotel",
      hotelStars: 3,
      mealPlan: "Breakfast Included",
      priceBadge: "Budget Friendly",
      totalPrice: "1,099",
      perPerson: "550",
    },
  ];

  return (
    <div className="dummylist-wrapper">
      {/* Header Section */}
      <section className="list-header-section">
        <div className="header-overlay"></div>
        <Container>
          <div className="header-content">
            <span className="header-subtitle">Packages to</span>
            <h1 className="header-title">Santorini, Greece</h1>
            <div className="header-tagline">
              <FaSuitcase className="tagline-icon" />
              <span>Handpicked. Perfectly Paired.</span>
              <span className="tagline-gold">Priceless Experiences.</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Top Info Bar */}
      <div className="top-info-bar">
        <Container>
          <div className="info-items-row">
            <div className="info-item">
              <HiOutlineLocationMarker className="info-icon" />
              <div className="info-text">
                <span className="info-label">From</span>
                <span className="info-value">New York (JFK)</span>
              </div>
            </div>
            <div className="info-item">
              <HiOutlineLocationMarker className="info-icon" />
              <div className="info-text">
                <span className="info-label">To</span>
                <span className="info-value">Santorini (JTR)</span>
              </div>
            </div>
            <div className="info-item">
              <HiOutlineCalendar className="info-icon" />
              <div className="info-text">
                <span className="info-label">Dates</span>
                <span className="info-value">May 20 - May 27, 2025</span>
              </div>
            </div>
            <div className="info-item">
              <HiOutlineUserGroup className="info-icon" />
              <div className="info-text">
                <span className="info-label">Travelers & Rooms</span>
                <span className="info-value">2 Travelers, 1 Room</span>
              </div>
            </div>
            <button className="modify-btn">
              <BiEdit /> Modify Search
            </button>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <section className="main-results-section">
        <Container>
          <Row>
            {/* Sidebar Filters */}
            <Col md={3}>
              <div className="filters-sidebar">
                <div className="filter-header">
                  <h3>Filter Your Results</h3>
                  <button className="clear-btn">Clear All</button>
                </div>

                <div className="filter-group">
                  <span className="filter-title">
                    Budget (Total Package Price)
                  </span>
                  <div className="range-slider">
                    <div
                      className="slider-handle"
                      style={{ left: "20%" }}
                    ></div>
                    <div
                      className="slider-handle"
                      style={{ left: "80%" }}
                    ></div>
                  </div>
                  <div className="range-values">
                    <span>$1,000</span>
                    <span>$5,000+</span>
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-title">Hotel Category</span>
                  <div className="checkbox-list">
                    {[5, 4, 3, 2].map((stars) => (
                      <label key={stars} className="checkbox-item">
                        <input type="checkbox" defaultChecked={stars === 5} />
                        <span>{stars} Stars</span>
                        <div className="star-rating-filter">
                          {[...Array(stars)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </label>
                    ))}
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>2 Stars & Below</span>
                    </label>
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-title">Board Type</span>
                  <div className="checkbox-list">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>Any</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Breakfast Included</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Half Board</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Full Board</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>All Inclusive</span>
                    </label>
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-title">Number of Stops</span>
                  <div className="checkbox-list">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>Any</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Non-stop</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>1 Stop</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>2+ Stops</span>
                    </label>
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-title">Airlines</span>
                  <div className="checkbox-list">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>Any</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Emirates</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Delta Airlines</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Aegean Airlines</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Lufthansa</span>
                    </label>
                  </div>
                  <button className="show-more">
                    Show More <FaChevronDown />
                  </button>
                </div>

                <div className="sidebar-member-card">
                  <FaCrown className="crown-icon" />
                  <h4>Unlock More Savings!</h4>
                  <p>Sign in to access exclusive member prices and deals.</p>
                  <button className="sidebar-login-btn">Login / Sign Up</button>
                </div>
              </div>
            </Col>

            {/* Package Results */}
            <Col md={9}>
              <div className="results-count-bar">
                <div className="count-text">
                  <h2>
                    We found <span>24</span> amazing packages for you
                  </h2>
                  <p className="count-subtext">
                    Prices include flights, hotel, taxes & fees
                  </p>
                </div>
                <div className="sort-by">
                  <span className="sort-label">Sort by:</span>
                  <select className="sort-select">
                    <option>Recommended</option>
                    <option>Price (Lowest)</option>
                    <option>Price (Highest)</option>
                    <option>Duration</option>
                  </select>
                </div>
              </div>

              <div className="packages-list">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="package-card">
                    <div className="card-image-box">
                      <img src={pkg.image} alt={pkg.title} />
                      <div className="best-seller-tag">{pkg.tag}</div>
                      <button className="wishlist-btn">
                        <FaRegHeart />
                      </button>
                      <div className="duration-tag">
                        <FaClock /> {pkg.duration}
                      </div>
                    </div>
                    <div className="card-details-box">
                      <h3 className="card-title">{pkg.title}</h3>
                      <p className="card-subtitle">{pkg.subtitle}</p>

                      <div className="detail-row">
                        <div className="detail-icon-box">
                          <FaPlane />
                        </div>
                        <div className="detail-content">
                          <span className="detail-label">{pkg.flights}</span>
                          <span className="detail-value">{pkg.route}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon-box">
                          <FaHotel />
                        </div>
                        <div className="detail-content">
                          <span className="detail-label">Hotel</span>
                          <span className="detail-value">{pkg.hotel}</span>
                          <div className="stars">
                            {[...Array(pkg.hotelStars)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="meal-plan">{pkg.mealPlan}</div>
                    </div>
                    <div className="card-price-box">
                      <div className="price-badge">{pkg.priceBadge}</div>
                      <div className="price-info">
                        <div className="price-label">Total Package Price</div>
                        <div className="price-amount">${pkg.totalPrice}</div>
                        <div className="price-travelers">for 2 Travelers</div>
                        <div className="per-person">
                          <strong>${pkg.perPerson}</strong> per person
                        </div>
                      </div>
                      <button className="view-package-btn" onClick={()=>navigate(`/dummydetail`)}>
                        View Package <FaChevronRight />
                      </button>
                      <span className="see-details-link">See Details</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Features Bar */}
      <div className="bottom-features-bar">
        <Container>
          <Row>
            <Col md={2}>
              <div className="feature-item-small">
                <FaCertificate className="feature-icon-small" />
                <div className="feature-text-small">
                  <strong>Best Price</strong>
                  <span>Guarantee</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="feature-item-small">
                <FaHeadset className="feature-icon-small" />
                <div className="feature-text-small">
                  <strong>24/7 Expert</strong>
                  <span>Support</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="feature-item-small">
                <FaShieldAlt className="feature-icon-small" />
                <div className="feature-text-small">
                  <strong>Secure & Easy</strong>
                  <span>Booking</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="feature-item-small">
                <HiOutlineCalendar className="feature-icon-small" />
                <div className="feature-text-small">
                  <strong>Flexible</strong>
                  <span>Options</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div className="feature-item-small">
                <FaPlane className="feature-icon-small" />
                <div className="feature-text-small">
                  <strong>Instant</strong>
                  <span>Confirmation</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DummyList;
