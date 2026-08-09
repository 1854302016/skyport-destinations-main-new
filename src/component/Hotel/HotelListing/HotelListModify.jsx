import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoRadioButtonOffSharp, IoRadioButtonOnOutline } from "react-icons/io5";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { MdOutlineFlight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";



const fareTypes = [
  { label: "Defence Forces", id: "chkArmy", show: true },
  { label: "Students", id: "chkStudent", show: true },
  { label: "Senior Citizens", id: "chkSeniorCitizen", show: true },
  { label: "Doctors Nurses", id: "chkDoctors", show: true },
  { label: "Train Waitlisted", id: "chkTrainWaitListed", show: false },
  { label: "Vaccinated Fares", id: "chkVaccinated", show: false }
];

const ReSearchForm = ({
  dataSearch,
  handleSubmit,
  tripsActive,
  active,
  active2,
  active3,
  handleSearchFlight,
  handleSearchFlightRound,
  handleSearchFlightMultiPle,
  setTripsActive,
  searchInput,
  searchInput2,
  SetClickDestination,
  SetClickDestination2,
  isItemSelected,
  isItemSelected2,
  handleInputChange,
  handleInputChange2,
  filteredCities,
  filteredCities2,
  clickDestination,
  clickDestination2,
  handleCitySelect,
  handleCitySelect2,
  startDate,
  setStartDate,
  endDate,
  toggleCalendar,
  rooms,
  moment,
  setTravellerActive,
  travellerActive,
  updateRoom,
  selectedOption,
  handleOptionChange,
  calVisible,
  setCalVisible,
  handleDatesChange,
  focusedInput,
  setFocusedInput,
  renderDayContents,
  numberOfMonths,
}) => {
    const [checkedItems, setCheckedItems] = useState({});
  const [vipChecked, setVipChecked] = useState(false);
  const [showVipPromo, setShowVipPromo] = useState(false);

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
    console.log("Checked ID:", id);
  };

  const handleVipCheck = () => {
    setVipChecked((prev) => !prev);
    setShowVipPromo(true); // mimic showing promocode
  };
  const[activeForm,setActiveForm]=useState(false)

const navigate = useNavigate()
  const handleChangeFlight = () => {
    navigate('/');
  };


  return (
   <div className="flightListPage roundtrippg" style={{position:'relative'}}>
    <div className="bgGradient" style={{minHeight:"80px", padding:"16px 0px"}}></div>
     <div style={{position:'relative'}} clas>
    <section
      ng-app="YT-FLIGHT"
      className="pr animated search-page searchList_flight_TG"
      id="flightSRP"
      
    >
      <section
        ng-controller="modifySearch"
        className="modify-search hide-mobile"
       style={{background: "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)"}}
      >
        {/* ngIf: !isreschd */}
        <div className="wr-hr-center container" ng-if="!isreschd">
         
            <div className="new-theme">
              {/* ngIf: !multicitySummary */}
              <form
                className="grid ng-pristine ng-valid ng-valid-required"
                // onSubmit={handleSubmit}
              >
                {/* {tripsActive ? ( */}
                 
                {/* ) : (
                  ""
                )} */}
                {/* ngRepeat: details in orgDestModel track by $index */}
                <ul className="col-10 flight-details animated">
                  {/* ngIf: timeIndex==1 */}
                  <img src="/Images/flight_aero.png" alt="" width={40} />
                  <li className="sel-icon fs-22 ytfi-trailing-plane v-aligm-m" />

                  <li className="sel-origin pr v-aligm-m">
                    <label className="fs-10 light-label">From</label>
                    <div
                      className="input-holder pb-2 bdr-btm"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        name="from"
                        // placeholder={dataSearch.Segments[0].Origin}
                        className="fs-16 bold ng-touched ng-dirty ng-valid-parse ng-invalid ng-invalid-required ellipsis full-width ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required"
                        // value={destinationCity}
                        value="Del"
                        // value={searchInput}
                        // onClick={() => setTripsActive(true)}
                        // // readOnly
                        // onFocus={() => SetClickDestination(true)}
                        // onBlur={() => {
                        //   if (isItemSelected) SetClickDestination(false);
                        // }}
                        // onChange={(e) => handleInputChange(e.target.value)}
                        autoComplete="off"
                      />
                      {/* <div style={{ position: "relative", minWidth: "300px" }}>
                        <div
                          className="cityselect"
                          style={{
                            position: "absolute",
                            color: "black",
                            backgroundColor: "white",
                            padding: "10px",
                            border: "1px solid black",
                            // display: clickDestination ? "block" : "none",
                            display:
                              searchInput && clickDestination
                                ? "block"
                                : "none",
                            width: "100%",
                            zIndex: 9,
                            // top: "-18px",
                            maxHeight: 300,
                            overflow: "auto",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {filteredCities.map((city, index) => (
                            <div
                              key={index}
                              style={{
                                borderBottom: "1px solid grey",
                                paddingBottom: 5,
                                marginBottom: 5,
                                cursor: "pointer",
                              }}
                              onClick={() => handleCitySelect(city)}
                            >
                              <Row>
                                <Col md={1} style={{ alignItems: "center" }}>
                                  <MdOutlineFlight
                                    size={22}
                                    style={{
                                      textAlign: "center",
                                      height: "100%",
                                      color: "#f73030",
                                    }}
                                  />
                                </Col>
                                <Col md={11}>
                                  <Row>
                                    <div
                                      className="flightFromName"
                                      style={{
                                        color: "#f73030",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {city["CITYNAME"]} ({city["AIRPORTCODE"]})
                                    </div>
                                  </Row>
                                  <Row style={{ color: "grey" }}>
                                    <Col md={10} style={{ paddingRight: 0 }}>
                                      <div
                                        className="flightFromNameInner"
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {city["AIRPORTNAME"]}
                                      </div>
                                    </Col>
                                    <Col md={2} style={{ paddingLeft: 0 }}>
                                      <div
                                        style={{
                                          textAlign: "center",
                                          fontWeight: "700",
                                          fontSize: 10,
                                        }}
                                      >
                                        {city["COUNTRYCODE"]}
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>

                    <FaArrowRightArrowLeft
                      className="ytfi-arrow1 abs rotate-anim cursor-pointer"
                      size={16}
                    />
                  </li>

                  <li className="sel-dest pr v-aligm-m">
                    <label className="fs-10 light-label">To</label>
                    <div className="input-holder  bdr-btm pb-2">
                      <input
                        type="text"
                        name="to"
                        // placeholder={dataSearch.Segments[0].Destination}
                        className="fs-16 bold ng-touched ng-dirty ng-invalid ng-invalid-required ellipsis full-width ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required"
                        // value={searchInput2}
                        // onClick={() => setTripsActive(true)}
                        // // readOnly
                        // onFocus={() => SetClickDestination2(true)}
                        // onBlur={() => {
                        //   if (isItemSelected2) SetClickDestination2(false);
                        // }} // readOnly
                        // onChange={(e) => handleInputChange2(e.target.value)}
                        value="Bom"
                        autoComplete="off"
                      />
                      {/* <div style={{ position: "relative", minWidth: "300px" }}>
                        <div
                          className="cityselect"
                          style={{
                            position: "absolute",
                            color: "black",
                            backgroundColor: "white",
                            padding: "10px",
                            border: "1px solid black",
                            // display: clickDestination2 ? "block" : "none",
                            display:
                              searchInput2 && clickDestination2
                                ? "block"
                                : "none",
                            width: "100%",
                            zIndex: 9,
                            // top: "-18px",
                            maxHeight: 300,
                            overflow: "auto",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {filteredCities2.map((city, index) => (
                            <div
                              key={index}
                              style={{
                                borderBottom: "1px solid grey",
                                paddingBottom: 5,
                                marginBottom: 5,
                                cursor: "pointer",
                              }}
                              onClick={() => handleCitySelect2(city)}
                            >
                              <Row>
                                <Col md={1} style={{ alignItems: "center" }}>
                                  <MdOutlineFlight
                                    size={22}
                                    style={{
                                      textAlign: "center",
                                      height: "100%",
                                      color: "#f73030",
                                    }}
                                  />
                                </Col>
                                <Col md={11}>
                                  <Row>
                                    <div
                                      className="flightFromName"
                                      style={{
                                        color: "#f73030",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {city["CITYNAME"]} ({city["AIRPORTCODE"]})
                                    </div>
                                  </Row>
                                  <Row style={{ color: "grey" }}>
                                    <Col md={10} style={{ paddingRight: 0 }}>
                                      <div
                                        className="flightFromNameInner"
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {city["AIRPORTNAME"]}
                                      </div>
                                    </Col>
                                    <Col md={2} style={{ paddingLeft: 0 }}>
                                      <div
                                        style={{
                                          textAlign: "center",
                                          fontWeight: "700",
                                          fontSize: 10,
                                        }}
                                      >
                                        {city["COUNTRYCODE"]}
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </li>
                  {/* date */}
                  <li className="sel-date pr bdr-btm v-aligm-m">
                    <div className="input-holder pb-2 depart">
                      <input
                        type="text"
                        name="departureDate"
                        id="departureDateInput"
                        className="hide fs-16 bold ellipsis full-width cursor-pointer ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required"
                        placeholder="Enter Departure Date"
                      value="12 june"
                        readOnly
                        onClick={toggleCalendar}
                        autoComplete="off"
                        // onClick={() => setTripsActive(true)}
                      />
                      <label className="fs-10" htmlFor="flight_depart_date_0">
                        <span className="light-label">Date</span>
                        <input
                          type="text"
                          name="departureDate"
                          id="departureDateInput"
                          className="fs-16 bold ellipsis full-width cursor-pointer"
                          placeholder="Enter Departure Date"
                          // value={
                          //   startDate ? startDate.format("MM/DD/YYYY") : ""
                          // }
                          readOnly
                           value="12 june"
                          // onClick={toggleCalendar}
                          autoComplete="off"
                          // onClick={() => setTripsActive(true)}
                        />
                      </label>
                    </div>
                    <span className="hyphen" ng-if="modifyData.type != 'M'">
                      -{" "}
                    </span>
                    <div className="input-holder pb-2 return">
                      <input
                        type="text"
                        id="returnDateInput"
                        name="returnDate"
                        className="hide fs-16 bold ellipsis full-width cursor-pointer ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required"
                        placeholder="Enter Return Date"
                        // value={
                        //   endDate && active2 ? endDate.format("MM/DD/YYYY") : ""
                        // }
                           value="12 june"
                        readOnly
                        // onClick={() => {
                        //   handleSearchFlightRound();
                        //   toggleCalendar("endDate");
                        // }}
                        autoComplete="off"
                        // onClick={() => setTripsActive(true)}
                      />
                      <label className="fs-10">
                        <span className="light-label">Return</span>
                        <input
                          type="text"
                          id="returnDateInput"
                          name="returnDate"
                          className="fs-16 bold ellipsis full-width cursor-pointer"
                          placeholder="Enter Return Date"
                          // value={
                          //   endDate && active2
                          //     ? endDate.format("MM/DD/YYYY")
                          //     : ""
                          // }
                             value="12 june"
                          readOnly
                          // onClick={() => {
                          //   handleSearchFlightRound();
                          //   toggleCalendar("endDate");
                          // }}
                          autoComplete="off"
                          // onClick={() => setTripsActive(true)}
                        />
                      </label>
                    </div>
                    <RxCross2
                      className="fs-18 cursor-pointer abs ytfi-cancel"
                      size={14}
                      style={{ marginTop: "-5px" }}
                    />
                    &nbsp;
                  </li>

                  <li className="sel-class pr v-aligm-m">
                    <div className="">
                      <span className="light-label fs-10">
                        Traveller(s), Class
                      </span>
                      <div
                        className="bdr-btm drop-down bold fs-16 cursor-pointer full-width"
                        // ng-click="showDropDown($event,true)"
                      >
                        <input
                          type="text"
                          placeholder="2 Travellers"
                          // placeholder={`${
                          //   rooms[0].adults +
                          //   rooms[0].children +
                          //   rooms[0].infants
                          // } Travellers, ${
                          //   selectedOption === 2 ? "Economy" : ""
                          // } ${
                          //   selectedOption === 3 ? " Premium Economy" : ""
                          // }  ${selectedOption === 4 ? "Business" : ""}`}
                          className="ellipsis fs-14 i-b"
                          // style={{ fontSize: 12 }}
                          // onClick={() => setTravellerActive(!travellerActive)}
                          autoComplete="off"
                        />

                        <FaChevronDown className="cursor-pointer fs-8 v-aligm-m rotate-anim i-b ytfi-angle-down" />

                        {/* {travellerActive === true ? (
                          <div className="traveller-table abs ">
                            <div className="tab-container">
                              <div className="triangle abs" />
                              <ul>
                                <li className="noOf fs-14 pt-20 pb-16">
                                  <span className="bold">
                                    {rooms[0].adults}{" "}
                                  </span>
                                  <span className="fs-14 bold">Adult</span>
                                  <div className="spinner">
                                    <Link
                                      type="button"
                                      id="Adults_room_1_1_minus"
                                      className="minus"
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "adults",
                                          Math.max(rooms[0].adults - 1, 0)
                                        )
                                      }
                                    >
                                      -
                                    </Link>
                                    <Link
                                      type="button"
                                      id="Adults_room_1_1_plus"
                                      className="plus"
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "adults",
                                          rooms[0].adults + 1 <=
                                            9 - rooms[0].children
                                            ? rooms[0].adults + 1
                                            : rooms[0].adults
                                        )
                                      }
                                    >
                                      +
                                    </Link>
                                  </div>
                                </li>
                                <li className="noOf fs-14 pt-20 pb-16">
                                  <span className="bold">
                                    {" "}
                                    {rooms[0].children}{" "}
                                  </span>
                                  <span className="fs-14 bold">Child</span>
                                  <span className="cat-info fs-12 ml-5">
                                    2-12 years
                                  </span>
                                  <div className="spinner">
                                    <Link
                                      type="button"
                                      id="Children_room_1_1_minus"
                                      className="minus"
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "children",
                                          Math.max(rooms[0].children - 1, 0)
                                        )
                                      }
                                    >
                                      -
                                    </Link>
                                    <Link
                                      type="button"
                                      id="Children_room_1_1_plus"
                                      className="plus"
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "children",
                                          rooms[0].children + 1 <=
                                            9 - rooms[0].adults
                                            ? rooms[0].children + 1
                                            : rooms[0].children
                                        )
                                      }
                                    >
                                      +
                                    </Link>
                                  </div>
                                </li>
                                <li className="noOf fs-14 pt-20 pb-16">
                                  <span className="bold">
                                    {" "}
                                    {rooms[0].infants}{" "}
                                  </span>
                                  <span className="fs-14 bold">
                                    Infant
                                  </span>
                                  <span className="cat-info fs-12 ml-5">
                                    Below 2 years
                                  </span>
                                  <div className="spinner">
                                    <Link
                                      type="button"
                                      id="Children_room_1_1_minus"
                                      className="minus "
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "infants",
                                          Math.max(rooms[0].infants - 1, 0)
                                        )
                                      }
                                    >
                                      -
                                    </Link>
                                    <Link
                                      type="button"
                                      id="Children_room_1_1"
                                      className="plus"
                                      onClick={() =>
                                        updateRoom(
                                          0,
                                          "infants",
                                          Math.min(
                                            rooms[0].infants + 1,
                                            rooms[0].adults
                                          )
                                        )
                                      }
                                    >
                                      +
                                    </Link>
                                  </div>
                                </li>
                              </ul>
                              <div></div>
                              <div className="class-type">
                                <div className="custom-radio">
                                  <label className="mt-8">
                                    <input
                                      type="radio"
                                      value="Economy"
                                      className="ng-valid ng-dirty ng-touched full-width abs ng-pristine ng-untouched ng-not-empty"
                                      checked={selectedOption === 2}
                                      onClick={() => handleOptionChange(2)}
                                    />
                                    <span className="radio-cs" />
                                    <span className="fs-14 text">Economy</span>
                                  </label>
                                </div>
                               
                                <div
                                  className="custom-radio"
                                  ng-repeat="key in className"
                                >
                                  <label className="mt-8">
                                    <input
                                      type="radio"
                                      value="Premium Economy"
                                      className="ng-valid ng-dirty ng-touched full-width abs ng-pristine ng-untouched ng-not-empty"
                                      checked={selectedOption === 3}
                                      onClick={() => handleOptionChange(3)}
                                    />
                                    <span className="radio-cs" />
                                    <span className="fs-14 text">
                                      Premium Economy
                                    </span>
                                  </label>
                                </div>
                              
                                <div
                                  className="custom-radio"
                                  ng-repeat="key in className"
                                >
                                  <label className="mt-8">
                                    <input
                                      type="radio"
                                      value="Business"
                                      className="ng-valid ng-dirty ng-touched full-width abs ng-pristine ng-untouched ng-not-empty"
                                      checked={selectedOption === 4}
                                      onClick={() => handleOptionChange(4)}
                                    />
                                    <span className="radio-cs" />
                                    <span className="fs-14 text">Business</span>
                                  </label>
                                </div>
                               
                              </div>
                              <div className="cat-sel cursor-pointer tr">
                                <input
                                  type="button"
                                  className="fs-14 btn cursor-pointer mb-10 bold"
                                  value="Done"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setTravellerActive(false);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )} */}
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="sel-submit col-2 text-right" style={{padding:""}}>
                  <label>Search</label>
                  <div className="input-holder pb-2">
                    <button
                      className="fs-14 btn-submit cursor-pointer bold"
                      // onClick={() => setTravellerActive(false)}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="col-10 pb-14 mt-15 add-city animated ng-hide">
                  <button className="fs-14 secondary-button button cursor-pointer bold">
                    + Add City
                  </button>
                </div>
              </form>
              <div
                style={{
                  position: "absolute",
                  zIndex: "2000",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  // top: 50
                }}
              >
                {/* {active2
                  ? calVisible && (
                      <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={handleDatesChange}
                        isOutsideRange={(day) => day.isBefore(moment(), "day")}
                        focusedInput={focusedInput}
                        onFocusChange={(focused) => setFocusedInput(focused)}
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
                        isOutsideRange={(day) => day.isBefore(moment(), "day")}
                        focusedInput={focusedInput}
                        onFocusChange={(focused) => {
                          if (focused) setFocusedInput("startDate");
                        }}
                        renderDayContents={renderDayContents}
                        numberOfMonths={numberOfMonths}
                      />
                    )} */}
              </div>
             

            </div>
       
        </div>
       
      </section>
    </section>

<div className="research_form_TG_phone" style={{position:'relative'}}>
<div className="appBanner-styles__AppBannerWrapper-sc-715249f3-0 khVnAz">
  <div loading={0} id="id_app_topbanner" className="sc-dntaoT jkuTQU">
    <div height="73px" className="sc-khLCKb fyDhwD">
  
      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#FFC24A" />
      </svg>
      <div color="#46484d" className="sc-dstKZu cCaHSw">
        <div appearance="normal" className="sc-keTIit djtTsV">
          <div id="logo" className="sc-ovuCP cXWDuI">
            <div
              width={49}
              height={49}
              logourl="https://gos3.ibcdn.com/top-bar-mweb2app-1659001525.gif"
              className="sc-blHHSb gmgyBL"
            />
          </div>
          <div id="heading" width="60%" className="sc-eOzmre lpgkjr">
            <span className="sc-dpBQxM hKhAyg">Save more on APP!!</span>
            <div mt={2} className="sc-ivxoEo escGSV">
              <div appearance="normal" className="sc-jwIPbr ksTOFV">
                Get INR 1700 DISCOUNT* only on APP. Use Code: GOAPP.
              </div>
            </div>
          </div>
          <div appearance="normal" className="sc-eauhAA kaJCyn">
            <div className="sc-geXuza kClTxs">
              <button
                ctatextcolor="#F16736"
                ctabgcolor="#ffffff"
                ctabordercolor="transparent"
                id="halfcta"
                className="sc-ixGGxD cujDZY"
              >
                <span className="sc-fFoeYl ePAYit">OPEN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<section
  data-testid="header"
  className="srp-styles__HeaderSrpWrap-sc-f04c77b5-0 hdlgcT"
>
  <div className="srp-styles__FSrpHeaderWrp-sc-f04c77b5-1 doNMEg">
    <div
      data-testid="header_back"
      className="srp-styles__IconSpace-sc-f04c77b5-2 iXBOku"
    
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="#ffffff"
        loading="lazy"
       
        className="arrowLeft__ArrowLeftIcon-sc-5fabd0ed-0 cTjPkF"
      >
        <path d="M6.047 15.997a3.07 3.07 0 0 1 1.04-2.305L21.956.612a2.462 2.462 0 0 1 3.25 3.697L12.205 15.75a.334.334 0 0 0 0 .5l13.003 11.44a2.463 2.463 0 0 1-3.252 3.697L7.09 18.31A3.08 3.08 0 0 1 6.046 16z" />
      </svg>
    </div>
    <div className="srp-styles__FSrpHeaderContainer-sc-f04c77b5-3 fDQueX">
      <div className="srp-styles__FlightItenry-sc-f04c77b5-4 obQsT flex1">
        <div className="route alignItemsCenter">
          <span data-testid="header_src" className="truncate">
           Del - BOm
          </span>
         
        </div>
        <div className="srp-styles__HeaderDateTrvlrs-sc-f04c77b5-5 fkbNmA">
          <div className="srp-styles__Divider-sc-f04c77b5-6 uGZyP">|</div>
          <div data-testid="header_date" className="date">
         12 june
          </div>
          <div className="srp-styles__Divider-sc-f04c77b5-6 uGZyP">|</div>
          <div data-testid="header_pax" className="dF alignItemsCenter">
       10
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width=".8rem"
              height=".97rem"
              fill="none"
              className="paxIcon__PaxIcon-sc-c4715cf9-0 eCxVFL"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M6.362 2.547c0 1.407-.957 2.548-2.363 2.548s-2.364-1.14-2.364-2.548C1.635 1.14 2.592 0 4 0c1.406 0 2.363 1.14 2.363 2.547M4 5.65c.744 0 1.404-.268 1.908-.72v-.001A4.02 4.02 0 0 1 8 8.278a5.566 5.566 0 0 1-8 0 4.01 4.01 0 0 1 2.091-3.35c.505.453 1.165.72 1.91.72"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
      
        className="srp-styles__IconWrap-sc-f04c77b5-8 haitJk flexCol"
      >
        <div className="srp-styles__IconText-sc-f04c77b5-9 itDUGG">CHANGE</div>
      </div>
    </div>
  </div>
</section>

{/* {
  activeForm && (
    <div className="srp-styles__ModifyWrap-sc-f04c77b5-7 ckWBlE">
  <div
    data-testid="sw_container"
    className="searchWidget-styles__HomeWrap-sc-90b2461d-0 hAkIrh"
  >
    <div className="dF justifyEnd padB5">
      <div
         
        className="searchWidget-styles__CloseIconWrap-sc-90b2461d-57 fToGG"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          className="closeIcon__CloseIcon-sc-344d3063-0 gSvfwu"
        >
          <path
            fill="#4B4E51"
            fillRule="evenodd"
            d="M1.193.151A.744.744 0 0 0 .218 1.27L6.948 8l-6.73 6.73a.743.743 0 0 0 .975 1.119l.076-.067L8 9.052l6.73 6.73.077.067a.744.744 0 0 0 .975-1.118L9.052 8l6.73-6.73A.743.743 0 0 0 14.807.15l-.076.067L8 6.948 1.27.219z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div id="hotelSearch" className="hotelsearchmobile mobile_search_container_list">

   </div>
  </div>
</div>
  )
} */}




</div>
    
    </div>
   </div>
  );
};

export default ReSearchForm;
