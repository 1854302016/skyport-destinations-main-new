import React from "react";
import "./DepartDetail.css";
export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};
const DepatureDetail = ({ srdvIdx, flight, type, flight2, flight3, types }) => {
  const formatTime = (arrTime) => {
    const date = new Date(arrTime);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = days[date.getDay()];
    const dateNum = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${dateNum} ${month} ${year}`;
  };

  const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
    const arrival = new Date(arrivalTime);
    const nextDeparture = new Date(nextDepartureTime);
    const layoverMinutes = Math.floor(
      (nextDeparture.getTime() - arrival.getTime()) / (1000 * 60)
    );
    const layoverHours = Math.floor(layoverMinutes / 60);
    const layoverMinutesRemainder = layoverMinutes % 60;
    return `${layoverHours}h : ${layoverMinutesRemainder}m`;
  };


  const getTimeDifference = (arrivalDateTime, departureDateTime) => {
  const arrival = new Date(arrivalDateTime);
  const departure = new Date(departureDateTime);

  const diffMs = departure - arrival;

  const totalMinutes = Math.abs(diffMs / (1000 * 60));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

  console.log("flightdepdetail", flight2);
  console.log("flightdepdetail flight3  ", flight3);
  const cabinClass = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };
  return (
    <>
      <div
        className="block-content-2 custom_block_content flight_detail_webTG"
        //     style={{

        //   boxShadow: type === "Return" ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        // }}
      >
        {srdvIdx === "undefined" && (
          <div
            className="box-result custom_box_result"
            style={{ display: "block" }}
          >
            {flight?.Segments?.[0]?.length > 0 && (
              <>
                <div className="flight_tags depart_tags">
                  <span style={{ zIndex: 2 }}>{type}</span>
                </div>
                {flight.Segments[0].map((segment, index) => (
                  <React.Fragment key={index}>
                    <ul className="list-search-result booking_list forMinScreenul">
                      <li className="flight_name">
                        <img
                          src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                          alt=""
                          style={{ width: "50px" }}
                        />

                        <div className="name">
                          {" "}
                          {segment.Airline.AirlineName}
                          <span className="flight_no">
                            {segment.Airline.AirlineCode}-
                            {segment.Airline.FlightNumber}
                          </span>
                          <span className="flightBookingHiddenTitle">
                            Economy
                          </span>
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {" "}
                          {segment.Origin.Airport.CityName},{" "}
                          {segment.Origin.Airport.CountryCode}
                        </span>
                        <strong>
                          {new Date(segment.Origin.DepTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </strong>
                        <span className="date">
                          {formatTime(segment.Origin.DepTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          {segment.Origin.Airport.CityName},{" "}
                          {segment.Origin.Airport.CountryCode}
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.Origin.Airport.AirportName} , Terminal{" "}
                          {segment.Origin.Airport.Terminal}
                        </span>
                      </li>
                      <li className="flight_amenties">
                        <div className="top">
                          <span className="duration">
                            <i
                              className="fa fa-clock"
                              style={{ marginRight: "3px" }}
                            />
                            {formatDuration(segment.Duration)}
                          </span>
                          <span className="flightDetailSpantag"></span>
                          <span className="grey_rtbrder">|</span>{" "}
                          <span className="flightBookingHiddenDelhi">
                            {cabinClass[segment.CabinClass]}{" "}
                          </span>
                        </div>

                        <div className="middle">
                          <span className="txt flighttxt">
                            <i className="fa fa-plane" />
                          </span>
                        </div>

                        <div className="bottom">
                          {segment.Baggage && (
                            <span className="wght">
                              {flight.Segments[0][0].Baggage}
                            </span>
                          )}

                          {segment.Baggage && flight.IsRefundable && (
                            <span className="grey_rtbrder">|</span>
                          )}

                          <>
                            <span className="refundable">
                              {" "}
                              {flight.IsRefundable === true
                                ? "Refundable"
                                : "Non Refundable"}
                            </span>
                          </>
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {segment.Destination.Airport.CityName},{" "}
                          {segment.Destination.Airport.CountryCode}
                        </span>
                        <strong>
                          {new Date(
                            segment.Destination.ArrTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">
                          {formatTime(segment.Destination.ArrTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          Pune, IN
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.Destination.Airport.AirportName} , Terminal{" "}
                          {segment.Destination.Airport.Terminal}{" "}
                        </span>
                      </li>
                    </ul>
                    <div className="clearfix" />
                    {index < flight.Segments[0].length - 1 && (
                      <div className="layover_time">
                        <div className="layover_txt">
                          Layover:
                          <span>
                            {formatLayoverTime(
                              segment.Destination.ArrTime,
                              flight.Segments[0][index + 1].Origin.DepTime
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
            {flight3 && (
              <>
                <div className="flight_tags depart_tags">
                  <span style={{ zIndex: 2 }}>{types}</span>
                </div>
                {flight3.Segments[1].map((segment, index) => (
                  <React.Fragment key={index}>
                    <ul className="list-search-result booking_list forMinScreenul">
                      <li className="flight_name">
                        <img
                          src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                          alt=""
                          style={{ width: "50px" }}
                        />

                        <div className="name">
                          {" "}
                          {segment.Airline.AirlineName}
                          <span className="flight_no">
                            {segment.Airline.AirlineCode}-
                            {segment.Airline.FlightNumber}
                          </span>
                          <span className="flightBookingHiddenTitle">
                            {cabinClass[segment.CabinClass]}
                          </span>
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {" "}
                          {segment.Origin.Airport.CityName},{" "}
                          {segment.Origin.Airport.CountryCode}
                        </span>
                        <strong>
                          {new Date(segment.Origin.DepTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </strong>
                        <span className="date">
                          {formatTime(segment.Origin.DepTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          {segment.Origin.Airport.CityName},{" "}
                          {segment.Origin.Airport.CountryCode}
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.Origin.Airport.AirportName} , Terminal{" "}
                          {segment.Origin.Airport.Terminal}
                        </span>
                      </li>
                      <li className="flight_amenties">
                        <div className="top">
                          <span className="duration">
                            <i
                              className="fa fa-clock"
                              style={{ marginRight: "3px" }}
                            />
                            {formatDuration(segment.Duration)}
                          </span>
                          <span className="flightDetailSpantag"></span>
                          <span className="grey_rtbrder">|</span>{" "}
                          <span className="flightBookingHiddenDelhi">
                            {cabinClass[segment.CabinClass]}{" "}
                          </span>
                        </div>

                        <div className="middle">
                          <span className="txt flighttxt">
                            <i className="fa fa-plane" />
                          </span>
                        </div>

                        <div className="bottom">
                          {segment.Baggage && (
                            <span className="wght">
                              {flight3.Segments[1][0].Baggage}
                            </span>
                          )}

                          {segment.Baggage && flight3.IsRefundable && (
                            <span className="grey_rtbrder">|</span>
                          )}

                          <>
                            <span className="refundable">
                              {" "}
                              {flight3.IsRefundable === true
                                ? "Refundable"
                                : "Non Refundable"}
                            </span>
                          </>
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {segment.Destination.Airport.CityName},{" "}
                          {segment.Destination.Airport.CountryCode}
                        </span>
                        <strong>
                          {new Date(
                            segment.Destination.ArrTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">
                          {formatTime(segment.Destination.ArrTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          Pune, IN
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.Destination.Airport.AirportName} , Terminal{" "}
                          {segment.Destination.Airport.Terminal}{" "}
                        </span>
                      </li>
                    </ul>
                    <div className="clearfix" />
                    {index < flight3.Segments[1].length - 1 && (
                      <div className="layover_time">
                        <div className="layover_txt">
                          Layover:
                          <span>
                            {formatLayoverTime(
                              segment.Destination.ArrTime,
                              flight3.Segments[1][index + 1].Origin.DepTime
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        )}
        {srdvIdx === "SrdvTJ" && (
          <>
            <div
              className="box-result custom_box_result"
              style={{ display: "block" }}
            >
              <div className="flight_tags depart_tags">
                <span style={{ zIndex: 2 }}>{type}</span>
              </div>
              {flight &&
                flight.sI.map((segment, index) => (
                  <React.Fragment key={index}>
                    <ul className="list-search-result booking_list forMinScreenul">
                      <li className="flight_name">
                        <img
                          src={`/Images/AirlineLogo/${segment.fD.aI.code}.gif`}
                          alt=""
                          style={{ width: "50px" }}
                        />

                        <div className="name">
                          {" "}
                          {segment.da.city}
                          <span className="flight_no">
                            {segment.fD.aI.code}-{segment.fD.fN}
                          </span>
                          <span className="flightBookingHiddenTitle">
                            {flight.totalPriceList[0].fd.ADULT.cc}
                          </span>
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {" "}
                          {segment.da.city}, {segment.da.countryCode}
                        </span>
                        <strong>
                          {new Date(segment.dt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">{formatTime(segment.dt)}</span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          {segment.da.city}, {segment.da.countryCode}
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.da.name}, Terminal {segment.da.terminal}
                        </span>
                      </li>
                      <li className="flight_amenties">
                        <div className="top">
                          <span className="duration">
                            <i
                              className="fa fa-clock"
                              style={{ marginRight: "3px" }}
                            />
                            {formatDuration(segment.duration)}
                          </span>
                          <span className="flightDetailSpantag"></span>
                          <span className="grey_rtbrder">|</span>{" "}
                          <span className="flightBookingHiddenDelhi">
                            {flight.totalPriceList[0].fd.ADULT.cc}{" "}
                          </span>
                        </div>

                        <div className="middle">
                          <span className="txt flighttxt">
                            <i className="fa fa-plane" />
                          </span>
                        </div>

                        <div className="bottom">
                          {
                            // segment.Baggage &&
                            <span className="wght">
                              {flight.totalPriceList[0].fd.ADULT.bI.cB}
                            </span>
                          }

                          {flight.totalPriceList[0].fd.ADULT.bI.cB &&
                            flight.totalPriceList[0].fd.ADULT.rT === 1 && (
                              <span className="grey_rtbrder">|</span>
                            )}

                          {flight.totalPriceList[0].fd.ADULT.rT === 1 && (
                            <>
                              <span className="refundable">Refundable</span>
                            </>
                          )}
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {segment.aa.city}, {segment.aa.countryCode}
                        </span>
                        <strong>
                          {new Date(segment.at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">{formatTime(segment.at)}</span>
                        {/* <span className="flightBookingHiddenTitle"> Pune, IN</span> */}
                        <span className="airport">
                          {" "}
                          {segment.aa.name}, Terminal {segment.aa.terminal}{" "}
                        </span>
                      </li>
                    </ul>
                    <div className="clearfix" />
                    {index < flight.sI.length - 1 && (
                      <div className="layover_time">
                        <div className="layover_txt">
                          Layover:
                          <span>
                            {formatLayoverTime(
                              segment.at,
                              flight.sI[index + 1].dt
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>

            {flight2 && flight2 !== "undefined" && flight2 !== "null" ? (
              <div
                className="box-result custom_box_result"
                style={{ display: "block" }}
              >
                <div className="flight_tags depart_tags">
                  <span style={{ zIndex: 2, top: "50%" }}>Return</span>
                </div>
                {flight2 &&
                  flight2.sI.map((segment, index) => (
                    <React.Fragment key={index}>
                      <ul className="list-search-result booking_list forMinScreenul">
                        <li className="flight_name">
                          <img
                            src={`/Images/AirlineLogo/${segment.fD.aI.code}.gif`}
                            alt=""
                            style={{ width: "50px" }}
                          />

                          <div className="name">
                            {" "}
                            {segment.da.city}
                            <span className="flight_no">
                              {segment.fD.aI.code}-{segment.fD.fN}
                            </span>
                            <span className="flightBookingHiddenTitle">
                              {flight2.totalPriceList[0].fd.ADULT.cc}
                            </span>
                          </div>
                        </li>
                        <li className="flight_time">
                          <span className="flightBookingHiddenDelhi">
                            {" "}
                            {segment.da.city}, {segment.da.countryCode}
                          </span>
                          <strong>
                            {new Date(segment.dt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </strong>
                          <span className="date">{formatTime(segment.dt)}</span>
                          <span className="flightBookingHiddenTitle">
                            {" "}
                            {segment.da.city}, {segment.da.countryCode}
                          </span>
                          <span className="airport">
                            {" "}
                            {segment.da.name}, Terminal {segment.da.terminal}
                          </span>
                        </li>
                        <li className="flight_amenties">
                          <div className="top">
                            <span className="duration">
                              <i
                                className="fa fa-clock"
                                style={{ marginRight: "3px" }}
                              />
                              {formatDuration(segment.duration)}
                            </span>
                            <span className="flightDetailSpantag"></span>
                            <span className="grey_rtbrder">|</span>{" "}
                            <span className="flightBookingHiddenDelhi">
                              {flight2.totalPriceList[0].fd.ADULT.cc}{" "}
                            </span>
                          </div>

                          <div className="middle">
                            <span className="txt flighttxt">
                              <i className="fa fa-plane" />
                            </span>
                          </div>

                          <div className="bottom">
                            {
                              // segment.Baggage &&
                              <span className="wght">
                                {flight2.totalPriceList[0].fd.ADULT.bI.cB}
                              </span>
                            }

                            {flight2.totalPriceList[0].fd.ADULT.bI.cB &&
                              flight2.totalPriceList[0].fd.ADULT.rT === 1 && (
                                <span className="grey_rtbrder">|</span>
                              )}

                            {flight2.totalPriceList[0].fd.ADULT.rT === 1 && (
                              <>
                                <span className="refundable">Refundable</span>
                              </>
                            )}
                          </div>
                        </li>
                        <li className="flight_time">
                          <span className="flightBookingHiddenDelhi">
                            {segment.aa.city}, {segment.aa.countryCode}
                          </span>
                          <strong>
                            {new Date(segment.at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </strong>
                          <span className="date">{formatTime(segment.at)}</span>
                          {/* <span className="flightBookingHiddenTitle"> Pune, IN</span> */}
                          <span className="airport">
                            {" "}
                            {segment.aa.name}, Terminal {segment.aa.terminal}{" "}
                          </span>
                        </li>
                      </ul>
                      <div className="clearfix" />
                      {index < flight2.sI.length - 1 && (
                        <div className="layover_time">
                          <div className="layover_txt">
                            Layover:
                            <span>
                              {formatLayoverTime(
                                segment.at,
                                flight2.sI[index + 1].dt
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              ""
            )}
          </>
        )}
        {srdvIdx === "SrdvP" && (
          <div
            className="box-result custom_box_result"
            style={{ display: "block" }}
          >
            <div className="flight_tags depart_tags">
              <span style={{ zIndex: 2 }}>{type}</span>
            </div>
            {type === "Departure" &&
              flight.OriginDestinationOptions[0].FlightSegments.map(
                (segment, index) => (
                  <React.Fragment key={index}>
                    <ul className="list-search-result booking_list forMinScreenul">
                      <li className="flight_name">
                        <img
                          src={`/Images/AirlineLogo/${segment.OperatingAirline.Code}.gif`}
                          alt=""
                          style={{ width: "50px" }}
                        />

                        <div className="name">
                          {" "}
                          {segment.DepartureCity.CITYNAME}
                          <span className="flight_no">
                            {segment.OperatingAirline.Code}-
                            {segment.OperatingAirline.FlightNumber}
                          </span>
                          {/* <span className="flightBookingHiddenTitle">Economy</span> */}
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {" "}
                          {segment.DepartureCity.CITYNAME},{" "}
                          {segment.DepartureCity.COUNTRYCODE}
                        </span>
                        <strong>
                          {new Date(
                            segment.DepartureDateTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">
                          {formatTime(segment.DepartureDateTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          {segment.DepartureCity.CITYNAME},{" "}
                          {segment.DepartureCity.COUNTRYCODE}
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.DepartureCity.AIRPORTNAME}
                          {/* , Terminal{" "}{segment.Origin.Airport.Terminal} */}
                        </span>
                      </li>
                      <li className="flight_amenties">
                        <div className="top">
                          <span className="duration">
                            <i
                              className="fa fa-clock"
                              style={{ marginRight: "3px" }}
                            />
                            {formatDuration(segment.JourneyDuration)}
                          </span>
                          <span className="flightDetailSpantag"></span>
                          <span className="grey_rtbrder">|</span>{" "}
                          {/* <span className="flightBookingHiddenDelhi">Economy </span> */}
                        </div>

                        <div className="middle">
                          <span className="txt flighttxt">
                            <i className="fa fa-plane" />
                          </span>
                        </div>

                        <div className="bottom">
                          {segment.Baggage && (
                            <span className="wght">{segment.Baggage}</span>
                          )}

                          {segment.Baggage && flight.IsRefundable && (
                            <span className="grey_rtbrder">|</span>
                          )}

                          {/* {flight.IsRefundable && (
                    <>
                      <span className="refundable">Refundable</span>
                    </>
                  )} */}
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {segment.ArrivalCity.CITYNAME},{" "}
                          {segment.ArrivalCity.COUNTRYCODE}
                        </span>
                        <strong>
                          {new Date(segment.ArrivalDateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </strong>
                        <span className="date">
                          {formatTime(segment.ArrivalDateTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          Pune, IN
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.ArrivalCity.AIRPORTNAME}
                          {/* , Terminal{" "}{segment.Destination.Airport.Terminal}{" "} */}
                        </span>
                      </li>
                    </ul>
                    <div className="clearfix" />
                    {index <
                      flight.OriginDestinationOptions[0].FlightSegments.length -
                        1 && (
                      <div className="layover_time">
                        <div className="layover_txt">
                          Layover:
                          <span>
                            {formatLayoverTime(
                              segment.ArrivalDateTime,
                              flight.OriginDestinationOptions[0].FlightSegments[
                                index + 1
                              ].DepartureDateTime
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )
              )}

            {type === "Return" &&
              flight.OriginDestinationOptions[1].FlightSegments.map(
                (segment, index) => (
                  <React.Fragment key={index}>
                    <ul className="list-search-result booking_list forMinScreenul">
                      <li className="flight_name">
                        <img
                          src={`/Images/AirlineLogo/${segment.OperatingAirline.Code}.gif`}
                          alt=""
                          style={{ width: "50px" }}
                        />

                        <div className="name">
                          {" "}
                          {segment.DepartureCity.CITYNAME}
                          <span className="flight_no">
                            {segment.OperatingAirline.Code}-
                            {segment.OperatingAirline.FlightNumber}
                          </span>
                          {/* <span className="flightBookingHiddenTitle">Economy</span> */}
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {" "}
                          {segment.DepartureCity.CITYNAME},{" "}
                          {segment.DepartureCity.COUNTRYCODE}
                        </span>
                        <strong>
                          {new Date(
                            segment.DepartureDateTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                        <span className="date">
                          {formatTime(segment.DepartureDateTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          {segment.DepartureCity.CITYNAME},{" "}
                          {segment.DepartureCity.COUNTRYCODE}
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.DepartureCity.AIRPORTNAME}
                          {/* , Terminal{" "}{segment.Origin.Airport.Terminal} */}
                        </span>
                      </li>
                      <li className="flight_amenties">
                        <div className="top">
                          <span className="duration">
                            <i
                              className="fa fa-clock"
                              style={{ marginRight: "3px" }}
                            />
                            {formatDuration(segment.JourneyDuration)}
                          </span>
                          <span className="flightDetailSpantag"></span>
                          <span className="grey_rtbrder">|</span>{" "}
                          {/* <span className="flightBookingHiddenDelhi">Economy </span> */}
                        </div>

                        <div className="middle">
                          <span className="txt flighttxt">
                            <i className="fa fa-plane" />
                          </span>
                        </div>

                        <div className="bottom">
                          {segment.Baggage && (
                            <span className="wght">{segment.Baggage}</span>
                          )}

                          {segment.Baggage && flight.IsRefundable && (
                            <span className="grey_rtbrder">|</span>
                          )}

                          {/* {flight.IsRefundable && (
                    <>
                      <span className="refundable">Refundable</span>
                    </>
                  )} */}
                        </div>
                      </li>
                      <li className="flight_time">
                        <span className="flightBookingHiddenDelhi">
                          {segment.ArrivalCity.CITYNAME},{" "}
                          {segment.ArrivalCity.COUNTRYCODE}
                        </span>
                        <strong>
                          {new Date(segment.ArrivalDateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </strong>
                        <span className="date">
                          {formatTime(segment.ArrivalDateTime)}
                        </span>
                        <span className="flightBookingHiddenTitle">
                          {" "}
                          Pune, IN
                        </span>
                        <span className="airport">
                          {" "}
                          {segment.ArrivalCity.AIRPORTNAME}
                          {/* , Terminal{" "}{segment.Destination.Airport.Terminal}{" "} */}
                        </span>
                      </li>
                    </ul>
                    <div className="clearfix" />
                    {index <
                      flight.OriginDestinationOptions[1].FlightSegments.length -
                        1 && (
                      <div className="layover_time">
                        <div className="layover_txt">
                          Layover:
                          <span>
                            {formatLayoverTime(
                              segment.ArrivalDateTime,
                              flight.OriginDestinationOptions[1].FlightSegments[
                                index + 1
                              ].DepartureDateTime
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )
              )}
            {/* <div className="layover_time">
                    <div className="layover_txt">
                      Layover:<span>2h : 10m</span>
                    </div>
                  </div>
                  <ul className="list-search-result booking_list forMinScreenul">
                    <li className="flight_name">
                      <img
                        src="https://images-platform.99static.com//ee5DpJb0wvpRSgjbg0FEFl-RZsc=/943x0:1534x591/fit-in/590x590/99designs-contests-attachments/60/60257/attachment_60257611"
                        alt=""
                        style={{ width: "50px" }}
                      />
                      <div className="name">
                        {" "}
                        AirAsia
                        <span className="flight_no">I5-721</span>
                        <span className="flightBookingHiddenTitle">
                          Economy
                        </span>
                      </div>
                    </li>
                    <li className="flight_time">
                      <span className="flightBookingHiddenDelhi">
                        {" "}
                        Delhi, IN
                      </span>
                      <strong>21:25</strong>
                      <span className="date">Mon, 11 Mar 2024</span>
                      <span className="flightBookingHiddenTitle">
                        {" "}
                        Delhi, IN
                      </span>
                      <span className="airport">
                        {" "}
                        Indira Gandhi Airport , Terminal 3
                      </span>
                    </li>
                    <li className="flight_amenties">
                      <div className="top">
                        <span className="duration">
                          <i className="fa fa-clock" />
                          02h 10m
                        </span>
                        <span className="flightDetailSpantag"></span>
                        <span className="grey_rtbrder">|</span>{" "}
                        
                        <span className="flightBookingHiddenDelhi">
                          Economy{" "}
                        </span>
                      </div>

                      <div className="middle">
                        <span className="txt">
                          <i className="fa fa-plane" /> Flight
                        </span>
                      </div>

                      <div className="bottom">
                        <span className="wght">15KG</span>
                        
                        <span className="grey_rtbrder">|</span>
                        <span className="refundable">Refundable</span>
                      </div>
                    </li>
                    <li className="flight_time">
                      <span className="flightBookingHiddenDelhi">Pune, IN</span>
                      <strong>23:35</strong>
                      <span className="date">Mon, 11 Mar 2024</span>
                      <span className="flightBookingHiddenTitle">
                        {" "}
                        Pune, IN
                      </span>
                      <span className="airport"> Lohegaon, Terminal </span>
                    </li>
                  </ul>
                  <div className="clearfix" /> */}
          </div>
        )}

        {srdvIdx === "EwebM" && (
          <>
            <div
              className="box-result custom_box_result"
              style={{ display: "block" }}
            >
              <div className="flight_tags depart_tags">
                <span style={{ zIndex: 2 }}>Departure</span>
              </div>
              {type === "Departure" &&
                flight.PricedItineraries[0].OriginDestinationOptions[0].FlightSegments.map(
                  (segment, index) => (
                    <React.Fragment key={index}>
                      <ul className="list-search-result booking_list forMinScreenul">
                        <li className="flight_name">
                          <img
                            src={`/Images/AirlineLogo/${segment.MarketingAirlineCode}.gif`}
                            alt=""
                            style={{ width: "50px" }}
                          />

                          <div className="name">
                            {" "}
                            {/* {segment.DepartureCity.CITYNAME} */}
                            <span className="flight_no">
                              {segment.OperatingAirline.Code}-
                              {segment.FlightNumber}
                            </span>
                            {/* <span className="flightBookingHiddenTitle">Economy</span> */}
                          </div>
                        </li>
                        <li className="flight_time">
                          <span className="flightBookingHiddenDelhi">
                            {" "}
                            {segment.SourceAirport.city_name} (
                            {segment.SourceAirport.city_code})
                          </span>
                          <strong>
                            {new Date(
                              segment.DepartureDateTime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </strong>
                          <span className="date">
                            {formatTime(segment.DepartureDateTime)}
                          </span>
                          <span className="flightBookingHiddenTitle">
                            {" "}
                            {/* {segment.DepartureAirportLocationCode} */}
                            {/* {segment.SourceAirport.city_name},{" "} */}
                            {/* {segment.SourceAirport.country_code} */}
                          </span>
                          <span className="airport">
                            {" "}
                            {segment.SourceAirport.airport_name}
                          </span>
                        </li>
                        <li className="flight_amenties">
                          <div className="top">
                            <span className="duration">
                              <i
                                className="fa fa-clock"
                                style={{ marginRight: "3px" }}
                              />
                              {/* {getTimeDifference(segment.DepartureDateTime,segment.ArrivalDateTime)} */}
                              {formatDuration(segment.JourneyDuration)}
                            </span>
                            <span className="flightDetailSpantag"></span>
                            <span className="grey_rtbrder">|</span>{" "}
                            <span className="flightBookingHiddenDelhi">
                              {segment.CabinClassCode === "Y" && "Economy"}{" "}
                            </span>
                          </div>

                          <div className="middle">
                            <span className="txt flighttxt">
                              <i className="fa fa-plane" />
                            </span>
                          </div>

                          <div className="bottom">
                            {/* {segment.Baggage && (
                            <span className="wght">{segment.Baggage}</span>
                          )} */}

                            {/* <span className="grey_rtbrder">|</span> */}

                            {flight && flight.PricedItineraries[0] && (
                              <>
                                <span className="refundable">
                                  {flight.PricedItineraries[0]
                                    .AirItineraryPricingInfo.IsRefundable ===
                                  "NO"
                                    ? "Non Refundable"
                                    : "Refundable"}
                                </span>
                              </>
                            )}
                          </div>
                        </li>
                        <li className="flight_time">
                          <span className="flightBookingHiddenDelhi">
                            {segment.DestinationAirport.city_name} (
                            {segment.DestinationAirport.city_code})
                          </span>
                          <strong>
                            {new Date(
                              segment.ArrivalDateTime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </strong>
                          <span className="date">
                            {formatTime(segment.ArrivalDateTime)}
                          </span>
                          <span className="flightBookingHiddenTitle">
                            {" "}
                            Pune, IN
                          </span>
                          <span className="airport">
                            {" "}
                            {segment.DestinationAirport.airport_name}
                            {/* , Terminal{" "}{segment.Destination.Airport.Terminal}{" "} */}
                          </span>
                        </li>
                      </ul>
                      <div className="clearfix" />
                      {index <
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments.length -
                          1 && (
                        <div className="layover_time">
                          <div className="layover_txt">
                            Layover:
                            <span>
                              {formatLayoverTime(
                                segment.ArrivalDateTime,
                                flight.PricedItineraries[0]
                                  .OriginDestinationOptions[0].FlightSegments[
                                  index + 1
                                ].DepartureDateTime
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )
                )}
            </div>
            {flight.PricedItineraries[0].OriginDestinationOptions[1] && (
              <div style={{ position: "relative" }}>
                <div
                  className="box-result custom_box_result"
                  style={{ display: "block" }}
                >
                  <div className="flight_tags depart_tags">
                    <span style={{ zIndex: 2, left: "-10px" }}>Return</span>
                  </div>
                  {flight.PricedItineraries[0].OriginDestinationOptions[1] &&
                    flight.PricedItineraries[0].OriginDestinationOptions[1].FlightSegments.map(
                      (segment, index) => (
                        <React.Fragment key={index}>
                          <ul className="list-search-result booking_list forMinScreenul">
                            <li className="flight_name">
                              <img
                                src={`/Images/AirlineLogo/${segment.MarketingAirlineCode}.gif`}
                                alt=""
                                style={{ width: "50px" }}
                              />

                              <div className="name">
                                {" "}
                                {/* {segment.DepartureCity.CITYNAME} */}
                                <span className="flight_no">
                                  {segment.OperatingAirline.Code}-
                                  {segment.FlightNumber}
                                </span>
                                {/* <span className="flightBookingHiddenTitle">Economy</span> */}
                              </div>
                            </li>
                            <li className="flight_time">
                              <span className="flightBookingHiddenDelhi">
                                {" "}
                                {segment.SourceAirport.city_name} (
                                {segment.SourceAirport.city_code})
                              </span>
                              <strong>
                                {new Date(
                                  segment.DepartureDateTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </strong>
                              <span className="date">
                                {formatTime(segment.DepartureDateTime)}
                              </span>
                              <span className="flightBookingHiddenTitle">
                                {" "}
                                {/* {segment.DepartureAirportLocationCode} */}
                                {/* {segment.SourceAirport.city_name},{" "} */}
                                {/* {segment.SourceAirport.country_code} */}
                              </span>
                              <span className="airport">
                                {" "}
                                {segment.SourceAirport.airport_name}
                              </span>
                            </li>
                            <li className="flight_amenties">
                              <div className="top">
                                <span className="duration">
                                  <i
                                    className="fa fa-clock"
                                    style={{ marginRight: "3px" }}
                                  />
                                    {/* {getTimeDifference(segment.DepartureDateTime,segment.ArrivalDateTime)} */}
                                  {formatDuration(segment.JourneyDuration)}
                                </span>
                                <span className="flightDetailSpantag"></span>
                                <span className="grey_rtbrder">|</span>{" "}
                                <span className="flightBookingHiddenDelhi">
                                  {segment.CabinClassCode === "Y" && "Economy"}{" "}
                                </span>
                              </div>

                              <div className="middle">
                                <span className="txt flighttxt">
                                  <i className="fa fa-plane" />
                                </span>
                              </div>

                              <div className="bottom">
                                {/* {segment.Baggage && (
                            <span className="wght">{segment.Baggage}</span>
                          )} */}

                                {/* <span className="grey_rtbrder">|</span> */}

                                {flight && flight.PricedItineraries[0] && (
                                  <>
                                    <span className="refundable">
                                      {flight.PricedItineraries[0]
                                        .AirItineraryPricingInfo
                                        .IsRefundable === "NO"
                                        ? "Non Refundable"
                                        : "Refundable"}
                                    </span>
                                  </>
                                )}
                              </div>
                            </li>
                            <li className="flight_time">
                              <span className="flightBookingHiddenDelhi">
                                {segment.DestinationAirport.city_name} (
                                {segment.DestinationAirport.city_code})
                              </span>
                              <strong>
                                {new Date(
                                  segment.ArrivalDateTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </strong>
                              <span className="date">
                                {formatTime(segment.ArrivalDateTime)}
                              </span>
                              <span className="flightBookingHiddenTitle">
                                {" "}
                                Pune, IN
                              </span>
                              <span className="airport">
                                {" "}
                                {segment.DestinationAirport.airport_name}
                                {/* , Terminal{" "}{segment.Destination.Airport.Terminal}{" "} */}
                              </span>
                            </li>
                          </ul>
                          <div className="clearfix" />
                          {index <
                            flight.PricedItineraries[0]
                              .OriginDestinationOptions[1].FlightSegments
                              .length -
                              1 && (
                            <div className="layover_time">
                              <div className="layover_txt">
                                Layover:
                                <span>
                                  {formatLayoverTime(
                                    segment.ArrivalDateTime,
                                    flight.PricedItineraries[0]
                                      .OriginDestinationOptions[1]
                                      .FlightSegments[index + 1]
                                      .DepartureDateTime
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {flight && flight.PricedItineraries[0].OriginDestinationOptions[0] && (
        <section className="flt-area flight_detail_phoneTG">
          <div className="flt-container">
            <div className="cardFlgbx">
              <div className="crd-head">
                <div className="fnt-18 fnt-600 ng-binding">
                  {" "}
                  {
                    flight.PricedItineraries[0].OriginDestinationOptions[0]
                      .FlightSegments[0].SourceAirport.city_name
                  }
                  -
                  {
                    flight.PricedItineraries[0].OriginDestinationOptions[0]
                      .FlightSegments[
                      flight.PricedItineraries[0].OriginDestinationOptions[0]
                        .FlightSegments.length - 1
                    ].DestinationAirport.city_name
                  }
                </div>
                <div className="flt-tp">
                  <span className="fnt-11 clr-grey ng-binding">
                    {formatTime(
                      flight.PricedItineraries[0].OriginDestinationOptions[0]
                        .FlightSegments[0].DepartureDateTime
                    )}
                  </span>{" "}
                  <span className="depblue ng-scope">Departure</span>
                </div>
              </div>
              {flight.PricedItineraries[0].OriginDestinationOptions[0].FlightSegments.map(
                (segment, index) => (
                  <div>
                    <div className="FlghtBoxNew mt-5 ng-scope">
                      <div className="clr" />

                      <div className="card-head  d-flex gap-10 align-items-center">
                        <img
                          src={`/Images/AirlineLogo/${segment.MarketingAirlineCode}.gif`}
                        />
                        <div className="flt-nm">
                          {/* <span
                          className="fnt-600 ng-binding"
                          ng-bind="l.airName"
                        >
                          {segment.Airline.AirlineName}
                        </span>{" "}
                        |{" "} */}
                          <span className="fnt-500 fnt-15 ng-binding">
                            {" "}
                            {segment.OperatingAirline.Code}-
                            {segment.FlightNumber}
                          </span>
                        </div>
                        {flight && flight.PricedItineraries[0] && (
                          <span className="rfnd-btn fnt-10 ng-binding ng-scope">
                            {flight.PricedItineraries[0].AirItineraryPricingInfo
                              .IsRefundable === "NO"
                              ? "Non Refundable"
                              : "Refundable"}
                          </span>
                        )}
                        {/* <span className="rfnd-btn fnt-10 ng-binding ng-scope">
                        {flight.IsRefundable === true
                          ? "Refundable"
                          : "Non Refundable"}
                      </span> */}
                      </div>

                      <span
                        className="secre ng-binding ng-scope"
                        style={{ display: "block" }}
                      >
                        {flight.ResBookDesigText} |{" "}
                        {segment.CabinClassCode === "Y" && "Economy"}{" "}
                      </span>

                      <div className="card-body d-flex justify-content-between gap-10 align-items-center1">
                        <div className="ft-frm w-35 ">
                          <div className="fnt-12 clr-drkgrey ng-binding">
                            {formatTime(segment.DepartureDateTime)}
                          </div>
                          <div className="d-flex gap-5">
                            <div className="frm fnt-16 fnt-600 ng-binding">
                              {" "}
                              {segment.SourceAirport.city_code}
                            </div>
                            <div className="fnt-16 fnt-600 ng-binding">
                              {" "}
                              {new Date(
                                segment.DepartureDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>
                          <div className="clr-drkgrey fnt-15 fw600 ng-binding">
                            {segment.SourceAirport.city_name}
                          </div>

                          {/* <div className="clr-drkgrey fnt-10 arpt ng-binding ng-scope">
                          {segment.Origin.Airport.Terminal !== "" && (
                            <>Terminal - {segment.Origin.Airport.Terminal}</>
                          )}
                        </div> */}
                        </div>
                        <div
                          className="jrny w-20 text-center"
                          style={{ margin: "10px auto" }}
                        >
                          <div className="clr-drkgrey fnt-11 ng-binding">
                            <span> ... </span>   {getTimeDifference(segment.DepartureDateTime,segment.ArrivalDateTime)}{" "}
                            <span> ...</span>
                          </div>
                        </div>
                        <div className="ft-to w-35 text-end">
                          <div className="fnt-12 clr-drkgrey ng-binding">
                            {formatTime(segment.ArrivalDateTime)}
                          </div>
                          <div className="d-flex gap-5 justify-content-end">
                            <div className="frm fnt-16 fnt-600 ng-binding">
                              {" "}
                              {segment.DestinationAirport.city_code}
                            </div>
                            <div className="fnt-16 fnt-500 ng-binding">
                              {" "}
                              {new Date(
                                segment.ArrivalDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>
                          <div className="clr-drkgrey fnt-16 fw600 ng-binding">
                            {segment.DestinationAirport.city_name}
                          </div>
                          {/* <div className="clr-drkgrey fnt-10 arpt ng-binding ng-scope">
                          {segment.Destination.Airport.Terminal !== "" && (
                            <>
                              Terminal - {segment.Destination.Airport.Terminal}
                            </>
                          )}
                        </div> */}
                        </div>
                      </div>
                    </div>
                    {index <
                      flight.PricedItineraries[0].OriginDestinationOptions[0]
                        .FlightSegments.length -
                        1 && (
                      <div className="FlghtBoxNew mt-5 ng-scope">
                        <div className="clr" />

                        <div className="lyovr  ng-scope">
                          <span className="ng-binding">
                            {formatLayoverTime(
                              segment.ArrivalDateTime,
                              flight.PricedItineraries[0]
                                .OriginDestinationOptions[0].FlightSegments[
                                index + 1
                              ].DepartureDateTime
                            )}
                            Layover{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {flight && flight.PricedItineraries[0].OriginDestinationOptions[1] && (
        <section className="flt-area flight_detail_phoneTG">
          <div className="flt-container">
            <div className="cardFlgbx">
              <div className="crd-head">
                <div className="fnt-18 fnt-600 ng-binding">
                  {" "}
                  {
                    flight.PricedItineraries[0].OriginDestinationOptions[1]
                      .FlightSegments[0].SourceAirport.city_name
                  }
                  -
                  {
                    flight.PricedItineraries[0].OriginDestinationOptions[1]
                      .FlightSegments[
                      flight.PricedItineraries[0].OriginDestinationOptions[1]
                        .FlightSegments.length - 1
                    ].DestinationAirport.city_name
                  }
                </div>
                <div className="flt-tp">
                  <span className="fnt-11 clr-grey ng-binding">
                    {formatTime(
                      flight.PricedItineraries[0].OriginDestinationOptions[1]
                        .FlightSegments[0].DepartureDateTime
                    )}
                  </span>{" "}
                  <span className="depblue ng-scope">Return</span>
                </div>
              </div>
              {flight.PricedItineraries[0].OriginDestinationOptions[1].FlightSegments.map(
                (segment, index) => (
                  <div>
                    <div className="FlghtBoxNew mt-5 ng-scope">
                      <div className="clr" />

                      <div className="card-head  d-flex gap-10 align-items-center">
                        <img
                          src={`/Images/AirlineLogo/${segment.MarketingAirlineCode}.gif`}
                        />
                        <div className="flt-nm">
                          {/* <span
                          className="fnt-600 ng-binding"
                          ng-bind="l.airName"
                        >
                          {segment.Airline.AirlineName}
                        </span>{" "}
                        |{" "} */}
                          <span className="fnt-500 fnt-15 ng-binding">
                            {" "}
                            {segment.OperatingAirline.Code}-
                            {segment.FlightNumber}
                          </span>
                        </div>
                        {flight && flight.PricedItineraries[0] && (
                          <span className="rfnd-btn fnt-10 ng-binding ng-scope">
                            {flight.PricedItineraries[0].AirItineraryPricingInfo
                              .IsRefundable === "NO"
                              ? "Non Refundable"
                              : "Refundable"}
                          </span>
                        )}
                        {/* <span className="rfnd-btn fnt-10 ng-binding ng-scope">
                        {flight.IsRefundable === true
                          ? "Refundable"
                          : "Non Refundable"}
                      </span> */}
                      </div>

                      <span
                        className="secre ng-binding ng-scope"
                        style={{ display: "block" }}
                      >
                        {flight.ResBookDesigText} |{" "}
                        {segment.CabinClassCode === "Y" && "Economy"}{" "}
                      </span>

                      <div className="card-body d-flex justify-content-between gap-10 align-items-center1">
                        <div className="ft-frm w-35 ">
                          <div className="fnt-12 clr-drkgrey ng-binding">
                            {formatTime(segment.DepartureDateTime)}
                          </div>
                          <div className="d-flex gap-5">
                            <div className="frm fnt-16 fnt-600 ng-binding">
                              {" "}
                              {segment.SourceAirport.city_code}
                            </div>
                            <div className="fnt-16 fnt-600 ng-binding">
                              {" "}
                              {new Date(
                                segment.DepartureDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>
                          <div className="clr-drkgrey fnt-15 fw600 ng-binding">
                            {segment.SourceAirport.city_name}
                          </div>

                          {/* <div className="clr-drkgrey fnt-10 arpt ng-binding ng-scope">
                          {segment.Origin.Airport.Terminal !== "" && (
                            <>Terminal - {segment.Origin.Airport.Terminal}</>
                          )}
                        </div> */}
                        </div>
                        <div
                          className="jrny w-20 text-center"
                          style={{ margin: "10px auto" }}
                        >
                          <div className="clr-drkgrey fnt-11 ng-binding">
                            <span> ... </span>   {getTimeDifference(segment.DepartureDateTime,segment.ArrivalDateTime)} {" "}
                            <span> ...</span>
                          </div>
                        </div>
                        <div className="ft-to w-35 text-end">
                          <div className="fnt-12 clr-drkgrey ng-binding">
                            {formatTime(segment.ArrivalDateTime)}
                          </div>
                          <div className="d-flex gap-5 justify-content-end">
                            <div className="frm fnt-16 fnt-600 ng-binding">
                              {" "}
                              {segment.DestinationAirport.city_code}
                            </div>
                            <div className="fnt-16 fnt-500 ng-binding">
                              {" "}
                              {new Date(
                                segment.ArrivalDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>
                          <div className="clr-drkgrey fnt-16 fw600 ng-binding">
                            {segment.DestinationAirport.city_name}
                          </div>
                          {/* <div className="clr-drkgrey fnt-10 arpt ng-binding ng-scope">
                          {segment.Destination.Airport.Terminal !== "" && (
                            <>
                              Terminal - {segment.Destination.Airport.Terminal}
                            </>
                          )}
                        </div> */}
                        </div>
                      </div>
                    </div>
                    {index <
                      flight.PricedItineraries[0].OriginDestinationOptions[1]
                        .FlightSegments.length -
                        1 && (
                      <div className="FlghtBoxNew mt-5 ng-scope">
                        <div className="clr" />

                        <div className="lyovr  ng-scope">
                          <span className="ng-binding">
                            {formatLayoverTime(
                              segment.ArrivalDateTime,
                              flight.PricedItineraries[0]
                                .OriginDestinationOptions[1].FlightSegments[
                                index + 1
                              ].DepartureDateTime
                            )}
                            Layover{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DepatureDetail;
