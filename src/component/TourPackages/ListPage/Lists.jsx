import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./css/Lists.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SingleList from "./SingleList";
import MobileApp from "../../Flight/FlightSearchMobile/MobileApp";
import FooterSection from "../FooterSection";
import EnquiryIcons from "../Common/EnquiryIcons";
import EnquiryPopup from "../Common/EnquiryPopup";

const Lists = () => {
  const { pack } = useParams();

  // State variables
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const [maindata, setMainData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [dayRange, setDayRange] = useState([0, 0]);
  const [selectedDays, setSelectedDays] = useState([0, 0]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedPrice, setSelectedPrice] = useState([0, 0]);

  const [departureCities, setDepartureCities] = useState([]);
  const [isModifySearch, setIsModifySearch] = useState(false);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState(pack);

  const [allDestinations, setAllDestinations] = useState([]);
  const [filteredToOptions, setFilteredToOptions] = useState([]);

  const [isFromDropdownVisible, setIsFromDropdownVisible] = useState(false);
  const [isToDropdownVisible, setIsToDropdownVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const maxLength = 250;

  // Toggle Filter
  const toggleFilter = (name) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };
  const closeFilter = () => setOpenFilter(null);

  const resetAllFilters = () => {
    setOpenFilter(null);
    setSelectedThemes([]);
    setSelectedDays(dayRange);
    setSelectedPrice(priceRange);
    setSortOption("");
  };

  // Detect outside click for filters and dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
      if (!event.target.closest(".dropdwnsec")) {
        setIsFromDropdownVisible(false);
      }
      if (!event.target.closest(".fromsectr")) {
        setIsToDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sticky filter on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset modify search when destination changes
  useEffect(() => {
    setIsModifySearch(false);
  }, [pack]);

  // Fetch destinations list for modify search
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          "https://admin.trustedfare.com/api/HolidayPackages/destinations"
        );
        const json = await res.json();
        if (json.success) {
          setAllDestinations(json.data);
          setFilteredToOptions(json.data);
        }
      } catch (err) {
        console.error("Error loading destinations", err);
      }
    };
    fetchDestinations();
  }, []);

  // Auto-detect user's city
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const json = await res.json();
          const city =
            json?.address?.city ||
            json?.address?.town ||
            json?.address?.village ||
            "";
          if (city) setFromLocation(city);
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
      }
    );
  }, []);

  // Fetch data based on pack or modify search
  useEffect(() => {
    if (!isModifySearch) fetchData();
  }, [isModifySearch, pack]);

  const fetchData = async () => {
    const res = await axios.get(
      `https://admin.trustedfare.com/api/HolidayPackages/destinations/${pack}`
    );
    if (res && res.data.data.length) {
      setMainData(res.data);
      setData(res.data.data);
      setFilteredData(res.data.data);

      const daysArray = res.data.data.map((pkg) => pkg.no_of_days || 0);
      const prices = res.data.data.map((pkg) => pkg.offer_price || 0);

      setDayRange([Math.min(...daysArray), Math.max(...daysArray)]);
      setSelectedDays([Math.min(...daysArray), Math.max(...daysArray)]);

      setPriceRange([Math.min(...prices), Math.max(...prices)]);
      setSelectedPrice([Math.min(...prices), Math.max(...prices)]);

      // const cities = res.data.data.map(pkg => pkg.departurecity?.trim()).filter(Boolean);
      // setDepartureCities([...new Set(cities)]);
    }
    try {
      const rescity = await axios.get(
        "https://admin.trustedfare.com/api/HolidayPackages/depcities"
      );
      if (rescity && rescity.data.data.length) {
        const depcities = rescity.data.data
          .map((c) => c.name?.trim())
          .filter(Boolean);
        setDepartureCities([...new Set(depcities)]);
      }
    } catch (err) {
      console.error("Error with dep city:", err);
    }
  };

  const fetchModifiedSearch = async () => {
    try {
      const resx = await axios.post(
        "https://admin.trustedfare.com/api/HolidayPackages/ModifySearch",
        {
          fromLocation,
          toLocation: toLocation.toLowerCase(),
        }
      );
      console.log("resx", resx.data);

      setMainData(resx.data);
      setData(resx.data.data);
      setFilteredData(resx.data.data);

      const daysArray = resx.data.data.map((pkg) => pkg.no_of_days || 0);
      const prices = resx.data.data.map((pkg) => pkg.offer_price || 0);

      setDayRange([Math.min(...daysArray), Math.max(...daysArray)]);
      setSelectedDays([Math.min(...daysArray), Math.max(...daysArray)]);

      setPriceRange([Math.min(...prices), Math.max(...prices)]);
      setSelectedPrice([Math.min(...prices), Math.max(...prices)]);
      // setIsModifySearch(false);
      // const cities = resx.data.data.map(pkg => pkg.departurecity?.trim()).filter(Boolean);
      // setDepartureCities([...new Set(cities)]);
    } catch (err) {
      console.error("Error with modify search:", err);
    }

    // try {
    //   const rescity = await axios.get("https://admin.trustedfare.com/api/HolidayPackages/depcities");
    //   if (rescity && rescity.data.data.length) {

    //     const depcities = rescity.data.data.map(c => c.name?.trim()).filter(Boolean);
    //     setDepartureCities([...new Set(depcities)]);
    //   }
    // } catch (err) {
    //   console.error("Error with dep city:", err);
    // }
  };

  const handleModifySearch = () => {
    setIsModifySearch(true);
    fetchModifiedSearch();
  };

  const handleToChange = (e) => {
    const val = e.target.value;
    setToLocation(val);
    setIsToDropdownVisible(true);
    const filtered = allDestinations.filter((dest) =>
      dest.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredToOptions(filtered);
  };

  const handleToSelect = (dest) => {
    setToLocation(dest.name);
    setIsToDropdownVisible(false);
  };

  const handleSearchSubmit = () => {
    const selected = allDestinations.find(
      (d) => d.slug === toLocation.toLowerCase()
    );
    console.log("d.slug", allDestinations);
    console.log("toLocation", toLocation.toLowerCase());

    if (!selected) {
      alert("Please select a valid destination from the list.");
      return;
    }
    handleModifySearch();
  };

  // Filters and sorting
  const handleThemeChange = (theme) => {
    const updated = selectedThemes.includes(theme)
      ? selectedThemes.filter((t) => t !== theme)
      : [...selectedThemes, theme];
    setSelectedThemes(updated);
  };

  const handleSortChange = (e) => setSortOption(e.target.value);

  const applySort = (dataList, sortType) => {
    const sorted = [...dataList];
    if (sortType === "lowToHigh")
      return sorted.sort((a, b) => a.offer_price - b.offer_price);
    if (sortType === "highToLow")
      return sorted.sort((a, b) => b.offer_price - a.offer_price);
    return sorted;
  };

  useEffect(() => {
    let filtered = data;
    if (selectedThemes.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedThemes.some((theme) => pkg.package_theme.includes(theme))
      );
    }
    filtered = filtered.filter(
      (pkg) =>
        pkg.no_of_days >= selectedDays[0] && pkg.no_of_days <= selectedDays[1]
    );
    filtered = filtered.filter(
      (pkg) =>
        pkg.offer_price >= selectedPrice[0] &&
        pkg.offer_price <= selectedPrice[1]
    );
    filtered = applySort(filtered, sortOption);
    setFilteredData(filtered);
  }, [selectedThemes, selectedDays, selectedPrice, sortOption, data]);

  const toggleShow = () => setShowMore(!showMore);
  const getText = () => {
    const text = maindata?.DestinationDescription || "";
    return !showMore && text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  const allThemes = [
    ...new Set(data.flatMap((pkg) => pkg.package_theme.map((t) => t.trim()))),
  ];

  return (
    <>
      <div className="holiday-banner-slider-wrapper" style={{}}>
        <div className="background-slider">
          <div
            className="holiday-banner"
            style={{
              backgroundImage: `url('/Images/tour/dubai_newbb.png')`,
              paddingTop: "30px",
              height: "unset",
              paddingBottom: "100px",
            }}
          >
            <Container>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  marginBottom: "0px",
                }}
              >
                {maindata.DestinationName}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="srchbr d-flex align-items-center gap-10 justify-content-between"
              >
                <div className="frm d-flex gap-10 align-items-center">
                  <img
                    src="https://images.emtcontent.com/holiday-img/home-img/search.svg"
                    className="newwxxx"
                    alt="emtimg1"
                  />
                  <label className="frmbx">
                    From
                    <input
                      type="text"
                      className="akhilesh"
                      style={{ textTransform: "capitalize" }}
                      placeholder="Select Location"
                      value={fromLocation}
                      onClick={() => setIsFromDropdownVisible(true)}
                    />
                  </label>
                  {isFromDropdownVisible && (
                    <div className="dropdwnsec" id="autolt">
                      <ul className="ausuggest">
                        {departureCities.map((city, index) => (
                          <li
                            key={index}
                            className="ng-scope"
                            onClick={() => {
                              setFromLocation(city);
                              setIsFromDropdownVisible(false);
                            }}
                          >
                            <div className="mflex acenter">
                              <img
                                src="https://www.easemytrip.com/new-holiday/img/loc_srch.png"
                                alt=""
                                className="mgr10"
                              />
                              <div>
                                <p>
                                  <span
                                    style={{ textTransform: "capitalize" }}
                                    className="flsctrhead ng-binding"
                                  >
                                    {city}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <hr className="dvdr" />
                <div className="whn d-flex gap-10 align-items-center">
                  <label className="frmbx">
                    To
                    <input
                      type="text"
                      placeholder="Enter destination"
                      className="akhilesh"
                      style={{ textTransform: "capitalize" }}
                      value={toLocation ? toLocation : pack}
                      onClick={() => setIsToDropdownVisible(true)}
                    />
                  </label>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "#053355" }}
                  whileTap={{ scale: 0.95 }}
                  className="editbx" 
                  onClick={handleSearchSubmit}
                >
                  Search
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="editbx2" 
                  onClick={handleSearchSubmit}
                >
                  <img
                    src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/search-bar.svg"
                    alt=""
                  />
                </motion.div>
                {isToDropdownVisible && filteredToOptions.length > 0 && (
                  <div className="fromsectr akhilesh1" id="fromcitybox">
                    <div className="searcityCol">
                      <i className="searcIcn" />
                      <input
                        id="srchidedit"
                        className="srctinput ng-valid ng-dirty ng-valid-parse ng-empty ng-touched"
                        name="SearchCity.DesCity"
                        type="text"
                        autoComplete="off"
                        value={toLocation}
                        onChange={handleToChange}
                        placeholder="Search for a City or Experience"
                      />
                    </div>
                    <div
                      className={`nw_ppx ${toLocation.trim() ? "d-none" : ""}`}
                    >
                      <div className="w45">
                        <svg
                          className="uitk-icon uitk-spacing uitk-spacing-margin-blockend-four uitk-icon-xlarge"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <svg>
                            <svg>
                              <path
                                fillRule="evenodd"
                                d="M14.71 14h.79l4.99 5L19 20.49l-5-4.99v-.79l-.27-.28a6.5 6.5 0 1 1 .7-.7l.28.27zM5 9.5a4.5 4.5 0 1 0 8.99.01A4.5 4.5 0 0 0 5 9.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </svg>
                        </svg>
                      </div>
                      <p>Search by city or airport</p>
                    </div>
                    <div className="ovscroll">
                      {toLocation.trim() && (
                        <ul className="ausuggest" id="autolst">
                          {filteredToOptions.map((dest, i) => (
                            <li
                              className="ng-scope"
                              key={i}
                              onClick={() => handleToSelect(dest)}
                            >
                              <div className="mflex acenter">
                                <img
                                  src="https://www.easemytrip.com/new-holiday/img/loc_srch.png"
                                  alt="Flight"
                                  className="mgr10"
                                />
                                <div>
                                  <p>
                                    <span
                                      className="flsctrhead ng-binding"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {dest.name}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </Container>
          </div>
        </div>
      </div>

      <Container className="containerss">
        <div className="DestinationDetailMainPage">
          <div className="DestinationDetailMainDiv ">
            {maindata && maindata.DestinationName && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="DestinationDetailMainDivHead border shadow-md d-none d-sm-block"
                  style={{
                    marginTop: "-80px",
                    position: "relative",
                    zIndex: "1",
                    background: "white",
                  }}
                >
                  <h2
                    style={{
                      color: "#053355",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      fontSize:"24px",
                      padding:'20px 20px',
                      marginBottom:"0px",
                      letterSpacing: "-0.5px"
                    }}
                  >
                    {maindata.DestinationName}
                  </h2>
                  <p
                    className="newparax"
                    style={{
                      fontSize: "15px",
                      lineHeight: "28px",
                      color: "#555"
                    }}
                  >
                    {getText()}
                  </p>
                  {maindata?.DestinationDescription &&
                    maindata.DestinationDescription.length > maxLength && (
                      <button
                        onClick={toggleShow}
                        className="read-more-modern-list"
                      >
                        {showMore ? "Show Less" : "Read Full Story"}
                      </button>
                    )}
                </motion.div>
              </>
            )}
            <div style={{ display: "flex",marginTop:'20px' }}>
              <div className="DestinationDetailMailFilter">
                <div className="filter-header-premium">
                   <h2>Filters</h2>
                   <button onClick={resetAllFilters} className="reset-btn-premium">Clear All</button>
                </div>

                {/* Theme Filter */}
                <div className="filter-section-premium">
                  <div className="filter-title-premium">
                    <span>HOLIDAY THEME</span>
                  </div>
                  <div className="filter-content-premium">
                    {allThemes.map((themeName) => (
                      <motion.div 
                        key={themeName} 
                        whileHover={{ x: 5 }}
                        className="filter-checkbox-wrap-premium"
                      >
                        <input
                          type="checkbox"
                          id={`theme-${themeName}`}
                          value={themeName}
                          checked={selectedThemes.includes(themeName)}
                          onChange={() => handleThemeChange(themeName)}
                        />
                        <label htmlFor={`theme-${themeName}`}>
                          {themeName}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Days Range */}
                <div className="filter-section-premium">
                  <div className="filter-title-premium">
                    <span>DURATION (DAYS)</span>
                  </div>
                  <div className="filter-content-premium">
                    <p className="results-count-premium">
                      {selectedDays[0]} - {selectedDays[1]} Days
                    </p>
                    <div className="slider-container-premium">
                      <Slider
                        range
                        min={dayRange[0]}
                        max={dayRange[1]}
                        value={selectedDays}
                        onChange={(value) => setSelectedDays(value)}
                        railStyle={{ backgroundColor: "#eee" }}
                        trackStyle={[{ backgroundColor: "#efbf04" }]}
                        handleStyle={[
                          { borderColor: "#efbf04", backgroundColor: '#fff' },
                          { borderColor: "#efbf04", backgroundColor: '#fff' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="filter-section-premium">
                  <div className="filter-title-premium">
                    <span>PRICE RANGE</span>
                  </div>
                  <div className="filter-content-premium">
                    <p className="results-count-premium">
                      ${selectedPrice[0]} - ${selectedPrice[1]}
                    </p>
                    <div className="slider-container-premium">
                      <Slider
                        range
                        min={priceRange[0]}
                        max={priceRange[1]}
                        value={selectedPrice}
                        onChange={(value) => setSelectedPrice(value)}
                        railStyle={{ backgroundColor: "#eee" }}
                        trackStyle={[{ backgroundColor: "#efbf04" }]}
                        handleStyle={[
                          { borderColor: "#efbf04", backgroundColor: '#fff' },
                          { borderColor: "#efbf04", backgroundColor: '#fff' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="DestinationDetailMainDiv2">
                {/* Dekstop Filter Start*/}
                <div className="dekstop">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="results-header-premium"
                  >
                    <div className="results-count-premium-text">
                      Showing <span>{filteredData.length}</span> luxury tours found
                    </div>
                    <div className="sort-dropdown-wrap-premium">
                      <select 
                        className="sort-select-premium"
                        value={sortOption}
                        onChange={handleSortChange}
                      >
                        <option value="">Sort by: Featured</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                      </select>
                    </div>
                  </motion.div>
                </div>
                {/* Dekstop Filter End */}
                {/* Mobile Filter Start */}
                <div
                  className={`mobile ${
                    isSticky ? "tour_detail_page_sticky" : ""
                  }`}
                >
                  <div className="d-flex gap-10 align-items-center filter-sld">
                    <div
                      className="flt-itm "
                      onClick={() => toggleFilter("filtermain")}
                    >
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/filters.svg"
                        alt=""
                      />
                      Filters
                      <div
                        className="textcmpr ng-binding ng-hide"
                        ng-show="ActSotFil.length >0"
                      >
                        0
                      </div>
                    </div>
                    <div
                      className="flt-itm"
                      id="txtpoppktp"
                      onClick={() => toggleFilter("ThemesBY")}
                    >
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/customiseico.svg"
                        alt=""
                      />
                      Themes
                    </div>
                    <div
                      className="flt-itm"
                      id="txtpopsrt"
                      onClick={() => toggleFilter("SortBY")}
                    >
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/sort.svg"
                        alt=""
                      />
                      Sort
                    </div>
                    <div
                      className="flt-itm"
                      id="txtpopdur"
                      onClick={() => toggleFilter("DurationBY")}
                    >
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/duration.svg"
                        alt=""
                      />
                      Duration
                    </div>
                    <div
                      className="flt-itm"
                      id="txtpopprc"
                      onClick={() => toggleFilter("PriceBY")}
                    >
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/price.svg"
                        alt=""
                      />
                      Price
                    </div>
                  </div>

                  {/* filter popup */}
                  {openFilter === "filtermain" && (
                    <div
                      className="actpop fltr-pop"
                      id="idflr"
                      ng-show="isFilt"
                      ref={filterRef}
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Filter</div>
                              <small onClick={resetAllFilters}>Reset</small>
                            </div>
                          </div>
                          <div className="pd-bx">
                            <div className="pd-title">
                              Price <br />₹{selectedPrice[0]} - ₹
                              {selectedPrice[1]}
                            </div>
                            <div className="range">
                              <div
                                style={{ margin: "10px 0", padding: "0 10px" }}
                              >
                                <Slider
                                  range
                                  min={priceRange[0]}
                                  max={priceRange[1]}
                                  value={selectedPrice}
                                  onChange={(value) => setSelectedPrice(value)}
                                  railStyle={{ backgroundColor: "#d9d9d9" }}
                                  trackStyle={[{ backgroundColor: "#00aaff" }]}
                                  handleStyle={[
                                    { borderColor: "#00aaff" },
                                    { borderColor: "#00aaff" },
                                  ]}
                                />
                              </div>
                            </div>
                            <div className="pd-title mt-10">Duration</div>
                            <div className="pd-title mt-10">
                              Set Your Numbers Of Days <br /> {selectedDays[0]}{" "}
                              - {selectedDays[1]}
                            </div>
                            <div className="range">
                              <div
                                style={{ margin: "10px 0", padding: "0 10px" }}
                              >
                                <Slider
                                  range
                                  min={dayRange[0]}
                                  max={dayRange[1]}
                                  value={selectedDays}
                                  onChange={(value) => setSelectedDays(value)}
                                  railStyle={{ backgroundColor: "#d9d9d9" }}
                                  trackStyle={[{ backgroundColor: "#00aaff" }]}
                                  handleStyle={[
                                    { borderColor: "#00aaff" },
                                    { borderColor: "#00aaff" },
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pd-bx">
                            <div className="pd-title d-flex justify-content-between align-items-center">
                              Themes
                            </div>
                            <div className="d-flex gap-5 brd-pnt flx-wrp">
                              <fieldset>
                                {allThemes.map((themeName) => (
                                  <div
                                    key={themeName}
                                    className="DestinationDetailMailFilterInput"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`theme-${themeName}`}
                                      value={themeName}
                                      checked={selectedThemes.includes(
                                        themeName
                                      )}
                                      onChange={() =>
                                        handleThemeChange(themeName)
                                      }
                                    />
                                    <label htmlFor={`theme-${themeName}`}>
                                      {themeName}
                                    </label>
                                  </div>
                                ))}
                              </fieldset>
                            </div>
                          </div>
                          <div className="apl-btn" onClick={closeFilter}>
                            <a className="slt-st goTopBtn">Apply</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* sort by */}
                  {openFilter === "SortBY" && (
                    <div
                      className="actpop sort-pop"
                      id="idsrt"
                      ng-show="isSrt"
                      ref={filterRef}
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Sort By</div>
                              <small onClick={resetAllFilters}>Reset</small>
                            </div>
                            <div className="pd-bx ">
                              <div className="d-flex justify-content-between  gap-10">
                                {/* Low to High */}
                                <div
                                  className={`bx-1 ${
                                    sortOption === "lowToHigh" ? "clckd" : ""
                                  }`}
                                  id="divsrtlh"
                                  onClick={() => {
                                    setSortOption("lowToHigh");
                                  }}
                                >
                                  Price
                                  <img
                                    src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/low-hirgh.svg"
                                    alt=""
                                  />
                                  <span className="srtbl">Low to High</span>
                                </div>

                                {/* High to Low */}
                                <div
                                  className={`bx-1 ${
                                    sortOption === "highToLow" ? "clckd" : ""
                                  }`}
                                  id="divsrthl"
                                  onClick={() => {
                                    setSortOption("highToLow");
                                  }}
                                >
                                  Price
                                  <img
                                    src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/hight-low.svg"
                                    alt=""
                                  />
                                  <span className="srtbl">High to Low</span>
                                </div>
                              </div>
                            </div>
                            <div className="apl-btn" onClick={closeFilter}>
                              <a className="slt-st goTopBtn">Apply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {openFilter === "DurationBY" && (
                    <div
                      className="actpop dur-pop"
                      id="idsrt1"
                      ng-show="isDur"
                      ref={filterRef}
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Duration</div>
                              <small onClick={resetAllFilters}>Reset</small>
                            </div>
                            <div className="pd-bx">
                              <div className="pd-title mt-10">
                                Set Your Numbers Of Days <br />{" "}
                                {selectedDays[0]} - {selectedDays[1]}
                              </div>
                              <div className="range">
                                <div
                                  style={{
                                    margin: "10px 0",
                                    padding: "0 10px",
                                  }}
                                >
                                  <Slider
                                    range
                                    min={dayRange[0]}
                                    max={dayRange[1]}
                                    value={selectedDays}
                                    onChange={(value) => setSelectedDays(value)}
                                    railStyle={{ backgroundColor: "#d9d9d9" }}
                                    trackStyle={[
                                      { backgroundColor: "#00aaff" },
                                    ]}
                                    handleStyle={[
                                      { borderColor: "#00aaff" },
                                      { borderColor: "#00aaff" },
                                    ]}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="apl-btn" onClick={closeFilter}>
                              <a className="slt-st goTopBtn">Apply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {openFilter === "PriceBY" && (
                    <div
                      className="actpop dur-pop"
                      id="idsrt1"
                      ng-show="isDur"
                      ref={filterRef}
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Price Range</div>
                              <small onClick={resetAllFilters}>Reset</small>
                            </div>
                            <div className="pd-bx">
                              <div className="pd-title">
                                Set Your Own Budget <br />₹{selectedPrice[0]} -
                                ₹{selectedPrice[1]}
                              </div>
                              <div className="range">
                                <div
                                  style={{
                                    margin: "10px 0",
                                    padding: "0 10px",
                                  }}
                                >
                                  <Slider
                                    range
                                    min={priceRange[0]}
                                    max={priceRange[1]}
                                    value={selectedPrice}
                                    onChange={(value) =>
                                      setSelectedPrice(value)
                                    }
                                    railStyle={{ backgroundColor: "#d9d9d9" }}
                                    trackStyle={[
                                      { backgroundColor: "#00aaff" },
                                    ]}
                                    handleStyle={[
                                      { borderColor: "#00aaff" },
                                      { borderColor: "#00aaff" },
                                    ]}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="apl-btn" onClick={closeFilter}>
                              <a className="slt-st goTopBtn">Apply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {openFilter === "ThemesBY" && (
                    <div
                      className="actpop dur-pop"
                      id="idsrt1"
                      ng-show="isDur"
                      ref={filterRef}
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Holiday Themes</div>
                              <small onClick={resetAllFilters}>Reset</small>
                            </div>
                            <div className="pd-bx">
                              <div className="pd-title">Themes</div>
                              <fieldset>
                                {allThemes.map((themeName) => (
                                  <div
                                    key={themeName}
                                    className="DestinationDetailMailFilterInput"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`theme-${themeName}`}
                                      value={themeName}
                                      checked={selectedThemes.includes(
                                        themeName
                                      )}
                                      onChange={() =>
                                        handleThemeChange(themeName)
                                      }
                                    />
                                    <label htmlFor={`theme-${themeName}`}>
                                      {themeName}
                                    </label>
                                  </div>
                                ))}
                              </fieldset>
                            </div>
                            <div className="apl-btn" onClick={closeFilter}>
                              <a className="slt-st goTopBtn">Apply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Mobile Filter End */}
                <SingleList
                  data={filteredData}
                  isModifySearch={isModifySearch}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <EnquiryIcons
        destination={(maindata && maindata.DestinationName) || ""}
      />
      <MobileApp
        backgroundImage="/Images/tour/mobile_app_trip_holiday.png"
        title="Download Our Mobile App"
        description="Book exciting holiday packages at unbeatable prices. Refer your friends and earn attractive rewards from their bookings."
      />
      <FooterSection />
      <div className="d-lg-block d-none">
        <EnquiryPopup
          destination={(maindata && maindata.DestinationName) || ""}
        />
      </div>
    </>
  );
};

export default Lists;
