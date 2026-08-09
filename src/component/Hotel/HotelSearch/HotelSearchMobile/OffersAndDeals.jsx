import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import './OffersAndDeals.css'

const OffersAndDeals = () => {
  return (
    <Container className="mnblock">
      <Row>
        <Col>
          <div className="page_ttl">Offers & Deals</div>
        </Col>
      </Row>
      <br />
      <div className="_OffrScrll HotelsOffer">
        {/* Offer Item 1 */}
        <a
          className="_offrDiv"
          href="https://www.easemytrip.com/offers/hotel-new-user.html">
          <div className="_offrimg">
            <Image src="https://www.easemytrip.com/images/hotel-img/hotel-new-31jan24-mob.png" />
          </div>
          <div className="flxoffrr">
            <div className="_typOff">
              <span className="typHotel"></span>
              <span>Hotel</span>{" "}
            </div>
            <div className="_OffrH">New User offer</div>
            <div className="_OffrP">
              Register & Enjoy Great Discount on First Hotel Reservation
            </div>
            <div>
              {" "}
              <div className="_OffrCoup">
                <span>Use code :</span> <span className="_code">EMTFIRST</span>
              </div>
            </div>
            <div className="_OffrVld">Valid till : 30th April, 2024</div>
          </div>
        </a>

        {/* Offer Item 2 */}
        <a
          className="_offrDiv"
          href="https://www.easemytrip.com/offers/hotels-best-price-guarantee.html">
          <div className="_offrimg">
            <Image src="https://www.easemytrip.com/images/offer-img/hotels-best-price-mob.png" />
          </div>
          <div className="flxoffrr">
            <div className="_typOff">
              <span className="typHotel"></span>
              <span>Hotels</span>{" "}
            </div>
            <div className="_OffrH">Best Price Guarantee</div>
            <div className="_OffrP">
              Now Enjoy the Best Price Guarantee on Hotel Bookings with
              EaseMyTrip
            </div>
            <div className="_OffrVld">Book Now</div>
          </div>
        </a>

        {/* Offer Item 3 */}
        <a
          className="_offrDiv"
          href="https://www.easemytrip.com/offers/emtstay.html">
          <div className="_offrimg">
            <Image src="https://www.easemytrip.com/images/hotel-img/emtstay-6oct23-mob-new.webp" />
          </div>
          <div className="flxoffrr">
            <div className="_typOff">
              <span className="typHotel"></span>
              <span>Hotels</span>{" "}
            </div>
            <div className="_OffrH">Hotel Deals</div>
            <div className="_OffrP">
              Save up to 45% OFF* on Your Favorite Hotel
            </div>
            <div>
              {" "}
              <div className="_OffrCoup">
                <span>Use code :</span> <span className="_code">EMTSTAY</span>
              </div>
            </div>
            <div className="_OffrVld">Valid till : 30th April, 2024</div>
          </div>
        </a>

        {/* Offer Item 4 */}
        <a
          className="_offrDiv"
          href="https://www.easemytrip.com/offers/flash-deals.html">
          <div className="_offrimg">
            <Image src="https://www.easemytrip.com/images/offer-img/flash-deal-banner-13-01-24-newmob.webp" />
          </div>
          <div className="flxoffrr">
            <div className="_typOff">
              <span className="typHotel"></span>
              <span>Flights</span>{" "}
            </div>
            <div className="_OffrH">Flash Deal</div>
            <div className="_OffrP">
              Winter Flash Deal on Hotel Bookings from 9 PM - 12 AM
            </div>
            <div>
              {" "}
              <div className="_OffrCoup">
                <span>Use code :</span>{" "}
                <span className="_code">FLASHDEALS</span>
              </div>
            </div>
            <div className="_OffrVld">Valid till : 30th April, 2024</div>
          </div>
        </a>

        {/* Offer Item 5 */}
        <a
          className="_offrDiv"
          href="https://www.easemytrip.com/offers/lords-inn.html">
          <div className="_offrimg">
            <Image src="https://www.easemytrip.com/images/hotel-img/lords-inn-hotels-mob.png" />
          </div>
          <div className="flxoffrr">
            <div className="_typOff">
              <span className="typHotel"></span>
              <span>Hotel</span>{" "}
            </div>
            <div className="_OffrH">Lords Inn Hotels</div>
            <div className="_OffrP">
              Elevate Your Stay with Up to 30% Discount* on Lords Inn Hotels
            </div>
            <div className="_OffrVld">Valid till : 30th April, 2024</div>
          </div>
        </a>
      </div>
    </Container>
  );
};

export default OffersAndDeals;
