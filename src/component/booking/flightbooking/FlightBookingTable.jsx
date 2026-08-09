import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Breadcrumb,
  Dropdown,
  Pagination,
  Form,
  ListGroup,
} from "react-bootstrap";
import {
  FaBuilding,
  FaEye,
  FaFileDownload,
  FaFilter,
  FaPlane,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./FlightBookingTable.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { cities12 } from "../../../Cities";

// UserTags component
const UserTags = ({ data }) => {
  // Initialize counts for each status
  let successCount = 0;
  let failedCount = 0;
  let pendingCount = 0;

  // Iterate over data to count occurrences of each status
  data.forEach((booking) => {
    const status = booking.status && booking.status.toLowerCase(); // Convert status to lowercase

    if (status === "success") {
      successCount++;
    } else if (status === "failed") {
      failedCount++;
    } else if (status === "pending") {
      pendingCount++;
    }
  });

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="success"
        className="success_tag cus_tag"
      >
        <span className="span_tag approvetag">{successCount}</span>{" "}
        <span className="tag_label">Success</span>
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="danger"
        className="failed_tag cus_tag"
      >
        <span className="span_tag failedtag">{failedCount}</span>{" "}
        <span className="tag_label">Failed</span>
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="warning"
        className="pending_tag cus_tag"
      >
        <span className="span_tag pendingtag">{pendingCount}</span>{" "}
        <span className="tag_label">Pending</span>
      </ListGroup.Item>
    </ListGroup>
  );
};
// CardCustomMenu component
const CardCustomMenu = ({ toggleFilter }) => {
  return (
    <div className="full-container">
      <div>
        <ul className="custom-menu-container">
          <li>
            <Link to="/bookings/hotel">
              <FaBuilding style={{ marginRight: "10px" }} />
              Hotel
            </Link>
          </li>
          <li>
            <Link to="/bookings/tour">
              <FaSuitcaseRolling style={{ marginRight: "10px" }} />
              Package
            </Link>
          </li>
          <li className="active">
            <Link to="/bookings/flight">
              <FaPlane style={{ marginRight: "10px" }} />
              Flight
            </Link>
          </li>
          {/* <li>
            <Link to="/bookings/transfer">Transfer</Link>
          </li> */}
        </ul>
      </div>
      <div>
        <Button
          variant="theme"
          size="sm"
          className="filter_btn"
          onClick={toggleFilter}
        >
          <FaFilter className="filter-icon" /> Filter
        </Button>
      </div>
    </div>
  );
};

// Filter component
const Filter = ({ onFilter }) => {
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);

  // const handleFromDateChange = (date) => {
  //   if (!toDate || date <= toDate) {
  //     setFromDate(date);
  //   }
  // };

  // const handleToDateChange = (date) => {
  //   if (!fromDate || date >= fromDate) {
  //     setToDate(date);
  //   }
  // };

  const [filters, setFilters] = useState({
    booking_id: "",
    fromDate: null,
    toDate: null,
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFromDateChange = (date) => {
    // Ensure that the selected date is less than or equal to the "To Booking Date"
    if (!filters.toDate || date <= filters.toDate) {
      setFilters({ ...filters, fromDate: date });
    }
  };

  const handleToDateChange = (date) => {
    // Ensure that the selected date is greater than or equal to the "From Booking Date"
    if (!filters.fromDate || date >= filters.fromDate) {
      setFilters({ ...filters, toDate: date });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter_panel">
      <h4>Search By Details</h4>
      <Form onSubmit={handleSubmit}>
        <input type="hidden" name="type" value="b2c" />
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                autoComplete="off"
                placeholder="Enter ID"
                name="booking_id"
                type="text"
                value={filters.booking_id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>From Booking Date</Form.Label>
              <DatePicker
                selected={filters.fromDate}
                onChange={handleFromDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="From Booking Date"
                maxDate={filters.toDate || new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>To Booking Date</Form.Label>
              <DatePicker
                selected={filters.toDate}
                onChange={handleToDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="To Booking Date"
                minDate={filters.fromDate}
                maxDate={new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Booking Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={filters.status}
                onChange={handleInputChange}
              >
                <option value="">- Select Type -</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <Button
              variant="theme"
              size="md"
              type="submit"
              className="search-filter-btn"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

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

const FlightBookingTable = ({ heading, data }) => {
  // State to manage the visibility of the filter panel
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  // const [currentPage, setCurrentPage] = useState(1);
  // const entriesPerPage = 5;

  const token = localStorage.getItem("token");

  // Function to toggle the filter panel visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const ticketStatusMapping = {
    1: "Ticket",
    2: "Refund",
    3: "Void",
    4: "Unknown",
  };

  const handleFilter = (filters) => {
    const { booking_id, fromDate, toDate, status } = filters;
    const filteredData = data.filter((booking) => {
      let matchesFilter = true;

      if (booking_id && !booking.booking_id.toString().includes(booking_id)) {
        // Convert booking.traceID to string before calling includes
        matchesFilter = false;
      }

      if (fromDate && new Date(booking.bookingDate) < new Date(fromDate)) {
        matchesFilter = false;
      }

      if (toDate && new Date(booking.bookingDate) > new Date(toDate)) {
        matchesFilter = false;
      }

      if (status && booking.status !== status) {
        matchesFilter = false;
      }

      return matchesFilter;
    });

    setFilteredData(filteredData);
    setCurrentPage(1); // Reset pagination to the first page
  };

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50; // Number of entries per page

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  console.log("filtered bookings", filteredData);

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

  const cabinMapping = {
    1: "Economy",
    2: "Premium Economy",
    3: "Business",
    4: "Premium Business",
    5: "First",
    6: "Premium First",
    100: "",
  };

  const sessionId = localStorage.getItem("sessionId");
  const [bookingDetailsTJ, setBookingDetailsTJ] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingDetailsParto, setBookingDetailsParto] = useState(null);

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

              {(
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
                <h1 className="m-0 text-dark">{heading}</h1>
              </Col>
              <Col sm={6} md={6} className="sm-center">
                <Breadcrumb className="float-sm-right">
                  <Breadcrumb.Item
                    linkAs={Link}
                    linkProps={{ to: "/bookings" }}
                  >
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{heading}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="content">
          <Container fluid>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <div className="cus_user_tags">
                      <UserTags data={filteredData} />
                    </div>
                  </Card.Header>
                </Card>
              </Col>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <div className="card_custom_menu">
                      <CardCustomMenu toggleFilter={toggleFilter} />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {showFilter && <Filter onFilter={handleFilter} />}
                    <Col md={12}>
                      <div className="table-responsive">
                        <Table bordered hover className="no-footer">
                          <thead>
                            <tr>
                              <th className="no-sort sorting_disabled">
                                Basic
                              </th>
                              <th className="no-sort sorting_disabled">
                                Journey Date
                              </th>
                              <th>Passengers Name</th>
                              <th>Segment</th>
                              <th>PNR</th>
                              <th>Booking</th>
                              <th>Fare</th>
                              <th>Invoice</th>
                              <th className="no-sort sorting_disabled">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="tdata booking_data">
                            {currentEntries.map((booking, index) => (
                              <>
                                {booking.offer_type === "TripJack" && (
                                  <tr
                                    key={index}
                                    role="row"
                                    className={index % 2 === 0 ? "odd" : "even"}
                                  >
                                    <td>
                                      <b>Ref ID:</b> {booking.Refid}
                                      <br />
                                      {booking.booking_response.order.createdOn}
                                    </td>
                                    <td>
                                      {new Date(
                                        booking.depart_date
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>
                                      {/* passenger Name */}
                                      {
                                        booking.booking_response.itemInfos.AIR
                                          .travellerInfos[0].fN
                                      }
                                    </td>
                                    <td>
                                      <b>Type:</b>{" "}
                                      {booking.booking_response.itemInfos.AIR
                                        .tripInfos.length > 1
                                        ? "ROUND"
                                        : "ONEWAY"}
                                      <br />
                                      {booking.booking_response.itemInfos.AIR
                                        .travellerInfos[0].pnrDetails &&
                                        Object.keys(
                                          booking.booking_response.itemInfos.AIR
                                            .travellerInfos[0].pnrDetails
                                        ).join(", ")}
                                    </td>
                                    <td>
                                      {/* PNR */}
                                      {booking.booking_response.itemInfos.AIR
                                        .travellerInfos[0].pnrDetails &&
                                        booking.booking_response.itemInfos.AIR
                                          .travellerInfos[0].pnrDetails[
                                          Object.keys(
                                            booking.booking_response.itemInfos
                                              .AIR.travellerInfos[0].pnrDetails
                                          )[0]
                                        ]}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div className="check_status">
                                        <Button
                                          variant="link"
                                          className={`chk_stat_btn ${
                                            booking.status === "Pending"
                                              ? "yellow_clr"
                                              : booking.status === "Success"
                                              ? "green_clr"
                                              : "red_clr"
                                          }`}
                                        >
                                          {booking.ticket_status}
                                        </Button>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        // textAlign: "right",
                                        fontWeight: 600,
                                      }}
                                    >
                                      ₹{booking.booking_response.order.amount}
                                    </td>
                                    <td>
                                      {/* Invoice */}
                                      <Link to={booking.invoiceLink}>
                                        {booking.booking_response.itemInfos.AIR
                                          .travellerInfos[0].pnrDetails &&
                                          booking.booking_response.itemInfos.AIR
                                            .travellerInfos[0].pnrDetails[
                                            Object.keys(
                                              booking.booking_response.itemInfos
                                                .AIR.travellerInfos[0]
                                                .pnrDetails
                                            )
                                          ]}
                                      </Link>
                                    </td>

                                    <td>
                                      <div className="nav-item dropdown action_dropdown cus_action_btn">
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            variant="primary"
                                            size="sm"
                                            className="action_btn btn btn-primary btn-rounded btn-xs"
                                            id="dropdown-basic"
                                          >
                                            Action{" "}
                                            <span className="caret"></span>
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                            <Dropdown.Item>
                                              <Link
                                                to={`/bookings/flight/details/${booking.id}`}
                                              >
                                                <FaEye className="eye-icon" />{" "}
                                                View Detail
                                              </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  downloadTicketTJ(
                                                    booking.booking_id
                                                  )
                                                }
                                              >
                                                <FaFileDownload className="eye-icon" />{" "}
                                                Download Ticket
                                              </Link>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                {booking.offer_type === "parto CRS" && (
                                  <tr
                                    key={index}
                                    role="row"
                                    className={index % 2 === 0 ? "odd" : "even"}
                                  >
                                    <td>
                                      <b>Trace ID:</b> {booking.Refid}
                                      <br />
                                      {booking.bookingDate}
                                    </td>
                                    <td>
                                      {new Date(
                                        booking.booking_response.TravelItinerary.ItineraryInfo.ReservationItems[0].DepartureDateTime
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>
                                      {/* passenger Name */}
                                      {
                                        booking.booking_response.TravelItinerary
                                          .ItineraryInfo.CustomerInfoes[0]
                                          .Customer.PaxName.PassengerFirstName
                                      }
                                    </td>
                                    <td>
                                      <b>Type:</b>
                                      {/* {booking.type} */}
                                      ONEWAY
                                      <br />
                                      {booking.booking_response.TravelItinerary.ItineraryInfo.ReservationItems.map(
                                        (segment) =>
                                          `${segment.DepartureAirportLocationCode}-${segment.ArrivalAirportLocationCode}`
                                      ).join(", ")}
                                    </td>
                                    <td>
                                      {/* PNR */}
                                      {
                                        booking.booking_response.TravelItinerary
                                          .ItineraryInfo.ReservationItems[0]
                                          .AirlinePnr
                                      }
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div className="check_status">
                                        <Button
                                          variant="link"
                                          className={`chk_stat_btn ${
                                            [10, 11, 12, 20].includes(
                                              booking.booking_response.Status
                                            )
                                              ? "yellow_clr"
                                              : [21, 22, 23].includes(
                                                  booking.booking_response
                                                    .Status
                                                )
                                              ? "green_clr"
                                              : "red_clr"
                                          }`}
                                        >
                                          {
                                            statusMapping[
                                              booking.booking_response.Status
                                            ]
                                          }
                                        </Button>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        // textAlign: "right",
                                        fontWeight: 600,
                                      }}
                                    >
                                      ₹
                                      {handleChangeCurrency(
                                        handleChangeCurrency2(
                                          booking.booking_response
                                            .TravelItinerary.ItineraryInfo
                                            .ItineraryPricing.TotalFare
                                        )
                                      )}
                                    </td>
                                    <td>
                                      {/* Invoice */}
                                      <Link to={booking.invoiceLink}>
                                        {booking.pnr}
                                      </Link>
                                    </td>

                                    <td>
                                      <div className="nav-item dropdown action_dropdown cus_action_btn">
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            variant="primary"
                                            size="sm"
                                            className="action_btn btn btn-primary btn-rounded btn-xs"
                                            id="dropdown-basic"
                                          >
                                            Action{" "}
                                            <span className="caret"></span>
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                            <Dropdown.Item>
                                              <Link
                                                to={`/bookings/flight/details/${booking.id}`}
                                              >
                                                <FaEye className="eye-icon" />{" "}
                                                View Detail
                                              </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  downloadTicketParto(
                                                    booking.booking_id
                                                  )
                                                }
                                              >
                                                <FaFileDownload className="eye-icon" />{" "}
                                                Download Ticket
                                              </Link>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                {booking.offer_type === "tbo" && (
                                  <tr
                                    key={index}
                                    role="row"
                                    className={index % 2 === 0 ? "odd" : "even"}
                                  >
                                    <td>
                                      <b>Trace ID:</b> {booking.Refid}
                                      <br />
                                      {booking.booking_response.Response
                                        .FlightItinerary &&
                                        booking.booking_response.Response
                                          .FlightItinerary.InvoiceCreatedOn &&
                                        booking.booking_response.Response
                                          .FlightItinerary.InvoiceCreatedOn}
                                    </td>
                                    <td>
                                      {new Date(
                                        booking.depart_date
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>
                                      {/* passenger Name */}
                                      {booking.booking_response.Response
                                        .FlightItinerary &&
                                        booking.booking_response.Response
                                          .FlightItinerary.Passenger &&
                                        booking.booking_response.Response
                                          .FlightItinerary.Passenger[0]
                                          .FirstName}
                                    </td>
                                    <td>
                                      <b>Type:</b>{" "}
                                      {booking.booking_response.Response
                                        .FlightItinerary &&
                                      booking.booking_response.Response
                                        .FlightItinerary.Segments.length > 1
                                        ? "ROUND"
                                        : "ONEWAY"}
                                      <br />
                                      {booking.booking_response.Response
                                        .FlightItinerary &&
                                        booking.booking_response.Response.FlightItinerary.Segments.map(
                                          (segment) =>
                                            `${segment.Origin.Airport.AirportCode}-${segment.Destination.Airport.AirportCode}`
                                        ).join(", ")}
                                    </td>
                                    <td>
                                      {/* PNR */}
                                      {booking.pnr}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div className="check_status">
                                        <Button
                                          variant="link"
                                          className={`chk_stat_btn ${
                                            booking.ticket_status === "1"
                                              ? "green_clr"
                                              : booking.ticket_status === "0"
                                              ? "red_clr"
                                              : "yellow_clr"
                                          }`}
                                        >
                                          {
                                            statusMappingTBO[
                                              booking.ticket_status
                                            ]
                                          }
                                        </Button>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        // textAlign: "right",
                                        fontWeight: 600,
                                      }}
                                    >
                                      ₹
                                      {booking.booking_response.Response
                                        .FlightItinerary &&
                                        booking.booking_response.Response
                                          .FlightItinerary.InvoiceAmount}
                                    </td>
                                    <td>
                                      {/* Invoice */}
                                      <Link to={booking.invoiceLink}>
                                        {booking.pnr}
                                      </Link>
                                    </td>

                                    <td>
                                      <div className="nav-item dropdown action_dropdown cus_action_btn">
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            variant="primary"
                                            size="sm"
                                            className="action_btn btn btn-primary btn-rounded btn-xs"
                                            id="dropdown-basic"
                                          >
                                            Action{" "}
                                            <span className="caret"></span>
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                            <Dropdown.Item>
                                              <Link
                                                to={`/bookings/flight/details/${booking.id}`}
                                              >
                                                <FaEye className="eye-icon" />{" "}
                                                View Detail
                                              </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <Link
                                                onClick={() =>
                                                  downloadTicketTBO(
                                                    booking.booking_id
                                                  )
                                                }
                                              >
                                                <FaFileDownload className="eye-icon" />{" "}
                                                Download Ticket
                                              </Link>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                            {currentEntries.length === 0 && (
                              <tr>
                                <td className="text-center" colSpan="6">
                                  No Record Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>

                    <Col md={12}>
                      {/* Pagination */}
                      <Row>
                        <Col sm={12} md={5}>
                          <div
                            className="dataTables_info"
                            id="invoicetable_info"
                            role="status"
                            aria-live="polite"
                          >
                            {filteredData.length > 0
                              ? `Showing ${indexOfFirstEntry + 1} to ${Math.min(
                                  indexOfLastEntry,
                                  filteredData.length
                                )} of ${filteredData.length} entries`
                              : "No bookings to show"}
                          </div>
                        </Col>
                        <Col sm={12} md={7}>
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="invoicetable_paginate"
                          >
                            <Pagination>
                              {/* Previous page button */}
                              <Pagination.Prev
                                onClick={() => paginate(currentPage - 1)}
                                disabled={
                                  currentPage === 1 || filteredData.length === 0
                                }
                              >
                                Previous
                              </Pagination.Prev>
                              {/* Page numbers */}
                              {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                  <Pagination.Item
                                    key={index}
                                    active={currentPage === index + 1}
                                    onClick={() => paginate(index + 1)}
                                  >
                                    {index + 1}
                                  </Pagination.Item>
                                )
                              )}
                              {/* Next page button */}
                              <Pagination.Next
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                  currentPage === totalPages ||
                                  filteredData.length === 0
                                }
                              >
                                Next
                              </Pagination.Next>
                            </Pagination>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
};

export default FlightBookingTable;
