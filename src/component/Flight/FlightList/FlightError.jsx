import React from "react";
import { useNavigate } from "react-router-dom";
import "./FlightError.css";

const FlightError = () => {
  const navigate = useNavigate();

  return (
    <div className="do-not-close-container">
      <div className="card error-card">
        <h1>❌ Flight Booking Failed</h1>

        <p className="subtitle">
          We’re sorry, your booking could not be completed.
        </p>

        <div className="error-icon">⚠️</div>

        <div className="warning-box error-box">
          This may have happened due to:
          <ul>
            <li>Payment failure or interruption</li>
            <li>Session timeout</li>
            <li>Airline fare no longer available</li>
          </ul>
        </div>

        <div className="button-group">
          <button
            className="primary-btn"
            onClick={() => navigate("/")}
          >
            Search Flights Again
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightError;