import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import FlightDetailSide from "./FlightDetailSide";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ChargesRound = ({
  srdvIdx,
  flight,
  flight2,
  setShowdetail,
  showdetail,
  handleChangeCurrency,
  walletData,
  setOpenPayBtn,
  openPayBtn,
}) => {
  return (
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
                    {flight.FareBreakdown.reduce(
                      (total, item) => total + item.PassengerCount,
                      0
                    )}{" "}
                    Travellers)
                  </span>{" "}
                  <FaAngleDown onClick={() => setShowdetail(!showdetail)} />{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}  */}₹
                    {handleChangeCurrency(
                      flight.Fare.BaseFare + flight2.Fare.BaseFare
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
                      {flight.FareBreakdown[0].PassengerCount} x Adult
                    </span>{" "}
                    <span className="val">
                      {/* {flight.FareBreakdown[0].Currency} */}₹
                      {handleChangeCurrency(
                        flight.FareBreakdown[0].BaseFare +
                          flight2.FareBreakdown[0].BaseFare
                      )}
                    </span>
                  </Col>
                  {flight.FareBreakdown[1] && (
                    <Col xs={12} md={12}>
                      <span className="lbl">
                        {flight.FareBreakdown[1].PassengerCount} x Children
                      </span>{" "}
                      <span className="val">
                        {/* {flight.FareBreakdown[1].Currency} */}₹
                        {handleChangeCurrency(
                          flight.FareBreakdown[1].BaseFare +
                            flight2.FareBreakdown[1].BaseFare
                        )}
                      </span>
                    </Col>
                  )}
                  {flight.FareBreakdown[2] && (
                    <Col xs={12} md={12}>
                      <span className="lbl">
                        {flight.FareBreakdown[2].PassengerCount} x Infants
                      </span>{" "}
                      <span className="val">
                        {/* {flight.FareBreakdown[2].Currency} */}₹
                        {handleChangeCurrency(
                          flight.FareBreakdown[2].BaseFare +
                            flight2.FareBreakdown[2].BaseFare
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
                    {/* {flight.Fare.Currency} */}₹
                    {handleChangeCurrency(flight.Fare.Tax + flight2.Fare.Tax)}
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
                    {/* {flight.Fare.Currency} */}₹
                    {handleChangeCurrency(
                      flight.Fare.Discount + flight2.Fare.Discount
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
                  <span className="lbl">Service Fee</span> -{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}  */}₹
                    {handleChangeCurrency(
                      flight.Fare.ServiceFee + flight2.Fare.ServiceFee
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
                  <span className="lbl">Excess Baggage (0KG )</span> -{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}{" "} */}₹
                    {handleChangeCurrency(
                      flight.Fare.TotalBaggageCharges +
                        flight2.Fare.TotalBaggageCharges
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
                  <span className="lbl">Meal (0)</span> -{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}{" "} */}₹
                    {handleChangeCurrency(
                      flight.Fare.TotalMealCharges +
                        flight2.Fare.TotalMealCharges
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
                  <span className="lbl">Seat Charges</span> -{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}{" "} */}₹
                    {handleChangeCurrency(
                      flight.Fare.TotalSeatCharges +
                        flight2.Fare.TotalSeatCharges
                    )}
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
                    {/* {flight.Fare.Currency}{" "} */}₹
                    {handleChangeCurrency(
                      flight.Fare.PublishedFare -
                        flight.Fare.Discount +
                        flight.Fare.ServiceFee +
                        flight.Fare.TotalBaggageCharges +
                        flight.Fare.TotalMealCharges +
                        flight.Fare.TotalSeatCharges +
                        (flight2.Fare.PublishedFare -
                          flight2.Fare.Discount +
                          flight2.Fare.ServiceFee +
                          flight2.Fare.TotalBaggageCharges +
                          flight2.Fare.TotalMealCharges +
                          flight2.Fare.TotalSeatCharges)
                    )}
                  </span>
                </Col>
              </Row>
              <Row className="flightBookingsecDivRow">
                <Col xs={12} md={12}>
                  <span className="lbl">You Pay:</span> -{" "}
                  <span className="val">
                    {/* {flight.Fare.Currency}{" "} */}₹
                    {handleChangeCurrency(
                      flight.Fare.PublishedFare -
                        flight.Fare.Discount +
                        flight.Fare.ServiceFee +
                        flight.Fare.TotalBaggageCharges +
                        flight.Fare.TotalMealCharges +
                        flight.Fare.TotalSeatCharges +
                        (flight2.Fare.PublishedFare -
                          flight2.Fare.Discount +
                          flight2.Fare.ServiceFee +
                          flight2.Fare.TotalBaggageCharges +
                          flight2.Fare.TotalMealCharges +
                          flight2.Fare.TotalSeatCharges)
                    )}
                  </span>
                </Col>
              </Row>
            </div>
          ) : (
            <FlightDetailSide />
          )}
        </Col>
      </Row>
      {flight && (
        <Row style={{ marginTop: "15px" }}>
          {handleChangeCurrency(`${walletData.Wallet}`) >
          handleChangeCurrency(
            `${
              flight.Fare.PublishedFare -
              flight.Fare.Discount +
              flight.Fare.ServiceFee +
              flight.Fare.TotalBaggageCharges +
              flight.Fare.TotalMealCharges +
              flight.Fare.TotalSeatCharges +
              (flight2.Fare.PublishedFare -
                flight2.Fare.Discount +
                flight2.Fare.ServiceFee +
                flight2.Fare.TotalBaggageCharges +
                flight2.Fare.TotalMealCharges +
                flight2.Fare.TotalSeatCharges)
            }`
          ) ? (
            <Col md={12} className="resp-mt-20">
              <Card className="dashboardbox " style={{ marginBottom: "5px" }}>
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
                      <p>₹{handleChangeCurrency(walletData.Wallet)}</p>
                    </div>
                    <div
                      className="ewalletMainDiv"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <p>Flight Amount </p>
                      <p>
                        ₹
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            flight.Fare.TotalBaggageCharges +
                            flight.Fare.TotalMealCharges +
                            flight.Fare.TotalSeatCharges +
                            (flight2.Fare.PublishedFare -
                              flight2.Fare.Discount +
                              flight2.Fare.ServiceFee +
                              flight2.Fare.TotalBaggageCharges +
                              flight2.Fare.TotalMealCharges +
                              flight2.Fare.TotalSeatCharges)
                        )}
                      </p>
                    </div>
                    <div
                      className="ewalletMainDiv"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <p>Amount to deduct </p>
                      <p>
                        <HiMiniMinusSmall />₹
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            flight.Fare.TotalBaggageCharges +
                            flight.Fare.TotalMealCharges +
                            flight.Fare.TotalSeatCharges +
                            (flight2.Fare.PublishedFare -
                              flight2.Fare.Discount +
                              flight2.Fare.ServiceFee +
                              flight2.Fare.TotalBaggageCharges +
                              flight2.Fare.TotalMealCharges +
                              flight2.Fare.TotalSeatCharges)
                        )}
                      </p>
                    </div>
                    <div
                      className="ewalletMainDiv"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <p>Remaining Balance </p>
                      <p>
                        {/* <HiPlusSmall /> */}₹
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            (flight.Fare.PublishedFare -
                              flight.Fare.Discount +
                              flight.Fare.ServiceFee +
                              flight.Fare.TotalBaggageCharges +
                              flight.Fare.TotalMealCharges +
                              flight.Fare.TotalSeatCharges +
                              (flight2.Fare.PublishedFare -
                                flight2.Fare.Discount +
                                flight2.Fare.ServiceFee +
                                flight2.Fare.TotalBaggageCharges +
                                flight2.Fare.TotalMealCharges +
                                flight2.Fare.TotalSeatCharges))
                          }`
                        )}
                      </p>
                    </div>
                    <div
                      // style={{ width: "100%" }}
                      onClick={() => {
                        setOpenPayBtn(!openPayBtn);
                        // handleTicketBook();
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
              <Card className="dashboardbox " style={{ marginBottom: "5px" }}>
                <Card.Body style={{ padding: "0px" }}>
                  <h2 className="boxheading walletMainDiv">
                    Pay using eWallet
                  </h2>
                  <div className="dashinnerboxs">
                    <div className="ewalletMainDiv">
                      <p>Current Balance </p>
                      <div style={{ width: "45px" }}>
                        <p>
                          ₹{walletData.Wallet}
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
                        ₹
                        {flight.Fare.PublishedFare -
                          flight.Fare.Discount +
                          flight.Fare.ServiceFee +
                          flight.Fare.TotalBaggageCharges +
                          flight.Fare.TotalMealCharges +
                          flight.Fare.TotalSeatCharges +
                          (flight2.Fare.PublishedFare -
                            flight2.Fare.Discount +
                            flight2.Fare.ServiceFee +
                            flight2.Fare.TotalBaggageCharges +
                            flight2.Fare.TotalMealCharges +
                            flight2.Fare.TotalSeatCharges)}
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
      )}
    </Col>
  );
};

export default ChargesRound;
