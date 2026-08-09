import React, { useEffect, useState } from "react";
import "./BusSeatLayout.css";
import { TbSteeringWheel } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BusSeatLayout = ({ seatData, boardingDropping }) => {

  console.log("SeatLayout:", seatData);
  

  const seatDetails = seatData?.SeatLayout?.SeatDetails;
  const allSeats = Array.isArray(seatDetails)
    ? Array.isArray(seatDetails[0])
      ? seatDetails.flat()
      : seatDetails
    : [];

  const lowerSeats = allSeats.filter((seat) => seat.IsUpper === false);
  const upperSeats = allSeats.filter((seat) => seat.IsUpper === true);
  const boardingPoints = boardingDropping?.boardingPoints || [];
  const droppingPoints = boardingDropping?.droppingPoints || [];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);


  useEffect(() => {
    if (selectedSeats.length > 0) {
      setActiveTab("boarding");
    } else {
      setActiveTab(null);
      setSelectedBoarding(null);
      setSelectedDropping(null);
    }
  }, [selectedSeats]);

  

  // const toggleSeat = (seatId) => {
  //   setSelectedSeats((prev) =>
  //     prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
  //   );
  // };

  const toggleSeat = (seat) => {
  setSelectedSeats((prev) => {
    const alreadySelected = prev.find((s) => s.SeatName === seat.SeatName);
    if (alreadySelected) {
      return prev.filter((s) => s.SeatName !== seat.SeatName);
    } else {
      return [...prev, seat];
    }
  });
};


const renderSeat = (seat) => {
  const isSelected = selectedSeats.some((s) => s.SeatName === seat.SeatName);
  const seatClass = `seat 
    ${seat.SeatStatus === "BOOKED" ? "booked" : "available"} 
    ${seat.IsLadiesSeat ? "ladies" : ""} 
    ${isSelected ? "selected" : ""}
  `;

  return (
    <div
      key={seat.SeatName}
      className={seatClass}
      onClick={() => seat.SeatStatus !== "BOOKED" && toggleSeat(seat)}
    >
      <div className="seat-name">{seat.SeatName}</div>
      <div className="seat-fare">₹{seat.SeatFare}</div>
    </div>
  );
};


const navigate = useNavigate();

const handleContinue = (fare) => {

  if (
    selectedBoarding === null ||
    selectedDropping === null ||
    selectedSeats.length === 0
  ) {
    alert("Please select seat, boarding and dropping point.");
    return;
  }
  localStorage.setItem("SelectedBusSeats", JSON.stringify(selectedSeats));
            localStorage.setItem("SeatBaseFare", fare);

  navigate("/busprebook", {
    state: {
      selectedSeats,
      selectedBoarding,
      selectedDropping,
      boardingPoints,
      droppingPoints,
    },
  });
};



  return (
    <div className="busSeatLayout">
      <div className="busSeatLayout-left">
        <div className="busSeatLayout-stepTitle">
          <span className="step">1</span> Select Your Seat
        </div>

        <div className="busSeatLayout-legend">
          <div><span className="legend ladies" /> Ladies</div>
          <div><span className="legend selected" /> Selected</div>
          <div><span className="legend available" /> Available</div>
          <div><span className="legend booked" /> Booked</div>
        </div>

        <div className="busSeatLayout-bus">
          <div className="busSeatLayout-seatContainer">
            {lowerSeats.length > 0 && (
              <div className="seat-section">
                <div className="seat-section-title">
                  <TbSteeringWheel className="busSteeringWheel" /> LOWER SEAT
                </div>
                <div className="busSeatLayout-seats lower-deck">
                  {lowerSeats.map(renderSeat)}
                </div>
              </div>
            )}

            {upperSeats.length > 0 && (
              <div className="seat-section">
                <div className="seat-section-title">UPPER SEAT</div>
                <div className="busSeatLayout-seats upper-deck">
                  {upperSeats.map(renderSeat)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="busSeatLayout-right">
          <div className="busSeatLayout-stepTitle">
            <span className="step">2</span> Select Boarding And Dropping Point
          </div>

          {selectedBoarding !== null && selectedDropping !== null ? (
            <div className="busSeatLayout-summary">
              <div className="busSeatLayout-summaryItem">
                <div className="boardingDetails">
                  <strong>Boarding Point:</strong>
                  <div>{boardingPoints[selectedBoarding]?.CityPointName}</div>
                  <div>{boardingPoints[selectedBoarding]?.CityPointAddress}</div>
                  <div>{new Date(boardingPoints[selectedBoarding]?.CityPointTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
                <button className="changeBtn" onClick={() => {
                  setSelectedBoarding(null);
                  setActiveTab("boarding");
                }}>Change</button>
              </div>

              <div className="busSeatLayout-summaryItem">
                <div className="boardingDetails">
                  <strong>Dropping Point:</strong>
                  <div>{droppingPoints[selectedDropping]?.CityPointName}</div>
                  <div>{droppingPoints[selectedDropping]?.CityPointLocation}</div>
                  <div>{new Date(droppingPoints[selectedDropping]?.CityPointTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
                <button className="changeBtn" onClick={() => {
                  setSelectedDropping(null);
                  setActiveTab("dropping");
                }}>Change</button>
              </div>
            </div>
          ) : (
            <>
              <div className="busSeatLayout-tabs">
                <button
                  className={activeTab === "boarding" ? "active" : ""}
                  onClick={() => setActiveTab("boarding")}
                >
                  Boarding Point
                </button>
                <button
                  className={activeTab === "dropping" ? "active" : ""}
                  onClick={() => setActiveTab("dropping")}
                  disabled={selectedBoarding === null}
                >
                  Dropping Point
                </button>
              </div>

              <div className="busSeatLayout-points">
                {activeTab === "boarding" &&
                  boardingPoints.map((point, idx) => (
                    <label className="busSeatLayout-pointOption" key={idx}>
                      <input
                        type="radio"
                        name="boarding"
                        checked={selectedBoarding === idx}
                        onChange={() => {
                          setSelectedBoarding(idx);
                          setActiveTab("dropping");
                        }}
                      />
                      <div>
                        <strong>{new Date(point.CityPointTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                        <div>{point.CityPointName}</div>
                        <div>{point.CityPointAddress || point.CityPointLandmark || point.CityPointLocation}</div>
                      </div>
                    </label>
                  ))}

                {activeTab === "dropping" &&
                  droppingPoints.map((point, idx) => (
                    <label className="busSeatLayout-pointOption" key={idx}>
                      <input
                        type="radio"
                        name="dropping"
                        checked={selectedDropping === idx}
                        onChange={() => setSelectedDropping(idx)}
                      />
                      <div>
                        <strong>{new Date(point.CityPointTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                        <div>{point.CityPointName}</div>
                        <div>{point.CityPointAddress || point.CityPointLandmark || point.CityPointLocation}</div>
                      </div>
                    </label>
                  ))}
              </div>
            </>
          )}

          {/* <button className="continueBtn">Continue</button> */}
  <button className="continueBtn"   onClick={() => handleContinue(selectedSeats.reduce((acc, seat) => acc + (seat.SeatFare || 0), 0))}
>Continue</button>


<div className="busSeatLayout-grandTotal">
  <div className="busSeatLayout-grandTotalSeatSelected">
    <span>Seat Selected</span>
    <div className="busgrandTotalSeatSelected">
      {selectedSeats.map((seat, idx) => (
        <span key={idx}>
          {seat.SeatName} {""}
        </span>
      ))}
    </div>
  </div>

  <div className="busSeatLayout-busgrandTotal">
    Grand Total
    <div className="busSeatLayout-grandTotalPrice">
      ₹ {selectedSeats.reduce((acc, seat) => acc + (seat.SeatFare || 0), 0)}
    </div>
  </div>
</div>


        </div>
      )}
    </div>
  );
};

export default BusSeatLayout;
