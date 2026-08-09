import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";


import { RxCross2 } from "react-icons/rx";
import Slider from "rc-slider";
import { MdFlight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
function Star({ closeFilter, clearAllFilters, allStars, setSelectedStars, handleToggle, selectedStars }) {
  return (
    <div className="mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">


      <div
        className="actpop dur-pop"
        id="idsrt1"
        ng-show="isDur"
      // ref={filterRef}
      >
        <div className="popbx ">
          <div className="close-btn fltPop" onClick={closeFilter}>
            ✕
          </div>
          <div className="ovf-sc">
            <div className="flter">
              <div className=" d-flex justify-content-between align-items-center">
                <div className="fltr-title">Filter</div>
                {/* <small >Reset</small> */}
              </div>
              <div className="pd-bx">
                <div className="pd-title">Stars</div>
                <fieldset>
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
              <div className="apl-btn" onClick={closeFilter}>
                <a className="slt-st goTopBtn">Apply</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Star;
