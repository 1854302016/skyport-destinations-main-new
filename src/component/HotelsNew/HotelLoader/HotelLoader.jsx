import React from "react";
import "./HotelLoader.css";

const HotelLoader = () => {
  return (
    <div className="hotelLoaderContainer" id="HotelLoader">
      <div className="hotelLoaderAnimation">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i + 1 }} />
        ))}
        <div className="hotelLoaderIcon"></div>
      </div>
      <div className="hotelLoaderText">
        Hold tight! Finding the best hotels for your stay.
      </div>
    </div>
  );
};

export default HotelLoader;
