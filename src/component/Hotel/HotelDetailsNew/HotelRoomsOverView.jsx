import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HotelRoomsOverView.css";
import { TiTickOutline } from "react-icons/ti";
import { useState, useEffect } from "react";

const HotelRoomsOverView = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hotel-RoomsOverViewMain">
      <Container>
        <div
          className={
            isSticky
              ? "hotel-RoomsOverViewMenu sticky"
              : "hotel-RoomsOverViewMenu"
          }
        >
          <div className="hotel-RoomsOverViewMenuItems">Rooms</div>
          <div className="hotel-RoomsOverViewMenuItems">Overview</div>
          <div className="hotel-RoomsOverViewMenuItems">Amenities</div>
          <div className="hotel-RoomsOverViewMenuItems">Location</div>
          <div className="hotel-RoomsOverViewMenuItems">Booking Policy</div>
        </div>
        <div className="hotel-RoomsOverViewMenuFinalBooking">
          <div className="hotel-RoomsOverViewRoomsBenefits">
            <div>Room Type</div>
            <div>Benefits</div>
            <div> Per Night Price</div>
          </div>
          <div className="">
            <Row className="hotel-finalRoomType-Row">
              <Col className="hotel-finalRoomType-Col">
                <div className="hotel-finalRoomType">
                  Day Use Room 6Hrs (Check In 9am - Check Out 3pm) (6 Hours stay
                  between 09:00 to 15:00)
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                    alt=""
                    className="hotel-finalRoomTypeImg"
                  />
                </div>
                <div className="hotel-finalRoomType-Btn">Double</div>
              </Col>
              <Col className="hotel-finalRoomType-Col">
                <div className="hotel-RoomsOnly">ROOM ONLY</div>
                <div className="hotel-RoomsOverViewMain">
                  <div className="hotel-RoomsOnly-Item">
                    <TiTickOutline className="hotel-RoomsOnly-Icons" />
                    <span>Room only</span>
                  </div>
                  <div className="hotel-RoomsOnly-Item">
                    <TiTickOutline className="hotel-RoomsOnly-Icons" />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="hotel-RoomsOnly-Item">
                    <TiTickOutline className="hotel-RoomsOnly-Icons" />
                    <span>Complimentary Mineral Water Daily 1 bottles</span>
                  </div>
                  <div className="hotel-RoomsOnly-Item">
                    <TiTickOutline className="hotel-RoomsOnly-Icons" />
                    <span>
                      Complimentary stay for children under 5 years without
                      extra bed
                    </span>
                  </div>
                </div>
              </Col>
              <Col className="hotel-finalRoomType-Col">
                <div className="hoteRoom-UsageCharges">
                  <div className="cross-pricing">₹ 1,500</div>
                  <div className="real-pricing">₹ 1,320</div>
                  <div className="hotel-taxesFees">₹ 180 Taxes & fees</div>
                  <div className="hotel-taxesFees" style={{ color: "#737373" }}>
                    Base price (Per Night)
                  </div>
                </div>
                <div className="hotel-bookNowgetOffer">
                  Book Now and Get ₹ 180 OFF
                </div>
              </Col>
              <Col className="hotel-finalRoomType-Col">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button className="hotel-RoomsOnly-ItemBookNowBtn">
                    Book Now
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HotelRoomsOverView;
