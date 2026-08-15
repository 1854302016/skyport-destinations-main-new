import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "rc-slider/assets/index.css";
import "./RoundTrips.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { MdAccessTimeFilled, MdOutlineSort } from "react-icons/md";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { TbFilterFilled } from "react-icons/tb";
import { SiChinasouthernairlines } from "react-icons/si";
import axios from "axios";
import { flightSearch } from "../../redux/services/operations/flight";
import { cities12 } from "../../Cities";
import { airlinesnames } from "../../Airlines";
import { toast } from "react-toastify";
import ReSearchForm from "../Flight/FlightList/ReSearchForm";
import FilterBar from "../Flight/FlightList/FilterBar";
import Filter from "../Flight/FlightList/Filter/Filter";
import Sort from "../Flight/FlightList/Filter/Sort";
import Time from "../Flight/FlightList/Filter/Time";
import Airlines from "../Flight/FlightList/Filter/Airlines";
import FlightListSkeleton from "../Flight/FlightList/FlightListSkeleton";
import RoundTripListCard from "./RoundTripListCard";

export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};

const RoundTrips = () => {
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleChnageCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      return amount;
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
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
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
  const [destinationCity2, setDestinationCity2] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checkedStops, setCheckedStops] = useState([]);

  const [deptimeRange, setdepTimeRange] = useState([0, 0]);
  const [arrtimeRange, setarrTimeRange] = useState([0, 0]);
  const [filteredData, setFilteredData] = useState(
    Array.isArray(search) ? search : [],
  );
  const [airlines, setAirlines] = useState([]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);
  const [sortType, setSortType] = useState("price");
  const [isFareLoading, setIsFareLoading] = useState(false);
  const [fareRules, setFareRules] = useState("");
  const [baggageRules, setBaggageRules] = useState([]);

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

  useEffect(() => {
    if (Array.isArray(search) && search.length > 0) {
      setFilteredData(search);
    }
  }, [search]);

  useEffect(() => {
    if (Array.isArray(search) && search.length > 0) {
      const airlineData = search
        .flatMap((itin) =>
          itin.OriginDestinationOptions.flatMap((option) =>
            option.FlightSegments.map((segment) => {
              const airline = airlinesnames.find(
                (a) => a.AirlineCode === segment.OperatingAirline?.Code,
              );
              return airline
                ? { name: airline.AirlineName, code: airline.AirlineCode }
                : null;
            }),
          ),
        )
        .filter(Boolean);

      const uniqueAirlinesMap = new Map();
      airlineData.forEach((airline) => {
        if (!uniqueAirlinesMap.has(airline.name)) {
          uniqueAirlinesMap.set(airline.name, {
            name: airline.name,
            code: airline.code,
            selected: false,
          });
        }
      });

      const uniqueAirlines = Array.from(uniqueAirlinesMap.values());
      setAirlines(uniqueAirlines);
      setAirlineCodes(uniqueAirlines.map((a) => a.code));
    }
  }, [search]);

  useEffect(() => {
    if (Array.isArray(search) && search.length > 0) {
      const allFares = search.map(
        (itin) => itin.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
      );
      const minFareVal = Math.min(...allFares);
      const maxFareVal = Math.max(...allFares);
      setMinFare(minFareVal);
      setMaxFare(maxFareVal);
      setSliderValue([minFareVal, maxFareVal]);
    }
  }, [search]);

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
      } else {
        window.location.assign(
          `/round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`,
          )}`,
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
      setDateRangeConfig(1);
    } else if (isMediumScreen) {
      setDateRangeConfig(1);
    } else {
      setDateRangeConfig(2);
    }
  };

  const setDateRangeConfig = (numberOfMonths) => {
    setNumberOfMonths(numberOfMonths);
  };

  useEffect(() => {
    const handleResize = () => setBreakpoints();
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSameDay = (date1, date2) => date1.isSame(date2, "day");

  const renderDayContents = (day) => {
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
    setEndDate(arrivalTime);
  };

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");

  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    SetClickDestination(false);
    setSearchInput(`${city["AIRPORTCODE"]}`);
    setIsItemSelected(true);
    setDestination1(city);
  };

  const handleCitySelect2 = (city) => {
    setDestinationCity2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    SetClickDestination2(false);
    setSearchInput2(`${city["AIRPORTCODE"]}`);
    setIsItemSelected2(true);
    setDestination2(city);
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

  const applyFilters = () => {
    if (!Array.isArray(search) || isLoading) return;

    const selectedAirlines = airlines
      .filter((airline) => airline.selected)
      .map((airline) => airline.name);

    const getTotalDuration = (itin) =>
      itin.OriginDestinationOptions.reduce(
        (total, opt) =>
          total +
          opt.FlightSegments.reduce((sum, seg) => sum + (seg.Duration || 0), 0),
        0,
      );

    let newFilteredData = search.filter((e) => {
      const amount = e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
      const fareInRange = amount >= sliderValue[0] && amount <= sliderValue[1];

      const depSeg = e.OriginDestinationOptions[0].FlightSegments[0];
      const depTimeInRange =
        (deptimeRange[0] === 0 && deptimeRange[1] === 0) ||
        (new Date(depSeg.DepartureDateTime).getHours() >= deptimeRange[0] &&
          new Date(depSeg.DepartureDateTime).getHours() < deptimeRange[1]);

      const arrTimeInRange =
        (arrtimeRange[0] === 0 && arrtimeRange[1] === 0) ||
        (new Date(depSeg.ArrivalDateTime).getHours() >= arrtimeRange[0] &&
          new Date(depSeg.ArrivalDateTime).getHours() < arrtimeRange[1]);

      const airline = airlinesnames.find(
        (a) => a.AirlineCode === depSeg.OperatingAirline?.Code,
      );
      const isAirlineSelected =
        selectedAirlines.length === 0 ||
        (airline && selectedAirlines.includes(airline.AirlineName));

      let stopCountMatch = true;
      if (checkedStops.length > 0) {
        const allStops = e.OriginDestinationOptions.map(
          (option) => option.FlightSegments.length - 1,
        );
        stopCountMatch = allStops.every((stopCount) => {
          if (checkedStops.includes("non-stop") && stopCount === 0) return true;
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
        isAirlineSelected &&
        stopCountMatch
      );
    });

    if (sortType === "price") {
      newFilteredData.sort(
        (a, b) =>
          a.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount -
          b.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
      );
    }

    if (sortType === "departure") {
      newFilteredData.sort(
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
      newFilteredData.sort(
        (a, b) => getTotalDuration(a) - getTotalDuration(b),
      );
    }

    if (sortType === "smart") {
      newFilteredData.sort((a, b) => {
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

    setFilteredData(newFilteredData);
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

  const handleShowAllStops = () => {
    setCheckedStops([]);
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

  const handleClick = async (id) => {
    const conversationId = localStorage.getItem("ConversationId");
    setActiveId(activeId === id ? null : id);
    setIsFareLoading(true);
    try {
      const response = await axios.post(
        "https://admin.trustedfare.com/api/Mistify/FareRules",
        { FareSourceCode: id, ConversationId: conversationId },
      );

      const data = response.data.Data;

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
              priority = 1;
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
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
              priority = 1;
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
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

        setCities22(results);
      });
  };
  const handleInputChange2 = (value) => {
    setSearchInput2(value.toUpperCase());
    fetchDatass(value);
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
    SetClickDestination(false);
    SetClickDestination2(false);
  };

  return (
    <div
      id="full-container"
      className="flightListPage roundtrippg"
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
        appDisk="round_list"
        handleSwapInputs={handleSwapInputs}
      />

      <div className="flightsMainBody">
        <Container className="bodyDiv" style={{ position: "relative" }}>
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
              handleShowAllairlinenames={handleShowAllairlinenames}
              airlines={airlines}
              handleChecked={handleChecked}
              setShowFilter={setShowFilter}
              applyFilters={applyFilters}
              handleChnageCurrency={handleChnageCurrency}
              airlineCodes={airlineCodes}
            />
            <Col md={9} className="rightDiv" style={{ paddingRight: "0px" }}>
              <Row
                className="flight_list_dep_air ml-0 mr-0 d-md-flex row_backgorund_list_TG list-header-premium mb-3"
                style={{ position: "sticky", top: "0", zIndex: "10" }}
              >
                <div className="menuItems menuItem_TG_List_head py-1 px-4 d-flex justify-content-between align-items-center w-100">
                  <p className="header-label airlines">AIRLINES</p>
                  <p className="header-label depart">DEPARTURE / RETURN</p>
                  <p className="header-label duration">DURATION</p>
                  <p className="header-label price">PRICE</p>
                </div>
              </Row>
              {Array.isArray(search) && search.length !== 0 && !isLoading ? (
                <div>
                  {filteredData &&
                    filteredData.map((e, indexx) => (
                      <RoundTripListCard
                        key={indexx}
                        e={e}
                        handleClick={handleClick}
                        activeId={activeId}
                        fareRules={fareRules}
                        isFareLoading={isFareLoading}
                        baggageRules={baggageRules}
                        formatDuration={formatDuration}
                        searchMeta={dataSearch}
                      />
                    ))}
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  <FlightListSkeleton
                    fromCode={dataSearch?.Segments?.[0]?.Origin}
                    fromCity={destination1?.CITYNAME}
                    toCode={dataSearch?.Segments?.[0]?.Destination}
                    toCity={destination2?.CITYNAME}
                  />
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
                    setCheckedStops([]);
                  } else {
                    setCheckedStops(["non-stop"]);
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
                <MdAccessTimeFilled className="icon" size={22} />
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

export default RoundTrips;
