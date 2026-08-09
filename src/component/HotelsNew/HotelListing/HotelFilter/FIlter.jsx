import React from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaStar } from 'react-icons/fa';
const FIlter = ({ searchQuery,
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
  clearAll, closeFilter }) => {
  return (
    <div className="hotel_modify_search_mobile mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">
      <div
        className="actpop fltr-pop"
        id="idflr"
        ng-show="isFilt"

      >
         <div className="close-btn fltPop" onClick={closeFilter}>
            ✕
          </div>
        <div className="popbx ">
         
          <div className="ovf-sc">
            <div className="flter">
              <div className=" d-flex justify-content-between align-items-center">
                <div className="fltr-title">Filter</div>
                {/* <small>Reset</small> */}
              </div>
            </div>
            <div className="pd-bx">
              <div className="pd-title">Price <br />${sliderValue[0]} - ${sliderValue[1]}</div>
              <div className="range">
                <div style={{ margin: "10px 0", padding: "0 10px" }}>
                  <Slider
                    range
                    min={minFare}
                    max={maxFare}
                    value={sliderValue}
                    onChange={(val) => setSliderValue(val)}
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
          </div>
          <div className="pd-bx">
            <div className="pd-title d-flex justify-content-between align-items-center">
              Stars
            </div>
            <div className="d-flex gap-5 brd-pnt flx-wrp">
              <fieldset style={{ height: '100px', overflow: 'scroll' }}>
                {allStars.map((star) => {
                  const isSelected = selectedStars.includes(star);

                  return (
                    <div
                      key={star}
                      className="DestinationDetailMailFilterInput"

                      onClick={() =>
                        handleToggle(star, selectedStars, setSelectedStars)
                      }
                      style={{ cursor: 'pointer', background: isSelected ? '#1d489f' : '#fff', }}
                    >
                      <label>
                        {Number.isInteger(star) && star > 0 ? (
                          <span
                            style={{
                              color: isSelected ? '#fff' : '#000', // yellow if selected, gray otherwise
                              marginRight: '5px',
                              marginTop: '-5px',
                              display: 'inline-flex',
                              alignItems: 'center',

                            }}
                          >
                            <FaStar className="star_icon" />
                            <span style={{ marginLeft: 5 }}>{star} Star</span>
                          </span>
                        ) : (
                          <span>Invalid star rating</span>
                        )}
                      </label>
                    </div>
                  );
                })}

              </fieldset>
            </div>
          </div>

          <div className="pd-bx">
            <div className="pd-title d-flex justify-content-between align-items-center">
              Location
            </div>
            <div className="d-flex gap-5 brd-pnt flx-wrp">
              <fieldset style={{ height: '150px', overflow: 'scroll' }}>
                {allLocations.map((loc) => {
  const isSelected = selectedLocations.includes(loc);

                  return (
                    <div
                      key={loc}
                      className="DestinationDetailMailFilterInput"
                      onClick={() =>
                        handleToggle(loc, selectedLocations, setSelectedLocations)
                      }
                      style={{
                        cursor: 'pointer',
                        background: isSelected ? '#1d489f' : '#fff',
                      }}
                    >
                      <label>
                        <span
                          style={{
                            color: isSelected ? '#fff' : '#000',
                            marginRight: '5px',
                            marginTop: '-5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                                  {loc}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div>
          <div className="pd-bx">
            <div className="pd-title d-flex justify-content-between align-items-center">
              Meal Plan
            </div>
            <div className="d-flex gap-5 brd-pnt flx-wrp">
              <fieldset style={{ height: '150px', overflow: 'scroll' }}>
                {allMealPlans.map((plan) => {
  const isSelected = selectedMealPlans.includes(plan);

                  return (
                    <div
                      key={plan}
                      className="DestinationDetailMailFilterInput"
                      onClick={() =>
                        handleToggle(plan, selectedMealPlans, setSelectedMealPlans)
                      }
                      style={{
                        cursor: 'pointer',
                        background: isSelected ? '#1d489f' : '#fff',
                      }}
                    >
                      <label>
                        <span
                          style={{
                            color: isSelected ? '#fff' : '#000',
                            marginRight: '5px',
                            marginTop: '-5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                                  {plan.replace(/-/g, " ")}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div>

          {/* <div className="pd-bx">
            <div className="pd-title d-flex justify-content-between align-items-center">
              Facilities
            </div>
            <div className="d-flex gap-5 brd-pnt flx-wrp">
              <fieldset style={{ height: '150px', overflow: 'scroll' }}>
                {allFacilities.map((f) => {
                  const isSelected = selectedFacilities.includes(f);

                  return (
                    <div
                      key={f}
                      className="DestinationDetailMailFilterInput"
                      onClick={() =>
                        handleToggle(f, selectedFacilities, setSelectedFacilities)
                      }
                      style={{
                        cursor: 'pointer',
                        background: isSelected ? '#1d489f' : '#fff',
                      }}
                    >
                      <label>
                        <span
                          style={{
                            color: isSelected ? '#fff' : '#000',
                            marginRight: '5px',
                            marginTop: '-5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          {f}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div> */}

          <div className="apl-btn" onClick={closeFilter}>
            <a className="slt-st goTopBtn">Apply</a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default FIlter
