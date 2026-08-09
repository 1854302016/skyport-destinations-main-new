import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import "./BookingForm.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
import { FaHotel, FaSuitcaseRolling, FaWallet, FaPlane, FaBuilding, FaUmbrellaBeach } from "react-icons/fa";
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
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import Deals from "../FlightSearchMobile/Deals";

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

// Popular airports (Domestic/International) for quick selection — mirrors HotelSearchNew top cities UX
const topAirports = [
  // Local / Domestic Guyana
  {
    AIRPORTCODE: "GEO",
    AIRPORTNAME: "Cheddi Jagan International Airport",
    CITYCODE: "GEO",
    CITYNAME: "Georgetown",
    COUNTRYNAME: "Guyana",
    COUNTRYCODE: "GY",
    isTopCity: true,
    category: "domestic",
  },
  {
    AIRPORTCODE: "OGL",
    AIRPORTNAME: "Eugene F. Correia International Airport",
    CITYCODE: "OGL",
    CITYNAME: "Georgetown (Ogle)",
    COUNTRYNAME: "Guyana",
    COUNTRYCODE: "GY",
    isTopCity: true,
    category: "domestic",
  },
  // Guyana Popular International
  {
    AIRPORTCODE: "JFK",
    AIRPORTNAME: "John F. Kennedy International Airport",
    CITYCODE: "NYC",
    CITYNAME: "New York",
    COUNTRYNAME: "United States",
    COUNTRYCODE: "US",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "MIA",
    AIRPORTNAME: "Miami International Airport",
    CITYCODE: "MIA",
    CITYNAME: "Miami",
    COUNTRYNAME: "United States",
    COUNTRYCODE: "US",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "YYZ",
    AIRPORTNAME: "Toronto Pearson International Airport",
    CITYCODE: "YYZ",
    CITYNAME: "Toronto",
    COUNTRYNAME: "Canada",
    COUNTRYCODE: "CA",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "POS",
    AIRPORTNAME: "Piarco International Airport",
    CITYCODE: "POS",
    CITYNAME: "Port of Spain",
    COUNTRYNAME: "Trinidad and Tobago",
    COUNTRYCODE: "TT",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "BGI",
    AIRPORTNAME: "Grantley Adams International Airport",
    CITYCODE: "BGI",
    CITYNAME: "Bridgetown",
    COUNTRYNAME: "Barbados",
    COUNTRYCODE: "BB",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "PBM",
    AIRPORTNAME: "Johan Adolf Pengel International Airport",
    CITYCODE: "PBM",
    CITYNAME: "Paramaribo",
    COUNTRYNAME: "Suriname",
    COUNTRYCODE: "SR",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "PTY",
    AIRPORTNAME: "Tocumen International Airport",
    CITYCODE: "PTY",
    CITYNAME: "Panama City",
    COUNTRYNAME: "Panama",
    COUNTRYCODE: "PA",
    isTopCity: true,
    category: "international",
  },
  {
    AIRPORTCODE: "LHR",
    AIRPORTNAME: "London Heathrow Airport",
    CITYCODE: "LON",
    CITYNAME: "London",
    COUNTRYNAME: "United Kingdom",
    COUNTRYCODE: "GB",
    isTopCity: true,
    category: "international",
  },
];

const CACHE_NAME = "search-data-cache";
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds
export const insertSearchDataIntoCache = async (searchData) => {
  const cache = await caches.open(CACHE_NAME);

  // Add the new search data with a timestamp
  const timestampedData = { ...searchData, timestamp: new Date().getTime() };
  const response = new Response(JSON.stringify(timestampedData), {
    headers: { "Content-Type": "application/json" },
  });

  // Use a unique key for the search (e.g., origin + timestamp)
  const cacheKey = `${searchData.Segments[0].Origin}-${timestampedData.timestamp}`;
  await cache.put(new Request(cacheKey), response);

  // Enforce the limit of 8 most recent searches
  const keys = await cache.keys();
  if (keys.length > 8) {
    // Sort keys by timestamp to find the oldest entries
    const keyDataPairs = await Promise.all(
      keys.map(async (key) => {
        const response = await cache.match(key);
        const data = await response.json();
        return { key, timestamp: data.timestamp };
      })
    );

    // Sort by timestamp and delete the oldest entries
    keyDataPairs.sort((a, b) => a.timestamp - b.timestamp);
    const keysToDelete = keyDataPairs.slice(0, keys.length - 8);
    for (let { key } of keysToDelete) {
      await cache.delete(key);
    }
  }
};
export const fetchValidSearchDataFromCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  const validSearchData = [];
  for (let key of keys) {
    const response = await cache.match(key);
    const data = await response.json();

    if (new Date().getTime() - data.timestamp < CACHE_DURATION) {
      validSearchData.push(data);
    } else {
      // Clean up expired entries
      await cache.delete(key);
    }
  }

  // Sort the data by timestamp (most recent first) before returning
  validSearchData.sort((a, b) => b.timestamp - a.timestamp);
  return validSearchData.slice(0, 8); // Ensure only the 8 most recent are returned
};

const BookingForm = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

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

  const [startDate, setStartDate] = useState(moment().add(1, "days"));

  const [endDate, setEndDate] = useState(
    active2 ? moment().add(2, "days") : null
  );
  useEffect(() => {
    setEndDate(active2 ? moment().add(2, "days") : null);
  }, [active2]);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [calVisible, setCalVisible] = useState(false);

  // Refs for click outside handling across all dropdowns/selectors
  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);
  const dateContainerRef = useRef(null);
  const returnContainerRef = useRef(null);
  const travellerContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromContainerRef.current && !fromContainerRef.current.contains(event.target)) {
        SetClickDestination(false);
      }
      if (toContainerRef.current && !toContainerRef.current.contains(event.target)) {
        SetClickDestination2(false);
      }
      const isInsideDate =
        (dateContainerRef.current && dateContainerRef.current.contains(event.target)) ||
        (returnContainerRef.current && returnContainerRef.current.contains(event.target));
      if (!isInsideDate) {
        setCalVisible(false);
      }
      if (travellerContainerRef.current && !travellerContainerRef.current.contains(event.target)) {
        setLabelClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSameDay = (date1, date2) => date1.isSame(date2, "day");

  const renderDayContents = (day) => {
    const isStartDate = startDate && isSameDay(day, startDate);
    const isEndDate = endDate && isSameDay(day, endDate);
    const isInRange =
      startDate && endDate && day.isBetween(startDate, endDate, "day", "[]");
    const isToday = day.isSame(moment(), "day");

    let classNames = ["cal-day-inner"];
    if (isStartDate) classNames.push("cal-day-start");
    if (isEndDate) classNames.push("cal-day-end");
    if (isInRange) classNames.push("cal-day-range");
    if (isToday && !isStartDate && !isEndDate && !isInRange) classNames.push("cal-day-today");

    return (
      <div className={classNames.join(" ")}>
        <span className="cal-day-num">{day.format("D")}</span>
      </div>
    );
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (active2) {
      if (startDate && endDate) {
        setFocusedInput(null);
        setCalVisible(false);
      } else if (startDate) {
        setFocusedInput("endDate");
      }
    } else {
      if (startDate) {
        setCalVisible(false);
      }
    }
  };

  const toggleCalendar = (input) => {
    if (calVisible) {
      if (input && focusedInput !== input) {
        setFocusedInput(input);
      } else {
        setCalVisible(false);
      }
    } else {
      setCalVisible(true);
      setFocusedInput(input || "startDate");
      SetClickDestination(false);
      SetClickDestination2(false);
      setLabelClicked(false);
    }
  };

  const handleChange = () => { };

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
      await insertSearchDataIntoCache({
        ...SearchData,
        originCountryCode:
          destination2?.COUNTRYCODE?.trim().toUpperCase() || "",
        destinationCountryCode:
          destination1?.COUNTRYCODE?.trim().toUpperCase() || "",
      });

      if (active) {
        navigate(
          `/flightList/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
      }

      if (active2) {
        window.location.assign(
          `/international-round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
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

  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState({
    AIRPORTCODE: "GEO",
    AIRPORTNAME: "Cheddi Jagan International Airport",
    CITYCODE: "GEO",
    CITYNAME: "Georgetown",
    COUNTRYNAME: "Guyana",
    COUNTRYCODE: "GY",
    TOPCITIES: null,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 856,
  });
  const [destination2, setDestination2] = useState(null);
  const [searchedAirport, setSearchedAirport] = useState(
    "GEO, Cheddi Jagan International Airport"
  );
  const [searchedAirport2, setSearchedAirport2] = useState("");
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
  const [searchInput, setSearchInput] = useState("Georgetown (GEO)");
  const [searchInput2, setSearchInput2] = useState("");
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);
  const [staticAirportsData, setStaticAirportsData] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Load static airports data on component mount
  useEffect(() => {
    const loadStaticData = async () => {
      try {
        const response = await fetch("/Airports.json");
        const data = await response.json();
        setStaticAirportsData(data);
      } catch (error) {
        console.error("Error loading static airports data:", error);
      }
    };
    loadStaticData();
  }, []);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Function to search static data first
  const searchStaticData = (value) => {
    if (!staticAirportsData.length || value.length < 3) return [];

    const results = staticAirportsData
      .filter((airport) => {
        return (
          airport &&
          ((airport.CITYNAME &&
            airport.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
            (airport.AIRPORTNAME &&
              airport.AIRPORTNAME.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (airport.CITYCODE &&
              airport.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
            (airport.COUNTRYNAME &&
              airport.COUNTRYNAME.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (airport.COUNTRYCODE &&
              airport.COUNTRYCODE.toLowerCase().includes(
                value.toLowerCase()
              )) ||
            (airport.AIRPORTCODE &&
              airport.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
        );
      })
      .map((airport) => {
        let priority = 3;

        if (
          airport.AIRPORTCODE &&
          airport.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 1; // Highest priority for airport code matches
        } else if (
          airport.CITYNAME &&
          airport.CITYNAME.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 2; // Second priority for city name matches
        } else if (
          airport.COUNTRYNAME &&
          airport.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
        ) {
          priority = 3; // Third priority for country name matches
        }

        return { ...airport, priority };
      })
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 20); // Limit to 20 results for performance

    return results;
  };

  const fetchDatas = async (value) => {
    // fetch("https://admin.skyportdestinations.com/api/airport")
    try {
      const requestData = {
        city: value,
      };

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/airport",
        requestData
      );

      // If API returns JSON directly in response.data
      const json = response.data;
      console.log("json responseee", json);
      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.AIRPORTNAME &&
                user.AIRPORTNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.CITYCODE &&
                user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYNAME &&
                user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYCODE &&
                user.COUNTRYCODE.toLowerCase().includes(value.toLowerCase())) ||
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (value) => {
    setSearchInput(value.toLowerCase());
    SetClickDestination(true);
    setIsItemSelected(false);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.length === 0) {
      setCities2(topAirports);
    } else if (value.length >= 3) {
      // First check static data immediately
      const staticResults = searchStaticData(value.toLowerCase());
      if (staticResults.length > 0) {
        setCities2(staticResults);
      } else {
        // If no results in static data, make API call with debounce
        const timeout = setTimeout(() => {
          fetchDatas(value.toLowerCase());
        }, 300); // 300ms debounce
        setSearchTimeout(timeout);
      }
    } else {
      setCities2([]);
    }
  };
  const fetchDatass = async (value) => {
    try {
      const requestData = {
        city: value,
      };

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/airport",
        requestData
      );

      // If API returns JSON directly in response.data
      const json = response.data;
      console.log("json responseee", json);

      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.AIRPORTNAME &&
                user.AIRPORTNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.CITYCODE &&
                user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYNAME &&
                user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYCODE &&
                user.COUNTRYCODE.toLowerCase().includes(value.toLowerCase())) ||
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange2 = (value) => {
    setSearchInput2(value.toLowerCase());

    SetClickDestination2(true);
    setIsItemSelected2(false);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.length === 0) {
      setCities22(topAirports);
    } else if (value.length >= 3) {
      // First check static data immediately
      const staticResults = searchStaticData(value.toLowerCase());
      if (staticResults.length > 0) {
        setCities22(staticResults);
      } else {
        // If no results in static data, make API call with debounce
        const timeout = setTimeout(() => {
          fetchDatass(value.toLowerCase());
        }, 300); // 300ms debounce
        setSearchTimeout(timeout);
      }
    } else {
      setCities22([]);
    }
  };

  const [flightBookingsData, setFlightBookingsData] = useState([]);

  // useEffect(() => {
  //   const fetchFlightBookingData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://admin.skyportdestinations.com/api/details"
  //       );
  //       console.log("dghfytdftyfv", response);
  //       if (response.data.success) {
  //         console.log("bookings from db", response.data.data);
  //         setFlightBookingsData(response.data.data);
  //       } else {
  //         console.error(
  //           "Failed to fetch flight booking data:",
  //           response.data.message
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching flight booking data:", error);
  //     }
  //   };

  //   fetchFlightBookingData();
  // }, []);

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
  const slides = [
    {
      backgroundImage: "/Images/georgetown-skyline.jpg",
      overlayColor: "#190a0a",

      imgMark: "/Images/dream-feather-bg.png",
      title: "Your Gateway to the World",
      subtitle: "Anytime Anywhere",
    },
    {
      backgroundImage: "/Images/guyana-kaieteur-falls.jpg",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Your Gateway to the World",
      subtitle: "Anytime Anywhere",
    },
    {
      backgroundImage: "/Images/guyana-tourism.jpg",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Your Gateway to the World",
      subtitle: "Anytime Anywhere",
    },
  ];

  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };
  const [cacheData, setCacheData] = useState("");
  useEffect(() => {
    const data = async () => {
      const cachedSearches = await fetchValidSearchDataFromCache();
      if (cachedSearches) {
        setCacheData(cachedSearches);
      }
    };
    data();
  }, []);

  console.log("CACHE DATAaaa", cacheData);
  const handleSwapCities = () => {
    // Save current From values
    const tempSearchInput = searchInput;
    const tempSearchedAirport = searchedAirport;
    const tempDestinationCity = destinationCity;
    const tempSelectedCityCode = selectedCityCode;
    const tempDestination1 = destination1;
    const tempIsItemSelected = isItemSelected;

    // Swap From with To values
    setSearchInput(searchInput2);
    setSearchedAirport(searchedAirport2);
    setDestinationCity(destinationCity2);
    setSelectedCityCode(selectedCityCode2);
    setDestination1(destination2);
    setIsItemSelected(isItemSelected2);

    // Swap To with saved From values
    setSearchInput2(tempSearchInput);
    setSearchedAirport2(tempSearchedAirport);
    setDestinationCity2(tempDestinationCity);
    setSelectedCityCode2(tempSelectedCityCode);
    setDestination2(tempDestination1);
    setIsItemSelected2(tempIsItemSelected);

    // Close any open city suggestion popups
    SetClickDestination(false);
    SetClickDestination2(false);
  };

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
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{ height: "500px" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="backgroundBanner banner banner-image"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                }}
              >
                <div className="banner-overlay-gradient"></div>
                <div className="banner-hero-content">
                  <div className="banner-hero-badge">
                    <span>✈️ Trusted Journeys, Better Fares</span>
                  </div>
                  <h1 className="banner-hero-title">
                    Discover Your Next Adventure with <span>Trusted Fare</span>
                  </h1>
                  <p className="banner-hero-subtitle">
                    Book flights, luxury hotels, and personalized travel packages with instant confirmation and 24/7 dedicated assistance.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
              <div className="widget-top-nav-bar">
                <div className="searchtabslist">
                  <ul className="search_tabs">
                    <li className="tab-link active">
                      <Link className="tab-button" to="/">
                        <FaPlane style={{ fontSize: "15px" }} /> Flight
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="trip-switch-header">
                  <div className="trip-segmented-switch">
                    <button
                      type="button"
                      onClick={handleSearchFlight}
                      className={`trip-switch-btn ${active ? "active" : ""}`}
                    >
                      One Way
                    </button>
                    <button
                      type="button"
                      onClick={handleSearchFlightRound}
                      className={`trip-switch-btn ${active2 ? "active" : ""}`}
                    >
                      Round Trip
                    </button>
                  </div>
                </div>
              </div>
              <div className="fsw ">
                <div className="fsw_inner returnPersuasion">
                  <div
                    ref={fromContainerRef}
                    className={`flt_fsw_inputBox searchCity ${clickDestination ? "is-focused" : ""}`}
                    onClick={() => {
                      if (clickDestination) {
                        SetClickDestination(false);
                      } else {
                        setSearchInput("");
                        setSearchedAirport("");
                        SetClickDestination(true);
                        setCities2(topAirports);
                        setIsItemSelected(false);
                        SetClickDestination2(false);
                        setCalVisible(false);
                        setLabelClicked(false);
                      }
                    }}
                  >
                    <label>
                      <span className="lbl_input">FROM</span>
                      <input
                        data-cy="fromCity"
                        id="fromCity"
                        type="text"
                        className="fsw_inputField"
                        placeholder="Where from?"
                        value={searchInput}
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                      <p className="code makeRelative" title="GEO, Cheddi Jagan International Airport">
                        <span data-cy="defaultFromValue" className="truncate airPortName">
                          {searchedAirport || "GEO, Cheddi Jagan Internation..."}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                      <div
                        className="cityselect"
                        style={{
                          display: clickDestination ? "block" : "none",
                        }}
                      >
                        {cities2.length !== 0 ? (
                          <>
                            {cities2.filter((c) => !c.isTopCity).length === 0 ? (
                              <div className="desktop_autosugg">
                                <div className="desk_sugg_bx flx-clm marbtm0">
                                  <div className="rec_txt">
                                    Popular Search in Domestic
                                  </div>
                                  <div className="clr" />
                                  <div className="pop_city_bx">
                                    {topAirports
                                      .filter((city) => city.category === "domestic")
                                      .map((city, index) => (
                                        <a
                                          key={index}
                                          onClick={() => handleCitySelect(city)}
                                        >
                                          {city.CITYNAME}
                                        </a>
                                      ))}
                                  </div>
                                  <div className="clr" />
                                  <div className="rec_txt">
                                    Popular Search in International
                                  </div>
                                  <div className="clr" />
                                  <div className="pop_city_bx">
                                    {topAirports
                                      .filter((city) => city.category === "international")
                                      .map((city, index) => (
                                        <a
                                          key={index}
                                          onClick={() => handleCitySelect(city)}
                                        >
                                          {city.CITYNAME}
                                        </a>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                {cities2.map((city, index) => (
                                  <div
                                    className="after_search_city"
                                    key={index}
                                  >
                                    <div
                                      className="mflexcol"
                                      onClick={() => handleCitySelect(city)}
                                    >
                                      <img
                                        src="https://www.easemytrip.com/Content/img/planeicon.svg"
                                        alt="Flight"
                                        className="mgr10"
                                      />
                                      <div>
                                        <p>
                                          <span id="spn12" className="flsctrhead">
                                            {city["CITYNAME"]}({city["CITYCODE"]})
                                          </span>
                                        </p>
                                        <p id="airport12" className="autosrpt">
                                          {city["AIRPORTNAME"]}
                                        </p>
                                      </div>
                                      <div className="flcountry">
                                        {city["COUNTRYNAME"]}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
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

                  <div className="swap-icon-container" onClick={handleSwapCities} title="Swap Origin and Destination">
                    <AiOutlineSwap size={18} />
                  </div>

                  <div
                    ref={toContainerRef}
                    className={`flt_fsw_inputBox searchToCity ${clickDestination2 ? "is-focused" : ""}`}
                    onClick={() => {
                      if (clickDestination2) {
                        SetClickDestination2(false);
                      } else {
                        setSearchInput2("");
                        setSearchedAirport2("");
                        SetClickDestination2(true);
                        setCities22(topAirports);
                        setIsItemSelected2(false);
                        SetClickDestination(false);
                        setCalVisible(false);
                        setLabelClicked(false);
                      }
                    }}
                  >
                    <label>
                      <span className="lbl_input">TO</span>
                      <input
                        data-cy="toCity"
                        id="toCity"
                        type="text"
                        className="fsw_inputField"
                        placeholder="Where to?"
                        autoComplete="off"
                        value={searchInput2}
                        onChange={(e) => handleInputChange2(e.target.value)}
                      />
                      <p className="code makeRelative" title={searchedAirport2 || "Choose destination airport"}>
                        <span data-cy="defaultToValue" className="truncate airPortName">
                          {searchedAirport2 || "Choose destination airport"}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                      <div
                        className="cityselect"
                        style={{
                          display: clickDestination2 ? "block" : "none",
                        }}
                      >
                        {cities22.length !== 0 ? (
                          <>
                            {cities22.filter((c) => !c.isTopCity).length ===
                              0 ? (
                              <div className="desktop_autosugg">
                                <div className="desk_sugg_bx flx-clm marbtm0">
                                  <div className="rec_txt">
                                    Popular Search in Domestic
                                  </div>
                                  <div className="clr" />
                                  <div className="pop_city_bx">
                                    {topAirports
                                      .filter(
                                        (city) => city.category === "domestic"
                                      )
                                      .map((city, index) => (
                                        <a
                                          key={index}
                                          onClick={() =>
                                            handleCitySelect2(city)
                                          }
                                        >
                                          {city.CITYNAME}
                                        </a>
                                      ))}
                                  </div>
                                  <div className="clr" />
                                  <div className="rec_txt">
                                    Popular Search in International
                                  </div>
                                  <div className="clr" />
                                  <div className="pop_city_bx">
                                    {topAirports
                                      .filter(
                                        (city) =>
                                          city.category === "international"
                                      )
                                      .map((city, index) => (
                                        <a
                                          key={index}
                                          onClick={() =>
                                            handleCitySelect2(city)
                                          }
                                        >
                                          {city.CITYNAME}
                                        </a>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                {cities22.map((city, index) => (
                                  <div
                                    className="after_search_city"
                                    key={index}
                                  >
                                    <div
                                      className="mflexcol"
                                      onClick={() => handleCitySelect2(city)}
                                    >
                                      <img
                                        src="https://www.easemytrip.com/Content/img/planeicon.svg"
                                        alt="Flight"
                                        className="mgr10"
                                      />
                                      <div>
                                        <p>
                                          <span
                                            id="spn12"
                                            className="flsctrhead"
                                          >
                                            {city["CITYNAME"]}(
                                            {city["CITYCODE"]})
                                          </span>
                                        </p>
                                        <p id="airport12" className="autosrpt">
                                          {city["AIRPORTNAME"]}
                                        </p>
                                      </div>
                                      <div className="flcountry">
                                        {" "}
                                        {city["COUNTRYNAME"]}{" "}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
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

                  <div
                    ref={dateContainerRef}
                    className={`flt_fsw_inputBox dates ${calVisible && focusedInput === "startDate" ? "is-focused" : ""}`}
                    onClick={() => {
                      if (calVisible && focusedInput === "startDate") {
                        setCalVisible(false);
                      } else {
                        setCalVisible(true);
                        setFocusedInput("startDate");
                        SetClickDestination(false);
                        SetClickDestination2(false);
                        setLabelClicked(false);
                      }
                    }}
                  >
                    <label>
                      <span className="lbl_input">DEPARTURE</span>
                      <div className="main-date-display">
                        {startDate ? startDate.format("MM/DD/YYYY") : "08/09/2026"}
                      </div>
                      <div className="sub-date-display">
                        {startDate ? `${startDate.format("D MMM YY")}   ${startDate.format("dddd")}` : "9 Aug 26   Sunday"}
                      </div>
                    </label>
                    <div
                      className="calendar-dropdown-wrapper"
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: calVisible ? "block" : "none" }}
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
                              setFocusedInput(focused || "startDate")
                            }
                            renderDayContents={renderDayContents}
                            numberOfMonths={numberOfMonths}
                            daySize={42}
                            hideKeyboardShortcutsPanel={true}
                            noBorder={true}
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
                            daySize={42}
                            hideKeyboardShortcutsPanel={true}
                            noBorder={true}
                          />
                        )}
                    </div>
                  </div>

                  <div
                    ref={returnContainerRef}
                    className={`flt_fsw_inputBox dates reDates ${calVisible && focusedInput === "endDate" ? "is-focused" : ""}`}
                    style={{ opacity: active2 ? "1" : "0.55" }}
                    onClick={() => {
                      if (!active2) {
                        handleSearchFlightRound();
                        setCalVisible(true);
                        setFocusedInput("endDate");
                        SetClickDestination(false);
                        SetClickDestination2(false);
                        setLabelClicked(false);
                      } else {
                        if (calVisible && focusedInput === "endDate") {
                          setCalVisible(false);
                        } else {
                          setCalVisible(true);
                          setFocusedInput("endDate");
                          SetClickDestination(false);
                          SetClickDestination2(false);
                          setLabelClicked(false);
                        }
                      }
                    }}
                  >
                    <label>
                      <span className="lbl_input">RETURN</span>
                      <div className={active2 && endDate ? "main-date-display" : "disabled-date-display"}>
                        {active2 && endDate ? endDate.format("MM/DD/YYYY") : "-- Month"}
                      </div>
                      <div className="sub-date-display">
                        {active2 && endDate
                          ? `${endDate.format("D MMM YY")}   ${endDate.format("dddd")}`
                          : "Select a date"}
                      </div>
                    </label>
                  </div>

                  <div
                    ref={travellerContainerRef}
                    data-cy="flightTraveller"
                    className={`flt_fsw_inputBox flightTravllers ${labelClicked ? "is-focused" : ""}`}
                    onClick={() => {
                      const next = !labelClicked;
                      setLabelClicked(next);
                      if (next) {
                        SetClickDestination(false);
                        SetClickDestination2(false);
                        setCalVisible(false);
                      }
                    }}
                  >
                    <label>
                      <span className="lbl_input">
                        TRAVELLERS &amp; CLASS
                      </span>
                      <div className="main-traveller-text">
                        {`${rooms[0].infants} Infant, ${rooms[0].adults} Adult, ${rooms[0].children}`}
                      </div>
                      <div className="sub-class-text">
                        {`${rooms[0].adults + rooms[0].children + rooms[0].infants} Traveller`} &nbsp;•&nbsp; {selectedClass || "Economy"}
                      </div>
                    </label>
                    <div
                      className="onlytraveller normaltraveller modern-traveller-card"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: labelClicked ? "block" : "none",
                      }}
                    >
                      <div className="tc-card-header">
                        <span className="tc-title">TRAVELLERS</span>
                      </div>

                      {/* Adults Row */}
                      <div className="tc-row">
                        <div className="tc-label-group">
                          <span className="tc-main-label">Adults</span>
                          <span className="tc-sub-label">12+ years</span>
                        </div>
                        <div className="tc-counter">
                          <button
                            type="button"
                            className={`tc-btn-minus ${rooms[0].adults <= 1 ? "disabled" : ""}`}
                            disabled={rooms[0].adults <= 1}
                            onClick={() =>
                              updateRoom(
                                0,
                                "adults",
                                Math.max(rooms[0].adults - 1, 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="tc-count-num">{rooms[0].adults}</span>
                          <button
                            type="button"
                            className={`tc-btn-plus ${rooms[0].adults >= 9 - rooms[0].children ? "disabled" : ""}`}
                            disabled={rooms[0].adults >= 9 - rooms[0].children}
                            onClick={() =>
                              updateRoom(
                                0,
                                "adults",
                                rooms[0].adults + 1 <= 9 - rooms[0].children
                                  ? rooms[0].adults + 1
                                  : rooms[0].adults
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children Row */}
                      <div className="tc-row">
                        <div className="tc-label-group">
                          <span className="tc-main-label">Children</span>
                          <span className="tc-sub-label">2-12 years</span>
                        </div>
                        <div className="tc-counter">
                          <button
                            type="button"
                            className={`tc-btn-minus ${rooms[0].children <= 0 ? "disabled" : ""}`}
                            disabled={rooms[0].children <= 0}
                            onClick={() =>
                              updateRoom(
                                0,
                                "children",
                                Math.max(rooms[0].children - 1, 0)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="tc-count-num">{rooms[0].children}</span>
                          <button
                            type="button"
                            className={`tc-btn-plus ${rooms[0].children >= 9 - rooms[0].adults ? "disabled" : ""}`}
                            disabled={rooms[0].children >= 9 - rooms[0].adults}
                            onClick={() =>
                              updateRoom(
                                0,
                                "children",
                                rooms[0].children + 1 <= 9 - rooms[0].adults
                                  ? rooms[0].children + 1
                                  : rooms[0].children
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants Row */}
                      <div className="tc-row">
                        <div className="tc-label-group">
                          <span className="tc-main-label">Infants</span>
                          <span className="tc-sub-label">under 2 years</span>
                        </div>
                        <div className="tc-counter">
                          <button
                            type="button"
                            className={`tc-btn-minus ${rooms[0].infants <= 0 ? "disabled" : ""}`}
                            disabled={rooms[0].infants <= 0}
                            onClick={() =>
                              updateRoom(
                                0,
                                "infants",
                                Math.max(rooms[0].infants - 1, 0)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="tc-count-num">{rooms[0].infants}</span>
                          <button
                            type="button"
                            className={`tc-btn-plus ${rooms[0].infants >= rooms[0].adults ? "disabled" : ""}`}
                            disabled={rooms[0].infants >= rooms[0].adults}
                            onClick={() =>
                              updateRoom(
                                0,
                                "infants",
                                Math.min(rooms[0].infants + 1, rooms[0].adults)
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="tc-divider" />

                      {/* Cabin Class Header */}
                      <div className="tc-card-header">
                        <span className="tc-title">CABIN CLASS</span>
                      </div>

                      {/* Cabin Class Grid */}
                      <div className="tc-class-grid">
                        {[
                          { id: "Economy", label: "Economy" },
                          { id: "Premium Economy", label: "Premium Economy" },
                          { id: "Business", label: "Business" },
                          { id: "First Class", label: "First Class" },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className={`tc-class-chip ${selectedClass === item.id ? "active" : ""}`}
                            onClick={() => handleClassSelect(item.id)}
                          >
                            <span className="tc-class-chip-radio" />
                            <span className="tc-class-chip-text">{item.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Apply Button */}
                      <button
                        type="button"
                        className="tc-apply-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setLabelClicked(false);
                        }}
                      >
                        DONE
                      </button>
                    </div>
                    {/* <div className="introGBFlt">
                      <div className="introGBFltTooltip whiteText">
                        Save on bookings with more than 9 travellers
                      </div>
                    </div> */}
                  </div>
                  <div className="search_flight_bookingsss">
                    <button className="mat-stroked-button" type="submit">
                      SEARCH
                    </button>
                  </div>
                </div>

                {/* <div
                  className={`makeFlex hrtlCenter ${
                    showContent ? "" : "appendBottom10"
                  } flightFare`}
                >
                  <div
                    className="ng-tns-c8-3 ng-star-inserted"
                    style={{
                      cursor: "pointer",
                      marginLeft: "19px",
                      marginTop: "-6px",
                      marginRight: "15px",
                    }}
                  >
                    <Link
                      className="active"
                      rel="noopener"
                      style={{ color: "#053355" }}
                      onClick={handleClick}
                    >
                      <IoIosArrowDropdownCircle size={20} /> You’ve Searched
                    </Link>
                  </div>

                  <div className="specialFareContainer relative makeFlex centerContainer">
                    <div className="makeFlex hrtlCenter">
                      {[
                        "Direct Flights",
                        "Defence Fare",
                        "Student Fare",
                        "Senior Citizen Fare",
                      ].map((fare, index) => (
                        <div className="fareCardItem" key={index}>
                          <div>
                            <span className="customRadioBtn sizeSm primary">
                              <input
                                type="radio"
                                name="fareType"
                                value={fare}
                                checked={selectedFare === fare}
                                onChange={handleFareChange}
                              />
                              <span className="outer">
                                <span className="inner" />
                              </span>
                            </span>
                          </div>
                          <div>
                            <div
                              className="white-space-no-wrap blackText latoBold darkGreyText appendBottom3"
                              style={{
                                color:
                                  selectedFare === fare
                                    ? "#2196F3"
                                    : "rgb(74, 74, 74)",
                                lineHeight: "22px",
                              }}
                            >
                              {fare}
                            </div>
                          </div>

                          {fare === "Senior Citizen Fare" && (
                            <span
                              className="tooltip"
                              style={{ backgroundColor: "rgb(255, 255, 255)" }}
                            >
                              Applicable only for serving/retired Indian Armed
                              Forces personnel & their dependents. A valid Armed
                              Forces ID or dependent card is required at the
                              airport to avail this.
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
                {showContent && (
                  <div style={{ paddingLeft: "10px", color: "#333" }}>
                    <RecentSearch cacheData={cacheData} />
                  </div>
                )}
                {/* <p data-cy="submit" className="makeFlex vrtlCenter ">
  <Link className="primaryBtn font24 latoBold widgetSearchBtn ">Search</Link>
</p> */}
              </div>
            </form>

            <div className="hero-trust-strip">
              <div className="hero-trust-item">
                <span>🛡️</span>
                <span>100% Secure Booking</span>
              </div>
              <div className="hero-trust-item">
                <span>⚡</span>
                <span>Instant Ticket Confirmation</span>
              </div>
              <div className="hero-trust-item">
                <span>✈️</span>
                <span>Best Fare Guarantee</span>
              </div>
              <div className="hero-trust-item">
                <span>📞</span>
                <span>24/7 Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingForm;
