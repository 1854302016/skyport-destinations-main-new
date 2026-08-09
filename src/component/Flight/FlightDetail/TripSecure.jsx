import React from "react";
import "./TripSecure.css";
const TripSecure = ({ tripSecure, setTripSecure }) => {
  return (
    <div id="INSURANCE" className="oneCard-element">
      <div className="componentContainer V3_2 " id="INSURANCE">
        <div className="paddingTop10 padding_bottomm">
          <div className="travelinsuranceTop">
            <h2
              data-test="component-title"
              className="makeFlex perfectCenter fontSize18 blackFont"
            >
              <span
                data-test="component-left_icon"
                className="bgProperties insuranceIcon appendRight10"
                style={{
                  backgroundImage:
                    'url("https://tripmoneycmsimgak.mmtcdn.com/img/Group_48_Copy_3x_cc60fb4d67.png")',
                }}
              />
              <span>Trip Secure</span>
            </h2>
            <div className="makeFlex perfectCenter_mobile">
              <span
                data-test="component-right_icon"
                className="bgProperties insuranceRightIcon"
                style={{
                  backgroundImage:
                    'url("	https://flight.easemytrip.com/Content/img/acko-logo.png")',
                }}
              />
            </div>
            <div className="makeFlex perfectCenter_desktop">
              <span
                data-test="component-right_icon"
                className="bgProperties insuranceRightIcon"
                style={{
                  backgroundImage:
                    'url("https://flight.easemytrip.com/Content/img/acko-logo.png")',
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(229, 243, 255), rgba(255, 255, 255, 0))",
          }}
          className="trip_secure_flightDesk"
        >
          <div className="insContainer">
            <div id="insuranceDeals" dir="ltr" className="insuaranceDeals">
              <p className="blackFont fontSize18 appendBottom15 ">
                <span data-test="comp-ins-price">₹ 199</span>
                <span className="lightFont fontSize12">
                  /Traveller (18% GST included)
                </span>
              </p>
              <div className="insurancePlanWrapper">
                <div
                  className="insuranceCardWrapper"
                  title="Baggage Assistance"
                >
                  <div className="insuranceCard makeFlex">
                    <div className="insIconWrapper">
                      <span
                        className="bgProperties icon24 appendRight8"
                        style={{
                          backgroundImage:
                            'url("https://tripmoneycmsimgak.mmtcdn.com/img/Baggage_delay_5f86090728.png")',
                        }}
                      />
                    </div>
                    <div className="flexOne">
                      <p className="darkText2 fontSize12 boldFont">
                        <font color="#249995">
                          <big>24x7</big>
                        </font>{" "}
                        Support
                      </p>
                      <div className="crouselTextWrapper">
                        <p className="fontSize11 blackText lightFont textDesc makeFlex hrtlCenter">
                          Delayed/lost baggage Assistance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="insuranceCardWrapper" title="Missed Flight">
                  <div className="insuranceCard makeFlex">
                    <div className="insIconWrapper">
                      <span
                        className="bgProperties icon24 appendRight8"
                        style={{
                          backgroundImage:
                            'url("https://tripmoneycmsimgak.mmtcdn.com/img/flight_delay_c651e0a7b7.png")',
                        }}
                      />
                    </div>
                    <div className="flexOne">
                      <p className="darkText2 fontSize12 boldFont">
                        Up to{" "}
                        <font color="#249995">
                          <big>₹ 2500</big>
                        </font>
                      </p>
                      <div className="crouselTextWrapper">
                        <p className="fontSize11 blackText lightFont textDesc makeFlex hrtlCenter">
                          Missed Flight
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="insuranceCardWrapper" title="Trip Cancellation">
                  <div className="insuranceCard makeFlex">
                    <div className="insIconWrapper">
                      <span
                        className="bgProperties icon24 appendRight8"
                        style={{
                          backgroundImage:
                            'url("https://tripmoneycmsimgak.mmtcdn.com/img/trio_cancellation_3f7e5ee598.png")',
                        }}
                      />
                    </div>
                    <div className="flexOne">
                      <p className="darkText2 fontSize12 boldFont">
                        Up to{" "}
                        <font color="#249995">
                          <big>₹ 2500</big>
                        </font>
                      </p>
                      <div className="crouselTextWrapper">
                        <p className="fontSize11 blackText lightFont textDesc makeFlex hrtlCenter">
                          Trip Cancellation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="insuranceCardWrapper">
                  <div className="viewAllPlan">
                    {" "}
                    View All Benefits
                    <span className="the-arrow -right">
                      <span className="shaft" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="container_TG_secure_mobile">
          Secure your trip with ACKO Travel Insurance at just Rs199/- per
          traveller
          <a>View T&amp;C </a>
        </p>

        <div className="mandatPerV3_2">
          <div
            className="intlInsurancePersuation appendBottom12"
            style={{ backgroundColor: "rgb(255, 246, 229)" }}
          >
            <p className="darkText fontSize12">
              <b>Recommended for your travel within India.</b>
            </p>
          </div>
        </div>
        <div className="insBottomSectionV3_2">
          <div className="insRadioSection appendBottom8 makeFlex hrtlCenter ">
            <label className="radioboxContainer ">
              <span className="customRadioBtn sizeSm primary ">
                <input
                  type="radio"
                  name="tripSecure"
                  value="yes"
                  checked={tripSecure === "yes"}
                  onChange={(e) => setTripSecure(e.target.value)}
                />
                <span className="outer ">
                  <span className="inner" />
                </span>
              </span>
              <div className="radioboxContent">
                <p className="radioboxTitle">
                  <span className="darkText lightFont fontSize14">
                    <b>Yes,</b> Secure my trip.
                  </span>
                </p>
              </div>
            </label>
          </div>
          <div className="insRadioSection appendBottom8 makeFlex hrtlCenter ">
            <label className="radioboxContainer ">
              <span className="customRadioBtn sizeSm primary ">
                <input
                  type="radio"
                  name="tripSecure"
                  value="no"
                  checked={tripSecure === "no"}
                  onChange={(e) => setTripSecure(e.target.value)}
                />
                <span className="outer ">
                  <span className="inner" />
                </span>
              </span>
              <div className="radioboxContent">
                <p className="radioboxTitle">
                  <span className="darkText lightFont fontSize14">
                    <b>No,</b> I will book without trip secure.
                  </span>
                </p>
              </div>
            </label>
          </div>
        </div>

        <p className="lightGreyText fontSize11 v3_2Tnc">
          <div
            className="makeFlex tnc-container_TG_secure"
            data-testid="component-rta_message"
          >
            <div>
              Trip Secure is non-refundable. By selecting it, I confirm all
              travelers are Indian nationals, aged 6 months to 90 years, and
              accept the
              <a
                className="appendLeft3"
                href="/terms-conditions"
                rel="noopener noreferrer"
                target="_blank"
                data-test="component-cta_link"
              >
                T&amp;Cs
              </a>
            </div>
          </div>
        </p>
        <p />
      </div>
    </div>
  );
};

export default TripSecure;
