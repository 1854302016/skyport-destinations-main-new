import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Container,
  Row,
  Card,
  Button,
  Table,
  Accordion,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FlightBookingChange from "./FlightBookingChange";
import { cities12 } from "../../../Cities";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";

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

const FlightBookingDetails = () => {
  const { walletData } = useSelector((state) => state.auth);
  const { id } = useParams(); // Get the id from URL parameters
  const [showCancelModal, setShow] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [flightBookingsData, setFlightBookingsData] = useState([]);
  const [filteredBooking, setFilteredBooking] = useState(null);
  const token = String(localStorage.getItem("token"));

  const handleCancelModalClose = () => setShow(false);
  const handleCancelModalShow = () => setShow(true);
  const handleRuleModalClose = () => {
    setShowRuleModal(false);
  };
  const handleIssueModalClose = () => setShowIssueModal(false);
  const handleIssueModalShow = () => setShowIssueModal(true);

  useEffect(() => {
    const fetchFlightBookingData = async () => {
      try {
        const response = await axios.get(
          "https://heritage.travelsdata.com/api/details"
        );
        console.log("dghfytdftyfv", response);
        if (response.data.success) {
          console.log("bookings from db", response.data.data);
          setFlightBookingsData(response.data.data);
        } else {
          console.error(
            "Failed to fetch flight booking data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching flight booking data:", error);
      }
    };

    fetchFlightBookingData();
  }, []);

  useEffect(() => {
    if (flightBookingsData.length > 0) {
      const booking = flightBookingsData.find(
        (booking) => booking.id === parseInt(id)
      );
      setFilteredBooking(booking);
    }
  }, [flightBookingsData, id]);

  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);

  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);

  useEffect(() => {
    const URL = `https://heritage.travelsdata.com/api/currency_convert/${fromCurrency}/${toCurrency}`;
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
    const URL = `https://heritage.travelsdata.com/api/currency_convert/${fromCurrency2}/${toCurrency2}`;
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

  const titleMapping = {
    0: "Mr",
    1: "Mrs",
    2: "Ms",
    3: "Miss",
    4: "Mstr",
  };

  const paxtypeMapping = {
    0: "Senior Adult",
    1: "Adult",
    2: "Child",
    3: "Infant",
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
  const cabinMappingTBO = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First",
  };

  const statusMappingTBO = {
    0: "Failed",
    1: "Successful",
    2: "Not Saved",
    3: "Not Created",
    4: "Not Allowed",
    5: "In Progress",
    6: "Ticket Already Created",
    8: "Price Changed",
    9: "Other Error",
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

  const navigate = useNavigate();

  // const changeReq = () => {
  //   navigate("/bookings/flight/changebooking");
  // };

  const sessionId = localStorage.getItem("sessionId");

  console.log("bookingss", flightBookingsData);
  console.log("Selected booking", filteredBooking);

  const cancelFlightParto = async (uniqueId) => {
    if (filteredBooking.offer_type === "parto CRS") {
      try {
        const response = await axios.post(
          "https://heritage.travelsdata.com/api/air_cancel",
          {
            UniqueId: uniqueId,
            SessionId: sessionId,
          }
        );
        console.log("Cancellation Response:", response.data);
        if (response.data.success) {
          alert("Flight cancellation successful.");
        } else {
          alert("Flight cancellation failed: " + response.data.message);
        }
      } catch (error) {
        console.error("Error cancelling flight:", error);
        alert("Error cancelling flight: " + error.message);
      }
    }
  };

  const IssueFlightParto = async (uniqueId) => {
    if (filteredBooking.offer_type === "parto CRS") {
      try {
        const response = await axios.post(
          "https://heritage.travelsdata.com/api/air_order_ticket",
          {
            UniqueId: uniqueId,
            SessionId: sessionId,
          }
        );
        console.log("Issue Reservation Response:", response.data);
        if (response.data.success) {
          alert("Flight Issue Reservation successful.");
        } else {
          alert("Flight Issue Reservation failed: " + response.data.message);
        }
      } catch (error) {
        console.error("Error Issue Reservation flight:", error);
        alert("Error Issue Reservation flight: " + error.message);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    priority: "",
    subject: "",
    type: "",
    remarks: "",
  });

  //   {
  //     "booking_detail_id": filteredBooking.id,
  // "email": walletData.Phone,
  //     "phone": walletData.Email,

  //     "priority": "Urgent",
  //     "subject": "Change Request",
  //     "type": "Change/Request",
  // "remarks": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe soluta asperiores ea consequuntur.",

  //
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      booking_detail_id: filteredBooking.id,
      email: walletData.Email,
      phone: walletData.Phone,
    };
    // Handle form submission
    console.log("Form submitted", finalData);
    // Make API call or further processing with finalData
    try {
      const response = await axios.post(
        "https://heritage.travelsdata.com/api/change-request",
        finalData
      );
      console.log("Form submitted successfully", response.data);
      // Handle the successful response
      alert("Request submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      // Handle the error response
      alert("Failed to submit the request. Please try again.");
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const releasePNRTBO = async () => {
    console.log("release pnr called");
    try {
      const response = await axios.post(
        "https://heritage.travelsdata.com/api/flight-release-pnr",
        {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          BookingId: filteredBooking.booking_id,
          Source:
            filteredBooking.booking_response.Response.FlightItinerary.Source,
        }
      );
      console.log("Cancellation Response:", response.data);
      if (response.data.success) {
        alert("Flight cancellation successful.");
      } else {
        alert("Flight cancellation failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling flight:", error);
      alert("Error cancelling flight: " + error.message);
    }
  };

  const IssueFlightTBO = async () => {
    if (filteredBooking.offer_type === "parto CRS") {
      try {
        const response = await axios.post(
          "https://heritage.travelsdata.com/api/flight-ticket",
          {
            EndUserIp: "192.168.10.10",
            PNR: filteredBooking.pnr,
            BookingId: filteredBooking.booking_id,
            TokenId: token,
            TraceId: filteredBooking.trace_id,
          }
        );
        console.log("Issue Reservation Response:", response.data);
        if (response.data.success) {
          alert("Flight Issue Reservation successful.");
        } else {
          alert("Flight Issue Reservation failed: " + response.data.message);
        }
      } catch (error) {
        console.error("Error Issue Reservation flight:", error);
        alert("Error Issue Reservation flight: " + error.message);
      }
    }
  };

  const [bookingDetailsTJ, setBookingDetailsTJ] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingDetailsParto, setBookingDetailsParto] = useState(null);

  const downloadTicketTJ = async (bookingId) => {
    console.log("booking id tj while downloading ticket", bookingId);
    try {
      const response = await fetch(
        "https://heritage.travelsdata.com/api/flight_booking_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch booking details");
      }
      const data = await response.json();
      console.log("booking details TJ", data);
      setBookingDetailsTJ(data.data);
      generatePdf(data.data, "TJ");
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const downloadTicketParto = async (bookingId) => {
    console.log("booking id Parto while downloading ticket", bookingId);
    try {
      const response = await fetch(
        "https://heritage.travelsdata.com/api/air_bookingdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SessionId: sessionId,
            UniqueId: bookingId,
          }),
        }
      );
      if (response) {
        console.log("responseP", response);
        const data = await response.json();
        console.log("data from responseP", data);

        const originDestinationOptions =
          data.data.flightresult.TravelItinerary.ItineraryInfo.ReservationItems;

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
        generatePdf(data.data.flightresult, "P");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const downloadTicketTBO = async (bookingId) => {
    console.log("booking id tbo while downloading ticket", bookingId);
    try {
      const response = await fetch(
        "https://heritage.travelsdata.com/api/flight-booking-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EndUserIp: "192.168.11.58",
            TokenId: token,
            TraceId: String(sessionStorage.getItem("traceId")),
            BookingId: bookingId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookingDetails(data.data.FlightItinerary);
        console.log("booking details", data);
        generatePdf(data.data.FlightItinerary, "TBO");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const generatePdf = (bookingDetails, API) => {
    const element = <TicketTemplate bookingDetailss={bookingDetails} API={API} />;
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(element, container);
  
    html2canvas(container.querySelector(".ticketdata")).then((canvas) => {
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
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          pdfWidth,
          pageHeight
        );
        heightLeft -= pageHeight;
        position -= pdfHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
  
      // Save the PDF
      pdf.save("ticket.pdf");
  
      // Clean up
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    });
  };
  

  const TicketTemplate = ({ bookingDetailss, API }) => {
    console.log("booking detailsssss", bookingDetailss);
    if (API === "TJ" && bookingDetailsTJ) {
      console.log("booking details TJ", bookingDetailsTJ);
      return (
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
                              bookingDetailsTJ.itemInfos.AIR.tripInfos[0].sI[0]
                                .fD.aI.code
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
                    {bookingDetailsTJ.itemInfos.AIR.tripInfos[0].sI.map(
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
                    {bookingDetailsTJ.itemInfos.AIR.tripInfos[0].sI.map(
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

              {
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
                      {bookingDetailsTJ && (
                        <tr>
                          <td>
                            {" "}
                            ₹
                            {handleChangeCurrency(
                              bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.fC.BF
                            )}
                          </td>
                          <td>
                            ₹
                            {handleChangeCurrency(
                              bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.fC.TAF
                            )}
                          </td>
                          <td> ₹0</td>
                          <td> ₹0</td>
                          <td> ₹0</td>
                          <td> ₹0</td>
                          <td> ₹0</td>
                          <td> ₹0</td>
                          <td>
                            {" "}
                            ₹
                            {handleChangeCurrency(
                              bookingDetailsTJ.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.fC.TF
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }

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
                    departure of your domestic flight and 4 hours prior to your
                    international flight
                  </li>
                  <li>
                    Carriage and other facilities provided by the carrier are
                    subject to their Terms and Condition. We are not liable for
                    missing any facility of the carrier.
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
                    Company is not responsible for any delay or cancellation of
                    flights from airline's end.
                  </li>
                  <li>
                    Unaccompanied Child: Children below the age of 12 will not
                    be accepted for carriage unless they are accompanied by a
                    person of at least 18 years of age. Such child/children must
                    be seated next to the accompanying adult. The accompanying
                    adult is solely responsible for the well-being of the
                    child/children traveling together with him/her. This also
                    includes ensuring that seats are booked to ensure
                    child/children and an accompanying adult are seated
                    together.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (API === "P" && bookingDetailsParto) {
      console.log("booking details Parto", bookingDetailsParto);
      return (
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
                    <h4>Ticket-{statusMapping[bookingDetailsParto.Status]}</h4>
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
                              bookingDetailsParto.TravelItinerary.ItineraryInfo
                                .ReservationItems[0].AirlinePnr
                            }
                          </td>
                          <td>
                            {bookingDetailsParto.TravelItinerary.ItineraryInfo
                              .CustomerInfoes[0].ETicketNumbers &&
                              bookingDetailsParto.TravelItinerary.ItineraryInfo
                                .CustomerInfoes[0].ETicketNumbers[0] &&
                              bookingDetailsParto.TravelItinerary.ItineraryInfo
                                .CustomerInfoes[0].ETicketNumbers[0]
                                .ETicketNumber}
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
                              {/* <span style={{ fontWeight: 600 }}>
                                  {detail.fD.aI.name}
                                </span> */}
                              {/* <br /> */}
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

              {
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
                      {bookingDetailsParto && (
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
              }

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
                    departure of your domestic flight and 4 hours prior to your
                    international flight
                  </li>
                  <li>
                    Carriage and other facilities provided by the carrier are
                    subject to their Terms and Condition. We are not liable for
                    missing any facility of the carrier.
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
                    Company is not responsible for any delay or cancellation of
                    flights from airline's end.
                  </li>
                  <li>
                    Unaccompanied Child: Children below the age of 12 will not
                    be accepted for carriage unless they are accompanied by a
                    person of at least 18 years of age. Such child/children must
                    be seated next to the accompanying adult. The accompanying
                    adult is solely responsible for the well-being of the
                    child/children traveling together with him/her. This also
                    includes ensuring that seats are booked to ensure
                    child/children and an accompanying adult are seated
                    together.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (API === "TBO" && bookingDetails) {
      console.log("booking details TBO", bookingDetails);
      return (
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

              {
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
                      {bookingDetails && (
                        <tr>
                          <td>
                            {" "}
                            ₹
                            {handleChangeCurrency(bookingDetails.Fare.BaseFare)}
                          </td>

                          <td>
                            {" "}
                            ₹{handleChangeCurrency(bookingDetails.Fare.Tax)}
                          </td>
                          <td>
                            ₹
                            {handleChangeCurrency(bookingDetails.Fare.Discount)}
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
              }

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
                    departure of your domestic flight and 4 hours prior to your
                    international flight
                  </li>
                  <li>
                    Carriage and other facilities provided by the carrier are
                    subject to their Terms and Condition. We are not liable for
                    missing any facility of the carrier.
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
                    Company is not responsible for any delay or cancellation of
                    flights from airline's end.
                  </li>
                  <li>
                    Unaccompanied Child: Children below the age of 12 will not
                    be accepted for carriage unless they are accompanied by a
                    person of at least 18 years of age. Such child/children must
                    be seated next to the accompanying adult. The accompanying
                    adult is solely responsible for the well-being of the
                    child/children traveling together with him/her. This also
                    includes ensuring that seats are booked to ensure
                    child/children and an accompanying adult are seated
                    together.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <div
      className="content-wrapper"
      // style={{ minHeight: "531px", margin: "15px" }}
    >
      <Container fluid>
        <div className="content-header">
          <Container fluid>
            <Row>
              <Col sm={6} md={6} className="sm-center">
                <h1 className="m-0 text-dark">Booking detail</h1>
              </Col>
              <Col sm={6} md={6} className="sm-center">
                <Breadcrumb className="float-sm-right">
                  <Breadcrumb.Item
                    linkAs={Link}
                    linkProps={{ to: "/bookings" }}
                  >
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Booking detail</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
          </Container>
        </div>

        {filteredBooking && (
          <>
            {filteredBooking.offer_type === "TripJack" && (
              <section className="content">
                <Container fluid>
                  <Row>
                    <Col md={8}>
                      <div
                        className="card-tools card_tools mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() =>
                            downloadTicketTJ(filteredBooking.booking_id)
                          }
                        >
                          Download Ticket
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => setShowRuleModal(true)}
                        >
                          Fare Rule
                        </Button>

                        <Button
                          variant="theme"
                          as={Link}
                          size="sm"
                          // to="/bookings/flight/changebooking"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                        >
                          Change Request
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => handleCancelModalShow()}
                        >
                          Cancel Flight
                        </Button>
                      </div>

                      <div className="card card_toggle">
                        <div
                        //    className="mb-3"
                        >
                          <Accordion style={{ marginBottom: 0 }}>
                            <Accordion.Item
                              // as={Card.Header}
                              eventKey="0"
                              // className="card-header"
                            >
                              <Accordion.Header
                              // className="card-title"
                              >
                                <a className="toggleplus">
                                  Amendment Logs
                                  {/* <i className="fa fa-plus"></i> */}
                                </a>
                              </Accordion.Header>
                            </Accordion.Item>
                            <Accordion.Body eventKey="0">
                              <Card.Body>
                                <div className="timeline timeline-inverse followuphistory"></div>
                              </Card.Body>
                            </Accordion.Body>
                          </Accordion>
                        </div>
                      </div>

                      {filteredBooking.booking_response.itemInfos.AIR.tripInfos.map(
                        (segment, index) => (
                          <Card className="card-primary mb-3">
                            <Card.Header className="card-header">
                              <Card.Title as="h3" className="card-title">
                                {segment.sI[0].da.city}-
                                {segment.sI[segment.sI.length - 1].aa.city}{" "}
                                Flight Details
                              </Card.Title>
                            </Card.Header>
                            <Card.Body className="card-body">
                              <div className="table-responsive">
                                <Table
                                  bordered
                                  className="table table-bordered text-nowrap"
                                >
                                  <thead>
                                    <tr>
                                      <th>Flight</th>
                                      <th>Departure</th>
                                      <th>Arrival</th>
                                      <th>Other</th>
                                      <th>Remarks</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {segment.sI.map((singleseg, index) => (
                                      <tr>
                                        <td>
                                          <img
                                            src={`/Images/AirlineLogo/${singleseg.fD.aI.code}.gif`}
                                            alt="Airline"
                                          />
                                          <br />
                                          <p>
                                            {singleseg.fD.aI.code}-
                                            {singleseg.fD.fN}
                                          </p>
                                        </td>
                                        <td>
                                          {singleseg.da.city}
                                          <br />
                                          {singleseg.dt}
                                          <br />
                                          {singleseg.da.terminal}
                                          {/* , {singleseg.da.city} */}
                                        </td>
                                        <td>
                                          {singleseg.aa.city}
                                          <br />
                                          {singleseg.at}
                                          <br />
                                          {singleseg.aa.terminal}
                                          {/* , {singleseg.aa.city} */}
                                        </td>
                                        <td>
                                          <b className="text_color">
                                            Duration:{" "}
                                          </b>
                                          {singleseg.duration}
                                          <br />
                                          <b className="text_color">Class: </b>

                                          <br />
                                          <b className="text_color">
                                            Baggage:{" "}
                                          </b>

                                          <br />
                                          <b className="text_color">
                                            Cabin Baggage:{" "}
                                          </b>
                                        </td>
                                        <td>Excellent</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            </Card.Body>
                          </Card>
                        )
                      )}

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Passenger Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Pax</th>
                                  <th>Other</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredBooking.booking_response.itemInfos.AIR.travellerInfos.map(
                                  (passenger, index) => (
                                    <tr>
                                      <td>
                                        <b className="text_color">Title: </b>
                                        {passenger.ti}
                                        <br />
                                        <b className="text_color">F. Name: </b>
                                        {passenger.fN}
                                        <br />
                                        <b className="text_color">L. Name: </b>
                                        {passenger.lN}
                                        <br />
                                        <b className="text_color">Gender: </b>
                                        {passenger.ti === "Mr"
                                          ? "Male"
                                          : "Female"}
                                        <br />
                                        <b className="text_color">Type: </b>
                                        {passenger.pt}
                                      </td>
                                      <td>
                                        <b className="text_color">DOB: </b>
                                        {passenger.dob}
                                        <br />
                                        <b className="text_color">PP No.: </b>

                                        <br />
                                        <b className="text_color">PP Exp.: </b>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th colSpan="2">Contact</th>
                                </tr>
                                <tr>
                                  <td colSpan="2">
                                    <b className="text_color">Mobile: </b>
                                    {
                                      filteredBooking.booking_response.order
                                        .deliveryInfo.contacts[0]
                                    }
                                    <br />
                                    <b className="text_color">Email: </b>
                                    sham@holidaychacha.com
                                  </td>
                                </tr>
                              </tfoot>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Ticket Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Type</th>
                                  <th>Gender</th>
                                  <th>Ticket ID</th>
                                  <th>Ticket Number</th>
                                  <th>Extra Baggage</th>
                                  <th>Meal</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Booked By
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Agent ID</th>
                                  <th>Name</th>
                                  <th>Mobile</th>
                                  <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{walletData.Username}</td>
                                  <td>{walletData["First Name"]}</td>
                                  <td>{walletData.Phone}</td>
                                  <td>{walletData.Email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>Good</p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Error Message
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>
                            {/* Booking hold is not allowed with the SSRIndigo
                            Booking Failed. */}
                          </p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Onward Airline Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>{/* WEB. */}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4} className="sidebar_detail">
                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Basic Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <Table bordered className="table table-bordered">
                            <tbody>
                              <tr>
                                <th>ID</th>
                                <td>{filteredBooking.id}</td>
                              </tr>
                              <tr>
                                <th>Booking Type</th>
                                <td>
                                  {filteredBooking.booking_response.itemInfos
                                    .AIR.tripInfos.length > 1
                                    ? "ROUND"
                                    : "ONEWAY"}
                                </td>
                              </tr>
                              <tr>
                                <th>Onward PNR</th>
                                <td>
                                  {filteredBooking.booking_response.itemInfos
                                    .AIR.travellerInfos[0].pnrDetails &&
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.travellerInfos[0].pnrDetails[
                                      Object.keys(
                                        filteredBooking.booking_response
                                          .itemInfos.AIR.travellerInfos[0]
                                          .pnrDetails
                                      )[0]
                                    ]}
                                </td>
                              </tr>
                              <tr>
                                <th>Booking Date</th>
                                <td>
                                  {
                                    filteredBooking.booking_response.order
                                      .createdOn
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Update Date</th>
                                <td>{/* 07:05 PM, 25 Nov 2023 */}</td>
                              </tr>
                              {/* <tr>
                                <th>Onward Booking</th>
                                <td>Failed</td>
                              </tr> */}
                              {/* <tr>
                                <th>Payment Status</th>
                                <td>B2C</td>
                              </tr> */}
                              {/* <tr>
                                <th>Onward Fare Type</th>
                                <td>Saver</td>
                              </tr> */}
                              {/* <tr>
                                <th>Trace ID</th>
                                <td>{filteredBooking.trace_id}</td>
                              </tr> */}
                              <tr>
                                <th>Ticket Status</th>
                                <td>{filteredBooking.ticket_status}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Onward Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare{" "}
                                <span>
                                  {" "}
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.totalPriceInfo.totalFareDetail.fC.BF
                                  )}
                                </span>
                              </li>
                              <li>
                                Tax{" "}
                                <span>
                                  {" "}
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.totalPriceInfo.totalFareDetail.fC.TAF
                                  )}
                                </span>
                              </li>
                              <li>
                                Meal Charges <span>₹0</span>
                              </li>
                              <li>
                                Baggage Charges <span>₹0</span>
                              </li>
                              <li>
                                Seat Charges <span>₹0</span>
                              </li>
                              <li>
                                Customer Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.totalPriceInfo.totalFareDetail.fC.TF
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.totalPriceInfo.totalFareDetail.fC.TF
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Commission <span>₹0</span>
                              </li>
                              <li>
                                Admin Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.itemInfos
                                      .AIR.totalPriceInfo.totalFareDetail.fC.TF
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare <span>₹ 2219</span>
                              </li>
                              <li>
                                Tax <span>₹ 1157</span>
                              </li>
                              <li>
                                Meal Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Baggage Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Seat Charges <span>₹ 400</span>
                              </li>
                              <li>
                                Customer Fare <span>₹ 3776</span>
                              </li>
                              <li>
                                Agent Fare <span>₹ 3735</span>
                              </li>
                              <li>
                                Agent Commission <span>₹ 41</span>
                              </li>
                              <li>
                                Admin Fare <span>₹ 3725</span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card> */}
                    </Col>
                  </Row>

                  <Modal
                    show={showCancelModal}
                    onHide={handleCancelModalClose}
                    // className="fare-rules-modal show"
                    id="cancel"
                    style={{ paddingRight: "12px", display: "block" }}
                    // size="lg"

                    centered={false}
                  >
                    <Modal.Dialog className="modal-lg cancelbookingmodal">
                      <div className="modal-content">
                        <Modal.Header>
                          <Modal.Title>Cancel Flight</Modal.Title>
                          <Button
                            variant="close"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          />
                          {/* </Button> */}
                        </Modal.Header>

                        <Modal.Body>
                          <p>Are you sure you want to cancel this flight?</p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button href="" className="" variant="info">
                            Cancel Booking
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </div>
                    </Modal.Dialog>
                  </Modal>

                  <Modal
                    show={showRuleModal}
                    onHide={handleRuleModalClose}
                    backdrop="static"
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Fare Rule</Modal.Title>
                    </Modal.Header>
                    <form
                      name="frmTransaction"
                      method="POST"
                      action=""
                      id="frmTransaction"
                      className="has-validation-callback payment_gateway_form"
                    >
                      <Modal.Body></Modal.Body>
                      {/* <Modal.Footer>
                 <Link
                   // to="#"
                   className="btn btn-danger"
                   onClick={handleRuleModalClose}
                 >
                   <span
                     className="fa fa-times-circle"
                     aria-hidden="true"
                   ></span>{" "}
                   Cancel
                 </Link>
               </Modal.Footer> */}
                    </form>
                  </Modal>

                  <FlightBookingChange
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </Container>
              </section>
            )}
            {filteredBooking.offer_type === "parto CRS" && (
              <section className="content">
                <Container fluid>
                  <Row>
                    <Col md={8}>
                      <div
                        className="card-tools card_tools mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() =>
                            downloadTicketParto(filteredBooking.booking_id)
                          }
                        >
                          Download Ticket
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => setShowRuleModal(true)}
                        >
                          Fare Rule
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // to="/bookings/flight/changebooking"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{
                            marginInline: "5px",
                            opacity:
                              filteredBooking.booking_response.Status !== 10 &&
                              filteredBooking.booking_response.Status !== 11 &&
                              filteredBooking.booking_response.Status !== 12 &&
                              filteredBooking.booking_response.Status !== 20
                                ? 0.1
                                : 1,
                          }}
                          disabled={
                            filteredBooking.booking_response.Status !== 10 &&
                            filteredBooking.booking_response.Status !== 11 &&
                            filteredBooking.booking_response.Status !== 12 &&
                            filteredBooking.booking_response.Status !== 20
                          }
                          onClick={() => handleOpenModal()}
                        >
                          Change Request
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{
                            marginInline: "5px",
                            opacity:
                              filteredBooking.booking_response.Status !== 10 &&
                              filteredBooking.booking_response.Status !== 11 &&
                              filteredBooking.booking_response.Status !== 12 &&
                              filteredBooking.booking_response.Status !== 20
                                ? 0.1
                                : 1,
                          }}
                          onClick={() => handleCancelModalShow()}
                          disabled={
                            filteredBooking.booking_response.Status !== 10 &&
                            filteredBooking.booking_response.Status !== 11 &&
                            filteredBooking.booking_response.Status !== 12 &&
                            filteredBooking.booking_response.Status !== 20
                          }
                        >
                          Cancel Flight
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{
                            marginInline: "5px",
                            opacity:
                              filteredBooking.booking_response.Status !== 10 &&
                              filteredBooking.booking_response.Status !== 11 &&
                              filteredBooking.booking_response.Status !== 12 &&
                              filteredBooking.booking_response.Status !== 20
                                ? 0.1
                                : 1,
                          }}
                          onClick={() => handleIssueModalShow()}
                          disabled={
                            filteredBooking.booking_response.Status !== 10 &&
                            filteredBooking.booking_response.Status !== 11 &&
                            filteredBooking.booking_response.Status !== 12 &&
                            filteredBooking.booking_response.Status !== 20
                          }
                        >
                          Issue Reservation
                        </Button>
                      </div>

                      <div className="card card_toggle">
                        <div
                        //    className="mb-3"
                        >
                          <Accordion style={{ marginBottom: 0 }}>
                            <Accordion.Item
                              // as={Card.Header}
                              eventKey="0"
                              // className="card-header"
                            >
                              <Accordion.Header
                              // className="card-title"
                              >
                                <a className="toggleplus">
                                  Amendment Logs
                                  {/* <i className="fa fa-plus"></i> */}
                                </a>
                              </Accordion.Header>
                            </Accordion.Item>
                            <Accordion.Body eventKey="0">
                              <Card.Body>
                                <div className="timeline timeline-inverse followuphistory"></div>
                              </Card.Body>
                            </Accordion.Body>
                          </Accordion>
                        </div>
                      </div>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            {
                              filteredBooking.booking_response.TravelItinerary
                                .ItineraryInfo.ReservationItems[0]
                                .DepartureAirportLocationCode
                            }
                            -
                            {
                              filteredBooking.booking_response.TravelItinerary
                                .ItineraryInfo.ReservationItems[
                                filteredBooking.booking_response.TravelItinerary
                                  .ItineraryInfo.ReservationItems.length - 1
                              ].ArrivalAirportLocationCode
                            }{" "}
                            Flight Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Flight</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>Other</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredBooking.booking_response.TravelItinerary.ItineraryInfo.ReservationItems.map(
                                  (segment, index) => (
                                    <tr>
                                      <td>
                                        <img
                                          src={`/Images/AirlineLogo/${segment.OperatingAirlineCode}.gif`}
                                          alt="Airline"
                                        />
                                        <br />
                                        <p>
                                          {segment.OperatingAirlineCode}-
                                          {segment.FlightNumber}
                                        </p>
                                      </td>
                                      <td>
                                        {segment.DepartureAirportLocationCode}
                                        <br />
                                        {segment.DepartureDateTime}
                                        <br />
                                        Terminal {segment.DepartureTerminal}
                                        {/* , {segment.DepartureAirportLocationCode} */}
                                      </td>
                                      <td>
                                        {segment.ArrivalAirportLocationCode}
                                        <br />
                                        {segment.ArrivalDateTime}
                                        <br />
                                        Terminal {segment.ArrivalTerminal}
                                        {/* , {segment.ArrivalAirportLocationCode} */}
                                      </td>
                                      <td>
                                        <b className="text_color">Duration: </b>
                                        {segment.JourneyDuration}
                                        <br />
                                        <b className="text_color">Class: </b>
                                        {/* RR */}
                                        <br />
                                        <b className="text_color">Baggage: </b>
                                        {segment.Baggage}
                                        <br />
                                        <b className="text_color">
                                          Cabin Baggage:{" "}
                                        </b>
                                        {/* 7 KG */}
                                      </td>
                                      <td>Excellent</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Mumbai-Chennai Airline PNR Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Flight</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>PNR</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card> */}

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Passenger Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Pax</th>
                                  <th>Other</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <b className="text_color">Title: </b>
                                    {
                                      titleMapping[
                                        filteredBooking.booking_response
                                          .TravelItinerary.ItineraryInfo
                                          .CustomerInfoes[0].Customer.PaxName
                                          .PassengerTitle
                                      ]
                                    }
                                    <br />
                                    <b className="text_color">F. Name: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Customer.PaxName
                                        .PassengerFirstName
                                    }
                                    <br />
                                    <b className="text_color">L. Name: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Customer.PaxName
                                        .PassengerLastName
                                    }
                                    <br />
                                    <b className="text_color">Gender: </b>
                                    {filteredBooking.booking_response
                                      .TravelItinerary.ItineraryInfo
                                      .CustomerInfoes[0].Customer.Gender
                                      ? "Female"
                                      : "Male"}
                                    <br />
                                    <b className="text_color">Type: </b>
                                    {
                                      paxtypeMapping[
                                        filteredBooking.booking_response
                                          .TravelItinerary.ItineraryInfo
                                          .CustomerInfoes[0].Customer
                                          .PassengerType
                                      ]
                                    }
                                  </td>
                                  <td>
                                    <b className="text_color">DOB: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Customer.DateOfBirth
                                    }
                                    <br />
                                    <b className="text_color">PP No.: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Customer
                                        .PassportNumber
                                    }
                                    <br />
                                    <b className="text_color">PP Exp.: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Customer
                                        .PassportExpireDate
                                    }
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th colSpan="2">Contact</th>
                                </tr>
                                <tr>
                                  <td colSpan="2">
                                    <b className="text_color">Mobile: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].PhoneNumber
                                    }
                                    <br />
                                    <b className="text_color">Email: </b>
                                    {
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .CustomerInfoes[0].Email
                                    }
                                  </td>
                                </tr>
                              </tfoot>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Ticket Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Type</th>
                                  <th>Gender</th>
                                  <th>Ticket ID</th>
                                  <th>Ticket Number</th>
                                  <th>Extra Baggage</th>
                                  <th>Meal</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Booked By
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Agent ID</th>
                                  <th>Name</th>
                                  <th>Mobile</th>
                                  <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{walletData.Username}</td>
                                  <td>{walletData["First Name"]}</td>
                                  <td>{walletData.Phone}</td>
                                  <td>{walletData.Email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>Good</p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Error Message
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>
                            {/* Booking hold is not allowed with the SSRIndigo
                            Booking Failed. */}
                          </p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Onward Airline Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>{/* WEB. */}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4} className="sidebar_detail">
                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Basic Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <Table bordered className="table table-bordered">
                            <tbody>
                              <tr>
                                <th>ID</th>
                                <td>{filteredBooking.id}</td>
                              </tr>
                              <tr>
                                <th>Booking Type</th>
                                <td>ONEWAY</td>
                              </tr>
                              <tr>
                                <th>PNR</th>
                                <td>{filteredBooking.pnr}</td>
                              </tr>
                              <tr>
                                <th>Booking Date</th>
                                <td>{filteredBooking.bookingDate}</td>
                              </tr>
                              <tr>
                                <th>Update Date</th>
                                <td>{/* 07:05 PM, 25 Nov 2023 */}</td>
                              </tr>
                              {/* <tr>
                                <th>Onward Booking</th>
                                <td>Failed</td>
                              </tr> */}
                              {/* <tr>
                                <th>Payment Status</th>
                                <td>B2C</td>
                              </tr> */}
                              {/* <tr>
                                <th>Onward Fare Type</th>
                                <td>Saver</td>
                              </tr> */}
                              {/* <tr>
                                <th>Trace ID</th>
                                <td>{filteredBooking.trace_id}</td>
                              </tr> */}
                              <tr>
                                <th>Ticket Status</th>
                                <td>
                                  {
                                    statusMapping[
                                      filteredBooking.booking_response.Status
                                    ]
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Onward Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare{" "}
                                <span>
                                  {" "}
                                  ₹
                                  {handleChangeCurrency(
                                    handleChangeCurrency2(
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .ItineraryPricing.BaseFare
                                    )
                                  )}
                                </span>
                              </li>
                              <li>
                                Tax{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    handleChangeCurrency2(
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .ItineraryPricing.TotalTax +
                                        filteredBooking.booking_response
                                          .TravelItinerary.ItineraryInfo
                                          .ItineraryPricing.ServiceTax
                                    )
                                  )}
                                </span>
                              </li>
                              <li>
                                Meal Charges <span>₹0</span>
                              </li>
                              <li>
                                Baggage Charges <span>₹0</span>
                              </li>
                              <li>
                                Seat Charges <span>₹0</span>
                              </li>
                              <li>
                                Customer Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    handleChangeCurrency2(
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .ItineraryPricing.TotalFare
                                    )
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    handleChangeCurrency2(
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .ItineraryPricing.TotalFare
                                    )
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Commission <span>₹0</span>
                              </li>
                              <li>
                                Admin Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    handleChangeCurrency2(
                                      filteredBooking.booking_response
                                        .TravelItinerary.ItineraryInfo
                                        .ItineraryPricing.TotalFare
                                    )
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare <span>₹ 2219</span>
                              </li>
                              <li>
                                Tax <span>₹ 1157</span>
                              </li>
                              <li>
                                Meal Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Baggage Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Seat Charges <span>₹ 400</span>
                              </li>
                              <li>
                                Customer Fare <span>₹ 3776</span>
                              </li>
                              <li>
                                Agent Fare <span>₹ 3735</span>
                              </li>
                              <li>
                                Agent Commission <span>₹ 41</span>
                              </li>
                              <li>
                                Admin Fare <span>₹ 3725</span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card> */}
                    </Col>
                  </Row>

                  <Modal
                    show={showCancelModal}
                    onHide={handleCancelModalClose}
                    // className="fare-rules-modal show"
                    id="cancel"
                    style={{ paddingRight: "12px", display: "block" }}
                    // size="lg"

                    centered={false}
                  >
                    <Modal.Dialog className="modal-lg cancelbookingmodal">
                      <div className="modal-content">
                        <Modal.Header>
                          <Modal.Title>Cancel Flight</Modal.Title>
                          <Button
                            variant="close"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          />
                          {/* </Button> */}
                        </Modal.Header>

                        <Modal.Body>
                          <p>Are you sure you want to cancel this flight?</p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            className=""
                            variant="info"
                            onClick={() =>
                              cancelFlightParto(
                                filteredBooking.booking_response.UniqueId
                              )
                            }
                          >
                            Cancel Booking
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </div>
                    </Modal.Dialog>
                  </Modal>

                  <Modal
                    show={showIssueModal}
                    onHide={handleIssueModalClose}
                    // className="fare-rules-modal show"
                    id="cancel"
                    style={{ paddingRight: "12px", display: "block" }}
                    // size="lg"

                    centered={false}
                  >
                    <Modal.Dialog className="modal-lg cancelbookingmodal">
                      <div className="modal-content">
                        <Modal.Header>
                          <Modal.Title>Issue Reserved Flight</Modal.Title>
                          <Button
                            variant="close"
                            onClick={handleIssueModalClose}
                            data-dismiss="modal"
                          />
                          {/* </Button> */}
                        </Modal.Header>

                        <Modal.Body>
                          <p>
                            Are you sure you want to Issue this Reservation?
                          </p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            className=""
                            variant="info"
                            onClick={() =>
                              IssueFlightParto(
                                filteredBooking.booking_response.UniqueId
                              )
                            }
                          >
                            Issue Reservation
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleIssueModalClose}
                            data-dismiss="modal"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </div>
                    </Modal.Dialog>
                  </Modal>

                  <Modal
                    show={showRuleModal}
                    onHide={handleRuleModalClose}
                    backdrop="static"
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Fare Rule</Modal.Title>
                    </Modal.Header>
                    <form
                      name="frmTransaction"
                      method="POST"
                      action=""
                      id="frmTransaction"
                      className="has-validation-callback payment_gateway_form"
                    >
                      <Modal.Body></Modal.Body>
                      {/* <Modal.Footer>
                <Link
                  // to="#"
                  className="btn btn-danger"
                  onClick={handleRuleModalClose}
                >
                  <span
                    className="fa fa-times-circle"
                    aria-hidden="true"
                  ></span>{" "}
                  Cancel
                </Link>
              </Modal.Footer> */}
                    </form>
                  </Modal>

                  <FlightBookingChange
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </Container>
              </section>
            )}
            {filteredBooking.offer_type === "tbo" && (
              <section className="content">
                <Container fluid>
                  <Row>
                    <Col md={8}>
                      <div
                        className="card-tools card_tools mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() =>
                            downloadTicketTJ(filteredBooking.booking_id)
                          }
                        >
                          Download Ticket
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => setShowRuleModal(true)}
                        >
                          Fare Rule
                        </Button>

                        <Button
                          variant="theme"
                          as={Link}
                          size="sm"
                          // to="/bookings/flight/changebooking"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => handleOpenModal()}
                        >
                          Change Request
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{ marginInline: "5px" }}
                          onClick={() => {
                            handleCancelModalShow();
                          }}
                        >
                          Release PNR
                        </Button>

                        <Button
                          variant="theme"
                          size="sm"
                          // href="#"
                          // target="_blank"
                          data-toggle="modal"
                          data-target="#myonwardfareModal"
                          className="btn btn-theme btn-rounded btn-sm"
                          style={{
                            marginInline: "5px",
                          }}
                          onClick={() => handleIssueModalShow()}
                        >
                          Issue Reservation
                        </Button>
                      </div>

                      <div className="card card_toggle">
                        <div
                        //    className="mb-3"
                        >
                          <Accordion style={{ marginBottom: 0 }}>
                            <Accordion.Item
                              // as={Card.Header}
                              eventKey="0"
                              // className="card-header"
                            >
                              <Accordion.Header
                              // className="card-title"
                              >
                                <a className="toggleplus">
                                  Amendment Logs
                                  {/* <i className="fa fa-plus"></i> */}
                                </a>
                              </Accordion.Header>
                            </Accordion.Item>
                            <Accordion.Body eventKey="0">
                              <Card.Body>
                                <div className="timeline timeline-inverse followuphistory"></div>
                              </Card.Body>
                            </Accordion.Body>
                          </Accordion>
                        </div>
                      </div>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            {filteredBooking.depart}-{filteredBooking.arrival}{" "}
                            Flight Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Flight</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>Other</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredBooking.booking_response.Response.FlightItinerary.Segments.map(
                                  (segment, index) => (
                                    <tr>
                                      <td>
                                        <img
                                          src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                                          alt="Airline"
                                        />
                                        <br />
                                        <p>
                                          {segment.Airline.AirlineCode}-
                                          {segment.Airline.FlightNumber}
                                        </p>
                                      </td>
                                      <td>
                                        {segment.Origin.Airport.AirportCode}
                                        <br />
                                        {segment.Origin.DepTime}
                                        <br />
                                        Terminal{" "}
                                        {segment.Origin.Airport.Terminal},{" "}
                                        {segment.Origin.Airport.CityName}
                                      </td>
                                      <td>
                                        {
                                          segment.Destination.Airport
                                            .AirportCode
                                        }
                                        <br />
                                        {segment.Destination.ArrTime}
                                        <br />
                                        Terminal{" "}
                                        {
                                          segment.Destination.Airport.Terminal
                                        },{" "}
                                        {segment.Destination.Airport.CityName}
                                      </td>
                                      <td>
                                        <b className="text_color">Duration: </b>
                                        {segment.Duration} min
                                        <br />
                                        <b className="text_color">Class: </b>
                                        {cabinMappingTBO[segment.CabinClass]}
                                        <br />
                                        <b className="text_color">Baggage: </b>
                                        {segment.Baggage}
                                        <br />
                                        <b className="text_color">
                                          Cabin Baggage:{" "}
                                        </b>
                                        {segment.CabinBaggage}
                                      </td>
                                      <td>Excellent</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Mumbai-Chennai Airline PNR Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Flight</th>
                                  <th>Departure</th>
                                  <th>Arrival</th>
                                  <th>PNR</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card> */}

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Passenger Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Pax</th>
                                  <th>Other</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredBooking.booking_response.Response.FlightItinerary.Passenger.map(
                                  (passenger, index) => (
                                    <tr>
                                      <td>
                                        <b className="text_color">Title: </b>
                                        {passenger.Title}
                                        <br />
                                        <b className="text_color">F. Name: </b>
                                        {passenger.FirstName}
                                        <br />
                                        <b className="text_color">L. Name: </b>
                                        {passenger.LastName}
                                        <br />
                                        <b className="text_color">Gender: </b>
                                        {passenger.Gender === 1
                                          ? "Male"
                                          : "Female"}
                                        <br />
                                        <b className="text_color">Type: </b>
                                        {passenger.PaxType === 1
                                          ? "Adult"
                                          : passenger.PaxType === 2
                                          ? "Child"
                                          : "Infant"}
                                      </td>
                                      <td>
                                        <b className="text_color">DOB: </b>{" "}
                                        {passenger.DateOfBirth}
                                        <br />
                                        <b className="text_color">PP No.: </b>
                                        {passenger.PassportNo}
                                        <br />
                                        <b className="text_color">PP Exp.: </b>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th colSpan="2">Contact</th>
                                </tr>
                                <tr>
                                  <td colSpan="2">
                                    <b className="text_color">Mobile: </b>
                                    {
                                      filteredBooking.booking_response.Response
                                        .FlightItinerary.Passenger[0].ContactNo
                                    }
                                    <br />
                                    <b className="text_color">Email: </b>
                                    {
                                      filteredBooking.booking_response.Response
                                        .FlightItinerary.Passenger[0].Email
                                    }
                                  </td>
                                </tr>
                              </tfoot>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Ticket Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Type</th>
                                  <th>Gender</th>
                                  <th>Ticket ID</th>
                                  <th>Ticket Number</th>
                                  <th>Extra Baggage</th>
                                  <th>Meal</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Booked By
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="table-responsive">
                            <Table
                              bordered
                              className="table table-bordered text-nowrap"
                            >
                              <thead>
                                <tr>
                                  <th>Agent ID</th>
                                  <th>Name</th>
                                  <th>Mobile</th>
                                  <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{walletData.Username}</td>
                                  <td>{walletData["First Name"]}</td>
                                  <td>{walletData.Phone}</td>
                                  <td>{walletData.Email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>Good</p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Error Message
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <p>
                            {/* Booking hold is not allowed with the SSRIndigo
                            Booking Failed. */}
                          </p>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Onward Airline Remark
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          {/* <p>WEB.</p> */}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4} className="sidebar_detail">
                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Basic Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <Table bordered className="table table-bordered">
                            <tbody>
                              <tr>
                                <th>ID</th>
                                <td>{filteredBooking.id}</td>
                              </tr>
                              <tr>
                                <th>Booking Type</th>
                                <td>
                                  {filteredBooking.booking_response.Response
                                    .FlightItinerary.JourneyType === 1
                                    ? "ONEWAY"
                                    : "RETURN"}
                                </td>
                              </tr>
                              <tr>
                                <th>PNR</th>
                                <td>
                                  {
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.PNR
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Booking Date</th>
                                <td>
                                  {
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.InvoiceCreatedOn
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Update Date</th>
                                <td>{filteredBooking.updated_at}</td>
                              </tr>
                              {/* <tr>
                                <th>Payment Status</th>
                                <td></td>
                              </tr> */}

                              {/* <tr>
                                <th>Trace ID</th>
                                <td>453060bf-14ce-456e-8da6-45e97fc1cf64</td>
                              </tr> */}
                              <tr>
                                <th>Ticket Status</th>
                                <td>
                                  {
                                    statusMappingTBO[
                                      filteredBooking.ticket_status
                                    ]
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>

                      <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.BaseFare
                                  )}
                                </span>
                              </li>
                              <li>
                                Tax{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.Tax
                                  )}
                                </span>
                              </li>
                              <li>
                                Meal Charges{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.TotalMealCharges
                                  )}
                                </span>
                              </li>
                              <li>
                                Baggage Charges{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.TotalBaggageCharges
                                  )}
                                </span>
                              </li>
                              <li>
                                Seat Charges{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.TotalSeatCharges
                                  )}
                                </span>
                              </li>
                              <li>
                                Customer Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.PublishedFare
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.PublishedFare
                                  )}
                                </span>
                              </li>
                              <li>
                                Agent Commission{" "}
                                <span>₹{handleChangeCurrency("0")}</span>
                              </li>
                              <li>
                                Admin Fare{" "}
                                <span>
                                  ₹
                                  {handleChangeCurrency(
                                    filteredBooking.booking_response.Response
                                      .FlightItinerary.Fare.PublishedFare
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* <Card className="card-primary mb-3">
                        <Card.Header className="card-header">
                          <Card.Title as="h3" className="card-title">
                            Fare Details
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="card-body">
                          <div className="fare_details">
                            <ul className="list-unstyled mb-0">
                              <li>
                                Basefare <span>₹ 2219</span>
                              </li>
                              <li>
                                Tax <span>₹ 1157</span>
                              </li>
                              <li>
                                Meal Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Baggage Charges <span>₹ 0</span>
                              </li>
                              <li>
                                Seat Charges <span>₹ 400</span>
                              </li>
                              <li>
                                Customer Fare <span>₹ 3776</span>
                              </li>
                              <li>
                                Agent Fare <span>₹ 3735</span>
                              </li>
                              <li>
                                Agent Commission <span>₹ 41</span>
                              </li>
                              <li>
                                Admin Fare <span>₹ 3725</span>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card> */}
                    </Col>
                  </Row>

                  <Modal
                    show={showCancelModal}
                    onHide={handleCancelModalClose}
                    // className="fare-rules-modal show"
                    id="cancel"
                    style={{ paddingRight: "12px", display: "block" }}
                    // size="lg"

                    centered={false}
                  >
                    <Modal.Dialog className="modal-lg cancelbookingmodal">
                      <div className="modal-content">
                        <Modal.Header>
                          <Modal.Title>Cancel Flight</Modal.Title>
                          <Button
                            variant="close"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          />
                          {/* </Button> */}
                        </Modal.Header>

                        <Modal.Body>
                          <p>Are you sure you want to cancel this flight?</p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            className=""
                            variant="info"
                            onClick={() => releasePNRTBO()}
                          >
                            Cancel Booking
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleCancelModalClose}
                            data-dismiss="modal"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </div>
                    </Modal.Dialog>
                  </Modal>

                  <Modal
                    show={showIssueModal}
                    onHide={handleIssueModalClose}
                    // className="fare-rules-modal show"
                    id="cancel"
                    style={{ paddingRight: "12px", display: "block" }}
                    // size="lg"

                    centered={false}
                  >
                    <Modal.Dialog className="modal-lg cancelbookingmodal">
                      <div className="modal-content">
                        <Modal.Header>
                          <Modal.Title>Issue Reserved Flight</Modal.Title>
                          <Button
                            variant="close"
                            onClick={handleIssueModalClose}
                            data-dismiss="modal"
                          />
                          {/* </Button> */}
                        </Modal.Header>

                        <Modal.Body>
                          <p>
                            Are you sure you want to Issue this Reservation?
                          </p>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            className=""
                            variant="info"
                            onClick={() => IssueFlightTBO()}
                          >
                            Issue Reservation
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleIssueModalClose}
                            data-dismiss="modal"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </div>
                    </Modal.Dialog>
                  </Modal>

                  <Modal
                    show={showRuleModal}
                    onHide={handleRuleModalClose}
                    backdrop="static"
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Fare Rule</Modal.Title>
                    </Modal.Header>
                    <form
                      name="frmTransaction"
                      method="POST"
                      action=""
                      id="frmTransaction"
                      className="has-validation-callback payment_gateway_form"
                    >
                      <Modal.Body></Modal.Body>
                      {/* <Modal.Footer>
                 <Link
                   // to="#"
                   className="btn btn-danger"
                   onClick={handleRuleModalClose}
                 >
                   <span
                     className="fa fa-times-circle"
                     aria-hidden="true"
                   ></span>{" "}
                   Cancel
                 </Link>
               </Modal.Footer> */}
                    </form>
                  </Modal>

                  <FlightBookingChange
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </Container>
              </section>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default FlightBookingDetails;
