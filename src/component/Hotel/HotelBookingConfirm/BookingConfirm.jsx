import React, { useEffect, useState } from "react";
import "./BookingConfirm.css";
import { Col, Container, Row } from "react-bootstrap";
import { RiArrowDropRightFill } from "react-icons/ri";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { RxCross2 } from "react-icons/rx";
import { FaRegFilePdf, FaWhatsapp } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoPrintSharp } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";

const extractCheckInInstructions = (bookingDetails) => {
  // Find the check-in instructions entry
  const checkInInstructionsEntry =
    bookingDetails &&
    bookingDetails.itemInfos.HOTEL.hInfo.inst &&
    bookingDetails.itemInfos.HOTEL.hInfo.inst.find(
      (entry) => entry.type === "CHECKIN_INSTRUCTIONS"
    );

  // Parse the message if entry is found
  if (checkInInstructionsEntry) {
    const instructions = JSON.parse(checkInInstructionsEntry.msg);
    // Combine 'Special Instructions' and 'Instructions' if both are present
    const allInstructions = [];
    if (instructions["Special Instructions"]) {
      allInstructions.push(instructions["Special Instructions"]);
    }
    if (instructions["Instructions"]) {
      allInstructions.push(instructions["Instructions"]);
    }

    // Split instructions by newlines and return as list items
    return allInstructions.flatMap((instruction, index) =>
      instruction.split("\n").map((line, idx) => (
        <li key={`${index}-${idx}`}>
          <span>
            <RiArrowDropRightFill size={25} color="#171055" />
          </span>
          {line.trim()}
        </li>
      ))
    );
  }

  // Return empty array if no instructions found
  return [];
};

const extractImportantHotelInfo = (bookingDetails) => {
  // Filter out the entries that are not check-in instructions
  const otherEntries =
    bookingDetails &&
    bookingDetails.itemInfos.HOTEL.hInfo.inst &&
    bookingDetails.itemInfos.HOTEL.hInfo.inst.filter(
      (entry) => entry.type !== "CHECKIN_INSTRUCTIONS"
    );

  // Process each entry to extract list items
  return (
    bookingDetails &&
    otherEntries &&
    otherEntries.flatMap((entry) => {
      const parsedMsg = JSON.parse(entry.msg);
      // Extract messages and split by newlines for each type of entry
      const instructions = Object.values(parsedMsg).flatMap((content) =>
        content.split("\n").map((line, index) => (
          <li key={`${entry.type}-${index}`}>
            <span>
              <RiArrowDropRightFill size={25} color="#171055" />
            </span>
            {line.trim()}
          </li>
        ))
      );
      return instructions;
    })
  );
};

const BookingConfirm = () => {
  const downloadPdf = () => {
    const capture = document.querySelector(".ticket_container");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      // pdf.text("Ledger Report", 10, 10); // Add title "Ledger Report" at coordinates (10, 10)
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(
        componentWidth / imageWidth,
        componentHeight / imageHeight
      );
      const imageX = componentWidth - imageWidth * ratio;
      const imageY = 30;
      // const imgWidth = 190;
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(
        imgData,
        "PNG",
        imageX,
        imageY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      doc.save("bookingDetail.pdf");
    });
  };

  const [hidePerson, setHidePerson] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);
  const [active, setActive] = useState(false);
  const [money, setMoney] = useState("");
  const [price, setPrice] = useState(1000);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPrice(price + parseInt(money));
    setActive(false);
  };

  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.post(
          "https://heritage.travelsdata.com/api/hotelTJ/booking_details",
          { bookingId }
        );
        console.log("booking details response", response.data);
        if (response.data.success) {
          setBookingDetails(response.data.data);
        }
      } catch (error) {
        console.error("There was an error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  // Component
  // const CheckInInstructions = ({ bookingDetails }) => {
  const [checkinInstructions, setCheckinInstructions] = useState([]);

  useEffect(() => {
    const instructions = extractCheckInInstructions(bookingDetails);
    setCheckinInstructions(instructions);
  }, [bookingDetails]);
  // };

  const [importantInfo, setImportantInfo] = useState([]);

  useEffect(() => {
    const info = extractImportantHotelInfo(bookingDetails);
    setImportantInfo(info);
  }, [bookingDetails]);

  return (
    <>
      {bookingDetails && (
        <div className="hotelBookingparentDiv" style={{ marginBottom: "20px" }}>
          <Container>
            <div className="hotelBookingHeaderDiv">
              <div
                className="hotlBookingUpperIcon"
                onClick={() => setHidePerson(!hidePerson)}
              >
                <FaPerson />
                <span className="hotelBookingHideDetails hotelBookingBigTag">
                  Hide person
                </span>
              </div>
              <div className="hotlBookingUpperIcon" onClick={downloadPdf}>
                <IoPrintSharp />
                <span className="hotelBookingHideDetails"> Print</span>
              </div>
              <div className="hotlBookingUpperIcon" onClick={downloadPdf}>
                <FaRegFilePdf />
                <span className="hotelBookingHideDetails hotelBookingBigTag">
                  {" "}
                  Save Pdf
                </span>
              </div>
              <div className="hotlBookingUpperIcon">
                <MdMarkEmailUnread />
                <span className="hotelBookingHideDetails"> Email </span>
              </div>
              <div className="hotlBookingUpperIcon">
                <FaWhatsapp />
                <span className="hotelBookingHideDetails"> Whatsapp</span>
              </div>
              <div className="hotlBookingUpperIcon">
                <LiaSmsSolid />
                <span className="hotelBookingHideDetails"> Sms</span>
              </div>
              <div
                className="hotlBookingUpperIcon"
                onClick={() => setHidePrice(!hidePrice)}
              >
                <BsCurrencyDollar />
                <span className="hotelBookingHideDetails hotelBookingBigTag">
                  {" "}
                  Hide Price
                </span>
              </div>
              <div className="hotlBookingUpperIcon">
                <BsCurrencyDollar />
                <span
                  className="hotelBookingHideDetails"
                  onClick={() => setActive(!active)}
                >
                  {" "}
                  Markup
                </span>
              </div>
              <div
                style={{
                  padding: "3px 6px",
                  backgroundColor: "#db0e0edb",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                <RxCross2 />
              </div>
            </div>
            {active ? (
              <div className="hotelBookingMarkupMain">
                <div className="hotelBookingMarkup">
                  <p className="hotelBookingMarkuppara">
                    {" "}
                    Additional Transaction fees / discount
                  </p>
                  <p
                    className=""
                    style={{
                      color: "#2d3290",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    Existing Amount: Rs.
                  </p>
                  <p
                    className=""
                    style={{ fontWeight: "500", fontSize: "16px" }}
                  >
                    Reset Amount
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      value={money}
                      onChange={(e) => setMoney(e.target.value)}
                      style={{ width: "80%", padding: "5px 10px" }}
                    />
                    <div className="hotelBookingCloseSub">
                      <button
                        className="hotelBookingMarkupClose"
                        onClick={() => setActive(false)}
                      >
                        close
                      </button>
                      <button className="hotelBookingMarkupSub" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </Container>
          {/* <div className="hotelBookingSecDiv" style={{ marginBottom: "15px" }}> */}
          <div className="ticket_container">
            <Container>
              <div
                className="hotelBookingSecDiv"
                style={{ marginBottom: "15px" }}
              >
                <h3 className="hotelBookingHeadingMain">
                  {bookingDetails.itemInfos.HOTEL.hInfo.name.toUpperCase()}
                </h3>
                <ul className="hotelBookingUnderFirst">
                  <li
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <FaLocationDot />
                    {bookingDetails.itemInfos.HOTEL.hInfo.ad.ctn},{" "}
                    {bookingDetails.itemInfos.HOTEL.hInfo.ad.cn}
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <FaPhoneAlt />
                    (+91) 70425 71259
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <MdMarkEmailUnread />
                    support@TripGo.com
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <RiGlobalFill />
                    https://TripGo.com
                  </li>
                </ul>
              </div>
            </Container>
            <Container>
              <Row>
                <Col md={12}>
                  <div className="hotelBookingThirdDiv">
                    <Row style={{ marginTop: "15px" }}>
                      <Col md={9}>
                        <h6
                          style={{
                            // fontWeight: "600",
                            // fontSize: "18px",
                            backgroundColor: "#cee0f3",
                            color: "black",
                            fontWeight: "600",

                            padding: "10px",
                          }}
                        >
                          All Details{" "}
                        </h6>
                        <div className="hotelBookingFourthMain">
                          <div
                            className={`hotelBookingFourthDiv ${
                              hidePerson ? "d-none" : "d-flex"
                            }`}
                          >
                            {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].ris.map(
                              (ri, riIndex) => (
                                <div key={riIndex}>
                                  {ri.ti.map((guest, guestIndex) => (
                                    <p key={guestIndex}>
                                      {guest.ti} {guest.fN} {guest.lN}
                                    </p>
                                  ))}
                                </div>
                              )
                            )}
                            <p>
                              {" "}
                              <span style={{ fontWeight: "600" }}>
                                Email :{" "}
                              </span>
                              {bookingDetails.order.deliveryInfo.emails[0]}
                            </p>
                            <p>
                              {" "}
                              <span style={{ fontWeight: "600" }}>
                                Ph. No -{" "}
                              </span>{" "}
                              {bookingDetails.order.deliveryInfo.contacts[0]}{" "}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              color: "black",
                              fontWeight: "500",
                            }}
                          >
                            <p>
                              <span style={{ fontWeight: "600" }}>PNR : </span>
                              {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].cnp
                                .ifra
                                ? "REFUNDABLE"
                                : "NON-REFUNDABLE"}{" "}
                            </p>
                            <p>
                              <span style={{ fontWeight: "600" }}>
                                Check In :{" "}
                              </span>{" "}
                              {
                                bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                  .ris[0].checkInDate
                              }
                            </p>
                            <p>
                              <span style={{ fontWeight: "600" }}>
                                Check Out :{" "}
                              </span>{" "}
                              {
                                bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                  .ris[0].checkOutDate
                              }
                            </p>
                            <p>
                              <span style={{ fontWeight: "600" }}>
                                Guest :{" "}
                              </span>{" "}
                              {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.adt,
                                0
                              )}{" "}
                              Adult ,{" "}
                              {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.chd,
                                0
                              )}{" "}
                              Children
                            </p>
                            {/* <p>
                            <span style={{ fontWeight: "600" }}>Unit : </span>
                            Apartment Dream
                          </p> */}
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <img
                          src="https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg"
                          alt=""
                          width={250}
                          className="hotelBookingImageData"
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={9}>
                        <div>
                          <h6
                            style={{
                              backgroundColor: "#cee0f3",
                              color: "black",
                              fontWeight: "600",
                              padding: "10px",
                            }}
                          >
                            Check-In
                          </h6>
                          <ul>
                            {/* <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            Check in time start at 3 PM
                          </li>
                          <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            If a late check in is planned, Contact this hotel
                            directly for their late check in policy
                          </li> */}
                            {checkinInstructions}
                          </ul>
                        </div>
                        <div>
                          <h6
                            style={{
                              // fontWeight: "600",
                              // fontSize: "18px",
                              backgroundColor: "#cee0f3",
                              color: "black",
                              fontWeight: "600",
                              padding: "10px",
                              marginTop: "10px",
                            }}
                          >
                            Important Hotel Information
                          </h6>
                          <ul>
                            <li style={{ fontWeight: "500" }}>
                              {/* <p> */}
                              Although SkyPort Destinationsdoes not change a
                              fees to change or cancel your booking, .{" "}
                              {bookingDetails.itemInfos.HOTEL.hInfo.name.toUpperCase()}{" "}
                              may still a fees in accordance with its own rule
                              and regulations
                              {/* </p> */}
                            </li>
                          </ul>
                          <ul>
                            {/* <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            Cancellation and change made after 11:59 PM(Romance
                            Daylight Time) on Mar 27 2023 or no shows are
                            subject to a hotel fee equal to the first right's
                            rate plus taxes and feels
                          </li>
                          <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            View your online itinerary for additional rule and
                            regulations
                          </li> */}
                            {importantInfo}
                          </ul>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "80px",
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "15px",
                              fontWeight: "600",
                            }}
                          >
                            <p>Room</p>
                            <p>Reserved For</p>
                            <p>Requests</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "15px",
                              fontWeight: "500",
                            }}
                          >
                            <p>
                              {
                                bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                  .ris[0].rt
                              }
                            </p>
                            <p>
                              {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.adt,
                                0
                              )}{" "}
                              Adult ,{" "}
                              {bookingDetails.itemInfos.HOTEL.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.chd,
                                0
                              )}{" "}
                              Children
                            </p>
                            <p>
                              {
                                bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                  .ris[0].srn
                              }
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col
                        md={3}
                        style={{
                          // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          padding: "0px",
                        }}
                      >
                        <h6
                          className={`${hidePrice ? "d-none" : "d-flex"}`}
                          style={{
                            padding: "10px 10px",
                            backgroundColor: "rgb(206, 224, 243)  ",
                            color: "black",
                            fontWeight: "600",
                          }}
                        >
                          Price Summary
                        </h6>
                        <Row
                          style={{ padding: "0px 10px", color: "black" }}
                          className={`${hidePrice ? "d-none" : "d-flex"}`}
                        >
                          <Col md={7} xs={9}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                fontWeight: "500",
                              }}
                            >
                              <p> Base Fare</p>
                              <p>Taxes</p>
                              {parseInt(money) > 0 && <p>Other Charges</p>}
                              <p>Total Fare</p>
                              <div>
                                {" "}
                                <p>Total</p>
                                <p>Collected by the hotel</p>
                              </div>
                            </div>
                          </Col>
                          <Col md={5} xs={3}>
                            <div className={`hotelBookingFifthDiv`}>
                              <p>
                                INR
                                {
                                  bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                    .ris[0].tfcs.BF
                                }
                              </p>
                              <p>
                                INR
                                {
                                  bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                    .ris[0].tfcs.TAF
                                }
                              </p>
                              {parseInt(money) > 0 && (
                                <p>INR{parseInt(money)}</p>
                              )}
                              <p>
                                INR
                                {
                                  bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                    .ris[0].tfcs.TF
                                }
                              </p>
                              <p>
                                INR
                                {bookingDetails.itemInfos.HOTEL.hInfo.ops[0]
                                  .ris[0].tfcs.TF + (money && parseInt(money))}
                              </p>
                            </div>
                          </Col>
                        </Row>
                        {/* <h6
                        style={{
                          backgroundColor: "rgb(206, 224, 243)",
                          color: "black",
                          fontWeight: "600",
                          padding: "10px",
                          marginTop: "15px",
                          overflow: "hidden",
                        }}
                      >
                        Additional Hotel Services
                      </h6>
                      <Row style={{ padding: "0px 10px", color: "black" }}>
                        <div>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Ea, non? Reprehenderit quo ut.
                        </div>
                        <p
                          style={{ marginTop: "10px", marginBottom: "10px  " }}
                        >
                          The following fees and deposits are charged by the
                          property
                        </p>
                        <ul>
                          <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            Check in time start at 3 PM
                          </li>
                          <li>
                            <span>
                              <RiArrowDropRightFill size={25} color="#171055" />
                            </span>
                            If a late check in is planned, Contact this hotel
                            directly for their late check in policy
                          </li>
                        </ul>
                        <p style={{ marginTop: "10px" }}>
                          The above list may not be comprehensive. Fees and
                          deposits may not includes tax and are subject to
                          change{" "}
                        </p>
                      </Row> */}
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <div
                      style={{
                        // marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgb(23 26 85)",
                        padding: "5px 0px",
                      }}
                    >
                      <div>
                        <img
                          src="/Images/logo-TripGo.png"
                          alt=""
                          width={100}
                          style={{ background: "white" }}
                        />
                      </div>
                      <div className="bookingConfirmHotelFooter">
                        <p style={{ color: "white" }}>
                          Ph. No- (+91) 70425 71259
                        </p>
                        <p style={{ color: "white" }}>
                          Email:support@TripGo.com
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingConfirm;
