import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaArrowRight,
  FaTag,
  FaChevronLeft,
  FaChevronRight,
  FaCreditCard,
  FaGlobe,
  FaCrown,
  FaCalendarCheck,
  FaCheck,
  FaFire,
  FaBuildingColumns,
  FaScissors,
  FaClock,
} from "react-icons/fa6";
import "./HomeHeroRefined.css";

const dealsData = [
  {
    id: 1,
    img: "https://images.ixigo.com/image/upload/Bob/6bc067af18738201bb50d438d9c0a8aa-lemwd.png",
    title: "BOB Credit Cards",
    subtitle: "INSTANT BANK SAVINGS",
    desc: "Get up to ₹2,500 instant discount on domestic flights with BOB EMI.",
    code: "BOBFLY",
    category: "Credit Card",
    icon: <FaCreditCard />,
    badgeColor: "#0066FF",
    discount: "FLAT 12% OFF",
    expiry: "Valid till end of month",
  },
  {
    id: 2,
    img: "https://www.goindigo.in/content/dam/s6web/in/en/assets/target/kotak-banners/Kotak-Banners-Homepage-Web-3x.jpg",
    title: "Kotak Bank Special",
    subtitle: "SPEND & SAVE MORE",
    desc: "Flat 12% OFF on all flight tickets when paying with Kotak cards.",
    code: "KOTAK12",
    category: "Bank Offer",
    icon: <FaBuildingColumns />,
    badgeColor: "#E11D48",
    discount: "UP TO ₹3,000 OFF",
    expiry: "Limited seats available",
  },
  {
    id: 3,
    img: "https://www.goindigo.in/content/dam/s6web/in/en/assets/target/d2c/3x_V1---WEB---tile-2.jpg",
    title: "Early Bird Deal",
    subtitle: "ADVANCE BOOKINGS",
    desc: "Book 30 days in advance & save extra on airfares worldwide.",
    code: "EARLYBIRD",
    category: "Advance Booking",
    icon: <FaCalendarCheck />,
    badgeColor: "#059669",
    discount: "SAVE UP TO 25%",
    expiry: "30-day advance required",
  },
  {
    id: 4,
    img: "https://images.ixigo.com/image/upload/offers_and_deals/edef9344f0455dcf862ff444857b679e-pfxin.webp",
    title: "Global Gateways",
    subtitle: "WORLDWIDE ROUTES",
    desc: "Explore Europe & America with an extra 15% instant discount.",
    code: "GLOBE15",
    category: "International",
    icon: <FaGlobe />,
    badgeColor: "#7C3AED",
    discount: "EXTRA 15% OFF",
    expiry: "International flights only",
  },
  {
    id: 5,
    img: "http://www.goindigo.in/content/dam/s6web/in/en/assets/D2C/target/Desktop_bluchip.jpg",
    title: "Business Class Plus",
    subtitle: "LUXURY CLASS",
    desc: "Complimentary extra baggage allowance & airport VIP lounge access.",
    code: "PREMIUM",
    category: "Luxury",
    icon: <FaCrown />,
    badgeColor: "#D97706",
    discount: "VIP LOUNGE ACCESS",
    expiry: "Premium cabin bookings",
  },
];

const OffersSlider = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGrabDeal = () => {
    navigate("/offers");
  };

  return (
    <section className="vip-deals-stage">
      {/* Background Lighting Glow */}
      <div className="vip-bg-glow" aria-hidden="true" />

      <Container>
        {/* Header Bar */}
        <div className="vip-deals-header">
          <div className="vip-header-title-box">
            <div className="vip-fire-badge">
              <FaFire className="vip-fire-icon me-1" />
              <span>HANDPICKED AIRLINE &amp; BANK VOUCHERS</span>
            </div>
            <h2 className="vip-main-heading">
              Exclusive <span className="gradient-text">Offers &amp; Deals</span>
            </h2>
            <p className="vip-sub-heading">
              Curated flight cashbacks, bank promo vouchers, and VIP airfare upgrades
            </p>
          </div>

          {/* Controls Right */}
          <div className="vip-controls-right">
            <button onClick={handleGrabDeal} className="vip-view-all-btn">
              View All Offers <FaArrowRight className="ms-1 vip-arrow-icon" />
            </button>
          </div>
        </div>

        {/* 3D Horizon Pass Deck Swiper */}
        <div className="vip-deck-slider-wrap position-relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".vip-prev",
              nextEl: ".vip-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="vip-swiper-deck"
          >
            {dealsData.map((item) => {
              const isCopied = copiedCode === item.code;
              return (
                <SwiperSlide key={item.id}>
                  <div className="vip-pass-card" onClick={handleGrabDeal}>
                    {/* Top Image Banner */}
                    <div className="vip-card-banner">
                      <img src={item.img} alt={item.title} loading="lazy" />

                      {/* Floating Category Pill */}
                      <div
                        className="vip-cat-pill"
                        style={{ background: item.badgeColor }}
                      >
                        <span className="me-1">{item.icon}</span>
                        <span>{item.category}</span>
                      </div>

                      {/* Discount Callout Tag */}
                      <div className="vip-discount-tag">{item.discount}</div>
                    </div>

                    {/* Content Section */}
                    <div className="vip-card-body">
                      <span className="vip-card-subtitle">{item.subtitle}</span>
                      <h3 className="vip-card-title">{item.title}</h3>
                      <p className="vip-card-desc">{item.desc}</p>

                      <div className="vip-card-expiry">
                        <FaClock className="me-1 text-cyan" />
                        <span>{item.expiry}</span>
                      </div>
                    </div>

                    {/* Perforation Cutout Tear Line */}
                    <div className="vip-perforated-line">
                      <div className="perforated-notch notch-left" />
                      <div className="perforated-notch notch-right" />
                      <div className="perforated-dashed" />
                    </div>

                    {/* Coupon Stub Footer */}
                    <div className="vip-card-footer">
                      {/* Clickable Promo Code Box */}
                      <div
                        className={`vip-code-stub ${isCopied ? "is-copied" : ""}`}
                        onClick={(e) => handleCopyCode(item.code, e)}
                        title="Click to Copy Promo Code"
                      >
                        <FaScissors className="scissors-icon" />
                        <span>{isCopied ? "COPIED! ✓" : item.code}</span>
                      </div>

                      {/* Action Button */}
                      <button
                        className="vip-claim-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGrabDeal();
                        }}
                      >
                        <span>Grab Deal</span>
                        <FaArrowRight className="ms-1" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="vip-nav-btn vip-prev"
            title="Previous Offer"
            aria-label="Previous Offer"
          >
            <FaChevronLeft />
          </button>
          <button
            className="vip-nav-btn vip-next"
            title="Next Offer"
            aria-label="Next Offer"
          >
            <FaChevronRight />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default OffersSlider;
