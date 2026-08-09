import React from "react";
import "./HotelModifyNew.css";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import HotelFiltering from "./HotelFiltering";
import HotelListingNew from "./HotelListingNew";
import HotelListingModifyNew from "./HotelListingModifyNew";

function HotelModifyNew() {
  return (
    <div className="">
      <div className="hotelmodifysearch">
        <img
          src="Images/flight_aero.png"
          alt=""
          style={{ width: "40px", marginRight: "10px" }}
        />
        <div className="hotelmodifysearchinputs" style={{ width: "30%" }}>
          <label htmlFor="" className="hotelmodifylabelstyling">
            City name, Location or Specific hotel
          </label>
          <input
            type="text"
            name=""
            id=""
            className="hotelmodifyinputstyling"
            placeholder="Del"
          />
        </div>
        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label htmlFor="" className="hotelmodifylabelstyling">
            Check-In
          </label>
          <input
            type="date"
            name=""
            id=""
            placeholder="Select date"
            className="hotelmodifyinputstyling"
          />
        </div>
        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label htmlFor="" className="hotelmodifylabelstyling">
            Check-Out
          </label>
          <input
            type="date"
            name=""
            id=""
            placeholder="Select date"
            className="hotelmodifyinputstyling"
          />
        </div>
        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label htmlFor="" className="hotelmodifylabelstyling">
            Rooms & Guests
          </label>
          <input
            type="text"
            name=""
            id=""
            className="hotelmodifyinputstyling"
          />
        </div>
        <div style={{ width: "15%" }}>
          <button className="hotelmodifysearch-btn">Search</button>
        </div>
      </div>
      <div className="hotelmodifydropdown_main dropdown_main">
        <div className="hotelavailbility">552 Hotels available</div>
        <div className="hotelmodifyinputs_wrapper">
          <div className="inputWrapper">
            <input
              type="text"
              className="hotelmodifyinput"
              placeholder="Search hotels..."
            />
          </div>
          <div className="hotelmodifydropdown">
            <select id="city" className="hotelmodifyselect">
              <option value="">-- Price Low to High --</option>
              <option value="popularity">Popularity</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <Container>
        <div className="">
          <section className="hotellist_fliter">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <HotelFiltering />
              </Col>
              <Col lg={9} md={9} sm={12}>
                <HotelListingModifyNew />
              </Col>
            </Row>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default HotelModifyNew;
