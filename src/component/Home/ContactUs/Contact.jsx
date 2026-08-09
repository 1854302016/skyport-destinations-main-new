import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css"; // Add a separate CSS file for styling
import { FaHotel, FaPercentage, FaPhoneAlt } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";

const Contact = () => {
  return (
    <div className="contact_us_content">
      <section className="bannerInnersss">
        <div className="container">
          <h1>
            <b>Contact Us</b>
          </h1>
        </div>
      </section>
      <Container className="contact-us mt-5">
        <Row>
          {/* Left side with form and map */}
          <Col md={8}>
            {/* Form */}
            <Card className="contact-card">
              <Card.Body>
                <Card.Title className="mb-4">Get in touch with us</Card.Title>
                {/* <Form>
                  <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="Your Name" />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="Your Email" />
                  </Form.Group>

                  <Form.Group controlId="formPhone">
                    <Form.Control type="text" placeholder="Your Phone" />
                  </Form.Group>

                  <Form.Group controlId="formSubject">
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>

                  <Form.Group controlId="formMessage">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Form> */}
                <form
                  //   method="POST"
                  //   action="https://heritage.travelsdata.com/contact/send"
                  //   acceptCharset="UTF-8"
                  name="add-contact"
                  //   autoComplete="off"
                  //   encType="multipart/form-data"
                  className="form_sec"
                >
                  <input
                    name="_token"
                    type="hidden"
                    // value="MfZlYwP56qNhbfG5zRUgD64QYOLPQhJfjVq6dFJL"
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control txt_field"
                      placeholder="Name"
                      name="name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control txt_field"
                      placeholder="Email Address"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control txt_field"
                      placeholder="Phone Number"
                      name="phone"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control txt_field"
                      placeholder="Subject"
                      name="subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      as="textarea"
                      className="form-control"
                      placeholder="Your Message"
                      name="message"
                      style={{ padding: "20px", height: "14vh" }}
                    />
                  </div>
                  <div
                    className="g-recaptcha"
                    // data-sitekey="6LdXVoAcAAAAABvtjJHkNflYKGeXp2CIaTMMA05x"
                  ></div>
                  <div className="contact_submit_btn">
                    <input
                      type="button"
                      name="submitcontact"
                      className="form_submit_btn btn_effect"
                      value="Submit"
                    />
                  </div>
                </form>
              </Card.Body>
            </Card>

            {/* Google Map */}
            {/* <div className="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26294.494347771317!2d69.12933901083981!3d34.532996000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f649342999b%3A0x5e17ad1747b52e31!2sShari%20Naw%20Ansari%20Square!5e0!3m2!1sen!2sin!4v1708356126491!5m2!1sen!2sin"
                width="100%"
                height="300px"
                style={{ border: "0", marginBottom: "10px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}
          </Col>

          {/* Right side with three cards */}
          <Col md={4}>
            {/* Card for Address Details */}
            <Card className="info-card mb-4">
              <Card.Body>
                <Card.Title className="mb-3 contactUsCardTitle">
                  <div className="contact_icon">
                    <FaPhoneAlt style={{ marginTop: "-12px" }} />

                    <p> 24*7 Customer Support</p>
                  </div>{" "}
                </Card.Title>
                <Card.Text>
                  +91 92112 52356
                  <br />
                  support@tripgoonline.com
                  {/* <br /> Karnataka, India */}
                </Card.Text>
              </Card.Body>
            </Card>

            {/* Card for Contact Information 1 */}
            <Card className="info-card mb-4">
              <Card.Body>
                <Card.Title className="mb-3 contactUsCardTitle">
                  <div className="contact_icon">
                    <FaPercentage style={{ marginTop: "-12px" }} />
                  </div>{" "}
                  <p> Sales Support</p>
                </Card.Title>
                <Card.Text>
                  +91 92112 52356
                  <br />
                  support@tripgoonline.com
                  {/* <br /> Karnataka, India */}
                </Card.Text>
              </Card.Body>
            </Card>

            {/* Card for Contact Information 2 */}
            <Card className="info-card mb-4">
              <Card.Body>
                <Card.Title className="mb-3 contactUsCardTitle">
                  <div className="contact_icon">
                    <ImHeadphones style={{ marginTop: "-12px" }} />
                  </div>{" "}
                  <p> Technical Support</p>
                </Card.Title>
                <Card.Text>
                  +91 92112 52356
                  <br />
                  support@tripgoonline.com
                  {/* <br /> Karnataka, India */}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="info-card">
              <Card.Body>
                <Card.Title className="mb-3 contactUsCardTitle">
                  <div className="contact_icon">
                    <FaHotel style={{ marginTop: "-12px" }} />
                  </div>{" "}
                  <p> Hotel Bookings</p>
                </Card.Title>
                <Card.Text>
                  +91 92112 52356
                  <br />
                  support@tripgoonline.com
                  {/* <br /> Karnataka, India */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
