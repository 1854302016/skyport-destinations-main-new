import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelFinalBooking.css";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HotelPromoCodes from "./HotelPromoCodes";
import { FaArrowLeft } from "react-icons/fa";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import HotelTechnicalError from "../HotelNotFound/HotelTechnicalError";
import HotelNotFound from "../HotelNotFound/HotelNotFound";
import HotelSkeleton from "../HotelListing/HotelSkeleton";
import HotelReviewPage from "./HotelReviewPage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import HotelReviewPageMobile from "./HotelReviewPageMobile";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";

const HotelFinalBooking = () => {
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
  const [showReviewModalMobile, setShowReviewModalMobile] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updatedHash, setUpdatedHash] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [priceModal, setPriceModal] = useState(false);
  
  // Main traveller
  const [mainGuest, setMainGuest] = useState({
    title: "",
    firstName: "",
    lastName: "",
  });
  const [mobile, setMobile] = useState("");

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
          `${BASE_URL}Hotel/PreBook`,
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
    if (roomIndex === 0 && passengerIndex === 0) {
        setMainGuest((prev) => ({
          ...prev,
          firstName: field === "FirstName" ? value : prev.firstName,
          lastName: field === "LastName" ? value : prev.lastName,
          title: field === "Title" ? value : prev.title,
        }));
      }
  };

  const handleGSTCheckboxChange = () => {
    setShowGSTFields(!showGSTFields);
  };

  const navigate = useNavigate();

  const validateTravellerForm = () => {
    const newErrors = {};

    if (!mainGuest.firstName?.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!mainGuest.lastName?.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!mainGuest.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(mainGuest.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!mainGuest.mobile?.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mainGuest.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCancelBooking = () => {
      setPriceModal(false);
      localStorage.removeItem("BookingID");
    navigate("/hotel-search");
    };
  const handleContinueBooking = () => {

      const storedRoom = JSON.parse(localStorage.getItem("rooms") || "{}");

      storedRoom.book_hash = updatedHash;

      localStorage.setItem("rooms", JSON.stringify(storedRoom));

      setPriceModal(false);

      handleHotelBookNow(null, true); // call booking again
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

  const handleHotelBookNow = async (bookingId, forceBook = false) => { 
    /* if (!validateTravellerForm()) {
      return; // Stops if validation fails
    } */

    //localStorage.setItem("bookingId", bookingId);

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
        let newErrors = {};
    if (!contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (hasError) {
        setErrors(newErrors);
      setLoading(false);
      return;
    }
    const storedRoom = JSON.parse(localStorage.getItem("rooms"));
    const hotelCode = localStorage.getItem("hotelId");
    const bookingCode = localStorage.getItem("bookingCode");
    const batchKey = localStorage.getItem("batchKey");
    const payload = localStorage.getItem("payload");
    const netAmount =
      hotelPreBookData?.data?.rooms?.TotalFare || 0;
    const cityCode = hotelPreBookData?.data?.HotelDetail?.data?.region?.id || "";

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

    const requestData = {
      UserEmail: email,
      UserPhone: contactNumber,
      Type: "web",
      CheckIn: checkIn,
      CheckOut: checkOut,
      BookingCode: bookingCode,
      book_hash: storedRoom.book_hash,
      CityCode: cityCode,
      NetAmount: Math.round(netAmount),
      HotelCode: hotelCode,
      BatchKey: batchKey,
      HotelRoomsDetails: hotelRoomsDetails,
      hotelPreBookData: hotelPreBookData,
      searchdata: payload,
       force_book: forceBook
    };

  
     try {
          const response = await axios.post(
            `${BASE_URL}Hotel/Book`,
            requestData
          );
      
        if (response?.data?.price_changed){
            setNewPrice(response.data.new_price);
            setUpdatedHash(response.data.new_hash);

            setPriceModal(true);
            setLoading(false);
            return;
        }
         
         if (response.data.success === false) {
           alert(response.data.message);
           setLoading(false);
           return;
         }
            setHotelBookData(response.data);
              localStorage.setItem(
                "BookingID",
                response.data.data.BookingId
              );
                console.log("Hotel Booked:", response.data);
            setLoading(false);
          const checkouturl = response?.data?.data?.Response?.url;
            window.location.href = checkouturl;
      
    } catch (err) {
      console.error("Hotel Booking Failed:", err);
      setError(true);
       setLoading(false);
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

  const handleAddGuestClick = () => {
    setGuestForm({
      title: "",
      firstName: "",
      lastName: "",
      isChild: false,
    });
    setMobile("");
    setEmail("");
    setErrors({});
    setShowAddGuest(true);
  };
  const imageUrl = hotelPreBookData?.data?.HotelDetail?.data?.images?.[0]?.replace("{size}", "320x175");
    
    
    const handleShowPolicy = (room) => {
      setSelectedRoom(room);
      setShowPolicyModal(true);
    };

    const handleClosePolicy = () => {
      setShowPolicyModal(false);
      setSelectedRoom(null);
    };
    const formatText = (text) => {
  if (!text || text === "unspecified") return null;

  return String(text)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
  const PolicyItem = ({ title, data }) => {

  if (!data) return null;

  const entries = Object.entries(data).filter(
    ([key, value]) => value && value !== "unspecified"
  );

  if (!entries.length) return null;
  


  return (
    <div className="col-md-6 mb-4">
      <div className="policy-card">

        <h5 className="policy-title">{title}</h5>

        <div className="policy-list">
          {entries.map(([key, value]) => (
            <div key={key} className="policy-row">
              <span className="policy-key">
                {formatText(key)}
              </span>

              <span className="policy-value">
                {formatText(value) || value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
  const room = hotelPreBookData?.data?.rooms;
const { included, payable } = getTaxBreakup(room);
  return (
    <div>
     {loading && (
          <HotelSkeleton />
        )}
        
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
                  <Row>
                    <Col md={9}>
                      <div className="hotelFinalBooking_ReviewBooking">
                        <div className="hotelFinalBooking_reviewBook">
                          <Link to="/hoteldetailsmain">
                            <span style={{ color: "white" }}>
                              <FaChevronLeft />
                            </span>
                          </Link>
                          <h3>Review Your Booking</h3>
                        </div>
                        <div className="hotelFinalBooking_reviewBook" onClick={() => handleShowPolicy( hotelPreBookData?.data?.rooms)}  // pass room data
  style={{ cursor: "pointer" }}>
                          <span>
                            <BsInfoCircleFill />
                          </span>
                          <h4>Fare Rules</h4>
                        </div>
                      </div>

                      <div className="hotelFinalBooking_hotelDetails">
                        <div className="hotelFinalBooking_hotelNameAdd">
                          <div className="hotelListingstyling-name hotelFinalBooking-name">
                            {hotelPreBookData?.data?.HotelDetail?.data?.name}
                            <div
                              className="rating-score"
                              style={{ textAlign: "center", fontSize: "18px" }}
                            >
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  style={{
                                    color:
                                      index <
                                      Number(
                                        hotelPreBookData?.data?.HotelDetail?.data
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
                          </div>
                          <div className="hotel-Address">
                            <CiLocationOn />{" "}
                            <span>
                              {hotelPreBookData?.data?.HotelDetail?.data?.address}
                            </span>
                          </div>
                        </div>

                        <Row className="hotelFinalBooking_rowCols">
                          <Col md={4} className="hotelFinalBooking_Col1">
                            <img src={imageUrl} alt="" />
                          </Col>
                          <Col md={8} className="hotelFinalBooking_Col2">
                            <div className="hotelFinalBooking_CheckinDetails">
                              <div className="hotelFinalBooking_checkIn">
                                <h6>CHECK-IN </h6>
                                <h3>
                                  {checkIn
                                    ? new Date(checkIn).toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : ""}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "80px",
                                  height: "2px",
                                  backgroundColor: "black",
                                }}
                              ></div>
                              <div className="hotelFinalBooking_checkOut">
                                <h6>CHECK-OUT</h6>
                                <h3>
                                  {checkOut
                                    ? new Date(checkOut).toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : ""}
                                </h3>
                              </div>

                              <Link to="/hoteldetailsmain">
                                <div className="hotelFinalBooking_changeRoom">
                                  CHANGE ROOM
                                </div>
                              </Link>
                            </div>

                            <div className="hotelFinalBooking_roomsGuests">
                              <h6>ROOMS & GUESTS</h6>
                              <h6>
                                <span style={{ fontWeight: "bold" }}>
                                  {roomsConfig.length}
                                </span>{" "}
                                <span className="hotelFinalBooking_roomsGuests_Span">
                                  Rooms
                                </span>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {roomsConfig.reduce(
                                    (acc, r) =>
                                      acc + (r.adults || 0) + (r.children || 0),
                                    0
                                  )}
                                </span>{" "}
                                <span className="hotelFinalBooking_roomsGuests_Span">
                                  Guests
                                </span>
                              </h6>
                            </div>
                          </Col>
                        </Row>

                        <div className="hotelFinalBooking_roomType">
                          <h6>{hotelPreBookData?.data?.rooms?.Name}</h6>
                          <div>
                            {/* <span style={{ fontWeight: "bold" }}>1</span> Room */}
                            <span style={{ fontWeight: "bold" }}>
                              {roomsConfig.length}
                            </span>{" "}
                            <span className="hotelFinalBooking_roomsGuests_Span">
                              Rooms
                            </span>{" "}
                          </div>

                         
                        </div>
                        <div className="hotelFinalBooking_roomType">
                           
                           
                        </div>
                      </div>
                         
                      <div className="traveller_info hotelFinalBooking_guestInfo">
                        <h4>Guest Information</h4>

                        {roomsConfig.map((room, roomIndex) => (
                          <React.Fragment key={roomIndex}>
                            <Row>
                              <Col
                                sm={2}
                                className="hotelFinalBooking_guestRoomsCol"
                              >
                                <label className="hotelFinalBooking_guestLabel hotelFinalBooking_guestRooms">
                                  Room {roomIndex + 1}
                                </label>
                              </Col>
                            </Row>

                            {[...Array(room.adults || 0)].map(
                              (_, adultIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-adult${adultIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Adult {adultIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className={`form-control hotelFinalBooking_input ${
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.Title
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                adultIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                          </select>
                                          {guestInfo[roomIndex].HotelPassenger[
                                            adultIndex
                                          ].Errors.Title && (
                                            <div className="invalid-feedback">
                                              {
                                                guestInfo[roomIndex]
                                                  .HotelPassenger[adultIndex]
                                                  .Errors.Title
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.FirstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.FirstName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.FirstName
                                            }
                                          </div>
                                        )}
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.LastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.LastName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.LastName
                                            }
                                          </div>
                                        )}
                                      </Col>

                                      {ValidationInfo?.PanMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="PAN Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {ValidationInfo?.PassportMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="Passport Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}

                            {[...Array(room.children || 0)].map(
                              (_, childIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-child${childIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Child {childIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className="form-control hotelFinalBooking_input"
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[
                                                (room.adults || 0) + childIndex
                                              ].Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                (room.adults || 0) + childIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Master">
                                              Master
                                            </option>
                                            <option value="Miss">Miss</option>
                                          </select>
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}
                          </React.Fragment>
                        ))}

                        <Row>
                          <Col sm={2}></Col>
                          <Col
                            sm={10}
                            className="hotelFinalBooking_inputRowCol"
                          >
                            <div
                              className="hotelFinalBooking_bookingDetailsForm"
                              id="contactDetails"
                            >
                              <p className="hotelFinalBooking_font14 hotelFinalBooking_bold appendBottom15">
                                Booking details will be sent to
                              </p>
                            </div>

                            <Row className="hotelFinalBooking_adultItemRow">
                              <Col
                                sm={2}
                                xs={4}
                                className="hotelFinalBooking_inputRowCol"
                              >
                                <div className="hotelFinalBooking_adultItem">
                                  <div className="hotelFinalBooking_selectItem">
                                    <select className="form-control hotelFinalBooking_input">
                                      <option>India (+91)</option>
                                      <option>United States (+1)</option>
                                      <option>United Kingdom (+44)</option>
                                    </select>
                                  </div>
                                </div>
                              </Col>

                              <Col
                                sm={5}
                                xs={8}
                                className="hotelFinalBooking_inputRowCol"
                              >
                                <div className="hotelFinalBooking_adultItem">
                                  <input
                                     className={`form-control hotelFinalBooking_input ${
    errors.contactNumber ? "is-invalid" : ""
  }`}
                                    type="text"
                                    placeholder="Contact No"
                                    value={contactNumber}
                                   onChange={(e) => {
    setContactNumber(e.target.value);
    if (errors.contactNumber) {
      setErrors((prev) => ({ ...prev, contactNumber: "" }));
    }
  }}
                                  />
                                  {errors.contactNumber && (
  <div className="invalid-feedback">{errors.contactNumber}</div>
)}
                                </div>
                              </Col>

                              <Col sm={5} xs={12}>
                                <div className="hotelFinalBooking_adultItem">
                                  <input
                                     className={`form-control hotelFinalBooking_input ${
    errors.email ? "is-invalid" : ""
  }`}
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                     onChange={(e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }}
                                  />
                                  {errors.email && (
  <div className="invalid-feedback">{errors.email}</div>
)}
                                </div>
                              </Col>
                            </Row>
                            {/* <Col  className="hotelFinalBooking_inputRowCol">
                                    <input type="text" placeholder="PanMandatory" className="form-control hotelFinalBooking_input" autoComplete="off" />
                                  </Col> */}

                            <div className="hotelFinalBooking_gstSection">
                              <label className="hotelFinalBooking_checkboxContainer">
                                <input
                                  type="checkbox"
                                  checked={showGSTFields}
                                  onChange={handleGSTCheckboxChange}
                                />
                                <span className="hotelFinalBooking_checkboxLabel">
                                  <span className="hotelFinalBooking_boldFont">
                                    I have a GST number{" "}
                                    <span style={{ color: "#9b9b9b" }}>
                                      (Optional)
                                    </span>
                                  </span>
                                </span>
                              </label>

                              {showGSTFields && (
                                <div className="hotelFinalBooking_gstFields">
                                  <Row className="hotelFinalBooking_adultItemRow">
                                    <Col sm={6}>
                                      <label className="hotelFinalBooking_label">
                                        Company Name
                                      </label>
                                      <input
                                        className="form-control hotelFinalBooking_input"
                                        type="text"
                                        placeholder="Company Name"
                                      />
                                    </Col>
                                    <Col
                                      sm={6}
                                      className="hotelFinalBooking_inputRowCol"
                                    >
                                      <label className="hotelFinalBooking_label">
                                        GST No
                                      </label>
                                      <input
                                        className="form-control hotelFinalBooking_input"
                                        type="text"
                                        placeholder="GST No"
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              )}
                            </div>
                            
                          </Col>
                        </Row>
                        
                      </div>
                      <div className="important_info">
                          <h4>Important Information</h4>
                           <p>{hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_extra_info}</p>
                           
                           <div className="row">

<PolicyItem title="Visa Information" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.visa} />

<PolicyItem title="No Show Policy" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.no_show} />

<PolicyItem title="Internet" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.internet?.[0]} />

<PolicyItem title="Parking" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.parking?.[0]} />

<PolicyItem title="Pets" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.pets?.[0]} />

<PolicyItem title="Meals" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.meal?.[0]} />

<PolicyItem title="Extra Bed" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.extra_bed?.[0]} />

<PolicyItem title="Children Policy" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.children?.[0]} />

<PolicyItem title="Deposit" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.deposit?.[0]} />

<PolicyItem title="Cot" data={hotelPreBookData?.data?.HotelDetail?.data?.metapolicy_struct?.cot?.[0]} />

</div>
                         </div>
                    </Col>

                    <Col md={3}>
                      <div className="hotelFinalBooking_priceSummary">
                        <div className="hotelFinalBooking_fareSummary">
                          <div>Fare Summary</div>
                          <div>Guests</div>
                        </div>
                        <div className="hotelFinalBooking_BasefareSummary">
                          <div>Base Fare -</div>
                          <div>
                            ${" "}
                            {Math.round(
                              hotelPreBookData?.data?.rooms?.TotalFare
                            )}
                          </div>
                        </div>
                       {/* ✅ Included Taxes */}
                    {included.length > 0 && (
                      <div style={{ marginTop: "8px", fontSize: "12px", padding: "8px 12px" }}>
                        <strong>Included in price:</strong>
                        {included.map((tax, i) => (
                          <div key={i} style={{ color: "green" }}>
                            {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ✅ Payable Taxes */}
                    {payable.length > 0 && (
                      <div style={{ marginTop: "8px", fontSize: "12px", padding: "8px 12px"  }}>
                        <strong>Pay at hotel:</strong>
                        {payable.map((tax, i) => (
                          <div key={i} style={{ color: "red" }}>
                            {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
                          </div>
                        ))}
                      </div>
                    )}
                        <div className="hotelFinalBooking_BasefareSummary">
                          <div>Discount -</div>
                          <div>$0</div>
                        </div>
                        <div className="hotelFinalBooking_PayAmt">
                          <div>You Pay: -</div>
                          <div>
                            $
                            {Math.round(
                              hotelPreBookData?.data?.rooms
                                ?.TotalFare
                            )}
                          </div>
                        </div>
                        {/* <button onClick={handleHotelBookNow} className="hotelFinalBooking_continueBtn">Continue</button> */}
                        <button
                          onClick={() => {
                            if (validateTravellerForm()) {
                              setShowReviewModal(true);
                            } else {
                              toast.error("Please fill all required contact details");
                              const element = document.getElementById("contactDetails");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                          className="hotelFinalBooking_continueBtn"
                        >
                          Continue
                        </button>
                      </div>
                      <div>
                        {/* <HotelPromoCodes /> */}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
          
          

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
                      {hotelPreBookData?.data?.HotelDetail?.data?.name}
                      <div
                        className="rating-score"
                        style={{ textAlign: "center", fontSize: "18px" }}
                      >
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            style={{
                              color:
                                index <
                                Number(
                                  hotelPreBookData?.data?.HotelDetail
                                    ?.data?.star_rating
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
                          {hotelPreBookData?.data?.HotelDetail?.data?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="hotelPreBookMobile-divider" />

                <div className="hotelPreBookMobile-roomRow">
                  <div className="hotelPreBookMobile-roomInfo">
                    <h4 className="hotelPreBookMobile-roomTitle">
                      {hotelPreBookData?.data?.rooms?.Name}
                    </h4>
                    <ul className="hotelPreBookMobile-roomList">
                      <li>{hotelPreBookData?.data?.rooms?.MealType}</li>
                      
                    </ul>
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
                  </div>
                  <div className="hotelPreBookMobile-roomImage">
                    <img src={imageUrl} alt="Room" />
                  </div>
                </div>

                <div className="hotelPreBookMobile-dashedDivider"></div>

                <h4 className="hotelPreBookMobile-sectionTitle">
                  Travel Dates and Guests
                </h4>

                <div className="hotelPreBookMobile-dateBox">
                  <div className="hotelPreBookMobile-dateItem">
                    <p className="hotelPreBookMobile-dateLabel">Check-In</p>
                    <p className="hotelPreBookMobile-dateDay">
                      {checkIn
                        ? new Date(checkIn).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                  <div className="hotelPreBookMobile-nightCircle">1N</div>
                  <div className="hotelPreBookMobile-dateItem">
                    <p className="hotelPreBookMobile-dateLabel">Check-Out</p>
                    <p className="hotelPreBookMobile-dateDay">
                      {checkOut
                        ? new Date(checkOut).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    {/* <p className="hotelPreBookMobile-dateTime">12:00 PM</p> */}
                  </div>
                </div>

               
              </div>
            </div>

            <div className="hotelTravellerMobile-wrapper">
              <div className="hotelPreBookMobile-priceCard">
                <h4 className="hotelPreBookMobile-sectionTitle">
                  Price Breakup
                </h4>
                <p className="hotelPreBookMobile-priceSubtitle">
                  A detailed breakdown of costs associated with hotel
                </p>
                <hr className="hotelPreBookMobile-divider" />

                <div className="hotelPreBookMobile-priceRow">
                  <span>Base Fare -</span>
                  <span>
                    ${" "}
                    {Math.round(
                      hotelPreBookData?.data?.rooms?.TotalFare || 0
                    )}
                  </span>
                </div>
                <div className="hotelPreBookMobile-priceRow">
                  <span>Taxes & Surcharges -</span>
                  <span>
                    ${" "}
                    {Math.round(
                      hotelPreBookData?.data?.rooms?.TotalTax || 0
                    )}
                  </span>
                </div>
                <div className="hotelPreBookMobile-priceRow">
                  <span>Discount -</span>
                  <span>$ 0</span>
                </div>
                <div className="hotelPreBookMobile-grandTotal">
                  <span>You Pay: -</span>
                  <span className="hotelPreBookMobile-grandTotalAmount">
                    ${" "}
                    {Math.round(
                      hotelPreBookData?.data?.rooms
                        ?.TotalFare || 0
                    )}
                  </span>
                </div>
              </div>
            </div>



              <div className="hotel_prebook_mobile_travell">
                {roomsConfig.map((room, roomIndex) => (
                          <React.Fragment key={roomIndex}>
                            <Row>
                              <Col
                                sm={2}
                                className="hotelFinalBooking_guestRoomsCol"
                              >
                                <label className="hotelFinalBooking_guestLabel hotelFinalBooking_guestRooms">
                                  Room {roomIndex + 1}
                                </label>
                              </Col>
                            </Row>

                            {[...Array(room.adults || 0)].map(
                              (_, adultIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-adult${adultIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Adult {adultIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className={`form-control hotelFinalBooking_input ${
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.Title
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                adultIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                          </select>
                                          {guestInfo[roomIndex].HotelPassenger[
                                            adultIndex
                                          ].Errors.Title && (
                                            <div className="invalid-feedback">
                                              {
                                                guestInfo[roomIndex]
                                                  .HotelPassenger[adultIndex]
                                                  .Errors.Title
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.FirstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.FirstName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.FirstName
                                            }
                                          </div>
                                        )}
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.LastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.LastName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.LastName
                                            }
                                          </div>
                                        )}
                                      </Col>

                                      {ValidationInfo?.PanMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="PAN Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {ValidationInfo?.PassportMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="Passport Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {/* {ValidationInfo?.CorporateBookingAllowed && (
              <>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Corporate ID"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
              </>
            )} */}
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}

                            {[...Array(room.children || 0)].map(
                              (_, childIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-child${childIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Child {childIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className="form-control hotelFinalBooking_input"
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[
                                                (room.adults || 0) + childIndex
                                              ].Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                (room.adults || 0) + childIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Master">
                                              Master
                                            </option>
                                            <option value="Miss">Miss</option>
                                          </select>
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}
                          </React.Fragment>
                          ))}
                        
                        <div className="hotelFinalBooking_mobileContact">
                          <p className="hotelFinalBooking_font14 hotelFinalBooking_bold appendBottom15" style={{ padding: '0 15px', marginTop: '20px' }}>
                            Booking details will be sent to
                          </p>
                          <Row className="hotelFinalBooking_adultItemRow" style={{ padding: '0 15px' }}>
                            <Col xs={4} className="hotelFinalBooking_inputRowCol">
                              <select className="form-control hotelFinalBooking_input">
                                <option>India (+91)</option>
                                <option>United States (+1)</option>
                                <option>United Kingdom (+44)</option>
                              </select>
                            </Col>
                            <Col xs={8} className="hotelFinalBooking_inputRowCol">
                              <input
                                className={`form-control hotelFinalBooking_input ${errors.contactNumber ? "is-invalid" : ""}`}
                                type="text"
                                placeholder="Contact No"
                                value={contactNumber}
                                onChange={(e) => {
                                  setContactNumber(e.target.value);
                                  if (errors.contactNumber) setErrors(prev => ({ ...prev, contactNumber: "" }));
                                }}
                              />
                              {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                            </Col>
                            <Col xs={12} className="hotelFinalBooking_inputRowCol" style={{ marginTop: '10px' }}>
                              <input
                                className={`form-control hotelFinalBooking_input ${errors.email ? "is-invalid" : ""}`}
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                                }}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </Col>
                          </Row>
                        </div>
                      </div>

            <div className="hotelTravellerMobile-wrapper">
              <div className="hotelTravellerMobile-card">
                
               
                {/* <button onClick={handleHotelBookNow}>Continue</button> */}
                <button
                  onClick={() => {
                    if (validateTravellerForm()) {
                      setShowReviewModalMobile(true);
                    } else {
                      toast.error("Please fill all required contact details");
                      // Scroll to contact details if possible, or just show error
                      const element = document.getElementById("contactDetails");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="hotelFinalBooking_continueBtn"
                >
                  Continue
                </button>
              </div>
            </div>

          {/*  <HotelPromoCodes /> */}
            
            <Modal show={showPolicyModal} onHide={handleClosePolicy} size="lg" centered>
  <Modal.Header closeButton>
    <Modal.Title>Room Policy</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedRoom?.policy && selectedRoom.policy.length > 0 ? (
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
              <td>$ {Number(p.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No policy available</p>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleClosePolicy}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
          </div>

          {showReviewModalMobile && (
            <HotelReviewPageMobile
              setReviewModal={setShowReviewModalMobile}
              handleConfirmClick={() => {
                setShowReviewModalMobile(false);
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
          
          {priceModal && (
              <div className="modal-overlay">
                <div className="modal-box">

                  <h4>Price Updated</h4>

                  <p>
                    The hotel price has changed.
                  </p>

                  <p>
                    <strong>New Price: ${newPrice}</strong>
                  </p>

                  <div style={{display:'flex',gap:'10px'}}>

                    <button onClick={handleCancelBooking}>
                      Cancel
                    </button>

                    <button disabled={loading} onClick={handleContinueBooking}>
                      Continue Booking
                    </button>

                  </div>

                </div>
              </div>
            )}
        </>
      ) : (
        <FlightListSkeleton />
      )}
    </div>
  );
};

export default HotelFinalBooking;
