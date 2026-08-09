import React, { useState } from "react";
import DepatureDetail from "./DepatureDetail";
import "./FlightPayModal.css";
import FlightDetailSkeleton from "./FlightDetailSkeleton";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsCreditCard2FrontFill,
  BsFillCreditCard2FrontFill,
} from "react-icons/bs";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

const FlightPayModal = ({
  srdvIdx,
  flight,
  flight2,
  setOpenPayBtn,
  handleChangeCurrency,
  handleChangeCurrency2,
  openPayBtn,
  formData,
  infant,
  childData,
  handleTicketBook,
  handleTicketBookRound,
  handleTicketBookParto,
  handleTicketBookTJ,
  passengerSeatPreferences,
  passengerMealPreferences,
  passengerBaggagePreferences,
  loading,
}) => {
  const { walletData } = useSelector((state) => state.auth);

  const [active, setActive] = useState(1);
  const [showModall, setShowModall] = useState(false);
  const handleModalClosee = () => {
    setShowModall(false);
  };

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
  return (
    <>
      {srdvIdx === "undefined" && (
        <div className="payModalMain ">
          <div className="overlay_sc"></div>
          {/* <div
            className="payModelCross"
            onClick={() => setOpenPayBtn(!openPayBtn)}
          >
            <RxCross2 size={22} color="#f73030" />
          </div> */}
          <div className="flightPay">
            <div
              className="payModelCross"
              onClick={() => setOpenPayBtn(!openPayBtn)}
            >
              <RxCross2 size={22} color="#f73030" />
            </div>
            {flight ? (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight}
                type="Departure"
              />
            ) : (
              <FlightDetailSkeleton />
            )}
            {flight2 && (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight2}
                type="Return"
              />
            )}

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                {/* <div className="edt1 po-ab">Edit</div> */}
                Traveller Details
              </div>
              <div className="tr-cn">
                <div className="ps-d mar20">
                  <div className="ps1n">
                    <span className="fnt">E-mail </span>

                    <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                      {walletData.Email}
                    </span>
                  </div>
                  <div className="ps2n">
                    <span className="fnt">Contact No. </span>
                    <span className="fnt-g ng-binding">{walletData.Phone}</span>
                  </div>
                  <div className="ps3n">
                    {formData && (
                      <span>
                        <span className="fnt">
                          Adult (
                          <span className="ng-binding">{formData.length}</span>){" "}
                        </span>

                        {formData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}

                    {/* <span className="fnt-g ng-binding ng-scope">Mr frerf re</span> */}
                  </div>
                  <div className="ps4n">
                    {childData && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Child (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {childData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="ps5n">
                    {infant && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Infant (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {infant.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                <div className="edt1 po-ab">Pay using eWallet</div>
              </div>
              <div className="tr-cn">
                {flight && flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
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
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            totalBaggageWithCharges +
                            totalMealWithCharges +
                            totalSeatWithCharges +
                            (flight2.Fare.PublishedFare -
                              flight2.Fare.Discount +
                              flight2.Fare.ServiceFee +
                              flight2.Fare.TotalBaggageCharges +
                              flight2.Fare.TotalMealCharges +
                              flight2.Fare.TotalSeatCharges)
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            (flight.Fare.PublishedFare -
                              flight.Fare.Discount +
                              flight.Fare.ServiceFee +
                              totalBaggageWithCharges +
                              totalMealWithCharges +
                              totalSeatWithCharges +
                              (flight2.Fare.PublishedFare -
                                flight2.Fare.Discount +
                                flight2.Fare.ServiceFee +
                                flight2.Fare.TotalBaggageCharges +
                                flight2.Fare.TotalMealCharges +
                                flight2.Fare.TotalSeatCharges))
                          }`
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {flight && !flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            totalBaggageWithCharges +
                            totalMealWithCharges +
                            totalSeatWithCharges
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            totalBaggageWithCharges +
                            totalMealWithCharges +
                            totalSeatWithCharges
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            (flight.Fare.PublishedFare -
                              flight.Fare.Discount +
                              flight.Fare.ServiceFee +
                              totalBaggageWithCharges +
                              totalMealWithCharges +
                              totalSeatWithCharges)
                          }`
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ width: "100%", textAlign: "end" }}>
                <button
                  className="flightPaybtn"
                  onClick={() => {
                    // setOpenPayBtn(!openPayBtn);
                    // handleTicketBook();
                    // flight2 && handleTicketBookRound();
                    setShowModall(true);
                  }}
                >
                  {" "}
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={showModall}
            onHide={handleModalClosee}
            backdrop="static"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span> PAYMENT GATEWAY </span>
              </Modal.Title>
            </Modal.Header>
            <form
              name="frmTransaction"
              method="POST"
              action="/sabpaisa"
              id="frmTransaction"
              className="has-validation-callback payment_gateway_form"
            >
              <Modal.Body>
                <div className="main-pymnt-bx">
                  <div className="pymnt-bx-lft">
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(1)}
                    >
                      <a href="#" className="pymtflx">
                        <IoPersonSharp
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />

                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Agent Account
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(2)}
                    >
                      <a href="#" className="pymtflx">
                        <MdOutlineAirplaneTicket
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Hold PNR
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(3)}
                    >
                      <a href="#" className="pymtflx">
                        <BsCreditCard2FrontFill
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Credit/Debit/ATM Cards
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Use VISA, Mastercard, American Express etc.
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                    <div className="upi-dtl payGT1 c_pointer cscPaymentdisabled">
                      <a
                        href="#"
                        className="pymtflx"
                        onClick={() => setActive(4)}
                      >
                        <div
                          className="upi payGT1 upi-im1"
                          style={{ color: "black" }}
                        />
                        <div className="pymttxt">
                          <span className="upiText payment-txt payGT1">
                            UPI
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Make Online Payments Directly from Bank
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pymnt-bx-rgt3 payGT">
                    {active === 1 && (
                      <div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Booking Balance:{" "}
                          </div>
                          <div className="pymnt-bx-balencespan">
                            ${handleChangeCurrency(walletData.Wallet)}
                          </div>
                          {/* </div> */}
                        </div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              flight.Fare.PublishedFare -
                                flight.Fare.Discount +
                                flight.Fare.ServiceFee +
                                totalBaggageWithCharges +
                                totalMealWithCharges +
                                totalSeatWithCharges
                            )}
                          </span>
                        </div>
                        {/* </div> */}

                        <div className="pymnt-bx-balenceMode">
                          <div className="pymnt-bx-balenceinner">
                            Equivalent Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              flight.Fare.PublishedFare -
                                flight.Fare.Discount +
                                flight.Fare.ServiceFee +
                                totalBaggageWithCharges +
                                totalMealWithCharges +
                                totalSeatWithCharges
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {active === 2 && <div className="">Hold PNR</div>}
                    {active === 3 && (
                      <div className="">Payment using credit cards</div>
                    )}
                    {active === 4 && <div className="">Payment Using UPI </div>}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  id="payButton"
                  name="submitted"
                  className="btn btn-success continue"
                  onClick={() => {
                    handleTicketBook();
                    flight2 && handleTicketBookRound();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <span
                        className="fa fa-hand-point-right"
                        aria-hidden="true"
                      ></span>{" "}
                      Continue
                    </>
                  )}
                </button>{" "}
                &nbsp;
                <Link
                  // to="#"
                  className="btn btn-danger"
                  onClick={handleModalClosee}
                  disabled={loading}
                >
                  <span
                    className="fa fa-times-circle"
                    aria-hidden="true"
                  ></span>{" "}
                  Cancel
                </Link>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
      {srdvIdx === "SrdvTJ" && (
        <div className="payModalMain ">
          <div className="overlay_sc"></div>
          {/* <div
            className="payModelCross"
            onClick={() => setOpenPayBtn(!openPayBtn)}
          >
            <RxCross2 size={22} color="#f73030" />
          </div> */}
          <div className="flightPay">
            <div
              className="payModelCross"
              onClick={() => setOpenPayBtn(!openPayBtn)}
            >
              <RxCross2 size={22} color="#f73030" />
            </div>
            {flight ? (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight.tripInfos[0]}
                type="Departure"
              />
            ) : (
              <FlightDetailSkeleton />
            )}
            {flight && (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight.tripInfos[1]}
                type="Return"
              />
            )}

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                {/* <div className="edt1 po-ab">Edit</div> */}
                Traveller Details
              </div>
              <div className="tr-cn">
                <div className="ps-d mar20">
                  <div className="ps1n">
                    <span className="fnt">E-mail </span>

                    <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                      {walletData.Email}
                    </span>
                  </div>
                  <div className="ps2n">
                    <span className="fnt">Contact No. </span>
                    <span className="fnt-g ng-binding">{walletData.Phone}</span>
                  </div>
                  <div className="ps3n">
                    {formData && (
                      <span>
                        <span className="fnt">
                          Adult (
                          <span className="ng-binding">{formData.length}</span>){" "}
                        </span>

                        {formData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}

                    {/* <span className="fnt-g ng-binding ng-scope">Mr frerf re</span> */}
                  </div>
                  <div className="ps4n">
                    {childData && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Child (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {childData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="ps5n">
                    {infant && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Infant (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {infant.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                <div className="edt1 po-ab">Pay using eWallet</div>
              </div>
              <div className="tr-cn">
                {flight && flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
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
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            totalBaggageWithCharges +
                            totalMealWithCharges +
                            totalSeatWithCharges +
                            (flight2.Fare.PublishedFare -
                              flight2.Fare.Discount +
                              flight2.Fare.ServiceFee +
                              flight2.Fare.TotalBaggageCharges +
                              flight2.Fare.TotalMealCharges +
                              flight2.Fare.TotalSeatCharges)
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            (flight.Fare.PublishedFare -
                              flight.Fare.Discount +
                              flight.Fare.ServiceFee +
                              totalBaggageWithCharges +
                              totalMealWithCharges +
                              totalSeatWithCharges +
                              (flight2.Fare.PublishedFare -
                                flight2.Fare.Discount +
                                flight2.Fare.ServiceFee +
                                flight2.Fare.TotalBaggageCharges +
                                flight2.Fare.TotalMealCharges +
                                flight2.Fare.TotalSeatCharges))
                          }`
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {flight && !flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
                        {handleChangeCurrency(
                          flight.totalPriceInfo.totalFareDetail.fC.TF
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          flight.totalPriceInfo.totalFareDetail.fC.TF
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            flight.totalPriceInfo.totalFareDetail.fC.TF
                          }`
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ width: "100%", textAlign: "end" }}>
                <button
                  className="flightPaybtn"
                  onClick={() => {
                    // setOpenPayBtn(!openPayBtn);
                    // handleTicketBookTJ();
                    // flight2 && handleTicketBookRound();
                    setShowModall(true);
                  }}
                >
                  {" "}
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={showModall}
            onHide={handleModalClosee}
            backdrop="static"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span> PAYMENT GATEWAY </span>
              </Modal.Title>
            </Modal.Header>
            <form
              name="frmTransaction"
              method="POST"
              action="/sabpaisa"
              id="frmTransaction"
              className="has-validation-callback payment_gateway_form"
            >
              <Modal.Body>
                <div className="main-pymnt-bx">
                  <div className="pymnt-bx-lft">
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(1)}
                    >
                      <a href="#" className="pymtflx">
                        <IoPersonSharp
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />

                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Agent Account
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(2)}
                    >
                      <a href="#" className="pymtflx">
                        <MdOutlineAirplaneTicket
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Hold PNR
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(3)}
                    >
                      <a href="#" className="pymtflx">
                        <BsCreditCard2FrontFill
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Credit/Debit/ATM Cards
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Use VISA, Mastercard, American Express etc.
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                    <div className="upi-dtl payGT1 c_pointer cscPaymentdisabled">
                      <a
                        href="#"
                        className="pymtflx"
                        onClick={() => setActive(4)}
                      >
                        <div
                          className="upi payGT1 upi-im1"
                          style={{ color: "black" }}
                        />
                        <div className="pymttxt">
                          <span className="upiText payment-txt payGT1">
                            UPI
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Make Online Payments Directly from Bank
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pymnt-bx-rgt3 payGT">
                    {active === 1 && (
                      <div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Booking Balance:{" "}
                          </div>
                          <div className="pymnt-bx-balencespan">
                            ${handleChangeCurrency(walletData.Wallet)}
                          </div>
                          {/* </div> */}
                        </div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              flight.totalPriceInfo.totalFareDetail.fC.TF
                            )}
                          </span>
                        </div>
                        {/* </div> */}

                        <div className="pymnt-bx-balenceMode">
                          <div className="pymnt-bx-balenceinner">
                            Equivalent Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              flight.totalPriceInfo.totalFareDetail.fC.TF
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {active === 2 && <div className="">Hold PNR</div>}
                    {active === 3 && (
                      <div className="">Payment using credit cards</div>
                    )}
                    {active === 4 && <div className="">Payment Using UPI </div>}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  id="payButton"
                  name="submitted"
                  className="btn btn-success continue"
                  onClick={() => {
                    handleTicketBookTJ();
                    flight2 && handleTicketBookRound();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <span
                        className="fa fa-hand-point-right"
                        aria-hidden="true"
                      ></span>{" "}
                      Continue
                    </>
                  )}
                </button>{" "}
                &nbsp;
                <Link
                  // to="#"
                  className="btn btn-danger"
                  onClick={handleModalClosee}
                  disabled={loading}
                >
                  <span
                    className="fa fa-times-circle"
                    aria-hidden="true"
                  ></span>{" "}
                  Cancel
                </Link>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
      {srdvIdx === "SrdvP" && (
        <div className="payModalMain ">
          <div className="overlay_sc"></div>
          {/* <div
            className="payModelCross"
            onClick={() => setOpenPayBtn(!openPayBtn)}
          >
            <RxCross2 size={22} color="#f73030" />
          </div> */}
          <div className="flightPay">
            <div
              className="payModelCross"
              onClick={() => setOpenPayBtn(!openPayBtn)}
            >
              <RxCross2 size={22} color="#f73030" />
            </div>
            {flight ? (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight}
                type="Departure"
              />
            ) : (
              <FlightDetailSkeleton />
            )}
            {flight2 && (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight2}
                type="Return"
              />
            )}

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                {/* <div className="edt1 po-ab">Edit</div> */}
                Traveller Details
              </div>
              <div className="tr-cn">
                <div className="ps-d mar20">
                  <div className="ps1n">
                    <span className="fnt">E-mail </span>

                    <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                      {walletData.Email}
                    </span>
                  </div>
                  <div className="ps2n">
                    <span className="fnt">Contact No. </span>
                    <span className="fnt-g ng-binding">{walletData.Phone}</span>
                  </div>
                  <div className="ps3n">
                    {formData && (
                      <span>
                        <span className="fnt">
                          Adult (
                          <span className="ng-binding">{formData.length}</span>){" "}
                        </span>

                        {formData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}

                    {/* <span className="fnt-g ng-binding ng-scope">Mr frerf re</span> */}
                  </div>
                  <div className="ps4n">
                    {childData && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Child (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {childData.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="ps5n">
                    {infant && (
                      <span>
                        {" "}
                        <span className="fnt">
                          Infant (
                          <span className="ng-binding">{childData.length}</span>
                          ){" "}
                        </span>
                        {infant.map((item, index) => (
                          <span
                            className="fnt-g ng-binding ng-scope"
                            key={index}
                          >
                            {item.title} {item.firstName} {item.lastName}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bor po-re m-bt">
              <div className="trheadbg">
                <div className="edt1 po-ab">Pay using eWallet</div>
              </div>
              <div className="tr-cn">
                {flight && flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
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
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          flight.Fare.PublishedFare -
                            flight.Fare.Discount +
                            flight.Fare.ServiceFee +
                            totalBaggageWithCharges +
                            totalMealWithCharges +
                            totalSeatWithCharges +
                            (flight2.Fare.PublishedFare -
                              flight2.Fare.Discount +
                              flight2.Fare.ServiceFee +
                              flight2.Fare.TotalBaggageCharges +
                              flight2.Fare.TotalMealCharges +
                              flight2.Fare.TotalSeatCharges)
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          `${
                            walletData.Wallet -
                            (flight.Fare.PublishedFare -
                              flight.Fare.Discount +
                              flight.Fare.ServiceFee +
                              totalBaggageWithCharges +
                              totalMealWithCharges +
                              totalSeatWithCharges +
                              (flight2.Fare.PublishedFare -
                                flight2.Fare.Discount +
                                flight2.Fare.ServiceFee +
                                flight2.Fare.TotalBaggageCharges +
                                flight2.Fare.TotalMealCharges +
                                flight2.Fare.TotalSeatCharges))
                          }`
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {flight && !flight2 && (
                  <div className="ps-d mar20">
                    <div className="ps1n1">
                      <span className="fnt">Wallet Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty walletBalanceBold">
                        ${handleChangeCurrency(walletData.Wallet)}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Flight Price </span>
                      <span className="fnt-g ng-binding walletBalanceBold">
                        $
                        {handleChangeCurrency(
                          handleChangeCurrency2(
                            flight.AirItineraryPricingInfo.ItinTotalFare
                              .TotalFare
                          )
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Amount to deduct </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty ">
                        $
                        {handleChangeCurrency(
                          handleChangeCurrency2(
                            flight.AirItineraryPricingInfo.ItinTotalFare
                              .TotalFare
                          )
                        )}
                      </span>
                    </div>
                    <div className="ps1n1">
                      <span className="fnt">Remaining Balance </span>

                      <span className="fnt-g ng-pristine ng-untouched ng-valid ng-binding ng-not-empty">
                        $
                        {handleChangeCurrency(
                          walletData.Wallet -
                            handleChangeCurrency2(
                              flight.AirItineraryPricingInfo.ItinTotalFare
                                .TotalFare
                            )
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ width: "100%", textAlign: "end" }}>
                <button
                  className="flightPaybtn"
                  onClick={() => {
                    // setOpenPayBtn(!openPayBtn);
                    // handleTicketBook();
                    // flight2 && handleTicketBookRound();
                    // handleTicketBookParto();
                    setShowModall(true);
                  }}
                >
                  {" "}
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={showModall}
            onHide={handleModalClosee}
            backdrop="static"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span> PAYMENT GATEWAY </span>
              </Modal.Title>
            </Modal.Header>
            <form
              name="frmTransaction"
              method="POST"
              action="/sabpaisa"
              id="frmTransaction"
              className="has-validation-callback payment_gateway_form"
            >
              <Modal.Body>
                <div className="main-pymnt-bx">
                  <div className="pymnt-bx-lft">
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(1)}
                    >
                      <a href="#" className="pymtflx">
                        <IoPersonSharp
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />

                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Agent Account
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(2)}
                    >
                      <a href="#" className="pymtflx">
                        <MdOutlineAirplaneTicket
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Hold PNR
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className="card-dtl payGT1 c_pointer cscPaymentdisabled"
                      onClick={() => setActive(3)}
                    >
                      <a href="#" className="pymtflx">
                        <BsCreditCard2FrontFill
                          size={24}
                          color="#989796"
                          style={{ marginRight: "5px" }}
                          className=" payGT1 "
                        />
                        {/* <div
                          size={24}
                          className="card payGT1 card-im2"
                        /> */}
                        <div className="pymttxt">
                          <span className="cardText payment-txt payGT1">
                            Credit/Debit/ATM Cards
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Use VISA, Mastercard, American Express etc.
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                    <div className="upi-dtl payGT1 c_pointer cscPaymentdisabled">
                      <a
                        href="#"
                        className="pymtflx"
                        onClick={() => setActive(4)}
                      >
                        <div
                          className="upi payGT1 upi-im1"
                          style={{ color: "black" }}
                        />
                        <div className="pymttxt">
                          <span className="upiText payment-txt payGT1">
                            UPI
                          </span>
                          <span
                            className="pymtsbtxt ng-binding"
                            style={{ display: "block" }}
                          >
                            Make Online Payments Directly from Bank
                          </span>
                          <span
                            style={{
                              display: "none",
                              fontSize: 11,
                              fontWeight: 500,
                              color: "#fff",
                              lineHeight: 14,
                              background: "#2196f3",
                              padding: "2px 6px",
                              borderRadius: 20,
                            }}
                          >
                            No Cost EMI
                          </span>
                          {/* ngIf: bkn.name=='CareemPay' */}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="pymnt-bx-rgt3 payGT">
                    {active === 1 && (
                      <div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Booking Balance:{" "}
                          </div>
                          <div className="pymnt-bx-balencespan">
                            ${handleChangeCurrency(walletData.Wallet)}
                          </div>
                          {/* </div> */}
                        </div>
                        <div className="pymnt-bx-balenceMode">
                          {/* <div className="pymnt-bx-balenceinner"> */}
                          <div className="pymnt-bx-balenceinner">
                            {" "}
                            Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              handleChangeCurrency2(
                                flight.AirItineraryPricingInfo.ItinTotalFare
                                  .TotalFare
                              )
                            )}
                          </span>
                        </div>
                        {/* </div> */}

                        <div className="pymnt-bx-balenceMode">
                          <div className="pymnt-bx-balenceinner">
                            Equivalent Total Fare:
                          </div>
                          <span className="pymnt-bx-balencespan">
                            $
                            {handleChangeCurrency(
                              handleChangeCurrency2(
                                flight.AirItineraryPricingInfo.ItinTotalFare
                                  .TotalFare
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {active === 2 && <div className="">Hold PNR</div>}
                    {active === 3 && (
                      <div className="">Payment using credit cards</div>
                    )}
                    {active === 4 && <div className="">Payment Using UPI </div>}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  id="payButton"
                  name="submitted"
                  className="btn btn-success continue"
                  onClick={() => {
                    handleTicketBookParto();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <span
                        className="fa fa-hand-point-right"
                        aria-hidden="true"
                      ></span>{" "}
                      Continue
                    </>
                  )}
                </button>{" "}
                &nbsp;
                <Link
                  // to="#"
                  className="btn btn-danger"
                  onClick={handleModalClosee}
                  disabled={loading}
                >
                  <span
                    className="fa fa-times-circle"
                    aria-hidden="true"
                  ></span>{" "}
                  Cancel
                </Link>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default FlightPayModal;
