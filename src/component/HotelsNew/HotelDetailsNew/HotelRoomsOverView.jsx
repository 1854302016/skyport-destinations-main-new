import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Modal, Button  } from 'react-bootstrap'
import './HotelRoomsOverView.css';
import { Link } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";

const HotelRoomsOverView = ({ hotelData }) => {
     const [showModal, setShowModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
const [selectedRoom, setSelectedRoom] = useState(null);
  const handleShow = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // const amenitiesHotelList = JSON.parse(hotelData.HotelDetail.ameneties);
const amenitiesHotelList = Array.isArray(hotelData.HotelDetail.ameneties)
  ? hotelData.HotelDetail.ameneties
  : typeof hotelData.HotelDetail.ameneties === "string"
    ? [
        {
          group_name: "General",
          amenities: hotelData.HotelDetail.ameneties
            .split(",")
            .map((item) => item.trim()),
        },
      ]
    : [];

const lat = hotelData.HotelDetail.latitude;
const lng = hotelData.HotelDetail.longitude;
  
const navigate = useNavigate();

const getTaxBreakup = (room) => {
  const taxes = room?.Tax || [];

  const included = [];
  const payable = [];

  taxes.forEach((tax) => {
    if (tax.included_by_supplier) {
      included.push(tax);
    } else {
      payable.push(tax);
    }
  });

  return { included, payable };
};

const handleBookNowClick = (hotelId, bookingCode, room) => {
  console.log("Booking for hotel:", hotelId, "bookingCode:", bookingCode);

  localStorage.setItem("hotelId", hotelId);
  localStorage.setItem("bookingCode", bookingCode);
  localStorage.setItem("rooms", JSON.stringify(room));

  navigate("/hotelfinalbooking");
};

  return (
    <div className='hotel-RoomsOverViewMain'>
      <Container>
       
        <div className={isSticky ? 'hotel-RoomsOverViewMenu sticky' : 'hotel-RoomsOverViewMenu'}>
          <a href="#rooms-section" className='hotel-RoomsOverViewMenuItems'>Rooms</a>

          <a
            href="#overview-section"
            className='hotel-RoomsOverViewMenuItems'
            onClick={(e) => {
              if (window.innerWidth <= 600) {
                e.preventDefault();
                setShowOverview(true);
                setTimeout(() => {
                  document.getElementById('overview-section').scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }
            }}
          >
            Overview
          </a>

          <a
            href="#amenities-section"
            className='hotel-RoomsOverViewMenuItems'
            onClick={(e) => {
              if (window.innerWidth <= 600) {
                e.preventDefault();
                setShowAmenities(true);
                setTimeout(() => {
                  document.getElementById('amenities-section').scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }
            }}
          >
            Amenities
          </a>

          <a href="#location-section" className='hotel-RoomsOverViewMenuItems'>Location</a>
          <a href="#booking-policy-section" className='hotel-RoomsOverViewMenuItems booking-policy-link'>Booking Policy</a>
        </div>

        <div className='hotel-RoomsOverViewMenuFinalBooking'>
          <div className='hotel-RoomsOverViewRoomsBenefits'>
            <div>Room Type</div>
            <div>Benefits</div>
            <div>Per Night Price</div>
          </div>

          <div id='rooms-section'>
            {hotelData.rooms?.map((room, index) => {
                const { included, payable } = getTaxBreakup(room);
             return (   
                <Row className='hotel-finalRoomType-Row' key={index}>
                <Col className='hotel-finalRoomType-Col'>
                  <div className="hotel-finalRoomType">{room.Name}</div>
                 {/* <div><img src="/Images/Images/hotelroom.jpg" alt="" className='hotel-finalRoomTypeImg' /></div> */}
                 {/* <div className='hotel-finalRoomType-Btn'>Double</div> */}
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                  {room.MealType && room.MealType.toLowerCase() !== "nomeal" && (
                      <div className="hotel-room-meal">
                        {room.MealType.charAt(0).toUpperCase() + room.MealType.slice(1)}
                      </div>
                    )}
                  <div className="hotel-RoomsOverViewMain">
                    {/* <div className="hotel-RoomsOnly-Item">
                      <TiTickOutline className="hotel-RoomsOnly-Icons" />
                      <span>{room.Inclusion}</span>
                    </div> */}
                    {  room.amenities_data.map((inclusion, index) => (
                      <div key={index} className="hotel-RoomsOnly-Item">
                        <TiTickOutline className="hotel-RoomsOnly-Icons" />
                        <span>{inclusion.trim()}</span>
                      </div>
                    ))  }
                    
                    <Button variant="danger" size="sm" onClick={() => handleShow(room)}>
                      View Policy
                    </Button>
                  </div>
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                  <div className="hoteRoom-UsageCharges">
                    <div className='real-pricing'>$ {Math.round(room.TotalFare)}</div>
                    <div className='hotel-taxesFees'>+ $ {Math.round(room.TotalTax)} Taxes & fees</div>
                  
                    {/* ✅ Included Taxes */}
                        {included.length > 0 && (
                          <div className="hotel-tax-section" style={{ marginTop: "8px" }}>
                            <strong>Included in price:</strong>
                            {included.map((tax, i) => (
                              <div key={i} style={{ fontSize: "12px", color: "green" }}>
                                {tax.name.replace("_", " ")} - {tax.amount} {tax.currency_code} (Already included)
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ✅ Payable Taxes */}
                        {payable.length > 0 && (
                          <div className="hotel-tax-section" style={{ marginTop: "8px" }}>
                            <strong>Payable at hotel:</strong>
                            {payable.map((tax, i) => (
                              <div key={i} style={{ fontSize: "12px", color: "red" }}>
                                {tax.name.replace("_", " ")} - {tax.amount} {tax.currency_code}
                              </div>
                            ))}
                          </div>
                        )}
                  </div>
                 
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                    <button
                      className="hotel-RoomsOnly-ItemBookNowBtn"
                      onClick={() => handleBookNowClick(hotelData.HotelDetail.hotel_id, room.book_hash, room)}
                    >
                      Book Now
                    </button>
                  </Col>

              </Row>
               ); 
            })}
          </div>
        </div>
    

      <div className='hotel-RoomOverView-Description'>
        
          <div
            id="overview-section"
            className='hotel-Rooms-Des'
            style={{ display: window.innerWidth > 600 || showOverview ? 'block' : 'none' }}
          >
            <div className="hotelListingstyling-name hotelListingstylingDetail-name">
              {hotelData.HotelDetail.name}
               <div className="rating-score" style={{ textAlign: 'center', fontSize: '18px' }}>
                      {[...Array(5)].map((_, index) => (
                        <span key={index} style={{ color: index < Number(hotelData.HotelDetail.star_rating) ? '#FFD700' : '#ccc',}}>★</span>))}
                        </div>
            </div>
            <div className="hotel-Address">
              <CiLocationOn /> <span>{hotelData.HotelDetail.address}</span>
            </div>
            { /* <div className='hotel-Rooms-Des-Below'>Hotel Description</div>
             Array.isArray(hotelData.HotelDetailnew.data.description_struct) &&
              hotelData.HotelDetailnew.data.description_struct.map((section, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  
                
                  <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                    {section.title}
                  </h4>

             
                  {section.paragraphs.map((para, i) => (
                    <p key={i} style={{ fontSize: "14px", marginTop: "5px" }}>
                      {para}
                    </p>
                  ))}

                </div>
            )) */ }
          </div>

          <div
            id="amenities-section"
            className='hotel-Rooms-Des hotel-Rooms-BookingAmeni'
            style={{ display: window.innerWidth > 600 || showAmenities ? 'block' : 'none' }}
          >
            <div className='hotel-Rooms-Ameni-Below'>Amenities</div>
           <div className="hotel-amenities-lists">
              {amenitiesHotelList.map((group, groupIdx) => (
                <div key={groupIdx} style={{ marginBottom: "10px" }}>
                  {/* Optional: group name */}
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{group.group_name}</div>
                  {group.amenities.map((amenity, idx) => (
                    <div key={idx} className="free_amenitiesList">
                      <TiTickOutline className="hotel-RoomsOnly-Icons" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div id="location-section" className='hotel-Rooms-Des hotel-Rooms-BookingLocation'>
  <div className='hotel-Rooms-Ameni-Below'>Location</div>
  <div>
    <iframe
      src={`https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

          
        
      </div>
      </Container>
      
      {/* Modal for showing policies */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Room Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && selectedRoom.policy && selectedRoom.policy.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Policy Detail</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedRoom.policy.map((p, i) => (
                  <tr key={i}>
                    <td>{p.policy_detail || "-"}</td>
                    <td>{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No policy available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelRoomsOverView;
