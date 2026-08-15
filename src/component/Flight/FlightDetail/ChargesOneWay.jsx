import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaAngleDown, FaSyncAlt } from "react-icons/fa";
import FlightDetailSide from "./FlightDetailSide";

import { useNavigate } from "react-router-dom";

import PromoCode from "./PromoCode";
import { useCurrency } from "../../../context/CurrencyContext";

const ChargesOneWay = ({
  srdvIdx,
  flight,
  flight2,
  setShowdetail,
  showdetail,
  handleChangeCurrency,
  handleChangeCurrency2,
  walletData,
  setOpenPayBtn,
  openPayBtn,
  setPaymentGateway,
  paymentGateway,
  setEmiBtn,
  emiBtn,
  passengerSeatPreferences,
  passengerMealPreferences,
  passengerBaggagePreferences,
  validatePassengerData,
  totalSeatPrice,
  reviewPageDone,
  totalBaggagePrice,
  totalMealPrice,
  handlePayment,
  handleConfirmPendingBooking,
  handleTicketBookMistifly
}) => {
  const { formatPrice } = useCurrency();
  let totalMealCharges = passengerMealPreferences.reduce((total, meal) => {
    if (meal && meal.Price) {
      total += meal.Price;
    }
    return total;
  }, 0);

  let totalMealWithCharges =
    (flight && srdvIdx === "undefined" && flight.Fare.TotalMealCharges) +
    totalMealCharges;

  let totalSeatCharges = passengerSeatPreferences.reduce((total, meal) => {
    if (meal && meal.Price) {
      total += meal.Price;
    }
    return total;
  }, 0);

  let totalSeatWithCharges =
    (flight && srdvIdx === "undefined" && flight.Fare.TotalSeatCharges) +
    totalSeatCharges;

  let totalBaggageCharges = passengerBaggagePreferences.reduce(
    (total, meal) => {
      if (meal && meal.Price) {
        total += meal.Price;
      }
      return total;
    },
    0
  );

  let totalBaggageWithCharges =
    (flight && srdvIdx === "undefined" && flight.Fare.TotalBaggageCharges) +
    totalBaggageCharges;

  const handleFareRecheck = () => {
    // console.log("fare recheck clicked");
  };

  const navigate = useNavigate();
  // console.log("flightchargesoneway", flight2);

  console.log("openpaybtn2", openPayBtn);
  console.log("paymentgateway2", paymentGateway);

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {srdvIdx === "undefined" && (
        <Col
          md={3}
          // className={`flight_charges_mainCOntainer ${
          //   isSticky ? "position_Top" : "stick_positionTop"
          // }
          // `}
        >
          <Row className="fare_detail_desktop">
            <Col md={12}>
              {flight ? (
                <>
                  {flight2 ? (
                    <div className="flightBookingsecDiv">
                      <Row className="flightBookingSecDivRow3">
                        <Col xs={12} md={12}>
                          <span
                            className="lbl"
                            // onClick={() => setShowdetail(!showdetail)}
                          >
                            Fare Summary
                            {/* (
                        {flight.FareBreakdown.reduce(
                          (total, item) => total + item.PassengerCount,
                          0
                        )}{" "}
                        Travellers) */}
                          </span>{" "}
                          {/* <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "} */}
                          <span className="val">
                            {/* {flight.Fare.Currency}  */}
                            {flight.FareBreakdown.reduce(
                              (total, item) => total + item.PassengerCount,
                              0
                            )}{" "}
                            Travellers
                          </span>
                        </Col>
                      </Row>
                      {showdetail && (
                        <Row
                          className="flightBookingSecDivRow3"
                          style={{ width: "90%", marginInline: "auto" }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">
                              {flight.FareBreakdown[0].PassengerCount} x Adult
                            </span>{" "}
                            <span className="val">
                              {formatPrice(
                                flight.FareBreakdown[0].BaseFare +
                                  flight2.FareBreakdown[0].BaseFare
                              )}
                            </span>
                          </Col>
                          {flight.FareBreakdown[1] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[1].PassengerCount} x
                                Children
                              </span>{" "}
                              <span className="val">
                                {formatPrice(
                                  flight.FareBreakdown[1].BaseFare +
                                    flight2.FareBreakdown[1].BaseFare
                                )}
                              </span>
                            </Col>
                          )}
                          {flight.FareBreakdown[2] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[2].PassengerCount} x
                                Infants
                              </span>{" "}
                              <span className="val">
                                {formatPrice(
                                  flight.FareBreakdown[2].BaseFare +
                                    flight2.FareBreakdown[1].BaseFare
                                )}
                              </span>
                            </Col>
                          )}
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Base Fare</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.BaseFare + flight2.Fare.BaseFare
                            )}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Taxes & Surcharges</span> -{" "}
                          <span className="val">
                            {formatPrice(flight.Fare.Tax + flight2.Fare.Tax + flight2.Fare.OtherCharges + flight.Fare.OtherCharges)}
                          </span>
                        </Col>
                      </Row>

                      {totalMealPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Meals</span> -{" "}
                            <span className="val">
                              {formatPrice(totalMealPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalBaggagePrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Baggage</span> -{" "}
                            <span className="val">
                              {formatPrice(totalBaggagePrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalSeatPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Seats</span> -{" "}
                            <span className="val">
                              {formatPrice(totalSeatPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Discount</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.Discount + flight2.Fare.Discount
                            )}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        className="flightBookingsecDivRow"
                        style={{ marginTop: "0px" }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">You Pay:</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.PublishedFare +
                                flight2.Fare.PublishedFare +
                                totalSeatPrice +
                                totalMealPrice +
                                totalBaggagePrice
                            )}
                          </span>
                        </Col>
                      </Row>
                      {reviewPageDone ? (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={() => handleConfirmPendingBooking(true)}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Confirm Booking
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={async () => {
                            if (validatePassengerData()) {
                              setOpenPayBtn(true);
                              setPaymentGateway(true);
                            }
                          }}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Continue Booking
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flightBookingsecDiv">
                      <Row className="flightBookingSecDivRow3">
                        <Col xs={12} md={12}>
                          <span
                            className="lbl"
                            // onClick={() => setShowdetail(!showdetail)}
                          >
                            Fare Summary
                            {/* (
                        {flight.FareBreakdown.reduce(
                          (total, item) => total + item.PassengerCount,
                          0
                        )}{" "}
                        Travellers) */}
                          </span>{" "}
                          {/* <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "} */}
                          <span className="val">
                            {/* {flight.Fare.Currency}  */}
                            {flight.FareBreakdown.reduce(
                              (total, item) => total + item.PassengerCount,
                              0
                            )}{" "}
                            Travellers
                          </span>
                        </Col>
                      </Row>
                      {showdetail && (
                        <Row
                          className="flightBookingSecDivRow3"
                          style={{ width: "90%", marginInline: "auto" }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">
                              {flight.FareBreakdown[0].PassengerCount} x Adult
                            </span>{" "}
                            <span className="val">
                              {formatPrice(flight.FareBreakdown[0].BaseFare)}
                            </span>
                          </Col>
                          {flight.FareBreakdown[1] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[1].PassengerCount} x
                                Children
                              </span>{" "}
                              <span className="val">
                                {formatPrice(flight.FareBreakdown[1].BaseFare)}
                              </span>
                            </Col>
                          )}
                          {flight.FareBreakdown[2] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[2].PassengerCount} x
                                Infants
                              </span>{" "}
                              <span className="val">
                                {formatPrice(flight.FareBreakdown[2].BaseFare)}
                              </span>
                            </Col>
                          )}
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Base Fare</span> -{" "}
                          <span className="val">
                            {formatPrice(flight.Fare.BaseFare)}
                          </span>
                        </Col>
                      </Row>
                      {totalMealPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Meals</span> -{" "}
                            <span className="val">
                              {formatPrice(totalMealPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalBaggagePrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Baggage</span> -{" "}
                            <span className="val">
                              {formatPrice(totalBaggagePrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalSeatPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Seats</span> -{" "}
                            <span className="val">
                              {formatPrice(totalSeatPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Taxes & Surcharges</span> -{" "}
                          <span className="val">
                            {formatPrice(flight.Fare.Tax + flight.Fare.OtherCharges)}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Discount</span> -{" "}
                          <span className="val">
                            {formatPrice(flight.Fare.Discount)}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        className="flightBookingsecDivRow"
                        style={{ marginTop: "0px" }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">You Pay:</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.PublishedFare +
                                totalSeatPrice +
                                totalMealPrice +
                                totalBaggagePrice
                            )}
                          </span>
                        </Col>
                      </Row>
                      {reviewPageDone ? (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={() => handleConfirmPendingBooking(true)}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Confirm Booking
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={async () => {
                            if (validatePassengerData()) {
                              setOpenPayBtn(true);
                              setPaymentGateway(true);
                            }
                          }}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Continue Booking
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <FlightDetailSide />
              )}
            </Col>
          </Row>
          <PromoCode />
        </Col>
      )}
      {srdvIdx === "SrdvTJ" && (
        <Col md={3}>
          <Row>
            <Col md={12}>
              {flight ? (
                <div className="flightBookingsecDiv">
                  <Row className="flightBookingSecDivRow3">
                    <Col xs={12} md={12}>
                      <span
                        className="lbl"
                        onClick={() => setShowdetail(!showdetail)}
                      >
                        Base Fare (
                        {Object.values(flight.searchQuery.paxInfo).reduce(
                          (total, quantity) => total + quantity,
                          0
                        )}{" "}
                        Travellers)
                      </span>{" "}
                      <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "}
                      <span className="val">
                        {formatPrice(
                          flight.totalPriceInfo.totalFareDetail.fC.BF
                        )}
                      </span>
                    </Col>
                  </Row>
                  {showdetail && (
                    <Row
                      className="flightBookingSecDivRow3"
                      style={{ width: "90%", marginInline: "auto" }}
                    >
                      <Col xs={12} md={12}>
                        <span className="lbl">
                          {flight.searchQuery.paxInfo.ADULT} x Adult
                        </span>{" "}
                        <span className="val">
                          {formatPrice(
                            flight.tripInfos[0].totalPriceList[0].fd.ADULT.fC.BF
                          )}
                        </span>
                      </Col>
                      {flight.tripInfos[0].totalPriceList[0].fd.CHILD && (
                        <Col xs={12} md={12}>
                          <span className="lbl">
                            {flight.searchQuery.paxInfo.CHILD} x Children
                          </span>{" "}
                          <span className="val">
                            {formatPrice(
                              flight.tripInfos[0].totalPriceList[0].fd.CHILD.fC
                                .BF
                            )}
                          </span>
                        </Col>
                      )}
                      {flight.tripInfos[0].totalPriceList[0].fd.INFANT && (
                        <Col xs={12} md={12}>
                          <span className="lbl">
                            {flight.searchQuery.paxInfo.INFANT} x Infants
                          </span>{" "}
                          <span className="val">
                            {formatPrice(
                              flight.tripInfos[0].totalPriceList[0].fd.INFANT.fC
                                .BF
                            )}
                          </span>
                        </Col>
                      )}
                    </Row>
                  )}
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Taxes & Surcharges</span> -{" "}
                      <span className="val">
                        {formatPrice(flight.totalPriceInfo.totalFareDetail.fC.TAF)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Discount</span> -{" "}
                      <span className="val">
                        {/* {handleChangeCurrency(flight.Fare.Discount)} */}
                        {formatPrice(0)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Service Fee</span> -{" "}
                      <span className="val">
                        {/* {handleChangeCurrency(flight.Fare.ServiceFee)} */}
                        {formatPrice(0)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Excess Baggage (0KG )</span> -{" "}
                      <span className="val">
                        {formatPrice(totalBaggageWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Meal (0)</span> -{" "}
                      <span className="val">
                        {formatPrice(totalMealWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Seat Charges</span> -{" "}
                      <span className="val">
                        {formatPrice(totalSeatWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    className="flightBookingSecDivRow2"
                    style={{ paddingBlock: "8px" }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Total Fare</span> -{" "}
                      <span className="val">
                        {formatPrice(
                          flight.totalPriceInfo.totalFareDetail.fC.TF
                        )}
                      </span>
                    </Col>
                  </Row>
                  <Row className="flightBookingsecDivRow">
                    <Col xs={12} md={12}>
                      <span className="lbl">You Pay:</span> -{" "}
                      <span className="val">
                        {formatPrice(
                          flight.totalPriceInfo.totalFareDetail.fC.TF
                        )}
                      </span>
                    </Col>
                  </Row>
                  {/* <Row > */}
                  {/* <Col> */}
                  <div
                    style={{ marginLeft: "-15px", marginRight: "-15px" }}
                    onClick={() => {
                      setOpenPayBtn(true);
                      setPaymentGateway(true);
                    }}
                  >
                    {" "}
                    <button className="ewalletbtn">Pay Now</button>
                  </div>
                  {/* </Col> */}
                  {/* </Row> */}
                </div>
              ) : (
                <FlightDetailSide />
              )}
            </Col>
            {/* <Col md={12} className="resp-mt-20" style={{ marginTop: "20px" }}>
              <Card
                className=" "
                style={{ marginBottom: "5px", marginTop: "10px" }}
              >
                <Card.Body style={{ padding: "10px" }}>
                  <h2
                    className="boxheading walletMainDiv"
                    style={{
                      background: "#f4f4f4",
                      color: "black",
                      paddingInline: "15px",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                    Fare has been reduced, Wanna Search Again?
                  </h2>
                  <div className="dashinnerboxs">
                    <div
                   
                      onClick={() => {
                      
                        navigate(-1);
                      }}
                    >
                      {" "}
                      <button className="ewalletbtn">Search Again</button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
          {/* {flight ? (
            <Row style={{ marginTop: "15px" }}>
              {walletData.Wallet >
              flight.totalPriceInfo.totalFareDetail.fC.TF ? (
                <Col md={12} className="resp-mt-20">
                  <Card
                    className="dashboardbox "
                    style={{ marginBottom: "5px" }}
                  >
                    <Card.Body style={{ padding: "0px" }}>
                      <h2
                        className="boxheading walletMainDiv"
                        style={{
                          background: "#f4f4f4",
                          color: "black",
                          paddingInline: "15px",
                        }}
                      >
                        Pay using eWallet
                      </h2>
                      <div className="dashinnerboxs">
                        <div
                          className="ewalletMainDiv"
                          style={{ borderBottom: "1px solid #e4e4e4" }}
                        >
                          <p>Current Balance </p>
                          <p>${handleChangeCurrency(walletData.Wallet)}</p>
                        </div>
                        <div
                          className="ewalletMainDiv"
                          style={{ borderBottom: "1px solid #e4e4e4" }}
                        >
                          <p>Flight Amount </p>
                          <p>
                            $
                            {handleChangeCurrency(
                             flight.totalPriceInfo.totalFareDetail.fC.TF
                            )}
                          </p>
                        </div>
                        <div
                          className="ewalletMainDiv"
                          style={{ borderBottom: "1px solid #e4e4e4" }}
                        >
                          <p>Amount to deduct </p>
                          <p>
                            <HiMiniMinusSmall />$
                            {handleChangeCurrency(
                             flight.totalPriceInfo.totalFareDetail.fC.TF
                            )}
                          </p>
                        </div>
                        <div
                          className="ewalletMainDiv"
                          style={{ borderBottom: "1px solid #e4e4e4" }}
                        >
                          <p>Remaining Balance </p>
                          <p>
                            $
                            {handleChangeCurrency(
                              walletData.Wallet -
                                (flight.totalPriceInfo.totalFareDetail.fC.TF)
                            )}
                          </p>
                        </div>
                        <div
                         
                          onClick={() => {
                            setOpenPayBtn(true);
                            setPaymentGateway(true);
                        
                          }}
                        >
                          {" "}
                          <button className="ewalletbtn">Pay Now</button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                <Col md={12} className="resp-mt-20">
                  <Card
                    className="dashboardbox "
                    style={{ marginBottom: "5px" }}
                  >
                    <Card.Body style={{ padding: "0px" }}>
                      <h2 className="boxheading walletMainDiv">
                        Pay using eWallet
                      </h2>
                      <div className="dashinnerboxs">
                        <div className="ewalletMainDiv">
                          <p>Current Balance </p>
                          <div style={{ width: "45px" }}>
                            <p>
                              ${handleChangeCurrency(walletData.Wallet)}
                              <div
                                style={{
                                  fontSize: "11px",
                                  marginLeft: "-74px",
                                  fontWeight: "500",
                                  color: "red",
                                }}
                              >
                                (Insufficient Balance)
                              </div>
                            </p>
                          </div>
                        </div>
                        <div className="ewalletMainDiv">
                          <p>Flight Amount </p>
                          <p>
                            $
                            {handleChangeCurrency(
                              flight.totalPriceInfo.totalFareDetail.fC.TF
                            )}
                          </p>
                        </div>
                        <Link style={{ width: "100%" }} to="/wallet">
                          <button className="ewalletbtn">Top Up Request</button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          ) : (
            <FlightPayDetail />
          )} */}
        </Col>
      )}
      {srdvIdx === "SrdvP" && (
        <Col md={3}>
          <Row>
            <Col md={12} style={{}}>
              <p
                style={{
                  marginBottom: "10px",
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "5px",
                }}
                onClick={() => handleFareRecheck()}
              >
                {" "}
                Fare Recheck <FaSyncAlt style={{ marginLeft: "5px" }} />
              </p>
            </Col>
            <Col md={12}>
              {flight ? (
                <div className="flightBookingsecDiv">
                  <Row className="flightBookingSecDivRow3">
                    <Col xs={12} md={12}>
                      <span
                        className="lbl"
                        onClick={() => setShowdetail(!showdetail)}
                      >
                        Base Fare (
                        {flight.AirItineraryPricingInfo.PtcFareBreakdown.reduce(
                          (total, item) =>
                            total + item.PassengerTypeQuantity.Quantity,
                          0
                        )}{" "}
                        Travellers)
                      </span>{" "}
                      <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "}
                      <span className="val">
                        {formatPrice(
                          flight.AirItineraryPricingInfo.ItinTotalFare
                            .BaseFare
                        )}
                      </span>
                    </Col>
                  </Row>
                  {showdetail && (
                    <Row
                      className="flightBookingSecDivRow3"
                      style={{ width: "90%", marginInline: "auto" }}
                    >
                      <Col xs={12} md={12}>
                        <span className="lbl">
                          {
                            flight.AirItineraryPricingInfo.PtcFareBreakdown[0]
                              .PassengerTypeQuantity.Quantity
                          }{" "}
                          x Adult
                        </span>{" "}
                        <span className="val">
                          {formatPrice(
                            flight.AirItineraryPricingInfo.PtcFareBreakdown[0]
                              .PassengerFare.BaseFare
                          )}
                        </span>
                      </Col>
                      {flight.AirItineraryPricingInfo.PtcFareBreakdown[1] && (
                        <Col xs={12} md={12}>
                          <span className="lbl">
                            {
                              flight.AirItineraryPricingInfo.PtcFareBreakdown[1]
                                .PassengerTypeQuantity.Quantity
                            }{" "}
                            x Children
                          </span>{" "}
                          <span className="val">
                            {formatPrice(
                              flight.AirItineraryPricingInfo
                                .PtcFareBreakdown[1].PassengerFare.BaseFare
                            )}
                          </span>
                        </Col>
                      )}
                      {flight.AirItineraryPricingInfo.PtcFareBreakdown[2] && (
                        <Col xs={12} md={12}>
                          <span className="lbl">
                            {
                              flight.AirItineraryPricingInfo.PtcFareBreakdown[2]
                                .PassengerTypeQuantity.Quantity
                            }{" "}
                            x Infants
                          </span>{" "}
                          <span className="val">
                            {formatPrice(
                              flight.AirItineraryPricingInfo
                                .PtcFareBreakdown[2].PassengerFare.BaseFare
                            )}
                          </span>
                        </Col>
                      )}
                    </Row>
                  )}
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Taxes & Surcharges</span> -{" "}
                      <span className="val">
                        {formatPrice(
                          flight.AirItineraryPricingInfo.ItinTotalFare
                            .ServiceTax +
                            flight.AirItineraryPricingInfo.ItinTotalFare
                              .TotalTax
                        )}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Discount</span> -{" "}
                      <span className="val">
                        {/* {handleChangeCurrency(flight.Fare.Discount)} */}
                        {formatPrice(0)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Service Fee</span> -{" "}
                      <span className="val">
                        {/* {handleChangeCurrency(flight.Fare.ServiceFee)} */}
                        {formatPrice(0)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Excess Baggage (0KG )</span> -{" "}
                      <span className="val">
                        {formatPrice(totalBaggageWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Meal (0)</span> -{" "}
                      <span className="val">
                        {formatPrice(totalMealWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #e4e4e4",
                      paddingBlock: "8px",
                    }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Seat Charges</span> -{" "}
                      <span className="val">
                        {formatPrice(totalSeatWithCharges)}
                      </span>
                    </Col>
                  </Row>
                  <Row
                    className="flightBookingSecDivRow2"
                    style={{ paddingBlock: "8px" }}
                  >
                    <Col xs={12} md={12}>
                      <span className="lbl">Total Fare</span> -{" "}
                      <span className="val">
                        {formatPrice(
                          flight.AirItineraryPricingInfo.ItinTotalFare
                            .TotalFare
                        )}
                      </span>
                    </Col>
                  </Row>
                  <Row className="flightBookingsecDivRow">
                    <Col xs={12} md={12}>
                      <span className="lbl">You Pay:</span> -{" "}
                      <span className="val">
                        {formatPrice(
                          flight.AirItineraryPricingInfo.ItinTotalFare
                            .TotalFare
                        )}
                      </span>
                    </Col>
                  </Row>
                </div>
              ) : (
                <FlightDetailSide />
              )}
            </Col>
            <Col md={12} className="resp-mt-20">
              <Card
                className=" "
                style={{ marginBottom: "5px", marginTop: "10px" }}
              >
                <Card.Body style={{ padding: "0px" }}>
                  <h2
                    className="boxheading walletMainDiv"
                    style={{
                      background: "#f4f4f4",
                      color: "black",
                      paddingInline: "15px",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                    Fare has been reduced, Wanna Search Again?
                  </h2>
                  <div className="dashinnerboxs">
                    <div
                      // style={{ width: "100%" }}
                      onClick={() => {
                        // setOpenPayBtn(!openPayBtn);
                        // handleTicketBook();
                        navigate(-1);
                      }}
                    >
                      {" "}
                      <button className="ewalletbtn">Search Again</button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      )}

{srdvIdx === "EwebM" && (
        <Col
          md={3}
          // className={`flight_charges_mainCOntainer ${
          //   isSticky ? "position_Top" : "stick_positionTop"
          // }
          // `}
        >
          <Row className="fare_detail_desktop">
            <Col md={12}>
              {flight ? (
                <>
                  {flight2 ? (
                    <div className="flightBookingsecDiv">
                      <Row className="flightBookingSecDivRow3">
                        <Col xs={12} md={12}>
                          <span
                            className="lbl"
                            // onClick={() => setShowdetail(!showdetail)}
                          >
                            Fare Summary
                            {/* (
                        {flight.FareBreakdown.reduce(
                          (total, item) => total + item.PassengerCount,
                          0
                        )}{" "}
                        Travellers) */}
                          </span>{" "}
                          {/* <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "} */}
                          <span className="val">
                            {/* {flight.Fare.Currency}  */}
                            {flight.FareBreakdown.reduce(
                              (total, item) => total + item.PassengerCount,
                              0
                            )}{" "}
                            Travellers
                          </span>
                        </Col>
                      </Row>
                      {showdetail && (
                        <Row
                          className="flightBookingSecDivRow3"
                          style={{ width: "90%", marginInline: "auto" }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">
                              {flight.FareBreakdown[0].PassengerCount} x Adult
                            </span>{" "}
                            <span className="val">
                              {formatPrice(
                                flight.FareBreakdown[0].BaseFare +
                                  flight2.FareBreakdown[0].BaseFare
                              )}
                            </span>
                          </Col>
                          {flight.FareBreakdown[1] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[1].PassengerCount} x
                                Children
                              </span>{" "}
                              <span className="val">
                                {formatPrice(
                                  flight.FareBreakdown[1].BaseFare +
                                    flight2.FareBreakdown[1].BaseFare
                                )}
                              </span>
                            </Col>
                          )}
                          {flight.FareBreakdown[2] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[2].PassengerCount} x
                                Infants
                              </span>{" "}
                              <span className="val">
                                {formatPrice(
                                  flight.FareBreakdown[2].BaseFare +
                                    flight2.FareBreakdown[1].BaseFare
                                )}
                              </span>
                            </Col>
                          )}
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Base Fare</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.BaseFare + flight2.Fare.BaseFare
                            )}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Taxes & Surcharges</span> -{" "}
                          <span className="val">
                            {formatPrice(flight.Fare.Tax + flight2.Fare.Tax + flight2.Fare.OtherCharges + flight.Fare.OtherCharges)}
                          </span>
                        </Col>
                      </Row>

                      {totalMealPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Meals</span> -{" "}
                            <span className="val">
                              {formatPrice(totalMealPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalBaggagePrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Baggage</span> -{" "}
                            <span className="val">
                              {formatPrice(totalBaggagePrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalSeatPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Seats</span> -{" "}
                            <span className="val">
                              {formatPrice(totalSeatPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Discount</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.Discount + flight2.Fare.Discount
                            )}
                          </span>
                        </Col>
                      </Row>

                      <Row
                        className="flightBookingsecDivRow"
                        style={{ marginTop: "0px" }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">You Pay:</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.Fare.PublishedFare +
                                flight2.Fare.PublishedFare +
                                totalSeatPrice +
                                totalMealPrice +
                                totalBaggagePrice
                            )}
                          </span>
                        </Col>
                      </Row>
                      {reviewPageDone ? (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={handleTicketBookMistifly}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Confirm Booking
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={async () => {
                            if (validatePassengerData()) {
                              setOpenPayBtn(true);
                              setPaymentGateway(true);
                            }
                          }}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Continue Booking
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flightBookingsecDiv">
                      <Row className="flightBookingSecDivRow3">
                        <Col xs={12} md={12}>
                          <span
                            className="lbl"
                            // onClick={() => setShowdetail(!showdetail)}
                          >
                            Fare Summary
                            {/* (
                        {flight.FareBreakdown.reduce(
                          (total, item) => total + item.PassengerCount,
                          0
                        )}{" "}
                        Travellers) */}
                          </span>{" "}
                          {/* <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "} */}
                          <span className="val">
                            {/* {flight.Fare.Currency}  */}
                            {flight.PricedItineraries[0] && flight.PricedItineraries[0].AirItineraryPricingInfo.PTC_FareBreakdowns.reduce(
                              (total, item) => total + item.PassengerTypeQuantity.Quantity,
                              0
                            )}{" "}
                            Travellers
                          </span>
                        </Col>
                      </Row>
                      {/* {showdetail && (
                        <Row
                          className="flightBookingSecDivRow3"
                          style={{ width: "90%", marginInline: "auto" }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">
                              {flight.PricedItineraries[0].AirItineraryPricingInfo.PTC_FareBreakdowns[0].PassengerTypeQuantity.Quantity} x Adult
                            </span>{" "}
                            <span className="val">
                              $
                              {Math.round(flight.PricedItineraries[0].AirItineraryPricingInfo.PTC_FareBreakdowns[0].PassengerFare.BaseFare.Amount)}
                            </span>
                          </Col>
                          {flight.FareBreakdown[1] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[1].PassengerCount} x
                                Children
                              </span>{" "}
                              <span className="val">
                               $
                                {Math.round(flight.FareBreakdown[1].BaseFare)}
                              </span>
                            </Col>
                          )}
                          {flight.FareBreakdown[2] && (
                            <Col xs={12} md={12}>
                              <span className="lbl">
                                {flight.FareBreakdown[2].PassengerCount} x
                                Infants
                              </span>{" "}
                              <span className="val">
                               $
                                {Math.round(flight.FareBreakdown[2].BaseFare)}
                              </span>
                            </Col>
                          )}
                        </Row>
                      )} */}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Base Fare</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare.EquivFare.Amount
                            )}
                          </span>
                        </Col>
                      </Row>
                      {/* {totalMealPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Meals</span> -{" "}
                            <span className="val">
                            $
                              {Math.round(totalMealPrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalBaggagePrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Baggage</span> -{" "}
                            <span className="val">
                            $
                              {Math.round(totalBaggagePrice)}
                            </span>
                          </Col>
                        </Row>
                      )}
                      {totalSeatPrice !== 0 && (
                        <Row
                          className="flightBookingSecDivRow2"
                          style={{
                            paddingBlock: "8px",
                            borderBottom: "1px solid #e4e4e4",
                          }}
                        >
                          <Col xs={12} md={12}>
                            <span className="lbl">Seats</span> -{" "}
                            <span className="val">
                            $
                              {Math.round(totalSeatPrice)}
                            </span>
                          </Col>
                        </Row>
                      )} */}
                      <Row
                        style={{
                          borderBottom: "1px solid #e4e4e4",
                          paddingBlock: "8px",
                        }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">Taxes & Surcharges</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare.TotalTax.Amount
                            )}
                          </span>
                        </Col>
                      </Row>



                      <Row
                        className="flightBookingsecDivRow"
                        style={{ marginTop: "0px" }}
                      >
                        <Col xs={12} md={12}>
                          <span className="lbl">You Pay:</span> -{" "}
                          <span className="val">
                            {formatPrice(
                              flight.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount
                            )}
                          </span>
                        </Col>
                      </Row>
                      {reviewPageDone ? (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={handleTicketBookMistifly}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Confirm Booking
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ marginLeft: "-15px", marginRight: "-15px" }}
                          onClick={async () => {
                            if (validatePassengerData()) {
                              setOpenPayBtn(true);
                              setPaymentGateway(true);
                            }
                          }}
                        >
                          {" "}
                          <button className="ewalletbtn">
                            Continue Booking
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <FlightDetailSide />
              )}
            </Col>
          </Row>
          <PromoCode />
        </Col>
      )}

    </>
  );
};

export default ChargesOneWay;
