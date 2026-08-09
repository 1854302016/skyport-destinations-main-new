import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./BusForm.css";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import BusDatePicker from "./BusDatePicker";
import BusCitySelection from "./BusCitySelection";
const BusForm = () => {
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
 
  const [isTravellerInputSelected, setTravellerInputSelected] = useState(false);
  const [isClassInputSelected, setClassInputSelected] = useState(false);
  // const [isWebInputSelected, setWebInputSelected] = useState(false);
  const [isCalenderSelected, setCalenderSelected] = useState(false);
  const [fromCitySelected, setFromCitySelected] = useState(false);
  const [toCitySelected, setToCitySelected] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [destination2, setDestination2] = useState({
    AIRPORTCODE: "BOM",
    AIRPORTNAME: "Chhatrapati Shivaji International Airport",
    CITYCODE: "BOM",
    CITYNAME: "Mumbai",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 857,
  });
  const [destination1, setDestination1] = useState({
    AIRPORTCODE: "DEL",
    AIRPORTNAME: "Indira Gandhi Airport",
    CITYCODE: "DEL",
    CITYNAME: "Delhi",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 856,
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

  const [endDate, setEndDate] = useState(
    active2 ? moment().add(2, "days") : null
  );
  useEffect(() => {
    setEndDate(active2 ? moment().add(2, "days") : null);
  }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();
  const handleFlightSearch = () => {
    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };
    const tripType = tripTypeMapping[!setActive ? "RoundTrip" : "OneWay"];

    const SearchData = {
    
    };
  };

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
    <div className="bus_phone_container">
      <div className="tab-content-fs" style={{ marginTop: "15px" }}>
        <div className="pd20_n">
          <div className="pd10_n">
            <div className="inner_cont">
              <div className="location">
                <i className="_loc-icon" />
              </div>
              <div className="input_bus_mobile m_rel">
                <p className="inpttl">From</p>
                <div
                  className="hl-input"
                  style={{ display: "inline-block" }}
                  onClick={handleFromCityClick}
                >
                  <span
                    id="autofocusfr"
                    className="fare_btn2 fullwid"
                  >
                    {departureCity === "" || departureCity === null
                      ? "Enter City"
                      : departureCity.name}
                  </span>
                </div>

                <i
                  className="swap_icn_blank "
                  id="SwapImg"
                  onClick={handleSwapCities}
                />
              </div>
            </div>
          </div>
          <div className="pd10_n">
            <div className="inner_cont">
              <div className="location">
                <i className="_loc-icon" />
              </div>
              <div className="input_bus_mobile m_rel" onClick={handleToCityClick}>
                <p className="inpttl">To</p>
                <div className="hl-input" style={{ display: "inline-block" }}>
                  <span id="autofocusto" className="fullwid ng-binding">
                    {arrivalCity === "" || arrivalCity === null
                      ? "Enter City"
                      : arrivalCity.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pd10_n">
            <div className="inner_cont">
              <div className="location">
                <i className="_loc-iconcal" />
              </div>
              <div className="input_bus_mobile m_rel">
                <p className="inpttl">Departure Date</p>
                <div className="hl-input">
                  <div id="ddate" onClick={handleCalenderFocus}>
                    <input
                      readOnly=""
                      type="text"
                      className="hl-input4"
                      id="datepicker"
                      name="datepicker"
                      defaultValue=""
                      required=""
                      placeholder="dd-mm-yyyy"
                      value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                      onClick={handleCalenderFocus}
                    />
                  </div>
                  <div className="_merleft">
                    <a className="nextday">Tomorrow</a>
                    <a className="nextday">Day After</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clr" />
          <div>
            <input
              name=""
              defaultValue="Search"
              style={{ WebkitAppearance: "none" }}
              type="submit"
              className="fs_btn _clickbtn"
             
            />
          </div>
        </div>
      </div>

      {fromCitySelected && (
        <BusCitySelection
          orname="Origin"
          code={departureCity.code}
          name={departureCity.name}
          setCity={setDepartureCity}
          closeCitySelection={closeCitySelection}
          setDestination2={setDestination2}
          setDestination1={setDestination1}
        />
      )}

      {toCitySelected && (
        <BusCitySelection
          setDestination2={setDestination2}
          setDestination1={setDestination1}
          orname="Destination"
          code={arrivalCity.code}
          name={arrivalCity.name}
          setCity={setArrivalCity}
          closeCitySelection={closeCitySelection}
        />
      )}
      {isCalenderSelected && (
        <BusDatePicker
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
    </div>
  );
};

export default BusForm;
