import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import "./DatePickerComponent.css";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { fares } from "../../Flight/BookingSearch/FlightBooking";

const BusDatePicker = ({
  closeDateInput,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  active2,
  focusedInput,
  setFocusedInput,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //   const val = windowwidth / 7;
  const handleDoneButtonClick = () => {
    // Define your Done button click logic here
  };
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [focusedInput, setFocusedInput] = useState(null);
  const [daysize, setDaysize] = useState(windowWidth / 7);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDaysize(windowWidth / 7);
  }, [windowWidth]);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null); // Close the calendar after selecting both start and end dates
      closeDateInput();
    } else if (startDate) {
      setFocusedInput("endDate"); // Move focus to end date selection
    }
  };

  const isSameDay = (date1, date2) => date1.isSame(date2, "day");

  const renderDayContents = (day) => {
    const fare = fares.find((item) => isSameDay(day, item.date));
    const isStartDate = startDate && isSameDay(day, startDate);
    const isEndDate = endDate && isSameDay(day, endDate);
    const isInRange =
      startDate && endDate && day.isBetween(startDate, endDate, "day", "[]");

    let classNames = ["DayPicker-Day"];
    if (isStartDate) classNames.push("DayPicker-Day--start");
    if (isEndDate) classNames.push("DayPicker-Day--end");
    if (isInRange) classNames.push("DayPicker-Day--range");
    // if (fare) classNames.push("fare-available");
    // else classNames.push("fare-unavailable");

    return (
      <div className={classNames.join(" ")}>
        <span style={{ fontWeight: "600", fontSize: "13px" }}>
          {day.format("D")}
        </span>
        <br />
        {fare && (
          <span
            style={{ fontSize: "10px", color: "#f73030", fontWeight: "600" }}
          >
            {fare.fare}
          </span>
        )}
      </div>
    );
  };

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
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

  return (
    <div className="mai-dv" style={{ display: "block" }}>
      <div className="subdiv">
        <div className="weekBg stickytop2">
          <div className="chekinCol topHeader">
            <div className="innerFlex">
              <div className="checColm">
                <p
                  className="chktophed"
                  style={{ textTransform: "capitalize", textAlign: "center" }}
                >
                  Departure Date <br />
                </p>
                <span
                  className="chktopdate"
                  style={{ textAlign: "left" }}
                  id="spnCheckInmonthTop"
                >
                  {parsedStartDate.getDate()}
                </span>
                <span
                  className="chktopdate"
                  style={{ textAlign: "left" }}
                  id="spnCheckinDateTop"
                >
                  {months[parsedStartDate.getMonth()]} '
                  {parsedStartDate.getFullYear().toString().substr(-2)}
                </span>
                <span
                  className="chktopdate"
                  style={{ textAlign: "left" }}
                  id="spnCheckinNameTop"
                >
                  {days[parsedStartDate.getDay()]}
                </span>
              </div>
              <div className="checotColm">
                <p
                  className="chktophed"
                  style={{ textTransform: "capitalize" }}
                >
                  Return Date <br />
                  <span
                    className="chktopdate"
                    style={{
                      textAlign: "left",
                      display: "none",
                      color: "rgb(160, 160, 160)",
                    }}
                    id="spnCheckoutInmonthTopMessg"
                  >
                    Select check-out date
                  </span>
                </p>
                <div
                  id="myDivDate"
                  style={{ textAlign: "left", display: "block" }}
                >
                  <span className="chktopdate" id="spnCheckoutInmonthTop">
                    {parsedEndDate.getDate()}
                  </span>
                  <span className="chktopdate" id="spnCheckoutinDateTop">
                    {months[parsedEndDate.getMonth()]} '
                    {parsedEndDate.getFullYear().toString().substr(-2)}
                  </span>
                  <span className="chktopdate" id="spnCheckoutinNameTop">
                    {days[parsedEndDate.getDay()]}
                  </span>
                </div>
              </div>
              <div
                id="btnDoneCallX"
                onClick={closeDateInput}
                style={{
                  fontWeight: "normal",
                  fontSize: "29px",
                  color: "#909090",
                }}
              >
                ×
              </div>
            </div>
          </div>
          <table className="weektable">
            <thead>
              <tr>
                <th className="weekTxt">
                  <span>SUN</span>
                </th>
                <th className="weekTxt">
                  <span>MON</span>
                </th>
                <th className="weekTxt">
                  <span>TUE</span>
                </th>
                <th className="weekTxt">
                  <span>WED</span>
                </th>
                <th className="weekTxt">
                  <span>THU</span>
                </th>
                <th className="weekTxt">
                  <span>FRI</span>
                </th>
                <th className="weekTxt">
                  <span>SAT</span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        {/* calender */}
        {/* <div className="fullscreen-datepicker"> */}
        {active2 ? (
          <DayPickerRangeController
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focused) => setFocusedInput(focused)}
            isOutsideRange={(day) => day.isBefore(moment(), "day")}
            renderDayContents={renderDayContents}
            numberOfMonths={12}
            daySize={daysize}
            // daySize={null}
            orientation="vertical"
          />
        ) : (
          <DayPickerRangeController
            startDate={startDate}
            endDate={null}
            onDatesChange={({ startDate }) => {
              setStartDate(startDate);
              closeDateInput(); // Close the calendar after selecting a date
            }}
            focusedInput={focusedInput}
            onFocusChange={(focused) => {
              if (focused) setFocusedInput("startDate");
            }}
            isOutsideRange={(day) => day.isBefore(moment(), "day")}
            renderDayContents={renderDayContents}
            numberOfMonths={12}
            daySize={daysize}
            // daySize={null}
            orientation="vertical"
          />
        )}
      </div>
      <div style={{ display: "block" }} id="divBtnDone">
        <div className="botmSectn">
          <a
            className="btnDone"
            id="btnDoneCall"
            onClick={handleDoneButtonClick}
            href="#"
          >
            <span
              className="ttlNight"
              id="totalCheckInCheckOut"
              onClick={closeDateInput}
            >
              Done
            </span>
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BusDatePicker;
