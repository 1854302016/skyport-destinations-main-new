import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./DatePickerComponent.css"; // Import your CSS file
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

const DatePickerComponent = ({
  closeDateInput,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
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
      setFocusedInput(null);
      closeDateInput();
    } else if (startDate) {
      setFocusedInput("endDate");
    }
    // console.log(startDate);
    // console.log(endDate);
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
                  Check-in Date <br />
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
                  Check-out Date <br />
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
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          // onDatesChange={({ startDate, endDate }) => {
          //   setStartDate(startDate);
          //   setEndDate(endDate);
          // }}
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focused) => setFocusedInput(focused)}
          isOutsideRange={(day) => day.isBefore(moment(), "day")}
          numberOfMonths={12}
          daySize={daysize}
          // daySize={null}
          orientation="vertical"
        />
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
              Done (
              {startDate && endDate ? endDate.diff(startDate, "days") : "0"}{" "}
              Night)
            </span>
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DatePickerComponent;