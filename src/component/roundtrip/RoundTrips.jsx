import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import Slider from "rc-slider";
import styled from "styled-components";
import "rc-slider/assets/index.css";
import "./RoundTrips.css";
import { ImPriceTags } from "react-icons/im";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  MdAccessTimeFilled,
  MdAirlines,
  MdFlight,
  MdOutlineFlight,
  MdSort,
  MdToggleOff,
  MdToggleOn,
} from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GoStopwatch } from "react-icons/go";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {
  IoRadioButtonOff,
  IoRadioButtonOffSharp,
  IoRadioButtonOnOutline,
  IoRadioButtonOnSharp,
} from "react-icons/io5";
import { flightSearch } from "../../redux/services/operations/flight";
import RoundTripSkeleton from "./RoundTripSkeleton";
import RoundTripDetail from "./RoundTripDetail";
import { cities12 } from "../../Cities";
import { RiRadioButtonLine } from "react-icons/ri";
import axios from "axios";
import ReSearchForm from "../Flight/FlightList/ReSearchForm";
import FilterBar from "../Flight/FlightList/FilterBar";
import RoundList from "./RoundList";
import Filter from "../Flight/FlightList/Filter/Filter";
import Sort from "../Flight/FlightList/Filter/Sort";
import Time from "../Flight/FlightList/Filter/Time";
import Airlines from "../Flight/FlightList/Filter/Airlines";

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
  { date: "Oct 03", price: "$7845" },
  { date: "Oct 04", price: "$5954" },
  { date: "Oct 05", price: "$4155" },
  { date: "Oct 06", price: "$5953" },
  { date: "Oct 07", price: "$5495" },
  { date: "Oct 08", price: "$5953" },
  { date: "Oct 09", price: "$4155" },
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

const RoundTrips = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);
  const [isNonStop, setIsNonStop] = useState(false);

  const [airlineCodes, setAirlineCodes] = useState([]);
  const searchResultRef = useRef(null);
  //  const handleScroll = () => {
  //     const scrollTop = listRef.current?.scrollTop || 0;
  //     setVisible(scrollTop > 150);
  //   };

  const handleChnageCurrency = (amount) => {
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

  const [tripsActive, setTripsActive] = useState(false);
  const [travellerActive, setTravellerActive] = useState(false);
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const { data: routeParams } = useParams();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.flight.search);
  const [updatedSearch, setUpdatedSearch] = useState({});
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeId2, setActiveId2] = useState(null);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [labelClicked, setLabelClicked] = useState(false);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);
  const [clickDestination, SetClickDestination] = useState(false);
  const [clickDestination2, SetClickDestination2] = useState(false);
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [destinationCity2, setDestinationCity2] = useState("");
  const [selectedCityCode2, setSelectedCityCode2] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [Visible, setVisible] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [checkedStops, setCheckedStops] = useState([]);
  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [infantCount, setInfantCount] = useState("");

  // const InboundResullt = (flight) => {
  //   console.log("Selected Inbound flight:", flight);
  //   setSelectedFlight(flight);
  // };
  // const InboundResullt2 = (flight) => {
  //   console.log("Selected Outbound flight:", flight);
  //   setSelectedFlight2(flight);
  // };
  const [deptimeRange, setdepTimeRange] = useState([0, 0]);
  const [arrtimeRange, setarrTimeRange] = useState([0, 0]);
  const [filteredInboundData, setFilteredInboundData] = useState(
    //  search && search.length > 0 ? search[0] : []
    Array.isArray(search) && search.length > 0 && Array.isArray(search[0])
      ? search[0]
      : []
  );
  const [filteredOutboundData, setFilteredOutboundData] = useState(
    Array.isArray(search) && search.length > 0 && Array.isArray(search[1])
      ? search[1]
      : []
  );
  console.log("filteredInboundData filteredInboundData", filteredInboundData);
  console.log(
    "filteredOutboundData filteredOutboundData",
    filteredOutboundData
  );
  const [airlines, setAirlines] = useState([]);
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);

  useEffect(() => {
    const searchData = parseSearchParams(routeParams);
    setDataSearch(searchData);
    setAdultCount(parseInt(searchData.AdultCount));
    setChildCount(parseInt(searchData.ChildCount));
    setInfantCount(parseInt(searchData.InfantCount));
    updateRoomsData(searchData);
    updateDates(searchData);
    if (parseInt(searchData.JourneyType) === 1) handleSearchFlight();
    else if (parseInt(searchData.JourneyType) === 2) handleSearchFlightRound();
    else if (parseInt(searchData.JourneyType) === 3)
      handleSearchFlightMultiPle();
    setDestinationCity(searchData.Segments[0].Origin);
    setDestinationCity2(searchData.Segments[0].Destination);
    setSearchInput(searchData.Segments[0].Origin);
    setSearchInput2(searchData.Segments[0].Destination);
    // console.log("cabin class flight", searchData.Segments[0].FlightCabinClass)
    setSelectedOption(parseInt(searchData.Segments[0].FlightCabinClass));

    const destCity = cities12.find(
      (city) => city.AIRPORTCODE === searchData.Segments[0].Origin
    );
    const destCity2 = cities12.find(
      (city) => city.AIRPORTCODE === searchData.Segments[0].Destination
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
      console.log("Search Data", updatedSearchData);

      const searchdataTJ_Round = {
        searchQuery: {
          cabinClass: "ECONOMY",
          paxInfo: {
            ADULT: updatedSearchData.AdultCount.toString(),
            CHILD: updatedSearchData.ChildCount.toString(),
            INFANT: updatedSearchData.InfantCount.toString(),
          },
          routeInfos: [
            {
              fromCityOrAirport: {
                code: updatedSearchData.Segments[0].Origin,
              },
              toCityOrAirport: {
                code: updatedSearchData.Segments[0].Destination,
              },
              travelDate: updatedSearchData.Segments[0].PreferredDepartureTime,
            },
            {
              fromCityOrAirport: {
                code: updatedSearchData.Segments[1].Origin,
              },
              toCityOrAirport: {
                code: updatedSearchData.Segments[1].Destination,
              },
              travelDate: updatedSearchData.Segments[1].PreferredArrivalTime,
            },
          ],
          searchModifiers: {
            isDirectFlight: true,
            isConnectingFlight: true,
          },
        },
      };
      console.log("searchdataTJ_Round", searchdataTJ_Round);

      // dispatch(flightSearch(updatedSearchData, navigate));
      const searchDataRound = {
        origin: updatedSearchData.Segments[0].Origin,
        destination: updatedSearchData.Segments[0].Destination,
        departureDate: updatedSearchData.Segments[0].PreferredDepartureTime,
        returnDate: updatedSearchData.Segments[1].PreferredDepartureTime,
        adult: updatedSearchData.AdultCount.toString(),
        child: updatedSearchData.ChildCount.toString(),
        infant: updatedSearchData.InfantCount.toString(),
        type: 2,
        cabin: updatedSearchData.Segments[0].FlightCabinClass,
        tboToken: token,
        partocrsSession: sessionId,
      };

      dispatch(flightSearch(searchDataRound, false, true, navigate))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    }
  }, [dataSearch, dispatch, navigate, token]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setBreakpoints();
  //   };
  //   window.addEventListener("resize", handleResize);
  //   setBreakpoints();
  //   return () => window.removeEventListener("resize", handleResize);
  // });

  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(false); // hide filter on scroll
    };

    const searchDiv = searchResultRef.current;

    if (searchDiv) {
      searchDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (searchDiv) {
        searchDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(search)) {
      if (Array.isArray(search[0])) {
        setFilteredInboundData(search[0]);
      } else {
        setFilteredInboundData([]);
      }

      if (Array.isArray(search[1])) {
        setFilteredOutboundData(search[1]);
      } else {
        setFilteredOutboundData([]);
      }
    } else {
      setFilteredInboundData([]);
      setFilteredOutboundData([]);
    }
  }, [search]);

  useEffect(() => {
    if (Array.isArray(search)) {
      const airlineData = [];

      if (Array.isArray(search[0])) {
        airlineData.push(
          ...search[0].map((flight) => ({
            name: flight.Segments[0][0].Airline.AirlineName,
            code: flight.Segments[0][0].Airline.AirlineCode,
            selected: false, // or true if you prefer selected by default
          }))
        );
      }

      if (Array.isArray(search[1])) {
        airlineData.push(
          ...search[1].map((flight) => ({
            name: flight.Segments[0][0].Airline.AirlineName,
            code: flight.Segments[0][0].Airline.AirlineCode,
            selected: false,
          }))
        );
      }

      // Remove duplicates by airline name
      const uniqueAirlinesMap = new Map();
      airlineData.forEach((airline) => {
        if (!uniqueAirlinesMap.has(airline.name)) {
          uniqueAirlinesMap.set(airline.name, airline);
        }
      });

      const uniqueAirlines = Array.from(uniqueAirlinesMap.values());

      // Update states
      setAirlines(uniqueAirlines);
      setAirlineCodes(uniqueAirlines.map((a) => a.code));

      console.log("Airlines:", uniqueAirlines);
    }
  }, [search]);

  useEffect(() => {
    if (Array.isArray(search)) {
      const allFares = [];

      if (Array.isArray(search[0])) {
        search[0].forEach((flight) => {
          const fare = flight.Fare?.PublishedFare;
          if (typeof fare === "number") allFares.push(fare);
        });
      }

      if (Array.isArray(search[1])) {
        search[1].forEach((flight) => {
          const fare = flight.Fare?.PublishedFare;
          if (typeof fare === "number") allFares.push(fare);
        });
      }

      if (allFares.length > 0) {
        const minFare = Math.min(...allFares);
        const maxFare = Math.max(...allFares);
        setMinFare(minFare);
        setMaxFare(maxFare);
        setSliderValue([minFare, maxFare]);
      }
    }
  }, [search]);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parseSearchParams = (data) => {
    const searchData = {
      Segments: [{}, {}],
    };
    const params = decodeURIComponent(data).split("*");

    params.forEach((param) => {
      const [key, value] = param.split("_");
      switch (key) {
        case "dest":
          searchData.Segments[0].Destination = value;
          searchData.Segments[1].Origin = value;
          break;
        case "org":
          searchData.Segments[0].Origin = value;
          searchData.Segments[1].Destination = value;
          break;
        case "dep":
          searchData.Segments[0].PreferredDepartureTime = value;
          searchData.Segments[0].PreferredArrivalTime = value;
          break;
        case "arr":
          searchData.Segments[1].PreferredArrivalTime = value;
          searchData.Segments[1].PreferredDepartureTime = value;

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
          searchData.Segments[1].FlightCabinClass = value;
          break;
        default:
          break;
      }
    });

    return searchData;
  };
  const [selectedOption, setSelectedOption] = useState(2);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
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
            : startDate.add(1, "day").startOf("day").format("YYYY-MM-DD"),
        },
      ],
    };
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
    const arrivalTime = moment(searchData.Segments[1].PreferredArrivalTime);
    setStartDate(departureTime);
    // active2 &&
    setEndDate(arrivalTime);
  };

  const handleClick = (id) => {
    setActiveId(activeId === id ? null : id);
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

  const handleMoreFare = (idx) => {
    setShowModal(showModal === idx ? null : idx);
  };
  const handlebookmodal = (idx) => {
    navigate(`/flight-detail/${encodeURIComponent(idx)}`);
    setShowModal(false);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
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

  // const applyFilters = () => {
  //   if (Object.keys(updatedSearch).length === 0 || isLoading) {
  //     return;
  //   }

  //   const selectedAirlines = airlines
  //     .filter((airline) => airline.selected)
  //     .map((airline) => airline.name);

  //   const newFilteredInboundData = updatedSearch["ONWARD"].filter((e) => {
  //     const fareInRange =
  //       e.overallFares.totalFare >= sliderValue[0] &&
  //       e.overallFares.totalFare <= sliderValue[1];

  //     const depTimeInRange =
  //       (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
  //       (new Date(e.sI[0].dt).getHours() >= deptimeRange[0] &&
  //         new Date(e.sI[0].dt).getHours() <= deptimeRange[1]);

  //     const arrTimeInRange =
  //       (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
  //       (new Date(e.sI[0].at).getHours() >= arrtimeRange[0] &&
  //         new Date(e.sI[0].at).getHours() <= arrtimeRange[1]);

  //     const isAirlineSelected =
  //       selectedAirlines.length === 0 ||
  //       selectedAirlines.includes(e.sI[0].fD.aI.name);

  //     let stopCountMatch = false;
  //     if (checkedStops.length === 0) {
  //       stopCountMatch = true;
  //     } else {
  //       const stopCount = e.sI.length - 1;
  //       if (checkedStops.includes("non-stop") && stopCount === 0) {
  //         stopCountMatch = true;
  //       } else if (checkedStops.includes("1-stop") && stopCount === 1) {
  //         stopCountMatch = true;
  //       } else if (checkedStops.includes("2-stop") && stopCount === 2) {
  //         stopCountMatch = true;
  //       } else if (checkedStops.includes("3-stop") && stopCount >= 3) {
  //         stopCountMatch = true;
  //       }
  //     }
  //     return (
  //       fareInRange &&
  //       depTimeInRange &&
  //       arrTimeInRange &&
  //       isAirlineSelected &&
  //       stopCountMatch
  //     );
  //   });

  //   const newFilteredOutboundData =
  //     updatedSearch["RETURN"] &&
  //     updatedSearch["RETURN"].filter((e) => {
  //       const fareInRange =
  //         e.overallFares.totalFare >= sliderValue[0] &&
  //         e.overallFares.totalFare <= sliderValue[1];

  //       const depTimeInRange =
  //         (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
  //         (new Date(e.sI[0].dt).getHours() >= deptimeRange[0] &&
  //           new Date(e.sI[0].dt).getHours() <= deptimeRange[1]);

  //       const arrTimeInRange =
  //         (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
  //         (new Date(e.sI[0].at).getHours() >= arrtimeRange[0] &&
  //           new Date(e.sI[0].at).getHours() <= arrtimeRange[1]);

  //       const isAirlineSelected =
  //         selectedAirlines.length === 0 ||
  //         selectedAirlines.includes(e.sI[0].fD.aI.name);

  //       let stopCountMatch = false;
  //       if (checkedStops.length === 0) {
  //         stopCountMatch = true;
  //       } else {
  //         const stopCount = e.sI.length - 1;
  //         if (checkedStops.includes("non-stop") && stopCount === 0) {
  //           stopCountMatch = true;
  //         } else if (checkedStops.includes("1-stop") && stopCount === 1) {
  //           stopCountMatch = true;
  //         } else if (checkedStops.includes("2-stop") && stopCount >= 2) {
  //           stopCountMatch = true;
  //         }

  //       }
  //       return (
  //         fareInRange &&
  //         depTimeInRange &&
  //         arrTimeInRange &&
  //         isAirlineSelected &&
  //         stopCountMatch
  //       );
  //     });
  //   setFilteredInboundData(newFilteredInboundData);
  //   InboundResullt(newFilteredInboundData[0]);
  //   console.log("Filtered Inbound Data:", newFilteredInboundData);
  //   setFilteredOutboundData(newFilteredOutboundData);
  //   InboundResullt2(newFilteredOutboundData && newFilteredOutboundData[0]);
  //   console.log("Filtered Outbound Data:", newFilteredOutboundData);
  // };

  const applyFilters = () => {
    if (!search || isLoading) return;

    const selectedAirlines = airlines
      .filter((airline) => airline.selected)
      .map((airline) => airline.name);

    const filterFlights = (flights) => {
      return flights.filter((e) => {
        const fareInRange =
          e.Fare.PublishedFare >= sliderValue[0] &&
          e.Fare.PublishedFare <= sliderValue[1];

        const depTimeInRange =
          (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
          (new Date(e.Segments[0][0].Origin.DepTime).getHours() >=
            deptimeRange[0] &&
            new Date(e.Segments[0][0].Origin.DepTime).getHours() <=
              deptimeRange[1]);

        const arrTimeInRange =
          (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
          (new Date(e.Segments[0][0].Destination.ArrTime).getHours() >=
            arrtimeRange[0] &&
            new Date(e.Segments[0][0].Destination.ArrTime).getHours() <=
              arrtimeRange[1]);

        const isAirlineSelected =
          selectedAirlines.length === 0 ||
          selectedAirlines.includes(e.Segments[0][0].Airline.AirlineName);

        let stopCountMatch = false;
        if (checkedStops.length === 0) {
          stopCountMatch = true;
        } else {
          const stopCount = e.Segments[0].length - 1;
          if (checkedStops.includes("non-stop") && stopCount === 0) {
            stopCountMatch = true;
          } else if (checkedStops.includes("1-stop") && stopCount === 1) {
            stopCountMatch = true;
          } else if (checkedStops.includes("2-stop") && stopCount === 2) {
            stopCountMatch = true;
          } else if (checkedStops.includes("3-stop") && stopCount >= 3) {
            stopCountMatch = true;
          }
        }

        return (
          fareInRange &&
          depTimeInRange &&
          arrTimeInRange &&
          isAirlineSelected &&
          stopCountMatch
        );
      });
    };

    // Apply to search[0] (ONWARD)
    const newFilteredInboundData = Array.isArray(search[0])
      ? filterFlights(search[0])
      : [];

    // Apply to search[1] (RETURN)
    const newFilteredOutboundData = Array.isArray(search[1])
      ? filterFlights(search[1])
      : [];

    setFilteredInboundData(newFilteredInboundData);
    InboundResullt(newFilteredInboundData[0]);
    console.log("Filtered Inbound Data:", newFilteredInboundData);

    setFilteredOutboundData(newFilteredOutboundData);
    InboundResullt2(newFilteredOutboundData[0]);
    console.log("Filtered Outbound Data:", newFilteredOutboundData);
  };

  const handleChecked = (airlineName) => {
    const updatedAirlines = airlines.map((airline) =>
      airline.name === airlineName
        ? { ...airline, selected: !airline.selected }
        : airline
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
    setdepTimeRange([0, 0]);
    setarrTimeRange([0, 0]);
    setCheckedStops([]);

    const updatedAirlines = airlines.map((airline) => ({
      ...airline,
      selected: true,
    }));
    setAirlines(updatedAirlines);
  };

  const [selectedFlight, setSelectedFlight] = useState(filteredInboundData[0]);
  const [selectedFlight2, setSelectedFlight2] = useState(
    filteredOutboundData && filteredOutboundData[0]
  );
  // console.log("Selectet flu8t4gligewriylfgkw", selectedFlight);

  const InboundResullt = (flight) => {
    console.log("Selected Inbound flight:", flight);
    setSelectedFlight(flight);
  };

  const InboundResullt2 = (flight) => {
    console.log("Selected Outbound flight:", flight);
    setSelectedFlight2(flight);
  };

  const handleClickDetail = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleBookRound = () => {
    navigate(
      `/flight-detail/${encodeURIComponent(
        selectedFlight.ResultIndex
      )}/${encodeURIComponent(selectedFlight2.ResultIndex)}/undefined`
    );
  };

  const [searchInput, setSearchInput] = useState(destinationCity);
  const [searchInput2, setSearchInput2] = useState(destinationCity2);
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
    setSearchInput(value.toUpperCase());
    fetchDatas(value);
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
                  user.AIRPORTNAME.toLowerCase().includes(value)) ||
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
    setSearchInput2(value.toUpperCase());
    fetchDatass(value);
    SetClickDestination2(true);
    setIsItemSelected2(false);
  };

  useEffect(() => {
    applyFilters();
  }, [
    search,
    sliderValue,
    deptimeRange,
    arrtimeRange,
    airlines,
    checkedStops,
    updatedSearch,
  ]);

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
      id="full-container"
      className="roundtrippg"
      style={{ position: "relative" }}
    >
      <div className="bgGradient"></div>
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
        appDisk="round_list"
        handleSwapInputs={handleSwapInputs}
      />

      <section id="content">
        <div className="content-wrap">
          <div className="section-flat single_sec_flat">
            <div className="section-content">
              <div className="modify_search_sec">
                <Container>
                  <Row>
                    <Col md={12}>
                      <div className="page-single-content sidebar-left mt-10 roundtrip_search custom_page_search">
                        <Row>
                          <FilterBar
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
                            handleShowAllairlinenames={
                              handleShowAllairlinenames
                            }
                            airlines={airlines}
                            handleChecked={handleChecked}
                            setShowFilter={setShowFilter}
                            applyFilters={applyFilters}
                            handleChnageCurrency={handleChnageCurrency}
                          />
                          <Col
                            lg={9}
                            md={9}
                            lgPush={3}
                            mdPush={3}
                            sm={12}
                            className="pad_xs_10 cus_col_9"
                          >
                            <div className="search_result_inner" id="offer_1">
                              <Row>
                                <RoundList
                                  search={search && search[0]}
                                  isLoading={isLoading}
                                  destinationCity={destinationCity}
                                  destinationCity2={destinationCity2}
                                  startDate={startDate}
                                  filteredInboundData={filteredInboundData}
                                  handleChnageCurrency={handleChnageCurrency}
                                  selectedFlight={selectedFlight}
                                  InboundResullt={InboundResullt}
                                  handleClickDetail={handleClickDetail}
                                  activeId={activeId}
                                  endDate={endDate}
                                />
                                <RoundList
                                  search={search && search[1]}
                                  isLoading={isLoading}
                                  destinationCity={destinationCity2}
                                  destinationCity2={destinationCity}
                                  startDate={endDate}
                                  filteredInboundData={filteredOutboundData}
                                  handleChnageCurrency={handleChnageCurrency}
                                  selectedFlight={selectedFlight2}
                                  InboundResullt={InboundResullt2}
                                  handleClickDetail={handleClickDetail}
                                  activeId={activeId}
                                  endDate={endDate}
                                />
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <div
                    className={`filter_bar_flightList ${
                      Visible ? "visible" : "hidden"
                    }`}
                  >
                    <div className="menu-container">
                      <div
                        className="menu-item"
                        onClick={() => toggleFilter("filter")}
                      >
                        <FaFilter className="icon" size={22} />
                        Filter
                      </div>
                      <div
                        className="menu-item"
                        onClick={() => setIsNonStop((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        {isNonStop ? (
                          <MdToggleOn
                            className="icon"
                            size={30}
                            color="#053355"
                            onClick={() => handleCheckedstops("1-stop")}
                          />
                        ) : (
                          <MdToggleOff
                            className="icon"
                            size={30}
                            onClick={() => handleCheckedstops("non-stop")}
                          />
                        )}
                        Stops
                      </div>
                      <div
                        className="menu-item"
                        onClick={() => toggleFilter("time")}
                      >
                        <MdAccessTimeFilled className="icon" size={22} />
                        Time
                      </div>
                      <div
                        className="menu-item"
                        onClick={() => toggleFilter("airlines")}
                      >
                        <MdAirlines className="icon" size={22} />
                        Airline
                      </div>
                      <div
                        className="menu-item"
                        onClick={() => toggleFilter("sort")}
                      >
                        <MdSort className="icon" size={22} />
                        Sort
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`sticky_bottom rount_trip_grand_total ${
          isSticky ? "round_list_page_sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row col_mob_60">
            <div className="col-sm-4 col-xs-6 brder_rgt stick_col_4">
              {selectedFlight && !isLoading ? (
                <div>
                  <div className="stk_btm_sec" id="InboundFlight">
                    <ul>
                      {" "}
                      <li className="flight_txt">
                        <img
                          className="hide_mob"
                          src={`/Images/AirlineLogo/${selectedFlight.Segments[0][0].Airline.AirlineCode}.gif`}
                          alt="Air India"
                        />{" "}
                        <div className="flight_name">
                          {selectedFlight.Segments[0][0].Airline.AirlineName}
                          <span className="flight_no">
                            {selectedFlight.Segments[0][0].Airline.FlightNumber}
                            -{" "}
                            {selectedFlight.Segments[0][0].Airline.AirlineCode}
                          </span>
                        </div>{" "}
                      </li>{" "}
                      <li className="flight_duration hide_mob">
                        {" "}
                        <div className="depart_time cus_time">
                          <span>
                            {" "}
                            {new Date(
                              selectedFlight.Segments[0][0].Origin.DepTime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                          {
                            selectedFlight.Segments[0][0].Origin.Airport
                              .CityName
                          }
                        </div>{" "}
                        <div className="arrow">
                          {" "}
                          <i
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          />{" "}
                        </div>{" "}
                        <div className="arrive_time cus_time">
                          <span>
                            {" "}
                            {new Date(
                              selectedFlight.Segments[0][
                                selectedFlight.Segments[0].length - 1
                              ].Destination.ArrTime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                          {
                            selectedFlight.Segments[0][
                              selectedFlight.Segments[0].length - 1
                            ].Destination.Airport.CityName
                          }
                        </div>{" "}
                      </li>{" "}
                      <li className="flight_price">
                        {" "}
                        $ {Math.round(selectedFlight.Fare.PublishedFare)}
                      </li>{" "}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-4 col-xs-6 brder_rgt stick_col_4">
              {selectedFlight2 && !isLoading ? (
                <div className="stk_btm_sec" id="OutboundFlight">
                  <ul>
                    {" "}
                    <li className="flight_txt">
                      {" "}
                      <img
                        className="hide_mob"
                        src={`/Images/AirlineLogo/${selectedFlight2.Segments[0][0].Airline.AirlineCode}.gif`}
                        alt="Vistara"
                      />{" "}
                      <div className="flight_name">
                        {selectedFlight2.Segments[0][0].Airline.AirlineName}
                        <span className="flight_no">
                          {" "}
                          {
                            selectedFlight2.Segments[0][0].Airline.FlightNumber
                          }-{" "}
                          {selectedFlight2.Segments[0][0].Airline.AirlineCode}
                        </span>
                      </div>{" "}
                    </li>{" "}
                    <li className="flight_duration hide_mob">
                      {" "}
                      <div className="depart_time cus_time">
                        <span>
                          {" "}
                          {new Date(
                            selectedFlight2.Segments[0][0].Origin.DepTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                        {selectedFlight2.Segments[0][0].Origin.Airport.CityName}
                      </div>{" "}
                      <div className="arrow">
                        {" "}
                        <i
                          className="fa fa-arrow-right"
                          aria-hidden="true"
                        />{" "}
                      </div>{" "}
                      <div className="arrive_time cus_time">
                        <span>
                          {new Date(
                            selectedFlight2.Segments[0][
                              selectedFlight2.Segments[0].length - 1
                            ].Destination.ArrTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>{" "}
                        {
                          selectedFlight2.Segments[0][
                            selectedFlight2.Segments[0].length - 1
                          ].Destination.Airport.CityName
                        }
                      </div>{" "}
                    </li>{" "}
                    <li className="flight_price">
                      {" "}
                      $ {Math.round(selectedFlight2.Fare.PublishedFare)}
                    </li>{" "}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-4 col-xs-12 stick_col_4">
              <div className="stk_grand_total ">
                {selectedFlight && selectedFlight2 && !isLoading ? (
                  <ul>
                    <li className="grandtotal_txt">
                      Grand Total{" "}
                      <span>
                        <span id="totalamount">
                          ${" "}
                          {Math.round(
                            selectedFlight.Fare.PublishedFare +
                              selectedFlight2.Fare.PublishedFare
                          )}
                        </span>
                      </span>
                    </li>
                    <li className="grandtotal_btn hide_mob">
                      <button onClick={() => handleBookRound()} className="btn">
                        BooK Now
                      </button>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
                <div className="clearfix" />
              </div>
            </div>
            <div className="clearfix" />
          </div>
          <div className="col_mob_40 hide_desk">
            <div className="grandtotal_btn">
              <button onClick={() => handleBookRound()} className="btn">
                BooK Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border p-3">
        {openFilter === "filter" && (
          <Filter
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
        {openFilter === "sort" && (
          <Sort clearAllFilters={clearAllFilters} closeFilter={closeFilter} />
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

export default RoundTrips;
