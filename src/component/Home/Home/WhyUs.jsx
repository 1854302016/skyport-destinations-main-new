import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const WhyUs = () => {
  return (
    <section id="why-us" style={{ position: 'relative',
    zIndex: '10',
    background: '#fff',
    padding: '1rem !important'}}>
      <Container>
        <h2 className="">Why Book With Us?</h2>
        <Row className="text-center">
          <Col lg={3} md={3} sm={6} xs={12} className="pt-2">
            <img
              src="/Images/WhyUs/best-price.webp"
              className="img-fluid img-rounded"
              alt="Best Price"
            />
          </Col>
          <Col lg={3} md={3} sm={6} xs={12} className="pt-2">
            <img
              src="/Images/WhyUs/easy-booking.webp"
              className="img-fluid img-rounded"
              alt="Easy Booking"
            />
          </Col>
          <Col lg={3} md={3} sm={6} xs={12} className="pt-2">
            <img
              src="/Images/WhyUs/safe-icon.webp"
              className="img-fluid img-rounded"
              alt="Safe Booking"
            />
          </Col>
          <Col lg={3} md={3} sm={6} xs={12} className="pt-2">
            <img
              src="/Images/WhyUs/support.webp"
              className="img-fluid img-rounded"
              alt="24/7 Support"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyUs;
