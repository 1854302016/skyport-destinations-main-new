import React from "react";
import "./Home.css";
const SliderCodeReuse = () => {
  return (
    <div className="itemss rounded">
      <a className="slider-content-container">
        <img
          src="https://www.alhindholidays.com/assets/img/visit-saudi.jpg"
          className="rounded img-fluid"
        />
        <div className="overlay">
          <div className="overlay-content">
            <h4 className="view-button">Explore Kerala</h4>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SliderCodeReuse;
