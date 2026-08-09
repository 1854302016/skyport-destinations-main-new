import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./SearchForm.css";
import AutoSuggest from "./AutoSuggest";
import DatePickerComponent from "./DatePickerComponent";
import RoomSelectionComponent from "./RoomSelectionComponent";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { nationalityOptions } from "../HotelSearchData";

// import AutoSuggest from "./AutoSuggest";

const SearchForm = () => {
  const navigate = useNavigate();
  const [isCityInputSelected, setCityInputSelected] = useState(false);
  const [isRoomInputSelected, setRoomInputSelected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [isCalenderSelected, setCalenderSelected] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [formData, setFormData] = useState({
    nationality: "106"
  });

  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childrenAges: [] },
  ]);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "day"));
  const [focusedInput, setFocusedInput] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city.cityName);
    setSelectedCityId(city.id);
    setCityInputSelected(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCityId || !startDate || !endDate || !formData.nationality) {
      alert("Please fill out all fields");
      return;
    }
    const formDataToPass = {
      ...formData,
      from: selectedCityId,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: JSON.stringify(rooms), // Convert rooms array to JSON string
    };

    const queryString = new URLSearchParams(formDataToPass).toString();
    navigate(`/hotellist?${queryString}`);
  };


  const handleCityInputFocus = () => {
    setCityInputSelected(true);
  };
  const handleRoomInputFocus = () => {
    setRoomInputSelected(true);
  };
  // const handleCheckInFocus = () => {
  //   setCheckInSelected(true);
  // };
  // const handleCheckOutFocus = () => {
  //   setCheckOutSelected(true);
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
  const closeRoomInput = () => {
    setRoomInputSelected(false);
  };
  const closeCityInput = () => {
    setCityInputSelected(false);
  };
  // const closeDateInput = () => {
  //   setCheckInSelected(false);
  //   setCheckOutSelected(false);
  // };
  const closeDateInput = () => {
    setCalenderSelected(false);
    // setCheckOutSelected(false);
  };

  const addRoom = () => {
    if (rooms.length < 6) {
      setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
    }
  };
  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
    }
  };
  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    if (field === "children") {
      updatedRooms[index].childrenAges = Array(value).fill(null); // Reset children ages
    }
    setRooms(updatedRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = age;
    setRooms(updatedRooms);
  };
  // const handleCitySelect = (city) => {
  //   setSelectedCity(city);
  // };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  

  const parsedStartDate = new Date(
    startDate
    //  ? startDate : today
  );
  const parsedEndDate = new Date(
    endDate
    //  ? endDate : tomorrow
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const HotelSearch = () => {
    // Define your HotelSearch function logic here
    // console.log("Search button clicked");
    navigate("/hotellist");
  };


  return (
    <div className="container_tbs">
      {/* <Container> */}
      <div className="tab-content-fs">
        <div className="pd20_n">
          <h1 className="app-hide mb_title">
            Same hotel, Cheapest price. Guaranteed!
          </h1>
          <Form
            method="post"
            action="#"
            autoComplete="off"
            onSubmit={handleSubmit}
            className="ng-pristine ng-valid"
          >
            <div className="pd10_n ht_flx ht_acntr">
              <div className="_en-icon">
                <i className="_loc-icon"></i>
              </div>
              <div className="_value">
                <p className="_ft-sz f13">
                  Enter City name, Location or Specific hotel
                </p>
                <div className="fs_srch">
                  <input
                    id="txtCityForMobile"
                    type="text"
                    readOnly
                    autoComplete="off"
                    className="hl-input"
                    style={{ textAlign: "left!important" }}
                    placeholder={
                      selectedCity ? selectedCity : "Enter City/Hotel Name"
                    }
                    // onFocus={handleCityInputFocus}
                    onFocus={() => setCityInputSelected(true)}
                    // onBlur={handleInputBlur}
                  />
                </div>
              </div>
            </div>
          </Form>
          {/* <Row> */}
          <div className="wid45 fl mgt-10" onClick={handleCalenderFocus}>
            <div className="pd10_n ht_flx ht_acntr">
              <div className="_en-icon">
                <i className="_loc-cald"></i>
              </div>
              <div className="_value2">
                <div id="divCheckInid" className="ck-date dateSection dt-clndr">
                  {/* Your Check-in date picker content */}
                  <p className="_ft-sz f13">Check-in</p>
                  <div className="hrtlCenter">
                    <span
                      className="dateFont appendRight8"
                      id="spnCheckInMonth"
                    >
                      {parsedStartDate.getDate()}
                    </span>
                    <div className="makeFlex">
                      <p className="capText" id="spnCheckInDate">
                        {months[parsedStartDate.getMonth()]} '
                        {parsedStartDate.getFullYear().toString().substr(-2)}
                      </p>
                      <p className="lightText_n" id="spnCheckInDayname">
                        {days[parsedStartDate.getDay()]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="wid45 fr mgt-10"
            onClick={() => {
              handleCalenderFocus("endDate");
            }}
          >
            <div className="pd10_n ht_flx ht_acntr">
              <div className="_en-icon">
                <i className="_loc-cald"></i>
              </div>
              <div className="_value2">
                <div
                  id="divCheckoutid"
                  className="ck-date dateSection dt-clndr"
                >
                  {/* Your Check-out date picker content */}
                  <p className="_ft-sz f13">Check-out</p>
                  <div className="hrtlCenter">
                    <span
                      className="dateFont appendRight8"
                      id="spnCheckOutMonth"
                    >
                      {parsedEndDate.getDate()}
                    </span>
                    <div className="makeFlex">
                      <p className="capText" id="spnCheckoutDate">
                        {months[parsedEndDate.getMonth()]} '
                        {parsedEndDate.getFullYear().toString().substr(-2)}
                      </p>
                      <p className="lightText_n" id="spnCheckOutDayName">
                        {days[parsedEndDate.getDay()]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Row> */}
          <div className="clr"></div>
          <div className="noOfAdl mgt-10">
            <div className="pd10_n ht_flx ht_acntr">
              <div className="_en-icon">
                <i className="_prs-icon"></i>
              </div>
              <div className="_value" onClick={handleRoomInputFocus}>
                <p className="_ft-sz f13 mgb3">Guest and Room</p>
                <span className="ttl_ad">
                  <span style={{ fontSize: "18px" }}>
                    {rooms.reduce(
                      (total, room) => total + room.adults + room.children,
                      0
                    )}
                  </span>{" "}
                  Guest,
                  <span style={{ fontSize: "18px" }}>{rooms.length}</span>{" "}
                  {rooms.length === 1 ? "Room" : "Rooms"}{" "}
                </span>
                <span className="circle plus"></span>
              </div>
            </div>
          </div>

          <div className="clr"></div>
          <div className="mgt-10" style={{ display: "" }}>
            <div className="pd10_n m_rel">
              <p className="ad_src_lbl">Nationality </p>
              {/* <Form.Control as="select" className="tripslctbx">
                <option value="Select Country">Select Country</option>
                {nationalityOptions.map((option, index) => (
                  <option key={index} value={option.countryid}>
                    {option.countryname}
                  </option>
                ))}
              </Form.Control> */}
              <Form.Control
                  as="select"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Select Country">Select Country</option>
                  {nationalityOptions.map((option, index) => (
                    <option key={index} value={option.countryid}>
                      {option.countryname}
                    </option>
                  ))}
                </Form.Control>

              <i className="down_arw_drp"></i>
            </div>
          </div>
          <div className="clr"></div>
          <input
            name=""
            id="btnSearch"
            value="Search"
            // onClick={() => HotelSearch()}
            onClick={handleSubmit}
            style={{ WebkitAppearance: "none" }}
            type="button"
            className="fs_btn"
          />
        </div>
      </div>
      <div className="clr"></div>
      {isCityInputSelected && (
        <AutoSuggest
          closeCityInput={closeCityInput}
          handleCitySelect={handleCitySelect}
        />
      )}
      {isRoomInputSelected && (
        <RoomSelectionComponent
          rooms={rooms}
          addRoom={addRoom}
          removeRoom={removeRoom}
          updateRoom={updateRoom}
          closeRoomInput={closeRoomInput}
          updateChildAge={updateChildAge}
        />
      )}
      {isCalenderSelected && (
        <DatePickerComponent
          closeDateInput={closeDateInput}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      )}
    </div>
  );
};

export default SearchForm;
