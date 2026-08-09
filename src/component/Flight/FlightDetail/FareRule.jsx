import React from "react";
import { Spinner } from "react-bootstrap";
import { FaRegThumbsUp } from "react-icons/fa";

const FareRule = ({ srdvIdx, fareRule, loadingFareRule }) => {
  const renderFareComponents = (fcs) => {
    const fareComponents = {
      ARF: "Airline Reschedule Fee",
      ARFT: "Airline Reschedule Fee Tax",
      CRF: "Tripjack Reschedule Fee",
      CRFT: "Tripjack Reschedule Fee Tax",
      ACF: "Airline Cancellation Fee",
      ACFT: "Airline Cancellation Fee Tax",
      CCF: "Tripjack Cancellation Fee",
      CCFT: "Tripjack Cancellation Fee Tax",
    };

    return Object.keys(fcs).c((key) => (
      <tr key={key}>
        <td>{fareComponents[key]}</td>
        <td colSpan="2">{fcs[key]}</td>
      </tr>
    ));
  };

  const formatPolicyInfo = (policyInfo) => {
    if (policyInfo.startsWith("__nls__")) {
      policyInfo = policyInfo.slice(7); // Remove the initial __nls__
    }
    return policyInfo.replace(/__nls__/g, "\n");
  };

  const renderFareRulesForSrdvTJ = () => {
    if (!fareRule) return null;
    return Object.keys(fareRule).map((route, index) => {
      const rules = fareRule[route];
      return (
        <div
          key={index}
          className="m-info-tips2 mar20"
          style={{ display: "block" }}
        >
          {/* <div className="bg-head">
            <div className="fltl-mr">
              <FaRegThumbsUp
                style={{ textAlign: "center", marginTop: "5px" }}
              />
            </div>
            <div className="fltl">
              <h2 className="m-info-tips2_tit">Good to Know</h2>
              <p className="grn-txt 25">Information you should know &nbsp;</p>
            </div>
            <div className="clr"></div>
          </div> */}
          <div
            className="left_gtk"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              scrollbarWidth: "thin",
              paddingInline: "15px",
            }}
          >
            <div key={index}>
              <h3>{route}</h3>
              <table className="fare-rule-table" style={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Type</th>
                    <th style={{ width: "15%" }}>Amount</th>
                    <th style={{ width: "55%" }}>Policy Info</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.fr && rules.fr.DATECHANGE && (
                    <>
                      <tr>
                        <td>Date Change</td>
                        <td>
                          {rules.fr.DATECHANGE.DEFAULT &&
                            rules.fr.DATECHANGE.DEFAULT.amount}
                          {rules.fr.DATECHANGE.BEFORE_DEPARTURE &&
                            rules.fr.DATECHANGE.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.DATECHANGE.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.DATECHANGE.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.DATECHANGE.BEFORE_DEPARTURE &&
                            rules.fr.DATECHANGE.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.CANCELLATION && (
                    <>
                      <tr>
                        <td>CANCELLATION</td>
                        <td>
                          {rules.fr.CANCELLATION.DEFAULT &&
                            rules.fr.CANCELLATION.DEFAULT.amount}
                          {rules.fr.CANCELLATION.BEFORE_DEPARTURE &&
                            rules.fr.CANCELLATION.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.CANCELLATION.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.CANCELLATION.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.CANCELLATION.BEFORE_DEPARTURE &&
                            rules.fr.CANCELLATION.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.NO_SHOW && (
                    <>
                      <tr>
                        <td>NO SHOW</td>
                        <td>
                          {rules.fr.NO_SHOW.DEFAULT &&
                            rules.fr.NO_SHOW.DEFAULT.amount}
                          {rules.fr.NO_SHOW.BEFORE_DEPARTURE &&
                            rules.fr.NO_SHOW.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.NO_SHOW.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.NO_SHOW.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.NO_SHOW.BEFORE_DEPARTURE &&
                            rules.fr.NO_SHOW.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.SEAT_CHARGEABLE && (
                    <>
                      <tr>
                        <td>SEAT CHARGEABLE</td>
                        <td>
                          {rules.fr.SEAT_CHARGEABLE.DEFAULT &&
                            rules.fr.SEAT_CHARGEABLE.DEFAULT.amount}
                          {rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE &&
                            rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.SEAT_CHARGEABLE.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.SEAT_CHARGEABLE.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE &&
                            rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE
                              .policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}
                  {/* Add more rows for other rule types as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    });
  };
  // console.log("fareRule", fareRule);

  return (
    <div>
      {srdvIdx === "undefined" && fareRule.length > 0 && (
        <div className="m-info-tips2 mar20" style={{ display: "block" }}>
          <div
            className="left_gtk"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <ul>
              {fareRule.map((item, index) => (
                <li key={index} className="m-info-tips2_item">
                  <p className="txt-sb">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* {srdvIdx === "undefined" && (
        <div className="m-info-tips2 mar20" style={{ display: "block" }}>
          
          <div
            className="left_gtk"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <div>
              <div>
                <ul>
                  {fareRule.map((item, index) => (
                    <li key={index} className="m-info-tips2_item">
                      <p className="txt-sb">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {srdvIdx === "SrdvTJ" && <div>{renderFareRulesForSrdvTJ()}</div>}
      {srdvIdx === "SrdvP" && (
        <div className="m-info-tips2 mar20" style={{ display: "block" }}>
          <div className="bg-head">
            <div className="fltl-mr">
              <FaRegThumbsUp
                style={{ textAlign: "center", marginTop: "5px" }}
              />
            </div>
            <div className="fltl">
              <h2 className="m-info-tips2_tit">Good to Know</h2>
              <p className="grn-txt 25">Information you should know &nbsp;</p>
            </div>
            <div className="clr"></div>
          </div>
          <div
            className="left_gtk"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              scrollbarWidth: "thin",
              paddingRight: "10px",
            }}
          >
            <div>
              <div dangerouslySetInnerHTML={{ __html: fareRule }} />
            </div>
          </div>
        </div>
      )}
{srdvIdx === "EwebM" && (
  <>
    {loadingFareRule ? (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    ) : (
      <>
        {/* Baggage Infos */}
        {fareRule?.BaggageInfos?.length > 0 && (
          <div style={{ marginBottom: "15px" }}>
            <h5>Baggage Information</h5>
            {fareRule.BaggageInfos.map((bag, idx) => (
              <p key={idx}>
                <strong>
                  {bag.Departure} → {bag.Arrival}
                </strong>{" "}
                ({bag.FlightNo}) : {bag.Baggage}
              </p>
            ))}
          </div>
        )}

        {/* Fare Rules */}
        {fareRule?.FareRules?.length > 0 &&
          fareRule.FareRules.map((ruleGroup, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <h6>
                {ruleGroup.Airline} - {ruleGroup.CityPair}
              </h6>
              {ruleGroup?.RuleDetails?.map((rd, i) => (
                <div key={i}>
                  <h6>{rd.Category}</h6>
                  {rd.Rules && rd.Rules.trim() !== "" && (
                    <p>{rd.Rules}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
      </>
    )}
  </>
)}


    </div>
  );
};

export default FareRule;
