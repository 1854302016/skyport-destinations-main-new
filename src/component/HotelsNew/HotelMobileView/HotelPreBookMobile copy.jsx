import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelPreBookMobile.css";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HotelPromoCodes from "../HotelPreBooking/HotelPromoCodes";
import { FaArrowLeft } from "react-icons/fa";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import HotelTechnicalError from "../HotelNotFound/HotelTechnicalError";
import HotelNotFound from "../HotelNotFound/HotelNotFound";
import HotelReviewPage from "../HotelPreBooking/HotelReviewPage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const HotelPreBookMobile = () => {
  const [hotelPreBookData, setPreBookData] = useState(null);
  const [hotelBookData, setHotelBookData] = useState(null);
  const [roomsConfig, setRoomsConfig] = useState([]);
  const [showGSTFields, setShowGSTFields] = useState(false);
  const [guestInfo, setGuestInfo] = useState([]);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gstCompanyName, setGstCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const storedConfig = localStorage.getItem("hotelRoomsConfig");
    if (storedConfig) {
      const parsed = JSON.parse(storedConfig);
      setRoomsConfig(parsed);

      const newGuestInfo = parsed.map((room) => {
        const passengers = [];
        for (let i = 0; i < (room.adults || 0); i++) {
          passengers.push({
            Title: "",
            FirstName: "",
            LastName: "",
            PaxType: 1,
            PAN: "",
            PassportNo: "",
            CompanyName: "",
            CorporateID: "",
            Errors: { FirstName: "", LastName: "", Title: "" },
          });
        }
        for (let i = 0; i < (room.children || 0); i++) {
          passengers.push({
            Title: "",
            FirstName: "",
            LastName: "",
            PaxType: 2,
            Errors: { FirstName: "", LastName: "", Title: "" },
          });
        }
        return { HotelPassenger: passengers };
      });

      setGuestInfo(newGuestInfo);
    }
  }, [location]);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const checkInDate = localStorage.getItem("hotelCin");
    const checkOutDate = localStorage.getItem("hotelCout");

    console.log("Check-in:", checkInDate);
    console.log("Check-out:", checkOutDate);

    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("hotelId");
    const storeBookingCode = localStorage.getItem("bookingCode");
    const storeBatchKey = localStorage.getItem("batchKey");
    const storedRoom = JSON.parse(localStorage.getItem("rooms"));

    const preBookRequestData = {
      hid: storedData,
      BookingCode: storeBookingCode,
      BatchKey: storeBatchKey,
      Rooms: storedRoom,
    };

    const fetchHotelPreBook = async () => {
      try {
        const response = await axios.post(
          "https://admin.trustedfare.com/api/Hotel/PreBook",
          preBookRequestData
        );

        console.log("Hotel PreBook:", response.data);

        if (response.data?.success === false) {
          // Check if message says "No Available rooms..."
          if (response.data?.message?.includes("No Available rooms")) {
            setNotFound(true);
          } else {
            setError(true);
          }
        } else {
          setPreBookData(response.data);
        }
      } catch (err) {
        console.error("API failed:", err);
        setError(true);
      }
    };

    fetchHotelPreBook();
  }, []);

  const handleGuestInputChange = (roomIndex, passengerIndex, field, value) => {
    setGuestInfo((prev) => {
      const updated = [...prev];
      const passenger = updated[roomIndex].HotelPassenger[passengerIndex];

      passenger[field] = value;

      // Inline validation
      if (field === "FirstName") {
        passenger.Errors.FirstName = value.trim()
          ? ""
          : "First Name is required";
      }
      if (field === "LastName") {
        passenger.Errors.LastName = value.trim() ? "" : "Last Name is required";
      }
      if (field === "Title") {
        passenger.Errors.Title = value.trim() ? "" : "Title is required";
      }

      return updated;
    });
  };

  const handleGSTCheckboxChange = () => {
    setShowGSTFields(!showGSTFields);
  };

  const navigate = useNavigate();

  const handleHotelBookNow = async (bookingId) => {
    localStorage.setItem("bookingId", bookingId);

    setLoading(true);

    let hasError = false;

    // Validate all guest inputs
    const updatedGuestInfo = [...guestInfo].map((room) => {
      const updatedPassengers = room.HotelPassenger.map((passenger) => {
        const updatedPassenger = { ...passenger };

        if (!passenger.Title?.trim()) {
          updatedPassenger.Errors.Title = "Title is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.Title = "";
        }

        if (!passenger.FirstName?.trim()) {
          updatedPassenger.Errors.FirstName = "First Name is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.FirstName = "";
        }

        if (!passenger.LastName?.trim()) {
          updatedPassenger.Errors.LastName = "Last Name is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.LastName = "";
        }

        return updatedPassenger;
      });

      return { HotelPassenger: updatedPassengers };
    });

    setGuestInfo(updatedGuestInfo);

    if (!contactNumber.trim()) {
      alert("Contact number is required");
      hasError = true;
    }
    if (!email.trim()) {
      alert("Email is required");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const hotelCode = localStorage.getItem("hotelId");
    const bookingCode = localStorage.getItem("bookingCode");
    const batchKey = localStorage.getItem("batchKey");
    const netAmount =
      hotelPreBookData?.data?.HotelResult[0].Rooms[0]?.TotalFare || 0;
    const cityCode = hotelPreBookData?.data?.HotelDetail?.city_code || "";

    const hotelRoomsDetails = updatedGuestInfo.map((room) => {
      let foundLead = false;

      const HotelPassenger = room.HotelPassenger.map((passenger) => {
        const isAdult = passenger.PaxType === 1;
        const isLead = !foundLead && isAdult;
        if (isLead) foundLead = true;

        return {
          Title: passenger.Title,
          FirstName: passenger.FirstName,
          LastName: passenger.LastName,
          PaxType: passenger.PaxType,
          LeadPassenger: isLead,
          Age: passenger.PaxType === 2 ? passenger.Age || 0 : 0,
          Email: null,
          MiddleName: "",
          PassportNo: null,
          PassportIssueDate: null,
          PassportExpDate: null,
          Phoneno: null,
          PaxId: 0,
          GSTCompanyAddress: null,
          GSTCompanyContactNumber: null,
          GSTCompanyName: null,
          GSTNumber: null,
          GSTCompanyEmail: null,
          PAN: "",
        };
      });

      return { HotelPassenger };
    });

    // const requestData = {
    //   email: email,
    //   phone: contactNumber,
    //   BookingCode: bookingCode,
    //   NetAmount: Math.round(netAmount),
    //   HotelCode: hotelCode,
    //   BatchKey: batchKey,
    //   HotelRoomsDetails: hotelRoomsDetails,
    // };

    const requestData = {
      UserEmail: email,
      UserPhone: contactNumber,
      Type: "web",
      CheckIn: checkIn,
      CheckOut: checkOut,
      BookingCode: bookingCode,
      CityCode: cityCode,
      NetAmount: Math.round(netAmount),
      HotelCode: hotelCode,
      BatchKey: batchKey,
      HotelRoomsDetails: hotelRoomsDetails,
    };

    console.log(
      "City Code from HotelDetail:",
      hotelPreBookData?.data?.HotelDetail?.city_code
    );

    try {
      const response = await axios.post(
        "https://admin.trustedfare.com/api/Hotel/Book",
        requestData
      );
      setHotelBookData(response.data);
      localStorage.setItem(
        "BookingID",
        response.data.data.BookResult.BookingId
      );
      console.log("Hotel Booked:", response.data);
      if (response.data && response.data.success === false) {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Hotel Booking Failed:", err);
    } finally {
      setLoading(false);
      navigate("/hotelvoucher");
    }
  };
  const ValidationInfo = hotelPreBookData?.data?.ValidationInfo || {};

  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [savedGuests, setSavedGuests] = useState([]);

  const [guestForm, setGuestForm] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    isChild: false,
  });

  const handleInputChange = (field, value) => {
    setGuestForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveGuest = () => {
    if (editingIndex !== null) {
      // If editing, update
      const updatedGuests = [...savedGuests];
      updatedGuests[editingIndex] = guestForm;
      setSavedGuests(updatedGuests);
      setEditingIndex(null);
    } else {
      // If adding new
      setSavedGuests([...savedGuests, guestForm]);
    }
    // Reset
    setGuestForm({ title: "Mr", firstName: "", lastName: "", isChild: false });
    setShowAddGuest(false);
  };

  const handleEditGuest = (index) => {
    setGuestForm(savedGuests[index]);
    setEditingIndex(index);
    setShowAddGuest(true);
  };

  const handleDeleteGuest = (index) => {
    const updatedGuests = savedGuests.filter((_, i) => i !== index);
    setSavedGuests(updatedGuests);
  };

  return (
    <div>
      {error ? (
        <HotelTechnicalError />
      ) : notFound ? (
        <HotelNotFound />
      ) : hotelPreBookData ? (
        <>
          <div className="hotelPreBook" style={{ position: "relative" }}>
            <div
              className="hotelFinalBooking_MainBg"
              style={{ height: "150px" }}
            ></div>
            <div className="hotelFinalBooking_Main">
              <div className="hotelFinalBooking_Containers">
                <Container>
                  <div className="hotelPreBook-Mobile">
                    <div className="hotelPreBookMobile-wrapper">
                      <div className="hotelPreBookMobile-header">
                        <Link to="/hoteldetailmain">
                          <FaArrowLeft className="hotelback-icon" />
                        </Link>
                        <span className="hotelPreBookMobile-headerText">
                          Hotel Review & Traveller
                        </span>
                      </div>

                      <div className="hotelPreBookMobile-card">
                        <div className="hotelPreBookMobile-titleRow">
                          <div className="hotel-DetailMobile-hotelName">
                            <div className="hotelListingstyling-name hotelFinalBooking-name">
                              {hotelPreBookData?.data?.HotelDetail?.name}
                              <div
                                className="rating-score"
                                style={{
                                  textAlign: "center",
                                  fontSize: "18px",
                                }}
                              >
                                {[...Array(5)].map((_, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      color:
                                        index <
                                        Number(
                                          hotelPreBookData?.data?.HotelDetail
                                            ?.star_rating
                                        )
                                          ? "#FFD700"
                                          : "#ccc",
                                    }}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <div className="hotel-Address hotel-AddressMobile">
                                <CiLocationOn />{" "}
                                <span>
                                  {hotelPreBookData?.data?.HotelDetail?.address}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr className="hotelPreBookMobile-divider" />

                        <div className="hotelPreBookMobile-roomRow">
                          <div className="hotelPreBookMobile-roomInfo">
                            <h4 className="hotelPreBookMobile-roomTitle">
                              {hotelPreBookData?.data?.rooms[0]?.Name}
                            </h4>
                            <ul className="hotelPreBookMobile-roomList">
                              <li>Breakfast not included Welcome Drink</li>
                              <li>
                                10% Discount on Food & Soft Beverages…{" "}
                                <span className="hotelPreBookMobile-viewMore">
                                  View more
                                </span>
                              </li>
                            </ul>
                            <div className="hotelPreBookMobile-guestInfo">
                              <span>
                                <span style={{ fontWeight: "bold" }}>
                                  {(roomsConfig || []).reduce(
                                    (acc, r) =>
                                      acc +
                                      (r?.adults || 0) +
                                      (r?.children || 0),
                                    0
                                  )}
                                </span>{" "}
                                Guests
                              </span>{" "}
                              |{" "}
                              <span>
                                <span style={{ fontWeight: "bold" }}>
                                  {roomsConfig?.length || 0}
                                </span>{" "}
                                Rooms
                              </span>
                            </div>
                          </div>
                          <div className="hotelPreBookMobile-roomImage">
                            <img
                              src="/Images/Images/hotelroom.jpg"
                              alt="Room"
                            />
                          </div>
                        </div>

                        <div className="hotelPreBookMobile-dashedDivider"></div>

                        <h4 className="hotelPreBookMobile-sectionTitle">
                          Travel Dates and Guests
                        </h4>
                        {/* <p className="hotelPreBookMobile-travelDetails">1 Room • 2 Guests</p> */}

                        <div className="hotelPreBookMobile-dateBox">
                          <div className="hotelPreBookMobile-dateItem">
                            <p className="hotelPreBookMobile-dateLabel">
                              Check-In
                            </p>
                            <p className="hotelPreBookMobile-dateDay">
                              04 Jul 2025
                            </p>
                            <p className="hotelPreBookMobile-dateTime">
                              02:00 PM
                            </p>
                          </div>
                          <div className="hotelPreBookMobile-nightCircle">
                            1N
                          </div>
                          <div className="hotelPreBookMobile-dateItem">
                            <p className="hotelPreBookMobile-dateLabel">
                              Check-Out
                            </p>
                            <p className="hotelPreBookMobile-dateDay">
                              05 Jul 2025
                            </p>
                            <p className="hotelPreBookMobile-dateTime">
                              12:00 PM
                            </p>
                          </div>
                        </div>

                        <p className="hotelPreBookMobile-inclusionsLink">
                          Inclusions
                        </p>
                      </div>
                    </div>

                    {/* Price Breakup */}
                    <div className="hotelTravellerMobile-wrapper">
                      <div className="hotelPreBookMobile-priceCard">
                        <h4 className="hotelPreBookMobile-sectionTitle">
                          Price Breakup
                        </h4>
                        <p className="hotelPreBookMobile-priceSubtitle">
                          A detailed breakdown of costs associated with hotel
                        </p>
                        <hr className="hotelPreBookMobile-divider" />

                        {/* <div className="hotelPreBookMobile-priceRow">
                  <span>1 Room x 1 Night</span>
                  <span>₹4338</span>
                </div> */}
                        <div className="hotelPreBookMobile-priceRow">
                          <span>Base Fare -</span>
                          <span>
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.rooms?.[0]?.TotalFare || 0
                            )}
                          </span>
                        </div>
                        <div className="hotelPreBookMobile-priceRow">
                          <span>Taxes & Surcharges -</span>
                          <span>
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.rooms?.[0]?.TotalTax || 0
                            )}
                          </span>
                        </div>
                        <div className="hotelPreBookMobile-priceRow">
                          <span>Discount -</span>
                          <span>₹ 0</span>
                        </div>
                        <div className="hotelPreBookMobile-grandTotal">
                          <span>You Pay: -</span>
                          <span className="hotelPreBookMobile-grandTotalAmount">
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.HotelResult?.[0]
                                ?.Rooms?.[0]?.NetAmount || 0
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hotelTravellerMobile-wrapper">
                      <div className="hotelTravellerMobile-card">
                        <h4 className="hotelTravellerMobile-title">
                          Traveller Details
                        </h4>
                        <p className="hotelTravellerMobile-subtitle">
                          Enter your details as per your Aadhar Card
                        </p>

                        {/* Traveller Info */}
                        <div className="hotelTravellerMobile-row">
                          <div className="hotelTravellerMobile-inputGroup">
                            <label>Title</label>
                            <select>
                              <option>Mr</option>
                              <option>Mrs</option>
                              <option>Ms</option>
                            </select>
                          </div>
                          <div className="hotelTravellerMobile-inputGroup">
                            <label>First (& Middle Name if any)</label>
                            <input type="text" placeholder="Enter First Name" />
                          </div>
                        </div>

                        <div className="hotelTravellerMobile-inputGroup">
                          <label>Last Name</label>
                          <input type="text" placeholder="Enter Last Name" />
                        </div>

                        {/* Contact Info */}
                        <h4 className="hotelTravellerMobile-subsection">
                          Contact Information
                        </h4>

                        <div className="hotelTravellerMobile-inputGroup">
                          <label>Email Id</label>
                          <input
                            type="email"
                            placeholder="Please Enter Email Id"
                          />
                        </div>

                        <div className="hotelTravellerMobile-row">
                          <div className="hotelTravellerMobile-inputGroup">
                            <label>Mobile No</label>
                            <div className="hotelTravellerMobile-mobileRow">
                              <select>
                                <option>+91</option>
                                <option>+1</option>
                                <option>+44</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Please Enter Mobile No"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Add More Guest */}
                        <p
                          className="hotelTravellerMobile-addMore"
                          onClick={() => setShowAddGuest(true)}
                        >
                          {" "}
                          + Add More Guest{" "}
                        </p>

                        {/* Existing Saved Guests */}
                        {savedGuests.length > 0 && (
                          <div className="hotelTravellerMobile-savedGuests">
                            <h4>Saved Guests</h4>
                            {savedGuests.map((guest, index) => (
                              <div
                                key={index}
                                className="hotelTravellerMobile-savedGuestItem"
                              >
                                <input type="checkbox" />
                                {guest.title} {guest.firstName} {guest.lastName}{" "}
                                {}
                                <span
                                  className="hotelTravellerMobile-editIcon"
                                  onClick={() => handleEditGuest(index)}
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdEdit />
                                </span>
                                <span
                                  className="hotelTravellerMobile-deleteIcon"
                                  onClick={() => handleDeleteGuest(index)}
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdOutlineDeleteOutline />
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ADD GUEST FORM */}
                      {showAddGuest && (
                        <div className="hotelTravellerMobile-addGuest">
                          <h4>Add Guests</h4>
                          <p className="hotelTravellerMobile-warning">
                            Name should be same as in Government Id proof
                          </p>

                          <div className="hotelTravellerMobile-row">
                            <div className="hotelTravellerMobile-inputGroup">
                              <label>Title</label>
                              <select
                                value={guestForm.title}
                                onChange={(e) =>
                                  handleInputChange("title", e.target.value)
                                }
                              >
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                              </select>
                            </div>
                            <div className="hotelTravellerMobile-inputGroup">
                              <label>First Name</label>
                              <input
                                type="text"
                                placeholder="Enter First Name"
                                value={guestForm.firstName}
                                onChange={(e) =>
                                  handleInputChange("firstName", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="hotelTravellerMobile-inputGroup">
                            <label>Last Name</label>
                            <input
                              type="text"
                              placeholder="Enter Last Name"
                              value={guestForm.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                            />
                          </div>

                          <div className="hotelTravellerMobile-inputGroup">
                            <label>
                              <input
                                type="checkbox"
                                checked={guestForm.isChild}
                                onChange={(e) =>
                                  handleInputChange("isChild", e.target.checked)
                                }
                              />
                              Child Below 12 Years old
                            </label>
                          </div>

                          <button
                            onClick={handleSaveGuest}
                            className="hotelTravellerMobile-saveBtn"
                          >
                            Save Guest
                          </button>

                          {/* ✅ Moved the DONE BUTTON here inside the same block */}
                          <div className="hotelTravellerMobile-footer">
                            <button
                              className="hotelTravellerMobile-doneBtn"
                              onClick={() => setShowAddGuest(false)}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bottom Bar */}
                      <div className="hotelTravellerMobile-priceBar">
                        <div>
                          <div className="hotelPreBookMobile-guestInfo">
                            <span>
                              <span style={{ fontWeight: "bold" }}>
                                {(roomsConfig || []).reduce(
                                  (acc, r) =>
                                    acc + (r?.adults || 0) + (r?.children || 0),
                                  0
                                )}
                              </span>{" "}
                              Guests
                            </span>{" "}
                            |{" "}
                            <span>
                              <span style={{ fontWeight: "bold" }}>
                                {roomsConfig?.length || 0}
                              </span>{" "}
                              Rooms
                            </span>
                          </div>
                          <strong style={{ color: "#878787" }}>
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.HotelResult[0]?.Rooms[0]
                                ?.NetAmount
                            )}
                          </strong>
                        </div>
                        <button onClick={handleHotelBookNow}>Continue</button>
                      </div>
                    </div>

                    <HotelPromoCodes />
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {showReviewModal && (
            <HotelReviewPage
              setReviewModal={setShowReviewModal}
              handleConfirmClick={() => {
                setShowReviewModal(false);
                handleHotelBookNow();
              }}
              formData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 1)
              )}
              childData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 2)
              )}
            />
          )}
        </>
      ) : (
        <FlightListSkeleton />
      )}
    </div>
  );
};

export default HotelPreBookMobile;
