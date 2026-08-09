import React, { useEffect, useState } from "react";
import "./HotelSearch.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { services, nationalityOptions } from "./HotelSearchData";
import HotelsContainer from "./HotelComponent";
import RecentSearch from "./RecentSearch";
import Sidebar from "./Sidebar";
import RightBar from "./RightBar";
import { FaCity } from "react-icons/fa";
import WhyUs from "../../Home/Home/WhyUs";
import SliderCodeReuse from "../../Home/Home/SliderCodeReuse";
import HolidayPackages from "../../Home/Home/HolidayPackage";
import SliderCode from "../../Home/Home/SliderCode";
import ReasonsToBook from "../../Home/Home/ReasonToBook";
import HeroCarousel from "../../Home/HeroCarousel";
import RecentHotelBookings from "./RecentHotelBookings";

const HotelSearch = () => {
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childrenAges: [] },
  ]);
  const [labelClicked, setLabelClicked] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [daysize, setDaySize] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);
  const [clickDestination, SetClickDestination] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    nationality: "",
  });

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
      setDateRangeConfig(1, 30, 30);
    } else if (isMediumScreen) {
      setDateRangeConfig(2, 30, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
    setDaySize(daysize);
  };

  const addRoom = () => {
    if (rooms.length < 6) {
      setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
    }
  };

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    if (field === "children") {
      updatedRooms[index].childrenAges = Array(value).fill(null); // Reset children ages
    }
    setRooms(updatedRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = age;
    setRooms(updatedRooms);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null);
      setCalVisible(false);
    } else if (startDate) {
      setFocusedInput("endDate");
    }
  };

  const toggleCalendar = (input) => {
    setCalVisible(!calVisible);
    if (!calVisible) {
      if (input === "startDate") {
        setFocusedInput("startDate");
      } else if (input === "endDate") {
        setFocusedInput("endDate");
      } else {
        setCalVisible(!calVisible);
        if (!calVisible) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCityId || !startDate || !endDate || !formData.nationality) {
      alert(
        `Please fill out all fields ${selectedCityId} ${startDate} ${endDate} ${formData.nationality}`
      );
      return;
    }
    const formDataToPass = {
      ...formData,
      from: selectedCityId,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: JSON.stringify(rooms), // Convert rooms array to JSON string
    };

    console.log("form data filled", {
      ...formData,
      from: selectedCityId,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: rooms,
    });

    const queryString = new URLSearchParams(formDataToPass).toString();
    navigate(`/hotellist?${queryString}`);
  };

  const handleInputChange = (value) => {
    setSearchInput(value.toLowerCase());
    fetchDatas(value.toLowerCase());
    SetClickDestination(true);
    setIsItemSelected(false);
  };

  const [searchInput, setSearchInput] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [cities2, setCities2] = useState([]);
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [destination1, setDestination1] = useState("");

  const handleCitySelect = (city) => {
    setDestinationCity(`${city["cityName"]}`);
    setSelectedCityId(city["id"]);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["cityName"]} (${city["countryName"]})`);
    setIsItemSelected(true);
    setDestination1(city);
  };

  const fetchDatas = (value) => {
    fetch("https://admin.skyportdestinations.com/api/hotelTJ/city_static_data")
      .then((response) => response.json())
      .then((json) => {
        console.log("json responseee", json);
        const results = json.data.response.cil
          .filter((user) => {
            return (
              user &&
              ((user.cityName &&
                user.cityName.toLowerCase().includes(value.toLowerCase())) ||
                (user.countryName &&
                  user.countryName
                    .toLowerCase()
                    .includes(value.toLowerCase())) ||
                (user.fullRegionName &&
                  user.fullRegionName
                    .toLowerCase()
                    .includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.cityName &&
              user.cityName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1;
            } else if (
              user.countryName &&
              user.countryName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2;
            } else if (
              user.fullRegionName &&
              user.fullRegionName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 3;
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        console.log("RESULTS", results);
        setCities2(results);
      });
  };

  return (
    <>
      <div className="hotel_page">
        <video autoPlay loop muted className="video_banner_tagsss">
          <source
            src="https://videos.pexels.com/video-files/17362430/17362430-uhd_2560_1440_30fps.mp4"
            // src="https://videos.pexels.com/video-files/17404327/17404327-uhd_2560_1440_24fps.mp4"
            // src="https://videos.pexels.com/video-files/19666957/19666957-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* <RecentSearch /> */}
        <Container>
          <div className="flight_booking_inner_div_div">
            <Row>
              {/* <Sidebar /> */}

              <Col md={7}>
                <div className="mainFlightCont">
                  <div className="flightCont">
                    <div>
                      <h4
                        style={{
                          fontSize: "22px",
                          marginBottom: "10px",
                          textTransform: "uppercase",
                          fontWeight: "700",
                          color: "#f73030",
                        }}
                      >
                        Search Hotels
                      </h4>
                    </div>
                    <div>
                      <div>
                        <Form onSubmit={handleSubmit}>
                          <div className="flightBookingFrom">
                            <div className="flightBookingFromDiv">
                              {" "}
                              <div style={{ fontWeight: "600" }}>From</div>
                              <input
                                type="text"
                                name="from"
                                placeholder="Enter Locality, Landmark, City or Hotel"
                                className="flightBookingFromInputs1 "
                                // onChange={handleChange}
                                onChange={(e) =>
                                  handleInputChange(e.target.value)
                                }
                                required
                                autoComplete="off"
                                // onClick={() =>
                                //   SetClickDestination(!clickDestination)
                                // }
                                value={searchInput}
                                onFocus={() => SetClickDestination(true)}
                                onBlur={() => {
                                  if (isItemSelected)
                                    SetClickDestination(false);
                                }}
                              />
                              <div style={{ position: "relative" }}>
                                <div
                                  className="cityselect"
                                  style={{
                                    position: "absolute",
                                    color: "black",
                                    backgroundColor: "white",
                                    padding: "10px",
                                    border: "1px solid black",
                                    display: clickDestination
                                      ? "block"
                                      : "none",
                                    width: "100%",
                                    zIndex: 9,
                                    top: "-18px",
                                    maxHeight: 300,
                                    overflow: "auto",
                                    scrollbarWidth: "thin",
                                  }}
                                >
                                  {cities2.map((city, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        borderBottom: "1px solid grey",
                                        paddingBottom: 5,
                                        marginBottom: 5,
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleCitySelect(city)}
                                    >
                                      <Row>
                                        <Col
                                          md={1}
                                          style={{ alignItems: "center" }}
                                        >
                                          <FaCity
                                            size={22}
                                            style={{
                                              textAlign: "center",
                                              height: "100%",
                                              color: "#2d3290",
                                            }}
                                          />
                                        </Col>
                                        <Col md={11}>
                                          <Row>
                                            <div
                                              className="flightFromName"
                                              style={{
                                                color: "#2d3290",
                                                fontWeight: 600,
                                              }}
                                            >
                                              {city["cityName"]}
                                              {/* ({city["AIRPORTCODE"]}) */}
                                            </div>
                                          </Row>
                                          <Row style={{ color: "grey" }}>
                                            <Col
                                              md={10}
                                              style={{ paddingRight: 0 }}
                                            >
                                              <div
                                                className="flightFromNameInner"
                                                style={{
                                                  fontSize: 10,
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {city["fullRegionName"]}
                                              </div>
                                            </Col>
                                            <Col
                                              md={2}
                                              style={{ paddingLeft: 0 }}
                                            >
                                              <div
                                                style={{
                                                  textAlign: "center",
                                                  fontWeight: "700",
                                                  fontSize: 10,
                                                }}
                                              >
                                                {city["countryName"]}
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col>
                              <div>
                                {" "}
                                <div style={{ fontWeight: "600" }}>
                                  {" "}
                                  Check-In Date
                                </div>
                                <input
                                  type="text"
                                  name="departureDate"
                                  id="departureDateInput"
                                  className="dateInput flightBookingFromInput"
                                  placeholder="Enter Check-In Date"
                                  onChange={handleChange}
                                  value={
                                    startDate
                                      ? startDate.format("MM/DD/YYYY")
                                      : ""
                                  }
                                  readOnly
                                  required
                                  onClick={toggleCalendar}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: "2000",
                                  }}
                                >
                                  {calVisible && (
                                    <DayPickerRangeController
                                      startDate={startDate}
                                      endDate={endDate}
                                      onDatesChange={handleDatesChange}
                                      focusedInput={focusedInput}
                                      onFocusChange={(focused) =>
                                        setFocusedInput(focused)
                                      }
                                      isOutsideRange={(day) =>
                                        day.isBefore(moment(), "day")
                                      } // Disable days before today
                                      // renderDayContents={renderDayContents}
                                      numberOfMonths={numberOfMonths} // Allow selecting a range of dates when active2 is true
                                      daySize={daysize}
                                    />
                                  )}
                                </div>
                                {/* <div>
                                {cal === true ? (
                                  <Calender active2={active2} />
                                ) : (
                                  ""
                                )}
                              </div> */}
                              </div>
                            </Col>
                            {/* {active2 === true ? ( */}

                            <Col>
                              <div style={{ fontWeight: "600" }}>
                                {" "}
                                <div>Check-Out Date</div>
                                <input
                                  type="text"
                                  id="returnDateInput"
                                  name="returnDate"
                                  className="dateInput flightBookingFromInput"
                                  placeholder="Enter Check-Out Date"
                                  onChange={handleChange}
                                  value={
                                    endDate ? endDate.format("MM/DD/YYYY") : ""
                                  }
                                  readOnly
                                  required
                                  onClick={() => {
                                    toggleCalendar("endDate");
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div style={{ position: "relative" }}>
                                {" "}
                                <div style={{ fontWeight: "600" }}>
                                  Travellers
                                </div>
                                <input
                                  type="text"
                                  placeholder={`${rooms.reduce(
                                    (total, room) =>
                                      total + room.adults + room.children,
                                    0
                                  )} Persons in ${rooms.length} ${
                                    rooms.length === 1 ? "Room" : "Rooms"
                                  }`}
                                  className="flightBookingFromInput"
                                  onClick={() => setLabelClicked(!labelClicked)}
                                  readOnly
                                >
                                  {/* <option value="">0 Traveller</option> */}
                                </input>
                                <div
                                  className="onlytraveller normaltraveller"
                                  style={{
                                    display: labelClicked ? "block" : "none",
                                    maxHeight: "460px",
                                    overflow: "auto",
                                    scrollbarWidth: "thin",
                                  }}
                                >
                                  <ul className="traveller_list">
                                    {rooms.map((room, index) => (
                                      <li>
                                        <div className="list-persons-count">
                                          <div id="roomshtml">
                                            <div
                                              className="box"
                                              key={`divroom${index + 1}`}
                                              id={`divroom${index + 1}`}
                                            >
                                              <div className="roomTxt">
                                                <span>Room {index + 1}:</span>
                                              </div>
                                              <div className="left pull-left">
                                                <span className="txt">
                                                  <span id="Label7">
                                                    Adult{" "}
                                                    <em>(Above 12 years)</em>
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="right pull-right">
                                                <div
                                                  id="field1"
                                                  className="PlusMinusRow"
                                                >
                                                  <Link
                                                    type="button"
                                                    id="Adults_room_1_1_minus"
                                                    className="sub hoteladultclass"
                                                    onClick={() =>
                                                      updateRoom(
                                                        index,
                                                        "adults",
                                                        Math.max(
                                                          room.adults - 1,
                                                          1
                                                        )
                                                      )
                                                    }
                                                  >
                                                    -
                                                  </Link>
                                                  <span
                                                    id="Adults_room_1_1"
                                                    className="PlusMinus_number"
                                                  >
                                                    {room.adults}
                                                  </span>
                                                  <Link
                                                    type="button"
                                                    id="Adults_room_1_1_plus"
                                                    className="add hoteladultclass"
                                                    onClick={() =>
                                                      updateRoom(
                                                        index,
                                                        "adults",
                                                        Math.min(
                                                          room.adults + 1,
                                                          6
                                                        )
                                                      )
                                                    }
                                                  >
                                                    +
                                                  </Link>
                                                </div>
                                              </div>
                                              <div className="spacer"></div>
                                              <div className="left pull-left">
                                                <span className="txt">
                                                  <span id="Label9">
                                                    Child{" "}
                                                    <em>(Below 12 years)</em>
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="right pull-right">
                                                <div
                                                  id="field2"
                                                  className="PlusMinusRow"
                                                >
                                                  <Link
                                                    type="button"
                                                    id="Children_room_1_1_minus"
                                                    className="sub hotelchildclass"
                                                    onClick={() =>
                                                      updateRoom(
                                                        index,
                                                        "children",
                                                        Math.max(
                                                          room.children - 1,
                                                          0
                                                        )
                                                      )
                                                    }
                                                  >
                                                    -
                                                  </Link>
                                                  <span
                                                    id="Children_room_1_1"
                                                    className="PlusMinus_number"
                                                  >
                                                    {room.children}
                                                  </span>
                                                  <Link
                                                    type="button"
                                                    id="Children_room_1_1_plus"
                                                    className="add hotelchildclass"
                                                    onClick={() =>
                                                      updateRoom(
                                                        index,
                                                        "children",
                                                        Math.min(
                                                          room.children + 1,
                                                          6
                                                        )
                                                      )
                                                    }
                                                  >
                                                    +
                                                  </Link>
                                                </div>
                                              </div>

                                              <div className="clear"></div>
                                              {room.children > 0 && (
                                                <div className="childresAgeTxt">
                                                  Age(s) of Children
                                                </div>
                                              )}
                                              {room.childrenAges.map(
                                                (age, childIndex) => (
                                                  <select
                                                    key={childIndex}
                                                    value={age || ""}
                                                    onChange={(e) =>
                                                      updateChildAge(
                                                        index,
                                                        childIndex,
                                                        e.target.value
                                                      )
                                                    }
                                                  >
                                                    <option value="">
                                                      Age
                                                    </option>
                                                    {[...Array(12)].map(
                                                      (age, index) => (
                                                        <option
                                                          key={index + 1}
                                                          value={age}
                                                        >
                                                          {index + 1}
                                                        </option>
                                                      )
                                                    )}
                                                  </select>
                                                )
                                              )}
                                              <div className="clear"></div>
                                            </div>
                                          </div>

                                          <Link
                                            id="addhotelRoom"
                                            to="#"
                                            className="cus_add_remove_btn addroom"
                                            style={{
                                              display:
                                                index === rooms.length - 1
                                                  ? "inline-block"
                                                  : "none",
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              addRoom();
                                            }}
                                          >
                                            Add Room
                                          </Link>
                                          <Link
                                            id="removehotelRoom"
                                            to="#"
                                            className="cus_add_remove_btn removeroom"
                                            style={{
                                              display:
                                                rooms.length > 1
                                                  ? "inline-block"
                                                  : "none",
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              removeRoom(index);
                                            }}
                                          >
                                            Remove Room
                                          </Link>
                                          <Link
                                            className="apply_btn"
                                            style={{
                                              display:
                                                index === rooms.length - 1
                                                  ? "inline-block"
                                                  : "none",
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setLabelClicked(false); // Hide the onlytraveller or normaltraveller div
                                            }}
                                          >
                                            Done
                                          </Link>

                                          <input
                                            type="hidden"
                                            id="hdnroom"
                                            value="1"
                                          />
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div>
                                {" "}
                                <div style={{ fontWeight: "600" }}>
                                  Select Nationality
                                </div>
                                <Form.Control
                                  as="select"
                                  style={{
                                    padding: "13px 10px",
                                    width: "100%",
                                    color: "#2d3290",
                                    border: "0.1px solid",
                                    borderRadius: "5px",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                    fontSize: "unset",
                                    lineHeight: "unset",
                                    height: "unset",
                                  }}
                                  name="nationality"
                                  value={formData.nationality}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Select Nationality</option>
                                  {nationalityOptions.map((option, index) => (
                                    <option
                                      key={index}
                                      value={option.countryid}
                                    >
                                      {option.countryname}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </Col>
                            {/* </div> */}
                          </Row>
                          <Row
                            style={{
                              justifyContent: "end",
                              paddingRight: "10px",
                            }}
                          >
                            <button
                              type="submit"
                              className="flightBookingBtn"
                              style={{ width: "200px", marginTop: "10px" }}
                            >
                              Search Hotels
                            </button>
                          </Row>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={5}>
                {/* <Col><HeroCarousel /></Col> */}
                <Col>
                  <RecentHotelBookings />
                </Col>
              </Col>

              {/* <RightBar /> */}
            </Row>
          </div>
        </Container>
      </div>

      <ReasonsToBook />
      {/* <FlightDeal /> */}
      {/* <WhyChoose /> */}
      <HotelsContainer />
      <Container>
        {/* <WhyUs /> */}
        {/* <ReasonsToBook /> */}
        {/* <SliderCode /> */}
        {/* <HolidayPackages /> */}
        {/* <section id="services_sec" className="section-flat custom_service">
        <div className="section-content">
          <Container>
            <Row>
              {services.map((service, index) => (
                <Col key={index} sm={2} className="box_col_5">
                  <Card className="box-info box-service-1">
                    <div className="box-icon">
                      <Card.Img variant="top" src={service.imageUrl} />
                    </div>
                    <Card.Body className="box-content">
                      <Card.Title>
                        <Link>{service.title}</Link>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </section> */}
      </Container>
    </>
  );
};

export default HotelSearch;
