import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import "./Filter.css";
import { RxCross2 } from "react-icons/rx";
import Slider from "rc-slider";
import { MdFlight } from "react-icons/md";
function Filter({
  showFilter,
  closeFilter,
  minFare,
  maxFare,
  sliderValue,
  clearAllFilters,
  handleSliderChange,
  handledepTimeFilter,
  deptimeRange,
  arrtimeRange,
  handlearrTimeFilter,
  handleShowAllStops,
  checkedStops,
  handleCheckedstops,
  handleShowAllairlinenames,
  airlines,
  handleChecked,
  setShowFilter,
  applyFilters,
  handleChnageCurrency,
  handleChangeCurrency2,
  airlineCodes,
}) {
  return (
    <div className="mobile heading_flight_list_two">
      <div className="actpop fltr-pop" id="idflr" ng-show="isFilt">
        <div className="popbx ">
          <div className="close-btn fltPop" onClick={closeFilter}>
            ✕
          </div>
          <div className="ovf-sc">
            <div className="flter">
              <div className=" d-flex justify-content-between align-items-center">
                <div className="fltr-title">Filter</div>
                <small>Reset</small>
              </div>
            </div>

            <Container className="filter-container">
              <div className="filter-heading">Stop</div>
              <Row className="filter-row">
                <Col className={`filter-option`}>
                  <span>Non-Stop</span>
                  <input
                    type="checkbox"
                    name=""
                    checked={checkedStops.includes("non-stop")}
                    onChange={() => handleCheckedstops("non-stop")}
                  />
                </Col>
              </Row>
              <Row className="filter-row">
                <Col className={`filter-option`}>
                  <span>1 Stop</span>
                  <input
                    name=""
                    checked={checkedStops.includes("1-stop")}
                    id="chkOneStop"
                    type="checkbox"
                    onChange={() => handleCheckedstops("1-stop")}
                  />
                </Col>
              </Row>
              <Row className="filter-row">
                <Col className={`filter-option`}>
                  <span>2+ Stop</span>
                  <input
                    name=""
                    checked={checkedStops.includes("2-stop")}
                    id="chkTwoStop"
                    type="checkbox"
                    onChange={() => handleCheckedstops("2-stop")}
                  />
                </Col>
              </Row>

              <div className="line"></div>

              {/* Filter Range */}

              <div className="filter-heading ">Filter Price</div>
              <div>
                <div className="box-content">
                  <input type="hidden" className="pricenew" value="180-3000" />
                  <div className="slider-dragable-range slider-range-price">
                    <Slider
                      range
                      min={minFare}
                      max={maxFare}
                      value={sliderValue}
                      onChange={handleSliderChange}
                      className="custom-slider"
                    />
                    <div className="slider-value">
                      <span>₹{parseInt(sliderValue[0])}</span> <span>-</span>{" "}
                      <span>₹{parseInt(sliderValue[1])}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line"></div>

              {/* Departure Details */}

              <div className="departure ">Arrival Time</div>
              <Container className="heading_flight_list_four">
                <Row className="departure-details">
                  <Col
                    className={`departure-box ${
                      arrtimeRange[0] === 0 && arrtimeRange[1] === 6
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handlearrTimeFilter([0, 6])}
                  >
                    Early Morning<div>Before 6AM</div>
                  </Col>
                  <Col
                    className={`departure-box ${
                      arrtimeRange[0] === 6 && arrtimeRange[1] === 12
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handlearrTimeFilter([6, 12])}
                  >
                    Morning<div>6AM–12PM</div>
                  </Col>
                </Row>
                <Row className="departure-details">
                  <Col
                    className={`departure-box ${
                      arrtimeRange[0] === 12 && arrtimeRange[1] === 18
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handlearrTimeFilter([12, 18])}
                  >
                    Mid Day<div>12PM–6PM</div>
                  </Col>
                  <Col
                    className={`departure-box ${
                      arrtimeRange[0] === 18 && arrtimeRange[1] === 24
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handlearrTimeFilter([18, 24])}
                  >
                    Night<div>After 6PM</div>
                  </Col>
                </Row>
              </Container>

              {/* Popular Airlines */}

              <div className="line"></div>

              <div className="departure ">Departure Time</div>
              <Container className="heading_flight_list_four">
                <Row className="departure-details">
                  <Col
                    className={`departure-box ${
                      deptimeRange[0] === 0 && deptimeRange[1] === 6
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handledepTimeFilter([0, 6])}
                  >
                    Early Morning<div>Before 6AM</div>
                  </Col>
                  <Col
                    className={`departure-box ${
                      deptimeRange[0] === 6 && deptimeRange[1] === 12
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handledepTimeFilter([6, 12])}
                  >
                    Morning<div>6AM–12PM</div>
                  </Col>
                </Row>
                <Row className="departure-details">
                  <Col
                    className={`departure-box ${
                      deptimeRange[0] === 12 && deptimeRange[1] === 18
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handledepTimeFilter([12, 18])}
                  >
                    Mid Day<div>12PM–6PM</div>
                  </Col>
                  <Col
                    className={`departure-box ${
                      deptimeRange[0] === 18 && deptimeRange[1] === 24
                        ? "blue_filter_pone"
                        : ""
                    }`}
                    onClick={() => handledepTimeFilter([18, 24])}
                  >
                    Night<div>After 6PM</div>
                  </Col>
                </Row>
              </Container>
              <div className="line"></div>
              <div
                className="filterDivs flightIconDiv"
                style={{ border: "none" }}
              >
                <div className="filterSubDiv">
                  <p style={{ margin: "0px" }}>Popular Airlines</p>
                  {/* <div style={{ display: "flex", marginLeft: "auto" }}>
                    <input
                      style={{
                        marginTop: "0px",
                        marginLeft: "15px",
                        margin: 5,
                      }}
                      type="checkbox"
                      name="showall"
                      onChange={handleShowAllairlinenames}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "16px",
                        marginLeft: "5px",
                        margin: 5,
                        color: "rgb(51,51,51)",
                      }}
                    >
                      Show all
                    </p>
                  </div> */}
                </div>
                {airlines.map((airline, index) => (
                  <div
                    className="stops"
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "16px",
                        marginLeft: "5px",
                        color: "rgb(51,51,51)",
                      }}
                    >
                      {airlineCodes && airlineCodes.length !== 0 && (
                        <img
                          src={`/Images/AirlineLogo/${airlineCodes[index]}.gif`}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                            marginLeft: "10px",
                          }}
                        />
                      )}

                      {airline.name}
                    </p>
                    <input
                      type="checkbox"
                      onClick={() => handleChecked(airline.name)}
                      defaultChecked={airline.selected}
                    />

                    {/* <p
                      style={{
                        fontSize: "13px",
                        marginTop: "16px",
                        marginLeft: "auto",
                        color: "rgb(51,51,51)",
                      }}
                    ></p> */}
                  </div>
                ))}
              </div>
            </Container>

            <div
              className="apl-btn"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => clearAllFilters()}
                className="clear-btn"
                style={{ fontSize: "14px" }}
              >
                Clear
              </div>
              <a onClick={closeFilter} className="slt-st goTopBtn">
                Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
