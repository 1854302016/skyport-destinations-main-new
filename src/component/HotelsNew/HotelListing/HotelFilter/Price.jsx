import React from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Price = ({closeFilter,maxFare,minFare,sliderValue,setSliderValue}) => {
  return (
    <div className="mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">
         <div
                      className="actpop dur-pop"
                      id="idsrt1"
                    
                    >
                      <div className="popbx ">
                        <div className="close-btn fltPop" onClick={closeFilter}>
                          ✕
                        </div>
                        <div className="ovf-sc">
                          <div className="flter">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div className="fltr-title">Filter</div>
                              {/* <small>Reset</small> */}
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
                            <div className="apl-btn" onClick={closeFilter}>
                              <a className="slt-st goTopBtn">Apply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
    </div>
  )
}

export default Price