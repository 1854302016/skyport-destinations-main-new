import React from "react";
import "./Insurance.css";
import { Col, Container, Row, Form } from "react-bootstrap";
import InsuranceContact from "./InsuranceContact";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Visa() {
  return (
    <div className="background_insurance background_visa">
      <Container fluid className="con">
        <Row className="">
          <Col className="image-outter" sm={6}>
            <h2 className="text-white">Get in touch!</h2>
            <h6>
              Don't hesitate to get in touch with us - we'll be happy to talk to
              you!
            </h6>
          
            <InsuranceContact />
          </Col>
          <Col sm={1} />
          <Col className="form-outter" sm={5}>
            <div className="form-container">
              <h2 className="text-center mb-4">Send an Enquiry</h2>
              <Form>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="form-control mb-3"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="form-control mb-3"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  required
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="form-control mb-3"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="form-control mb-3"
                ></textarea>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Visa;
