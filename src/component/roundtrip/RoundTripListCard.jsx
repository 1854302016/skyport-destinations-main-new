import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdFlightTakeoff } from "react-icons/md";
import { FlightListInfoInternational } from "../Flight/FlightInternational/FlightListInfoInternational";
import { airlinesnames } from "../../Airlines";
import { useCurrency } from "../../context/CurrencyContext";
import "../Flight/FlightList/FlightList.css";
import "../Flight/FlightList/FlightListInfo.css";

const airlineName = (code) =>
  airlinesnames.find((a) => a.AirlineCode === code)?.AirlineName || code;

const legTime = (dateTimeStr) =>
  new Date(dateTimeStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const legDate = (dateTimeStr) =>
  new Date(dateTimeStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

const legDuration = (formatDuration, segments) =>
  formatDuration(
    Math.floor(
      (new Date(segments[segments.length - 1].ArrivalDateTime) -
        new Date(segments[0].DepartureDateTime)) /
        (1000 * 60),
    ),
  );

const JourneyRow = ({ label, badgeColor, leg, formatDuration }) => {
  const segments = leg.FlightSegments;
  const first = segments[0];
  const last = segments[segments.length - 1];
  const stops = segments.length - 1;

  return (
    <div className="mb-3">
      <span
        className="d-inline-block mb-2 px-2 py-1 rounded-pill text-white fw-bold"
        style={{ fontSize: "10px", letterSpacing: "0.5px", background: badgeColor }}
      >
        {label}
      </span>
      <div className="journey-timeline d-flex justify-content-between align-items-center">
        <div className="departure-time text-start">
          <div className="time-display lh-1 mb-1">{legTime(first.DepartureDateTime)}</div>
          <div className="city-name text-dark">{first.SourceAirport?.city_name}</div>
          <div className="airport-code text-muted">{first.DepartureAirportLocationCode}</div>
        </div>

        <div className="duration-visual flex-grow-1 px-3 text-center">
          <div className="duration-pill mb-1">{legDuration(formatDuration, segments)}</div>
          <div className="path-line">
            <div className="origin-dot"></div>
            <div className="line-connector"></div>
            <MdFlightTakeoff className="path-icon" />
            <div className="line-connector"></div>
            <div className="dest-dot"></div>
          </div>
          <div style={{ paddingTop: "15px" }} className="stop-info small text-secondary mt-1">
            {stops === 0 ? "Non-stop" : `${stops} Stop(s)`}
          </div>
        </div>

        <div className="arrival-time text-end">
          <div className="time-display lh-1 mb-1">{legTime(last.ArrivalDateTime)}</div>
          <div className="city-name text-dark">{last.DestinationAirport?.city_name}</div>
          <div className="airport-code text-muted">{last.ArrivalAirportLocationCode}</div>
        </div>
      </div>
    </div>
  );
};

const AirlineBlock = ({ label, leg }) => {
  const first = leg.FlightSegments[0];
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="airline-logo-wrapper shadow-none me-3">
        <img
          src={`/Images/AirlineLogo/${first.OperatingAirline.Code}.gif`}
          alt=""
          className="airline-logo-img"
        />
      </div>
      <div>
        <div className="text-muted small mb-0" style={{ fontSize: "10px", fontWeight: 700 }}>
          {label}
        </div>
        <h6 className="airline-name mb-0">{airlineName(first.OperatingAirline.Code)}</h6>
        <span className="text-muted small">
          {first.OperatingAirline.Code}-{first.FlightNumber}
        </span>
      </div>
    </div>
  );
};

const RoundTripListCard = ({
  e,
  handleClick,
  activeId,
  fareRules,
  isFareLoading,
  baggageRules,
  formatDuration,
  searchMeta,
}) => {
  const fareSourceCode = e.AirItineraryPricingInfo.FareSourceCode;
  const total = Math.round(e.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount);
  const departureLeg = e.OriginDestinationOptions[0];
  const returnLeg = e.OriginDestinationOptions[1];

  const { formatPrice } = useCurrency();

  const url = `/flight-detail/${encodeURIComponent(fareSourceCode)}/null/EwebM`;

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.06)", transition: { duration: 0.3 } },
  };

  return (
    <>
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="mb-3">
      <Card className="flight-card-premium border-0 overflow-hidden d-none d-md-block">
        <Card.Body className="p-0">
          <div className="flight-info-container p-3">
            <Row className="align-items-stretch g-0">
              <Col md={3} className="airline-brand border-end pe-4 d-flex flex-column justify-content-center">
                <AirlineBlock label="DEPARTURE" leg={departureLeg} />
                <AirlineBlock label="RETURN" leg={returnLeg} />
              </Col>

              <Col md={6} className="px-4">
                <JourneyRow label="DEPARTURE" badgeColor="#2563eb" leg={departureLeg} formatDuration={formatDuration} />
                <JourneyRow label="RETURN" badgeColor="#dc2626" leg={returnLeg} formatDuration={formatDuration} />
              </Col>

              <Col md={3} className="price-action-area border-start ps-4 d-flex align-items-center">
                <div className="text-end w-100">
                  <div className="price-tag mb-2">
                    <span className="final-price d-block lh-1 mb-1">
                      {formatPrice(total)}
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
              {e.IsRefundable && (
                <Badge
                  bg="success"
                  className="bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill font-weight-normal px-2 py-1"
                >
                  Refundable
                </Badge>
              )}
            </div>
            <button
              className="details-toggle-btn bg-transparent border-0 text-primary small fw-bold text-nowrap"
              onClick={() => handleClick(fareSourceCode)}
            >
              Flight Details{" "}
              {activeId === fareSourceCode ? <FiChevronUp className="ms-1" /> : <FiChevronDown className="ms-1" />}
            </button>
          </div>
        </Card.Body>

        <AnimatePresence>
          {activeId === fareSourceCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden bg-white"
            >
              <FlightListInfoInternational
                idx={fareSourceCode}
                flight={e}
                fareRules={fareRules}
                SrdvIndex="EwebM"
                isFareLoading={isFareLoading}
                baggageRules={baggageRules}
                formatDuration={formatDuration}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="d-md-none flight-card-mobile mb-2">
        <div className="mobile-card-header">
          <div className="mobile-airline-info">
            <img
              src={`/Images/AirlineLogo/${departureLeg.FlightSegments[0].OperatingAirline.Code}.gif`}
              alt=""
              width="22"
              style={{ borderRadius: 4, background: "#fff" }}
            />
            <span className="mobile-airline-name">
              {airlineName(departureLeg.FlightSegments[0].OperatingAirline.Code)}
            </span>
          </div>
          <div className="mobile-price-pill">{formatPrice(total)}</div>
        </div>

        {[
          { label: "DEPARTURE", leg: departureLeg },
          { label: "RETURN", leg: returnLeg },
        ].map(({ label, leg }) => {
          const segments = leg.FlightSegments;
          const first = segments[0];
          const last = segments[segments.length - 1];
          const stops = segments.length - 1;
          return (
            <div key={label} className="mobile-journey-row" style={{ padding: "6px 14px" }}>
              <div>
                <div className="mobile-time" style={{ fontSize: "12px", fontWeight: "600" }}>
                  {legTime(first.DepartureDateTime)}
                  <br />
                  {legDate(first.DepartureDateTime)}
                </div>
                <div className="mobile-airport-code">
                  {first.SourceAirport?.city_name}({first.DepartureAirportLocationCode})
                </div>
              </div>

              <div className="mobile-duration-center">
                <span className="mobile-duration-text">{legDuration(formatDuration, segments)}</span>
                <div className="mobile-path-line">
                  <div className="mobile-path-dot"></div>
                  <div className="mobile-path-dash"></div>
                  <div className="mobile-path-dot"></div>
                </div>
                <span className="mobile-stop-badge">{stops === 0 ? "Non-stop" : `${stops} Stop(s)`}</span>
              </div>

              <div className="text-end">
                <div className="mobile-time" style={{ fontSize: "12px", fontWeight: "600" }}>
                  {legTime(last.ArrivalDateTime)}
                  <br />
                  {legDate(last.ArrivalDateTime)}
                </div>
                <div className="mobile-airport-code">
                  {last.DestinationAirport?.city_name}({last.ArrivalAirportLocationCode})
                </div>
              </div>
            </div>
          );
        })}

        <div className="mobile-card-footer" style={{ justifyContent: "space-between" }}>
          <button className="mobile-details-btn" onClick={() => handleClick(fareSourceCode)}>
            Flight Details {activeId === fareSourceCode ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <Link to={url}>
            <button className="mobile-book-btn">Book Now</button>
          </Link>
        </div>

        <AnimatePresence>
          {activeId === fareSourceCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-top">
                <FlightListInfoInternational
                  idx={fareSourceCode}
                  flight={e}
                  fareRules={fareRules}
                  SrdvIndex="EwebM"
                  isFareLoading={isFareLoading}
                  baggageRules={baggageRules}
                  formatDuration={formatDuration}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  );
};

export default RoundTripListCard;
