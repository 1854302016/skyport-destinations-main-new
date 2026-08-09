import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const FlightBookingChange = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
}) => {

  const { walletData } = useSelector((state) => state.auth);

  // const [formData, setFormData] = useState({
  //   appliedFor: "",
  //   "appliedSector[]": [],
  //   "appliedPassenger[]": [],
  //   remark: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value, checked, type } = e.target;
  //   if (type === "checkbox") {
  //     if (name === "appliedSector[]" || name === "appliedPassenger[]") {
  //       const updatedArray = checked
  //         ? [...formData[name], value]
  //         : formData[name].filter((item) => item !== value);
  //       setFormData({ ...formData, [name]: updatedArray });
  //     } else if (name === "checkAll") {
  //       setFormData({
  //         ...formData,
  //         "appliedSector[]": checked
  //           ? ["SYD-KUL", "KUL-IST", "IST-ADA", "ADA-IST", "IST-SIN", "SIN-SYD"]
  //           : [],
  //       });
  //     }
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log(formData);
  // };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className="change_req_form">
      <Modal.Header closeButton>
        <Modal.Title>Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="Ledger-full">
          <Container>
            {/* <Row>
              <Col md={12}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Request Form
                </h3>
              </Col>
            </Row> */}
            <div className="box-leader">
              <Card className="panel panel-default">
                <Card.Footer className="request-form">
                  <Form id="add" onSubmit={handleSubmit}>
                  <div className="request-form-group">
                      <Row>
                        <Col md={6}>
                          <h6>Priority</h6>
                          <Form.Control
                            as="select"
                            className="form-control validate[required]"
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-Select-</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Normal">Normal</option>
                          </Form.Control>
                        </Col>
                        <Col md={6}>
                          <h6>Subject</h6>
                          <Form.Control
                            as="select"
                            className="form-control validate[required]"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-Select-</option>
                            <option value="Date Change Request">Date Change Request</option>
                            <option value="Passenger Change Request">Passenger Change Request</option>
                            <option value="Cancel Request">Cancel Request</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <h6>Type</h6>
                          <Form.Control
                            as="select"
                            className="form-control validate[required]"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-Select-</option>
                            <option value="Change/Reissue Itinerary">Change/Reissue Itinerary</option>
                            <option value="Partial Cancellation">Partial Cancellation</option>
                            <option value="Full Cancellation">Full Cancellation</option>
                          </Form.Control>
                        </Col>
                        <Col md={6}>
                          <h6>Email</h6>
                          <Form.Control
                            type="email"
                            className="form-control validate[required]"
                            id="email"
                            name="email"
                            value={walletData.Email}
                            readOnly
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <h6>Phone</h6>
                          <Form.Control
                            type="tel"
                            className="form-control validate[required]"
                            id="phone"
                            name="phone"
                            value={walletData.Phone}
                            readOnly
                          />
                        </Col>
                      </Row>
                    </div>

                    <div className="request-form-group">
                      <h6>Remarks*</h6>
                      <Form.Control
                        as="textarea"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control validate[required]"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="text-right">
                      <Button type="submit" className="btn btn-primary mr-2">Send Request</Button>
                    </div>
                  </Form>
                </Card.Footer>
              </Card>
            </div>
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FlightBookingChange;
