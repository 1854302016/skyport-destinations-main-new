import React from "react";
import PropTypes from "prop-types";
import "./MobileApp.css";

const MobileApp = ({
  backgroundImage,
  title,
  description
}) => {
  return (
    <section id="mobile-app">
      <div className="container">
        <div
          className="mobile-app-bg"
          style={{
            background: `url("${backgroundImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50%",
            backgroundSize: "cover",
          }}
        >
          <div className="app-details-section">
            <h2 className="text-[#fff] no-margin" style={{ color: "#fff" }}>
              {title}
            </h2>
            <p
              className="text-[#fff]"
              style={{ color: "#fff", marginTop: "8px", marginBottom: "30px" }}
            >
              {description}
            </p>
            <div className="d-flex flex-row align-items-center">
             <div className="mb-3 mr-10">
               <a>
                 <img src="https://www.alhind.com/assets/img/playstore.svg" className="app-icon-ios"/>
               </a>
            </div>
             <div className="mb-3">
               <a>
                 <img src="https://www.alhind.com/assets/img/appstore.svg" className="app-icon-android" />
               </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Optional: Define PropTypes for better type checking
MobileApp.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MobileApp;