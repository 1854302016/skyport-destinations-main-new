import React, { useEffect, useRef, useState } from "react";
import "./HotelModifyNew.css";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hotelSearch } from "../../../redux/services/operations/hotel";
import HotelModifyForm from "./HotelModifyForm";
import HotelFiltering from "./HotelFiltering";
import HotelListingModifyNew from "./HotelListingModifyNew";
import HotelMobileFilters from "./HotelMobileFilters";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Star from "./HotelFilter/Star";
import Price from "./HotelFilter/Price";
import Meals from "./HotelFilter/Meals";
import LocationFilter from "./HotelFilter/Location";
import FIlter from "./HotelFilter/FIlter";
import Sort from "./HotelFilter/Sort";

function HotelModifyNew() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector((state) => state.hotel.hotelSearch);

  const [rooms, setRooms] = useState([]);
  //const [loading, setLoading] = useState(false);

  // Filters
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Price Range
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);
  const [sliderValue, setSliderValue] = useState([0, 0]);

  const [sortOption, setSortOption] = useState("");
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilter = (name) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };
  const closeFilter = () => {
    setOpenFilter(null);
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch hotels
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get("from");
    const city = params.get("city");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const roomsParam = params.get("rooms");
    const residency = params.get("residency");

    const roomsArray = roomsParam ? JSON.parse(roomsParam) : [];
    setRooms(roomsArray);

    const pax = roomsArray
      .map((room) => {
        const parts = [room.adults || 0, room.children || 0];
        if (Array.isArray(room.childrenAges)) {
          parts.push(...room.childrenAges);
        }
        return parts.join("_");
      })
      .join("?");

    const requestData = {
      city: from,
      Rooms: roomsArray.length.toString(),
      cin: startDate,
      cOut: endDate,
      pax: pax,
      residency: residency,
    };

    //  setLoading(true);
    dispatch(hotelSearch(requestData, navigate));
  }, [location.search, dispatch, navigate]);

  // Setup price range
  useEffect(() => {
    const hotelList = Array.isArray(search) ? search : [];

    const prices = hotelList
      .map((h) => h.price)
      .filter((p) => typeof p === "number");

    if (prices.length > 0) {
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinFare(min);
      setMaxFare(max);
      setSliderValue([min, max]);
    }
  }, [search]);

  const hotelList = Array.isArray(search) ? search : [];

  // Unique Filters
  const allStars = [...new Set(hotelList.map((h) => Number(h.star)))].sort(
    (a, b) => b - a,
  );

  const allLocations = [
    ...new Set(
      hotelList.map((h) => {
        const parts = h.address?.split(",") || [];
        return parts[parts.length - 3]?.trim() || h.city;
      }),
    ),
  ];

  const allMealPlans = [
    ...new Set(
      hotelList.flatMap((h) =>
        (h.Rooms || []).map((r) => r.MealType?.trim()).filter(Boolean),
      ),
    ),
  ];

  const allRoomTypes = []; // No room types in new API

  const allFacilities = [
    ...new Set(
      hotelList.flatMap((h) =>
        (h.Facilities || "")
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      ),
    ),
  ];

  const handleToggle = (value, state, setter) => {
    const newState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];

    setter(newState);
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedStars([]);
    setSelectedLocations([]);
    setSelectedFacilities([]);
    setSelectedRoomTypes([]);
    setSelectedMealPlans([]);
    setSliderValue([minFare, maxFare]);
    setSortOption("");
  };

  // Apply All Filters
  const applyFilters = () => {
    const filtered = hotelList.filter((h) => {
      const price = h.price;

      if (
        (typeof price !== "number" ||
          price < sliderValue[0] ||
          price > sliderValue[1]) &&
        !(sliderValue[0] === 0 && sliderValue[1] === 0)
      )
        return false;

      if (
        searchQuery &&
        !h.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      if (selectedStars.length && !selectedStars.includes(Number(h.star)))
        return false;

      if (
        selectedLocations.length &&
        !selectedLocations.some((loc) => h.address?.includes(loc))
      )
        return false;

      if (
        selectedFacilities.length &&
        !selectedFacilities.every((fac) =>
          (h.Facilities || "").toLowerCase().includes(fac.toLowerCase()),
        )
      )
        return false;

      if (
        selectedMealPlans.length &&
        !h.Rooms?.some((r) =>
          selectedMealPlans.includes((r.MealType || "").trim()),
        )
      )
        return false;

      return true;
    });

    let sorted = [...filtered];
    if (sortOption === "Low to High") {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOption === "High to Low") {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOption === "popularity") {
      sorted.sort((a, b) => (Number(b.star) || 0) - (Number(a.star) || 0));
    }

    setFilteredHotels(sorted);
  };

  useEffect(() => {
    applyFilters();
  }, [
    searchQuery,
    selectedStars,
    selectedLocations,
    selectedFacilities,
    selectedRoomTypes,
    selectedMealPlans,
    sliderValue,
    sortOption,
    search,
  ]);

  const params = new URLSearchParams(location.search);
  const city = params.get("city");

  return (
    <div>
      <HotelModifyForm />

      <div className="hotelmodifydropdown_main dropdown_main">
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="hotelavailbility">
              {filteredHotels.length} Hotels Available in {city}
            </div>

            <div className="hotelmodifyinputs_wrapper">
              <div className="inputWrapper">
                <input
                  type="text"
                  className="hotelmodifyinput"
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hotelmodifydropdown">
                <select
                  id="sortOptions"
                  className="hotelmodifyselect"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">-- Sort By --</option>
                  <option value="popularity">Popularity</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <section className="hotellist_fliter">
          <Row>
            <Col
              lg={3}
              md={3}
              sm={12}
              style={{ position: "relative", top: "20px", height: "fit-content" }}
            >
              <HotelFiltering
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStars={selectedStars}
                selectedLocations={selectedLocations}
                selectedFacilities={selectedFacilities}
                selectedRoomTypes={selectedRoomTypes}
                selectedMealPlans={selectedMealPlans}
                search={search}
                handleToggle={handleToggle}
                setSelectedStars={setSelectedStars}
                setSelectedLocations={setSelectedLocations}
                setSelectedFacilities={setSelectedFacilities}
                setSelectedRoomType={setSelectedRoomTypes}
                setSelectedMealPlans={setSelectedMealPlans}
                allMealPlans={allMealPlans}
                allRoomTypes={allRoomTypes}
                allFacilities={allFacilities}
                allLocations={allLocations}
                allStars={allStars}
                hotelList={hotelList}
                clearAll={clearAll}
                maxFare={maxFare}
                minFare={minFare}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
              />
            </Col>

            <Col lg={9} md={9} sm={12}>
              <HotelListingModifyNew hotel={filteredHotels} />
              <HotelMobileFilters toggleFilter={toggleFilter} />
            </Col>
          </Row>
        </section>
      </Container>
      <div ref={filterRef}>
        {openFilter === "rating" && (
          <Star
            setSelectedStars={setSelectedStars}
            handleToggle={handleToggle}
            closeFilter={closeFilter}
            clearAllFilters={clearAll}
            selectedStars={selectedStars}
            allStars={allStars}
          />
        )}

        {openFilter === "price" && (
          <Price
            handleToggle={handleToggle}
            closeFilter={closeFilter}
            clearAllFilters={clearAll}
            maxFare={maxFare}
            minFare={minFare}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        )}
        {openFilter === "location" && (
          <LocationFilter
            handleToggle={handleToggle}
            closeFilter={closeFilter}
            clearAllFilters={clearAll}
            setSelectedLocations={setSelectedLocations}
            allLocations={allLocations}
            selectedLocations={selectedLocations}
          />
        )}

        {openFilter === "filter" && (
          <FIlter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            closeFilter={closeFilter}
            selectedStars={selectedStars}
            selectedLocations={selectedLocations}
            selectedFacilities={selectedFacilities}
            selectedRoomTypes={selectedRoomTypes}
            selectedMealPlans={selectedMealPlans}
            search={search}
            handleToggle={handleToggle}
            setSelectedStars={setSelectedStars}
            setSelectedLocations={setSelectedLocations}
            setSelectedFacilities={setSelectedFacilities}
            setSelectedRoomType={setSelectedRoomTypes}
            setSelectedMealPlans={setSelectedMealPlans}
            allMealPlans={allMealPlans}
            allRoomTypes={allRoomTypes}
            allFacilities={allFacilities}
            allLocations={allLocations}
            allStars={allStars}
            hotelList={hotelList}
            clearAll={clearAll}
            maxFare={maxFare}
            minFare={minFare}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        )}
        {/* closeFilter={closeFilter} clearAllFilters={clearAll}  */}
        {openFilter === "sort" && (
          <Sort
            closeFilter={closeFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        )}
      </div>
    </div>
  );
}

export default HotelModifyNew;
