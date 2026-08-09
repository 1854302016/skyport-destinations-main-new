import React, { useState } from "react";
import './BusFilter.css';
import { Button, Col } from "react-bootstrap";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GoStopwatch } from "react-icons/go";
import { ImPriceTags } from "react-icons/im";
import { MdFlight } from "react-icons/md";
import Slider from "rc-slider";
import { FaChevronDown  } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaBus } from "react-icons/fa";




const BusFilter = () => {
  const [isBoardingOpen, setIsBoardingOpen] = useState(true);
  const [isDroppingOpen, setIsDroppingOpen] = useState(true);
  const [isBusOperatorOpen, setIsBusOperatorOpen] = useState(true);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);



  const boardingPoints = [
  "8287009889 Dhaula Kuan",
  "8287009889 Jhandewalan Metro Station",
  "8287009889 Anand Vihar ISBT",
  "ISBT Kashmiri Gate (PF1)",
  "Dhaula Kuan Skywalk",
  "8287009889 Dhaula Kuan",
  "8287009889 Jhandewalan Metro Station",
  "8287009889 Anand Vihar ISBT",
  "ISBT Kashmiri Gate (PF1)",
  "Dhaula Kuan Skywalk"
];
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
const busOperators = [
  "YOLO Bus",
  "Royal Travels",
  "GreenLine Express",
  "RedBus Premium",
  "Intercity Volvo",
  "Safe Travels",
  "Metro Link",
  "Northern Express"
];
const amenitiesList = [
  "Emergency Exit",
  "Fire Extinguisher",
  "GPS",
  "Water Bottle",
  "First Aid Box",
  "AC",
  "Reading Light",
  "Charging Point",
  "Blanket"
];




  return (
    <Col  className="filterDiv flightListPage busFilterDiv" style={{ marginBottom: "15px", position: "relative" }}>
      <div className="filterHead">
        <p style={{ fontWeight: "600", color: "#001f5d", fontSize: "18px", margin: "5px" }}>
          FILTER
        </p>
        <p style={{ margin: "5px" }}>CLEAR ALL</p>
      </div>

      {/* Price Range */}
      <div className="filterDivs" style={{ minHeight: "100px" }}>
        <div className="filterSubDiv">
          {/* <ImPriceTags size={22} style={{ marginTop: "15px", marginLeft: "10px" }} /> */}
          <p>Price Range</p>
        </div>
        <div className="box-content">
          <div className="slider-dragable-range slider-range-price">
            <Slider range min={1000} max={5000} value={[1000, 5000]} className="custom-slider" />
            <div className="slider-value">
              <span>₹1000</span> <span>-</span> <span>₹5000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Departure Time */}
      <div className="filterDivs" style={{ minHeight: "150px" }}>
        <div className="filterSubDiv">
          {/* <GiAirplaneDeparture size={22} style={{ marginTop: "15px", marginLeft: "10px" }} /> */}
          <p>Departure time</p>
        </div>
        <div className="prc_val ft1-sec">
          <div className="tm-dt1">
            <div className="tm11">
              <div className="tm-m11 blue">
                <div className="mor-n1"></div>
                <div className="tm-nf1 twh">Before<br />6 AM</div>
              </div>
            </div>
            <div className="tm22">
              <div className="tm-m12">
                <div className="mor1-n2"></div>
                <div className="tm-nf2">6 AM -<br />12 PM</div>
              </div>
            </div>
            <div className="tm33">
              <div className="tm-m22">
                <div className="mor2-n3"></div>
                <div className="tm-nf3">12 PM -<br />6 PM</div>
              </div>
            </div>
            <div className="tm11-n">
              <div className="tm-m33">
                <div className="mor3-n4"></div>
                <div className="tm-nf4">After<br />6 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Type */}
      <div className="filterDivs  busFilter-seatType" style={{ minHeight: "150px" }}>
        <div className="filterSubDiv">
          {/* <GiAirplaneArrival size={23} style={{ marginTop: "15px", marginLeft: "10px" }} /> */}
          <p>Seat Type</p>
        </div>
        <div className="prc_val ft1-sec2 busFilter-seatType">
              <div className="busFilter-Seats">
              <div className="busFilter-Seats1">
                <div className="busFilter-seatSleeper">
                  <div><img src="/Images/buses/sleeping.png" alt=""/></div>
                  <div className="busFilter-Sleeper">Sleeper</div>
                </div>
              </div>
              <div className="busFilter-Seats1">
                <div className="busFilter-seatSleeper">
                  <div><img src="/Images/buses/seat.png" alt=""/></div>
                  <div className="busFilter-Sleeper">Seater</div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Bus Type */}
      <div className="filterDivs  busFilter-seatType" style={{ minHeight: "150px" }}>
        <div className="filterSubDiv">
          {/* <GiAirplaneArrival size={23} style={{ marginTop: "15px", marginLeft: "10px" }} /> */}
          <p>Bus Type</p>
        </div>
        <div className="prc_val ft1-sec2 busFilter-seatType">
              <div className="busFilter-Seats">
              <div className="busFilter-Seats1">
                <div className="busFilter-seatSleeper">
                  <div><img src="/Images/buses/air-conditioner.png" alt=""/></div>
                  <div className="busFilter-Sleeper">AC</div>
                </div>
              </div>
              <div className="busFilter-Seats1">
                <div className="busFilter-seatSleeper">
                  <div><img src="/Images/buses/air-conditioning.png" alt=""/></div>
                  <div className="busFilter-Sleeper">Non AC</div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Boarding Points */}
      <div className="Buslisting-boardingPointsWrap">
        <div className="Buslisting-boardingPointsHeader">
          <h4>Boarding Points</h4>
          <span
            className="Buslisting-boardingPointsToggle"
            onClick={() => setIsBoardingOpen(!isBoardingOpen)}
          >
            <FaChevronDown  />
          </span>
        </div>

        {isBoardingOpen && (
          <>
            <div className="Buslisting-boardingPointsSearch">
              <input type="text" placeholder="Choose Boarding Point" />
              <span className="Buslisting-boardingPointsSearchIcon">
                <FaSearchLocation />
              </span>
            </div>

            <div className="Buslisting-boardingPointsList">
              {boardingPoints.map((point, index) => (
                <label key={index} className="Buslisting-boardingPointItem">
                  <input type="checkbox" />
                  {point}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

        {/* Dropping Points */}
        <div className="Buslisting-boardingPointsWrap">
          <div className="Buslisting-boardingPointsHeader">
            <h4>Dropping Points</h4>
            <span
              className={`Buslisting-boardingPointsToggle ${isDroppingOpen ? "open" : ""}`}
              onClick={() => setIsDroppingOpen(!isDroppingOpen)}
            >
              <FaChevronDown />
            </span>
          </div>

          {isDroppingOpen && (
            <>
              <div className="Buslisting-boardingPointsSearch">
                <input type="text" placeholder="Choose Dropping Point" />
                <span className="Buslisting-boardingPointsSearchIcon">
                  <FaSearchLocation />
                </span>
              </div>

              <div className="Buslisting-boardingPointsList">
                {droppingPoints.map((point, index) => (
                  <label key={index} className="Buslisting-boardingPointItem">
                    <input type="checkbox" />
                    {point}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bus Operator */}
        <div className="Buslisting-boardingPointsWrap">
          <div className="Buslisting-boardingPointsHeader">
            <h4>Bus Operators</h4>
            <span
              className="Buslisting-boardingPointsToggle"
              onClick={() => setIsBusOperatorOpen(!isBusOperatorOpen)}
            >
              <FaChevronDown />
            </span>
          </div>

          {isBusOperatorOpen && (
            <>
              <div className="Buslisting-boardingPointsSearch">
                <input type="text" placeholder="Search Bus Operator" />
                <span className="Buslisting-boardingPointsSearchIcon">
                  <FaSearchLocation />
                </span>
              </div>

              <div className="Buslisting-boardingPointsList">
                {busOperators.map((operator, index) => (
                  <label key={index} className="Buslisting-boardingPointItem">
                    <input type="checkbox" />
                    {operator}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Amenities */}
        <div className="Buslisting-boardingPointsWrap">
          <div className="Buslisting-boardingPointsHeader">
            <h4>Amenities</h4>
            <span
              className="Buslisting-boardingPointsToggle"
              onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
            >
              <FaChevronDown />
            </span>
          </div>

          {isAmenitiesOpen && (
            <>
              <div className="Buslisting-boardingPointsSearch">
                <input type="text" placeholder="Search Amenities" />
                <span className="Buslisting-boardingPointsSearchIcon">
                  <FaSearchLocation />
                </span>
              </div>

              <div className="Buslisting-boardingPointsList">
                {amenitiesList.map((amenity, index) => (
                  <label key={index} className="Buslisting-boardingPointItem">
                    <input type="checkbox" />
                    {amenity}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>


      <Button className="applyfilter" style={{ width: "100%", marginBlock: "10px", paddingTop: "8px", marginTop: "34px" }}>
        Apply Filters
      </Button>
    </Col>
  );
};

export default BusFilter;
