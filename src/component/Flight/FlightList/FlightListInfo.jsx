import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiMapPin, FiCalendar, FiTag, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { useCurrency } from "../../../context/CurrencyContext";
import "./FlightListInfo.css";

export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

export const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
  const arrival = new Date(arrivalTime);
  const nextDeparture = new Date(nextDepartureTime);
  const diff = nextDeparture - arrival;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

 const newformatDuration = (minutes) => {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;

      return `${hrs}h ${mins}m`;
    };

export const FlightListInfo = ({ flight, formatDuration }) => {
  const [activeTab, setActiveTab] = useState("details");
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fli-container"
    >
      {/* Tab bar */}
      <div className="fli-tabs">
        <button
          className={`fli-tab ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          ✈ Flight Details
        </button>
        <button
          className={`fli-tab ${activeTab === "baggage" ? "active" : ""}`}
          onClick={() => setActiveTab("baggage")}
        >
          🧳 Baggage
        </button>
        <button
          className={`fli-tab ${activeTab === "fare" ? "active" : ""}`}
          onClick={() => setActiveTab("fare")}
        >
          $ Fare & Rules
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="fli-tab-content"
          >
            {flight.Segments[0].map((segment, sIdx) => (
              <div key={sIdx} className={`fli-segment ${sIdx < flight.Segments[0].length - 1 ? "has-layover" : ""}`}>
                {/* Segment header */}
                <div className="fli-seg-header">
                  <div className="fli-seg-date">
                    <FiCalendar size={11} />
                    <span>{formatTime(segment.Origin.DepTime)}</span>
                  </div>
                  <div className="fli-seg-airline">
                    <img
                      src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                      alt=""
                      width="18"
                      className="fli-airline-logo"
                    />
                    <span className="fli-airline-name">{segment.Airline.AirlineName}</span>
                    <span className="fli-flight-num">{segment.Airline.AirlineCode}-{segment.Airline.FlightNumber}</span>
                    <span className="fli-cabin">{segment.CabinClass}</span>
                  </div>
                </div>

                {/* Main route row */}
                <div className="fli-route-row">
                  {/* Origin */}
                  <div className="fli-airport fli-origin">
                    <div className="fli-time">
                      {new Date(segment.Origin.DepTime).toLocaleTimeString([], {
                        hour: "2-digit", minute: "2-digit", hour12: true,
                      })}
                    </div>
                    <div className="fli-city">{segment.Origin.Airport.CityName}</div>
                    <div className="fli-code">{segment.Origin.Airport.AirportName}({segment.Origin.Airport.AirportCode})</div>
                    <div className="fli-terminal">
                      <FiMapPin size={9} />
                      {segment.Origin.Airport.Terminal ? `Terminal ${segment.Origin.Airport.Terminal}` : ""}
                    </div>
                  </div>

                  {/* Path */}
                  <div className="fli-path">
                    <div className="fli-duration-pill">
                      <FiClock size={11} /> 
                        {/* {formatDuration(
                        Math.floor(
                          (new Date(
                            segment.Destination.ArrTime,
                          ) -
                            new Date(segment.Origin.DepTime)) /
                            (1000 * 60),
                        ),
                      )}{" "} */}
                      {/* {newformatDuration(segment.Duration)} */}
                      {" "}
                      {formatDuration(segment.Duration)}
                    </div>
                    <div className="fli-path-visual">
                      <div className="fli-dot fli-dot-start">
                        <MdFlightTakeoff size={14} className="fli-takeoff-icon" />
                      </div>
                      <div className="fli-path-line"></div>
                      <div className="fli-dot fli-dot-end">
                        <MdFlightLand size={14} className="fli-land-icon" />
                      </div>
                    </div>
                    <div className="fli-nonstop-label">Direct</div>
                  </div>

                  {/* Destination */}
                  <div className="fli-airport fli-destination">
                    <div className="fli-time">
                      {new Date(segment.Destination.ArrTime).toLocaleTimeString([], {
                        hour: "2-digit", minute: "2-digit", hour12: true,
                      })}
                    </div>
                    <div className="fli-city">{segment.Destination.Airport.CityName}</div>
                    <div className="fli-code">{segment.Destination.Airport.AirportName}({segment.Destination.Airport.AirportCode})</div>
                    <div className="fli-terminal">
                      <FiMapPin size={9} />
                      {segment.Destination.Airport.Terminal ? `Terminal ${segment.Destination.Airport.Terminal}` : ""}
                    </div>
                  </div>
                </div>

                {/* Layover banner */}
                {sIdx < flight.Segments[0].length - 1 && (
                  <div className="fli-layover">
                    <FiAlertCircle size={13} />
                    <span>
                      <strong>Layover: {formatLayoverTime(segment.Destination.ArrTime, flight.Segments[0][sIdx + 1].Origin.DepTime)}</strong>
                      &nbsp;in {segment.Destination.Airport.CityName}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
        
        {activeTab === "baggage" && (
            <motion.div
                key="baggage"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="fli-tab-content"
            >
                {flight.Segments[0].map((segment, idx) => (
                    <div key={idx} className="fli-baggage-card">
                        <div className="fli-baggage-header">
                            <img
                                src={`/Images/AirlineLogo/${segment.Airline.AirlineCode}.gif`}
                                alt=""
                                width="20"
                            />

                            <div>
                                <strong>
                                    {segment.Airline.AirlineName}
                                </strong>

                                <div>
                                    {segment.Origin.Airport.AirportCode}
                                    {" → "}
                                    {segment.Destination.Airport.AirportCode}
                                </div>
                            </div>
                        </div>

                        <div className="fli-baggage-row">
                            <span>🧳 Check-in Baggage</span>

                            <strong>
                                {segment.Baggage || ""}
                            </strong>
                        </div>

                        <div className="fli-baggage-row">
                            <span>💼 Cabin Baggage</span>

                            <strong>
                                {segment.CabinBaggage || ""}
                            </strong>
                        </div>
                    </div>
                ))}
            </motion.div>
        )}

        {activeTab === "fare" && (
          <motion.div
            key="fare"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="fli-tab-content fli-fare-grid"
          >
            {/* Fare summary */}
            <div className="fli-fare-card">
              <div className="fli-fare-card-header">
                <FiTag size={14} />
                <span>Fare Summary</span>
              </div>
              <div className="fli-fare-rows">
                {flight.FareBreakdown.map((fb, fIdx) => (
                  <div key={fIdx} className="fli-fare-row">
                    <div>
                      <div className="fli-pax-type">
                        {fIdx === 0 ? "Adult" : fIdx === 1 ? "Child" : "Infant"}
                        <span className="fli-pax-count">×{fb.PassengerCount}</span>
                      </div>
                      <div className="fli-fare-breakdown-small">
                        Base {formatPrice(fb.BaseFare)} · Tax {formatPrice(fb.Tax)}
                      </div>
                    </div>
                    <div className="fli-fare-amount">{formatPrice(fb.BaseFare + fb.Tax)}</div>
                  </div>
                ))}
              </div>
              <div className="fli-fare-total">
                <span>Total Fare</span>
                <span className="fli-grand-total">{formatPrice(flight.Fare.PublishedFare)}</span>
              </div>
            </div>

            {/* Policies */}
            <div className="fli-policies-card">
              <div className="fli-policies-header">Policies</div>
              <div className="fli-policy-item">
                <div className="fli-policy-icon fli-policy-cancel">
                  <FiAlertCircle size={14} />
                </div>
                <div>
                  <div className="fli-policy-title">Cancellation</div>
                  <div className="fli-policy-desc">Fees apply based on time of cancellation. Check terms for full details.</div>
                </div>
              </div>
              <div className="fli-policy-item">
                <div className="fli-policy-icon fli-policy-change">
                  <FiRefreshCw size={14} />
                </div>
                <div>
                  <div className="fli-policy-title">Date Change</div>
                  <div className="fli-policy-desc">Fees + fare difference apply. Subject to seat availability.</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
