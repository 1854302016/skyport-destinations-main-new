import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./HotelDetailMain.css";
import { Container, Row, Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import { FaUserFriends } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { FaPumpSoap } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";


import HotelRoomsOverView from "./HotelRoomsOverView";
import HotelImagesGallery from "./HotelImagesGallery";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import { BASE_URL } from "../../../config";

const HotelDetailMain = () => {

    const getGuestRoomDisplay = (paxString) => {
  if (!paxString) return "";

  const rooms = paxString.split("?");
  const totalRooms = rooms.length;

  let totalGuests = 0;

  rooms.forEach((room) => {
    const [adults, children] = room.split("_").map(Number);
    totalGuests += adults + children;
  });

  return `${totalGuests} Guest${totalGuests > 1 ? "s" : ""} | ${totalRooms} Room${totalRooms > 1 ? "s" : ""}`;
};

  
   const[showGallary, setShowGallery] = useState(false);
   const [hotelDetails, setHotelDetails] = useState('');
   const [hotelData, setHotelData] = useState(null);
  const navigate = useNavigate()
   
   const handleOpenGallery = () => {
     setShowGallery(true);
   };
  //  const storedData = localStorage.getItem('hotelId');
// const storedRoom = JSON.parse(localStorage.getItem("rooms"));
useEffect(() => {
  const storeBatchKey = localStorage.getItem('batchKey');
  const storedData = localStorage.getItem('hotelId');
  const storedRoom = JSON.parse(localStorage.getItem("payload"));

      const requestData = {
        hid: storedData,
        BatchKey: storeBatchKey,
        payload:storedRoom
    };
   


    // console.log("requestData",requestData) 

const fetchHotelDetails = async () => {
  const response = await axios.post(`${BASE_URL}Hotel/HotelDetail`, requestData);
    setHotelData(response.data.data); 
    // setHotelDetails(response.data.data.rooms); 
  console.log("response data", response.data.data);
};
  fetchHotelDetails();
}, []);

const amenityIcons = {
  "Couple Friendly": <FaUserFriends />,
  "Free Wifi": <FaWifi />,
  "24-hour reception": <Ri24HoursFill />,
  "Breakfast": <IoRestaurant />,
  "Gym": <CgGym />,
  
};
const formatRoomTiming = (checkIn, checkOut) => {
  const [inH, inM] = checkIn.split(":").map(Number);
  const [outH, outM] = checkOut.split(":").map(Number);

  const dateIn = new Date();
  dateIn.setHours(inH, inM, 0);

  const dateOut = new Date();
  dateOut.setHours(outH, outM, 0);

  // Handle overnight check-out
  if (dateOut <= dateIn) dateOut.setDate(dateOut.getDate() + 1);

  const durationHrs = Math.round((dateOut - dateIn) / (1000 * 60 * 60));

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;
  };

  return `Day Use Room ${durationHrs}Hrs (Check In ${formatTime(dateIn)} - Check Out ${formatTime(dateOut)}) (${durationHrs} Hours stay between ${formatTime(dateIn)} to ${formatTime(dateOut)})`;
};

  return (
    <div className='hotelmodifysearch-Main'>
    

   {hotelData && hotelData.rooms && hotelData.rooms.length > 0 ? (

    <div style={{position:'relative'}}>  
      <Container>
        <div className="hotel-detailMain">
          <div className="hotel-detailSubMain">
            <div className="hotel-detailHeading">
              <div >
                <div className="hotelListingstyling-name hotelListingstylingDetail-name">
                  {/* Hotel Name{" "} */}
                  {hotelData.HotelDetail.name}
                  {/* {item.Rooms[0].MealType} */}
                  <div className="rating-score" style={{ textAlign: 'center', fontSize: '18px' }}>
                      {[...Array(5)].map((_, index) => (
                        <span key={index} style={{ color: index < Number(hotelData.HotelDetail.star_rating) ? '#FFD700' : '#ccc',}}>★</span>))}
                        </div>
                </div>
                 
                <div className="hotel-Address">
                  <CiLocationOn /> <span>{hotelData.HotelDetail.address}</span>
                </div>
              </div>
                <div className="hotel-numberic-rating hotelDetail-ratings">
                         
                          <div  className="rating-score rating-score-inNum">{hotelData.HotelDetail.star_rating}</div>
                     
                        </div>
            </div>
            <div className="hotelSilder_totalFare">
              <div className="hotel-ColbigSilder">
                <div className="hotel-bigSilder">
                   <Carousel>
                    {hotelData.HotelDetail.images.map((img, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                className="d-block w-100"
                                src={img.replace("{size}", "1024x768")}
                                alt={`Slide ${idx + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>

            <div className="carousel-belowImag">
               {hotelData.HotelDetail.images.slice(0, 5).map((img, idx) => {
                    // Check if this is the last visible thumbnail
                    const isLast = idx === 4 && hotelData.HotelDetail.images.length > 5;
                    return (
                      <div
                        key={idx}
                        className={isLast ? "carouselImage-container" : undefined}
                        onClick={isLast ? handleOpenGallery : undefined}
                        style={isLast ? { cursor: "pointer" } : {}}
                      >
                        <img
                          src={img.replace("{size}", "120x120")}
                          alt={`Thumbnail ${idx + 1}`}
                          className="carousel-smallImages"
                        />
                        {isLast && (
                          <div className="carouselImageOverlay-full">
                            <div className="carouselImageOverlay-text">
                              +{hotelData.HotelDetail.images.length - 5}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

        
            </div>
              </div>
              <div className="hotel-ColtotalFare">
                <div className="hotel-totalFare">
                    <div style={{display:'block'}}>
                    <div className="hoteRoom-Usage">{formatRoomTiming(hotelData.HotelDetail.check_in_time, hotelData.HotelDetail.check_out_time)}</div>
                    {/* <div className="hotel-Guests_Room">{hotelData.pax} x Guest | 1 x Room</div> */}
                    {/* <div className="hotel-Guests_Room">{getGuestRoomDisplay(hotelData.pax)}</div>*/}

                     </div> 
                    <div className="hoteRoom-UsageCharges">
                    
                    <div className='real-pricing'>$ {Math.round(hotelData.rooms[0].TotalFare)}</div>
                    <div className='hotel-taxesFees'>+ $ {Math.round(hotelData.rooms[0].TotalTax)} Taxes & fees</div>
                    <div className='hotel-taxesFees' style={{color:"#737373"}}>Base price (Per Night)</div>
                    </div>
                </div>
                    
       {hotelData.HotelDetail.ameneties && hotelData.HotelDetail.ameneties.length > 0 && (
  <div className="hotel-amenities" style={{ flexWrap: 'wrap' }}>
    {hotelData.HotelDetail.ameneties.map((group, groupIdx) =>
      group.amenities.map((amenity, idx) => (
        <div key={`${groupIdx}-${idx}`} className="free_amenities">
          {amenityIcons[amenity] || ''} {/* Only show icon if mapped */}
          {amenity}
        </div>
      ))
    )}
  </div>
)}
        {/* <button className="hotel-BookNowBtn">Book Now</button> */}
              </div>
              
            </div>
          </div>
        </div>
        
      </Container>
      <HotelImagesGallery setShowGallery={setShowGallery} showGallary={showGallary} images={hotelData.HotelDetail.images} />
        <HotelRoomsOverView hotelData={hotelData}/>
    </div>
    ) : (
         <FlightListSkeleton />

    )}
     </div>
  );
};

export default HotelDetailMain;
