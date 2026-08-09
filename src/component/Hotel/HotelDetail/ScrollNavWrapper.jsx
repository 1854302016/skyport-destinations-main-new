import React, { useState } from "react";
import "./ScrollNavWrapper.css";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";

const ScrollNavWrapper = ({ isSticky, hotelDetails }) => {
  const [showmap, setShowMap] = useState(false);

  return (
    <div className={`scroll-nav-wrapper${isSticky ? " sticky" : ""} fl-wrap`}>
      <Container>
        <div className="scroll-nav scroll-init">
          <Nav>
            <li>
              <Nav.Link href="#sec1" className="act-scrlink">
                Top
              </Nav.Link>
            </li>
            <li>
              <Nav.Link href="#sec2" className="">
                Details
              </Nav.Link>
            </li>
            <li>
              <Nav.Link href="#sec3" className="">
                Amenities
              </Nav.Link>
            </li>
            <li>
              <Nav.Link href="#sec4" className="">
                Rooms
              </Nav.Link>
            </li>
            <li>
              <Nav.Link href="#sec5" className="">
                Reviews
              </Nav.Link>
            </li>
          </Nav>
        </div>
        <div className="w20">
          <a className="show-hidden-map" onClick={()=> setShowMap(!showmap)}>
            <span>On The Map</span> <FaMapMarkerAlt />
          </a>
        </div>
      </Container>
      <div style={{ marginTop: "15px", display: !showmap && "none" }}>
        <iframe
          width="100%"
          height="450px"
          style={{ border: 0 }}
          src={`https://www.google.com/maps?q=${hotelDetails.gl.lt},${hotelDetails.gl.ln}&hl=es;z=14&output=embed`}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ScrollNavWrapper;
