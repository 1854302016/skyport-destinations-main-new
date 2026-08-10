import React, { useEffect, useState } from "react";
import axios from "axios";
import BusModifyForm from "./BusModifyForm";
import BusFilter from "./BusFilter";
import "./BusListing.css";
import { Col, Container, Row } from "react-bootstrap";
import { TiTickOutline } from "react-icons/ti";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { LuArrowDownUp } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import BusSeatLayout from "./BusSeatLayout";

const BusListing = () => {
  //   const location = useLocation();
  //  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [activeTabBus, setActiveTabBus] = useState("");

  const location = useLocation();
  const [busesData, setBusesData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [showSeatLayout, setShowSeatLayout] = useState(false);
  const [seatLayoutData, setSeatLayoutData] = useState({});
  const [boardingDropping, setBoardingDropping] = useState({});

  const [traceId, setTraceId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const OriginId = params.get("cityId");
    const DestinationId = params.get("desId");
    const journeyDate = params.get("journeyDate");

    if (!OriginId || !DestinationId || !journeyDate) return;

    const formattedDate = journeyDate.replace(/-/g, "/");

    const requestData = {
      OriginId: OriginId,
      DestinationId: DestinationId,
      DateOfJourney: formattedDate,
    };
    console.log(requestData);

    // Store requestData if needed later
    localStorage.setItem("busSearchData", JSON.stringify(requestData));

    //     const fetchBusDetails = async () => {
    //       const response = await axios.post(
    //         "https://admin.trustedfare.com/api/Bus/Search",
    //         requestData
    //       );
    //       console.log("Bus search response:", response.data);

    //       setBusesData(response.data?.data?.BusSearchResult);
    //       setTraceId(response.data?.data?.BusSearchResult.TraceId);
    //       // localStorage.setItem("BusDestination",response.data.data.BusSearchResult.Destination);
    //       // localStorage.setItem("BusOrigin",response.data.data.BusSearchResult.Origin);
    //       // localStorage.setItem("BusTraceId",response.data.data.BusSearchResult.TraceId);
    //       // localStorage.setItem("BusArrivalTime",response.data.data.BusSearchResult.ArrivalTime);
    //       // localStorage.setItem("BusDepartureTime",response.data.data.BusSearchResult.DepartureTime);
    //       // localStorage.setItem("BusDroppingPointsTime",response.data.data.BusSearchResult.DroppingPointsDetails.CityPointTime);
    //       // localStorage.setItem("BusOrigin",response.data.data.BusSearchResult.BoardingPointsDetails.CityPointTime);

    // const busResult = response.data.data.BusSearchResult.BusResults[0];
    // // console.log("RESULT BUS",busResult)
    // localStorage.setItem("BusDestination", response.data.data.BusSearchResult.Destination);
    // localStorage.setItem("BusOrigin", response.data.data.BusSearchResult.Origin);
    // localStorage.setItem("BusTraceId", response.data.data.BusSearchResult.TraceId);
    // // localStorage.setItem("BusResultIndex", busResult.ResultIndex);
    // localStorage.setItem("BusArrivalTime", busResult.ArrivalTime);
    // localStorage.setItem("BusDepartureTime", busResult.DepartureTime);

    // const droppingTime = busResult.DroppingPointsDetails?.[0]?.CityPointTime || "";
    // const boardingTime = busResult.BoardingPointsDetails?.[0]?.CityPointTime || "";

    // const droppingLocation = busResult.DroppingPointsDetails?.[0]?.CityPointLocation || "";
    // const boardingLocation = busResult.BoardingPointsDetails?.[0]?.CityPointLocation || "";

    // localStorage.setItem("BusDroppingPointsTime", droppingTime);
    // localStorage.setItem("BusBoardingPointsTime", boardingTime);

    // localStorage.setItem("BusDroppingPointsLocation", droppingLocation);
    // localStorage.setItem("BusBoardingPointsLocation", boardingLocation);

    // localStorage.setItem("BusType", busResult.BusType);
    // localStorage.setItem("BusTravelName", busResult.TravelName);

    //     };

    const fetchBusDetails = async () => {
      try {
        const response = await axios.post(
          "https://admin.trustedfare.com/api/Bus/Search",
          requestData
        );

        const busSearchResult = response.data?.data?.BusSearchResult;

        if (!busSearchResult) {
          console.error(
            "BusSearchResult not found in response:",
            response.data
          );
          setError("No results found");
          return;
        }

        setBusesData(busSearchResult);
        setTraceId(busSearchResult.TraceId);

        const busResult = busSearchResult.BusResults?.[0];

        if (busResult) {
          localStorage.setItem("BusDestination", busSearchResult.Destination);
          localStorage.setItem("BusOrigin", busSearchResult.Origin);
          localStorage.setItem("BusTraceId", busSearchResult.TraceId);
          localStorage.setItem("BusArrivalTime", busResult.ArrivalTime);
          localStorage.setItem("BusDepartureTime", busResult.DepartureTime);

          const droppingTime =
            busResult.DroppingPointsDetails?.[0]?.CityPointTime || "";
          const boardingTime =
            busResult.BoardingPointsDetails?.[0]?.CityPointTime || "";

          const droppingLocation =
            busResult.DroppingPointsDetails?.[0]?.CityPointLocation || "";
          const boardingLocation =
            busResult.BoardingPointsDetails?.[0]?.CityPointLocation || "";

          localStorage.setItem("BusDroppingPointsTime", droppingTime);
          localStorage.setItem("BusBoardingPointsTime", boardingTime);

          localStorage.setItem("BusDroppingPointsLocation", droppingLocation);
          localStorage.setItem("BusBoardingPointsLocation", boardingLocation);

          localStorage.setItem("BusType", busResult.BusType);
          localStorage.setItem("BusTravelName", busResult.TravelName);
        }
      } catch (err) {
        console.error("Bus Search API error:", err);
        setError("Something went wrong while fetching bus data");
      }
    };

    fetchBusDetails();
  }, [location.search]);

  const handleBookNowSeat = (resultIndex, index) => {
    localStorage.setItem("BusResultIndex", resultIndex);
    // console.log("RESULT INDEX",resultIndex)
    const payload = {
      TraceId: traceId,
      ResultIndex: resultIndex,
    };

    axios
      .post("https://admin.trustedfare.com/api/Bus/SeatLayout", payload)
      .then((response) => {
        const seatLayout =
          response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails;

        if (response.data && response.data.success === true) {
          setSeatLayoutData((prev) => ({
            ...prev,
            [index]: {
              show: !prev[index]?.show,
              data: seatLayout,
            },
          }));

          // const seatFare =response.data.data.GetBusSeatLayOutResult.SeatLayoutDetails.SeatDetails.Price;
          // localStorage.setItem("SeatBaseFare", seatFare.PublishedPriceRoundedOff);
          // console.log("BASE FARE",seatFare)

          axios
            .post(
              "https://admin.trustedfare.com/api/Bus/Boarding",
              payload
            )
            .then((response) => {
              const result = response.data;
              console.log("BUS BD DATA", result);
              const boarding =
                result?.data?.GetBusRouteDetailResult?.BoardingPointsDetails;
              const dropping =
                result?.data?.GetBusRouteDetailResult?.DroppingPointsDetails;

              setBoardingDropping((prev) => ({
                ...prev,
                [index]: {
                  boardingPoints: boarding,
                  droppingPoints: dropping,
                },
              }));

              console.log("Boarding/Dropping fetched:", { boarding, dropping });
            });
        }
      });
    // axios
    //   .post("https://admin.trustedfare.com/api/Bus/Boarding", payload)
    //   .then((response) => {
    //     const result = response.data;
    //     console.log("BUS BD DATA", result);
    //     const boarding =
    //       result?.data?.GetBusRouteDetailResult?.BoardingPointsDetails;
    //     const dropping =
    //       result?.data?.GetBusRouteDetailResult?.DroppingPointsDetails;

    //     setBoardingDropping((prev) => ({
    //       ...prev,
    //       [index]: {
    //         boardingPoints: boarding,
    //         droppingPoints: dropping,
    //       },
    //     }));

    //     console.log("Boarding/Dropping fetched:", { boarding, dropping });
    //   });
  };

  const amenitiesList = [
    "Emergency exit",
    "Fire Extinguisher",
    "GPS",
    "Water Bottle",
    "First Aid Box",
    "AC",
  ];

  return (
    <div>
      <div className="Buslisting">
        <BusModifyForm />
        <div className="Buslisting-wrapper">
          <Container>
            <Row>
              <Col md={3}>
                <BusFilter />
              </Col>

              <Col md={9}>
                <Row
                  style={{
                    margin: "0",
                    padding: "0",
                    background: "#fef3f3",
                    borderRadius: "5px 5px 0 0",
                  }}
                  className="d-md-flex row_backgorund_list_TG"
                >
                  <div className="Buslisting-header">
                    <div className="Buslisting-header-section Buslisting-header-times">
                      <Col md={3}>Departure</Col>
                      <Col md={3}>Duration</Col>
                      <Col md={3}>Arrival</Col>
                    </div>
                    <div className="Buslisting-header-section Buslisting-header-operator">
                      <Col md={6}>Bus Operator</Col>
                    </div>
                    <div className="Buslisting-header-section Buslisting-header-price">
                      <Col md={6}>Price</Col>
                    </div>
                  </div>
                </Row>
                {busesData &&
                  busesData.BusResults.length !== 0 &&
                  busesData.BusResults.map((bus, index) => (
                    <div className="Buslisting-card" key={index}>
                      <div className="Buslisting-main">
                        <Row>
                          <Col md={5}>
                            <div className="Buslisting-times">
                              <div className="Buslisting-time-block">
                                <div className="Buslisting-time">
                                  {new Date(bus.ArrivalTime).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    }
                                  )}
                                </div>
                                <div className="Buslisting-city">
                                  {busesData.Origin}
                                </div>
                                <div className="Buslisting-seats">
                                  {bus.AvailableSeats} Seat(s) left
                                </div>
                              </div>
                              <div className="Buslisting-duration">
                                {/* <div className="Buslisting-duration-text">05h 39m</div> */}
                                <div className="Buslisting-duration-text">
                                  {(() => {
                                    const departure = new Date(
                                      bus.DepartureTime
                                    );
                                    const arrival = new Date(bus.ArrivalTime);

                                    let diffMs =
                                      arrival.getTime() - departure.getTime();

                                    // If arrival time is before departure, assume arrival is next day or later
                                    if (diffMs < 0) {
                                      // Fallback: add 1 day (24hrs) to arrival to handle edge-case input errors
                                      diffMs += 24 * 60 * 60 * 1000;
                                    }

                                    const totalMinutes = Math.floor(
                                      diffMs / (1000 * 60)
                                    );
                                    const days = Math.floor(
                                      totalMinutes / (60 * 24)
                                    );
                                    const hours = Math.floor(
                                      (totalMinutes % (60 * 24)) / 60
                                    );
                                    const minutes = totalMinutes % 60;

                                    const paddedHours = String(hours).padStart(
                                      2,
                                      "0"
                                    );
                                    const paddedMinutes = String(
                                      minutes
                                    ).padStart(2, "0");

                                    return days > 0
                                      ? `${days}d ${paddedHours}h ${paddedMinutes}m`
                                      : `${paddedHours}h ${paddedMinutes}m`;
                                  })()}
                                </div>
                                <div className="Buslisting-dotted"></div>
                                {/* <div className="Buslisting-dot"></div> */}
                              </div>
                              <div className="Buslisting-time-block">
                                <div className="Buslisting-time">
                                  {new Date(
                                    bus.DepartureTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </div>
                                <div className="Buslisting-city">
                                  {busesData.Destination}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="Buslisting-operator">
                              <div className="Buslisting-operator-name">
                                {bus.TravelName}
                              </div>
                              <div className="Buslisting-operator-type">
                                {bus.BusType}{" "}
                              </div>
                              <div className="Buslisting-rating">
                                <span className="Buslisting-rating-badge">
                                  ⭐ 4.8
                                </span>
                                <span className="Buslisting-icons">
                                  <img
                                    src="/Images/buses/chair.png"
                                    alt="seat"
                                  />
                                  <img src="/Images/buses/ac.png" alt="ac" />
                                  <img
                                    src="/Images/buses/fire-extinguisher.png"
                                    alt=""
                                  />
                                </span>
                                <span className="Buslisting-extra">2+</span>
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="Buslisting-price">
                              <div className="Buslisting-price-text">
                                Starting From
                              </div>
                              <div className="Buslisting-price-strike">
                                ₹499
                              </div>
                              <div className="Buslisting-price-final">
                                ₹{bus.BusPrice.PublishedPriceRoundedOff}
                              </div>
                              {/* <button
  className="Buslisting-button"
  onClick={() => {
    handleBookNowSeat(bus.ResultIndex);
    setSeatLayoutData((prev) => ({
      ...prev,
      [index]: {
        show: !prev[index]?.show,
        TraceId: "08423d39-6987-4eec-9bc6-ee242080f120",
        ResultIndex: bus.ResultIndex,
      },
    }));
  }}
>
  Select Seats
</button> */}

                              <button
                                className="Buslisting-button"
                                onClick={() =>
                                  handleBookNowSeat(bus.ResultIndex, index)
                                }
                              >
                                Select Seats
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="Buslisting-belowItems">
                        <span className="Buslisting-belowItems-left">
                          <img src="/Images/buses/live.png" alt="" /> Live
                          Tracking
                        </span>
                        <div className="Buslisting-belowItems-right">
                          <ul className="Buslisting-belowItems-list">
                            <li
                              className={`Buslisting-belowItems-item ${
                                activeTabBus[index] === "boarding"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setActiveTabBus((prev) => ({
                                  ...prev,
                                  [index]:
                                    prev[index] === "boarding"
                                      ? ""
                                      : "boarding",
                                }))
                              }
                            >
                              Boarding & Dropping Point
                            </li>

                            <li
                              className={`Buslisting-belowItems-item ${
                                activeTabBus[index] === "amenities"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setActiveTabBus((prev) => ({
                                  ...prev,
                                  [index]:
                                    prev[index] === "amenities"
                                      ? ""
                                      : "amenities",
                                }))
                              }
                            >
                              Amenities
                            </li>

                            <li
                              className={`Buslisting-belowItems-item ${
                                activeTabBus[index] === "cancellation"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setActiveTabBus((prev) => ({
                                  ...prev,
                                  [index]:
                                    prev[index] === "cancellation"
                                      ? ""
                                      : "cancellation",
                                }))
                              }
                            >
                              Cancellation Policy
                            </li>
                          </ul>
                        </div>
                      </div>

                      {activeTabBus[index] === "boarding" && (
                        <div className="Buslisting-boardingPoints">
                          <div className="Buslisting-boarding-column">
                            <h4>Boarding Points</h4>
                            <ul>
                              {bus.BoardingPointsDetails?.map((point, i) => (
                                <li key={i}>
                                  (
                                  {new Date(
                                    point.CityPointTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                  ) {point.CityPointName}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="Buslisting-boarding-column">
                            <h4>Dropping Points</h4>
                            <ul>
                              {bus.DroppingPointsDetails?.map((point, i) => (
                                <li key={i}>
                                  (
                                  {new Date(
                                    point.CityPointTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                  ) {point.CityPointName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTabBus[index] === "amenities" && (
                        <div className="Buslisting-amenities">
                          <h4>List Of Amenities You Will Get</h4>
                          <div className="Buslisting-amenities-grid">
                            {amenitiesList.map((amenity, i) => (
                              <div key={i} className="Buslisting-amenity-item">
                                <TiTickOutline className="Buslisting-AmenitiesIcon" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTabBus[index] === "cancellation" && (
                        <div className="Buslisting-cancellation">
                          <div className="Buslisting-cancellation-left">
                            <table className="Buslisting-cancellation-table">
                              <thead>
                                <tr>
                                  <th>Cancellation Time</th>
                                  <th>Cancellation Charges</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bus.CancellationPolicies.map((item, i) => {
                                  let fromTime = new Date(item.FromDate);
                                  let toTime = new Date(item.ToDate);
                                  let timeStr;

                                  if (i === 0) {
                                    timeStr = `Till ${fromTime.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      }
                                    )}, ${fromTime.toDateString()}`;
                                  } else if (
                                    i ===
                                    bus.CancellationPolicies.length - 1
                                  ) {
                                    timeStr = `After ${fromTime.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      }
                                    )}, ${fromTime.toDateString()}`;
                                  } else {
                                    timeStr = `Between ${fromTime.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      }
                                    )}, ${fromTime.toDateString()} - ${toTime.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      }
                                    )}, ${toTime.toDateString()}`;
                                  }

                                  return (
                                    <tr key={i}>
                                      <td>{timeStr}</td>
                                      <td>{item.CancellationCharge}%</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div className="Buslisting-cancellation-right">
                            <p>
                              Cancellation charges are calculated on a per
                              passenger/Seat basis. The above cancellation
                              charge is calculated based on the starting seat
                              fare of ₹{bus.BusPrice.PublishedPriceRoundedOff}
                            </p>
                            <p>
                              Cancellation charges are calculated based on
                              service start date (origin point) + time at:{" "}
                              {new Date(bus.DepartureTime).toLocaleDateString(
                                "en-GB",
                                {
                                  weekday: "long",
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}{" "}
                              {new Date(bus.DepartureTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>

                            <p>
                              You cannot cancel the ticket after scheduled bus
                              departure time from the first origin point.
                            </p>
                          </div>
                        </div>
                      )}
                      {/* {seatLayoutData[index]?.show && (
  <div className="Buslisting-seatLayout-wrapper">
    <BusSeatLayout
 
    />
  </div>
)} */}
                      {seatLayoutData[index]?.show && (
                        <div className="Buslisting-seatLayout-wrapper">
                          <BusSeatLayout
                            seatData={seatLayoutData[index]?.data}
                            boardingDropping={boardingDropping[index]}
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Mobile View */}
      {busesData &&
        busesData.BusResults.length !== 0 &&
        busesData.BusResults.map((bus, index) => (
          <div className="BuslistingMobile">
            <div className="BuslistingMobile-topHeader">
              <div className="BuslistingMobile-headerRoute">
                <span className="BuslistingMobile-backArrow">
                  <FaRegArrowAltCircleLeft />
                </span>

                <div className="BuslistingMobile-routeInfo">
                  <div className="BuslistingMobile-route">
                    {busesData.Origin} - {busesData.Destination}
                  </div>
                  <div className="BuslistingMobile-date">
                    {moment(bus.ArrivalTime).format("ddd, DD MMM")}
                  </div>
                </div>

                <div className="BuslistingMobile-icons">
                  <span>
                    <IoSearchOutline />
                  </span>
                  <span>
                    <MdEdit />
                  </span>
                </div>
              </div>

              <div className="BuslistingMobile-sortTabs">
                <div className="active">
                  DEPARTURE <LuArrowDownUp />
                </div>
                <div>
                  DURATION <LuArrowDownUp />
                </div>
                <div>
                  PRICE <LuArrowDownUp />
                </div>
              </div>

              <div className="BuslistingMobile-resultsFilterRow">
                <span className="BuslistingMobile-busCount">5 Buses Found</span>
                <div className="BuslistingMobile-toggleWrap">
                  <span>Recommended</span>
                  <div className="BuslistingMobile-toggle">
                    <div className="BuslistingMobile-toggle-circle" />
                  </div>
                </div>
              </div>

              <div className="BuslistingMobile-filterChips">
                <div className="BuslistingMobile-chip">6pm-12am</div>
                <div className="BuslistingMobile-chip">AC</div>
                <div className="BuslistingMobile-chip">Non-AC</div>
              </div>
            </div>
            <Link to="/busprebook">
              <div className="BuslistingMobile-card">
                <div className="BuslistingMobile-recommended">Recommended</div>
                <div className="BuslistingMobile-cardTop">
                  <div className="BuslistingMobile-operator">
                    <strong>TESTING ACCOUNT</strong>
                    <div className="BuslistingMobile-rating">
                      {/* <span>4</span> */}
                      <span className="BuslistingMobile-star">★ 4.0</span>
                    </div>
                  </div>
                  <div className="BuslistingMobile-priceSection">
                    <div className="BuslistingMobile-startingFrom">
                      Starting From
                    </div>
                    <div className="BuslistingMobile-price">₹126.00</div>
                    <div className="BuslistingMobile-seatsLeft">
                      9 Seat (s) left
                    </div>
                  </div>
                </div>

                <div className="BuslistingMobile-timings">
                  <span>17:00</span>
                  <span className="BuslistingMobile-duration">29h 0m</span>
                  <span>22:00</span>
                </div>

                <div className="BuslistingMobile-iconsRow">
                  <img src="/Images/buses/chair.png" alt="seat" />
                  <img src="/Images/buses/ac.png" alt="ac" />
                  <img src="/Images/buses/fire-extinguisher.png" alt="" />
                  <span className="BuslistingMobile-seatsCount">2+</span>
                  <div className="BuslistingMobile-liveTracking">
                    <img src="/Images/buses/live.png" alt="" />
                    Live Tracking
                  </div>
                </div>

                <div className="BuslistingMobile-footer">
                  <span className="BuslistingMobile-dot" /> MTicket: Available
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BusListing;
