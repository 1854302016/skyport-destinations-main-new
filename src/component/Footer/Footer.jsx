import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { FaFacebook, FaHeartbeat, FaUserAlt } from "react-icons/fa";
import { PiPhoneFill } from "react-icons/pi";
import { MdEmail, MdLogout } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import SignUp from "../Navbar/SignUp";
import { useAuth } from "../../context/AuthContext";
const Footer = () => {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
  };
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <div className="rts-footer-one footer-bg-one mt--160 pb--85">
        <Container>
          <Row className="g-0 bg-cta-footer-one">
            <Col lg={12}>
              <div className="bg-cta-footer-one wrapper">
                <Row className="align-items-center">
                  <Col lg={3} md={6} sm={6} xs={12}>
                    <Link to="#" className="logo-area-footer">
                      <img src="/Images/tripgoo.png" alt="logo" />
                    </Link>
                  </Col>
                  <Col lg={3} md={6} sm={6} xs={12}>
                    {/* single contact area start */}
                    <div className="single-cta-area">
                      <div className="icon">
                        <PiPhoneFill
                          className="fa-solid"
                          color="#fff"
                          size={22}
                        />
                      </div>
                      <div className="contact-info">
                        <p>Phone Number</p>
                        <Link to="tel:+919234803549">(+91)99999XXXXX</Link>
                      </div>
                    </div>
                    {/* single contact area end */}
                  </Col>
                  <Col lg={3} md={6} sm={6} xs={12}>
                    {/* single contact area start */}
                    <div className="single-cta-area">
                      <div className="icon">
                        <MdEmail className="fa-solid" color="#fff" size={20} />
                      </div>
                      <div
                        className="contact-info"
                        style={{ marginLeft: "7px" }}
                      >
                        <p>Email Us Here</p>
                        <Link to="mailto:info@tripgo.com">
                          {" "}
                          info@tripgo.com
                        </Link>
                      </div>
                    </div>
                    {/* single contact area end */}
                  </Col>
                  <Col lg={3} md={6} sm={6} xs={12}>
                    {/* single contact area start */}
                    <div className="single-cta-area last">
                      <div className="icon">
                        <FaLocationDot
                          className="fa-solid fa-phone"
                          color="#fff"
                          size={20}
                        />
                      </div>
                      <div className="contact-info">
                        <p>Office Address</p>
                        <Link target="_blank" rel="noopener noreferrer">
                          India
                        </Link>
                      </div>
                    </div>
                    {/* single contact area end */}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="pt--90">
            <Col lg={12}>
              <div className="single-footer-one-wrapper">
                <Row style={{ width: "100%" }}>
                  <Col lg={3} md={6} sm={6} xs={12}>
                    <div className="single-footer-component first">
                      <div className="title-area">
                        <h5 className="title">About Company</h5>
                      </div>
                      {/* <div className="body">
                        <p className="disc">
                          Centric applications productize before front end
                          vortals visualize front end is results and value added
                        </p>
                        <div className="rts-social-style-one">
                          <ul>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/facebook.png"
                                  className="fa-brands fa-facebook-f social-image-icon"
                                  color="#000"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/instagram.png"
                                  className="fa-brands fa-twitter social-image-icon"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/twitter.png"
                                  className="fa-brands fa-youtube social-image-icon"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/linkedin.png"
                                  className="fa-brands fa-linkedin-in social-image-icon"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div> */}

                      <div className="body">
                        <div className="pages-footer">
                          <ul>
                            <li>
                              <Link to="/about-us">
                                <i className="fa-solid fa-arrow-right" />
                                <p>About Us</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/terms-conditions">
                                <i
                                  className="fa-solid fa-arrow-right"
                                  color="#fff"
                                  size={20}
                                />
                                <p>Term & Condition</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/privacy-policy">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Privacy Policy</p>
                              </Link>
                            </li>
                            {/* <li>
                              <Link to="">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Refund Policy</p>
                              </Link>
                            </li> */}
                            <li>
                              <Link to="/contact">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Contact Us</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="rts-social-style-one">
                          <ul>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/facebook.png"
                                  className="fa-brands fa-facebook-f social-image-icon"
                                  color="#000"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/instagram.png"
                                  className="fa-brands fa-twitter social-image-icon"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/twitter.png"
                                  className="fa-brands fa-youtube social-image-icon"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <img
                                  src="/Images/social/linkedin.png"
                                  className="fa-brands fa-linkedin-in social-image-icon"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* <Col lg={3} md={6} sm={6} xs={12}>
                    <div className="single-footer-component">
                      <div className="title-area">
                        <h5 className="title">Useful Links</h5>
                      </div>
                      <div className="body">
                        <div className="pages-footer">
                          <ul>
                            <li>
                              <Link to="/about-us">
                                <i className="fa-solid fa-arrow-right" />
                                <p>About Us</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/terms-conditions">
                                <i
                                  className="fa-solid fa-arrow-right"
                                  color="#fff"
                                  size={20}
                                />
                                <p>Term & Condition</p>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <i className="fa-solid fa-arrow-right" />
                                <p>Privacy Policy</p>
                              </Link>
                            </li>
                            <li>
                            <Link to="">
                              <i className="fa-solid fa-arrow-right" />
                              <p>Refund Policy</p>
                            </Link>
                          </li>
                            <li>
                              <Link to="/contact">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Contact Us</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col> */}
                  <Col lg={3} md={6} sm={6} xs={12}>
                    <div className="single-footer-component">
                      <div className="title-area">
                        <h5 className="title">Services</h5>
                      </div>
                      <div className="body">
                        <div className="pages-footer">
                          <ul>
                            <li>
                              <Link to="/">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Flights</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/hotel">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Hotels</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Tour Packages</p>
                              </Link>
                            </li>
                            {/* <li>
                              <Link to="/buses">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Buses</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/cabs">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Cabs</p>
                              </Link>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6} xs={12}>
                    <div className="single-footer-component popular_dest">
                      <div className="title-area">
                        <h5 className="title popular_dest_title">
                          Popular Destinations
                        </h5>
                      </div>
                      <div className="body">
                        <div className="pages-footer">
                          <ul>
                            <li>
                              <Link to="/tour/varanasi">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Varanasi</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour/ayodhaya">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Ayodhaya</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour/kashmir">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Kashmir</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour/italy">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Italy</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour/switzerland">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Switzerland</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/tour/dubai">
                                <i className="fa-solid fa-arrow-right" />
                                <p>Dubai</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6} xs={12}>
                    <div className="single-footer-component">
                      <div className="title-area">
                        <h5 className="title">Payment & Security</h5>
                      </div>
                      <div className="cards">
                        <Link className="visa" title="Visa"></Link>
                        <Link className="master" title="Master Card"></Link>
                        <Link
                          className="american"
                          title="American Express"
                        ></Link>
                        <Link className="py_pal" title="PayPal"></Link>
                        <Link className="rupaylg" title="RuPay"></Link>
                        <Link className="pcilg" title="PCI Security"></Link>
                        {/* <Link className="iata" title="IATA"></Link> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ background: "#f73030" }}>
        <Container className="copy-writee">
          <p style={{ padding: "5px 0px", textAlign: "center" }}>
            <span>
              <img
                src="/Images//shortlogo.png"
                alt=""
                className="footer_coppyright"
                style={{ width: "32px", height: "32px", marginRight: "5px" }}
              />
            </span>
            <span style={{ fontSize: "14px", color: "antiquewhite" }}>
              {" "}
              © Copyrights TravelsData | All rights reserved. Design & Developed
              by <FaHeartbeat color="antiquewhite" />{" "}
              <Link to="https://www.eweblink.net/">eWeblink Technology</Link>{" "}
            </span>
          </p>
        </Container>
      </div>
      <section className="stickybottom">
        <div className="stkyflx">
          <Link to="/" className="stiky clrstky">
            <div
              className="_HomeStky"
              style={{ background: "url('/Images/home.png')" }}
            />
            <div className=""> Home </div>
          </Link>
          <Link to="/bookings/flight" className="stiky">
            <div
              className="_BookingsStky"
              style={{ background: "url('/Images/booking.png')" }}
            />
            <div> Bookings</div>
          </Link>
          <Link to="/offers" className="stiky eohid">
            {/* <div className="_notif">100+</div> */}
            <div
              className="_OffersStky"
              style={{ background: "url('/Images/offer.png')" }}
            />
            <div>Offers</div>
          </Link>
          <Link className="stiky">
            <div
              className="_WalletStky"
              style={{ background: "url('/Images/wallet.png')" }}
            />
            <div> Wallet</div>
          </Link>
          <Link
            onClick={() => {
              isAuthenticated ? handleLogout() : handleShow();
              setExpanded(false);
            }}
            className="stiky"
          >
            <div
              className="_MoreStky"
              style={{ background: "url('/Images/user.png')" }}
            />
            <div> Profile</div>
          </Link>
        </div>
      </section>
      <SignUp
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default Footer;

// const handleTicketBookTJ = async () => {
//   setLoading(true);

//   // Format passenger data
//   const formatPassenger = (data, type) => ({
//     ti:
//       type !== "ADULT"
//         ? data.title === "Mr" || data.title === "Mrs"
//           ? "Master"
//           : data.title
//         : data.title,
//     fN: data.firstName,
//     lN: data.lastName,
//     pt: type,
//     dob: data.date,
//     pNat: "IN",
//     pNum: data.passport,
//     eD: data.expirydate,
//     pid: data.issuedate,
//   });

//   const adultPassengers = formData.map((data) =>
//     formatPassenger(data, "ADULT")
//   );
//   const childPassengers = childData.map((data) =>
//     formatPassenger(data, "CHILD")
//   );
//   const infantPassengers = infant.map((data) =>
//     formatPassenger(data, "INFANT")
//   );

//   const allPassengers = [
//     ...adultPassengers,
//     ...childPassengers,
//     ...infantPassengers,
//   ];

//   const phonePePayment = async () => {
//     try {
//       const phonePeResponse = await axios.post(
//         "https://admin.skyportdestinations.com/api/phonepe",
//         {
//           payment_method: "phonepe",
//           Amount: flight.totalPriceInfo.totalFareDetail.fC.TF,
//           phone: walletData.Phone,
//         }
//       );

//       console.log("PHONE PAY RESPONSE: ", phonePeResponse.data);

//       // Check if the response indicates success
//       if (phonePeResponse.data && phonePeResponse.data.success) {
//         const paymentUrl =
//           phonePeResponse.data.data.instrumentResponse.redirectInfo.url;

//         // Redirect to payment URL
//         window.location.to = paymentUrl;

//         // Logic for handling payment success
//         const onSuccess = async () => {
//           const requestData = {
//             bookingId: sessionStorage.getItem("BookingIdTJ"),
//             paymentInfos: [
//               {
//                 amount: flight.totalPriceInfo.totalFareDetail.fC.TF,
//               },
//             ],
//             gstInfo: {
//               gstNumber: "07AAFFE6846H1Z9",
//               email: "apitest@apitest.com",
//               registeredName: "XYZ Pvt Ltd",
//               mobile: "9728408906",
//               address: "Delhi",
//             },
//             deliveryInfo: {
//               emails: ["xyz@xyz.com"],
//               contacts: ["9489275524"],
//             },
//           };

//           console.log("Flight booking request data", requestData);

//           const apiUrl = "https://admin.skyportdestinations.com/api/flight_booking";
//           const bookingResponse = await axios.post(apiUrl, requestData, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           const bookingData = bookingResponse.data;
//           console.log("Flight booked successfully:", bookingData);

//           if (!bookingData.success) {
//             throw new Error("Booking failed");
//           }

//           // Clear session storage
//           sessionStorage.removeItem("BookingIdTJ");
//           sessionStorage.removeItem("FirstName2");
//           sessionStorage.removeItem("LastName2");
//           sessionStorage.removeItem("PNR2");

//           navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
//         };

//         await checkPaymentStatus(onSuccess);
//       } else {
//         console.error("Payment initiation failed: ", phonePeResponse.data);
//         throw new Error(
//           "Failed to initiate payment: " +
//             (phonePeResponse.data.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error during payment:", error);
//       alert("Payment error occurred: " + error.message);

//       // Log detailed error information
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         console.error("Error status:", error.response.status);
//       } else {
//         console.error("Error message:", error.message);
//       }
//     }
//   };

//   const checkPaymentStatus = async (onSuccess) => {
//     const pollInterval = 5000; // Poll every 5 seconds
//     const maxAttempts = 10; // Limit to 10 attempts
//     let attempts = 0;

//     while (attempts < maxAttempts) {
//       try {
//         const statusResponse = await axios.get(
//           "https://admin.skyportdestinations.com/api/check_payment_status",
//           {
//             params: { bookingId: sessionStorage.getItem("BookingIdTJ") },
//           }
//         );

//         if (statusResponse.data && statusResponse.data.success) {
//           await onSuccess();
//           return; // Payment was successful
//         }

//         attempts++;
//         await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Wait before next poll
//       } catch (error) {
//         console.error("Error checking payment status:", error);
//         break; // Stop polling on error
//       }
//     }

//     alert("Payment failed. Please try again.");
//   };

//   // Step 5: Call the PhonePe payment function before booking the flight
//   await phonePePayment();
//   setLoading(false);
// };
