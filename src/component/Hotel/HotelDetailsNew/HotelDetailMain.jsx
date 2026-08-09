import React from "react";
import "./HotelDetailMain.css";
import { Container, Row, Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import { FaUserFriends } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { FaPumpSoap } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import HotelRoomsOverView from "./HotelRoomsOverView";
import RoomsOverView from "./RoomsOverView";

const HotelDetailMain = () => {
  return (
    <div>
      <Container>
        <div className="hotel-detailMain">
          <div className="hotel-detailSubMain">
            <div className="hotel-detailHeading">
              <div>
                <div className="hotelListingstyling-name">
                  Hotel Name{" "}
                  <img
                    src="/images/star.png"
                    alt=""
                    style={{ width: "16px" }}
                  />
                </div>
                <div className="hotel-Address">
                  <CiLocationOn /> <span>New Delhi, India</span>
                </div>
              </div>
              <div className="hotel-numberic-rating">
                <div>
                  <div className="rating-label">Excellent</div>
                  <div className="rating-reviews">1134 reviews</div>
                </div>
                <div className="rating-score">4.8</div>
              </div>
            </div>
            <div className="hotelSilder_totalFare">
              <div className="hotel-ColbigSilder">
                <div className="hotel-bigSilder">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                        alt="Second slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>

                <div className="carousel-belowImag">
                  <div>
                    <img
                      src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                      alt=""
                      className="carousel-smallImages"
                    />
                  </div>
                  <div>
                    <img
                      src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                      alt=""
                      className="carousel-smallImages"
                    />
                  </div>
                  <div class="carouselImage-container">
                    <img
                      src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                      alt=""
                      class="carousel-smallImages"
                    />
                    <div className="carouselImageOverlay-full">
                      <div class="carouselImageOverlay-text">+15</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hotel-ColtotalFare">
                <div className="hotel-totalFare">
                  <div className="hoteRoom-Usage">
                    Day Use Room 6Hrs (Check In 9am - Check Out 3pm) (6 Hours
                    stay between 09:00 to 15:00)
                  </div>
                  <div className="hoteRoom-UsageCharges">
                    <div className="cross-pricing">₹ 1,500</div>
                    <div className="real-pricing">₹ 1,320</div>
                    <div className="hotel-taxesFees">₹ 180 Taxes & fees</div>
                    <div
                      className="hotel-taxesFees"
                      style={{ color: "#737373" }}
                    >
                      Base price (Per Night)
                    </div>
                  </div>
                </div>
                <div className="hotel-Guests_Room">2 x Guest | 1 x Room</div>
                <div className="hotel-amenities" style={{ flexWrap: "wrap" }}>
                  <div className="free_amenities">
                    <FaUserFriends className="free_amenitiesIcons" />
                    Couple Friendly
                  </div>
                  <div className="free_amenities">
                    <FaWifi className="free_amenitiesIcons" />
                    Free Wifi
                  </div>
                  <div className="free_amenities">
                    <Ri24HoursFill className="free_amenitiesIcons" />
                    24-hour Room Service
                  </div>
                  <div className="free_amenities">
                    <FaPumpSoap className="free_amenitiesIcons" />
                    Free toiletries
                  </div>
                  <div className="free_amenities">
                    <IoRestaurant className="free_amenitiesIcons" />
                    Restaurant
                  </div>
                  <div className="free_amenities">
                    <CgGym className="free_amenitiesIcons" />
                    Gym
                  </div>
                </div>
                <button className="hotel-BookNowBtn">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <HotelRoomsOverView />
      <RoomsOverView />
    </div>
  );
};

export default HotelDetailMain;
