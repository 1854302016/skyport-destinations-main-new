import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { motion } from "framer-motion";
import { FiClock, FiMapPin, FiInfo, FiCalendar, FiTag, FiFileText } from "react-icons/fi";
import { airlinesnames } from "../../../Airlines";
import { Spinner } from "react-bootstrap";
import "../FlightList/FlightListInfo.css";

export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};
export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};

const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
  const arrival = new Date(arrivalTime);
  const nextDeparture = new Date(nextDepartureTime);
  const diff = nextDeparture - arrival;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const formatPolicyInfo = (policyInfo) => {
  if (!policyInfo) return "";
  if (policyInfo.startsWith("__nls__")) {
    policyInfo = policyInfo.slice(7);
  }
  return policyInfo.replace(/__nls__/g, "\n");
};

export const FlightListInfoInternational = ({
  idx,
  flight,
  fareRules,
  SrdvIndex,
  isFareLoading,
  formatDuration
}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderFareRulesForSrdvTJ = () => {
    if (!fareRules) return null;
    return Object.keys(fareRules).map((route, index) => {
      const rules = fareRules[route];
      return (
        <div key={index} className="mb-4">
          <div className="fw-bold text-primary mb-2 small text-uppercase tracking-wider">{route}</div>
          <div className="table-responsive">
            <table className="table table-sm table-borderless small mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-2 px-3 fw-800 text-muted" style={{fontSize: '10px'}}>TYPE</th>
                  <th className="py-2 px-3 fw-800 text-muted" style={{fontSize: '10px'}}>AMOUNT</th>
                  <th className="py-2 px-3 fw-800 text-muted" style={{fontSize: '10px'}}>POLICY</th>
                </tr>
              </thead>
              <tbody>
                {rules.fr && Object.keys(rules.fr).map((ruleType) => (
                  <tr key={ruleType} className="border-bottom">
                    <td className="py-2 px-3 fw-bold">{ruleType}</td>
                    <td className="py-2 px-3">{rules.fr[ruleType].DEFAULT.amount}</td>
                    <td className="py-2 px-3 text-muted" style={{fontSize: '10px'}}>
                      {formatPolicyInfo(rules.fr[ruleType].DEFAULT.policyInfo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    });
  };

  const renderSegment = (segment, sIdx, segmentsArray) => (
    <div key={sIdx} className="segment-item mb-4 last-child-mb-0 border-bottom border-3 pb-3">
      <div className="segment-header d-flex align-items-center mb-3">
        <Box className="text-dark border me-2 py-1 px-2 fw-semibold small" sx={{ backgroundColor: '#f8fafc', display: 'inline-flex', alignItems: 'center', borderRadius: '4px' }}>
          <FiCalendar className="me-1" />
          {formatTime(segment.DepartureDateTime)}
        </Box>
        <div className="airline-info-mini d-flex align-items-center small text-muted">
          <img 
            src={`/Images/AirlineLogo/${segment.OperatingAirline.Code}.gif`} 
            alt="" 
            width="20" 
            className="me-2"
          />
          <span className="fw-bold text-dark">
            {airlinesnames.find(a => a.AirlineCode === segment.OperatingAirline.Code)?.AirlineName || segment.OperatingAirline.Code}
          </span>
          <span className="mx-2">•</span>
          <span>{segment.OperatingAirline.Code}-{segment.FlightNumber}</span>
        </div>
      </div>
      
      <div className="row g-0 align-items-center text-center">
        {/* Origin */}
        <div className="col-4">
          <div className="h5 fw-800 mb-0">{new Date(segment.DepartureDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</div>
          <div className="small fw-bold text-dark">{segment.SourceAirport.city_name}  ({segment.DepartureAirportLocationCode})</div>
          <div className="text-muted" style={{fontSize: '10px'}}>Terminal - Main T</div>
        </div>

        {/* Duration Path */}
        <div className="col-4 px-2">
          <div className="duration-pill-info mb-1 d-inline-block px-2 py-1 bg-light rounded-pill small text-muted fw-bold" style={{fontSize: '10px'}}>
            <FiClock className="me-1" /> {formatDuration(segment.JourneyDuration)}
          </div>
          <div className="horizontal-path-info position-relative my-2">
             <div className="path-line"></div>
             <div className="plane-icon-center text-primary position-absolute top-50 start-50 translate-middle bg-white px-1">
                <FiInfo style={{fontSize: '12px'}} />
             </div>
          </div>
          <div className="text-muted small fw-bold" style={{fontSize: '9px'}}>Economy</div>
        </div>

        {/* Destination */}
        <div className="col-4">
          <div className="h5 fw-800 mb-0">{new Date(segment.ArrivalDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</div>
          <div className="small fw-bold text-dark">{segment.DestinationAirport.city_name}  ({segment.ArrivalAirportLocationCode})</div>
          <div className="text-muted" style={{fontSize: '10px'}}>Terminal - Main T</div>
        </div>
      </div>

      {sIdx < segmentsArray.length - 1 && (
        <div className="layover-banner-premium mt-3 p-2 rounded-3 text-center bg-orange-light">
          <span className="fw-800 text-orange small text-uppercase tracking-wider">Layover {formatLayoverTime(segment.ArrivalDateTime, segmentsArray[sIdx + 1].DepartureDateTime)}</span>
          <span className="text-muted small ms-2">in {segment.ArrivalAirportLocationCode}</span>
        </div>
      )}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-info-container p-3"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "rgba(0,0,0,0.08)" }}>
          <TabList 
            onChange={handleChange} 
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                minWidth: 'auto',
                marginRight: '1.5rem',
                color: '#64748b',
                minHeight: '40px',
                '&.Mui-selected': { color: '#1e293b' }
              }
            }}
          >
            <Tab label="Flight Information" value="1" />
            <Tab label="Fare & Rules" value="2" />
            <Tab label="Baggage" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1" className="px-0 py-2">
          <div className="segments-stack">
            {/* Departure Journey */}
            <div className="journey-section mb-4">
               <div className="section-label mb-4 d-flex justify-content-center align-items-center">
  <div className="d-flex align-items-center w-100" style={{ maxWidth: '500px' }}>
    
    <div
      className="flex-grow-1"
      style={{
        height: '2px',
        background: 'linear-gradient(to right, transparent, #3b82f6)'
      }}
    ></div>
    
    <Box
      sx={{
        bgcolor: '#2563eb',
        color: '#fff',
        px: 3,
        py: 0.8,
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 800,
        mx: 2,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
        border: '2px solid #bfdbfe'
      }}
    >
      ✈️ DEPARTURE
    </Box>
    
    <div
      className="flex-grow-1"
      style={{
        height: '2px',
        background: 'linear-gradient(to left, transparent, #3b82f6)'
      }}
    ></div>

  </div>
</div>
               {flight.OriginDestinationOptions[0].FlightSegments.map((segment, sIdx) => 
                 renderSegment(segment, sIdx, flight.OriginDestinationOptions[0].FlightSegments)
               )}
            </div>

            {/* Return Journey if exists */}
            {flight.OriginDestinationOptions[1] && (
               <div className="journey-section">
              <div className="section-label mb-4 d-flex justify-content-center align-items-center">
  <div className="d-flex align-items-center w-100" style={{ maxWidth: '500px' }}>
    
    <div className="flex-grow-1" style={{ height: '2px', background: 'linear-gradient(to right, transparent, #ef4444)' }}></div>
    
    <Box
      sx={{
        bgcolor: '#dc2626',
        color: '#fff',
        px: 3,
        py: 0.8,
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 800,
        mx: 2,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
        border: '2px solid #fecaca'
      }}
    >
      🔴 RETURN
    </Box>
    
    <div className="flex-grow-1" style={{ height: '2px', background: 'linear-gradient(to left, transparent, #ef4444)' }}></div>

  </div>
</div>
                  {flight.OriginDestinationOptions[1].FlightSegments.map((segment, sIdx) => 
                    renderSegment(segment, sIdx, flight.OriginDestinationOptions[1].FlightSegments)
                  )}
               </div>
            )}
          </div>
        </TabPanel>

        <TabPanel value="2" className="px-0 py-2">
          <div className="row g-3">
             <div className="col-md-5">
                <div className="fare-premium-card p-3 rounded-4 bg-dark text-white shadow-sm h-100">
                   <h6 className="fw-bold mb-3 d-flex align-items-center">
                     <FiTag className="me-2" /> Fare Summary
                   </h6>
                   <div className="fare-scroll overflow-auto" style={{maxHeight: '200px', scrollbarWidth: 'none'}}>
                     {flight.AirItineraryPricingInfo ? (
                        flight.AirItineraryPricingInfo.PTC_FareBreakdowns.map((fare, fIdx) => (
                          <div key={fIdx} className="d-flex justify-content-between mb-2 pb-2 border-bottom border-secondary border-opacity-25 small">
                            <div>
                               <div className="fw-bold">
                                 {fare.PassengerTypeQuantity.Code === "ADT" ? "Adult" : fare.PassengerTypeQuantity.Code === "CHD" ? "Child" : "Infant"} (x{fare.PassengerTypeQuantity.Quantity})
                               </div>
                               <div className="text-light text-opacity-50" style={{fontSize: '9px'}}>
                                  Base: ${Math.round(fare.PassengerFare.BaseFare.Amount)} • Tax: ${Math.round(fare.PassengerFare.Taxes.reduce((sum, tax) => sum + parseFloat(tax.Amount), 0))}
                               </div>
                            </div>
                            <div className="fw-bold align-self-center">${Math.round(fare.PassengerFare.TotalFare.Amount)}</div>
                          </div>
                        ))
                     ) : (
                        flight.FareBreakdown.map((fb, fIdx) => (
                           <div key={fIdx} className="d-flex justify-content-between mb-2 pb-2 border-bottom border-secondary border-opacity-25 small">
                             <div>
                               <div className="fw-bold">{fIdx === 0 ? "Adult" : fIdx === 1 ? "Child" : "Infant"} (x{fb.PassengerCount})</div>
                               <div className="text-light text-opacity-50" style={{fontSize: '9px'}}>Base: ${Math.round(fb.BaseFare)} • Tax: ${Math.round(fb.Tax)}</div>
                             </div>
                             <div className="fw-bold align-self-center">${Math.round(fb.BaseFare + fb.Tax)}</div>
                           </div>
                        ))
                     )}
                   </div>
                   <div className="mt-2 pt-2 d-flex justify-content-between align-items-center">
                     <span className="text-light text-opacity-75 small">Total</span>
                     <div className="text-end">
                        <div className="h4 fw-bold mb-0 text-white">
                          ${Math.round(flight.AirItineraryPricingInfo ? flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount : flight.Fare.PublishedFare)}
                        </div>
                     </div>
                   </div>
                </div>
             </div>
             
             <div className="col-md-7">
                <div className="rules-luxury-card p-3 rounded-4 border bg-white h-100 overflow-auto" style={{maxHeight: '300px'}}>
                   <h6 className="fw-bold mb-3 d-flex align-items-center">
                      <FiFileText className="me-2 text-primary" /> Rules & Policies
                   </h6>
                   {isFareLoading ? (
                      <div className="text-center py-4"><Spinner size="sm" /></div>
                   ) : (
                      <div className="rules-content">
                        {SrdvIndex === "SrdvTJ" ? renderFareRulesForSrdvTJ() : (
                           <div className="small text-muted" dangerouslySetInnerHTML={{ __html: fareRules }} />
                        )}
                      </div>
                   )}
                </div>
             </div>
          </div>
        </TabPanel>
        
        <TabPanel value="3" className="px-0 py-2">
    <div className="row g-3">
        {flight?.OriginDestinationOptions?.map((leg, legIndex) => (
            <div className="col-md-6" key={legIndex}>
                <h6 className="mb-3">
                    {leg.LegIndicator === 0 ? "Onward Journey" : "Return Journey"}
                </h6>

                {leg.FlightSegments?.map((segment, idx) => (
                    <div key={idx} className="fli-baggage-card">
                        <div className="fli-baggage-header">
                            <img
                                src={`/Images/AirlineLogo/${segment.MarketingAirlineCode}.gif`}
                                alt=""
                                width="20"
                            />

                            <div>
                                <strong>
                                    {segment.MarketingAirlineCode} {segment.FlightNumber}
                                </strong>

                                <div>
                                    {segment.DepartureAirportLocationCode}
                                    {" → "}
                                    {segment.ArrivalAirportLocationCode}
                                </div>
                            </div>
                        </div>

                        <div className="fli-baggage-row">
                            <span>🧳 Check-in Baggage</span>

                            <strong>
                                {segment.CheckinBaggage?.map(
                                    bag => `${bag.Type}: ${bag.Value}`
                                ).join(", ") || "-"}
                            </strong>
                        </div>

                        <div className="fli-baggage-row">
                            <span>💼 Cabin Baggage</span>

                            <strong>
                                {segment.CabinBaggage?.map(
                                    bag => `${bag.Type}: ${bag.Value}`
                                ).join(", ") || "-"}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
</TabPanel>
      </TabContext>
    </motion.div>
  );
};
