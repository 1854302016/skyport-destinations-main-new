import React from 'react'
import { Container } from 'react-bootstrap'
import './RoomsOverView.css'
import { CiLocationOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { FaPumpSoap } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import HotelBookingPolicy from './HotelBookingPolicy';
  
const RoomsOverView = () => {
  return (
    <div className='hotel-RoomOverView-Description'>
      <Container>
      <div className='hotel-Rooms-Des'>
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
                <div className='hotel-Rooms-Des-Below'>Hotel Description</div>
                <div style={{textDecoration: 'underline', fontWeight:'600'}}>Zip by Spree Hotels Brookefield – A Modern Business Hotel Near AECS Layout & Marathahalli, Bangalore</div>
                <p style={{padding: '10px 0px', fontSize:'14px'}}>Zip by Spree Hotels Brookefield is a modern business hotel strategically located near Whitefield, at the intersection of AECS Layout, Marathahalli, HAL Old Airport Road, and Outer Ring Road (ORR). Positioned at the gateway to Bangalore’s prominent IT corridor, the hotel offers excellent connectivity to major business and technology hubs, making it an ideal choice for corporate travelers, IT professionals, and business guests. The hotel features 60 well-appointed rooms, including Spree Club Rooms and Executive Rooms with Kitchenettes, catering to both short-term and extended-stay guests. Each room is thoughtfully designed with high-speed Wi-Fi, ergonomic workspaces, and modern amenities to ensure both comfort and productivity.</p>
        
      </div>
      <div className='hotel-Rooms-Des hotel-Rooms-BookingAmeni'>
        <div className='hotel-Rooms-Ameni-Below'>Amenities</div>
      <div className="hotel-amenities-lists">
              <div className="free_amenitiesList"><FaUserFriends className="free_amenitiesListIcons"/>Couple Friendly</div>
              <div className="free_amenitiesList"><FaWifi className="free_amenitiesListIcons"/>Free Wifi</div>
              <div className="free_amenitiesList"><Ri24HoursFill className="free_amenitiesListIcons"/>24-hour Room Service</div>
              <div className="free_amenitiesList"><FaPumpSoap className="free_amenitiesListIcons"/>Free toiletries</div>
              <div className="free_amenitiesList"><IoRestaurant className="free_amenitiesListIcons"/>Restaurant</div>
              <div className="free_amenitiesList"><CgGym className="free_amenitiesListIcons"/>Gym</div>
               <div className="free_amenitiesList"><FaUserFriends className="free_amenitiesListIcons"/>Couple Friendly</div>
              <div className="free_amenitiesList"><FaWifi className="free_amenitiesListIcons"/>Free Wifi</div>
              <div className="free_amenitiesList"><Ri24HoursFill className="free_amenitiesListIcons"/>24-hour Room Service</div>
              <div className="free_amenitiesList"><FaPumpSoap className="free_amenitiesListIcons"/>Free toiletries</div>
              <div className="free_amenitiesList"><IoRestaurant className="free_amenitiesListIcons"/>Restaurant</div>
              <div className="free_amenitiesList"><CgGym className="free_amenitiesListIcons"/>Gym</div>
              </div>
      </div>
      <div className='hotel-Rooms-Des hotel-Rooms-BookingLocation'>
        <div className='hotel-Rooms-Ameni-Below'>Location</div>
        <div><iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.912651138735!2d77.70505981528504!3d12.960495790867054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae12a94f6dff9b%3A0x59d5f5a79a58fda7!2sBrookefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1717588123456!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe></div>
      </div>
      <HotelBookingPolicy/>
      </Container>
    </div>
  )
}

export default RoomsOverView
