import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./SearchForm.css";
import AutoSuggest from "./AutoSuggest";
import DatePickerComponent from "./DatePickerComponent";
import RoomSelectionComponent from "./RoomSelectionComponent";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hotelSearch } from "../../../../redux/services/operations/hotel";
import { toast } from "react-toastify";
import axios from "axios";

const SearchFormMobile = ({ onSearchComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isCityInputSelected, setCityInputSelected] = useState(false);
  const [isRoomInputSelected, setRoomInputSelected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [isCalenderSelected, setCalenderSelected] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childrenAges: [] },
  ]);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "day"));
  const [focusedInput, setFocusedInput] = useState(null);

  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active, setActive] = useState(true);
  const [cities2, setCities2] = useState([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const from = searchParams.get("from") || "";
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    const roomsParam = searchParams.get("rooms");

    if (from) setSelectedCity(from);
    if (start) setStartDate(moment(start));
    if (end) setEndDate(moment(end));
    if (roomsParam) {
      try {
        const parsedRooms = JSON.parse(roomsParam);
        setRooms(parsedRooms);
      } catch (err) {
        console.warn("Invalid rooms JSON", err);
      }
    }
  }, []);

  const updateQueryParam = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value !== undefined && value !== null) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.CityName);
    setSelectedCityId(city.id);
    setCityInputSelected(false);
    updateQueryParam("cityName", city.CityName);
    updateQueryParam("from", city.id);
  };

  const handleCityInputFocus = () => setCityInputSelected(true);
  const handleRoomInputFocus = () => setRoomInputSelected(true);
  const closeRoomInput = () => setRoomInputSelected(false);
  const closeCityInput = () => setCityInputSelected(false);

  const fetchDatas = async (value) => {
    try {
      const requestData = { city: value };
      const response = await axios.post(
        "https://admin.trustedfare.com/api/Hotel/CityList",
        requestData,
      );
      const json = response.data;

      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())) ||
              (user.CountryName &&
                user.CountryName.toLowerCase().includes(value.toLowerCase())))
          );
        })
        .map((user) => {
          let priority = 3;
          if (
            user.CityName &&
            user.CityName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 1;
          } else if (
            user.CountryName &&
            user.CountryName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 2;
          }
          return { ...user, priority };
        })
        .sort((a, b) => a.priority - b.priority);

      setCities2(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCitySearch = (value) => {
    if (value.length === 3) {
      fetchDatas(value.toLowerCase());
    } else {
      setCities2([]);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleCalenderFocus = (input) => {
    setCalenderSelected(true);
    if (!isCalenderSelected) {
      if (input === "startDate") setFocusedInput("startDate");
      else if (input === "endDate") setFocusedInput("endDate");
      else {
        setCalenderSelected(!isCalenderSelected);
        if (!isCalenderSelected) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };

  const closeDateInput = () => setCalenderSelected(false);

  const syncRoomsToQuery = (updatedRooms) => {
    // updateQueryParam("rooms", JSON.stringify(updatedRooms));
  };

  const addRoom = () => {
    if (rooms.length < 6) {
      const updated = [...rooms, { adults: 2, children: 0, childrenAges: [] }];
      setRooms(updated);
      syncRoomsToQuery(updated);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updated = [...rooms];
      updated.splice(index, 1);
      setRooms(updated);
      syncRoomsToQuery(updated);
    }
  };

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    if (field === "children") {
      updatedRooms[index].childrenAges = Array(value).fill(null);
    }
    setRooms(updatedRooms);
    syncRoomsToQuery(updatedRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = age;
    setRooms(updatedRooms);
    syncRoomsToQuery(updatedRooms);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error(`Please fill out all fields ${startDate} ${endDate}`);
      return;
    }

    // const formDataToPass = {
    //   from: selectedCityId,
    //   startDate: startDate.format("YYYY-MM-DD"),
    //   endDate: endDate.format("YYYY-MM-DD"),
    //   rooms: JSON.stringify(rooms),
    // };
    const formDataToPass = {
      from: selectedCityId,
      cityName: selectedCity,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: JSON.stringify(rooms),
    };

    localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
    localStorage.setItem("hotelCin", startDate.format("YYYY-MM-DD"));
    localStorage.setItem("hotelCout", endDate.format("YYYY-MM-DD"));

    const queryString = new URLSearchParams(formDataToPass).toString();
    navigate(`/hotelmodify?${queryString}`);

    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <div className="container_tbs hotelsearchmobile">
      <div className="tab-content-fs" style={{ marginTop: "20px" }}>
        <div className="pd20_n">
          <h1 className="app-hide mb_title">
            Same hotel, Cheapest price. Guaranteed!
          </h1>
          <div id="divOneWayRT">
            <div className="wid46 fl m_rel" style={{ width: "100%" }}>
              <Form
                method="post"
                action="#"
                autoComplete="off"
                onSubmit={handleSubmit}
                className="ng-pristine ng-valid"
              >
                <div className="lb_bg mgt13 hgt93">
                  <p className="_ft-sz f13">
                    Enter City name, Location or Specific hotel
                  </p>
                  <div className="fs_srch">
                    {/* <input
                      id="txtCityForMobile"
                      type="text"
                      autoComplete="off"
                      className="hl-input"
                      placeholder={selectedCity ? selectedCity : "Enter City/Hotel Name"}
                      onFocus={handleCityInputFocus}
                    /> */}
                    <input
                      id="txtCityForMobile"
                      type="text"
                      autoComplete="off"
                      className="hl-input"
                      placeholder="Enter City/Hotel Name"
                      value={selectedCity}
                      onFocus={handleCityInputFocus}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        handleCitySearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </Form>
            </div>

            <div
              controlId="ddate"
              className="wid46 fl mgt13"
              onClick={handleCalenderFocus}
            >
              <div className="lb_bg ddateClass" id="dvfarecal">
                <p className="inpttl2">Check-In</p>
                <input
                  type="text"
                  readOnly
                  className="hl-input2"
                  value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                  onClick={() => handleCalenderFocus("startDate")}
                />
              </div>
            </div>

            <div controlId="rdate" className="wid46 fr mgt13">
              <div className="retu-date-n" id="rdatelbl">
                <div className="lb_bg m_rel">
                  <div className="rdateClass" id="rdateFade">
                    <p className="inpttl2">Check-Out</p>
                    <input
                      type="text"
                      readOnly
                      className="hl-input2 cl-bl hide-ddate round-but1"
                      value={endDate ? endDate.format("MM/DD/YYYY") : ""}
                      onClick={() => {
                        handleCalenderFocus("endDate");
                        handleSearchFlightRound();
                      }}
                    />
                    <input type="hidden" name="hdn1" id="hdn1" />
                    <input id="hdn" type="hidden" />
                  </div>
                  <i
                    className="cross_i crs2"
                    id="divCross"
                    onClick={handleSearchFlight}
                  />
                </div>
              </div>
            </div>

            <div className="noOfAdl mgt-10">
              <div
                controlId="travellers"
                className="wid46 fl mgt13"
                style={{ width: "100%" }}
              >
                <div className="_en-icon"></div>
                <div className="lb_bg ad-ch-sec" onClick={handleRoomInputFocus}>
                  <p className="_ft-sz f13 mgb3">Guest and Room</p>
                  <span className="ttl_ad">
                    <span style={{ fontSize: "18px" }}>
                      {rooms.reduce(
                        (total, room) => total + room.adults + room.children,
                        0,
                      )}
                    </span>{" "}
                    Guest,
                    <span style={{ fontSize: "18px" }}>
                      {rooms.length}
                    </span>{" "}
                    {rooms.length === 1 ? "Room" : "Rooms"}
                  </span>
                  <span className="circle plus"></span>
                </div>
              </div>
            </div>

            <div className="clr" />
            <input
              name=""
              id="btnSearch"
              value="Search"
              onClick={handleSubmit}
              style={{ WebkitAppearance: "none" }}
              type="button"
              className="fs_btn"
            />
          </div>
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
          setStartDate={handleStartDateChange}
          setEndDate={handleEndDateChange}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      )}
    </div>
  );
};

export default SearchFormMobile;
