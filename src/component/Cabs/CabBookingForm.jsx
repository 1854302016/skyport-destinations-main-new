import React, { useEffect, useRef, useState } from "react";
import "./CabBookingForm.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
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
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { CountriesArray } from "../FlightSearchMobile/Countries";
// import { cities2 } from "./Cities";
import axios from "axios";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import { MdCardTravel } from "react-icons/md";
import { BiTransferAlt } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import SearchFormAirport from "./SearchFormAirport";
import SearchFormOutstation from "./SearchFormLocal";
import SearchFormLocal from "./SearchFormLocal";
import HotelsContainer from "../Hotel/HotelSearch/HotelComponent";
import WhyBookUsNew from "../Home/Home/WhyBookUsNew";
import MobileApp from "../Flight/FlightSearchMobile/MobileApp";
import WebOffer from "../Home/Home/WebOffer";
import AboutHome from "../Home/Home/AboutHome";
import CabContainer from "./CabContainer";

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

export const extractBracketValue = (str) => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  return match ? match[1] : null;
};
const cityToAirportCode = {
  Dubai: "DXB",
  Delhi: "DEL",
  Mumbai: "BOM",
  "New York": "JFK",
  London: "LHR",
  Paris: "CDG",
  Singapore: "SIN",
  // Add more cities as needed
};
const CabBookingForm = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const URL = `https://admin.trustedfare.com/api/currency_convert/${fromCurrency}/${toCurrency}`;
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

  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [labelClicked, setLabelClicked] = useState(false);

  // for Outstation, Transfer and Local

  const [activeOutstation, setActiveOutstation] = useState(true);
  const [activeTransfer, setActiveTransfer] = useState(false);
  const [activeLocal, setActiveLocal] = useState(false);

  const travelTypeMapping = {
    Outstation: 1,
    Transfer: 2,
    Local: 3,
  };

  const travelType = travelTypeMapping[active ? "Outstation" : "Transfer"];

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

  // For Cabs

  const handleSearchOutstation = () => {
    setActiveOutstation(true);
    setActiveTransfer(false);
    setActiveLocal(false);
  };
  const handleSearchTransfer = () => {
    setActiveOutstation(false);
    setActiveTransfer(true);
    setActiveLocal(false);
  };
  const handleSearchLocal = () => {
    setActiveOutstation(false);
    setActiveTransfer(false);
    setActiveLocal(true);
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cabinMapping = {
      Economy: 2,
      "Premium Economy": 3,
      Business: 4,
      "First Class": 6,
    };

    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };

    // const cabin = cabinMapping[event.target.cabinClass.value];
    const cabin = cabinMapping[selectedClass];
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
          Origin: extractBracketValue(searchInput),
          Destination: extractBracketValue(searchInput2),
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
        navigate();
        // `/flightList/${encodeURIComponent(
        //   `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
        // )}`
      }

      if (active2) {
        if (destination1.COUNTRYCODE !== destination2.COUNTRYCODE) {
          navigate();
          // `/international-round/${encodeURIComponent(
          //   `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          // )}`
        } else {
          navigate();
          // `/round/${encodeURIComponent(
          //   `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          // )}`
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
  const [searchedAirport, setSearchedAirport] = useState(
    "DEL, Indira Gandhi International Airport"
  );
  const [searchedAirport2, setSearchedAirport2] = useState(
    "BOM, Chhatrapati Shivaji International Airport"
  );
  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSearchedAirport(`${city["CITYCODE"]},${city["AIRPORTNAME"]}`);
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
    setSearchedAirport2(`${city["CITYCODE"]},${city["AIRPORTNAME"]}`);
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

  // const [searchInput, setSearchInput] = useState();
  const [searchInput, setSearchInput] = useState("Delhi (DEL)");
  const [searchInput2, setSearchInput2] = useState("Mumbai (BOM)");
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);

  // useEffect(() => {
  //   const getLocationAndSetOrigin = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         try {
  //           const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  //           const data = await response.json();
  //           console.log('Detected city:', data.city);

  //           if (data.city) {
  //             const airportCode = cityToAirportCode[data.city] || data.city;
  //             setSearchInput(airportCode);
  //           }
  //         } catch (err) {
  //           console.error('Error during reverse geocoding:', err);
  //           setError('Unable to detect your city.');
  //         }
  //       }, (err) => {
  //         console.error('Geolocation error:', err);
  //         setError('Location permission denied.');
  //       });
  //     } else {
  //       setError('Geolocation is not supported by your browser.');
  //     }
  //   };

  //   getLocationAndSetOrigin();
  // }, []);

  const fetchDatas = (value) => {
    fetch("https://admin.trustedfare.com/api/airport")
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
    fetch("https://admin.trustedfare.com/api/airport")
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

  const [flightBookingsData, setFlightBookingsData] = useState([]);

  useEffect(() => {
    const fetchFlightBookingData = async () => {
      try {
        const response = await axios.get(
          "https://admin.trustedfare.com/api/details"
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

  const [selectedFare, setSelectedFare] = useState("Direct Flights");

  const handleFareChange = (e) => {
    setSelectedFare(e.target.value);
    console.log("Selected Fare:", e.target.value);
  };

  const [selectedClass, setSelectedClass] = useState("Economy"); // Initial selected class

  // Function to handle class selection
  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  const [time, setTime] = useState(""); // Stores selected time
  const inputRef = useRef(null); // Ref to access input DOM

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Open time picker on div click
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value); // Update selected time
  };

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

  return (
    <div
      className="bookimg_form_containerrr"
      // style={{
      //   background:
      //     "url('https://images.pexels.com/photos/30247232/pexels-photo-30247232/free-photo-of-airplane-wing-above-clouds-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   width: "100%",
      // }}
    >
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
                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDz7XKDBARrLsQobGmrJ1uiYzZ6MOXxC9Ig&s")',
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
                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDz7XKDBARrLsQobGmrJ1uiYzZ6MOXxC9Ig&s")',
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
                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDz7XKDBARrLsQobGmrJ1uiYzZ6MOXxC9Ig&s")',
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
              onSubmit={handleSubmit}
              data-cy="flightSW"
              className="fltWidgetSection appendBottom40 primaryTraveler "
            >
              <div className="transferSection">
                <Row className="transferSectionTabs">
                  <Col
                    onClick={handleSearchOutstation}
                    className={`tab ${
                      activeOutstation ? "activeOutstation active" : ""
                    }`}
                  >
                    <BiTransferAlt />
                    <div className="tabLabel  ">Outstation</div>
                  </Col>
                  <Col
                    onClick={handleSearchTransfer}
                    className={`tab ${
                      activeTransfer ? "activeTransfer active" : ""
                    }`}
                  >
                    <MdCardTravel />
                    <div className="tabLabel">Transfer</div>
                  </Col>
                  <Col
                    onClick={handleSearchLocal}
                    className={`tab ${activeLocal ? "activeLocal active" : ""}`}
                  >
                    <IoLocationOutline />
                    <div className="tabLabel">Local</div>
                  </Col>
                </Row>
              </div>

              {activeOutstation && (
                <>
                  <div className="makeFlex hrtlCenter">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div className="sfp-change-trip change-trip">
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
                        <div className="sfp-trip-layer layer-left"></div>
                      </div>
                    </div>
                  </div>
                  <div className="fsw ">
                    <div className="fsw_inner returnPersuasion">
                      <div className="flt_fsw_inputBox searchCity inactiveWidget ">
                        <label htmlFor="fromCity">
                          <span className="lbl_input appendBottom10">From</span>
                          <input
                            data-cy="fromCity"
                            id="fromCity"
                            type="text"
                            className="fsw_inputField lineHeight36 latoBlack font30"
                            readOnly=""
                            defaultValue="Delhi"
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
                                searchInput && clickDestination
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
                            {cities2.map((city, index) => (
                              <div
                                role="option"
                                id="react-autowhatever-1-section-0-item-0"
                                aria-selected="false"
                                className="react-autosuggest__suggestion react-autosuggest__suggestion--first"
                                onClick={() => handleCitySelect(city)}
                              >
                                <div className="makeFlex">
                                  <img
                                    className="icLocAlt appendRight8-bookings_form"
                                    src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png"
                                    alt="icon"
                                  />
                                  <div className="makeFlex flexOne column">
                                    <div className="makeFlex flex4spaceBetween">
                                      <div className="makeFlex flexOne spaceBetween appendRight10">
                                        <div className="makeFlex column flexOne appendRight10">
                                          <p className="font_search_bookingss appendBottom5 blackText">
                                            {city["CITYNAME"]},{" "}
                                            {city["COUNTRYNAME"]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="font14 lightGreyText latoBold">
                                        {city["CITYCODE"]}
                                      </div>
                                    </div>
                                    <p className="font12_bookingForm_ad greyText appendBottom3 lineHeight14">
                                      {" "}
                                      {city["AIRPORTNAME"]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <span className="fltSwipCircle">
                          <AiOutlineSwap color="#f73030" size={20} />
                          {/* <span className="flightsSprite fltSwipIcon" /> */}
                        </span>
                      </div>

                      <div className="flt_fsw_inputBox searchToCity inactiveWidget ">
                        <label htmlFor="toCity">
                          <span className="lbl_input appendBottom10">To</span>
                          <input
                            data-cy="toCity"
                            id="toCity"
                            type="text"
                            className="fsw_inputField lineHeight36 latoBlack font30"
                            readOnly=""
                            defaultValue="Mumbai"
                            value={searchInput2}
                            onFocus={() => {
                              setSearchInput2("");
                              setSearchedAirport2("");
                              SetClickDestination2(true);
                            }}
                            onBlur={() => {
                              if (isItemSelected2) SetClickDestination2(false);
                            }} // readOnly
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
                            {cities22.map((city, index) => (
                              <div
                                role="option"
                                id="react-autowhatever-1-section-0-item-0"
                                aria-selected="false"
                                className="react-autosuggest__suggestion react-autosuggest__suggestion--first"
                                onClick={() => handleCitySelect2(city)}
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
                                            {city["CITYNAME"]},{" "}
                                            {city["COUNTRYNAME"]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="font14 lightGreyText latoBold">
                                        {city["CITYCODE"]}
                                      </div>
                                    </div>
                                    <p className="font12_bookingForm_ad greyText appendBottom3 lineHeight14">
                                      {" "}
                                      {city["AIRPORTNAME"]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flt_fsw_inputBox dates inactiveWidget ">
                        <label htmlFor="departure">
                          <span className="lbl_input appendBottom10">
                            Departure
                          </span>
                          <input
                            data-cy="departure"
                            id="departure"
                            type="text"
                            className="fsw_inputField font20"
                            defaultValue="Monday, 3 Jun 2024"
                            onChange={handleChange}
                            value={
                              startDate ? startDate.format("MM/DD/YYYY") : ""
                            }
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
                            {startDate
                              ? startDate.format("dddd")
                              : "Select a date"}
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
                      <div
                        className="flt_fsw_inputBox dates reDates inactiveWidget "
                        style={{ opacity: active2 ? "1" : "0.3" }}
                      >
                        <div data-cy="returnArea">
                          <label
                            onChange={handleChange}
                            onClick={() => {
                              handleSearchFlightRound();
                              toggleCalendar("endDate");
                            }}
                          >
                            <span className="lbl_input appendBottom10">
                              Return
                            </span>
                            <p
                              data-cy="departureDate"
                              className="blackText font20 code lineHeight36"
                            >
                              <span className="font30 latoBlack">
                                {endDate ? endDate.format("D") : "--"}{" "}
                              </span>
                              <span>
                                {endDate ? endDate.format("MMM") : "Month"}
                              </span>
                              <span className="shortYear">
                                {endDate ? endDate.format("YY") : ""}
                              </span>
                            </p>
                            <p data-cy="departureDay" className="code ">
                              {endDate
                                ? endDate.format("dddd")
                                : "Select a date"}
                            </p>
                          </label>
                        </div>
                      </div>
                      <div className="flt_fsw_inputBox dates reDates inactiveWidget ">
                        <div
                          className="flt_fsw_inputBox dates reDates inactiveWidget"
                          onClick={handleDivClick}
                        >
                          <div data-cy="pickupArea ">
                            <label>
                              <span className="lbl_input appendBottom10">
                                Pick-up Time
                              </span>
                              <p
                                data-cy="pickupTime"
                                className="blackText font20 code lineHeight36 "
                              >
                                <span className="font30 latoBlack">
                                  <input
                                    type="time"
                                    id="appt"
                                    name="appt"
                                    ref={inputRef}
                                    value={time}
                                    onChange={handleTimeChange}
                                    style={{
                                      opacity: 1,
                                      zIndex: "100",
                                      border: "none",
                                      padding: "8px 5px 5px 0px",
                                    }}
                                  />
                                </span>
                              </p>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flt_fsw_inputBox dates reDates inactiveWidget search_flight_bookingsss ">
                        <button className="mat-stroked-button" type="submit">
                          Search Cab{" "}
                        </button>
                      </div>
                    </div>

                    {/* <p data-cy="submit" className="makeFlex vrtlCenter ">
  <a className="primaryBtn font24 latoBold widgetSearchBtn ">Search</a>
</p> */}
                  </div>
                </>
              )}
              {activeTransfer && <SearchFormAirport />}
              {activeLocal && <SearchFormLocal />}
            </form>
          </div>
        </div>
      </Container>
      <WebOffer />
      {/* <ReasonsToBook/> */}
      {/* <HotelsContainer/> */}
      <CabContainer />
      <WhyBookUsNew bookusdata={bookusdata} />
      <MobileApp
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKYZa6JhWy1khmOxnYTxzA4q8S803hqKHoA&s"
        title="Download Our Mobile App"
        description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
      />
      <AboutHome />
    </div>
  );
};

export default CabBookingForm;
