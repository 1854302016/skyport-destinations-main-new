import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { MdNoMeals } from "react-icons/md";
import { FaCarRear } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import QueryFromPopup from './QueryFormPopup'


const himachal = [
    {
    title: "Weekend Shimla Tour From Delhi",
    stayingDays: "3 Night / 4 Days",
    image: "/Images/Images/delhi-to-shimla.jpg",
    price: "₹ 5,750",
  },
  {
    title: "Dharamshala Mcleodganj Tour Package",
    stayingDays: "3 Night / 4 Days",
    image: "/Images/Images/mcleodganj-tour.jpg",
    price: "₹ 8,999",
  },
  {
    title: "Manali Honeymoon Package From Delhi By Volvo",
    stayingDays: "5 Night / 6 Days",
    image: "/Images/Images/manali-honeymoon.jpg",
    price: "₹ 7,499",
  },
  {
    title: "Shimla Manali Tour With Chandigarh From Delhi",
    stayingDays: "6 Night / 7 Days",
    image: "/Images/Images/Shimla-Manali-Tour-6.jpg",
    price: "₹ 15,499",
  },
  {
    title: "Shimla Manali Dalhousie Tour Package",
    stayingDays: "8 Night / 9 Days",
    image: "/Images/Images/Dharamshala.png",
    price: "₹ 21,999",
  },
  {
    title: "Manali Tour Package From Delhi by Volvo",
    stayingDays: "4 Night / 5 Days",
    image: "/Images/Images/Manali-Family-Tour-Packages-2.jpg",
    price: "₹ 5,499",
  },
];

const HimachalPackages = ({handleContinueClick}) => {

   const[showFormPopup, setShowFormPopup ] = useState(false);

    const handleOpenPopup  = () => {
      setShowFormPopup(true);
   };


  return (
    <div className="Uttarakhand_TrendingPackagesMain">
      <div className="Uk-TrendingPackages">Trending Himachal Packages</div>
      <Container className="Uk-TrendingPackagesContainer">
        <Row>
          {himachal.map((items, index) => (
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
                    <button onClick={handleOpenPopup} >Enquiry now</button>
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
      {/* <QueryFormPopup setShowFormPopup={setShowFormPopup} showFormPopup={showFormPopup}/> */}
      <QueryFromPopup setShowFormPopup={setShowFormPopup} showFormPopup={showFormPopup}/>
      
    </div>
  );
};

export default HimachalPackages;
