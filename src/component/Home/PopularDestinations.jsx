import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaPlaneDeparture,
  FaFire,
  FaCompass,
  FaClock,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";
import "./HomeHeroRefined.css";

const date = new Date();
date.setDate(date.getDate() + 2);
const formattedDate = date.toISOString().split("T")[0];

const destinationsData = [
  {
    id: 1,
    name: "Dubai",
    code: "DXB",
    country: "United Arab Emirates",
    duration: "3h 45m Direct",
    slug: `https://trustedfare.com/flightList/dest_DXB*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/8612083/pexels-photo-8612083.jpeg",
    description: "Explore vast landscapes, iconic futuristic architecture, and luxury lifestyle across Dubai's historic coastal skyline.",
    price: "78,500",
    tagline: "LUXURY SAFARI & SKYLINE"
  },
  {
    id: 2,
    name: "Germany",
    code: "FRA",
    country: "Europe",
    duration: "5h 20m Direct",
    slug: `https://trustedfare.com/flightList/dest_FRA*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/31542272/pexels-photo-31542272.jpeg",
    description: "Experience Germany’s blend of modern tech hubs, medieval castles, bavarian culture, and scenic alpine highways.",
    price: "72,300",
    tagline: "HERITAGE & INNOVATION"
  },
  {
    id: 3,
    name: "Finland",
    code: "RVN",
    country: "Nordic Region",
    duration: "4h 50m Direct",
    slug: `https://trustedfare.com/flightList/dest_RVN*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/31539348/pexels-photo-31539348.jpeg",
    description: "Discover serene lakes, glowing northern lights dancing across Arctic night skies, and peaceful Nordic retreats.",
    price: "81,900",
    tagline: "NORTHERN LIGHTS & NATURE"
  },
  {
    id: 4,
    name: "Denmark",
    code: "CPH",
    country: "Scandinavia",
    duration: "4h 30m Direct",
    slug: `https://trustedfare.com/flightList/dest_CPH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/17492661/pexels-photo-17492661.jpeg",
    description: "Visit Denmark for its scenic Baltic coastlines, world-leading design culture, Michelin dining, and waterfront harbor life.",
    price: "76,400",
    tagline: "SCANDINAVIAN ELEGANCE"
  },
  {
    id: 5,
    name: "Georgia",
    code: "TBS",
    country: "Caucasus",
    duration: "2h 15m Direct",
    slug: `https://trustedfare.com/flightList/dest_TBS*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/33133738/pexels-photo-33133738.jpeg",
    description: "Explore Caucasus peaks, ancient hilltop monasteries, and rich culinary traditions at the intersection of Europe & Asia.",
    price: "64,800",
    tagline: "MOUNTAIN PASSES & HISTORY"
  },
  {
    id: 6,
    name: "Greece",
    code: "ATH",
    country: "Mediterranean",
    duration: "3h 10m Direct",
    slug: `https://trustedfare.com/flightList/dest_ATH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/29986796/pexels-photo-29986796.jpeg",
    description: "Travel through millennia of history, iconic whitewashed island villages, and crystal blue Aegean waters.",
    price: "69,500",
    tagline: "ISLAND PARADISE & MYTH"
  },
  {
    id: 7,
    name: "Austria",
    code: "VIE",
    country: "Central Europe",
    duration: "4h 10m Direct",
    slug: `https://trustedfare.com/flightList/dest_VIE*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/20807992/pexels-photo-20807992.jpeg",
    description: "Enjoy alpine summits, classical concert halls, imperial Habsburg architecture, and world-famous Viennese cafes.",
    price: "74,200",
    tagline: "IMPERIAL PALACES & ALPS"
  },
  {
    id: 8,
    name: "Europe",
    code: "LHR",
    country: "European Union",
    duration: "6h 00m Direct",
    slug: `https://trustedfare.com/flightList/dest_LHR*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/34431003/pexels-photo-34431003.jpeg",
    description: "Explore historic capitals, ancient landmarks, iconic art museums, and multi-destination flight deals.",
    price: "85,000",
    tagline: "GRAND EUROPEAN TOUR"
  },
  {
    id: 9,
    name: "Azerbaijan",
    code: "GYD",
    country: "Land of Fire",
    duration: "2h 45m Direct",
    slug: `https://trustedfare.com/flightList/dest_GYD*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/33516982/pexels-photo-33516982.jpeg",
    description: "Discover the Land of Fire with its ultramodern flame towers, ancient Silk Road fortress, and Caspian promenade.",
    price: "58,700",
    tagline: "LAND OF FIRE & SILK ROAD"
  },
  {
    id: 10,
    name: "France",
    code: "CDG",
    country: "Western Europe",
    duration: "5h 45m Direct",
    slug: `https://trustedfare.com/flightList/dest_CDG*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/32734935/pexels-photo-32734935.jpeg",
    description: "Indulge in French gastronomy, Paris fashion, Louvre art collections, and romantic countryside vineyards.",
    price: "82,600",
    tagline: "ROMANCE & HIGH FASHION"
  },
  {
    id: 11,
    name: "Japan",
    code: "HND",
    country: "East Asia",
    duration: "9h 30m Direct",
    slug: `https://trustedfare.com/flightList/dest_HND*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    category: "International",
    img: "https://images.pexels.com/photos/36495795/pexels-photo-36495795.jpeg",
    description: "Step into the future with bullet trains, ancient temples, cherry blossom gardens, and neon-lit Tokyo districts.",
    price: "95,400",
    tagline: "TRADITION MEETS FUTURE"
  }
];

const PopularDestinations = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState("ALL DESTINATIONS");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredList = useMemo(() => {
    return activeCategory === "ALL DESTINATIONS"
      ? destinationsData
      : destinationsData.filter(
          (d) => d.category.toUpperCase() === activeCategory.toUpperCase()
        );
  }, [activeCategory]);

  const currentDest = filteredList[activeIndex] || filteredList[0];

  // Autoplay Logic
  useEffect(() => {
    let interval;
    if (isAutoPlaying && filteredList.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredList.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredList.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  }, [filteredList.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredList.length);
  }, [filteredList.length]);

  const handleNavigate = useCallback(
    (slug) => {
      navigate(`${slug}`);
    },
    [navigate]
  );

  return (
    <section
      className="motion-dest-stage"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Massive Kinetic Watermark Text Background */}
      <div className="motion-watermark-bg" aria-hidden="true">
        <span>{currentDest.name}</span>
      </div>

      <Container>
        {/* Top Header Controls Bar */}
        <div className="motion-dest-header">
          <div className="motion-title-group">
            <div className="motion-badge-pill">
              <FaFire className="motion-badge-fire" />
              <span>TRENDING INTERNATIONAL DESTINATIONS</span>
            </div>
            <h2 className="motion-main-heading">
              Popular <span className="motion-gradient-text">Destinations</span>
            </h2>
            <p className="motion-sub-text">
              Curated world-class destinations with exceptional fares and luxury stays
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="motion-tabs-group">
            {["ALL DESTINATIONS", "INTERNATIONAL"].map((tab) => (
              <button
                key={tab}
                className={`motion-tab-btn ${
                  activeCategory === tab ? "is-active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(tab);
                  setActiveIndex(0);
                }}
              >
                {tab}
                {activeCategory === tab && (
                  <div className="motion-tab-active-line" />
                )}
              </button>
            ))}

            <button
              onClick={() => navigate("/tour")}
              className="motion-view-all-btn"
            >
              View All <FaArrowRight className="ms-1 motion-arrow-icon" />
            </button>
          </div>
        </div>

        {/* Dynamic Motion Graphics Showcase Area */}
        <div className="motion-showcase-grid">
          
          {/* Main Hero Spotlight Showcase */}
          <div className="motion-spotlight-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDest.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="motion-spotlight-inner"
              >
                <img
                  src={currentDest.img}
                  alt={currentDest.name}
                  className="motion-spotlight-img"
                  loading="eager"
                />

                {/* HUD Flight Route Tag */}
                <div className="motion-hud-route-tag">
                  <FaPlaneDeparture className="me-2 motion-hud-plane" />
                  <span>GEO &rarr; {currentDest.code}</span>
                  <span className="hud-dot">&bull;</span>
                  <span className="hud-duration">
                    <FaClock className="me-1" /> {currentDest.duration}
                  </span>
                </div>

                {/* Glassmorphic Info Panel */}
                <div className="motion-spotlight-hud">
                  <div className="motion-spotlight-tagline">
                    <FaCompass className="me-2 motion-compass" />
                    {currentDest.tagline}
                  </div>

                  <div className="motion-spotlight-title-row">
                    <h1 className="motion-spotlight-title">{currentDest.name}</h1>
                    <div className="motion-price-badge">
                      <span className="price-label">FLIGHTS FROM</span>
                      <span className="price-val">
                        {formatPrice(Number(currentDest.price.replace(/,/g, "")), "INR")}
                      </span>
                    </div>
                  </div>

                  <p className="motion-spotlight-desc">{currentDest.description}</p>

                  <div className="motion-spotlight-actions">
                    <button
                      className="motion-primary-cta"
                      onClick={() => handleNavigate(currentDest.slug)}
                    >
                      <span>Explore Flights To {currentDest.name}</span>
                      <FaArrowRight className="ms-2 motion-cta-icon" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Reel Column */}
          <div className="motion-reel-container">
            <div className="motion-reel-header">
              <div className="motion-counter">
                <span className="current-num">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="num-divider">/</span>
                <span className="total-num">
                  {String(filteredList.length).padStart(2, "0")}
                </span>
              </div>

              {/* Controls */}
              <div className="motion-nav-controls">
                <button
                  className="motion-nav-circle"
                  onClick={handlePrev}
                  title="Previous"
                  aria-label="Previous Destination"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="motion-nav-circle"
                  onClick={handleNext}
                  title="Next"
                  aria-label="Next Destination"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Reel Cards List */}
            <div className="motion-reel-cards-list">
              {filteredList.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`motion-reel-card ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="motion-reel-thumb-box">
                      <img src={item.img} alt={item.name} loading="lazy" />
                      <div className="motion-reel-code">{item.code}</div>
                    </div>

                    <div className="motion-reel-info">
                      <span className="motion-reel-country">{item.country}</span>
                      <h4 className="motion-reel-name">{item.name}</h4>
                      <span className="motion-reel-price">
                        From {formatPrice(Number(item.price.replace(/,/g, "")), "INR")}
                      </span>
                    </div>

                    {isActive && <div className="motion-reel-active-glow" />}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default PopularDestinations;
