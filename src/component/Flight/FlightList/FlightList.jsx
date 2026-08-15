import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./FlightList.css";
// import { FaFilter } from "react-icons/fa";
import {
  MdAccessTimeFilled,
  MdOutlineAccessTimeFilled,
  MdOutlineSort,
} from "react-icons/md";
import { MdAirlines } from "react-icons/md";
import { MdSort } from "react-icons/md";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

import { motion } from "framer-motion";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
// import leftArrow from "./images/leftArrow.png";
// import rightArrow from "./images/rightArrow.png";
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { GiAirplaneArrival } from "react-icons/gi";
import { GoStopwatch } from "react-icons/go";
import { FlightListInfo, formatTime } from "./FlightListInfo";
import { BsArrowLeftRight, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaFilter, FaRupeeSign } from "react-icons/fa";
import { flightSearch } from "../../../redux/services/operations/flight";
import { useSelector, useDispatch } from "react-redux";
import FlightListSkeleton from "./FlightListSkeleton";
import { DayPickerRangeController } from "react-dates";
import {
  IoRadioButtonOff,
  IoRadioButtonOffSharp,
  IoRadioButtonOnOutline,
  IoRadioButtonOnSharp,
} from "react-icons/io5";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { cities, fares } from "../BookingSearch/FlightBooking";
import moment from "moment";
import Slider from "rc-slider";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import "rc-slider/assets/index.css";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
// import { cities2 } from "../BookingSearch/Cities";
import { cities12 } from "../../../Cities";
import FlightListCard from "./FlightListCard";
import FilterBar from "./FilterBar";
import ReSearchForm from "./ReSearchForm";
import axios from "axios";
import Filter from "./Filter/Filter";
import Sort from "./Filter/Sort";
import Time from "./Filter/Time";
import Airlines from "./Filter/Airlines";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { TbFilterFilled } from "react-icons/tb";
import { SiChinasouthernairlines } from "react-icons/si";

const flightClassDefaultValue = (flightCabinClass) => {
  switch (parseInt(flightCabinClass)) {
    case 2:
      return "2"; // Economy
    case 3:
      return "3"; // PremiumEconomy
    case 4:
      return "4"; // Business
    case 6:
      return "6"; // First
    default:
      return ""; // Default to no selection
  }
};

const sliderItems = [
  { date: "Oct 03", price: "7845" },
  { date: "Oct 04", price: "5954" },
  { date: "Oct 05", price: "4155" },
  { date: "Oct 06", price: "5953" },
  { date: "Oct 07", price: "5495" },
  { date: "Oct 08", price: "5953" },
  { date: "Oct 09", price: "4155" },
];

const CalenderSliderContent = styled.div`
  border: 1px solid rgb(228, 228, 228);
  border-right: none;
  border-block: none;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlightList = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleChnageCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      // const convertedValue = amount * exchangeRate;
      // return convertedValue.toFixed(2);
      return amount;
    }
  };
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const { data: routeParams } = useParams();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.flight.search);
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [labelClicked, setLabelClicked] = useState(false);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [baggageFilters, setBaggageFilters] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);
  const [clickDestination, SetClickDestination] = useState(false);
  const [clickDestination2, SetClickDestination2] = useState(false);
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [destinationCity2, setDestinationCity2] = useState("");
  const [selectedCityCode2, setSelectedCityCode2] = useState("");
  const [travellerActive, setTravellerActive] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [Visible, setVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tripsActive, setTripsActive] = useState(false);
  const [checkedStops, setCheckedStops] = useState([]);
  const [deptimeRange, setdepTimeRange] = useState([0, 0]);
  const [arrtimeRange, setarrTimeRange] = useState([0, 0]);
  const [filteredData, setFilteredData] = useState(
    search && search.length > 0 ? search[0] : [],
  );
  const traceId = String(sessionStorage.getItem("traceId"));
  const [airlines, setAirlines] = useState([]);
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [durationSliderValue, setDurationSliderValue] = useState([0, 0]);
  const [selectedOption, setSelectedOption] = useState();
  const [sortType, setSortType] = useState("price");

  const handleOptionChange = (val) => {
    setSelectedOption(val);
  };

  useEffect(() => {
    const searchData = parseSearchParams(routeParams);
    setDataSearch(searchData);
    updateRoomsData(searchData);
    updateDates(searchData);
    if (parseInt(searchData.JourneyType) === 1) handleSearchFlight();
    else if (parseInt(searchData.JourneyType) === 2) handleSearchFlightRound();
    else if (parseInt(searchData.JourneyType) === 3)
      handleSearchFlightMultiPle();
    setSearchInput(searchData.Segments[0].Origin);
    setSearchInput2(searchData.Segments[0].Destination);
    setSelectedOption(parseInt(searchData.Segments[0].FlightCabinClass));

    const destCity = cities12.find(
      (city) => city.AIRPORTCODE === searchData.Segments[0].Origin,
    );
    const destCity2 = cities12.find(
      (city) => city.AIRPORTCODE === searchData.Segments[0].Destination,
    );
    setDestination1(destCity);
    setDestination2(destCity2);
  }, [routeParams]);

  useEffect(() => {
    if (dataSearch) {
      setIsLoading(true);
      const updatedSearchData = { ...dataSearch };
      updatedSearchData.TokenId = token;
      updatedSearchData.EndUserIp = "192.168.10.10";
      // console.log("Updated Search Data", updatedSearchData);
      // dispatch(flightSearch(updatedSearchData, navigate));

      const passengerName =
        updatedSearchData.PassengerName ||
        localStorage.getItem("passengerName") ||
        "";
      const passengerEmail =
        updatedSearchData.PassengerEmail ||
        localStorage.getItem("passengerEmail") ||
        "";
      const passengerPhone =
        updatedSearchData.PassengerPhone ||
        localStorage.getItem("passengerPhone") ||
        "";

      const searchdatamulticurl = {
        origin: updatedSearchData.Segments[0].Origin,
        destination: updatedSearchData.Segments[0].Destination,
        departureDate: updatedSearchData.Segments[0].PreferredDepartureTime,
        adult: parseInt(updatedSearchData.AdultCount),
        child: parseInt(updatedSearchData.ChildCount),
        infant: parseInt(updatedSearchData.InfantCount),
        type: parseInt(updatedSearchData.JourneyType),
        cabin: parseInt(updatedSearchData.Segments[0].FlightCabinClass),
        tboToken: token,
        partocrsSession: sessionId,
        name: passengerName,
        email: passengerEmail,
        phone: passengerPhone,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        passengerPhone: passengerPhone,
        userName: passengerName,
        userEmail: passengerEmail,
        userPhone: passengerPhone,
      };

      console.log("search data multicurl", searchdatamulticurl);
      dispatch(flightSearch(searchdatamulticurl, true, false, navigate))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          // console.error("Error:", error);
          setIsLoading(false);
        });
    }
  }, [dataSearch, dispatch, navigate, token]);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints();
    };
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (search && search.length > 0) {
      setFilteredData(search[0]);
    }
  }, [search]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  useEffect(() => {
    if (search && search[0]) {
      // const airlineNames = search[0]
      //   .map((flight) => ({
      //     name: flight.Segments[0][0].Airline.AirlineName,
      //     selected: false,
      //   }))
      //   .filter((airline) => airline.name);
      // const uniqueAirlines = Array.from(
      //   new Set(airlineNames.map((airline) => airline.name))
      // );
      // const uniqueAirlinesWithSelected = uniqueAirlines.map((airlineName) => ({
      //   name: airlineName,
      //   selected: false,
      // }));
      // setAirlines(uniqueAirlinesWithSelected);
      // console.log("airlines", uniqueAirlines);

      // Extract airline name and code from the flight data
      const airlineData = search[0]
        .map((flight) => ({
          name: flight.Segments[0][0].Airline.AirlineName,
          code: flight.Segments[0][0].Airline.AirlineCode, // Extract AirlineCode
        }))
        .filter((airline) => airline.name);

      // Get unique airline names
      const uniqueAirlines = Array.from(
        new Set(airlineData.map((airline) => airline.name)),
      );

      // Create airline objects with unique names and their respective codes
      const uniqueAirlinesWithSelected = uniqueAirlines.map((airlineName) => {
        const airline = airlineData.find(
          (airline) => airline.name === airlineName,
        );
        return {
          name: airline.name,
          code: airline.code, // Include AirlineCode
        };
      });

      // Separate the names and codes into two arrays
      const airlineNames = uniqueAirlinesWithSelected.map((airline) => ({
        name: airline.name, // Set name
        selected: false, // Set selected flag to false
      }));

      const airlineCodes = uniqueAirlinesWithSelected.map(
        (airline) => airline.code,
      );

      // Update both states: one for names, one for codes
      setAirlines(airlineNames); // Set the names state
      setAirlineCodes(airlineCodes); // Set the codes state

      // Log the results
      console.log("Airlines with Names and Selection Status:", airlineNames);
      console.log("Airline Codes:", airlineCodes);

      const baggageOptions = search[0]
        .map((flight) => flight.Segments[0][0].Baggage)
        .filter((baggage) => baggage);
      const baggageMap = new Map();
      baggageOptions.forEach((baggage) => {
        const normalizedBaggage =
          baggage && baggage.toLowerCase().replace(/\s+/g, "");
        if (!baggageMap.has(normalizedBaggage)) {
          baggageMap.set(normalizedBaggage, baggage); // Store the original baggage
        }
      });

      // Extract unique baggage values and store them for filters
      const uniqueBaggageWithSelected = Array.from(baggageMap.values()).map(
        (baggageValue) => ({
          value: baggageValue,
          selected: false,
        }),
      );
      setBaggageFilters(uniqueBaggageWithSelected);

      console.log("Baggage options", uniqueBaggageWithSelected);
    }
  }, [search]);
  // useEffect(() => {
  //   if (search && search[0]) {
  //     const airlineNames = search[0].map((flight) => ({
  //       name: flight.Segments[0][0].Airline.AirlineName,
  //       selected: true,
  //     }));
  //     const uniqueAirlines = Array.from(
  //       new Set(airlineNames.map((airline) => airline.name))
  //     );
  //     const uniqueAirlinesWithSelected = uniqueAirlines.map((airlineName) => ({
  //       name: airlineName,
  //       selected: true,
  //     }));
  //     setAirlines(uniqueAirlinesWithSelected);
  //     console.log("airlines", uniqueAirlines);
  //   }
  // }, [search]);

  useEffect(() => {
    if (search && search.length > 0) {
      const fares = search[0].map((flight) => flight.Fare.PublishedFare);

      const minFare = Math.min(...fares);
      const maxFare = Math.max(...fares);
      setMinFare(minFare);
      setMaxFare(maxFare);

      setSliderValue([minFare, maxFare]);

      const durations = search[0].map((flight) =>
        flight.Segments[0].reduce((sum, seg) => sum + seg.Duration, 0),
      );
      const minDuration = Math.min(...durations);
      const maxDuration = Math.max(...durations);
      setMinDuration(minDuration);
      setMaxDuration(maxDuration);

      setDurationSliderValue([minDuration, maxDuration]);
    }
  }, [search]);

  useEffect(() => {
    applyFilters();
  }, [
    search,
    sliderValue,
    deptimeRange,
    arrtimeRange,
    airlines,
    checkedStops,
    sortType,
    durationSliderValue,
  ]);

  const parseSearchParams = (data) => {
    const searchData = {
      Segments: [{}],
    };
    const params = decodeURIComponent(data).split("*");

    params.forEach((param) => {
      const [key, value] = param.split("_");
      switch (key) {
        case "dest":
          searchData.Segments[0].Destination = value;
          break;
        case "org":
          searchData.Segments[0].Origin = value;
          break;
        case "dep":
          searchData.Segments[0].PreferredDepartureTime = value;
          break;
        case "arr":
          searchData.Segments[0].PreferredArrivalTime = value;
          break;
        case "px":
          const [adultCount, childCount, infantCount] = value.split("-");
          searchData.AdultCount = adultCount;
          searchData.ChildCount = childCount;
          searchData.InfantCount = infantCount;
          break;
        case "jt":
          searchData.JourneyType = value;
          break;
        case "cbn":
          searchData.Segments[0].FlightCabinClass = value;
          break;
        case "nm":
          searchData.PassengerName = value;
          break;
        case "em":
          searchData.PassengerEmail = value;
          break;
        case "ph":
          searchData.PassengerPhone = value;
          break;
        default:
          break;
      }
    });

    return searchData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };

    // const cabin = event.target.cabinClass.value;
    const tripType = tripTypeMapping[!active ? "RoundTrip" : "OneWay"];

    const SearchData = {
      EndUserIp: "192.168.10.10",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      Segments: [
        {
          Origin: event.target.from.value,
          Destination: event.target.to.value,
          FlightCabinClass: selectedOption,
          PreferredDepartureTime: startDate.startOf("day").format("YYYY-MM-DD"),
          PreferredArrivalTime: endDate
            ? endDate.startOf("day").format("YYYY-MM-DD")
            : startDate.startOf("day").format("YYYY-MM-DD"),
        },
      ],
    };
    if (active) {
      window.location.assign(
        `/flightList/${encodeURIComponent(
          `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`,
        )}`,
      );
    }
    if (active2) {
      // if (destination1.COUNTRYCODE !== destination2.COUNTRYCODE) {
      window.location.assign(
        `/international-round/${encodeURIComponent(
          `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`,
        )}`,
      );
      // }
      //  else {
      //   window.location.assign(
      //     `/round/${encodeURIComponent(
      //       `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
      //     )}`
      //   );
      // }
    }
  };

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
        {/* {fare && (
          <span
            style={{ fontSize: "10px", color: "#f73030", fontWeight: "600" }}
          >
            {fare.fare}
          </span>
        )} */}
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

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const updateRoomsData = (searchData) => {
    const updatedRooms = [
      {
        adults: parseInt(searchData.AdultCount),
        children: parseInt(searchData.ChildCount),
        infants: parseInt(searchData.InfantCount),
      },
    ];
    setRooms(updatedRooms);
  };

  const updateDates = (searchData) => {
    const departureTime = moment(searchData.Segments[0].PreferredDepartureTime);
    const arrivalTime = moment(searchData.Segments[0].PreferredArrivalTime);
    setStartDate(departureTime);
    // active2 &&
    setEndDate(arrivalTime);
  };

  const parseFareRule = (fareRuleDetail) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fareRuleDetail;
    const listItems = Array.from(tempDiv.querySelectorAll("li")).map((li) =>
      li.textContent.trim(),
    );

    return listItems;
  };

  const [fareRules, setFareRules] = useState("");
  const [activeFlightId, setActiveFlightId] = useState(null);
  const [loadingFareRules, setLoadingFareRules] = useState(false);
  // const [ConversationId, setConversationId] = useState(null);

  const handleClickPhone = async (id) => {
    setActiveFlightId(activeFlightId === id ? null : id);
  };
  const handleClick = async (id, SrdvIndex, ConversationId) => {
    setActiveId(activeId === id ? null : id);
    let rules = [];
    console.log("srdvIdx", SrdvIndex);
    if (
      SrdvIndex !== "SrdvP" &&
      SrdvIndex !== "SrdvTJ" &&
      SrdvIndex !== "EwebM"
    ) {
      console.log("tbo farerule called");
      const response1 = await axios.post(
        "https://admin.trustedfare.com/api/flight-fare-rule",
        {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
          ResultIndex: id,
        },
      );
      console.log("response1", response1);
      setFareRules(
        response1.data.data.FareRules[0] &&
          parseFareRule(response1.data.data.FareRules[0].FareRuleDetail),
      );
    } else if (SrdvIndex === "SrdvTJ") {
      console.log("tj farerule called");
      const responseTJ1 = await axios.post(
        "https://admin.trustedfare.com/api/flight_farerule",
        {
          id: id,
          flowType: "SEARCH",
        },
      );
      console.log("response1", responseTJ1);
      if (responseTJ1.data.success)
        setFareRules(
          responseTJ1.data.data.fareRule && responseTJ1.data.data.fareRule,
        );
    } else if (SrdvIndex === "SrdvP") {
      console.log("parto farerule called");
      const responseP1 = await axios.post(
        "https://admin.trustedfare.com/api/air_rules",
        {
          SessionId: sessionId,
          FareSourceCode: id,
        },
      );
      console.log("responseP1", responseP1);
      if (responseP1.data.success)
        setFareRules(
          responseP1.data.data.FareRules[0] &&
            responseP1.data.data.FareRules[0].RuleDetails[0].Rules,
        );
    } else if (SrdvIndex === "EwebM") {
      if (ConversationId) {
        localStorage.setItem("ConversationId", ConversationId);
      }
      setLoadingFareRules(true);

      const responseM = await axios.post(
        "https://admin.trustedfare.com/api/Mistify/FareRules",
        {
          FareSourceCode: id,
          ConversationId: ConversationId,
        },
      );
      console.log("Sending payload:", {
        FareSourceCode: id,
        ConversationId: ConversationId,
      });
      console.log("responseM", responseM);
      const rules = responseM.data?.data?.Data?.FareRules || [];
      const baggage = responseM.data?.data?.Data?.BaggageInfos || [];

      setFareRules((prev) => ({
        ...prev,
        [id]: { rules, baggage },
      }));
      setLoadingFareRules(false);
    }
  };

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");

  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSelectedCityCode(city["AIRPORTCODE"]);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["AIRPORTCODE"]}`); // Clear the search input after selecting a city
    setIsItemSelected(true);
    setDestination1(city);
  };

  const handleCitySelect2 = (city) => {
    setDestinationCity2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSelectedCityCode2(city["AIRPORTCODE"]);
    SetClickDestination2(false); // Close the city suggestion div
    setSearchInput2(`${city["AIRPORTCODE"]}`); // Clear the search input after selecting a city
    setIsItemSelected2(true);
    setDestination2(city);
  };
  //  const traceId = useSelector((state) => state.flight.traceId)
  const [moreFareLoading, setMoreFareLoading] = useState(false);
  const [moreFare, setMoreFare] = useState("");
  const handleMoreFare = async (uniqueIdx, MoreFareOptions) => {
    setShowModal(showModal === uniqueIdx ? null : uniqueIdx);
    setMoreFareLoading(true);

    try {
       setMoreFare(MoreFareOptions);
      console.log(MoreFareOptions);
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to fetch upsell data.");
    } finally {
      setMoreFareLoading(false);
    }
  };
  const handlebookmodal = (url) => {
    navigate(url);
    setShowModal(false);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setVisible(scrollTop > 150);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleDurationSliderChange = (value) => {
    setDurationSliderValue(value);
  };

  const handleCheckedstops = (stopType) => {
    if (checkedStops.includes(stopType)) {
      setCheckedStops(checkedStops.filter((stop) => stop !== stopType));
    } else {
      setCheckedStops([...checkedStops, stopType]);
    }
  };

  const handledepTimeFilter = (range) => {
    if (deptimeRange[0] === range[0] && deptimeRange[1] === range[1])
      setdepTimeRange([0, 0]);
    else setdepTimeRange(range);
  };

  const handlearrTimeFilter = (range) => {
    if (arrtimeRange[0] === range[0] && arrtimeRange[1] === range[1])
      setarrTimeRange([0, 0]);
    else setarrTimeRange(range);
  };

  const applyFilters = () => {
    if ((search && search.length === 0) || isLoading) {
      return;
    }

    const selectedAirlines = airlines
      .filter((airline) => airline.selected)
      .map((airline) => airline.name);

    const getTotalDuration = (segments) =>
      segments.reduce((sum, seg) => sum + seg.Duration, 0);

    let newFilteredData =
      search &&
      search[0] &&
      search[0].filter((e) => {
        const fareInRange =
          e.Fare.PublishedFare >= sliderValue[0] &&
          e.Fare.PublishedFare <= sliderValue[1];

        const depTimeInRange =
          (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
          (new Date(e.Segments[0][0].Origin.DepTime).getHours() >=
            deptimeRange[0] &&
            new Date(e.Segments[0][0].Origin.DepTime).getHours() <
              deptimeRange[1]);

        const arrTimeInRange =
          (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
          (new Date(e.Segments[0][0].Destination.ArrTime).getHours() >=
            arrtimeRange[0] &&
            new Date(e.Segments[0][0].Destination.ArrTime).getHours() <
              arrtimeRange[1]);

        const isAirlineSelected =
          selectedAirlines.length === 0 ||
          selectedAirlines.includes(e.Segments[0][0].Airline.AirlineName);

        const stopCount = e.Segments[0].length - 1;
        const stopMatch =
          checkedStops.length === 0 ||
          (checkedStops.includes("non-stop") && stopCount === 0) ||
          (checkedStops.includes("1-stop") && stopCount === 1) ||
          (checkedStops.includes("2-stop") && stopCount >= 2);

        const durationInRange =
          (durationSliderValue[0] === 0 && durationSliderValue[1] === 0) ||
          (getTotalDuration(e.Segments[0]) >= durationSliderValue[0] &&
            getTotalDuration(e.Segments[0]) <= durationSliderValue[1]);

        return (
          fareInRange &&
          depTimeInRange &&
          arrTimeInRange &&
          isAirlineSelected &&
          stopMatch &&
          durationInRange
        );
      });

    // SORTING STARTS HERE
    if (sortType === "price") {
      newFilteredData.sort(
        (a, b) => a.Fare.PublishedFare - b.Fare.PublishedFare,
      );
    }

    if (sortType === "departure") {
      newFilteredData.sort(
        (a, b) =>
          new Date(a.Segments[0][0].Origin.DepTime) -
          new Date(b.Segments[0][0].Origin.DepTime),
      );
    }

    if (sortType === "fastest" || sortType === "duration") {
      newFilteredData.sort(
        (a, b) =>
          getTotalDuration(a.Segments[0]) - getTotalDuration(b.Segments[0]),
      );
    }

    if (sortType === "smart") {
      newFilteredData.sort((a, b) => {
        const stopA = a.Segments[0].length - 1;
        const stopB = b.Segments[0].length - 1;

        const durA = getTotalDuration(a.Segments[0]);
        const durB = getTotalDuration(b.Segments[0]);

        const priceA = a.Fare.PublishedFare;
        const priceB = b.Fare.PublishedFare;

        const scoreA = stopA * 5000 + durA * 2 + priceA / 5;
        const scoreB = stopB * 5000 + durB * 2 + priceB / 5;

        return scoreA - scoreB;
      });
    }

    setFilteredData(newFilteredData);
    console.log("Filtered Data:", newFilteredData);
  };

  const handleChecked = (airlineName) => {
    const updatedAirlines = airlines.map((airline) =>
      airline.name === airlineName
        ? { ...airline, selected: !airline.selected }
        : airline,
    );
    setAirlines(updatedAirlines);
  };

  const handleShowAllairlinenames = (event) => {
    const isChecked = event.target.checked;
    const updatedAirlines = airlines.map((airline) => ({
      ...airline,
      selected: isChecked,
    }));
    setAirlines(updatedAirlines);
  };

  const handleShowAllStops = (event) => {
    if (event.target.checked) {
      setCheckedStops([]);
    } else {
      setCheckedStops([]);
    }
  };

  const clearAllFilters = () => {
    setSliderValue([minFare, maxFare]);
    setDurationSliderValue([minDuration, maxDuration]);
    setdepTimeRange([0, 0]);
    setarrTimeRange([0, 0]);
    setCheckedStops([]);

    const updatedAirlines = airlines.map((airline) => ({
      ...airline,
      selected: true,
    }));
    setAirlines(updatedAirlines);
  };
  const [searchInput, setSearchInput] = useState(destinationCity);
  const [searchInput2, setSearchInput2] = useState(destinationCity2);
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);
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
                    value.toLowerCase(),
                  )) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase(),
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase(),
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
    setSearchInput(value.toUpperCase());
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
                  user.AIRPORTNAME.toLowerCase().includes(value)) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase(),
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase(),
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
    setSearchInput2(value.toUpperCase());
    fetchDatass(value.toLowerCase());
    SetClickDestination2(true);
    setIsItemSelected2(false);
  };
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilter = (name) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };
  const closeFilter = () => {
    setOpenFilter(null);
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwapInputs = () => {
    const tempInput = searchInput;

    setSearchInput(searchInput2);

    setSearchInput2(tempInput);

    // Optional: Reset dropdowns or focus
    SetClickDestination(false);
    SetClickDestination2(false);
  };

  return (
    <div
      className="flightListPage roundtrippg "
      style={{ position: "relative" }}
    >
      <div className="bgGradient"></div>{" "}
      <ReSearchForm
        dataSearch={dataSearch}
        handleSubmit={handleSubmit}
        tripsActive={tripsActive}
        active={active}
        active2={active2}
        active3={active3}
        handleSearchFlight={handleSearchFlight}
        handleSearchFlightRound={handleSearchFlightRound}
        handleSearchFlightMultiPle={handleSearchFlightMultiPle}
        setTripsActive={setTripsActive}
        searchInput={searchInput}
        searchInput2={searchInput2}
        SetClickDestination={SetClickDestination}
        SetClickDestination2={SetClickDestination2}
        isItemSelected={isItemSelected}
        isItemSelected2={isItemSelected2}
        handleInputChange={handleInputChange}
        handleInputChange2={handleInputChange2}
        filteredCities={cities2}
        filteredCities2={cities22}
        clickDestination={clickDestination}
        clickDestination2={clickDestination2}
        handleCitySelect={handleCitySelect}
        handleCitySelect2={handleCitySelect2}
        startDate={startDate}
        setStartDate={setStartDate}
        moment={moment}
        endDate={endDate}
        toggleCalendar={toggleCalendar}
        rooms={rooms}
        setTravellerActive={setTravellerActive}
        travellerActive={travellerActive}
        updateRoom={updateRoom}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        calVisible={calVisible}
        setCalVisible={setCalVisible}
        handleDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        setFocusedInput={setFocusedInput}
        renderDayContents={renderDayContents}
        numberOfMonths={numberOfMonths}
        appDisk="flight_list"
        handleSwapInputs={handleSwapInputs}
      />
      <div className="flightsMainBody">
        {/* <Navbar /> */}
        {/* <Bookingmenu /> */}
        <Container className="bodyDiv" style={{ position: "relative" }}>
          <Row>
            <FilterBar
              showFilter={showFilter}
              minFare={minFare}
              maxFare={maxFare}
              sliderValue={sliderValue}
              minDuration={minDuration}
              maxDuration={maxDuration}
              durationSliderValue={durationSliderValue}
              handleDurationSliderChange={handleDurationSliderChange}
              clearAllFilters={clearAllFilters}
              handleSliderChange={handleSliderChange}
              handledepTimeFilter={handledepTimeFilter}
              deptimeRange={deptimeRange}
              arrtimeRange={arrtimeRange}
              handlearrTimeFilter={handlearrTimeFilter}
              handleShowAllStops={handleShowAllStops}
              checkedStops={checkedStops}
              handleCheckedstops={handleCheckedstops}
              handleShowAllairlinenames={handleShowAllairlinenames}
              airlines={airlines}
              handleChecked={handleChecked}
              setShowFilter={setShowFilter}
              applyFilters={applyFilters}
              handleChnageCurrency={handleChnageCurrency}
              airlineCodes={airlineCodes}
            />
            <Col md={9} className="rightDiv" style={{ paddingRight: "0px" }}>
              <Row style={{ display: "none" }}>
                <div className="promotionWithoutCarousel" id="carouselBanner">
                  <div className="promotionsCard">
                    <span
                      className="bgProperties bannerImg LEFT_IMAGE_TEXT "
                      style={{
                        backgroundImage:
                          'url("https://imgak.mmtcdn.com/flights/assets/media/common/hdfc_logo.webp")',
                      }}
                    />
                    <div className="promotionContent">
                      <span className="fontSize14 blackFont blackText">
                        <b>Up to Rs. 1500 Instant Discount and No-cost EMI</b>
                      </span>
                      <span className="promotionRedline" />
                      <span className="fontSize12 blackText">
                        on HDFC Bank Credit Cards*. Use Code: HDFCEMI
                      </span>
                    </div>
                  </div>
                  <div className="promotionsCard">
                    <span
                      className="bgProperties bannerImg LEFT_IMAGE_TEXT "
                      style={{
                        backgroundImage:
                          'url("https://imgak.goibibo.com/flights-gi-assets/dt/listing/priceLockDiscBanner.webp")',
                      }}
                    />
                    <div className="promotionContent">
                      <span className="fontSize14 blackFont blackText">
                        <b>Price Lock: Pay Later</b>
                      </span>
                      <span className="promotionRedline" />
                      <span className="fontSize12 blackText">
                        Unsure about your plans? Secure prices now, pay later
                      </span>
                    </div>
                  </div>
                </div>
              </Row>
              <Row
                className="flight_list_dep_air ml-0 mr-0 d-md-flex row_backgorund_list_TG list-header-premium mb-3"
                style={{ position: "sticky", top: "0", zIndex: "10" }}
              >
                <div className="menuItems menuItem_TG_List_head py-1 px-4 d-flex justify-content-between align-items-center w-100">
                  <p className="header-label airlines">AIRLINES</p>
                  <p className="header-label depart">DEPART</p>
                  <p className="header-label duration">DURATION</p>
                  <p className="header-label arrive">ARRIVE</p>
                  <p className="header-label price">PRICE</p>
                </div>
              </Row>
              {search && search.length !== 0 && !isLoading ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {search &&
                    filteredData &&
                    filteredData.map((e, indexx) => {
                      return (
                        <React.Fragment key={indexx}>
                          <FlightListCard
                            e={e}
                            handleMoreFare={handleMoreFare}
                            handleClick={handleClick}
                            activeId={activeId}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            formatTime={formatTime}
                            handlebookmodal={handlebookmodal}
                            handleChnageCurrency={handleChnageCurrency}
                            fareRules={fareRules}
                            moreFare={moreFare}
                            moreFareLoading={moreFareLoading}
                            handleClickPhone={handleClickPhone}
                            activeFlightId={activeFlightId}
                            indexx={indexx}
                            searchMeta={dataSearch}
                          />
                          {indexx === 2 && (
                            <motion.div
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                              }}
                              className="promo-banner-wrapper mb-4 overflow-hidden rounded-4 shadow-sm"
                            >
                              <a href="#" target="_blank">
                                <img
                                  src="https://cdn.gyftr.com/blog/wp-content/uploads/2024/06/14062621/Blog-banner-Cleartrip.-1.png"
                                  alt="Summer Sale"
                                  className="w-100 img-fluid"
                                />
                              </a>
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}
                </motion.div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  <FlightListSkeleton
                    fromCode={dataSearch?.Segments?.[0]?.Origin}
                    fromCity={destination1?.CITYNAME}
                    toCode={dataSearch?.Segments?.[0]?.Destination}
                    toCity={destination2?.CITYNAME}
                  />
                  {/* <FlightListSkeleton />
                  <FlightListSkeleton />
                  <FlightListSkeleton /> */}
                </div>
              )}
            </Col>
          </Row>
          <div className="filter_bar_flightList visible">
            <div className="menu-container">
              <div className="menu-item" onClick={() => toggleFilter("filter")}>
                <TbFilterFilled className="icon" size={22} />
                Filter
              </div>
              <div
                className="menu-item"
                onClick={() => {
                  if (checkedStops.includes("non-stop")) {
                    setCheckedStops([]); // Show all (both stop and non-stop)
                  } else {
                    setCheckedStops(["non-stop"]); // Show only non-stop
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {checkedStops.includes("non-stop") ? (
                  <BsToggleOn className="icon" size={30} color="#1d489f" />
                ) : (
                  <BsToggleOff className="icon" size={30} />
                )}
                Stops
              </div>
              <div className="menu-item" onClick={() => toggleFilter("time")}>
                <MdOutlineAccessTimeFilled className="icon" size={22} />
                Time
              </div>
              <div
                className="menu-item"
                onClick={() => toggleFilter("airlines")}
              >
                <SiChinasouthernairlines className="icon" size={22} />
                Airline
              </div>
              <div className="menu-item" onClick={() => toggleFilter("sort")}>
                <MdOutlineSort className="icon" size={22} />
                Sort
              </div>
            </div>
          </div>
          {/* <FaFilter /> Filter */}
        </Container>
      </div>
      <div className="border p-3">
        {openFilter === "filter" && (
          <Filter
            closeFilter={closeFilter}
            showFilter={showFilter}
            minFare={minFare}
            maxFare={maxFare}
            sliderValue={sliderValue}
            minDuration={minDuration}
            maxDuration={maxDuration}
            durationSliderValue={durationSliderValue}
            handleDurationSliderChange={handleDurationSliderChange}
            clearAllFilters={clearAllFilters}
            handleSliderChange={handleSliderChange}
            handledepTimeFilter={handledepTimeFilter}
            deptimeRange={deptimeRange}
            arrtimeRange={arrtimeRange}
            handlearrTimeFilter={handlearrTimeFilter}
            handleShowAllStops={handleShowAllStops}
            checkedStops={checkedStops}
            handleCheckedstops={handleCheckedstops}
            handleShowAllairlinenames={handleShowAllairlinenames}
            airlines={airlines}
            handleChecked={handleChecked}
            setShowFilter={setShowFilter}
            applyFilters={applyFilters}
            handleChnageCurrency={handleChnageCurrency}
            airlineCodes={airlineCodes}
          />
        )}
        {openFilter === "sort" && (
          <Sort
            clearAllFilters={clearAllFilters}
            closeFilter={closeFilter}
            sortType={sortType}
            setSortType={setSortType}
          />
        )}
        {openFilter === "time" && (
          <Time
            closeFilter={closeFilter}
            showFilter={showFilter}
            minFare={minFare}
            maxFare={maxFare}
            sliderValue={sliderValue}
            clearAllFilters={clearAllFilters}
            handleSliderChange={handleSliderChange}
            handledepTimeFilter={handledepTimeFilter}
            deptimeRange={deptimeRange}
            arrtimeRange={arrtimeRange}
            handlearrTimeFilter={handlearrTimeFilter}
            handleShowAllStops={handleShowAllStops}
            checkedStops={checkedStops}
            handleCheckedstops={handleCheckedstops}
            handleShowAllairlinenames={handleShowAllairlinenames}
            airlines={airlines}
            handleChecked={handleChecked}
            setShowFilter={setShowFilter}
            applyFilters={applyFilters}
            handleChnageCurrency={handleChnageCurrency}
            airlineCodes={airlineCodes}
          />
        )}
        {openFilter === "airlines" && (
          <Airlines
            closeFilter={closeFilter}
            showFilter={showFilter}
            minFare={minFare}
            maxFare={maxFare}
            sliderValue={sliderValue}
            clearAllFilters={clearAllFilters}
            handleSliderChange={handleSliderChange}
            handledepTimeFilter={handledepTimeFilter}
            deptimeRange={deptimeRange}
            arrtimeRange={arrtimeRange}
            handlearrTimeFilter={handlearrTimeFilter}
            handleShowAllStops={handleShowAllStops}
            checkedStops={checkedStops}
            handleCheckedstops={handleCheckedstops}
            handleShowAllairlinenames={handleShowAllairlinenames}
            airlines={airlines}
            handleChecked={handleChecked}
            setShowFilter={setShowFilter}
            applyFilters={applyFilters}
            handleChnageCurrency={handleChnageCurrency}
            airlineCodes={airlineCodes}
          />
        )}
      </div>
    </div>
  );
};
