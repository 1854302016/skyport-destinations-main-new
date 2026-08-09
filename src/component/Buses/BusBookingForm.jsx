import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import ./BusBookingForm.css'Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import "./BusBookingForm.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Spinner } from "react-bootstrap";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import moment from "moment";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import axios from "axios";
import { Autoplay, Pagination } from "swiper/modules";
import { AiOutlineSwap } from "react-icons/ai";
import WebOffer from "../Home/Home/WebOffer";
import WhyBookUsNew from "../Home/Home/WhyBookUsNew";
import MobileApp from "../Flight/FlightSearchMobile/MobileApp";


export const data = [
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_Hifive_0712.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/CTINT_RR_FLIGHTS_29052023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_LMD_H_3001.jpg",
  },
];

const bookusdata = [
  {
    img: "/Images/Icons/esy-flights.svg",
    head: "Easy Booking",
    desc: " Book Flights Easily and Grab Exciting Offers!",
  },
  {
    img: "/Images/Icons/down-arrows.svg",
    head: "Lowest Price",
    desc: "Guaranteed Low Rates on Hotels, Holiday Packages, and Flights",
  },
  {
    img: "/Images/Icons/return-boxs.svg",
    head: "Instant Refund",
    desc: "Get Quick and Easy Refunds on All Your Travel Bookings!",
  },
  {
    img: "/Images/Icons/24-hoursa.svg",
    head: "24/7 Support",
    desc: "24/7 Support for All Your Travel Queries — We're Here to Help!",
  },
  {
    img: "/Images/Icons/hot-sales.svg",
    head: "Exciting Deals",
    desc: "Unlock Exciting Deals on Flights, Hotels, Buses, Car Rentals, and Tours!",
  },
];

export var settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 1500,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
};


export const extractBracketValue = (str) => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  return match ? match[1] : null;
};

const BusBookingForm = () => {
  const [active2, setActive2] = useState(false);


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
      setDateRangeConfig(1, 40, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(1);
  };

  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);

  const isSameDay = (date1, date2) => date1.isSame(date2, "day");

  const renderDayContents = (day) => {
    // const fare = fares.find((item) => isSameDay(day, item.date));
    const isStartDate = startDate && isSameDay(day, startDate);
    const isEndDate = endDate && isSameDay(day, endDate);
    const isInRange =
      startDate && endDate && day.isBetween(startDate, endDate, "day", "[]");

    let classNames = ["DayPicker-Day"];
    if (isStartDate) classNames.push("DayPicker-Day--start");
    if (isEndDate) classNames.push("DayPicker-Day--end");
    if (isInRange) classNames.push("DayPicker-Day--range");

    return (
      <div className={classNames.join(" ")}>
        <span style={{ fontWeight: "600", fontSize: "13px" }}>
          {day.format("D")}
        </span>
        <br />
      </div>
    );
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

  const handleChange = () => {};
  const [clickDestination, SetClickDestination] = useState(false);
  const [clickDestination2, SetClickDestination2] = useState(false);



  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [searchedAirport, setSearchedAirport] = useState(
    "Source City"
  );
  const [searchedAirport2, setSearchedAirport2] = useState(
    "Destination City"
  );
  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CityName"]}`);
    setSearchedAirport(`${city["CityId"]}`);
    // setSelectedCityCode(city["AIRPORTCODE"]);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["CityName"]}`); // Clear the search input after selecting a city
    setIsItemSelected(true);
    setDestination1(city);
  };

  const [destinationCity2, setDestinationCity2] = useState("");
  const [selectedCityCode2, setSelectedCityCode2] = useState("");
  const handleCitySelect2 = (city) => {
    setDestinationCity2(`${city["CityName"]}`);
    // setSelectedCityCode2(city["AIRPORTCODE"]);
    setSearchedAirport2(`${city["CityId"]}`);
    SetClickDestination2(false); // Close the city suggestion div
    setSearchInput2(`${city["CityName"]}`); // Clear the search input after selecting a city
    setIsItemSelected2(true);
    setDestination2(city);
  };


  const [searchInput, setSearchInput] = useState("Delhi (DEL)");
  const [searchInput2, setSearchInput2] = useState("Mumbai (BOM)");
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);


const fetchDatas = async (value) => {
  const payload={
    city:value
  }
    const response = await axios.post("https://admin.skyportdestinations.com/api/Bus/City",payload);
    const json = response.data;

    const results = json.data
      .filter((user) => {
        return (
          user &&
          (
            (user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())) ||
            (user.CityId &&
              user.CityId.toString().toLowerCase().includes(value.toLowerCase()))
          )
        );
      })
      .map((user) => {
        let priority = 3;

        if (
          user.AIRPORTCODE &&
          user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 1;
        } else if (
          user.CityName &&
          user.CityName.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 2;
        } else if (
          user.COUNTRYNAME &&
          user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 3;
        }

        return { ...user, priority };
      })
      .sort((a, b) => a.priority - b.priority);
    console.log("RESULTS", results);
    setCities2(results);
};

  // const handleInputChange = (value) => {
  //   setSearchInput(value.toLowerCase());
  //   fetchDatas(value.toLowerCase());
  //   SetClickDestination(true);
  //   setIsItemSelected(false);
  // };

  const handleInputChange = (value) => {
  const lower = value.toLowerCase();
  setSearchInput(lower);
  SetClickDestination(true);
  setIsItemSelected(false);

  if (lower.length === 3) {
    fetchDatas(lower);  // Call only when length === 3
  } else {
    setCities2([]);     // Clear otherwise
  }
};



const fetchDatass = async (value) => {

    const payload={
    city:value
  }

    const response = await axios.post("https://admin.skyportdestinations.com/api/Bus/City", payload);
    const json = response.data;

    const results = json.data
      .filter((user) => {
        return (
          user &&
          ((user.CityName &&
            user.CityName.toLowerCase().includes(value.toLowerCase())) ||
            (user.CityId &&
              user.CityId.toLowerCase().includes(value.toLowerCase())))
        );
      })
      .map((user) => {
        let priority = 2;

        if (
          user.CityName &&
          user.CityName.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 1;
        } else if (
          user.CityId &&
          user.CityId.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 2;
        }

        return { ...user, priority };
      })
      .sort((a, b) => a.priority - b.priority);

    setCities22(results);
};


const handleInputChange2 = (value) => {
  const lower = value.toLowerCase();
  setSearchInput2(lower);
  SetClickDestination2(true);
  setIsItemSelected2(false);

  if (lower.length === 3) {
    fetchDatass(lower);  // Fetch only when input is exactly 3 characters
  } else {
    setCities22([]);     // Clear suggestions otherwise
  }
};


  // const handleInputChange2 = (value) => {
  //   setSearchInput2(value.toLowerCase());
  //   fetchDatass(value.toLowerCase());
  //   SetClickDestination2(true);
  //   setIsItemSelected2(false);
  // };


  useEffect(() => {
    localStorage.setItem(
      "walletData",
      JSON.stringify({
        Id: 91,
        Username: "AGN091",
        "Company Name": "Trip Navigate",
        "First Name": "Guruansh Singh",
        Email: "guruansh@holidaychacha.com",
        Phone: "9739504090",
        Wallet: "7200000",
        "Credit Limit": "0",
      })
    );
  }, []);

const [source, setSource] = useState("");
const [destination, setDestination] = useState("");
const [date, setDate] = useState("");

const navigate = useNavigate();


// const handleSourceSelect = (selectedCity) => {
//   setSource(selectedCity); // selectedCity = { CityId: "123", CityName: "Delhi" }
// };

const handleSourceSelect = (selectedCity) => {
  setSource(selectedCity); // make sure you're storing the full object
  setSearchInput(`${selectedCity.CityName}`);
  setSearchedAirport(`${selectedCity.CityName}, ${selectedCity.CountryName}`);
  setIsItemSelected(true);
  SetClickDestination(false);
};


const handleDestinationSelect = (selectedCity) => {
  setDestination(selectedCity);
  setSearchInput2(`${selectedCity.CityName}`);
  setSearchedAirport2(`${selectedCity.CityName}, ${selectedCity.CountryName}`);
  setIsItemSelected2(true);
  SetClickDestination2(false);
};


const handleSearch = () => {
  // if (!source.CityId || !destination.CityId || !date) {
  //   alert("Please select source, destination and journey date");
  //   return;
  // }

  const query = `?from=${encodeURIComponent(source.CityName)}&to=${encodeURIComponent(destination.CityName)}&cityId=${source.CityId}&desId=${destination.CityId}&journeyDate=${date}`;
  navigate(`/buslisting${query}`);
};



  return (
    <div
      className="bookimg_form_containerrr">
      <div style={{ position: "relative" }}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 50000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{ height: "300px" }}
        >
          <SwiperSlide>
            <div
              className="backgroundBanner banner banner-image"
              style={{
                backgroundImage:
                  'url("https://www.keralatourism.org/images/caravan-tourism/book-trip/large/gokulam-caravan/02.webp")',
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              data-v-0b3b4b19=""
              data-v-b9cf504c=""
            >
              <div
                className="overlay"
                style={{ backgroundColor: "#05335536", opacity: "0.5" }}
              ></div>

              <img
                src="/Images/dream-feather-bg.png"
                alt="img-mark"
                className="img-mark"
                data-v-0b3b4b19=""
              />
              <h1 className="description" data-v-0b3b4b19="">
                <div>Search flights</div>
                <div>Smooth Flight Booking, Unbeatable Low Prices</div>
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="backgroundBanner banner banner-image"
              style={{
                backgroundImage:
                  'url("https://www.keralatourism.org/images/caravan-tourism/book-trip/large/gokulam-caravan/02.webp")',
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              data-v-0b3b4b19=""
              data-v-b9cf504c=""
            >
              <div
                className="overlay"
                style={{ backgroundColor: "#190a0a", opacity: "0.5" }}
              ></div>

              <img
                src="/Images/dream-feather-bg.png"
                alt="img-mark"
                className="img-mark"
                data-v-0b3b4b19=""
              />
              <h1 className="description" data-v-0b3b4b19="">
                <div>Unlock Exclusive Flight Offers</div>
                <div>Hotel Discounts, and Business Travel Solutions Today</div>
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="backgroundBanner banner banner-image"
              style={{
                backgroundImage:
                  'url("https://www.keralatourism.org/images/caravan-tourism/book-trip/large/gokulam-caravan/02.webp")',
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              data-v-0b3b4b19=""
              data-v-b9cf504c=""
            >
              <div
                className="overlay"
                style={{ backgroundColor: "#190a0a", opacity: "0.5" }}
              ></div>

              <img
                src="/Images/dream-feather-bg.png"
                alt="img-mark"
                className="img-mark"
                data-v-0b3b4b19=""
              />
              <h1 className="description" data-v-0b3b4b19="">
                <div>Experience Hassle-Free Bookings</div>
                <div>Luxury Travel, and Unmatched Service Only on TripGo</div>
              </h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Container>
        <div className="flightWidgetSection appendBottom40">
          <div className="searchWidgetContainer">
            <form
              data-cy="flightSW"
              className="fltWidgetSection appendBottom40 primaryTraveler busSearchForm"
            >
              <div className="makeFlex hrtlCenter">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "455px",
                  }}
                ></div>
              </div>
              <div className="fsw ">
                <div className="fsw_inner returnPersuasion">
                  <div
                    className="flt_fsw_inputBox searchCity inactiveWidget "
                    style={{ width: "392px" }}
                  >
                    <label htmlFor="fromCity">
                      <span className="lbl_input appendBottom10">From</span>
<input
  data-cy="fromCity"
  id="fromCity"
  type="text"
  className="fsw_inputField lineHeight36 latoBlack font30"
  value={searchInput}
  onFocus={() => {
    setSearchInput("");
    setSearchedAirport("");
    SetClickDestination(true);
  }}
  onBlur={() => {
    if (isItemSelected) SetClickDestination(false);
  }}
  onChange={(e) => handleInputChange(e.target.value)}
/>

                      <p
                        className="code makeRelative"
                        title="DEL, Delhi Airport India"
                      >
                        <span
                          data-cy="defaultFromValue"
                          title=""
                          className="truncate airPortName "
                        >
                          {searchedAirport}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div
                        className="cityselect"
                        style={{
                          position: "absolute",
                          color: "black",
                          backgroundColor: "white",

                          border: "1px solid #cdcdcd",
                          display:
                            searchInput && clickDestination ? "block" : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-42px",
                          maxHeight: 300,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
{cities2.length !== 0 ? (
  <>
    {cities2.map((city, index) => (
      <div
        role="option"
        id={`react-autowhatever-1-section-0-item-${index}`}
        aria-selected="false"
        className={`react-autosuggest__suggestion ${
          index === 0 ? "react-autosuggest__suggestion--first" : ""
        }`}
        key={index}
        onClick={() => handleSourceSelect(city)}
      >
        <div className="makeFlex">
          <img
            className="icLocAlt appendRight8-bookings_form"
            src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png"
            alt="icon"
          />
          <div className="makeFlex flexOne column">
            <div className="makeFlex flexOne spaceBetween">
              <div className="makeFlex flexOne spaceBetween appendRight10">
                <div className="makeFlex column flexOne appendRight10">
                  <p className="font_search_bookingss appendBottom5 blackText">
                    {city.CityName}
                  </p>
                  <p className="lightGreyText font12">{city.CountryName}</p>
                </div>
              </div>
              <div className="font14 lightGreyText latoBold">
                {city.CityId}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
) : (
  <div
    style={{
      padding: "10px 5px",
      fontSize: "12px",
      textAlign: "center",
      margin: "auto",
      width: "100%",
    }}
  >
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />{" "}
    Please wait we are fetching city list...
  </div>
)}


                      </div>
                    </div>
                    <span className="fltSwipCircle">
                      <AiOutlineSwap color="#f73030" size={20} />
                      {/* <span className="flightsSprite fltSwipIcon" /> */}
                    </span>
                  </div>

                  <div
                    className="flt_fsw_inputBox searchToCity inactiveWidget busSearchForm-ToCity"
                    style={{ width: "392px" }}
                  >
                    <label htmlFor="toCity">
                      <span className="lbl_input appendBottom10">To</span>
<input
  data-cy="toCity"
  id="toCity"
  type="text"
  className="fsw_inputField lineHeight36 latoBlack font30"
  readOnly=""
  value={searchInput2}
  onFocus={() => {
    setSearchInput2("");
    setSearchedAirport2("");
    SetClickDestination2(true);
  }}
  onBlur={() => {
    if (isItemSelected2) SetClickDestination2(false);
  }}
  onChange={(e) => handleInputChange2(e.target.value)}
/>

                      <p
                        className="code makeRelative"
                        title="BOM, Chhatrapati Shivaji International Airport India"
                      >
                        <span
                          data-cy="defaultToValue"
                          title=""
                          className="truncate airPortName "
                        >
                          {searchedAirport2}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div
                        className="cityselect"
                        style={{
                          position: "absolute",
                          color: "black",
                          backgroundColor: "white",

                          border: "1px solid #cdcdcd",
                          display:
                            searchInput2 && clickDestination2
                              ? "block"
                              : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-42px",
                          maxHeight: 300,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
{cities22.length !== 0 ? (
  <>
    {cities22.map((city, index) => (
      <div
        role="option"
        id={`react-autowhatever-1-section-1-item-${index}`}
        aria-selected="false"
        className={`react-autosuggest__suggestion ${
          index === 0 ? "react-autosuggest__suggestion--first" : ""
        }`}
        key={index}
        onClick={() => handleDestinationSelect(city)}
      >
        <div className="makeFlex">
          <img
            className="icLocAlt appendRight8-bookings_form"
            src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png"
            alt="icon"
          />
          <div className="makeFlex flexOne column">
            <div className="makeFlex flexOne spaceBetween">
              <div className="makeFlex flexOne spaceBetween appendRight10">
                <div className="makeFlex column flexOne appendRight10">
                  <p className="font_search_bookingss appendBottom5 blackText">
                    {city.CityName}
                  </p>
                  <p className="lightGreyText font12">{city.CountryName}</p>
                </div>
              </div>
              <div className="font14 lightGreyText latoBold">
                {city.CityId}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
) : (
  <div
    style={{
      padding: "10px 5px",
      fontSize: "12px",
      textAlign: "center",
      margin: "auto",
      width: "100%",
    }}
  >
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />{" "}
    Please wait we are fetching city list...
  </div>
)}


                      </div>
                    </div>
                  </div>
                  <div className="flt_fsw_inputBox dates inactiveWidget busSearchForm-Date">
                    <label htmlFor="departure">
                      <span className="lbl_input appendBottom10">
                        Date
                      </span>
                      <input
                        data-cy="departure"
                        id="departure"
                        type="text"
                        className="fsw_inputField font20"
                        defaultValue="Monday, 3 Jun 2024"
                        onChange={handleChange}
                        value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                        readOnly
                        onClick={toggleCalendar}
                      />
                      <p
                        data-cy="departureDate"
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="font30 latoBlack">
                          {startDate ? startDate.format("D") : "--"}{" "}
                        </span>
                        <span>
                          {startDate ? startDate.format("MMM") : "Month"}
                        </span>
                        <span className="shortYear">
                          {startDate ? startDate.format("YY") : ""}
                        </span>
                      </p>
                      <p data-cy="departureDay" className="code ">
                        {startDate ? startDate.format("dddd") : "Select a date"}
                      </p>
                    </label>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "2000",
                      }}
                    >
                      {active2
                        ? calVisible && (
                            <DayPickerRangeController
                              startDate={startDate}
                              endDate={endDate}
                              onDatesChange={handleDatesChange}
                              isOutsideRange={(day) =>
                                day.isBefore(moment(), "day")
                              }
                              focusedInput={focusedInput}
                              onFocusChange={(focused) =>
                                setFocusedInput(focused)
                              }
                              renderDayContents={renderDayContents}
                              numberOfMonths={numberOfMonths}
                            />
                          )
                        : calVisible && (
                            <DayPickerRangeController
                              startDate={startDate}
                              endDate={null}
                              onDatesChange={({ startDate }) => {
                                setStartDate(startDate);
                                setDate(startDate.format("YYYY-MM-DD"));
                                setCalVisible(false);
                              }}
                              isOutsideRange={(day) =>
                                day.isBefore(moment(), "day")
                              }
                              focusedInput={focusedInput}
                              onFocusChange={(focused) => {
                                if (focused) setFocusedInput("startDate");
                              }}
                              renderDayContents={renderDayContents}
                              numberOfMonths={numberOfMonths}
                            />
                          )}
                    </div>
                  </div>

                  <div className="flt_fsw_inputBox dates reDates inactiveWidget search_flight_bookingsss ">
  <button onClick={handleSearch} className="mat-stroked-button">
    Search Bus
  </button>
</div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <WebOffer />
      <WhyBookUsNew bookusdata={bookusdata} />
      <MobileApp
        backgroundImage="https://www.keralatourism.org/images/caravan-tourism/book-trip/large/gokulam-caravan/02.webp"
        title="Download Our Mobile App"
        description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
      />
    </div>
  );
};

export default BusBookingForm;
