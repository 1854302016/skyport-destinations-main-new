import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// import "./FlightList.css";
import {
  MdFlight,
  MdOutlineAccessTimeFilled,
  MdOutlineFlight,
  MdOutlineSort,
} from "react-icons/md";
import leftArrow from "../FlightList/images/leftArrow.png";
import rightArrow from "../FlightList/images/rightArrow.png";
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { GiAirplaneArrival } from "react-icons/gi";
import { GoStopwatch } from "react-icons/go";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdAirlines } from "react-icons/md";
import { MdSort } from "react-icons/md";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

import { FlightListInfo, formatTime } from "../FlightList/FlightListInfo";
import { BsArrowLeftRight, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaFilter, FaRupeeSign } from "react-icons/fa";
import { flightSearch } from "../../../redux/services/operations/flight";
import { useSelector, useDispatch } from "react-redux";
// import FlightListSkeleton from "./FlightListSkeleton";
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
// import FlightListCard from "./FlightListCard";
// import FilterBar from "./FilterBar";
// import ReSearchForm from "./ReSearchForm";
import axios from "axios";
import ReSearchForm from "../FlightList/ReSearchForm";
import FilterBar from "../FlightList/FilterBar";
import InternationalFlightListCard from "./InternationalFlightListCard";
import FlightListSkeleton from "../FlightList/FlightListSkeleton";
import { toast } from "react-toastify";
import Filter from "../FlightList/Filter/Filter";
import Sort from "../FlightList/Filter/Sort";
import Time from "../FlightList/Filter/Time";
import Airlines from "../FlightList/Filter/Airlines";
import { airlinesnames } from "../../../Airlines";
import { TbFilterFilled } from "react-icons/tb";
import { SiChinasouthernairlines } from "react-icons/si";

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

export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};

const FlightInternational = () => {
  // const [minFare, setMinFare] = useState(500);
  // const [maxFare, setMaxFare] = useState(10000);
  // const [sliderValue, setSliderValue] = useState([500, 5000]);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);

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
  // const [activeId, setActiveId] = useState(1);
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { data: routeParams } = useParams();
  const dispatch = useDispatch();

  const sessionId = localStorage.getItem("sessionId");
  const traceId = String(sessionStorage.getItem("traceId"));
  const search = useSelector((state) => state.flight.search);
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
  const [Visible, setVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [checkedStops, setCheckedStops] = useState([]);

  const handleScrollss = () => {
    const scrollTop = window.pageYOffset;
    setVisible(scrollTop > 150);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollss);
    return () => {
      window.removeEventListener("scroll", handleScrollss);
    };
  }, []);
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
    search && search.length > 0 ? search : [],
  );
  const [filteredOutboundData, setFilteredOutboundData] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);
  const [baggageFilters, setBaggageFilters] = useState([]);

  useEffect(() => {
    const searchData = parseSearchParams(routeParams);
    setDataSearch(searchData);
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
      (city) => city.AIRPORTCODE === searchData.Segments[0].Origin,
    );
    const destCity2 = cities12.find(
      (city) => city.AIRPORTCODE === searchData.Segments[0].Destination,
    );
    setDestination1(destCity);
    setDestination2(destCity2);
  }, [routeParams]);

  const cabinmapping = {
    1: "Default",
    2: "Y",
    3: "Y",
    4: "C",
    5: "C",
    6: "F",
  };
  console.log("searchhhhh", search);

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

      const searchdataParto = {
        PricingSourceType: "All",
        RequestOption: "All",
        SessionId: sessionId,
        AdultCount: updatedSearchData.AdultCount.toString(),
        ChildCount: updatedSearchData.ChildCount.toString(),
        InfantCount: updatedSearchData.InfantCount.toString(),
        TravelPreference: {
          CabinType:
            cabinmapping[updatedSearchData.Segments[0].FlightCabinClass],
          MaxStopsQuantity: "All",
          AirTripType: "Return",
        },
        OriginDestinationInformations: [
          {
            DepartureDateTime:
              updatedSearchData.Segments[0].PreferredDepartureTime,
            DestinationLocationCode: updatedSearchData.Segments[0].Destination,
            DestinationType: "2",
            OriginLocationCode: updatedSearchData.Segments[0].Origin,
            OriginType: "2",
          },
          {
            DepartureDateTime:
              updatedSearchData.Segments[1].PreferredDepartureTime,
            DestinationLocationCode: updatedSearchData.Segments[1].Destination,
            DestinationType: "2",
            OriginLocationCode: updatedSearchData.Segments[1].Origin,
            OriginType: "2",
          },
        ],
      };

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

      const searchDataInternational = {
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

      dispatch(flightSearch(searchDataInternational, false, true, navigate))
        // dispatch(flightSearch(searchDataInternational, navigate))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    }
  }, [dataSearch, dispatch, navigate, token]);

  useEffect(() => {
    if (search && search.length > 0) {
      setFilteredInboundData(search);
    }
  }, [search]);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints();
    };
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  });

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilter = (name) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };
  const closeFilter = () => {
    setOpenFilter(null);
  };
  // useEffect(() => {
  //   if (search && search.length > 1) {
  //     InboundResullt(search[0]);
  //     InboundResullt2(search[1]);
  //   }
  // }, [search]);

  // useEffect(() => {
  //   if (search && search.length > 0) {
  //     const airlineNames = search.flatMap((option) =>
  //       option.OriginDestinationOptions.flatMap((destination) =>
  //         destination.FlightSegments.map((segment) => ({
  //           name: segment.OperatingAirline.EquipmentName,
  //           selected: true,
  //         }))
  //       )
  //     );

  //     const uniqueAirlines = Array.from(
  //       new Set(airlineNames.map((airline) => airline.name))
  //     );

  //     const uniqueAirlinesWithSelected = uniqueAirlines.map((airlineName) => ({
  //       name: airlineName,
  //       selected: true,
  //     }));

  //     setAirlines(uniqueAirlinesWithSelected);
  //     console.log("airlines", uniqueAirlinesWithSelected);
  //   }
  // }, [search]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  // useEffect(() => {
  //   if (!search || search.length === 0) return;

  //   const airlineData = [];
  //   const baggageSet = new Map();

  //   search[0].forEach((flight) => {
  //     if (!flight?.Segments || flight.Segments.length === 0) return;

  //     // Loop through both segments (outbound and inbound)
  //     flight.Segments.forEach((segment) => {
  //       if (!segment || segment.length === 0) return;

  //       const firstLeg = segment[0];
  //       const airline = firstLeg?.Airline;
  //       const baggage = firstLeg?.Baggage;

  //       // Airline extraction
  //       if (airline?.AirlineName && airline?.AirlineCode) {
  //         airlineData.push({
  //           name: airline.AirlineName,
  //           code: airline.AirlineCode,
  //         });
  //       }

  //       // Baggage extraction
  //       if (baggage) {
  //         const normalized = baggage.toLowerCase().replace(/\s+/g, "");
  //         if (!baggageSet.has(normalized)) {
  //           baggageSet.set(normalized, baggage); // preserve original value
  //         }
  //       }
  //     });
  //   });

  //   // Unique airlines
  //   const uniqueAirlines = Array.from(
  //     new Map(airlineData.map((item) => [item.name, item])).values()
  //   );

  //   const airlineNames = uniqueAirlines.map((item) => ({
  //     name: item.name,
  //     selected: false,
  //   }));

  //   const airlineCodes = uniqueAirlines.map((item) => item.code);

  //   // Set airline states
  //   setAirlines(airlineNames);
  //   setAirlineCodes(airlineCodes);

  //   console.log("Airlines with Names and Selection Status:", airlineNames);
  //   console.log("Airline Codes:", airlineCodes);
  // }, [search]);

  // useEffect(() => {
  //   if (search && search.length > 0) {
  //     const fares = search[0].map((flight) => flight?.Fare?.PublishedFare ?? 0);

  //     const minFare = Math.min(...fares);
  //     const maxFare = Math.max(...fares);

  //     setMinFare(minFare);
  //     setMaxFare(maxFare);
  //     setSliderValue([minFare, maxFare]);
  //   }
  // }, [search]);

  useEffect(() => {
    if (search && search.length > 0) {
      const airlineNames = search
        .flatMap((option) =>
          option.OriginDestinationOptions.flatMap((destination) =>
            destination.FlightSegments.map((segment) => {
              // Check if OperatingAirline and its Code exist before proceeding
              if (segment.OperatingAirline && segment.OperatingAirline.Code) {
                const airline = airlinesnames.find(
                  (airline) =>
                    airline &&
                    airline.AirlineCode === segment.OperatingAirline.Code,
                );
                return airline
                  ? { name: airline.AirlineName, selected: false }
                  : null;
              }
              return null; // Return null if OperatingAirline or its Code is missing
            }),
          ),
        )
        .filter((airline) => airline && airline.name); // Filter out null values and airlines without a name

      const uniqueAirlines = Array.from(
        new Set(airlineNames.map((airline) => airline.name)),
      );

      const uniqueAirlinesWithSelected = uniqueAirlines.map((airlineName) => ({
        name: airlineName,
        selected: false,
      }));

      setAirlines(uniqueAirlinesWithSelected);
      console.log("airlines", uniqueAirlinesWithSelected);

      // const baggageOptions = search
      //   .flatMap((option) =>
      //     option.OriginDestinationOptions.flatMap((destination) =>
      //       destination.FlightSegments.map((segment) => segment.Baggage)
      //     )
      //   )
      //   .filter((baggage) => baggage);
      // const baggageMap = new Map();
      // baggageOptions.forEach((baggage) => {
      //   const normalizedBaggage =
      //     baggage && baggage.toLowerCase().replace(/\s+/g, "");
      //   if (!baggageMap.has(normalizedBaggage)) {
      //     baggageMap.set(normalizedBaggage, baggage); // Store the original baggage
      //   }
      // });

      // // Extract unique baggage values and store them for filters
      // const uniqueBaggageWithSelected = Array.from(baggageMap.values()).map(
      //   (baggageValue) => ({
      //     value: baggageValue,
      //     selected: false,
      //   })
      // );
      // setBaggageFilters(uniqueBaggageWithSelected);

      // console.log("Baggage options", uniqueBaggageWithSelected);
    }
  }, [search]);

  useEffect(() => {
    if (search && search.length > 0) {
      const allFares = search.flatMap(
        (flight) =>
          flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
      );

      const minFare = Math.min(...allFares);
      const maxFare = Math.max(...allFares);

      setMinFare(minFare);
      setMaxFare(maxFare);
      setSliderValue([minFare, maxFare]);
    }
  }, [search]);

  useEffect(() => {
    applyFilters();
  }, [search, sliderValue, deptimeRange, arrtimeRange, airlines, checkedStops]);

  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [infantCount, setInfantCount] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState({});
  // useEffect(() => {
  //   if (Object.keys(search.COMBO).length > 0) {
  //     const updatedSearchData = { ...search.COMBO };

  //     for (let key in updatedSearchData) {
  //       if (
  //         updatedSearchData.hasOwnProperty(key) &&
  //         Array.isArray(updatedSearchData[key])
  //       ) {
  //         updatedSearchData[key] = updatedSearchData[key].map((flight) => {
  //           const adultFare = flight.totalPriceList[0].fd.ADULT.fC;
  //           const childFare = flight.totalPriceList[0].fd.CHILD
  //             ? flight.totalPriceList[0].fd.CHILD.fC
  //             : { TF: 0, NF: 0, BF: 0, TAF: 0 };
  //           const infantFare = flight.totalPriceList[0].fd.INFANT
  //             ? flight.totalPriceList[0].fd.INFANT.fC
  //             : { TF: 0, NF: 0, BF: 0, TAF: 0 };

  //           const totalBaseFare =
  //             adultFare.BF * adultCount +
  //             childFare.BF * childCount +
  //             infantFare.BF * infantCount;
  //           const totalNetFare =
  //             adultFare.NF * adultCount +
  //             childFare.NF * childCount +
  //             infantFare.NF * infantCount;
  //           const totalTax =
  //             adultFare.TAF * adultCount +
  //             childFare.TAF * childCount +
  //             infantFare.TAF * infantCount;
  //           const totalFare =
  //             adultFare.TF * adultCount +
  //             childFare.TF * childCount +
  //             infantFare.TF * infantCount;

  //           return {
  //             ...flight,
  //             overallFares: {
  //               totalBaseFare,
  //               totalNetFare,
  //               totalTax,
  //               totalFare,
  //               adultCount,
  //               childCount,
  //               infantCount,
  //             },
  //           };
  //         });
  //       }
  //     }

  //     setUpdatedSearch(updatedSearchData);
  //   }
  // }, [search, dataSearch]);

  // useEffect(() => {
  //   if (search) {
  //     const allFares = search.COMBO[0].totalPriceList.flatMap(
  //       (flight) => flight.fd.fC.TF
  //     );

  //     const minFare = Math.min(...allFares);
  //     const maxFare = Math.max(...allFares);

  //     setMinFare(minFare);
  //     setMaxFare(maxFare);
  //     setSliderValue([minFare, maxFare]);
  //   }
  // }, [search]);

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
  const [selectedOption, setSelectedOption] = useState(2);
  const [sortType, setSortType] = useState("price");

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
          `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`,
        )}`,
      );
    }

    if (active2) {
      if (destination1.COUNTRYCODE !== destination2.COUNTRYCODE) {
        window.location.assign(
          `/international-round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`,
          )}`,
        );
      }
      // else {
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
    const arrivalTime = moment(searchData.Segments[1].PreferredArrivalTime);
    setStartDate(departureTime);
    // active2 &&
    setEndDate(arrivalTime);
  };

  // const handleClick = (id) => {
  //   setActiveId(activeId === id ? null : id);
  // };

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
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setVisible(scrollTop > 300);
  };

  // const applyFilters = () => {
  //   if (!search || isLoading) return;

  //   const selectedAirlines = airlines
  //     .filter((airline) => airline.selected)
  //     .map((airline) => airline.name);

  //   const isTimeInRange = (dateStr, range) => {
  //     const hour = new Date(dateStr).getHours();
  //     return range[0] === 0 && range[1] === 0
  //       ? true
  //       : hour >= range[0] && hour <= range[1];
  //   };

  //   const filtered = search.map((group) => {
  //     // if no filters are applied, keep the group as is
  //     const groupHasFilters =
  //       sliderValue[0] !== minFare ||
  //       sliderValue[1] !== maxFare ||
  //       deptimeRange[0] !== 0 ||
  //       deptimeRange[1] !== 0 ||
  //       arrtimeRange[0] !== 0 ||
  //       arrtimeRange[1] !== 0 ||
  //       selectedAirlines.length !== airlines.length ||
  //       checkedStops.length !== 3;

  //     if (!groupHasFilters) return group; // no filters active, keep group as is

  //     const filteredGroup = group.filter((flight) => {
  //       if (!flight?.Fare || !flight?.Segments) return false;

  //       const fare = flight.Fare.PublishedFare ?? 0;
  //       const fareInRange = fare >= sliderValue[0] && fare <= sliderValue[1];

  //       const depTimeMatch =
  //         flight.Segments?.[0]?.[0]?.Origin?.DepTime &&
  //         isTimeInRange(flight.Segments[0][0].Origin.DepTime, deptimeRange) &&
  //         (!flight.Segments[1] ||
  //           isTimeInRange(flight.Segments[1][0].Origin.DepTime, deptimeRange));

  //       const arrTimeMatch =
  //         flight.Segments?.[0]?.[0]?.Destination?.ArrTime &&
  //         isTimeInRange(
  //           flight.Segments[0][0].Destination.ArrTime,
  //           arrtimeRange
  //         ) &&
  //         (!flight.Segments[1] ||
  //           isTimeInRange(
  //             flight.Segments[1][0].Destination.ArrTime,
  //             arrtimeRange
  //           ));

  //       const airlineMatch =
  //         selectedAirlines.length === 0 ||
  //         (selectedAirlines.includes(
  //           flight.Segments[0][0].Airline.AirlineName
  //         ) &&
  //           (!flight.Segments[1] ||
  //             selectedAirlines.includes(
  //               flight.Segments[1][0].Airline.AirlineName
  //             )));

  //       const outboundStops = flight.Segments[0]?.length - 1;
  //       const returnStops = flight.Segments[1]
  //         ? flight.Segments[1].length - 1
  //         : 0;

  //       const stopCountMatch =
  //         checkedStops.length === 0 ||
  //         [outboundStops, returnStops].every((stopCount) => {
  //           return (
  //             (checkedStops.includes("non-stop") && stopCount === 0) ||
  //             (checkedStops.includes("1-stop") && stopCount === 1) ||
  //             (checkedStops.includes("2-stop") && stopCount >= 2)
  //           );
  //         });

  //       return (
  //         fareInRange &&
  //         depTimeMatch &&
  //         arrTimeMatch &&
  //         airlineMatch &&
  //         stopCountMatch
  //       );
  //     });

  //     return filteredGroup.length > 0 ? filteredGroup : group; // fallback to original group if nothing matched
  //   });

  //   setFilteredInboundData(filtered);
  //   console.log("Filtered Data:", filtered);
  // };

  const applyFilters = () => {
    if (!search || isLoading) {
      return;
    }

    const selectedAirlines = airlines
      .filter((airline) => airline.selected)
      .map((airline) => airline.name);

    const selectedBaggage = baggageFilters
      .filter((baggage) => baggage.selected)
      .map((baggage) => baggage.value);

    const getTotalDuration = (itin) => {
      return itin.OriginDestinationOptions.reduce((total, opt) => {
        return (
          total + opt.FlightSegments.reduce((sum, seg) => sum + seg.Duration, 0)
        );
      }, 0);
    };

    let newFilteredInboundData =
      search &&
      search.filter((e) => {
        const fareInRange =
          e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount >=
            sliderValue[0] &&
          e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount <=
            sliderValue[1];

        const depTimeInRange =
          (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
          (new Date(
            e.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime,
          ).getHours() >= deptimeRange[0] &&
            new Date(
              e.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime,
            ).getHours() < deptimeRange[1]);

        const arrTimeInRange =
          (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
          (new Date(
            e.OriginDestinationOptions[0].FlightSegments[0].ArrivalDateTime,
          ).getHours() >= arrtimeRange[0] &&
            new Date(
              e.OriginDestinationOptions[0].FlightSegments[0].ArrivalDateTime,
            ).getHours() < arrtimeRange[1]);

        const isBaggageSelected =
          selectedBaggage.length === 0 ||
          selectedBaggage.includes(
            e.OriginDestinationOptions[0].FlightSegments[0].Baggage,
          );

        const isAirlineSelected =
          selectedAirlines.length === 0 ||
          selectedAirlines.includes(
            airlinesnames.find(
              (airline) =>
                airline.AirlineCode ===
                e.OriginDestinationOptions[0].FlightSegments[0].OperatingAirline
                  .Code,
            ).AirlineName,
          );

        let stopCountMatch = false;
        if (checkedStops.length === 0) {
          stopCountMatch = true;
        } else {
          // Check all segments (outbound and inbound if available)
          const allStops = e.OriginDestinationOptions.map(
            (option) => option.FlightSegments.length - 1,
          );

          stopCountMatch = allStops.every((stopCount) => {
            if (checkedStops.includes("non-stop") && stopCount === 0)
              return true;
            if (checkedStops.includes("1-stop") && stopCount === 1) return true;
            if (checkedStops.includes("2-stop") && stopCount === 2) return true;
            if (checkedStops.includes("3-stop") && stopCount >= 3) return true;
            return false;
          });
        }
        return (
          fareInRange &&
          depTimeInRange &&
          arrTimeInRange &&
          isBaggageSelected &&
          isAirlineSelected &&
          stopCountMatch
        );
      });

    // SORTING STARTS HERE
    if (sortType === "price") {
      newFilteredInboundData.sort(
        (a, b) =>
          a.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount -
          b.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
      );
    }

    if (sortType === "departure") {
      newFilteredInboundData.sort(
        (a, b) =>
          new Date(
            a.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime,
          ) -
          new Date(
            b.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime,
          ),
      );
    }

    if (sortType === "fastest") {
      newFilteredInboundData.sort(
        (a, b) => getTotalDuration(a) - getTotalDuration(b),
      );
    }

    if (sortType === "smart") {
      newFilteredInboundData.sort((a, b) => {
        const stopA = a.OriginDestinationOptions[0].FlightSegments.length - 1;
        const stopB = b.OriginDestinationOptions[0].FlightSegments.length - 1;

        const durA = getTotalDuration(a);
        const durB = getTotalDuration(b);

        const priceA = a.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
        const priceB = b.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;

        const scoreA = stopA * 5000 + durA * 2 + priceA / 5;
        const scoreB = stopB * 5000 + durB * 2 + priceB / 5;

        return scoreA - scoreB;
      });
    }

    setFilteredInboundData(newFilteredInboundData);
    console.log("newfilteredinbounddata", newFilteredInboundData);
    console.log("Filtered Inbound Data:", newFilteredInboundData);
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
    sortType,
  ]);

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
    if (deptimeRange[0] === range[0] && deptimeRange[1] === range[1]) {
      setdepTimeRange([0, 0]); // Clear filter if already selected
    } else {
      setdepTimeRange(range);
    }
  };

  const handlearrTimeFilter = (range) => {
    if (arrtimeRange[0] === range[0] && arrtimeRange[1] === range[1]) {
      setarrTimeRange([0, 0]); // Clear filter if already selected
    } else {
      setarrTimeRange(range);
    }
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
    filteredOutboundData && filteredOutboundData[0],
  );
  console.log("Selectet flighttsss", selectedFlight);

  const handleClickDetail = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleBookRound = () => {
    navigate(
      `/flight-detail/${encodeURIComponent(
        selectedFlight.ResultIndex,
      )}/${encodeURIComponent(selectedFlight2.ResultIndex)}`,
    );
  };

  console.log("filtered inbounddddd dataaaa", filteredInboundData);
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
    fetchDatas(value);
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
    fetchDatass(value);
    SetClickDestination2(true);
    setIsItemSelected2(false);
  };

  const [isFareLoading, setIsFareLoading] = useState(false);
  const [fareRules, setFareRules] = useState("");
  const [baggageRules, setBaggageRules] = useState([]);
  const handleClick = async (id, SrdvIndex) => {
    const consversationId = localStorage.getItem("ConversationId");
    setActiveId(activeId === id ? null : id);
    setIsFareLoading(true);
    try {
      const payload = {
        FareSourceCode: id,
        ConversationId: consversationId,
      };

      const response = await axios.post(
        "https://admin.trustedfare.com/api/Mistify/FareRules",
        payload,
      );

      const data = response.data.Data;
      console.log("FARE RULESSSS", data);

      if (data && data.Success) {
        if (data.FareRules) {
          let combinedRulesHtml = "";
          data.FareRules.forEach((rule) => {
            if (rule.RuleDetails) {
              rule.RuleDetails.forEach((detail) => {
                if (detail.Rules && detail.Rules.trim()) {
                  combinedRulesHtml += `<div style="margin-bottom: 15px;">
                    <h5 style="color: #053355; font-weight: bold; margin-bottom: 5px;">${detail.Category}</h5>
                    <div style="font-size: 13px; line-height: 1.4;">${detail.Rules}</div>
                  </div>`;
                }
              });
            }
          });
          setFareRules(combinedRulesHtml || "No fare rules available.");
        }

        if (data.BaggageInfos) {
          setBaggageRules(data.BaggageInfos);
        }
      } else {
        setFareRules("No fare rules available.");
      }
    } catch (error) {
      console.error("Error fetching fare rule:", error);
      toast.error("Something went wrong");
      setFareRules("Error fetching fare rules.");
    } finally {
      setIsFareLoading(false);
    }
  };

  const [departureFlight, setDepartureFlight] = useState("");
  const [returnFlight, setReturnFlight] = useState("");

  useEffect(() => {
    // Ensure search is defined and has COMBO data
    if (search && search.COMBO && search.COMBO.length > 0) {
      // Assuming you're working with the first combo (adjust if needed)
      const combo = search.COMBO[0];

      // Filter flights for departure (isRs = false)
      const outboundFlights = combo.sI.filter((flight) => !flight.isRs);
      // Filter flights for return (isRs = true)
      const inboundFlights = combo.sI.filter((flight) => flight.isRs);

      // Set departure to the first outbound flight if available
      if (outboundFlights.length > 0) {
        setDepartureFlight(outboundFlights);
      }

      // Set return to the last inbound flight if available
      if (inboundFlights.length > 0) {
        setReturnFlight(inboundFlights);
      }
    }
  }, [search]); // This effect will run whenever 'search' changes
  const handleSwapInputs = () => {
    const tempInput = searchInput;

    setSearchInput(searchInput2);

    setSearchInput2(tempInput);

    // Optional: Reset dropdowns or focus
    SetClickDestination(false);
    SetClickDestination2(false);
  };
  return (
    <div className="flightListPage inRound" style={{ position: "relative" }}>
      <div className="bgGradient"></div>
      <div className="roundtrippg">
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
          appDisk="flight_list"
          handleSwapInputs={handleSwapInputs}
        />
      </div>

      <div className="flightsMainBody">
        {/* <Navbar /> */}
        {/* <Bookingmenu /> */}
        <Container className="bodyDiv">
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
              airlineCodes={airlineCodes}
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
              handleChangeCurrency2={handleChangeCurrency2}
            />
            <Col
              md={9}
              className="rightDiv"
              style={{ paddingRight: "0px", position: "relative" }}
            >
              <div>
                <div className="durtn">
                  <div className="durtnw-1">
                    <span>Departure </span>
                    <i />
                  </div>
                  <div className="durtnw-2">
                    <span>DURATION </span>
                    <i />
                  </div>
                  <div className="durtnw-3">
                    <span>Price </span>
                    <i className="down1" />
                  </div>
                  <div className="durtnw-4 b_actv">
                    <span>Best </span>
                  </div>
                </div>
              </div>

              {/* <Row style={{ margin: "0px", padding: "0px" }} className="mbsm">
                <div className="calendarSlider" style={{ padding: "0px" }}>
                  <div className="sliderLeft" style={{ width: "100%" }}>
                    <img
                      src={leftArrow}
                      alt=""
                      style={{
                        height: "80%",
                        paddingBlock: "15px",
                        paddingInline: "15px",
                        borderLeft: "1px solid rgb(228,228,228)",
                      }}
                    />
                    <div style={{}} className="datesdiv">
                      {sliderItems.map((item, index) => (
                        <CalenderSliderContent
                          key={index}
                          style={{ textWrap: "nowrap" }}
                        >
                          <p
                            
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              paddingInline: "5px",
                              marginBottom: "2px",
                              fontSize: "13px",
                              fontWeight: "500",
                            }}
                            className="calenderslidercontent"
                          >
                            {item.date}
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              color: "black",
                              marginBottom: "2px",
                              color: "rgb(45, 50, 144)",
                              fontWeight: "600",
                            }}
                            className="calenderprice"
                          >
                            ₹{item.price}
                          </p>
                          <div className="calenderData">
                          
                          </div>
                        </CalenderSliderContent>
                      ))}
                    </div>
                    <img
                      src={rightArrow}
                      alt=""
                      style={{
                        height: "80%",
                        paddingBlock: "15px",
                        paddingInline: "15px",
                        borderLeft: "1px solid rgb(228,228,228)",
                      }}
                    />
                  </div>
                 
                </div>
              </Row> */}

              {/* <Row
                style={{ margin: "0px", padding: "0px" }}
                className="d-none d-md-flex"
              >
                <div
                  className="menuItems"
                  style={{
                    width: "100%",
                    fontWeight: "600",
                    color: "rgb(45, 50, 144)",
                    margin: "10px 0px",
                    padding: "5px",
                    background: "rgb(249, 249, 249)",
                    height: "max-content",
                    textAlign: "center",
                  }}
                >
                  <p style={{ marginLeft: "3px" }}>AIRLINES</p>
                  <p>DEPART</p>
                  <p>DURATION</p>
                  <p>ARRIVE</p>
                  <p>PRICE</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>RECOMMENDED</p>
                    <label
                      className="toggleSwitch"
                      style={{
                        marginTop: "0px",
                        marginLeft: "5px",
                        marginRight: "2px",
                      }}
                    >
                      <input className="toggleInput" type="checkbox" />
                      <span className="toggleSlider" />
                    </label>
                  </div>
                </div>
              </Row> */}

              {/* <FlightListSkeleton />
              <FlightListSkeleton />
              <FlightListSkeleton />
              <FlightListSkeleton /> */}
              {search && search.length !== 0 && !isLoading ? (
                <div>
                  {search &&
                    filteredInboundData &&
                    filteredInboundData &&
                    filteredInboundData.map((e) => {
                      return (
                        <InternationalFlightListCard
                          e={e}
                          handleMoreFare={handleMoreFare}
                          handleClick={handleClick}
                          activeId={activeId}
                          showModal={showModal}
                          formatDuration={formatDuration}
                          setShowModal={setShowModal}
                          // departureFlight={departureFlight}
                          // returnFlight={returnFlight}
                          formatTime={formatTime}
                          handleChnageCurrency={handleChnageCurrency}
                          handleChangeCurrency2={handleChangeCurrency2}
                          fareRules={fareRules}
                          isFareLoading={isFareLoading}
                          baggageRules={baggageRules}
                          searchMeta={dataSearch}
                        />
                      );
                    })}
                </div>
              ) : (
                <FlightListSkeleton />
                // <div className="d-flex flex-column gap-3">
                //   <FlightListSkeleton />
                //   <FlightListSkeleton />
                //   <FlightListSkeleton />
                //   <FlightListSkeleton />
                // </div>
              )}
            </Col>
          </Row>
          {/* <div
            className={`applyFilter ${Visible && "show"}`}
            onClick={() => setShowFilter(true)}
          >
            <FaFilter /> Filter
          </div> */}
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

export default FlightInternational;
