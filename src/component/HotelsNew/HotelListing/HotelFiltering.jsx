import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Slider from "rc-slider";
import { ImPriceTags } from "react-icons/im";
const HotelFiltering = ({
  searchQuery,
  setSearchQuery,
  selectedStars,
  selectedLocations,
  selectedFacilities,
  selectedRoomTypes,
  selectedMealPlans,
  search,
  setSelectedStars,
  setSelectedLocations,
  setSelectedFacilities,
  setSelectedRoomTypes,
  setSelectedMealPlans,
  handleToggle,
  allMealPlans,
  allRoomTypes,
  allFacilities,
  allLocations,
  allStars,
  hotelList,
  maxFare,
  minFare,
  sliderValue,
  setSliderValue,
  clearAll,
}) => {
  const [starRating, setStarRating] = useState([]);
  const [location, setLocation] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Filter options:", {
      starRating,
      location,
      facilities,
      roomTypes,
      mealPlan,
    });
  };

  const handleStarRatingChange = (event) => {
    const value = parseInt(event.target.value);
    if (starRating.includes(value)) {
      setStarRating(starRating.filter((v) => v !== value));
    } else {
      setStarRating([...starRating, value]);
    }
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    if (location.includes(value)) {
      setLocation(location.filter((v) => v !== value));
    } else {
      setLocation([...location, value]);
    }
  };

  const handleFacilitiesChange = (event) => {
    const value = event.target.value;
    if (facilities.includes(value)) {
      setFacilities(facilities.filter((v) => v !== value));
    } else {
      setFacilities([...facilities, value]);
    }
  };

  const handleRoomTypesChange = (event) => {
    const value = event.target.value;
    if (roomTypes.includes(value)) {
      setRoomTypes(roomTypes.filter((v) => v !== value));
    } else {
      setRoomTypes([...roomTypes, value]);
    }
  };

  const handleMealPlanChange = (event) => {
    const value = event.target.value;
    if (mealPlan.includes(value)) {
      setMealPlan(mealPlan.filter((v) => v !== value));
    } else {
      setMealPlan([...mealPlan, value]);
    }
  };

  const [showFilter, setShowFilter] = useState(false);
  const applyFilters = () => {};
  console.log("minFare", minFare);
  return (
    <>
      <div className="filterbx" style={{ display: showFilter && "block" }}>
        {/* <div className="advance-card">
          <h5 className="mb-0 advance-title">Advance search </h5>
        </div> */}
        <div className="ftr_head">
          <h3>Filter</h3>
          {/* <span className="clearfilter clearall">Clear all</span> */}
        </div>
        <div className="filtercnt">
          <div className="mobileapply_ftr">
            <Button
              type="button"
              className="btnf_apy"
              onClick={() => {
                setShowFilter(false);
                applyFilters();
              }}
            >
              <span>0 Filters</span>APPLY
            </Button>
          </div>
        
          {/* <Accordion id="accordion"> */}
          <Accordion
            id="accordion"
            defaultActiveKey={["0", "1", "2", "3", "4", "5"]}
            alwaysOpen
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="txtftr">
                  <h6>Search By Hotel Name</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body style={{ padding: "0px", paddingBottom: "20px" }}>
                <input
                  type="text"
                  value={searchQuery}
                  className="form-control hotelname_search"
                  placeholder="Search By Name"
                  autoComplete="off"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Accordion.Body>
            </Accordion.Item>
              <div
            className="filterDivs hotel_filterDivss"
            style={{ height: "auto", minHeight: "60px" }}
          >
            <div
              className="filterSubDiv hotelSubDivss"
              style={{
                marginTop: "12px",
                fontSize: "14px",
              
                fontWeight: "600",
                color: "#565656",
              }}
            >
           
              <div>Price : </div> &nbsp;
              <div className="slider-value">
                <span>${parseInt(sliderValue[0])}</span> <span>-</span>{" "}
                <span>${parseInt(sliderValue[1])}</span>
              </div>
            </div>
            <div className="box-content">
              <input type="hidden" className="pricenew" value="180-3000" />
              <div className="slider-dragable-range slider-range-price">
                <Slider
                  range
                  min={minFare}
                  max={maxFare}
                  value={sliderValue}
                  onChange={(val) => setSliderValue(val)}
                  className="custom-slider"
                />
              </div>
            </div>
          </div>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="txtftr">
                  <h6>Stars</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body style={{ padding: "0px", paddingBottom: "20px" }}>
                <ul className="check-boxes-custom list-checkboxes">
                  {allStars.map((star) => (
                    <li key={star}>
                      <label className="label-container checkbox-default">
                        <div className="startbx">
                          {Number.isInteger(star) && star > 0 ? (
                            [...Array(star)].map((_, index) => (
                              <FaStar key={index} className="star_icon" />
                            ))
                          ) : (
                            <span>Invalid star rating</span>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="starfliter"
                          checked={selectedStars.includes(star)}
                          onChange={() =>
                            handleToggle(star, selectedStars, setSelectedStars)
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <div className="txtftr">
                  <h6>Location</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body style={{ padding: "0px", paddingBottom: "20px" }}>
                <ul className="check-boxes-custom list-checkboxes">
                  {allLocations.map((loc) => (
                    <li key={loc}>
                      <label className="label-container checkbox-default">
                        {loc}
                        <input
                          type="checkbox"
                          className="locfliter"
                          value={loc}
                          checked={selectedLocations.includes(loc)}
                          onChange={() =>
                            handleToggle(
                              loc,
                              selectedLocations,
                              setSelectedLocations
                            )
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <div className="txtftr">
                  <h6>Facilities</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body style={{ padding: "0px", paddingBottom: "20px" }}>
                <ul className="check-boxes-custom list-checkboxes">
                  {allFacilities.map((f) => (
                    <li key={f}>
                      <label className="label-container checkbox-default">
                        {f}
                        <input
                          type="checkbox"
                          className="facilitiesfilter"
                          value={f}
                          checked={selectedFacilities.includes(f)}
                          onChange={() =>
                            handleToggle(
                              f,
                              selectedFacilities,
                              setSelectedFacilities
                            )
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="txtftr">
                <h6>Room Types</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {allRoomTypes.map((type) => (
                  <li key={type}>
                    <label className="label-container checkbox-default">
                      {type}
                      <input
                        type="checkbox"
                        className="roomtypesfilter"
                        value={type}
                      checked={selectedRoomTypes.includes(type)}
                onChange={() =>
                  handleToggle(type, selectedRoomTypes, (newTypes) =>
                    setSelectedRoomTypes(newTypes)
                  )
                }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item> */}
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <div className="txtftr">
                  <h6>Meal Plan</h6>
                </div>
              </Accordion.Header>
              <Accordion.Body style={{ padding: "0px", paddingBottom: "20px" }}>
                <ul className="check-boxes-custom list-checkboxes">
                  {allMealPlans.map((plan) => (
                    <li key={plan}>
                      <label className="label-container checkbox-default">
                        {plan.replace(/-/g, " ")}
                        <input
                          type="checkbox"
                          className="mealplansfilter"
                          // value={plan.toLowerCase().replace(/ /g, "-")}
                          checked={selectedMealPlans.includes(plan)}
                          onChange={() =>
                            handleToggle(
                              plan,
                              selectedMealPlans,
                              setSelectedMealPlans
                            )
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <Button
            type="submit"
            variant="primary"
            className="btnf_apy"
            onClick={handleSubmit}
          >
            Apply Filters
          </Button> */}
        </div>
      </div>
      {/* <div>
        <h2>Hotel Filters</h2>

        <input
          type="text"
          placeholder="Search hotel name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <section>
          <h4>Stars</h4>
          {allStars.map((s) => (
            <label key={s}>
              <input
                type="checkbox"
                checked={selectedStars.includes(s)}
                onChange={() =>
                  handleToggle(s, selectedStars, setSelectedStars)
                }
              />
              {s} Star
            </label>
          ))}
        </section>
        <h4>
          Price Range: ${sliderValue[0]} - ${sliderValue[1]}
        </h4>
        <Slider
          range
          min={minFare}
          max={maxFare}
          value={sliderValue}
          step={1000}
          onChange={(value) => setSliderValue(value)}
        />
        <section>
          <h4>Locations</h4>
          {allLocations.map((loc) => (
            <label key={loc}>
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() =>
                  handleToggle(loc, selectedLocations, setSelectedLocations)
                }
              />
              {loc}
            </label>
          ))}
        </section>

        <section>
          <h4>Facilities</h4>
          {allFacilities.map((f) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={selectedFacilities.includes(f)}
                onChange={() =>
                  handleToggle(f, selectedFacilities, setSelectedFacilities)
                }
              />
              {f}
            </label>
          ))}
        </section>

        <section>
          <h4>Room Types</h4>
          {allRoomTypes.length === 0 ? (
            <p>No room types available</p>
          ) : (
            allRoomTypes.map((type) => (
              <label
                key={type}
                style={{ display: "block", marginBottom: "6px" }}
              >
                <input
                  type="checkbox"
                  checked={selectedRoomTypes.includes(type)}
                  onChange={() =>
                    handleToggle(type, selectedRoomTypes, (newTypes) =>
                      setSelectedRoomTypes(newTypes)
                    )
                  }
                />
                {` ${type}`}
              </label>
            ))
          )}
        </section>

        <section>
          <h4>Meal Plans</h4>
          {allMealPlans.map((plan) => (
            <label key={plan}>
              <input
                type="checkbox"
                checked={selectedMealPlans.includes(plan)}
                onChange={() =>
                  handleToggle(plan, selectedMealPlans, setSelectedMealPlans)
                }
              />
              {plan.replace(/-/g, " ")}
            </label>
          ))}
        </section>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={clearAll}>Clear All</button>
          <p> hotels found</p>
        </div>
      </div> */}
    </>
  );
};

export default HotelFiltering;

{
  /* <div className="hotelmodifydropdown">
  <select
    id="sortOptions"
    className="hotelmodifyselect"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="Low to High">-- Price Low to High --</option>
    <option value="popularity">Popularity</option>
    <option value="Low to High">Low to High</option>
    <option value="High to Low">High to Low</option>
  </select>
</div>
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
  search,
  sortOption, // 👈 Add this
]);
const applyFilters = () => {
  const filtered = hotelList.filter((h) => {
    const firstRoom = h.Rooms?.[0];
    const fare = firstRoom?.TotalFare;

    if (
      typeof fare !== "number" ||
      fare < sliderValue[0] ||
      fare > sliderValue[1]
    )
      return false;

    if (
      searchQuery &&
      !h.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (
      selectedStars.length &&
      !selectedStars.includes(Number(h.star_rating))
    )
      return false;

    if (
      selectedLocations.length &&
      !selectedLocations.some((loc) => h.address?.includes(loc))
    )
      return false;

    if (
      selectedFacilities.length &&
      !h.Rooms?.some((r) =>
        selectedFacilities.every((fac) =>
          (r.Inclusion || "").toLowerCase().includes(fac.toLowerCase())
        )
      )
    )
      return false;

    if (
      selectedRoomTypes.length &&
      !h.Rooms?.some((r) =>
        selectedRoomTypes.every((rt) =>
          (r.Name?.[0] || "")
            .toLowerCase()
            .split(",")
            .map((s) => s.trim())
            .includes(rt.toLowerCase())
        )
      )
    )
      return false;

    if (
      selectedMealPlans.length &&
      !h.Rooms?.some((r) =>
        selectedMealPlans.includes(
          (r.MealType || "").toLowerCase().replace(/ /g, "-")
        )
      )
    )
      return false;

    return true;
  });

  // ✅ Sorting logic
  let sorted = [...filtered];

  if (sortOption === "Low to High") {
    sorted.sort(
      (a, b) =>
        (a.Rooms?.[0]?.TotalFare || Infinity) -
        (b.Rooms?.[0]?.TotalFare || Infinity)
    );
  } else if (sortOption === "High to Low") {
    sorted.sort(
      (a, b) =>
        (b.Rooms?.[0]?.TotalFare || 0) -
        (a.Rooms?.[0]?.TotalFare || 0)
    );
  } else if (sortOption === "popularity") {
    sorted.sort((a, b) => {
      const starsA = Number(a.star_rating) || 0;
      const starsB = Number(b.star_rating) || 0;
      const priceA = a.Rooms?.[0]?.TotalFare || Infinity;
      const priceB = b.Rooms?.[0]?.TotalFare || Infinity;

      if (starsA === starsB) return priceA - priceB; // If stars equal, sort by price
      return starsB - starsA; // More stars first
    });
  }

  setFilteredHotels(sorted);
}; */
}
