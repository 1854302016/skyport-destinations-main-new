import React, { useState } from 'react'
import './CabFilters.css'
import { FaChevronDown } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";

const CabFilters = () => {
  const [isDroppingOpen, setIsDroppingOpen] = useState(true);

  const droppingPoints = [
    "Near ISBT Dehradun",
    "Clock Tower Dehradun",
    "Haridwar Bus Stand",
    "Rishikesh Bus Stop",
    "Jhandewalan Metro Station",
    "ISBT Kashmiri Gate (PF1)",
    "Near ISBT Dehradun",
    "Clock Tower Dehradun",
    "Haridwar Bus Stand",
    "Rishikesh Bus Stop",
    "Jhandewalan Metro Station",
    "ISBT Kashmiri Gate (PF1)"
  ];

  return (
    <div>
      {/* Dropping Points */}
      <div className="cabListing-boardingPointsWrap">
        <div className="cabListing-boardingPointsHeader">
          <h4>Dropping Points</h4>
          <span
            className={`cabListing-boardingPointsToggle ${isDroppingOpen ? "open" : ""}`}
            onClick={() => setIsDroppingOpen(!isDroppingOpen)}
          >
            <FaChevronDown />
          </span>
        </div>

        {isDroppingOpen && (
          <>
            <div className="cabListing-boardingPointsSearch">
              <input type="text" placeholder="Choose Dropping Point" />
              <span className="cabListing-boardingPointsSearchIcon">
                <FaSearchLocation />
              </span>
            </div>

            <div className="cabListing-boardingPointsList">
              {droppingPoints.map((point, index) => (
                <label key={index} className="cabListing-boardingPointItem">
                  <input type="checkbox" />
                  {point}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CabFilters;
