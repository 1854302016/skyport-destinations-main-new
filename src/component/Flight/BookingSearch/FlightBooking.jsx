import React, { useEffect, useState } from "react";
import "./FlightBooking.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
import { FaHotel, FaSuitcaseRolling, FaWallet } from "react-icons/fa";
import moment from "moment";
import { BiSolidOffer } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Slider from "react-slick";
import "./gdvfdty.css";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { CountriesArray } from "../FlightSearchMobile/Countries";
// import { cities2 } from "./Cities";
import RecentSearch from "./RecentSearch";
import SidePanel from "./SidePanel";
import WalletOffer from "./WalletOffer";
import axios from "axios";
import { CountriesArray } from "./CountriesArray";
import HeroCarousel from "../../Home/HeroCarousel";
import RecentBookings from "../../Home/RecentBookings";
// import { useDispatch } from "react-redux";
// import { flightSearch } from "../../../redux/services/operations/flight";

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

export var settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 1500,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const fares = [
  { date: "2024-05-01", fare: "$200" },
  { date: "2024-05-02", fare: "$220" },
  { date: "2024-05-03", fare: "$240" },
  { date: "2024-05-04", fare: "$230" },
  { date: "2024-05-05", fare: "$250" },
  { date: "2024-05-06", fare: "$260" },
  { date: "2024-05-07", fare: "$270" },
  { date: "2024-05-08", fare: "$280" },
  { date: "2024-05-09", fare: "$290" },
  { date: "2024-05-10", fare: "$300" },
  { date: "2024-05-11", fare: "$310" },
  { date: "2024-05-12", fare: "$320" },
  { date: "2024-05-13", fare: "$330" },
  { date: "2024-05-14", fare: "$340" },
  { date: "2024-05-15", fare: "$350" },
  { date: "2024-05-16", fare: "$360" },
  { date: "2024-05-17", fare: "$370" },
  { date: "2024-05-18", fare: "$380" },
  { date: "2024-05-19", fare: "$390" },
  { date: "2024-05-20", fare: "$400" },
  { date: "2024-05-21", fare: "$410" },
  { date: "2024-05-22", fare: "$420" },
  { date: "2024-05-23", fare: "$430" },
  { date: "2024-05-24", fare: "$440" },
  { date: "2024-05-25", fare: "$450" },
  { date: "2024-05-26", fare: "$460" },
  { date: "2024-05-27", fare: "$470" },
  { date: "2024-05-28", fare: "$480" },
  { date: "2024-05-29", fare: "$490" },
  { date: "2024-05-30", fare: "$500" },
  { date: "2024-05-31", fare: "$510" },

  { date: "2024-04-01", fare: "$520" },
  { date: "2024-04-02", fare: "$530" },
  { date: "2024-04-03", fare: "$540" },
  { date: "2024-04-04", fare: "$550" },
  { date: "2024-04-05", fare: "$560" },
  { date: "2024-04-06", fare: "$570" },
  { date: "2024-04-07", fare: "$580" },
  { date: "2024-04-08", fare: "$590" },
  { date: "2024-04-09", fare: "$600" },
  { date: "2024-04-10", fare: "$610" },
  { date: "2024-04-11", fare: "$620" },
  { date: "2024-04-12", fare: "$630" },
  { date: "2024-04-13", fare: "$640" },
  { date: "2024-04-14", fare: "$650" },
  { date: "2024-04-15", fare: "$660" },
  { date: "2024-04-16", fare: "$670" },
  { date: "2024-04-17", fare: "$680" },
  { date: "2024-04-18", fare: "$690" },
  { date: "2024-04-19", fare: "$700" },
  { date: "2024-04-20", fare: "$710" },
  { date: "2024-04-21", fare: "$720" },
  { date: "2024-04-22", fare: "$730" },
  { date: "2024-04-23", fare: "$740" },
  { date: "2024-04-24", fare: "$750" },
  { date: "2024-04-25", fare: "$760" },
  { date: "2024-04-26", fare: "$770" },
  { date: "2024-04-27", fare: "$780" },
  { date: "2024-04-28", fare: "$790" },
  { date: "2024-04-29", fare: "$800" },
  { date: "2024-04-30", fare: "$810" },
];

export const extractBracketValue = (str) => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  return match ? match[1] : null;
};

const FlightBooking = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

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
    // getExchangeRate()
  }, []);

  const handleChnageCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      const convertedValue = amount * exchangeRate;
      return convertedValue.toFixed(2);
    }
  };
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [labelClicked, setLabelClicked] = useState(false);

  const handleSearchFlight = () => {
    setActive(true);
    setActive2(false);
    setActive3(false);
    setEndDate(null);
  };
  const handleSearchFlightRound = () => {
    setActive2(true);
    setActive(false);
    setActive3(false);
  };
  const handleSearchFlightMultiPle = () => {
    setActive3(true);
    setActive(false);
    setActive2(false);
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
      setDateRangeConfig(1, 30, 30);
    } else if (isMediumScreen) {
      setDateRangeConfig(1, 40, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
  };

  const [numberOfMonths, setNumberOfMonths] = useState(2);

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const [startDate, setStartDate] = useState(null);
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cabinMapping = {
      Economy: 2,
      First: 6,
      Business: 4,
      PremiumEconomy: 3,
    };

    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };

    const cabin = cabinMapping[event.target.cabinClass.value];
    const tripType = tripTypeMapping[active ? "OneWay" : "RoundTrip"];

    const SearchData = {
      EndUserIp: "192.168.10.10",
      TokenId: "4ba5b7e1-12c2-429c-b427-f8128bf5b157",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      Segments: [
        {
          Origin: extractBracketValue(event.target.from.value),
          Destination: extractBracketValue(event.target.to.value),
          FlightCabinClass: cabin,
          PreferredDepartureTime:
            startDate && startDate.startOf("day").format("YYYY-MM-DD"),
          PreferredArrivalTime: endDate
            ? endDate && endDate.startOf("day").format("YYYY-MM-DD")
            : startDate && startDate.startOf("day").format("YYYY-MM-DD"),
        },
      ],
    };

    if (
      SearchData.Segments[0].Destination === null ||
      SearchData.Segments[0].Origin === null ||
      SearchData.Segments[0].PreferredDepartureTime === null
    ) {
      alert("Missing Search Data.");
    } else {
      if (active) {
        window.location.assign(
          `/flightList/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
      }

      if (active2) {
        if (destination1.COUNTRYCODE !== destination2.COUNTRYCODE) {
          window.location.assign(
            `/international-round/${encodeURIComponent(
              `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
            )}`
          );
        } else {
          window.location.assign(
            `/round/${encodeURIComponent(
              `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
            )}`
          );
        }
      }
    }
  };

  const [clickDestination, SetClickDestination] = useState(false);
  const [clickDestination2, SetClickDestination2] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Flights",
          text: `Check out this page: ${window.location.href}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error.message);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
  });
  // const nationalityOptions = [
  //   { code: "in", name: "India" },
  //   // Add more countries as needed
  // ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");

  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSelectedCityCode(city["AIRPORTCODE"]);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`); // Clear the search input after selecting a city
    setIsItemSelected(true);
    setDestination1(city);
  };

  const [destinationCity2, setDestinationCity2] = useState("");
  const [selectedCityCode2, setSelectedCityCode2] = useState("");
  const handleCitySelect2 = (city) => {
    setDestinationCity2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSelectedCityCode2(city["AIRPORTCODE"]);
    SetClickDestination2(false); // Close the city suggestion div
    setSearchInput2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`); // Clear the search input after selecting a city
    setIsItemSelected2(true);
    setDestination2(city);
  };

  // console.log(
  //   selectedCityCode,
  //   destinationCity,
  //   selectedCityCode2,
  //   destinationCity2
  // );

  // const [searchInput, setSearchInput] = useState("");
  // const [searchInput2, setSearchInput2] = useState("");

  // const handleInputChange = (event) => {
  //   const userInput = event.target.value.toLowerCase();
  //   setSearchInput(userInput);
  //   setIsItemSelected(false);
  // };

  // const handleInputChange2 = (event) => {
  //   const userInput = event.target.value.toLowerCase();
  //   setSearchInput2(userInput);
  //   setIsItemSelected2(false);
  // };

  const [searchInput, setSearchInput] = useState("");
  const [searchInput2, setSearchInput2] = useState("");
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);
  const fetchDatas = (value) => {
    fetch("https://admin.skyportdestinations.com/api/airport")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CITYNAME &&
                user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
                (user.AIRPORTNAME &&
                  user.AIRPORTNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.AIRPORTCODE &&
                  user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.AIRPORTCODE &&
              user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1; // Highest priority for city code matches
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2; // Second priority for city name matches
            } else if (
              user.COUNTRYNAME &&
              user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 3; // Third priority for country name matches
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        console.log("RESULTS", results);
        setCities2(results);
      });
  };

  const handleInputChange = (value) => {
    setSearchInput(value.toLowerCase());
    fetchDatas(value.toLowerCase());
    SetClickDestination(true);
    setIsItemSelected(false);
  };
  const fetchDatass = (value) => {
    fetch("https://admin.skyportdestinations.com/api/airport")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CITYNAME &&
                user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
                (user.AIRPORTNAME &&
                  user.AIRPORTNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.AIRPORTCODE &&
                  user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.AIRPORTCODE &&
              user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1; // Highest priority for city code matches
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2; // Second priority for city name matches
            } else if (
              user.COUNTRYNAME &&
              user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 3; // Third priority for country name matches
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        // console.log("RESULTS",results)
        setCities22(results);
      });
  };
  const handleInputChange2 = (value) => {
    setSearchInput2(value.toLowerCase());
    fetchDatass(value.toLowerCase());
    SetClickDestination2(true);
    setIsItemSelected2(false);
  };

  // const filteredCities = cities2.filter(
  //   (city) =>
  //     city["AIRPORTNAME"].toLowerCase().includes(searchInput) ||
  //     city["AIRPORTCODE"].toLowerCase().includes(searchInput) ||
  //     city["CITYCODE"].toLowerCase().includes(searchInput) ||
  //     city["COUNTRYNAME"].toLowerCase().includes(searchInput) ||
  //     city["COUNTRYCODE"].toLowerCase().includes(searchInput) ||
  //     city["CITYNAME"].toLowerCase().includes(searchInput)
  // ).map((city) => {
  //   let priority = 3;

  //   if (city["CITYCODE"].toLowerCase().includes(searchInput)) {
  //     priority = 1; // Highest priority for city code matches
  //   } else if (city["CITYNAME"].toLowerCase().includes(searchInput)) {
  //     priority = 2; // Second priority for city name matches
  //   } else if (city["COUNTRYNAME"].toLowerCase().includes(searchInput)) {
  //     priority = 3; // Third priority for country name matches
  //   }

  //   return { ...city, priority };
  // })
  // .sort((a, b) => a.priority - b.priority);

  // const filteredCities2 = cities2.filter(
  //   (city) =>
  //     city["AIRPORTNAME"].toLowerCase().includes(searchInput2) ||
  //     city["AIRPORTCODE"].toLowerCase().includes(searchInput2) ||
  //     city["CITYCODE"].toLowerCase().includes(searchInput2) ||
  //     city["COUNTRYNAME"].toLowerCase().includes(searchInput2) ||
  //     city["COUNTRYCODE"].toLowerCase().includes(searchInput2) ||
  //     city["CITYNAME"].toLowerCase().includes(searchInput2)
  // ).map((city) => {
  //   let priority = 3;

  //   if (city["CITYCODE"].toLowerCase().includes(searchInput2)) {
  //     priority = 1; // Highest priority for city code matches
  //   } else if (city["CITYNAME"].toLowerCase().includes(searchInput2)) {
  //     priority = 2; // Second priority for city name matches
  //   } else if (city["COUNTRYNAME"].toLowerCase().includes(searchInput2)) {
  //     priority = 3; // Third priority for country name matches
  //   }

  //   return { ...city, priority };
  // })
  // .sort((a, b) => a.priority - b.priority);

  const [flightBookingsData, setFlightBookingsData] = useState([]);

  useEffect(() => {
    const fetchFlightBookingData = async () => {
      try {
        const response = await axios.get(
          "https://admin.skyportdestinations.com/api/details"
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

  return (
    <div
      className="flight-booking-main-duv"
      // style={{
      //   background:
      //     "url(https://www.alhind.com/assets/img/banner.png), linear-gradient(to right, #d32f2f, #01597e)",
      //   padding: "20px 40px 20px 40px",
      // }}
    >
      <video autoPlay loop muted className="video_banner_tagsss">
        <source
          src="https://videos.pexels.com/video-files/11737747/11737747-hd_1920_1080_60fps.mp4"
          // src="https://videos.pexels.com/video-files/5608053/5608053-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>
      {/* <RecentSearch flightBookingsData={flightBookingsData}/> */}
      <Container>
        <div className="flight_booking_inner_div_div">
          <Row>
            {/* <SidePanel /> */}

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
                      Search for Flights
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="sfp-change-trip">
                      <div
                        onClick={handleSearchFlight}
                        className={`sfp-trip ${active ? "active" : ""}`}
                      >
                        One Way
                      </div>
                      <div
                        onClick={handleSearchFlightRound}
                        className={`sfp-trip ${active2 ? "active" : ""}`}
                      >
                        Round Trip
                      </div>
                      <div
                        onClick={handleSearchFlightMultiPle}
                        className={`sfp-trip ${active3 ? "active" : ""}`}
                      >
                        MultiCity
                      </div>
                      <div className="sfp-trip-layer layer-left"></div>
                    </div>
                    <div
                      className="sharenation"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <div
                        className="_langview b2cpanel dropdown-header"
                        onClick={toggleDropdown}
                      >
                        <span id="spnFlgImgHead">
                          <img
                            src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                            alt=""
                          />
                        </span>
                        <span id="spnCC">{selectedCountry.name}</span>
                        <i
                          className={`_arrwdnlang ${isOpen ? "open" : ""}`}
                        ></i>
                        {isOpen && (
                          <div className="dropdown-options">
                            {CountriesArray.map((country, index) => (
                              <div
                                key={index}
                                className="option"
                                onClick={() => handleCountrySelect(country)}
                              >
                                <img
                                  src={`https://flagcdn.com/w20/${country.code}.png`}
                                  alt=""
                                />
                                <span>{country.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        id="flipv3"
                        className="_shricn"
                        onClick={handleShare}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <Form onSubmit={handleSubmit}>
                      <div className="flightBookingFrom">
                        <div className="flightBookingFromDiv">
                          {" "}
                          <div style={{ fontWeight: "600" }}>From</div>
                          <input
                            type="text"
                            name="from"
                            placeholder="Enter Destination City"
                            className="flightBookingFromInputs1 "
                            value={searchInput}
                            onFocus={() => SetClickDestination(true)}
                            onBlur={() => {
                              if (isItemSelected) SetClickDestination(false);
                            }}
                            onChange={(e) => handleInputChange(e.target.value)}
                            autoComplete="off"
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
                                display:
                                  searchInput && clickDestination
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
                                      <MdOutlineFlight
                                        size={22}
                                        style={{
                                          textAlign: "center",
                                          height: "100%",
                                          color: "#d32f2f",
                                        }}
                                      />
                                    </Col>
                                    <Col md={11}>
                                      <Row>
                                        <div
                                          className="flightFromName"
                                          style={{
                                            color: "#d32f2f",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {city["CITYNAME"]} (
                                          {city["AIRPORTCODE"]})
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
                                            {city["AIRPORTNAME"]}
                                          </div>
                                        </Col>
                                        <Col md={2} style={{ paddingLeft: 0 }}>
                                          <div
                                            style={{
                                              textAlign: "center",
                                              fontWeight: "700",
                                              fontSize: 10,
                                            }}
                                          >
                                            {city["COUNTRYCODE"]}
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
                        <div className="">
                          <BsArrowLeftRight
                            size={22}
                            className="flightBookingArrow"
                          />
                        </div>
                        <div className="flightBookingFromDiv">
                          {" "}
                          <div style={{ fontWeight: "600" }}>To</div>
                          <input
                            type="text"
                            name="to"
                            placeholder="Enter Destination City"
                            className="flightBookingFromInputs1"
                            value={searchInput2}
                            onFocus={() => SetClickDestination2(true)}
                            onBlur={() => {
                              if (isItemSelected2) SetClickDestination2(false);
                            }} // readOnly
                            onChange={(e) => handleInputChange2(e.target.value)}
                            autoComplete="off"
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
                                display:
                                  searchInput2 && clickDestination2
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
                              {cities22.map((city, index) => (
                                <div
                                  key={index}
                                  style={{
                                    borderBottom: "1px solid grey",
                                    paddingBottom: 5,
                                    marginBottom: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleCitySelect2(city)}
                                >
                                  <Row>
                                    <Col
                                      md={1}
                                      style={{ alignItems: "center" }}
                                    >
                                      <MdOutlineFlight
                                        size={22}
                                        style={{
                                          textAlign: "center",
                                          height: "100%",
                                          color: "#d32f2f",
                                        }}
                                      />
                                    </Col>
                                    <Col md={11}>
                                      <Row>
                                        <div
                                          className="flightFromName"
                                          style={{
                                            color: "#d32f2f",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {city["CITYNAME"]} (
                                          {city["AIRPORTCODE"]})
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
                                            {city["AIRPORTNAME"]}
                                          </div>
                                        </Col>
                                        <Col md={2} style={{ paddingLeft: 0 }}>
                                          <div
                                            style={{
                                              textAlign: "center",
                                              fontWeight: "700",
                                              fontSize: 10,
                                            }}
                                          >
                                            {city["COUNTRYCODE"]}
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
                              Departure Date
                            </div>
                            <input
                              type="text"
                              name="departureDate"
                              id="departureDateInput"
                              className="dateInput flightBookingFromInput"
                              placeholder="Enter Departure Date"
                              onChange={handleChange}
                              value={
                                startDate ? startDate.format("MM/DD/YYYY") : ""
                              }
                              readOnly
                              onClick={toggleCalendar}
                              autoComplete="off"
                            />
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
                                        setCalVisible(false);
                                      }}
                                      isOutsideRange={(day) =>
                                        day.isBefore(moment(), "day")
                                      }
                                      focusedInput={focusedInput}
                                      onFocusChange={(focused) => {
                                        if (focused)
                                          setFocusedInput("startDate");
                                      }}
                                      renderDayContents={renderDayContents}
                                      numberOfMonths={numberOfMonths}
                                    />
                                  )}
                            </div>
                          </div>
                        </Col>

                        <Col>
                          <div
                            // style={{ fontWeight: "600" }}
                            style={{
                              opacity: active2 ? "1" : "0.4",
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            <div>Return Date</div>
                            <input
                              type="text"
                              id="returnDateInput"
                              name="returnDate"
                              className="dateInput flightBookingFromInput"
                              placeholder="Enter Return Date"
                              onChange={handleChange}
                              value={
                                endDate ? endDate.format("MM/DD/YYYY") : ""
                              }
                              readOnly
                              onClick={() => {
                                handleSearchFlightRound();
                                toggleCalendar("endDate");
                              }}
                              autoComplete="off"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div style={{ position: "relative" }}>
                            {" "}
                            <div style={{ fontWeight: "600" }}>Travellers</div>
                            <input
                              type="text"
                              placeholder={`${rooms[0].adults} Adults, ${rooms[0].children} Child, ${rooms[0].infants} Infants`}
                              className="flightBookingFromInput"
                              onClick={() => setLabelClicked(!labelClicked)}
                              autoComplete="off"
                            ></input>
                            <div
                              className="onlytraveller normaltraveller"
                              style={{
                                display: labelClicked ? "block" : "none",
                              }}
                            >
                              <ul className="traveller_list">
                                <li>
                                  <div className="list-persons-count">
                                    <div id="roomshtml">
                                      <div className="box" id="divroom1">
                                        <div className="roomTxt">
                                          <span>Room 1:</span>
                                        </div>
                                        <div className="left pull-left">
                                          <span className="txt">
                                            <span id="Label7">
                                              Adult <em>(Above 12 years)</em>
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
                                                  0,
                                                  "adults",
                                                  Math.max(
                                                    rooms[0].adults - 1,
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
                                              {rooms[0].adults}
                                            </span>
                                            <Link
                                              type="button"
                                              id="Adults_room_1_1_plus"
                                              className="add hoteladultclass"
                                              onClick={() =>
                                                updateRoom(
                                                  0,
                                                  "adults",
                                                  rooms[0].adults + 1 <=
                                                    9 - rooms[0].children
                                                    ? rooms[0].adults + 1
                                                    : rooms[0].adults
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
                                              Child <em>(Btw 2-12 years)</em>
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
                                                  0,
                                                  "children",
                                                  Math.max(
                                                    rooms[0].children - 1,
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
                                              {rooms[0].children}
                                            </span>
                                            <Link
                                              type="button"
                                              id="Children_room_1_1_plus"
                                              className="add hotelchildclass"
                                              onClick={() =>
                                                updateRoom(
                                                  0,
                                                  "children",
                                                  rooms[0].children + 1 <=
                                                    9 - rooms[0].adults
                                                    ? rooms[0].children + 1
                                                    : rooms[0].children
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
                                              Infant <em>(Below 2 years)</em>
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
                                                  0,
                                                  "infants",
                                                  Math.max(
                                                    rooms[0].infants - 1,
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
                                              {rooms[0].infants}
                                            </span>
                                            <Link
                                              type="button"
                                              id="Children_room_1_1_plus"
                                              className="add hotelchildclass"
                                              onClick={() =>
                                                updateRoom(
                                                  0,
                                                  "infants",
                                                  Math.min(
                                                    rooms[0].infants + 1,
                                                    rooms[0].adults
                                                  )
                                                )
                                              }
                                            >
                                              +
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="clear"></div>

                                        <div className="clear"></div>
                                      </div>
                                    </div>
                                    <Link
                                      className="apply_btn"
                                      to="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setLabelClicked(false);
                                      }}
                                    >
                                      Done
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            {" "}
                            <div style={{ fontWeight: "600" }}>Cabin Class</div>
                            <select
                              className="flightBookingFromInput"
                              name="cabinClass"
                              style={{ height: "50px" }}
                            >
                              <option>Economy</option>
                              <option>PremiumEconomy</option>
                              <option>Business</option>
                              <option>First</option>
                            </select>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{ justifyContent: "end", paddingRight: "10px" }}
                      >
                        <button
                          type="submit"
                          className="flightBookingBtn"
                          style={{ width: "200px", marginTop: "10px" }}
                        >
                          Search Flight
                        </button>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5}>
              <Col>
                <HeroCarousel />
              </Col>
              <Col>
                <RecentBookings />
              </Col>
            </Col>

            {/* <WalletOffer handleChnageCurrency={handleChnageCurrency} /> */}
          </Row>
        </div>
      </Container>
      {/* <FlightDeal /> */}
    </div>
  );
};

export default FlightBooking;
