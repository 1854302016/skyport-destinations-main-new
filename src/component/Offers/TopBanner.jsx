import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTag, FaPlaneDeparture, FaArrowRight, FaPercent } from "react-icons/fa6";
import "./TopBanner.css";

const TopBanner = () => {
  return (
    <section className="offers-hero-section">
      <div className="offers-hero-bg-overlay"></div>
      <Container className="position-relative z-index-2">
        <div className="offers-hero-content text-center">
          <div className="offers-hero-badge">
            <FaPercent className="me-2" /> EXCLUSIVE TRAVEL SAVINGS
          </div>
          <h1 className="offers-hero-title">
            Fly Smarter, Save Bigger <br />
            <span className="gradient-text">With Special Flight Deals</span>
          </h1>
          <p className="offers-hero-subtitle">
            Take advantage of handpicked promotional fares, airline discount codes, and verified seasonal vouchers across international routes.
          </p>

          <div className="offers-cta-group">
            <Link to="/" className="btn-explore-offers">
              <FaPlaneDeparture className="me-2" /> Book Discounted Flights <FaArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopBanner;
