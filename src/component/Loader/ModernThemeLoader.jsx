import React from "react";
import { FaPlane } from "react-icons/fa";
import { FaRightLong } from "react-icons/fa6";
import "./ModernThemeLoader.css";

const ModernThemeLoader = ({
  fromCode = "GEO",
  fromCity = "Georgetown",
  toCode = "DXB",
  toCity = "Dubai",
}) => {
  return (
    <div className="clean-globe-loader-stage" id="Loader">
      {/* Soft Ambient Radial Backdrop Glows */}
      <div className="globe-glow-1" aria-hidden="true" />
      <div className="globe-glow-2" aria-hidden="true" />

      {/* Main Center Stage: 3D Holographic Globe + Locations Under Globe */}
      <div className="globe-center-container">
        
        {/* 3D Holographic Rotating Globe Hero */}
        <div className="hero-globe-wrapper">
          <svg className="hero-globe-svg" viewBox="0 0 280 280" fill="none">
            {/* Outer Rotating Degree Ticks */}
            <circle cx="140" cy="140" r="118" stroke="url(#outerTickGrad)" strokeWidth="1.5" strokeDasharray="5 5" className="rotating-outer-ticks" />
            <circle cx="140" cy="140" r="102" stroke="#0066FF" strokeWidth="1" strokeOpacity="0.15" />
            
            {/* 3D Spherical Globe Wireframe */}
            <g className="spherical-globe-grid">
              <circle cx="140" cy="140" r="92" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.25" />
              <ellipse cx="140" cy="140" rx="92" ry="34" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
              <ellipse cx="140" cy="140" rx="92" ry="68" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
              <ellipse cx="140" cy="140" rx="34" ry="92" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
              <ellipse cx="140" cy="140" rx="68" ry="92" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
              <line x1="48" y1="140" x2="232" y2="140" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
              <line x1="140" y1="48" x2="140" y2="232" stroke="#0066FF" strokeWidth="1.2" strokeOpacity="0.3" />
            </g>

            {/* Animated Flight Trajectory Arcs */}
            <path d="M 65 175 Q 140 60 215 175" stroke="url(#flightArc1)" strokeWidth="3" strokeLinecap="round" className="animated-globe-arc" />
            <path d="M 70 105 Q 140 220 210 105" stroke="url(#flightArc2)" strokeWidth="2.5" strokeLinecap="round" className="animated-globe-arc-2" />

            {/* Traveling Light Nodes */}
            <circle cx="0" cy="0" r="4.5" fill="#38BDF8" className="light-node-glow">
              <animateMotion path="M 65 175 Q 140 60 215 175" dur="3.2s" repeatCount="indefinite" />
            </circle>

            <defs>
              <linearGradient id="outerTickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>

              <linearGradient id="flightArc1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
              </linearGradient>

              <linearGradient id="flightArc2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#0066FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Floating Jetliner Emblem */}
          <div className="globe-jetliner-emblem">
            <FaPlane className="emblem-plane" />
          </div>
        </div>

        {/* FROM and TO Location Destinations Rendered Just Under the Globe */}
        <div className="under-globe-route-pill">
          <div className="route-location-box">
            <span className="location-code">{fromCode}</span>
            <span className="location-city">{fromCity}</span>
          </div>

          <div className="route-flight-divider">
            <div className="flight-dot" />
            <FaRightLong className="flight-connector-arrow" />
            <div className="flight-dot" />
          </div>

          <div className="route-location-box">
            <span className="location-code">{toCode}</span>
            <span className="location-city">{toCity}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModernThemeLoader;
