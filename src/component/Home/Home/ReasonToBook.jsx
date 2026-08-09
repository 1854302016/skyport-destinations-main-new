import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ReasonToBook.css";

const ReasonsToBook = () => {
  return (
    <div className="bg-ligh mt-20 mb-20 pt-2 pb-2 reason_to_book" style={{position:'relative',zIndex:'100',background:"#fff"}} >
      <Container>
        <Row>
          <Col>
            <div className="text-center m-2 mt-3 mb-3">
              <h5 className="font-weight-bold">
                <span className="head_line">Reasons to book with us?</span>
              </h5>
            </div>
            <Row>
              <Col sm className="mt-2">
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <img src="https://www.vimaansafar.com/img/fastT.png" width="50" alt="Fast Booking" />
                  </div>
                  <div className="p-2">
                    <h6 className="font-weight-bold">FAST BOOKING</h6>
                    <p className="small">
                      We offer fast booking, fantastic products, competitive
                      pricing &amp; amazing experience.
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm className="mt-2">
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <img src="https://www.vimaansafar.com/img/eDeal.png" width="50" alt="Exciting Deals" />
                  </div>
                  <div className="p-2">
                    <h6 className="font-weight-bold">EXCITING DEALS</h6>
                    <p className="small">
                      Book exciting deals on with published &amp; exclusive
                      flights.
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm className="mt-2">
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <img src="https://www.vimaansafar.com/img/24Support.png" width="50" alt="24/7 Support" />
                  </div>
                  <div className="p-2">
                    <h6 className="font-weight-bold">24/7 SUPPORT</h6>
                    <p className="small">
                      Get assistance 24/7 on any kind of travel related query.
                      We are happy to assist you.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReasonsToBook;
