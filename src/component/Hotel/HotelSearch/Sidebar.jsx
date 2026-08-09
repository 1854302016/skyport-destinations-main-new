import React from "react";
import { Col } from "react-bootstrap";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { FaHotel, FaSuitcaseRolling } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Col md={2}>
      <div className="flightBookingSideBarMain">
        <div className="flightBookingSidebarInner">
          <div className="flightBookingparentDiv">
            <Link to="/flight" className="flightBookingSidebarfirstDiv">
              <MdFlight
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "10px" }}
              />
              <span className="flightBookingSidebarHidden"> Flights</span>
            </Link>
          </div>
          <div className="flightBookingparentDiv">
            <Link to="/hotels" className="flightBookingSidebarfirstDiv">
              <FaHotel
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "13px" }}
              />
              <span className="flightBookingSidebarHidden"> Hotels</span>
            </Link>
          </div>
          <div className="flightBookingparentDiv">
            <Link to="/tour" className="flightBookingSidebarfirstDiv">
              <FaSuitcaseRolling
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "13px" }}
              />
              <span className="flightBookingSidebarHidden"> Tours</span>
            </Link>
          </div>

          <div className="flightBookingparentDiv">
            <Link to="" className="flightBookingSidebarfirstDiv">
              <BiSolidOffer
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "10px" }}
              />
              <span className="flightBookingSidebarHidden"> Offers</span>
            </Link>
          </div>
          <div className="flightBookingparentDiv">
            <Link
              to="/bookings/hotel"
              className="flightBookingSidebarfirstDiv"
            >
              <IoBagHandleOutline
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "10px" }}
              />
              <span className="flightBookingSidebarHidden"> Bookings</span>
            </Link>
          </div>
          <div className="flightBookingparentDiv">
            <Link to="" className="flightBookingSidebarfirstDiv">
              <BiSupport
                // size={20}
                className="flightBookingIcon"
                // style={{ marginRight: "10px" }}
              />
              <span className="flightBookingSidebarHidden"> Support</span>
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Sidebar;
