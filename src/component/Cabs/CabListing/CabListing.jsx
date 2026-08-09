import React from "react";
import "./CabListing.css";
import { Col, Container, Row } from "react-bootstrap";
import CabFilters from "./CabFilters";

const CabListing = () => {
  return (
    <div className="cabListing">
        <Container>
            <Row>
                <Col md={3}>
                <CabFilters/>
                </Col>
                 <Col md={9}>
                    <div className="CabListingWrapper">
                    {/* === CARD 1 === */}
                    <div className="CabCard">
                        <div className="CabCardImgWrapper">
                        <img
                            src="/Images/cab/img1.jpg"
                            alt="Toyota Etios"
                            className="CabCarImage"
                        />
                        </div>
                        <div className="CabCardContent">
                        <div className="CabCardTopRow">
                            <h3 className="CabCarTitle">Toyota Etios Or Equivalent</h3>
                            <div className="CabCarSpecs">
                            <span className="CabTypeTag">Sedan</span>
                            <span className="CabSpecText">4 Seat</span>
                            <span className="CabSpecText">2 Luggage Bag</span>
                            </div>
                        </div>
                        <div className="CabDetailsGrid">
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Kilometer Charges</p>
                            <p className="CabDetailText">22 km Included after that <strong>km</strong> charge applicable</p>
                            </div>
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Fuel Type</p>
                            <p className="CabDetailText">CNG/Petrol/diesel</p>
                            </div>
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Cancellation Policy</p>
                            <p className="CabDetailText">Free before 6 hours from the journey time.</p>
                            </div>
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Part Payment</p>
                            <p className="CabDetailText">Pay <strong>25 %</strong> now and rest to driver</p>
                            </div>
                        </div>
                        <div className="CabFooter">
                            <span>✔ 24/7 customer helpline</span>
                        </div>
                        </div>
                        <div className="CabCardRight">
                        <div className="CabPrice">₹ 781</div>
                        <button className="CabBookBtn">Book Now</button>
                        <span className="CabMoreOptions">4 More Options &gt;</span>
                        </div>
                    </div>

                    {/* === CARD 2 === */}
                    <div className="CabCard">
                        <div className="CabCardImgWrapper">
                        <img
                            src="/Images/cab/img2.jpeg"
                            alt="Basic Hatchback"
                            className="CabCarImage"
                        />
                        </div>
                        <div className="CabCardContent">
                        <div className="CabCardTopRow">
                            <h3 className="CabCarTitle">Basic Hatchback</h3>
                            <div className="CabCarSpecs">
                            <span className="CabTypeTag">Hatchback</span>
                            <span className="CabSpecText">2 Seat</span>
                            <span className="CabSpecText">1 Luggage Bag</span>
                            <span className="CabSpecText">AC</span>
                            </div>
                        </div>
                        <div className="CabDetailsGrid">
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Kilometer Charges</p>
                            <p className="CabDetailText">22 km Included after that 23/km charge</p>
                            </div>
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Fuel Type</p>
                            <p className="CabDetailText">CNG/Petrol/diesel</p>
                            </div>
                            <div className="CabDetailItem">
                            <p className="CabDetailTitle">Cancellation Policy</p>
                            <p className="CabDetailText">Free before 1 hour of journey time.</p>
                            </div>
                        </div>
                        <div className="CabFooter">
                            <span>✔ 24/7 customer helpline</span>
                        </div>
                        </div>
                        <div className="CabCardRight">
                        <div className="CabPrice">₹ 924</div>
                        <button className="CabBookBtn">Book Now</button>
                        <span className="CabMoreOptions">2 More Options &gt;</span>
                        </div>
                    </div>
                    </div>
                </Col>
            </Row>
        </Container>

    </div>
  );
};

export default CabListing;
