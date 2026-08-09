import React, { useEffect, useRef, useState } from "react";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Card } from "react-bootstrap";
import "./HotelSidebar.css";
import {
  FaBars,
  FaCalendarCheck,
  FaCaretDown,
  FaEnvelope,
  // FaFacebook,
  // FaInstagram,
  FaLongArrowAltRight,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaQuestionCircle,
  FaStar,
  // FaTwitter,
  // FaUserAlt,
  // FaVk,
} from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";
// import { FiUserCheck } from "react-icons/fi";

import moment from "moment";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useNavigate } from "react-router-dom";

const HotelSidebar = ({hotelDetails}) => {

  const countDate = new Date("09/12/2026").getTime();
  const [distance, setDistance] = useState(countDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(countDate - new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const [roomType, setRoomType] = useState("");
  const [roomTypeName, setRoomTypeName] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [sale, setSale] = useState(0.7);
  const [totalCost, setTotalCost] = useState(0);

  // const handleRoomTypeChange = (selectedOption) => {
  //   setRoomType(selectedOption.value);
  // };

  const handleNumberOfAdultsChange = (e) => {
    setNumberOfAdults(e.target.value);
    calculateTotalCost();
  };

  const handleNumberOfChildrenChange = (e) => {
    setNumberOfChildren(e.target.value);
    calculateTotalCost();
  };

  const calculateTotalCost = () => {
    const total =
      numberOfAdults * parseInt(roomType) +
      numberOfChildren * parseInt(roomType) * sale;
    setTotalCost(total);
  };

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const handleAdultChange = (event) => {
    setAdults(parseInt(event.target.value));
  };

  const handleChildrenChange = (event) => {
    setChildren(parseInt(event.target.value));
  };

  const handleRoomTypeChange = (selectedOption) => {
    setRoomType(selectedOption.value);
    setRoomTypeName(selectedOption.label);
  };

  // const today = new Date(); // Get today's date
  // const tomorrow = new Date(today); // Create a new Date object with today's date
  // tomorrow.setDate(today.getDate() + 1);

  // const [startDate, setStartDate] = useState(today);
  // const [endDate, setEndDate] = useState(tomorrow);
  // const [selectedDates, setSelectedDates] = useState([null, null]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // // const handleDateChange = (selectedDate) => {
  // //   setStartDate(selectedDate);
  // //   setEndDate(null);
  // //   if (selectedDate.setDate(selectedDate.getDate() + 1)) {
  // //     setEndDate(selectedDate);
  // //   }
  // //   setShowDatePicker(false);
  // // };

  // const handleDateChange = (dates) => {
  //   setStartDate(dates[0]);
  //   setEndDate(dates[1]);
  //   setSelectedDates([dates[0], dates[1]]);
  //   if (dateInputRef.current) {
  //     setTimeout(() => {
  //       dateInputRef.current.value = `${dates[0].toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "2-digit",
  //         day: "2-digit",
  //       })} - ${dates[1].toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "2-digit",
  //         day: "2-digit",
  //       })}`;
  //     });
  //   }
  // };

  // // const handleMouseEnter = () => {
  // //   setShowDatePicker(true);
  // // };

  // // const handleMouseLeave = () => {
  // //   setShowDatePicker(false);
  // // };
  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker); // Toggle the visibility of DatePicker
    if (!showDatePicker) {
      // if (input === "startDate") {
        setFocusedInput("startDate");
      // } 
      // else if (input === "endDate") {
      //   setFocusedInput("endDate");
      // } 
      // else {
      //   setShowDatePicker(!showDatePicker);
      //   if (!showDatePicker) setFocusedInput("startDate");
      //   else setFocusedInput(null);
      // }
    }
  };

  // const dateInputRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null);
      // setCalVisible(false);
      setShowDatePicker(!showDatePicker);
    } else if (startDate) {
      setFocusedInput("endDate");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints();
    };
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  });

  const setBreakpoints = () => {
    const isSmallScreen = window.innerWidth <= 768;
    const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 992;
    if (isSmallScreen) {
      setDateRangeConfig(1, 30);
    } else if (isMediumScreen) {
      setDateRangeConfig(2, 30);
    } else {
      setDateRangeConfig(2, 30);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
    setDaySize(daysize);
  };

  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [daysize, setDaySize] = useState(2);

  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate("/hotel/booking");
  };

  const daysDifference = hotelDetails.searchQuery.checkinDate && hotelDetails.searchQuery.checkoutDate ? moment(hotelDetails.searchQuery.checkoutDate).diff(moment(hotelDetails.searchQuery.checkinDate), 'days') : 0;

  const prices = hotelDetails.hotel.ops.map(opt => opt.tp);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return (
    <div className="box-widget-wrap">
      <div className="box-widget-item fl-wrap">
        <div className="box-widget">
          <div className="box-widget-content">
            <div className="box-widget-item-header">
              <h3>Book This Hotel</h3>
              <FaCaretDown />
            </div>
            <Form name="bookFormCalc" className="book-form custom-form">
              <fieldset>
                <div className="cal-item">
                  <Form.Group
                    className="listsearch-input-item"
                    style={{ marginBottom: "10px" }}>
                    <Form.Label>
                      <FaBars
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          top: "48px",
                          left: "16px",
                          zIndex: 10,
                          color: "#F9B90F",
                        }}
                      />
                      Room Type
                    </Form.Label>

                    <Form.Control
                      as="select"
                      defaultValue="0"
                      className="chosen-select no-search-select"
                      onChange={handleRoomTypeChange}
                      style={{
                        backgroundColor: "#F7F9FB",
                        color: "#666",
                        fontSize: "13px",
                        paddingLeft: "42px",
                      }}>
                      <option value="0">Select Room</option>
                      <option value="81">Standard Family Room - 81$</option>
                      <option value="122">Superior Double Room - 122$</option>
                      <option value="310">Deluxe Single Room - 310$</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="cal-item">
                  <Form.Group className="bookdate-container  fl-wrap">
                    <Form.Label>
                      <FaCalendarCheck />
                      When
                    </Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Date In-Out"
                      name="bookdates"
                      onClick={handleDateClick}
                      // ref={dateInputRef}
                      value={
                        // (startDate && endDate)
                          // ? 
                          `${moment(hotelDetails.searchQuery.checkinDate).format("DD/MM/YYYY")} - ${moment(hotelDetails.searchQuery.checkoutDate).format("DD/MM/YYYY")}`
                          // : ""
                      }
                      readOnly
                    />
                    <Form.Text className="bookdate-container-dayscounter">
                      <FaQuestionCircle
                        className="question-icon"
                        onMouseOver={() => {
                          document.querySelector(
                            ".bookdate-container-dayscounter span"
                          ).style.display = "block";
                        }}
                        onMouseOut={() => {
                          document.querySelector(
                            ".bookdate-container-dayscounter span"
                          ).style.display = "none";
                        }}
                      />{" "}
                      <span className="bookdate-container-dayscounter-value">
                        {" "}
                        Days: <strong>{daysDifference}</strong>{" "}
                      </span>
                    </Form.Text>
                    {showDatePicker && (
                      <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={handleDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={(focused) =>
                          setFocusedInput(focused)
                        }
                        isOutsideRange={(day) => day.isBefore(moment(), "day")}
                        numberOfMonths={numberOfMonths}
                        daySize={daysize}
                      />
                    )}
                  </Form.Group>
                </div>
                <div className="cal-item">
                  <Form.Group className="quantity-item fl-wrap">
                    <Form.Label>Adults</Form.Label>
                    <div className="quantity">
                      <Form.Control
                        type="number"
                        min="0"
                        max="3"
                        step="1"
                        value={hotelDetails?.searchQuery?.roomInfo?.reduce((total, room) => total + room.numberOfAdults, 0) || 0}
                        onChange={handleAdultChange}
                        style={{width:"100%", textAlign:"center"}}
                      />
                      {/* <div className="quantity-nav">
                        <div className="quantity-button quantity-up">+</div>
                        <div className="quantity-button quantity-down">-</div>
                      </div> */}
                    </div>
                  </Form.Group>
                  <Form.Group className="quantity-item fl-wrap fcit">
                    <Form.Label>Children</Form.Label>
                    <div className="quantity">
                      <Form.Control
                        type="number"
                        min="0"
                        max="3"
                        step="1"
                        value={hotelDetails?.searchQuery?.roomInfo?.reduce((total, room) => total + room.numberOfChild, 0) || 0}
                        onChange={handleChildrenChange}
                        style={{width:"100%", textAlign:"center"}}
                      />
                      {/* <div className="quantity-nav">
                        <div className="quantity-button quantity-up">+</div>
                        <div className="quantity-button quantity-down">-</div>
                      </div> */}
                    </div>
                  </Form.Group>
                </div>
              </fieldset>
              <Form.Group className="total-coast fl-wrap">
                <strong>Total Cost</strong>
                <span>
                  $
                  <Form.Control
                    type="text"
                    readOnly
                    value={(hotelDetails?.searchQuery?.roomInfo?.reduce((total, room) => total + room.numberOfAdults, 0) || 0) * 81 + (hotelDetails?.searchQuery?.roomInfo?.reduce((total, room) => total + room.numberOfChild, 0) || 0) * 0.7 * 81}
                  />
                </span>
              </Form.Group>
              <Button
                className="btnaplly color2-bg book-btn"
                onClick={handleBookNow}>
                Book Now
                <FaPaperPlane />
              </Button>
            </Form>
          </div>
        </div>
        {/* Add other box-widget-items */}

        <div className="box-widget-item fl-wrap">
          <Card className="box-widget counter-widget">
            <div className="banner-widget fl-wrap">
              <div className="overlay"></div>
              <div
                className="bg"
                style={{
                  backgroundImage: "url('/Images/bg10.jpg')",
                }}
              />
              <div className="banner-wdget-content fl-wrap">
                <h4>
                  Get a discount <span>20%</span> when ordering a room from
                  three days.
                </h4>
                <div className="countdown fl-wrap">
                  <div className="countdown-item">
                    <span className="days rot">{days}</span>
                    <p>days</p>
                  </div>
                  <div className="countdown-item">
                    <span className="hours rot">{hours}</span>
                    <p>hours </p>
                  </div>
                  <div className="countdown-item">
                    <span className="minutes rot">{minutes}</span>
                    <p>minutes </p>
                  </div>
                  <div className="countdown-item">
                    <span className="seconds rot">{seconds}</span>
                    <p>seconds</p>
                  </div>
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <a href="#">Book Now</a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="box-widget-item fl-wrap">
          <div className="box-widget">
            <div className="box-widget-content">
              <div className="box-widget-item-header">
                <h3>Contact Information</h3>
                <FaCaretDown />
              </div>
              <div className="box-widget-list">
                <ul>
                  {/* <li>
                    <span>
                      <FaMapMarkerAlt /> Adress :
                    </span>
                    <a href="#">USA 27TH Brooklyn NY</a>
                  </li> */}
                  <li>
                    <span>
                      <FaPhone /> Phone :
                    </span>
                    <a href="#">{hotelDetails.hotel.cnt.ph}</a>
                  </li>
                  {hotelDetails.hotel.cnt.email && (<li>
                    <span>
                      <FaEnvelope /> Mail :
                    </span>
                    <a href="#">{hotelDetails.hotel.cnt.email}</a>
                  </li>)}
                  {/* <li>
                    <span>
                      <CgWebsite /> Website :
                    </span>
                    <a href="#">themeforest.net</a>
                  </li> */}
                </ul>
              </div>
              {/* <div className="list-widget-social">
                <ul>
                  <li>
                    <a href="#" target="_blank">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <FaVk />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>

        <div className="box-widget-item fl-wrap">
          <div className="box-widget">
            <div className="box-widget-content">
              <div className="box-widget-item-header">
                <h3>Price Range</h3>
                <FaCaretDown />
              </div>
              <div className="claim-price-widget fl-wrap">
                <div className="claim-price-widget-content fl-wrap">
                  <div className="pricerange fl-wrap">
                    <span>Price : </span> INR {minPrice} - INR {maxPrice}
                  </div>
                  {/* <div className="claim-widget-link fl-wrap">
                    <span>Own or work here?</span>
                    <a href="#">Claim Now!</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="box-widget-item fl-wrap">
          <div
            id="weather-widget"
            className="gradient-bg ideaboxWeather ow-border"
            style={{ width: "100%", background: "rgb(0, 102, 153)" }}>
            <div className="ow-today">
              <span>
                <img src="/Images/wimg3d.png" alt="Weather icon" />
              </span>
              <h2>
                4 ℃<span>Scattered clouds</span>
                <b>New York - Today</b>
              </h2>
            </div>
            <div className="ow-days">
              <span>Friday</span>
              <p>
                <img
                  src="/Images/wimg4d.png"
                  alt="Weather icon"
                  title="Broken clouds"
                />{" "}
                <b>4 ℃</b>
              </p>
            </div>
            <div className="ow-days">
              <span>Saturday</span>
              <p>
                <img
                  src="/Images/wimg10d.png"
                  alt="Weather icon"
                  title="Heavy intensity rain"
                />{" "}
                <b>11 ℃</b>
              </p>
            </div>
            <div className="ow-days">
              <span>Sunday</span>
              <p>
                <img
                  src="/Images/wimg3d.png"
                  alt="Weather icon"
                  title="Scattered clouds"
                />{" "}
                <b>8 ℃</b>
              </p>
            </div>
            <div className="ow-days">
              <span>Monday</span>
              <p>
                <img
                  src="/Images/wimg3d.png"
                  alt="Weather icon"
                  title="Scattered clouds"
                />{" "}
                <b>10 ℃</b>
              </p>
            </div>
            <div className="ow-days">
              <span>Tuesday</span>
              <p>
                <img
                  src="/Images/wimg3d.png"
                  alt="Weather icon"
                  title="Scattered clouds"
                />{" "}
                <b>9 ℃</b>
              </p>
            </div>
            <div className="ow-days">
              <span>Wednesday</span>
              <p>
                <img
                  src="/Images/wimg10d.png"
                  alt="Weather icon"
                  title="Light rain"
                />{" "}
                <b>8 ℃</b>
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="box-widget-item fl-wrap">
          <div className="box-widget widget-posts">
            <div className="box-widget-content">
              <div className="box-widget-item-header">
                <h3>Recommended Attractions</h3>
                <FaCaretDown />
              </div>
              <div className="box-image-widget">
                <div>
                  <div className="box-image-widget-media">
                    <img src="/Images/all4.jpg" alt="Times Square" />
                    <a href="#" className="color2-bg" target="_blank">
                      Details
                    </a>
                  </div>
                  <div className="box-image-widget-details">
                    <h4>
                      Times Square <span>2.3 km</span>
                    </h4>
                    <p>
                      It's impossible to miss the colossal billboards, glitzy
                      lights and massive crowds that make this intersection the
                      city's beating heart.
                    </p>
                  </div>
                </div>
              </div>
              <div className="box-image-widget">
                <div>
                  <div className="box-image-widget-media">
                    <img src="/Images/all5.jpg" alt="Broad Way" />
                    <a href="#" className="color2-bg" target="_blank">
                      Details
                    </a>
                  </div>
                  <div className="box-image-widget-details">
                    <h4>
                      Broad Way <span>1.7 km</span>
                    </h4>
                    <p>
                      Tap your feet to catchy ditties, hold back tears or bust
                      your gut laughing at a world renowned Broadway
                      performance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="box-image-widget">
                <div>
                  <div className="box-image-widget-media">
                    <img src="/Images/all6.jpg" alt="Grand Central station" />
                    <a href="#" className="color2-bg" target="_blank">
                      Details
                    </a>
                  </div>
                  <div className="box-image-widget-details">
                    <h4>
                      Grand Central Station <span>0.7 km</span>
                    </h4>
                    <p>
                      With its elegantly designed main concourse, this rail
                      station is much more than just a massive transport hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="box-widget-item fl-wrap">
          <div className="box-widget">
            <div className="box-widget-content">
              <div className="box-widget-item-header">
                <h3>Hosted By</h3>
                <FaCaretDown />
              </div>
              <div className="box-widget-author fl-wrap">
                <div className="box-widget-author-title fl-wrap">
                  <div className="box-widget-author-title-img">
                    <img src="/Images/avatar4.jpg" alt="Host Avatar" />
                  </div>
                  <div>
                    <a href="user-single.html">Jessie Manrty</a>
                    <span>4 Places Hosted</span>
                  </div>

                  <FiUserCheck className="author_verified" />
                </div>
                <Button
                  href="author-single.html"
                  className="btn flat-btn color-bg float-btn image-popup">
                  View Profile <FaUserAlt />
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="box-widget-item fl-wrap">
          <div className="box-widget">
            <div className="box-widget-content">
              <div className="box-widget-item-header">
                <h3>Similar Listings</h3>
                <FaCaretDown />
              </div>
              <div className="widget-posts fl-wrap">
                <ul>
                  <li className="clearfix">
                    <a href="#" className="widget-posts-img">
                      <img
                        src="/Images/gal3.jpg"
                        alt="Park Central"
                        className="respimg"
                      />
                    </a>
                    <div className="widget-posts-descr">
                      <a href="#" title="Park Central">
                        Park Central
                      </a>
                      <div
                        className="listing-rating card-popup-rainingvis"
                        data-starrating2="5">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="geodir-category-location fl-wrap">
                        <a href="#">
                          <FaMapMarkerAlt /> 40 JOURNAL SQUARE PLAZA, NJ, US
                        </a>
                      </div>
                      <span className="rooms-price">
                        $80 <strong> / Awg</strong>
                      </span>
                    </div>
                  </li>
                  <li className="clearfix">
                    <a href="#" className="widget-posts-img">
                      <img
                        src="/Images/gal1.jpg"
                        alt="Park Central"
                        className="respimg"
                      />
                    </a>
                    <div className="widget-posts-descr">
                      <a href="#" title="Park Central">
                        Holiday Home
                      </a>
                      <div
                        className="listing-rating card-popup-rainingvis"
                        data-starrating2="5">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="geodir-category-location fl-wrap">
                        <a href="#">
                          <FaMapMarkerAlt /> 75 PRINCE ST, NY, USA
                        </a>
                      </div>
                      <span className="rooms-price">
                        $50 <strong> / Awg</strong>
                      </span>
                    </div>
                  </li>
                  <li className="clearfix">
                    <a href="#" className="widget-posts-img">
                      <img
                        src="/Images/gal2.jpg"
                        alt="Park Central"
                        className="respimg"
                      />
                    </a>
                    <div className="widget-posts-descr">
                      <a href="#" title="Park Central">
                        Moonlight Hotel
                      </a>
                      <div
                        className="listing-rating card-popup-rainingvis"
                        data-starrating2="5">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <div className="geodir-category-location fl-wrap">
                        <a href="#">
                          <FaMapMarkerAlt /> 70 BRIGHT ST NEW YORK, USA
                        </a>
                      </div>
                      <span className="rooms-price">
                        $105 <strong> / Awg</strong>
                      </span>
                    </div>
                  </li>
                </ul>
                <a className="widget-posts-link" href="#">
                  See All Listing <FaLongArrowAltRight />
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HotelSidebar;
