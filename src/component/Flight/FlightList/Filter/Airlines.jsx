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
import { RxCross2 } from "react-icons/rx";
import Slider from "rc-slider";
import { MdFlight } from "react-icons/md";
function Airlines({
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
              <a onClick={closeFilter} className="slt-st goTopBtn">Apply</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airlines;
