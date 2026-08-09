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

import "./Sort.css";
import { RxCross2 } from "react-icons/rx";
import Slider from "rc-slider";
import { MdFlight } from "react-icons/md";
function Sort({
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
  sortType,
  setSortType,
}) {
  return (
    <div className="mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">
      <div className="actpop fltr-pop" id="idflr" ng-show="isFilt">
        <div className="popbx ">
          <div className="close-btn fltPop" onClick={closeFilter}>✕</div>
          <div className="ovf-sc">
              {/* <div className="line"></div> */}
          <Container className="sort-options-container heading_flight_list_three">
            <Row className="sort-row">
              <Col className="sort-option" onClick={() => setSortType("price")}>
                <input
                  type="radio"
                  name="sort"
                  id="sort-price"
                  checked={sortType === "price"}
                  onChange={() => setSortType("price")}
                />
                <div className="sort-label">
                  <span className="sort-title">Price</span>
                  <div className="sort-subtitle">Low to High</div>
                </div>
              </Col>
              <Col className="sort-option" onClick={() => setSortType("departure")}>
                <input
                  type="radio"
                  name="sort"
                  id="sort-departure"
                  checked={sortType === "departure"}
                  onChange={() => setSortType("departure")}
                />
                <div className="sort-label">
                  <span className="sort-title">Departure</span>
                  <div className="sort-subtitle">Earliest First</div>
                </div>
              </Col>
            </Row>

            <Row className="sort-row">
              <Col className="sort-option" onClick={() => setSortType("fastest")}>
                <input
                  type="radio"
                  name="sort"
                  id="sort-fastest"
                  checked={sortType === "fastest"}
                  onChange={() => setSortType("fastest")}
                />
                <div className="sort-label">
                  <span className="sort-title">Fastest</span>
                  <div className="sort-subtitle">Shortest First</div>
                </div>
              </Col>
              <Col className="sort-option" onClick={() => setSortType("smart")}>
                <input
                  type="radio"
                  name="sort"
                  id="sort-smart"
                  checked={sortType === "smart"}
                  onChange={() => setSortType("smart")}
                />
                <div className="sort-label">
                  <span className="sort-title">Smart</span>
                  <div className="sort-subtitle">Recommended</div>
                </div>
              </Col>
            </Row>
          </Container>

          <div className="text-wrapper">
            <div className="sort-heading">Smart Sort?</div>
            <div className="sort-body">
              Flights are sorted based on price, duration, stops & other factors
              to help you choose the best flight.
            </div>
          </div>

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

export default Sort;
