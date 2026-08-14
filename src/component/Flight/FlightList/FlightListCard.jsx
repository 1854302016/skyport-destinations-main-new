import React, { useState, useEffect } from "react";
import { Card, Row, Badge, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FlightListInfo } from "./FlightListInfo";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { MdFlightTakeoff, MdLuggage, MdEventSeat, MdWorkOutline } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCurrency } from "../../../context/CurrencyContext";

export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};


const newformatDuration = (segments) => {
  const totalMinutes = segments.reduce(
    (sum, segment) => sum + Number(segment.Duration || 0),
    0
  );

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${hrs}h ${mins}m`;
};

const formatDateTimeWithBreak = (dateTimeStr) => {
  if (!dateTimeStr) return null;

  const date = new Date(dateTimeStr);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
     {formattedTime}
      <br />
      {formattedDate}
    </>
  );
};

const FlightListCard = ({
  e,
  handleMoreFare,
  handleClick,
  activeId,
  showModal,
  setShowModal,
  formatTime,
  handlebookmodal,
  handleChnageCurrency,
  fareRules,
  moreFare,
  moreFareLoading,
  handleClickPhone,
  activeFlightId,
  loadingFareRules,
  indexx,
  searchMeta,
}) => {
  const [selectedFare, setSelectedFare] = useState(null);
  const { formatPrice } = useCurrency();
console.log("more fare",moreFare)

  const index = encodeURIComponent(e.ResultIndex);
  const SrdvIndex = e.SrdvIndex ? encodeURIComponent(e.SrdvIndex) : null;
  let url = `/flight-detail/${index}/null`;
  if (SrdvIndex) url += `/${SrdvIndex}`;

  useEffect(() => {
    if (showModal === indexx && moreFare && moreFare.length > 0) {
      setSelectedFare(moreFare[0]);
    }
  }, [showModal, moreFare, indexx]);

  useEffect(() => {
    if (selectedFare) {
      console.log("Selected URL:", `/flight-detail/${encodeURIComponent(selectedFare.FareSourceCode)}/null/EwebM`);
    }
  }, [selectedFare]);



  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -4,
      boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="mb-3"
    >
      <Card className="flight-card-premium border-0 overflow-hidden">
        <Card.Body className="p-0">
          <div className="flight-info-container p-3">
            <Row className="align-items-center g-0">
            
              <Col md={3} className="airline-brand border-end pe-4">
                <div className="d-flex align-items-center mb-0">
                  <div className="airline-logo-wrapper shadow-none me-3">
                    <img
                      src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                      alt=""
                      className="airline-logo-img"
                    />
                  </div>
                  <div>
                    <h6 className="airline-name mb-0">
                      {e.Segments[0][0].Airline.AirlineName}
                    </h6>
                    <span className="text-muted small">
                      {e.Segments[0][0].Airline.AirlineCode}-
                      {e.Segments[0][0].Airline.FlightNumber}
                    </span>
                  </div>
                </div>
              </Col>

             
              <Col md={6} className="px-4">
                <div className="journey-timeline d-flex justify-content-between align-items-center">
                  <div className="departure-time text-start">
                    <div className="time-display lh-1 mb-1">
                      {new Date(
                        e.Segments[0][0].Origin.DepTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <div className="city-name text-dark">
                      {e.Segments[0][0].Origin.Airport.CityName}
                    </div>
                    <div className="airport-code text-muted">
                      {e.Segments[0][0].Origin.Airport.AirportCode}
                    </div>
                  </div>

                  <div className="duration-visual flex-grow-1 px-3 text-center">
                    <div className="duration-pill mb-1">
                       {formatDuration(
                        Math.floor(
                          (new Date(
                            e.Segments[0][e.Segments[0].length - 1].Destination
                              .ArrTime,
                          ) -
                            new Date(e.Segments[0][0].Origin.DepTime)) /
                            (1000 * 60),
                        ),
                      )}{" "}
                        {/* {newformatDuration(e.Segments[0])} */}
                      {" "}
                    </div>
                    <div className="path-line">
                      <div className="origin-dot"></div>
                      <div className="line-connector"></div>
                      <MdFlightTakeoff className="path-icon" />
                      <div className="line-connector"></div>
                      <div className="dest-dot"></div>
                    </div>
                    <div
                      style={{ paddingTop: "15px" }}
                      className="stop-info small text-secondary mt-1"
                    >
                      {e.Segments[0].length === 1
                        ? "Non-stop"
                        : `${e.Segments[0].length - 1} Stop(s)`}
                    </div>
                  </div>

                  <div className="arrival-time text-end">
                    <div className="time-display lh-1 mb-1">
                      {new Date(
                        e.Segments[0][e.Segments[0].length - 1].Destination
                          .ArrTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <div className="city-name text-dark">
                      {
                        e.Segments[0][e.Segments[0].length - 1].Destination
                          .Airport.CityName
                      }
                    </div>
                    <div className="airport-code text-muted">
                      {
                        e.Segments[0][e.Segments[0].length - 1].Destination
                          .Airport.AirportCode
                      }
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3} className="price-action-area border-start ps-4">
                <div className="text-end">
                  <div className="price-tag mb-2">
                    <span className="final-price d-block lh-1 mb-1">
                      {formatPrice(e.Fare.PublishedFare)}
                    </span>
                  </div>
                  <Link to={url} className="text-decoration-none">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn premium-btn-book w-100 py-2 shadow-sm"
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>

          <div className="card-footer-luxury d-flex justify-content-between align-items-center px-4 py-2 bg-light border-top">
            <div className="amenities-summary w-100">
              {e.Segments[0][0].Baggage && (
                <span className="me-3 small">
                  <MdLuggage className="me-1" />
                  {e.Segments[0][0].Baggage}
                </span>
              )}
              {e.IsRefundable && (
                <Badge
                  bg="success"
                  className="bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill font-weight-normal px-2 py-1"
                >
                  Refundable
                </Badge>
              )}
            </div>
            <div className="d-flex flex-row" style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', justifyContent: 'end' }}>
              {e.IsUpsellAllowed === true && (
                <button
                  className="flightBookingMoreFare flightBookingMoreFare_desktop small fw-bold"
                  onClick={() => handleMoreFare(indexx, e.MoreFareOptions)}
                >
                  {showModal === indexx ? "- Less Fare" : "+ More Fare"}
                </button>
              )}
              <button
                className="details-toggle-btn bg-transparent border-0 text-primary small fw-bold"
              onClick={() =>
                handleClick(e.ResultIndex, e.SrdvIndex, e.ConversationId)
              }
            >
              Flight Details{" "}
              {activeId === e.ResultIndex ? (
                <FiChevronUp className="ms-1" />
              ) : (
                <FiChevronDown className="ms-1" />
              )}
            </button>
           </div>
          </div>
        </Card.Body>

        <AnimatePresence>
          {activeId === e.ResultIndex && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden bg-white"
            >
              <FlightListInfo flight={e} formatDuration={formatDuration} />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

     
      <div className="d-md-none flight-card-mobile mb-2">
        <div className="mobile-card-header">
          <div className="mobile-airline-info">
            <img
              src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
              alt=""
              width="22"
              style={{ borderRadius: 4, background: "#fff" }}
            />
            <span className="mobile-airline-name">
              {e.Segments[0][0].Airline.AirlineName}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
              {e.Segments[0][0].Airline.AirlineCode}-
              {e.Segments[0][0].Airline.FlightNumber}
            </span>
          </div>
          <div className="mobile-price-pill">
            {formatPrice(e.Fare.PublishedFare)}
          </div>
        </div>

        <div className="mobile-journey-row">
          <div>
            <div className="mobile-time" style={{fontSize:"12px",fontWeight:"600"}}>
              {formatDateTimeWithBreak(e.Segments[0][0].Origin.DepTime
              )}
            </div>
            <div className="mobile-airport-code">
              {" "}
              {e.Segments[0][0].Origin.Airport.CityName}(
              {e.Segments[0][0].Origin.Airport.AirportCode})
            </div>
          </div>

          <div className="mobile-duration-center">
            <span className="mobile-duration-text">
              {" "}
              {formatDuration(
                Math.floor(
                  (new Date(
                    e.Segments[0][e.Segments[0].length - 1].Destination.ArrTime,
                  ) -
                    new Date(e.Segments[0][0].Origin.DepTime)) /
                    (1000 * 60),
                ),
              )}{" "}
            </span>
            <div className="mobile-path-line">
              <div className="mobile-path-dot"></div>
              <div className="mobile-path-dash"></div>
              <div className="mobile-path-dot"></div>
            </div>
            <span className="mobile-stop-badge">
              {e.Segments[0].length === 1
                ? "Non-stop"
                : `${e.Segments[0].length - 1} Stop(s)`}
            </span>
          </div>

          <div className="text-end">
            <div className="mobile-time" style={{fontSize:"12px",fontWeight:"600"}}>
              {formatDateTimeWithBreak(
                e.Segments[0][e.Segments[0].length - 1].Destination.ArrTime,
              )}
            </div>
            <div className="mobile-airport-code">
              {
                e.Segments[0][e.Segments[0].length - 1].Destination.Airport
                  .CityName
              }
              (
              {
                e.Segments[0][e.Segments[0].length - 1].Destination.Airport
                  .AirportCode
              }
              )
            </div>
          </div>
        </div>

        <div className="mobile-card-footer" style={{justifyContent:'space-between'}}>
          <button
            className="mobile-details-btn"
            onClick={() =>
              handleClick(e.ResultIndex, e.SrdvIndex, e.ConversationId)
            }
          >
            Flight Details{" "}
            {activeId === e.ResultIndex ? <FiChevronUp /> : <FiChevronDown />}
          </button>
         <div className="" style={{display:'flex',flexDirection:'row',justifyContent:'end',
         }}>
           {e.IsUpsellAllowed === true && (
            <button
              className="mobile-details-btn ms-2 text-primary"
              onClick={() => handleMoreFare(indexx, e.MoreFareOptions)}
            >
              {showModal === indexx ? "- Less Fare" : "+ More Fare"}
            </button>
          )}
           <Link to={url}>
             <button className="mobile-book-btn">Book Now</button>
           </Link>
         </div>
         
        </div>

      
        <AnimatePresence>
          {showModal === indexx && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-light border-top"
            >
              {!moreFareLoading ? (
                <div className="mobile-fares-container p-2">
                  {moreFare && moreFare.map((item) => (
                    <div key={item.FareSourceCode} className="mobile-fare-premium-card mb-3 p-3 bg-white">
                      <Row className="g-0 align-items-center">
                        <Col xs={1} className="d-flex align-items-start pt-1">
                          <div className="mobile-radio-indicator"></div>
                        </Col>
                        <Col xs={7} className="ps-2">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="mobile-fare-type-name text-uppercase fw-bold">
                              {item.AirItineraryPricingInfo.FareType}
                            </div>
                          </div>
                          
                          <div className="mobile-fare-amenities">
                            {item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].CabinBaggageInfo && (
                              <div className="amenity-item">
                                <MdWorkOutline className="me-2" size={14} />
                                <span className="label">Cabin Bag : </span>
                                <span className="value fw-bold">{item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].CabinBaggageInfo[0]}</span>
                              </div>
                            )}
                            {item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].BaggageInfo && (
                              <div className="amenity-item">
                                <MdLuggage className="me-2" size={14} />
                                <span className="label">Check in : </span>
                                <span className="value fw-bold">{item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].BaggageInfo[0]}</span>
                              </div>
                            )}
                            <div className="amenity-item">
                                <MdEventSeat className="me-2" size={14} />
                                <span className="label">Pre Reserved Seat</span>
                            </div>
                            {item.AirItineraryPricingInfo.IsRefundable && (
                              <div className="mt-2">
                                <span className="mobile-refundable-badge text-uppercase">Refundable</span>
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={4} className="text-end">
                           <div className="mobile-fare-price mb-2 fw-bold">
                              {formatPrice(item.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount)}
                           </div>
                           <Link to={`/flight-detail/${encodeURIComponent(item.FareSourceCode)}/null/EwebM`}>
                             <button className="btn btn-sm mobile-fare-book-btn px-3">
                               Book Now
                             </button>
                           </Link>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center small">
                   <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                   Loading fares...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeId === e.ResultIndex && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-top">
                <FlightListInfo flight={e} formatDuration={formatDuration} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

    <AnimatePresence>
      {showModal === indexx && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           id="modal-newb2b"
           className="morefarediv d-none d-md-flex"
           style={{ zIndex: 100000 }}
        >
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="modal-content-newb2b"
          >
            {!moreFareLoading ? (
              <>
                {moreFare && moreFare.length !== 0 && (
                  <>
                    <div className="_lopogt_nhy">
                      <div className="_newrthed">More Fare Options Available</div>
                      <div className="_clouse" onClick={() => setShowModal(false)}>
                        <FiX className="close-newb2b" />
                      </div>
                    </div>

                    <div className="_nhty">
                      <div className="_flitdetls">
                        <div className="_bgcls">
                          <div className="_airlilogo">
                            <img
                              src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                              alt="airline"
                            />
                          </div>
                          <div className="_detislsnp">
                            <span>
                              {e.Segments[0][0].Origin.Airport.CityName} - {e.Segments[0][e.Segments[0].length-1].Destination.Airport.CityName}
                            </span>
                            {e.Segments[0][0].Airline.AirlineName} • {new Date(e.Segments[0][0].Origin.DepTime).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} • Departure at <strong>
                              {new Date(e.Segments[0][0].Origin.DepTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                            </strong> - Arrival at <strong>
                              {new Date(e.Segments[0][e.Segments[0].length-1].Destination.ArrTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "0 10px" }}>
                      <Swiper
                        speed={400}
                        slidesPerView="auto"
                        spaceBetween={15}
                        className="mySwiper"
                        breakpoints={{
                          320: { slidesPerView: 1.2 },
                          480: { slidesPerView: 1.5 },
                          768: { slidesPerView: 2.5 },
                          1024: { slidesPerView: 3.5 },
                          1200: { slidesPerView: 4 },
                        }}
                      >
                        {moreFare.map((item) => (
                          <SwiperSlide key={item.FareSourceCode} style={{width:"300px"}}>
                            <div className="_bxses">
                              <div
                                className={`pls_bxs ${selectedFare?.FareSourceCode === item.FareSourceCode ? "actve" : ""}`}
                                onClick={() => setSelectedFare(item)}
                              >
                                <div className="slct_optn">
                                  <label className="conta-radio">
                                    <input
                                      type="radio"
                                      name="fareOption"
                                      checked={selectedFare?.FareSourceCode === item.FareSourceCode}
                                      onChange={() => setSelectedFare(item)}
                                    />
                                    <span className="checkk-radio"></span>
                                  </label>
                                </div>
                                <div className="optn_head text-primary">
                                  {item.AirItineraryPricingInfo.FareType}
                                </div>
                                <div className="prce_mn">
                                  {formatPrice(item.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount)}
                                </div>

                                <div className="faclty">
                                  {item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].BaggageInfo && (
                                    <div className="_fcltechdt">
                                      <i>
                                        <img src="https://flight.easemytrip.com/Content/img/more-fare/bageicn.svg" alt="bag" />
                                      </i>
                                      <div className="_dsrcp_rpt">
                                        <div className="_tpbldtle">Baggage</div>
                                        <ul>
                                          <li><strong>{item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].CabinBaggageInfo[0]}</strong> Cabin</li>
                                          <li><strong>{item.AirItineraryPricingInfo.PTC_FareBreakdowns[0].BaggageInfo[0]}</strong> Check-in</li>
                                        </ul>
                                      </div>
                                    </div>
                                  )}

                                  <div className="_fcltechdt">
                                    <i>
                                      <img src="https://flight.easemytrip.com/Content/img/more-fare/seaticn.svg" alt="add on" />
                                    </i>
                                    <div className="_dsrcp_rpt">
                                      <div className="_tpbldtle">Add-ons</div>
                                      <ul>
                                        <li>Standard Selection</li>
                                      </ul>
                                    </div>
                                  </div>

                                  {item.AirItineraryPricingInfo.IsRefundable && (
                                    <div className="_rfndle">Refundable</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="_btmftrdv">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="_nhyuop">
                          <div className="_prgty">Grand Total</div>
                          <div className="_finpric">
                            {formatPrice(selectedFare?.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount || e.Fare.PublishedFare)}
                          </div>
                        </div>
                        <Link
                          to={selectedFare ? `/flight-detail/${encodeURIComponent(selectedFare.FareSourceCode)}/null/EwebM` : "#"}
                        >
                          <button className="book-bt-nwap" disabled={!selectedFare}>
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5">
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <div className="fw-bold">Fetching latest fares...</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default FlightListCard;
