import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./FlightSearchForm.css";
// import WebCheckInForm from "./WebCheckInForm";
import CitySelection from "./CitySelection";
import SelectClass from "./SelectClass";
import TravellerSelection from "./TravellerSelection";
import FlightDatePickerMobile from "./FlightDatePickerMobile";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Deals from "./Deals";
import RecentSearch from "../BookingSearch/RecentSearch";



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
const FlightSearchForm = ({
  initialOriginCode,
  initialOriginName,
  initialDestinationCode,
  initialDestinationName,
  initialStartDate,
  initialEndDate,
  initialIsRoundTrip,
  onSearchComplete,
}) => {
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  // const [cal, setCal] = useState(false);
  const [active, setActive] = useState(true);

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

  const [isTravellerInputSelected, setTravellerInputSelected] = useState(false);
  const [isClassInputSelected, setClassInputSelected] = useState(false);
  // const [isWebInputSelected, setWebInputSelected] = useState(false);
  const [isCalenderSelected, setCalenderSelected] = useState(false);
  const [fromCitySelected, setFromCitySelected] = useState(false);
  const [toCitySelected, setToCitySelected] = useState(false);
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
  const [departureCity, setDepartureCity] = useState({
    code: "GEO",
    name: "Georgetown",
  });
  const [arrivalCity, setArrivalCity] = useState({
    code: "",
    name: "Select City",
  });
  const [destination2, setDestination2] = useState(null);
  const [destination1, setDestination1] = useState(  {
    AIRPORTCODE: "GEO",
    AIRPORTNAME: "Cheddi Jagan International Airport",
    CITYCODE: "GEO",
    CITYNAME: "Georgetown",
    COUNTRYNAME: "Guyana",
    COUNTRYCODE: "GY",
    isTopCity: true,
    category: "domestic",
  });

  const handleTravellerInputFocus = () => {
    setTravellerInputSelected(true);
  };
  const handleClassInputFocus = () => {
    setClassInputSelected(true);
  };
  // const handleWebInputFocus = () => {
  //   setWebInputSelected(true);
  // };
  const handleCalenderFocus = (input) => {
    setCalenderSelected(true);
    if (!isCalenderSelected) {
      if (input === "startDate") {
        setFocusedInput("startDate");
      } else if (input === "endDate") {
        setFocusedInput("endDate");
      } else {
        // setStartDate(null);
        // setEndDate(null);
        // setFocusedInput(null);

        setCalenderSelected(!isCalenderSelected);
        if (!isCalenderSelected) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };
  // const handleCheckOutFocus = () => {
  //   setCheckOutSelected(true);
  // };
  const handleFromCityClick = () => {
    setFromCitySelected(true);
    // setToCitySelected(false);
  };

  const handleToCityClick = () => {
    // setFromCitySelected(false);
    setToCitySelected(true);
  };

  const closeTravellerInput = () => {
    setTravellerInputSelected(false);
  };
  const closeClassInput = () => {
    setClassInputSelected(false);
  };
  // const closeWebInput = () => {
  //   setWebInputSelected(false);
  // };
  const closeDateInput = () => {
    setCalenderSelected(false);
    // setCheckOutSelected(false);
  };
  const closeCitySelection = () => {
    setFromCitySelected(false);
    setToCitySelected(false);
  };

  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const [startDate, setStartDate] = useState(moment().add(1, "days"));

  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    setEndDate((prev) => (active2 ? prev || moment().add(2, "days") : null));
  }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialOriginCode || initialOriginName) {
      setDepartureCity((prev) => ({
        code: initialOriginCode || prev.code,
        name: initialOriginName || prev.name,
      }));
    }
    if (initialDestinationCode || initialDestinationName) {
      setArrivalCity((prev) => ({
        code: initialDestinationCode || prev.code,
        name: initialDestinationName || prev.name,
      }));
    }

    const hasEnd = Boolean(initialEndDate);
    if (hasEnd) {
      setActive2(true);
      setActive(false);
      setEndDate(moment(initialEndDate));
    } else if (initialIsRoundTrip) {
      setActive2(true);
      setActive(false);
      setEndDate((prev) => prev || moment().add(2, "days"));
    } else {
      setActive(true);
      setActive2(false);
      setEndDate(null);
    }

    if (initialStartDate) {
      setStartDate(moment(initialStartDate));
    }
  }, [
    initialOriginCode,
    initialOriginName,
    initialDestinationCode,
    initialDestinationName,
    initialStartDate,
    initialEndDate,
    initialIsRoundTrip,
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
  // options: "direct", "student", "armed", "senior", or null

  const handleFareCheckbox = (type) => {
    setSelectedOption((prev) => (prev === type ? null : type));
  };

  const handleFlightSearchLogic = async () => {
    const tripType = active ? 1 : active2 ? 2 : 3;
    const directFlight = selectedOption === "direct";
    const resultFareType =
      selectedOption === "student"
        ? 3
        : selectedOption === "armed"
        ? 4
        : selectedOption === "senior"
        ? 5
        : 2; // default normal fare
    const SearchData = {
      EndUserIp: "192.168.10.10",
      TokenId: "47ed8194-4d47-4e3e-b19d-b7e44a7588a5",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      DirectFlight: directFlight,
      ResultFareType: resultFareType,
      Segments: [
        {
          Origin: departureCity.code,
          Destination: arrivalCity.code,
          FlightCabinClass: selectedClass,
          PreferredDepartureTime:
            startDate && startDate.startOf("day").format("YYYY-MM-DD"),
          PreferredArrivalTime: endDate
            ? endDate && endDate.startOf("day").format("YYYY-MM-DD")
            : startDate && startDate.startOf("day").format("YYYY-MM-DD"),
        },
      ],
    };
    console.log("SearchData", SearchData);
    
    await insertSearchDataIntoCache({
      ...SearchData,
      originCountryCode: destination1?.COUNTRYCODE?.trim().toUpperCase() || "",
      destinationCountryCode:
        destination2?.COUNTRYCODE?.trim().toUpperCase() || "",
    });
    if (active) {
      navigate(
        `/flightList/${encodeURIComponent(
          `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}*rft_${SearchData.ResultFareType}*dr_${SearchData.DirectFlight}`
        )}`
      );
      if (onSearchComplete) onSearchComplete();
    }

    if (active2) {
      // const countryCode1 =
      //   destination1?.COUNTRYCODE?.trim().toUpperCase() || "";
      // const countryCode2 =
      //   destination2?.COUNTRYCODE?.trim().toUpperCase() || "";
      // console.log("COUNTRYCODE1:", JSON.stringify(countryCode1));
      // console.log("COUNTRYCODE2:", JSON.stringify(countryCode2));

        window.location.assign(
          `/international-round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}*rft_${SearchData.ResultFareType}*dr_${SearchData.DirectFlight}`
          )}`
        );
        if (onSearchComplete) onSearchComplete();
      } 
      // else {
      //   navigate(
      //     `/round/${encodeURIComponent(
      //       `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}*rft_${SearchData.ResultFareType}*dr_${SearchData.DirectFlight}`
      //     )}`
      //   );
      //   if (onSearchComplete) onSearchComplete();
      // }
  
  };

  const handleFlightSearch = handleFlightSearchLogic;

  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState(2);



  const handleSwapCities = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);

    const tempDest = destination1;
    setDestination1(destination2);
    setDestination2(tempDest);
  };

  return (
    <div className="cont_pnl">
      <div className="pd20_n">
        {/* <div className="m_rel">
          <h1 className="mb_title">Flights</h1>
        
        </div> */}

        <div className="sfp-change-trip">
          {/* <ButtonGroup> */}
          <div
            // variant="light"
            onClick={handleSearchFlight}
            className={`sfp-trip ${active ? "active" : ""}`}
          >
            One Way
          </div>
          <div
            // variant="light"
            onClick={handleSearchFlightRound}
            className={`sfp-trip ${active2 ? "active" : ""}`}
          >
            Round Trip
          </div>
          {/* <div
            // variant="light"
            onClick={handleSearchFlightMultiPle}
            className={`sfp-trip ${active3 ? "active" : ""}`}
          >
            MultiCity
          </div> */}
          {/* </ButtonGroup> */}
          <div className="sfp-trip-layer layer-left"></div>
        </div>

        <div id="divOneWayRT">
          <div className="wid46 fl m_rel">
            <div className="lb_bg mgt13 hgt93" onClick={handleFromCityClick}>
              <div className="top_block" onClick={handleFromCityClick}>
                <p className="inpttl">From</p>
              </div>
              <div className="form-new">
                <span id="lblDeparture" className="origin_cd">
                  {departureCity.code}
                </span>
                <span id="lblDepart" className="origin_full">
                  {departureCity.name}
                </span>
              </div>
              <i className="swap_icn" id="SwapImg" onClick={handleSwapCities} />
            </div>
          </div>
          <div className="wid46 fr" onClick={handleToCityClick}>
            <div className="lb_bg mgt13 hgt93">
              <div className="top_block">
                <p className="inpttl">To</p>
              </div>
              <div className="to-new">
                <span id="lblArrival" className={arrivalCity.code ? "origin_cd" : ""}>
                  {arrivalCity.code}
                </span>
                <span id="lblArr" className="origin_full">
                  {arrivalCity.name}
                </span>
              </div>
            </div>
            <div className="clr" />
          </div>

          <div
            controlId="ddate"
            className="wid46 fl mgt13"
            onClick={handleCalenderFocus}
          >
            <div
              className="lb_bg ddateClass"
              id="dvfarecal"
              //   onClick={() => handleGetTextboxName("ddate")}
            >
              <p className="inpttl2">Departure Date</p>
              <input
                type="text"
                readOnly
                className="hl-input2"
                fdprocessedid="tmgf4i"
                // placeholder=
                value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                onClick={handleCalenderFocus}
              />
              <div className="clr" />
            </div>
          </div>

          <div controlId="rdate" className="wid46 fr mgt13">
            <div
              className="retu-date-n"
              id="rdatelbl"
              style={{ display: "block", opacity: active2 ? "1" : "0.4" }}
            >
              {/* Return Date */}
              <div className="lb_bg m_rel">
                <div
                  className="rdateClass"
                  id="rdateFade"
                  //   onClick={() => handleGetTextboxName("rdate")}
                >
                  <p className="inpttl2">Return Date</p>
                  <input
                    type="text"
                    readOnly
                    className="hl-input2 cl-bl hide-ddate round-but1"
                    style={{}}
                    fdprocessedid="975arp"
                    value={endDate ? endDate.format("MM/DD/YYYY") : ""}
                    onClick={() => {
                      handleCalenderFocus("endDate");
                      handleSearchFlightRound();
                    }}
                  />
                  <div className="clr" />
                  <input type="hidden" name="hdn1" id="hdn1" />
                  <input id="hdn" type="hidden" />
                </div>
                <i
                  className="cross_i crs2"
                  id="divCross"
                  style={{}}
                  onClick={handleSearchFlight}
                />
              </div>
            </div>
          </div>

          <div
            controlId="travellers"
            className="wid46 fl mgt13"
            onClick={handleTravellerInputFocus}
          >
            <div className="lb_bg ad-ch-sec">
              <p className="inpttl2">Traveller(s)</p>
              <div className="trvsc">
                <div className="mid_title drpNoTrv">
                  <span id="spnTraveller">
                    {rooms.reduce(
                      (total, room) =>
                        total + room.adults + room.children + room.infants,
                      0
                    )}
                  </span>{" "}
                  <span id="spnTravellerText"> Traveller</span>
                </div>
                <span id="optAdult" style={{ display: "none" }}>
                  1
                </span>
                <span id="optChild" style={{ display: "none" }}>
                  0
                </span>
                <span id="optInfant" style={{ display: "none" }}>
                  0
                </span>
              </div>
              <div className="clr" />
            </div>
          </div>
          {/* Rest of the JSX */}
          <div
            controlId="class"
            className="wid46 fr mgt13"
            onClick={handleClassInputFocus}
          >
            <div
              className="lb_bg m_rel"
              id="showCclass"
              onClick={handleClassInputFocus}
            >
              <p className="inpttl2" onClick={handleClassInputFocus}>
                Class
              </p>
              <i className="dw_tringle" onClick={handleClassInputFocus} />
              <div className="optclss">
                <Form.Control
                  as="select"
                  id="optClassUl"
                  value={selectedClass}
                  //   onChange={(e) => handleSetCabCookie(e.target.value)}
                  disabled
                  onClick={handleClassInputFocus}
                >
                  <option value="1">All</option>
                  <option value="2">Economy</option>
                  <option value="3">PremiumEconomy</option>
                  <option value="4">Business</option>
                  <option value="5">PremiumBusiness</option>
                  <option value="6">First</option>
                </Form.Control>
              </div>
              <div className="clr" />
            </div>
          </div>
          <div>
            <Row>
              <Col className="mobile_video_formSearch">
                <label htmlFor="nonStop">
                  <input
                    type="checkbox"
                    id="directFlight"
                    checked={selectedOption === "direct"}
                    onChange={() => handleFareCheckbox("direct")}
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Direct Flights
                  </span>
                </label>
              </Col>

              <Col className="mobile_video_formSearch">
                <label htmlFor="student">
                  <input
                    type="checkbox"
                    id="student"
                    checked={selectedOption === "student"}
                    onChange={() => handleFareCheckbox("student")}
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Student Fare
                  </span>
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label htmlFor="armed">
                  <input
                    type="checkbox"
                    id="armed"
                    checked={selectedOption === "armed"}
                    onChange={() => handleFareCheckbox("armed")}
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Armed Force
                  </span>
                </label>
              </Col>

              <Col>
                <label htmlFor="senior">
                  <input
                    type="checkbox"
                    id="senior"
                    checked={selectedOption === "senior"}
                    onChange={() => handleFareCheckbox("senior")}
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Senior Citizen
                  </span>
                </label>
              </Col>
            </Row>
          </div>

          <div className="clr" />

          <input
            name=""
            defaultValue="Search Flight"
            style={{ WebkitAppearance: "none" }}
            type="button"
            className="fs_btn"
            onClick={handleFlightSearch}
            fdprocessedid="5e85fe"
          />
        </div>
        {location.pathname === "/" && <RecentSearch cacheData={cacheData} />}
        {/* {location.pathname === "/" && <Deals />} */}
      </div>

      {/* {isWebInputSelected && <WebCheckInForm closeWebInput={closeWebInput} />} */}

      {fromCitySelected && (
        <CitySelection
          orname="origin"
          code={departureCity.code}
          name={departureCity.name}
          setCity={setDepartureCity}
          closeCitySelection={closeCitySelection}
          setDestination2={setDestination2}
          setDestination1={setDestination1}
        />
      )}

      {toCitySelected && (
        <CitySelection
          setDestination2={setDestination2}
          setDestination1={setDestination1}
          orname="destination"
          code={arrivalCity.code}
          name={arrivalCity.name}
          setCity={setArrivalCity}
          closeCitySelection={closeCitySelection}
        />
      )}

      {isClassInputSelected && (
        <SelectClass
          closeClassInput={closeClassInput}
          setClass={setSelectedClass}
          selectedClass={selectedClass}
        />
      )}

      {isCalenderSelected && (
        <FlightDatePickerMobile
          closeDateInput={closeDateInput}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          active2={active2}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      )}

      {isTravellerInputSelected && (
        <TravellerSelection
          rooms={rooms}
          updateRoom={updateRoom}
          closeTravellerInput={closeTravellerInput}
        />
      )}
    </div>
  );
};

export default FlightSearchForm;
