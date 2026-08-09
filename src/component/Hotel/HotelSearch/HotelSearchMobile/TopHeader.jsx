import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import "./TopHeader.css";
import { Link } from "react-router-dom";
import WebCheckInForm from "../../../Flight/FlightSearchMobile/WebCheckInForm";

const TopHeader = ({ heading, showNationality }) => {
  const backtoHome = () => {
    // Implement backtoHome logic
  };

  const [isWebInputSelected, setWebInputSelected] = useState(false);
  const handleWebInputFocus = () => {
    setWebInputSelected(true);
  };
  const closeWebInput = () => {
    setWebInputSelected(false);
  };
  const OpenBoxCountryListing = () => {
    // Implement OpenBoxCountryListing logic
    handleWebInputFocus();
  };

  const [country, setCountry] = useState({
    code: "af",
    name: "Afganistan",
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: heading,
          text: `Check out this page: ${window.location.href}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error.message);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <>
      <section className="_tophdr" style={{ background: "#fff" }}>
        <Container fluid>
          <div className="_ininety">
            <div className="_flxhudrd">
              <Link className="_BkHome" onClick={backtoHome}>
                <BsArrowLeft className="arwWwhte" />
              </Link>
              <div className="_tvhdr">{heading}</div>
              {showNationality && (
                <div
                  className="_langview b2cpanel"
                  onClick={OpenBoxCountryListing}>
                  <span id="spnFlgImgHead">
                    <img
                      src={`https://flagcdn.com/w20/${country.code}.png`}
                      // width="18"
                      alt=""
                    />
                  </span>
                  <span id="spnCC">{country.name}</span>
                  {/* <span>| ENG</span> */}
                  <i className="_arrwdnlang"></i>
                </div>
              )}
              <div
                id="flipv3"
                className="_shricn"
                style={!showNationality ? { marginLeft: "auto" } : {}}
                onClick={handleShare}></div>
            </div>
          </div>
        </Container>
      </section>

      {isWebInputSelected && (
        <WebCheckInForm
          closeWebInput={closeWebInput}
          code={country.code}
          name={country.name}
          setCountry={setCountry}
        />
      )}
    </>
  );
};

export default TopHeader;
