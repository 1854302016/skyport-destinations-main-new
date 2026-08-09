import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuBaggageClaim } from "react-icons/lu";
import BookingLoader from "../HotelLoader/BookingLoader";
import "./HotelVoucher.css";
import { CiLocationOn } from "react-icons/ci";
import { Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const HotelVoucher = () => {
    const [status, setStatus] = useState("pending");
    const [sendingEmail, setSendingEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingPdf, setLoadingPdf] = useState(false);
    const [roomsConfig, setRoomsConfig] = useState([]);
    const [bookingDetail, setBookingDetail] = useState(null);
    const [bookingDetailTax, setBookingDetailTax] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
     const [x, setX] = useState(0);
  const intervalRef = useRef(null);

    const query = new URLSearchParams(location.search);
    const bookingId = query.get("bookingId");
  const hasCompleted = useRef(false);

  useEffect(() => {
   
    const getBookingRequestData = {
      BookingId: bookingId,
    };

    const fetchBookingDetail = async () => {
        setLoading(true);
        
         try {
             const response = await axios.post(
            `${BASE_URL}Hotel/GetBookingDetail`,
            getBookingRequestData
          );
              setBookingDetail(response.data);
              setBookingDetailTax(response.data?.data?.prebookResponse?.data?.hotels?.[0]?.rates?.[0]?.payment_options?.payment_types?.[0]?.tax_data);
              console.log(response.data?.data?.prebookResponse?.data?.hotels?.[0]?.rates?.[0]?.payment_options?.payment_types?.[0]?.tax_data);
        } catch (error) {
          console.error(error);
        }
      
        
     
       setLoading(false);
    };

    // {console.log("HotelPassenger:", bookingDetail?.HotelRoomsDetails?.[0]?.HotelPassenger)}

    fetchBookingDetail();
  }, []);
  
  useEffect(() => {
  if (!bookingDetail) return; // wait until booking detail loads

  const status = bookingDetail?.data?.status;

  // If already completed (status 1 = success, 2 = failed)
  if (status === 1 || status === 2) return;

  const pollStatus = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Hotel/BookingStatus`, {
        bid: bookingId,
        xx: x,
      });

      const obj = response.data;

      if (obj.success && obj.status === 2) {
        clearInterval(intervalRef.current);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      clearInterval(intervalRef.current);
    }
  };

  // Start interval **only once**
  intervalRef.current = setInterval(pollStatus, 5000);

  return () => clearInterval(intervalRef.current);
}, [bookingDetail]);

  

  
  const downloadVoucher = async () => {
  try {
    setLoadingPdf(true);

    const response = await fetch(
      `${BASE_URL}Hotel/DownloadTicket`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ BookingId: bookingDetail?.data?.id })
      }
    );

    if (!response.ok) {
      console.error("API error:", await response.text());
      setLoadingPdf(false);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `Hotel-Voucher-${bookingDetail.data.id}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingPdf(false);
  }
};

const sendVoucherEmail = async () => {
  // Show confirmation popup
  const confirm = window.confirm(
    "Are you sure you want to send the voucher to the email?"
  );
  if (!confirm) return; // User clicked Cancel

  try {
    setSendingEmail(true);

    const response = await fetch(`${BASE_URL}Hotel/SendVoucherEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ BookingId: bookingDetail?.data?.id }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Voucher sent successfully!");
    } else {
      alert("Failed to send voucher: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  } finally {
    setSendingEmail(false);
  }
};
  
  if (loading) {
  return (
    <BookingLoader/>
  );
}

const getTaxBreakup = (taxData) => {
  const taxes = taxData?.taxes || [];

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

const { included, payable } = getTaxBreakup(bookingDetailTax);

  return (
    <div>
      <>
        <section className="order__section " style={{ position: "relative" }}>
          <div className="pageStickyHder">
            <div className="flightsContainer pageHeaderWrap">
              <div className="pageHeader">
                <h2
                  data-test="component-title"
                  className="fontSize20 blackFont whiteText headerTitle"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="bgGradient"></span>
            <div className="container ticketContainers">
              <div className="row justify-content-center">
                <div className="col-xxl-12 col-xl-12 col-lg-12">
                  <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                    <div className="invoice__textwrapper  mb__10">
                      <div className="invoice__leftbox">
                        <h3 className="dtext xs-32">
                          SkyPort DestinationsOnline{" "}
                        </h3>
                      </div>
                      <div className="invoice-buttons hotelinvoice-buttons">
                         {bookingDetail?.data?.status === 1 && (
                         <>
                         <button
                  id="download_btn"
                  className="download_btn"
                  onClick={downloadVoucher}
                  disabled={loadingPdf}
                >
                  {loadingPdf ? (
                    // Loader animation
                    <svg
                      className="loader_svg"
                      width="22"
                      height="22"
                      viewBox="0 0 50 50"
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        strokeWidth="5"
                        stroke="#2D7CFE"
                        fill="none"
                        strokeDasharray="100"
                        strokeDashoffset="60"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  ) : (
                    // Your download icon
                    <svg
                      width={25}
                      height={19}
                      viewBox="0 0 25 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75Z"
                        fill="#2D7CFE"
                      />
                    </svg>
                  )}
                </button>

                       <button
  className="email_btn"
  onClick={sendVoucherEmail}
  disabled={sendingEmail}
>
  {sendingEmail ? (
    <svg
      className="loader_svg"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        strokeWidth="5"
        stroke="#EA4335"
        fill="none"
        strokeDasharray="100"
        strokeDashoffset="60"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
        fill="#EA4335"
      />
    </svg>
  )}
</button>
 </>
)}
                      </div>
                    </div>
                    <div className="reservation__contetn">
                          <span className="dtext fz-16 fw-400 lato d-block mb__10">
                            <span>
                              Hey{" "}
                                  {bookingDetail?.data?.HotelRoomsDetails?.rooms?.[0]?.guests[0]?.first_name || "Guest"}
                              ,
                            </span>
                          </span>
                         <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              {bookingDetail?.data?.status === 1 && (
                                <>
                                  <IoMdCheckboxOutline
                                    size={20}
                                    color="#43a047"
                                    className="overcheck"
                                    style={{ marginTop: "-8px" }}
                                  />
                                  <label className="gratext fz-18 fw-600 lato booking-confirm">
                                    Congratulations! Your Booking has been confirmed.
                                  </label>
                                </>
                              )}

                              {bookingDetail?.data?.status === 2 && (
                                <label className=" fz-18 fw-600 lato" style={{ color: "red" }}>
                                  Booking Failed. Please try again.
                                </label>
                              )}

                              {(bookingDetail?.data?.status !== 1 && bookingDetail?.data?.status !== 2) && (
                                <div className="booking-status">
                                    <div className="spinner"></div>
                                    <label className="fz-18 fw-600 lato" style={{ color: "#ff9800" }}>
                                      Booking Pending / In Progress...
                                    </label>
                                  </div>
                              )}
                        </div>
                    </div>

                    <div className="themeholy-invoice invoice_style17">
                      <div className="download-inner" id="download_section">
                        <div className="row gx-0 justify-content-between my-4">
                          <div className="col-6">
                            <div className="info-box2 text-start">
                              <div style={{ display: "flex", gap: "20px" }}>
                                <div>
                                  <b>Booking ID:</b>
                                  <br />
                                  <span>{bookingDetail?.data?.id}</span>
                                </div>
                                {/* <div>
                            <b>Inbound Booking ID:</b>
                            <br />
                            <span>11324342</span>
                          </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="info-box2 text-end">
                              <b>Payment Method:</b>
                              <br />
                              <span>Credit Card</span>
                            </div>
                          </div>
                        </div>

                        <div className="hotelPrebookVoucher">
                          <div className="hotelFinalBooking_hotelDetails ">
                            <div className="hotelFinalBooking_hotelNameAdd">
                              <div className="hotelListingstyling-name hotelFinalBooking-name">
                                {bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.name}
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
                                          Number(bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.star_rating)
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
                                <span title={bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.address}>
                                  {bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.address}
                                </span>
                              </div>
                            </div>

                            <Row className="hotelFinalBooking_rowCols">
                              <Col md={4} className="hotelFinalBooking_Col1">
                                <img
                                  src={bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.images_ext?.[0]?.url?.replace("{size}", "320x175")}
                                  alt=""
                                />
                              </Col>
                              <Col md={8} className="hotelFinalBooking_Col2">
                                <div className="hotelFinalBooking_CheckinDetails">
                                  <div className="hotelFinalBooking_checkIn">
                                    <h6>CHECK-IN </h6>
                                    {/* <h3>{bookingDetail?.InitialCheckInDate}</h3> */}
                                    <h3>
                                      {bookingDetail?.data?.checkin
                                        ? new Date(
                                            bookingDetail?.data?.checkin
                                          ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
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
                                    {/* <h3>{bookingDetail?.InitialCheckOutDate}</h3> */}
                                    <h3>
                                      {bookingDetail?.data?.checkout
                                        ? new Date(
                                            bookingDetail?.data?.checkout
                                          ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                        : ""}
                                    </h3>
                                  </div>

                                  {/* <Link to='/hoteldetailsmain'>
                              <div className="hotelFinalBooking_changeRoom">CHANGE ROOM</div>
                            </Link> */}
                                </div>

                                <div className="hotelFinalBooking_roomsGuests">
                                  <h6>ROOMS & GUESTS</h6>
                                  <h6>
                                    <span style={{ fontWeight: "bold" }}>
                                      {bookingDetail?.data?.NoOfRooms}
                                    </span>{" "}
                                    <span className="hotelFinalBooking_roomsGuests_Span">
                                      Rooms
                                    </span>{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                      {bookingDetail?.data?.guests || 0}
                                    </span>{" "}
                                    <span className="hotelFinalBooking_roomsGuests_Span">
                                      Guests
                                    </span>
                                  </h6>
                                </div>
                              </Col>
                            </Row>

                            <div className="hotelFinalBooking_roomType">
                              <h6>Name</h6> {bookingDetail?.data?.hotel_detail?.data?.rooms?.Name}
                              <div>
                              
                                {/* <span style={{ fontWeight: "bold" }}>1</span> Room */}
                                <span style={{ fontWeight: "bold" }}>
                                  {bookingDetail?.data?.NoOfRooms}
                                </span>{" "}
                                <span className="hotelFinalBooking_roomsGuests_Span">
                                  Rooms
                                </span>{" "}
                              </div>

                              <div className="hotelFinalBooking_inclusion">
                                
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <>
                          <p
                            style={{ paddingTop: "25px" }}
                            className="table-title"
                          >
                            <b> Guest Information:</b>
                          </p>

                          <table className="invoice-table table-stripe3 style5">
                            <thead>
                              <tr>
                                <th>Guest's :</th>
                                <th>Gender:</th>
                                <th>PAN No. :</th>
                             
                              </tr>
                            </thead>
                            <tbody>
                            {bookingDetail?.data?.booking_request?.HotelRoomsDetails?.flatMap(
                              (room, roomIndex) =>
                                room?.HotelPassenger?.map((passenger, passengerIndex) => (
                                  <tr key={`${roomIndex}-${passengerIndex}`}>
                                    <td>{`${passenger.FirstName || ""} ${passenger.LastName || ""}`}</td>

                                    <td>
                                      {passenger.PaxType === 1
                                        ? "Male"
                                        : passenger.PaxType === 2
                                        ? "Female"
                                        : "-"}
                                    </td>

                                    <td>{passenger.PAN || "-"}</td>
                                   
                                  </tr>
                                )) || [] // prevent undefined crash
                            )}
                            </tbody>
                          </table>
                        </>

                        <table className="invoice-table table-stripe3">
                          <thead>
                            <tr>
                              <th>Description</th>

                              <th style={{ textAlign: "end" }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Base Fare</td>
                              <td style={{ textAlign: "end" }}>
                                {" "}
                                ${" "}
                                {bookingDetail?.data?.paymentdetail?.base_total
                                   || 0}
                              </td>
                            </tr>
                            <tr>
                              <td>Taxes & Fees</td>
                              <td style={{ textAlign: "end" }}>
                                {/* ✅ Included Taxes */}
{included.length > 0 && (
  <div>
    <strong>Included in price:</strong>
    {included.map((tax, i) => (
      <div key={i} style={{ color: "green", fontSize: "12px" }}>
        {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
      </div>
    ))}
  </div>
)}

{/* ✅ Payable Taxes */}
{payable.length > 0 && (
  <div>
    <strong>Pay at hotel:</strong>
    {payable.map((tax, i) => (
      <div key={i} style={{ color: "red", fontSize: "12px" }}>
        {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
      </div>
    ))}
  </div>
)}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <b>Total Amount:</b>
                              </td>
                              <td style={{ textAlign: "end" }}>
                                ${" "}
                                {bookingDetail?.data?.paymentdetail
                                  ?.amount || 0}
                              </td>
                            </tr>
                          </tfoot>
                        </table>

                       

                        <p className="invoice-note mt-3">
                          <svg
                            width={14}
                            height={18}
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                              fill="#2D7CFE"
                            />
                          </svg>{" "}
                          <b>NOTE: </b>This is computer generated receipt and
                          does not require physical signature.
                        </p>
                      </div>

                      <div className="hotelinvoiceBottom-buttons">
                        <div className="invoice-buttons hotelinvoice-buttons">
                          {bookingDetail?.data?.status === 1 && (
                         <> 
                         <button
  id="download_btn"
  className="download_btn"
  onClick={downloadVoucher}
  disabled={loadingPdf}
>
  {loadingPdf ? (
    // Loader animation
    <svg
      className="loader_svg"
      width="22"
      height="22"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        strokeWidth="5"
        stroke="#2D7CFE"
        fill="none"
        strokeDasharray="100"
        strokeDashoffset="60"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  ) : (
    // Your download icon
    <svg
      width={25}
      height={19}
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75Z"
        fill="#2D7CFE"
      />
    </svg>
  )}
</button>

                          <button
  className="email_btn"
  onClick={sendVoucherEmail}
  disabled={sendingEmail}
>
  {sendingEmail ? (
    <svg
      className="loader_svg"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        strokeWidth="5"
        stroke="#EA4335"
        fill="none"
        strokeDasharray="100"
        strokeDashoffset="60"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
        fill="#EA4335"
      />
    </svg>
  )}
</button>
</>
 )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="p-3 ticketContainers hide-desktop">
          <div className="success-message text-center mb-4">
            <h4 className="fw-bold mb-2 text-black mt-2 ">
              Payment Successful!{" "}
              <img
                src="/Images/Images/verify.png"
                className="bi bi-check-circle"
                style={{ height: "26px" }}
              />
            </h4>
            {bookingDetail?.data?.status === 1 && (
                <>
                   <p className="" style={{ color: "rgb(138 136 136)" }}>
                      Your booking has been confirmed. Voucher details have been sent to
                      your email.
                    </p>
                </>
              )}
              {bookingDetail?.data?.status === 2 && (
                <p className="" style={{ color: "red" }}>
                  Booking Failed. Please try again.
                </p>
              )}

              {(bookingDetail?.data?.status !== 1 && bookingDetail?.data?.status !== 2) && (
                <p className="" style={{ color: "#ff9800" }}>
                  Booking Pending / In Progress...
                </p>
              )}
           
          </div>

          <div className="booking-details mb-4">
            <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
              <h6 className="fw-bold mb-3">Booking Information</h6>
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Booking ID</div>
                <div className="fw-medium">{bookingDetail?.data?.id}</div>
              </div>

              {/* <div className="d-flex justify-content-between mb-2">
          <div className="text-muted">Inbound Booking ID</div>
          <div className="fw-medium">123123124</div>
        </div> */}

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Booking Date</div>
                <div>
                  {bookingDetail?.data?.created_at
                    ? new Date(
                        bookingDetail?.data?.created_at
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </div>
              </div>
              {/* <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Airline PNR</div>
                <div>3423242</div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Inbound Airline PNR</div>
                <div>53453453</div>
              </div> */}

             
              <div className="d-flex justify-content-between">
                <div className="text-muted">Amount Paid</div>
                <div className="fw-bold text-primary-color">
                  ${" "}
                  {bookingDetail?.data?.paymentdetail?.amount || 0}
                </div>
              </div>
            </div>

            <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
              <div>
                <h6
                  className="fw-bold mb-3"
                  style={{
                    color: "#396ace",
                    background: "#9ebdd54a",
                    padding: "10px",
                  }}
                >
                  Hotel Details
                </h6>
                <div className="d-flex align-items-center mb-3">
                  {/* <div className="bus-icon me-3">
                    <img
                      style={{ width: "40px", borderRadius: "5px" }}
                      src={"/Images/hotel-icon.png"}
                    />
                  </div> */}
                  <div>
                    <h6 className="fw-bold mb-0">{bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.name}</h6>
                    <div className="text-muted small">
                      {bookingDetail?.data?.hotel_detail?.data?.HotelDetail?.data?.address}
                    </div>
                  </div>
                </div>

                <div className="journey-details mb-3">
                  <div className="d-flex mb-3">
                    <div className="journey-stops me-3">
                      <div className="departure-stop" />
                      <div className="journey-line" />
                      <div className="arrival-stop" />
                    </div>
                    <div className="journey-info flex-grow-1">
                      <div className="mb-3">
                        <div className="fw-bold"> Check-In</div>
                        <div className="text-muted small">
                          {" "}
                          {bookingDetail?.data?.checkin
                            ? new Date(
                                bookingDetail?.data?.checkin
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </div>
                      </div>
                      <div>
                        <div className="fw-bold"> Check-Out</div>
                        <div className="text-muted small">
                          {bookingDetail?.data?.checkout
                            ? new Date(
                                bookingDetail?.data?.checkout
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted mediam mb-0">Guests</div>
                   
                  </div>
                </div>
                {bookingDetail?.data?.booking_request?.HotelRoomsDetails?.flatMap(
                  (room, roomIndex) =>
                    room?.HotelPassenger?.map((passenger, passengerIndex) => (
                     <div
                      className="col-12 mb-2"
                      key={`${roomIndex}-${passengerIndex}`}
                    >
                        <div className="d-flex justify-content-between align-items-center"><div className="fw-medium">{`${passenger.FirstName || ""} ${passenger.LastName || ""}`}</div></div>
                    </div>
                        
                    )) || [] // prevent undefined crash
                )}
                
              </div>
            </div>

            <div className="booking-card p-3 rounded-3 bg-primary-light ">
              <h6 className="fw-bold mb-3">Fare Summary</h6>

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Base Fare</div>
                <div>
                  ${" "}
                  {bookingDetail?.data?.paymentdetail
                    ?.base_total || 0}
                </div>
              </div>
             {/* ✅ Included Taxes */}
{included.length > 0 && (
  <div>
    <strong>Included in price:</strong>
    {included.map((tax, i) => (
      <div key={i} style={{ color: "green", fontSize: "12px" }}>
        {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
      </div>
    ))}
  </div>
)}

{/* ✅ Payable Taxes */}
{payable.length > 0 && (
  <div>
    <strong>Pay at hotel:</strong>
    {payable.map((tax, i) => (
      <div key={i} style={{ color: "red", fontSize: "12px" }}>
        {tax.name.replace(/_/g, " ")} - {tax.amount} {tax.currency_code}
      </div>
    ))}
  </div>
)}
              <div className="d-flex justify-content-between">
                <div className="text-muted">Total Amount:</div>
                <div className="fw-bold text-primary-color">
                  ${" "}
                  {bookingDetail?.data?.paymentdetail
                    ?.amount || 0}
                </div>
              </div>
            </div>
          </div>

          {bookingDetail?.data?.status === 1 && (
  <> 
    <div className="action-buttons d-grid gap-2">
      <button
        className="btn btn-app"
        type="button"
        onClick={downloadVoucher}
        disabled={loadingPdf}
      >
        {loadingPdf ? "Downloading..." : "Download Voucher"}
      </button>

      <button
        className="btn btn-outline-secondary rounded-3"
        onClick={sendVoucherEmail}
        disabled={sendingEmail}
      >
        {sendingEmail ? "Loading..." : "Resend Mail"}
      </button>

      <Link to="/" className="btn btn-outline-secondary rounded-3">
        Back to Home
      </Link>
    </div>
  </>
)}
        </div>
      </>
    </div>
  );
};

export default HotelVoucher;
