import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdNoMeals } from "react-icons/md";
import { FaCarRear } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import QueryFromPopup from "../Himachal/QueryFormPopup";

const ladakh = [
  {
    title: "8 days Leh to Leh with Turtuk & Tso Moriri",
    stayingDays: "7 Night / 8 Days",
    image: "/Images/Images/TsoMorini.jpeg",
    price: "₹ 28,999",
  },
  {
    title: "7 Days Leh to Leh with Turtuk",
    stayingDays: "6 Night / 7 Days",
    image: "/Images/Images/Turtuk1.jpg",
    price: "₹ 25,999",
  },
  {
    title: "8 Days Leh to Leh Tour Package With Umling La",
    stayingDays: "7 Night / 8 Days",
    image: "/Images/Images/Umling1.jpeg",
    price: "₹  29,999",
  },
  {
    title: "9 Days Delhi to Leh With Umling La",
    stayingDays: "8 Night / 9 Days",
    image: "/Images/Images/umingla1.jpg",
    price: "₹ 29,999",
  },
  {
    title: "Leh Ladakh Bike Trip From Manali",
    stayingDays: "8 Night / 9 Days",
    image: "/Images/Images/biketrip.jpg",
    price: "₹ 30,499",
  },
  {
    title: "11 Days Delhi Leh Srinagar with Umling La Road trip",
    stayingDays: "10 Night / 11 Days",
    image: "/Images/Images/srinagar-leh.jpg",
    price: "₹ 39,999",
  },
];

const LadakhPackages = ({ handleContinueClick }) => {
  const [showFormPopup, setShowFormPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowFormPopup(true);
  };
  return (
    <div className="Uttarakhand_TrendingPackagesMain">
      <div className="Uk-TrendingPackages">Trending Ladakh Packages</div>
      <Container className="Uk-TrendingPackagesContainer">
        <Row>
          {ladakh.map((items, index) => (
            <Col key={index} md={4} sm={6} xs={12}>
              <div className="Uk-TrendingPackagesDiv">
                <h4>{items.title}</h4>
                <div className="Uk-StayingDays">
                  <div className="Uk-DaysNights">{items.stayingDays}</div>
                  <div className="Uk-DaysNights">Tour Package</div>
                </div>
                <div className="Uk-TrendingPackagesImg">
                  <img src={items.image} alt="" />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <Row>
                    <Col>
                      <div className="Uk-TrendingPackagesIcons">
                        <MdNoMeals
                          style={{ fontSize: "20px", color: "#053355" }}
                        />
                        Meals
                      </div>
                    </Col>
                    <Col>
                      <div className="Uk-TrendingPackagesIcons">
                        <FaCarRear
                          style={{ fontSize: "20px", color: "#053355" }}
                        />
                        transfer
                      </div>
                    </Col>
                    <Col>
                      <div className="Uk-TrendingPackagesIcons">
                        <FaMapLocation
                          style={{ fontSize: "20px", color: "#053355" }}
                        />
                        Sightseeing
                      </div>
                    </Col>
                    <Col>
                      <div className="Uk-TrendingPackagesIcons">
                        <FaHotel
                          style={{ fontSize: "20px", color: "#053355" }}
                        />
                        Hotel
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="Uk-Pricing">
                  <div>
                    <div className="Uk-StartingPrice">Starting Price</div>
                    <div className="Uk-StartingPriceNum">{items.price}</div>
                    <div className="Uk-StartingPricePP">Per Person</div>
                  </div>
                  <div>
                    <button onClick={handleOpenPopup}>Enquiry now</button>
                  </div>
                </div>
                <div className="Uk-TrendingPackagesChats">
                  {/* <div ><button style={{backgroundColor:'#25d366'}} className='Uk-CallToExpert-btn'><FaWhatsapp /><span style={{paddingLeft:'8px'}}>WhatsApp</span></button></div> */}
                  <div>
                    <button
                      className="Uk-CallToExpert-btn"
                      style={{ backgroundColor: "#25d366" }}
                    >
                      <FaWhatsapp />
                      <Link
                        style={{ paddingLeft: "8px", color: "#fff" }}
                        to="https://wa.me/+919211252356"
                        target="_blank"
                      >
                        WhatsApp
                      </Link>
                    </button>
                  </div>
                  <div>
                    <button className="Uk-CallToExpert-btn">
                      <LuPhoneCall />
                      <Link
                        to="tel:+919211252356"
                        style={{ paddingLeft: "8px", color: "#fff" }}
                      >
                        Call to Expert
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <QueryFromPopup
        setShowFormPopup={setShowFormPopup}
        showFormPopup={showFormPopup}
      />
    </div>
  );
};

export default LadakhPackages;
