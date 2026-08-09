import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HotelFinalBooking.css";
import { FaChevronLeft } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsInfoCircleFill } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import HotelPromoCodes from "./HotelPromoCodes";

const HotelFinalBooking = () => {
  // ✅ All your logic stays the same...

  return (
    <div className="hotelFinalBooking">
      {hotelPreBookData && (
        <>
          {/* HEADER SECTION */}
          <div className="hotelFinalBooking__header">
            <Container>
              <Row className="align-items-center">
                <Col>
                  <Link to="/hoteldetailsmain" className="hotelFinalBooking__back">
                    <FaChevronLeft /> Back
                  </Link>
                </Col>
                <Col className="text-end">
                  <h3 className="hotelFinalBooking__title">Hotel Review & Traveller</h3>
                </Col>
              </Row>
            </Container>
          </div>

          {/* CONTENT SECTION */}
          <Container className="hotelFinalBooking__content">
            {/* HOTEL DETAILS CARD */}
            <div className="hotelFinalBooking__card hotelFinalBooking__hotelDetails">
              <div className="hotelFinalBooking__hotelHeader">
                <div>
                  <h4>{hotelPreBookData.data.HotelDetail.name}</h4>
                  <div className="hotelFinalBooking__stars">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        style={{ color: index < Number(hotelPreBookData.data.HotelDetail.star_rating) ? '#FFD700' : '#ccc' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p><CiLocationOn /> {hotelPreBookData.data.HotelDetail.address}</p>
                </div>
                <img src="/Images/Images/hotelroom.jpg" alt="Room" className="hotelFinalBooking__roomImage" />
              </div>

              <div className="hotelFinalBooking__roomInfo">
                <h5>{hotelPreBookData.data.rooms[0]?.Name}</h5>
                <p>{roomsConfig.length} Room(s), {roomsConfig.reduce((acc, r) => acc + (r.adults || 0) + (r.children || 0), 0)} Guest(s)</p>
                <Link to="/hoteldetailsmain" className="hotelFinalBooking__changeLink">Change Room</Link>
              </div>

              <div className="hotelFinalBooking__dates">
                <div>
                  <h6>Check-In</h6>
                  <p>{/* Format your date here */}July 20</p>
                </div>
                <div>
                  <h6>Check-Out</h6>
                  <p>{/* Format your date here */}July 25</p>
                </div>
              </div>
            </div>

            {/* TRAVELLER DETAILS CARD */}
            <div className="hotelFinalBooking__card hotelFinalBooking__travellerDetails">
              <h4>Traveller Details</h4>
              {roomsConfig.map((room, roomIndex) => (
                <div key={roomIndex} className="hotelFinalBooking__roomSection">
                  <h6>Room {roomIndex + 1}</h6>

                  {[...Array(room.adults || 0)].map((_, adultIndex) => (
                    <div key={adultIndex} className="hotelFinalBooking__guestRow">
                      <span>Adult {adultIndex + 1}</span>
                      {/* Title, First, Last - same as before */}
                    </div>
                  ))}
                  {[...Array(room.children || 0)].map((_, childIndex) => (
                    <div key={childIndex} className="hotelFinalBooking__guestRow">
                      <span>Child {childIndex + 1}</span>
                      {/* Title, First, Last - same as before */}
                    </div>
                  ))}
                </div>
              ))}

              <div className="hotelFinalBooking__contactInfo">
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PRICE SUMMARY CARD */}
            <div className="hotelFinalBooking__card hotelFinalBooking__priceSummary">
              <h4>Price Summary</h4>
              <p>Base Fare: ₹ {Math.round(hotelPreBookData.data.rooms[0].TotalFare)}</p>
              <p>Taxes & Fees: ₹ {Math.round(hotelPreBookData.data.rooms[0].TotalTax)}</p>
              <p>You Pay: <strong>₹{Math.round(hotelPreBookData.data.HotelResult[0].Rooms[0].NetAmount)}</strong></p>
            </div>
          </Container>

          {/* STICKY FOOTER */}
          <div className="hotelFinalBooking__footer">
            <Container>
              <button className="hotelFinalBooking__continueBtn" onClick={handleHotelBookNow}>
                {loading ? "Booking..." : "Continue"}
              </button>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default HotelFinalBooking;
