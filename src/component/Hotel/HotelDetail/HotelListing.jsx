import React from "react";
import "./HotelListing.css";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import {
  FaAngleRight,
  FaBookmark,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";

const HotelListing = ({ hotelDetails }) => {
  return (
    <section className="list-single-hero" data-scrollax-parent="true" id="sec1">
      <div
        className="bg par-elem"
        style={{
          backgroundImage: `url(${hotelDetails.img[0].url})`,
          // transform: "translateZ(0px) translateY(-7.18954%)",
        }}
        // data-bg="images/bg/9.jpg"
        data-scrollax="properties: { translateY: '30%' }"
      >
        {/* Content inside the div */}
      </div>
      <div className="list-single-hero-title fl-wrap">
        <Container>
          <Row>
            <Col md={7}>
              <div className="listing-rating-wrap">
                <div
                  className="listing-rating card-popup-rainingvis"
                  data-starrating2="5"
                >
                  {Array.from({ length: hotelDetails.rt }, (_, index) => (
                    <FaStar />
                  ))}
                </div>
              </div>
              <h2>
                <span>{hotelDetails.name}</span>
              </h2>
              {/* <div className="list-single-header-contacts fl-wrap">
                <ul>
                  <li>
                    <FaPhone />
                    <a href="#">+7(111)123456789</a>
                  </li>
                  <li>
                    <FaMapMarkerAlt />
                    <a href="#">USA 27TH Brooklyn NY</a>
                  </li>
                  <li>
                    <FaEnvelope />
                    <a href="#">yourmail@domain.com</a>
                  </li>
                </ul>
              </div> */}
            </Col>
            <Col md={5}>
              <div className="list-single-hero-details fl-wrap">
                <div className="list-single-hero-rating">
                  {/* <div className="rate-class-name">
                    <div className="score">
                      <strong>Very Good</strong>2 Reviews{" "}
                    </div>
                    <span>4.5</span>
                  </div> */}
                  {/* <div className="list-single-hero-rating-list">
                    <div className="rate-item fl-wrap">
                      <div className="rate-item-title fl-wrap">
                        <span>Cleanliness</span>
                      </div>
                      <div className="rate-item-bg" data-percent="100%">
                        <div
                          className="rate-item-line color-bg"
                          style={{ width: "100%" }}></div>
                      </div>
                      <div className="rate-item-percent">5.0</div>
                    </div>
                    <div className="rate-item fl-wrap">
                      <div className="rate-item-title fl-wrap">
                        <span>Comfort</span>
                      </div>
                      <div className="rate-item-bg" data-percent="90%">
                        <div
                          className="rate-item-line color-bg"
                          style={{ width: "90%" }}></div>
                      </div>
                      <div className="rate-item-percent">5.0</div>
                    </div>
                    <div className="rate-item fl-wrap">
                      <div className="rate-item-title fl-wrap">
                        <span>Staff</span>
                      </div>
                      <div className="rate-item-bg" data-percent="80%">
                        <div
                          className="rate-item-line color-bg"
                          style={{ width: "80%" }}></div>
                      </div>
                      <div className="rate-item-percent">4.0</div>
                    </div>
                    <div className="rate-item fl-wrap">
                      <div className="rate-item-title fl-wrap">
                        <span>Facilities</span>
                      </div>
                      <div className="rate-item-bg" data-percent="90%">
                        <div
                          className="rate-item-line color-bg"
                          style={{ width: "90%" }}></div>
                      </div>
                      <div className="rate-item-percent">4.5</div>
                    </div>
                  </div> */}
                </div>
                <div className="clearfix"></div>
                <div className="list-single-hero-links">
                  <Link className="lisd-link" href="booking-single.html">
                    <FaBookmark /> Book Now
                  </Link>
                  {/* <Link className="custom-scroll-link lisd-link" href="#sec6">
                    <MdRateReview /> Add review
                  </Link> */}
                </div>
              </div>
            </Col>
          </Row>
          <div className="breadcrumbs-hero-buttom fl-wrap">
            <div className="breadcrumbs">
              <a>
                Home <FaAngleRight />
              </a>
              <a>
                Listings <FaAngleRight />
              </a>
              {/* <a href="#">
                New York <FaAngleRight />
              </a> */}
              <span>{hotelDetails.name}</span>
            </div>
            <div className="list-single-hero-price">
              AVG/NIGHT<span>INR {hotelDetails.pops[0].tpc}</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HotelListing;
