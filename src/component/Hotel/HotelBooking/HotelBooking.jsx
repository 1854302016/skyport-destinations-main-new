import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBarcode,
  FaBars,
  FaCalendar,
  FaCaretDown,
  FaCaretRight,
  FaCheckCircle,
  FaCreditCard,
  FaEnvelope,
  FaGlobeAsia,
  FaMapMarkerAlt,
  FaPaypal,
  FaPhone,
  FaRoad,
  FaRupeeSign,
  FaStar,
  FaStreetView,
  FaUser,
} from "react-icons/fa";
import "./HotelBooking.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HotelBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { id, optionId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [formData, setFormData] = useState({
    adults: [],
    children: [],
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePayment = () => {};

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.post(
          "https://heritage.travelsdata.com/api/hotelTJ/hotel_review",
          {
            hotelId: id,
            optionId: optionId,
          }
        );
        console.log("response hotel detail", response.data);
        if (response.data.success === true) {
          const data = response.data.data;
          setHotelDetails(data);

          // Initialize form data for adults and children
          const initialFormData = data.hInfo.ops[0].ris.reduce(
            (acc, room, roomIndex) => {
              acc[roomIndex] = {
                adults: Array(room.adt).fill({
                  fN: "",
                  lN: "",
                  ti: "",
                  pt: "ADULT",
                  pan: "",
                  pNum: "",
                }),
                children: Array(room.chd).fill({
                  fN: "",
                  lN: "",
                  ti: "",
                  pt: "CHILD",
                  dob: "", // Date of Birth for children
                }),
              };
              return acc;
            },
            {}
          );

          setFormData(initialFormData);
        }
      } catch (error) {
        console.error("There was an error fetching the hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id, optionId]);

  const handleInputChange = (roomIndex, personIndex, type, key, value) => {
    setFormData((prevFormData) => {
      // Create a copy of the previous form data
      const updatedFormData = { ...prevFormData };

      // Ensure the room index exists
      if (!updatedFormData[roomIndex]) {
        updatedFormData[roomIndex] = { adults: [], children: [] };
      }

      // Ensure the type (adults or children) exists
      if (!updatedFormData[roomIndex][type]) {
        updatedFormData[roomIndex][type] = [];
      }

      // Ensure the person index exists
      if (!updatedFormData[roomIndex][type][personIndex]) {
        if (type === "adults") {
          updatedFormData[roomIndex][type][personIndex] = {
            fN: "",
            lN: "",
            ti: "",
            pt: "ADULT",
            pan: "",
            pNum: "",
          };
        } else {
          updatedFormData[roomIndex][type][personIndex] = {
            fN: "",
            lN: "",
            ti: "",
            pt: "CHILD",
            dob: "",
          };
        }
      }

      // Update the specific key with the new value
      updatedFormData[roomIndex][type][personIndex][key] = value;

      console.log("updated form data", updatedFormData);
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    console.log("Form data submitted:", formData);

    // e.preventDefault();

    // Extract booking ID from hotelDetails
    const bookingId = hotelDetails.bookingId;

    // Extract total amount from hotelDetails
    const amount = hotelDetails.hInfo.ops[0].tp;

    // Transform formData into the required format
    const roomTravellerInfo = Object.keys(formData).map((roomIndex) => {
      const roomData = formData[roomIndex];

      return {
        travellerInfo: [
          ...roomData.adults.map((adult) => ({
            fN: adult.fN,
            lN: adult.lN,
            pan: adult.pan,
            pNum: adult.passport, 
            ti: adult.ti,
            pt: adult.pt,
          })),
          ...roomData.children.map((child) => ({
            fN: child.fN,
            lN: child.lN,
            pan: child.pan,
            ti: child.ti,
            pt: child.pt,
            dob: child.dob,
          })),
        ],
      };
    });

    const payload = {
      bookingId,
      roomTravellerInfo,
      type: "HOTEL",
      deliveryInfo: {
        emails: ["arvind@gmail.com"], // Example email
        contacts: ["1234567890"], // Example contact
        code: ["+91"], // Example code
      },
      paymentInfos: [
        {
          amount: amount, // Total amount
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://heritage.travelsdata.com/api/hotelTJ/hotel_booking",
        payload
      );
      console.log("Booking response:", response.data);
      if (response.data.success) {
        navigate(`/hotel-booking-confirm/${response.data.data.bookingId}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const renderPersonFields = (person, personIndex, roomIndex, type) => (
    <div
      key={personIndex}
      style={{ borderBottom: "2px solid #cfcfcf", marginBlock: "20px" }}
    >
      <h2
        style={{
          // fontSize: "larger",
          fontWeight: "500",
          marginBlock: "10px",
          // color: "#2d3290",
        }}
      >
        {type === "adults" ? "Adult" : "Child"} {personIndex + 1}
      </h2>
      <Row>
        <Col sm={6}>
          <Form.Group
            controlId={`${roomIndex}-${type}-${personIndex}-firstName`}
          >
            <Form.Label>
              First Name
              <FaUser />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={person.fN}
              onChange={(e) =>
                handleInputChange(
                  roomIndex,
                  personIndex,
                  type,
                  "fN",
                  e.target.value
                )
              }
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group
            controlId={`${roomIndex}-${type}-${personIndex}-lastName`}
          >
            <Form.Label>
              Last Name
              <FaUser />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={person.lN}
              onChange={(e) =>
                handleInputChange(
                  roomIndex,
                  personIndex,
                  type,
                  "lN",
                  e.target.value
                )
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group controlId={`${roomIndex}-${type}-${personIndex}-title`}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mr/Mrs/Ms"
              value={person.ti}
              onChange={(e) =>
                handleInputChange(
                  roomIndex,
                  personIndex,
                  type,
                  "ti",
                  e.target.value
                )
              }
            />
          </Form.Group>
        </Col>
        {hotelDetails?.hInfo?.ops[0]?.ipr && (
        <Col sm={6}>
          <Form.Group controlId={`${roomIndex}-${type}-${personIndex}-pan`}>
            <Form.Label>PAN</Form.Label>
            <Form.Control
              type="text"
              placeholder="PAN Number"
              value={person.pan}
              onChange={(e) =>
                handleInputChange(
                  roomIndex,
                  personIndex,
                  type,
                  "pan",
                  e.target.value
                )
              }
            />
          </Form.Group>
        </Col>
        )}
        {hotelDetails?.hInfo?.ops[0]?.ipm && (
        <Col sm={6}>
          <Form.Group
            controlId={`${roomIndex}-${type}-${personIndex}-passport`}
          >
            <Form.Label>Passport</Form.Label>
            <Form.Control
              type="text"
              placeholder="Passport Number"
              value={person.passport}
              onChange={(e) =>
                handleInputChange(
                  roomIndex,
                  personIndex,
                  type,
                  "passport",
                  e.target.value
                )
              }
            />
          </Form.Group>
        </Col>
      )}
      </Row>
      {type === "children" && (
        <Row>
          <Col sm={6}>
            <Form.Group controlId={`${roomIndex}-${type}-${personIndex}-dob`}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={person.dob}
                onChange={(e) =>
                  handleInputChange(
                    roomIndex,
                    personIndex,
                    type,
                    "dob",
                    e.target.value
                  )
                }
                style={{ background: "#F7F9FB", border: "1px solid #eee" }}
              />
            </Form.Group>
          </Col>
        </Row>
      )}
    </div>
  );

  return (
    <>
      <div id="wrapper" className="hoteldetail">
        <div className="content">
          <div className="breadcrumbs-fs fl-wrap">
            <Container>
              <div className="breadcrumbs fl-wrap">
                <a href="#">
                  Home <FaAngleRight />
                </a>
                <a href="#">
                  Pages <FaAngleRight />
                </a>
                <span>Booking Page</span>
              </div>
            </Container>
          </div>
          <section className="middle-padding grey-blue-bg">
            <Container>
              <div className="list-main-wrap-title single-main-wrap-title fl-wrap">
                <h2>
                  Booking form for :{" "}
                  <span>{hotelDetails && hotelDetails.hInfo.name}</span>
                </h2>
              </div>
              <Row>
                <Col lg={8}>
                  <div className="booking-form-wrap">
                    <ul id="progressbar">
                      <li className={step >= 1 ? "active" : ""}>
                        <span>01.</span>Personal Info
                      </li>
                      {/* <li className={step >= 2 ? "active" : ""}>
                        <span>02.</span>Billing Address
                      </li> */}
                      <li className={step >= 2 ? "active" : ""}>
                        <span>02.</span>Payment Method
                      </li>
                      <li className={step >= 3 ? "active" : ""}>
                        <span>03.</span>Confirm
                      </li>
                    </ul>
                    <div className="list-single-main-item fl-wrap hidden-section tr-sec">
                      <div className="profile-edit-container">
                        <div className="custom-form">
                          {/* {hotelDetails && ( */}
                          <Form>
                            {step === 1 && (
                              <Fieldset
                              title="Your Personal Information"
                                onNext={nextStep}
                                nextText="Confirm and Pay"
                              >
                                {hotelDetails &&
                                  hotelDetails.hInfo.ops[0].ris.map(
                                    (room, roomIndex) => (
                                      <div key={roomIndex}>
                                        <h3
                                          style={{
                                            fontSize: "larger",
                                            fontWeight: "600",
                                            marginBlock: "10px",
                                            color: "#2d3290",
                                          }}
                                        >
                                          ROOM {roomIndex + 1}
                                        </h3>
                                        {formData[roomIndex] &&
                                          formData[roomIndex].adults.map(
                                            (adult, index) =>
                                              renderPersonFields(
                                                adult,
                                                index,
                                                roomIndex,
                                                "adults"
                                              )
                                          )}
                                        {formData[roomIndex] &&
                                          formData[roomIndex].children.map(
                                            (child, index) =>
                                              renderPersonFields(
                                                child,
                                                index,
                                                roomIndex,
                                                "children"
                                              )
                                          )}
                                      </div>
                                    )
                                  )}
                              </Fieldset>
                            )}
                            {/* {step === 2 && (
                              <Fieldset
                                title="Billing Address"
                                onNext={nextStep}
                                onPrev={prevStep}
                                nextText="Proceed to Payment"
                              >
                                <Row>
                                  <Col sm={6}>
                                    <Form.Group controlId="city">
                                      <Form.Label>
                                        City
                                        <FaGlobeAsia />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Your city"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Group controlId="country">
                                      <Form.Label>
                                        Country
                                        <FaBars />
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        defaultValue="United states"
                                      >
                                        <option>United states</option>
                                        <option>Asia</option>
                                        <option>Australia</option>
                                        <option>Europe</option>
                                        <option>South America</option>
                                        <option>Africa</option>
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={12}>
                                    <Form.Group controlId="street">
                                      <Form.Label>
                                        Street
                                        <FaRoad />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Your Street"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={8}>
                                    <Form.Group controlId="state">
                                      <Form.Label>
                                        State
                                        <FaStreetView />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Your State"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Group controlId="postalCode">
                                      <Form.Label>
                                        Postal Code
                                        <FaBarcode />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="123456"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <div
                                  controlId="additionalNotes"
                                  className="list-single-main-item-title fl-wrap"
                                >
                                  <h3>Additional Notes</h3>
                                </div>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  placeholder="Notes"
                                />
                              </Fieldset>
                            )} */}
                            {step === 2 && (
                              <Fieldset
                                title="Payment Method"
                                onNext={nextStep}
                                onPrev={prevStep}
                                //   onNext={handlePayment}
                                nextText="Confirm and Pay"
                              >
                                <Row>
                                  <Col sm={6}>
                                    <Form.Group controlId="cardholderName">
                                      <Form.Label>
                                        Cardholder's Name
                                        <FaUser />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder=""
                                        value="Adam Kowalsky"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Group controlId="cardNumber">
                                      <Form.Label>
                                        Card Number
                                        <FaCreditCard />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Group controlId="expiryMonth">
                                      <Form.Label>
                                        Expiry Month
                                        <FaCalendar />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="MM"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Group controlId="expiryYear">
                                      <Form.Label>
                                        Expiry Year
                                        <FaCalendar />
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="YY"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Group controlId="cvv">
                                      <Form.Label>
                                        CVV / CVC *<FaCreditCard />
                                      </Form.Label>
                                      <Form.Control
                                        type="password"
                                        placeholder="*"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm={4}>
                                    <p style={{ paddingTop: "20px" }}>
                                      *Three digits number on the back of your
                                      card
                                    </p>
                                  </Col>
                                </Row>
                                <div className="log-separator fl-wrap">
                                  <span>or</span>
                                </div>
                                <div className="soc-log fl-wrap">
                                  <p>Select Other Payment Method</p>
                                  <a href="#" className="paypal-log">
                                    <FaPaypal />
                                    Pay With Paypal
                                  </a>
                                </div>
                              </Fieldset>
                            )}

                            {step === 3 && (
                              <Fieldset title="Confirmation" onPrev={prevStep}>
                                <div className="success-table-container">
                                  <div className="success-table-header fl-wrap">
                                    <FaCheckCircle className="decsth" />
                                    <h4>
                                      Thank you. Your reservation has been
                                      received.
                                    </h4>
                                    <div className="clearfix"></div>
                                    <p>
                                      Your payment has been processed
                                      successfully.
                                    </p>
                                    <a
                                      // href="/hotel-booking-confirm"
                                      target="_blank"
                                      className="color-bg"
                                      onClick={() => {
                                        handleSubmit();
                                      }}
                                    >
                                      View Invoice
                                    </a>
                                  </div>
                                </div>
                              </Fieldset>
                            )}
                          </Form>
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                    {/* More list-single-main-item */}
                  </div>
                </Col>
                {hotelDetails && (
                  <Col lg={4}>
                    <div className="box-widget-item-header">
                      <h3>Your cart</h3>
                      <FaCaretDown />
                    </div>
                    <div className="cart-details fl-wrap">
                      <div className="cart-details_header">
                        <a href="#" className="widget-posts-img">
                          <Image
                            src={hotelDetails.hInfo.img[0].url}
                            className="respimg"
                            alt=""
                          />
                        </a>
                        <div className="widget-posts-descr">
                          <a href="#" title="">
                            {hotelDetails.hInfo.name}
                          </a>
                          <div
                            className="listing-rating card-popup-rainingvis"
                            data-starrating2="5"
                          >
                            {Array.from(
                              { length: hotelDetails.hInfo.rt },
                              (_, index) => (
                                <FaStar />
                              )
                            )}
                          </div>
                          <div className="geodir-category-location fl-wrap">
                            <a href="#">
                              <FaMapMarkerAlt /> {hotelDetails.hInfo.ad.adr},{" "}
                              {hotelDetails.hInfo.ad.adr2 &&
                                `${hotelDetails.hInfo.ad.adr2}, `}{" "}
                              {hotelDetails.hInfo.ad.city.name},{" "}
                              {hotelDetails.hInfo.ad.country.code}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="cart-details_text">
                        <ul className="cart_list">
                          <li>
                            Room Type{" "}
                            <span
                              style={{
                                maxWidth: "70%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {hotelDetails.hInfo.ops[0].ris[0].rc} <br />
                              <strong style={{ float: "right" }}>
                                <FaRupeeSign />
                                {hotelDetails.hInfo.ops[0].ris[0].tp}
                              </strong>
                            </span>
                          </li>
                          <li>
                            From{" "}
                            <span>
                              {hotelDetails.hInfo.ops[0].ris[0].checkInDate}
                            </span>
                          </li>
                          <li>
                            To{" "}
                            <span>
                              {hotelDetails.hInfo.ops[0].ris[0].checkOutDate}
                            </span>
                          </li>
                          <li>
                            Days{" "}
                            <span>
                              {Math.round(
                                (new Date(
                                  hotelDetails.hInfo.ops[0].ris[0].checkOutDate
                                ) -
                                  new Date(
                                    hotelDetails.hInfo.ops[0].ris[0].checkInDate
                                  )) /
                                  (1000 * 3600 * 24)
                              )}
                            </span>
                          </li>
                          <li>
                            Adults{" "}
                            <span>
                              {hotelDetails.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.adt,
                                0
                              )}
                            </span>
                          </li>
                          <li>
                            Childs{" "}
                            <span>
                              {hotelDetails.hInfo.ops[0].ris.reduce(
                                (total, room) => total + room.chd,
                                0
                              )}
                              {/* <strong>-10%</strong> */}
                            </span>
                          </li>
                          <li>
                            Other Charges{" "}
                            <span>
                              <strong>
                                <FaRupeeSign />0
                              </strong>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="cart-total">
                      <span className="cart-total_item_title">Total Cost</span>
                      <strong>
                        <FaRupeeSign />
                        {hotelDetails.hInfo.ops[0].ris[0].tp}
                      </strong>
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </section>
        </div>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </>
  );
};

const Fieldset = ({ title, onNext, onPrev, nextText, children }) => {
  return (
    <fieldset className="fl-wrap book_mdf">
      <div className="list-single-main-item-title fl-wrap">
        <h3>{title}</h3>
        <FaCaretDown />
      </div>
      {children}
      <div className="fw-separator"></div>
      <div>
        {onPrev && (
          <Button
            className="previous-form action-button back-form   color-bg"
            onClick={onPrev}
          >
            <FaAngleLeft />
            Back
          </Button>
        )}
        {onNext && (
          <Button
            className="next-form action-button btn no-shdow-btn color-bg"
            onClick={onNext}
          >
            {nextText}
            <FaAngleRight />
          </Button>
        )}
      </div>
    </fieldset>
  );
};

export default HotelBooking;
