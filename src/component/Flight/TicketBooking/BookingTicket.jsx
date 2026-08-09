import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./BookingTicket.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { RxCross2 } from "react-icons/rx";
import { FaRegFilePdf, FaWhatsapp } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoPrintSharp } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { BsCurrencyDollar } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cities12 } from "../../../Cities";

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

const FlightBookingTicket = () => {
  const srdvIdx = decodeURIComponent(useParams().srdvIdx);
  console.log("srdvIdx at ticket", srdvIdx);

  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);

  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);

  useEffect(() => {
    const URL = `https://admin.skyportdestinations.com/api/currency_convert/${fromCurrency}/${toCurrency}`;
    const getExchangeRate = async () => {
      try {
        const response = await axios.get(URL);
        const rate = response.data.data.Conversion_Rate;
        // console.log("ratetetesafdfs", rate);
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    if (fromCurrency !== toCurrency) {
      getExchangeRate(URL);
    } else {
      setExchangeRate(1);
    }
  }, []);

  useEffect(() => {
    const URL = `https://admin.skyportdestinations.com/api/currency_convert/${fromCurrency2}/${toCurrency2}`;
    const getExchangeRate = async () => {
      try {
        const response = await axios.get(URL);
        const rate = response.data.data.Conversion_Rate;
        console.log("ratetetesafdfs", rate);
        setExchangeRate2(rate);
      } catch (error) {
        console.error("Error fetching exchange rate2:", error);
      }
    };
    if (fromCurrency2 !== toCurrency2) {
      getExchangeRate(URL);
    } else {
      setExchangeRate2(1);
    }
  }, []);

  const handleChangeCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      const convertedValue = amount * exchangeRate;
      return convertedValue.toFixed(2);
    }
  };

  const handleChangeCurrency2 = (amount) => {
    if (!isNaN(amount) && exchangeRate2) {
      const convertedValue = amount * exchangeRate2;
      return convertedValue.toFixed(2);
    }
  };

  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingDetails2, setBookingDetails2] = useState(null);
  const [bookingDetailsParto, setBookingDetailsParto] = useState(null);
  const [bookingDetailsTJ, setBookingDetailsTJ] = useState(null);

  const token = localStorage.getItem("token");

  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();

  useEffect(() => {
    const bookingId = sessionStorage.getItem("BookingId");
    const parsedBookingId = bookingId ? JSON.parse(bookingId) : null;
    const pnr = sessionStorage.getItem("PNR");
    const parsedPnr = pnr ? JSON.parse(pnr) : null;
    const firstname = sessionStorage.getItem("FirstName");
    const lastname = sessionStorage.getItem("LastName");

    const UniqueId = sessionStorage.getItem("UniqueId");
    const parsedUniqueId =
      UniqueId !== "undefined" ? JSON.parse(UniqueId) : null;

    const bookingIdTJ = sessionStorage.getItem("BookingIdTJ");
    // const parsedBookingIdTJ = bookingIdTJ ? JSON.parse(bookingIdTJ) : null;

    const bookingId2 = sessionStorage.getItem("BookingId2");
    const parsedBookingId2 = bookingId2 ? JSON.parse(bookingId2) : null;
    const pnr2 = sessionStorage.getItem("PNR2");
    const parsedPnr2 = pnr2 ? JSON.parse(pnr2) : null;
    const firstname2 = sessionStorage.getItem("FirstName2");
    const lastname2 = sessionStorage.getItem("LastName2");
    console.log("booking request data", {
      EndUserIp: "192.168.11.58",
      TokenId: token,
      TraceId: String(sessionStorage.getItem("traceId")),
      PNR: parsedPnr,
      BookingId: parsedBookingId,
      FirstName: firstname,
      LastName: lastname,
    });
    console.log("booking2 request data", {
      EndUserIp: "192.168.11.58",
      TokenId: token,
      TraceId: String(sessionStorage.getItem("traceId")),
      PNR: parsedPnr2,
      BookingId: parsedBookingId2,
      FirstName: firstname2,
      LastName: lastname2,
    });
    console.log("booking request parto data", {
      SessionId: sessionId,
      UniqueId: parsedUniqueId,
    });

    const fetchData = async () => {
      try {
        let responseP;
        if (srdvIdx === "SrdvP") {
          responseP = await fetch(
            "https://admin.skyportdestinations.com/api/air_bookingdata",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                SessionId: sessionId,
                UniqueId: parsedUniqueId,
              }),
            }
          );
        }

        let responseTJ;
        if (srdvIdx === "SrdvTJ") {
          console.log("TJ ticket req data", {
            bookingId: bookingIdTJ,
          });
          responseTJ = await fetch(
            "https://admin.skyportdestinations.com/api/flight_booking_details",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookingId: bookingIdTJ,
              }),
            }
          );
        }

        let response;
        if (srdvIdx === "undefined") {
          response = await fetch(
            "https://admin.skyportdestinations.com/api/flight-booking-details",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                EndUserIp: "192.168.11.58",
                TokenId: token,
                TraceId: String(sessionStorage.getItem("traceId")),
                BookingId: parsedBookingId,
                PNR: parsedPnr,
                FirstName: firstname,
                LastName: lastname,
              }),
            }
          );
        }
        // let response2;
        // if (firstname2) {
        //   response2 = await fetch(
        //     "https://admin.skyportdestinations.com/api/flight-booking-details",
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         EndUserIp: "192.168.11.58",
        //         TokenId: token,
        //         TraceId: String(sessionStorage.getItem("traceId")),
        //         BookingId: parsedBookingId2,
        //         PNR: parsedPnr2,
        //         FirstName: firstname2,
        //         LastName: lastname2,
        //       }),
        //     }
        //   );
        // }

        if (srdvIdx === "undefined") {
          if (response.ok) {
            const data = await response.json();
            setBookingDetails(data.data.FlightItinerary);
            console.log("booking details", data);
            if (!data.success) {
              // navigate("/404");
            }
          } else {
            // navigate("/404");
            throw new Error("Failed to fetch data");
          }
        }

        if (srdvIdx === "SrdvP") {
          if (responseP) {
            console.log("responseP", responseP);
            const data = await responseP.json();
            console.log("data from responseP", data);

            const originDestinationOptions =
              data.data.flightresult.TravelItinerary.ItineraryInfo
                .ReservationItems;

            originDestinationOptions.forEach((segment) => {
              const departureCode = segment.DepartureAirportLocationCode;
              const arrivalCode = segment.ArrivalAirportLocationCode;

              const departureCity = cities12.find(
                (city) => city.AIRPORTCODE === departureCode
              );
              const arrivalCity = cities12.find(
                (city) => city.AIRPORTCODE === arrivalCode
              );

              segment.DepartureCity = departureCity;
              segment.ArrivalCity = arrivalCity;
            });
            setBookingDetailsParto(data.data.flightresult);
            console.log("booking details parto", data);
            if (!data.success) {
              // navigate("/404");
            }
          } else {
            // navigate("/404");
            throw new Error("Failed to fetch parto data");
          }
        }

        if (srdvIdx === "SrdvTJ") {
          if (responseTJ) {
            const data = await responseTJ.json();
            console.log("booking details TJ", data.data);
            setBookingDetailsTJ(data.data);
            if (!data.data.success) {
              // navigate("/404");
            }
          } else {
            // navigate("/404");
            throw new Error("Failed to fetch TJ data");
          }
        }

        // if (response2 && response2.ok) {
        //   const data = await response2.json();
        //   setBookingDetails2(data.data.FlightItinerary);
        //   console.log("booking2 details", data);
        //   if (!data.success) {
        //     // navigate("/404");
        //   }
        // } else {
        //   response2 && response2.ok && lastname2 && navigate("/404");
        //   throw new Error("Failed to fetch data");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        // navigate("/404");
      }
    };

    fetchData();
  }, []);

  const downloadPdf = () => {
    const capture = document.querySelector(".ticketdata");

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Get image dimensions
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const aspectRatio = imageWidth / imageHeight;

      // Calculate the number of pages needed
      const pageHeight = pdfWidth / aspectRatio;
      let position = 0;
      let heightLeft = imageHeight;

      // Loop through adding pages until we cover the entire content
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pageHeight);
        heightLeft -= pageHeight;
        position -= pdfHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      // Save the PDF
      pdf.save("bookingDetail.pdf");
    });
  };

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
    1: "Economy",
    2: "Premium Economy",
    3: "Business",
    4: "Premium Business",
    5: "First",
    6: "Premium First",
    100: "",
  };

  const [active, setActive] = useState(false);
  const [hidePerson, setHidePerson] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);

  const sendWhatsAppMessage = async () => {};
  // console.log("bookingdeatailTJ", bookingDetailsTJ);
  return (
    <div style={{ fontSize: "larger" }}>
      {srdvIdx === "SrdvTJ" && bookingDetailsTJ && (
        <div
          className="BookingConfirmBookingHead"
          style={{ minWidth: "1140px" }}
        >
          <div className="flightBookingHeaderDiv">
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePerson(!hidePerson)}
            >
              <FaPerson />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                Hide person
              </span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <IoPrintSharp />
              <span className="hotelBookingHideDetails"> Print</span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <FaRegFilePdf />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                {" "}
                Save Pdf
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <MdMarkEmailUnread />
              <span className="hotelBookingHideDetails"> Email </span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={sendWhatsAppMessage}
            >
              <FaWhatsapp />
              <span className="hotelBookingHideDetails"> Whatsapp</span>
            </div>
            <div className="flightBookingUpperIcon">
              <LiaSmsSolid />
              <span className="hotelBookingHideDetails"> Sms</span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePrice(!hidePrice)}
            >
              <BsCurrencyDollar />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                {" "}
                Hide Price
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <BsCurrencyDollar />
              <span
                className="hotelBookingHideDetails"
                onClick={() => setActive(!active)}
              >
                {" "}
                Markup
              </span>
            </div>
            <div
              style={{
                padding: "3px 6px",
                backgroundColor: "#db0e0edb",
                fontSize: "20px",
                color: "white",
              }}
            >
              <RxCross2 />
            </div>
          </div>

          <section className="container-fluid ticketdata">
            <div className="container">
              <div className="maindiv">
                <div className="top-part">
                  <div className="logo">
                    <img
                      src="/Images/logo-TripGo.png"
                      alt="Logo"
                      width={200}
                      style={{ width: "250px", height: "100px" }}
                      height={150}
                    />
                  </div>
                  <div className="ticket-details">
                    <div className="details">
                      <h4>Ticket-Confirmed</h4>
                      <p>
                        <span>Booking ID:</span>{" "}
                        {bookingDetailsTJ.order.bookingId}
                      </p>
                      <p>
                        <span>Booking Date:</span>{" "}
                        {formatTime(bookingDetailsTJ.order.createdOn)}
                      </p>
                      <p>
                        <span>Airline confirmation Number:</span>
                        {bookingDetailsTJ.itemInfos.AIR.travellerInfos[0]
                          .pnrDetails &&
                          bookingDetailsTJ.itemInfos.AIR.travellerInfos[0]
                            .pnrDetails[
                            Object.keys(
                              bookingDetailsTJ.itemInfos.AIR.travellerInfos[0]
                                .pnrDetails
                            )[0]
                          ]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="passenger-details">
                  <h4>
                    {" "}
                    Passenger
                    {/* - {passengerDetails.adults} Adult {passengerDetails.children} Child  */}
                  </h4>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Passenger</th>
                        <th scope="col">Airline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Airline PNR</th>
                        <th scope="col">Ticket Number</th>
                        <th scope="col">Seat No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsTJ.itemInfos.AIR.travellerInfos.map(
                        (passenger, index) => (
                          <tr key={index}>
                            <td>
                              {passenger.fN} {passenger.lN}
                            </td>
                            <td>
                              {
                                bookingDetailsTJ.itemInfos.AIR.tripInfos[0]
                                  .sI[0].fD.aI.code
                              }
                            </td>
                            <td>{bookingDetailsTJ.order.status}</td>
                            <td>
                              {passenger.pnrDetails &&
                                Object.keys(passenger.pnrDetails).join(", ")}
                            </td>
                            <td>
                              {passenger.pnrDetails &&
                                passenger.pnrDetails[
                                  Object.keys(passenger.pnrDetails)[0]
                                ]}
                            </td>
                            <td>{/* {passenger.ticketNumber} */}</td>
                            <td>{/* {passenger.seatNo} */}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flight-details">
                  <h4> Flight Details </h4>
                  <table className="table text-center table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" colSpan="2">
                          Airline Details
                        </th>
                        <th scope="col">Departure</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsTJ.itemInfos.AIR.tripInfos[0] &&
                        bookingDetailsTJ.itemInfos.AIR.tripInfos[0].sI.map(
                          (detail, index) => (
                            <tr key={index}>
                              <td>
                                <i className="fa-solid fa-plane-circle-check fa-fw"></i>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {detail.fD.aI.name}
                                  </span>
                                  <br />
                                  {detail.fD.fN}
                                  {/* Cabin Class:
                              <br />({flight.cabinClass}) */}
                                </p>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {formatTime(detail.dt)}
                                  </span>
                                  <br />
                                  {detail.da.name} ({detail.da.code})
                                  <br />
                                  {detail.da.terminal}
                                </p>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {formatTime(detail.at)}
                                  </span>
                                  <br />
                                  {detail.aa.name} ({detail.aa.code})
                                  <br />
                                  {detail.aa.terminal}
                                </p>
                              </td>
                              <td>{detail.duration} m</td>
                            </tr>
                          )
                        )}
                      {bookingDetailsTJ.itemInfos.AIR.tripInfos[1] &&
                        bookingDetailsTJ.itemInfos.AIR.tripInfos[1].sI.map(
                          (detail, index) => (
                            <tr key={index}>
                              <td>
                                <i className="fa-solid fa-plane-circle-check fa-fw"></i>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {detail.fD.aI.name}
                                  </span>
                                  <br />
                                  {detail.fD.fN}
                                  {/* Cabin Class:
                              <br />({flight.cabinClass}) */}
                                </p>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {formatTime(detail.dt)}
                                  </span>
                                  <br />
                                  {detail.da.name} ({detail.da.code})
                                  <br />
                                  {detail.da.terminal}
                                </p>
                              </td>
                              <td>
                                <p>
                                  <span style={{ fontWeight: 600 }}>
                                    {formatTime(detail.at)}
                                  </span>
                                  <br />
                                  {detail.aa.name} ({detail.aa.code})
                                  <br />
                                  {detail.aa.terminal}
                                </p>
                              </td>
                              <td>{detail.duration} m</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>

                <div className="baggage-flight">
                  <h4> Baggage Info </h4>
                  <table className="table text-center table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" rowSpan="2">
                          Airline
                        </th>
                        <th scope="col" rowSpan="2">
                          Sector
                        </th>
                        <th scope="col" colSpan="2">
                          Baggage
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Check-In</th>
                        <th scope="col">Cabin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsTJ.itemInfos.AIR.tripInfos[0] &&
                        bookingDetailsTJ.itemInfos.AIR.tripInfos[0].sI.map(
                          (info, index) => (
                            <tr key={index}>
                              <td>{info.fD.aI.name}</td>
                              <td>
                                {info.da.code}-{info.aa.code}
                              </td>
                              <td>{/* {baggage.checkIn} */}</td>
                              <td>{/* {baggage.cabin} */}</td>
                            </tr>
                          )
                        )}
                      {bookingDetailsTJ.itemInfos.AIR.tripInfos[1] &&
                        bookingDetailsTJ.itemInfos.AIR.tripInfos[1].sI.map(
                          (info, index) => (
                            <tr key={index}>
                              <td>{info.fD.aI.name}</td>
                              <td>
                                {info.da.code}-{info.aa.code}
                              </td>
                              <td>{/* {baggage.checkIn} */}</td>
                              <td>{/* {baggage.cabin} */}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>

                {!hidePrice && (
                  <div className="flight-details">
                    <h4> Fare Info </h4>
                    <table className="table text-center table-bordered">
                      <thead className=" table-primary">
                        <tr>
                          <th scope="col"> Base Fare</th>
                          <th scope="col">Taxes & Surcharges</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Service Fee</th>
                          <th scope="col">Excess Baggage</th>
                          <th scope="col">Meal</th>
                          <th scope="col">Seat Charges</th>
                          <th scope="col">Other Charges</th>
                          <th scope="col">Total Fare</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingDetailsTJ && !bookingDetails2 && (
                          <tr>
                            <td>
                              {" "}
                              ₹{" "}
                              {
                                bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                  .totalFareDetail.fC.BF
                              }
                            </td>
                            <td>
                              ₹{" "}
                              {
                                bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                  .totalFareDetail.fC.TAF
                              }
                            </td>
                            <td> ₹ 0</td>
                            <td> ₹ 0</td>
                            <td> ₹ 0</td>
                            <td> ₹ 0</td>
                            <td> ₹ 0</td>
                            <td> ₹ 0</td>
                            <td>
                              {" "}
                              ₹{" "}
                              {
                                bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                  .totalFareDetail.fC.TF
                              }
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="personal-details">
                  <h4> Company Contact Details </h4>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Name</td>
                        <td>SkyPort DestinationsTourist & Travel Agency</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Address</td>
                        <td>
                          Mahaveer Sthan Ward No.-23, Bhabua Bihar-821101, India
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Contact</td>
                        <td>
                          {/* 93779897682 |  */}
                          (+91) 9234803549{" "}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Email</td>
                        <td>support@TripGo.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="information-details">
                  <h5>Passport/Visa/Health</h5>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingInlineStart: "20px",
                    }}
                  >
                    <li>
                      {" "}
                      Please ensure that you have all the required travel
                      documents for your entire journey i.e., valid passport &
                      necessary visas, and that you have had the recommended
                      inoculations for your destination(s).
                    </li>
                    <li>
                      {" "}
                      All passengers, including children and infants, have to
                      present their valid ID proof at the time of check-in.
                    </li>
                    <li>
                      {" "}
                      We recommend you check-in at least 3 hours prior to
                      departure of your domestic flight and 4 hours prior to
                      your international flight
                    </li>
                    <li>
                      Carriage and other facilities provided by the carrier are
                      subject to their Terms and Condition. We are not liable
                      for missing any facility of the carrier.
                    </li>
                    <li>
                      Recheck your baggage with your respective airline before
                      traveling for a hassle-free travel experience.
                    </li>
                    <li>
                      Group Booking Rules will be applicable if passengers are 9
                      or more in numbers.
                    </li>
                    <li>
                      Company is not responsible for any delay or cancellation
                      of flights from airline's end.
                    </li>
                    <li>
                      Unaccompanied Child: Children below the age of 12 will not
                      be accepted for carriage unless they are accompanied by a
                      person of at least 18 years of age. Such child/children
                      must be seated next to the accompanying adult. The
                      accompanying adult is solely responsible for the
                      well-being of the child/children traveling together with
                      him/her. This also includes ensuring that seats are booked
                      to ensure child/children and an accompanying adult are
                      seated together.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {srdvIdx === "SrdvP" && bookingDetailsParto && (
        <div
          className="BookingConfirmBookingHead"
          style={{ minWidth: "1140px" }}
        >
          <div className="flightBookingHeaderDiv">
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePerson(!hidePerson)}
            >
              <FaPerson />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                Hide person
              </span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <IoPrintSharp />
              <span className="hotelBookingHideDetails"> Print</span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <FaRegFilePdf />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                Save Pdf
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <MdMarkEmailUnread />
              <span className="hotelBookingHideDetails"> Email </span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={sendWhatsAppMessage}
            >
              <FaWhatsapp />
              <span className="hotelBookingHideDetails"> Whatsapp</span>
            </div>
            <div className="flightBookingUpperIcon">
              <LiaSmsSolid />
              <span className="hotelBookingHideDetails"> Sms</span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePrice(!hidePrice)}
            >
              <BsCurrencyDollar />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                {" "}
                Hide Price
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <BsCurrencyDollar />
              <span
                className="hotelBookingHideDetails"
                onClick={() => setActive(!active)}
              >
                Markup
              </span>
            </div>
            <div
              style={{
                padding: "3px 6px",
                backgroundColor: "#db0e0edb",
                fontSize: "20px",
                color: "white",
              }}
            >
              <RxCross2 />
            </div>
          </div>

          <section className="container-fluid ticketdata">
            <div className="container">
              <div className="maindiv">
                <div className="top-part">
                  <div className="logo">
                    <img
                      src="/Images/logo-express.jpg"
                      alt="Logo"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="ticket-details">
                    <div className="details">
                      <h4>
                        Ticket-{statusMapping[bookingDetailsParto.Status]}
                      </h4>
                      <p>
                        <span>Booking ID:</span> {bookingDetailsParto.UniqueId}
                      </p>
                      <p>
                        <span>Booking Date:</span>{" "}
                        {bookingDetailsParto.TravelItinerary.ItineraryInfo
                          .CustomerInfoes[0].ETicketNumbers &&
                          bookingDetailsParto.TravelItinerary.ItineraryInfo
                            .CustomerInfoes[0].ETicketNumbers[0] &&
                          bookingDetailsParto.TravelItinerary.ItineraryInfo
                            .CustomerInfoes[0].ETicketNumbers[0].DateOfIssue !==
                            "undefined" &&
                          formatTime(
                            bookingDetailsParto.TravelItinerary.ItineraryInfo
                              .CustomerInfoes[0].ETicketNumbers[0].DateOfIssue
                          )}
                      </p>
                      <p>
                        <span>PNR:</span>
                        {
                          bookingDetailsParto.TravelItinerary.ItineraryInfo
                            .ReservationItems[0].AirlinePnr
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="passenger-details">
                  <h4> Passenger</h4>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Passenger</th>
                        <th scope="col">Airline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Airline PNR</th>
                        <th scope="col">Ticket Number</th>
                        <th scope="col">Seat No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsParto.TravelItinerary.ItineraryInfo.CustomerInfoes.map(
                        (passenger, index) => (
                          <tr key={index}>
                            <td>
                              {passenger.Customer.PaxName.PassengerFirstName}{" "}
                              {passenger.Customer.PaxName.PassengerLastName}
                            </td>
                            <td>{bookingDetailsParto.ValidatingAirlineCode}</td>
                            <td>
                              {passenger.ETicketNumbers &&
                                passenger.ETicketNumbers.length > 0 &&
                                passenger.ETicketNumbers[0].EticketStatus &&
                                ticketStatusMapping[
                                  passenger.ETicketNumbers[0].EticketStatus
                                ]}
                            </td>
                            <td>
                              {bookingDetailsParto.TravelItinerary.ItineraryInfo.ReservationItems.map(
                                (segment) =>
                                  `${segment.DepartureAirportLocationCode}-${segment.ArrivalAirportLocationCode}`
                              ).join(", ")}
                            </td>
                            <td>
                              {
                                bookingDetailsParto.TravelItinerary
                                  .ItineraryInfo.ReservationItems[0].AirlinePnr
                              }
                            </td>
                            <td>
                              {bookingDetailsParto.TravelItinerary.ItineraryInfo
                                .CustomerInfoes[0].ETicketNumbers &&
                                bookingDetailsParto.TravelItinerary
                                  .ItineraryInfo.CustomerInfoes[0]
                                  .ETicketNumbers[0] &&
                                bookingDetailsParto.TravelItinerary
                                  .ItineraryInfo.CustomerInfoes[0]
                                  .ETicketNumbers[0].ETicketNumber}
                            </td>
                            <td>
                              {passenger.SegmentAdditionalInfo &&
                                passenger.SegmentAdditionalInfo[0].Seat}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flight-details">
                  <h4> Flight Details </h4>
                  <table className="table text-center table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" colSpan="2">
                          Airline Details
                        </th>
                        <th scope="col">Departure</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsParto.TravelItinerary.ItineraryInfo.ReservationItems.map(
                        (detail, index) => (
                          <tr key={index}>
                            <td>
                              <i className="fa-solid fa-plane-circle-check fa-fw"></i>
                            </td>
                            <td>
                              <p>
                                {detail.OperatingAirlineCode}
                                {"-"}
                                {detail.FlightNumber} Cabin Class:
                                {cabinMapping[detail.CabinClassCode]}
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {formatTime(detail.DepartureDateTime)}
                                </span>
                                <br />
                                {detail.DepartureCity.AIRPORTNAME} (
                                {detail.DepartureAirportLocationCode})
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {formatTime(detail.ArrivalDateTime)}
                                </span>
                                <br />
                                {detail.ArrivalCity.AIRPORTNAME}
                                <br />({detail.ArrivalAirportLocationCode})
                              </p>
                            </td>
                            <td>{detail.JourneyDuration}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="baggage-flight">
                  <h4> Baggage Info </h4>
                  <table className="table text-center table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" rowSpan="2">
                          Airline
                        </th>
                        <th scope="col" rowSpan="2">
                          Sector
                        </th>
                        <th scope="col" colSpan="2">
                          Baggage
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Check-In</th>
                        <th scope="col">Cabin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetailsParto.TravelItinerary.ItineraryInfo.ReservationItems.map(
                        (info, index) => (
                          <tr key={index}>
                            <td>{info.OperatingAirlineCode}</td>
                            <td>
                              {info.DepartureAirportLocationCode}-
                              {info.ArrivalAirportLocationCode}
                            </td>
                            <td>{info.Baggage}</td>
                            <td>{info.CabinBaggage}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {!hidePrice && (
                  <div className="flight-details">
                    <h4> Fare Info </h4>
                    <table className="table text-center table-bordered">
                      <thead className=" table-primary">
                        <tr>
                          <th scope="col"> Base Fare</th>
                          <th scope="col">Taxes & Surcharges</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Service Fee</th>
                          <th scope="col">Excess Baggage</th>
                          <th scope="col">Meal</th>
                          <th scope="col">Seat Charges</th>
                          <th scope="col">Other Charges</th>
                          <th scope="col">Total Fare</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingDetailsParto && !bookingDetails2 && (
                          <tr>
                            <td>
                              {" "}
                              ₹
                              {handleChangeCurrency(
                                handleChangeCurrency2(
                                  bookingDetailsParto.TravelItinerary
                                    .ItineraryInfo.ItineraryPricing.BaseFare
                                )
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                handleChangeCurrency2(
                                  bookingDetailsParto.TravelItinerary
                                    .ItineraryInfo.ItineraryPricing.TotalTax +
                                    bookingDetailsParto.TravelItinerary
                                      .ItineraryInfo.ItineraryPricing.ServiceTax
                                )
                              )}
                            </td>
                            <td>₹0</td>
                            <td>₹0</td>
                            <td>₹0</td>
                            <td>₹0</td>
                            <td>₹0</td>
                            <td>₹0</td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                handleChangeCurrency2(
                                  bookingDetailsParto.TravelItinerary
                                    .ItineraryInfo.ItineraryPricing.TotalFare
                                )
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="personal-details">
                  <h4> Company Contact Details </h4>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Name</td>
                        <td>Abasin Tourist & Travel Agency</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Address</td>
                        <td>
                          Shah-re-naw Ansari square, kolola pushta road , Kabul,
                          Afghanistan, AF-
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Contact</td>
                        <td>93779897682 | 0093785336735 </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Email</td>
                        <td>support@abasinexpress.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="information-details">
                  <h5>Passport/Visa/Health</h5>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingInlineStart: "20px",
                    }}
                  >
                    <li>
                      {" "}
                      Please ensure that you have all the required travel
                      documents for your entire journey i.e., valid passport &
                      necessary visas, and that you have had the recommended
                      inoculations for your destination(s).
                    </li>
                    <li>
                      {" "}
                      All passengers, including children and infants, have to
                      present their valid ID proof at the time of check-in.
                    </li>
                    <li>
                      {" "}
                      We recommend you check-in at least 3 hours prior to
                      departure of your domestic flight and 4 hours prior to
                      your international flight
                    </li>
                    <li>
                      Carriage and other facilities provided by the carrier are
                      subject to their Terms and Condition. We are not liable
                      for missing any facility of the carrier.
                    </li>
                    <li>
                      Recheck your baggage with your respective airline before
                      traveling for a hassle-free travel experience.
                    </li>
                    <li>
                      Group Booking Rules will be applicable if passengers are 9
                      or more in numbers.
                    </li>
                    <li>
                      Company is not responsible for any delay or cancellation
                      of flights from airline's end.
                    </li>
                    <li>
                      Unaccompanied Child: Children below the age of 12 will not
                      be accepted for carriage unless they are accompanied by a
                      person of at least 18 years of age. Such child/children
                      must be seated next to the accompanying adult. The
                      accompanying adult is solely responsible for the
                      well-being of the child/children traveling together with
                      him/her. This also includes ensuring that seats are booked
                      to ensure child/children and an accompanying adult are
                      seated together.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {srdvIdx === "undefined" && bookingDetails && (
        <div
          className="BookingConfirmBookingHead"
          style={{ minWidth: "1140px" }}
        >
          <div className="flightBookingHeaderDiv">
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePerson(!hidePerson)}
            >
              <FaPerson />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                Hide person
              </span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <IoPrintSharp />
              <span className="hotelBookingHideDetails"> Print</span>
            </div>
            <div className="flightBookingUpperIcon" onClick={downloadPdf}>
              <FaRegFilePdf />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                {" "}
                Save Pdf
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <MdMarkEmailUnread />
              <span className="hotelBookingHideDetails"> Email </span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={sendWhatsAppMessage}
            >
              <FaWhatsapp />
              <span className="hotelBookingHideDetails"> Whatsapp</span>
            </div>
            <div className="flightBookingUpperIcon">
              <LiaSmsSolid />
              <span className="hotelBookingHideDetails"> Sms</span>
            </div>
            <div
              className="flightBookingUpperIcon"
              onClick={() => setHidePrice(!hidePrice)}
            >
              <BsCurrencyDollar />
              <span className="hotelBookingHideDetails hotelBookingBigTag">
                {" "}
                Hide Price
              </span>
            </div>
            <div className="flightBookingUpperIcon">
              <BsCurrencyDollar />
              <span
                className="hotelBookingHideDetails"
                onClick={() => setActive(!active)}
              >
                {" "}
                Markup
              </span>
            </div>
            <div
              style={{
                padding: "3px 6px",
                backgroundColor: "#db0e0edb",
                fontSize: "20px",
                color: "white",
              }}
            >
              <RxCross2 />
            </div>
          </div>

          <section className="container-fluid ticketdata">
            <div className="container">
              <div className="maindiv">
                <div className="top-part">
                  <div className="logo">
                    <img
                      src="/Images/tripgoo.png"
                      alt="Logo"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="ticket-details">
                    <div className="details">
                      <h4>Ticket-Confirmed</h4>
                      <p>
                        <span>Booking ID:</span> {bookingDetails.BookingId}
                      </p>
                      {bookingDetails.InvoiceCreatedOn ? (
                        <p>
                          <span>Booking Date:</span>{" "}
                          {formatTime(bookingDetails.InvoiceCreatedOn)}
                        </p>
                      ) : (
                        <p>
                          <span>Last Ticket Date:</span>{" "}
                          {formatTime(bookingDetails.LastTicketDate)}
                        </p>
                      )}
                      <p>
                        <span>Airline confirmation Number:</span>
                        {bookingDetails.PNR}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="passenger-details">
                  <h4> Passenger</h4>
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Passenger</th>
                        <th scope="col">Airline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Airline PNR</th>
                        <th scope="col">Ticket Number</th>
                        <th scope="col">Seat No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetails.Passenger.map((passenger, index) => (
                        <tr key={index}>
                          <td>
                            {passenger.FirstName} {passenger.LastName}
                          </td>
                          <td>{bookingDetails.AirlineCode}</td>
                          <td>{passenger.Ticket && passenger.Ticket.Status}</td>
                          <td>
                            {bookingDetails.Segments.map(
                              (segment) =>
                                `${segment.Origin.Airport.AirportCode}-${segment.Destination.Airport.AirportCode}`
                            ).join(", ")}
                          </td>
                          <td>{bookingDetails.Segments[0].AirlinePNR}</td>
                          <td>
                            {passenger.Ticket && passenger.Ticket.TicketNumber}
                          </td>
                          <td>
                            {passenger.SegmentAdditionalInfo &&
                              passenger.SegmentAdditionalInfo[0].Seat}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flight-details">
                  <h4> Flight Details </h4>
                  <table className="table text-center table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" colSpan="2">
                          Airline Details
                        </th>
                        <th scope="col">Departure</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetails.Segments.map((detail, index) => (
                        <tr key={index}>
                          <td>
                            <i className="fa-solid fa-plane-circle-check fa-fw"></i>
                          </td>
                          <td>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {detail.Airline.AirlineName}
                              </span>
                              <br />
                              {detail.Airline.AirlineCode}{" "}
                              {detail.Airline.FlightNumber}
                              Cabin Class:
                              <br />({detail.CabinClass})
                            </p>
                          </td>
                          <td>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {formatTime(detail.Origin.DepTime)}
                              </span>
                              <br />
                              {detail.Origin.Airport.AirportName}
                              <br /> ({detail.Origin.Airport.AirportCode})
                            </p>
                          </td>
                          <td>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {formatTime(detail.Destination.ArrTime)}
                              </span>
                              <br />
                              {detail.Destination.Airport.AirportName}
                              <br />({detail.Destination.Airport.AirportCode})
                            </p>
                          </td>
                          <td>{detail.Duration} m</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="baggage-flight">
                  <h4> Baggage Info </h4>
                  <table className="table text-center table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" rowSpan="2">
                          Airline
                        </th>
                        <th scope="col" rowSpan="2">
                          Sector
                        </th>
                        <th scope="col" colSpan="2">
                          Baggage
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Check-In</th>
                        <th scope="col">Cabin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetails.Segments.map((info, index) => (
                        <tr key={index}>
                          <td> {info.Airline.AirlineName}</td>
                          <td>
                            {info.Origin.Airport.AirportCode}-
                            {info.Destination.Airport.AirportCode}
                          </td>
                          <td> {info.Baggage}</td>
                          <td>{info.CabinBaggage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!hidePrice && (
                  <div className="flight-details">
                    <h4> Fare Info </h4>
                    <table className="table text-center table-bordered">
                      <thead className=" table-primary">
                        <tr>
                          <th scope="col"> Base Fare</th>
                          <th scope="col">Taxes & Surcharges</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Service Fee</th>
                          <th scope="col">Excess Baggage</th>
                          <th scope="col">Meal</th>
                          <th scope="col">Seat Charges</th>
                          <th scope="col">Other Charges</th>
                          <th scope="col">Total Fare</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingDetails && !bookingDetails2 && (
                          <tr>
                            <td>
                              {" "}
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.BaseFare
                              )}
                            </td>

                            <td>
                              {" "}
                              ₹{handleChangeCurrency(bookingDetails.Fare.Tax)}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.Discount
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.ServiceFee
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.TotalBaggageCharges
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.TotalMealCharges
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.TotalSeatCharges
                              )}
                            </td>
                            <td>
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.OtherCharges
                              )}
                            </td>
                            <td>
                              {" "}
                              ₹
                              {handleChangeCurrency(
                                bookingDetails.Fare.PublishedFare
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="personal-details">
                  <h4> Company Contact Details </h4>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Name</td>
                        <td>Abasin Tourist & Travel Agency</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Address</td>
                        <td>
                          Shah-re-naw Ansari square, kolola pushta road , Kabul,
                          Afghanistan, AF-
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Contact</td>
                        <td>93779897682 | 0093785336735 </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Email</td>
                        <td>support@abasinexpress.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="information-details">
                  <h5>Passport/Visa/Health</h5>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingInlineStart: "20px",
                    }}
                  >
                    <li>
                      {" "}
                      Please ensure that you have all the required travel
                      documents for your entire journey i.e., valid passport &
                      necessary visas, and that you have had the recommended
                      inoculations for your destination(s).
                    </li>
                    <li>
                      {" "}
                      All passengers, including children and infants, have to
                      present their valid ID proof at the time of check-in.
                    </li>
                    <li>
                      {" "}
                      We recommend you check-in at least 3 hours prior to
                      departure of your domestic flight and 4 hours prior to
                      your international flight
                    </li>
                    <li>
                      Carriage and other facilities provided by the carrier are
                      subject to their Terms and Condition. We are not liable
                      for missing any facility of the carrier.
                    </li>
                    <li>
                      Recheck your baggage with your respective airline before
                      traveling for a hassle-free travel experience.
                    </li>
                    <li>
                      Group Booking Rules will be applicable if passengers are 9
                      or more in numbers.
                    </li>
                    <li>
                      Company is not responsible for any delay or cancellation
                      of flights from airline's end.
                    </li>
                    <li>
                      Unaccompanied Child: Children below the age of 12 will not
                      be accepted for carriage unless they are accompanied by a
                      person of at least 18 years of age. Such child/children
                      must be seated next to the accompanying adult. The
                      accompanying adult is solely responsible for the
                      well-being of the child/children traveling together with
                      him/her. This also includes ensuring that seats are booked
                      to ensure child/children and an accompanying adult are
                      seated together.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FlightBookingTicket;
