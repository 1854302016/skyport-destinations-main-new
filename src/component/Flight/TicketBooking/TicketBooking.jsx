import React, { useRef, useEffect, useState } from "react";
import "./TicketBooking.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cities12 } from "../../../Cities";
import { LuBaggageClaim } from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Card, Spinner } from "react-bootstrap";

const formatTime = (arrTime) => {
  const date = new Date(arrTime);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return (
    <>
      {hours}:{minutes}
      <br />
      {day}, {dateNum} {month} {year}
    </>
  );
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


const TicketBooking = () => {
  const srdvIdx = decodeURIComponent(useParams().srdvIdx);
  console.log("srdvIdx at ticket", srdvIdx);
  const [searchParams] = useSearchParams();
  
  const bookingid = searchParams.get("bookingid");

  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingDetails2, setBookingDetails2] = useState(null);
  const [bookingDetailsParto, setBookingDetailsParto] = useState(null);
  const [bookingDetailsTJ, setBookingDetailsTJ] = useState(null);

  const token = localStorage.getItem("token");

  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  const calledRef = useRef(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  
  const formatDuration = (minutes) => {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;

      return `${hrs}h ${mins}m`;
    };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (calledRef.current) return;
  //     calledRef.current = true;
  //     setLoadingDetail(true);
  //     const bookingId = sessionStorage.getItem("BookingId");
  //     const parsedBookingId = bookingId ? JSON.parse(bookingId) : null;
  //     const pnr = sessionStorage.getItem("PNR");
  //     const parsedPnr = pnr ? JSON.parse(pnr) : null;
  //     const firstname = sessionStorage.getItem("FirstName");
  //     const lastname = sessionStorage.getItem("LastName");

  //     const UniqueId = sessionStorage.getItem("UniqueId");
  //     const parsedUniqueId =
  //       UniqueId !== "undefined" ? JSON.parse(UniqueId) : null;

  //     const bookingIdTJ = sessionStorage.getItem("BookingIdTJ");
  //     // const parsedBookingIdTJ = bookingIdTJ ? JSON.parse(bookingIdTJ) : null;

  //     const bookingId2 = sessionStorage.getItem("BookingId2");
  //     const parsedBookingId2 = bookingId2 ? JSON.parse(bookingId2) : null;
  //     const bookingId3 = sessionStorage.getItem("BookingId3");
  //     const parsedBookingId3 = bookingId3 ? JSON.parse(bookingId3) : null;
  //     const pnr3 = sessionStorage.getItem("PNR3");
  //     const parsedPnr3 = pnr3 ? JSON.parse(pnr3) : null;
  //     const pnr2 = sessionStorage.getItem("PNR2");
  //     const parsedPnr2 = pnr2 ? JSON.parse(pnr2) : null;
  //     console.log("PNRRRRSSSS", pnr2, pnr3, pnr);
  //     const firstname2 = sessionStorage.getItem("FirstName2");
  //     const lastname2 = sessionStorage.getItem("LastName2");
  //     try {
  //       if (srdvIdx === "undefined") {
  //         const response = await axios.post(
  //           "https://admin.trustedfare.com/api/flight-booking-details",
  //           {
  //             EndUserIp: "192.168.11.58",
  //             PNRIB: parsedPnr2,
  //             TraceId: String(sessionStorage.getItem("traceId")),
  //             BookingId: parsedBookingId,
  //             PNR: parsedPnr,
  //             FirstName: firstname,
  //             LastName: lastname,
  //             BookingIdIB: parsedBookingId2,
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         if (response.data?.success) {
  //           setBookingDetails(response.data.data.FlightItinerary);
  //           setBookingDetails2(response.data.data.Inbound.FlightItinerary);
  //           console.log("booking details", response.data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoadingDetail(false); // End loader
  //     }
  //   };

  //   fetchData();
  // }, [srdvIdx]);

  useEffect(() => {
    // Safe parser for sessionStorage values
    const safeParse = (value) => {
      if (!value || value === "undefined") return null;

      try {
        return JSON.parse(value); // handles quoted JSON strings or objects
      } catch (e) {
        return value; // fallback for plain strings like "MF32018125"
      }
    };

    const fetchData = async () => {
      if (calledRef.current) return;
      calledRef.current = true;
      setLoadingDetail(true);

      // Safely retrieve and parse sessionStorage values
      const parsedBookingId = safeParse(sessionStorage.getItem("BookingId"));
      const parsedPnr = safeParse(sessionStorage.getItem("PNR"));
      const firstname = sessionStorage.getItem("FirstName");
      const lastname = sessionStorage.getItem("LastName");

      const parsedUniqueId = safeParse(sessionStorage.getItem("UniqueId"));
      const parsedBookingId2 = safeParse(sessionStorage.getItem("BookingId2"));
      const parsedBookingId3 = safeParse(sessionStorage.getItem("BookingId3"));
      const parsedPnr3 = safeParse(sessionStorage.getItem("PNR3"));
      const parsedPnr2 = safeParse(sessionStorage.getItem("PNR2"));
      const firstname2 = sessionStorage.getItem("FirstName2");
      const lastname2 = sessionStorage.getItem("LastName2");

      try {
        // EwebM logic
        if (srdvIdx === "EwebM") {
          const rawIdentifier = sessionStorage.getItem("uniqueIdentifier");
          const tripId =
            rawIdentifier && rawIdentifier !== "undefined"
              ? safeParse(rawIdentifier)
              : null;

          console.log("Parsed Trip ID:", tripId);

          if (tripId) {
            const response = await axios.get(
              `https://admin.trustedfare.com/api/Mistify/TripDetails/${tripId}`,
              {
                params: {
                  bookingid: bookingid,
                },
              }
            );

            if (response.data?.data?.Data?.TripDetailsResult?.TravelItinerary) {
              setBookingDetails(
                response.data.data.Data.TripDetailsResult.TravelItinerary
              );
              console.log("EwebM trip details:", response.data.data);
            } else {
              console.warn("Invalid EwebM response structure:", response.data);
            }
          } else {
            console.error("Trip ID is missing or invalid.");
          }
        }

        // Legacy API logic
        else if (srdvIdx === "undefined") {
          const traceId = sessionStorage.getItem("traceId");

          const response = await axios.post(
            "https://admin.trustedfare.com/api/flight-booking-details",
            {
              EndUserIp: "192.168.11.58",
              PNRIB: parsedPnr2,
              TraceId: String(traceId),
              BookingId: parsedBookingId,
              PNR: parsedPnr,
              FirstName: firstname,
              LastName: lastname,
              BookingIdIB: parsedBookingId2,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data?.success) {
            setBookingDetails(response.data.data.FlightItinerary);
            setBookingDetails2(response.data.data.Inbound.FlightItinerary);
            console.log("Booking details (undefined):", response.data.data);
          } else {
            console.warn("Booking details fetch failed:", response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchData();
  }, [srdvIdx]);

  const statusMapping = {
    10: "Booked",
    11: "Pending",
    12: "WaitList",
    20: "Ticket In Process",
    21: "Ticketed",
    22: "Ticketed-Changed",
    23: "Ticketed-Schedule Changed",
    24: "Ticketed-Cancelled",
    25: "Ticketed-Void",
    30: "Cancelled",
    40: "Not Booked (Exception)",
    41: "Not Booked (Gateway)",
    42: "Duplicate",
  };

  // [NotSet = 0, Successful = 1, Failed = 2, OtherFare = 3, OtherClass = 4, BookedOther = 5, NotConfirmed = 6]
  const statusMappingTBO = {
    0: "NotSet",
    1: "Successful",
    2: "Failed",
    3: "OtherFare",
    4: "OtherClass",
    5: "BookedOther",
    6: "NotConfirmed",
  };

  const ticketStatusMapping = {
    1: "Ticket",
    2: "Refund",
    3: "Void",
    4: "Unknown",
  };

  const cabinMapping = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };
  // const cabinMapping = {
  //   1: "Economy",
  //   2: "Premium Economy",
  //   3: "Business",
  //   4: "Premium Business",
  //   5: "First",
  //   6: "Premium First",
  //   100: "",
  // };

  const [active, setActive] = useState(false);
  const [hidePerson, setHidePerson] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);
  const ticketRef = useRef(null);

  //   const downloadPdf = () => {
  //     const ticketElement = ticketRef.current;
  //     // Save original display style (should be 'none')
  //     const originalDisplay = ticketElement.style.display;
  //     // Temporarily show the element for rendering
  //     ticketElement.style.display = 'block';

  //     html2canvas(ticketElement, {
  //       scale: 1.4, // adjust as needed for quality
  //       useCORS: true,
  //     }).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/jpeg', 0.7);
  //       const doc = new jsPDF('p', 'mm', 'a4');
  //       const pdfWidth = doc.internal.pageSize.getWidth();
  //       const pdfHeight = doc.internal.pageSize.getHeight();

  //       // Calculate scale ratio to fit content into A4 page
  //       const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
  //       const imageX = 0;
  //       const imageY = 0;
  //       const imageWidthScaled = canvas.width * ratio;
  //       const imageHeightScaled = canvas.height * ratio;

  //       doc.addImage(
  //         imgData,
  //         'JPEG',
  //         imageX,
  //         imageY,
  //         imageWidthScaled,
  //         imageHeightScaled
  //       );
  //       doc.save('bookingDetail.pdf');

  //       // Revert display to original after capture
  //       ticketElement.style.display = originalDisplay;
  //     });
  //   };

  const downloadPdf = () => {
    const ticketElement = ticketRef.current;

    // Save original styles
    const originalDisplay = ticketElement.style.display;
    const originalWidth = ticketElement.style.width;
    const originalMaxWidth = ticketElement.style.maxWidth;

    // Temporarily apply desktop-like styles
    ticketElement.style.display = "block";
    ticketElement.style.width = "1400px"; // Fixed width for consistent rendering
    ticketElement.style.maxWidth = "unset"; // In case you have max-width rules from CSS

    html2canvas(ticketElement, {
      scale: 1.4,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      const doc = new jsPDF("p", "mm", "a4");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const ratio = Math.min(
        pdfWidth / canvas.width,
        pdfHeight / canvas.height
      );
      const imageWidth = canvas.width * ratio;
      const imageHeight = canvas.height * ratio;

      doc.addImage(imgData, "JPEG", 0, 0, imageWidth, imageHeight);
      doc.save("bookingDetail.pdf");

      // Revert styles
      ticketElement.style.display = originalDisplay;
      ticketElement.style.width = originalWidth;
      ticketElement.style.maxWidth = originalMaxWidth;
    });
  };
  console.log("bookingDetails", bookingDetails);
  console.log("bookingDetails 2", bookingDetails2);

  return (
    <>
      {srdvIdx === "undefined" && (
        <>
          {bookingDetails ? (
            <>
              <section
                className="order__section"
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                    <div className="pageComponentsLinks">
                      <ul className="pageLinksUl">
                        <li
                          data-test="component-nav_link"
                          onClick={handlePrint}
                        >
                          <span data-test="component-link_text" className="">
                            Print
                          </span>
                        </li>
                        <li
                          data-test="component-nav_link"
                          onClick={downloadPdf}
                        >
                          <span data-test="component-link_text" className="">
                            Save Pdf
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Email
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Whatsapp
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">
                                SkyPort DestinationsOnline{" "}
                              </h3>
                            </div>
                            <div
                              className="invoice__righttbox mt-2"
                              onClick={downloadPdf}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src="https://pixner.net/rechargio/rechargio/assets/img/svg/pringting.svg"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="reservation__contetn">
                            <span className="dtext fz-16 fw-400 lato d-block mb__10">
                              Hey {bookingDetails.Passenger[0].FirstName}{" "}
                              {bookingDetails.Passenger[0].LastName},
                            </span>
                            <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              <IoMdCheckboxOutline
                                size={20}
                                color="#43a047"
                                // src="https://pixner.net/rechargio/rechargio/assets/img/svg/over-check.svg"
                                className="overcheck"
                                alt="img"
                                style={{ marginTop: "-8px" }}
                              />
                              <label className="gratext fz-18 fw-600 lato">
                               {
								  bookingDetails?.TicketStatus === "TktInProcess" ? (
									<p className="text-orange-600 font-medium">
									  Your booking is currently being processed. Ticket confirmation
									  will be updated shortly.
									</p>
								  ) : bookingDetails?.TicketStatus === "Ticketed" ? (
									<p className="text-green-600 font-medium">
									  Congratulations! Your Booking has been confirmed.
									</p>
								  ) : null
								}
                              </label>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>
                                          {bookingDetails2 && "OutBound"}{" "}
                                          Booking ID:
                                        </b>
                                        <br />
                                        <span>{bookingDetails.BookingId}</span>
                                      </div>
                                      <div>
                                        {bookingDetails2 && (
                                          <>
                                            <b>Inbound Booking ID:</b>
                                            <br />
                                            <span>
                                              {bookingDetails.BookingId}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Payment Method:</b>
                                    <br />
                                    <span>Credit Card</span>
                                  </div>
                                </div>
                              </div>
                              <p className="table-title">
                                <b>
                                  {bookingDetails2 && "OutBound"} Flight
                                  Information:
                                </b>
                              </p>
                              <table className="invoice-table table-stripe3 style5">
                                <thead>
                                  <tr>
                                    <th colSpan="2">Airline Details</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Duration</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bookingDetails.Segments.map(
                                    (detail, index) => (
                                      <tr>
                                        <td>
                                          <img
                                            src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                            // src={`/Images/AirlineLogo/AI.gif`}
                                            alt=""
                                            style={{ width: "80px" }}
                                          />
                                          <br />
                                          <span>
                                            {" "}
                                            {detail.Airline.AirlineCode}{" "}
                                            {detail.Airline.FlightNumber}
                                          </span>
                                        </td>
                                        <td>
                                          <p>
                                            <span style={{ fontSize: "14px" }}>
                                              {detail.Airline.AirlineName}
                                            </span>
                                            <br />
                                            Cabin Class :{" "}
                                            {cabinMapping[detail.CabinClass]}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.Origin.DepTime
                                              )}
                                            </span>
                                            <br />
                                            {detail.Origin.Airport.CityName}(
                                            {detail.Origin.Airport.CityCode})
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.Destination.ArrTime
                                              )}
                                            </span>
                                            <br />
                                            {
                                              detail.Destination.Airport
                                                .CityName
                                            }
                                            (
                                            {
                                              detail.Destination.Airport
                                                .CityCode
                                            }
                                            )
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>{detail.Duration} m</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              {bookingDetails2 && (
                                <>
                                  <p className="table-title">
                                    <b>Inbound Flight Information:</b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th colSpan="2">Airline Details</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Duration</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails2.Segments.map(
                                        (detail, index) => (
                                          <tr>
                                            <td>
                                              <img
                                                src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                                // src={`/Images/AirlineLogo/AI.gif`}
                                                alt=""
                                                style={{ width: "80px" }}
                                              />
                                              <br />
                                              <span>
                                                {" "}
                                                {
                                                  detail.Airline.AirlineCode
                                                }{" "}
                                                {detail.Airline.FlightNumber}
                                              </span>
                                            </td>
                                            <td>
                                              <p>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {detail.Airline.AirlineName}
                                                </span>
                                                <br />
                                                Cabin Class :{" "}
                                                {
                                                  cabinMapping[
                                                    detail.CabinClass
                                                  ]
                                                }
                                              </p>
                                            </td>
                                            <td>
                                              <p style={{ fontSize: "14px" }}>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {formatTime(
                                                    detail.Origin.DepTime
                                                  )}
                                                </span>
                                                <br />
                                                {detail.Origin.Airport.CityName}
                                                (
                                                {detail.Origin.Airport.CityCode}
                                                )
                                                <br />
                                                {/* Terminal - 2 */}
                                              </p>
                                            </td>
                                            <td>
                                              <p style={{ fontSize: "14px" }}>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {formatTime(
                                                    detail.Destination.ArrTime
                                                  )}
                                                </span>
                                                <br />
                                                {
                                                  detail.Destination.Airport
                                                    .CityName
                                                }
                                                (
                                                {
                                                  detail.Destination.Airport
                                                    .CityCode
                                                }
                                                )
                                                <br />
                                                {/* Terminal - 2 */}
                                              </p>
                                            </td>
                                            <td>{detail.Duration} m</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}
                              <div
                                className="invoice-table table-style1"
                                style={{ padding: "10px 5px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    We have sent the ticket to :{" "}
                                    <b> {bookingDetails.Passenger[0].Email}</b>
                                  </div>
                                  <button
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#2196F3",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Resend It
                                  </button>
                                </div>
                              </div>
                              {bookingDetails && (
                                <>
                                  <p className="table-title">
                                    <b>
                                      {" "}
                                      {bookingDetails2 && "OutBound"} Passenger
                                      Information:
                                    </b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th>Passenger's :</th>
                                        <th>Gender:</th>
                                        <th>PNR :</th>

                                        <th> Ticket Number :</th>

                                        <th>Seat No.:</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails.Passenger.map(
                                        (passenger, index) => (
                                          <tr>
                                            <td>
                                              {" "}
                                              {passenger.FirstName}{" "}
                                              {passenger.LastName}{" "}
                                            </td>
                                            <td>
                                              {passenger.Gender === 1 && "Male"}{" "}
                                              {passenger.Gender === 0 &&
                                                "Female"}
                                              {passenger.Gender === 2 &&
                                                "Female"}{" "}
                                            </td>
                                            <td>
                                              {bookingDetails.Segments[0]
                                                .AirlinePNR === ""
                                                ? bookingDetails.PNR
                                                : bookingDetails.Segments[0]
                                                    .AirlinePNR}
                                            </td>

                                            <td>
                                              {passenger.Ticket &&
                                                passenger.Ticket.TicketNumber}
                                            </td>

                                            <td>
                                              {passenger.SeatDynamic &&
                                                passenger.SeatDynamic.map(
                                                  (item) => (
                                                    <span>
                                                      {item.RowNo}-{item.SeatNo}
                                                      ,
                                                    </span>
                                                  )
                                                )}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}

                              {bookingDetails2 && (
                                <>
                                  <p className="table-title">
                                    <b>Inbound Passenger Information:</b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th>Passenger's :</th>
                                        <th>Gender:</th>

                                        <th>PNR :</th>

                                        <th>Ticket Number :</th>

                                        <th>Seat No.:</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails2.Passenger.map(
                                        (passenger, index) => (
                                          <tr>
                                            <td>
                                              {" "}
                                              {passenger.FirstName}{" "}
                                              {passenger.LastName}{" "}
                                            </td>
                                            <td>
                                              {passenger.Gender === 1 && "Male"}{" "}
                                              {passenger.Gender === 0 &&
                                                "Female"}
                                              {passenger.Gender === 2 &&
                                                "Female"}{" "}
                                            </td>

                                            {bookingDetails2 && (
                                              <td>
                                                {bookingDetails2.Segments[0]
                                                  .AirlinePNR === ""
                                                  ? bookingDetails2.PNR
                                                  : bookingDetails2.Segments[0]
                                                      .AirlinePNR}
                                              </td>
                                            )}
                                            <td>
                                              {passenger.Ticket &&
                                                passenger.Ticket.TicketNumber}
                                            </td>

                                            <td>
                                              {passenger.SeatDynamic &&
                                                passenger.SeatDynamic.map(
                                                  (item) => (
                                                    <span>
                                                      {item.RowNo}-{item.SeatNo}
                                                      ,
                                                    </span>
                                                  )
                                                )}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}

                              {bookingDetails && (
                                <table className="invoice-table table-stripe3">
                                  <thead>
                                    <tr>
                                      <th>Description</th>

                                      <th style={{ textAlign: "end" }}>
                                        Total
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Base Fare</td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {bookingDetails2
                                          ? Math.round(
                                              bookingDetails.Fare.BaseFare
                                            ) +
                                            Math.round(
                                              bookingDetails2.Fare.BaseFare
                                            )
                                          : Math.round(
                                              bookingDetails.Fare.BaseFare
                                            )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Tax & Surcharges</td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {bookingDetails2
                                          ? Math.round(
                                              bookingDetails.Fare.Tax
                                            ) +
                                            Math.round(bookingDetails2.Fare.Tax)
                                          : Math.round(bookingDetails.Fare.Tax)}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td>
                                        <b>Total Amount:</b>
                                      </td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {bookingDetails2
                                          ? Math.round(
                                              bookingDetails.Fare.PublishedFare
                                            ) +
                                            Math.round(
                                              bookingDetails2.Fare.PublishedFare
                                            )
                                          : Math.round(
                                              bookingDetails.Fare.PublishedFare
                                            )}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              )}
                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              <p className="invoice-note mt-3">
                                <svg
                                  width={14}
                                  height={18}
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>{" "}
                                <b>NOTE: </b>This is computer generated receipt
                                and does not require physical signature.
                              </p>
                            </div>
                            <div className="invoice-buttons">
                              <button className="print_btn">
                                <svg
                                  width={20}
                                  height={21}
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                    fill="#00C764"
                                  />
                                </svg>
                              </button>{" "}
                              <button
                                id="download_btn"
                                className="download_btn"
                                onClick={downloadPdf}
                              >
                                <svg
                                  width={25}
                                  height={19}
                                  viewBox="0 0 25 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div
                className="AwesomeFileName ticketdata ticketdata_Container"
                style={{ display: "none" }}
                ref={ticketRef}
              >
                <div className="themeholy-invoice invoice_style3 ticketdata">
                  <div
                    className="download-inner download-innersssss"
                    id="download_section"
                  >
                    <header className="themeholy-header header-layout1">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                          <div className="header-logo">
                            <Link>
                              <img
                                src="/Images/tripgoo.png"
                                alt="Invar"
                                style={{ width: "160px" }}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-auto">
                          <h1 className="big-title">Ticket</h1>
                        </div>
                      </div>
                      <div className="header-bottom">
                        <div className="row align-items-center justify-content-end">
                          <div className="col-auto">
                            <p className="invoice-number me-4">
                              <b>
                                {" "}
                                {bookingDetails2 && "OutBound"} Booking ID:{" "}
                              </b>
                              {bookingDetails.BookingId}
                            </p>
                          </div>
                          {bookingDetails2 && (
                            <div className="col-auto">
                              <p className="invoice-number me-4">
                                <b>Inbound Booking ID: </b>
                                {bookingDetails.BookingId}
                              </p>
                            </div>
                          )}
                          <div className="col-auto">
                            <p className="invoice-date">
                              <b>Booking Date: </b>
                              {formatTime(bookingDetails.InvoiceCreatedOn)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={{ width: "100%", textAlign: "end" }}
                      >
                        <div>
                          <b>Payment Info:</b>
                          <p className="mb-0">
                            Payment Method: Credit Card
                            <br />
                            Credit Card No: 2456**********
                            <br />
                            A/C Name: TEST
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="themeholy-invoice invoice_style17">
                      <div className="download-inner" id="download_section">
                        {bookingDetails && (
                          <>
                            <p className="table-title">
                              <b>
                                {bookingDetails2 && "OutBound"} Passenger
                                Information:
                              </b>
                            </p>
                            <table className="invoice-table table-stripe3 style5 responsive-table">
                              <thead>
                                <tr>
                                  <th>Passenger's :</th>
                                  <th>Gender:</th>
                                  <th> PNR :</th>
                                  <th> Ticket Number :</th>
                                  <th>Seat No.:</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bookingDetails.Passenger.map(
                                  (passenger, index) => (
                                    <tr>
                                      <td>
                                        {" "}
                                        {passenger.FirstName}{" "}
                                        {passenger.LastName}{" "}
                                      </td>
                                      <td>
                                        {passenger.Gender === 1 && "Male"}{" "}
                                        {passenger.Gender === 0 && "Female"}
                                        {passenger.Gender === 2 &&
                                          "Female"}{" "}
                                      </td>
                                      <td>
                                        {bookingDetails.Segments[0]
                                          .AirlinePNR === ""
                                          ? bookingDetails.PNR
                                          : bookingDetails.Segments[0]
                                              .AirlinePNR}
                                      </td>

                                      <td>
                                        {passenger.Ticket &&
                                          passenger.Ticket.TicketNumber}
                                      </td>

                                      <td>
                                        {passenger.SeatDynamic &&
                                          passenger.SeatDynamic.map((item) => (
                                            <span>
                                              {item.RowNo}-{item.SeatNo},
                                            </span>
                                          ))}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </>
                        )}

                        {bookingDetails2 && (
                          <>
                            <p className="table-title">
                              <b>Inbound Passenger Information:</b>
                            </p>
                            <table className="invoice-table table-stripe3 style5 responsive-table">
                              <thead>
                                <tr>
                                  <th>Passenger's :</th>
                                  <th>Gender:</th>
                                  <th>PNR :</th>

                                  <th>Ticket Number :</th>

                                  <th>Seat No.:</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bookingDetails2.Passenger.map(
                                  (passenger, index) => (
                                    <tr>
                                      <td>
                                        {" "}
                                        {passenger.FirstName}{" "}
                                        {passenger.LastName}{" "}
                                      </td>
                                      <td>
                                        {passenger.Gender === 1 && "Male"}{" "}
                                        {passenger.Gender === 0 && "Female"}
                                        {passenger.Gender === 2 &&
                                          "Female"}{" "}
                                      </td>
                                      <td>
                                        {bookingDetails2.Segments[0]
                                          .AirlinePNR === ""
                                          ? bookingDetails2.PNR
                                          : bookingDetails2.Segments[0]
                                              .AirlinePNR}
                                      </td>

                                      <td>
                                        {passenger.Ticket &&
                                          passenger.Ticket.TicketNumber}
                                      </td>

                                      <td>
                                        {passenger.SeatDynamic &&
                                          passenger.SeatDynamic.map((item) => (
                                            <span>
                                              {item.RowNo}-{item.SeatNo},
                                            </span>
                                          ))}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </>
                        )}

                        <p className="table-title">
                          <b>
                            {bookingDetails2 && "OutBound"} Flight Information:
                          </b>
                        </p>
                        <table className="invoice-table table-stripe3 style5">
                          <thead>
                            <tr>
                              <th colSpan="2">Airline Details</th>
                              <th>Departure</th>
                              <th>Arrival</th>
                              <th>Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookingDetails.Segments.map((detail, index) => (
                              <tr>
                                <td>
                                  <img
                                    src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                    alt=""
                                    style={{ width: "80px" }}
                                  />
                                  <br />
                                  <span>
                                    {" "}
                                    {detail.Airline.AirlineCode}{" "}
                                    {detail.Airline.FlightNumber}{" "}
                                  </span>
                                </td>
                                <td>
                                  <p>
                                    <span style={{ fontSize: "14px" }}>
                                      {detail.Airline.AirlineName}
                                    </span>
                                    <br />
                                    {cabinMapping[detail.CabinClass]}
                                  </p>
                                </td>
                                <td>
                                  <p style={{ fontSize: "14px" }}>
                                    <span style={{ fontSize: "14px" }}>
                                      {formatTime(detail.Origin.DepTime)}
                                    </span>
                                    <br />
                                    {detail.Origin.Airport.CityName}(
                                    {detail.Origin.Airport.CityCode})
                                    <br />
                                    Terminal - {detail.Origin.Airport.Terminal}
                                  </p>
                                </td>
                                <td>
                                  <p style={{ fontSize: "14px" }}>
                                    <span style={{ fontSize: "14px" }}>
                                      {" "}
                                      {formatTime(detail.Destination.ArrTime)}
                                    </span>
                                    <br />
                                    {detail.Destination.Airport.CityName}(
                                    {detail.Destination.Airport.CityCode})
                                    <br />
                                    Terminal -{" "}
                                    {detail.Destination.Airport.Terminal}
                                  </p>
                                </td>
                                <td>{detail.Duration} m</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {bookingDetails2 && (
                          <>
                            <p className="table-title">
                              <b>Inbound Flight Information:</b>
                            </p>
                            <table className="invoice-table table-stripe3 style5">
                              <thead>
                                <tr>
                                  <th colSpan="2">Airline Details</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>Duration</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bookingDetails2.Segments.map(
                                  (detail, index) => (
                                    <tr>
                                      <td>
                                        <img
                                          src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                          alt=""
                                          style={{ width: "80px" }}
                                        />
                                        <br />
                                        <span>
                                          {" "}
                                          {detail.Airline.AirlineCode}{" "}
                                          {detail.Airline.FlightNumber}{" "}
                                        </span>
                                      </td>
                                      <td>
                                        <p>
                                          <span style={{ fontSize: "14px" }}>
                                            {detail.Airline.AirlineName}
                                          </span>
                                          <br />
                                          {cabinMapping[detail.CabinClass]}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={{ fontSize: "14px" }}>
                                          <span style={{ fontSize: "14px" }}>
                                            {formatTime(detail.Origin.DepTime)}
                                          </span>
                                          <br />
                                          {detail.Origin.Airport.CityName}(
                                          {detail.Origin.Airport.CityCode})
                                          <br />
                                          Terminal -{" "}
                                          {detail.Origin.Airport.Terminal}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={{ fontSize: "14px" }}>
                                          <span style={{ fontSize: "14px" }}>
                                            {" "}
                                            {formatTime(
                                              detail.Destination.ArrTime
                                            )}
                                          </span>
                                          <br />
                                          {detail.Destination.Airport.CityName}(
                                          {detail.Destination.Airport.CityCode})
                                          <br />
                                          Terminal -{" "}
                                          {detail.Destination.Airport.Terminal}
                                        </p>
                                      </td>
                                      <td>{detail.Duration} m</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </>
                        )}

                        <table className="invoice-table table-stripe3">
                          <thead>
                            <tr>
                              <th>Description</th>

                              <th style={{ textAlign: "end" }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Base Fare</td>
                              <td style={{ textAlign: "end" }}>
                                {" "}
                                ₹
                                {bookingDetails2
                                  ? Math.round(bookingDetails.Fare.BaseFare) +
                                    Math.round(bookingDetails2.Fare.BaseFare)
                                  : Math.round(bookingDetails.Fare.BaseFare)}
                              </td>
                            </tr>
                            <tr>
                              <td>Tax & Surcharges</td>
                              <td style={{ textAlign: "end" }}>
                                {" "}
                                ₹
                                {bookingDetails2
                                  ? Math.round(bookingDetails.Fare.Tax) +
                                    Math.round(bookingDetails2.Fare.Tax)
                                  : Math.round(bookingDetails.Fare.Tax)}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <b>Total Amount:</b>
                              </td>
                              <td style={{ textAlign: "end" }}>
                                ₹
                                {bookingDetails2
                                  ? Math.round(
                                      bookingDetails.Fare.PublishedFare
                                    ) +
                                    Math.round(
                                      bookingDetails2.Fare.PublishedFare
                                    )
                                  : Math.round(
                                      bookingDetails.Fare.PublishedFare
                                    )}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <p className="invoice-note mt-3">
                      <p className="table-title">
                        <b>Important Information :</b>
                      </p>
                      <ul
                        style={{
                          listStyleType: "disc",
                          paddingInlineStart: "20px",
                        }}
                      >
                        <li style={{ marginBottom: "5px", marginTop: "10px" }}>
                          {" "}
                          Please ensure that you have all the required travel
                          documents for your entire journey i.e., valid passport
                          & necessary visas, and that you have had the
                          recommended inoculations for your destination(s).
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          {" "}
                          All passengers, including children and infants, have
                          to present their valid ID proof at the time of
                          check-in.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          {" "}
                          We recommend you check-in at least 3 hours prior to
                          departure of your domestic flight and 4 hours prior to
                          your international flight
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          Carriage and other facilities provided by the carrier
                          are subject to their Terms and Condition. We are not
                          liable for missing any facility of the carrier.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          Recheck your baggage with your respective airline
                          before traveling for a hassle-free travel experience.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          Group Booking Rules will be applicable if passengers
                          are 9 or more in numbers.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          Company is not responsible for any delay or
                          cancellation of flights from airline's end.
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                          Unaccompanied Child: Children below the age of 12 will
                          not be accepted for carriage unless they are
                          accompanied by a person of at least 18 years of age.
                          Such child/children must be seated next to the
                          accompanying adult. The accompanying adult is solely
                          responsible for the well-being of the child/children
                          traveling together with him/her. This also includes
                          ensuring that seats are booked to ensure
                          child/children and an accompanying adult are seated
                          together.
                        </li>
                      </ul>
                    </p>

                    <table
                      className="invoice-table table-style1"
                      style={{ marginTop: "20px" }}
                    >
                      <thead>
                        <tr>
                          <td>
                            <b>SkyPort DestinationsOnline </b>
                          </td>
                          <td>
                            <b>Phone: </b>+91 92112 52356
                          </td>
                          <td>
                            <b>Email: </b>support@tripgoonline.com
                          </td>
                        </tr>
                      </thead>
                    </table>

                    <div className="body-shape3">
                      <svg
                        width="100%"
                        height="auto"
                        viewBox="0 0 850 127"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_2_2031"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x={0}
                          y={0}
                          width={850}
                          height={127}
                        >
                          <path
                            d="M850 0H0V42.3333H150.317C192.985 42.3333 234.534 55.9786 268.894 81.2752L278.106 88.0581C312.466 113.355 354.015 127 396.683 127H850V0Z"
                            fill="#E1ECFF"
                          />
                        </mask>
                        <g mask="url(#mask0_2_2031)">
                          <rect
                            width={862}
                            height={457}
                            transform="matrix(-1 0 0 1 856 -126)"
                            fill="#E1ECFF"
                          />
                          <g
                            style={{ mixBlendMode: "soft-light" }}
                            opacity="0.2"
                          >
                            <path
                              d="M850 0H0V42.3333H194.1C231.031 42.3333 266.305 57.6646 291.5 84.6667C316.695 111.669 351.969 127 388.9 127H850V0Z"
                              fill="#E1ECFF"
                            />
                          </g>
                        </g>
                      </svg>

                      {/* <svg
    viewBox="0 0 850 127"
    width="100%"
    height="auto"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="customGradient" gradientTransform="rotate(20)">
        <stop offset="20%" stopColor="rgb(247, 48, 48)" />
        <stop offset="100%" stopColor="#053355 " />
      </linearGradient>
    </defs>
    <mask id="mask0_2_2031" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="1100" height="127">
      <path
        d="M850 0H0V42.3333H150.317C192.985 42.3333 234.534 55.9786 268.894 81.2752L278.106 88.0581C312.466 113.355 354.015 127 396.683 127H850V0Z"
        fill="#f2f2f2"
      />
    </mask>
    <g mask="url(#mask0_2_2031)">
      <rect width="1100" height="457" transform="matrix(-1 0 0 1 856 -126)" fill="url(#customGradient)" />
      <g style={{ mixBlendMode: 'soft-light' }} opacity="0.2">
        <path
          d="M850 0H0V42.3333H194.1C231.031 42.3333 266.305 57.6646 291.5 84.6667C316.695 111.669 351.969 127 388.9 127H850V0Z"
          fill="#f2f2f2"
        />
      </g>
    </g>
  </svg> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#053355"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                    {/* <button
                              className="btn btn-outline-secondary mt-5 mb-5"
                              onClick={() => setDuringBooking(false)}
                            >
                              Cancel
                            </button> */}
                    <p>
                      Please hold on a moment while we retrieve your ticket
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <div
            style={{ position: "relative" }}
            className="ticket_container_mobileee"
          >
            <span className="bgGradient"></span>
            {srdvIdx === "undefined" && bookingDetails ? (
              <div className="p-3 ticketContainers">
                {/* Booking Progress */}

                {/* Success Message */}
                <div className="success-message text-center mb-4">
                  {/* <div className="success-icon mb-3">
      <img src='/Images/verify.png' className="bi bi-check-circle" style={{height:'30px'}}/>
    </div> */}
                  <h4 className="fw-bold mb-2 text-white mt-2">
                    Payment Successful!{" "}
                    <img
                      src="/Images/verify.png"
                      className="bi bi-check-circle"
                      style={{ height: "26px" }}
                    />
                  </h4>
                  <p className="" style={{ color: "#f0f0f0" }}>
                    Your booking has been confirmed. Ticket details have been
                    sent to your email.
                  </p>
                </div>
                {/* Booking Details */}
                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">
                        {bookingDetails2 && "OutBound"} Booking ID
                      </div>
                      <div className="fw-medium">
                        {bookingDetails.BookingId}
                      </div>
                    </div>
                    {bookingDetails2 && (
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Inbound Booking ID</div>
                        <div className="fw-medium">
                          {bookingDetails2.BookingId}
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>{formatTime(bookingDetails.InvoiceCreatedOn)}</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">
                        {bookingDetails2 && "OutBound"} Airline PNR
                      </div>
                      <div>
                        {bookingDetails.Segments[0].AirlinePNR === ""
                          ? bookingDetails.PNR
                          : bookingDetails.Segments[0].AirlinePNR}
                      </div>
                    </div>
                    {bookingDetails2 && (
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Inbound Airline PNR</div>
                        <div>
                          {bookingDetails2.Segments[0].AirlinePNR === ""
                            ? bookingDetails2.PNR
                            : bookingDetails2.Segments[0].AirlinePNR}
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        {Math.round(bookingDetails.Fare.PublishedFare)}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        {bookingDetails2 && "OutBound"} Flight Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bus-icon me-3">
                          <img
                            style={{ width: "40px", borderRadius: "5px" }}
                            src={`/Images/AirlineLogo/${bookingDetails.Segments[0].Airline.AirlineCode}.gif`}
                          />
                          {/* <i className="bi bi-bus-front" /> */}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">
                            {" "}
                            {bookingDetails.Segments[0].Airline.AirlineName}
                          </h6>
                          <div className="text-muted small">
                            {bookingDetails.Segments[0].Airline.AirlineCode}-{" "}
                            {bookingDetails.Segments[0].Airline.FlightNumber}
                          </div>
                        </div>
                      </div>

                      {bookingDetails.Segments.map((detail, index) => (
                        <div className="journey-details mb-3">
                          <div className="d-flex mb-3">
                            <div className="journey-stops me-3">
                              <div className="departure-stop" />
                              <div className="journey-line" />
                              <div className="arrival-stop" />
                            </div>
                            <div className="journey-info flex-grow-1">
                              <div className="mb-3">
                                <div className="fw-bold">
                                  {" "}
                                  {detail.Origin.Airport.CityName}(
                                  {detail.Origin.Airport.CityCode})
                                </div>
                                <div className="text-muted small">
                                  {" "}
                                  {formatTime(detail.Origin.DepTime)}
                                </div>
                              </div>
                              <div>
                                <div className="fw-bold">
                                  {" "}
                                  {detail.Destination.Airport.CityName}(
                                  {detail.Destination.Airport.CityCode})
                                </div>
                                <div className="text-muted small">
                                  {formatTime(detail.Destination.ArrTime)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {bookingDetails2 && (
                      <div>
                        <h6
                          className="fw-bold mb-3"
                          style={{
                            color: "#396ace",
                            background: "#9ebdd54a",
                            padding: "10px",
                          }}
                        >
                          Inbound Flight Details
                        </h6>
                        <div className="d-flex align-items-center mb-3">
                          <div className="bus-icon me-3">
                            <img
                              style={{ width: "40px", borderRadius: "5px" }}
                              src={`/Images/AirlineLogo/${bookingDetails2.Segments[0].Airline.AirlineCode}.gif`}
                            />
                            {/* <i className="bi bi-bus-front" /> */}
                          </div>
                          <div>
                            <h6 className="fw-bold mb-0">
                              {" "}
                              {bookingDetails2.Segments[0].Airline.AirlineName}
                            </h6>
                            <div className="text-muted small">
                              {bookingDetails2.Segments[0].Airline.AirlineCode}-{" "}
                              {bookingDetails2.Segments[0].Airline.FlightNumber}
                            </div>
                          </div>
                        </div>
                        {bookingDetails2.Segments.map((detail, index) => (
                          <div className="journey-details mb-3">
                            <div className="d-flex mb-3">
                              <div className="journey-stops me-3">
                                <div className="departure-stop" />
                                <div className="journey-line" />
                                <div className="arrival-stop" />
                              </div>
                              <div className="journey-info flex-grow-1">
                                <div className="mb-3">
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Origin.Airport.CityName}(
                                    {detail.Origin.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {" "}
                                    {formatTime(detail.Origin.DepTime)}
                                  </div>
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Destination.Airport.CityName}(
                                    {detail.Destination.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {formatTime(detail.Destination.ArrTime)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {bookingDetails.Passenger.map((passenger, index) => (
                      <div className="row mb-3">
                        <div className="col-6">
                          <div className="text-muted small mb-1">Passenger</div>
                          <div className="fw-medium">
                            {passenger.FirstName} {passenger.LastName}{" "}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-muted small mb-1">
                            {bookingDetails2 && "OutBound"} Ticket No.
                          </div>
                          <div
                            className="fw-medium"
                            style={{ textAlign: "end" }}
                          >
                            {passenger.Ticket && passenger.Ticket.TicketNumber}
                          </div>
                        </div>
                        {bookingDetails2 && (
                          <div className="col-6">
                            <div className="text-muted small mb-1">
                              Inbound Ticket No.
                            </div>
                            <div className="fw-medium">
                              {
                                bookingDetails2.Passenger[index].Ticket
                                  .TicketNumber
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Additional Info */}
                    {bookingDetails.Segments[0].Baggage !== "" && (
                      <div className="additional-info bg-white p-2 rounded-3 small">
                        <div>
                          <LuBaggageClaim className="bi bi-bag me-1 text-primary-color" />{" "}
                          Luggage allowance:
                          {bookingDetails.Segments[0].Baggage}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="d-flex justify-content-between mt-2 ">
        <div className="" style={{fontWeight:'400',fontSize:'14px'}}>We have sent the ticket to <br />
        <span style={{fontWeight:'700',fontSize:'14px'}}>support@weblink.net</span></div>
        <div>Resent</div>
      </div> */}
                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {" "}
                        ₹
                        {bookingDetails2
                          ? Math.round(bookingDetails.Fare.BaseFare) +
                            Math.round(bookingDetails2.Fare.BaseFare)
                          : Math.round(bookingDetails.Fare.BaseFare)}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Tax & Surcharges</div>
                      <div>
                        {" "}
                        ₹
                        {bookingDetails2
                          ? Math.round(bookingDetails.Fare.Tax) +
                            Math.round(bookingDetails2.Fare.Tax)
                          : Math.round(bookingDetails.Fare.Tax)}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        ₹
                        {bookingDetails2
                          ? Math.round(bookingDetails.Fare.PublishedFare) +
                            Math.round(bookingDetails2.Fare.PublishedFare)
                          : Math.round(bookingDetails.Fare.PublishedFare)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    onClick={downloadPdf}
                    type="button"
                  >
                    Download PDF Ticket
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
                {/* Share Trip */}
                {/* <div className="share-trip text-center mt-4">
    <p className="text-muted small mb-2">Share your trip details</p>
    <div className="social-share d-flex justify-content-center gap-3">
     <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
        <i className="bi bi-whatsapp" />
     </Link>
     <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
        <i className="bi bi-facebook" />
     </Link>
     <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
        <i className="bi bi-twitter" />
     </Link>
     <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
        <i className="bi bi-envelope" />
     </Link>
    </div>
  </div> */}
              </div>
            ) : (
              <div className="booking-overlayyyssss">
                <div className="overlay" style={{ opacity: "1" }}></div>
                <div className="booking-card animate-fade-in">
                  <Card className="text-center shadow">
                    <Card.Header
                      className="fw-bold"
                      style={{
                        background:
                          "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                        color: "#fff",
                      }}
                    >
                      Please Wait
                    </Card.Header>
                    <Card.Body>
                      <Spinner
                        animation="border"
                        variant="#053355"
                        className="mb-3"
                      />
                      <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                      {/* <button
                              className="btn btn-outline-secondary mt-5 mb-5"
                              onClick={() => setDuringBooking(false)}
                            >
                              Cancel
                            </button> */}
                      <p>
                        Please hold on a moment while we retrieve your ticket
                        information. This won't take long!
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {srdvIdx === "EwebM" && (
        <>
          {bookingDetails ? (
            <>
              <section
                className="order__section"
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                    <div className="pageComponentsLinks">
                      <ul className="pageLinksUl">
                        <li
                          data-test="component-nav_link"
                          onClick={handlePrint}
                        >
                          <span data-test="component-link_text" className="">
                            Print
                          </span>
                        </li>
                        <li
                          data-test="component-nav_link"
                          onClick={downloadPdf}
                        >
                          <span data-test="component-link_text" className="">
                            Save Pdf
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Email
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Whatsapp
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">
                                SkyPort DestinationsOnline{" "}
                              </h3>
                            </div>
                            <div
                              className="invoice__righttbox mt-2"
                              onClick={downloadPdf}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src="https://pixner.net/rechargio/rechargio/assets/img/svg/pringting.svg"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="reservation__contetn">
                            <span className="dtext fz-16 fw-400 lato d-block mb__10">
                              Hey{" "}
                              {
                                bookingDetails.PassengerInfos[0].Passenger
                                  .PaxName.PassengerFirstName
                              }{" "}
                              {
                                bookingDetails.PassengerInfos[0].Passenger
                                  .PaxName.PassengerLastName
                              }
                              ,
                            </span>
                            <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              <IoMdCheckboxOutline
                                size={20}
                                color="#43a047"
                                // src="https://pixner.net/rechargio/rechargio/assets/img/svg/over-check.svg"
                                className="overcheck"
                                alt="img"
                                style={{ marginTop: "-8px" }}
                              />
                              <label className="gratext fz-18 fw-600 lato">
                               {
								  bookingDetails?.TicketStatus === "TktInProcess" ? (
									<p className="text-orange-600 font-medium">
									  Your booking is currently being processed. Ticket confirmation
									  will be updated shortly.
									</p>
								  ) : bookingDetails?.TicketStatus === "Ticketed" ? (
									<p className="text-green-600 font-medium">
									  Congratulations! Your Booking has been confirmed.
									</p>
								  ) : null
								}
                              </label>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>
                                          {bookingDetails2 && "OutBound"}{" "}
                                          Booking ID:
                                        </b>
                                        <br />
                                        <span>{bookingDetails.MFRef}</span>
                                      </div>
                                      <div>
                                        {bookingDetails2 && (
                                          <>
                                            <b>Inbound Booking ID:</b>
                                            <br />
                                            <span>
                                              {bookingDetails.BookingId}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Booking Status:</b>
                                    <br />
                                    <span>{bookingDetails.TicketStatus}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="table-title">
                                <b>
                                  {bookingDetails2 && "OutBound"} Flight
                                  Information:
                                </b>
                              </p>
                              <table className="invoice-table table-stripe3 style5">
                                <thead>
                                  <tr>
                                    <th colSpan="2">Airline Details</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Duration</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bookingDetails.Itineraries[0].ItineraryInfo.ReservationItems.map(
                                    (detail, index) => (
                                      <tr>
                                        <td>
                                          <img
                                            src={`/Images/AirlineLogo/${detail.OperatingAirlineCode}.gif`}
                                            // src={`/Images/AirlineLogo/AI.gif`}
                                            alt=""
                                            style={{ width: "80px" }}
                                          />
                                          <br />
                                          <span>
                                            {" "}
                                            {detail.OperatingAirlineCode}{" "}
                                            {detail.FlightNumber}
                                          </span>
                                        </td>
                                        <td>
                                          <p>
                                            <span style={{ fontSize: "14px" }}>
                                              {/* {detail.Airline.AirlineName} */}
                                            </span>
                                            <br />
                                            Cabin Class :{" "}
                                            {detail.CabinClass === "Y"
                                              ? "Economy"
                                              : detail.CabinClass === "B"
                                              ? "Business"
                                              : detail.CabinClass === "F"
                                              ? "First"
                                              : "Economy"}
                                            {/* {cabinMapping[detail.CabinClass]} */}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.DepartureDateTime
                                              )}
                                            </span>
                                            <br />
                                            {
                                              detail.DepartureAirportLocationCode
                                            }
                                            {/* (
                                   {detail.Origin.Airport.CityCode}) */}
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.ArrivalDateTime
                                              )}
                                            </span>
                                            <br />
                                            {detail.ArrivalAirportLocationCode}
                                            {/* (
                                   {detail.Destination.Airport.CityCode}) */}
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>{formatDuration(detail.JourneyDuration)}</td>
                                        {/* <td>{getTimeDifference(detail.DepartureDateTime, detail.ArrivalDateTime)}</td> */}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              {bookingDetails2 && (
                                <>
                                  <p className="table-title">
                                    <b>Inbound Flight Information:</b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th colSpan="2">Airline Details</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Duration</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails2.Segments.map(
                                        (detail, index) => (
                                          <tr>
                                            <td>
                                              <img
                                                src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                                // src={`/Images/AirlineLogo/AI.gif`}
                                                alt=""
                                                style={{ width: "80px" }}
                                              />
                                              <br />
                                              <span>
                                                {" "}
                                                {
                                                  detail.Airline.AirlineCode
                                                }{" "}
                                                {detail.Airline.FlightNumber}
                                              </span>
                                            </td>
                                            <td>
                                              <p>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {detail.Airline.AirlineName}
                                                </span>
                                                <br />
                                                Cabin Class :{" "}
                                                {
                                                  cabinMapping[
                                                    detail.CabinClass
                                                  ]
                                                }
                                              </p>
                                            </td>
                                            <td>
                                              <p style={{ fontSize: "14px" }}>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {formatTime(
                                                    detail.Origin.DepTime
                                                  )}
                                                </span>
                                                <br />
                                                {detail.Origin.Airport.CityName}
                                                (
                                                {detail.Origin.Airport.CityCode}
                                                )
                                                <br />
                                                {/* Terminal - 2 */}
                                              </p>
                                            </td>
                                            <td>
                                              <p style={{ fontSize: "14px" }}>
                                                <span
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  {formatTime(
                                                    detail.Destination.ArrTime
                                                  )}
                                                </span>
                                                <br />
                                                {
                                                  detail.Destination.Airport
                                                    .CityName
                                                }
                                                (
                                                {
                                                  detail.Destination.Airport
                                                    .CityCode
                                                }
                                                )
                                                <br />
                                                {/* Terminal - 2 */}
                                              </p>
                                            </td>
                                            <td>{detail.Duration} m</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}
                              <div
                                className="invoice-table table-style1"
                                style={{ padding: "10px 5px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    We have sent the ticket to :{" "}
                                    <b>
                                      {" "}
                                      {
                                        bookingDetails.PassengerInfos[0]
                                          .Passenger.EmailAddress
                                      }
                                    </b>
                                  </div>
                                  <button
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#2196F3",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Resend It
                                  </button>
                                </div>
                              </div>
                              {bookingDetails && (
                                <>
                                  <p className="table-title">
                                    <b>
                                      {" "}
                                      {bookingDetails2 && "OutBound"} Passenger
                                      Information:
                                    </b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th>Passenger's :</th>
                                        <th>Gender:</th>
                                        <th>PNR :</th>

                                        <th> Ticket Number :</th>

                                        <th>Seat No.:</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails.PassengerInfos.map(
                                        (passenger, index) => {
                                          const pax = passenger.Passenger;
                                          const eTickets =
                                            passenger.ETickets || [];
                                          const eTicketNumber =
                                            eTickets.length > 0 &&
                                            eTickets[0].ETicketNumber
                                              ? eTickets[0].ETicketNumber
                                              : "N/A";

                                          return (
                                            <tr key={index}>
                                              <td>
                                                {pax.PaxName.PassengerFirstName}{" "}
                                                {pax.PaxName.PassengerLastName}
                                              </td>
                                              <td>
                                                {pax.Gender === "M"
                                                  ? "Male"
                                                  : "Female"}
                                              </td>
                                              <td>
                                                {bookingDetails.Itineraries?.[0]
                                                  ?.ItineraryInfo
                                                  ?.ReservationItems?.[0]
                                                  ?.AirlinePNR || "N/A"}
                                              </td>
                                              <td>{eTicketNumber}</td>
                                              <td>N/A</td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}

                              {bookingDetails2 && (
                                <>
                                  <p className="table-title">
                                    <b>Inbound Passenger Information:</b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th>Passenger's :</th>
                                        <th>Gender:</th>

                                        <th>PNR :</th>

                                        <th>Ticket Number :</th>

                                        <th>Seat No.:</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails2.Passenger.map(
                                        (passenger, index) => (
                                          <tr>
                                            <td>
                                              {" "}
                                              {passenger.FirstName}{" "}
                                              {passenger.LastName}{" "}
                                            </td>
                                            <td>
                                              {passenger.Gender === 1 && "Male"}{" "}
                                              {passenger.Gender === 0 &&
                                                "Female"}
                                              {passenger.Gender === 2 &&
                                                "Female"}{" "}
                                            </td>

                                            {bookingDetails2 && (
                                              <td>
                                                {bookingDetails2.Segments[0]
                                                  .AirlinePNR === ""
                                                  ? bookingDetails2.PNR
                                                  : bookingDetails2.Segments[0]
                                                      .AirlinePNR}
                                              </td>
                                            )}
                                            <td>
                                              {passenger.Ticket &&
                                                passenger.Ticket.TicketNumber}
                                            </td>

                                            <td>
                                              {passenger.SeatDynamic &&
                                                passenger.SeatDynamic.map(
                                                  (item) => (
                                                    <span>
                                                      {item.RowNo}-{item.SeatNo}
                                                      ,
                                                    </span>
                                                  )
                                                )}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}

                              {bookingDetails && (
                                <table className="invoice-table table-stripe3">
                                  <thead>
                                    <tr>
                                      <th>Description</th>

                                      <th style={{ textAlign: "end" }}>
                                        Total
                                      </th>
                                    </tr>
                                  </thead>
                                 <tbody>
                                      <tr>
                                        <td>Base Fare</td>
                                        <td style={{ textAlign: "end" }}>
                                          $
                                          {bookingDetails2
                                            ? Math.round(bookingDetails.Fare.BaseFare) +
                                              Math.round(bookingDetails2.Fare.BaseFare)
                                            : Math.round(bookingDetails.Fare.BaseFare)}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Tax & Surcharges</td>
                                        <td style={{ textAlign: "end" }}>
                                          $
                                          {bookingDetails2
                                            ? Math.round(bookingDetails.Fare.Tax) +
                                              Math.round(bookingDetails2.Fare.Tax)
                                            : Math.round(bookingDetails.Fare.Tax)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  <tfoot>
                                    <tr>
                                      <td>
                                        <b>Total Amount:</b>
                                      </td>
                                      <td style={{ textAlign: "end" }}>
                                        $
                                        {bookingDetails.Fare?.Amount ?? 0}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              )}
                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              <p className="invoice-note mt-3">
                                <svg
                                  width={14}
                                  height={18}
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>{" "}
                                <b>NOTE: </b>This is computer generated receipt
                                and does not require physical signature.
                              </p>
                            </div>
                            <div className="invoice-buttons">
                              <button className="print_btn">
                                <svg
                                  width={20}
                                  height={21}
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                    fill="#00C764"
                                  />
                                </svg>
                              </button>{" "}
                              <button
                                id="download_btn"
                                className="download_btn"
                                onClick={downloadPdf}
                              >
                                <svg
                                  width={25}
                                  height={19}
                                  viewBox="0 0 25 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#053355"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                    {/* <button
                           className="btn btn-outline-secondary mt-5 mb-5"
                           onClick={() => setDuringBooking(false)}
                         >
                           Cancel
                         </button> */}
                    <p>
                      Please hold on a moment while we retrieve your ticket
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <div
            style={{ position: "relative" }}
            className="ticket_container_mobileee"
          >
            <span className="bgGradient"></span>
            {srdvIdx === "EwebM" && bookingDetails ? (
              <div className="p-3 ticketContainers">
                {/* Booking Progress */}

                {/* Success Message */}
                <div className="success-message text-center mb-4">
                  {/* <div className="success-icon mb-3">
   <img src='/Images/verify.png' className="bi bi-check-circle" style={{height:'30px'}}/>
 </div> */}
                  <h4 className="fw-bold mb-2 text-white mt-2">
                    Payment Successful!{" "}
                    <img
                      src="/Images/verify.png"
                      className="bi bi-check-circle"
                      style={{ height: "26px" }}
                    />
                  </h4>
                  <p className="" style={{ color: "#f0f0f0" }}>
                    Your booking has been confirmed. Ticket details have been
                    sent to your email.
                  </p>
                </div>
                {/* Booking Details */}
                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">
                        {bookingDetails2 && "OutBound"} Booking ID
                      </div>
                      <div className="fw-medium">{bookingDetails.MFRef}</div>
                    </div>
                    {bookingDetails2 && (
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Inbound Booking ID</div>
                        <div className="fw-medium">{bookingDetails2.MFRef}</div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {/* {formatTime(bookingDetails.InvoiceCreatedOn)} */}
                        13,Oct,2025
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">
                        {bookingDetails2 && "OutBound"} Airline PNR
                      </div>
                      <div>
                        {bookingDetails.Itineraries[0].ItineraryInfo
                          .ReservationItems[0].AirlinePNR !== ""
                          ? bookingDetails.Itineraries[0].ItineraryInfo
                              .ReservationItems[0].AirlinePNR
                          : "N/A"}
                      </div>
                    </div>
                    {bookingDetails2 && (
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Inbound Airline PNR</div>
                        <div>
                          {bookingDetails2.Itineraries[0].ItineraryInfo
                            .ReservationItems[0].AirlinePNR !== ""
                            ? bookingDetails2.Itineraries[0].ItineraryInfo
                                .ReservationItems[0].AirlinePNR
                            : "N/A"}
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        $
                        {bookingDetails.TransactionDetails?.Transactions?.[0]
                          ?.Amount ?? 0}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        {bookingDetails2 && "OutBound"} Flight Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bus-icon me-3">
                          <img
                            style={{ width: "40px", borderRadius: "5px" }}
                            src={`/Images/AirlineLogo/${bookingDetails.Itineraries[0].ItineraryInfo.ReservationItems[0].OperatingAirlineCode}.gif`}
                          />
                          {/* <i className="bi bi-bus-front" /> */}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">
                            {" "}
                            {
                              bookingDetails.Itineraries[0].ItineraryInfo
                                .ReservationItems[0].AirlinePNR
                            }
                          </h6>
                          <div className="text-muted small">
                            {
                              bookingDetails.Itineraries[0].ItineraryInfo
                                .ReservationItems[0].OperatingAirlineCode
                            }
                            -
                            {
                              bookingDetails.Itineraries[0].ItineraryInfo
                                .ReservationItems[0].FlightNumber
                            }
                            {/* {bookingDetails.Segments[0].Airline.AirlineCode}-{" "}
                     {bookingDetails.Segments[0].Airline.FlightNumber} */}
                          </div>
                        </div>
                      </div>

                      {bookingDetails.Itineraries[0].ItineraryInfo.ReservationItems.map(
                        (detail, index) => (
                          <div className="journey-details mb-3">
                            <div className="d-flex mb-3">
                              <div className="journey-stops me-3">
                                <div className="departure-stop" />
                                <div className="journey-line" />
                                <div className="arrival-stop" />
                              </div>
                              <div className="journey-info flex-grow-1">
                                <div className="mb-3">
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.DepartureAirportLocationCode}
                                  </div>
                                  <div className="text-muted small">
                                    {" "}
                                    {formatTime(detail.DepartureDateTime)}
                                  </div>
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.ArrivalAirportLocationCode}
                                  </div>
                                  <div className="text-muted small">
                                    {formatTime(detail.ArrivalDateTime)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {bookingDetails2 && (
                      <div>
                        <h6
                          className="fw-bold mb-3"
                          style={{
                            color: "#396ace",
                            background: "#9ebdd54a",
                            padding: "10px",
                          }}
                        >
                          Inbound Flight Details
                        </h6>
                        <div className="d-flex align-items-center mb-3">
                          <div className="bus-icon me-3">
                            <img
                              style={{ width: "40px", borderRadius: "5px" }}
                              src={`/Images/AirlineLogo/${bookingDetails2.Segments[0].Airline.AirlineCode}.gif`}
                            />
                            {/* <i className="bi bi-bus-front" /> */}
                          </div>
                          <div>
                            <h6 className="fw-bold mb-0">
                              {" "}
                              {bookingDetails2.Segments[0].Airline.AirlineName}
                            </h6>
                            <div className="text-muted small">
                              {bookingDetails2.Segments[0].Airline.AirlineCode}-{" "}
                              {bookingDetails2.Segments[0].Airline.FlightNumber}
                            </div>
                          </div>
                        </div>
                        {bookingDetails2.Segments.map((detail, index) => (
                          <div className="journey-details mb-3">
                            <div className="d-flex mb-3">
                              <div className="journey-stops me-3">
                                <div className="departure-stop" />
                                <div className="journey-line" />
                                <div className="arrival-stop" />
                              </div>
                              <div className="journey-info flex-grow-1">
                                <div className="mb-3">
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Origin.Airport.CityName}(
                                    {detail.Origin.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {" "}
                                    {formatTime(detail.Origin.DepTime)}
                                  </div>
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Destination.Airport.CityName}(
                                    {detail.Destination.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {formatTime(detail.Destination.ArrTime)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {bookingDetails.PassengerInfos.map((passenger, index) => {
                      const pax = passenger.Passenger;
                      const eTickets = passenger.ETickets || [];
                      const eTicketNumber =
                        eTickets.length > 0 && eTickets[0].ETicketNumber
                          ? eTickets[0].ETicketNumber
                          : "N/A";

                      return (
                        <div className="row mb-3" key={index}>
                          <div className="col-6">
                            <div className="text-muted small mb-1">
                              Passenger
                            </div>
                            <div className="fw-medium">
                              {pax.PaxName.PassengerFirstName}{" "}
                              {pax.PaxName.PassengerLastName}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="text-muted small mb-1">
                              {bookingDetails2 ? "OutBound" : ""} Ticket No.
                            </div>
                            <div
                              className="fw-medium"
                              style={{ textAlign: "end" }}
                            >
                              {eTicketNumber}
                            </div>
                          </div>

                          {bookingDetails2 &&
                          bookingDetails2.Passenger?.[index]?.Ticket ? (
                            <div className="col-6">
                              <div className="text-muted small mb-1">
                                Inbound Ticket No.
                              </div>
                              <div className="fw-medium">
                                {bookingDetails2.Passenger[index].Ticket
                                  .TicketNumber || "N/A"}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}

                    {/*            
             {bookingDetails.Segments[0].Baggage !== "" && (
               <div className="additional-info bg-white p-2 rounded-3 small">
                 <div>
                   <LuBaggageClaim className="bi bi-bag me-1 text-primary-color" />{" "}
                   Luggage allowance:
                   {bookingDetails.Segments[0].Baggage}
                 </div>
               </div>
             )} */}
                  </div>
                  {/* <div className="d-flex justify-content-between mt-2 ">
     <div className="" style={{fontWeight:'400',fontSize:'14px'}}>We have sent the ticket to <br />
     <span style={{fontWeight:'700',fontSize:'14px'}}>support@weblink.net</span></div>
     <div>Resent</div>
   </div> */}
                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div> $ 0</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Tax & Surcharges</div>
                      <div> $ 0</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        $
                        {bookingDetails.TransactionDetails?.Transactions?.[0]
                          ?.Amount ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    onClick={downloadPdf}
                    type="button"
                  >
                    Download PDF Ticket
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
                {/* Share Trip */}
                {/* <div className="share-trip text-center mt-4">
 <p className="text-muted small mb-2">Share your trip details</p>
 <div className="social-share d-flex justify-content-center gap-3">
  <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
     <i className="bi bi-whatsapp" />
  </Link>
  <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
     <i className="bi bi-facebook" />
  </Link>
  <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
     <i className="bi bi-twitter" />
  </Link>
  <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
     <i className="bi bi-envelope" />
  </Link>
 </div>
</div> */}
              </div>
            ) : (
              <div className="booking-overlayyyssss">
                <div className="overlay" style={{ opacity: "1" }}></div>
                <div className="booking-card animate-fade-in">
                  <Card className="text-center shadow">
                    <Card.Header
                      className="fw-bold"
                      style={{
                        background:
                          "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                        color: "#fff",
                      }}
                    >
                      Please Wait
                    </Card.Header>
                    <Card.Body>
                      <Spinner
                        animation="border"
                        variant="#053355"
                        className="mb-3"
                      />
                      <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                      {/* <button
                           className="btn btn-outline-secondary mt-5 mb-5"
                           onClick={() => setDuringBooking(false)}
                         >
                           Cancel
                         </button> */}
                      <p>
                        Please hold on a moment while we retrieve your ticket
                        information. This won't take long!
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TicketBooking;
