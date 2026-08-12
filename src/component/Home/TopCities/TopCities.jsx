import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaChevronDown } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { useCurrency } from "../../../context/CurrencyContext";
import "./TopCities.css";

// Airline Logo SVG/Monogram Helpers
const AirlineLogo = ({ code, name, bg = "#0B2545" }) => {
  // Brand color and custom crest representation
  if (code === "6E") {
    // IndiGo Blue
    return (
      <div className="airline-emblem-box" style={{ background: "#051838" }}>
        <svg viewBox="0 0 100 100" width="30" height="30">
          <circle cx="28" cy="28" r="7" fill="#38BDF8" />
          <circle cx="50" cy="24" r="8" fill="#FFFFFF" />
          <circle cx="72" cy="28" r="7" fill="#38BDF8" />
          <circle cx="34" cy="52" r="7.5" fill="#FFFFFF" />
          <circle cx="66" cy="52" r="7.5" fill="#FFFFFF" />
          <circle cx="50" cy="74" r="8" fill="#38BDF8" />
        </svg>
      </div>
    );
  }
  if (code === "AI") {
    // Air India Crimson Red
    return (
      <div className="airline-emblem-box" style={{ background: "#FFFFFF", border: "1px solid #FEE2E2" }}>
        <svg viewBox="0 0 100 100" width="34" height="34">
          <path
            d="M20 60 Q 50 15, 80 40 Q 60 48, 40 54 Q 30 65, 20 60 Z"
            fill="#D90429"
          />
          <circle cx="68" cy="36" r="6" fill="#F59E0B" />
        </svg>
      </div>
    );
  }
  if (code === "SG" || code === "QP") {
    // SpiceJet / Akasa Vibrant Orange
    return (
      <div className="airline-emblem-box" style={{ background: "#FF4500" }}>
        <svg viewBox="0 0 100 100" width="30" height="30">
          <path
            d="M25 75 L 45 25 L 55 25 L 75 75 L 60 75 L 50 50 L 40 75 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }
  if (code === "EY") {
    // Etihad Gold & Navy
    return (
      <div className="airline-emblem-box" style={{ background: "#1C1917" }}>
        <span style={{ color: "#D4AF37", fontSize: "11px", fontWeight: "900", letterSpacing: "1px" }}>
          ETIHAD
        </span>
      </div>
    );
  }
  if (code === "LH") {
    // Lufthansa Blue & Gold
    return (
      <div className="airline-emblem-box" style={{ background: "#FBBF24" }}>
        <svg viewBox="0 0 100 100" width="28" height="28">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#00205B" strokeWidth="6" />
          <path d="M25 55 Q 50 30, 75 42 L 50 48 Z" fill="#00205B" />
        </svg>
      </div>
    );
  }
  if (code === "SV") {
    // Saudia Green & Gold
    return (
      <div className="airline-emblem-box" style={{ background: "#064E3B" }}>
        <svg viewBox="0 0 100 100" width="28" height="28">
          <path d="M50 18 L 80 50 L 50 82 L 20 50 Z" fill="#F59E0B" />
          <circle cx="50" cy="50" r="12" fill="#064E3B" />
        </svg>
      </div>
    );
  }
  if (code === "EK") {
    // Emirates Red / Gold Crown
    return (
      <div className="airline-emblem-box" style={{ background: "#DC2626" }}>
        <svg viewBox="0 0 100 100" width="28" height="28">
          <path d="M20 70 L 30 35 L 50 55 L 70 35 L 80 70 Z" fill="#FEF08A" />
        </svg>
      </div>
    );
  }
  if (code === "AC") {
    // Air Canada Maple Leaf
    return (
      <div className="airline-emblem-box" style={{ background: "#FFFFFF", border: "1px solid #FEE2E2" }}>
        <svg viewBox="0 0 100 100" width="28" height="28">
          <path
            d="M50 15 L 56 35 L 75 32 L 64 48 L 78 60 L 58 60 L 50 85 L 42 60 L 22 60 L 36 48 L 25 32 L 44 35 Z"
            fill="#EF4444"
          />
        </svg>
      </div>
    );
  }
  // Default Royal Blue Emblem
  return (
    <div className="airline-emblem-box" style={{ background: bg }}>
      <FaPlane style={{ color: "#FFFFFF", fontSize: "20px" }} />
    </div>
  );
};

// Data sets organized by origin
const domesticDealsData = {
  Delhi: [
    { id: 1, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "IXZ", destName: "Port Blair", date: "17 Aug 2026", trip: "One Way", price: "₹9,237" },
    { id: 2, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "SXR", destName: "Srinagar", date: "19 Aug 2026", trip: "One Way", price: "₹3,993" },
    { id: 3, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "IXL", destName: "Leh IN", date: "21 Oct 2026", trip: "One Way", price: "₹4,900" },
    { id: 4, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "DGH", destName: "Deoghar", date: "16 Sept 2026", trip: "One Way", price: "₹5,356" },
    { id: 5, airline: "Air India", code: "AI", orgCode: "DEL", orgName: "Delhi", destCode: "BLR", destName: "Bengaluru", date: "23 Aug 2026", trip: "One Way", price: "₹7,780" },
    { id: 6, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "GOI", destName: "Goa In", date: "18 Aug 2026", trip: "One Way", price: "₹5,700" },
    { id: 7, airline: "Akasa Air", code: "QP", orgCode: "DEL", orgName: "Delhi", destCode: "IXE", destName: "Mangalore", date: "20 Sept 2026", trip: "One Way", price: "₹5,619" },
    { id: 8, airline: "IndiGo", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "IXM", destName: "Madurai", date: "05 Sept 2026", trip: "One Way", price: "₹8,841" },
    { id: 9, airline: "Air India", code: "AI", orgCode: "DEL", orgName: "Delhi", destCode: "BBI", destName: "Bhubaneswar", date: "24 Aug 2026", trip: "One Way", price: "₹7,736" },
    { id: 10, airline: "SpiceJet", code: "SG", orgCode: "DEL", orgName: "Delhi", destCode: "BOM", destName: "Mumbai", date: "12 Aug 2026", trip: "One Way", price: "₹4,898" }
  ],
  Mumbai: [
    { id: 11, airline: "IndiGo", code: "6E", orgCode: "BOM", orgName: "Mumbai", destCode: "DEL", destName: "Delhi", date: "15 Aug 2026", trip: "One Way", price: "₹4,850" },
    { id: 12, airline: "Air India", code: "AI", orgCode: "BOM", orgName: "Mumbai", destCode: "GOI", destName: "Goa", date: "18 Aug 2026", trip: "One Way", price: "₹3,450" },
    { id: 13, airline: "IndiGo", code: "6E", orgCode: "BOM", orgName: "Mumbai", destCode: "BLR", destName: "Bengaluru", date: "22 Aug 2026", trip: "One Way", price: "₹4,120" },
    { id: 14, airline: "Akasa Air", code: "QP", orgCode: "BOM", orgName: "Mumbai", destCode: "CCU", destName: "Kolkata", date: "29 Aug 2026", trip: "One Way", price: "₹6,300" }
  ],
  Georgetown: [
    { id: 15, airline: "Caribbean Airlines", code: "6E", orgCode: "GEO", orgName: "Georgetown", destCode: "POS", destName: "Port of Spain", date: "15 Aug 2026", trip: "One Way", price: "$185" },
    { id: 16, airline: "Caribbean Airlines", code: "6E", orgCode: "GEO", orgName: "Georgetown", destCode: "BGI", destName: "Barbados", date: "20 Aug 2026", trip: "One Way", price: "$210" },
    { id: 17, airline: "Surinam Airways", code: "AI", orgCode: "GEO", orgName: "Georgetown", destCode: "PBM", destName: "Paramaribo", date: "25 Aug 2026", trip: "One Way", price: "$165" },
    { id: 18, airline: "Fly All Ways", code: "QP", orgCode: "GEO", orgName: "Georgetown", destCode: "HAV", destName: "Havana", date: "02 Sept 2026", trip: "One Way", price: "$320" }
  ]
};

const internationalDealsData = {
  Delhi: [
    // Europe
    { id: 111, airline: "British Airways", code: "LH", orgCode: "DEL", orgName: "Delhi", destCode: "LHR", destName: "London", date: "13 Dec 2026", trip: "One Way", price: 55420, priceCurrency: "INR" },
    { id: 112, airline: "Air France", code: "AI", orgCode: "DEL", orgName: "Delhi", destCode: "CDG", destName: "Paris", date: "02 Oct 2026", trip: "One Way", price: 51890, priceCurrency: "INR" },
    { id: 113, airline: "Lufthansa", code: "LH", orgCode: "DEL", orgName: "Delhi", destCode: "FRA", destName: "Frankfurt", date: "15 Oct 2026", trip: "One Way", price: 48310, priceCurrency: "INR" },
    { id: 114, airline: "KLM", code: "6E", orgCode: "DEL", orgName: "Delhi", destCode: "AMS", destName: "Amsterdam", date: "04 Sept 2026", trip: "One Way", price: 49975, priceCurrency: "INR" },
    { id: 117, airline: "ITA Airways", code: "AZ", orgCode: "DEL", orgName: "Delhi", destCode: "FCO", destName: "Rome", date: "18 Nov 2026", trip: "One Way", price: 53210, priceCurrency: "INR" },
    { id: 118, airline: "Iberia", code: "IB", orgCode: "DEL", orgName: "Delhi", destCode: "MAD", destName: "Madrid", date: "22 Sept 2026", trip: "One Way", price: 54680, priceCurrency: "INR" },
    { id: 119, airline: "Swiss Air", code: "LX", orgCode: "DEL", orgName: "Delhi", destCode: "ZRH", destName: "Zurich", date: "07 Jan 2027", trip: "One Way", price: 58940, priceCurrency: "INR" },
    { id: 120, airline: "Austrian Airlines", code: "OS", orgCode: "DEL", orgName: "Delhi", destCode: "VIE", destName: "Vienna", date: "11 Dec 2026", trip: "One Way", price: 52370, priceCurrency: "INR" },
    { id: 121, airline: "Lufthansa", code: "LH", orgCode: "DEL", orgName: "Delhi", destCode: "MUC", destName: "Munich", date: "26 Oct 2026", trip: "One Way", price: 47950, priceCurrency: "INR" },
    { id: 122, airline: "Vueling", code: "VY", orgCode: "DEL", orgName: "Delhi", destCode: "BCN", destName: "Barcelona", date: "09 Nov 2026", trip: "One Way", price: 56120, priceCurrency: "INR" },
    // United States
    { id: 115, airline: "Air India", code: "AI", orgCode: "DEL", orgName: "Delhi", destCode: "JFK", destName: "New York", date: "05 Nov 2026", trip: "One Way", price: 64200, priceCurrency: "INR" },
    { id: 116, airline: "United Airlines", code: "UA", orgCode: "DEL", orgName: "Delhi", destCode: "ORD", destName: "Chicago", date: "29 Aug 2026", trip: "One Way", price: 71850, priceCurrency: "INR" },
    { id: 123, airline: "United Airlines", code: "UA", orgCode: "DEL", orgName: "Delhi", destCode: "LAX", destName: "Los Angeles", date: "14 Dec 2026", trip: "One Way", price: 79430, priceCurrency: "INR" },
    { id: 124, airline: "Air India", code: "AI", orgCode: "DEL", orgName: "Delhi", destCode: "SFO", destName: "San Francisco", date: "03 Oct 2026", trip: "One Way", price: 82190, priceCurrency: "INR" },
    { id: 125, airline: "Saudia", code: "SV", orgCode: "DEL", orgName: "Delhi", destCode: "IAD", destName: "Washington DC", date: "20 Nov 2026", trip: "One Way", price: 69560, priceCurrency: "INR" },
    { id: 126, airline: "United Airlines", code: "UA", orgCode: "DEL", orgName: "Delhi", destCode: "BOS", destName: "Boston", date: "17 Sept 2026", trip: "One Way", price: 74280, priceCurrency: "INR" },
    { id: 127, airline: "Delta Air Lines", code: "DL", orgCode: "DEL", orgName: "Delhi", destCode: "SEA", destName: "Seattle", date: "08 Jan 2027", trip: "One Way", price: 85670, priceCurrency: "INR" },
    { id: 128, airline: "Qatar Airways", code: "QR", orgCode: "DEL", orgName: "Delhi", destCode: "IAH", destName: "Houston", date: "25 Aug 2026", trip: "One Way", price: 76340, priceCurrency: "INR" },
    { id: 129, airline: "United Airlines", code: "UA", orgCode: "DEL", orgName: "Delhi", destCode: "EWR", destName: "Newark", date: "12 Dec 2026", trip: "One Way", price: 65780, priceCurrency: "INR" },
    { id: 130, airline: "Delta Air Lines", code: "DL", orgCode: "DEL", orgName: "Delhi", destCode: "ATL", destName: "Atlanta", date: "01 Nov 2026", trip: "One Way", price: 77450, priceCurrency: "INR" }
  ]
};

// Motion Variants
const containerMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardMotion = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const TopCities = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [selectedDomesticOrigin, setSelectedDomesticOrigin] = useState("Delhi");
  const [selectedInternationalOrigin, setSelectedInternationalOrigin] = useState("Delhi");
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);

  const domesticList = domesticDealsData[selectedDomesticOrigin] || domesticDealsData["Delhi"];
  const internationalList = internationalDealsData[selectedInternationalOrigin] || internationalDealsData["Delhi"];

  const handleCardClick = (item) => {
    // Generate flight search navigation URL
    const searchSlug = `dest_${item.destCode}*org_${item.orgCode}*dep_2026-09-15*arr_2026-09-15*px_1-0-0*jt_1*cbn_2`;
    navigate(`/flightList/${searchSlug}`);
  };

  return (
    <section className="popular-flight-routes-section">
      <Container className="flash-deals-container">
        {/* =================================================================
            1. DOMESTIC FLASH DEALS SECTION
            ================================================================= */}
        {/* <div className="flash-deals-group">
          <div className="flash-deals-header">
            <div className="flash-deals-title-wrap">
              <h2 className="flash-deals-main-title">
                Domestic Flash <IoFlash className="flash-bolt-icon" /> Deals from
                <span
                  className="origin-select-badge"
                  onClick={() => setIsDomesticOpen(!isDomesticOpen)}
                >
                  {selectedDomesticOrigin}
                  <FaChevronDown className={`chevron-icon ${isDomesticOpen ? "open" : ""}`} />
                  {isDomesticOpen && (
                    <div className="origin-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                      {Object.keys(domesticDealsData).map((origin) => (
                        <div
                          key={origin}
                          className={`origin-dropdown-item ${selectedDomesticOrigin === origin ? "active" : ""}`}
                          onClick={() => {
                            setSelectedDomesticOrigin(origin);
                            setIsDomesticOpen(false);
                          }}
                        >
                          <span>{origin}</span>
                          {selectedDomesticOrigin === origin && <span style={{ color: "#0066FF" }}>✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </span>
              </h2>
            </div>
            <div className="flash-deals-badge">
              <span>⚡ Live Fare Updates</span>
            </div>
          </div>

          <motion.div
            className="flash-routes-grid"
            variants={containerMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {domesticList.map((item) => (
              <motion.div
                key={item.id}
                variants={cardMotion}
                className="flight-deal-capsule-card"
                onClick={() => handleCardClick(item)}
              >
                <div className="deal-left-info">
                  <AirlineLogo code={item.code} name={item.airline} />
                  <div className="route-station-meta">
                    <div className="station-code-city">
                      <span className="code-bold">{item.orgCode}</span>
                      <span className="city-name">{item.orgName}</span>
                    </div>
                    <span className="station-sub-meta">{item.date}</span>
                  </div>
                </div>

                <div className="deal-center-flight-path">
                  <div className="plane-motion-icon-wrap">
                    <FaPlane />
                  </div>
                </div>

                <div className="deal-destination-info">
                  <div className="route-station-meta">
                    <div className="station-code-city">
                      <span className="code-bold">{item.destCode}</span>
                      <span className="city-name">{item.destName}</span>
                    </div>
                    <span className="station-sub-meta">{item.trip}</span>
                  </div>
                </div>

                <div className="deal-price-action-pill">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        {/* =================================================================
            2. INTERNATIONAL FLASH DEALS SECTION
            ================================================================= */}
        <div className="flash-deals-group">
          <div className="flash-deals-header">
            <div className="flash-deals-title-wrap">
              <h2 className="flash-deals-main-title">
                International Flash <IoFlash className="flash-bolt-icon" /> Deals from
                <span
                  className="origin-select-badge"
                  onClick={() => setIsInternationalOpen(!isInternationalOpen)}
                >
                  {selectedInternationalOrigin}
                  <FaChevronDown className={`chevron-icon ${isInternationalOpen ? "open" : ""}`} />
                  {isInternationalOpen && (
                    <div className="origin-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                      {Object.keys(internationalDealsData).map((origin) => (
                        <div
                          key={origin}
                          className={`origin-dropdown-item ${selectedInternationalOrigin === origin ? "active" : ""}`}
                          onClick={() => {
                            setSelectedInternationalOrigin(origin);
                            setIsInternationalOpen(false);
                          }}
                        >
                          <span>{origin}</span>
                          {selectedInternationalOrigin === origin && <span style={{ color: "#0066FF" }}>✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </span>
              </h2>
            </div>
            <div className="flash-deals-badge">
              <span>✈ Global Route Network</span>
            </div>
          </div>

          <motion.div
            className="flash-routes-grid"
            variants={containerMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {internationalList.map((item) => (
              <motion.div
                key={item.id}
                variants={cardMotion}
                className="flight-deal-capsule-card"
                onClick={() => handleCardClick(item)}
              >
                {/* Left: Airline Logo & Origin Station */}
                <div className="deal-left-info">
                  <AirlineLogo code={item.code} name={item.airline} />
                  <div className="route-station-meta">
                    <div className="station-code-city">
                      <span className="code-bold">{item.orgCode}</span>
                      <span className="city-name">{item.orgName}</span>
                    </div>
                    <span className="station-sub-meta">{item.date}</span>
                  </div>
                </div>

                {/* Center: Flight Trajectory Animation */}
                <div className="deal-center-flight-path">
                  <div className="plane-motion-icon-wrap">
                    <FaPlane />
                  </div>
                </div>

                {/* Destination Station */}
                <div className="deal-destination-info">
                  <div className="route-station-meta">
                    <div className="station-code-city">
                      <span className="code-bold">{item.destCode}</span>
                      <span className="city-name">{item.destName}</span>
                    </div>
                    <span className="station-sub-meta">{item.trip}</span>
                  </div>
                </div>

                {/* Right: Vibrant Flash Price Badge */}
                <div className="deal-price-action-pill">
                  {formatPrice(item.price, item.priceCurrency)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default TopCities;
