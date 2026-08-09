import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './GreatDeals.css'; // Assuming you have a CSS file for additional styles
import { FaRegStar } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";



const deals = [
  {
    id: 1,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-1.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 2,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-2.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 3,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-3.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'coupon',
  },
  {
    id: 4,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-4.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'cashback',
  },
  {
    id: 5,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-5.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 6,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-6.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'coupon',
  },
];

const GreatDeals = () => {
  return (
    <section className="great-deals-modern">
      <Container>
        {/* Section Header */}
        <div className="section-header-modern text-center mb-5">
          <h3 className="section-title-modern">
            Great Deals of the <span className="highlight-text">Day</span>
          </h3>
          <p className="section-subtitle-modern">
            Discover handpicked exclusive travel discounts, hotel deals, and limited-time promo codes.
          </p>
        </div>

        <div className="coupon-grid-wrapper">
          <Row className="g-4">
            {deals.map((deal) => (
              <Col md={4} sm={6} key={deal.id}>
                <div className="coupon-card-modern">
                  <div className="card-top-badges">
                    <span className={`ribbon-badge ribbon-${deal.ribbon}`}>
                      {deal.ribbon}
                    </span>
                    <button className="favorite-btn" aria-label="Save deal">
                      <FaRegStar />
                    </button>
                  </div>

                  <div className="card-media-wrapper">
                    <img
                      className="offer-image"
                      src={deal.imgSrc}
                      alt={deal.title}
                    />
                  </div>

                  <div className="card-content-body">
                    <h4 className="deal-title">
                      {deal.title}
                    </h4>
                    <div className="deal-expiry">
                      <FiCheckSquare className="verified-icon" />
                      <span>Expires: {deal.expiresOn}</span>
                    </div>
                    <Button className="btn-get-coupon">
                      Get Coupon Code
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default GreatDeals;
