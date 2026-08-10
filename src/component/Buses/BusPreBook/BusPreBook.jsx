import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./BusPreBook.css";
import { BsInfoCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaBus, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import HotelPromoCodes from "../../HotelsNew/HotelPreBooking/HotelPromoCodes";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaChevronDown,
  FaShieldAlt,
} from "react-icons/fa";
import BusPromoCodes from "./BusPromoCodes";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

const BusPreBook = () => {
  const [details, setDetails] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    boardingTime: "",
    droppingTime: "",
  });

  const [fareSummary, setFareSummary] = useState({
    baseFare: "",
    taxes: "",
    discount: "",
  });

  const selectedSeats =
    JSON.parse(localStorage.getItem("SelectedBusSeats")) || [];
  const numberOfPassengers = selectedSeats.length;

  const [showGSTFields, setShowGSTFields] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOption, setSelectedOption] = useState("yes");
  const [preBusBookDetail, setPreBusBookDetail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [blockRequestData, setBlockRequestData] = useState(null);
  // const [selectedSeats, setSelectedSeats] = useState([]);

  const fare = localStorage.getItem("SeatBaseFare");
  console.log("FARE IS PREE BOOK", fare);
  useEffect(() => {
    setDetails({
      origin: localStorage.getItem("BusOrigin") || "",
      destination: localStorage.getItem("BusDestination") || "",
      departureTime: localStorage.getItem("BusDepartureTime") || "",
      arrivalTime: localStorage.getItem("BusArrivalTime") || "",
      boardingTime: localStorage.getItem("BusBoardingPointsTime") || "",
      droppingTime: localStorage.getItem("BusDroppingPointsTime") || "",
      boardingLocation: localStorage.getItem("BusBoardingPointsLocation") || "",
      droppingLocation: localStorage.getItem("BusDroppingPointsLocation") || "",
      busType: localStorage.getItem("BusType") || "",
      operator: localStorage.getItem("BusTravelName") || "",
      resultIndex: localStorage.getItem("ResultIndex"),
    });

    setFareSummary({
      baseFare: localStorage.getItem("SeatBaseFare") || "",
    });
  }, []);

  const handleContinueBooking = async (action) => {
    const BusDestination = localStorage.getItem("BusDestination");
    const BusOrigin = localStorage.getItem("BusOrigin");
    const BusTraceId = localStorage.getItem("BusTraceId");
    const BusResultIndex = localStorage.getItem("BusResultIndex");

    const requestData = {
      UserEmail: "support@eweblink.net",
      UserPhone: "9632587412",
      Type: "web",
      Destination: BusDestination,
      Origin: BusOrigin,
      TraceId: BusTraceId,
      ResultIndex: BusResultIndex,
      BoardingPointId: 1,
      DroppingPointId: 1,
      Passenger: selectedSeats.map((seat, index) => ({
        LeadPassenger: index === 0,
        PassengerId: 0,
        Title: "Mr.",
        Address: "Test",
        Age: 25,
        Email: "support@eweblink.net",
        FirstName: "Eweblink",
        LastName: "Testing",
        Gender: 1,
        Phoneno: "9632587412",
        Seat: seat,
      })),
    };

    if (action === "block") {
      try {
        const blockResponse = await axios.post(
          "https://admin.trustedfare.com/api/Bus/Block",
          requestData
        );

        console.log("Block API response:", blockResponse.data);

        if (blockResponse.data && blockResponse.data.success === true) {
          setBlockRequestData(requestData); // store for later booking
          setShowModal(true); // open modal
        } else {
          alert("Failed to block seats. Please try again.");
        }
      } catch (error) {
        console.error("Block API error:", error);
        alert("Something went wrong while blocking the seats.");
      }
    }

    if (action === "book" && blockRequestData) {
      try {
        const bookResponse = await axios.post(
          "https://admin.trustedfare.com/api/Bus/Book",
          blockRequestData
        );

        console.log("Book API response:", bookResponse.data);

        if (bookResponse.data && bookResponse.data.success === true) {
          alert("Booking confirmed successfully!");
        } else {
          alert("Failed to confirm booking. Please try again.");
        }
      } catch (error) {
        console.error("Book API error:", error);
        alert("Something went wrong while confirming the booking.");
      }

      setShowModal(false); // close modal
      setBlockRequestData(null); // clear temp data
    }
  };

  const insuranceItems = [
    {
      icon: "/Images/buses/health-report.png",
      title: "Accidental Medical Expenses Reimbursement",
      value: "₹150000",
    },
    {
      icon: "/Images/buses/lost-items.png",
      title: "Total loss of Baggage and Personal Effects",
      value: "₹5000",
    },
    {
      icon: "/Images/buses/cancelled.png",
      title: "Trip Cancellation & Interruption",
      value: "₹1500",
    },
    {
      icon: "/Images/buses/hospital.png",
      title: "Hospital Daily Allowance",
      value: "₹500/day",
      sub: "Maximum up to ₹3,500",
    },
    {
      icon: "/Images/buses/coffin.png",
      title: "Accidental Death Benefit",
      value: "₹600000",
    },
  ];

  return (
    <div>
      <div className="busPreBook" style={{ position: "relative" }}>
        <div className="busPreBooking_MainBg" style={{ height: "150px" }}></div>
        <div className="busPreBooking_Main">
          <div className="busPreBooking_Containers">
            <Container>
              <Row>
                <Col md={9}>
                  <div className="busPreBooking_ReviewBooking">
                    <div className="busPreBooking_reviewBook">
                      <Link to="/buslisting">
                        <span style={{ color: "white" }}>
                          <FaChevronLeft />
                        </span>
                      </Link>
                      <h3>Review Your Booking</h3>
                    </div>
                  </div>

                  <div className="busPreBooking_busContainor">
                    <div className="busPreBooking_busDetails">
                      <div className="busPreBooking-name">Bus Details</div>
                    </div>

                    <Row className="busPreBooking_rowCols">
                      {/* Column 1: Route Info */}
                      <Col md={3}>
                        <div className="busPreBooking-route">
                          {/* <img src="/bus-icon.png" alt="Bus" className="busPreBooking-busIcon" /> */}
                          <span className="busPreBooking-busIcon">
                            <FaBus />
                          </span>
                          <div>
                            <div className="busPreBooking-routeTitle">
                              {details.origin} → {details.destination}
                            </div>
                            <div className="busPreBooking-dateTag">
                              {moment(details.arrivalTime).format(
                                "ddd, DD MMM"
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>

                      {/* Column 2: Time & Duration */}
                      <Col md={4}>
                        <div className="busPreBooking-timeBlock">
                          <div className="busPreBooking-timeItem">
                            <div className="busPreBooking-timeLabel">
                              Departure Time
                            </div>
                            <div className="busPreBooking-timeValue">
                              {new Date(
                                details.departureTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </div>
                          </div>

                          <div className="busPreBooking-routeVisualBlock">
                            <div className="busPreBooking-lineWrapper">
                              <span className="busPreBooking-circle" />
                              <span className="busPreBooking-line" />
                              {/* <span className="busPreBooking-busIconInline">🚌</span> */}
                              <span className="busPreBooking-line" />
                              <span className="busPreBooking-circle" />
                            </div>
                            <div className="busPreBooking-duration">
                              06h 26m
                            </div>
                          </div>

                          <div className="busPreBooking-timeItem">
                            <div className="busPreBooking-timeLabel">
                              Arrival Time
                            </div>
                            <div className="busPreBooking-timeValue">
                              {new Date(details.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>

                      {/* Column 3: Seat Info */}
                      <Col md={2}>
                        <div className="busPreBooking-timeItem">
                          <div className="busPreBooking-timeLabel">
                            Seat no(s)
                          </div>
                          <div className="busPreBooking-seatTag">
                            {selectedSeats.length > 0
                              ? selectedSeats
                                  .map(
                                    (seat) =>
                                      `${seat.SeatName}(${seat.SeatType})`
                                  )
                                  .join(", ")
                              : "N/A"}
                          </div>
                        </div>
                      </Col>
                      {/* Column 4: Passenger Count */}
                      <Col md={3}>
                        <div className="busPreBooking-timeItem">
                          <div className="busPreBooking-timeLabel">
                            No of Passenger(s)
                          </div>
                          <div className="busPreBooking-timeValue">
                            {numberOfPassengers}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Address Section */}
                    <Row className="busPreBooking-addressRow mt-3">
                      {/* Boarding Block */}
                      <Col md={8}>
                        <div className="busPreBooking-addressTimeBox">
                          <div className="busPreBooking-addressTimeLabel">
                            Boarding Time & Address
                          </div>
                          <div style={{ display: "flex" }}>
                            <div className="busPreBooking-time">
                              <strong>
                                {new Date(
                                  details.boardingTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </strong>
                            </div>
                            <div className="busPreBooking-address">
                              {" "}
                              {details.boardingLocation}
                            </div>
                          </div>
                        </div>
                        {/* Dropping Block */}
                        <div className="busPreBooking-addressTimeBox">
                          <div className="busPreBooking-addressTimeLabel">
                            Dropping Time & Address
                          </div>
                          <div style={{ display: "flex" }}>
                            <div className="busPreBooking-time">
                              <strong>
                                {new Date(
                                  details.droppingTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </strong>
                            </div>
                            <div className="busPreBooking-address">
                              {details.droppingLocation}
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col md={4} className="busPreBooking-busOperatorCol">
                        <div className="busPreBooking-addressTimeBox">
                          <div className="busPreBooking-addressTimeLabel">
                            Bus Operator
                          </div>
                          <div>
                            <strong>{details.operator}</strong>
                            <div className="busPreBooking-address">
                              {details.busType}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* <div className="busPreBooking_GSTInfo">       
                          <Row>
                            <Col sm={12}>
                              <div className="">
                                <label className="busPreBooking_GSTContainer">
                                  <span><FaPlusCircle /></span>
                                  <span className="busPreBooking_checkboxLabel">
                                    <span className="busPreBooking_boldFont">
                                      I have a GST number <span style={{ color: "#9b9b9b" }}>(Optional)</span>
                                    </span>
                                  </span>
                                </label>
                                  <div className="busPreBooking_gstFields">
                                    <Row className="busPreBooking_adultItemRow">
                                      <Col sm={6}>
                                        <label className="busPreBooking_label">Company Name</label>
                                        <input className="busPreBooking_input" type="text" placeholder="Company Name" />
                                      </Col>
                                      <Col sm={6} className="">
                                        <label className="busPreBooking_label">GST No</label>
                                        <input className="busPreBooking_input" type="text" placeholder="GST No" />
                                      </Col>
                                    </Row>
                                  </div>
                              
                              </div>
                            </Col>
                          </Row>
                        </div> */}

                  <div className="busPreBooking_insurance-section">
                    <div
                      className="busPreBooking_insurance-header"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      <div className="busPreBooking_insurance-title">
                        <span
                          role="img"
                          aria-label="shield"
                          className="busPreBooking_insurance-icon"
                        >
                          <span>
                            <FaShieldAlt />
                          </span>
                        </span>
                        <span>
                          Add Travel Insurance and Secure your Trip with ACKO
                          Travel Insurance for ₹15/Person
                        </span>
                      </div>
                      <div className="busPreBooking_insurance-logo">
                        <FaChevronDown
                          className={`busPreBooking_chevron-icon ${
                            showDetails ? "busPreBooking_rotate" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="busPreBooking_InsurancePadding">
                      {showDetails && (
                        <div className="busPreBooking_insurance-body">
                          <p className="busPreBooking_insurance-terms">
                            (Upon Selecting Travel Insurance, You accept the{" "}
                            <a href="#">Terms and Conditions</a> of the travel
                            insurance policy)
                          </p>

                          <div className="busPreBooking_insurance-cards">
                            {insuranceItems.map((item, i) => (
                              <div
                                className="busPreBooking_insurance-card"
                                key={i}
                              >
                                {item.icon && (
                                  <div className="busPreBooking_insurance-card-icon">
                                    <img src={item.icon} alt="icon" />
                                  </div>
                                )}
                                <div className="busPreBooking_insurance-card-title">
                                  {item.title}
                                </div>
                                <div className="busPreBooking_insurance-card-value">
                                  Insured : {item.value}
                                </div>
                                {item.sub && (
                                  <div className="busPreBooking_insurance-card-sub">
                                    {item.sub}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "2px 20px" }}>
                      <div className="busPreBooking_insurance-options">
                        <label>
                          <input
                            type="radio"
                            name="insurance"
                            checked={selectedOption === "yes"}
                            onChange={() => setSelectedOption("yes")}
                          />
                          <span className="busPreBooking_insurance-radio-label">
                            Yes, I want to secure my trip with insurance.
                            <div className="busPreBooking_insurance-highlight">
                              More than 36% of our customers choose to secure
                              their trip.
                            </div>
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="insurance"
                            checked={selectedOption === "no"}
                            onChange={() => setSelectedOption("no")}
                          />
                          <span className="busPreBooking_insurance-radio-label">
                            No, I do not want to insure my trip
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="busPreBooking_GSTInfo">
                    <Row>
                      <Col sm={12}>
                        <div>
                          <label
                            className="busPreBooking_GSTContainer"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowGSTFields(!showGSTFields)}
                          >
                            <span>
                              {showGSTFields ? (
                                <FaMinusCircle style={{ color: "#d9534f" }} />
                              ) : (
                                <FaPlusCircle style={{ color: "#5cb85c" }} />
                              )}
                            </span>
                            <span className="busPreBooking_checkboxLabel">
                              <span className="busPreBooking_boldFont">
                                I have a GST number{" "}
                                <span style={{ color: "#9b9b9b" }}>
                                  (Optional)
                                </span>
                              </span>
                            </span>
                          </label>

                          {showGSTFields && (
                            <div className="busPreBooking_gstFields">
                              <Row className="busPreBooking_adultItemRow">
                                <Col sm={6}>
                                  <label className="busPreBooking_label">
                                    Company Name
                                  </label>
                                  <input
                                    className="busPreBooking_input"
                                    type="text"
                                    placeholder="Company Name"
                                  />
                                </Col>
                                <Col sm={6}>
                                  <label className="busPreBooking_label">
                                    GST No
                                  </label>
                                  <input
                                    className="busPreBooking_input"
                                    type="text"
                                    placeholder="GST No"
                                  />
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="busTravellerDetails-container">
                    <div className="busTravellerDetails-header">
                      <span>Travellers Details</span>
                      <span className="busTravellerDetails-note">
                        <i className="fas fa-id-card"></i> Name should be same
                        as in Government ID proof
                      </span>
                    </div>

                    {selectedSeats.map((seat, idx) => (
                      <div className="busTravellerDetails-row" key={idx}>
                        <div className="busTravellerDetails-label">Adult</div>

                        <select className="busTravellerDetails-input busTravellerDetails-title">
                          <option>Title</option>
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Ms</option>
                        </select>

                        <input
                          className="busTravellerDetails-input"
                          placeholder="Enter First Name"
                        />
                        <input
                          className="busTravellerDetails-input"
                          placeholder="Enter Last Name"
                        />
                        <input
                          className="busTravellerDetails-input busTravellerDetails-age"
                          placeholder="Age"
                        />

                        <div className="busTravellerDetails-seat">
                          {seat.SeatName} ({seat.SeatType})
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="busTravellerDetails-wrapper">
                    <div className="busTravellerDetails-mobileWrapper">
                      <div>Enter Your Mobile Number</div>
                      <p>
                        Your mobile number will only be used for bus-related
                        communication.
                      </p>
                      <div className="busTravellerDetails-mobileInput">
                        <i className="fas fa-phone"></i>
                        <input type="text" placeholder="Mobile Number" />
                      </div>
                    </div>

                    <div className="busPreBooking_email-section">
                      <label className="busPreBooking_email-label">
                        Email Address
                      </label>
                      <span className="busPreBooking_email-info">
                        Your ticket will be sent to this email address
                      </span>
                      <div className="busTravellerDetails-mobileInput">
                        <i className="fas fa-phone"></i>
                        <input type="email" placeholder="Enter your Email ID" />
                      </div>
                    </div>
                  </div>

                  {/* <button className="busPreBooking_continue-btn">Continue</button> */}
                </Col>

                <Col md={3}>
                  <div className="hotelFinalBooking_priceSummary">
                    <div className="hotelFinalBooking_fareSummary">
                      <div>Fare Summary</div>
                      <div>{numberOfPassengers} Passenger(s)</div>
                    </div>
                    <div className="hotelFinalBooking_BasefareSummary">
                      <div>Base Fare * {numberOfPassengers}</div>
                      <div>₹ {fareSummary.baseFare}</div>
                    </div>
                    {/* <div className="hotelFinalBooking_BasefareSummary">
                            <div>Taxes & Surcharges -</div>
                            <div>₹ </div>
                          </div> */}
                    <div className="hotelFinalBooking_BasefareSummary">
                      <div>Discount -</div>
                      <div>₹0</div>
                    </div>
                    <div className="hotelFinalBooking_PayAmt">
                      <div>You Pay: -</div>
                      <div>₹ {fareSummary.baseFare}</div>
                    </div>
                    {/* <button onClick={handleHotelBookNow} className="hotelFinalBooking_continueBtn">Continue</button> */}
                    <button
                      onClick={() => handleContinueBooking("block")}
                      className="hotelFinalBooking_continueBtn"
                    >
                      Continue
                    </button>

                    {showModal && (
                      <div className="modal-backdrop">
                        <div className="modal-box">
                          <h3>Seat Blocked Successfully</h3>
                          <p>
                            Do you want to confirm the booking for the following
                            seats?
                          </p>

                          <div className="seat-details">
                            {selectedSeats.map((seat, idx) => (
                              <div key={idx} className="seat-info">
                                <strong>Seat:</strong> {seat.SeatName} &nbsp;
                                <strong>Fare:</strong> ₹{seat.SeatFare}
                              </div>
                            ))}
                          </div>

                          <div className="modal-actions">
                            <button
                              className="cancel-btn"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="confirm-btn"
                              onClick={() => handleContinueBooking("book")}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <BusPromoCodes />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <div className="busPreBookMobile-wrapper">
        <div className="busPreBookMobile-header">
          <Link to="/buslisting">
            <FaArrowLeft className="busback-icon" />
          </Link>
          <span className="busPreBookMobile-headerText">
            Hotel Review & Traveller
          </span>
        </div>
        <div className="busPreBookMobile-section">
          <h3 className="busPreBookMobile-heading">Bengaluru To Mumbai</h3>
          <div className="busPreBookMobile-date">Fri, Jul 18, 2025</div>

          <div className="busPreBookMobile-boardCard">
            <div className="busPreBookMobile-boardTimeRow">
              <div className="busPreBookMobile-timeColumn">
                <h3 className="busPreBookMobile-city">Bengaluru</h3>
                <div className="busPreBookMobile-time">7:30 PM</div>
                <div className="busPreBookMobile-point">
                  Whitefield (Pickup Van)
                </div>
              </div>

              <div className="busPreBookMobile-durationWrap">
                <span className="busPreBookMobile-durationText">17h 45m</span>
              </div>

              <div className="busPreBookMobile-timeColumn">
                <h3 className="busPreBookMobile-city">Mumbai</h3>
                <div className="busPreBookMobile-time">5:00 PM</div>
                <div className="busPreBookMobile-point">
                  Vashi Old Tol-Naka Near
                </div>
              </div>
            </div>

            <hr />

            <div className="busPreBookMobile-points">
              <div className="busPreBookMobile-pickDrop">
                <div>
                  <img src="/Images/buses/pin.png" alt="" /> Pick up
                </div>
                <p>Whitefield (Pickup Van) & 7:30 PM</p>
              </div>
              <div className="busPreBookMobile-pickDrop">
                <div>
                  <img src="/Images/buses/pin.png" alt="" /> Drop Point
                </div>
                <p>Vashi Old Tol-Naka Near Mgm Ground & 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="busPreBookMobile-operatorCard">
            <div className="busPreBookMobile-operatorRow">
              <span>
                <strong>Bus Operator</strong>
                <br />
                VRL Travel
              </span>
              <span>
                <strong>Selected Seats</strong>
                <br />
                L27
              </span>
            </div>
            <div className="busPreBookMobile-busType">
              <strong>Bus Type</strong>
              <br />
              EICHER A/C SLEEPER SUPER BUS
            </div>
          </div>
        </div>

        <div className="busPreBookMobile-travellerSection">
          <h4 className="busPreBookMobile-travellerTitle">Travellar Details</h4>

          <div className="busPreBookMobile-travellerNote">
            <span className="busPreBookMobile-travellerNoteIcon">👤</span>
            Name should be same as in Government ID proof
          </div>

          <div className="busPreBookMobile-travellerCard">
            <div className="busPreBookMobile-adultHeader">
              <span>ADULT 1</span>
              <span className="busPreBookMobile-seatTag">L27 (SL)</span>
            </div>

            <div className="busPreBookMobile-genderSelector">
              <button className="busPreBookMobile-genderBtn">Male</button>
              <button className="busPreBookMobile-genderBtn">Female</button>
            </div>

            <div className="busPreBookMobile-inputGroup">
              <label>First Name (& Middle name if any)</label>
              <input type="text" placeholder="Enter First Name" />
            </div>

            <div
              style={{ width: "100%" }}
              className="busPreBookMobile-nameAgeRow"
            >
              <div style={{ width: "40%" }}>
                <label>Last Name</label>
                <input type="text" placeholder="Enter Last Name" />
              </div>
              <div style={{ width: "40%" }}>
                <label>Age</label>
                <input type="text" placeholder="Enter Age" />
              </div>
            </div>

            <div className="busPreBooking_insurance-section">
              <div
                className="busPreBooking_insurance-header"
                onClick={() => setShowDetails(!showDetails)}
              >
                <div className="busPreBooking_insurance-title">
                  <span
                    role="img"
                    aria-label="shield"
                    className="busPreBooking_insurance-icon"
                  >
                    <span>
                      <FaShieldAlt />
                    </span>
                  </span>
                  <span>
                    Add Travel Insurance and Secure your Trip with ACKO Travel
                    Insurance for ₹15/Person
                  </span>
                </div>
                <div className="busPreBooking_insurance-logo">
                  <FaChevronDown
                    className={`busPreBooking_chevron-icon ${
                      showDetails ? "busPreBooking_rotate" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="busPreBooking_InsurancePadding">
                {showDetails && (
                  <div className="busPreBooking_insurance-body">
                    <p className="busPreBooking_insurance-terms">
                      (Upon Selecting Travel Insurance, You accept the{" "}
                      <a href="#">Terms and Conditions</a> of the travel
                      insurance policy)
                    </p>

                    <div className="busPreBooking_insurance-cards">
                      {insuranceItems.map((item, i) => (
                        <div className="busPreBooking_insurance-card" key={i}>
                          {item.icon && (
                            <div className="busPreBooking_insurance-card-icon">
                              <img src={item.icon} alt="icon" />
                            </div>
                          )}
                          <div className="busPreBooking_insurance-card-title">
                            {item.title}
                          </div>
                          <div className="busPreBooking_insurance-card-value">
                            Insured : {item.value}
                          </div>
                          {item.sub && (
                            <div className="busPreBooking_insurance-card-sub">
                              {item.sub}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: "2px 20px" }}>
                <div className="busPreBooking_insurance-options">
                  <label>
                    <input
                      type="radio"
                      name="insurance"
                      checked={selectedOption === "yes"}
                      onChange={() => setSelectedOption("yes")}
                    />
                    <span className="busPreBooking_insurance-radio-label">
                      Yes, I want to secure my trip with insurance.
                      <div className="busPreBooking_insurance-highlight">
                        More than 36% of our customers choose to secure their
                        trip.
                      </div>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="insurance"
                      checked={selectedOption === "no"}
                      onChange={() => setSelectedOption("no")}
                    />
                    <span className="busPreBooking_insurance-radio-label">
                      No, I do not want to insure my trip
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="busPreBooking_GSTInfo">
              <Row>
                <Col sm={12}>
                  <div>
                    <label
                      className="busPreBooking_GSTContainer"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowGSTFields(!showGSTFields)}
                    >
                      <span>
                        {showGSTFields ? (
                          <FaMinusCircle style={{ color: "#d9534f" }} />
                        ) : (
                          <FaPlusCircle style={{ color: "#5cb85c" }} />
                        )}
                      </span>
                      <span className="busPreBooking_checkboxLabel">
                        <span className="busPreBooking_boldFont">
                          I have a GST number{" "}
                          <span style={{ color: "#9b9b9b" }}>(Optional)</span>
                        </span>
                      </span>
                    </label>

                    {showGSTFields && (
                      <div className="busPreBooking_gstFields">
                        <Row className="busPreBooking_adultItemRow">
                          <Col sm={6}>
                            <label className="busPreBooking_label">
                              Company Name
                            </label>
                            <input
                              className="busPreBooking_input"
                              type="text"
                              placeholder="Company Name"
                            />
                          </Col>
                          <Col sm={6}>
                            <label className="busPreBooking_label">
                              GST No
                            </label>
                            <input
                              className="busPreBooking_input"
                              type="text"
                              placeholder="GST No"
                            />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="busPreBooking_email-section">
              <label className="busPreBooking_email-label">
                E-mail Details
              </label>
              <span className="busPreBooking_email-info">
                Your ticket will be sent to this email address
              </span>
              <input
                type="email"
                className="busPreBooking_email-input"
                placeholder="Enter your Email ID"
              />
            </div>

            <div className="busPreBookMobile-priceBar">
              <div>
                <div className="busPreBookMobile-guestInfo">
                  <span>L27 (SL)</span>
                </div>
                <strong style={{ color: "#a7a7a7ff" }}>₹ 850</strong>
              </div>
              <button>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusPreBook;
