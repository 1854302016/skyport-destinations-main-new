import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LuBaggageClaim } from "react-icons/lu";
import { GiMeal } from "react-icons/gi";
import { ImStopwatch } from "react-icons/im";
import { MdFlightTakeoff } from "react-icons/md";

export const formatTime = (arrTime) => {
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
  return `${day}-${dateNum}${month}${year}`;
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

const RoundTripDetail = ({
  idx,
  flight,
  handleClickDetail,
  handleChnageCurrency,
}) => {
  const [active, setActive] = useState(1);
  console.log("FLIGHT IN ROUND TRIP DETAILS", flight.Segments[0]);
  return (
    <>
      {idx === flight.ResultIndex ? (
        <div className="flight-details pr ovf-hidden full-width full-details">
          <div className="header full-width table clearfix">
            <div
              className={`${
                active === 1 ? "active" : ""
              } bold cursor-pointer heading pr text-center fs-13`}
              onClick={() => setActive(1)}
            >
              <div className="text pr i-b">Flight Details</div>
            </div>
            <div
              className={`${
                active === 2 ? "active" : ""
              }cursor-pointer heading pr text-center fs-13`}
              onClick={() => setActive(2)}
            >
              <div className="text pr i-b">Fare Summary</div>
            </div>
            <div
              className={`${
                active === 3 ? "active" : ""
              }cursor-pointer heading pr text-center fs-13`}
              onClick={() => setActive(3)}
            >
              <div className="text pr i-b">Fare Rules</div>
            </div>
            <RxCross2
              onClick={handleClickDetail}
              className="fs-22 i-b pr-5 cursor-pointer ytfi-cancel"
              size={18}
            />
          </div>
          {active === 1 && (
            <div className="details">
              {flight.Segments[0].map((segment, index) => (
                <div className="contents white-bg ">
                  <div className="pr">
                    <div className="tab-content scroll-v">
                      <div className="schedule">
                        <div className="airline-det fs-13 flex">
                          <div className="logo clearfix">
                            <span className="ytfi-plane">
                              <span className="airline-logo">
                                <img
                                  src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                                  alt=""
                                  className="air-logo domAirLogo xIX size-28"
                                />
                              </span>
                            </span>
                          </div>
                          <div className="airline pl-10 text-left">
                            <div className="airline-text full-width mb-2">
                              <span className="i-b name fs-13 ellipsis pull-left">
                                {segment.Airline.AirlineName}
                              </span>
                              <span className="mr-2">
                                &nbsp; {segment.Airline.AirlineCode}-
                                {segment.Airline.FlightNumber}
                              </span>
                              <span className="ellipsis font-lightestgrey fs-12 i-b air-className v-aligm-m">
                                {" "}
                                {/* ({flight.Segments[0][0].CabinClass === 0 && "Economy" ||flight.Segments[0][0].CabinClass === 1 && "Premium Economy"}) */}
                              </span>
                            </div>
                            {/* <div className="airline-sub fs-10 font-lightgrey i-b ellipsis full pull-left">
                      <span>Boeing 737 MAX 8</span>
                    </div> */}
                          </div>
                          {/* <div className="amenties text-right fs-13">                                                    </div> */}
                        </div>
                        <div className="text-center full-width schedule-det clearfix">
                          <div className="pr-18 depart-det city pull-left text-left">
                            <div className="fs-11 no-wrap ellipsis">
                              {segment.Origin.Airport.CityName} (
                              {segment.Origin.Airport.CityCode})
                            </div>
                            <div className="bold fs-16">
                              {" "}
                              {new Date(
                                segment.Origin.DepTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                            <div className="bold fs-11">
                              {formatTime(segment.Origin.DepTime)}
                            </div>
                            <div className="font-lightestgrey fs-11 ellipsis">
                              <span>{segment.Origin.Airport.AirportName}</span>
                              <br />
                              {segment.Origin.Airport.Terminal !== "" && (
                                <>
                                  Terminal - {segment.Origin.Airport.Terminal}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="duration-stop pull-left text-center clearfix pr">
                            <span className="fs-12 i-b no-wrap">
                              <ImStopwatch className="ytfi-clock mr-2" />
                              <span className="fs-12 du text-left mb-14">
                                {segment.Duration} m
                              </span>
                            </span>
                            <div className="bdr-btm-grey full-width pull-left pr">
                              <MdFlightTakeoff
                                className="abs white-bg transport-icon abs font-lightestgrey ytfi-plane"
                                size={22}
                              />
                            </div>
                            <div className="fs-12 du mt-10 no-wrap">
                              <span className="">
                                {flight.Segments[0].length - 1 === 0
                                  ? "Non-Stop"
                                  : `${
                                      flight.Segments[0].length - 1 - 1
                                    } Stops`}
                              </span>
                            </div>
                          </div>
                          <div className="arrive-det city pull-left text-left">
                            <div className="fs-11 no-wrap ellipsis">
                              {segment.Destination.Airport.CityName} (
                              {segment.Destination.Airport.CityCode})
                            </div>
                            <div className="bold fs-16">
                              {new Date(
                                segment.Destination.ArrTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                            <div className="bold fs-11 ellipsis">
                              {formatTime(segment.Destination.ArrTime)}
                            </div>
                            <div
                              className="ellipsis font-lightestgrey fs-11"
                              // title="Sanganeer ,T-2"
                            >
                              <span>
                                {segment.Destination.Airport.AirportName}
                              </span>
                              <br />
                              {segment.Destination.Airport.Terminal !== "" && (
                                <>
                                  Terminal -{" "}
                                  {segment.Destination.Airport.Terminal}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* <div className="amen-details mb-15 text-center">
                          <div className="fs-12 no-wrap">
                            <span className="baggage">
                              <span className="mr-5 font-lightestgrey">
                                Checkin Baggage:
                              </span>
                              <span className="font-lightgrey">
                                <LuBaggageClaim className="mr-5 ytfi-bag" />
                                {segment.CabinBaggage} kgs
                              </span>
                            </span>
                            <span className="meal">
                              <GiMeal className="font-lightgrey mr-5 ytfi-paid-meal" />
                              Paid Meal
                            </span>
                          </div>
                        </div> */}
                        {index < flight.Segments[0].length - 1 && (
                          <div className="mb-8 yellow-msg text-center fs-12">
                            <p className="text-center flight_detail_change_para">
                              Change plane at{" "}
                              <span className="bold">
                                {" "}
                                {segment.Origin.Airport.CityName} (
                                {segment.Origin.Airport.CityCode})
                              </span>
                              , Connecting Time:&nbsp;
                              <span className="bold">
                                {" "}
                                <span>
                                  {formatLayoverTime(
                                    segment.Origin.DepTime,
                                    flight.Segments[0][index + 1].Destination
                                      .ArrTime
                                  )}
                                </span>
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {active === 2 && (
            <div
              className="v-aligm-t"
              style={{
                background: "linear-gradient(to right, #13215c, #16184a)",
              }}
            >
              <div className="rules v-aligm-t mb-35">
                <div className="contents">
                  <div className="text-left tooltip-header component-bg">
                    <span className="bold">Fare Summary</span>
                  </div>
                  <div className="fare-summary-rules">
                    <table className="full-width fs-13 mb-12">
                      <thead>
                        <tr className="">
                          <th className="text-left pb-5"> Fare Summary</th>
                          <th className="text-right pb-5">Base Fare</th>
                          <th className="text-right pb-5"> Taxes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-left">
                            Adult x {flight.FareBreakdown[0].PassengerCount}
                          </td>
                          <td className="text-right">
                            ₹{Math.round(flight.FareBreakdown[0].BaseFare)}
                          </td>
                          <td className="text-right">
                            {/* <i className="fs-12 ytfi-rupee" /> */}₹
                            {Math.round(flight.FareBreakdown[0].Tax)}
                          </td>
                        </tr>

                        {flight.FareBreakdown[1] && (
                          <tr>
                            <td className="text-left">
                              Child x {flight.FareBreakdown[1].PassengerCount}
                            </td>
                            <td className="text-right">
                              ₹{Math.round(flight.FareBreakdown[1].BaseFare)}
                            </td>
                            <td className="text-right">
                              {/* <i className="fs-12 ytfi-rupee" /> */}₹
                              {Math.round(flight.FareBreakdown[1].Tax)}
                            </td>
                          </tr>
                        )}
                        {flight.FareBreakdown[2] && (
                          <tr>
                            <td className="text-left">
                              Infant x {flight.FareBreakdown[2].PassengerCount}
                            </td>
                            <td className="text-right">
                              ₹{Math.round(flight.FareBreakdown[2].BaseFare)}
                            </td>
                            <td className="text-right">
                              {/* <i className="fs-12 ytfi-rupee" /> */}₹
                              {Math.round(flight.FareBreakdown[2].Tax)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot className="">
                        {/* <tr className="total fsummbg">
                          <td className="text-left pr bold" colSpan={2}>
                            Total <span className="ml-7">:</span>
                          </td>
                          <td className="text-right bold">
                            
                            ${flight.FareBreakdown[0].PublishedFare} 
                          </td>
                        </tr>
                         */}
                        <tr className="bold fs-14 fsummbg total upay">
                          <td colSpan={2} className="text-left">
                            You Pay
                            <span className="ml-7">:</span>
                          </td>
                          <td className="text-right">
                            {/* <i className="fs-15 ytfi-rupee" /> */}₹
                            {Math.round(flight.Fare.PublishedFare)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <p className="fs-12 disclaimer">
                      Note: Total fare displayed above has been rounded off and
                      may show a slight difference from actual fare.
                    </p>
                  </div>
                  <div className="rules-table hide">
                    <div className="container scroll-v">
                      <div className="sector-rules mb-15">
                        <p className="fs-14 bold head mb-15 pb-16">BOM-DEL</p>
                        <table
                          className="fare-table full-width fs-13"
                          width="100%"
                        >
                          <thead>
                            <tr>
                              <td
                                className="pb-9 pr bold no-wrap text-left"
                                colSpan={2}
                              >
                                Airline Cancellation Fee
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="fs-12">
                              <td className="text-left pb-9 bold pr">
                                Duration
                              </td>
                              <td className="text-right bold">Per Passenger</td>
                            </tr>
                            <tr className="fs-11 color-light">
                              <td className="text-left pb-5">
                                0 hour to 2 hours
                              </td>
                              <td className="text-right">
                                <span className="">Non-Refundable</span>
                              </td>
                            </tr>
                            <tr className="fs-11 color-light last">
                              <td className="text-left pb-5">&gt;2 hours</td>
                              <td className="text-right">
                                <span className="no-wrap">
                                  <i className="fs-10 mr-2 ytfi-rupee" />
                                  3,600
                                </span>
                              </td>
                            </tr>
                            <tr className="resrules ">
                              <th
                                className="pb-5 pr bold no-wrap text-left pt-15"
                                colSpan={2}
                              >
                                Airline Date Change Fee
                              </th>
                            </tr>
                            <tr className="fs-12">
                              <td className="text-left pb-5 bold pr">
                                Duration
                                <sup className="abs">*</sup>
                              </td>
                              <td className="text-right bold">Per Passenger</td>
                            </tr>
                            <tr className="fs-11 color-light">
                              <td className="text-left pb-5">&gt;2 hours</td>
                              <td className="text-right">
                                <span className="no-wrap">
                                  <i className="fs-10 mr-2  ytfi-rupee" />
                                  3,350
                                </span>
                              </td>
                            </tr>
                            <tr className="rules-disc fs-12 color-light">
                              <td className="disclaimer highlight" colSpan={2}>
                                We would recommend that you reschedule/cancel
                                your tickets atleast 72 hours prior to the
                                flight departure
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="pt-5">
                        <p className="fs-13 bold mb-5">
                          Abasin Service Fee (ASF)
                          <span className="asterisk">**</span>
                        </p>
                        <p className="fs-12 mb-8">
                          (charged per passenger in addition to airline fee as
                          applicable){" "}
                        </p>
                        <table className="full-width fs-12">
                          <tbody className="color-light servicefee">
                            <tr className="fs-11">
                              <td className="text-left">
                                Online Cancellation Service Fee
                              </td>
                              <td className="text-right">
                                <i className="fs-10 mr-2  ytfi-rupee" />
                                400
                              </td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Offline Cancellation Service Fee
                              </td>
                              <td className="text-right">
                                <i className="fs-10 mr-2  ytfi-rupee" />
                                400
                              </td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Online Rescheduling Service Fee
                              </td>
                              <td className="text-right">
                                <i className="fs-10 mr-2  ytfi-rupee" />
                                400
                              </td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Offline Rescheduling Service Fee
                              </td>
                              <td className="text-right">
                                <i className="fs-10 mr-2  ytfi-rupee" />
                                1,250
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="disclaimer fs-12 pr-10">
                      <span className="asterisk">*</span> Prior to the date/time
                      of departure.
                      <p className="mb-10 mt-5">
                        <span className="asterisk">**</span>
                        Please note: SkyPort Destinationsservice fee is over and
                        above the airline cancellation fee due to which refund
                        type may vary.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {active === 3 && (
            <div
              className="v-aligm-t"
              style={{
                background: "linear-gradient(to right, #13215c, #16184a)",
              }}
            >
              <div className="rules v-aligm-t mb-35">
                <div className="contents">
                  <div className="rules-table">
                    <div className="container scroll-v">
                      <div className="sector-rules mb-15">
                        <p className="fs-14 bold head mb-15 pb-16">BOM-DEL</p>
                        <table
                          className="fare-table full-width fs-13"
                          width="100%"
                        >
                          <thead>
                            <tr>
                              <td
                                className="pb-9 pr bold no-wrap text-left"
                                colspan="2"
                              >
                                Airline Cancellation Fee
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="fs-12">
                              <td className="text-left pb-9 bold pr">
                                Duration
                                <sup className="abs"></sup>
                              </td>
                              <td className="text-right bold">Per Passenger</td>
                            </tr>
                            <tr className="fs-11 color-light">
                              <td className="text-left pb-5">
                                0 hour to 2 hours
                              </td>
                              <td className="text-right">
                                <span className="">Non-Refundable</span>
                              </td>
                            </tr>
                            <tr className="fs-11 color-light last">
                              <td className="text-left pb-5">&gt;2 hours</td>
                              <td className="text-right">
                                <span className="no-wrap">₹ 3,600</span>
                              </td>
                            </tr>
                            <tr className="resrules ">
                              <th
                                className="pb-5 pr bold no-wrap text-left pt-15"
                                colspan="2"
                              >
                                Airline Date Change Fee
                              </th>
                            </tr>
                            <tr className="fs-12">
                              <td className="text-left pb-5 bold pr">
                                Duration
                                <sup className="abs">*</sup>
                              </td>
                              <td className="text-right bold">Per Passenger</td>
                            </tr>
                            <tr className="fs-11 color-light">
                              <td className="text-left pb-5">&gt;2 hours</td>
                              <td className="text-right">
                                <span className="no-wrap">₹ 3,350</span>
                              </td>
                            </tr>
                            <tr className="rules-disc fs-12 color-light">
                              <td className="disclaimer highlight" colspan="2">
                                We would recommend that you reschedule/cancel
                                your tickets atleast 72 hours prior to the
                                flight departure
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="pt-5">
                        <p className="fs-13 bold mb-5">
                          Abasin Service Fee (YSF)
                          <span className="asterisk">**</span>
                        </p>
                        <p className="fs-12 mb-8">
                          (charged per passenger in addition to airline fee as
                          applicable){" "}
                        </p>
                        <table className="full-width fs-12">
                          <tbody className="color-light servicefee">
                            <tr className="fs-11">
                              <td className="text-left">
                                Online Cancellation Service Fee
                              </td>
                              <td className="text-right">₹ 400</td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Offline Cancellation Service Fee
                              </td>
                              <td className="text-right">₹ 400</td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Online Rescheduling Service Fee
                              </td>
                              <td className="text-right">₹ 400</td>
                            </tr>
                            <tr className="fs-11">
                              <td className="text-left">
                                Offline Rescheduling Service Fee
                              </td>
                              <td className="text-right">₹ 1,250</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="disclaimer fs-12 pr-10">
                      <span className="asterisk">*</span> Prior to the date/time
                      of departure.
                      <p className="mb-10 mt-5">
                        <span className="asterisk">**</span>
                        Please note: SkyPort Destinationsservice fee is over and
                        above the airline cancellation fee due to which refund
                        type may vary.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RoundTripDetail;
