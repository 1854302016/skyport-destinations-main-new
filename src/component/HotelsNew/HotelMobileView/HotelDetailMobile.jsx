import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelDetailMobile.css";
import {
  FaArrowLeft,
  FaBed,
  FaUserFriends,
  FaWifi,
  FaPumpSoap,
  FaGym,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { Ri24HoursFill } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { Modal, Button } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const HotelDetailMobile = () => {
  const [roomsActiveTab, setRoomsActiveTab] = useState("Room");
  const [hotelData, setHotelData] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicyRoom, setSelectedPolicyRoom] = useState(null);

  const handleShowPolicy = (room) => {
    setSelectedPolicyRoom(room);
    setShowPolicyModal(true);
  };
  const handleClosePolicy = () => setShowPolicyModal(false);

  const amenityIcons = {
    "Couple Friendly": <FaUserFriends />,
    "Free Wifi": <FaWifi />,
    "24-hour reception": <Ri24HoursFill />,
    Breakfast: <IoRestaurant />,
    Gym: <CgGym />,
  };

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

  const formatRoomTiming = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "";
    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);

    const dateIn = new Date();
    dateIn.setHours(inH, inM, 0);

    const dateOut = new Date();
    dateOut.setHours(outH, outM, 0);

    if (dateOut <= dateIn) dateOut.setDate(dateOut.getDate() + 1);

    const durationHrs = Math.round((dateOut - dateIn) / (1000 * 60 * 60));

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;
    };

    return `Day Use Room ${durationHrs}Hrs (Check In ${formatTime(dateIn)} - Check Out ${formatTime(dateOut)})`;
  };

  useEffect(() => {
    const storeBatchKey = localStorage.getItem("batchKey");
    const storedData = localStorage.getItem("hotelId");
    const storedRoom = JSON.parse(localStorage.getItem("payload"));

    const requestData = {
      hid: storedData,
      BatchKey: storeBatchKey,
      payload: storedRoom,
    };

    const fetchHotelDetails = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}Hotel/HotelDetail`,
          requestData,
        );
        setHotelData(response.data.data);
        console.log("Mobile hotelData:", response.data.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelDetails();
  }, []);

  const navigate = useNavigate();
  const handleBookNowClick = (hotelId, bookingCode, room) => {
    localStorage.setItem("hotelId", hotelId);
    localStorage.setItem("bookingCode", bookingCode);
    localStorage.setItem("rooms", JSON.stringify(room));
    navigate("/hotelfinalbooking");
  };

  return (
    <div className="hotel-DetailMobile">
      <div className="hotel-DetailMobile-header">
        <div className="hotel-DetailMobile-hotelName">
          <Link to="/hotelmodify">
            <FaArrowLeft className="hotelback-icon" />
          </Link>
          <div className="hotelListingstyling-name">
            <div className="hotel-name-star-container">
              <div
                title={hotelData?.HotelDetail?.name}
                className="hotel-name-text"
              >
                {hotelData ? hotelData.HotelDetail.name : "Hotel Name"}
              </div>

              <div className="rating-score">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    style={{
                      color:
                        hotelData &&
                        index < Number(hotelData.HotelDetail.star_rating)
                          ? "#FFD700"
                          : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="hotel-Address hotel-AddressMobile">
              <CiLocationOn />
              <span title={hotelData?.HotelDetail?.address}>
                {hotelData ? hotelData.HotelDetail.address : "Address"}
              </span>
            </div>
          </div>
        </div>

        <div className="hotel-ColbigSilder">
          <div className="hotel-bigSilder">
            <Carousel>
              {hotelData?.HotelDetail?.images?.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={img.replace("{size}", "1024x768")}
                    alt={`Slide ${idx + 1}`}
                  />
                </Carousel.Item>
              ))}
              {!hotelData?.HotelDetail?.images?.length && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./Images/Images/hotel-bg.jpg"
                    alt="Default slide"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>
        </div>
        <div className="hotel-DetailMobile-roomsTabMain">
          <div className="hotel-DetailMobile-roomsTab">
            <div
              className={
                roomsActiveTab === "Room"
                  ? "hotel-tab hotel-tab-active"
                  : "hotel-tab"
              }
              onClick={() => setRoomsActiveTab("Room")}
            >
              Room
            </div>
            <div
              className={
                roomsActiveTab === "Overview"
                  ? "hotel-tab hotel-tab-active"
                  : "hotel-tab"
              }
              onClick={() => setRoomsActiveTab("Overview")}
            >
              Overview
            </div>
            <div
              className={
                roomsActiveTab === "Details"
                  ? "hotel-tab hotel-tab-active"
                  : "hotel-tab"
              }
              onClick={() => setRoomsActiveTab("Details")}
            >
              Details
            </div>
            {/* <div
              className={
                roomsActiveTab === "Location"
                  ? "hotel-tab hotel-tab-active"
                  : "hotel-tab"
              }
              onClick={() => setRoomsActiveTab("Location")}
            >
              Location
            </div> */}
          </div>

          {roomsActiveTab === "Room" &&
            hotelData &&
            hotelData.rooms?.map((room, index) => {
              const { included, payable } = getTaxBreakup(room);
              return (
                <div className="room-card" key={index}>
                  <div className="room-card-top">
                    {/* <img
                      src={
                        hotelData?.HotelDetail?.images?.[0]?.replace(
                          "{size}",
                          "300x200",
                        ) || "/Images/Images/hotelroom.jpg"
                      }
                      alt="Room"
                      className="room-image"
                    /> */}
                    <div className="room-info">
                      {/* <h4 className="room-title">
                        {room.Name || "Room Type"}
                      </h4> */}
                      <div className="room-bed">
                        <label className="hotel-radio-label">
                          <input
                            type="radio"
                            name="roomSelection"
                            className="custom-radio"
                            checked={selectedRoomIndex === index}
                            onChange={() => setSelectedRoomIndex(index)}
                          />
                          <span className="custom-radio-mark"></span>
                          {/* {room.MealType || "Room Only"} */}
                          {room?.Name || "Room Type"}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="room-card-bottom">
                    <div className="room-details">
                      <ul className="room-details-list">
                        <li>
                          <span className="green-text">
                            Booking is{" "}
                            {room.IsRefundable
                              ? "Refundable"
                              : "Non-Refundable"}
                          </span>
                        </li>
                        {room.amenities_data?.map((inclusion, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <TiTickOutline color="green" />
                            <span>{inclusion.trim()}</span>
                          </li>
                        ))}
                      </ul>
                      {/* <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleShowPolicy(room)}
                        style={{
                          padding: 0,
                          fontSize: "12px",
                          color: "#dc3545",
                          textDecoration: "none",
                        }}
                      >
                        View Policy
                      </Button> */}
                    </div>
                    <div className="room-price">
                      {/* <div className="strike-price">$ 7,521</div> */}
                      <div className="final-price">
                        $ {Math.round(room.TotalFare)}
                      </div>
                      <div className="tax-info">
                        +${Math.round(room.TotalTax)} Taxes & fees
                        <br />
                        Per night
                      </div>

                      {included.length > 0 && (
                        <div
                          style={{
                            fontSize: "10px",
                            color: "green",
                            marginTop: "5px",
                          }}
                        >
                          Incl: {included.map((t) => t.name).join(", ")}
                        </div>
                      )}
                      {payable.length > 0 && (
                        <div
                          style={{
                            fontSize: "10px",
                            color: "red",
                            marginTop: "2px",
                          }}
                        >
                          Pay at hotel:{" "}
                          {payable
                            .map(
                              (t) =>
                                `${t.name} (${t.amount} ${t.currency_code})`,
                            )
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {roomsActiveTab === "Overview" && (
            <div className="hotel-overview">
              <h3 className="hotel-overview-title">About the property</h3>
              <p className="hotel-overview-subtitle">
                <strong>{hotelData ? hotelData.HotelDetail.name : ""}</strong>
              </p>
              <div
                className="hotel-overview-timing"
                style={{
                  marginBottom: "15px",
                  color: "#3498db",
                  fontWeight: "500",
                }}
              >
                {hotelData &&
                  formatRoomTiming(
                    hotelData.HotelDetail.check_in_time,
                    hotelData.HotelDetail.check_out_time,
                  )}
              </div>
              <div
                className="hotel-overview-description"
                dangerouslySetInnerHTML={{
                  __html:
                    hotelData?.HotelDetail.description ||
                    "No description available.",
                }}
              />

              {hotelData?.HotelDetail?.ameneties &&
                hotelData.HotelDetail.ameneties.length > 0 && (
                  <div className="hotel-amenities-section">
                    <h3 className="hotel-overview-title">Amenities</h3>
                    <div
                      className="hotel-amenities-grid"
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {hotelData.HotelDetail.ameneties.map((group, groupIdx) =>
                        group.amenities.map((amenity, idx) => (
                          <div
                            key={`${groupIdx}-${idx}`}
                            className="hotel-amenity-item"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              background: "#f8f9fa",
                              padding: "5px 10px",
                              borderRadius: "20px",
                              fontSize: "13px",
                            }}
                          >
                            {amenityIcons[amenity] || ""}
                            {amenity}
                          </div>
                        )),
                      )}
                    </div>
                  </div>
                )}

              <div className="hotel-overview-highlights">
                <div className="hotel-overview-item">
                  <img
                    src="/Images/Images/safe.png"
                    alt="Hygiene Plus"
                    className="hotel-overview-icon"
                  />
                  <div>
                    <p className="hotel-overview-item-title">Hygiene Plus</p>
                    <p className="hotel-overview-item-desc">
                      This property has self-selected and self-certified
                    </p>
                  </div>
                </div>

                <div className="hotel-overview-item">
                  <img
                    src="/Images/Images/check-in-desk.png"
                    alt="Check-in/out"
                    className="hotel-overview-icon"
                  />
                  <div>
                    <p className="hotel-overview-item-title">Check-in/out</p>
                    <p className="hotel-overview-item-desc">
                      Hassle-free check in
                    </p>
                  </div>
                </div>

                <div className="hotel-overview-item">
                  <img
                    src="/Images/Images/doctor.png"
                    alt="Medical Support"
                    className="hotel-overview-icon"
                  />
                  <div>
                    <p className="hotel-overview-item-title">
                      Medical and Doctor Support
                    </p>
                    <p className="hotel-overview-item-desc">
                      Free medical support for emergencies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {roomsActiveTab === "Details" && (
            <div className="hotel-propertyRules">
              <h3 className="hotel-propertyRules-title">
                Property Rules & Information
              </h3>
              {/* <p className="hotel-propertyRules-subtitle">
              Check-In: 02:00 PM | Check-Out: 11:00 AM
            </p> */}
              <div className="hotel-propertyRules-box">
                <h4 className="hotel-propertyRules-heading">
                  General Restrictions
                </h4>
                <ul className="hotel-propertyRules-list">
                  <li>Passport and Aadhaar are accepted as ID proofs.</li>
                  <li>Outside food is not allowed.</li>
                  <li>Smoking within the premises is not allowed.</li>
                </ul>
              </div>
            </div>
          )}

          {roomsActiveTab === "Location" && hotelData && (
            <div className="hotel-location" style={{ padding: "15px" }}>
              <h3 className="hotel-overview-title">Location</h3>
              <p style={{ fontSize: "13px", marginBottom: "10px" }}>
                {hotelData.HotelDetail.address}
              </p>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #ddd",
                }}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${hotelData.HotelDetail.latitude},${hotelData.HotelDetail.longitude}&hl=en&z=14&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}

          <div className="hotel-detail-footer">
            <div className="footer-price-info">
              <div className="footer-price">
                ${" "}
                {hotelData
                  ? Math.round(hotelData.rooms[selectedRoomIndex].TotalFare)
                  : "0"}
              </div>
              <div className="footer-tax">
                +${" "}
                {hotelData
                  ? Math.round(hotelData.rooms[selectedRoomIndex].TotalTax)
                  : "0"}{" "}
                Taxes & fees
              </div>
              <div
                className="footer-guests"
                style={{ fontSize: "11px", color: "#666" }}
              >
                {hotelData && getGuestRoomDisplay(hotelData.pax)}
              </div>
            </div>
            <button
              className="footer-continue-btn"
              onClick={() =>
                handleBookNowClick(
                  hotelData?.HotelDetail?.hotel_id,
                  hotelData?.rooms[selectedRoomIndex]?.book_hash,
                  hotelData?.rooms[selectedRoomIndex],
                )
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <Modal
        show={showPolicyModal}
        onHide={handleClosePolicy}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }}>Room Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPolicyRoom &&
          selectedPolicyRoom.policy &&
          selectedPolicyRoom.policy.length > 0 ? (
            <div className="table-responsive">
              <table
                className="table table-bordered"
                style={{ fontSize: "13px" }}
              >
                <thead className="table-light">
                  <tr>
                    <th>Policy Detail</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPolicyRoom.policy.map((p, i) => (
                    <tr key={i}>
                      <td>{p.policy_detail || "-"}</td>
                      <td>$ {p.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No policy available
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClosePolicy}
            style={{ fontSize: "14px" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelDetailMobile;
