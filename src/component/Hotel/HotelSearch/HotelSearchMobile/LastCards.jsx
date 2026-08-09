import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LastCards = () => {
  const services = [
    {
      imageUrl: "https://tripoholidays.com/public/images/best-price.png",
      title: "Best Price Guarantee",
    },
    {
      imageUrl: "https://tripoholidays.com/public/images/easy.png",
      title: "Easy Booking",
    },
    {
      imageUrl: "https://tripoholidays.com/public/images/dollar.png",
      title: "No Hidden Charges",
    },
    {
      imageUrl: "https://tripoholidays.com/public/images/worldwide.png",
      title: "Worldwide Connectivity",
    },
    {
      imageUrl: "https://tripoholidays.com/public/images/trophy.png",
      title: "Awarded as Top Tour Operator by Several Tourism Board's",
    },
  ];

  return (
    <div className="hotel_page">
      <section id="services_sec" className="section-flat custom_service">
        <div className="section-content">
          <Container>
            <Row>
              {services.map((service, index) => (
                <Col key={index} sm={2} className="box_col_5">
                  <Card className="box-info box-service-1">
                    <div className="box-icon">
                      <Card.Img variant="top" src={service.imageUrl} />
                    </div>
                    <Card.Body className="box-content">
                      <Card.Title>
                        <Link to="javascript:;">{service.title}</Link>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default LastCards;
