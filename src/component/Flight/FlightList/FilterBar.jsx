import React from "react";
import { Button, Col, Card } from "react-bootstrap";
import {
  FiFilter,
  FiDollarSign,
  FiClock,
  FiActivity,
  FiBriefcase,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import Slider from "rc-slider";
import { motion } from "framer-motion";

const formatDurationLabel = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

const FilterBar = ({
  showFilter,
  minFare,
  maxFare,
  sliderValue,
  minDuration,
  maxDuration,
  durationSliderValue,
  handleDurationSliderChange,
  clearAllFilters,
  handleSliderChange,
  handledepTimeFilter,
  deptimeRange,
  arrtimeRange,
  handlearrTimeFilter,
  handleShowAllStops,
  checkedStops,
  handleCheckedstops,
  handleShowAllairlinenames,
  airlines,
  handleChecked,
  setShowFilter,
  applyFilters,
  handleChnageCurrency,
  airlineCodes,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Col
      md={3}
      className={`filter-sidebar-premium ${showFilter ? "mobile-visible" : ""}`}
      style={{ position: "sticky", top: "20px", height: "fit-content" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="filter-container-static"
      >
        <div className="filter-header-premium d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-800 m-0 tracking-tight d-flex align-items-center">
            <FiFilter className="me-2 text-primary" /> Filter
          </h5>
          <button
            className="clear-all-btn btn-link text-decoration-none small fw-bold"
            onClick={clearAllFilters}
            style={{ background: "none", border: "none" }}
          >
            Clear All
          </button>
        </div>

        {/* Price Slider */}
        <motion.div variants={itemVariants} className="filter-group mb-4">
          <Card className="border-0 bg-white p-3 rounded-1">
            <div className="group-title mb-3 d-flex align-items-center text-muted fw-700 small">
              <FiDollarSign className="me-2" /> PRICE RANGE
            </div>
            <div className="px-2">
              <Slider
                range
                min={minFare}
                max={maxFare}
                value={sliderValue}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: "#3b82f6" }]}
                handleStyle={[
                  {
                    borderColor: "#3b82f6",
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  },
                  {
                    borderColor: "#3b82f6",
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  },
                ]}
                railStyle={{ backgroundColor: "#f1f5f9" }}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="price-box p-2 bg-light rounded text-center small fw-bold flex-grow-1 me-2">
                  ${Math.round(sliderValue[0])}
                </div>
                <div className="price-box p-2 bg-light rounded text-center small fw-bold flex-grow-1">
                  ${Math.round(sliderValue[1])}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Duration Filter */}
        {maxDuration > 0 && (
          <motion.div variants={itemVariants} className="filter-group mb-4">
            <Card className="border-0 bg-white p-3 rounded-1">
              <div className="group-title mb-3 d-flex align-items-center text-muted fw-700 small">
                <FiClock className="me-2" /> FLIGHT DURATION
              </div>
              <div className="px-2">
                <Slider
                  range
                  min={minDuration}
                  max={maxDuration}
                  value={durationSliderValue}
                  onChange={handleDurationSliderChange}
                  trackStyle={[{ backgroundColor: "#3b82f6" }]}
                  handleStyle={[
                    {
                      borderColor: "#3b82f6",
                      backgroundColor: "#ffffff",
                      opacity: 1,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                    {
                      borderColor: "#3b82f6",
                      backgroundColor: "#ffffff",
                      opacity: 1,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                  ]}
                  railStyle={{ backgroundColor: "#f1f5f9" }}
                />
                <div className="d-flex justify-content-between mt-3">
                  <div className="price-box p-2 bg-light rounded text-center small fw-bold flex-grow-1 me-2">
                    {formatDurationLabel(durationSliderValue[0])}
                  </div>
                  <div className="price-box p-2 bg-light rounded text-center small fw-bold flex-grow-1">
                    {formatDurationLabel(durationSliderValue[1])}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stops Filter */}
        <motion.div variants={itemVariants} className="filter-group mb-4">
          <Card className="border-0 bg-white p-3 rounded-1">
            <div className="group-title mb-3 d-flex align-items-center text-muted fw-700 small">
              <FiActivity className="me-2" /> STOPS
            </div>
            <div className="stops-grid d-flex gap-2">
              {[
                { id: "non-stop", label: "0 Stop", code: "0" },
                { id: "1-stop", label: "1 Stop", code: "1" },
                { id: "2-stop", label: "2+ Stop", code: "2+" },
              ].map((stop) => (
                <button
                  key={stop.id}
                  onClick={() => handleCheckedstops(stop.id)}
                  className={`stop-pill border-0 flex-grow-1 p-2 rounded-3 text-center transition-all ${
                    checkedStops.includes(stop.id)
                      ? "filter-bg-btn-color text-white shadow-sm fw-bold"
                      : "bg-light text-black text-dark small"
                  }`}
                >
                  <div className="d-block mb-0">{stop.code}</div>
                  <div
                    style={{ fontSize: "8px" }}
                    className="text-uppercase opacity-75"
                  >
                    {stop.label.split(" ")[1]}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Departure Time */}
        <motion.div variants={itemVariants} className="filter-group mb-4">
          <Card className="border-0 bg-white p-3 rounded-1">
            <div className="group-title mb-3 d-flex align-items-center text-muted fw-700 small">
              <FiClock className="me-2" /> DEPARTURE TIME
            </div>
            <div className="time-grid row g-2">
              {[
                { label: "Morning", sub: "Before 6 AM", range: [0, 6] },
                { label: "Day", sub: "6 AM - 12 PM", range: [6, 12] },
                { label: "Afternoon", sub: "12 PM - 6 PM", range: [12, 18] },
                { label: "Evening", sub: "After 6 PM", range: [18, 24] },
              ].map((time, idx) => (
                <div key={idx} className="col-6">
                  <button
                    onClick={() => handledepTimeFilter(time.range)}
                    className={`time-pill w-100 border-0 p-2 rounded-3 text-start transition-all ${
                      deptimeRange[0] === time.range[0] &&
                      deptimeRange[1] === time.range[1]
                        ? "bg-dark text-white shadow-sm"
                        : "bg-light text-dark shadow-none"
                    }`}
                  >
                    <div className="small fw-bold">{time.label}</div>
                    <div className="text-muted" style={{ fontSize: "7px" }}>
                      {time.sub}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Arrival Time */}
        <motion.div variants={itemVariants} className="filter-group mb-4">
          <Card className="border-0 bg-white p-3 rounded-1">
            <div className="group-title mb-3 d-flex align-items-center text-muted fw-700 small">
              <FiClock className="me-2" /> ARRIVAL TIME
            </div>
            <div className="time-grid row g-2">
              {[
                { label: "Morning", sub: "Before 6 AM", range: [0, 6] },
                { label: "Day", sub: "6 AM - 12 PM", range: [6, 12] },
                { label: "Afternoon", sub: "12 PM - 6 PM", range: [12, 18] },
                { label: "Evening", sub: "After 6 PM", range: [18, 24] },
              ].map((time, idx) => (
                <div key={idx} className="col-6">
                  <button
                    onClick={() => handlearrTimeFilter(time.range)}
                    className={`time-pill w-100 border-0 p-2 rounded-3 text-start transition-all ${
                      arrtimeRange[0] === time.range[0] &&
                      arrtimeRange[1] === time.range[1]
                        ? "bg-dark text-white shadow-sm"
                        : "bg-light text-dark shadow-none"
                    }`}
                  >
                    <div className="small fw-bold">{time.label}</div>
                    <div className="text-muted" style={{ fontSize: "7px" }}>
                      {time.sub}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Airlines */}
        <motion.div variants={itemVariants} className="filter-group mb-4">
          <Card className="border-0 bg-white p-3 rounded-1">
            <div className="group-title mb-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center text-muted fw-700 small">
                <FiBriefcase className="me-2" /> AIRLINES
              </div>
              <div className="form-check m-0 p-0 d-flex align-items-center">
                <input
                  type="checkbox"
                  id="show-all"
                  onChange={handleShowAllairlinenames}
                  className="form-check-input me-1 opacity-50"
                  style={{ width: "12px", height: "12px" }}
                />
                <label
                  htmlFor="show-all"
                  className="small text-muted mb-0"
                  style={{ fontSize: "9px" }}
                >
                  Show all
                </label>
              </div>
            </div>
            <div
              className="airline-list overflow-auto px-1"
              style={{ maxHeight: "200px" }}
            >
              {airlines.map((airline, index) => (
                <div
                  key={index}
                  className="airline-item d-flex align-items-center mb-2 hover-bg-light p-2 rounded-3 transition-all"
                  onClick={() => handleChecked(airline.name)}
                >
                  <input
                    type="checkbox"
                    checked={airline.selected}
                    onChange={() => {}} // Controlled by parent
                    className="form-check-input me-3 border-secondary"
                  />
                  {airlineCodes && airlineCodes[index] && (
                    <img
                      src={`/Images/AirlineLogo/${airlineCodes[index]}.gif`}
                      alt=""
                      className="me-2 grayscale-hover"
                      width="20"
                    />
                  )}
                  <div className="small text-dark fw-semibold flex-grow-1">
                    {airline.name}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="d-md-none mt-4">
          <Button
            className="w-100 py-3 rounded-pill bg-primary border-0 shadow-lg fw-bold"
            onClick={() => {
              setShowFilter(false);
              applyFilters();
            }}
          >
            Apply Filters
          </Button>
        </motion.div>
      </motion.div>
    </Col>
  );
};

export default FilterBar;
