import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Comming.css";
import { FaHeadphonesAlt, FaPhone } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const CommingSoon = ({ heading, image }) => {
  return (
    <Container className="text-center mt-5 cardss">
      <h2 className="mb-2 mx-2 cs-title">Launching soon!</h2>
      <p className="cs-text">
        We are currently developing the system for a better experience.
        <br />
        Apologize for the inconvenience and thank you.
      </p>
      <Row className="align-items-center justify-content-center">
        <Col lg={4} md={4}>
          <img src={image} className="img-fluid" alt="Bus Background" />
        </Col>

        <Col lg={6} md={6}>
          <div className="bus-containerr">
            <h2 className="bus-containerr-h2">
              For Booking {heading} and Enquiries Please contact us
            </h2>
            <div className="bus-container-second">
              <div>
                <FaHeadphonesAlt size={23} style={{ marginRight: "5px" }} />{" "}
                <span className="bus-cont-phone">+91 92112 52356</span>
              </div>
              <div>
                <CgMail size={25} style={{ marginRight: "5px" }} />{" "}
                <span className="bus-cont-phone">
                  {" "}
                  support@tripgoonline.com
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CommingSoon;
