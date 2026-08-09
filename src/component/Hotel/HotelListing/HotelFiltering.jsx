import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const HotelFiltering = () => {
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
  
  return (
    <div className="filterbx" style={{ display: showFilter && "block" }}>
      <div className="ftr_head">
        <h1>Filter</h1>
        <span className="clearfilter clearall">Clear all</span>
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
        <Accordion id="accordion" defaultActiveKey={["0", "1", "2", "3", "4", "5"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="txtftr">
                <h6>Search By Hotel Name</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <input
                type="text"
                className="form-control hotelname_search"
                placeholder="Search By Name"
                autoComplete="off"
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="txtftr">
                <h6>Stars</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {[5, 4, 3, 2, 1].map((star) => (
                  <li key={star}>
                    <label className="label-container checkbox-default">
                      <div className="startbx">
                        {[...Array(star)].map((_, index) => (
                          <FaStar key={index} className="star_icon" />
                        ))}
                      </div>
                      <input
                        type="checkbox"
                        className="starfliter"
                        value={star}
                        checked={starRating.includes(star)}
                        onChange={handleStarRatingChange}
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
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {[
                  "Faridabad",
                  "North Delhi",
                  "Indira Gandhi Int'l Airport",
                ].map((loc) => (
                  <li key={loc}>
                    <label className="label-container checkbox-default">
                      {loc}
                      <input
                        type="checkbox"
                        className="locfliter"
                        value={loc}
                        checked={location.includes(loc)}
                        onChange={handleLocationChange}
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
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {[
                  "Guestroom wireless internet",
                  "24-hour front desk",
                  "Laundry/Valet service",
                  "Multilingual staff",
                ].map((facility) => (
                  <li key={facility}>
                    <label className="label-container checkbox-default">
                      {facility}
                      <input
                        type="checkbox"
                        className="facilitiesfilter"
                        value={facility}
                        checked={facilities.includes(facility)}
                        onChange={handleFacilitiesChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="txtftr">
                <h6>Room Types</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {[
                  "Standard",
                  "Deluxe",
                  "Superior",
                  "Executive",
                  "Club",
                  "Suite",
                ].map((type) => (
                  <li key={type}>
                    <label className="label-container checkbox-default">
                      {type}
                      <input
                        type="checkbox"
                        className="roomtypesfilter"
                        value={type}
                        checked={roomTypes.includes(type)}
                        onChange={handleRoomTypesChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <div className="txtftr">
                <h6>Meal Plan</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="check-boxes-custom list-checkboxes">
                {[
                  "ROOM ONLY",
                  "Bed and Breakfast",
                  "Bed and BreakfastRoom Only",
                ].map((plan) => (
                  <li key={plan}>
                    <label className="label-container checkbox-default">
                      {plan}
                      <input
                        type="checkbox"
                        className="mealplansfilter"
                        value={plan.toLowerCase().replace(/ /g, "-")}
                        checked={mealPlan.includes(
                          plan.toLowerCase().replace(/ /g, "-")
                        )}
                        onChange={handleMealPlanChange}
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
  );
};

export default HotelFiltering;
