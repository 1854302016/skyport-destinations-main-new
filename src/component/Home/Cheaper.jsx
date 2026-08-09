import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlane, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeHeroRefined.css";

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return tomorrow.toLocaleDateString('en-GB', options);
};

const dealsData = [
    {
        origin: "NYC",
        destination: "LON",
        route: "New York → London",
        img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
        price: "450",
        type: "One Way",
        badge: "Hot Deal"
    },
    {
        origin: "LAX",
        destination: "PAR",
        route: "Los Angeles ⇌ Paris",
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
        price: "645",
        type: "Round Trip",
        badge: "Limited"
    },
    {
        origin: "SFO",
        destination: "TYO",
        route: "San Francisco → Tokyo",
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
        price: "890",
        type: "One Way",
        badge: "Fast Selling"
    },
    {
        origin: "BOM",
        destination: "DXB",
        route: "Mumbai ⇌ Dubai",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop",
        price: "320",
        type: "Round Trip",
        badge: "Best Value"
    },
    {
        origin: "GEO",
        destination: "MIA",
        route: "Georgetown → Miami",
        img: "https://images.unsplash.com/photo-1514214246283-d427a9575dcb?q=80&w=1000&auto=format&fit=crop",
        price: "299",
        type: "One Way",
        badge: "Exclusive"
    },
    {
        origin: "YYZ",
        destination: "BCN",
        route: "Toronto ⇌ Barcelona",
        img: "https://images.unsplash.com/photo-1583997051651-8ca1bb9367ca?q=80&w=1000&auto=format&fit=crop",
        price: "710",
        type: "Round Trip",
        badge: "New"
    },
    {
        origin: "SYD",
        destination: "SIN",
        route: "Sydney ⇌ Singapore",
        img: "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?q=80&w=1000&auto=format&fit=crop",
        price: "540",
        type: "Round Trip",
        badge: "Premium"
    },
    {
        origin: "ATL",
        destination: "CUN",
        route: "Atlanta → Cancun",
        img: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1000&auto=format&fit=crop",
        price: "185",
        type: "One Way",
        badge: "Last Minute"
    }
];

const Cheaper = () => {
    const [activeTab, setActiveTab] = useState("all");
    const tomorrowDateString = getTomorrowDate();

    const filteredDeals = activeTab === "all" 
        ? dealsData 
        : dealsData.filter(d => d.type.toLowerCase().includes(activeTab.toLowerCase().replace("-", " ")));

    return (
        <section className="deals-refined-section" style={{ background: "#f8faff", padding: "80px 0" }}>
            <Container>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header-clean text-center mb-5"
                >
                    <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#053355", marginBottom: "10px" }}>
                        Exclusive <span style={{ color: "#f2bc06" }}>Flight Deals</span>
                    </h2>
                    <p style={{ color: "#6c757d", maxWidth: "600px", margin: "0 auto" }}>
                        Hand-picked fares for worldwide destinations. Book your dream trip with our limited-time daily offers.
                    </p>
                </motion.div>

                <div className="deals-filter-bar mb-5 d-flex justify-content-center">
                    <div className="filter-pills-wrap d-flex gap-2 p-2 bg-white shadow-sm rounded-pill">
                        {["all", "one-way", "round-trip"].map((tab) => (
                            <button
                                key={tab}
                                className={`pill-btn ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    border: "none",
                                    padding: "10px 25px",
                                    borderRadius: "50px",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                    background: "transparent",
                                    color: activeTab === tab ? "#fff" : "#6c757d",
                                    zIndex: 1
                                }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activePill"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: "#053355",
                                            borderRadius: "50px",
                                            zIndex: -1
                                        }}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout>
                    <Row>
                        <AnimatePresence mode="popLayout">
                            {filteredDeals.map((item, index) => (
                                <Col lg={3} md={6} key={item.route} className="mb-4">
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ y: -10 }}
                                        className="deal-card-clean bg-white rounded-4 overflow-hidden shadow-sm h-100 border border-light transition-hover"
                                    >
                                        <div className="deal-card-img position-relative" style={{ height: "180px" }}>
                                            <img src={item.img} alt={item.route} className="w-100 h-100 object-fit-cover" />
                                            <div className="badge-overlay position-absolute top-0 start-0 p-3">
                                                <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-2 shadow-sm" style={{ fontSize: "11px", textTransform: "uppercase" }}>
                                                    {item.badge}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="deal-card-body p-4">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <FaMapMarkerAlt color="#e63946" size={14} />
                                                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#053355", margin: 0 }}>
                                                    {item.route}
                                                </h3>
                                            </div>
                                            <div className="deal-meta-text d-flex justify-content-between text-muted mb-4" style={{ fontSize: "13px" }}>
                                                <span><FaPlane size={12} className="me-1" Rotate={-45} /> {item.type}</span>
                                                <span>{tomorrowDateString}</span>
                                            </div>
                                            <div className="deal-footer d-flex justify-content-between align-items-center pt-3 border-top border-light">
                                                <div className="price-wrap">
                                                    <span className="text-muted" style={{ fontSize: "12px", display: "block" }}>Starting from</span>
                                                    <span style={{ fontSize: "20px", fontWeight: "900", color: "#053355" }}>${item.price}</span>
                                                </div>
                                                <Link 
                                                    to={`/flightList/dest_${item.destination}*org_${item.origin}*dep_${tomorrowDateString}*arr_${tomorrowDateString}*px_1-0-0*jt_1*cbn_2`}
                                                    className="btn btn-outline-primary rounded-pill fw-bold px-3 py-2"
                                                    style={{ fontSize: "13px", borderColor: "#053355", color: "#053355" }}
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Col>
                            ))}
                        </AnimatePresence>
                    </Row>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-5"
                >
                    <Link to="/deals" className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-lg" style={{ background: "#053355" }}>
                        Explore All Flight Deals <FaArrowRight size={14} className="ms-3" />
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
};

export default Cheaper;

