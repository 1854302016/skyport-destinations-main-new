import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./RoomSelectionComponent.css";

const RoomSelectionComponent = ({ rooms, addRoom, removeRoom, updateRoom, closeRoomInput, updateChildAge}) => {
  const DoneRoom = () => {
    // console.log("Room selection done.");
    closeRoomInput();
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
                    <div className="arr-nw" id="backTosrch2" onClick={closeRoomInput}></div>
                  </a>
                </div>
                <div className="sel2-bl">{`${rooms.reduce(
                  (total, room) => total + room.adults + room.children,
                  0
                )} Persons in ${rooms.length} ${
                  rooms.length === 1 ? "Room" : "Rooms"
                }`}</div>
              </div>
              <div className="ser-r-bl"></div>
            </div>
          </div>
        </div>
        <div className="clr"></div>
        <div className="overflowdiv">
          {rooms.map((room, index) => (
            <div id="roomDiv" className="rom-on divRoom" key={index}>
              <div className="rom-detail spc-cty">
                <div className="rom-detail-m">
                  <span className="rct-arw-tx">Room {index + 1}</span>
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
                          updateRoom(index, "adults", Math.max(room.adults - 1, 1))
                        }
                        field="quantityAdult">
                        -
                      </Button>
                      <input
                        type="text"
                        name="quantityAdult"
                        readOnly
                        value={room.adults}
                        className="qty"
                        id="optAdult1"
                      />
                      <Button
                        variant="outline-primary"
                        id="quantityAdult1"
                        className="plus_box1"
                        onClick={() =>
                          updateRoom(index, "adults", Math.min(room.adults + 1, 6))
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
                            index,
                            "children",
                            Math.max(room.children - 1, 0)
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
                        value={room.children}
                        className="qty"
                        id="optChild1"
                      />
                      <Button
                        id="quantityChild1"
                        variant="outline-primary"
                        className="plus_boxChd"
                        onClick={() =>
                          updateRoom(
                            index,
                            "children",
                            Math.min(room.children + 1, 6)
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

                  {room.children > 0 &&
                    [...Array(room.children)].map((_, childIndex) => (
                      <div
                        key={childIndex}
                        id="room1childAge1"
                        className="aldt-m-chid"
                        style={{}}>
                        <div className="ald-m">Child {childIndex + 1} Age</div>
                        <div className="ald-m4">
                          <Form.Control
                            as="select"
                            name="optRoom1Child1"
                            id="ddlRoom1Child1"
                            className="chld-bx"
                            onChange={(e) =>
                              updateChildAge(
                                index,
                                childIndex,
                                e.target.value
                              )
                            }>
                            {[...Array(11).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </Form.Control>
                          <div className="clr"></div>
                        </div>
                        <div className="clr"></div>
                      </div>
                    ))}

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
                  <div
                    className="ad-rm-m"
                    id="divAddRoom2"
                    style={{
                      display:
                        index === rooms.length - 1 ? "inline-block" : "none",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      addRoom();
                    }}>
                    + Add Room
                  </div>
                  <div
                    className="ad-rm-m"
                    id="removeRoom2"
                    style={{
                      display: rooms.length > 1 ? "inline-block" : "none",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      removeRoom(index);
                    }}>
                    - Remove Room
                  </div>
                  <div className="ad-rm-m2">
                    <a
                      href="#"
                      style={{
                        display:
                          index === rooms.length - 1 ? "inline-block" : "none",
                          marginBottom:15
                      }}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelectionComponent;
