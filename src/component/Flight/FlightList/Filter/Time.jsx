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
import "./Time.css";
import { RxCross2 } from "react-icons/rx";
import Slider from "rc-slider";
import { MdFlight } from "react-icons/md";
function Time({
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
          <div className="close-btn fltPop" onClick={closeFilter}>✕</div>
          <div className="ovf-sc">
            <div className="flter">
              <div className=" d-flex justify-content-between align-items-center">
                <div className="fltr-title">Filter</div>
                <small>Reset</small>
              </div>
            </div>

            <Container className="filter-container">
             

              
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
              <a onClick={closeFilter} className="slt-st goTopBtn">Apply</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Time;
