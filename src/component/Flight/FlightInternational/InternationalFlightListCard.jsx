import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import "./FlightInternational.css";
import { FlightListInfo } from "../FlightList/FlightListInfo";
import { FlightListInfoInternational } from "./FlightListInfoInternational";
// import { PropagateLoader } from "react-spinners";
import { airlinesnames } from "../../../Airlines";
import { BASE_URL } from "../../../config";
import { useCurrency } from "../../../context/CurrencyContext";
import PassengerContactModal from "../PassengerContactModal";

const CABIN_CLASS_LABELS = { 2: "Economy", 3: "Premium Economy", 4: "Business", 6: "First Class" };

export const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
  const arrival = new Date(arrivalTime);
  const nextDeparture = new Date(nextDepartureTime);
  const layoverMinutes = Math.floor(
    (nextDeparture.getTime() - arrival.getTime()) / (1000 * 60),
  );
  const layoverHours = Math.floor(layoverMinutes / 60);
  const layoverMinutesRemainder = layoverMinutes % 60;
  return `${layoverHours}h : ${layoverMinutesRemainder}m`;
};
const formatDateTimeWithBreak = (dateTimeStr) => {
  if (!dateTimeStr) return null;

  const date = new Date(dateTimeStr);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    // year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
     {formattedTime}
      <br />
      {formattedDate}
    </>
  );
};

const InternationalFlightListCard = ({
  e,
  handleMoreFare,
  handleClick,
  activeId,
  showModal,
  setShowModal,
  formatTime,
  handleChnageCurrency,
  handleChangeCurrency2,
  fareRules,
  isFareLoading,
  baggageRules,
  formatDuration,
  searchMeta,
}) => {
  const { formatPrice } = useCurrency();
  const fareSourceCode = e.AirItineraryPricingInfo.FareSourceCode;
  const [bookingStatus, setBookingStatus] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);

  const proceedBooking = async (contact) => {
    if (bookingStatus[fareSourceCode] === "loading" || bookingStatus[fareSourceCode] === "done") return;

    const { name, email, phone } = contact;

    setBookingStatus((prev) => ({ ...prev, [fareSourceCode]: "loading" }));

    try {
      const departureLeg = e.OriginDestinationOptions[0];
      const returnLeg = e.OriginDestinationOptions[1];
      const outFirst = departureLeg.FlightSegments[0];
      const outLast = departureLeg.FlightSegments[departureLeg.FlightSegments.length - 1];
      const retFirst = returnLeg.FlightSegments[0];
      const outStops = departureLeg.FlightSegments.length - 1;
      const retStops = returnLeg.FlightSegments.length - 1;
      const total = e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;

      const payload = {
        name,
        email,
        phone,
        destination: `${outFirst.SourceAirport?.city_name} (${outFirst.DepartureAirportLocationCode}) -> ${outLast.DestinationAirport?.city_name} (${outLast.ArrivalAirportLocationCode})`,
        date: outFirst.DepartureDateTime ? outFirst.DepartureDateTime.split("T")[0] : "",
        return_date: retFirst.DepartureDateTime ? retFirst.DepartureDateTime.split("T")[0] : "",
        trip_type: "RoundTrip",
        cabin_class: CABIN_CLASS_LABELS[Number(searchMeta?.Segments?.[0]?.FlightCabinClass)] || "",
        airline: airlinesnames.find((a) => a.AirlineCode === outFirst.OperatingAirline.Code)?.AirlineName || outFirst.OperatingAirline.Code,
        flight_number: `${outFirst.OperatingAirline.Code}-${outFirst.FlightNumber}`,
        fare: total,
        adults: searchMeta?.AdultCount ? Number(searchMeta.AdultCount) : 1,
        children: searchMeta?.ChildCount ? Number(searchMeta.ChildCount) : 0,
        infants: searchMeta?.InfantCount ? Number(searchMeta.InfantCount) : 0,
        fare_source_code: fareSourceCode,
        message: `Departure: ${outStops === 0 ? "Non-stop" : `${outStops} Stop(s)`} | Return: ${retStops === 0 ? "Non-stop" : `${retStops} Stop(s)`}${e.IsRefundable ? " - Refundable" : ""}`,
      };

      await axios.post(`${BASE_URL}flight-book-enquiry`, payload);
      setBookingStatus((prev) => ({ ...prev, [fareSourceCode]: "done" }));
    } catch (error) {
      console.error("Error submitting flight book enquiry:", error);
      setBookingStatus((prev) => ({ ...prev, [fareSourceCode]: "error" }));
      alert("Something went wrong while sending your request. Please try again.");
    }
  };

  const submitFlightBookEnquiry = () => {
    if (bookingStatus[fareSourceCode] === "loading" || bookingStatus[fareSourceCode] === "done") return;

    const name = localStorage.getItem("passengerName") || "";
    const email = localStorage.getItem("passengerEmail") || "";
    const phone = localStorage.getItem("passengerPhone") || "";

    if (!name || !email || !phone) {
      setShowContactModal(true);
      return;
    }

    proceedBooking({ name, email, phone });
  };

  const handleContactSubmit = (contact) => {
    localStorage.setItem("passengerName", contact.name);
    localStorage.setItem("passengerEmail", contact.email);
    localStorage.setItem("passengerPhone", contact.phone);
    setShowContactModal(false);
    proceedBooking(contact);
  };

  const bookNowLabel =
    bookingStatus[fareSourceCode] === "loading"
      ? "Sending..."
      : bookingStatus[fareSourceCode] === "done"
        ? "Request Sent ✓"
        : "Book Now";

  return (
    <>
    <div className="card_styling_flight_listt card_styling_flight_listt_inter">
      {e.OriginDestinationOptions && (
        <div className="internationtrip_search">
          <div className="lis">
            <div className="li-c">
              <div className="fg-wr">
                <div className="fg-wl">
                  <div className="fg-wlm">
                    <div className="fg-wll">
                      <div className="flgi">
                        <div className="flgi-l">
                          <img
                            alt="Flight"
                            width={40}
                            src={`/Images/AirlineLogo/${e.OriginDestinationOptions[0].FlightSegments[0].OperatingAirline.Code}.gif`}
                          />
                          {/* {e.isLcc} */}
                        </div>
                        <div className="flgi-r">
                          <div className="flnmm ng-binding">
                            {
                              airlinesnames.find(
                                (airline) =>
                                  airline.AirlineCode ===
                                  e.OriginDestinationOptions[0]
                                    .FlightSegments[0].OperatingAirline.Code,
                              ).AirlineName
                            }{" "}
                          </div>
                          <div className="flnm1">
                            <span className="ng-binding">
                              {
                                e.OriginDestinationOptions[0].FlightSegments[0]
                                  .OperatingAirline.Code
                              }
                              -
                              {
                                e.OriginDestinationOptions[0].FlightSegments[0]
                                  .FlightNumber
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fg-wlr">
                      <div className="flgi">
                        <div className="flgi-l">
                          <img
                            alt="Flight"
                            width={40}
                            src={`/Images/AirlineLogo/${e.OriginDestinationOptions[1].FlightSegments[0].OperatingAirline.Code}.gif`}
                          />
                        </div>
                        <div className="flgi-r">
                          <div className="flnmm ng-binding">
                            {
                              airlinesnames.find(
                                (airline) =>
                                  airline.AirlineCode ===
                                  e.OriginDestinationOptions[1]
                                    .FlightSegments[0].OperatingAirline.Code,
                              ).AirlineName
                            }{" "}
                          </div>
                          <div className="flnm1">
                            <span className="ng-binding">
                              {" "}
                              {
                                e.OriginDestinationOptions[1].FlightSegments[0]
                                  .OperatingAirline.Code
                              }
                              -
                              {
                                e.OriginDestinationOptions[1].FlightSegments[0]
                                  .FlightNumber
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-wrr" style={{ position: "relative" }}>
                  <div className="flgi-rm">
                    <div className="flgi-rm3 intButton">
                      <button
                        id="BK_20"
                        className="ng-scope"
                        disabled={bookingStatus[fareSourceCode] === "loading" || bookingStatus[fareSourceCode] === "done"}
                        onClick={submitFlightBookEnquiry}
                      >
                        {bookNowLabel}
                      </button>
                    </div>

                    <div className="freflex">
                      <div className="fare_rt">
                        <div className="rtintfre ng-scope">
                          <span className="ng-binding ng-scope">
                            {formatPrice(e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount)}
                          </span>
                        </div>
                      </div>
                      <div className="clr" />

                      {/* <div
                        className="cou-text-app3 ng-binding ng-scope"
                        style={{ display: "block" }}
                      >
                        Rs.999 Discount Applied
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lism">
                <div className="lism-l">
                  <div className="dptt">
                    <span> Departure</span>
                  </div>
                  <div className="lis-de">
                    <div className="list-main">
                      <div className="flig flig_ow ng-scope">
                        <label className=" radio_label">
                          <div className="bkp-c">
                            <div className="flig-h">
                              <div className="flig1">
                                <div className="fligm">
                                  <div className="flig-r">
                                    <div className="flig-sr">
                                      <span className="ng-binding">
                                        {" "}
                                        <span style={{ fontSize: "12px" }}>
                                          {" "}
                                          {
                                            e.OriginDestinationOptions[0]
                                              .FlightSegments[0]?.SourceAirport
                                              ?.city_name
                                          }
                                        </span>
                                        (
                                        {
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments[0]
                                            .DepartureAirportLocationCode
                                        }
                                        ){" "}
                                      </span>{" "}
                                      <strong>
                                        <span className="ng-binding">
                                          {new Date(
                                            e.OriginDestinationOptions[0]
                                              .FlightSegments[0]
                                              .DepartureDateTime,
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                          })}
                                          
                                        </span>
                                      </strong>
                                    </div>
                                    <span className="intrtcy fltl ng-binding">
                                      {/* {e.Segments[0][0].Origin.Airport.CityName} */}
                                    </span>

                                    <div className="trvd ng-binding">
                                      {formatTime(
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments[0].DepartureDateTime,
                                      )}
                                    </div>
                                    <div className="distancenv2 tleft ng-binding" />
                                  </div>
                                </div>
                              </div>
                              <div className="flig1 wde36">
                                <div className="stp">
                                  <span className="ng-binding">
                                    {" "}
                                    {/* {formatDuration(
                                      e.OriginDestinationOptions[0]
                                        .FlightSegments[0].JourneyDuration,
                                    )}{" "} */}
                                    {/* {formatDuration(
  e.OriginDestinationOptions[0].FlightSegments
    .reduce((sum, segment) => sum + (segment.JourneyDuration || 0), 0)
)}{" "} */}
{formatDuration(
  Math.floor(
    (new Date(
      e.OriginDestinationOptions[0].FlightSegments[
        e.OriginDestinationOptions[0].FlightSegments.length - 1
      ].ArrivalDateTime
    ) -
      new Date(
        e.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime
      )) /
      (1000 * 60)
  )
)}{" "}
                                  </span>{" "}
                                  <span className="n"> | </span>
                                  <span className="n ng-scope">
                                    {" "}
                                    {e.OriginDestinationOptions[0]
                                      .FlightSegments.length -
                                      1 ===
                                    0
                                      ? "Non-Stop"
                                      : `${
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments.length - 1
                                        } Stops`}{" "}
                                  </span>
                                </div>
                                <div className="ln" />
                                <div className="sr-d ng-binding"></div>
                              </div>
                              <div className="flig1">
                                <div className="flig-sr txt-r">
                                  <span className="ng-binding">
                                    <span style={{ fontSize: "12px" }}>
                                      {" "}
                                      {
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments.length - 1
                                        ]?.DestinationAirport?.city_name
                                      }
                                    </span>
                                    (
                                    {
                                      e.OriginDestinationOptions[0]
                                        .FlightSegments[
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments.length - 1
                                      ].ArrivalAirportLocationCode
                                    }
                                    ){" "}
                                  </span>{" "}
                                  <strong>
                                    <span className="ng-binding">
                                      {" "}
                                      {new Date(
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime,
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                  </strong>{" "}
                                </div>
                                <span className="fltr intrtcy ng-binding">
                                  {/* {
                                    e.Segments[0][e.Segments[0].length - 1]
                                      .Destination.Airport.CityName
                                  } */}
                                </span>
                                <div className="trvd txt-r ng-binding">
                                  {formatTime(
                                    e.OriginDestinationOptions[0]
                                      .FlightSegments[
                                      e.OriginDestinationOptions[0]
                                        .FlightSegments.length - 1
                                    ].ArrivalDateTime,
                                  )}
                                </div>
                                {/* <div className="distancenv2 tright ng-binding">
                                  (19 km from Dubai)
                                </div> */}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="full-str ng-binding ng-hide"
                                style={{
                                  padding: "3px 6px",
                                  color: "#3a3a3a",
                                  fontSize: 13,
                                  background: "#fffbed",
                                  float: "left",
                                  width: "auto",
                                  margin: "0 0 7px 15px",
                                  border: 0,
                                  borderLeft: "3px solid #efdc9c",
                                }}
                                id="divNote"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lism-r">
                  <div className="dptt">
                    <span> Return </span>
                  </div>
                  <div className="lis-de">
                    <div className="list-main">
                      <div className="flig flig_ow ng-scope">
                        <label className=" radio_label">
                          <div className="bkp-c">
                            <div className="flig-h">
                              <div className="flig1">
                                <div className="fligm">
                                  <div className="flig-r">
                                    <div className="flig-sr">
                                      <span className="ng-binding">
                                        {" "}
                                        <span style={{ fontSize: "12px" }}>
                                          {" "}
                                          {
                                            e.OriginDestinationOptions[1]
                                              .FlightSegments[0]?.SourceAirport
                                              ?.city_name
                                          }
                                        </span>
                                        (
                                        {
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments[0]
                                            .DepartureAirportLocationCode
                                        }
                                        ){" "}
                                      </span>{" "}
                                      <strong>
                                        <span className="ng-binding">
                                          {new Date(
                                            e.OriginDestinationOptions[1]
                                              .FlightSegments[0]
                                              .DepartureDateTime,
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                          })}
                                        </span>
                                      </strong>
                                    </div>
                                    <span className="intrtcy fltl ng-binding">
                                      {/* {e.Segments[1][0].Origin.Airport.CityName} */}
                                    </span>

                                    <div className="trvd ng-binding">
                                      {formatTime(
                                        e.OriginDestinationOptions[1]
                                          .FlightSegments[0].DepartureDateTime,
                                      )}
                                    </div>
                                    <div className="distancenv2 tleft ng-binding" />
                                  </div>
                                </div>
                              </div>
                              <div className="flig1 wde36">
                                <div className="stp">
                                  <span className="ng-binding">
                                    {" "}
                                   {formatDuration(
  Math.floor(
    (new Date(
      e.OriginDestinationOptions[1].FlightSegments[
        e.OriginDestinationOptions[1].FlightSegments.length - 1
      ].ArrivalDateTime
    ) -
      new Date(
        e.OriginDestinationOptions[1].FlightSegments[0].DepartureDateTime
      )) /
      (1000 * 60)
  )
)}{" "}
                                  </span>{" "}
                                  <span className="n"> | </span>
                                  <span className="n ng-scope">
                                    {" "}
                                    {e.OriginDestinationOptions[1]
                                      .FlightSegments.length -
                                      1 ===
                                    0
                                      ? "Non-Stop"
                                      : `${
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments.length - 1
                                        } Stops`}{" "}
                                  </span>
                                </div>
                                <div className="ln" />
                                <div className="sr-d ng-binding"></div>
                              </div>
                              <div className="flig1">
                                <div className="flig-sr txt-r">
                                  <span className="ng-binding">
                                    {/* {
                                      e.Segments[1][e.Segments[1].length - 1]
                                        .Destination.Airport.CityCode
                                    } */}
                                    <span style={{ fontSize: "12px" }}>
                                      {" "}
                                      {
                                        e.OriginDestinationOptions[1]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments.length - 1
                                        ]?.DestinationAirport?.city_name
                                      }
                                    </span>
                                    (
                                    {
                                      e.OriginDestinationOptions[1]
                                        .FlightSegments[
                                        e.OriginDestinationOptions[1]
                                          .FlightSegments.length - 1
                                      ].ArrivalAirportLocationCode
                                    }
                                    ){" "}
                                  </span>{" "}
                                  <strong>
                                    <span className="ng-binding">
                                      {" "}
                                      {new Date(
                                        e.OriginDestinationOptions[1]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime,
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                  </strong>{" "}
                                </div>
                                <span className="fltr intrtcy ng-binding">
                                  {/* {
                                    e.Segments[1][e.Segments[1].length - 1]
                                      .Destination.Airport.CityName
                                  } */}
                                </span>
                                <div className="trvd txt-r ng-binding">
                                  {formatTime(
                                    e.OriginDestinationOptions[1]
                                      .FlightSegments[
                                      e.OriginDestinationOptions[1]
                                        .FlightSegments.length - 1
                                    ].ArrivalDateTime,
                                  )}
                                </div>
                                {/* <div className="distancenv2 tright ng-binding">
                                  (19 km from Dubai)
                                </div> */}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="full-str ng-binding ng-hide"
                                style={{
                                  padding: "3px 6px",
                                  color: "#3a3a3a",
                                  fontSize: 13,
                                  background: "#fffbed",
                                  float: "left",
                                  width: "auto",
                                  margin: "0 0 7px 15px",
                                  border: 0,
                                  borderLeft: "3px solid #efdc9c",
                                }}
                                id="divNote"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="li-fld">
              <div className="refu ng-scope" style={{ float: "left" }}>
                {/* {e.IsRefundable === true ? "REFUNDABLES" : "NON-REFUNDABLES"} */}
              </div>

              <span
                id={20}
                style={{ marginTop: 6, cursor: "pointer" }}
                onClick={() => {
                  handleClick(
                    e.AirItineraryPricingInfo.FareSourceCode,
                    "SrdvP",
                  );
                }}
              >
                Flight Detail
              </span>
            </div>
            {activeId === e.AirItineraryPricingInfo.FareSourceCode && (
              <FlightListInfoInternational
                idx={e.AirItineraryPricingInfo.FareSourceCode}
                flight={e}
                handleChnageCurrency={handleChnageCurrency}
                handleChangeCurrency2={handleChangeCurrency2}
                isInterNational={true}
                formatDuration={formatDuration}
                SrdvIndex="SrdvP"
                fareRules={fareRules}
                baggageRules={baggageRules}
                isFareLoading={isFareLoading}
              />
            )}
          </div>
        </div>
      )}
      {e.OriginDestinationOptions && (
        <div className="mobile_international_cont">
          <div
            className="managlist"
            onClick={submitFlightBookEnquiry}
          >
            <label
              className="check-box"
              style={{
                padding: "0 0 0 0",
                display: "none",
                margin: "5px 0 13px 11px",
              }}
            >
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
            <div className="air-top">
              <div className="iner-sc flwrap">
                <div className="fl_sub_inf">
                  <div className="fl-num mfl0 ">
                    <span className="ontyp">Onward </span>
                    <br />

                    <span className="air-name ng-binding">
                      {
                        airlinesnames.find(
                          (airline) =>
                            airline.AirlineCode ===
                            e.OriginDestinationOptions[0].FlightSegments[0]
                              .OperatingAirline.Code,
                        ).AirlineName
                      }{" "}
                    </span>
                    <br />
                    <span className="ng-binding">
                      {" "}
                      {
                        e.OriginDestinationOptions[0].FlightSegments[0]
                          .OperatingAirline.Code
                      }{" "}
                      -
                    </span>
                    <span className="ng-binding">
                      {
                        e.OriginDestinationOptions[0].FlightSegments[0]
                          .FlightNumber
                      }
                    </span>
                  </div>
                  <div className="hrline" />
                  <div className="fl-num">
                    <span className="ontyp">Return </span>
                    <br />
                    <span className="air-name ng-binding">
                      {
                        airlinesnames.find(
                          (airline) =>
                            airline.AirlineCode ===
                            e.OriginDestinationOptions[1].FlightSegments[0]
                              .OperatingAirline.Code,
                        ).AirlineName
                      }{" "}
                    </span>
                    <br />
                    <span className="ng-binding">
                      {" "}
                      {
                        e.OriginDestinationOptions[1].FlightSegments[0]
                          .OperatingAirline.Code
                      }
                    </span>
                    <span className="ng-binding">
                      -
                      {
                        e.OriginDestinationOptions[1].FlightSegments[0]
                          .FlightNumber
                      }
                    </span>
                  </div>
                </div>
                <div className="fl_cost">
                  {/* <span
          className="cross-pr-grid ng-scope"
          style={{ display: "block" }}
        >
          <div
            className="CurrncyCD_Rs cross-pr-txt"
          
          >
            66,868
          </div>
        </span> */}

                  <span className="ti_prc_new ng-scope">
                    <span className="ttl_b_amt CurrncyCD_Rs">
                      {formatPrice(e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount)}
                    </span>
                  </span>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#0066FF", marginTop: 2 }}>
                    {bookNowLabel}
                  </div>
                </div>
                {/* <div className="dicappl ng-binding ng-scope">
                  Rs.5250 Discount Applied
                </div> */}
              </div>
            </div>
            <div className="clr" />
            <div className="iner-sc">
              <div className="fl-flgt">
                <div className="fl_logo">
                  <img
                    width={30}
                    className="imgRTIMG"
                    style={{ display: "block" }}
                    src={`/Images/AirlineLogo/${e.OriginDestinationOptions[0].FlightSegments[0].OperatingAirline.Code}.gif`}
                  />
                </div>
                <div className="fl-timg-l">
                  <span className="fl_deprt ng-binding" style={{fontSize:'10px'}}>
                    {" "}
                    {/* {new Date(
                      e.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureDateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })} */}
                    {formatDateTimeWithBreak(
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments[0].DepartureDateTime,
                                      )}
                  </span>
                  <span className="fl_sctr ng-binding">
                    {" "}
                    <span style={{ fontSize: "10px" }}>
                      {
                        e.OriginDestinationOptions[0].FlightSegments[0]
                          ?.SourceAirport?.city_name
                      }
                    </span> <br />
                    ({
                      e.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureAirportLocationCode
                    }){" "}
                  </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>
                <div className="fl_info_col">
                  <div className="duratn-bdr text-center append_bottom10">
                    <span className="gray_dot--solid sml-dot-l" />
                    <span className="text_gray text-center ng-binding">
                      {/* {formatDuration(
                        e.OriginDestinationOptions[0].FlightSegments[0]
                          .JourneyDuration,
                      )} */}
                      {/* {formatDuration(
  e.OriginDestinationOptions[0].FlightSegments
    .reduce((sum, segment) => sum + (segment.JourneyDuration || 0), 0)
)}{" "} */}
{formatDuration(
  Math.floor(
    (new Date(
      e.OriginDestinationOptions[0].FlightSegments[
        e.OriginDestinationOptions[0].FlightSegments.length - 1
      ]?.ArrivalDateTime
    ) -
      new Date(
        e.OriginDestinationOptions[0].FlightSegments[0]?.DepartureDateTime
      )) /
      (1000 * 60)
  )
)}{" "}
                     
                    </span>
                    <span className="gray_dot--solid sml-dot-r" />
                  </div>
                  <p className="text_gray text-center ng-binding">
                    {" "}
                        {e.OriginDestinationOptions[0].FlightSegments.length -
                          1 ===
                        0
                          ? "Non-Stop"
                          : `${
                              e.OriginDestinationOptions[0].FlightSegments
                                .length - 1
                            } Stops`}{" "}
                  </p>
                </div>
                 <div className="fl-timg-r">
                  <span className="fl_arive ng-binding" style={{fontSize:'10px'}}>
                    {/* {new Date(
                      e.OriginDestinationOptions[1].FlightSegments[0]
                        .DepartureDateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,

                    })} */}
                    {
                      formatDateTimeWithBreak( e.OriginDestinationOptions[0]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime)
                    }
                     {/* {new Date(
                                        e.OriginDestinationOptions[0]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[0]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime,
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })} */}
                  </span>
                  <span className="fl_sctr ng-binding">
                    <span style={{ fontSize: "10px" }}>
                      {
                        e.OriginDestinationOptions[0].FlightSegments[
                          e.OriginDestinationOptions[0].FlightSegments.length -
                            1
                        ]?.DestinationAirport?.city_name
                      }{" "}
                    </span> <br />
                    ({
                      e.OriginDestinationOptions[0].FlightSegments[
                        e.OriginDestinationOptions[0].FlightSegments.length - 1
                      ].ArrivalAirportLocationCode
                    }){" "}
                    </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>
               
              </div>
              <div className="fl-more"></div>
              <div className="clr" />
            </div>

            <div className="iner-sc">
              <div className="fl-flgt">
                <div className="fl_logo">
                  <img
                    width={30}
                    className="imgRTIMG"
                    style={{ display: "block" }}
                    src={`/Images/AirlineLogo/${e.OriginDestinationOptions[1].FlightSegments[0].OperatingAirline.Code}.gif`}
                  />
                </div>
                <div className="fl-timg-l">
                  <span className="fl_deprt ng-binding" style={{fontSize:'10px'}}>
                    {/* {new Date(
                      e.OriginDestinationOptions[1].FlightSegments[0]
                        .DepartureDateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })} */}
                    {
                      formatDateTimeWithBreak(
                         e.OriginDestinationOptions[1].FlightSegments[0]
                        .DepartureDateTime
                      )
                    }
                  </span>
                  <span className="fl_sctr ng-binding">
                    <span style={{ fontSize: "10px" }}>
                      {
                        e.OriginDestinationOptions[1].FlightSegments[0]
                          ?.SourceAirport?.city_name
                      }
                    </span> <br />
                    ({
                      e.OriginDestinationOptions[1].FlightSegments[0]
                        .DepartureAirportLocationCode
                    }){" "}
                  </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>
                <div className="fl_info_col">
                  <div className="duratn-bdr text-center append_bottom10">
                    <span className="gray_dot--solid sml-dot-l" />
                    <span className="text_gray text-center ng-binding">
                      {/* {formatDuration(
                        e.OriginDestinationOptions[1].FlightSegments[0]
                          .JourneyDuration,
                      )} */}
                      {formatDuration(
  Math.floor(
    (new Date(
      e.OriginDestinationOptions[1].FlightSegments[
        e.OriginDestinationOptions[1].FlightSegments.length - 1
      ].ArrivalDateTime
    ) -
      new Date(
        e.OriginDestinationOptions[1].FlightSegments[0].DepartureDateTime
      )) /
      (1000 * 60)
  )
)}{" "}
                     
                     
                    </span>
                    <span className="gray_dot--solid sml-dot-r" />
                    
                  </div>
                   <span  className="text_gray text-center ng-binding">
                        {" "}
                        {e.OriginDestinationOptions[1].FlightSegments.length -
                          1 ===
                        0
                          ? "Non-Stop"
                          : `${
                              e.OriginDestinationOptions[1].FlightSegments
                                .length - 1
                            } Stops`}
                      </span>
                 
                </div>

 <div className="fl-timg-r">
                  <span className="fl_arive ng-binding" style={{fontSize:'10px'}}>
                    {/* {new Date(
                      e.OriginDestinationOptions[1].FlightSegments[0]
                        .DepartureDateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })} */}
                     {/* {new Date(
                                        e.OriginDestinationOptions[1]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime,
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })} */}
                                      {
                                        formatDateTimeWithBreak(e.OriginDestinationOptions[1]
                                          .FlightSegments[
                                          e.OriginDestinationOptions[1]
                                            .FlightSegments.length - 1
                                        ].ArrivalDateTime)
                                      }
                  </span>
                  <span className="fl_sctr ng-binding">
                    <span style={{ fontSize: "10px" }}>
                      {
                        e.OriginDestinationOptions[1].FlightSegments[
                          e.OriginDestinationOptions[1].FlightSegments.length -
                            1
                        ]?.DestinationAirport?.city_name
                      }
                    </span> <br />
                    ({
                      e.OriginDestinationOptions[1].FlightSegments[
                        e.OriginDestinationOptions[1].FlightSegments.length - 1
                      ].ArrivalAirportLocationCode
                    })
                    </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>




                {/* <div className="fl-timg-r">
                  <span className="fl_arive ng-binding">
                    {" "}
                    {new Date(
                      e.OriginDestinationOptions[1].FlightSegments[
                        e.OriginDestinationOptions[1].FlightSegments.length - 1
                      ].ArrivalDateTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  
                  <div className="distancenv2 tright ng-binding" />
                </div> */}
              </div>
              <div className="fl-more"></div>
            </div>
          </div>
        </div>
      )}
    </div>

    <PassengerContactModal
      show={showContactModal}
      onClose={() => setShowContactModal(false)}
      onSubmit={handleContactSubmit}
    />
    </>
  );
};

export default InternationalFlightListCard;
