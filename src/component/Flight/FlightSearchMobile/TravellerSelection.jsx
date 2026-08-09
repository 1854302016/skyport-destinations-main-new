import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import "./RoomSelectionComponent.css";

const TravellerSelection = ({ rooms, updateRoom, closeTravellerInput }) => {
  const DoneRoom = () => {
    // console.log("Room selection done.");
    closeTravellerInput();
  };

  return (
    <div id="divMain" className="rom-on-main" style={{ display: "block" }}>
      <div className="wrapdiv">
        <div className="rec-bl">
          <div className="fli-c-bl">
            <div className="fli-m-bl">
              <div className="ser-l-bl2">
                <div className="sel1-bl">
                  <a href="#">
                    <div className="arr-nw" id="backTosrch2" onClick={closeTravellerInput}></div>
                  </a>
                </div>
                <div className="sel2-bl">{`${rooms[0].adults} Adults, ${rooms[0].children} Child, ${rooms[0].infants} Infants`}</div>
              </div>
              <div className="ser-r-bl"></div>
            </div>
          </div>
        </div>
        <div className="clr"></div>
        <div className="overflowdiv">
          <div id="roomDiv" className="rom-on divRoom">
            <div className="rom-detail spc-cty">
              <div className="rom-detail-m">
                <span className="rct-arw-tx">Room 1</span>
                <div className="clr"></div>
              </div>
              <div className="clr"></div>
            </div>
            <div className="clr"></div>
            <div className="spc-cty">
              <div className="gst">
                <div className="gst-tx">Guest</div>
                <div className="aldt-m">
                  <div className="ald-m">Adult</div>
                  <div className="ald-m2">
                    <Button
                      variant="outline-primary"
                      className="minus_boxADt"
                      id="btnminus_boxADt1"
                      onClick={() =>
                        updateRoom(
                          0,
                          "adults",
                          Math.max(rooms[0].adults - 1, 1)
                        )
                      }
                      field="quantityAdult">
                      -
                    </Button>
                    <input
                      type="text"
                      name="quantityAdult"
                      readOnly
                      value={rooms[0].adults}
                      className="qty"
                      id="optAdult1"
                    />
                    <Button
                      variant="outline-primary"
                      id="quantityAdult1"
                      className="plus_box1"
                      onClick={() =>
                        updateRoom(
                          0,
                          "adults",
                          Math.min(rooms[0].adults + 1, 6)
                        )
                      }
                      field="quantityAdult">
                      +
                    </Button>
                    <div className="clr"></div>
                  </div>
                  <div className="clr"></div>
                </div>
                <div className="clr"></div>
                <div className="aldt-m-cld">
                  <div className="ald-m">Children</div>
                  <div className="ald-m2">
                    <Button
                      id="btnminus_box1"
                      onClick={() =>
                        updateRoom(
                          0,
                          "children",
                          Math.max(rooms[0].children - 1, 0)
                        )
                      }
                      variant="outline-primary"
                      className="minus_box1"
                      field="quantity1">
                      -
                    </Button>
                    <input
                      type="text"
                      name="quantity1"
                      readOnly
                      value={rooms[0].children}
                      className="qty"
                      id="optChild1"
                    />
                    <Button
                      id="quantityChild1"
                      variant="outline-primary"
                      className="plus_boxChd"
                      onClick={() =>
                        updateRoom(
                          0,
                          "children",
                          Math.min(rooms[0].children + 1, 6)
                        )
                      }
                      field="quantity1">
                      +
                    </Button>
                    <div className="clr"></div>
                  </div>
                  <div className="clr"></div>
                </div>
                <div className="clr"></div>
                <div className="aldt-m-cld">
                  <div className="ald-m">Infants (Below 2 years)</div>
                  <div className="ald-m2">
                    <Button
                      id="btnminus_box1"
                      onClick={() =>
                        updateRoom(
                          0,
                          "infants",
                          Math.max(rooms[0].infants - 1, 0)
                        )
                      }
                      variant="outline-primary"
                      className="minus_box1"
                      field="quantity1">
                      -
                    </Button>
                    <input
                      type="text"
                      name="quantity1"
                      readOnly
                      value={rooms[0].infants}
                      className="qty"
                      id="optChild1"
                    />
                    <Button
                      id="quantityChild1"
                      variant="outline-primary"
                      className="plus_boxChd"
                      onClick={() =>
                        updateRoom(
                          0,
                          "infants",
                          Math.min(rooms[0].infants + 1, rooms[0].adults)
                        )
                      }
                      field="quantity1">
                      +
                    </Button>
                    <div className="clr"></div>
                  </div>
                  <div className="clr"></div>
                </div>
                <div className="clr"></div>
              </div>
              <div className="clr"></div>
            </div>
            <div className="clr"></div>
            <div className="rom-detail spc-cty">
              <div className="gst">
                <div className="clr"></div>
              </div>
              <div className="clr"></div>
            </div>
            <div className="clr"></div>
            <div
              className="rom-detail spc-cty"
              id="divRoom2"
              style={{ display: "block" }}>
              <div className="ad-rom">
                <div className="ad-rm-m2">
                  <a
                    href="#"
                    // style={{
                    //   display:
                    //     index === rooms.length - 1 ? "inline-block" : "none",
                    // }}
                    onClick={(e) => {
                      e.preventDefault();
                      // setLabelClicked(false);
                      DoneRoom();
                    }}>
                    Done
                  </a>
                </div>
                <div className="clr"></div>
              </div>
              <div className="clr"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravellerSelection;
