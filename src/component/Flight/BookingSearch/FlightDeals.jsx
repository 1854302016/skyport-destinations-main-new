import React, { useState } from "react";
import "./FlightDeals.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const FlightDeals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const tomorrowDate = getTomorrowDate();

  const getOneWayUrl = (dest, org) => {
    return `/flightList/dest_${dest}*org_${org}*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`;
  };

  const getRoundTripUrl = (dest, org) => {
    return `/round/dest_${dest}*org_${org}*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_2*cbn_2`;
  };

  return (
    <div className="alldealTab">
      
      <Container className="deal-section dealSection">
        <h2 className="blueHead dealHeading">
          Cheap International Flight Deals
        </h2>

        {/* Tabs */}
        <ul className="deal-tab">
          <li
            className={`deal-tab3 tab-item ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </li>
          <li
            className={`deal-tab1 tab-item ${activeTab === "one-way" ? "active" : ""}`}
            onClick={() => setActiveTab("one-way")}
          >
            One Way
          </li>
          <li
            className={`deal-tab2 tab-item ${activeTab === "round-trip" ? "active" : ""}`}
            onClick={() => setActiveTab("round-trip")}
          >
            Round Trip
          </li>
        </ul>

        {/* One Way Deals */}
        {(activeTab === "all" || activeTab === "one-way") && (
          <div className="dealcontainer1 tab-content">
            <table className="main-table">
              <tbody>
                <tr className="main-row dealLength5">
                  <td valign="top" className="cell-0">
                    {/* San Francisco → Vancouver */}
                    <div className="deal-box">
<Link to={getOneWayUrl("YVR", "SFO")} className="text-decoration-none">
                        <figure>
                          <img src="//c.fareportal.com/gcms/portals/2/images/destinations/YVR-r2x.jpg" alt="YVR" />
                        </figure>
                        <div className="travel-details p-2">
                          <strong>San Francisco → Vancouver</strong>
                          <br />
                          <small>One Way Trip | {tomorrowDate}</small>
                          <strong className="totalfare discounted">$58<sup>.99</sup></strong>
                          <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                            Book Now
                          </span>
                        </div>
                      </Link>
                    </div>
                  </td>

                  <td valign="top" className="cell-1">
                    <table className="four-cells-table dealLength5">
                      <tbody>
                        <tr className="dealrow-1">
                          <td className="cell1-1">
                            {/* Los Angeles → Vancouver */}
                            <div className="deal-box">
<Link to={getOneWayUrl("YVR", "LAX")} className="text-decoration-none">
                                <figure>
                                  <img src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-1-r2x.jpg" alt="YVR" />
                                </figure>
                                <div className="travel-details p-2">
                                  <strong>Los Angeles → Vancouver</strong>
                                  <br />
                                  <small>One Way Trip | {tomorrowDate}</small>
                                  <strong className="totalfare discounted">$74<sup>.99</sup></strong>
                                  <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                    Book Now
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </td>

                          <td className="cell1-2">
                            {/* Chicago → Toronto */}
                            <div className="deal-box">
<Link to={getOneWayUrl("YTO", "ORD")} className="text-decoration-none">
                                <figure>
                                  <img src="//c.fareportal.com/gcms/portals/2/images/destinations/YTO-r2x.jpg" alt="YTO" />
                                </figure>
                                <div className="travel-details p-2">
                                  <strong>Chicago → Toronto</strong>
                                  <br />
                                  <small>One Way Trip | {tomorrowDate}</small>
                                  <strong className="totalfare discounted">$83<sup>.90</sup></strong>
                                  <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                    Book Now
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </td>
                        </tr>

                        <tr className="dealrow-2">
                          <td className="cell1-3">
                            {/* Los Angeles → Toronto */}
                            {/* to={getOneWayUrl("YTO", "LAX")} */}
                            <div className="deal-box">
<Link to={getOneWayUrl("YTO", "LAX")} className="text-decoration-none">
                                <figure>
                                  <img src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-3-r2x.jpg" alt="YTO" />
                                </figure>
                                <div className="travel-details p-2">
                                  <strong>Los Angeles → Toronto</strong>
                                  <br />
                                  <small>One Way Trip | {tomorrowDate}</small>
                                  <strong className="totalfare discounted">$96<sup>.65</sup></strong>
                                  <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                    Book Now
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </td>

                          <td className="cell1-4">
                            {/* Los Angeles → Calgary */}
                            <div className="deal-box">
<Link to={getOneWayUrl("YYC", "LAX")} className="text-decoration-none">
                                <figure>
                                  <img src="//c.fareportal.com/gcms/portals/2/images/destinations/YYC-r2x.jpg" alt="YYC" />
                                </figure>
                                <div className="travel-details p-2">
                                  <strong>Los Angeles → Calgary</strong>
                                  <br />
                                  <small>One Way Trip | {tomorrowDate}</small>
                                  <strong className="totalfare discounted">$104<sup>.99</sup></strong>
                                  <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                    Book Now
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

     
      </Container>
      <Gallery/>
    </div>
  );
};

export default FlightDeals;
