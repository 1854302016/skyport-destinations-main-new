import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaRegStar,
  FaStar,
  FaCopy,
  FaCheck,
  FaTag,
  FaPlane,
  FaPercent,
  FaClock,
} from "react-icons/fa6";
import "./GreatDeals.css";

const dealsData = [
  {
    id: 1,
    imgSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Flat $150 Off Flights to the Caribbean & Guyana",
    subtitle: "Applicable on round-trip international flights booked with Trade Fare.",
    code: "CARIB150",
    discount: "$150 OFF",
    category: "flights",
    expiresOn: "Dec 31, 2026",
    ribbon: "EXCLUSIVE",
  },
  {
    id: 2,
    imgSrc: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    title: "Up to 25% Off North America Flights (Canada & USA)",
    subtitle: "Special negotiated airfares to Toronto, Vancouver, NYC, and Miami.",
    code: "FLYGLOBAL25",
    discount: "25% OFF",
    category: "flights",
    expiresOn: "Nov 30, 2026",
    ribbon: "POPULAR",
  },
  {
    id: 3,
    imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    title: "Save $200 on Premium Economy & Business Class",
    subtitle: "Upgrade your international flight experience with luxury lounge perks.",
    code: "LUXURY200",
    discount: "$200 OFF",
    category: "luxury",
    expiresOn: "Oct 15, 2026",
    ribbon: "PREMIUM",
  },
  {
    id: 4,
    imgSrc: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    title: "Flash Deal: $50 Instant Voucher on First Flight Booking",
    subtitle: "New traveler welcome discount valid across all international carriers.",
    code: "WELCOME50",
    discount: "$50 VOUCHER",
    category: "flash",
    expiresOn: "Ongoing 2026",
    ribbon: "FLASH DEAL",
  },
  {
    id: 5,
    imgSrc: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    title: "Family Holiday Pass: 15% Group Flight Savings",
    subtitle: "Book 3 or more passenger tickets together and unlock instant group savings.",
    code: "FAMILYPASS",
    discount: "15% OFF",
    category: "flights",
    expiresOn: "Dec 15, 2026",
    ribbon: "FAMILY",
  },
  {
    id: 6,
    imgSrc: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    title: "Weekend Getaway Discount: $75 Off Direct Flights",
    subtitle: "Spontaneous short trips with zero hidden booking transaction fees.",
    code: "WEEKEND75",
    discount: "$75 OFF",
    category: "flash",
    expiresOn: "Nov 15, 2026",
    ribbon: "LIMITED",
  },
];

const GreatDeals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [copiedCode, setCopiedCode] = useState(null);
  const [favorites, setFavorites] = useState({});

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDeals =
    activeTab === "all"
      ? dealsData
      : dealsData.filter((item) => item.category === activeTab);

  return (
    <section className="great-deals-modern py-5">
      <Container>
        {/* Section Header */}
        <div className="section-header-modern text-center mb-4">
          <div className="deals-badge-chip">
            <FaPercent className="me-2" /> HANDPICKED PROMOTIONS
          </div>
          <h2 className="section-title-modern">
            Verified Travel Discounts &amp; <span className="highlight-text">Promo Codes</span>
          </h2>
          <p className="section-subtitle-modern">
            Copy coupon codes directly and apply at checkout to unlock guaranteed airfare savings.
          </p>

          {/* Category Filter Pills */}
          <div className="deals-category-tabs">
            <button
              className={`cat-pill ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Offers
            </button>
            <button
              className={`cat-pill ${activeTab === "flights" ? "active" : ""}`}
              onClick={() => setActiveTab("flights")}
            >
              ✈️ Flight Discounts
            </button>
            <button
              className={`cat-pill ${activeTab === "luxury" ? "active" : ""}`}
              onClick={() => setActiveTab("luxury")}
            >
              ✨ Premium &amp; Business
            </button>
            <button
              className={`cat-pill ${activeTab === "flash" ? "active" : ""}`}
              onClick={() => setActiveTab("flash")}
            >
              ⚡ Flash Vouchers
            </button>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="coupon-grid-wrapper">
          <Row className="g-4">
            {filteredDeals.map((deal) => {
              const isCopied = copiedCode === deal.code;
              const isFav = !!favorites[deal.id];

              return (
                <Col lg={4} md={6} key={deal.id}>
                  <div className="coupon-card-modern">
                    <div className="card-media-wrapper">
                      <img
                        className="offer-image"
                        src={deal.imgSrc}
                        alt={deal.title}
                      />
                      <div className="media-overlay-gradient"></div>
                      <span className="ribbon-badge-modern">
                        {deal.ribbon}
                      </span>
                      <button
                        className={`favorite-btn-modern ${isFav ? "active" : ""}`}
                        onClick={() => toggleFavorite(deal.id)}
                        aria-label="Save deal"
                      >
                        {isFav ? <FaStar className="star-active" /> : <FaRegStar />}
                      </button>
                      <div className="deal-discount-tag">
                        {deal.discount}
                      </div>
                    </div>

                    <div className="card-content-body">
                      <h4 className="deal-title">{deal.title}</h4>
                      <p className="deal-sub">{deal.subtitle}</p>

                      <div className="deal-meta-row">
                        <span className="expiry-text">
                          <FaClock className="me-1" /> Valid until: {deal.expiresOn}
                        </span>
                      </div>

                      <div className="coupon-action-box">
                        <div className="coupon-code-pill">
                          <span className="code-label">PROMO CODE:</span>
                          <span className="code-text">{deal.code}</span>
                        </div>
                        <button
                          className={`btn-copy-code ${isCopied ? "copied" : ""}`}
                          onClick={() => handleCopy(deal.code)}
                        >
                          {isCopied ? (
                            <>
                              <FaCheck className="me-1" /> Copied!
                            </>
                          ) : (
                            <>
                              <FaCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default GreatDeals;
