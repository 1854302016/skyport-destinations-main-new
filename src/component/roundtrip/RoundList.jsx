import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import RoundTripSkeleton from "./RoundTripSkeleton";
import RoundTripDetail from "./RoundTripDetail";
import { RiRadioButtonLine } from "react-icons/ri";
import { IoRadioButtonOff } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlightListSkeleton from "../Flight/FlightList/FlightListSkeleton";



export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};

const RoundList = ({
  search,
  isLoading,
  destinationCity,
  destinationCity2,
  startDate,
  filteredInboundData,
  handleChnageCurrency,
  selectedFlight,
  InboundResullt,
  handleClickDetail,
  activeId,
  endDate
}) => {
  const { errors } = useSelector((state) => state.flight);
  const navigate = useNavigate();
  useEffect(() => {
    if (errors) {
      navigate("/404"); // Navigating to the specified route
    }
  }, []);

  return (
    <Col
      lg={6}
      md={6}
      sm={6}
      xs={6}
      lgPull={6}
      className="cus_col_6"
      style={{ paddingRight: "0px",position:'relative' }}
    >
      {search && !isLoading ? (
        <div>
          {search.length !== 0 ? (
            <div className="content-main">
              <div className="block_content roundtrip_header">
                <ul>
                  <li className="flight_namess">
                    {destinationCity} <i className="fa fa-arrow-right" />{" "}
                    {destinationCity2}
                  </li>
                  <li className="date">
                    {startDate ? startDate.format("MM/DD/YYYY") : ""}
                     {endDate ? endDate.format("MM/DD/YYYY") : ""}
                  </li>
                  {/* <li className="prev_next_btn">
                    <a id="lnkOutBoundPrevDay">Prev Day</a>
                    <span />
                    <a id="lnkOutBoundNextDay">Next Day</a>
                  </li> */}
                </ul>
                <div className="clearfix" />
              </div>
              {/* <div className="block_content">
                <div className="flight_info">
                  <ul>
                    <li>
                      <a>Airlines</a>
                    </li>
                    <li>
                      <a onclick="DepartSortRoundOneWay()">
                        Depart <i className="depasorta fa fa-arrow-up" />
                        <i
                          style={{ display: "none" }}
                          className="depasortd fa fa-arrow-down"
                        />
                      </a>
                      <input
                        type="hidden"
                        id="depasorting"
                        defaultValue="descending"
                      />
                    </li>
                    <li>
                      <a onclick="RoundDurationSortOneWay()">
                        Duration <i className="durasorta fa fa-arrow-up" />
                        <i
                          style={{ display: "none" }}
                          className="durasortd fa fa-arrow-down"
                        />
                      </a>
                      <input
                        type="hidden"
                        id="durasorting"
                        defaultValue="descending"
                      />
                    </li>
                    <li>
                      <a onclick="ArriveSortRoundOneWay()">
                        Arrive <i className="arriveasorta fa fa-arrow-up" />
                        <i
                          style={{ display: "none" }}
                          className="arrivesortd fa fa-arrow-down"
                        />
                      </a>
                      <input
                        type="hidden"
                        id="arrivesorting"
                        defaultValue="descending"
                      />
                    </li>
                    <li className="price_control">
                      <a onclick="PriceSortDRTO()">
                        Price <i className="pricesorta fa fa-arrow-up" />
                        <i
                          style={{ display: "none" }}
                          className="pricesortd fa fa-arrow-down"
                        />
                      </a>
                      <input
                        type="hidden"
                        id="pricesorting"
                        defaultValue="descending"
                      />
                    </li>
                  </ul>
                  <div className="clearfix" />
                </div>
              </div> */}
              <div className="round_trip_list">
                <div className="refendable11 refendable11onward">
                  {filteredInboundData.map((e, index) => (
                    <div className="price1" key={index}>
                      <div className="price111 price111onword">
                        <div className="flight11">
                          <div className="stopscount">
                            <div
                              id="divOB2"
                              className="Price8083 allshow block-content-2 custom_block_content flight-list-v2 DRTFilter 6E Indigo 0Stops bingo_button_4"
                            >
                              <div className="box-result custom_box_result active">
                                <div className="flight_namess obflight_namess">
                                  {e.Segments[0][0].Airline.AirlineName}{" "}
                                  <span className="flight_no">
                                    {e.Segments[0][0].Airline.FlightNumber}
                                  </span>
                                </div>
                                <ul className="list-search-resultss result_list">
                                  <li>
                                    <img
                                      src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                                      alt=""
                                    />
                                  </li>
                                  <li className="price priced">
                                    <span className="airlineprice">
                                      <span className="mainprice">
                                        ${Math.round(e.Fare.PublishedFare)}
                                      </span>
                                    </span>
                                  </li>
                                  <li
                                    className={`round_check ${
                                      selectedFlight === e
                                        ? "round_checked_TGGG"
                                        : ""
                                    }`}
                                    onClick={() => InboundResullt(e)}
                                  >
                                    <div className="checkbox-default">
                                      <span>
                                        {selectedFlight === e ? (
                                          <RiRadioButtonLine
                                            color="#5091fa"
                                            size={25}
                                            className="cursor-pointer"
                                            onClick={() => InboundResullt(e)}
                                          />
                                        ) : (
                                          <IoRadioButtonOff
                                            color="#817b7b"
                                            size={25}
                                            className="cursor-pointer"
                                            onClick={() => InboundResullt(e)}
                                          />
                                        )}
                                      </span>
                                    </div>
                                  </li>
                                  {/* <li className={`round_check round_check_TGGG ${selectedFlight === e ? 'round_check_bac' : ''}`} 
                                onClick={() =>
                                              InboundResullt(e)
                                            }>
                                   
                                  </li> */}

                                  <li className="pad_left10">
                                    <span className="date departdate">
                                      {new Date(
                                        e.Segments[0][0].Origin.DepTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                    {e.Segments[0][0].Origin.Airport.CityName}
                                  </li>
                                  <li>
                                    <span className="duration departdur">
                                      {formatDuration(e.Segments[0][0].Duration)} 
                                      <span>
                                        <div className="cus_tooltip">
                                          {e.Segments[0].length - 1 === 0
                                            ? "Non-Stop"
                                            : `${
                                                e.Segments[0].length - 1
                                              } Stops`}
                                          {/* {flight.sI.length - 1 == 0
                                            ? "Non-Stop"
                                            : `${flight.sI.length - 1} Stops`} */}
                                        </div>
                                      </span>
                                    </span>
                                  </li>
                                  <li className="pad_left10">
                                    <span className="date arivedate">
                                      {new Date(
                                        e.Segments[0][
                                          e.Segments[0].length - 1
                                        ].Destination.ArrTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                    {
                                      e.Segments[0][e.Segments[0].length - 1]
                                        .Destination.Airport.CityName
                                    }
                                  </li>
                                </ul>
                                <div className="clearfix" />
                                <div className="flight_details">
                                  <a
                                    className={`details_btn flightdetailajax cursor-pointer`}
                                    onClick={() => {
                                      handleClickDetail(
                                        e.ResultIndex
                                      );
                                    }}
                                  >
                                    Fight Details
                                  </a>

                                  <div className="clearfix" />
                                </div>
                              </div>
                              {activeId === e.ResultIndex && (
                                <RoundTripDetail
                                  idx={e.ResultIndex}
                                  flight={e}
                                  handleClickDetail={handleClickDetail}
                                  handleChnageCurrency={handleChnageCurrency}
                                />
                               
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="round_trip_not_found">
              {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hostinger.in%2Ftutorials%2Fhow-to-fix-error-404&psig=AOvVaw2xOtPPomn-AoIQbyGgaiFN&ust=1715245883559000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIj4l__a_YUDFQAAAAAdAAAAABAE" alt="" /> */}
              No Data Found
            </div>
          )}
        </div>
      ) : (
        // <RoundTripSkeleton />
        <div>
          {errors ? <div>Loading................</div> : <FlightListSkeleton />}
        </div>
      )}
    </Col>
  );
};

export default RoundList;
