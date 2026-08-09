import React from "react";
import "./HotelNotFound.css";
import { Link } from "react-router-dom";


const HotelNotFound = () => {
  return (
    <div className="noResultsContainer">
      <img src="/Images/browser.png" alt="No Results" className="noResultsIcon" />
      <p className="noResultsText">
        {/* <strong>No more matching properties found with your search/filter criteria.</strong> */}
        <strong>No properties found matching your selected search or filter criteria.</strong>
      </p>
      <div className="noResultsActions">
        {/* <a href="#" className="resetFilters">Reset all Filters</a> */}
        {/* <span className="divider">|</span> */}
        <Link to="/hotelmodify" className="modifySearch">Modify Search</Link>
      </div>
    </div>
  );
};

export default HotelNotFound;
