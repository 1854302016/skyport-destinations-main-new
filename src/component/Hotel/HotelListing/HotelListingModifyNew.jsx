import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import './HotelModifyNew.css';
import { CiLocationOn } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


function HotelListingModifyNew() {
  const navigate=useNavigate()
  const handleNaviagete = ()=>{
    navigate('/hoteldetailsmain')
  }
  return (
    <div className='hotelListingstyling'>
      <Container className='hotelListingstyling-Container'>
        <Row>
        <Col className='hotelListingstyling-img'><img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" alt="" style={{borderRadius:"15px"}} /></Col>
        <Col className='hotelListingstyling-img'>
        <div className='hotelListingstyling-name'>Hotel Name <img src="/images/star.png" alt="" style={{width:'16px'}}/>
        </div>
        <div className='hotel-Address'>
           <CiLocationOn/> <span>New Delhi, India</span>
        </div>
        <div className="amenities">
        <div className="free_amenities">Couple Friendly</div>
        <div className="free_amenities">Free Wifi</div>
        </div>
        <div className='hotel-freecancellation'><img src="/images/checkmark.png" alt=""style={{width:'16px'}} /> Free Cancellation</div>
        <div className='hotel-roomType'>Deluxe Room</div>
        <div className="hotel-coupon">
        <div className=""><BiSolidOffer className="hotelcouponcode_icon"/>
        TRIPGOHOTELS Discount Applied</div>
        </div>
        </Col>
        <Col className="hotelListingstyling-img" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
        <div className="hotel-numberic-rating">
        <div>
        <div className="rating-label">Excellent</div>
        <div className="rating-reviews">1134 reviews</div>
        </div>
        <div className="rating-score">4.8</div>
        </div>
        <div className='cross-pricing'>₹ 11,046</div>
        <div className='real-pricing'>₹ 6,999</div>
        <div className='hotel-taxesFees'>+ ₹ 1,116 Taxes & fees</div>
        <div className='hotel-taxesFees' style={{color:"#737373"}}>Per Night</div>
        <div className='hotel-freecancellation' style={{textAlign:'right'}}><img src="/images/checkmark.png" alt=""style={{width:'16px'}} /> Book with ₹0</div>
        <button className='hotel-viewRoom-btn' onClick={handleNaviagete}>View Room</button>
        </div>
        </Col>

        </Row>
      </Container>
    </div>
  )
}

export default HotelListingModifyNew
